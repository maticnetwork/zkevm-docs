---
id: polygon-architecture
title: Polygon PoS 아키텍쳐
description: Heimdall 및 Bor 체인을 포함한 Polygon PoS Architecture
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - pos
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygon PoS 아키텍쳐 {#polygon-pos-architecture}

Polygon 네트워크는 하이브리드 스테이크 증명 및 플라스마 기반 사이드체인을 제공하는 블록체인 애플리케이션 플랫폼입니다.

Architecture적으로 Polygon의 아름다움은 Full-blob sidechain과 같은 다른 실행 환경에서 분리된 일반 유효성 확인층을 포함하는 우아한 디자인입니다.

당사 플랫폼에서 PoS 메카니즘을 사용 가능하게 하기 위해 저희는 이더리움에 대해 일련의 **스테이킹** 관리 계약을 고용할 뿐만 아니라 **Heimdall**과 **Bor** 노드를 운영하고 인센티브를 제공받는 일련의 유효성 검사자들도 고용합니다. 이더리움은 Polygon이 지원하는 첫 번째 베이스체인이지만, Polygon은 커뮤니티 제안과 합의를 기반으로 상호 운용 가능한 분산 레이어-2 블록체인 플랫폼을 지원하기 위해 추가 베이스체인을 지원하려고 합니다.

Polygon PoS는 3중 레이어 아키텍쳐를 가지고 있습니다.

1. 이더리움 상의 스테이킹 스마트 계약
2. Heimdall(스테이크 증명 층)
3. Bor(블록 프로듀서 층)

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Polygon 스마트 계약(이더리움 상) {#polygon-smart-contracts-on-ethereum}

Polygon은 다음을 취급하는 이더리움 상의 일련의 스마트 계약을 유지합니다.

- 스테이크 증명 층을 위한 스테이킹 관리
- 유효성 검사자 지분을 포함한 위임 관리
- 체크포인트/사이드체인 상태 스냅샷

### Heimdall(스테이크 증명 유효성 검사자 층) {#heimdall-proof-of-stake-validator-layer}

**Heimdall**은 Polygon에서 PoS 메커니즘을 활성화하기 위해 Ethereum의 Staking 계약과 일치하여 작동하는 PoS 유효성 검사기 노드입니다. 우리는 Tendermint 합의 엔진에 추가하여 서명 방식 및 다양한 데이터 체계를 변경함으로써 이를 구현하였습니다. 블록 유효성 검사, 블록 프로듀서 위원회 선택, 저희 아키텍쳐에서 이더리움에 대한 사이드체인 블록의 표현 검사 및 기타 다양한 책임을 담당합니다.

Heimdall 계층은 Bor가 생성한 블록을 머클 트리에 한데 모아 이 머클 루트를 정기적으로 루트 체인에 게시하는 일을 처리합니다. 이러한 정기 간행물은 `checkpoints`호출됩니다. Bor의 몇 개 블록마다 Heimdall 층의 유효성 검사자는 다음을 수행합니다.

1. 마지막 체크포인트 이후 모든 블록의 유효성을 검사합니다
2. 블록 해시의 머클 트리를 생성합니다
3. 머클 루트를 이더리움 메인 체인에 게시합니다

체크포인트는 다음의 두 가지 이유로 중요합니다.

1. 루트 체인에 완결성을 제공합니다
2. 자산 인출에서 소각 증명을 제공합니다

프로세스의 조망은 다음과 같이 설명할 수 있습니다.

- 풀의 활성 유효성 검사자의 하위 집합이 어떤 범위에 대해 블록 프로듀서 역할을 하도록 선택됩니다. 또한 각 범위의 선택은 파워의 2/3 이상이 동의합니다. 이 블록 제작자는 블록을 생성하고 나머지 네트워크에 방송할 책임이 있습니다.
- 체크포인트에는 특정 간격 동안 생성된 모든 블록의 루트가 포함되어 있습니다. 모든 노드가 이에 대한 유효성 검사를 하고 자신의 서명을 여기에 첨부합니다.
- 유효성 검사자 세트에서 선택된 제안자는 특정 검문소에 대한 모든 서명을 수집하고 메인 체인에서 동일한 서명을 저지른 책임이 있습니다.
- 블록을 생성하고 체크포인트를 제안하는 역할은 전체 풀에서 유효성 검사자의 스테이크 비율에 가변적으로 의존합니다.

### Bor(블록 프로듀서 층) {#bor-block-producer-layer}

Bor은 Polygon 블록 프로듀서 층으로, 트랜잭션을 블록에 모으는 역할을 담당합니다.

블록프로듀서는 Polygon 내에서 `span`인 기간 동안 Heimdall의 위원회 선택을 통해 정기적으로 뒤섞입니다. 블록은 **Bor** 노드에서 생성되며, 사이드체인 VM은 EVM과 호환됩니다. Bor에서 생성된 블록은 또한 Heimdall 노드에서도 주기적으로 유효성 검증이 행해지며 Bor의 블록 집합에 대한 머클 트리 해시로 구성된 체크포인트는 주기적으로 이더리움에 제공됩니다.

### 리소스 {#resources}

- [Bor 아키텍쳐](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Heimdall 아키텍쳐](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [체크포인트 메커니즘](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
