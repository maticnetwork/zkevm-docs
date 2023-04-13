---
id: getting-started
title: はじめに
sidebar_label: Getting Started
description: オフチェーンデータをPolygon dAppsに取得するためのソリューション
keywords:
  - wiki
  - polygon
  - data oracles
  - chainlink
  - bandchain
  - api3
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

契約上の合意に関連する外部からの情報にアクセスする必要があることが多いです。しかし、スマートコントラクトはブロックチェーンネットワーク以外のデータにアクセスすることはできません。オラクルとは**、ブロックチェーンまたはスマートコントラクトが外部データとやり取りする**方法です。

ブロックチェーンは、決定論的な一方通行であるため、オラクルは、オフチェーンイベントとオンチェーン イベントの間のパスとなります。これらのオラクルは、現実世界の出来事を送信および検証し、この情報をスマートコントラクトに送信して、ブロックチェーンの状態変化をトリガーするサービスです。

インバウンドのオラクルは、オフチェーンまたは実世界のデータをブロックチェーンにもたらしますが、アウトバウンドのオラクルはその反対のことを行います。つまり、ブロックチェーン外のエンティティに、そこで発生したイベントを通知します。

## ブロックチェーンオーラル {#blockchain-oracles}

DAppをPolygon上のオラクルと統合するには、次のいずれかのソリューションを選択できます。

 1. [API3](api3.md)
 2. [チェーンリンク](chainlink.md)
 3. [BandChain](bandchain.md)
 4. [Razor](razor.md)
 5. [Tellor](tellor.md)
 6. [UMA](optimisticoracle.md)

## リソース {#resources}

1. [ブロックチェーンオラクルの問題とは何ですか？](https://blog.chain.link/what-is-the-blockchain-oracle-problem/)
1. [ブロックチェーンオラクルとは](https://cryptobriefing.com/what-is-blockchain-oracle/)
2. [ブロックチェーンオラクルの種類](https://blockchainhub.net/blockchain-oracles/)
3. [チュートリアル：分散型価格データを取得する](https://docs.chain.link/docs/get-the-latest-price)
4. [チュートリアル：RazorをPolygonに統合する方法](https://docs.razor.network/tutorial/matic/)
