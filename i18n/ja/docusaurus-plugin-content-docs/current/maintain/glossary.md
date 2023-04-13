---
id: glossary
title: 用語集
description: 主要なPolygon用語
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## ブロックプロデューサ {#block-producer}

ブロックプロデューサーは[span](#span)のブロックプロデューサーとして機能するために選ばれたアクティブな[validator](#validator)です。

ブロックプロデューサーは、ブロックを作成し、作成したブロックをネットワークにブロードキャストする役割を担っています。

## Bor {#bor}

BorノードはPolygonネットワーク上でブロックを生成するノードです。

Borは[Go Ethereum](https://geth.ethereum.org/)をベースにしています。

## チェックポイントトランザクション {#checkpoint-transaction}

チェックポイントトランザクションは、チェックポイント間隔間の[Bor](#bor)層のブロックのMerkle ルートを含むトランザクションです。

トランザクションは[Heimdall](#heimdall)ノードによってEthereumメインネット上でPolygonステーキングコントラクトにコミットします。

こちらも参照してください：

* [Heimdall アーキテクチャ: チェックポイント](/docs/pos/heimdall/checkpoint)
* [チェックポイントメカニズム](/docs/maintain/validator/core-components/checkpoint-mechanism)

## 手数料 {#commission}

手数料とは[バリデータ](#validator)が、バリデータとともにステークをする[デリゲータ](#delegator)から取る報酬の割合のことです。

See also [Validator Commission Operations](/docs/maintain/validate/validator-commission-operations)も参照してください。

## デリゲータ {#delegator}

デリゲータロールはMaticトークン既存の[validators](#validator)Polygonネットワークを安全な状態で保持するためにステークスをステークします。

[Who Is a Delegator](/docs/maintain/polygon-basics/who-is-delegator)も参照してください。

## ノードフル {#full-node}

フルノードは [Heimdall](#heimdall) と [Bor](#bor)　の両方を実行する完全に同期した[sentry node](#sentry)です。

[Full Node Deployment](/docs/develop/network-details/full-node-deployment)も参照してください。

## Heimdall {#heimdall}

HeimdallノードはEthereum Mainnetと並行して実行されるノードで、Ethereum Mainnetにデプロイした契約のセットを監視し、Ethereum MainnetにPolygonネットワーク[checkpoints](#checkpoint-transaction)をコミットします。

Heimdallは[Tendermint](https://tendermint.com/)に基づいています。

## 所有者アドレス {#owner-address}

所有者アドレスとは、Ethereum mainnet上でステーク、リステイク、署名者アドレスの変更、報酬の引き出し、デリゲーション関連のパラメータを管理するために使用するアドレスのことです。

[signer key](#signer-address)はノードに保管され、**hot**ウォレットとみなされるのに対し、所有者の鍵は非常に安全に保管されなければならず、使用頻度も少ないため、**cold**ウォレットとみなされます。

[鍵管理](validator/core-components/key-management.md)も参照してください。

## プロポーザー {#proposer}

プロポーザは、新しいブロックを提案するためにアルゴリズムによって選ばれた[validator](#validator)です。

プロポーザーはチェックポイントのためにすべての署名を収集し、EEthereum Mainnetに[チェックポイント](#checkpoint-transaction)をコミットする責任のある役割を果たします。

## Sentry {#sentry}

セントリーノードとは、[Heimdall](#heimdall)ノードと[Bor](#bor)ノードの両方が動作するノードで、ネットワーク上の他のノードからデータをダウンロードし、[validator](#validator)データをネットワーク上に伝播させるためのノードです。

Sentryノードは、ネットワーク上の他のすべてのSentryノードに対して開かれています。

## スパン {#span}

論理的に定義したブロックのセットは、利用可能なすべての[validators](#validator)からバリデーターのセットが選ばれる。

各スパンの選択はステーキングパワーの面でバリデーターの少なくとも2/3によって決定されます。

[Bor Consensus: Span](/docs/pos/bor/consensus.md#span)も参照してください。

## ステーキング {#staking}

ステーキングプロセスはブロックチェーン上でバリデートとブロックを作成する権利を獲得するために預け入れにトークンをロックアップするプロセスです。通常、ネットワーク用のネイティブトークンでステーキングを行うことができます。MATICトークンがPolygonネットワーク内のバリデータ／ステーカーによってロックされるためです。その他の例としては、EthereumでのETH（マージ後の）、CosmosでのATOMなどがあります。

[What Is Proof of Stake](polygon-basics/what-is-proof-of-stake.md)（プルーフ・オブ・ステークとは何ですか？）も参照してください。

## 署名アドレス {#signer-address}

 署名アドレスは[Heimdall](#heimdall)バリデータノードのEthereumアカウントのアドレスです。.署名アドレスは[checkpoint transactions](#checkpoint-transaction)を署名して送信します。

signer keyは**ノードに**保管され、hotウォレットと[みなされるのに対し](#owner-address)、所有者の鍵は非常に安全に保管**されなけ**ればならず、使用頻度も少ないため、coldウォレットとみなされます。

[鍵管理](validator/core-components/key-management.md)も参照してください。

## バリデータ {#validator}

バリデータは、Ethereumメインネットに展開されたステーキングコントラクトを介して[MATIC](/docs/maintain/validate/validator-staking-operations)トークンをステークし、[Heimdall](#heimdall)ノードと[Bor](#bor)ノードの両方を実行して、Ethereumメインネットにネットワークチェックポイントをコミットし、ネットワーク上でブロックを生成します。

バリデータノードは[sentry](#sentry)に開くだけで、ネットワーク残りの部分に閉じられます。

[Who Is a Validator](polygon-basics/who-is-validator.md)も参照してください。
