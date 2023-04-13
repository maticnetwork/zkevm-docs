---
id: clerk
title: 클럭
description: 이더리움에서 Bor에 이르기까지 일반 상태 동기화 관리 모듈
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# 클럭 {#clerk}

클럭은 이더리움 체인부터 Bor 체인까지 전반적인 상태 동기화를 관리합니다. Heimdall은 Clerk 모듈을 사용하여 이더리움 체인에 대한 스테이트 동기화에 동의합니다.

[상태 동기화](/docs/pos/bor/core_concepts.md#state-management-state-sync) 메커니즘에서 자세한 내용은 확인할 수 있습니다.

## 메시지 {#messages}

### MsgEventRecord {#msgeventrecord}

`MsgEventRecord` 트랜잭션은 `StateSender.sol`의 이벤트를 검증하여야 하며, Bor가 사용할 수 있도록 Heimdall의 상태를 확인하고 저장해야 합니다.

트랜잭션 관리자는 주어진 `msg.TxHash`와 `msg.LogIndex`를 검증합니다. 트랜잭션을 한 번 이상 수행하려고 하면 `Older invalid tx found` 오류를 선언합니다.

다음은 트랜잭션 메시지의 구조입니다.

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## CLI 명령 {#cli-commands}

### 상태 기록 트랜잭션 보내기 {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### 이미 검증된 상태 이벤트 기록 쿼리하기 {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## 기타 API {#rest-apis}

| 이름 | 메서드 | 엔드포인트 |
|----------------------|------|------------------|
| 이벤트 기록 세부 사항 | GET | /clerk/event-record/<record-id\> |
| 모든 이벤트 기록 | GET | /clerk/event-record/list |
