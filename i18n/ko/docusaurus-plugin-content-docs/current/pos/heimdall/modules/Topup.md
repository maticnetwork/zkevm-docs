---
id: topup
title: Topup
description: Heimdall 체인에 대한 수수료를 지불하는 데 사용되는 금액
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Topup {#topup}

Heimdall Topup은 Heimdall 체인 수수료를 지불하는 데 사용되는 금액입니다.

계정을 정리할 수 있는 두 가지 방법이 있습니다.

1. 새로운 유효성 검사자가 가입하면 Heimdall에서 수수료를 지불하기 위해 Heimdall 체인의 균형으로 옮겨질 `topup`액티비티를 추가할 수 있습니다.
2. 사용자는 Eygom에서 스테이크 스마트 계약에서 최대 업 기능을 직접 호출하여 Heimdall에서 상위 up 밸런스를 높일 수 있습니다.

## 메시지 {#messages}

### MsgTopup {#msgtopup}

`MsgTopup` 트랜잭션은 스테이킹 매니저 계약에서 이더리움 체인의 `TopUpEvent`를 기반으로 Heimdall의 주소에 잔액을 발행할 책임이 있습니다.

이 트랜잭션의 관리자는 top-up을 처리하고, 해당 `msg.TxHash`와 `msg.LogIndex`에 한 번만 잔액을 증가시킵니다. top-up을 한 번 이상 하려고 시도하는 경우 `Older invalid tx found` 오류를 선언합니다.

다음은 top-up 트랜잭션 메시지의 구조입니다.

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

`MsgWithdrawFee` 트랜잭션은 Heimdall에서 이더리움 체인으로 잔액을 인출하는 것을 책임집니다. 유효성 검사자는 Heimdall로부터 어떤 금액이든지 인출할 수 있습니다.

관리자는 해당 유효성 검사자로부터 잔액을 공제하여 인출을 처리하고 다음 체크포인트로 보내기 위해 상태를 준비합니다. 다음 가능한 체크포인트는 특정 유효성 검사자에 대한 인출 관련 상태를 포함합니다.

관리자는 `ValidatorAddress`로 부터 유효성 검사자 정보를 얻고 인출을 처리합니다.

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## CLI 명령 {#cli-commands}

### Topup 수수료 {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### 인출 수수료 {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

계정에 반영된 Topup을 확인하려면 다음의 명령을 실행합니다.

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## REST API {#rest-apis}

| 이름 | 메서드 | URL | 주요 파라메타 |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Topup 수수료 | POST | /topup/fee | `id` 유효성 검사자 아이디, 이더리움 체인의 성공적인 Topup 이벤트에 대한 `tx_hash` 트랜잭션 해시, 이더리움 체인에서 발생된 Topup 이벤트의 `log_index` 로그 인덱스 |
| 인출 수수료 | POST | /topup/withdraw | `amount`인출 금액 |
