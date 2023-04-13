---
id: heimdall-chain
title: Heimdallチェーン
description: Polygonネットワーク上の証明レイヤー
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Heimdallは、Plasmaブロックの表現をEthereumメインネットに[チェックポイント](/docs/maintain/glossary.md#checkpoint-transaction)する責任を負うプルーフ・オブ・ステーク検証レイヤーです。Heimdallは[Tendermint](https://tendermint.com/)に基づいています。

Ethereumメインネット上のステーキングコントラクトはHeimdallノードと連携して、PoSエンジンのためのトラストレスなステーク管理メカニズムとして機能し、[バリデータ](/docs/maintain/glossary.md#validator)セットの選択やバリデータの更新などが含まれます。ステーキングがEthereumメインネット上のコントラクトで行われるため、Polygonはバリデータの正直さだけに依存することなく、代わりにEthereumメインネットのセキュリティを継承します。

Heimdallレイヤーは、[Bor](/docs/maintain/glossary.md#bor)によって生成されたブロックを集約して1つのMerkleツリーとして処理し、そのMerkleルートを定期的にEthereumメインネットに公開します。この定期的な公開は*チェックポイント*と呼ばれています。

Borの数ブロックごとに1つのバリデータ（Heimdallレイヤー上）が

1. 最後のチェックポイント以降のすべてのブロックを検証します。
2. ブロックハッシュのMerkleツリーを作成します。
3. EthereumメインネットにMerkleルートを公開します。

チェックポイントは以下の2つの理由から重要です。

1. ルートチェーンに最終的状態を提供します。
2. 資産の引き出し時にプルーフ・オブ・バーン（PoB）を提供します。

プロセスの概要：

* プールからアクティブなバリデータのサブセットが選ばれ、[スパン](/docs/maintain/glossary.md#span)のための[ブロックプロデューサ](/docs/maintain/glossary.md#block-producer)として機能します。これらのブロックプロデューサはブロックの作成とネットワーク上で作成されたブロックをブロードキャストする責任があります。
* チェックポイントには、任意の間隔で作成されたすべてのブロックのMerkleルートハッシュが含まれます。すべてのノードが同じMerkleルートハッシュをバリデートし、署名を添付します。
* バリデータセットから選ばれた[プロポーザー](/docs/maintain/glossary.md#proposer)には、一つのチェックポイントごとにすべての署名を収集し、Ethereumメインネット上でチェックポイントにコミットする責任があります。
* ブロックの作成とチェックポイントの提案についての責任の度合は、プール全体でのバリデータのステークレシオによって異なります。

 [Heimdallアーキテクチャ](/docs/pos/heimdall/overview)も参照してください。
