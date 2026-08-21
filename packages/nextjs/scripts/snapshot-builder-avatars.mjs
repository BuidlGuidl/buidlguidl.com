#!/usr/bin/env node
//
// Bakes every builder's face into one sprite sheet: `public/grants/builder-avatars.webp`,
// plus the address → tile index in `data/grants/builder-avatars.json`.
//
//   yarn snapshot:avatars
//   yarn snapshot:avatars --dry-run
//   yarn snapshot:avatars --limit=20
//
// The /grants-archive pages show a builder ~2500 times across the withdrawal logs, and resolving an
// avatar per row at runtime would mean an ENS lookup and an image request each — through
// exactly the paid infrastructure this archive exists to retire. So the images are fetched
// once, here, and the pages ship a single file with no lookups at all.
//
// Everyone gets a tile. A builder with an ENS avatar record gets that image; everyone else
// gets the blockie their address has always hashed to, generated here rather than drawn in
// the browser so the two cases cost the same at runtime: one sprite, one background-position.
//
// Sources:
//   - data/grants               the addresses and ENS names already captured
//   - metadata.ens.domains      the avatar record, resolved and rendered to an image
//
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const ENS_AVATARS = "https://metadata.ens.domains/mainnet/avatar";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(HERE, "..", "data", "grants");
const SPRITE_FILE = path.join(HERE, "..", "public", "grants", "builder-avatars.webp");
const INDEX_FILE = path.join(DATA_DIR, "builder-avatars.json");
/** Public URL of the sprite, as the CSS `background-image` needs it. */
const SPRITE_URL = "/grants/builder-avatars.webp";

// Tiles are cut at twice their largest rendered size (24px) so they stay sharp on retina
// screens. 20 columns keeps the sheet under 1300px wide, well inside every decoder's limits.
const TILE = 48;
const COLUMNS = 20;
/** Every tile is flattened to opaque RGB, so the sheet is one buffer with no alpha. */
const CHANNELS = 3;

const CONCURRENCY = 8;
const TIMEOUT_MS = 20_000;
const RETRIES = 3;
// A name whose avatar never resolves silently becomes a blockie, which is a face this person
// does not have. A few are expected — dead IPFS pins, NFT avatars whose image is long gone —
// but a wave of them means the service is failing and the sheet should not be trusted.
const MAX_UNRESOLVED_RATIO = 0.05;

const args = process.argv.slice(2);
const hasFlag = name => args.includes(`--${name}`);
const flagValue = name => args.find(a => a.startsWith(`--${name}=`))?.split("=")[1];

const DRY_RUN = hasFlag("dry-run");
const LIMIT = Number(flagValue("limit")) || 0;

const log = (...parts) => console.log(...parts);
const warn = (...parts) => console.warn("  ! ", ...parts);

class SnapshotError extends Error {}
const fail = message => {
  throw new SnapshotError(message);
};
const assert = (condition, message) => {
  if (!condition) fail(message);
};

const lower = value => String(value).toLowerCase();
const readJson = file => JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8"));

// ---------------------------------------------------------------- who gets a tile

/**
 * Every address the /grants-archive pages can render, from the three places builders come from.
 * Withdrawal logs are not read: their builders are all in the cohort and stream rosters.
 */
function collectBuilders() {
  const builders = new Map();
  const add = (address, ens) => {
    if (!address) return;
    const key = lower(address);
    const existing = builders.get(key);
    // The same person can appear with an ENS name in one file and without in another.
    if (!existing) builders.set(key, { address: key, ens: ens || undefined });
    else if (!existing.ens && ens) existing.ens = ens;
  };

  for (const roster of Object.values(readJson("cohort-builders.json"))) {
    for (const builder of roster) add(builder.address, builder.ens);
  }
  for (const builder of readJson("streams.json")) add(builder.address, builder.ens);
  for (const grant of readJson("program-grants.json").grants) add(grant.builder, grant.ens);

  const sorted = [...builders.values()].sort((a, b) => a.address.localeCompare(b.address));
  assert(sorted.length, "no builders found in data/grants — run `yarn snapshot:grants` first");
  return LIMIT ? sorted.slice(0, LIMIT) : sorted;
}

