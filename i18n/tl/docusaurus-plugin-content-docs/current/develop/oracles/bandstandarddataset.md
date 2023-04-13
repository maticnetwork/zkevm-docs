---
id: bandstandarddataset
title: Band Standard Dataset
sidebar_label: Standard Dataset
description: Nag-aalok ang Band Stardard Dataset ng real-time na impormasyon ng presyo para sa mahigit 196 + na mga simbolo na real-time sa mga asset ng crypto, foreign exchange at mga kalakal
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - standard dataset
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Maaari na ngayong i-leverage ang mga developer na gusali sa desentralisadong oracle imprastraktura ng Band Protocol. Sa oracle ng Band Protocol, mayroon na silang access ngayon sa iba't ibang data ng presyo ng cryptocurrency para maisama sa kanilang mga application.

## Mga Supported Token {#supported-tokens}

Sa kasalukuyan, matatagpuan ang listahan ng mga sinusuportahang simbolo sa [data.bandprotocol.com](http://data.bandprotcool.com). Sa pagpapatuloy sa hinaharap, patuloy na lalawak ang listahang ito batay sa mga pangangailangan ng developer at feedback ng komunidad.

## Mga Pares ng Presyo {#price-pairs}

Maaaring gumana ang mga sumusunod na paraan sa anumang kumbinasyon ng base/quote na pares ng token, hangga't ang base at mga simbolo ng quote ay sinusuportahan ng dataset.

### Mga Presyo ng Nagtatanong {#querying-prices}

Sa kasalukuyan, may dalawang pamamaraan para sa mga developer para mag-query ng mga presyo mula sa oracle ng Band Protocol: sa pamamagitan ng `StdReference`smart contract ng Band sa Polygon at sa pamamagitan ng kanilang [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)JavaScript helper library.

### Solidity Matalinong Kontrata {#solidity-smart-contract}

Para mag-query ang mga presyo mula sa oracle ng Band Protocol, dapat isangguni ang isang smart contract ng `StdReference`Band, partikular ang `getReferenceData`at `getReferenceDatabulk`pamamaraan.

`getReferenceData`tumatagal ng dalawang string tulad ng mga input, ang `base`at `quote`simbol, ayon sa pagkakabanggit. `StdReference`Pagkatapos ay tinanong nito ang `ReferenceData`kontrata para mga pinakabagong rate para sa dalawang token na iyon, at nagbabalik ng struct, mas mababa ang lipad, na ipinapakita sa ibaba.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk``quotes`sa halip ay kumukuha ng dalawang listahan, isa sa mga `base`token, at isa sa. Pagkatapos ay nalikom ito na similarly na i-query ang presyo para sa bawat pares ng base / quote sa bawat index, at nagbabalik ng isang hanay ng mga `ReferenceData`struct.

`['BTC','BTC','ETH']`Halimbawa, kung call namin `getReferenceDataBulk`sa at,`['USD','ETH','BNB']` ang ibinalik na a`ReferenceData`rray ay maglalaman ng impormasyon tungkol sa mga pare:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## Mga Address ng Kontrata {#contract-addresses}

| Blockchain | Address Kontrata |
| -------------------- | :------------------------------------------: |
| Polygon (Pagsusulit) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

Sinusuportahan din ng node helper library ng Band ang isang katulad [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js)na `getReferenceData`function. Kinukuha ng function na ito ang isang argumento, isang listahan ng mga pares ng token para i-query ang resulta. Pagkatapos ay ibinabalik nito ang isang listahan ng mga katumbas na halaga ng rate.


### Halimbawa ng Paggamit {#example-usage}

Ipinapakita ng code sa ibaba ang halimbawa ng paggamit ng function:

```javascript
const { Client } = require('@bandprotocol/bandchain.js');

// BandChain's REST Endpoint
const endpoint = 'https://rpc.bandchain.org';
const client = new Client(endpoint);

// This example demonstrates how to query price data from
// Band's standard dataset
async function exampleGetReferenceData() {
  const rate = await client.getReferenceData(['BTC/ETH','BAND/EUR']);
  return rate;
}

(async () => {
  console.log(await exampleGetReferenceData());
})();

```

Magkakatulad ang kaukulang resulta sa:

```bash
$ node index.js
[
    {
        pair: 'BTC/ETH',
        rate: 30.998744363906173,
        updatedAt: { base: 1615866954, quote: 1615866954 },
        requestID: { base: 2206590, quote: 2206590 }
    },
    {
        pair: 'BAND/EUR',
        rate: 10.566138918332376,
        updatedAt: { base: 1615866845, quote: 1615866911 },
        requestID: { base: 2206539, quote: 2206572 }
    }
]
```

Para sa bawat pares, ibabalik ang sumusunod na impormasyon:

- `pair`: Ang base/quote na simbolo ng pares na string
- `rate`: Ang resultang rate ng ibinigay na pares
- `updated`Ang timestamp kung saan huling na-update ang base at mga simbolo ng quote sa BandChain. Para sa `USD`, ito ang magiging kasalukuyang timestamp.
- `rawRate`: Ang bagay na ito ay binubuo ng dalawang bahagi.
  - `value` ay ang `BigInt` value ng aktwal na rate, na pinarami ng `10^decimals`
  - `decimals`ay pagkatapos ay ang exponent na kung saan ay `rate`pinarami ng upang makakuha`rawRate`

## Halimbawa ng Paggamit {#example-usage-1}

`getReferenceData`Ang [kontrata](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) na ito ay nagpapakita ng isang halimbawa ng paggamit ng kontrata ng Band's at function ng `StdReference`kontrata.