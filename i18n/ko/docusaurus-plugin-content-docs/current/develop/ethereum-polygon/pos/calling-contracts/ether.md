---
id: ether
title: 이더 입금 및 출금 가이드
sidebar_label: Ether
description:  "이더 계약에서 사용 가능한 함수"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## 상위 수준 흐름 {#high-level-flow}

이더 입금하기 -

- **RootChainManager**에서 depositEtherFor를 호출해 이더 자산을 전송하세요.

이더 출금하기 -

1. Polygon 체인에서 토큰을 **_소각_**하세요.
2. **_RootChainManager에서_** **_종료_** 함수를 호출해 소각 트랜잭션 증명을 제출하세요. 이 호출은 소각 트랜잭션이 포함된 블록의 **_체크포인트가 제출된 후_**에 할 수 있습니다.

## 세부 단계 {#step-details}

### 계약 인스턴스화하기 {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### 입금 {#deposit}
계약의 `depositEtherFor`함수를 `RootChainManager`호출하십시오. 이 함수는 Polygon 체인에서 예치를 받을 사용자의 주소인 1개의 `userAddress`인자를 차지합니다. 예치될 에테르의 양을 트랜잭션 값으로 보내야합니다.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### 소각 {#burn}
Ether는 Polygon 체인에서 ERC20 토큰이기 때문에 Ether는 ERC20 인수와 동일합니다. 어린이 토큰의 계약에서 `withdraw`기능을 호출하여 토큰을 수 있습니다. 이 함수는 단일 인수를 가지고 있으며, 이는 토큰의 수를 `amount`나타냅니다. 소각 증명은 종료 단계에서 제출되어야 하므로 트랙잭션 해시를 저장하세요.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### 종료 {#exit}
`RootChainManager`계약의 출구 함수는 토큰을 잠금을 해제하고 수신하도록 요청해야 합니다.`EtherPredicate` 이 함수는 소각 트랜잭션을 증명하는 단일 바이트 인수를 사용합니다. 이 함수를 호출하기 전에 화상 트랜잭션을 포함하는 검문소를 기다립니다. 다음 필드를 RLP-인코딩하여 증명은 생성됩니다.

1. headerNumber - 소각 트랜잭션을 포함하는 체크포인트 헤더 블록 번호
2. blockProof - (하위 체인의) 블록 헤더가 제출된 머클 루트의 리프임을 증명
3. blockNumber - 하위 체인에서 소각 트랜잭션을 포함하는 블록 번호
4. blockTime - 소각 트랜잭션 블록 시간
5. txRoot - 블록의 트랜잭션 루트
6. receiptRoot - 블록의 영수증 루트
7. receipt - 소각 트랜잭션 영수증
8. receiptProof - 소각 영수증의 머클 증명
9. branchMask - 머클 패트리샤 트리에서 수신 경로를 나타내는 32비트
10. receiptLogIndex - 영수증에서 읽을 수 있는 로그 색인

증명을 수동으로 생성하는 것은 까다로울 수 있으므로 Polygon 엣지를 사용하는 것을 권장합니다. 트랜잭션을 수동으로 보내려면 옵션 객체에서 **_encodeAbi_**를 **_true_**로 전달하여 원시 호출 테이터를 가져올 수 있습니다.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

이 호출 데이터를 **_RootChainManager_**로 보내세요.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
