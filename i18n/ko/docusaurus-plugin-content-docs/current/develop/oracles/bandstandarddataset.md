---
id: bandstandarddataset
title: Band 표준 데이터세트
sidebar_label: Standard Dataset
description: Band Stardard Dataset에서 실시간으로 가격 정보를 제공합니다. 암호 자산, 외환 및 상품 전반에 걸친 196개 이상의 심볼에 대한 실시간 가격 정보를 제공합니다.
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

Polygon에 있는 개발자 구축은 이제 Band Protocol의 분산 오라클 인프라를 활용할 수 있습니다. 이제 Band Protocol의 오라클을 사용하면 다양한 암호 화폐 가격 데이터에 접근할 수 있으므로 해당 애플리케이션에 연동할 수 있습니다.

## 지원되는 토큰 {#supported-tokens}

현재 지원되는 기호 목록은 [data.bandprotocol.com](http://data.bandprotcool.com)에서 찾을 수 있습니다. 앞으로 이 목록은 개발자 요구 및 커뮤니티 피드백을 토대로 하여 계속 확장될 것입니다.

## 가격 쌍 {#price-pairs}

기준 및 상대 기호를 데이터세트가 지원하는 한, 다음 방법은 모든 기본/상대 토큰 쌍의 조합에서 작동합니다.

### 가격 쿼리 {#querying-prices}

현재 개발자가 Band Protocol에서 가격을 질의하는 두 가지 방법이 있습니다. Band의 스마트 계약을 Polygon과 [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)자바스크립트 도우미 라이브러리를 통해 Band의 `StdReference`스마트 계약을 통해

### Solidity 스마트 계약 {#solidity-smart-contract}

Band Protocol의 오라클에서 가격을 질의하려면 스마트 계약이 Band의 `StdReference`계약, 특히 `getReferenceData`기술과 방법을 참조해야 `getReferenceDatabulk`합니다.

`getReferenceData`각각 `base`입력과 `quote`기호로서 두 개의 문자열을 각각 사용합니다. 그런 다음 `StdReference` 계약을 쿼리하여 해당 두 토큰의 최신 가격 비율을 확인하고 아래와 같이 `ReferenceData` 구조체를 반환합니다.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk`는 대신 두 개의 목록(`base` 토큰 중 하나와 `quotes` 중 하나)을 수신합니다. 그런 다음 각 인덱스에서 각 베이스의 가격을 유사하게 질의하고 다양한 문자열을 `ReferenceData`반환합니다.

예를 들어, `['BTC','BTC','ETH']` 및 `['USD','ETH','BNB']`로 `getReferenceDataBulk`를 호출하면 반환된 `ReferenceData` 배열에는 해당 쌍과 관련된 정보가 포함됩니다.

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## 계약 주소 {#contract-addresses}

| 블록체인 | 계약 주소 |
| -------------------- | :------------------------------------------: |
| Polygon(테스트) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

Band의 노드 헬퍼 라이브러리 [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js)도 유사한 `getReferenceData` 함수를 지원합니다. 이 함수는 하나의 인수를 사용하여 결과를 질의할 수 있습니다. 그런 다음 해당 가격 비율 값 목록을 반환합니다.


### 사용 예시 {#example-usage}

아래 코드는 함수의 예제 사용을 보여줍니다.

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

해당 결과는 다음과 같습니다.

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

각 쌍에 대해 다음 정보가 반환됩니다.

- `pair`: 기준/상대 기호 쌍 스트링
- `rate`: 주어진 쌍의 결과 가격 비율
- `updated`: 기준 및 상대 기호가 BandChain에서 마지막으로 업데이트된 때를 기록한 타임 스탬프 `USD`현재 타임스탬프가 될 것입니다.
- `rawRate`: 이 객체는 두 부분으로 구성됩니다.
  - `value`는 실제 가격 비율의 `BigInt` 값에 `10^decimals`를 곱한 것입니다.
  - `decimals`는 지수로, 이것을 `rate`에 곱하여 `rawRate`를 얻습니다.

## 사용 예시 {#example-usage-1}

이 [계약](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db)은 Band의 `StdReference` 계약 및 `getReferenceData` 함수를 사용하는 예를 보여줍니다.