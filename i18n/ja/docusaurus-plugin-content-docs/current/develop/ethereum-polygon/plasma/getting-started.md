---
id: getting-started
title: Plasmaブリッジ
sidebar_label: Introduction
description: PlasmaブリッジやPolygonネットワークとやり取ります。
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

最新の[PlasmaのMaticドキュメント](https://maticnetwork.github.io/matic.js/docs/plasma/)をチェックして始めましょう。

ブリッジは、基本的に、ルートチェーンから子チェーンに資産を移動させるのに役立つ一連のコントラクトです。EthereumとPolygonの間で資産を移動させるための2つのブリッジが主にあります。1つは、Plasmaブリッジで、もう1つは、**PoSブリッジ**または**プルーフ・オブ・ステーク（PoS）ブリッジ**と呼ばれます。**Plasmaブリッジ**は、Plasmaの出口メカニズムによりセキュリティ保証を強化します。

ただし、子トークンには特定の制限があります。Plasmaブリッジ上のPolygonからEthereumへのすべての終了/引き出しに関連して7日間の引き出し期間があります。[PoSブリッジ](/docs/develop/ethereum-polygon/pos/getting-started)は、より柔軟で、より迅速な引き出しが特徴です。

このチュートリアルでは、Polygonネットワーク上のPlasmaブリッジと対話する最も簡単な方法である[Matic JS](https://github.com/maticnetwork/matic.js)を使用してPlasmaブリッジを理解し使用するためのステップバイステップのガイドとして機能します。

## Plasmaブリッジでの資産フロー {#assets-flow-in-plasma-bridge}

このチュートリアルでは、Polygonでの資産転送のフローと、Matic.jsを使用して同じことを行う方法を紹介します。

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. ユーザーは、メインチェーン上のPolygonコントラクトに暗号資産を預けています。
2. 入金されたトークンがメインチェーンで確認されると、対応するトークンがPolygonチェーンに反映されます。
   - ユーザは、ごくわずかな手数料で、必要な人に即座にトークンを転送できるようになりました。Polygonチェーンには、より高速なブロック（約1秒）があります。転送はほぼ瞬時に行われます。
3. ユーザーが準備できたら、メインチェーンから残りのトークンを引き出すことができます。ファンド引き出しは、Plasmaサイドチェーンから開始されます。チェックポイントは5分間隔で設定され、Polygonブロックレイヤー上にある、前回のチェックポイント以降のすべてのブロックが検証されます。
4. メインチェーンEthereumコントラクトにチェックポイントが送信されると、Exit NFT（ERC721）トークンが同等の値で作成されます。
5. 引き出された資金は、プロセス終了手続きを使用してメインチェーンコントラクトからEthereumのアカウントに戻すことができます。
   - ユーザを介して0倍またはダーマ（近日公開！）を終了する高速終了もできます。

### 前提条件： {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Görli Faucet {#görli-faucet}

また、取引を行うには、チュートリアルに沿って使用するテストアカウントにいくつかのエーテルが必要です。GörliにETHがない場合には、ここで提供されている蛇口リンク（https://goerli-faucet.slock.it/）を使用することができます。

### Polygon Faucet {#polygon-faucet}

このチュートリアルでは、Görliネットワーク上のERC20トークン`TEST`を例にして説明します。これはテストトークンです。DAppでは、これを任意のERC20トークンに置き換えることができます。Polygonネットワーク上のテストトークン`TEST`を取得するには、[Polygon Faucet](https://faucet.polygon.technology/)にアクセスします

:::note

入出金に独自のトークンを使用するには、トークンが「マッピング」される必要があります。つまり、本質的にメインチェーンでコントラクトをするという意味であり、カスタムトークンに「認識」することができます。

:::

### MetaMaskウォレット（オプション）の基本設定 {#basic-setup-for-the-metamask-wallet-optional}

1. [ウォレットを作成する](/docs/develop/metamask/hello)：ウォレットを初めて使用する場合は、MetaMaskアカウントを設定します。
2. [Polygonテストネットを設定](/docs/develop/metamask/config-polygon-on-metamask)する：Polygon上の資金の流れを簡単に見えるようにするには、MetaMaskでPolygonテストネットを設定する場合に有益です。ここでは、視覚化のみを目的として Metamaskを使用していることに注意してください。Polygonを使用するためにMetamaskを使用する必要はまったくありません。
3. [複数のアカウントを作成する](/docs/develop/metamask/multiple-accounts)：チュートリアルから始める前に、3つのEthereumテストアカウントを準備してください。
4. [Polygon上でトークンを設定する](/docs/develop/metamask/custom-tokens)：Polygon上で簡単にファンドの流れを表示するために、Matic.jsを使用して、Metamask上でトークンを構成できます。このチュートリアルでは、`TEST`トークンがMetaMaskで構成され、アカウント残高を容易に可視化することができます。もう一度、これは**オプション**です。[web3.js](https://web3js.readthedocs.io/en/1.0/)を使用してトークン残高やその他の変数を簡単にクエリすることができます。
