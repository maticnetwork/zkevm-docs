---
id: how-state-sync-works
title: Paano gumagana ang State Sync?
description: "Pagpapadala ng estado mula sa Ethereum chain patungo sa Bor chain."
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# Paano kalagayan ang gumagana? {#how-does-state-sync-work}

Ang pamamahala ng estado ay nagpapadala ng estado mula sa Ethereum chain patungo sa Bor chain. Tinatawag itong **state-sync**.

Nagyayari ang paglipat ng Estado mula sa Ethereum patungo sa Bor sa pamamagitan ng system call. Ipagpalagay na nag-deposit ang isang user ng USDC sa deposit manager sa Ethereum. Nakikinig ang mga validator sa mga kaganapang iyon, mag-validate, at mag-imbak ng mga ito sa estado ng Heimdall. Nakukuha ng Bor ang pinakabagong state-sync na mga tala at ina-update ang estado ng Bor (nagbibigay ng katumbas na halaga ng USDC sa Bor) gamit ang isang system call.

## Sender ng state {#state-sender}

Pinagmulan: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Upang i-sync ang state, kino-call ng kontrata ang sumusunod na paraan ng **kontrata ng state sender** sa Ethereum chain.

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

Ang `receiver` na kontrata ay dapat na naroroon sa child chain, na tumatanggap ng state na `data` kapag nakumpleto ang proseso. Ang `syncState` ay naglalabas ng `StateSynced` na event sa Ethereum, na siyang sumusunod:

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

Kapag ang `StateSynced` na event na inilabas sa `stateSender` na kontrata sa Ethereum chain, nakikinig ang Heimdall sa mga event na iyon at nagdadagdag sa state ng Heimdall pagkatapos ng 2/3+ na validator na sumang-ayon.

Pagkatapos ng bawat sprint (kasalukuyang 64 block sa Bor), kumukuha ang Bor ng bagong record ng state-sync at ina-update ang state gamit ang isang `system` na call. Narito ang code para sa nabanggit: [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

Sa panahon ng `commitState`, isinasagawa ng Bor ang `onStateReceive`, kasama ang `stateId` at `data` bilang mga arg, sa target na kontrata.

## Interface ng receiver ng state sa Bor {#state-receiver-interface-on-bor}

Ang `receiver` na kontrata sa Bor chain ay dapat ipatupad ang sumusunod na interface.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

`0x0000000000000000000000000000000000001001``StateReceiver.sol`Dapat lamang pahintulutan na tumawag sa isang `onStateReceive`function sa target na kontrata.

## System call {#system-call}

`2^160-2`Tanging ang address ng system, ay nagbibigay-daan sa paggawa ng isang system call. Tinatawag ito ng Bor sa loob ng system address bilang `msg.sender`. Binabago nito ang state ng kontrata at ina-update ang state root para sa isang partikular na block. Inspirado mula sa [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) at [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Nakakatulong ang system call na baguhin ang state sa kontrata nang hindi gumagawa ng anumang transaksyon.

## Mga state-sync na log at Bor Block na Resibo {#state-sync-logs-and-bor-block-receipt}

Ang mga kaganapang ibinubuga ng mga tawag sa system ay pinangangasiwaan sa ibang paraan kaysa sa mga normal na log. Narito ang code: [https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90).

Gumagawa ang Bor ng bagong tx / resibo para lang sa client na kinabibilangan ng lahat ng log para sa state-sync. Ang tx hash ay nagmula sa block number at block ang hash (huling block sa sprint): na iyon):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

Hindi nito binabago ang anumang consensus logic, nagbabago lamang ang `eth_getBlockByNumber`kliyente. `eth_getTransactionReceipt`, , at `eth_getLogs`isama ang mga log ng state-sync na may nagmula. Tandaan na ang bloom filter sa block ay hindi kasama ang pagsasama para sa state-sync logs. Hindi rin kasama ang hinango na tx sa `transactionRoot`o .`receiptRoot`