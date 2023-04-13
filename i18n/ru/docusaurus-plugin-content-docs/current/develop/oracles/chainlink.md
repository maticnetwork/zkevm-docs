---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Chainlink — это децентрализованная сеть оракула блокчейна, построенная на Ethereum.
keywords:
  - wiki
  - polygon
  - chainlink
  - oracle
  - decentralized
  - data
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Chainlink** позволяет вашим контрактам **получить доступ к любому внешнему источнику данных** через децентрализованную сеть oracle. Если вашему контракту нужно получить результаты спортивных событий, информацию о погоде или другие общедоступные данные, Chainlink предоставит вашему контракту необходимые для этого инструменты.

## Децентрализованные данные {#decentralized-data}

Одна из самых мощных функций Chainlink уже decentralized, aggregated, и готова быть digested данными в цепочке по большинству популярных криптовалют. Они известны как [**Feeds данных Chainlink**](https://docs.chain.link/docs/using-chainlink-reference-contracts).

Вот работающий пример контракта, извлекающего последнюю цену MATIC в долларах США в тестовой сети Mumbai.

Все, что вам нужно сделать, это вывести адрес [с любого адреса ленты](https://docs.chain.link/docs/matic-addresses#config) данных, который вы хотите, и вы можете начать swap информации о цене.

```
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai Testnet
     * Aggregator: MATIC/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

## Цикл запроса и получения {#request-and-receive-cycle}

Цикл запроса и получения в Chainlink позволяет вашим смарт-контрактам выполнять запросы к любым внешним API и получать ответы. Для реализации этой возможности в вашем контракте необходимо определить две функции:

1. Один для **запроса данных**, и
2. Еще один получит **ответ**.

Чтобы запросить данные, ваш контракт создает `request`объект, который он предоставляет оракулу. Когда оракул обратится к API и обработает ответ, он попытается отправить данные обратно в контракт, используя функцию обратного вызова, определенную в вашем смарт-контракте.

## Использование {#uses}

1. **Feeds данных Chainlink**

Это децентрализованные контрольные точки данных, уже агрегированные в цепочке, и самый быстрый, самый простой и самый дешевый способ получить данные из реального мира. В настоящее время поддерживаются многие самые популярные пары криптовалют и фиатных валют.

Для работы с лентами данных используйте [**каналы данных Polygon из**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) документации Chainlink.

2. **Функция проверки Chainlink**

Получить доказанно случайные числа, где случайный номер гарантированно быть случайным.

Для работы с Chainlink VRF, используйте [**адреса Polygon**](https://docs.chain.link/vrf/v2/subscription/supported-networks) VRF из [документации](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number) Chainlink.

3. **Chainlink API вызывает**

Как настроить свой смарт-контракт для работы с традиционными API и настроить для получения любых данных, отправить любые запросы через интернет и многое другое.

## Пример кода {#code-example}

Чтобы взаимодействовать с внешними API, ваш смарт-контракт должен наследовать из контракта [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol), разработанного для обеспечения удобства обработки запросов. Он открывает структуру `Chainlink.Request`, которую ваш контракт должен использовать для построения запроса API.

Запрос должен определить адрес оракула, идентификатор задания, гонорар, параметры адаптера и подпись функции обратного вызова. В этом примере запрос построен в функции `requestEthereumPrice`.

`fulfill` определяется как функция обратного вызова.

```
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Polygon Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4";
        fee = 10 ** 16; // 0.01 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestBTCCNYPrice() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // NOTE: If this oracle gets more than 5 requests from this job at a time, it will not return.
        request.add("get", "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo");

       // Set the path to find the desired data in the API response, where the response format is:
       // {
       //     "Realtime Currency Exchange Rate": {
       //       "1. From_Currency Code": "BTC",
       //       "2. From_Currency Name": "Bitcoin",
       //       "3. To_Currency Code": "CNY",
       //       "4. To_Currency Name": "Chinese Yuan",
       //       "5. Exchange Rate": "207838.88814500",
       //       "6. Last Refreshed": "2021-01-26 11:11:07",
       //       "7. Time Zone": "UTC",
       //      "8. Bid Price": "207838.82343000",
       //       "9. Ask Price": "207838.88814500"
       //     }
       //     }
        string[] memory path = new string[](2);
        path[0] = "Realtime Currency Exchange Rate";
        path[1] = "5. Exchange Rate";
        request.addStringArray("path", path);

        // Multiply the result by 10000000000 to remove decimals
        request.addInt("times", 10000000000);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}
```

## Токен Mainnet Polygon LINK {#mainnet-polygon-link-token}

Чтобы получить токен Polygon LINK из Ethereum Mainnet, необходимо следовать 2-ступенчатому процессу.

1. Создайте мост для LINK, используя мост Plasma или [мост PoS](https://wallet.polygon.technology/bridge).
2. Выполните своп LINK на версию ERC677 с помощью [Pegswap, развернутого Chainlink](https://pegswap.chain.link/).

Мост Polygon передает версию ERC20 LINK, а LINK использует версию ERC677, так что нам нужно просто выполнить обновление, используя этот своп.

## Адреса {#addresses}

В настоящее время в тестовой сети Polygon Mumbai имеется всего несколько работающих оракулов Chainlink. Однако вы всегда можете запустить собственный оракул и добавить его на маркетплейс Chainlink Marketplace.

* Оракул: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Чтобы получить LINK в Mumbai Testnet, перейдите в [кран Polygon](https://faucet.polygon.technology/).

## Поддерживаемые API {#supported-apis}

Цикл запроса и получения Chainlink обладает достаточной гибкостью для вызова любых публичных API, если параметры запроса верны, а формат ответа известен. Например, если объект ответа из URL, откуда мы хотим выполнить доставку, имеет следующий формат: `{"USD":243.33}`, путь будет выглядеть просто: `"USD"`.

Если API отвечает со сложным объектом JSON, параметру **path** необходимо будет указать где получить нужные данные, используя строку, выделенную точкой, для вложенных объектов. Например, рассмотрим следующий ответ:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

Для него потребуется следующий путь: `"Prices.USD"`. Если в строках есть пробелы, или строки достаточно длинны, мы можем использовать синтакси, приведенный в приведенном выше примере и передать все их в качестве массива строки.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## Для чего нужны идентификаторы заданий? {#what-are-job-ids-for}

Возможно, вы заметили, что наш [пример](#code-example) использует `jobId`параметр при создании запроса. Задания состоят из последовательностей инструкций, на выполнение которых настроен оракул. В приведенном выше [примере кода](#code-example) контракт направляет запрос оракулу с идентификатором задания: `da20aae0e4c843f6949e5cb3f7cfe8c4`. Это конкретное задание настроено для выполнения следующих функций:

* Выполнение запроса GET
* Синтаксическая обработка ответа JSON
* Умножение значения на *x*
* Конвертация значения в `uint`
* Отправка в цепочку

Именно поэтому наш контракт добавляет в запрос URL-адрес пути, по которому можно найти желаемые данные в ответе JSON и параметры времени и количества, используя выражения `request.add`. Для выполнения этих инструкций оракул использует компоненты, называемые адаптерами.

**Каждый запрос к оракулу должен включать конкретный идентификатор задания.**

Вот список заданий, на выполнение которых настроен оракул Polygon.

| Название | Тип возврата | Идентификатор | Адаптеры |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

Полную справку по Chainlink API можно найти [здесь](https://docs.chain.link/any-api/api-reference).
