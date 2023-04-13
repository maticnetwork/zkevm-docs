---
id: optimisticoracle
title: UMA의 Optimistic Oracle
sidebar_label: UMA
description: UMA의 Optimistic Oracle 은 계약을 신속하게 요청하고 수신할 수 있도록 합니다.
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

UMA의 Optimistic Oracle 은 계약을 신속하게 요청하고 수신할 수 있습니다. UMA의 오라클 시스템은 두 가지 핵심 구성 요소로 구성됩니다.

1. Optimistic Oracle
2. 데이터 인증 메커니즘(DVM)

## Optimistic Oracle {#optimistic-oracle}

UMA의 **Optimistic Oracle** 은 계약을 신속하게 요청하고 가격 정보를 받을 수 있습니다. 최적의 오라클 오라클 은 가격 요청을 시작하는 계약과 데이터 검증 메커니즘(DVM)으로 알려진 UMA의 분쟁 해결 시스템을 생성하는 계약 간의 일반화된 에스컬레이션 게임으로 작용합니다.

Optimistic Oracle에서 제안한 가격은 이의가 없는 한 DVM으로 전송되지 않습니다. 이를 통해 계약이 사전에 정의된 시간 내에서 가격 정보를 얻을 수 있습니다.

## 데이터 인증 메커니즘(DVM) {#data-verification-mechanism-dvm}

분쟁이 발생하면 요청이 DVM으로 전송됩니다. UMA를 기반으로 하는 모든 계약은 분쟁 해결을 위한 백스톱으로 DVM을 사용합니다. DVM으로 전송된 분쟁은 UMA 토큰 소유자가 주어진 시간에 자산 가격에 대해 투표한 후 48시간 후에 해결됩니다. UMA에 대한 계약은 48시간보다 빠른 자산 가격을 요구하지 않는 한 Optimistic Oracle을 사용할 필요가 없습니다.

데이터 검증 메커니즘(DVM)은 UMA 프로토콜을 기반으로 빌드된 계약에 대한 분쟁 해결 서비스입니다. DVM은 변동성이 큰(때로는 조작 가능한) 시장에서 문제가 발생할 때 계약이 안전하고 올바르게 관리되도록 보장하는 인간의 판단 요소를 포함하기 때문에 강력합니다.

## Optimistic Oracle 인터페이스 {#optimistic-oracle-interface}

Optimistic Oracle은 금융 계약 또는 제3자가 가격을 검색하기 위해 사용합니다. 일단 가격이 요청되면, 누구나 그에 따라 가격을 제안할 수 있습니다. 가격이 제안되면, 누구나 제안된 가격에 이의를 제기하고 분쟁이 된 가격을 UMA DVM에 보내 중재를 구하는 유효 기간을 거칩니다.

:::info

