---
id: governance
title: 거버넌스
sidebar_label: Governance
description: 1개의 토큰을 가진 시스템 - 1 투표 기준으로 시스템
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# 거버넌스 {#governance}

Heimdall 거버넌스는 [`x/gov`코스모-sdk](https://docs.cosmos.network/master/modules/gov/) 모듈과 정확히 동일합니다.

이 시스템에서 체인의 네이티브 스테이킹 토큰 보유자는 `1 token = 1 vote` 기준으로 제안에 투표할 수 있습니다. 현재 지원하는 모듈의 특징 목록은 다음과 같습니다.

- **제안 제출:** 유효성 검사자는 보증금과 함께 제안을 제출할 수 있습니다. 최소 보증금이 채워지면 제안에 대한 투표 기간이 시작됩니다. 제안을 위해 보증금을 낸 유효성 검사자는 제안이 거부되거나 받아들여지면 보증금을 회수할 수 있습니다.
- **투표:** 유효성 검사기는 MinDeposit에 도착한 제안에 투표할 수 있습니다.

보증금 기간과 투표 기간은 `gov` 모듈의 파라미터입니다. 예금 기간이 끝나기 전에 최소 예금을 달성해야 합니다. 그렇지 않으면 제안서가 자동으로 거부됩니다.

보증금 기간 내에 최소 보증금에 도달하면 투표 기간이 시작됩니다. 투표 기간 동안 모든 유효성 검사자는 제안에 대해 선택을 하고 투표에 참여해야 합니다. 투표 기간이 끝나면 `gov/Endblocker.go`는 `tally` 기능을 실행하고 `tally_params` —,`quorum`  `threshold`및 에`veto` 기반하여 제안을 받아들이거나 거부합니다.

출처: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

Heimdall에서 구현할 수 있는 다양한 유형의 제안이 있습니다. 현재 **파라암 변경** 제안만 지원합니다.

### 파라미터 변경 제안 {#param-change-proposal}

이 유형의 제안서를 사용하면 유효자가 `module`Heimdall의 어떤 경우에도 `params`변경할 수 있습니다.

예: `auth` 모듈에서 트랜잭션을 위한 최소 `tx_fees`를 변경합니다. 제안이 받아들여지면 Heimdall 상태에서 `params`가 자동으로 변경됩니다. 추가 트랜잭션이 필요 없습니다.

## CLI 명령 {#cli-commands}

### 거버넌스 파라미터 쿼리 {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

거버넌스 모듈에 대한 모든 파라미터를 보여줍니다.

```go
voting_params:
  voting_period: 48h0m0s
tally_params:
  quorum: "334000000000000000"
  threshold: "500000000000000000"
  veto: "334000000000000000"
deposit_parmas:
  min_deposit:
  - denom: matic
    amount:
      i: "10000000000000000000"
  max_deposit_period: 48h0m0s
```

### 제안 제출 {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json`은 json 형식으로 제안을 포함하는 파일입니다.

```json
{
  "title": "Auth Param Change",
  "description": "Update max tx gas",
  "changes": [
    {
      "subspace": "auth",
      "key": "MaxTxGas",
      "value": "2000000"
    }
  ],
  "deposit": [
    {
      "denom": "matic",
      "amount": "1000000000000000000"
    }
  ]
}
```

### 제안 쿼리 {#query-proposal}

모든 제안을 질의하려면 :

```go
heimdallcli query gov proposals --trust-node
```

특정 제안을 질의하려면 :

```go
heimdallcli query gov proposals 1 --trust-node
```

### 제안에 투표하기 {#vote-on-proposal}

특정 제안에 대해 투표하려면 :

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

투표 기간 후 제안은 자동으로 집계됩니다.

## 기타 API {#rest-apis}

| 이름 | 메서드 | 엔드포인트 |
|----------------------|------|------------------|
| 모든 제안 가져오기 | GET | /gov/proposals |
| 제안 세부 정보 가져오기 | GET | /gov/proposals/`proposal-id` |
| 제안에 대한 모든 투표 가져오기 | GET | /gov/proposals/`proposal-id`/votes |
