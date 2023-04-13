---
id: getting-started
title: 이더리움↔Polygon 브리지
sidebar_label: Overview
description: Polygon 및 이더리움 사이의 양방향 트랜잭션 채널.
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon은 플라스마 및 PoS 보안이 적용된 크로스체인 브리지를 도입하여 Polygon과 이더리움 사이에 신뢰 보증이 필요 없는 양방향 트랜잭션 채널을 제공합니다. 이를 통해 사용자는 Polygon에서 제삼자 리스크 및 시장 유동성 제한 없이 토큰을 이전할 수 있습니다. **Plasma 및 PoS 브리지는 Mumbai 테스트넷과 Polygon 메인넷에서 모두 사용할 수 있습니다**.

**Polygon 브리지는 거의 즉각적이고 저렴한 비용으로 매우 유연하다는 브리징 메커니즘을 제공합니다**. Polygon은 듀얼 컨센서스 아키텍처를 사용합니다(Plasma + Pro-of-Stake) 플랫폼) 속도 및 지방 분화를 최적화하기 위해 Polygon은  의도적으로 EVM을 사용하는 사이드체인에서 임의 상태 전환을 지원하도록 시스템을 구성했습니다.

**토큰이 브리지를 통과할 때 토큰 공급의 순환에는 변화가 없습니다**.

- 이더리움 네트워크를 떠나는 토큰은 잠겨 있으며 Polygon 토큰에 대한 동일한 수의 토큰을 pegged 토큰(1:1)으로 Pygone에서 채굴됩니다.
- 토큰을 이더리움 네트워크로 다시 옮기기 위해서 토큰은 Polygon 네트워크에서 소각되며 그 과정 동안 이더리움 네트워크에서 잠금 해제됩니다.

## PoS와 플라스마 비교 {#pos-vs-plasma}

|                                      | PoS 브리지(추천) | 플라스마 브리지 |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **간략한 설명** | POS 시스템 보안과 함께 유연성과 빠른 인출을 찾는 DApp 개발자 중 하나입니다. | 플라스마 종료 메커니즘으로 향상된 보안 보장을 원하는 dApp 개발자 |
| **구조** | 매우 유연함 | 엄격하고 덜 유연함 |
| **입금\(이더리움 → Polygon\)** | 22-30 분 | 22-30 분 |
| **출금\(Polygon → 이더리움\)** | 1 체크 포인트는 = ~ 30분에서 6시간 | 이더리움의 계약에서 프로세스 종료 절차에 대해 호출하십시오. |
| **보안** | 강력한 외부 검증자 집합에 의해 보안이 확보된 지분증명 시스템. | Polygon의 플라스마 계약은 이더리움의 보안을 함께 누립니다. |
| **지원 표준** | ETH, ERC20, ERC721, ERC1155 및 기타 | ETH, ERC20, ERC721만 해당 |

:::info

[**FxPortal은**](/develop/l1-l2-communication/fx-portal.md) PoS 브리지와 매우 유사한 또 다른 유형의 다리입니다. 위의 테이블에서 PoS에 대해 언급 된 것과 동일한 특성을 공유합니다. 유일한 차이점은 브리징 전에 FxPortal 브리지에 토큰을 매핑할 필요가 없다는 것입니다. 매핑 는 주어진 토큰에 대해 시작하는 첫 번째 예금 트랜잭션 중 발생합니다. 또한 누구나 FxPortal을 사용하여 Polygon 브리지 상단에 자신의 사용자 정의 터널/다리를 구축할 수 있습니다. 브리징 사용 케이스에 대해 FxPortal을 사용하는 것이 좋습니다. 새로운 토큰의 사상은 2023년 1월 31일 이후 낙담하여 매핑 프로세스가 완전히 분산되고 유연하도록 만듭니다.

:::

## 추가 리소스 {#additional-resources}

- [블록체인 브리지스 소개](https://ethereum.org/en/bridges/)
- [크로스체인 브리지스가 무엇](https://www.alchemy.com/overviews/cross-chain-bridges)
