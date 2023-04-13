---
id: proposers-producers-selection
title: プロポーザーとプロデューサー選択
sidebar_label: Proposers & Producers
description: Polygonに関するプロポーザーとブロックプロデューサーの選択
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Borレイヤーのブブロックプロデューサは、定期的な間隔で発生するステークに基づいてバリデータプールから選ばれた委員会です。この間隔は、王朝やネットワークに関するバリデータのガバナンスによって決定されます。

The ratio of [stake](/docs/maintain/glossary.md#staking)の比率は  [block producers](/docs/maintain/glossary.md#block-producer)委員会のメンバーとして選ばれた確率を指定します。

## プロセス選択 {#selection-process}

プールに Alice, Bill, and Clara-3人のバリデータがいると仮定しましょう:

* Aliceは100Maticトークンステーキングしています。
* Billは40Maticトークンをステーキングしています。
* Claraは40MATICトークンをステステーキングしています。

バリデータステークに応じてスロットが与えられます。

Aliceは100MatMaticトークンがステークされた、スロットあたりのコストはバリデータのガバナンスによってメンテナンスされたように10MMaticトークンであるため、Aliceは合計で5スロットを取得します。同様に、BillとClaraは合計で2スロットを取得します。

Alice、Bill、Claraのバリデータは次のスロットを与えられます:

* [A, A, A, A, A, B, B, C, C]

Polygonは、EtherEthereumブロックハッシュをシードとして使用することによって、Alice、Bill、Claraスロットの配列をシャッフルします。

shuffleの結果はスロットの次の配列です:

* [A, B, A, A, C, B, A, A, C]

現在Polygonは、バリデータガバナンスによってメンテナンスされているようにブロックプロデューサカウントに応じて、トップからバリデータを使用します。たとえば、5人のプロデューサのセットでは、スロットの配列は[A, B, A, A, C]です。

次のスパンのプロデューサセットは[A: 3, B:1, C:1]として定義されます。

結果として得られたバリデータセットとTendermintの[proposer selection algorithm](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html)を使用してPolygonはBBor上のあらゆるスプリントのプロデューサを選択します。

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**レジェンド：**

* Dynasty時間: 最後のオークションの終了スタート時間と間の時間。
* Sprint時間間隔: ブロックプロデューサ委員会が選ばれた時間間隔。
* Span: シングルプロデュープロデューサによって生成されたブロックの数。
