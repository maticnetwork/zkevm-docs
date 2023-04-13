---
id: new-to-polygon
title: Polygonへようこそ
description: Polygonで次のブロックチェーンアプリを構築する
keywords:
  - docs
  - matic
  - polygon
  - new to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Polygonへようこそ {#welcome-to-polygon}

Polygonはパブリックブロックチェーンのためのスケーリングソリューションです。Polygon PoSは、既存のすべてのEthereumのツールをサポートし、より高速で安価なトランザクションを提供します。

## Polygonでのインタラクションの種類 {#types-of-interaction-on-polygon}

* [Polygon PoSチェーン](/docs/develop/getting-started)
* [Ethereum + Polygon（PoSブリッジを使用）](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/getting-started)
* [Ethereum + Polygon（Plasmaブリッジを使用）](https://docs.polygon.technology/docs/develop/ethereum-polygon/plasma/getting-started)

## ブロックチェーンへの問い合わせ {#query-the-blockchain}

ほとんどのブロックチェーンとのやり取りは、ステートを読み込むことになります。

Alchemyはブロックチェーンへの基本的なリクエストを行う方法についての参考文献を提供しています。[Polygonをクエリする方法](https://docs.alchemy.com/reference/polygon-sdk-examples)についてのガイドを参照してください。

## スマートコントラクトのデプロイ {#deploy-smart-contracts}

* Polygonにコントラクトをデプロイする
    - [Alchemyを使用する](/docs/develop/alchemy)
    - [Chainstackを使用する](/docs/develop/chainstack)
    - [QuickNodeを使用する](/docs/develop/quicknode)
    - [Remixを使用する](/docs/develop/remix)
    - [Truffleを使用する](/docs/develop/truffle)
    - [Hardhatを使用する](/docs/develop/hardhat)

:::note

Web3 RPC-URLを「https://rpc-mumbai.matic.today」に設定し、他のすべてのものは同じです。

:::

## ブロックチェーンとは何ですか？ {#what-is-a-blockchain}

簡単に言えば、ブロックチェーンはトランザクションを記録し、資産を追跡し、信頼を構築するために共有されるイミュータブルな台帳です。詳細については、[Blockchain Basics（ブロックチェーンの基本）](blockchain-basics/basics-blockchain.md)をご覧ください。

## サイドチェーンとは何ですか？ {#what-is-a-sidechain}

サイドチェーンは、メインチェーンとの間で資産を移すことができる「親」ブロックチェーンのクローンであると考えてください。親チェーンに代わるものであり、ブロックを作成する独自のメカニズム（コンセンサスメカニズム）を持つ新しいブロックチェーンを作成します。サイドチェーンを親チェーンに接続するには、チェーン間で資産を移動させる方法を設定する必要があります。

## バリデータとデリゲータの役割 {#validator-and-delegator-roles}

Polygonネットワークでは、バリデータまたはデリゲータになることができます。参照：

* [バリデータとは何ですか](/docs/maintain/polygon-basics/who-is-validator)
* [デリゲータとは何ですか](/docs/maintain/polygon-basics/who-is-delegator)

## アーキテクチャ {#architecture}

バリデータになることが目標である場合、Polygonアーキテクチャを理解することが不可欠です。

[Polygonアーキテクチャ](/docs/maintain/validator/architecture)を参照してください。

### コンポーネント {#components}

Polygonアーキテクチャを詳しく理解するには、コアコンポーネントを参照してください。

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [コントラクト](/docs/pos/contracts/stakingmanager)

#### コードベース {#codebases}

コアコンポーネントを詳しく理解するには、コードベースを参照してください。

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contracts](https://github.com/maticnetwork/contracts)

## 方法 {#how-tos}

### ノードの設定 {#node-setup}

Polygonメインネットまたはムンバイテストネットでフルノードを実行したい場合は、次の方法をフォローできます。バリデータノードガイド[を実行し](/maintain/validate/run-validator.md)ます。

### ステーキングの操作 {#staking-operations}

* [バリデータステーキングの操作](/docs/maintain/validate/validator-staking-operations)
* [デリゲートする](/docs/maintain/delegate/delegate)

### 外部リソース {#external-resources}
- [最初のdApp](https://www.youtube.com/watch?v=rzvk2kdjr2I)
- [サイドチェーンとチャイルドチェーン](https://hackernoon.com/what-are-sidechains-and-childchains-7202cc9e5994)