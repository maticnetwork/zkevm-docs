---
id: get-started
title: Начало работы
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Начните работать с Matic.js
---

`@matic.js` — это библиотека javascript, которая помогает взаимодействовать с различными компонентами сети Matic.

В этом руководстве по началу работы мы ознакомимся с порядком настройки моста POS и взаимодействия с ним.

## Установка {#installation}

**Установите пакет maticjs через npm:**

```bash
npm install @maticnetwork/maticjs
```

**Установите плагин web3js**

```bash
npm install @maticnetwork/maticjs-web3
```

## Настройка {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

В приведенном выше коде мы инициируем maticjs с `web3js`, но вы также можете аналогичным образом инициировать maticjs с [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers).

## POS-клиент {#pos-client}

`POSClient` помогает взаимодействовать с мостом POS.

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

После инициации `POSClient` необходимо инициировать требуемые типы токенов, например `erc20`, `erc721` и т. д.

Давайте инициируем `erc20`

### erc20 {#erc20}

**создайте дочерний токен erc20**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**создайте родительский токен erc20**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

После инициации erc20 можно вызывать различные доступные методы, например `getBalance`, `approve`, `deposit`, `withdraw` и т. д.

Рассмотрим несколько примеров API:

#### получить остаток {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### утвердить {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


Как видите, благодаря простым API maticjs существенно облегчает взаимодействие с мостом maticjs. **Давайте приступим к созданию чего--нибудь потрясающего**

### Некоторые важные ссылки {#some-important-links}

- [Примеры](https://github.com/maticnetwork/matic.js/tree/master/examples)
