---
id: get-started
title: Démarrez
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Commencez à utiliser Matic.js
---

Le `@matic.js` est une bibliothèque javascript qui aide à interagir avec les différents composants du Réseau Matic.

Dans ce tutoriel de Démarrage, nous apprendrons comment configurer et interagir avec le pont POS.

## Installation {#installation}

**Installez le package maticjs via npm:**

```bash
npm install @maticnetwork/maticjs
```

**Installez le plugin web3js**

```bash
npm install @maticnetwork/maticjs-web3
```

## Configuration {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Dans le code ci-dessus, nous lançons maticjs avec `web3js` mais vous pouvez également lancer de la même manière avec des [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers).

## Client POS {#pos-client}

`POSClient` nous aide à interagir avec le Pont POS.

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

Une fois `POSClient` lancé, nous devons lancer les types de jetons requis tels que - `erc20`, `erc721` etc.

Procédons au lancement de `erc20` -

### erc20 {#erc20}

**créez un jeton enfant erc20**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**créez un jeton parent erc20**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

Une fois le erc20 lancé, vous pouvez appeler différentes méthodes disponibles, comme - `getBalance`, `approve`, `deposit` , `withdraw` etc.

Voyons quelques exemples d'API -

#### obtenez un solde {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### approuvez {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


Comme vous pouvez le voir, avec ses API simples, maticjs facilite l'interaction avec le pont maticjs. **Commençons par créer quelque chose de génial**

### Quelques liens importants {#some-important-links}

- [Exemples](https://github.com/maticnetwork/matic.js/tree/master/examples)
