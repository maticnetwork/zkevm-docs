---
id: how-state-sync-works
title: Как работает синхронизация состояний?
description: "Отправка состояния из цепочки Ethereum в цепочку Bor."
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# Как работает синхронизация состояний? {#how-does-state-sync-work}

Управление состоянием отправляет состояние из цепочки Ethereum в цепочку Bor. Он называется **синхронизацией состояния**.

Перевод состояния из Ethereum в Bor происходит через системный вызов. Предположим, пользователь вносит USDC в менеджер депозита в Ethereum. Валидаторы слушают, проверяют эти события и сохраняют их в состоянии Heimdall. Bor получает последние записи синхронизации состояния и обновляет состояние Bor (минтит равное количество USDC на Bor) с помощью системного вызова.

## Отправитель состояния {#state-sender}

Источник: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Для синхронизации состояния контракт вызывает следующий метод **state sender contract** в цепочке Ethereum.

```jsx
contract StateSender {
	/**
	 * Emits `stateSynced` events to start sync process on Ethereum chain
	 * @param receiver    Target contract on Bor chain
	 * @param data        Data to send
	 */
	function syncState (
		address receiver,
		bytes calldata data
	) external;
}
```

Контракт `receiver` должен присутствовать в дочерней цепочке, которая получает состояние `data` после завершения процесса. `syncState` генерирует событие `StateSynced` на Ethereum, которое выглядит следующим образом:

```jsx
/**
 * Emits `stateSynced` events to start sync process on Ethereum chain
 * @param id                  State id
 * @param contractAddress     Target contract address on Bor
 * @param data                Data to send to Bor chain for Target contract address
 */
event StateSynced (
	uint256 indexed id,
	address indexed contractAddress,
	bytes data
);
```

Как только событие `StateSynced` генерируется в контракте `stateSender` в цепочке Ethereum, Heimdall прослушивает эти события и добавляет в состояние Heimdall после получения подтверждения от 2/3+ валидаторов.

После каждого спринта (в настоящее время 64 блока на Bor) Bor извлекает новую запись синхронизации состояния и обновляет состояние с помощью `system` вызова. Пример кода: [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

В течение `commitState` Bor выполняет `onStateReceive`, с `stateId` и `data` в качестве аргументов по целевому контракту.

## Интерфейс получателя состояния в Bor {#state-receiver-interface-on-bor}

`receiver` контракт в цепочке Bor должен реализовывать следующий интерфейс.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Только `0x0000000000000000000000000000000000001001` — `StateReceiver.sol` должно быть разрешено вызывать функцию `onStateReceive` в целевом контракте.

## Системный вызов {#system-call}

Только системный адрес `2^160-2` позволяет выполнять системный вызов. Bor вызывает его внутри системы с системным адресом `msg.sender`. Он изменяет состояние контракта и обновляет корень состояния для определенного блока. На основе [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) и [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Системный вызов полезен для изменения состояния контракта без совершения какой-либо транзакции.

## Журналы синхронизации состояния и получение блока Bor {#state-sync-logs-and-bor-block-receipt}

События, создаваемые системными вызовами, обрабатываются иначе, чем обычные журналы. Вот код: [https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90).

Bor производит новый tx/квитанция только для клиента, который включает все журналы для синхронизации состояний. Хэш Tx получается из номера блока и хэша блока (последний блок в этом спринте):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

Это не изменяет никакой логики консенсуса, меняется только клиент. `eth_getBlockByNumber``eth_getTransactionReceipt`, и `eth_getLogs`включает журналы синхронизации состояний с производными. Обратите внимание, что фильтр Блума в блоке не включает в себя журналы синхронизации состояний. Он также не включает derived tx в `transactionRoot`или .`receiptRoot`