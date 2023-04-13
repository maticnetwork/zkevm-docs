---
id: web3
title: 'Настройка web3js'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'Установите и настройте web3.js.'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) — это коллекция библиотек, которые позволяют взаимодействовать с локальным или удаленным нодом ethereum с помощью протоколов HTTP, IPC или WebSocket.

## Настройка web3.js {#setup-web3-js}

Поддержка web3.js обеспечивается с помощью отдельного пакета, предоставляемого в качестве плагина для matic.js.

### Установка {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### настройка {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Рассмотрим пример создания `POSClient` с помощью web3:

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

## Примеры {#examples}

Примеры для различных ситуаций доступны в [репозитории плагинов web3](https://github.com/maticnetwork/maticjs-web3)
