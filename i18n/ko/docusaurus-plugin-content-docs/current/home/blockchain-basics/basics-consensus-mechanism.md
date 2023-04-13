---
id: consensus-mechanism
title: 합의 메카니즘
description: "PoW, PoS, DPoS, PoSpace 밎 PoET."
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 합의 메카니즘 {#consensus-mechanism}

합의 메카니즘은 암호화폐와 같은 분산 프로세스 또는 멀티 에이전트 시스템 사이에서 네트워크의 단일 데이터 가치 또는 단일 상태에 필요한 합의를 이루기 위해 컴퓨터 및 블록체인 시스템에서 사용되는 결함 허용 메카니즘입니다.

## 합의 메카니즘의 유형 {#types-of-consensus-mechanism}

### 작업 증명 {#proof-of-work}
작업 증명은 DOS(서비스 거부) 공격 및 기타 악의적인 공격을 저지하기 위해 사소하지는 않지만 실현 가능한 노력의 양을 필요로 하는 시스템을 설명합니다. Blockchain에서 새로운 블록을 생성하기 위해 어려운 계산 퍼즐을 해결해야 합니다.

### 지분증명 {#proof-of-stake}
Pro of-Stake의 메커니즘은 사용자가 토큰의 양을 지분을 보유하도록 요구함으로써 합의를 통해 사용자가 거래의 블록을 확인하고 그에 대한 보상을 받을 수 있습니다. 우선순위는 블록체인 시스템에서 스테이크를 가장 많이 구입한 채굴자에게 주어집니다.

### 스테이크의 증명 위임 {#delegated-proof-of-stake}
이 형태의 합의는 관리 기관에서 구성원의 투표를 반영합니다. 이해 관계자는 자산을 스스로 스테이킹하는 대신 이 활동을 컨센서스 프로세스에 참여할 제 3자, 증인 또는 대표단에 위임할 수 있습니다. 거래를 검증하는 사람들은 대개 제안서를 제시하고 표를 요청하고 이해 관계자가 선출합니다. 해당 단체가 얻은 보상은 일반적으로 네트워크 참가자와 공유됩니다.

### 공간 증명 {#proof-of-space}
이러한 종류의 컨센서스 메커니즘은 Storj.io, Fileco, Crust에서 같은 분산 파일 스토리지 응용 프로그램에 유용합니다. 여기서 노드가 자신의 하드웨어에서 합법적 인 역량을 있음을 증명하는 경우 노드들이 됩니다. 그러나 PoW 메커니즘에서 무거운 연산 대신 각 노드의 저장 용량을 활용합니다. 때로는 PoStroage 또는 PoCapacity라고도 합니다.

### Elapsed 시간 증명 {#proof-of-elapsed-time}
PoW에 대한 더 나은 대안으로 적은 연산 자원을 소비합니다. 각 참여 노드는 임의의 양의 시간을 기다려야 하고 수면 에서 깨어날 첫 번째 노드가 네트워크를 통해 전파되는 새로운 블록을 만들 수 있는 기회를 얻습니다. 메모의 고립된 부분인 인텔 SGX와 같은 신뢰할 수 있는 실행 환경(TEE)을 요구하고 있으며, 특정 일련의 지침으로 만 액세스 할 수 있습니다.

## **리소스**

- [비잔틴 오류 Faults](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [컨센서스 메커니즘 유형](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [컨센서스 시스템 개발의 개요 및 역사](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [분산 컨센서스 이해](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [비잔틴 제너럴 문제](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)