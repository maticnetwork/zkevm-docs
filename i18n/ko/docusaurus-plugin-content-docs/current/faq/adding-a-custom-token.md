---
id: adding-a-custom-token
title: 사용자 정의 토큰(Custom Token) 추가
sidebar_label: Adding a Custom Token
description: Polygon에서 차세대 블록체인 앱을 구축하세요.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

**사용자 정의 토큰 추가하기** 기능을 통해 사용자는 토큰을 명시적으로 추가할 수 있으며 Polygon 지갑 제품군에서 사용할 수 있습니다. 사용자는 루트 또는 차일드 중 계약 주소에 따라 토큰을 검색하기만 하면 됩니다.

* **루트**는 이더리움에 대한 토큰 계약입니다
* **차일드**는 Polygon에 대한 계약입니다

### 토큰 계약은 어떻게 확인할 수 있습니까? {#how-do-i-find-the-token-contract}

  [Coingecko](http://coingecko.com) 또는 [Coinmarketcap](https://coinmarketcap.com/)에서 토큰의 이름으로 토큰을 검색할 수 있으며, Etherium 체인 (ERC 20 토큰의 경우) 및 Polygon과 같은 기타 지원되는 후속 체인에서 해당 주소를 볼 수 있습니다. 다른 체인의 토큰 주소는 업데이트되지 않을 수 있지만, 루트 주소는 어떤 용도로든 사용할 수 있습니다.

따라서 토큰을 선택할 때, 다음을 통해 검색할 수 있습니다.
* 토큰 기호
* 토큰 이름
* 계약

작동 원리는 다음과 같습니다.

1. 사용자 정의 토큰으로 계약 주소를 추가하여 사용자의 목록에 모든 토큰을 간편하게 추가합니다(Polygon은

Polygon 또는 이더리움 모두에 대한 계약 주소를 지원합니다).

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. 토큰 정보를 불러오면, 모든 토큰 정보와 함께 확인 화면이 표시됩니다. 이후 사용자의 시스템에 로컬로 저장될 사용자 정의 토큰으로 해당 토큰을 추가할 수 있습니다. 복제 또는 사기 토큰이 매우 많기 때문에 토큰 계약을 다시 한 번 검증하실 것을 권장합니다.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. 이제 토큰을 선택할 때 추가된 토큰이 표시됩니다.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

**또한 관리** 화면의 토큰을 직접 추가할 수 있습니다.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>