---
title: Tellor
description: "Руководство по интеграции оракула Tellor в ваш контракт Polygon."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor — это оракул, предоставляющий устойчивые к цензуре данные, защищенные простыми криптоэкономическими стимулами. Данные могут предоставляться кем угодно и проверяться кем угодно. Гибкая структура Tellor может предоставить любые данные в любой интервал времени, чтобы обеспечить простоту экспериментирования / инноваций.

## (Мягкие) Предварительные требования {#soft-prerequisites}

Мы предполагаем, что перед работой над оракулом у вас имеются следующие навыки программирования.

Предположения:

- вы можете использовать терминал
- у вас установлен npm
- вы знаете, как использовать npm для управления зависимостями

Tellor — это активный оракул с открытым исходным кодом, готовый для реализации. Этот руководство для начинающего здесь, чтобы продемонстрировать легкость, с которой можно подняться и работать с Tellor, обеспечивая ваш проект полностью децентрализованным и устойчивым к цензуре.

## Обзор {#overview}

Tellor — это система оракула, где стороны могут запрашивать значение точки данных вне цепочки (например, BTC/USD), и авторы отчетов соревнуются для добавления этого значения в банк данных в цепочке, доступный для всех смарт-контрактов Polygon. Вводы в этот банк данных защищены сетью авторов отчетов со стейками. Tellor использует криптоэкономические механизмы поощрения. За честную отправку данных авторы отчетов получают вознаграждение в токенах Tellor. Недобросовестные пользователи быстро наказываются и удаляются из сети посредством механизма споров.

В этом руководстве мы рассмотрим следующее:

- Настройка начального набора инструментов, необходимого для начала работы.
- Выполнение простого примера.
- Укажите адреса тестовой сети для сетей, где вы можете тестировать Tellor.

## UsingTellor {#usingtellor}

Прежде всего, вам необходимо установить базовые инструменты для использования Tellor в качестве оракула. Используйте [этот пакет,](https://github.com/tellor-io/usingtellor) чтобы установить Tellor User Contracts:

`npm install usingtellor`

После установки это позволит вашим контрактам наследовать функции от контракта 'UsingTellor'.

Отлично! Теперь вы подготовили инструменты, и мы можем выполнить простое упражнение, в котором мы получим цену биткойна:

### Пример BTC/USD {#btc-usd-example}

Унаследуйте контракт UsingTellor, передав адрес Tellor в качестве аргумента конструктора:

Приведем пример:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## Адреса: {#addresses}

Tellor Tributes: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Оракул: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### Хотите сначала провести тестирование?: {#looking-to-do-some-testing-first}

Тестовая сеть Polygon Mumbai: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

Данные, подлежащие тестированию:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

Нужны тестовые токены? Tweet нас на ['@trbfaucet'](https://twitter.com/trbfaucet)

Для удобства использования репо UsingTellor поставляется с версией [контракта на Playground](https://github.com/tellor-io/TellorPlayground) Tellor, чтобы облегчить интеграцию. Список полезных функций см. [здесь.](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)

#### Для более устойчивой реализации оракула Tellor посмотрите полный список доступных функций [здесь.](https://github.com/tellor-io/usingtellor/blob/master/README.md)

#### Остались вопросы? Присоединяйтесь к сообществу [здесь!](https://discord.gg/tellor)
