---
id: overview
title: 메타 마스크 개요
sidebar_label: Overview
description: Polygon에서 메타 마스크를 시작할 수 있는 방법
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[메타 마스크](https://metamask.io/)는 웹 브라우저 및 모바일 장치에서 이더리움 블록체인과 상호 작용하는 데 사용할 수 있는 암호화폐 지갑입니다. 메타 마스크를 사용하면 전체 이더리움 노드를 실행하지 않고도 브라우저에서 바로 이더리움 DApp(분산형 앱)을 실행할 수 있습니다.

**유형**: 비수탁/HD <br/>
**개인 키 스토리지**: 사용자의 로컬 브라우저 스토리지 <br/>
**이더리움 원장과의 통신**: Infura <br/>
**개인 키 인코딩**: 니모닉 <br/>

:::warning
**비밀 복구 Phrase를** 백업하십시오. 장치가 고장나면 데이터 부패를 잃거나 도난당하면 복구 가능한 다른 방법이 없습니다. Secret 복구 구문 단계는 메타마스크 계정을 복구하는 유일한 방법입니다. 메타마스크에 대한 더 많은 **[<ins>기본 안전 및 보안 팁을</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)** 확인하십시오.
:::

## Polygon을 위해 메타마스크 설정하기 위한 가이드 {#guide-to-set-up-metamask-for-polygon}

* [메타 마스크의 다운로드 및 설치](/develop/metamask/tutorial-metamask.md)
* [메타 마스크에 Polygon 구성하기](/develop/metamask/config-polygon-on-metamask.md)
* [사용자 정의 토큰 구성하기](/develop/metamask/custom-tokens.md)
* [계정 생성 및 가져오기](/develop/metamask/multiple-accounts.md)

### 1. 웹3 설정하기 {#1-set-up-web3}

#### 1단계 {#step-1}

DApp에 다음을 설치합니다.

  ```javascript
  npm install --save web3
  ```

새 파일을 만들고 이름을 `web3.js`로 지정한 후 다음 코드를 삽입합니다.

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

위의 파일은 `getWeb3()`라는 함수를 내보냅니다. 그 목적은 메타 마스크에 의해 주입된 글로벌 객체(`ethereum` 또는 `web3`)의 감지를 통해 메타 마스크 계정의 액세스를 요청하는 것입니다.

[메타 마스크의 API 문서](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes)에 따르면 다음과 같습니다.

> 메타마스크는 윈도우.ethereum에서 사용자가 방문한 웹사이트로 글로벌 API를 선택합니다. 이 API는 웹사이트에서 사용자의 이더리움 계정을 요청하고, 사용자가 연결된 블록체인의 데이터를 읽고, 사용자가 사용자 서명 메시지 및 트랜잭션을 제안할 수 있습니다. 공급자 객체의 존재는 이더리움 사용자가 있음을 나타냅니다.

간단한 용어로, 기본적으로 브라우저에서 메타 마스크의 확장 / 추가 폰을 설치하면 글로벌 변수 정의 `ethereum`(이전 버전의 `web3`경우)를 갖게 될 수 있으며, 이 변수를 사용하면 웹3 객체를 불안정하게 만듭니다.

#### 2단계 {#step-2}

이제 클라이언트 코드로 위의 파일을 가져옵니다.

```js
  import getWeb3 from '/path/to/web3';
```

함수를 호출합니다.

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. 계정 설정하기 {#2-set-up-account}

이제 트랜잭션 (특히 블록체인의 상태를 변경하는 것)을 보내려면 해당 거래에 서명하기 위해 계정이 필요합니다. 위에 작성한 웹3 객체에서 계약 인스턴스를 표시합니다.

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

`getAccounts()` 함수는 사용자의 메타 마스크에 있는 모든 계정을 반환합니다. `accounts[0]`이 현재 사용자가 선택한 계정입니다.

### 3. 계약의 인스턴스화 {#3-instantiate-your-contracts}

일단 우리 `web3`객체가 제자리에 있으면, 계약 AI를 가지고 있고 이미 주소를 이미 가지고 있다고 가정하면 다음 계약을 할것입니다.

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. 함수 호출 {#4-call-functions}

이제 계약에서 호출하고 싶은 어떤 기능에 대해 Google에서 직접 상호 작용하면 instantid 계약 객체(2단계에서 `myContractInstance`선언됨)와 직접 상호 작용합니다.

:::tip 빠른 리뷰

계약 상태를 변경하는 기능은 함수라고 `send()`부릅니다. 계약 상태를 변경하지 않는 기능은 함수라고 `call()`부릅니다.

:::

#### `call()` 함수 호출 {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### `send()` 함수 호출 {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
