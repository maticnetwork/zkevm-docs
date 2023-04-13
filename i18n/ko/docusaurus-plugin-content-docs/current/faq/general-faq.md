---
id: general-faq
title: 일반적인 FAQ
description: Polygon 네트워크에 관한 일반적인 질문.
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Polygon 네트워크란 무엇인가요? {#what-is-polygon-network}

Polygon Network는 오프체인 계산을 위해 사이드체인을 활용하여 스케일링을 달성하는 동시에, PoS(스테이크 증명) 유효성 검사자를 통해 자산 보안 및 탈중앙화를 보장하는 레이어 2 스케일링 솔루션입니다.

[Polygon이란 무엇인가](/docs/home/polygon-basics/what-is-polygon)도 참조하시기 바랍니다.

## 스테이크 증명(PoS)이란 무엇입니까? {#what-is-proof-of-stake-pos}

스테이크 증명은 블록체인 네트워크가 분산된 합의를 달성하는 것을 목표로 하는 시스템입니다. 충분한 양의 토큰을 보유한 사람은 누구나 자신의 암호화폐를 락업할 수 있으며, 분산 네트워크의 가치를 공유함으로써 경제적 인센티브를 얻을 수 있습니다. 자신의 암호화폐를 스테이킹하는 개인은 합의에 투표하여 트랜잭션을 검증하는데, 합의는 체크포인트에서 하나의 블록 또는 블록 집합의 하나 또는 일련의 트랜잭션이 충분한 투표를 받을 경우 이루어집니다. 기준값은 모든 투표에 수반되는 스테이크의 가중치를 사용합니다. 예를 들어, Polygon에서 이더리움 네트워크에 대한 Polygon 블록의 체크포인트 커밋에 대한 합의는 총 스테이킹 파워의 ⅔ +1 이상이 이에 찬성하여 투표할 때 이루어집니다.

[스테이크 증명이란 무엇인가요](/docs/home/polygon-basics/what-is-proof-of-stake)도 참조하세요.

## Polygon 아키텍처에서 스테이크 증명은 어떤 역할을 합니까? {#what-role-does-proof-of-stake-play-in-the-polygon-architecture}

Polygon 아키텍처의 스테이크 증명 계층은 다음 두 가지 목적을 갖습니다.

* 플라스마 체인의 활성을 유지하기 위한 인센티브 층 역할을 하여 주로 데이터 가용성이라는 어려운 문제를 완화
* Plasma가 해결하지 못하는 상태 전환에 대한 스테이크 증명 보안을 보장

## Polygon PoS는 다른 유사한 시스템과 어떻게 다릅니까? {#how-is-polygon-pos-different-from-other-similar-systems}

Polygon PoS는 이중 목적을 갖는다는 점에서 다릅니다. 즉, 플라즈마 술어를 통해 상태 전환을 수행하는 플라즈마 체인에 대해 데이터 가용성을 보장하고, EVM의 일반 스마트 계약에 대해 스테이크 증명을 검증합니다.

또한 Polygon 아키텍처는 블록 생성과 검증 프로세스를 2개의 별개 계층으로 분리합니다. 블록 프로듀서로서의 유효성 검증자는 블록을 생성하고 그 이름이 암시하는 대로 Polygon 체인 상에서 빨리 (2초 이내) 부분적으로 확인합니다.  이에 비하여 최종확인은 체크포인트가 일정한 간격으로 메인 체인에 커밋되면 이루어지며, 그 기간은 Ethereum 혼잡 또는 Polygon 트랜잭션 수 등 여러 요인에 따라 다를 수 있습니다. 이상적인 조건에서는 약 15분에서 1시간 정도입니다.

체크포인트는 기본적으로 간격 사이에 생성된 모든 블록의 머클 루트입니다. 유효성 검사자는 블록 프로듀서 층에서 블록을 생성하고, 모든 체크포인트에 서명함으로써 합의에 참여하며, 제안자 로서 체크포인트를 커밋하는 등 여러 역할을 합니다. 유효성 검사자가 블록 프로듀서 또는 제안자가 될 확률은 전체 풀 내의 스테이크 비율에 따라 결정됩니다.

## 제안자가 모든 서명을 포함해야 좋은 이유 {#encouraging-the-proposer-to-include-all-signatures}

제안자 보너스를 완전히 얻으려면, 제안자는 체크포인트에 모든 서명을 포함해야 합니다. 프로토콜은 총 스테이크 2/3+1의 가중치를 확보하면 되는 것이므로, 80% 투표에도 체크포인트는 수락됩니다. 그러나 이 경우 제안자는 계산된 보너스의 80%만 받게 됩니다.

## 지원 티켓을 올리거나 Polygon 문서에 도움을 주려면 어떻게 해야 합니까? {#how-can-i-raise-a-support-ticket-or-contribute-to-polygon-documentation}
Polygon 문서에서 수정해야 할 사항이 있거나 여기에 새로운 정보를 추가하고 싶으면, [Github 리포지토리에 문제 제기](https://github.com/maticnetwork/matic.js/issues) 를 할 수 있습니다. 또한 리포지토리의 [Readme 파일](https://github.com/maticnetwork/matic-docs/blob/master/README.md)은 문서에 도움을 주는 몇가지 방법을 제안하고 있습니다.

도움이 필요하시면, 언제든 **Polygon 지원팀**으로 연락주십시오.
