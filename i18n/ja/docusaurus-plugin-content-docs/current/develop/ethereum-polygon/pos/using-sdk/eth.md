---
id: eth
title: ETHデポジット/引き出すガイド
sidebar_label: ETH
description: "Polygonネットワーク上で、ETHトークンのデポジットと引き出しをする"
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

最新の[ETH用のMatic.jsドキュメント](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/)をチェックしてください。

## クイックサマリー {#quick-summary}

ドキュメントのセクションでは、Polygonネットワーク上でERC20のデポジットと引き出しの方法について説明していますドキュメントの ETH、ERC20、ERC721、ERC1155 セクションの間には、共通の機能があり、標準に相応した命名と実装パターンが異なります。ドキュメントのこのセクションを使用するための最も重要な前提条件は、資産をマッピングすることです。そのため、マッピングリクエストを[こちら](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/)に送信してください。

## 導入 {#introduction}

このガイドでは、GoerliネットワークにマッピングされているPolygonテストネット（Mumbai） を使用して、2つのブロックチェーン間の資産転送を説明します。このチュートリアルでは、可能な限りプロキシアドレスを使用する必要があることに注意してください。これは、新しい更新がコントラクトコードに追加されると、実装コントラクトアドレスが変更される可能性がありますが、プロキシは決して変更されず、すべての着信呼び出しが最新の実装にリダイレクトされるためです。基本的に、プロキシ アドレスを使用する場合、準備が整う前に実装コントラクトで発生する変更について心配する必要はありません。

たとえば、アドレスではなく、インタラクションのために`RootChainManagerProxy`アドレスを使用してください`RootChainManager`。PoSコントラクトアドレス、ABI、テストトークンアドレスなどの展開の詳細は[こちら](/docs/develop/ethereum-polygon/pos/deployment/)をご覧ください。

資産のマッピングは、PoSブリッジをアプリケーションに統合するために必要なステップです。まだ行っていない場合は、マッピングリクエストを送信してください[こちら](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/)。このチュートリアルのために、チームはテストトークンをデプロイし、それらをPoSブリッジにマッピングしました。[Faucet](https://faucet.polygon.technology/)で使用したい資産をリクエストし、テストトークンが利用できない場合は、[Discord](https://discord.com/invite/0xPolygon)でチームに連絡してください。すぐに返信するようにいたします。

以下のチュートリアルでは、いくつかのコードスニペットとともに、すべてのステップについて詳しく説明します。ただし、PoSブリッジの動作を統合して理解するのに役立つ、すべての**サンプルソースコード**が含まれている、この[リポジトリ](https://github.com/maticnetwork/matic.js/tree/master/examples)はいつでも参照できます。

## ハイレベルフロー {#high-level-flow}

ETHをデポジットする -

1. **_RootChainManager_**上で**_depositEtherFor_**呼び出しを行い、**必要なEtherを**送信します。

ETHを引き出す -

1. Polygonチェーン上でトークンを**_バーン_**します。
2. **_RootChainManager_**で**_終了_**機能を呼び出して、バーントランザクションのプルーフを送信します。この呼び出しは、書き込みトランザクションを含むブロックの**_チェックポイントが送信された後_**に行うことができます。

## ステップ {#steps}

### デポジット {#deposit}

**RootChainManager**コントラクト上の**depositEtherFor**を呼び出して、ETHは、Polygonチェーンにデポジットできます。Polygon PoSクライアントは、**depositEther**メソッドを公開して、この呼び出しをします。

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
EthereumからPolygonへの入金は**ステート同期**メカニズムを使用して行われ、22〜30分かかります。この時間間隔を待つ後、web3.js/matic.jsライブラリーまたはMetaMaskを使用して残高を確認することを推奨します。エクスプローラは、子チェーンで少なくとも1つの資産転送が発生した場合にのみ、残高を表示します。入金イベントを追跡する方法を説明し[<ins>ます</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/)。
:::

### バーン {#burn}

ETHは、Polygonチェーン上にERC20トークンとして預けられます。引き出しはERC20トークンを引き出すのと同じプロセスに従います。

トークンを書き込み、引き出しプロセスを実行するには、MaticWETHコントラクトの引き出し機能を呼び出してください。EtherはPolygonチェーン上のERC20トークンであるため、Polygon PoSクライアントから**ERC**20トークンを開始し、バーンプロセスを開始する`withdrawStart()`メソッドを呼び出す必要があります。

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

この呼び出しのトランザクションハッシュを保存し、バーンプルーフの生成中にそれを使用します。

### 終了 {#exit}


burnトランザクションを含むブロックについて**チェックポイント**が送信されたら、ユーザーは`RootChainManager`コントラクトの**終了**機能を呼び出して、burnを提出する必要があります。有効なプルーフトークンが送信されると、ユーザに転送されます。Polygon POSクライアント`withdrawExit`は、`erc20`メソッドを公開して、この呼び出しを行います。この機能は、チェックポイントがメインチェーンに含まれた後にのみに呼び出すことができます。チェックポイントインクルージョンは、[ガイド](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events)に従って追跡できます。


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
