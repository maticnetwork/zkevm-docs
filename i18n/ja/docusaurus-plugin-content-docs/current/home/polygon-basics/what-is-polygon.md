---
id: what-is-polygon
title: Polygonとは。
description: Polygonスケーリングソリューションについて学ぶ
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/)は、オフチェーンの計算およびプルーフ・オブ・ステーク（PoS）バリデータの分散型ネットワーク用のサイドチェーンを使用することで、スケーリングを実現するレイヤー2のスケーリングソリューションです。

Polygonは分散化、既存のデベロッパーコミュニティ、エコシステムの活用に妥協することなく、スケーラビリティとユーザビリティの課題を解決するよう努めています。dAppsとユーザーの機能にスケーラビリティと優れたユーザーエクスペリエンスを提供することで、既存のプラットフォームを改善することを目指しています。

パブリックブロックチェーンのためのスケーリングソリューションです。Polygon PoSは、既存のすべてのEthereumツールをサポートし、高速で安価なトランザクションを提供します。

## 主要な機能とハイライト {#key-features-highlights}

- **スケーラビリティ**：Polygonサイドチェーンの高速、低コスト、安全なトランザクションを提供し、メインチェーンおよび最初の互換性のあるレイヤー1ベースチェーンとしてのEthereumでファイナリティを達成します。
- **高スループット**：内部テストネット上の単一サイドチェーンで最大10,000TPSを達成、水平方向のスケーリングのために追加する複数のチェーン。
- **ユーザーエクスペリエンス**：メインチェーンからPolygonチェーンまで、スムーズなユーザーエクスペリエンスおよび開発の抽象化、WalletConnectサポートによるネイティブモバイルアプリおよびSDK。
- **セキュリティ**：Polygonチェーンオペレータは、それ自体がPoSシステムにおけるステーカーです。
- **パブリックサイドチェーン**：Polygonサイドチェーンは、（個別のdAppチェーンに対し）パブリックの性質をもち、パーミッションレスで複数のプロトコルをサポートできます。

Polygonシステムは、EVMが有効化されているPolygonサイドチェーンで、任意の状態遷移をサポートすることを意図して設計されました。

## デリゲータおよびバリデータロール {#delegator-and-validator-roles}

デリゲータまたはバリデータとしてPolygonネットワークに参加することができます。参照：

* [バリデータとは何ですか](/docs/maintain/polygon-basics/who-is-validator)
* [デリゲータとは ](/docs/maintain/polygon-basics/who-is-delegator)

## アーキテクチャ {#architecture}

バリデータになることが目標である場合、Polygonアーキテクチャを理解することが不可欠です。

詳細な情報につきましては、[Polygonアーキテクチャ](/docs/maintain/validator/architecture)を参照してください。

### コンポーネント {#components}

Polygonのアーキテクチャを詳しく理解するには、コアコンポーネントを確認してください：

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [コントラクト](/docs/pos/contracts/stakingmanager)

#### コードベース {#codebases}

コアコンポーネントを詳しく理解するには、次のコードベースを参照してください：

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contracts](https://github.com/maticnetwork/contracts)

## 方法 {#how-tos}

### ノードの設定 {#node-setup}

Polygonメインネットまたはムンバイテストネットでフルノードを実行したい場合は、次の方法をフォローできます。バリデータノードガイド[を実行し](/maintain/validate/run-validator.md)ます。

### ステーキングの操作 {#staking-operations}

バイデータおよびデリゲータプロファイルのために、ステーキングプロセスを実行する方法を確認する：

* [バリデータステーキングの操作](docs/maintain/validate/validator-staking-operations)
* [デリゲートする](/docs/maintain/delegate/delegate)
