---
id: move-stake
title: ステークを移動
description: Polygonネットワークでステークを移動する
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Foundationノードから外部ノードへのステーク移行 {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>

ステーキングUIのステーク機能を使用することで、ファンデーションノードから外部ノードにステークを移動するオプションが与えられます。

ステークをファンデーションノードから外部ノードに移動するのは、1回のトランザクションです。このイベントの期間中に遅延やアンボンディング期間はありません。

なお、ステークの移動は、ファンデーションノードから外部ノードへのみ許可されています。ステークを外部ノードから別の外部ノードに移動する場合は、まずアンボンドして、新しい外部ノードにデリゲートする必要があります。

また、ステーク機能は、ファンデーションノードから外部へのファンドの円滑な移転を確実にするためにPolygonチームが開発した一時的な機能です。ファンデーションノードがオフになるまでアクティブに残ります。

## ステークを移動する方法 {#how-to-move-stake}

[ステーキングを](https://wallet.polygon.technology/staking)動かすには、まずデリゲーターアドレスを使用してステーキングUIにログインする必要があります。

**デリゲーターアドレス** : ファンデーションノードでのステーキングにすでに使用したアドレス。

ログインするとバリデータが表示されます。

<img src={useBaseUrl("img/staking/validator-list.png")} />

次に、デリゲーターのプロフィールに移動します。デリゲーター**の詳細**を表示ボタンまたは左側にある**マイデリゲーターの詳細**オプションをクリックします。

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

ここに**、ステークを移動**するという新しいボタンがあります。

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

ボタンをクリックすると、デリゲートできるバリデータのリストがページに移動します。このリストの任意のバリデータにデリゲートすることができます。

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

委任するバリデータを選択した後、**[**委任する]ボタンをクリックします。そのボタンをクリックすると、ポップアップウィンドウが開きます。

<img src={useBaseUrl("img/staking/stake-funds.png")} />

ここに、委任のための全額が自動的に入力される**Amount**フィールドが表示されます。額の一部を使用してバリデータにデリゲートすることもできます。

例えば、ファンデーションノード1に100 Maticトークンをデリゲートし、ファンデーションノードから外部ノードにステークを移動させたい場合、選択した外部ノードに一部、例えば50 Maticトークンをデリゲートすることができます。残りの50個のMaticトークンは、ファンデーションノード1上に残ります。その後、残りの50トークンを別の外部ノードにデリゲートするか、同じ外部ノードにデリゲートするかを選択することができます。

金額を入力したら、**ステークファンド**ボタンをクリックすることができます。すると、アドレスに署名するために、Metamaskの確認を求められます。

トランザクションに署名するとステークがファンデーションノードから外部ノードに正常に移行するようになります。しかし、ステーキングUIに反映待機するためには、12ブロックの確認を待機する必要があります。12ブロック確認後、移動した資金が表示されない場合は、一度ページを更新して、更新されたステークを確認してみてください。

質問や問題があれば、[here](https://support.polygon.technology/support/home)からチケットを送信してください。
