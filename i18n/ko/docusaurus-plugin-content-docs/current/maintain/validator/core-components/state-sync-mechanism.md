---
id: state-sync-mechanism
title: 상태 동기화 메커니즘
description: 이더리움 데이터를 nally 읽으면 동기화 메커니즘
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Heimdall](/docs/maintain/glossary.md#heimdall) 계층의 유효성 검사자는 [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) 이벤트를 선택하고 이벤트를 [Bor](/docs/maintain/glossary.md#bor) 게층에 전달합니다. [Polygon 아키텍처](/docs/pos/polygon-architecture)도 참조하세요.

**리씨버 계약**은 [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol)를 상속하며, 사용자 정의 로직은 [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5) 기능 내부에 위치합니다.

최신 버전인 [Heimdall](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) v.0.3.0에는 다음과 같은 몇 가지 개선이 포함되어 있습니다.
1. 상태 동기화 트랜잭션의 데이터 크기를 다음과 같이 제한합니다.
    * **30Kb** - **바이트**로 표시되는 경우
    * **60Kb** - **문자열**로 표시되는 경우
2. 급증하는 이벤트로 인해 체인 진행에 지장이 생기는 경우 메모리 풀이 너무 빨리 채워지지 않도록 여러 검증자의 계약 이벤트 간 **지연 시간**을 늘렸습니다.

다음의 예는 데이터 크기가 제한되는 방식을 보여줍니다.

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## 사용자를 위한 요구 사항 {#requirements-for-the-users}

상태 동기화 작업을 수행하기 위해 dapps/users에서 필요한 사항:

1. [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33) 기능을 호출합니다.
2. `syncState` 기능은 `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`로 호출된 이벤트를 내보냅니다
3. Heimdall 체인의 모든 유효성 검사자는 `StateSynced` 이벤트를 받습니다. 상태 동기화에 대한 트랜잭션 비용을 받으려는 모든 유효성 검사자는 Heimdall로 트랜잭션을 보냅니다.
4. Heimdall의 `state-sync` 트랜잭션이 블록에 포함되면 보류 중인 상태 동기화 목록에 추가됩니다.
5. Bor에서 스프린트할 때마다 Bor 노드가 API 호출을 통해 Heimdall에서 보류 중인 상태 동기화 이벤트를 가져옵니다.
6. 리씨버 계약은 `IStateReceiver` 인터페이스를 상속하며, 데이터 바이트를 디코딩하고 모든 작업을 수행하는 사용자 정의 로직은 [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol) 기능 안에 위치합니다.