이 섹션에서는 서로 다른 참여자가 Optimistic Oracle과 어떻게 상호작용하는지 설명합니다. Optimistic Oracle 계약의 최신 메인넷, Kovan 또는 L2 배포를 보려면 [프로덕션 주소](https://docs.umaproject.org/dev-ref/addresses)를 참조하세요.

:::

Optimistic Oracle 인터페이스를 구성하는 12가지 메서드가 있습니다.
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

새 가격을 요청합니다. 등록된 가격 식별자용이어야 합니다. UMA 시스템에 등록된 대부분의 금융 계약에 의해 자동으로 호출되지만 등록된 가격 식별자에 대해서는 누구나 호출할 수 있습니다. 예를 들어 만료 다수(EMP) 계약은 `expire` 메서드가 호출될 때 이 메서드를 호출합니다.

매개변수:
- `identifier`: 요청 중인 가격 식별자입니다.
- `timestamp`: 요청 중인 가격의 타임스탬프입니다.
- `ancillaryData`: 추가 인수가 가격 요청과 함께 전달 중임을 나타내는 보조 데이터입니다.
- `currency`: 보상 및 수수료 지급에 사용되는 ERC20 토큰입니다. DVM과 함께 사용하려면 승인되어야 합니다.
- `reward`: 성공적인 제안자에게 제공되는 보상입니다. 호출자가 지불합니다. 참고: 0이 될 수 있습니다.

### proposePrice {#proposeprice}

기존 가격 요청에 대한 가격 값을 제안합니다.

매개변수:
- `requester`: 초기 가격 요청의 발신인입니다.
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.
- `proposedPrice`: 제안되고 있는 가격입니다.

### disputePrice {#disputeprice}

기존 가격 요청의 가격 값에 제안을 하여 이의를 제기합니다.

매개변수:
- `requester`: 초기 가격 요청의 발신인입니다.
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.

### 중재 {#settle}

미해결 가격 요청에 대한 중재를 시도합니다. 정착할 수 없다면 다시 돌아올 것입니다.

매개변수:
- `requester`: 초기 가격 요청의 발신인입니다.
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.

### hasPrice {#hasprice}

요청이 해결 또는 중재(즉, Optimistic Oracle 가격이 있음)되었는지 확인합니다.

매개변수:
- `requester`: 초기 가격 요청의 발신인입니다.
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.

### getRequest {#getrequest}

가격 요청에 대한 모든 정보가 포함된 현재 데이터 구조를 가져옵니다.

매개변수:
- `requester`: 초기 가격 요청의 발신인입니다.
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.

### settleAndGetPrice {#settleandgetprice}

호출자가 이전에 요청한 가격을 검색합니다. 중재되지 않았거나 중재될 수 없는 요청은 되돌립니다. 참고: 조회를 위한 메서드가 아니므로, 아직 중재되지 않았다면 이 호출이 실제로 가격 요청을 중재할 수 있습니다.

매개변수:
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.

### setBond {#setbond}

가격 요청과 관련된 제안 채권을 설정합니다.

매개변수:
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.
- `bond`: 설정할 사용자 정의 채권 금액입니다.

### setCustomLiveness {#setcustomliveness}

요청에 대한 사용자 정의 유효 기간 값을 설정합니다. 유효 기간은 제안이 자동으로 해결되기 전까지 기다려야 하는 시간입니다.

매개변수:
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.
- `customLiveness`: 새로운 사용자 정의 활성입니다.

### setRefundOnDispute {#setrefundondispute}

제안에 대해 분쟁이 발생할 경우 보상을 환불하는 요청을 설정합니다. 분쟁으로 인한 지연이 발생할 경우 호출자를 '헷지(hedge)'하는 데 도움이 될 수 있습니다. 참고: 분쟁이 발생하는 경우에도 승자는 상대방의 채권을 받으므로, 보상이 환불되더라도 여전히 이익이 생깁니다.

매개변수:
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.

### disputePriceFor {#disputepricefor}

다른 주소를 대신해 제안을 하여 가격 요청에 이의를 제기합니다. 참고: 이 주소는 이 분쟁에서 발생하는 모든 보상을 받습니다. 그러나 채권은 모두 호출자에게서 출금됩니다.

매개변수:
- `disputer`: 분쟁자로 설정하는 주소입니다.
- `requester`: 초기 가격 요청의 발신인입니다.
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.

### proposePriceFor {#proposepricefor}

다른 주소를 대신하여 가격 값을 제안합니다. 참고: 이 주소는 이 제안에서 발생하는 모든 보상을 받습니다. 그러나 채권은 모두 호출자에게서 출금됩니다.

매개변수:
- `proposer`: 제안자로 설정할 주소입니다.
- `requester`: 초기 가격 요청의 발신인입니다.
- `identifier`: 기존 요청을 식별하는 가격 식별자입니다.
- `timestamp`: 기존 요청을 식별하는 타임스탬프입니다.
- `ancillaryData`: 요청 중인 가격에 대한 보조 데이터입니다.
- `proposedPrice`: 제안되고 있는 가격입니다.

## Optimistic Oracle 통합 {#integrating-the-optimistic-oracle}

이 데모에서는 사용자의 ERC-20 토큰 잔액을 수탁하는 `OptimisticDepositBox` 계약을 설정합니다.

로컬 테스트넷 블록체인에서는 사용자가 wETH(래핑된 이더)를 계약에 입금하고 USD 단위로 표시된 wETH를 출금합니다. 예를 들어, 사용자가 $10,000 USD of wETH, and the ETH/USD exchange rate is $2,000을 출금하고 싶다면 5wETH를 출금할 것입니다.

* 사용자는 `OptimisticDepositBox`를 DVM에서 활성화된 가격 식별자 중 하나와 연결합니다.

* 사용자는 `OptimisticDepositBox`에 wETH를 입금하고 `ETH/USD` 가격 식별자에 등록합니다.

* 이제 사용자는 스마트 계약 호출을 통해 `DepositBox`에서 USD 단위로 표시된 금액의 WETH를 출금할 수 있으며, Optimistic Oracle은 온체인 가격을 낙관적으로 책정할 수 있습니다.

이 예에서 사용자는 오프체인 `ETH/USD` 가격 피드를 참조하지 않고는 USD 단위로 표시된 금액의 wETH를 이전할 수 없었을 것입니다. 따라서 Optimistic Oracle은 사용자가 참조 가격을 '가져올' 수 있도록 합니다.

DVM에 대한 가격 요청과 달리 Optimistic Oracle에 대한 가격 요청은 분쟁이 없을 경우 지정된 유효 기간 내에 해결할 수 있으며, 이는 DVM 투표 기간보다 상당히 짧을 수 있습니다. 유효 기간은 구성 가능하지만, DVM을 통해 중재하는 데 2~3일이 걸리는 데 비해, 일반적으로 2시간이 소요됩니다.

가격 요청자는 현재 DVM에 수수료를 지불할 필요가 없습니다. 요청자는 가격 요청에 응답하는 제안자에게 보상을 제공할 수 있지만, 이 예에서는 보상 값이 `0`로 설정됩니다.

가격 제안자는 가격과 함께 채권을 게시하는데, 가격에 대한 분쟁이 발생하지 않거나 제안자에게 유리하게 분쟁이 해결되면 환불됩니다. 그렇지 않으면, 이 채권은 DVM에 최종 수수료를 지불하고 성공적인 분쟁자에게 보상을 지불하는 데 사용됩니다.

이 데모에서 요청자는 가격 제안자에게 추가 채권을 요구하지 않으므로 게시된 총 채권은 현재 wETH 최종 수수료와 동일한 0.2wETH입니다. 구현 세부 정보는 `OptimisticOracle` [계약](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html)의 `proposePriceFor`함수를 참조하세요.

## 데모 실행 {#running-the-demo}

1. [여기](https://docs.umaproject.org/developers/setup)에 설명된 모든 필수 설정 단계를 따랐는지 확인합니다.
2. `yarn ganache-cli --port 9545`를 사용하여 로컬 Ganache 인스턴스(즉, Kovan/Ropsten/Rinkeby/Mainnet이 아님)를 실행합니다.
3. 다른 창에서 다음 명령어를 실행하여 계약을 이전합니다.

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. `OptimisticDepositBox` [계약](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)을 배포하고 간단한 사용자 흐름을 통과하려면 저장소 루트에서 다음 데모 스크립트를 실행합니다.

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

다음 출력이 표시됩니다.

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## 계약 함수 설명 {#explaining-the-contract-functions}

`OptimisticDepositBox`계약 [코드는](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) 오라클과 상호 작용하는 방법을 보여줍니다.

`constructor` 함수는 `OptimisticOracle` 주소, 승인된 담보 및 가격 식별자 허용 목록 및 기타 중요한 계약 주소의 레지스트리를 유지하는 UMA `Finder` 계약의 `_finderAddress` 인수를 포함합니다.

이를 통해 `constructor`는 담보 유형과 가격 식별자가 유효한지 확인할 수 있으며 `OptimisticOracle`는 나중에 `OptimisticDepositBox`를 찾아 상호작용할 수 있습니다.

`requestWithdrawal` 함수에는 `ETH/USD` 가격을 요청하는 `OptimisticOracle`로의 내부 호출이 포함됩니다. 가격이 반환되면 `executeWithdrawal`을 호출하여 출금을 완료할 수 있습니다.

코드 코멘트에 훨씬 더 많은 정보와 설명이 있으므로 더 많은 학습에 관심이 있는지 확인하십시오.

## 추가 리소스 {#additional-resources}

다음은 UMA DVM과 관련된 추가 리소스입니다.

- [기술 아키텍처](https://docs.umaproject.org/oracle/tech-architecture)
- [경제 아키텍처](https://docs.umaproject.org/oracle/econ-architecture)
- UMA의 DVM 설계 관련 [블로그 게시물](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8)
- UMA의 DVM 설계 관련 [백서](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf)
- 최적 수수료 정책에 대한 [연구 자료 저장소](https://github.com/UMAprotocol/research)
- 정부 제안 관련 [UMIP 저장소](https://github.com/UMAprotocol/UMIPs)
