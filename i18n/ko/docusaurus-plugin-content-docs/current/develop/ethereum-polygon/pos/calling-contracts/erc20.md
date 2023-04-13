---
id: erc20
title: ERC20 입금 및 출금 가이드
sidebar_label: ERC20
description: "ERC20 계약에서 사용 가능한 함수"
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## 상위 수준 흐름 {#high-level-flow}

ERC20 입금하기 -

1. **_ERC20Predicate_** 계약을 **_승인_**해 입금할 토큰을 지출하세요.
2. **_RootChainManager에서_** **_depositFor를_** 호출하세요.

ERC20 출금하기 -

1. Polygon 체인에서 토큰을 **_소각_**하세요.
2. **_RootChainManager에서_** **_종료_** 함수를 호출해 소각 트랜잭션 증명을 제출하세요. 이 호출은 소각 트랜잭션이 포함된 블록의 **_체크포인트가 제출된 후_**에 할 수 있습니다.

## 세부 사항 설정 {#setup-details}

### 계약 인스턴스화하기 {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### 승인 {#approve}
토큰 계약의 **_승인_** 함수를 호출해 토큰을 지출하기 위한 **_ERC20Predicate_**를 승인하세요. 이 함수는 spender와 amount 두 인수를 사용합니다. **_spender_**는 사용자의 토큰을 지출하기 위한 승인을 받는 주소이며, **_amount_**는 지출할 수 있는 토큰 금액입니다. 1회 승인을 위해 입금액과 동일한 금액을 유지하거나 여러 번 승인되지 않도록 더 큰 금액을 전달하세요.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### 입금 {#deposit}
호출하기 전에 토큰을 매핑하고 입금 금액이 승인되어야 합니다.  
계약의 `depositFor()`함수를 `RootChainManager`호출하십시오. 이 함수는 3개의 `userAddress``rootToken``depositData`인자를 사용합니다. 그리고 Polygon 체인에서 예치를 받을 사용자의 `userAddress`주소입니다. 주요 체인에서 토큰의 `rootToken`주소입니다. ABI를 인코딩한 금액은 ABI를 인코딩한 `depositData`금액입니다.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### 소각 {#burn}
하위 토큰 계약에서 **_출금_** 함수를 호출해 Polygon 체인에서 토큰을 소각할 수 있습니다. 이 함수는 소각될 토큰 수를 나타내는 단일 인수 **_amount_**를 사용합니다. 소각 증명은 종료 단계에서 제출되어야 하므로 트랙잭션 해시를 저장하세요.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### 종료 {#exit}
`RootChainManager`계약의 출구 함수는 토큰을 잠금을 해제하고 수신하도록 요청해야 합니다.`ERC20Predicate` 이 함수는 소각 트랜잭션을 증명하는 단일 바이트 인수를 사용합니다. 이 함수를 호출하기 전에 화상 트랜잭션을 포함하는 검문소를 기다립니다. Pro는 다음 필드를 인코딩하는 RLP에 의해 생성됩니다.

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
