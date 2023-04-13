---
id: web-wallet-v2-guide
title: 웹 지갑 이용 가이드
description: 폴리곤 웹 지갑을 만드는 방법을 배워 봅시다.
keywords:
  - 지갑
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

몇 가지 훌륭한 UX 수정, 간소화된 입출금 프로세스, 우수한 입출금 추적 모듈, 상태를 제대로 볼 수 있는 애플리케이션에 대한 알림이 있는 폴리곤 웹 지갑 인터페이스를 개선했습니다.

## 폴리곤 웹 지갑에 로그인하기

폴리곤을 메타마스크에 연결하는 방법은 이 [가이드](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/)를 참조하십시오. 폴리곤 웹 지갑에 로그인하려면 다음 URL:https://wallet.polygon.technology/ 에 액세스해야 합니다. 폴리곤 웹 지갑의 테스트넷 버전에 로그인하려면, 다음 URL: https://wallet-dev.polygon.technology/ 에 액세스해야 합니다. 폴리곤을 메타마스크에 연결하는 방법은 이 [가이드](hhttps://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/)를 참조하십시오.

웹 지갑과 계정을 연결하면 이용 사례에 따라 지갑 웹으로 거래하는 방법에 대한 다양한 수단이 있는 랜딩 페이지로 이동합니다. 우리는 네트워크를 통한 출금 및 입금을 위해 폴리곤 네트워크인 Polygon Bridge에서 자산을 전송, 수신 및 저장하는 데 완벽한 폴리곤 지갑이 있습니다. 폴리곤 스테이킹 - $MATIC 및 위젯 대시보드로 스테이킹하고 보상을 받을 수 있는 곳입니다.

<img src={useBaseUrl("img/wallet/wallet-landing-page.png")} width="100%" height="100%" />

폴리곤 지갑 또는 폴리곤 브리지를 클릭하면 브리지(PoS 및 Plasma)를 가로질러 폴리곤 지갑에 있는 모든 토큰 잔액을 볼 수 있습니다. V1에서 사용할 수 있었던 브리지 간에 전환하는 것은 필요가 없습니다.<!-- <img src={useBaseUrl("img/wallet/wallet-one.png")} width="100%" height="100%" /> -->## 이더리움에서 폴리곤으로 자금 입금하기

'Move Funds to Polygon Mainnet' 버튼을 클릭하거나 'Your tokens on Polygon Mainnet' 섹션에 있는 어떤 토큰 유형에서도 'Deposit' 링크를 클릭할 수 있습니다.<img src={useBaseUrl("img/wallet/Wallet-two.png")} width="100%" height="100%" />

입금 수량을 입력해야 하는 브리지 페이지로 되돌아 갑니다. <img src={useBaseUrl("img/wallet/Wallet-13.png")} width="100%" height="100%" />

“Transfer Mode”에서 선택한 브리지 유형을 확인할 수 있습니다. 특정 브리지 유형(PoS 또는 Plasma)에 자금을 예치하려면 “Transfer Mode"를 변경할 수 있습니다.
> 선택한 토큰에 따라 전송 모드가 활성화됩니다.

입금할 수량을 추가하고 브리지 유형을 선택한 후 "Transfer" 버튼을 클릭할 수 있습니다.

"Transfer" 버튼을 클릭한 후 "Important(입금 면책 조항)" 팝업에서 "Continue" 버튼을 클릭해야 합니다.

<img src={useBaseUrl("img/wallet/Wallet-5.png")} width="50%" height="50%" />

“Important” 팝업에서 "Continue"를 클릭하면 트랜잭션에 필요한 총 가스 추정 정보와 함께 "Transfer Overview" 팝업이 표시됩니다.

<img src={useBaseUrl("img/wallet/Wallet-6.png")} width="50%" height="50%" />

"Transfer" 팝업에서 "Continue" 버튼을 클릭하면 이전과 유사한 거래 세부 정보를 검토할 수 있는 팝업이 열립니다.

<img src={useBaseUrl("img/wallet/Wallet-7.png")} width="50%" height="50%" />

"Confirm Transfer" 팝업에서 "Continue" 버튼을 클릭합니다.

"Continue" 버튼을 클릭한 후 트랜잭션이 성공하려면 메타마스크의 모든 트랜잭션을 확인해야 합니다.

거래를 확인하면, 입금 상태를 보여주는 "Transfer in Progress" 팝업이 표시됩니다. 토큰이 폴리곤에 표시되는 데 ~7-8분이 소요됩니다.

