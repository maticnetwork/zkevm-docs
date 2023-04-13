---
id: ether
title: Руководство по депозиту и выводу Ether
sidebar_label: Ether
description:  "Доступные функции для контрактов Ether."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## Поток высокого уровня {#high-level-flow}

Депозит Ether -

- Выполните вызов depositEtherFor в **RootChainManager** и отправьте актив в ether.

Вывод Ether -

1. **_Сожгите_** токены в Polygon chain.
2. Вызовите функцию **_exit_** в **_RootChainManager_** для отправки подтверждения транзакции сжигания. Этот вызов можно сделать **_после отправки checkpoint_** для блока, содержащего транзакцию сжигания.

## Детали шага {#step-details}

### Создание экземпляров контрактов {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### deposit {#deposit}
Вызвать `depositEtherFor`функцию `RootChainManager`контракта. Эта функция принимает аргумент 1 — , который является адресом `userAddress`пользователя, который получит депозит в цепочке Polygon. Сумма эфира, подлежащего депонированию, должна быть отправлена в качестве стоимости транзакции.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Сжигание {#burn}
Поскольку Ether — это токен ERC20 в цепочке Polygon, его вывод будет таким же, как вывод ERC20. Токены можно сжечь, вызывая `withdraw`функцию в контракте на токен child. Эта функция принимает один аргумент, `amount`указывающий количество токенов, которые будут сжигать. Подтверждение этого сжигания необходимо отправить на этапе выхода. В связи с этим необходимо сохранить хэш транзакции.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Выход {#exit}
Функция выхода в `RootChainManager`контракте должна быть вызвана для разблокировки и получения токенов обратно.`EtherPredicate` Эта функция принимает однобайтовый аргумент, являющийся доказательством транзакции сжигания. Подождите checkpoint, содержащий транзакцию записанного, перед вызовом этой функции. Доказательство генерируется с помощью RLP-encoding следующих полей:

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
