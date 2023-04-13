---
id: fx-portal
title: FxPortal
description: Передача состояния или данных из Ethereum в Polygon без отображения с помощью FxPortal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Обычный механизм для нативно чтения данных Ethereum из Polygon использует **State Sync**. Это позволяет выполнять трансфер произвольных данных из Ethereum в Polygon. Однако для этого подхода требуется сопоставление корневого и дочернего контрактов, если возможности использовать интерфейс по умолчанию нет. FxPortal предлагает альтернативу, позволяющую развертывать стандартизированные токены ERC без сопоставления, просто используя развернутые базовые контракты FxPortal.

## Что такое FxPortal? {#what-is-fxportal}

Это мощная, но простая реализация механизма [синхронизации состояния](../../pos/state-sync/state-sync-mechanism.md) Polygon. Мост Polygon PoS построен на базе той же архитектуры. Код в папке [примеров](https://github.com/fx-portal/contracts/tree/main/contracts/examples) являются некоторыми примерами использования. Эти примеры можно легко использовать для создания собственных реализаций или собственного настраиваемого моста, который позволяет синхронизировать состояние без mapping.

Вы можете проверить [репозиторий GitHub](https://github.com/fx-portal/contracts) для контрактов и примеров.

## Как это работает? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) и [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) являются основными контрактами, на которые работает FxPortal. Он вызывает и передает данные определенным пользователем методам в другой цепочке без какого-либо отображения с помощью механизма синхронизации состояния. Чтобы использовать развернутые основные контракты, вы можете реализовать базовые контракты FxPortal в смарт-контрактах, которые вы развертываете - [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) и [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Основываясь на этих контрактах, ваши развернутые контракты смогут взаимодействовать друг с другом, используя механизм туннеля данных.

В противном случае вы можете выбрать карту ваших токенов с уже развернутыми контрактами туннели. Данные развертывания FxTunnel по умолчанию для Polygon Mainnet и Mumbai Testnet следующие:

- [Polygon Mainnet](https://static.matic.network/network/mainnet/v1/index.json)
- [Mumbai Testnet](https://static.matic.network/network/testnet/mumbai/index.json)

Искать ключевое слово `FxPortalContracts`в вышеуказанных ссылках, чтобы найти все контракты туннеля по умолчанию и другие важные развертывание контракта FxPortal.

## Нужна ли пользовательская реализация FxTunnel? {#do-i-need-a-custom-fxtunnel-implementation}

Чтобы выполнить **пользовательскую реализацию** FxTunnel, необходимо перейти только в том случае, если реализация туннеля по умолчанию не совпадает с обращением использования. При использовании туннелей FxPortal по умолчанию нельзя изменить код дочернего контракта. Байткод для контракта токена дочернего токена всегда фиксируется, и всегда остается прежним для [развертывания FxTunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples). Если вам нужен пользовательский токен для ребенка, вы должны перейти к собственному пользовательскому FxTunnel, и следующая часть будет направлять вас больше при развертывании собственных FxTunnel.

Настоятельно рекомендуется читать и понимать [передачу состояния FxPortal](state-transfer.md) перед тем, как прочитать следующий раздел. Каждый из этих предстоящих разделов будет иметь прикрепленные к нему ссылки на контракт туннеля. Эти примеры можно использовать в качестве ссылки при создании собственных custom

## Трансфер ERC20 {#erc20-transfer}

Контракты на [использование child и root туннеля](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) позволяют вносить токены в корневой цепочке и выводить из дочерней цепочки.

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: Можно вызвать функцию в контракте развернутых для карты токена ERC20 и создать соответствующий дочерний токен в цепочке child.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: `deposit()`Метод вызова с адресом отображенного токена, адрес, который может вывести с соответствующей суммы (вместе с данными, если это необходимо). Чтобы тратить токены, вы должны предварительно утвердить контракт, используя стандартную функцию ERC20 `approve`.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: Адреса, назначенный в , `deposit()`может вывести все количество дочернего токена, используя эту функцию. Они получат дочерний токен, созданный при первом сопоставлении.
- `rootToChildToken`: Эта публичная переменная содержит корневой токен для отображения дочернего токена. Вы можете запросить сопоставление, используя адрес корневого токена для определения адреса развернутого дочернего токена.

### Из Ethereum → Polygon {#polygon}

1. Выполните развертывание своего токена ERC20 в корневой цепочке. Этот адрес потребуется вам позднее.
2. Утвердите токены для трансфера, вызвав функцию `approve()` корневого токена, указав адрес корневого туннеля и количество как аргументы.
3. Затем вызовите `deposit()`, указав адрес получателя и количество в корневой цепочке для получения эквивалентного количества дочернего токена в дочерней цепочке. При этом сопоставление токена будет выполнено автоматически. Также перед депозитом вы можете вызвать `mapToken()`.
4. После картирования теперь вы должны иметь возможность выполнять транскрипцию с `deposit`использованием `withdraw`функций туннеля.

:::note

После того, как вы выступали `deposit()`в корневой цепочке, для синхронизации состояния потребуется 22-30 минут. Как только произойдет синхронизация состояний, вы получите токены, депонированные по заданному адресу.

:::

### Из Polygon → Ethereum {#ethereum}

1. Вызовите `withdraw()`, указав в качестве аргументов в дочернем контракте адрес соответствующего токена и количество, чтобы вернуть дочерние токены указанному отправителю в корневой цепочке. **Обратите внимание на хэш tx,** поскольку он будет использоваться, чтобы сгенерировать доказательство сжигания.

2. Шаги, которые необходимо завершить вывод [здесь](#withdraw-tokens-on-the-root-chain).

## ERC721 {#erc721-transfer}

Если вам нужен пример, пожалуйста, ознакомьтесь с этим руководством [по корневым и детским туннелям](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) ERC721.

### Из Ethereum → Polygon {#polygon-1}

1. Разверните свой токен ERC721 в корневой цепочке. Этот адрес потребуется вам позднее.
2. Утвердите токены для трансфера, вызвав функцию `approve()` корневого токена и укажите адрес корневого туннеля и идентификатор токена как аргументы.
3. Вызовите `deposit()` с адресом получателя и идентификатором токена в корневой цепочке, чтобы получить эквивалентное количество дочерних токенов в дочерней цепочке. При этом сопоставление токена будет выполнено автоматически. Также перед депозитом вы можете вызвать `mapToken()`.

:::note

После того, как вы выступали `deposit()`в корневой цепочке, для синхронизации состояния потребуется 22-30 минут. Как только произойдет синхронизация состояний, вы получите токены, депонированные по заданному адресу.

:::

### Из Polygon → Ethereum {#ethereum-1}

1. Вызовите `withdraw()` и укажите адрес соответствующего токена и идентификатор токена как аргументы в дочернем контракте, чтобы вернуть дочерние токены указанному получателю в корневой цепочке. Обратите внимание, что **хэш tx** будет использоваться для генерации доказательства горе.

2. Шаги, которые необходимо завершить вывод [здесь](#withdraw-tokens-on-the-root-chain).

## Трансфер ERC1155 {#erc1155-transfer}

Если вам нужен пример, пожалуйста, ознакомьтесь с этим руководством [по корневым и детским туннелям](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) ERC1155.

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: используется для сопоставления корневого токена ERC1155 с дочерней цепочкой
- `deposit(rootToken, user, id, amount, data)`: функция, используемая для депозита корневых токенов в дочернюю цепочку
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: используется для нескольких идентификаторов токенов и соответствующих количеств
- `receiveMessage(inputData)`: вызывается после генерирования доказательства сжигания с полезной нагрузкой как `inputData`

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: используется для вывода токена из Polygon в Ethereum
- `withdrawBatch(childToken, ids, amounts, data)`: аналогично выводу, но для вывода нескольких идентификаторов токенов

### Из Ethereum → Polygon {#polygon-2}

1. Разверните токен ERC1155 в корневой цепочке. Этот адрес потребуется вам позднее.
2. `setApprovalForAll(operator, approved)`Вызвать на развернутый токен с `FxERC1155RootTunnel`адресом, чтобы `operator`позволить `FxERC1155RootTunnel`перевести ваши токены в `FxERC1155ChildTunnel`Polygon.
3. `mapToken()`Вызвать `FxERC1155RootTunnel`с адресом вашего развернутого токена в .`rootToken` Это будет отправлено сообщение для `FxERC1155ChildTunnel`указания его развернуть и сопоставить токен ERC1155 в Polygon. Чтобы запросить адрес токена ребенка, позвоните по `rootToChildToken`.`FxERC1155ChildTunnel`
4. `deposit()``FxERC1155RootTunnel`Вызвать с адресом токена в Ethereum в качестве , `rootToken`получателя в качестве , `user`идентификатора токена как , так `id`и суммы.`amount` Также вы можете вызвать `depositBatch()` для получения нескольких идентификаторов токенов.

:::note

После того, как вы выступали `deposit()`в корневой цепочке, для синхронизации состояния потребуется 22-30 минут. Как только произойдет синхронизация состояний, вы получите токены, депонированные по заданному адресу.

:::

### Из Polygon → Ethereum {#ethereum-2}

1. `withdraw()``FxERC1155ChildTunnel`Вызвать адрес токена, который будет развернут в Polygon, в `childToken`качестве идентификатора и идентификатора как `id`(адрес токена ребенка может быть запрошен из `rootToChildToken`mapping). Также вы можете вызвать `withdrawBatch()` для получения нескольких идентификаторов токенов и соответствующих количеств. Обратите внимание, что **хэш tx** будет использоваться для генерации доказательства горе.

2. Шаги, которые необходимо завершить вывод [здесь](#withdraw-tokens-on-the-root-chain).

## Вывод токенов в цепочке Root {#withdraw-tokens-on-the-root-chain}

:::info

После того, как вы выступали `withdraw()`в цепочке child, потребуется 30-90 минут для checkpoint. После следующего checkpoint включает транзакцию записки, можно вывести токены в корневой цепочке.

:::

1. Сгенерируйте доказательство записи с помощью **хэша tx** и **MESSAGE_SENT_EVENT_SIG**. Чтобы создать доказательство, можно использовать API генерации доказательства, размещенный в Polygon, или вы также можете вращать API собственного поколения доказательств, следуя [инструкциям](https://github.com/maticnetwork/proof-generation-api).

Конечная точка поколения, размещенная в Polygon, доступна [здесь.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

  - `burnTxHash`это хэш `withdraw()`транзакции, которую вы инициировали в Polygon.
  - `eventSignature` — это подпись события, испускаемого `withdraw()`функцией. Сигнатура события для MESSAGE_SENT_EVENT_SIG — `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Примеры использования API поколения доказательства для Mainnet и Testnet следующие:-

→ [Появление доказательства Polygon](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Генерация доказательства Mumbai Testnet](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Пополнение генерируемой полезной нагрузки в качестве аргумента, к которому следует `receiveMessage()`в соответствующем контракте root tunnel на Goerli или Ethereum.

## Трансфер ERC-20 с возможностью минтинга {#mintable-erc-20-transfer}

Если вам нужен пример, пожалуйста, ознакомьтесь с этим руководством [по корневым и детским туннелям](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) ERC20.

:::info

В случае с Mintable Token FxTunnels сначала запускается дочерний ток, а токен root развертывается только после завершения первого процесса вывода/выхода. Адрес контракта корневого токена может быть предварительно определен сразу после развертывания дочернего контракта, но сопоставление будет технически существовать только после завершения первого вывода/выхода.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: для депозита токенов из Ethereum в Polygon
- `receiveMessage(bytes memory inputData)`: доказательство сжигания отправляется как `inputData` для получения токенов в корневой цепочке

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: Чтобы развернуть токен ERC20 в сети Polygon
- `mintToken(address childToken, uint256 amount)`: минтинг конкретного количества токенов в Polygon
- `withdraw(address childToken, uint256 amount)`: для сжигания токенов в дочерней цепочке для вывода в корневой цепочке

### Токены майнинга в Polygon {#minting-tokens-on-polygon}

1. Вызовите `deployChildToken()` в `FxMintableERC20ChildTunnel` и передайте необходимую информацию о токене в качестве параметров. Это эмитирует событие `TokenMapped`, которое содержит адреса `rootToken` и `childToken`. Запишите эти адреса.
2. Вызовите `mintToken()` в `FxMintableERC20ChildTunnel` для минтинга токенов в дочерней цепочке.
3. Вызовите `withdraw()` в `FxMintableERC20ChildTunnel` для вывода токенов из Polygon. Обратите внимание, что хэш транзакции будет пригоден для генерации доказательства записи.
4. Шаги, которые необходимо завершить вывод [здесь](#withdraw-tokens-on-the-root-chain).

### Вывод токенов в Ethereum {#withdrawing-tokens-on-ethereum}

Отправьте сгенерированное доказательство сжигания как аргумент для `receiveMessage()` в `FxMintableERC20RootTunnel`. После этого баланс токена отразится в корневой цепочке.

### Депозит токены обратно в Polygon {#deposit-tokens-back-to-polygon}

1. Убедитесь, что вы одобрили `FxMintableERC20RootTunnel` для трансфера токенов.
2. Вызовите `deposit()` в `FxMintableERC20RootTunnel` с адресом корневого токена `rootToken` и получателем `user`.
3. Подождите события синхронизации состояния (22-30 мин). После этого вы сможете запросить баланс целевого получателя в дочерней цепочке.

Примеры **ERC721** и **ERC1155** Mintable FxTunnel следующим образом:

- [FxMintableERC721Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## Примеры развертывания {#example-deployments}

### Goerli {#goerli}

- Менеджер checkpoint: [0x2890bA17EfE978480615e330ecB65333b880928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Маркер Dummy ERC20: [0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTunnel: [0xA200766a7D64E54611E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Dummy ERC721 ток: [0x73594a053cb5ddDE5558268d28a774375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTunnel: [0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Dummy ERC1155 Токен: [0x1906d395752FE0c930f8d061DFeb785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d18788cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- FxERC20: [0xDDE69724AeFBdb084413719fE745aB66e3b055C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20ChildTunnel: [0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunnel: [0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- Фиктивный дочерний токен ERC20: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E048726267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721ChildTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunnel: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

Соответствующие развертывания Mainnet можно найти [здесь](https://static.matic.network/network/mainnet/v1/index.json). Искать ключевое слово, `FxPortalContracts`чтобы найти все контракты туннеля по умолчанию и другие важные развертывание контракта FxPortal. Можно использовать [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)пакет для доступа к адресам контракта и ABI.

## Адреса контрактов {#contract-addresses}

### Тестовая сеть Mumbai {#mumbai-testnet}

| Контракт | Развернутый адрес  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Polygon Mainnet {#polygon-mainnet}


| Контракт | Развернутый адрес  |
| :----- | :- |
| [FxRoot (Ethereum Mainnet)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild (Polygon Mainnnet)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