<img src={useBaseUrl("img/wallet/Wallet-8.png")} width="50%" height="50%" />

"Transfer in Progress" 팝업을 닫고 헤더 구성 요소의 "Action required" 섹션에서 트랜잭션을 볼 수 있습니다. 헤더에서 “Action Required" 링크를 클릭하십시오.

트랜잭션 자체에 대한 세부 정보를 볼 수 있습니다. 최신 트랜잭션을 클릭하면 "Transfer in Progress" 팝업이 표시됩니다. 입금 트랜잭션 상태가 성공하면 거래 상태가 "Success"으로 변경됩니다.
> 참고: 팝업에서 "Transfer in Progress/Action required" 트랜잭션 이후에 성공한 트랜잭션을 볼 수 있습니다.
> 참고: "Action Required" 팝업에서 "Transfer in Progress/Action required" 트랜잭션 이후에 성공한 트랜잭션을 볼 수 있습니다. 입금 성공 트랜잭션을 클릭하면 "Transfer Completed" 팝업이 표시됩니다.

<img src={useBaseUrl("img/wallet/Wallet-11.png")} width="50%" height="50%" />

예금에 대한 자습서는 다음 비디오를 시청하십시오:

<video loop autoplay width="70%" height="70%" controls="true">
  <source type="video/mp4" src="/img/wallet/depositMatic.mp4"></source>
  <p>귀하의 브라우저는 비디오 요소를 지원하지 않습니다.</p>
</video>

## PoS 브리지에서 폴리곤으로부터 이더리움으로 자금인출하기

다음을 통해 폴리곤에서 이더리움 메인넷으로 자금을 인출합니다.

PoS Bridge는 간단한 2단계 프로세스입니다. 자금을 이더리움에서 다시 사용할 수 있으려면 ~3시간이 걸립니다.

자금을 인출하려면 ‘Your tokens on Polygon Mainnet' 섹션에 있는 어떤 PoS 토큰에서도 'Withdraw' 링크를 클릭하십시오.

<img src={useBaseUrl("img/wallet/wallet-withdraw.png")} width="100%" height="100%" />

출금 수량을 입력해야 하는 브리지 페이지로 전환됩니다.

<img src={useBaseUrl("img/wallet/Wallet-13.png")} width="100%" height="100%" />
> 참고: 선택한 토큰에 따라 전송 모드(Transfer mode)가 활성화됩니다.

출금하려는 수량을 추가하고 브리지 유형을 선택한 후 "Transfer" 버튼을 클릭할 수 있습니다.

"Transfer" 버튼을 클릭한 후 "Important(출금 면책조항)" 팝업에서 "Continue" 버튼을 클릭해야 합니다.

<img src={useBaseUrl("img/wallet/Wallet-14.png")} width="50%" height="50%" />

“Important” 팝업에서 “continue”을 클릭하면 트랜잭션에 필요한 총 가스의 추정 정보와 함께 “Transfer Overview” 팝업이 표시됩니다.

<img src={useBaseUrl("img/wallet/Wallet-15.png")} width="50%" height="50%" />

“Transfer Overview” 팝업에서 “Continue” 버튼을 클릭하면 이전과 유사한 트랜잭션 세부사항을 검토할 수 있는 팝업이 열립니다.

<img src={useBaseUrl("img/wallet/Wallet-16.png")}  width="50%" height="50%" />

“Confirm Transfer" 팝업에서 "Continue" 버튼을 클릭합니다. "Continue" 버튼을 클릭한 후 트랜잭션이 성공하려면 메타마스크에서 트랜잭션을 확인해야 합니다. 트랜잭션이 승인되면 화면에 다음과 같은 팝업이 표시됩니다,

<img src={useBaseUrl("img/wallet/Wallet-17.png")} width="50%" height="50%" />

첫 번째 트랜잭션은 출금을 시작하는 것입니다. "Transfer in Progress" 팝업을 닫을 수 있습니다. 그리고 헤더 컴포넌트의 "Action required" 섹션에서 트랜잭션을 볼 수 있습니다. 헤더에서 "Action Required" 링크를 클릭하십시오.

트랜잭션 자체에 대한 세부 정보를 볼 수 있습니다. 체크포인트가 도착할 때까지 기다려야 합니다. 완료하는 데 최대 3시간이 소요될 수 있습니다. 체크포인트가 도착하면 상태를 "Action Required"로 변경해야 합니다. 출금을 시작한 최근 트랜잭션을 클릭하면 "Transfer in Progress" 팝업이 표시됩니다.

