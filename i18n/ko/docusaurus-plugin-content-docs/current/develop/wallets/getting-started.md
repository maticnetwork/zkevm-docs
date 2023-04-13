---
id: getting-started
title: 지갑
sidebar_label: Getting Started
description: 지원되는 지갑 목록을 확인하고 키 전략을 관리합니다.
keywords:
  - wiki
  - polygon
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 최신 정보 받기

Google팀 및 커뮤니티에서 최신 Wallet Suite 업데이트를 Google에 가입하여 [<ins>알림에</ins>](https://polygon.technology/notifications/) 가입하십시오.

:::

Polygon을 지원하는 Wallet은 핵심 관리를 위해 사용자가 통제하는 계정에 대한 액세스 및 사용자가 체인 액션 및 서명 거래를 수행할 수 있는 개인 키와 인터페이스, 사용자가 체인 액션 및 로그인 트랜잭션을 수행할 수 있는 인터페이스. 다음 페이지는 Polygon과 호환되는 지갑의 지갑 인덱스 역할을 합니다. 참고: 이것은 모든 것이 포함되어 있는 완전한 인덱스가 아닙니다.

:::caution 타사 지갑

타사 지갑은 Polygon을 통합하고 다양한 기능을 지원합니다.
**먼저 직접 실사를 해야 합니다**. 공식 Polygon 이 지갑 또는 기타 비 네이티브 지갑을 통해 지원을 제공할 수 없습니다.

:::

:::info 중앙화 거래소(CEX)

Polygon을 지원하는 EXS 목록은 같은 타사 추적 웹사이트에서 방문하십시오. [<ins>**CoinMarketCap**</ins>](https://coinmarketcap.com/currencies/polygon/markets).

:::

## 네이티브 지갑 {#native-wallets}

Polygon [지원은](https://support.polygon.technology/support/home) 사용자에게 도움을 제공하고 다음 지갑과 관련된 문제를 해결할 수 있습니다.

| 지갑 | 수탁(커스터디) | 계정 유형 | 다중 서명 | DApp 브라우저 | 플랫폼 |
|----------------------------------------------------------------------|---------------|--------------|-----------|--------------|----------|
| [PoS 지갑](https://wallet.polygon.technology/login/) | 비수탁(논커스터디알) | EOA | 없음 | 없음 | 브라우저 |
| [Hermez Wallet](https://wallet.hermez.io/login) | 비수탁(논커스터디알) | EOA | 없음 | 없음 | 브라우저 |

## 파트너 지갑 {#partner-wallets}

다음 지갑들은 Polygon Technology가 파트너 관계를 맺은 솔루션들입니다.

| 지갑 | 수탁(커스터디) | 계정 유형 | 다중 서명 | NFT | DApp 브라우저 | 브리지 지원 | 법정화폐 온램프 | 플랫폼 |
|---	|---	|---	|---	|---	|---	|---	|---	|---	|
| [1인치](https://1inch.io/wallet/) | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 예 | 예 | 예 | 모바일 |
| [Alpha Wallet](https://alphawallet.com/) | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 예 | 예 | 예 | 모바일, api/sdk |
| [Atomic Wallet](https://atomicwallet.io/)* | 비수탁(논커스터디알) | EOA | 없음 | 없음 | 없음 | 없음 | 예 | 모바일, 데스크톱, api/sdk |
| [Ambire](https://www.ambire.com/) | 비수탁(논커스터디알) | 스마트 계약 | 없음 | 인터페이스 | 없음 | 예 | 예 | 브라우저 |
| [BitKeep](https://bitkeep.com/) | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 예 | 예 | 예 | 모바일, 브라우저 확장 |
| [Bitski](https://www.bitski.com/) | 커스터디알 | EOA | 없음 | 인터페이스 | 없음 | 예 | 없음 | 브라우저, api/sdk |
| [Coin98](https://coin98.com/wallet) | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 예 | 예 | 예 | 모바일, 브라우저, api/sdk |
| [Coinbase](https://www.coinbase.com/wallet) | 하이브리드 | EOA | 없음 | 인터페이스 | 예 | 예 | 예 | 모바일, 브라우저, api/sdk |
| [CypherD](https://cypherd.io/) | 비수탁(논커스터디알) | EOA | 없음 | 예 | 예 | 예 | 예 | 모바일 |
| [D'Cent](https://dcentwallet.com/) | 하이브리드 | EOA | 없음 | 인터페이스 | 예 | 예 | 없음 | 모바일 |
| [엑소더스](https://www.exodus.com/) | 비수탁(논커스터디알) | EOA | 없음 | 예 | 없음 | 없음 | 예 | 모바일, 데스크톱 |
| [Gnosis Safe](https://gnosis-safe.io/) | 비수탁(논커스터디알) | 스마트 계약 | 예 | 인터페이스 | 없음 | 없음 | 없음 | 모바일, 브라우저, 데스크톱, api/sdk |
| [Guarda](https://guarda.com/) | 비수탁(논커스터디알) | EOA | 없음 | 없음 | 없음 | 예 | 예 | 모바일, 브라우저, 데스크톱 |
| [Huobi](https://www.itoken.com/en) | 비수탁(논커스터디알) | EOA | 없음 | 예 | 예 | 예 | 없음 | 모바일 |
| [레저](https://www.ledger.com/) | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 없음 | 없음 | 예 | 하드웨어, 모바일, 데스크톱 |
| [Loopring](https://loopring.io/#/) | 비수탁(논커스터디알) | 스마트 계약 | 없음 | 없음 | 없음 | 없음 | 없음 | 모바일, api/sdk |
| [Magic](https://fortmatic.com/)* | 커스터디알 | EOA | 없음 | 없음 | 없음 |   |   | 모바일, 브라우저, api/sdk |
| [MathWallet](https://mathwallet.org/en-us/) | 커스터디알 | EOA | 없음 | 없음 | 없음 | 예 | 예 | 모바일, 브라우저, api/sdk |
| [메타 마스크](https://metamask.io/)* | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 예 | 없음 | 없음 | 모바일, 브라우저, api/sdk |
| [Multis](https://multis.co/)* | 비수탁(논커스터디알) | EOA | 없음 | 없음 | 없음 |   | 예 | 모바일, 데스크톱 |
| [MyEtherWallet](https://www.myetherwallet.com/)* | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 없음 |   | 예 | 모바일 |
| [Omni](https://omni.app/) | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 없음 | 예 |   | 모바일, api/sdk |
| [Opera Crypto Browser](https://www.opera.com/crypto/next)* | 비수탁(논커스터디알) | EOA | 없음 | 지원 | 예 |   |   | 모바일, 브라우저 |
| [Pillar](https://www.pillar.fi/) | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 없음 |   | 예 | 모바일 |
| [Rainbow](https://rainbow.me/) | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 예 |   | 없음 | 모바일, api/sdk |
| [SafePal](https://safepal.io/) | 비수탁(논커스터디알) | EOA | 없음 | 없음 | 예 | 예 |   | 하드웨어, 모바일, api/sdk |
| [Sequence](https://sequence.app/auth) | 비수탁(논커스터디알) | 스마트 계약 | 없음 | 인터페이스 | 없음 |   |   | 브라우저, api/sdk |
| [SimpleHold](https://simplehold.io/) | 비수탁(논커스터디알) | EOA | 예 | 없음 | 없음 |   | 예 | 모바일, api/sdk |
| [TokenPocket](https://www.tokenpocket.pro/en) | 비수탁(논커스터디알) | EOA | 없음 | 지원 | 예 | 예 | 예 | 모바일, 브라우저, api/sdk |
| [Torus](https://toruswallet.io/) | 비수탁(논커스터디알) | EOA | 예 | 지원 | 없음 | 없음 | 없음 | 브라우저, api/sdk |
| Trezor | 비수탁(논커스터디알) | EOA | 없음 | 지원 | 없음 |   |   | 하드웨어, 모바일 |
| [트러스트 지갑](https://trustwallet.com/) | 비수탁(논커스터디알) | EOA | 없음 | 지원 | 예 |   | 예 | 모바일 |
| [Unstoppable](https://unstoppable.money/) | 비수탁(논커스터디알) | EOA | 없음 | 예 | 예 |   | 없음 | 모바일, api/sdk |
| [Venly](https://www.venly.io/) | 하이브리드 | 스마트 계약 | 없음 | 인터페이스 | 없음 |   |   | 브라우저, api/sdk |
| [Wirex](https://wirexapp.com/en/wirex-wallet)* | 비수탁(논커스터디알) | EOA | 예 | 없음 | 없음 |   |   | 모바일 |
| [XDeFi](https://www.xdefi.io/) | 비수탁(논커스터디알) | EOA | 없음 | 인터페이스 | 없음 | 없음 | 없음 | 브라우저 |
| [Zerion](https://zerion.io/) | 비수탁(논커스터디알) | EOA | 없음 | 예 | 예 | 예 |   | 모바일, 브라우저 |

:::caution 비 네이티브 지갑 지원

위의 테이블에서 *로 표시되는 지갑은 지갑 소프트웨어로 지원하지 않습니다. Polygon 네트워크를 추가하기 위한 수동 단계가 필요합니다.

:::

## 키 관리 전략 {#key-management-strategy}

다음 기본 단계는 Polygon과 클라이언트 사이드 애플리케이션을 통합하는 것을 허용합니다.

1. **웹3을 설정하기 위해** [웹3.js는](https://web3js.readthedocs.io/) 자바스크립트 라이브러리입니다. 클라이언트 사이드 애플리케이션을 통해 블록체인에 대해 이야기할 수 있습니다. 우리는 web3.js를 구성하여 통신할 수 있습니다. 메타마스크와 같은 개발자 기반 지갑을 통해 [web3.js 문서](https://web3js.readthedocs.io/en/v1.2.2/getting-started.html#adding-web3-js)를 참조하여 프로젝트에 `web3.js`를 추가하는 방법에 대해 알아보십시오.
2. **계정을 설정하기 **: 트랜잭션을 보낼 수 있습니다. (특히 텍스트를 변경하는 경우) 블록체인의 상태).
3. **Instantiate 계약**: 웹3 객체가 도착하면 다음 배포된 계약을 할때, 어떤 면에서 우리는 상호 작용합니다.
4. **호출 기능**: 계약 객체를 통해 계약의 기능을 통해 Fetch 데이터.
