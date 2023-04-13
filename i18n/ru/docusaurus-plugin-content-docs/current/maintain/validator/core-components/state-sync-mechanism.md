---
id: state-sync-mechanism
title: Механизм синхронизации состояний
description: Механизм синхронизации состояния для нативно чтения данных Ethereum
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Валидаторы на уровне [Heimdall](/docs/maintain/glossary.md#heimdall) выбирают событие [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) и передают его на уровень [Bor](/docs/maintain/glossary.md#bor). См. также статью [Архитектура Polygon](/docs/pos/polygon-architecture).

**Контракт получателя** наследует [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol), а пользовательская логика располагается внутри функции [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5).

Последняя версия [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) содержит несколько улучшений, таких как:
1. Ограничение размера данных в транзакциях синхронизации состояний:
    * **30 КБ** при представлении в **байтах**.
    * **60 КБ** при представлении в виде **строки**.
2. Увеличение **времени задержки** между событиями контрактов разных валидаторов с той целью, чтобы в случае резкого увеличения количества событий, которые могут помешать дальнейшей реализации цепочки, пул памяти не заполнялся очень быстро.

На следующем примере показано, как ограничивается размер данных:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## Требования к пользователям {#requirements-for-the-users}

Для работы с механизмом синхронизации состояний от децентрализованных приложений / пользователей требуется следующее:

1. Вызов функции [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33).
2. Функция `syncState` вызывает событие `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`.
3. Все валидаторы в цепочке Heimdall получают событие `StateSynced`. Любой валидатор, который желает получить комиссию за транзакции синхронизации состояний, отправляет транзакцию на уровень Heimdall.
4. После включения транзакции `state-sync` на уровне Heimdall в блок она добавляется в ожидающий проверки список синхронизации состояний.
5. После каждого спринта на Bor нод этого уровня получает события синхронизации состояний, ожидающие проверки, из Heimdall с помощью вызова API.
6. Контракт получателя наследует интерфейс `IStateReceiver`, а пользовательская логика декодирования байтов данных и выполнения любых действий находится внутри функции [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol).
