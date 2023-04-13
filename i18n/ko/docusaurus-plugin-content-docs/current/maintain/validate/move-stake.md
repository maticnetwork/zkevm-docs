---
id: move-stake
title: 스테이크 이동
description: Polygon 네트워크에서 지분을 이동하기
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## 파운데이션 노드에서 외부 노드로 스테이크 이동 {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>브라우저에서 비디오 요소를 지원하지 않습니다.</p>
</video>

이제 유효성 검사자들에게 스테이킹 UI에서 스테이크 이동 기능을 사용하여 자신의 스테이크를 파운데이션 노드에서 원하는 외부 노드로 이동할 수 있는 옵션이 제공됩니다.

파운데이션 노드에서 외부 노드로 스테이크를 이동하는 것은 단일 트랜잭션입니다. 따라서 이 이벤트 중에 지연되거나 언본딩되는 기간이 없습니다.

스테이크 이동은 파운데이션 노드에서 외부 노드로만 허용됩니다. 외부 노드에서 다른 외부 노드로 스테이크를 이동하려면 먼저 연결을 해제한 다음 새 외부 노드에서 위임해야 합니다.

또한 스테이크 이동 기능은 Polygon 팀이 파운데이션 노드에서 외부로 자금을 원활하게 전환하기 위해 개발한 임시 기능입니다. 그리고 파운데이션 노드가 꺼질 때까지만 활성 상태를 유지합니다.

## 스테이크 이동 방법 {#how-to-move-stake}

지분을 이동하기 위해서는 먼저 대표자 주소를 사용하여 [스테이킹](https://wallet.polygon.technology/staking) UI에 로그인해야 합니다.

**대표자 주소** : 재단 Nodes에서 스테이킹에 이미 사용한 주소.

일단 로그인하면 검사기 목록을 볼 수 있습니다.

<img src={useBaseUrl("img/staking/validator-list.png")} />

이제 **쇼 대표자 세부** 버튼 또는 왼쪽에 있는 **내** 대표자 세부 정보 옵션을 클릭하여 대표자 프로필에 이동합니다.

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

여기에서 **Move** Stake라는 새로운 버튼을 찾을 수 있습니다.

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

해당 버튼을 클릭하면 위임할 수 있는 유효성 검사자 목록이 있는 페이지로 이동합니다. 이 목록에 있는 모든 유효성 검사자에게 위임할 수 있습니다.

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

이제 위임하고 싶은 유효자를 선택한 후 **여기를 누르면 대표단을** 클릭하십시오. 이 버튼을 클릭하면 팝업 창이 열립니다.

<img src={useBaseUrl("img/staking/stake-funds.png")} />

여기에서 해당 필드 **필드를** 볼 수 있습니다. 일부 금액을 사용하여 유효성 검사자에게 위임할 수도 있습니다.

예를 들면, 100개의 매틱 토큰을 파운데이션 노드 1에 위임하고 이제 스테이크를 파운데이션 노드에서 외부 노드로 옮기고자 하면 외부 노드를 선택하여 일부 금액 (예를 들어 50개의 매틱 토큰)을 위임할 수 있습니다. 나머지 50개의 매틱 토큰은 파운데이션 노드 1에 남습니다. 그런 다음 나머지 50개의 토큰을 다른 외부 노드 또는 동일한 외부 노드에 위임하도록 선택할 수 있습니다.

일단 해당 금액에 입력되면 **스테이크 펀드** 버튼을 클릭하십시오. 그러면 메타 마스크에 주소 서명에 대한 확인을 요청합니다.

트랜잭션에 서명하면 지분이 파운데이션 노드에서 외부 노드로 성공적으로 이동됩니다. 그러나 스테이킹 UI에 반영되기 위해서는 12블록 확인을 기다려야 합니다. 12블록 확인 후에도 이동한 자금이 나타나지 않으면 페이지를 한 번 새로 고쳐 업데이트된 스테이크를 확인하세요.

문의 사항이 있거나 문제가 있으면 [여기](https://support.polygon.technology/support/home)로 티켓을 제출하시면 됩니다.
