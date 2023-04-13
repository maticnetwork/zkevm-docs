---
id: state-transfer
title: Трансфер состояния
description: Передача состояния или данных из Ethereum в Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

валидаторы Polygon постоянно контролируют контракт в цепочке `StateSender`Ethereum. Каждый раз, когда зарегистрированный контракт Ethereum вызывает этот контракт, он эмитирует событие. Валидаторы Polygon используют это событие для ретрансляции данных в другой контракт в цепочке Polygon. Этот механизм **синхронизации состояния** используется для отправки данных из Ethereum в Polygon.

Кроме того, валидаторы Polygon отправляют хэш Ethereum каждой транзакции в цепочке Polygon на регулярной основе. Этот **checkpoint** можно использовать для проверки любой транзакции, которая состоялась в Polygon. После того, как транзакция была подтверждена, что произошла в цепочке Polygon, Ethereum может быть использован для выполнения соответствующего действия.

Эти 2 механизмы могут использоваться совместно для включения двусторонней передачи данных (состояния) между Ethereum и Polygon. Чтобы абстрагировать все эти взаимодействия, вы можете напрямую наследовать наши `FxBaseRootTunnel`(на Ethereum) и `FxBaseChildTunnel`(на Polygon) контракты.

## Контракт корневого туннеля {#root-tunnel-contract}

Используйте контракт `FxBaseRootTunnel`, который можно найти [здесь](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol). Этот контракт предоставляет доступ к следующим функциям:

- `function _processMessageFromChild(bytes memory data)`: Это виртуальная функция, которая должна быть реализована в контракте, которая унаследует его для обработки данных, которые отправляются из `ChildTunnel`.
- `_sendMessageToChild(bytes memory message)`: эта функция может быть вызвана внутри цепочки с любыми байтовыми данными в качестве сообщения. Эти данные будут отправлены как в дочерний туннель.
- `receiveMessage(bytes memory inputData)`: Эту функцию необходимо вызвать для получения `ChildTunnel`сообщения, выданного . Доказательство транзакции должно предоставляться как calldata. Пример скрипта, который будет генерировать доказательства с помощью **matic.js**, включен ниже.

## Контракт дочернего туннеля {#child-tunnel-contract}

Используйте контракт `FxBaseChildTunnel`, который можно найти [здесь](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Этот контракт дает доступ к следующим функциям:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: Это виртуальная функция, которой необходимо реализовать логику для обработки сообщений, отправленных из `RootTunnel`.
- `function _sendMessageToRoot(bytes memory message)`: эту функцию можно вызвать внутри цепочки для отправки любых байтовых сообщений в корневой туннель.

## Предварительные условия {#prerequisites}

- Вам необходимо наследовать `FxBaseRootTunnel`контракт в вашем корневом контракте на Ethereum. Например, вы можете следовать этому [контракту](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) . Аналогичным образом, наследовать `FxBaseChildTunnel`контракт в вашем ребенке на Polygon. Следуйте этому [контракту](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) в качестве примера.
- При развертывании вашего корневого контракта
  - **Goerli Testnet**, передайте адрес как 0**x2890bA17EfE978480615e330ecB65333b880928e **`_fxRoot`и `_checkpointManager`как **0x3d1d3E34f7fB6D26245E6640E1c50710eFff15bA.**

  - **Ethereum Mainnet**, `_checkpointManager`0**x86e4dc95c7fbdbf52e33d563bbdb00823894c287 **`_fxRoot`и **0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2.**
- Для развертывания дочернего контракта в **тестовой сети Mumbai** пройдите **в** конструктор `_fxChild`0xCf73231F28B7331BBe3124B907840A94851f9f1. Для **Polygon mainnet** `_fxChild`будет 0**x8397259c983751DAf40400790063935a11afa28a.**
- `setFxChildTunnel`Вызвать на встроенный корневой туннель с адресом детского туннеля. Пример: [0x79cd30ace561a226258918b56ce098a08ce0c707a80bba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- `setFxRootTunnel`Вызвать дислоцированный детский туннель с адресом корневого туннеля. Пример: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## Примеры контрактов моста передачи состояния {#example-contracts-of-state-transfer-bridge}

- **Контракты**: [Repository Github](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Перевод состояния из Ethereum → Polygon {#polygon}

- Вам необходимо вызвать `_sendMessageToChild()`внутри корневого контракта и передать данные в качестве аргумента, который должен быть отправлен в Polygon. Пример: [0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- Реализуйте в дочернем контракте виртуальную функцию `_processMessageFromRoot()` в `FxBaseChildTunnel` для получения данных из Ethereum. Данные будут получены автоматически от приемника состояния при синхронизации состояния.

## Перевод состояния из Polygon → Ethereum {#ethereum}

1. Вызовите `_sendMessageToRoot()` внутри дочернего контракта с данными в качестве параметра для отправки в Ethereum. Пример: [0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

Обратите внимание, что хэш транзакции будет использоваться для генерации доказательства после его включения в качестве checkpoint.

2. **Поколение доказательства для завершения выхода в корневой цепочке**: Создайте доказательства с помощью **хэша tx** и **MESSAGE_SENT_EVENT_SIG**. Чтобы создать доказательство, можно использовать API генерации доказательства, размещенный в Polygon, или вы также можете вращать API собственного поколения доказательств, следуя [инструкциям](https://github.com/maticnetwork/proof-generation-api).

Конечная точка поколения, размещенная в Polygon, доступна [здесь.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Примеры использования API поколения доказательства для Mainnet и Testnet следующие:-

→ [Генерация доказательства Mumbai Testnet](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Появление доказательства Polygon](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. Реализуйте `_processMessageFromChild()` в корневом контракте.

4. Используйте сгенерированное доказательство как ввод в `receiveMessage()` для извлечения данных, отправленных из дочернего туннеля в ваш контракт. Пример: [0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166e75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) )
