---
id: validator-key-management
title: 유효성 검사자 키 관리
description: 서명자 및 소유자 키 유효성 검사자 관리
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# 유효성 검사자 키 관리 {#validator-key-management}

각 유효자는 Polygon에서 유효한 관련 활동을 관리할 수 있는 두 개의 키를 사용합니다. 소유자 키는 안전하게 보관되어야 하고 자주 사용되지 않으며 일반적으로 `cold` 지갑으로 간주되는 반면, 서명자 키는 노드에 보관되고 일반적으로 `hot` 지갑으로 간주됩니다. 스테이크된 자금은 소유자 키가 제어합니다.

보안 및 사용의 용이성 간의 효율적인 거래를 보장하기 위해 이러한 책임 분리를 수행했습니다. 두 키는 이더리움 호환 주소와 함께 모두 동일한 방식으로 작동합니다. 그리고 네, 동일한 소유자 및 서명자 키를 가질 수 있습니다.

## 서명자 키 {#signer-key}

서명자 키는 Heimdall 블록, Check포인트 및 기타 서명 관련 활동에 서명하는 데 사용되는 주소입니다. 이 키의 개인 키는 서명 목적을 위해 유효성 검사 노드에 위치합니다. 스테이크, 보상 또는 위임은 관리할 수 없습니다.

유효자는 이 주소에 두 가지 유형의 잔액을 유지해야 합니다.

- Heimdall에서 유효성 검사자 역할을 수행하기 위해 Heimdall에 매틱 토큰 유지(충전 트랜잭션을 통해)
- 이더리움에서 체크포인트를 보내기 위해 이더리움 체인에 ETH 유지

## 소유자 키 {#owner-key}

소유자 키는 엑시룸 체인의 스토킹, 재지분을 변경, 서명자 키를 변경, 보상을 철회, 리스크를 철회하고 엑시룸 체인의 위임 관련 파라미터를 관리하는 데 사용되는 주소입니다. 어떠한 경우에도 이 키의 개인 키를 안전하게 지켜야 합니다.

이 키를 통한 모든 거래는 이더리움 체인에서 수행됩니다.

## 서명자 변경 {#signer-change}

이더리움 체인에서 서명자가 변경되면 `StakingInfo.sol`에서 다음 이벤트가 생성됩니다 : [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Heimdall 브리지는 이 이벤트를 처리하고 Heimdall에서 트랜잭션을 보내 이벤트를 토대로 상태를 변경합니다.