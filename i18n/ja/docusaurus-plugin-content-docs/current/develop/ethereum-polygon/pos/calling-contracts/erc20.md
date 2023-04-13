---
id: erc20
title: ERC20デポジット/引き出しガイド
sidebar_label: ERC20
description: "ERC20コントラクトで利用可能な機能。"
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## ハイレベルフロー {#high-level-flow}

ERC20をデポジットする -

1. **_ERC20Predicate_**コントラクトを**_承認_**して、デポジットする必要があるトークンを使用します。
2. **_RootChainManager_**で**_depositFor_**呼び出しを行います。

ERC20を引き出す -

1. Polygonチェーン上でトークンを**_バーン_**します。
2. **_RootChainManager_**で**_終了_**機能を呼び出して、バーントランザクションのプルーフを送信します。この呼び出しは、バーントランザクションを含むブロックの**_チェックポイントが送信された後_**に行うことができます。

## セットアップの詳細 {#setup-details}

### コントラクトをインスタンス化する {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### 承認する {#approve}
**_ERC20Predicate_**を承認して、トークンコントラクトの**_承認_**機能を呼び出し、トークンを使用します。この機能は、spenderとamountという2つの引数をとります。**_spender_**は、ユーザのトークンを使用するための承認をしているアドレスです。**_amount_**は、使用できるトークンの額です。1回限りの承認ではデポジット額と同じ額を維持するか、大きな数値を渡して、複数の承認を回避します。
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### デポジット {#deposit}
この呼び出しを行う前に、トークンをマッピングし、デポジットのために額を承認する必要があることに注意してください  。コントラクトの`depositFor()`機能を呼び出します`RootChainManager`。この関数は3つの引数を取ります`userAddress`： , , `depositData`.は`rootToken`、Polygonチェーン上のデポジットを受け取るユーザーのアドレスです。メインチェーン上のトークンアドレス`userAddress`です。ABIエンコードされた金額`depositData`です`rootToken`。
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### バーン {#burn}
トークンは、子トークンコントラクト上の**_引き出す_**機能を呼び出すことにより、Polygonチェーンにバーンすることができます。この機能は、バーンされるトークンの数を示すシングル引数、**_amount_**をとります。このバーンのプルーフは、終了ステップで送信される必要があります。したがってトランザクションハッシュを保存します。
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### 終了 {#exit}
`RootChainManager`コントラクト上の終了機能を呼び出してロックを解除してトークンを受信する必要があります。`ERC20Predicate`この機能は、バーントランザクションを証明するシングルバイトの引数をとります。この関数を呼び出す前に、burnトランザクションを含むチェックポイントが送信されるのを待ちます。プルーフは、RLPで次のフィールドをエンコードして生成されます。

1. headerNumber - バーントランザクションを含むチェックポイントヘッダーブロック番号
2. blockProof - ブロックヘッダー（子チェーン内）が送信されたマークルルート内のリーフであるプルーフ
3. blockNumber - 子チェーン上のバーンtxを含んでいるブロック番号
4. blockTime - ブロック時間をバーントランザクションする
5. txRoot -ブロックのトランザクションルート
6. receiptRoot -ブロックの領収書ルート
7. recept -　バーントランザクションの領収書
8. receiptProof - バーン領収書のマークルプルーフ
9. branchMask - マークルパトリシアツリー内の領収書のパスを示す32ビット
10. receiptLogIndex - 領収書から読み取るログインデックス

プルーフを手動で生成するのは難しい場合があるため、Polygonエッジを使用することをお勧めします。トランザクションを手動で送信する場合は、オプションオブジェクトで、**_encodeAbi_**を**_true_**として渡し、生のcalldataを取得できます。

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

この呼び出しcalldataを**_RootChainManager_**に送信します。
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
