---
id: get-started
title: Come iniziare
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Introduzione a Matic.js
---

`@matic.js` è una libreria javascript che consente di interagire con i vari componenti della rete Matic Network.

In questo tutorial, Come Iniziare, impareremo come configurare e interagire con il bridge POS.

## Installazione {#installation}

**Installa il pacchetto maticjs tramite npm:**

```bash
npm install @maticnetwork/maticjs
```

**Installa il plugin web3js:**

```bash
npm install @maticnetwork/maticjs-web3
```

## Configurazione {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Il codice sopra riportato inizializza maticjs con `web3js`, ma puoi anche avviarlo in modo analogo con [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers).

## POSClient {#pos-client}

`POSClient` consente di interagire con il bridge POS.

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

Una volta avviato `POSClient`, dobbiamo avviare i tipi di token richiesti come `erc20`, `erc721` ecc.

Avviamo `erc20`:

### erc20 {#erc20}

**crea un token figlio erc20**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**crea un token padre erc20**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

Dopo aver avviato erc20, puoi chiamare vari metodi disponibili, come `getBalance`, `approve`,`deposit`, `withdraw`ecc.

Vediamo alcuni esempi di API:

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


Come puoi vedere, con queste semplici API maticjs facilita l'interazione con maticjs bridge. **Iniziamo creando qualcosa di incredibile**

### Alcuni link importanti {#some-important-links}

- [Esempi](https://github.com/maticnetwork/matic.js/tree/master/examples)
