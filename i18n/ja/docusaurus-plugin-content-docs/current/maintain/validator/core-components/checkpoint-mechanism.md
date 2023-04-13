---
id: checkpoint-mechanism
title: チェックポイントメカニズム
sidebar_label: Checkpoints
description: システムステートをEthereumメインネットにチェックする
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Polygonはレイヤー1プラットフォームではありません。

Polygonはレイヤー1の決済レイヤーとしてEthereumメインネットに依存します。すべてのステーキングのメカニクスはEthereumメインネット上のコントラクトと同期する必要があります。

:::

チェックポイントのための[プロポーザは](/docs/maintain/glossary.md#proposer)、[Tendermintの加重付きラウンドロビンアルゴリズム](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html)で最初に選択されます。さらなるカスタムチェックがチェックポイント送信成功に基づいて実施されます。これによって、PolygonシステムはTendermintプロポーザー選択とのデカプリングが可能となり、Polygonにプロポーザーの選択をEthereumメインネット上のチェックポイントトランザクションが成功した場合のみに行い、あるいは以前に失敗したチェックポイントに属するブロック向けにチェックポイントトランザクションを送信する能力を提供します。

Tendermintでチェックポイントの送信に成功することは２段階プロセスです：

* ラウンドロビンアルゴリズムを介して選ばれたプロポーザーは、プロポーザーのアドレスとプロポーザーフィールド内のMerkleハッシュとともにチェックポイントを送信します。
* 他のすべてのプロポーザーはプロポーザーフィールド内のデータを検証してから、その状態にMerkleハッシュを追加します。

次のプロポーザーはそれから承認トランザクションを送信し、以前の[チェックポイントトランザクション](/docs/maintain/glossary.md#checkpoint-transaction)がEthereumメインネット上で成功したことを証明します。すべてのバリデータセットの変更は[Heimdall](/docs/maintain/glossary.md#heimdall)上のバリデータノードによって中継され、これはバリデータノードに埋め込まれます。これによってHeimdallはEthereumメインネット上のPolygonコントラクト状態と常時同期することができます。

Ethereumメインネット上に展開されるPolygonコントラクトは究極の真実の源とみなされ、そのためにすべての検証はEthereumメインネットコントラクトの照合を介して行われます。
