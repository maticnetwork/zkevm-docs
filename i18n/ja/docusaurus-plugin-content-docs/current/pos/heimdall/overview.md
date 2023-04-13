---
id: overview
title: 概要
description: HeimdallはPolygonネットワークの核となるのです。
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - cosmos
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Heimdall {#heimdall}

HeimdallはPolygonネットワークの核心です。これは、バリデータ、ブロックプロデューサ選択、スパン、EthereumとMatic間のstate-sync（状態同期）メカニズムおよびその他の本システムに重要な部分を管理しています。

**Cosmos-SDK**と、**Peppermint**と呼ばれるTendermintのフォークバージョンを使用しています。Peppermintのソースは次のとおりです：[https://github.com/maticnetwork/tendermint/tree/peppermint](https://github.com/maticnetwork/tendermint/tree/peppermint)

HeimdallはCosmos-SDKから一部モジュールを削除しますが、ほとんどは同じパターンに従いながらカスタマイズされたバージョンを使用します。