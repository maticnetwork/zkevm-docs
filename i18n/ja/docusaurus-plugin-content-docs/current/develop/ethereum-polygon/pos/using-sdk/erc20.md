---
id: erc20
title: ERC20預け入れ／引き出しガイド
sidebar_label: ERC20
description: "Polygonネットワーク上で、ERC20トークンを預け入れ、引き出しを行う。"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

最新の[ERC20のMatic.jsドキュメント](https://maticnetwork.github.io/matic.js/docs/pos/erc20/)を確認してください。

このチュートリアルでは、GoerliネットワークにマッピングされたPolygonテストネット（Mumbai）を使用して、2つのブロックチェーン間の資産転送の説明をします。このチュートリアルに従う際に**注意すべき重要なことは**、利用可能な場合は、常に、プロキシアドレスを使用する必要があるということです。たとえば、**RootChain**Managerアドレスではなく、**RootChainManagerProxy**アドレスを使用する必要があります。**PoSコントラクトアドレス、ABI、テストトークンアドレス**、およびPoSブリッジコントラクトのその他のデプロイの詳細は、[こちら](/docs/develop/ethereum-polygon/pos/deployment)をご覧ください。

アプリケーションにPoSブリッジを統合するには、**資産のマッピング**が必要です。マッピングリクエストは、[こちら](/docs/develop/ethereum-polygon/submit-mapping-request)から送信できます。しかし、このチュートリアルのために、**テスト**トークンがすでに展開されており、PoSブリッジにマップされています。チュートリアルを自分で試すときにはこれが必要な場合があります。[faucet](https://faucet.polygon.technology/)から望む資産をリクエストできます。コックでテストトークンが利用できない場合は、[不調](https://discord.com/invite/0xPolygonn)をしてご連絡ください。

以下のチュートリアルでは、いくつかのコードスニペットとともに、すべてのステップについて詳しく説明します。ただし、PoSブリッジの動作を統合して理解するのに役立つ、すべての**サンプルソースコード**が含まれている、この[リポジトリ](https://github.com/maticnetwork/matic.js/tree/master/examples/pos)はいつでも参照できます。

## ハイレベルフロー {#high-level-flow}

ERC20の預け入れ -

1. **_ERC20Predicate_**コントラクトを**_承認_**して、預け入れる必要があるトークンを使います。
2. **_RootChainManager_**で**_depositFor_**呼び出しを行います。

ERC20の引き出し -

1. Polygonチェーンでトークンをバーンします。
2. 書き込みトランザクションの証明を提出するために`exit()`機能をオンに`RootChainManager`してください。この呼び出しは、ブロックが書き込みトランザクションを含むチェックポイントを送信した後に実行できます。

## ステップの詳細 {#steps-details}

### 承認する {#approve}

これは通常のERC20承認で、**_ERC20Predicate_**は**_transferFrom_**機能を呼び出すことができます。Polygon POSクライアントは、**_承認_**メソッドを公開して、この呼び出しを行います。

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### デポジット {#deposit}

トークンが事前にマッピングされ、承認される必要があります。Polygon PoSクライアントは、この呼び出しを行う`deposit()`メソッドを公開します。

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
EthereumからPolygonへの入金は**ステート同期**メカニズムを使用して行われ、約22〜30分かかります。この時間間隔を待つ後、web3.js/matic.jsライブラリーまたはMetaMaskを使用して残高を確認することを推奨します。エクスプローラは、子チェーンで少なくとも1つの資産転送が発生した場合にのみ、残高を表示します。入金イベントを追跡する方法を説明し[<ins>ます</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos)。
:::

### WithdrawStartメソッドでバーンする {#withdrawstart-method-to-burn}

この`withdrawStart()`方法を使用すると、Polygonチェーンで指定した金額を書き込む引き出しプロセスを開始できます。

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

この呼び出しのトランザクションハッシュを保存し、バーンプルーフの生成中にそれを使用します。

### 終了 {#exit}

Burnトランザクションを含むブロックについてチェックポイントが送信されたら、ユーザーは`RootChainManager`コントラクトの`exit()`機能を呼び出して、バーン証明を提出する必要があります。有効な証明を提出すると、トークンがユーザーに転送されます。Polygon PoSクライアントは、この呼び出しを行う`withdrawExit`メソッドを公開します。この機能は、チェックポイントがメインチェーンに含まれた後にのみに呼び出すことができます。チェックポイントを含めることを追跡することができます[。](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events)

*withdrawExit*メソッドは、*withdrawStart*メソッドからtxHashを使用して、引き出しプロセスを終了するために使用できます。

:::note
引き出しを終了するには、dequestStartトランザクションをチェックする必要があります。
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
