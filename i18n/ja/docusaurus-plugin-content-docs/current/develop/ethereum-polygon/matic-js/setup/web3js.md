---
id: web3
title: 'Web3jsを設定'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'web3.jsをインストールして設定します。'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/)は、HTTP、IPC、またはWebSocketを使用して、ローカルまたはリモートのEthereumノードとやり取りできるライブラリのコレクションです。

## web3.jsを設定 {#setup-web3-js}

web3.jpサポートは、Matic.jsのプラグインとして、別々のパッケージを介して利用可能です。

### インストール {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### 設定 {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

web3を使用して、`POSClient`を作成する例を見てみましょう。

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

## 例 {#examples}

異なるケースの例は、[web3プラグインのレポ](https://github.com/maticnetwork/maticjs-web3)で利用可能です。
