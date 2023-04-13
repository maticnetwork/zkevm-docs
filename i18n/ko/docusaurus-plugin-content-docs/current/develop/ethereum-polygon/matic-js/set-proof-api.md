---
id: set-proof-api
title: ProofApi 설정
keywords:
    - setProofApi
    - polygon
    - sdk
description: 증명 API을 구성하세요.
---

matic.js에서 일부 기능은 용어 더 빨리 가득 차 있습니다. 이름이 제안했듯이 더 빠른 상대방에 비해 더 빨리 결과를 생성합니다. 그들은 Pro Generation API를 누구에서 호스팅할 수 있는 백엔드로 활용하여 그렇게합니다.

[https://apis/matic.network는](https://apis/matic.network) Polygon이 호스팅하는 공개적으로 사용할 수 있는 Pro 생성 API입니다.

이 `setProofApi`방법은 Pro Generation API의 URL을 matic.js 예시에 설정하는 데 도움이 될 수 있습니다.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

자체 호스팅의 Pro Generation API 서비스를 활용하여 공개적으로 호스팅된 하나에 비해 더 나은 성능을 제공합니다.

https://github.com/maticnetwork/proprovectation-scription-api에서 제공되는 설치 지침을 따르십시오.

예를 들어 증명 API를 배포했고 기본 URL이 `https://abc.com/`이면, `setProofApi`에서 기본 URL을 설정해야 합니다.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
일부 API가 생성되는 경우, 특히 증거가 생성되는 경우 많은 RPC 호출을 만들고 공공 RPC를 사용하면 매우 느린 API를 사용하면 빠른 API를 권장합니다.
:::
