---
id: connext
title: Connext를 사용한 크로스체인 전송
description: Polygon에서 다음 블록체인 앱을 구축하십시오.
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connext는 evm 호환 체인과 이더리움 L2 시스템 사이에서 빠르고 완전한 비수탁 스왑을 지원하는 크로스체인 유동성 네트워크입니다.

이더리움이 멀티체인의 세계로 이동하고 있습니다. evm 호환 체인과 L2의 채택이 증가함에 따라 생태계 내 유동성 파편화와 관련하여 새로운 과제가 등장했습니다. Connext는 사용자에게 중요한 신뢰 관련 고려 사항을 새로 제기하지 않고, 각 체인의 개별 유동성 풀을 글로벌 네트워크로 연결하여 이 문제를 해결합니다. 개발자는 Connext에서 이 유동성을 활용하여 기본적으로 체인에 구애받지 않는 새로운 차원의 DApp을 구축할 수 있습니다.

상위 수준에서 Connext는 조건부 전송을 사용하여 chainA의 assetA와 chainB의 assetB를 스왑할 수 있도록 사용자를 지원합니다. 이 작업은 몇 가지 간단한 단계를 밟아 이루어집니다.

Connext의 사용자인 Alice는 조건부 전송으로 assetA를 Bob에게 보냅니다.
유동성 공급자(일명 라우터)인 Bob은 Alice에게 그에 상당하는 양의 assetB를 보냅니다.
Alice는 조건부 전송의 잠금을 해제하여 assetB를 수신하고, 뒤따라 Bob도 동일한 작업을 수행할 수 있습니다.
라우터는 네트워크의 중추를 형성하여, 다양한 체인에서 유동성을 공급하고 그에 따른 수수료를 수령합니다. 프로토콜 입문서에서 이 무신뢰 작동 방식에 대해 더 자세히 알아볼 수 있습니다.

브라우저 dApp 에서 Eythere Goerli Testnet에서 Polygon Mumbai Testnet에 대한 크로스 쉐인 전송을 설정하기 위해 이 [가이드를](https://docs.connext.network/quickstart-polygon-matic-integration) 통해 이동합니다.
