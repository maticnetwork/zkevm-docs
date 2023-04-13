---
id: ethers
title: 'Etherを設定'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'ETHERS.jsをインストールおよび設定'
---

# Ether.js {#ether-js}

[ethers.js](https://docs.ethers.io/)ライブラリは、Ethereumブロックチェーンおよびそのエコシステムとやり取りするために、完全でコンパクトなライブラリを目指します。

## ETHER.jsを設定 {#setup-ether-js}

ether.jpサポートは、Matic.jsのプラグインとして、別々のパッケージを介して利用可能です。

### インストール {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### 設定 {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

etherを使用して`POSClient`を作成する例を見ていきましょう

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { providers, Wallet } from "ethers";


// install web3 plugin
use(Web3ClientPlugin);

const parentProvider = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## 例 {#examples}

異なるケースの例は、[ETHERプラグインのレポ](https://github.com/maticnetwork/maticjs-ethers)で利用可能です。
