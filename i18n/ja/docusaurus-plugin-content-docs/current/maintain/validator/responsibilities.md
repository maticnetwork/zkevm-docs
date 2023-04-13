---
id: responsibilities
title: 責任
description: Polygonネットワーク上のバリデータであることの責任
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 内情に精通し続けましょう。

[Polygon通知](https://polygon.technology/notifications/)グループを購読して、Polygonチームとコミュニティからの最新のノードとバリデーターの更新を把握してください。

:::

ブロックチェーンバリデータはブロックチェーン内で取引をバリデートする責任のある人です。Polygonネットワークでは、**バリデータノード（Sentry + Validator）**を実行して報酬を獲得し、トランザクション手数料を徴収することで、参加者であれば、Polygonのバリデータになることができます。バリデータが良好に参加できるため、エコシステムのステークとして少なくともMaticトークン1台をロックアップします。

:::info

現在、1回に100人のアクティブバリデータが制限されています。バリデータとは何ですか？詳細な説明はバリデータを参照してください[。](/maintain/validator/architecture)

また、[<ins>PIP4ガバナンス提案</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956)がコントラクトレベルで実施された後、最低ステーキング量は10,000 MATICに増加します。

:::

Polygonネットワーク上の[バリデータ](/maintain/glossary.md#validator)には、以下の責任があります。

* テクニカルノード操作（ノードによって自動的に実行）
* 操作
  * 高い稼働時間を維持
  * ノード関連のサービスとプロセスを毎日確認する
  * ノードモニタリング実行
  * 署名者のアドレスにETH残高を（0.5～1）保管する
* デリゲーション
  * 委任を受け入れます。
  * 手数料率を伝達します。
* コミュニケーション
  * 問題を伝達します。
  * フィードバックや提案を提供します。
* ブロックチェーン上のバリデートブロックのためのステーキング報酬を獲得する

## 技術的なノード操作 {#technical-node-operations}

次のテクニカルノード操作は**、ノードによって自動的に実行**されます：

* ブロックプロデューサ選択
  * 各 [スパン](/docs/maintain/glossary.md#span)　について、ブロックプロデューサのセットのためにバリデータのサブセットを選択します。
  * 各スパンについて[Heimdall](/maintain/glossary.md#heimdall)上で再び設定されたブロックプロデューサを選択し、選択情報を定期的に[Bor](/maintain/glossary.md#bor)に送信します。

* Bor上のブロックを検証します。
  * Borサイドチェーンブロックのセットについて、各バリデータはこれらのブロックのデータを個別に読み取り、データをHeimdall上で検証します。
* チェックポイント送信
  * Heimdallブロックごとに、[プロポーザー](/maintain/glossary.md#proposer)がバリデータの中から選ばれます。[チェックポイント](/maintain/glossary.md#checkpoint-transaction)プロポーザーは、Borブロックデータのチェックポイントを作成し、検証し、他のバリデータが同意するように署名されたトランザクションをブロードキャストします。
  * アクティブなバリデータの2/3以上がチェックポイントについてコンセンサスに達した場合、チェックポイントはEthereumメインネットに送信されます。
* Ethereum上でPolygonステーキングコントラクトの変更を同期する：
  * チェックポイント送信ステップから継続します。これが外部ネットワーク呼び出しであるため、Ethereum上のチェックポイントトランザクションは、Ethereumの混雑問題のために確認されるかされないか、または保留中である可能性があります。
  * この場合、次のチェックポイントに前のBorブロックのスナップショットも含まれるようにするための`ack/no-ack`プロセスがあります。例えば、チェックポイント1がBorブロック1-256に対するもので、それが何らかの理由で失敗した場合、次のチェックポイント2はBorブロック1-512に対するものになります。[Heimdall architecture: Checkpoint](/pos/heimdall/checkpoint)も参照してください。
* EthereumメインネットからBorサイドチェーンにSync状態：
  * コントラクト状態はEthereumとPolygonの間で移動できて、特に[Bor](/maintain/glossary.md#bor)を経由します。
  * Ethereum上のDAppコントラクトはEthereum上の特別Polygonコントラクト上の機能を呼び出します。
  * 該当するイベントはHeimdallにそれからBorに中継されます。
  * Polygonスマートコントラクト上で状態同期トランザクションが呼び出され、DAppはBor自身の関数呼び出しを介してBor上の値を取得することができます。
  * 同様のメカニズムはPolygonからEthereumに状態を送信するために設置されています。[State Sync Mechanism](/docs/pos/state-sync/state-sync)も参照してください。

## 操作 {#operations}

### 高い稼働時間を維持 {#maintain-high-uptime}

Polygonネットワーク上のノードの稼働時間はバリデータノードが署名した[チェックポイントトランザクション](/docs/maintain/glossary.md#checkpoint-transaction)の数に基づきます。

約34分ごとに、プロポーザーはチェックポイントトランザクションをEthereumメインネットに送信します。チェックポイントトランザクションは、Polygonネットワーク上のすべての[バリデータ](/maintain/glossary.md#validator)によって署名する必要があります。**チェックポイントに署名しないと、バリデータノードパフォーマンスが低下します。**

チェックポイントトランザクションの署名プロセスは自動化されます。バリデータノードがすべてのチェックポイントトランザクションに署名していることを確認するには、ノード健在性を維持および監視する必要があります。

### ノードサービスとプロセスを毎日チェック {#check-node-services-and-processes-daily}

[Heimdall](/maintain/glossary.md#heimdall)と[Bor](/maintain/glossary.md#bor)に関連するサービスとプロセスを毎日チェックする必要があります。また、ディスクの使用量を減らすために、ノードのプルーニングを定期的に行う必要があります。

### ノードモニタリング実行 {#run-node-monitoring}

どちらか実行する必要があります。

* Polygonが提供するGrafanaダッシュボードGitHubリポジトリを参照してください：[Matic-Jagarの設定](https://github.com/vitwit/matic-jagar)
* または、[バリデータ](/maintain/glossary.md#validator)と[セントリーノード](/maintain/glossary.md#sentry)のために独自の監視ツールを使用してください。
* ノードで使用されるEthereumエンドポイントは、リクエスト制限内にあることを確認するために監視する必要があります。

### ETH残高を維持します。 {#keep-an-eth-balance}

Ethereumメインネット上のバリデータ[署名者アドレス](/maintain/glossary.md#signer-address)で、ETHを十分に維持する必要があります（常に閾値を0.5から1に近いものにする必要があります）。

ETHが必要な理由

* Ethereumメインネット上に提出された[チェックポイントトランザクション](/maintain/glossary.md#checkpoint-transaction)に署名します。
* Ethereumメインネット上でチェックポイントトランザクションを提案、送信します。

署名アドレスに適切な額のETHを維持しないと、次のような結果につながります：

* チェックポイント送信に遅延が発生します。Ethereumネットワーク上のトランザクションガス価格が変動および急騰する恐れがあることに注意しましょう。
* トランザクションの最終的状態の遅延はチェックポイントに含まれます。
* その後のチェックポイントトランザクションに遅延が発生します。

## デリゲーション {#delegation}

### デリゲーションに対してオープンでいましょう。 {#be-open-for-delegation}

すべてのバリデータは、コミュニティからの委任のために開かれなければなりません。各バリデータは自身の手数料率を設定することを選べます。手数料率に上限はありません。

### 手数料率を伝達します。 {#communicate-commission-rates}

コミッションレートとコミッションレートが変更されることをバリデータがコミッションレートに通信する義務です。手数料率を伝達する優先プラットフォームは、次のとおりです。

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)

## コミュニケーション {#communication}

### 問題を伝達します。 {#communicate-issues}

できるだけ早く問題をコミュニティとPolygonチームが問題を早期に修正できるようにします。手数料率を伝達する優先プラットフォームは、次のとおりです。

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### フィードバックや提案を提供します。 {#provide-feedback-and-suggestions}

Polygonでは、バリデータエコシステムのあらゆる側面について、ご意見やご提案を大切にしています。[Forum](https://forum.polygon.technology/)は、フィードバックや提案をするプラットフォームです。
