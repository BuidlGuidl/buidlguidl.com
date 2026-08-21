import sheet from "~~/data/grants/builder-avatars.json";

// One sprite sheet for all 278 builders, written by `scripts/snapshot-builder-avatars.mjs`:
// an ENS avatar where the name had one, the address's blockie otherwise. Every face on the
// page costs one cached image and a background-position — no ENS resolution, no per-avatar
// request, nothing to keep paying for once the indexers are gone.
//
// Only the address → tile index reaches the browser (~13 kB, shared across the /grants-archive
// routes). It has to: the withdrawal logs page in more rows on click, so the lookup happens
// after hydration.
const { sprite, columns, rows, index } = sheet;

const tiles: Record<string, number> = index;

/**
 * Rendered sizes must divide the 48px tile exactly, so every offset lands on a whole pixel
 * and no neighbouring tile bleeds in along the edge.
 */
type AvatarSize = 24 | 16;

interface BuilderAvatarProps {
  address: string;
  size?: AvatarSize;
  className?: string;
}

export const BuilderAvatar = ({ address, size = 24, className = "" }: BuilderAvatarProps) => {
  const position = tiles[address.toLowerCase()];

  // Every address the pages render is in the sheet. A miss means the snapshot is stale, so
  // hold the space with a neutral circle rather than letting the row jump.
  if (position === undefined) {
    return (
      <span
        className={`inline-block shrink-0 rounded-full bg-base-content/10 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }

  const column = position % columns;
  const row = Math.floor(position / columns);

  return (
    <span
      className={`inline-block shrink-0 rounded-full bg-base-200 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${sprite})`,
        backgroundSize: `${columns * size}px ${rows * size}px`,
        backgroundPosition: `-${column * size}px -${row * size}px`,
      }}
      aria-hidden
    />
  );
};
