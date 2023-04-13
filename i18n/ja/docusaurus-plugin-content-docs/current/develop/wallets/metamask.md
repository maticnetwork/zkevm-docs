---
id: metamask
title: MetaMask
description: Polygonで新しいブロックチェーンアプリを構築しましょう。
keywords:
  - docs
  - matic
  - polygon
  - wallet
  - metamask
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

MetaMaskは、ユーザのEthereumウォレットを管理するブラウザのアドオンです。そのブラウザのデータストアに秘密鍵を保存し、パスワードで暗号化されたフレーズを保存します。これはノンカストディアルウォレットです。つまり、ユーザは秘密鍵にフルアクセスと全責任を持っています。失われると、ユーザは、貯蓄を管理したり、ウォレットへのアクセスを復元できません。

**タイプ**：非カストディアル/HD<br/>**秘密鍵ストレージ**：ユーザのブラウザストレージ<br/>**Ethereum Ledger**：Infuraへの通信<br/>**秘密鍵エンコーディング**：ニーモニック<br/>

### 1. web3をセットアップする {#1-set-up-web3}

**ステップ 1**

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

> MetaMaskは、window.ethereumでユーザがアクセスしたWebサイトにグローバルAPIを挿入します (従来仕様との関係から、window.web3.currentProviderでも利用可能です)。このAPIを使用すると、Webサイトは、ユーザのログインをリクエストし、ユーザが接続しているブロックチェーンからデータをロードし、ユーザがメッセージとトランザクションに署名するよう提案できます。このAPIを使用して、web3ブラウザのユーザを検出できます。

簡単に言えば、基本的にはMetamaskの拡張機能/アドオンをブラウザにインストールし、`ethereum`（古いバージョンでは`web3`）という名前のグローバル変数を定義します。この変数を使用して、web3オブジェクトをインスタンス化します。

**ステップ 2**

さて、クライアントコードで、上記のファイルをインポートし、
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

ここで、トランザクション（特にブロックチェーンの状態を変更するもの）を送信するには、これらのトランザクションに署名するためのアカウントが必要です。上記で作成したweb3オブジェクトからコントラクトインスタンスをインスタンス化します。
```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```
`getAccounts()`機能は、ユーザのMetaMask上のすべてのアカウントの配列を返します。`accounts[0]`は、ユーザにより、現在選ばれているアカウントです。

### 3. コントラクトをインスタンス化する {#3-instantiate-your-contracts}

`web3`オブジェクトを配置したら、次にコントラクトをインスタンス化します > コントラクトABIとアドレスが既に配置されていると仮定します：
```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```
### 4. 機能を呼び出しする {#4-call-functions}

コントラクトから呼び出したい機能は、インスタンス化されたコントラクトオブジェクト（ステップ 2 で宣言された`myContractInstance`）と直接やり取りする

簡単なレビュー： - コントラクトの状態を変更する機能は、`send()`と呼ばれる - コントラクトの状態を変更しない機能は、`call()`機能と呼ばれる

**`call()`機能を呼び出しする**
```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```
**`send()`機能を呼び出しする**
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
