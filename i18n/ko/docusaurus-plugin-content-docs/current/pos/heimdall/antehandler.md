---
id: antehandler
title: 앤티 핸들러
description: Ante Handler 검사를 확인하고 트랜잭션을 확인합니다.
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# 앤티 핸들러 {#ante-handler}

앤티 핸들러는 트랜잭션에 대해 확인하고 유효성 검사를 수행합니다. 검증 후, 수수료가 충분한지 송금인의 잔액을 확인하고 트랜잭션이 성공적으로 포함되면 수수료를 공제합니다.

## 가스 한도 {#gas-limit}

각 블록과 트랜잭션에는 가스 사용 한도가 있습니다. 블록은 여러 개의 트랜잭션을 포함할 수 있지만, 블록의 모든 트랜잭션을 사용하는 가스는 큰 블록을 피하기 위해 블록 가스 한도 보다 적어야 합니다.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

트랜잭션을 위한 서명 검증을 포함하여 트랜잭션과 관련된 각 상태 조작에는 가스가 소요됨을 유의하세요.

### 블록 가스 한도 {#block-gas-limit}

앱의 합의 파라미터를 설정하는 동안 최대 블록 가스 한도 및 블록당 바이트를 전달합니다. [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

```go
maxGasPerBlock   int64 = 10000000 // 10 Million
maxBytesPerBlock int64 = 22020096 // 21 MB

// pass consensus params
ConsensusParams: &abci.ConsensusParams{
	Block: &abci.BlockParams{
		MaxBytes: maxBytesPerBlock,
		MaxGas:   maxGasPerBlock,
	},
	...
},
```

### 트랜잭션 가스 한도 {#transaction-gas-limit}

트랜잭션 가스 한도는 `auth`모듈의 파라미터에서 정의됩니다. Heimdall `gov`모듈을 통해 변경할 수 있습니다.

### 체크 포인트 트랜잭션 가스 한도 {#checkpoint-transaction-gas-limit}

블록은 복수의 트랜잭션을 포함하고 이더리움 체인에서 이 특정 트랜잭션을 검증하기 때문에 머클 증명이 필요합니다. 체크포인트 트랜잭션에 대한 추가 머클 증명을 피하기 위해 Heimdall은 트랜잭션 유형이 `MsgCheckpoint`인 경우 블록에 하나의 트랜잭션만 허용합니다.

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## 트랜잭션 검증 및 리플레이 보호 {#transaction-verification-and-replay-protection}

앤티 핸들러는 들어오는 트랜잭션의 서명을 관장하고 검증합니다. [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

각 트랜잭션은 리플레이 공격을 피하기 위해 `sequenceNumber`를 포함해야 합니다. 각 트랜잭션을 성공적으로 포함시킨 후, 앤티 핸들러는 이전 트랜잭션이 중복(리플레이)되는 것을 막기 위해 트랜잭션 발신자 계정의 시퀀스 번호를 늘립니다.