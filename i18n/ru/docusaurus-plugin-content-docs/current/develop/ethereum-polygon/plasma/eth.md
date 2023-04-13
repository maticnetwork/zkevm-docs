---
id: eth
title: Руководство по депозиту и выводу ETH
sidebar_label: ETH
description: "Депозит и вывод токенов ETH в сети Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### Поток высокого уровня {#high-level-flow}

#### **Депозит ETH (процесс из 1 шага)**

Функция **депозита** вызывается тогда, когда токены вносятся на депозит на контракт Polygon и становятся доступными для использования в сети Polygon.

#### **Трансфер ETH**

После получения средств в Polygon вы сможете использовать эти средства для мгновенной отправки другим пользователям.

#### **Вывод ETH (процесс из 3 шагов)**

1. Вывод средств инициируется Polygon. Интервал checkpoint в 30 минут (для testnets, ждать около 10 минут), где все блоки блока блока Polygon проверяются с момента последнего checkpoint.
2. После того, как checkpoint будет отправлен в контракт основной цепочки ERC20, токен NFT Exit (ERC721) создается из эквивалентного значения.
3. Вызванные средства могут быть возвращены на ваш счет ERC20 из основного контракта цепочки с использованием процедуры вывода процесса.

## Настройка деталей {#setup-details}

### Настройка Matic SDK {#configuring-matic-sdk}

Установите Matic SDK (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Инициирование клиента Maticjs

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

Создайте новый файл в корневом каталоге, названном `process.env`, со следующим содержимым:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## deposit {#deposit}

**Депозит** может быть осуществлен путем вызова `depositEther()``depositManagerContract`контракта.

Обратите внимание, что токен должен быть отображен и утвержден для передачи заранее.

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

Депозиты из Ethereum в Polygon происходят с помощью механизма синхронизации состояния, и занимают около 22-30 минут. После ожидания в течение этого временного интервала рекомендуется проверить баланс с помощью библиотеки web3.js/matic.js или Metamask. Баланс будет показан в обозревателе, только если в дочерней цепочке была выполнена как минимум одна передача активов. По этой [ссылке](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) вы узнаете, как отслеживать события депозита.

:::

## transfer {#transfer}

ETH в сети Polygon имеет вид WETH (токен ERC20).

```js
const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## Вывод {#withdraw}

### 1. Сжигание {#1-burn}

Пользователи могут вызвать `withdraw`функцию контракта на токен `getERC20TokenContract`ребенка. Эта функция должна сжечь токены. Клиент Polygon Plasma предоставляет `withdrawStart`метод для этого вызова.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

Пользователи могут вызвать `startExitWithBurntTokens()`функцию `erc20Predicate`контракта. Клиент Polygon Plasma предоставляет `withdrawConfirm()`метод для этого вызова. Эту функцию можно вызвать только после включения checkpoint в основную цепочку. Включение контрольной точки можно отследить с помощью этого [руководства](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events).


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. Выход из процесса {#3-process-exit}

Пользователь должен вызвать `processExits()`функцию `withdrawManager`контракта и предоставить доказательства сожжения. После отправки действительного доказательства токены передаются пользователю. Клиент Polygon Plasma предоставляет `withdrawExit()`метод для этого вызова.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Checkpoint, представляющий все транзакции, происходящие в Polygon в цепочке Ethereum каждые ~5 минут, регулярно отправляется в контракт на Ethereum.

:::