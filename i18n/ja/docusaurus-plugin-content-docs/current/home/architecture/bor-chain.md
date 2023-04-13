---
id: bor-chain
title: BoRチェーンとは何ですか？
sidebar_label: Bor Chain
description: Polygon PoS用のBorチェーンまたはサイドチェーンVMの紹介
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Borチェーン {#bor-chain}

Borノード、またはブロックプロデューサーの実装は、基本的にサイドチェーンオペレーターです。サイドチェーンVMはEVMとの互換性があります。現在、コンセンサスアルゴリズムへの仕様変更を伴ったGethを使用しています。しかし、今後は軽量化と集約化のためにゼロから構築されます。

ブロックプロデューサーはバリデータセットから選択され、過去のEthereumブロックハッシュを使ってシャッフルされます。しかし、この選択に使用するランダム性を満たす元を探しています。