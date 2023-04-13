---
id: fortmatic
title: Fortmatic
description: Formatic SDK를 사용하여 dApp 와 Polygon을 통합합니다.
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK는 이미 웹3에 통합된 dApp 또는 처음부터 시작되었든 상관없이 이더리움 블록체인과 dApp을 쉽게 통합 할 수 있습니다. Fortmatic은 귀하와 귀하의 분산 응용 프로그램 사용자에게 부드럽고 즐거운 경험을 제공합니다.

## 설치 {#installation}

Fortmatic의 지갑 최신 버전을 설치하기 위해 다음 명령을 사용하십시오.

```bash
$ npm i --save fortmatic@latest
```

## 예시 {#example}
Fortmatic을 사용하여 애플리케이션의 예를 들어 보겠습니다.

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
