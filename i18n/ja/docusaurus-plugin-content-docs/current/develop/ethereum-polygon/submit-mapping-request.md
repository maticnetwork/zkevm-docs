---
id: submit-mapping-request
title: トークンのマッピング
description:  EthereumとPolygonチェーン間のトークンをPoSブリッジでマップする方法のガイド
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

EthereumおよびPolygon PoSに資産を移行するには、マッピングが必要です。上記を行うために、2つのブリッジを提供しています。ブリッジに関する詳細は[こちら](/develop/ethereum-polygon/getting-started.md)をご覧ください。

:::tip

Polygon PoSブリッジは、PolygonメインネットとMumbaiテストネットの両方で利用できます。

:::

## マッピングリクエストを送信するステップ {#steps-to-submit-a-mapping-request}

EthereumとPolygon PoS間でトークンをマップするには、Polygonトークンマッパーを使用することができます[。](https://mapper.polygon.technology/)リンクを開き、右上の**Map New Token**ボタンをクリックして、新しいマッピングリクエストを開始します。

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**ステップ1 →**トークンマップしたいネットワークを選択します。テストネット用の**Goerli-Mumbai**、メインネット用の**Ethereum-Polygon PoS**を選択できます。

**ステップ2 →**マッピングするトークン（**ERC20**、**ERC721**、**ERC1155**）を選択します。

**ステップ3→****Ethereum**トークンアドレス欄に**Ethereum／**Goerliトークンアドレスを入力します。トークンコントラクトコードが**Ethereum/Goerli**ブロックチェーンエクスプローラで確認されていることを確認してください。

**ステップ4 →** **Ethereumトークンアドレス**を追加した後、対応するフィールドviz。**トークン名、トークン記号、トークン十進**が自動的にコントラクトの詳細が表示されます。

**ステップ5→**次に、**マッピングを開始**するボタンをクリックしてマッピングを開始します。これにはEthereumトランザクションが含まれていますので、ウォレットを接続して進行する必要があります。

**ステップ6 →**マッピングを完了するためのトークン情報と推定ガス料を記載したレビューモーダルが表示されます。詳細を確認し、**「ガス手数料を地図に支払う**」ボタンを選択してマッピングトランザクションを開始します。

ウォレットからトランザクションを確認した後、Ethereumでトランザクションが完了するまで待機する必要があります。トランザクションが完了すると、Polygon PoSネットワークに子トークンアドレスを記載した成功モーダルが表示されます。[Polygonscan](https://polygonscan.com/)で生成された子トークンアドレスを確認することで、マッピングを確認することができます。

メインネットマッピングを成功させるには、[**Polygonトークンリスト**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json)に追加するトークン詳細を[ここ](https://github.com/maticnetwork/polygon-token-list/issues/new/choose)にご提供いただけます。

:::tip

[<ins>カスタムトークンマッピング</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-)の場合、[**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md)のドキュメントにアクセスし、提供された情報を使用して、トークンをマッピングすることができます。

:::

## ビデオガイド {#video-guide}

**Ethereum Goerli↔Polygonムンバイテストネット**間でトークンをマップする方法についての簡単なビデオチュートリアルをご覧ください：

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>お使いのブラウザはビデオエレメントをサポートしていません。</p>
</video>
