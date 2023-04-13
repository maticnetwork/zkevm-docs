---
id: bandstandarddataset
title: バンド標準のデータセット
sidebar_label: Standard Dataset
description: バンドスタードデータセットは、暗号資産、外国為替、商品にわたる196以上のシンボルを超えるリアルタイムで価格情報を提供しています。
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

Polygonを構築しているデベロッパーは、Band Protocolの分散型オラクルインフラストラクチャーを活用できるようになりました。バンドプロトコルがオラクルすることで、さまざまな暗号通貨価格データにアクセスしてアプリケーションに統合することができます。

## サポートされているトークン {#supported-tokens}

現在、サポートされているシンボルのリストは、[data.bandprotocol.com](http://data.bandprotcool.com)にあります。今後、このリストは開発者のニーズとコミュニティのフィードバックに基づいて拡大し続けます。

## 価格ペア {#price-pairs}

以下のメソッドは、ベースシンボルとクォートシンボルがデータセットでサポートされている限り、ベーストークンとクォートトークンのペアの任意の組み合わせで機能します。

### 価格をクエリする {#querying-prices}

現在、開発者がBandプロトコルから価格をクエリする方法は2つあります：Polygon上のBandの`StdReference`スマートコントラクトと、Java[`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)Scriptヘルパーライブラリーを介した。

### Solidityスマートコントラクト {#solidity-smart-contract}

バンドプロトコルから価格をクエリするには、スマートコントラクトがバンドのコントラクト`StdReference`、特に方法`getReferenceData`を参照する必要があります`getReferenceDatabulk`。

`getReferenceData`入力`base`と`quote`シンボルとして2つの文字列を取ります。次に、これら2つのトークンの最新レートについて、`StdReference`コントラクトをクエリし、以下に示す`ReferenceData`構造体を返します。

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk`は、2つのリストを取得する代わりに、`base`トークンのリストを1つと`quotes`のリストを1つ取得します。次に、各インデックスでベース/クォートペアごとの価格をクエリし、一連の`ReferenceData`構造体を返します。

たとえば、`['BTC','BTC','ETH']`と`['USD','ETH','BNB']`で`getReferenceDataBulk`を呼び出すと、返される`ReferenceData`配列にはペアに関する情報が含まれます。

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## コントラクトのアドレス {#contract-addresses}

| ブロックチェーン | コントラクトアドレス |
| -------------------- | :------------------------------------------: |
| Polygon（テスト） | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

Bandのノードヘルパーライブラリ[`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js)も同様の`getReferenceData`機能をサポートしています。この関数は、結果をクエリするためのトークンペアの一覧をひとつとします。次に、対応するレート値のリストを返します。


### 使用例 {#example-usage}

下記のコードは、関数の使用例を示しています：

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

対応する結果は次のとおりです：

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

各ペアについて、次の情報が返されます：

- `pair`: ベース/クォート記号のペア文字列
- `rate`: 指定されたペアの結果レート
- `updated`: BandChain でベースシンボルとクォートシンボルが最後に更新されたタイムスタンプ。`USD`現在のタイムスタンプとなります。
- `rawRate`: このオブジェクトは2つの部分で構成されています。
  - `value`は、実際のレートに`10^decimals`を乗じた`BigInt`の値です。
  - `decimals`は、`rawRate`を得るために、`rate`·掛けて得た指数です。

## 使用例 {#example-usage-1}

この[コントラクト](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db)は、Bandの`StdReference`コントラクトと`getReferenceData`機能の使用例を示しています。