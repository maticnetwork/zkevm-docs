---
id: get-started
title: Memulai
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Memulai dengan Matic.js
---

`@matic.js` adalah pustaka javascript yang membantu berinteraksi dengan berbagai komponen Jaringan Matic.

Dalam tutorial Memulai ini, kita akan mempelajari cara mengatur dan berinteraksi dengan jembatan POS.

## Instalasi {#installation}

**Instal paket maticjs via npm:**

```bash
npm install @maticnetwork/maticjs
```

**Instal plugin web3js**

```bash
npm install @maticnetwork/maticjs-web3
```

## Pengaturan {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Dalam kode di atas kita menginisiasi maticjs dengan `web3js`, tetapi Anda juga dapat memulai secara serupa dengan [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers).

## Klien POS {#pos-client}

`POSClient` membantu kita berinteraksi dengan Jembatan POS.

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

Setelah `POSClient` diinisiasi, kita perlu memulai jenis token yang diperlukan seperti - `erc20`, `erc721`, dll.

Mari kita menginisiasi `erc20` -

### erc20 {#erc20}

**membuat token anak erc20**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**membuat token induk erc20**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

Setelah erc20 diinisiasi, Anda dapat memanggil berbagai metode yang tersedia, seperti - `getBalance`, `approve`, `deposit`, `withdraw`, dll.

Mari kita lihat beberapa contoh API -

#### get balance {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### approve {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


Seperti yang Anda lihat, interaksi dengan jembatan maticjs menjadi mudah menggunakan API maticjs yang sederhana. **Mari kita mulai dengan membuat sesuatu yang mengagumkan**

### Beberapa tautan penting {#some-important-links}

- [Contoh](https://github.com/maticnetwork/matic.js/tree/master/examples)