<img src={useBaseUrl("img/wallet/Wallet-19.png")} width="50%" height="50%" />

두 번째 트랜잭션을 확인해야 합니다. 두 번째 트랜잭션을 확인하면 이더리움에서 자금을 다시 받게 됩니다.
> 참고: "Action Required" 팝업에서 "Transfer in Progress/Action required" 트랜잭션 이후에 성공한 트랜잭션을 볼 수 있습니다.

인출에 대한 자습서는 다음 비디오를 보십시오:

<video loop autoplay width="70%" height="70%" controls="true">
  <source type="video/mp4" src="/img/wallet/WithdrawMatic.mp4"></source>
  <p>귀하의 브라우저는 비디오 요소를 지원하지 않습니다.</p>
</video>

## 플라즈마 브리지에서 폴리곤으로부터 이더리움으로 자금 인출하기

Plasma Bridge를 통해 폴리곤에서 이더리움 메인넷으로 자금을 인출하는 것은 3단계의 프로세스이지만 주의 사항이 있습니다.

자금을 인출하려면 'Your tokens on Polygon Mainnet' 섹션에 있는 어떠한 플라즈마 토큰 유형에서도 'Withdraw' 링크를 클릭하십시오.

<img src={useBaseUrl("img/wallet/wallet-withdraw.png")} width="100%" height="100%" />

출금 수량을 입력해야 하는 브릿지 페이지로 전환됩니다.

<img src={useBaseUrl("img/wallet/Wallet-33.png")} width="100%" height="100%" />

출금할 수량을 추가한 후 "전송" 버튼을 클릭할 수 있습니다. "전송" 버튼을 클릭한 후 "중요(면책 인출)" 팝업에서 "계속" 버튼을 클릭해야 합니다.

<img src={useBaseUrl("img/wallet/Wallet-24.png")} width="50%" height="50%" />

"Important" 팝업에서 "Continue"를 클릭하면 트랜잭션에 필요한 총 가스 예상 정보와 함께 "Transfer Overview" 팝업이 표시됩니다.

<img src={useBaseUrl("img/wallet/Wallet-25.png")} width="50%" height="50%" />

"Transfer Overview" 팝업에서 "Continue" 버튼을 클릭하면 이전과 유사한 트랜잭션 세부 정보를 검토할 수 있는 팝업이 열립니다.

<img src={useBaseUrl("img/wallet/Wallet-26.png")} width="50%" height="50%" />

"Confirm Transfer" 팝업에서 "Continue" 버튼을 클릭합니다.

"Continue" 버튼을 클릭한 후 트랜잭션이 성공하려면 메타버스 지갑의 모든 트랜잭션을 확인해야 합니다. 이것은 완료해야 하는 3개의 트랜잭션 중 첫 번째 트랜잭션이 될 것입니다. 트랜잭션이 승인되면 화면에 다음과 같은 팝업이 표시됩니다.<!-- <img src={useBaseUrl("img/wallet/Wallet-27.png")} width="50%" height="50%" /> -->첫 번째 트랜잭션은 출금을 시작하는 것입니다. 출금 트랜잭션이 시작되면 체크포인트가 도착할 때까지 기다려야 합니다. 완료하는 데 최대 3시간이 소요될 수 있습니다. "Transfer in Progress" 팝업을 닫을 수 있습니다. 그리고 헤더 컴포넌트의 "Action required" 섹션에서 트랜잭션을 볼 수 있습니다. 헤더에서 " Action Required" 링크를 클릭하십시오.

트랜잭션 자체에 대한 세부 정보를 볼 수 있습니다. 체크포인트가 도착하면 상태를 " Action Required"로 변경해야 합니다. 출금을 시작한 최근 트랜잭션을 클릭하면 "Transfer in Progress" 팝업이 표시됩니다.<!-- <img src={useBaseUrl("img/wallet/Wallet-29.png")} width="50%" height="50%" /> -->자금을 이더리움으로 되돌리려면 마지막으로 한 번 확인해야 합니다. 이러한 모든 트랜잭션을 확인하면 이더리움으로 자금을 다시 받게 됩니다.<!-- <img src={useBaseUrl("img/wallet/Wallet-31.png")} width="50%" height="50%" /> -->> 참고: "Action Required" 팝업에서 "Transfer in Progress/Action required" 트랜잭션 이후에 성공한 트랜잭션을 볼 수 있습니다.
> 참고: 질문이 있는 경우, 다음 링크에 언제든지 티켓을 제출하십시오. https://support.polygon.technology/support/home