// ---------------------------------------------------------------- blockies

/**
 * The blockie algorithm as `ethereum-blockies` defines it, which is what `react-blockies`
 * draws elsewhere in this app. Reimplemented rather than imported because that package only
 * ships a React component painting onto a canvas, and this runs in Node.
 *
 * Every step is seeded from the address alone, so a builder's blockie here is the same one
 * they have always had.
 */
function blockiePixels(address, size = 8) {
  const randseed = new Int32Array(4);
  const seed = lower(address);
  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] = (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }

  const rand = () => {
    const t = randseed[0] ^ (randseed[0] << 11);
    randseed[0] = randseed[1];
    randseed[1] = randseed[2];
    randseed[2] = randseed[3];
    randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);
    return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
  };

  const nextColor = () =>
    hslToRgb(Math.floor(rand() * 360), rand() * 60 + 40, (rand() + rand() + rand() + rand()) * 25);

  // Order matters: the three colors are drawn from the sequence before the pixels are.
  const color = nextColor();
  const background = nextColor();
  const spot = nextColor();

  const dataWidth = Math.ceil(size / 2);
  const mirrorWidth = size - dataWidth;
  const palette = [background, color, spot];
  const pixels = Buffer.alloc(size * size * CHANNELS);

  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < dataWidth; x++) row[x] = Math.floor(rand() * 2.3);
    const mirrored = row.slice(0, mirrorWidth).reverse();

    [...row, ...mirrored].forEach((value, x) => {
      pixels.set(palette[value], (y * size + x) * CHANNELS);
    });
  }

  return (
    sharp(pixels, { raw: { width: size, height: size, channels: CHANNELS } })
      // Nearest neighbour: a blockie is 8x8 pixel art and should scale up with hard edges.
      .resize(TILE, TILE, { kernel: "nearest" })
      .raw()
      .toBuffer()
  );
}

function hslToRgb(h, s, l) {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const second = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const match = lightness - chroma / 2;
  const [r, g, b] = [
    [chroma, second, 0],
    [second, chroma, 0],
    [0, chroma, second],
    [0, second, chroma],
    [second, 0, chroma],
    [chroma, 0, second],
  ][Math.floor(h / 60) % 6];
  return [r, g, b].map(channel => Math.round((channel + match) * 255));
}

// ---------------------------------------------------------------- ENS avatars

/**
 * The avatar record, already resolved: the metadata service reads the text record, follows
 * ipfs:// and eip155: NFT references, and hands back a plain image. 404 is its answer for
 * "this name has no avatar", which is information rather than a failure.
 *
 * Returns the image bytes, `null` for a definitive no, or throws if it never got an answer.
 */
async function fetchAvatar(name) {
  const url = `${ENS_AVATARS}/${encodeURIComponent(name)}`;
  let lastError;

  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (response.status === 404) return null;
      if (response.ok) return Buffer.from(await response.arrayBuffer());
      // 4xx other than 404 is about this name itself, and a retry will not change it.
      if (response.status < 500 && response.status !== 429) return null;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < RETRIES) await new Promise(resolve => setTimeout(resolve, 500 * attempt));
  }

  throw lastError;
}

/** Decode whatever came back — JPEG, PNG, SVG, the first frame of a GIF — into one raw tile. */
async function toTile(image) {
  return (
    sharp(image, { limitInputPixels: 64 * 1024 * 1024 })
      .resize(TILE, TILE, { fit: "cover", position: "attention" })
      // Transparent PNG and SVG avatars are composited onto white, so every tile is opaque and
      // the sheet can be one flat RGB buffer.
      .flatten({ background: "#ffffff" })
      .removeAlpha()
      .raw()
      .toBuffer()
  );
}

/** Runs `worker` over `items`, `CONCURRENCY` at a time, keeping the results in input order. */
async function mapLimit(items, worker) {
  const results = new Array(items.length);
  let next = 0;

  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  });

  await Promise.all(runners);
  return results;
}

// ---------------------------------------------------------------- sprite

