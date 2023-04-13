---
id: bank
title: 은행
description: Heimdall에 대한 모듈 취급 계정 잔액 이체 이전
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# 은행 모듈 {#bank-module}

`bank` 모듈은 Heimdall을 위해 계정 잔액 이전을 처리합니다. 이 모듈은 cosmos-sdk의 `bank` 모듈에 해당합니다.

## 메시지 {#messages}

### MsgSend {#msgsend}

`MsgSend`는 Heimdall에서 계정 간 이체를 처리합니다. 다음은 트랜잭션 메시지의 구조입니다.

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend`는 Heimdall에서 계정 간 다중 이체를 처리합니다.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## 파라미터 {#parameters}

은행 모듈은 다음 파라미터를 포함합니다.

| 키 | 유형 | 디폴트 값 |
|----------------------|--------|------------------|
| `sendenabled` | 부울 | 참 |

## CLI 명령어 {#cli-commands}

### 잔액 보내기 {#send-balance}

다음 명령을 통해 1000개의 실용적인 토큰을 `address`보내십시오.

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
