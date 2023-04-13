---
id: ethers
title: 'Настройка Ethers'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'Установите и настройте ethers.js'
---

# Ether.js {#ether-js}

Библиотека [ethers.js](https://docs.ethers.io/) имеет целью стать полной и компактной библиотекой для взаимодействия с блокчейном Ethereum и его экосистемой.

## Настройка ether.js {#setup-ether-js}

Поддержка ether.js обеспечивается с помощью отдельного пакета, предоставляемого в качестве плагина для matic.js.

### Установка {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### настройка {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

Рассмотрим пример создания `POSClient` с помощью ethers:

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

## Примеры {#examples}

Примеры для различных ситуаций доступны в [репозитории плагинов ethers](https://github.com/maticnetwork/maticjs-ethers).
