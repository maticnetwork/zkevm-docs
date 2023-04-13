---
id: auth
title: 인증
description: 기본 트랜잭션 및 계정 유형을 지정하는 모듈
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Auth 모듈 {#auth-module}

이 문서는 Heimdall의 `auth`모듈을 설명합니다.

`auth` 모듈은 애플리케이션을 위한 기본 트랜잭션과 계정 유형을 지정하는 역할을 합니다. 이것은 모든 기본 트랜잭션 유효성 검사(서명, 난스, 보조 필드)를 수행하는 앤티 핸들러를 포함하고 있으며, 계정 키퍼를 통하여 다른 모듈이 읽고 쓰고 계정을 수정할 수 있도록 합니다.

## 가스 및 수수료 {#gas-and-fees}

수수료는 네트워크 운영자에게 두 가지 목적을 제공합니다.

수수료를 통해 모든 전체 노드에 저장된 상태의 성장을 제한하고, 경제적으로 가치가 거의 없는 트랜잭션을 골라낼 수 있습니다. 수수료가 반 스팸 메카니즘 역할을 함으로써, 유효성 검사자는 네트워크 사용과 사용자 신원에 관심을 기울이지 않아도 됩니다.

Heimdall은 모든 거래에 대한 사용자 정의 계약 또는 코드를 지원하지 않기 때문에 고정 비용 거래를 사용합니다. 고정 비용 트랜잭션의 경우, 유효성 검사자는 이더리움 체인에서 계정을 보충할 수 있고, [Topup](Topup.md) 모듈을 사용하여 Heimdall에서 토큰을 얻을 수 있습니다.

## 유형 {#types}

계정(국가에 명시된) 외에도 Auth 모듈에 의해 노출되는 유형은 **StdSignature이며**, 바이트 어레이, **StdTx**, **StdSignature를** 사용하여 인터페이스를 구현하는 Structures, **StdSignDoc** 및 StdSignDoc을 사용하여 `sdk.Tx`인터페이스를 구현하는 Structures, 트랜잭션 입찰자가 서명해야 하는 **StdTx의** 재생 방지 구조인 StdTx의 경우 선택적 공개 키와 암호화 시그너처인 조합 인 StdSignification을 포함합니다.

### StdSignature {#stdsignature}

`StdSignature`는 바이트 배열 유형입니다.

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

`StdTx`는 `sdk.Tx` 인터페이스를 구현한 구조체로, 다양한 유형의 트랜잭션에 충분히 사용할 수 있을 만큼 일반적입니다.

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

`StdSignDoc`는 양도한 이후에는 재생할 수 없는 구조로,  제출된 트랜잭션(단지 특정 바이트 스트링에 대한 양도)은 Heimdall에서 단 한 번만 실행할 수 있습니다.

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### 계정 {#account}

계정은 트랜잭션의 주소, 코인, 난스를 관리합니다. 또한 트랜잭션을 서명하고 검증합니다.

출처: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## 파라미터 {#parameters}

인증 모듈은 다음 파라미터를 포함하고 있습니다.

| 키 | 유형 | 디폴트 값 |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | 스트링 | "1000000000000000" |


## CLI 명령어 {#cli-commands}

### 계정 보기 {#show-account}

Heimdall에 관련 데이터를 인쇄하려면

```bash
heimdalld show-account
```

예상 결과:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### 계정 및 코인 세부 사항 {#account-and-coin-details}

계정 세부 사항, 동전, 시퀀스 및 계정 번호를 표시하기 위해

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

예상 결과:

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### 파라미터 {#parameters-1}

모든 파라그램을 인쇄하려면

```go
heimdallcli query auth params
```

예상 결과:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## 기타 API {#rest-apis}

| 이름 | 엔드포인트 | 설명 |
|----------------------|--------|------------------|
| 계정 세부사항 | /auth/accounts/{address} | 주소에 대한 모든 세부 정보를 반환합니다 |
| 계정 시퀀스 세부 사항 | /auth/accounts/{address}/sequence | 서명에 필요한 필수 세부 정보만 반환합니다 |
| 인증 파라미터 | /auth/params | 모든 파라미터 인증 모듈 사용을 반환합니다 |
