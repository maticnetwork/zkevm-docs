---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain — это высокопроизводительный блокчейн, созданный для Data Oracle для запроса данных из традиционных High-performance
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Протокол Band позволяет запрашивать данные из традиционных web-API и использовать их в блокчейне. Разработчики могут осуществлять запросы через **BandChain, основанный** на космосе, для облегчения запросов и платежей оракула, а затем использовать данные в dApp через on связь. Интеграцию данных оракулов можно выполнить за 3 простых шага:

1. **Выбор скриптов оракула**

    Скрипт оракула — это хэш, являющийся уникальным идентификатором типа данных, запрашиваемых из цепочки Band. Эти скрипты можно найти [**здесь**](https://guanyu-devnet.cosmoscan.io/oracle-scripts). Эти скрипты используются в качестве одного из параметров при отправке запроса оракулу.

2. **Запрос данных из BandChain**

Это можно сделать двумя способами:

    - **Использование исследователя BandChain**

    Вы можете нажать на скрипт oracle, который будет по вашему выбору, а затем на вкладке **Execute** можно передать параметры и получить ответ из BandChain. Ответ будет содержать результат и доказательство evm. Это доказательство необходимо скопировать, и оно будет использовано на заключительном шаге. Документы BandChain для запроса оракула с помощью исследователя можно найти [**здесь**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer).

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Указанный выше является примером запроса оракула для получения значений случайных чисел. Значение 100 передается в `max_range`параметр запроса oracle. В качестве ответа мы получаем хэш. При нажатии на хэш мы видим полные детали ответа.

    - **Использование библиотеки BandChain-Devnet JS**

    Вы можете запросить BandChain непосредственно с помощью библиотеки BandChain-Devnet. При запросе в качестве ответа отправляется **доказательство evm**. Это доказательство можно использовать для заключительного шага интеграции BandChain. Документация BandChain для запроса оракула с помощью библиотеки JS [**BandChain-Devnet**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library). Полезная нагрузка запроса для оракула случайных чисел выглядит следующим образом. Убедитесь, что тело запроса передается в формате application/json.

3. **Использование данных в смарт-контрактах**

  Заключительный шаг заключается в развертывании контракта валидации и сохранении ответов на запрос оракула в переменные состояния контракта подтверждения. После установки этих переменных состояния доступ к ним может выполняться как и когда это требуется децентрализованному приложению. Эти переменные состояния также можно обновлять на новые значения, повторно запрашивая скрипты оракула у децентрализованного приложения. Ниже приведен контракт подтверждения, который сохраняет значение случайного числа, используя скрипт оракула случайных чисел.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

При развертывании необходимо передать 3 параметра. **Первый параметр** `codeHash`— хэш скрипта оракула. **Второй** параметр — объект запроса скрипта оракула. Это должно быть передано в формате байт. BandChain предоставляет REST API для конвертации объекта параметра JSON в байтовый формат. Детали информации об API можно найти [**здесь**](https://docs.bandchain.org/references/encoding-params). К полученному от этого API ответа необходимо добавить 0x. Третий **параметр** — адрес контракта контракта контракта BandChain, который уже размещен в сети Polygon. Протокол Band поддерживает тестовую сеть Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

Другое дело, что контракт на валидацию должен импортировать библиотеку помощников и интерфейс, который называется `BandChainLib.sol`и `IBridge.sol`соответственно. Они можно найти по следующим ссылкам: [**Bandchain**](https://docs.bandchain.org/references/bandchainlib-library) Library и интерфейс [**IBridge**](https://docs.bandchain.org/references/ibridge-interface).

  После развертывания контракта подтверждения доступ к переменным состояния можно произвести посредством запроса из децентрализованного приложения. Аналогичным образом можно создать несколько контрактов валидации для различных скриптов в встроенном оракуле. Интерфейс IBridge имеет метод, называемый для проверки `relayAndVerify()`значения, которые обновляются каждый раз в контракте на валидацию. `update()`Метод в контракте валидации имеет логику для обновления переменных состояния. Доказательство EVM, полученное в результате запроса скрипта oracle, должно быть передано в `update()`метод. Каждый раз, когда значение обновляется, контракт BandChain, развернутый в Polygon, проверяет данные, прежде чем хранить его в переменной состояния контракта.

BandChain обеспечивает децентрализованную сеть оракла, которые могут использоваться dApps для повышения логики смарт-контракта. BandChain предоставляет информацию о развертывании контракта, сохранении значений и их обновлении можно найти [**здесь**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library).