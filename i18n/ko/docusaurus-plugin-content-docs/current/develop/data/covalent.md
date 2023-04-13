---
id: covalent
title: Covalent 사용하기
sidebar_label: Covalent
description: Covalent의 데이터 통합 API 사용 방법 알아보기
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## 소개 {#introduction}

Polygon은 Plasma 적응 버전을 사용하여 엑시룸에 대규모 규모를 제공합니다. PoS 기반 idechain을 통해 빠르고 매우 빠르고 매우 빠른 솔루션을 제공합니다. 메인 체인의 최종성과의 저렴한 트랜잭션 Polygon 네트워크가 보장합니다. 이더리움 메인체인에 밀려난 PoS 체크포인트를 사용하여 활기찬 활기찬 이를 통해 단일 Polygon sidechain을 이론적으로 `2^16`트랜잭션을 구현할 수 있습니다. 블록 당 및 향후 여러 체인에서 수백만 건의 거래가 발생할 수 있습니다.

### 요약 정보 {#quick-facts}

<TableWrap>

| 속성 | 값 |
|---|---|
| Polygon 메인넷 체인 ID | `137` |
| Polygon Mumbai 테스트넷 체인 ID | `80001` |
| Polygon 블록체인 탐색기 | https://polygonscan.com/ |
| 블록 시간 | ~3초 |
| 데이터 새로 고침 지연 시간 | ~6초 또는 2블록 |

</TableWrap>

:::tip 빠른 시작

**[<ins>이 소개 비디오를</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)** 확인하십시오. 시작하기 위해

:::

## 지원되는 엔드포인트 {#supported-endpoints}

모든 [__클래스 A__](https://www.covalenthq.com/docs/api/#tag--Class-A) 종점이 믹 메인 넷과 Mumbai 테스트넷에 대해 지원됩니다. `chainId`를 변경하여 어느 네트워크에서든 통합 API를 통해 쿼리할 수 있습니다.

:::info 엔드포인트

Covalent를 사용하여 Polygon 네트워크에서 할 수 있는 모든 요청의 전체 목록 [<ins>Covalent API 문서에서</ins>](https://www.covalenthq.com/docs/api/) 확인할 수 있습니다.

:::

---

## 부록 {#appendix}

### 매틱 가스 토큰 {#matic-gas-token}

매틱 네트워크와 상호작용하려면, 매틱 토큰은 가스 요금을 지불해야 합니다. Covalent의 s 응답은 MATIC 단위의 `gas_*`필드를 자동으로 반환합니다.

### 토큰 매핑 {#token-mapping}

Covalent는 이더리움 메인넷 및 매틱 체인 간에 토큰 주소의 실시간 온체인 매핑을 유지합니다. 이러한 주소는 매틱 가격을 역조회하고 올바른 토큰 로고 URL을 반환하기 위해 사용됩니다.

매핑된 토큰 예시:

| 토큰 | 이더리움 메인넷 | 매틱 메인넷 |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### 토큰 가격 {#token-prices}

이더리움 메인넷으로 다시 매핑된 토큰의 경우, Covalent는 매핑된 가격을 반환할 수 있습니다.
