---
title: Tellor
description: "TellorのオラクルをPolygon契約に統合する方法についてのガイドです。"
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellorは、単純な暗号通貨経済のインセンティブによって保護された、検閲に強いデータを提供するオラクルです。誰でもデータを提供でき、誰でもチェックできます。Tellorの柔軟な構造により、任意の時間間隔で、任意のデータを提供できるため、実験や革新が容易になります。

## （ソフトウエア）前提条件 {#soft-prerequisites}

オラクルの側面に焦点を当てるために、コーディングスキルレベルについて、次のことを仮定しています。

仮定：

- ターミナルをナビゲートできること
- npmがインストールされていること
- npmを使用して依存関係を管理する方法を知っている

Tellorは、オープンソースのライブオラクルであり、実装の準備ができています。この初心者のガイドは、Tellorで立ち上げて実行できる簡単な説明を示しています。このプロジェクトに完全に分散型で検閲に抵抗するオラクルを提供することができます。

## 概要 {#overview}

Tellorは、当事者がオフチェーンデータポイント（BTC/USD など）のバリューを要求できるオラクルシステムであり、レポータは、競合して、このバリューを、すべてのPolygonスマートコントラクトでアクセスできるオンチェーンデータバンクに追加します。このデータバンクへの入力は、ステークされたレポーターのネットワークによって保護されています。Tellor は、暗号通貨経済のインセンティブメカニズムを利用します。レポーターによる誠実なデーデータ送信は、Tellorのトークンが発行されることで報酬を与えられます。悪意のある人物は、紛争メカニズムによって迅速に処罰され、ネットワークから削除されます。

このチュートリアルでは、次のステップに移動します：

- 起動して実行するために必要な初期ツールキットをセットアップします。
- 簡単な例について説明します。
- 現在、Tellorをテストできるネットワークのテストネットアドレスを一覧表示します。

## UsingTellor {#usingtellor}

最初に、Tellorをオラクルとして使用するために必要な基本ツールをインストールします。[このパッケージ](https://github.com/tellor-io/usingtellor)を使用して、Tellerユーザコントラクトをインストールします。

`npm install usingtellor`

これをインストールすると、コントラクトがコントラクト「UsingTellor」から機能を継承できるようになります。

素晴らしい！ツールの準備が整ったので、ビットコインの価格を取得する簡単な演習を行いましょう。

### BTC/USDの例 {#btc-usd-example}

UsingTellorコントラクトを継承し、Tellerアドレスをコンストラクターの引数として渡します。

例は、次のとおりです：

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## アドレス： {#addresses}

Tellorのトリビュート：[`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle：[`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### 最初にテストを行いますか?： {#looking-to-do-some-testing-first}

Polygon Mumbaiテストネット[`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

テストのトリビュート：[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

テストトークンが必要ですか。[「@trbfaucet」](https://twitter.com/trbfaucet)でツイートしてください。

使いやすいため、UsingTellorレポートには、統合を容易にするための[Tellor Playgroundコントラクト](https://github.com/tellor-io/TellorPlayground)のバージョンが付属しています。役に立つ機能の一覧は[こちら](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)を参照してください。

#### Tellorオラクルのより堅牢な実装については、利用可能な機能のフルリスト[ここ](https://github.com/tellor-io/usingtellor/blob/master/README.md)をチェックしてください。

#### まだ質問がありますか。こちらでコミュニティに参加[してください！](https://discord.gg/tellor)
