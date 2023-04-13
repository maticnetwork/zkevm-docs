---
id: overview
title: MetaMaskの概要
sidebar_label: Overview
description: Polygon上でMetaMaskを始める方法
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[MetaMask](https://metamask.io/)は、Webブラウザやモバイルデバイスで使用してEthereumブロックチェーンとやり取りできる暗号通貨ウォレットです。これにより、フルでEthereumノードを実行しなくても、ブラウザーでEthereum Dapps（分散型アプリ） を実行できます。

**タイプ**：非カストディアル/HD<br/>**秘密鍵ストレージ**：ユーザのブラウザストレージ<br/>**Ethereum Ledger**：Infuraへの通信<br/>**秘密鍵エンコーディング**：ニーモニック<br/>

:::warning
**秘密の回復フレーズ**をバックアップしてください。デバイスが故障、紛失、盗難、またはデータが破損している場合、それ以外の方法はありません。秘密の回復フレーズは、MetaMaskアカウントを回復する唯一の方法です。**[<ins>MetaMaskの基本的な安全性とセキュリティのヒントを</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**確認してください。
:::

## MetaMask for Polygonを設定する方法 {#guide-to-set-up-metamask-for-polygon}

* [MetaMaskダウンロードとインストール](/develop/metamask/tutorial-metamask.md)
* [MetaMask上でPolygonを設定する](/develop/metamask/config-polygon-on-metamask.md)
* [カスタムトークンを設定する](/develop/metamask/custom-tokens.md)
* [アカウント作成とインポート](/develop/metamask/multiple-accounts.md)

### 1. web3をセットアップする {#1-set-up-web3}

#### ステップ 1 {#step-1}

以下を、dAppにインストールする：

  ```javascript
  npm install --save web3
  ```

新しいファイルを作成し、名前`web3.js`を付けて、それにコードを挿入する：

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

上記のファイルは、`getWeb3()`と呼ばれる機能をエクスポートします。この機能の目的は、Metamaskによって挿入されたグローバルオブジェクト（`ethereum`または`web3`）検出を介して、metamaskアカウントのアクセスをリクエストすることです。

[MetamaskのAPIドキュメント](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes)によると：

> MetaMaskは、window.ethereumでユーザーが訪問したウェブサイトにグローバルなAPIを注入します。このAPIにより、ウェブサイトはユーザーのEthereumアカウントをリクエストしたり、ユーザーが接続しているブロックチェーンからデータを読み取ったり、ユーザーがメッセージとトランザクションに署名することを示唆することができます。プロバイダーオブジェクトが存在する場合、Ethereumユーザーを示します。

簡単に言えば、基本的に、MetaMaskの拡張／アドオンをブラウザにインストールしているということです。（古いバージョン`web3`で）`ethereum`定義されたグローバル変数を定義し、この変数を使用してWeb3オブジェクトをインスタンス化します。

#### ステップ 2 {#step-2}

クライアントコードで、上記のファイルをインポートします：

```js
  import getWeb3 from '/path/to/web3';
```

以下の機能を呼び出します：

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2.アカウントをセットアップする {#2-set-up-account}

トランザクション（特にブロックチェーン状態を変更するもの）を送信するには、それらのトランザクションに署名するアカウントが必要です。上記のWeb3オブジェクトからコントラクトインスタンスをインスタンス化します：

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

`getAccounts()`機能は、ユーザのMetaMask上のすべてのアカウントの配列を返します。`accounts[0]`は、ユーザにより、現在選ばれているアカウントです。

### 3. コントラクトをインスタンス化する {#3-instantiate-your-contracts}

`web3`オブジェクトが整備されたら、契約のABIが既に整備されていると仮定して、次にコントラクトをインスタンス化します：

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. 機能を呼び出しする {#4-call-functions}

コントラクトから呼び出したい機能のために、インスタンス化されたコントラクトオブジェクト（ステップ2で`myContractInstance`宣言）と直接やり取りします。

:::tip 迅速なレビュー

コントラクトの状態を変更する関数を関数と呼びます`send()`。コントラクトの状態を変更しない関数を関数と呼びます`call()`。

:::

#### `call()`機能を呼び出しする {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### `send()`機能を呼び出しする {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
