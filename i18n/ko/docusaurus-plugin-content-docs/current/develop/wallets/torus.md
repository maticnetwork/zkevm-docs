---
id: torus
title: Torus
description: Torus는 dApp의 비 커스터디션 키 관리 시스템입니다.
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus는 분산 앱의 사용자 친화적이고 안전하며 비 커스터디션 키 관리 시스템입니다. 우리는 메인스트림 사용자를 탈중앙화 생태계의 길로 안내하는 데 주력하고 있습니다.

**유형**: 비 커스터디칼 / HD<br/> **개인 키 저장소 **: Torus 서버에 암호화되어 저장된 사용자의 로컬 브라우저 스토리지 / 암호화 및 저장됨.<br/> **이더리움 원장과의 통신**: Infura <br/>
**개인 키 인코딩**: Mnemonic / SocialAuth-login:<br/>

애플리케이션 니즈에 따라 Torus Wallet을 통해 Torus를 통합하거나 Auth를 통해 Torus 네트워크와 직접 상호 작용하여 Torus 네트워크에 연결할 수 있습니다. 자세한 내용은 [Torus 문서를](https://docs.tor.us/) 참조하십시오.

## Torus Wallet 통합 {#torus-wallet-integration}

신청서가 메타마스크 또는 다른 웹3 제공자와 이미 호환되면 Torus Walleet를 통합하여 공급자가 동일한 웹3 인터페이스를 감싸 놓을 수 있습니다. npm 패키지를 통해 설치할 수 있습니다. 더 많은 방법과 심층적 인 정보를 보려면 [지갑 통합에](https://docs.tor.us/wallet/get-started) 대한 공식 Torus 문서를 방문하십시오.

### 설치 {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### 예시 {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## 사용자 Auth 통합 {#customauth-integration}

로그인에서 모든 상호 작용에 이르기까지 자체 UX를 제어하기 위해 원한다면 사용자 Auth를 사용할 수 있습니다. 사용자가 구축하고 있는 플랫폼에 따라 SDK를 통해 통합 할 수 있습니다. 더 자세한 정보는 [Torus CustomAuth 통합을](https://docs.tor.us/customauth/get-started) 방문하십시오.
