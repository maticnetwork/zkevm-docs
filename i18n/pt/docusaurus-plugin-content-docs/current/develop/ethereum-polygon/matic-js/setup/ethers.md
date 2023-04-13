---
id: ethers
title: 'Configuração da Ethers'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'instalar e configurar ethers.js'
---

# Ether.js {#ether-js}

A biblioteca [ethers.js](https://docs.ethers.io/) pretende ser uma biblioteca completa e compacta para interagir com a blockchain Ethereum e seu ecossistema.

## Configuração ether.js {#setup-ether-js}

O suporte web3.js está disponível, por meio do pacote seperate, como um plugin para matic.js.

### Instalação {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### configuração {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Vamos ver um exemplo de criação de `POSClient` com uso de ethers -

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

## Exemplos {#examples}

Os exemplos para casos diferentes estão disponíveis na [ethers plugin repo](https://github.com/maticnetwork/maticjs-ethers).
