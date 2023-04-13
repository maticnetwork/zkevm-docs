---
id: submit-mapping-request
title: 매핑 토큰
description:  PoS 브리지를 사용하여 이더리움과 Polygon 체인(Eygon)을 매핑하는 방법에 대한 가이드
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

자산을 이더리움 및 Polygon PoS로 이전하기 위해 매핑이 필요합니다. Polygon은 이를 위해 두 개의 브리지를 제공합니다. 다리에 대한 자세한 내용은 [여기에서](/develop/ethereum-polygon/getting-started.md) 이해할 수 있습니다.

:::tip

Polygon PoS 브리지는 Polygon 메인넷과 Mumbai 테스트넷을 모두 사용할 수 있습니다.

:::

## 매핑 요청을 제출하는 단계 {#steps-to-submit-a-mapping-request}

이더리움과 Polygon Pox 사이에 토큰을 매핑하려면 Polygon [Token](https://mapper.polygon.technology/) Mapper를 사용할 수 있습니다. 링크를 열고 오른쪽 상단에 **맵 New Token** 버튼을 클릭하여 새로운 매핑 요청을 시작합니다.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**1단계 →** 토큰을 매핑하려는 네트워크를 선택하십시오. 테스트넷을 위해 **Goerli-Mumbai와** 메인넷의 **Eygamy가** Polygon PoS를 선택할 수 있습니다.

**2단계 →** 매핑 - **ERC20**, **ERC721** 또는 **ERC1155를** 매핑하는 토큰의 유형을 선택하십시오.

**3단계 →** **이더리움 토큰 주소를 이더리움 토큰 주소****** 필드에 입력하십시오. **이더리움 / Goerli** blockchain 탐험기에서 토큰을 확인했는지 확인하십시오.

**4단계 →** **이더리움 토큰 주소를** 추가하면 해당 필드 viz. **Token 이름, Token 기호, Token Decimal을** 추가하면 계약 세부 정보가 자동으로 채워집니다.

**5→** 지금 을 클릭하면 **시작 매핑** 프로세스를 시작하십시오. 이더리움 트랜잭션을 포함하면 지갑을 연결하여 진행할 지갑을 연결할 필요가 있습니다.

**6단계 →** Xtoken 정보와 예상 가스 수수료로 리뷰 모뎀을 사용하여 매핑을 완료하십시오. 세부 사항을 확인하고 **Pay Gas Fee 를 맵** 버튼을 선택함으로써 매핑 트랜잭션을 시작하십시오.

지갑에서 트랜잭션을 확인한 후, 이더리움에서 트랜잭션을 확인한 후 트랜잭션을 기다려야 합니다. 거래가 완료되면 Polygon PoS 네트워크에서 어린이 토큰 주소와 함께 성공 모뎀을 표시합니다. Polygonscan에서 생성된 아동 토큰 주소를 확인하여 맵을 계속 확인할 수 [있습니다](https://polygonscan.com/).

성공적인 메인넷 매핑의 [경우](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) Polygon [**목록에**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json) 추가될 토큰 세부 정보를 제공할 수 있습니다.

:::tip

[<ins>사용자 정의 토큰</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-) 매핑의 경우 [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) 문서를 방문하고 사용자 정의 FX 구현을 생성하여 토큰을 매핑하는 정보를 사용할 수 있습니다.

:::

## 비디오 가이드 {#video-guide}

**다음은 이더리움 Goerli 파운드가 Polygon Mumbai 테스트넷** 사이에 토큰을 매핑하는 방법에 대한 빠른 비디오 자습서입니다.

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>사용하는 브라우저가 비디오 요소를 지원하지 않습니다.</p>
</video>
