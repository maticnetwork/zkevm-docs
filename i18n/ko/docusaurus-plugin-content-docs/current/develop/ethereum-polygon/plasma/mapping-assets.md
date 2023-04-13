---
id: mapping-assets
title: 플라즈마를 이용한 자산 매핑
description: 폴리곤에서 다음 블록체인 앱을 설치합니다.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

이더리움의 ERC20 및 ERC721 토큰은 플라즈마 프로토콜을 사용하여 폴리곤 체인에서 입출금할 수 있습니다. 이를 가능하게 하려면 이더리움의 토큰 컨트랙트(_rootToken_)을 폴리곤 체인(_childToken_)의 토큰 컨트랙트에 매핑해야 합니다.

[여기](/docs/develop/ethereum-polygon/submit-mapping-request)에서 매핑 요청을 제출할 수 있습니다. 이 매핑 제출 양식은 플라즈마 브리지용이며 PoS 브리지의 경우 불일치 시 디스코드에서 matic 팀에 직접 문의해야 합니다.

## 토큰 매핑

토큰 매핑에는 폴리곤 체인에 _childToken_ 컨트랙트를 배포하고 메인 및 폴리곤 체인 모두에 토큰을 등록하는 작업이 포함됩니다.

제한된 _childToken_은 ChildChain 컨트랙트에 컨트랙트 호출을 통해 자동으로 폴리곤 체인에 배포 및 등록됩니다. 그러나 _rootToken_에 기본 ERC20/ERC721 외에 추가 기능이 있는 경우 사용자 지정 _childToken_ 컨트랙트를 수동으로 배포해야 합니다. ([추가 기능 추가하기](/docs/develop/ethereum-polygon/plasma/mapping-assets#adding-functionality-to-child-token) 읽기)

## '제한된' 하위 토큰 배포하기

### Step 1: 폴리곤에서

ChildChain 컨트랙트의 [`addToken` 함수 호출](https://github.com/maticnetwork/contracts/blob/fd4ed8343a8abb2dda5fe5a6a75a747cfd7a2807/contracts/child/ChildChain.sol#L55)은 제한된 기능([ChildERC20](https://github.com/maticnetwork/contracts/blob/master/contracts/child/ChildERC20.sol) 및[ ChildERC721](https://github.com/maticnetwork/contracts/blob/master/contracts/child/ChildERC721.sol) 참조)을 사용하여 폴리곤에 하위 토큰을 배포합니다. 이는 자산에 대한 플라즈마 보안을 보장하기 위해 수행됩니다. 그렇지 않으면 모델이 손상됩니다. 따라서 맞춤형 토큰이 있는 플라즈마 보안이 필요하고 일반 토큰이 제공하는 것 외에 기능이 추가된 경우 의무적으로 제한을 두고 안전하게 컨트랙트를 작성해야 합니다.

이벤트, [입금](https://github.com/maticnetwork/contracts/blob/fd4ed8343a8abb2dda5fe5a6a75a747cfd7a2807/contracts/child/BaseERC20.sol#L6), [출금](https://github.com/maticnetwork/contracts/blob/fd4ed8343a8abb2dda5fe5a6a75a747cfd7a2807/contracts/child/BaseERC20.sol#L14), [LogTransfer](https://github.com/maticnetwork/contracts/blob/fd4ed8343a8abb2dda5fe5a6a75a747cfd7a2807/contracts/child/BaseERC20.sol#L22)와 같은 특정 데이터 구조는 폴리곤의 자산을 추적하기 위해 유지 관리됩니다. 이는 사기 증명 및 플라즈마 술어를 통해 사이드체인의 데이터 검증을 보장하기 위해 이 데이터를 읽는 플라즈마 컨트랙트에 절대적으로 필수적입니다.

개발자의 피드백을 기반으로 개발자가 이제 예를 들어 전송을 위해 유지하려는 모든 제한을 프로그래밍할 수 있는 메커니즘을 추가했습니다. 예를 들어 [이 문서](/docs/develop/advanced/custom-restrictions)를 참조하세요. 이를 통해 플라즈마 안전 전송이 발생하기 전에 임의의 논리를 코딩할 수 있으므로 전송과 사용자 정의 논리를 분리하여 플라즈마 안전을 보장할 수 있습니다.

#### 제한 사항에 대한 참고 사항

플라즈마 보안은 자산 소유권이 쉽게 파생되기 때문에 사용자 제어 계정 또는 EOA에 대해 구현하기가 비교적 간단합니다. 그러나 자산의 소유권을 미리 알 수 없고 컨트랙트의 복잡성에 따라 달라질 수 있기 때문에 Plasma에 대해 컨트랙트를 프로그래밍하기가 어렵습니다.

따라서 일부 유형의 컨트랙트를 [플라즈마 술어](https://github.com/maticnetwork/contracts/tree/master/contracts/root/predicates)로 지원합니다. 자산 이전, 자산 스왑 등과 같은 몇 가지 사전 구축된 술어로 시작하고 다양한 사용 사례를 반영하기 위해 사전 구축된 술어의 수를 늘릴 것입니다.

### Step 2: 이더리움에서

매핑할 각 자산에 대해 레지스트리 컨트랙트의 매핑이 업데이트됩니다. 이것은 이더리움(또는 Ropsten)에서 [mapToken 함수 호출](https://github.com/maticnetwork/contracts/blob/fd4ed8343a8abb2dda5fe5a6a75a747cfd7a2807/contracts/common/Registry.sol#L64)을 통해 수행됩니다. 이 함수는 ChildChain에 대한 `addToken` 호출에서 반환된 매핑된 주소를 가져오고 이더리움에서 매핑을 업데이트합니다.

## 자산 이동하기

### 입금

1. 입금 관리자 컨트랙트는 msg.sender를 대신하여 X를 지출하도록 승인됩니다.
2. 입금 관리자는 msg.sender에서 자신에게 금액을 이체합니다.

이렇게 하면 자산이 메인 체인에 잠겨 있고 토큰이 폴리곤에서 사용되는 동안 양도할 수 없습니다.

### 출금

1. 폴리곤 사이드체인에서 토큰을 소각합니다.
2. Root Chain에 소각 증명(소각 tx의 영수증을) 제출합니다.
   1. 이 단계는 소각 트랜잭션으로 구성된 블록이 루트 체인의 체크포인트에 포함된 후에만 실행됩니다.
   2. 체크포인트 제출 후 이 단계의 성공적인 실행
      1. 챌린지 종료 기간의 시작을 표시합니다(메인 네트워크에서는 7일, 테스트 네트워크에서는 5분으로 설정됨).
      2. 인출자의 계정에 ExitNFT 토큰을 발행합니다. 이는 인출자가 하위 체인에서 시작한 종료를 나타냅니다.
   3. processExits는 Exit NFT를 소각하고 토큰을 Deposit Manager에서 인출자에게 다시 전송합니다.

## 하위 토큰에 기능 추가하기

경우에 따라 제한된 하위 토큰이 제공하는 것 외에 추가 기능이 필요할 수 있습니다. 폴리곤에 맞춤형 토큰을 하위로 추가하려면 표준 플라즈마 컨트랙트를 상속하고 용도에 따라 맞춤형 함수를 추가할 수 있습니다. 예를 들어,

```javascript

pragma solidity ^0.5.2;

import { ChildERC20 } from "./ChildERC20.sol";


contract YourCustomChildToken is ChildERC20 {

  // your custom functions

}
```

### request-submission

[이 과정](/docs/develop/ethereum-polygon/submit-mapping-request)을 거치십시오.
