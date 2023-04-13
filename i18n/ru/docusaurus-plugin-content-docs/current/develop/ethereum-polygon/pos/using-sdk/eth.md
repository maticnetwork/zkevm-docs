---
id: eth
title: Руководство по депозиту и выводу ETH
sidebar_label: ETH
description: "Депозит и вывод токенов ETH в сети Polygon."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

Ознакомьтесь с актуальной документацией [Matic.js по ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/).

## Краткий обзор {#quick-summary}

В этом разделе документации описывается процедура депозита и вывода токенов ERC20 в сети Polygon. В разделах документации по ETH, ERC20, ERC721 и ERC1155 имеются общие функции с отличиями в названиях и схемах реализации в соответствии со стандартами. Наиболее важное предварительное требование к использованию этого раздела документации заключается в сопоставлении ваших активов, так что мы просим отправить заявку на сопоставление [здесь](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

## Введение {#introduction}

Для демонстрации перемещения активов между двумя блокчейнами в этом руководстве используется тестовая сеть Polygon (Mumbai), для которой самой выполнено сопоставление. Важно отметить, что для целей этого руководства по возможности следует использовать адрес прокси. Это связано с тем, что хотя адрес контракта на реализацию изменяется при добавлении в код контракта нового обновления, прокси никогда не меняется и перенаправляет все входящие вызовы на последнюю реализацию. Фактически, если вы используете адрес прокси, вам не нужно беспокоиться о каких-либо изменениях в контракте реализации до того, как вы будете готовы.

Например, используйте `RootChainManagerProxy`адрес для взаимодействия, а не `RootChainManager`адреса. Данные развертывания, такие как адреса контракта PoS, адреса ABI и Test Token можно найти [здесь](/docs/develop/ethereum-polygon/pos/deployment/).

Сопоставление активов является необходимым шагом для реализации моста PoS в вашем приложении, так что если вы не сделали этого, отправьте заявку на сопоставление [здесь](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/). Для целей настоящего руководства команда развернула тестовые токены и выполнила их сопоставление для моста PoS. Запросите актив, который вы хотите использовать в [faucet](https://faucet.polygon.technology/), и если тестовые токены будут недоступны, свяжитесь с командой через [Discord](https://discord.com/invite/0xPolygon). Мы постараемся ответить вам как можно скорее.

В будущем руководстве каждый шаг будет разъяснен подробно с предоставлением нескольких сниппетов кода. Однако вы всегда сможете сослаться на этот [репозиторий](https://github.com/maticnetwork/matic.js/tree/master/examples), который будет содержать все **примеры исходного кода**, которые могут помочь вам выполнить интеграцию и понять принципы работы моста PoS.

## Поток высокого уровня {#high-level-flow}

Депозит ETH -

1. Выполните вызов **_depositEtherFor_** в **_RootChainManager_** и **отправьте** требуемое количество эфира.

Вывод ETH -

1. **_Сожгите_** токены в Polygon chain.
2. Вызовите функцию **_exit_** в **_RootChainManager_** для отправки подтверждения транзакции сжигания. Этот вызов можно сделать **_после отправки checkpoint_** для блока, содержащего транзакцию сжигания.

## Шаги {#steps}

### Депозит {#deposit}

Вы можете внести ETH на депозит в цепочку Polygon, вызвав **depositEtherFor** в контракте **RootChainManager**. Клиент Polygon PoS открывает метод **depositEther**, чтобы осуществить этот вызов.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
Депозиты из Ethereum в Polygon происходят с помощью Механизма **синхронизации** штата, и это занимает около 22-30 минут. После ожидания этого интервала рекомендуется проверить баланс с помощью библиотеки web3.js/matic.js или с помощью Metamask. Баланс будет показан в обозревателе, только если в дочерней цепочке была выполнена как минимум одна передача активов. Эта [<ins>ссылка</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) объясняет, как отслеживать события депозита.
:::

### Сжигание {#burn}

ETH депонируется в качестве токена ERC20 в цепочке Polygon. Вывод следует тому же процессу, что и вывод токенов ERC20.

Чтобы сжечь токены и подключить процесс вывода, вызовите функцию вывода контракта MaticWETH Поскольку Ether — это токен ERC20 в цепочке Polygon, вам необходимо инициировать токен **ERC20** из клиента Polygon PoS, а затем вызвать `withdrawStart()`метод для запуска процесса запуска.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Сохраните хэш транзакции для этого вызова и используйте его при генерировании доказательства сжигания.

### Выход {#exit}


После того, как **checkpoint** будет отправлен для блока, содержащего транзакцию записки, пользователь должен вызвать функцию **выхода** `RootChainManager`контракта и предоставить доказательства сгорания. После отправки корректного доказательства токены передаются пользователю. Клиент Polygon POS `erc20` открывает метод `withdrawExit` для выполнения этого вызова. Эту функцию можно вызвать только после включения checkpoint в основную цепочку. Включение checkpoint можно отследить с помощью этого [руководства](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
