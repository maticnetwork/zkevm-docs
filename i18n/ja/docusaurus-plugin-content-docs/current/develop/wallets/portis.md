---
id: portis
title: Portis
description: ユーザのオンボーディングを意識して構築された、webベースのウォレットです。
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portisは、ユーザのオンボーディングを意識して構築された、webベースのウォレットです。dAppに統合するjavascriptSDKが付属して、ユーザにローカルウォレットレスエクスペリエンスを提供します。さらに、ウォレット、トランザクション、ガス手数料の設定も行っています。

MetaMaskと同様の非カストディアルで、ユーザだけが鍵を制御し、Portisはそれらを安全に保管します。しかし、MetaMaskとは異なり、ブラウザではなく、アプリケーションに統合されます。ユーザには、IDとパスワードに関連付けられた鍵があります。

**タイプ**：非カストディアル/HD<br/>**秘密鍵ストレージ：**暗号化およびPortisサーバーに保存<br/>**Ethereum Ledgerへの通信：**開発者が定義する<br/>**秘密鍵エンコーディング**：ニーモニック<br/>

## Web3を設定する {#set-up-web3}

dAppにPortisをインストールする：

```js
npm install --save @portis/web3
```

次に、Portisダッシュボードを使用してdApp IDを取得するために、dAppをPortisに登録します[。](https://dashboard.portis.io/)

インポート`portis`とオブジェクト`web3`：

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Portisコンストラクタは、dApp IDと、接続したいネットワークとして第2引数を引数とします。これは文字列またはオブジェクトのいずれかです。

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## アカウントを設定する {#set-up-account}

web3のインストールとインスタンス化が成功した場合は、以下は、接続されたアカウントを正常にリターンします。

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## コントラクトのインスタンス化 {#instantiating-contracts}

コントラクトをインスタンス化する方法です：

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## 関数の呼び出し {#calling-functions}

### 呼び出し`call()`機能 {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### 呼び出し`send()`機能 {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
