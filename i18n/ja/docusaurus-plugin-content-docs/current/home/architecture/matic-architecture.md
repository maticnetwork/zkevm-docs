---
id: polygon-architecture
title: Polygon PoSアーキテクチャ
description: HeimdallおよびBorチェーンを含むPolygon PoSアーキテクチャ
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - pos
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygon PoSアーキテクチャ {#polygon-pos-architecture}

Polygonネットワークは、プルーフ・オブ・ステーク（PoS）とPlasma対応サイドチェーンのハイブリッドを提供するブロックチェーンアプリケーションプラットフォームです。

Polygonの美しさは、本格的なEVMサイドチェーンやゼロナレッジロールアップなどの他のレイヤー2アプローチと異なる実行環境から分離されたジェネリックバリデーションレイヤーを備えています。

プラットフォーム上でこのPoSメカニズムを有効化するために、**ステーキング**管理コントラクトのセットがEthereum上にデプロイされ、バリデータが**Heimdall**ノードと**Bor**ノードを動かします。EthereumはPolygonがサポートする初めてのベースチェーンです。Polygonは今後、相互運用可能な分散型レイヤー2ブロックチェーンプラットフォームを有効化するために、コミュニティの提案およびコンセンサスに基づいて追加のベースチェーンをサポートする予定です。

Polygon PoSのアーキテクチャは3層からなっています。

1. Ethereum上のコントラクトでのステーキング
2. Heimdall（PoSレイヤー）
3. Bor（ブロック生成レイヤー）

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Ethereum上のPolygonスマートコントラクト {#polygon-smart-contracts-on-ethereum}

Polygonは、スマートコントラクトのセットをEthereum上で維持し、以下のものに対応します：

- PoSレイヤーのステーキング管理
- バリデータシェアを含むデリゲーション管理
- サイドチェーンの状態のチェックポイント／スナップショット

### Heimdall（PoSバリデータレイヤー） {#heimdall-proof-of-stake-validator-layer}

**Heimdall**は、PolygonでPoSメカニズムを動かすためのPoSバリデータノードで、Ethereum上のステーキングコントラクトと連携して動作します。私たちは、Tendermintコンセンサスエンジンでこれを実装しており、署名スキームやさまざまなデータ構造に変更を加えています。これには、ブロックのバリデーション、ブロックプロデューサー委員会の選択、アーキテクチャのEthereumに対してサイドチェーンブロックの表現であるチェックポイント提出などの様々なことを行います。

Heimdallレイヤーは、Borによって生成されたブロックを集約して1つのMerkleツリーとして処理し、そのMerkleルートを定期的にルートチェーンに公開します。これらの定期的な公開を呼び出しています`checkpoints`。Borの数ブロックごとに1つのバリデータ（Heimdallレイヤー上）が

1. 最後のチェックポイント以降のすべてのブロックを検証します。
2. ブロックハッシュのマークルツリーを作成します。
3. メインチェーンにマークルルートを公開します。

チェックポイントは以下の2つの理由から重要です：

1. ルートチェーン上でファイナリティを提供します。
2. 資産の引き出し時にプルーフ・オブ・バーン（PoB）を提供します。

プロセスの全体像は以下のように説明できます：

- プールからのアクティブなバリデータのサブセットが1つ選ばれ、1スパンのブロックプロデューサとして機能します。各スパンの選択も、少なくとも３分の２の同意を得て行われます。これらのブロックプロデューサーはブロックを作成し、残りのネットワークにブロックをブロックさせる責任があります。
- チェックポイントには、任意の間隔で作成されたすべてのブロックのルートが含まれます。すべてのノードが同じものをバリデートし、署名を添付します。
- バリデータセットから選択したプロポーザーは、特定のチェックポイントについてすべての署名を収集し、メインチェーンで同じコミットする責任があります。
- ブロックの生成とチェックポイントの提案についての責任の度合は、プール全体でのバリデータのステーキングの割合に大きく依存します。

### Bor（ブロック生成レイヤー） {#bor-block-producer-layer}

BorはPolygonのブロック生成レイヤーです。トランザクションをブロックに集約する責任があります。

ブロック生成者は、Heimdall上の委員会の選択により、Polygonで`span`と呼ばれる期間に定期的にシャッフルされます。ブロックは**Bor**ノードで生成され、サイドチェーンVMはEVM互換があります。また、Borで生成されたブロックはHeimdallノードによって定期的に検証されます。Bor上のブロックセットのマークルツリーハッシュで構成されるチェックポイントは、Ethereumに定期的にコミットされます。

### リソース {#resources}

- [Borアーキテクチャ](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Heimdallアーキテクチャ](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [チェックポイントメカニズム](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
