---
id: get-started
title: 始めましょう
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Matic.jsを始めましょう
---

`@matic.js`は、Maticネットワークのさまざまなコンポーネントとのやり取りに役立つjavascriptライブラリです。

この始めましょうのチュートリアルでは、PoSブリッジを設定およびやり取りする方法について学びます。

## インストール {#installation}

**npmを介してmaticjsパッケージをインストールします。**

```bash
npm install @maticnetwork/maticjs
```

**web3jsプラグインをインストールします**

```bash
npm install @maticnetwork/maticjs-web3
```

## セットアップ {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

上記のコードでは、`web3js`でmaticjsを開始していますが、[ether](/docs/develop/ethereum-polygon/matic-js/setup/ethers)で同様に開始することもできます。

## PoSクライアント {#pos-client}

`POSClient`は、PoSブリッジとのやり取りをするのに役立ちます。

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

`POSClient`が開始された後、-`erc20`、`erc721`等のような必要なトークンの種類を開始する必要があります。

`erc20`を開始しましょう

### ERC20 {#erc20}

**ERC20子トークンを作成**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**ERC20親トークンを作成**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

ERC20が開始されると、-`getBalance`、`approve`、`deposit`、`withdraw`等のように、利用可能なさまざまなメソッドを呼び出すことができます。

APIの例の一部を見てみましょう -

#### 残高を取得 {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### 承認 {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


ご覧のとおり、単純なAPI maticjsにより、maticjブリッジとのやり取りが非常に簡単になります。**何か素晴らしいものを作成することから始めましょう**

### いくつかの重要なリンク {#some-important-links}

- [例](https://github.com/maticnetwork/matic.js/tree/master/examples)
