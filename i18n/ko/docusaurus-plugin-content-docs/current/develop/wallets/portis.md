---
id: portis
title: Portis
description: 사용자가 쉽게 사용할 수 있게 제작된 웹 기반 지갑입니다.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis는 사용자가 쉽게 사용할 수 있게 제작된 웹 기반 지갑입니다. DApp에 통합되어 사용자를 위해 로컬 지갑이 없는 환경을 만드는 javascript SDK를 함께 제공합니다. 또한 지갑, 트랜잭션 및 가스 수수료를 설정하는 핸들을 처리합니다.

메타 마스크처럼 비 커스터디알 지갑이므로, 사용자가 키를 제어하고 Portis는 단지 키를 안전하게 저장합니다. 그러나 메타 마스크와 달리 브라우저가 아닌 애플리케이션에 통합됩니다. 사용자의 키는 로그인 ID와 비밀번호에 연결되어 있습니다.

**유형**: 비 커스터디알/HD <br/>
**개인 키 저장소 **: Por티스 서버에 암호화된 및 저장<br/> **이더리움 원장의 커뮤니케이션 **: 개발자가 정의한<br/> **개인 키 인코딩**: 니모닉<br/>

## 웹3 설정하기 {#set-up-web3}

dApp에 Portis를 설치하십시오.

```js
npm install --save @portis/web3
```

이제 [Portis](https://dashboard.portis.io/) Dashboard를 사용하여 dApp ID를 받으려면 Poris에 등록하십시오.

가져오기 `portis`및 개체 가져오기 `web3`:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Poris Constructor는 dApp ID와 두 번째 인거를 함께 연결하고 싶은 네트워크가 됨에 따라 첫 번째 인자를 사용합니다. 이는 스트링 또는 객체일 수 있습니다.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## 계정 설정하기 {#set-up-account}

웹3 설치와 인스턴스화가 성공적으로 완료되면, 다음 작업에 의해 연결된 계정이 나타나야 합니다.

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Institation Contracts {#instantiating-contracts}

이것은 계약을 부정하는 방법입니다.

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## 호출 기능 {#calling-functions}

### 호출 `call()`함수 {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### 호출 `send()`함수 {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
