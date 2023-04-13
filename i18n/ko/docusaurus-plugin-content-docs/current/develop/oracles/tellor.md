---
title: Tellor
description: "Tellor 오라클을 Polygon 계약에 통합하는 가이드."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor는 단순한 암호 경제 인센티브에 의해 확보되는 검열 저항성 데이터를 제공하는 오라클입니다. 누구나 데이터를 제공할 수 있고 누구나 확인할 수 있습니다. Tellor의 유연한 구조 덕분에 모든 데이터를 어떤 시간 간격으로든 제공할 수 있어 실험/혁신이 용이합니다.

## (소프트) 전제 조건 {#soft-prerequisites}

오라클 측면에 집중하기 위해 코딩 기술 수준에 대해 다음과 같이 가정합니다.

가정:

- 터미널을 탐색할 수 있습니다.
- npm이 설치되어 있습니다.
- npm을 사용하여 종속성을 관리하는 방법을 알고 있습니다.

Tellor는 구현 준비가 된 라이브 오픈 소스 오라클입니다. 이 초보자의 가이드는 Tellor와 함께 올라가서 실행할 수 있는 용이성을 보여주기 위해 프로젝트에 완전히 분산 및 검열 저항의 오라클을 제공할 수 있습니다.

## 개요 {#overview}

Tellor는 모든 Polygon 스마트 계약이 액세스할 수 있는 오라클 시스템으로, 이 시스템에서 당사자가 오프체인 데이터 포인트(예: BTC/USD)의 값을 요청하면 리포터는 이 값을 온체인 데이터 뱅크에 추가하기 위해 경쟁합니다. 이 데이터 뱅크에 대한 입력은 스테이크된 리포터 네트워크에 의해 보호됩니다. Tellor는 암호 경제 인센티브 메커니즘을 활용합니다. Tellor는 토큰을 발행하여 리포터의 정직한 데이터 제출을 보상합니다. 모든 나쁜 행위자는 분쟁 메커니즘에 의해 신속하게 처벌되고 네트워크에서 제거됩니다.

이 지침서에서는 다음과 같은 내용을 살펴봅니다.

- Tellor 시작과 실행에 필요한 초기 툴킷 설정하기.
- 간단한 예제 학습.
- 현재 Tellor를 테스트할 수 있는 네트워크의 테스트넷 주소 나열.

## UsingTellor {#usingtellor}

가장 먼저 해야 할 일은 Tellor를 오라클로 사용하는 데 필요한 기본 도구를 설치하는 것입니다. [이 패키지](https://github.com/tellor-io/usingtellor)를 사용하여 Tellor 사용자 계약을 설치합니다.

`npm install usingtellor`

설치가 완료되면 계약이 'UsingTellor' 계약에서 기능을 상속받을 수 있습니다.

잘했습니다! 이제 도구가 준비되었으니 비트코인 가격을 검색하는 간단한 연습을 해보겠습니다.

### BTC/USD 예시 {#btc-usd-example}

UsingTellor 계약을 상속하고 Tellor 주소를 생성자 인수로 전달합니다.

다음 예를 보십시오.

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## 주소: {#addresses}

Tellor Tributes: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

오라클: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### 먼저 테스트를 하시겠습니까? {#looking-to-do-some-testing-first}

Polygon 뭄바이 테스트넷: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

시험 공물:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

테스트 토큰이 필요하십니까? ['@trbfaucet'](https://twitter.com/trbfaucet) 트윗

사용하기 쉽게 하려면 [Tellor Playground 계약의](https://github.com/tellor-io/TellorPlayground) 버전이 제공됩니다. 도움이 되는 함수 목록을 보려면 [여기를](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) 참조하십시오.

#### Tellor 오라클의 보다 강력한 구현을 위해 사용 가능한 전체 기능 목록을 [여기](https://github.com/tellor-io/usingtellor/blob/master/README.md)에서 확인하십시오.

#### 아직도 질문이 있습니까? [여기에](https://discord.gg/tellor) 커뮤니티를 참여하십시오!
