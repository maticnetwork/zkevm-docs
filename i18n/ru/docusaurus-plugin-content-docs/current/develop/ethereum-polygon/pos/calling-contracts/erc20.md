---
id: erc20
title: Руководство по депозиту и выводу ERC20
sidebar_label: ERC20
description: "Доступные функции для контрактов ERC20."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## Поток высокого уровня {#high-level-flow}

Депозит ERC20 -

1. **_Утвердите контракт_** **_ERC20Predicate_** для получения возможности тратить вносимые на депозит токены.
2. Выполните вызов **_depositFor_** в **_RootChainManager_**.

Вывод ERC20 -

1. **_Сожгите_** токены в Polygon chain.
2. Вызовите функцию **_exit_** в **_RootChainManager_** для отправки подтверждения транзакции сжигания. Этот вызов можно сделать **_после отправки checkpoint_** для блока, содержащего транзакцию сжигания.

## Настройка деталей {#setup-details}

### Создание экземпляров контрактов {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Утвердить {#approve}
Утвердите **_ERC20Predicate_** для расходования токенов, вызвав функцию **_approve_** контракта токена. Эта функция принимает два аргумента — spender и amount. **_spender_** — это адрес, которому разрешено тратить токены пользователя. **_amount_** — это количество токенов, которые можно потратить. Значение amount должно быть равно количеству вносимых на депозит токенов для разового разрешения или большему числу, что позволит избежать многократного одобрения.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Депозит {#deposit}
Обратите внимание, что токен необходимо сопоставить, и сумму необходимо одобрить для депозита, прежде чем выполнять этот вызов.  
Вызвать `depositFor()`функцию `RootChainManager`контракта. Эта функция принимает 3 аргумента: , а `depositData`. — это адрес пользователя, который получит депозит в цепочке `rootToken`Polygon. `userAddress`— адрес токена в главной цепочке. `depositData`— это `userAddress``rootToken`сумма, закодированная ABI.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Сжигание {#burn}
Токены можно сжигать в Polygon chain посредством вызова функции **_withdraw_** для контракта дочернего токена. Эта функция принимает единственный аргумент **_amount_**, указывающий на количество токенов для сжигания. Подтверждение этого сжигания необходимо отправить на этапе выхода. В связи с этим необходимо сохранить хэш транзакции.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Выход {#exit}
Функция выхода в `RootChainManager`контракте должна быть вызвана для разблокировки и получения токенов обратно.`ERC20Predicate` Эта функция принимает однобайтовый аргумент, являющийся доказательством транзакции сжигания. Подождите checkpoint, содержащий транзакцию записанного, перед вызовом этой функции. Доказательство генерируется с помощью кодирования RLP, следующего поля -

1. headerNumber - номер блока заголовка Checkpoint, содержащий tx сжигания
2. blockProof - доказательство того, что заголовок блока (в дочерней цепочке) является листом отправленного корня дерева Меркла
3. blockNumber - номер блока, содержащего tx сжигания в дочерней цепочке
4. blockTime - время блокировки tx сжигания
5. txRoot - корень блока транзакции
6. receiptRoot - получение корня блока
7. receipt - получение транзакции сжигания
8. receiptProof - доказательство получения сжигания с помощью дерева Меркла
9. branchMask - 32 бита, означающие путь получения в дереве Меркла Патрисии
10. receiptLogIndex - указатель журнала для чтения квитанции о получении

Генерировать доказательство вручную может быть непросто, и поэтому рекомендуется использовать Polygon Edge. Если вы хотите отправить транзакцию вручную, вы можете передать **_encodeAbi_** как **_true_** в объекте опций для получения необработанных данных calldata.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

Отправьте эти данные calldata в **_RootChainManager_**.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
