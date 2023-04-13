---
id: erc20
title: Руководство по депозиту и выводу ERC20
sidebar_label: ERC20
description: "Депозит и вывод токенов ERC20 в сети Polygon."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Ознакомьтесь с актуальной [документацией Matic.js по ERC20](https://maticnetwork.github.io/matic.js/docs/pos/erc20/).

Это руководство использует тестовую сеть Polygon ( Mumbai ), которая сопоставлена с сетью Goerli, для демонстрации перевода активов между двумя блокчейнами. **Важно отметить, что** при следовании указаниям настоящего руководства следует использовать адрес прокси всегда, когда это возможно. Например, адрес **RootChainManagerProxy** должен использоваться для взаимодействия вместо адреса **RootChainManager.** **Адреса контрактов PoS, ABI, адреса тестовых токенов** и другие детали развертывания контрактов моста PoS можно найти [здесь](/docs/develop/ethereum-polygon/pos/deployment).

**Сопоставление активов** необходимо для интеграции моста PoS в ваше приложение. Вы можете отправить запрос на сопоставление [здесь](/docs/develop/ethereum-polygon/submit-mapping-request). Но для этого урока мы уже развернули **токены Test** и отобрали их на мосту PoS. Это может вам потребоваться, если вы захотите попробовать выполнить указания руководства самостоятельно. Вы можете запросить желаемый актив из [faucet](https://faucet.polygon.technology/). Если тестовые токены недоступны на кране, свяжитесь с нами по [discord](https://discord.com/invite/0xPolygonn).

В будущем руководстве каждый шаг будет разъяснен подробно с предоставлением нескольких сниппетов кода. Однако вы всегда сможете сослаться на этот [репозиторий](https://github.com/maticnetwork/matic.js/tree/master/examples/pos), который будет содержать все **примеры исходного кода**, которые могут помочь вам выполнить интеграцию и понять принципы работы моста PoS.

## Поток высокого уровня {#high-level-flow}

Депозит ERC20 -

1. **_Утвердите контракт_** **_ERC20Predicate_** для получения возможности тратить вносимые на депозит токены.
2. Выполните вызов **_depositFor_** в **_RootChainManager_**.

Вывод ERC20 -

1. Сжигать токены в цепочке Polygon.
2. Вызвать `exit()`функцию `RootChainManager`для отправки доказательства транзакции burn Этот вызов может быть выполнен после того, как checkpoint будет отправлен для блока, содержащего транзакцию записки.

## Шаги Детали {#steps-details}

### Утвердить {#approve}

Это нормальное утверждение ERC20, позволяющее **_ERC20Predicate_** вызвать функцию **_transferFrom_**. Клиент Polygon POS открывает метод **_approve_** для выполнения этого вызова.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### deposit {#deposit}

Обратите внимание, что токен должен быть отображен и утвержден для передачи заранее. Клиент Polygon PoS предоставляет `deposit()`метод для этого вызова.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
Депозиты из Ethereum в Polygon происходят с помощью механизма **синхронизации State** и занимают около 22-30 минут. После ожидания этого интервала рекомендуется проверить баланс с помощью библиотеки web3.js/matic.js или с помощью Metamask. Баланс будет показан в обозревателе, только если в дочерней цепочке была выполнена как минимум одна передача активов. Эта [<ins>ссылка</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) объясняет, как отслеживать события депозита.
:::

### Метод WithdrawStart для сжигания {#withdrawstart-method-to-burn}

`withdrawStart()`Метод может быть использован для инициирования процесса вывода, который будет сжигать заданную сумму в цепочке Polygon.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

Сохраните хэш транзакции для этого вызова и используйте его при генерировании доказательства сжигания.

### Выход {#exit}

После того, как checkpoint будет отправлен для блока, содержащего транзакцию записки, пользователь должен вызвать `exit()`функцию `RootChainManager`контракта и предоставить доказательства сгорания. После отправки действительного доказательства токены передаются пользователю. Клиент Polygon PoS предоставляет `withdrawExit`метод для этого вызова. Эту функцию можно вызвать только после включения checkpoint в основную цепочку. Включение checkpoint можно отслеживать следующим [образом](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).

Метод *withdrawExit* можно использовать для выхода из процесса вывода с помощью txHash из метода *withdrawStart*.

:::note
Транзакция вывода Start, чтобы выйти из вывода средств, должна быть checkpointed
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
