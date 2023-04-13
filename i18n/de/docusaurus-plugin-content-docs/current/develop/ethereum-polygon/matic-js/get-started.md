---
id: get-started
title: Erste Schritte
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Erste Schritte mit Matic.js
---

`@matic.js` ist eine JavaScript-Bibliothek für die Kommunikation mit verschiedenen Komponenten des Matic-Netzwerkes.

Im Tutorial "Erste Schritte" erfährst du, wie man die POS-Bridge einrichtet und mit ihr kommunizieren kann.

## Installation {#installation}

**maticjs-Paket über npm installieren:**

```bash
npm install @maticnetwork/maticjs
```

**web3js Plugin installieren**

```bash
npm install @maticnetwork/maticjs-web3
```

## Setup {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Im obigen Code initiieren wir die maticjs mit `web3js`, aber du kannst diese auch mit [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers) initiieren.

## POS Client {#pos-client}

`POSClient` hilft uns bei der Kommunikation mit der POS Bridge.

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

Nachdem `POSClient` initiiert wurde, müssen wir die erforderlichen Token-Arten wie - `erc20`, `erc721` etc., initiieren.

Initiieren wir nun `erc20` -

### erc20 {#erc20}

**erc20 Child Token erstellen**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**erc20 Parent Token erstellen**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

Sobald erc20 initiiert ist, kannst du verschiedene verfügbare Methoden wie - `getBalance`, `approve`, `deposit` , `withdraw` usw. aufrufen.

Hier sind einige Beispiele von API -

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


Wie du sehen kannst, machen diese unkomplizierten APIs maticjs die Kommunikation mit der maticjs Bridge ganz einfach. **Jetzt starten wir etwas ganz besonderes**

### Einige wichtige Links {#some-important-links}

- [Beispiele](https://github.com/maticnetwork/matic.js/tree/master/examples)
