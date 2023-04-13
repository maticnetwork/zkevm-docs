---
id: new-to-polygon
title: Добро пожаловать в Polygon
description: Создайте следующее приложение blockchain в Polygon
keywords:
  - docs
  - matic
  - polygon
  - new to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Добро пожаловать в Polygon {#welcome-to-polygon}

Polygon — решение для масштабирования публичных блокчейнов. Polygon PoS поддерживает все существующие инструменты Ethereum и предлагает более быстрые и дешевые транзакции.

## Типы взаимодействий на Polygon {#types-of-interaction-on-polygon}

* [Цепочка Polygon PoS](/docs/develop/getting-started)
* [Ethereum + Polygon с мостом PoS](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/getting-started)
* [Ethereum + Polygon с мостом Plasma](https://docs.polygon.technology/docs/develop/ethereum-polygon/plasma/getting-started)

## Запрос блокчейна {#query-the-blockchain}

Большинство взаимодействий блокчейна включают чтение его состояния.

Alchemy предлагает справочный справочник о том, как сделать основные запросы в блокчейн. Проверьте их руководство по [запросу Polygon](https://docs.alchemy.com/reference/polygon-sdk-examples).

## Развертывание смарт-контрактов {#deploy-smart-contracts}

* Развертывание контрактов на Polygon
    - [Использование Alchemy](/docs/develop/alchemy)
    - [Использование Chainstack](/docs/develop/chainstack)
    - [Использование QuickNode](/docs/develop/quicknode)
    - [Использование Remix](/docs/develop/remix)
    - [Использование Truffle](/docs/develop/truffle)
    - [Использование Hardhat](/docs/develop/hardhat)

:::note

Настройка Web3 RPC-URL в "https://rpc-mumbai.matic.today", все остальное остается прежним.

:::

## Что такое блокчейн? {#what-is-a-blockchain}

В двух словах, блокчейн — это общий, неизменяемый регистр для записи транзакций, отслеживания активов и формирования доверия. Перейдите в раздел [«Основы блокчейна»](blockchain-basics/basics-blockchain.md), чтобы узнать больше.

## Что такое сайдчейн? {#what-is-a-sidechain}

Сайдчейн можно рассматривать как клон «родительского» блокчейна, который поддерживает передачу активов в основную цепочку и обратно. Это просто альтернатива родительской цепочке, которая формирует новый блокчейн с собственным механизмом создания блоков (механизм консенсуса). Подключение сайдчейна к родительской цепи включает настройку метода перемещения активов между цепочками.

## Роли валидатора и делегата {#validator-and-delegator-roles}

В сети Polygon можно быть валидатором или делегатом. См.

* [Кто такой валидатор](/docs/maintain/polygon-basics/who-is-validator)
* [Кто такой делегат](/docs/maintain/polygon-basics/who-is-delegator)

## Архитектура {#architecture}

Если ваша цель — стать валидатором, важно, чтобы вы понимали архитектуру Polygon.

См. [«Архитектура Polygon»](/docs/maintain/validator/architecture).

### Компоненты {#components}

Чтобы получить детальное представление об архитектуре Polygon, см. следующие основные компоненты:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Контракты](/docs/pos/contracts/stakingmanager)

#### Кодовые базы {#codebases}

Чтобы получить детальное представление об основных компонентах, см. следующие кодовые базы:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Контракты](https://github.com/maticnetwork/contracts)

## Инструкции {#how-tos}

### Настройка ноды {#node-setup}

Если вы хотите запустить полный узел в Polygon Mainnet или Mumbai Testnet, вы можете следовать Запустите руководство [в узел](/maintain/validate/run-validator.md) валидатора.

### Операции стейкинга {#staking-operations}

* [Операции стейкинга валидатора](/docs/maintain/validate/validator-staking-operations)
* [Делегирование](/docs/maintain/delegate/delegate)

### Внешние ресурсы {#external-resources}
- [Ваш первый dApp](https://www.youtube.com/watch?v=rzvk2kdjr2I)
- [Sidechains и Childchains](https://hackernoon.com/what-are-sidechains-and-childchains-7202cc9e5994)