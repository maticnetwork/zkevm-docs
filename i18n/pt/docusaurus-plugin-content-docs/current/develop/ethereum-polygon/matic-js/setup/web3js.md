---
id: web3
title: 'Configuração do Web3js'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'Instalar e configurar web3.js.'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) é uma coleção de bibliotecas que lhe permite interagir com um nó Ethereum local ou remoto, usando HTTP, IPC ou WebSocket.

## Configuração web3.js {#setup-web3-js}

suporte web3.js está disponível por meio do pacote seperate como um plugin para matic.js.

### Instalação {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### configuração {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Vamos ver um exemplo de criação de `POSClient` usando web3 -

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

## Exemplos {#examples}

Os exemplos para casos diferentes estão disponíveis em [web3 plugin repo](https://github.com/maticnetwork/maticjs-web3)
