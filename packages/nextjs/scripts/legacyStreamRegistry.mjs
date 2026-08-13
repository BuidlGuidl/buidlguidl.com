// The original per-builder streams from the first BuidlGuidl site and additional streams
// recovered from the deployment history of their common deployer, 0x0F92...97Db.
//
// Each builder had their own SimpleStream contract and a <name>.buidlguidl.com subdomain.
// These predate the v3 app, so its event feed never recorded them: 15 of these builders are
// absent from v3 entirely, and several who are in v3 had an earlier contract that v3 replaced.
// The old site's `BUILDERS` list was incomplete: comparing every SimpleStream deployed by the
// same EOA against the snapshot recovered another 28 used contracts, 97 work logs and 28.51 ETH.
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
  // Recovered from the common deployer's contract-creation history. Some builders had several
  // successive streams; every contract below has Withdraw events absent from the v3 snapshot.
  { builder: "0xf7e89e45502890381f9242403ea8661fad89ca79", stream: "0x2ec099fe9547a1ac760bd1c9bbe710218624bf3f", ens: "hunterchang.eth" },
  { builder: "0xa4ca1b15fe81f57cb2d3f686c7b13309906cd37b", stream: "0x45283840c879dba341170fafa62542f7714bfe8f", ens: "pharo.eth" },
  { builder: "0x4ceb8dc70813ffbb2d8d6dc0755086698f977613", stream: "0x7d6dadfb6df8ebe6fcb1c32af55252f04d79df85", ens: "ssteiger.eth" },
  { builder: "0xa4ca1b15fe81f57cb2d3f686c7b13309906cd37b", stream: "0x1b8bb82bf08d69bdfb0287f6c16fa739aa6e95f2", ens: "pharo.eth" },
  { builder: "0xa4ca1b15fe81f57cb2d3f686c7b13309906cd37b", stream: "0x733f7e1aedc49c7c777c29c4be2eb772666552f4", ens: "pharo.eth" },
  { builder: "0x816a7dccddb35f12207307d26424d31d2b674dff", stream: "0x61335fba675dd9b2411e16ce81c86b2535e7d855", ens: "ryancoordinator.eth" },
  { builder: "0xbe13ca20b7ff5fef2d04f67abf2a2a07feafa102", stream: "0x262f56c901847261080e366edab27d454a1315cd", ens: "shravansunder.eth" },
  { builder: "0xb010ca9be09c382a9f31b79493bb232bcc319f01", stream: "0x949876f01d9bcc6fbe0889073e3b66b7a0a1290d", ens: "justn.eth" },
  { builder: "0xbf7877303b90297e7489aa1c067106331dff7288", stream: "0x6739d7cbdfdcd558818819a57f4f3ed2d92a198c", ens: "ghostffcode.eth" },
  { builder: "0x2dda8dc2f67f1eb94b250caefac9de16f70c5a51", stream: "0x8bec98b7dca7dff10c2499d1e2a9d97d96456742", ens: "viraz.eth" },
  { builder: "0x60583563d5879c2e59973e5718c7de2147971807", stream: "0xdb0c858ffadaacaa957865659ab5cdef69b45402", ens: "carletex.eth" },
  { builder: "0xb2a522c65b142e047991b2804c21c53d30a11de0", stream: "0x58ea476e698f4acfab5eb121fa2b3a3f2e84a3af" },
  { builder: "0xe3e8411c6ad96e3f08ea5351e2f6f5dde51190b0", stream: "0xd2a4b1e4efb5bb65a5152f3bca7ebc48e3cff5a1", ens: "dvinubius.eth" },
  { builder: "0x62769593d8d0a682ebe17935af40df57185ec169", stream: "0x139c9689d8d778157ecb63ee907c6e4428015ea3", ens: "txbias.eth" },
  { builder: "0x6c9ea5ab34b32b71358c46d13db5ee29d76f039f", stream: "0x169f5cad54c43415401e606daeae95df493a970a", ens: "jadenkore.eth" },
  { builder: "0x60583563d5879c2e59973e5718c7de2147971807", stream: "0x61f7e4a14cfc78a6f6b2ac46219328b76214a712", ens: "carletex.eth" },
  { builder: "0xacf16886efa51ff0957ef321b8510e53d67d1d7c", stream: "0x7d5a72b17c1ac153c50e11ccbe756859782e3a49", ens: "grothe.eth" },
  { builder: "0x53e90aa7eddedb58a2da1698028501c56c53978f", stream: "0x130a49071284a770fd07d6adaca8b23d4afbadd0", ens: "frogbaseball.eth" },
  { builder: "0x2dda8dc2f67f1eb94b250caefac9de16f70c5a51", stream: "0x3759fd32297f20f1e1e778479d935cc940c05e5c", ens: "viraz.eth" },
  { builder: "0xd6ff63e080a8eef554ba928af1d2f1a3e228b1da", stream: "0x61d7de768468451888a110db7b27f12b9423b6a6", ens: "danielsheldon.eth" },
  { builder: "0x07d503a5eada1d5741307ce085f5ecb8d950558f", stream: "0xa6e9462adf5419195c85e81fb130c3e053348873", ens: "sabbirahmed.eth" },
  { builder: "0x6c9ea5ab34b32b71358c46d13db5ee29d76f039f", stream: "0xc74a1cb3715de1d82182816582bb330d5086b081", ens: "jadenkore.eth" },
  { builder: "0x73286f355b8b8459175170420ac4d3dba799e6da", stream: "0x8b1de673ebef92b00223bb34548ffbffc5cdf6a2" },
  { builder: "0x1b37b1ec6b7faacbb9addcca4043824f36fb88d8", stream: "0xb551f1aecf2e2942fa432d4583b1c904fb5d2f32", ens: "supernovahs.eth" },
  { builder: "0x51634d98fccb1e9d64b6e7331c2872e98b33e9ac", stream: "0xdff4a9cd530b1c24468e275f57b6b82a72bb2486", ens: "relwotwerdna.eth" },
  { builder: "0x523d007855b3543797e0d3d462cb44b601274819", stream: "0x7d78028473c40d605de5b3e443089a98bbce5eea", ens: "salatti.eth" },
  { builder: "0x8c9d11ce64289701efeb6a68c16e849e9a2e781d", stream: "0xb5e2e5aaac005ee619cc61a489dab9a73851c9f4", ens: "monyo.eth" },
  { builder: "0x2d143b3ae28fa31e7c821d138c58c32a30aa36ae", stream: "0xcac27268ae818d4e55271b76a94927e2b3d5b33f", ens: "genlyai.eth" },

  // Contracts listed on the original site.
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
