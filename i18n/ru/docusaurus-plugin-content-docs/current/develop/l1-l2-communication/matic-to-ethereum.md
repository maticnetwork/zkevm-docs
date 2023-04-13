---
id: matic-to-ethereum
title: Трансфер данных из Polygon в Ethereum
description: Передача состояния или данных из Polygon в Ethereum через контракты
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Механизм передачи данных из Polygon в Ethereum немного отличается от механизма передачи данных из Ethereum в Polygon. Для этого используются транзакции **checkpoint**, создаваемые валидаторами в цепочке Ethereum. Первоначально транзакция создается в Polygon. При создании этой транзакции необходимо убедиться, что **событие эмитировано**, и что **журналы события включают данные, которые мы хотим передать** из Polygon в Ethereum.

В течение периода (около 10-30 минут ) эта транзакция проверяется на цепочке Ethereum валидаторами. После создания checkpoint хэш транзакции, созданной в цепочке Polygon, можно представить как доказательство в контракте **RootChainManager** в цепочке Ethereum. Этот контракт подтверждает транзакцию, проверяет добавление транзакции в checkpoint и декодирует журналы событий из этой транзакции.

После завершения этого этапа мы можем использовать **декодированные данные журнала событий для выполнения любых изменений** в корневом контракте, развернутом в цепочке Ethereum. Для этого нам также необходимо сделать так, чтобы изменение состояния в Ethereum выполнялось только безопасным путем. Поэтому мы используем контракт **Predicate**, который представляет собой особый тип контракта, который может активироваться только контрактом **RootChainManager**. Благодаря этой архитектуре изменения состояния в Ethereum происходят только тогда, когда для транзакции в Polygon создан checkpoint, и эта транзакция проверена в цепочке Ethereum контрактом **RootChainManager**.

# Обзор {#overview}

- Транзакция выполняется в дочернем контракте, развернутом в цепочке Polygon chain.
- Также эта транзакция эмитирует событие. Параметры этого события **включают данные, которые должны быть переданы** из Polygon в Ethereum.
- Валидаторы в сети Polygon подбирают эту транзакцию через определенный интервал времени (вероятно 10-30 минут), подтверждают ее **и добавляют ее в checkpoint** в Ethereum.
- Транзакция checkpoint создается в контракте **RootChain**, и добавление checkpoint можно проверить с помощью этого [скрипта](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)
- После завершения добавления checkpoint библиотека **matic.js** может использоваться для вызова функции **exit** контракта **RootChainManager**. Функцию **exit** можно вызвать с помощью библиотеки matic.js, как показано в этом [примере](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js).

- Запуск скрипта подтверждает включение хэша Polygon в цепочке Ethereum, а затем вызывает функцию **exitToken** контракта [predicate](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol).
- Это гарантирует, что **изменение состояния контракта корневой цепочки** всегда выполняется **безопасным** способом и **только через контракт predicate**.
- Важно отметить, что **проверка хэша транзакции** из Polygon и **активация контракта predicate** происходят в рамках **одной транзакции**, и это обеспечит безопасность любого изменения состояния корневого контракта.

# Реализация {#implementation}

Это простая демонстрация того, как данные могут передаваться из Polygon в Ethereum. В этом руководстве показан пример передачи значения uint256 по цепочке. Вы можете передавать тип данных, однако данные необходимо кодировать в байтах и эмитировать из дочернего контракта. После этого их можно декодировать как корневой контракт.

1. Вначале создайте корневую цепочку и контракт дочерней цепочки. Убедитесь, что функция изменения состояния также эмитирует событие. Это событие должно включать данные для передачи в качестве одного из параметров. Ниже приведен образец формата дочернего контракта и корневого контракта. Это очень простой контракт, содержащий переменную данных, значение которой задается функцией setData. Вызов функции setData эмитирует событие Data. Остальные элементы контракта будут разъяснены в последующих разделах настоящего руководства.

A. Дочерний контракт

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. Корневой контракт

`0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f` передается как значение `_predicate` в конструкторе корневых контрактов.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. После развертывания дочернего контракта и корневого контракта в цепочках Polygon и Ethereum соответственно необходимо провести сопоставление этих контрактов с помощью моста PoS. Сопоставление обеспечивает поддержание соединения между этими двумя контрактами в цепочках. Для выполнения сопоставления можно связаться с командой Polygon в [discord](https://discord.com/invite/0xPolygon).

3. Важно отметить, что корневой контракт имеет модификатор onlyPredicate. Рекомендуется использовать этот модификатор во всех случаях, поскольку он определяет, что изменять состояние корневого контракта может только контракт predicate. Контракт predicate — это специальный контракт, который активирует корневой контракт, только если транзакция в цепочке Polygon проверяется RootChainManager в цепочке Ethereum. Это обеспечивает безопасность изменения состояния корневого контракта.

Для тестирования вышеуказанной реализации мы можем создать транзакцию в цепочке Polygon, вызвав функцию **setData** дочернего контракта. Сейчас нам необходимо подождать завершения checkpoint. Включение checkpoint можно проверить [с помощью этого скрипта](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js). После завершения checkpoint нужно вызвать функцию exit в RootChainManager, используя matic.js SDK.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

Как показано на снимке экрана выше, **txHash** — это хэш транзакции в дочернем контракте, развернутом в цепочке Polygon.

**logEventSignature** — это хэш keccack-256 события Data. Это тот же самый хэш, который мы включили в контракт Predicate. Весь код контрактов, использованный в этом руководстве, а также скрипт выхода можно найти [здесь](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

После выполнения скрипта выхода можно отправить запрос в корневой контракт в цепочке Ethereum для проверки отражения значения переменной **data**, установленного в дочернем контракте, в переменной **data** в корневом контракте.
