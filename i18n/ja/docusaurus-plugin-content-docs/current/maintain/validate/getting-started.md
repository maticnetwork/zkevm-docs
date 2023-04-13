---
id: validator-index
title: バリデータ・インデックス
description: Polygonネットワーク上でバリデータノードを実行および操作する方法に関する手順の集合です。
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 内情に精通し続けましょう。

[Polygon通知](https://polygon.technology/notifications/)を購読して、Polygonチームとコミュニティからの最新のノードとバリデーターの更新を把握してください。

:::

バリデータは、Polygonネットワークを維持するための重要なアクターです。バリデータは、フルノードでセキュアに動作します。
MATICをステーキングしてブロックを生成し、検証し、PoSコンセンサスに参加することで、ネットワークを構築します。

:::info

新しいバリデータを受け付けるスペースに限りがあります。新しいバリデータは、現在アクティブなバリデータがアンボンドしたときにのみ、アクティブセットに加わることができます。

バリデータの交代のための新しい入札プロセスが今後ロールアウトされる予定です。

:::

## 概要 {#overview}

Polygonは以下の3つのレイヤーで構成されています。

* Ethereumレイヤー— EthereEthereum Mainnet上の契約のセット。
* Heimdallレイヤー - Ethereumメインネットと並行して動作するプルーフオブステークHeimdallノードのセットで、Ethereumメインネットに展開されたステーキングコントラクトのセットを監視し、PolygonネットワークチェックポイントをEthereumメインネットにコミットします。HeimdallはTendermintに基づいています。
* Borレイヤー— Heimdallノードによってシャッフルされたブロック生成Borノードのセット。BorはGo Ethereumをベースにしています。

Polygonネットワーク上でバリデーターになるには、実行する必要があります。

* Sentryノード - HeimdallノードとBorノードが動作する別マシン。Sentryノードは、Polygonネットワーク上のすべてのノードに公開されています。
* バリデータノード - HeimdallノードとBorノーノードが動作する別々のマシン。バリデータノードはsentryに開くだけで、ネットワーク残りの部分に閉じられます。
* Ethereumメインネットに展開されているステーキン契約にMATICトークンをステーキングします。

## コンポーネント {#components}

### Heimdall {#heimdall}

Heimdallは次のことを行います。

* Ethereumメインネット上のステーキングコントラクトを監視します。
* Borチェーン上の状態遷移を検証します。
* Borチェーンの状態チェックポイントをEthereumメインネットにコミットします。

HeimdallはTendermintに基づいています。

:::info 関連項目

* GitHubリポジトリ: [Heimdall](https://github.com/maticnetwork/heimdall)
* GitHubリポジトリ:  [ステーキングコントラクト](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* ブログ投稿: [Heimdall and Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Borは次のことを行います。

* Polygonネットワーク上でブロックを生成します。

BorはPolygonネットワーク用のブロックプロデューサーノードレイヤー。Go Ethereumに基づいています。Bor上で生成されたブロックはHHeimdallノードによって検証されます。

:::info 関連項目

* GitHubリポジトリ： [Bor](https://github.com/maticnetwork/bor)
* ブログ投稿: [Heimdall and Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

このセクションでは次のトピックを紹介します。

* [バリデータの責任](validator-responsibilities.md)
* バリデータとしてネットワークに参加します。
  * [Ansibleでノードをスタートして実行する](run-validator-ansible.md)
  * [バイナリでノードをスタートして実行する](run-validator-binaries.md)
  * [バリデータとしてステーキングする](validator-staking-operations.md)
* バリデーターノード維持：
  * [署名アドレスを変更する
  ](change-signer-address.md)
  * [手数料を変更する](validator-commission-operations.md)

コミュニティーサポート

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
