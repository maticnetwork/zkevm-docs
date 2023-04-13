---
id: get-started
title: Introdução
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Introdução ao Matic.js
---

O `@matic.js` é uma biblioteca javascript que ajuda a interagir com os vários componentes da rede MATIC.

Neste tutorial de introdução - vamos aprender sobre como podemos configurar e interagir com a PoS Bridge.

## Instalação {#installation}

**Instale o pacote maticjs via NPM:**

```bash
npm install @maticnetwork/maticjs
```

**instalar o plugin web3js**

```bash
npm install @maticnetwork/maticjs-web3
```

## Configuração {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

No código acima estamos a iniciar o maticjs com `web3js`, mas também pode iniciar de forma semelhante com [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers).

## cliente PoS {#pos-client}

`POSClient` ajuda-nos interagir com a PoS Bridge.

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

Depois de `POSClient` ser iniciado, precisamos de iniciar os tipos de token necessários como - `erc20`, `erc721` etc.

Vamos iniciar `erc20` -

### ERC-20 {#erc20}

**criar token filho ERC-20**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**criar token pai ERC-20**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

Assim que ERC-20 for iniciado, pode chamar vários métodos disponíveis, como - `getBalance`, `approve`, `deposit` , `withdraw` etc.

Vamos ver alguns dos exemplos de API -

#### obter saldo {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### aprovar {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


Como pode ver, com as suas API simples, o maticjs torna muito fácil interagir com a bridge maticjs. **Vamos começar com a criação de algo incrível**

### Links úteis {#useful-links}

- [Exemplos](https://github.com/maticnetwork/matic.js/tree/master/examples)
