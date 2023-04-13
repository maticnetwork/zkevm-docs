---
id: checkpoint
title: 체크포인트
description: 체크포인트 관련 기능을 관리하는 모듈
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# 체크포인트 {#checkpoint}

`checkpoint` 모듈은 Heimdall을 위한 체크포인트 관련 기능을 관리합니다. Heimdall에서 체크포인트 루트 해시를 검증하기 위해 새로운 체크포인트가 제안될 때 Bor 체인이 필요합니다.

체크 문소 데이터와 관련된 모든 내용은 [여기에서](/docs/pos/heimdall/checkpoint) 자세히 설명합니다.

## 체크포인트 라이프 사이클 {#checkpoint-life-cycle}

Heimdall은 Tendermint와 같은 리더 선택 알고리즘을 사용하여 다음 프로저를 선택합니다. 이더리움 체인에서 체크포인트를 제출할 때 가스 한도, 이더리움 트래픽, 높은 가스 요금과 같은 여러 가지 이유로 실패가 발생할 수 있습니다. 다단계 체크포인트 프로세스가 필요한 이유입니다.

각 검문에는 프로포저에 대한 검증자가 있습니다. 이더리움 체인의 검문소가 실패하고 `ack``no-ack`성공하면 다음 검문소에 대한 Heimdall에서 Proposer를 변경시킬 수 있습니다. 다음 플로우 차트는 체크포인트의 라이프 사이클을 나타냅니다.

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## 메시지 {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint`는 Heimdall에서 체크포인트 검증을 관장합니다. 이 메시지 만이 이더리움 체인에서 검증되어야 하기 때문에 RLP 인코딩을 사용합니다.

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

Heimdall에서 이 트랜잭션이 처리되면 `proposer`는 이 트랜잭션을 위해 Tendermint에서 `votes`과 를`sigs` 받고 이더리움 체인으로 체크포인트를 보냅니다.

블록은 복수의 트랜잭션을 포함하고 이더리움 체인에서 이 특정 트랜잭션을 검증하기 때문에 머클 증명이 필요합니다. 이더리움에서 추가 머클 증명 검증을 피하기 위해 Heimdall은 트랜잭션 유형이 `MsgCheckpoint`인 경우 블록에 하나의 트랜잭션만 허용합니다.

이 메커니즘을 허용하기 위해 Heimdall은 `MsgCheckpoint` 트랜잭션을 가스 소모가 큰 트랜잭션으로 설정합니다. [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)을 참조하십시오.

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

이 트랜잭션은 실제 체크포인트 목록 상태가 아니라 `checkpointBuffer` 상태에 제안된 체크포인트를 저장합니다.

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck`는 성공적인 체크포인트 제출을 관장합니다. 다음은 체크 문소 `HeaderBlock`카운터입니다.

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

제출된 체크포인트의 `TxHash` 및 `LogIndex`가 유효한 경우 이 트랜잭션은 다음 이벤트를 검증하고 `checkpointBuffer` 상태에서 체크포인트의 유효성을 검사합니다. [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

성공적인 이벤트 검증에서 실제 체크포인트의 수를 `ackCount`업데이트하면 또한 '를 확인하고 지우고'로 알려져 있습니다.`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck`는 실패한 체크포인트 또는 오프라인 제안자를 처리합니다. 이 트랜잭션은 다음 이벤트로부터 `CheckpointBufferTime`이 경과한 후에만 유효합니다.

- 성공한 마지막 `ack` 트랜잭션
- 성공한 마지막 `no-ack` 트랜잭션

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

이 트랜잭션은 Heimdall이 다음 체크포인트를 위해 새로운 `proposer`를 선택하기 전에 현재 제안자가 체크포인트/ack를 보낼 수 있도록 타임아웃 기간을 제공합니다.

## 파라미터 {#parameters}

체크포인트 모듈은 다음 파라미터를 포함합니다.

| 키 | 유형 | 디폴트 값 |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * time.Second |


## CLI 명령 {#cli-commands}

### 파라미터 {#params}

모든 파라그램을 인쇄하려면 :

```go
heimdallcli query checkpoint params --trust-node
```

예상 결과:

```yaml
checkpoint_buffer_time: 16m40s
```

### 체크포인트 보내기 {#send-checkpoint}

다음 명령은 Heimdall에서 체크포인트 트랜잭션을 전송합니다.

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### 보내기`ack`

다음 명령은 이더리움에서 체크포인트가 성공적일 때 Heimdall에서 ack 트랜잭션을 전송합니다.

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### 보내기`no-ack`

다음 명령은 Heimdall에서 no-ack 트랜잭션을 전송합니다.

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

##  기타 API {#rest-apis}

| 이름 | 메서드 | 엔드포인트 |
|----------------------|------|------------------|
| 현재 체크포인트 버퍼 상태 가져오기 | GET | /checkpoint/buffer |
| 체크포인트 수 가져오기 | GET | /checkpoint/count |
| 블록 인덱스별 체크포인트 세부 정보 가져오기 | GET | /checkpoint/headers/<header-block-index\> |
| 마지막 체크포인트 가져오기 | GET | /checkpoint/latest-checkpoint |
| 마지막 no-ack 세부 정보 가져오기 | GET | /checkpoint/last-no-ack |
| 주어진 시작 및 종료 블록의 체크포인트 세부 정보 | GET | /checkpoint/<start\>/<end\> |
| 번호별 체크포인트 | GET | /checkpoint/<checkpoint-number\> |
| 모든 체크포인트 | GET | /checkpoint/list |
| ack 수, 버퍼, 유효성 검사자 세트, 유효성 검사자 수 및 last-no-ack 세부 정보 가져오기 | GET | /overview |


모든 쿼리 API는 다음 형식으로 결과를 제공합니다.

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
