---
id: overview
title: 概要
description: Borノードは基本的にサイドチェーンオペレータです。
keywords:
  - docs
  - matic
  - polygon
  - bor
  - geth
image: https://matic.network/banners/matic-network-16x9.png
---

# Bor {#bor}

Borノードまたはブロックプロデューサーの実装は、基本的にサイドチェーンオペレーターです。サイドチェーンVMはEVMとの互換性があります。現在、コンセンサスアルゴリズムへの仕様変更を伴ったGethを使用しています。しかし、今後は軽量化と集約化のためにゼロから構築されます。

ブロックプロデューサーはバリデータセットから選択され、過去のEthereumブロックハッシュを使ってシャッフルされます。しかし、この選択に使用するランダム性を満たす元を探しています。