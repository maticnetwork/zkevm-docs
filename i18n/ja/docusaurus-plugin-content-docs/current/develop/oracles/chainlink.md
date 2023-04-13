---
id: chainlink
title: チェーンリンク
sidebar_label: Chainlink
description: チェーンリンクは、Ethereum上に構築された分散型ブロックチェーンオラクルネットワークです。
keywords:
  - wiki
  - polygon
  - chainlink
  - oracle
  - decentralized
  - data
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**チェーンリンク**を使用すると**、**分散型のオラクルネットワークを介して、コントラクトが外部データソースにアクセスすることができます。コントラクトにスポーツの結果、最新の天気、またはその他の公開データが必要かどうかに関係なく、チェーンリンクは、コントラクトがそれを使用するために必要なツールを提供します。

## 分散型データ {#decentralized-data}

Chainlinkの最も強力な機能の1つは、すでに分散型、集約型、そして一般的なほとんどの暗号通貨でチェーン上のデータを消化する準備ができています。これらは[**チェーンリンクデータフィード**](https://docs.chain.link/docs/using-chainlink-reference-contracts)と呼ばれています。

以下は、Mumbai テストネットで、MATICの米ドル建て最新価格を取得するコントラクトの動作例です。

必要なのは、必要な[データフィードアドレスと](https://docs.chain.link/docs/matic-addresses#config)交換するだけで、価格情報のダイジェストを始めることができます。

```
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai Testnet
     * Aggregator: MATIC/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

## リクエストと受信サイクル {#request-and-receive-cycle}

チェーンリンクのリクエストと受信サイクルにより、スマートコントラクトは任意の外部APIにリクエストを送信し、レスポンスを消費できます。これを実装するには、コントラクトで、以下の2つの関数を定義する必要があります。

1. **データをご希望**いただく場合、
2. もう1つ**は、応答を受け取る**ことです。

データを要求するには、コントラクトがオークルを提供する`request`オブジェクトを構築します。オラクルがAPIにアクセスして応答を解析すると、スマートコントラクトで定義されたコールバック機能を使用してデータをコントラクトに送り返そうとします。

## 使用方法 {#uses}

1. **チェーンリンクデータフィード**

これらはすでにオンチェーンで集約された分散型データ参照ポイントであり、実際の世界からデータを取得するための最速かつ簡単な方法です。現在、最も人気のある暗号通貨と法定通貨のペアのいくつかをサポートしています。

データフィードを使用するには、チェーンリンクドキュメント[**の**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon)Polygonデータフィードを使用します。

2. **チェーンリンク検証可能なランダムネス機能**

乱数は暗号的にランダムであることが保証されているため、実証的に乱数を取得します。

チェーンリンクVRFを使用するには、[チェーンリンクドキュメント](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number)の[**Polygon VRFアドレス**](https://docs.chain.link/vrf/v2/subscription/supported-networks)を使用してください。

3. **チェーンリンクAPIコール**

従来のAPIで動作するようにスマートコントラクトを設定し、データを取得したり、インターネットでリクエストを送信したりすることができます。

## コード例 {#code-example}

外部APIとやり取りするためには、スマートコントラクトは、リクエストを簡単に処理できるように設計されたコントラクトである、[`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol)からの継承をする必要があります。これは、`Chainlink.Request`と呼ばれる構造体を公開します。これは、コントラクトがAPIリクエストを作成するために使用する必要があります。

リクエストは、オラクルアドレス、ジョブID、料金、アダプターパラメータ、コールバック関数署名を定義する必要があります。この例では、リクエストは、`requestEthereumPrice`機能に組み込まれています。

`fulfill`は、コールバック機能として定義されています。

```
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Polygon Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4";
        fee = 10 ** 16; // 0.01 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestBTCCNYPrice() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // NOTE: If this oracle gets more than 5 requests from this job at a time, it will not return.
        request.add("get", "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo");

       // Set the path to find the desired data in the API response, where the response format is:
       // {
       //     "Realtime Currency Exchange Rate": {
       //       "1. From_Currency Code": "BTC",
       //       "2. From_Currency Name": "Bitcoin",
       //       "3. To_Currency Code": "CNY",
       //       "4. To_Currency Name": "Chinese Yuan",
       //       "5. Exchange Rate": "207838.88814500",
       //       "6. Last Refreshed": "2021-01-26 11:11:07",
       //       "7. Time Zone": "UTC",
       //      "8. Bid Price": "207838.82343000",
       //       "9. Ask Price": "207838.88814500"
       //     }
       //     }
        string[] memory path = new string[](2);
        path[0] = "Realtime Currency Exchange Rate";
        path[1] = "5. Exchange Rate";
        request.addStringArray("path", path);

        // Multiply the result by 10000000000 to remove decimals
        request.addInt("times", 10000000000);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}
```

## メインネットPolygonリンクトークン {#mainnet-polygon-link-token}

EthereumメインネットからメインネットPolygon LINKトークンを取得するには、2ステップの手順に従う必要があります。

1. Plasmaまたは[PoSブリッジ](https://wallet.polygon.technology/bridge)を使用してリンクをブリッジします。
2. チェーンリンクによってデプロイされた[Pegswap](https://pegswap.chain.link/)を介して、ERC677バージョンのリンクをスワップします。

Polygonブリッジは、リンクのERC20バージョンを持ち込みます、また、リンクはERC677であるため、このスワップで更新するだけです。

## アドレス {#addresses}

現在、Polygon Mumbaiテストネットには、稼働中のチェーンリンクオラクルがいくつかあります。いつでも自分で実行して、チェーンリンクマーケットプレイスにリストすることもできます。

* オラクル：[`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* リンク：[`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

MumbaiテストネットでLINKを取得するには、こちらで[Polygonの蛇口](https://faucet.polygon.technology/)にアクセスしてください。

## サポートされているAPI {#supported-apis}

チェーンリンクのリクエストと受信のサイクルは、リクエストパラメータが正しく、応答形式が既知である限り、パブリックAPIを呼び出しするのに十分フレキシブルです。たとえば、取得したいURLからの応答オブジェクトが、以下のようにフォーマットされている場合： `{"USD":243.33}`パスは単純です：`"USD"`。

複雑なJSONオブジェクトでAPIが応答する場合、**パスパラメーター**は、ネストされたオブジェクトにドット区切り文字列を使用して、目的のデータを取得する場所を指定する必要があります。たとえば、次の回答を検討してください：

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

これには、以下のパスが必要です: `"Prices.USD"`。文字列にスペースがある場合、または文字列がかなり長い場合、上記の例で示す構文を使用できます。そこで、すべてを文字列配列として渡します。

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## ジョブIDは何のためのものですか？ {#what-are-job-ids-for}

リクエストを構築する際に、[例](#code-example)が`jobId`パラメーターを使用していることに気付いたかもしれません。ジョブは、オラクルが実行するように構成されている一連の命令で構成されています。上記の[コード例](#code-example)では、コントラクトは、ジョブID：`da20aae0e4c843f6949e5cb3f7cfe8c4`でオラクルにリクエストを行います。この特定のジョブは、以下のことを行うように設定されています：

* GETリクエストを作成する
* JSON応答を解析する
* 値を*x*で掛けた値
* 値を`uint`に変換する
* チェーンに送信する

ですから、コントラクトが、URL、JSON応答内で目的のデータを見つける場所のパス、およびリクエストにかかる時間を、`request.add`ステートメントを使用して追加する理由です。これらの指示は、オラクルではアダプタと呼ばれるものによって促進されます。

**オラクルに対するすべてのリクエストには、特定のジョブIDを含める必要があります。**

Polygon オラクルが実行するように設定されているジョブの一覧は、以下のとおりです。

| 名前 | リターンタイプ | ID | アダプタ |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

完全なチェーンリンクAPIリファレンスは、[こちら](https://docs.chain.link/any-api/api-reference)にあります。
