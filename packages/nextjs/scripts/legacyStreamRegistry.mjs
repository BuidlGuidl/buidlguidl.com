// The original per-builder streams from the first BuidlGuidl site
// (github.com/scaffold-eth/buidlguidl.com, `BUILDERS` in packages/react-app/src/constants.js).
//
// Each builder had their own SimpleStream contract and a <name>.buidlguidl.com subdomain.
// These predate the v3 app, so its event feed never recorded them: 15 of these builders are
// absent from v3 entirely, and several who are in v3 had an earlier contract that v3 replaced.
// Without this list that whole era of work logs is missing from the archive.
//
// Withdrawals are read straight from the contracts rather than from any backend.

/**
 * @typedef {Object} LegacyStreamEntry
 * @property {string} builder recipient address, lowercase
 * @property {string} stream SimpleStream contract, lowercase
 * @property {string} [ens] name as recorded on the old site
 * @property {string} [subdomain] former <name>.buidlguidl.com subdomain
 */

/** @type {LegacyStreamEntry[]} */
export const LEGACY_STREAMS = [
  { builder: "0x411381d227af243e9383fdbb77313352e622d72f", stream: "0x538d822559eb7a2d594e7d68dcdf29b3296830d3", ens: "0xsama.eth", subdomain: "0xsama" },
  { builder: "0x60ca282757ba67f3adbf21f3ba2ebe4ab3eb01fc", stream: "0x754a8a09eae2ffefbde706a6ed40c0f0f3c58d7e", ens: "adamfuller.eth", subdomain: "adamfuller" },
  { builder: "0x1245e96fe32b43ddec930d662b5d20239282b876", stream: "0xa267be6ef185f7563354e90882c1d3332455b8f8", ens: "amogh.eth", subdomain: "amogh" },
  { builder: "0x34aa3f359a9d614239015126635ce7732c18fdf3", stream: "0x518af5f20bf07c882e17731207761c174ab4f9c4", ens: "austingriffith.eth", subdomain: "austingriffith" },
  { builder: "0xdfcbf02520fdde9d8c46cc44dadcfc798029e5b4", stream: "0x684653ef9231e6142446053e4766027e6c6aab15", ens: "bboyle.eth", subdomain: "bboyle" },
  { builder: "0x807a1752402d21400d555e1cd7f175566088b955", stream: "0x619accbe6e5c4e5cc71a29a05ee7228867c9733c", ens: "blindnabler.eth", subdomain: "blindnabler" },
  { builder: "0x614ae4c6eb91cec9e6e178549c0745a827212b24", stream: "0x864fa2f20e414c9534b1de567a30a77436c7a745", subdomain: "calvinquin" },
  { builder: "0x5ad3b55625553cef54d7561cd256658537d54aad", stream: "0x446455ece8922a5c4ce8b205b74d06bd9706143b", ens: "captnseagraves.eth", subdomain: "captnseagraves" },
  { builder: "0x60583563d5879c2e59973e5718c7de2147971807", stream: "0x4b5ed9760e5f5e87c50d9739beff5b13fb61cc2f", ens: "carletex.eth", subdomain: "carletex" },
  { builder: "0xeb0c4f040ff0e2278bb2c14b7cc9c357467c83e3", stream: "0xb34006e71ac4cf8b05c56422b7be3d7f14d934e8", ens: "cluda.eth", subdomain: "cluda" },
  { builder: "0x5dcb5f4f39caa6ca25380cfc42280330b49d3c93", stream: "0x8fe72b655b54f4a900b1a0e6fd9957a6a3779209", ens: "damianmarti.eth", subdomain: "damianmarti" },
  { builder: "0xe7a54673f2ffe41cf38dba2014326064a958b709", stream: "0xa13966b1b4b66ac6670f0c14f8fa0a45fe219a09", ens: "danielrees.eth", subdomain: "danielrees" },
  { builder: "0x53e7f107f3037df2a03c79fa9750908c67b55cd3", stream: "0x52864de6545554437999fa20374aff409b4f52b7", ens: "developermarwan.eth", subdomain: "developermarwan" },
  { builder: "0x0d0f9ebd254e510aa6f3788ecb6e6fc8bf78188f", stream: "0xe5c281c470acedd6f15d41c640988822594bf69a", ens: "dgrcode.eth", subdomain: "dgrcode" },
  { builder: "0x38f84e92b468a1885e73cedc9a4d5632de07eabb", stream: "0x664c54cf70797a69f82a4991ea1be343a03334e8", ens: "frogbaseball.eth", subdomain: "frogbaseball" },
  { builder: "0xbf7877303b90297e7489aa1c067106331dff7288", stream: "0x0e185d75a3658de186fcef13ae01e816ccce599a", ens: "ghostffcode.eth", subdomain: "ghostffcode" },
  { builder: "0xacf16886efa51ff0957ef321b8510e53d67d1d7c", stream: "0xeadc8bbb8717765429712c7bf5c9c5e55f0bccd5", ens: "grothe.eth", subdomain: "grothe" },
  { builder: "0x84946f14b092a0b32b21dd10e742c02ae3710add", stream: "0x04e9245892391fb290d11d5deb0bb8c2a325b629", ens: "hipsterhelpdesk.eth", subdomain: "hipsterhelpdesk" },
  { builder: "0xf7e89e45502890381f9242403ea8661fad89ca79", stream: "0x560dd59ed235446d04da7c907289e3f88e685447", ens: "hunterchang.eth", subdomain: "hunterchang" },
  { builder: "0xc9a238405ef9d753d55ec1eb8f7a7b17b8d83e63", stream: "0xe29ae83bef493eae7a6c07608c25c359d24989c3", ens: "huxwell.eth", subdomain: "huxwell" },
  { builder: "0x1e2ce012b27d0c0d3e717e943ef6e62717cec4ea", stream: "0xdbcd66b510191cd0539f7fae8cd981b82ee2006f", ens: "ironsoul.eth", subdomain: "ironsoul" },
  { builder: "0x775af9b7c214fe8792ab5f5da61a8708591d517e", stream: "0x21bd856523f62dd2a6edba750e97bd106204d5f2", ens: "isaacpatka.eth", subdomain: "isaacpatka" },
  { builder: "0x03d8df325c8bfb8929414756e95023d2150c8881", stream: "0x8dabdef0259a8266234fcbde4b12a59a66559239", ens: "kijun.eth", subdomain: "kijun" },
  { builder: "0x7c2f9e77cfb36fc90bc8296c0cebbcd89e8d1981", stream: "0xc3c9ff28ffa2bb65e5827c5fdc309ffc41e5017e", ens: "lekag.eth", subdomain: "lekag" },
  { builder: "0xd2f016809969b4105978fdd5b112cd95bfdd6814", stream: "0xd31adde3c6659653f5bdcb237afb353155db1567", ens: "mrdee.eth", subdomain: "mrdee" },
  { builder: "0x5abb06dc717cbe8112eff232a6dfc98cb521511d", stream: "0x4cc7976d1b0784808e838cd89e0a4df957b0f652", ens: "mridul.eth", subdomain: "mridul" },
  { builder: "0x50c57894c3b9bf022d10b94b9d940a48a93cd8c0", stream: "0xbd0944bb3ae59952e772a65661c1a51bbbf1ea92", ens: "nook.eth", subdomain: "nook" },
  { builder: "0xfd4c0f5848642fc2041c003cb684fc66b16217bc", stream: "0xb3a51b63b7f1bcb8600ff67e4a69c7b690994a89", ens: "pabloruiz.eth", subdomain: "pabloruiz" },
  { builder: "0xa4ca1b15fe81f57cb2d3f686c7b13309906cd37b", stream: "0x3dc246459433afc0360b83166a6dd9b7697eaa4a", ens: "pharo.eth", subdomain: "rawcipher1" },
  { builder: "0x5c43b1ed97e52d009611d89b74fa829fe4ac56b1", stream: "0x0a9ede9a66683f23d369fc6baaa9d1fa7198ebf2", ens: "pileofscraps.eth", subdomain: "pileofscraps" },
  { builder: "0x9e67029403675ee18777ed38f9c1c5c75f7b34f2", stream: "0xc80bfd26b102991e2d96ce583b5efa2e4db0733d", ens: "powvt.eth", subdomain: "powvt" },
  { builder: "0x00555dc77a343e205cb1c7755407c93470db3f91", stream: "0x6459ed3063e1267b9c22e6410076d328e4b971a6", ens: "ryanpetroff.eth", subdomain: "ryanpetroff" },
  { builder: "0x7b945ffe9725d8e05343bec36c0eced294097f78", stream: "0x1eb6da6f03b6d3c0d8da0b127388add4d78eb652", ens: "sadda11asm.eth", subdomain: "sadda11asm" },
  { builder: "0xbe13ca20b7ff5fef2d04f67abf2a2a07feafa102", stream: "0x1fe0e66952b7eeb16ddb62b33ca62813c1c4faa7", ens: "shravansunder.eth", subdomain: "shravansunder" },
  { builder: "0x4ceb8dc70813ffbb2d8d6dc0755086698f977613", stream: "0x24aac13141dbe8946433215bfdc793c2b71398c8", ens: "ssteiger.eth", subdomain: "ssteiger" },
  { builder: "0x67960c0c99498aff880d1bd68fe596c9443528ae", stream: "0x3b2ca03bae949ba2c72c78d2f331b5ebd155c735", ens: "stermi.eth", subdomain: "stermi" },
  { builder: "0x50eccad809d553335a8eb7bfec2cee5a6f2cde43", stream: "0x3b60b34aa5deaff586d3841ad62b4aa730e11cec", ens: "togzhan.eth", subdomain: "togzhan" },
  { builder: "0x18ee15f0c12b3035c84a9a1027db1e1151308ac5", stream: "0x853e9d7036c48fa36cccff0e5b8907ae013ae8eb", ens: "trombone.eth", subdomain: "trombone" },
  { builder: "0x2dda8dc2f67f1eb94b250caefac9de16f70c5a51", stream: "0x974a061a8ce5a2b07cb3f1d356bb01daaa9ec31d", ens: "viraz.eth", subdomain: "viraz" },
  { builder: "0x26ad3416e70bd055dbc5e34c91d17d72adbe1478", stream: "0xb32270518664c77a09e44f6da59ad2dd3470299c", ens: "xiangan.eth", subdomain: "xiangan" },
];
