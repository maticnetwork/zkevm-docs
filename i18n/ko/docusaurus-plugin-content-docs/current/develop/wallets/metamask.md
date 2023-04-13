---
id: metamask
title: 메타마스크
description: 폴리곤에서 다음 블록체인 앱을 설치합니다.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Metamask는 브라우저의 데이터 저장소에 개인 키를 저장하고 암호로 암호화된 시드 구문을 저장하여 사용자의 이더리움 지갑을 관리하는 브라우저 애드온입니다. 이는 비 보관 지갑입니다. 즉, 사용자는 개인 키에 대한 모든 액세스 권한과 책임을 집니다. 분실되면 사용자는 더 이상 보관을 제어하거나 지갑에 대한 액세스를 복원할 수 없습니다.

**유형**: 비 보관/HD <br/> **프라이빗 키 저장소**: 사용자의 로컬 브라우저 저장소<br/> **이더리움 원장과의 통신**: Infura <br/> **프라이빗 키 인코딩**: 니모닉(Mnemonic) <br/>

### 1. Web3 설정하기

**Step 1**

DApp에 다음을 설치하십시오:
  ```javascript
  npm install --save web3
  ```
새 파일을 만들고, 이름을`web3.js`로 지정한 후 다음 코드를 삽입합니다:

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

위 파일은 `getWeb3()`라는 함수를 내보냅니다. 그 목적은 메타마스크에 의해 주입된 전역 객체(`ethereum` 또는 `web3`)를 감지하여 메타마스크 계정의 접근을 요청하는 것입니다.

[Metamask의 API 문서](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes)에 따르면:

> 메타마스크는 window.ethereum에서 사용자가 방문한 웹사이트에 글로벌 API를 주입합니다(레거시 이유로 window.web3.currentProvider에서도 사용 가능). 이 API를 사용하면 웹사이트에서 사용자 로그인을 요청하고, 사용자가 연결되어 있는 블록체인에서 데이터를 로드하고, 사용자가 메시지 및 트랜잭션에 서명하도록 제안할 수 있습니다. 이 API를 이용하여 web3 브라우저의 사용자를 감지할 수 있습니다.

간단히 말해서, 기본적으로 메타마스크의 확장/추가 기능이 브라우저에 설치되어 있으면 `etherum`(이전 버전의 경우 `web3`)이라는 전역 변수가 정의됩니다. 이 변수를 사용하여 web3 객체를 인스턴스화합니다.

**Step 2**

이제, 클라이언트 코드에서 위의 파일을 가져옵니다,
```js
  import getWeb3 from '/path/to/web3';
```
그리고 함수를 호출합니다:
```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```
### 2. 계정 설정하기

이제 트랜잭션 (특히 블록체인 상태를 변경하는 트랜잭션)을 보내기 위해서는 위에서 생성한 web3 객체에서 컨트랙트 인스턴스를 인스턴스화하여 해당 트랜잭션에 서명하려는 계정이 필요합니다:
```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```
`getAccounts()` 함수는 사용자의 메타마스크에 있는 모든 계정의 배열을 반환하고 `accounts[0] `은 현재 사용자가 선택한 계정입니다.

### 3. 컨트랙트 인스턴스화하기

일단 `web3` 객체가 준비되면, 다음으로 컨트랙트를 인스턴스화 합니다 > 컨트랙트 ABI와 주소가 이미 있다고 가정합니다:)
```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```
### 4. 함수 호출하기

이제 컨트랙트에서 호출하려는 모든 기능에 대해 인스턴스화된 컨트랙트객체 (2단계에서 선언된 `myContractInstance` )와 직접 상호작용합니다.

신속 검토: - 컨트랙트 상태를 변경하는 함수를 `send()` 함수라고 합니다. - 컨트랙트 상태를 변경하지 않는 함수를 `call()` 함수라고 합니다

**`call()` 함수 호출하기**
```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```
**`send()` 함수 호출하기**
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
