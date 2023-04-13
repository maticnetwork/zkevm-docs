---
id: walletconnect
title: WalletConnect
description: DApp-ウォレット通信を実現するオープンプロトコルです。
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect**は、dAppsとウォレット間の通信リンクを作成するために構築されたオープンプロトコルです。ウォレットとこのプロトコルをサポートするアプリケーションは、2人のピア間で共有鍵を介して安全なリンクを可能にします。ｄAppがウォレット接続URI標準のコードを表示することによって、接続が開始され、ウォレットアプリケーションがリクエストを承認することで、接続が確立されます。ファンド転送に関するさらなるリクエストは、ウォレットアプリケーション自体で確認できます。

## Web3を設定する {#set-up-web3}

ユーザーのPolygonウォレットに接続するようにdAppを設定するには、WalletConnectのプロバイダーを使用してPolygonに直接接続することができます。以下を、dAppにインストールする：

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Polygon統合`matic.js`のためのインストール：

```bash
$ npm install @maticnetwork/maticjs
```

dAppに次のコードを追加します。

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

次に、WalletConnectのオブジェクトを介してPolygonとRopstenプロバイダを設定します：

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

web3オブジェクトをインスタンス化するために、上記二つのプロバイダーオブジェクトを作成しました。

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## コントラクトのインスタンス化 {#instantiating-contracts}

**Web3オブジェクト**が完了すると、コントラクトのインスタンス化はメタマスクと同じ手順で行われます。**契約を**締結していることを確認し、**アドレス**をすでに確実に設定してください。

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## 関数の呼び出し {#calling-functions}

:::info

秘密鍵はユーザーのウォレットに残され、アプリは**いかなる方法でもアクセスできません。**

:::

ブロックチェーンとのやり取りに応じて、Ethereumに2つの機能があります。`send()`データを読み取るときとデータを書き込む`call()`とき。

### `call()`機能を呼び出しする {#functions}

データを読み込む必要はありません。そのため、コードは次のようになります：

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### `send()`機能を呼び出しする {#functions-1}

ブロックチェーンへの書き込みには署名が必要ですので、ユーザーに（WalletConnectをサポートする）ウォレットでトランザクションに署名するよう求めています。

これには3つのステップがあります：
1. トランザクションを構築する
2. トランザクションで署名を取得する
3. 署名したトランザクションを送信する

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

上記のコードは、署名のためにユーザのウォレットに送信される、トランザクションオブジェクトを作成します。


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`関数は、署名を求め、署名されたトランザクションを`sendSignedTransaction()`送信します（成功した場合にトランザクション領収書を返します）。
