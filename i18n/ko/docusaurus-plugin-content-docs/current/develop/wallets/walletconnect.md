---
id: walletconnect
title: WalletConnect
description: DApp-지갑 통신을 생성하는 개방형 프로토콜입니다.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect는** dApp과 지갑 사이에 통신 링크를 생성하기 위해 지어진 지갑이 아닌 개방형 프로토콜입니다. 이 프로토콜을 지원하는 지갑과 응용 프로그램이 두 동료 사이의 공유 키를 통해 보안 링크를 허용합니다. 연결은 표준 WalletConnect URI를 통해 QR 코드를 표시하는 DApp에 의해 시작되며 지갑 애플리케이션이 연결 요청을 승인할 때 설정됩니다. 자금 이전 관련 추가 요청은 지갑 애플리케이션 자체에서 확인할 수 있습니다.

## 웹3 설정하기 {#set-up-web3}

사용자 Polygon Wallet과 연결할 수 있도록 dApp 를 설정하기 위해 WalletConnect의 제공자를 사용하여 Polygon에 직접 연결할 수 있습니다. DApp에 다음을 설치합니다.

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Polygon 통합을 `matic.js`위한 설치:

```bash
$ npm install @maticnetwork/maticjs
```

dApp에 다음 코드를 추가합니다.

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

다음으로, WalletConnect의 객체를 통해 Polygon 및 Ropsten 공급자 설정하세요.

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

위의 두 프로바이더 객체를 생성한 후 다음을 통해 웹3 객체를 인스턴스화합니다.

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Institation Contracts {#instantiating-contracts}

**웹3 객체가** 있으면, 계약의 instantation은 메타마스크와 동일한 단계를 포함합니다. **계약** AI를 확인하고 **이미** 주소를 지정해 보세요.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## 호출 기능 {#calling-functions}

:::info

개인 키는 사용자의 지갑에 남아 있으며 **앱은 어떤 식으로든 액세스 할** 수 없습니다.

:::

우리는 블록체와의 상호 작용에 따라 이더리움에서 두 가지 유형의 기능을 가지고 있습니다. 데이터를 읽을 때는 `call()`, 데이터를 쓸 때는 `send()`를 호출합니다.

### `call()` 함수 호출 {#functions}

따라서 독서 데이터를 읽는 데는 서명을 요구하지 않으므로 코드는 다음과 같이 필요합니다.

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### `send()` 함수 호출 {#functions-1}

블록체인에 대한 글을 사용하면 서명을 필요로 하기 때문에 지갑 (WalletConnect를 지원하는 Wallet)에 사용자가 연락하여 트랜잭션을 서명하도록 촉구합니다.

여기에는 세 가지 단계가 포함됩니다.
1. 트랜잭션 구성
2. 트랜잭션에 서명 받기
3. 서명된 트랜잭션 보내기

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

위의 코드는 서명을 위해 사용자의 지갑으로 전송될 트랜잭션 객체를 생성합니다.


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`기능 은 사용자가 서명을 위해 자극하고 서명 트랜잭션을 `sendSignedTransaction()`보내주면 (성공을 위한 트랜잭션 영수증을 반환)합니다.
