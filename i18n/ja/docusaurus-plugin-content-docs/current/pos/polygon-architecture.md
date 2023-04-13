---
id: polygon-architecture
title: Polygonのアーキテクチャ
description: Polygonのアーキテクチャ
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygonのアーキテクチャ {#the-architecture-of-polygon}

**Polygon**は、ハイブリッドなプルーフ・オブ・ステークとPlasma対応のサイドチェーンを提供するブロックチェーンアプリケーションプラットフォームです。

アーキテクチャ的には、Polygonの美しさはそのエレガントなデザインにあります。Plasma対応チェーン、本格的なEVMサイドチェーンなどのさまざまな実行環境から分離された一般的なバリデーションレイヤーを特徴とし、将来的にはオプティミスティックロールアップなどのレイヤー2アプローチを目指します。

Polygon PoSネットワークには次の三つのレイヤーのアーキテクチャがあります：

* **Ethereum**レイヤー—Ethereumメインネット上のコントラクトセットです。
* **Heimdall**レイヤー—Ethereumメインネットと並行して実行されるプルーフ・オブ・ステーク・ノードの一連のHeimdallのノード、Ethereumメインネットに展開されたステーキングコントラクトのセットを監視し、EthereumメインネットにPolygonネットワークチェックポイントをコミットします。HeimdallはTendermintに基づいています。
* **Borレイヤー** — Heimdallノードによってシャッフルされたブロック生成Borノードの一連です。BorはGo Ethereumをベースにしています。

<img src={useBaseUrl("img/staking/architecture.png")} />

現在、開発者はPlasma述語が持つ、特定のステート移行のために**Plasma**を使用することができます。ERC20、ERC721、資産スワップ、または他のカスタム述語などが書き込まれます。任意のステート移行については、PoSを使用できます。または両方を使用できます！これはPolygonのハイブリッド構築によって可能になります。

当社のプラットフォームでPoSメカニズムを有効化するため、**ステーキング**管理コントラクトのステーキングのセットがEthereum上に展開され、インセンティブバリデータのセットは**Heimdall**及び**Bor**ノードを実行します。Ethereumは最初のベースチェーンPolygonサポートですが、Polygonは、追加のベースチェーンのためのサポートを提供し、コミュニティの提案及びコンセンサスに基づき、相互運用可能な分散型レイヤー2ブロックチェーンプラットフォームを有効化することができます。

<img src={useBaseUrl("img/matic/Architecture.png")} />

## ステーキングコントラクト {#staking-contracts}

Polygonで[プルーフ・オブ・ステーク（PoS）](docs/home/polygon-basics/what-is-proof-of-stake)メカニズムを有効化するためにシステムはEthereumメインネット上で[ステ](/docs/maintain/glossary#staking)ーキング管理コントラクトのセットを採用します。

ステーキングコントラクトは次の機能を実装しています：

* 誰でもEthereumメインネット上のステーキングコントラクトにMaticトークンをステークし、[バリデータ](/docs/maintain/glossary#validator)としてシステムに参加できます。
* Polygonネットワーク上で状態遷移を検証することに対してステーキング報酬を獲得します。
* Ethereumメインネットに[チェックポイント](/docs/maintain/glossary#checkpoint-transaction)を保存します。

PoSメカニズムは、Polygonサイドチェーン向けのデータ不可用性の問題を緩和する役割も担います。

## Heimdall {#heimdall}

Heimdallは、生成されたブロックの集約を処理するプルーフ・オブ・ステークMerkleツリーへ[Bor](/docs/maintain/glossary#bor)することによって生成されたブロックの集約を処理するプルーフオブステークバリデーションレイヤーであり、ルートチェーンに定期的にMerkleルートを公開します。Borサイドチェーンのスナップショットの定期的な公開は[チェックポイント](/docs/maintain/glossary#checkpoint-transaction)と呼ばれています。

1. 最後のチェックポイント以降のすべてのブロックを検証します。
2. ブロックハッシュのMerkleツリーを作成します。
3. MerkleルートハッシュをEthereumメインネットに公開します。

チェックポイントは以下の二つの理由から重要です。

1. ルートチェーンに最終的状態を提供します。
2. 資産の引き出し時にプルーフ・オブ・バーン（PoB）を提供します。

プロセスの概要：

* プールからのアクティブなバリデータのサブセットは、[スパン](/docs/maintain/glossary#span)のための[ブロックプロデューサ](/docs/maintain/glossary#block-producer)として機能するために選ばれました。これらのブロックプロデューサは、ブロックの作成や作成したブロックをネットワークにブロードキャストする役割を担っています。
* チェックポイントには、任意の間隔で作成されたすべてのブロックのMerkleルートハッシュが含まれます。すべてのノードが同じMerkleルートハッシュをバリデートし、署名を添付します。
* バリデータセットから選ばれた[プロポーザー](/docs/maintain/glossary#proposer)には、一つのチェックポイントごとにすべての署名を収集し、Ethereumメインネット上でチェックポイントにコミットする責任があります。
* ブロックの作成とチェックポイントの提案についての責任の度合は、プール全体でのバリデータのステークレシオによって異なります。

Heimdallの詳細は[Heimdallアーキテクチャ](/docs/pos/heimdall/overview)ガイドでご覧いただけます。

## Bor {#bor}

Borは、Polygonのサイドチェーンブロックプロデューサーレイヤーです。トランザクションをブロックに集約する責任を負うエンティティです。現在、これはコンセンサスアルゴリズムへのカスタム変更を伴う基本的なGeth実装の1つです。

ブロックプロデューサーはバリデータの一部であり、[Heimdall](/docs/maintain/glossary#heimdall)上の委員会の選択によって定期的にシャッフルされます。Heimdall上の委員会の選択により、Polygonで`span`と呼ばれる期間に定期的にシャッフルされます。ブロックは**Bor**ノードで生成され、サイドチェーンVMはEVM互換性があります。Borで生成されたブロックは、Heimdallノードによって定期的に検証され、Bor上のブロックセットのマークルツリーハッシュで構成されるチェックポイントは、Ethereumに定期的にコミットします。

詳細については、[Borアーキテクチャ](/docs/pos/bor/overview)ガイドでご覧いただけます。

## リソース {#resources}

* [Borアーキテクチャ](https://wiki.polygon.technology/docs/pos/bor)
* [Heimdallアーキテクチャ](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [チェックポイントメカニズム](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
