---
id: bandstandarddataset
title: Стандартный набор данных Band
sidebar_label: Standard Dataset
description: Band Stardard Dataset предлагает информацию о ценах в реальном времени для более 196+ символов, охватывающих crypto валютный и сырьевой
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

Разработчики, построенные на Polygon, могут теперь использовать децентрализованную инфраструктуру Oracle Протокола Band. С оракулом Band Protocol теперь они имеют доступ к различным данным цен на криптовалюту, чтобы интегрироваться в свои приложения.

## Поддерживаемые токены {#supported-tokens}

В настоящее время список поддерживаемых символов можно найти по адресу [data.bandprotocol.com](http://data.bandprotcool.com). В будущем этот список будет и дальше расширяться в зависимости от потребностей разработчиков и отзывов сообщества.

## Ценовые пары {#price-pairs}

Следующие методы могут работать с любой комбинацией пар токенов база/предложение, если символы базы и ценового предложения поддерживаются набором данных.

### Запросы цен {#querying-prices}

В настоящее время разработчики используют два метода запроса из оракула Band Protocol: через `StdReference`смарт-контракт Band на Polygon и через их библиотеку хелпера [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)JavaScript.

### Смарт-контракт Solidity {#solidity-smart-contract}

Чтобы запросить цены из оракула Band Protocol, смарт-контракт должен ссылаться на контракт `StdReference`Band, в частности на методы `getReferenceData`и `getReferenceDatabulk`его.

`getReferenceData`принимает два строки в качестве входа, а `base`также `quote`символ соответственно. После этого он запрашивает у контракта `StdReference` последние курсы для этих двух токенов и выводит структуру `ReferenceData`, которая показана ниже.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

Вместо этого `getReferenceDataBulk` принимает два списка — один для токенов `base`, а другой — `quotes`. Затем он переходит к аналогичному запросу, что цена для каждой пары base/quote в каждом индексе, и возвращает массив `ReferenceData`структур.

Например, если мы вызовем `getReferenceDataBulk` с помощью `['BTC','BTC','ETH']` и `['USD','ETH','BNB']`, возвращаемый массив `ReferenceData` будет содержать информацию о парах:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## Адреса контрактов {#contract-addresses}

| Блокчейн | Адрес контракта |
| -------------------- | :------------------------------------------: |
| Polygon (тестовая сеть) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

Библиотека помощника нода Band [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) также поддерживает похожую функцию `getReferenceData`. Эта функция принимает один аргумент, список пар токенов для запроса результата. Затем она возвращает список соответствующих курсовых значений.


### Пример использования {#example-usage}

Код ниже показывает пример использования функции:

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

Соответствующий результат будет похож на:

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

Для каждой пары будет возвращена следующая информация:

- `pair`: текстовая строка пары символов база/предложение
- `rate`: получающийся курс данной пары
- `updated`: временная метка последнего обновления символов базы и предложения в BandChain. Для `USD`, это будет текущий временной метраж.
- `rawRate`: этот объект состоит из двух частей.
  - `value` — это `BigInt` значение фактического курса, умноженное на `10^decimals`
  - `decimals` в этом случае является экспонентом, на который умножается `rate` для получения `rawRate`

## Пример использования {#example-usage-1}

Этот [контракт](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) демонстрирует пример использования контракта Band `StdReference` и функции `getReferenceData`.