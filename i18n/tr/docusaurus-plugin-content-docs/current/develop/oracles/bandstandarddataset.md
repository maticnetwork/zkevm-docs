---
id: bandstandarddataset
title: Band Standart Veri Seti
sidebar_label: Standard Dataset
description: Band Stardard Dataset kripto varlıkları, döviz ve meta arasında yayılan 196'dan fazla sembol için gerçek zamanlı fiyat bilgisi sunar
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

Polygon üzerinde inşa eden geliştiriciler, Band Protokolü'nün merkezi olmayan oracle altyapısından yararlanabilir. Band Protokolü ile artık uygulamalarına entegre olmak için çeşitli kripto para birimi fiyat verilerine erişebilirler.

## Desteklenen Token'lar {#supported-tokens}

Şu anda desteklenen sembollerin listesi [data.bandprotocol.com](http://data.bandprotcool.com) adresinde bulunabilir. İleride bu liste geliştirici ihtiyaçlarına ve topluluk geri bildirimine bağlı olarak genişlemeye devam edecektir.

## Fiyat Çiftleri {#price-pairs}

Aşağıdaki metotlar herhangi bir baz/teklif token çifti kombinasyonu ile çalışabilir, yeter ki baz ve teklif sembolleri veri seti tarafından destekleniyor olsun.

### Fiyatları Sorgulama {#querying-prices}

Şu anda, geliştiricilerin Band Protokolü tarafından verilen oracle'dan fiyatları sorgulamaları için iki yöntem vardır: Band'ın Polygon üzerindeki `StdReference`akıllı sözleşmesi ve [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)JavaScript yardımcı kütüphanesi aracılığıyla.

### Solidity Akıllı Sözleşmesi {#solidity-smart-contract}

Band Protokolü tarafından verilen fiyatlarla ilgili olarak akıllı bir sözleşme Band sözleşmesi ile ilgili olarak bu `StdReference`sözleşme, özellikle de metotlara ve `getReferenceData`yöntemlere `getReferenceDatabulk`başvurmalıdır.

`getReferenceData`Bu iki dizeyi girdiler, sırasıyla ve `base``quote`semboller olarak alır. Ardından, bu iki token'ın en güncel fiyatları için `StdReference` sözleşmesini sorgular ve aşağıda gösterildiği gibi bir `ReferenceData` struct döndürür.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk` ise iki liste alır: biri `base` token'ları listesi ve diğeri `quotes` token'ları listesi. Daha sonra her bir indexte bulunan her bir taban/teklif çifti için fiyatı benzer şekilde sorguluyor, ve bir dizi yapılandırma `ReferenceData`döndürür.

Örneğin, `['BTC','BTC','ETH']` ve `['USD','ETH','BNB']` ile `getReferenceDataBulk` metodunu çağırırsak, döndürülen `ReferenceData` dizisi çiftlerle ilgili bilgileri içerecektir:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## Sözleşme Adresleri {#contract-addresses}

| Blok zinciri | Sözleşme Adresi |
| -------------------- | :------------------------------------------: |
| Polygon (Test) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

Band'ın düğüm yardımcı kütüphanesi olan [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) da benzer bir `getReferenceData` fonksiyonunu destekler. Bu fonksiyon bir argüman, sonucu sorgulamak için token çiftlerinin listesi. Ardından, karşılık gelen fiyat değerlerinin bir listesini döndürür.


### Örnek Kullanım {#example-usage}

Aşağıdaki kod, fonksiyonun bir örnek kullanımını gösterir:

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

İlgili sonuç daha sonra şunlara benzer olacaktır:

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

Her çift için aşağıdaki bilgiler döndürülür:

- `pair`: Baz/teklif sembol çifti dizesi
- `rate`: Belirtilen çiftin sonuç fiyatı
- `updated`: Baz ve teklif sembollerinin BandChain üzerinde en son güncellendiği zaman damgası. `USD`Bu durum mevcut zaman damgası olacaktır.
- `rawRate`: Bu nesne iki parçadan oluşur.
  - `value`, gerçek fiyatın `10^decimals` ile çarpılmış `BigInt` değeridir
  - Bu durumda `decimals` tabanın üs değeri olup, `rate`, yani fiyat ile çarpılarak `rawRate`, yani ham fiyat elde edilir

## Örnek Kullanım {#example-usage-1}

Bu [sözleşme](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) Band'ın `StdReference` sözleşmesinin ve `getReferenceData` fonksiyonunun kullanılmasına bir örnek gösterir.