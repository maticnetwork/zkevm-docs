---
id: fortmatic
title: Fortmatic
description: Formatic SDKを使用してdAppとPolygonを統合することができます。
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDKを使用すると、すでにWeb3と統合されているdAppまたはゼロから開始されているかどうか、EthereumブロックチェーンとdAppを簡単に統合できます。Fortmaticは、分散型アプリケーションユーザーとスムーズに楽しい体験を提供します。

## インストール {#installation}

Fortmaticのウォレットの最新バージョンをインストールするには、次のコマンドを使用します：

```bash
$ npm i --save fortmatic@latest
```

## 例 {#example}
Fortmaticを使用したアプリケーションの例を次に示します：

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