/** Blits the tiles into one sheet, left to right and top to bottom, and encodes it once. */
async function buildSprite(tiles) {
  const rows = Math.ceil(tiles.length / COLUMNS);
  const width = COLUMNS * TILE;
  const height = rows * TILE;
  // 0xff, so the unused tail of the last row is white rather than black.
  const sheet = Buffer.alloc(width * height * CHANNELS, 0xff);

  tiles.forEach((tile, index) => {
    const originX = (index % COLUMNS) * TILE;
    const originY = Math.floor(index / COLUMNS) * TILE;
    for (let y = 0; y < TILE; y++) {
      const from = y * TILE * CHANNELS;
      const to = ((originY + y) * width + originX) * CHANNELS;
      tile.copy(sheet, to, from, from + TILE * CHANNELS);
    }
  });

  const webp = await sharp(sheet, { raw: { width, height, channels: CHANNELS } })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  return { webp, width, height, rows };
}

// ---------------------------------------------------------------- main

async function main() {
  const builders = collectBuilders();
  const named = builders.filter(builder => builder.ens);
  log(`→ ${builders.length} builders, ${named.length} with an ENS name`);

  log("→ resolving ENS avatars");
  const unresolved = [];
  const avatars = new Map();

  await mapLimit(named, async builder => {
    let image;
    try {
      image = await fetchAvatar(builder.ens);
    } catch (error) {
      unresolved.push(`${builder.ens}: ${error.message}`);
      return;
    }
    if (!image) return;

    try {
      avatars.set(builder.address, await toTile(image));
    } catch (error) {
      // An avatar record pointing at something that is not a decodable image.
      unresolved.push(`${builder.ens}: ${error.message.split("\n")[0]}`);
    }
  });

  for (const failure of unresolved) warn(failure);
  assert(
    unresolved.length <= Math.ceil(named.length * MAX_UNRESOLVED_RATIO),
    `${unresolved.length} of ${named.length} avatars failed to resolve — the metadata service ` +
      `looks unhealthy, so the sheet would quietly replace real faces with blockies`,
  );

  log(`  ${avatars.size} avatars · ${builders.length - avatars.size} blockies`);

  log("→ drawing the sheet");
  const tiles = await mapLimit(
    builders,
    async builder => avatars.get(builder.address) ?? blockiePixels(builder.address),
  );
  const { webp, width, height, rows } = await buildSprite(tiles);

  const index = {};
  builders.forEach((builder, position) => {
    index[builder.address] = position;
  });

  const snapshot = {
    generatedAt: new Date().toISOString(),
    source: ENS_AVATARS,
    sprite: SPRITE_URL,
    /** Tile edge in the sheet, in pixels. Rendered at half this for a 2x display. */
    tile: TILE,
    columns: COLUMNS,
    rows,
    counts: { builders: builders.length, avatars: avatars.size, blockies: builders.length - avatars.size },
    index,
  };

  if (!DRY_RUN) {
    fs.mkdirSync(path.dirname(SPRITE_FILE), { recursive: true });
    fs.writeFileSync(SPRITE_FILE, webp);
    // Two-space JSON matches prettier's own output, so `yarn format` never rewrites this file.
    fs.writeFileSync(INDEX_FILE, `${JSON.stringify(snapshot, null, 2)}\n`);
  }

  const kb = size => `${Math.round(size / 1024)} kB`;
  log(
    `\n${builders.length} tiles · ${avatars.size} ENS avatars · ${builders.length - avatars.size} blockies\n` +
      `sheet ${width}x${height} · ${kb(webp.length)} · index ${kb(JSON.stringify(snapshot).length)}`,
  );
  log(
    DRY_RUN
      ? "\nDry run — no files written."
      : `\nWrote ${path.relative(process.cwd(), SPRITE_FILE)} and ${path.relative(process.cwd(), INDEX_FILE)}`,
  );
}

main().catch(error => {
  if (error instanceof SnapshotError) {
    console.error(`\nSnapshot aborted: ${error.message}`);
  } else {
    console.error("\nSnapshot failed:", error);
  }
  process.exit(1);
});
