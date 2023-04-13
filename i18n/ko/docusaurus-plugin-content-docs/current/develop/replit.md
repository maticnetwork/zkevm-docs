---
id: replit
title: Replit을 사용하여 스마트 계약 배포하기
sidebar_label: Using Replit
description: Polygon에서 Replitide를 사용하여 스마트 계약 배포하기
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## 개요 {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide)은 코드를 작성하고 앱을 호스팅할 수 있는 코딩 플랫폼입니다. Replit은 [Solidity 프로그래밍 언어](https://replit.com/@replit/Solidity-starter-beta?v=1)를 지원하므로 웹3 개발자들이 스마트 계약을 생성하고 배포하는 데 필요한 모든 기능을 제공합니다.

이 기사는 [Rexit](https://replit.com/signup) IDE를 사용하여 Polygon에서 [Solidity](https://replit.com/@replit/Solidity-starter-beta?v=1) 스마트 계약을 구축하고 배포할 수 있도록 안내합니다.

## 실습할 내용 {#what-you-will-do}

- Replit 계정 만들기
- Repl 환경 생성하기
- Polygon Mumbai 네트워크에 샘플 프로젝트 배포하기
- 계약 검증하기
- 개인 Replit 프로필에 프로젝트 게시하기

:::tip

Replit과 함께 Solidity에 대한 추가 예를 보려면 <ins>**[Replit을 통해 시작되거나 Replit](https://blog.replit.com/solidity)**</ins> <ins>**[Solidity document 및 Escrow 계약](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins> 튜토리얼에서 확인할 수 있습니다.
:::

## 기본 요건 {#prerequisites}

Replit을 사용하여 Polygon에서 Solidity 스마트 계약을 배포하기 위해 지역 환경 설정이 필요하지 않습니다.

Polygon 뭄바이 테스트넷 및 배포된 계약과 상호 작용하기 위해 브라우저 기반 웹3 지갑이 필요합니다. 이미 메타 마스크를 사용하고 있다면 Replit 테스트를 위해 새로운 계정을 생성하는 것을 권장합니다. 계정 메뉴를 통해 이 작업을 수행할 수 있습니다. 이 메뉴는 메타 마스크 인터페이스의 오른쪽 상단에 있는 계정 아바타를 클릭할 때 나타납니다.

Polygon에서 Solidity 스마트 계약을 배포하려면 다음 기본 요건을 모두 충족해야 합니다.

1. [Replit 계정 만들기](https://replit.com/signup)
2. [메타 마스크 지갑 다운로드하기](/docs/develop/metamask/hello)
3. [메타 마스크에서 Polygon 구성하기](/docs/develop/metamask/config-polygon-on-metamask)
4. [테스트넷 토큰 받기](https://faucet.polygon.technology)

## Repl로 작업하기 {#working-with-a-repl}

생성하는 모든 Repl은 완전한 기능을 갖춘 개발 및 프로덕션 환경입니다. 다음 단계를 따라 Solidity 스타터 Replit을 생성하십시오.

1. [로그인](https://replit.com/login)하거나 [계정을 만드십시오](https://replit.com/signup). [Replit 계정을](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) 작성한 후, 홈 화면에는 대쉬보드가 포함되어 있습니다.

![img](/img/replit/dashboard.png)

2. 일단 로그인하면 왼쪽 **패널** 또는 **상단** 모서리에 +를 선택하세요.

![img](/img/replit/solidity.png)

3. [**Solidity 스타터(베타 )**](https://replit.com/@replit/Solidity-starter-beta?v=1) 템플릿을 선택하고 프로젝트에 제목을 제공합니다.

4. 프로젝트를 생성하기 위해 **+ Create** Repl을 클릭하십시오.

:::note

Solidity 스타터 응답은 <ins>**[웹3 이더리움 자바스크립트](https://web3js.readthedocs.io/en/v1.5.2/)**</ins> API를 사용하여 제작한 브라우저 친화적 인터페이스를 제공합니다. Replit에서 관리하는 이더리움 블록체인의 사용자 버전인 Replit의 testnet을 배포하고 테스트를 위해 최적화되어 있습니다.

:::

## Polygon에서 배포하기 {#deploy-on-polygon}

위의 **전제 조건** 목록을 따라 확인하여 스마트 계약을 배포하고 상호 작용할 준비가 되어 있는지 확인하십시오.

1. 모든 관련 패키지를 **설치하고** 계약 배포 UI를 시작합니다.

2. 메타마스크 지갑을 웹 인터페이스에 연결하고 [Mumbai](docs/develop/metamask/config-polygon-on-metamask) Testnet로 전환합니다.

![img](/img/replit/connect.png)

3. **커넥트** 지갑을 클릭하고 계정을 선택하고 **Connect를** 선택하십시오.

![img](/img/replit/deploy-list.png)

4. 드롭 다운 목록에서 배포하려는 계약을 선택하십시오. **배포판을** 클릭하십시오.

5. 확인을 요청하는 메타마스크 팝업 창을 받을 것입니다. 계약을 배포하기 위해 지갑에서 트랜잭션을 승인하십시오.

## 계약의 검증과 테스트 {#verifying-and-testing-your-contract}

계약이 배포되면 [Polyganscan으로 이동](https://mumbai.polygonscan.com/)하여 계정을 검색하고 배포한 계약을 검토하고 계정 주소를 복사합니다.

계약이 배포되면 드로플 박스 아래에 확장 가능한 상자에 표시됩니다. 상자를 확장하여 사용 가능한 모든 다양한 기능을 살펴보십시오. 이제 제공된 사용자 인터페이스를 사용하거나 인터페이스에 표시된 공유 가능 URL을 통해 계약과 상호 작용할 수 있습니다.

## Replit에 게시하기 {#publish-to-replit}

Replit을 사용하면 개인 프로필에 프로젝트를 게시할 수 있습니다. 게시하면 프로젝트가 스포트라이트 페이지에 표시되므로 다른 사람들의 탐색, 상호 작용, 복제 및 협업을 지원할 수 있습니다.

다음 단계를 따라 프로젝트를 게시하여 Replit을 요청합니다.

1. 화면 상단에서 프로젝트 제목을 선택합니다.
2. 프로젝트 이름과 설명을 완료하고 **게시를** 클릭하십시오.
