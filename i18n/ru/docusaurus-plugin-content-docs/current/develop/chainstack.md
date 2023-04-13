---
id: chainstack
title: Развернуть смарт-контракт с помощью Chainstack и Foundry
sidebar_label: Using Chainstack
description:  Используйте Chainstack и Foundry для разработки смарт-контракта на Polygon
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Обзор {#overview}

Этот раздел позволяет вам развертывать контракт Hello World с использованием [Chainstack](https://chainstack.com/build-better-with-polygon/) и [Foundry](https://github.com/gakonst/foundry/) в тестовой сети Polygon Mumbai.

Chainstack обеспечивает инфраструктуру приложений на основе Ethereum и других блокчейнов. Они поддерживают узлы и гарантируют их подключение к сети, а также предлагают интерфейс для взаимодействия с mainnet и testnets.

Foundry — это быстрый набор инструментов для разработки приложений Ethereum, написанных на Rust. Он обеспечивает тестирование, взаимодействие со смарт-контрактами EVM, отправку транзакций и извлечение данных блокчейна.

:::tip

Если у вас есть какие-либо вопросы, свяжитесь с сервером [<ins>Chainstack Discord</ins>](https://discord.com/invite/Cymtg2f7pX).

:::

## Что вы узнаете {#what-you-will-learn}

Создание контракта Hello World с использованием Chainstack для развертывания нода Polygon и Foundry для развертывания контракта.

## Что вы сделаете {#what-you-will-do}

1. Развернете нод Polygon с помощью Chainstack
2. Настроите Foundry
3. Создадите смарт-контракт
4. Развернете смарт-контракт.

## Развертывание нода Polygon Mumbai {#deploy-a-polygon-mumbai-node}

Вам нужен узел для развертывания смарт-контракта в блокчейн-сети. Чтобы запустить свой узел и запустить следующие:

**Шаг 1 →** Зарегистрируйтесь с [Chainstack](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

**Шаг 2 →** Следуйте инструкциям о том, как [развернуть узел Mumbai](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)

![img](/img/chainstack/join-network.png)

**Шаг 3 →** Получить [конечную точку HTTPS дислоцированного узла](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## Установка Foundry {#install-foundry}

Foundry — это набор инструментов для разработки смарт-контрактов. Чтобы начать с ним работать, вам необходимо предварительно установить язык программирования Rust.

1. [Установите Rust](https://www.rust-lang.org/tools/install).
1. [Установите Foundry](https://github.com/gakonst/foundry/).

## Инициализация с помощью Foundry {#initialize-with-foundry}

Чтобы создать шаблонный проект, перейдите в свой рабочий каталог и выполните команду:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## Пополнение аккаунта {#fund-your-account}

Для развертывания смарт-контракта вам потребуется аккаунт кошелька. Вы можете использовать [Metamask](https://metamask.io/) для этого. Кроме того, для развертывания контракта необходимо оплатить газ в сети. Просто скопируйте адрес кошелька и получите токен Mumbai MATIC [через кран](https://faucet.polygon.technology/).

## Создание контракта Hello World {#create-the-hello-world-contract}

В инициализированном проекте Foundry в папке `src/` создайте `HelloWorld.sol`:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## Развертывание контракта {#deploy-the-contract}

На данном этапе вы готовы развернуть свой контракт:

* У вас имеется собственный нод в сети Polygon Mumbai, через который вы будете развертывать контракт.
* У вас есть Foundry, который вы будете использовать для развертывания контракта.
* У вас есть пополненный аккаунт, с помощью которого будет развертываться контракт.

Чтобы развернуть контракт, выполните команду:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

Здесь,

* CONTRACT_PATH — путь к вашему файлу `HelloWorld.sol`.
* PRIVATE_KEY — приватный ключ от вашего аккаунта.
* HTTPS_ENDPOINT — [конечная точка вашего нода](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Пример:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

Вы всегда можете проверить развертывание контракта на [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/), используя вновь сгенерированный хэш из последнего шага.

:::

## Тестирование контракта {#test-the-contract}

Существует команда `forge test` на тот случай, если вам понадобится проверить работу контракта. Foundry предоставляет несколько [вариантов](https://book.getfoundry.sh/reference/forge/forge-test) (флагов) для выполнения более конкретных проверок. Более подробная информация о написании проверок, расширенной проверке и других функциях приводится в [документации Foundry](https://book.getfoundry.sh/forge/tests).

**Поздравляем! Вы разместили свой смарт-контракт Hello World на Polygon.**

Дополнительные [<ins>руководства</ins>](https://docs.chainstack.com/tutorials/polygon/) и [<ins>инструменты</ins>](https://docs.chainstack.com/operations/polygon/tools), имеющие отношение к Polygon, описываются в документации Chainstack.
