---
id: architecture
title: アーキテクチャ
description: Ethereum、Heimdall、Borレイヤー
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Polygonネットワークは広く3つのレイヤーに分けられます：

* **Ethereum**レイヤー—Ethereumメインネット上のコントラクトセットです。
* **Heimdall**レイヤー—Ethereumメインネットと並行して実行されるプルーフ・オブ・ステーク・ノードの一連のHeimdallのセット、Ethereumメインネットに展開されたステーキングコントラクトのセットを監視し、EthereumメインネットにPolygonネットワークチェックポイントをコミットする。HeimdallはTendermintに基づいています。
* **Borレイヤー** — Heimdallノードによってシャッフルされたブロック生成Borノードの一連です。BorはGo Ethereumをベースにしています。

<img src={useBaseUrl("img/staking/architecture.png")} />

## Ethereum上のステーキングとPlasmaスマートコントラクト {#staking-and-plasma-smart-contracts-on-ethereum}

Polygonで[プルーフ・オブ・ステーク（PoS）](/docs/home/polygon-basics/what-is-proof-of-stake)メカニズムを可能にするために、システムはEthereumメインネット上で[ステーキング](/docs/maintain/glossary.md#staking)管理コントラクトのセットを採用しています。

ステーキングコントラクトは次の機能を実装しています：

* 誰もがEthereumメインネット上のステーキングコントラクトにMaticトークンをステークし、システムに[バリデータ](/docs/maintain/glossary.md#validator)として参加する能力です。
* Polygonネットワーク上で状態遷移を検証することに対してステーキング報酬を獲得します。
* Ethereumメインネットに[チェックポイント](/docs/maintain/glossary.md#checkpoint-transaction)を保存します。

PoSメカニズムは、Polygonサイドチェーン向けのデータ不可用性の問題を緩和する役割も担います。

## Heimdall（検証レイヤー） {#heimdall-validation-layer}

Heimdallレイヤーは、[Bor](/docs/maintain/glossary.md#bor)によって生成されたブロックを集約して1つのMerkleツリーとして処理し、そのMerkleルートを定期的にルートチェーンに公開します。Borサイドチェーンのスナップショットの定期的な公開は[チェックポイント](/docs/maintain/glossary.md#checkpoint-transaction)と呼ばれています。

Bor上の数ブロックごとに、Heimdallレイヤー上のバリデータは：

1. 最後のチェックポイント以降のすべてのブロックを検証します。
2. ブロックハッシュのMerkleツリーを作成します。
3. MerkleルートハッシュをEthereumメインネットに公開します。

チェックポイントは以下の二つの理由から重要です。

1. ルートチェーンに最終的状態を提供します。
2. 資産の引き出し時にプルーフ・オブ・バーン（PoB）を提供します。

プロセスの概要：

* プールからのアクティブなバリデータのサブセットは、[スパン](/docs/maintain/glossary.md#span)のための[ブロックプロデューサ](/docs/maintain/glossary.md#block-producer)として機能するために選ばれました。これらのブロックプロデューサは、ブロックの作成や作成したブロックをネットワークにブロードキャストする役割を担っています。
* チェックポイントには、任意の間隔で作成されたすべてのブロックのMerkleルートハッシュが含まれます。すべてのノードが同じMerkleルートハッシュをバリデートし、署名を添付します。
* バリデータセットから選ばれた[プロポーザー](/docs/maintain/glossary.md#proposer)には、一つのチェックポイントごとにすべての署名を収集し、Ethereumメインネット上でチェックポイントにコミットする責任があります。
* ブロックの作成とチェックポイントの提案についての責任の度合は、プール全体でのバリデータのステークレシオによって異なります。

 [Heimdallアーキテクチャ](/docs/pos/heimdall/overview)も参照してください。

## Bor（ブロックプロデューサレイヤー） {#bor-block-producer-layer}

BorはPolygonのサイドチェーンブロックプロデューサですートランザクションをブロックへと集約する責任のある存在です。

Borブロックプロデューサはバリデータのサブセットで[Heimdall](/docs/maintain/glossary.md#heimdall)バリデータによって定期的に入れ替えられます。

 [Borアーキテクチャ](/docs/pos/bor/overview)も参照してください。
