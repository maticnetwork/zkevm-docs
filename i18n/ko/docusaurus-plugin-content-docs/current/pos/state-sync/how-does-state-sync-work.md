---
id: how-state-sync-works
title: 상태 동기화는 어떻게 작동하나요?
description: "이더리움 체인에서 Bor 체인으로 상태를 전송"
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# 상태 동기화는 어떻게 작동하나요? {#how-does-state-sync-work}

상태 관리는 이더리움 체인에서 Bor 체인으로 상태를 보냅니다. 그것은 **스테이트싱이라고** 부릅니다.

이더리움에서 Bor로 상태 전송은 시스템 전화를 통해 발생합니다. 가정은, Eythum의 예금 관리자에게 USDC를 예금하면 유효성 검사자는 해당 이벤트를 듣고 Heimdall 상태에 저장하십시오. Bor는 최신 상태 동기화 기록을 얻고 시스템 호출을 통해 Bor 상태를 업데이트 합니다(USDC와 동일한 금액을 Bor에서 발행).

## 상태 발신자 {#state-sender}

출처: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

상태를 동기화하기 위해, 계약은 이더리움 체인에서 다음의 **상태 발신자 계약** 메서드를 콜합니다.

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

`receiver`계약은 차일드 체인상에 반드시 존재해야 하며, 프로세스 완료 시 차일드 체인은 상태 `data`를 받습니다. `syncState`는 `StateSynced` 이벤트를 이더리움에서 다음과 같이 내보냅니다.

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

`StateSynced` 이벤트가 이더리움 체인의  계약에서 `stateSender`을 내보내면 Heimdall은 이러한 이벤트를 듣고 2/3 이상의 유효성 검사자가 동의한 후 Heimdall 상태에 추가합니다.

모든 스프린트(현재 Bor의 64 블록) 후, Bor는 새로운 상태 동기화 기록을 가져오고 `system` 호출을 이용해 상태를 업데이트 합니다. 다음은 동일한 코드를 보여줍니다: [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

`commitState`하는 동안, Bor는 대상 계약에서 `stateId` 및 `data`를 매개변수로 `onStateReceive`를 수행합니다.

## Bor의 상태 리씨버 인터페이스 {#state-receiver-interface-on-bor}

Bor 체인의 `receiver` 계약은 반드시 다음의 인터페이스를 구현해야 합니다.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

오직 `0x0000000000000000000000000000000000001001`— 만이 `StateReceiver.sol`대상 계약에서 기능을`onStateReceive` 호출할 수 있습니다.

## 시스템 호출 {#system-call}

시스템 주소 `2^160-2`로만 시스템 호출을 할 수 있습니다. Bor는 시스템 주소 `msg.sender`를 사용하여 내부적으로 호출합니다. 계약 상태 변경 및 특정 블록의 상태 루트를 업데이트합니다. [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) 와 [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)로 부터 영향을 받았습니다.

시스템 호출은 아무 트랜잭션이 없이 상태를 계약으로 교환하는 데 도움이 됩니다.

## 상태 동기화 로그 및 Bor 블록 수신 {#state-sync-logs-and-bor-block-receipt}

시스템 호출에서 내보내는 이벤트는 정상적인 로그와 다른 방식으로 처리됩니다. 다음은 [https://github.com/maticnetwork/bor/pull/90에서](https://github.com/maticnetwork/bor/pull/90) 확인할 수 있습니다.

Bor는 모든 로그를 포함하는 클라이언트에게 새로운 tx / 영수증을 생성합니다. Tx 해쉬는 블록 번호 및 블록 해시에서 파생됩니다. (해당 스프린의 마지막 블록):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

이는 컨센서스 로직을 변경하지 않습니다. `eth_getBlockByNumber``eth_getTransactionReceipt`그리고 파생 된 상태에서 상태 싱크 로그를 `eth_getLogs`포함시킵니다. 블록의 블룸 필터는 상태 동기화 로그를 포함하지 않는다는 점에 유의하세요. 또한 파생 Tx를 in `transactionRoot`또는 포함하지 않습니다.`receiptRoot`