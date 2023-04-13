---
id: liquid-delegation
title: 유동 위임
sidebar_label: Liquid Delegation
description: Polygon이 네트워크 관리를 위해 유동 위임을 사용하는 방식입니다.
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Stake 메커니즘의 전통적인 증거에서 Blockchain은 일련의 검증자 트랙을 유지합니다. 누구나 동전을 스테이크하고 예금에 잠그고 있는 특수 유형의 트랜잭션 (Eythere 's case, ETH)를 보내서 이 랭크 또는 오른쪽에 가입할 수 있습니다. 그 후, 모든 액티브 유효성 검사자의 컨센서스 알고리즘을 통해 새로운 블록에 대한 생성 및 동의하는 프로세스가 수행됩니다.

그들은 일정 시간 (보안 예금 같은)에 대해 지분을 잠그고 대가로 다음 블록을 선택할 수 있는 해당 지분에 비례하여 기회를 얻습니다.

스테이킹 보상은 참가자들에게 인센티브로 배포됩니다.

## 위임 {#delegation}

스테이크는 비용이 많이 들 수 있으며, 이는 부자가 점점 더 부유해지는 것을 선호하는 진입 장벽을 높입니다. 모두가 네트워크 보안에 참여하고 감사의 토큰을 받아야합니다. 유일한 다른 옵션은 유효성 검사자가 신뢰할 수 있어야 하는 광산 풀과 유사한 스테이킹 풀에 가입하는 것입니다. 우리는 프로토콜에 집착하는 것이 새로운 대표단을위한 최고의 행동 과정이라고 믿습니다. Pro 메커니즘에 의해 자본 및 보상이 열려 있기 때문에 Pro 메커니즘에 의해 보호됩니다.

대표단은 전체 노드를 호스팅하지 않더라도 유효성 확인에 참여할 수 있습니다. 그러나 유효자가 스테이크를 통해 피실험자에게 작은 커미션을 지불함으로써 네트워크의 강도를 높이고 보상을 받을 수 있습니다.

## 전통 대표자 및 유효성 검사기의 제한 {#limitation-of-traditional-delegator-and-validator}

자본 락업 비용은 스테이크 증명 프로토콜 디자인 때문에 유효성 검사자와 위임자 모두에게 높습니다.

여전히 유효자가 되고 싶은 새로운 당사자가 어떤 이유로 시스템에서 빠져나가려는 유효한 인증자로부터 NFT를 구입할 수 있는 유효성 검사자 NFT와 같은 더 많은 유동성 뷰 메커니즘을 가져올 수 있습니다.

대표단의 경우 잠금된 금액이 작은 덩어리로 가정되어 참여가 더 활발하기 때문에 참여가 더 활발할 수 있도록 (즉, 일부 대표단이 지금 DeFi에서 기회가 훌륭하다고 생각하지만 자본이 인출을 위해 스테이킹 풀에 갇혀 있다고 생각한다면 여전히 21일을 기다려야 할 수 있습니다).

또한 보증금에 X ETH를 잠그면 무료가 아닙니다. Eth 홀더에 대한 선택성의 희생을 수반합니다. 지금, 1000 ETH를 가지고 있다면, 원하는 것을 할 수 있습니다. 예금에 잠그면 몇 [**달**](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed) 동안 붙어 있습니다.

## In-Protocol vs Application Layer {#in-protocol-vs-application-layer}

애플리케이션 레벨 스테이킹 청산은 신뢰 문제가 있습니다. 새로운 배우가 그것을 믿을 수 있다는 사실 때문에 의정서 레벨 스테이킹 청산은 훨씬 더 감사합니다 (이는 더 많은 자본을 끌어들이는 소규모 배우/대표단으로부터 더 많은 자본을 끌어들이는 것).

## 위임에 대한 Polygon의 솔루션 {#polygon-s-solution-for-delegation}

대표단을 탐험하는 동안 대표단의 신뢰를 얻기 위해 대표단이 in-protocol 있어야 한다는 것을 깨달았습니다.

우리는 유효성 검사자 자본 유동성과 NFT를 전송하고 더 많은 액체와 sikkka-Corus를 만들 수 있는 유사한 생각을 탐구할 수 있는 NFT를 만드는 생각과 비슷한 문제에 직면했습니다. 하나는 [멋진 디자인이](https://blog.chorus.one/delegation-vouchers/) 관심을 끌었습니다.

만드는 것은 유효성 검사자 풀의 몫이라는 관점에서 생각하는 것이 기발합니다. Polygon의 스테이킹은 이더리움 스마트 계약에서 구현되기 때문에 이 아이디어는 DeFi 프로토콜에서 사용될 수 있도록 ERC20과 호환 가능하게 만드는 것 등 저희에게 훨씬 많은 옵션을 열어줍니다.

현재 유효한 사람은 각각 자신의 VMatic (즉, 유효상대자의 Ashish에 대한 API)를 가지고 있습니다. 대표단은 여러 개의 유효한 레이터 점유율을 구입하고 특정 레이터의 성능이 좋지 않은 것에 대한 위험을 헤지 할 수 있습니다.

## 장점 {#advantages}

- 우리 디자인은 위임 구현에서 ERC20을 따르는 인터페이스를 따르므로 DeFi 애플리케이션을 쉽게 그 위에 구축할 수 있습니다.
- 위임된 토큰은 대출 프로토콜에 사용할 수 있습니다.
- 위임자는 Auger와 같은 예측 시장을 통해 위험을 헤지할 수 있습니다.

미래 전망:

- 현재 ERC20은 다른 유효성 검사자 ERC20 / 공유 토큰과 함께 곰팡이 스럽지 않지만 나중에 많은 새로운 DeFi 응용 프로그램이 이를 기반으로 만들어 일부 시장을 만들 수 있다고 생각합니다.
- [코러스.one의](http://chorus.one) 연구를 통해 자체 토큰을 사용하는 유효성 검사자와 같은 문제를 탐구합니다. (X개월 동안 자신의 지분을 잠그고 있는 유효자 보험과 같은 문제를 해결하는 것과 같은 문제를 해결하는 것)을 통해 문제를 피할 수 있습니다.
- 거버넌스 결정에 참여하기 위해 대표자 투표 권리.
- 위임 액체를 작성하는 동안 네트워크 보안을 보장하고자 합니다. 그래서 어떤 형태로든 사기 활동의 경우 슬래시 가능 자본이 잠겨 있습니다.

위 디자인이 프로토콜 내에서 이용 가능하게 되면 유효성 검사자는 Polygon 스테이킹 UI에서는 제공되지 않는 계약을 통해 언제든지 비슷한 메커니즘과 스테이크를 직접 구현할 수 있습니다.

## 미래 목표 {#future-goals}

코스모스 허브와 에버렛 B-수확 디자인을 통해 인체인 / 크로스 체인과 같은 것들.

## 리소스 {#resources}

- [비탈릭의 PoS 디자인](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [스테이킹 파생 상품 소개](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [스테이킹 풀](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [스테이크 증명의 인플레이션](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
