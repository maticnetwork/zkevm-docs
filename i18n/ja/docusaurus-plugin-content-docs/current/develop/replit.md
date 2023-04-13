---
id: replit
title: リプレットを使用してスマートコントラクトを展開する
sidebar_label: Using Replit
description: PolygonでReplitIDEを使用してスマートコントラクトをデプロイする
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## 概要 {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide)は、コードを記述してアプリをホストできるコーディングプラットフォームです。Replitは、[Solidity プログラミング言語](https://replit.com/@replit/Solidity-starter-beta?v=1)をサポートしているため、Web3開発者がスマートコントラクトを作成してデプロイするためのすべての機能を提供します。

この記事では、[Replit IDE](https://replit.com/signup)および[Replit Solidity開発テンプレート（Solidity](https://replit.com/@replit/Solidity-starter-beta?v=1)スターターベータ）を使用して、Polygon上のSolidityスマートコントラクトを構築および展開する方法を説明します。

## 以下を行います： {#what-you-will-do}

- Replitアカウントを作成する
- Repl環境を作成する
- Polygonムンバイネットワークにサンプルプロジェクトを展開する
- コントラクトを検証する
- プロジェクトを個人Replitプロファイルに公開します。

:::tip

ReplitによるSolidityについての追加の例については、<ins>**[リplitで開始する](https://blog.replit.com/solidity)**</ins>記事を参照するか、<ins>**[ReplitのSolidityのドキュメントとEscrowコントラクト](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>チュートリアルを確認してください。
:::

## 前提条件 {#prerequisites}

リプレットを使用してPolygonにSolidityスマートコントラクトを展開するためのローカル環境設定は必要ありません。

Polygon Mumbaiテストネットおよびデプロイされたコントラクトとやり取りするには、ブラウザベースのweb3ウォレットが必要です。すでにMetaMaskを使用している場合は、Replitでテストするために新しいアカウントを作成することをお勧めします。これは、MetaMaskインターフェースの右上隅にあるアカウントアバターをクリックすると表示されるアカウントメニューから実行できます。

SolidityスマートコントラクトをPolygonにデプロイできるようにするには、以下のすべての前提条件を設定する必要があります。

1. [Replitアカウントを作成する](https://replit.com/signup)
2. [MetaMaskウォレットをダウンロードする](/docs/develop/metamask/hello)
3. [MetaMask上でPolygonを設定する](/docs/develop/metamask/config-polygon-on-metamask)
4. [テストネットトークンを取得する](https://faucet.polygon.technology)

## Replを使用する {#working-with-a-repl}

作成するすべてのReplは、完全に機能する開発および運用環境です。ステップに従って、SolidityスターターのReplitを作成します。

1. [ログイン](https://replit.com/login)または[アカウントを作成](https://replit.com/signup)します。リプレットアカウントを作成した後、ホーム画面にはダッシュボードが含まれ[ており、](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide)アカウントを表示、プロジェクトを作成、管理することができます。

![img](/img/replit/dashboard.png)

2. ログインしたら、Solidityスターターの応答を作成し、左側パネルから**+ Replを****作成**するか、画面右上にある+を選択します。

![img](/img/replit/solidity.png)

3. [**Solidityスターター（**](https://replit.com/@replit/Solidity-starter-beta?v=1)β）テンプレートを選択し、プロジェクトにタイトルを与えます。

4. プロジェクトを作成するには**、+ Replを**作成するをクリックします。

:::note

Solidityスターターのreplには、<ins>**[Web3 Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.5.2/)**</ins>を使用して構築されたブラウザフレンドリーなインターフェースが付属しています。これにより、当社のコントラクトをデプロイおよびやり取りすることができます。Replitが管理し、テストのために最適化されたEthereumブロックチェーンをカスタムバージョンで管理するReplitのテストネットに展開します。

:::

## Polygon上にデプロイする {#deploy-on-polygon}

上記の**前提条件**のリストに従って、スマートコントラクトを展開してやり取りできるようにしてください。

1. 実行（上部）を**クリック**して、関連するすべてのパッケージをインストールし、コントラクトデプロイメントUIを起動します。

2. MetaMaskウォレットをWebインターフェースに接続し、[Mumbai Testnet](docs/develop/metamask/config-polygon-on-metamask)に切り替えます。

![img](/img/replit/connect.png)

3. **[コネクト]**をクリックし、アカウントを選択し、**[コネクト**]を選択します。

![img](/img/replit/deploy-list.png)

4. ドロップダウンリストから、デプロイするコントラクトを選択します。展開をクリック**します。**

5. 確認を求めるMetaMaskポップアップウィンドウが表示されます。ウォレットからトランザクションを承認してコントラクトを展開します。

## コントラクトを検証およびテストする {#verifying-and-testing-your-contract}

コントラクトコントラクトがデプロイされいる場合、[Polyganscanにナビゲート](https://mumbai.polygonscan.com/)してアカウントを検索し、デプロイされたコントラクトを表示し、アドレスをコピーします。

コントラクトが展開されると、ドロップダウンボックスの下に展開可能なボックスとして表示されます。それをデプロイして取得し、利用可能なさまざまな機能をすべて見てみましょう。ユーザインターフェースまたはインターフェース上に表示されている共有できるURLを使用してコントラクトとやり取りすることができます。

## Replitに公開する {#publish-to-replit}

Replitを使用すると、プロジェクトを個人プロファイルに公開することができます。公開後プロジェクトは、スポットライトページに表示され、やり取り、クローン、コラボレーションを探索することができます。

プロジェクトを公開するには、次の手順に従ってください：

1. 画面上部にあるプロジェクトタイトルを選択します。
2. プロジェクト名と説明を完了し、**公開**をクリックします。
