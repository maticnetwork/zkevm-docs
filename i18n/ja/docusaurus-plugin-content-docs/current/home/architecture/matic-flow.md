---
id: matic-flow
title: Polygonの仕組み
description: Polygonで新しいブロックチェーンアプリを構築しましょう。
keywords:
  - docs
  - matic
  - polygon
  - how polygon works
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygonの仕組み {#how-polygon-works}

Polygonは、プルーフ・オブ・ステーク（PoS）とPlasma対応サイドチェーンのハイブリッドを提供するブロックチェーンアプリケーションプラットフォームです。

Polygonのアーキテクチャは3層からなっています。

1. Ethereum上のステーキングとPlasmaスマートコントラクト
2. Heimdall（PoSレイヤー）
3. Bor（ブロックプロデューサレイヤー）

以下の画像は、これらのコアコンポーネントがどのように相互作用するかを理解するのに役立ちます：

<img src={useBaseUrl("img/Bor/bor-architecture.png")} />