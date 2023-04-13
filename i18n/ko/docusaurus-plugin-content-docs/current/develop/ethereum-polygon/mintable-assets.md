---
id: mintable-assets
title: Polygon 발행 가능 자산
description: Fx-Portal을 가진 Polygon 네트워크에서 자산을 생성하고 있습니다.
keywords:
  - docs
  - polygon wiki
  - polygon
  - mintable assets
  - mint
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

PoS 브리지를 사용해 이더리움과 Polygon 체인 전체에서 자산을 이전할 수 있습니다. 이러한 자산에는 ERC20, ERC721, ERC1155 및 기타 많은 토큰 표준이 포함됩니다. 자산의 대부분은 이더리움 체인에 이미 존재하고 있습니다. 그러나 Polygon 체인에서 새로운 자산을 생성하고, 필요한 경우 이더리움 체인으로 다시 이동할 수 있습니다. 이것은 이더리움에서 토큰에 사용되는 많은 가스 및 시간을 절약할 수 있습니다.

Polygon 체인에서 자산을 생성하는 것은 훨씬 쉽고 권장되는 접근 방식입니다. **필요할 때 이러한 자산을 이더리움 체인으로 옮길 수 있습니다**. 이러한 유형의 자산은 **Polygon & Privacy** 자산이라고 불립니다.

Polygon Mintable 토큰의 경우 Polygon 네트워크에서 자산이 생성됩니다. Polygon에서 발행된 자산을 이더리움으로 이동해야 할 때 자산을 먼저 소각하고 소각 트랜잭션 증명을 이더리움 체인에 제출해야 합니다. Polygon 기능을 사용하는 권장 방법은 [fx-포털을](/develop/l1-l2-communication/fx-portal.md) 활용하여 제공됩니다.
