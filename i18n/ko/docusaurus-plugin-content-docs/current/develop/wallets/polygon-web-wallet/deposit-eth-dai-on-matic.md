---
id: deposit-eth-dai-on-polygon
title: 폴리곤에서 ETH/DAI를 어떻게 입금하는가?
description: 폴리곤에서 다음 블록체인 앱을 설치합니다.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

이 자습서는 [https://matic.opensea.io/](http://matic.opensea.io)에서 자금을 조달하는 가장 쉬운 방법을 설명하므로 번거로움 없이 NFT 구매를 시작할 수 있습니다. [https://matic.opensea.io/](http://matic.opensea.io)에서 트랜잭션에 참여하려면 자금이 필요합니다. 현재 플랫폼에서 지원되는 NFT 카테고리의 NFT 토큰 잔액이 있는 경우 판매 주문을 할 수 있습니다. NFT를 구매하려면 Matic 네트워크에 충분한 DAI/WETH 잔액이 있어야 합니다. 현재 [https://matic.opensea.io/](http://matic.opensea.io)에서 지원되는 ERC20 토큰은 2개뿐입니다.

L2를 처음 접하는 사람들에게는 폴리곤이 확장성을 향상시키기 위해 구축된 이더리움의 사이드체인이라는 것을 이해하는 것이 중요합니다. 폴리곤에서 트랜잭션을 수행하기 위한 트랜잭션 확인 시간과 수수료는 이더리움보다 훨씬 적습니다. 이 때문에 자금이 이더리움에 이미 존재하는 경우 Polygon이 제공하는 PoS 브리지를 사용하여 이를 폴리곤으로 가져와야 합니다.

폴리곤 체인에서 이러한 토큰을 얻는 것은 다양한 방법으로 수행할 수 있습니다.

<img src={useBaseUrl("img/nft-marketplace/get-funds.png")} />

1. **wallet.polygon.technology의 PoS 브리지를 사용하여 이더리움에서 폴리곤으로 ETH/DAI를 입금하기**

  ETH/DAI 잔액이 충분한 계정으로 [https://wallet.polygon.technology/](https://wallet.polygon.technology/)에 로그인할 수 있습니다. ETH를 입금하면 폴리곤 체인에서 WETH를 받게 됩니다. Matic 체인의 pos-WETH 호출이며 컨트랙트 주소가 `0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619`입니다. 마찬가지로 pos-DAI의 경우 컨트랙트 주소는 `0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063`입니다.

<img src={useBaseUrl("img/nft-marketplace/wallet-dashboard.png")} />

[https://wallet.polygon.technology/](https://wallet.polygon.technology/)에 방문하면 지갑 대시보드가 이렇게 보입니다.

입금하려는 토큰 옆에 있는 입금 버튼을 클릭하면 다음 페이지로 이동합니다.

**ETH 입금하기**

<img src={useBaseUrl("img/nft-marketplace/deposit-eth.png")} />

**DAI 입금하기**

<img src={useBaseUrl("img/nft-marketplace/deposit-dai.png")} />

이더리움에 ETH/DAI의 잔고가 충분하다면 입금할 수 있어야 합니다. 입금에 대한 자세한 내용을 보려면 이 가이드를 따르는 것이 좋습니다.

[https://blog.matic.network/deposits-and-withdrawals-on-pos-bridge/](https://blog.matic.network/deposits-and-withdrawals-on-pos-bridge/)

   **"ETH/DAI를 입금할 때 PoS 브리지를 사용하는지 확인하십시오."**

[matic.opensea.io](http://matic.opensea.io)는 DAI/ETH의 pos 버전만 지원하기 때문에 이를 따르는 것이 매우 중요합니다. 플라즈마 브리지를 사용하여 ETH/DAI를 예치하면 plasma-WETH 및 plasma-DAI가 귀하의 계정에 예치되며 matic.opensea.io에서 트랜잭션에 사용할 수 없습니다. 입금 절차가 완료되면 입금이 완료되기까지 약 7-8분이 소요됩니다. 탐색 바의 오른쪽에서 볼 수 있는 활동 헤더 구성 요소에서 입금의 실시간 상태를 추적할 수 있어야 합니다. 입금이 완료되면 아래와 같이 지갑 대시보드와 matic.opensea.io의 “My Account" 섹션에서 업데이트된 잔액을 확인할 수 있습니다.

<img src={useBaseUrl("img/nft-marketplace/balance.png")} />

2. **Transak에서 폴리곤으로 자금을 직접 받기.**

이것은 Transak에서 토큰을 구매하기 위해 방문해야 하는 URL입니다. [https://global.transak.com/](https://global.transak.com/)

네트워크를 폴리곤으로 선택한 다음 토큰 목록에서 DAI/WETH를 선택한 다음 Transak 애플리케이션의 단계를 진행할 수 있습니다.

3. **폴리곤의 다른 계정에서 자금을 받기**

폴리곤의 다른 주소에 이 토큰의 잔액이 충분하면 해당 주소에서 현재 matic.opensea.io에 로그인한 주소로 이 토큰을 전송할 수 있습니다.
