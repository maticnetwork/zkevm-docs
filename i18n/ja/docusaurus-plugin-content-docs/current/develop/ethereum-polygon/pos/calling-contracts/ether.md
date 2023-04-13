---
id: ether
title: Etherデポジット/引き出しガイド
sidebar_label: Ether
description:  "Etherコントラクトで利用可能な機能。"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## ハイレベルフロー {#high-level-flow}

Etherをデポジットする -

- **RootChainManager**でdepositEtherFor呼び出しを行い、Ether資産を送信します。

Etherを引き出す -

1. Polygonチェーン上でトークンを**_バーン_**します。
2. **_RootChainManager_**で**_終了_**機能を呼び出して、バーントランザクションのプルーフを送信します。この呼び出しは、バーントランザクションを含むブロックの**_チェックポイントが送信された後_**に行うことができます。

## ステップ詳細 {#step-details}

### コントラクトをインスタンス化する {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### デポジット {#deposit}
コントラクトの`depositEtherFor`機能を呼び出します`RootChainManager`。この関数は、1つの引数を取ります。これは`userAddress`、Polygonチェーン上のデポジットを受け取るユーザーのアドレスです。入金するETHERの量をトランザクションの値として送信する必要があります。

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### バーン {#burn}
EtherはPolygonチェーン上のERC20トークンであるため、引き出しプロセスはERC20の引き出しと同じです。子トークンコントラクトで`withdraw`関数を呼び出すことでトークンがバーンできます。この関数は、1つの引数を取ります。書き込むトークン数を`amount`示します。このバーンのプルーフは、終了ステップで送信される必要があります。したがってトランザクションハッシュを保存します。
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### 終了 {#exit}
`RootChainManager`コントラクト上の終了機能を呼び出してロックを解除してトークンを受信する必要があります。`EtherPredicate`この機能は、バーントランザクションを証明するシングルバイトの引数をとります。この関数を呼び出す前に、burnトランザクションを含むチェックポイントが送信されるのを待ちます。プルーフは、次のフィールドをRLPエンコードすることによって生成されます：

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
