export const priceIdsUSD = {
  eth: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  usdc: "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
  usdt: "0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b",
  btc: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  ordi: "0x193c739db502aadcef37c2589738b1e37bdb257d58cf1ab3c7ebc8e6df4e3ec0",
  merl: "0x03e8dbf3e8f02edf5ca898dc7afbbac3f06c7d91c02986c3a8c6ce1a99e90355",
  core: "0x9b4503710cc8c53f75c30e6e4fda1a7064680ef2e0ee97acd2e3a7c37b3c830c",
};

export const pythContracts = {
  merlin: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
  merlin_test: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
  coredao: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729"
};

interface addressConfig {
  [key: string]: string;
}

const merlinChainAddressConfig: addressConfig = {
  BTCFeed: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
  ETHFeed: "0x1280036a9da98f35536c7ef07a78c97b38d10e40",
  ORDIFeed: "0xfF7013Bc8123f801957e67bDE37BCAB222daf181",
  PriceUpdater: "0x0cf6f1b8e611196bb0df2fadef63790cc6ba84da",
  merlinOracle: "0x9a41af73568d3a3a5b217df4e9dc270c23767efd",
};

const merlinTestChainAddressConfig: addressConfig = {
  BTCFeed: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
  ETHFeed: "0x1280036a9da98f35536c7ef07a78c97b38d10e40",
  ORDIFeed: "0xfF7013Bc8123f801957e67bDE37BCAB222daf181",
  PriceUpdater: "0x0cf6f1b8e611196bb0df2fadef63790cc6ba84da",
  merlinOracle: "0x9a41af73568d3a3a5b217df4e9dc270c23767efd",
};

const bitlayerChainAddressConfig: addressConfig = {
  PriceUpdater: "0xbf39b7afd850bdb91d62bbbd9b17cf02f62a1290",
  BTCFeed: "0x2b3f685266524e921cb5dd3094e57e85a3000487",
  ETHFeed: "0xe5b89f1e56045ae92518f4130947583608e2e163",
  USDCFeed: "0x38fbaed34760231acff76601eaf7c30cef97b739",
  USDTFeed: "0xa4886beb14e27bc6de4a504eb43e1a7b20961fa4",
};

const bitlayerTestChainAddressConfig: addressConfig = {
  PriceUpdater: "0xbf39b7afd850bdb91d62bbbd9b17cf02f62a1290",
  BTCFeed: "0x2b3f685266524e921cb5dd3094e57e85a3000487",
  ETHFeed: "0xe5b89f1e56045ae92518f4130947583608e2e163",
  USDCFeed: "0x38fbaed34760231acff76601eaf7c30cef97b739",
  USDTFeed: "0xa4886beb14e27bc6de4a504eb43e1a7b20961fa4",
};

const coredaoChainAddressConfig: addressConfig = {
  TempPriceUpdater: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
  TempBTCFeed: "0x1280036a9da98f35536c7ef07a78c97b38d10e40",
  TempUSDCFeed: "0xe05e46a42d05fcad5fa52f443d5963635aaf7a06",
  TempUSDTFeed: "0x2be335322f05aff78e4b231c9f175cba9ae31729",

  PriceUpdater: "0xe2d6aff025076f82a07221783b6dd3c30944906b",
  COREFeed: "0x6b0e702586c6091af8da8ab64710916f0a58b72f",
  BTCFeed: "0x167bf0f73b7606eb5f5ebde59a30a0a25828837c",
  USDCFeed: "0x6361b75086d28c45bc5b5529cdfcc71a3b3b54c4",
  USDTFeed: "0x2efb68fa0c4fc0a16537ff0af09d86005c267946",
};

export const AddressConfig: { [key: number]: addressConfig } = {
  4200: merlinChainAddressConfig,
  686868: merlinTestChainAddressConfig,
  200901: bitlayerChainAddressConfig,
  200810: bitlayerTestChainAddressConfig,
  1116: coredaoChainAddressConfig,
};

export const merlinPoolAddresses = {
  MP: "0x115c8d0f3701686f42a60e1ec8f0b6649855117c",
  MNER: "0x224988674102f0680169bffb4f29c928771fa1cd",
};
