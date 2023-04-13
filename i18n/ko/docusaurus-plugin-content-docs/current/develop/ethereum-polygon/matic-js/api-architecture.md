---
id: api-architecture
title: API 아키텍처
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: 읽기 및 쓰기 API 그리고 트랜잭션 설정.
---

라이브러리는 전반적으로 일반적인 API 아키텍처를 따르며, API는 두 가지 유형으로 나뉩니다.

1. 읽기 API
2. 쓰기 API

## 읽기 API {#read-api}

읽기 API는 블록체인에 게시하는 것이 없기 때문에 가스를 소비하지 않습니다. 읽기 API의 예로는 `getBalance`, `isWithdrawExited` 등이 있습니다.

읽기 API의 예를 살펴봅시다.

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

읽기 API는 매우 간단하며 결과를 직접 반환합니다.

## 2. 쓰기 API {#2-write-api}

쓰기 API는 블록체인에 데이터를 게시하므로 가스를 소비합니다. 쓰기 API의 예로는 `approve`, `deposit` 등이 있습니다.

쓰기 API를 호출할 때, 결과로부터 두 개의 데이터가 필요합니다.

1. TransactionHash
2. TransactionReceipt

쓰기 API의 예를 살펴보고 트랜잭션 해시 및 영수증을 가져오겠습니다.

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### 트랜잭션 옵션 {#transaction-option}

모든 API에 대해 사용할 수 있는 몇 가지 구성 옵션이 있습니다. 이러한 구성은 매개변수로 전달될 수 있습니다.

사용 가능한 구성은 다음과 같습니다.

- from?: 문자열 | 숫자 - 트랜잭션이 시작되어야 하는 주소
- to?: 문자열 - 트랜잭션이 완료되어야 하는 주소
- value?: 숫자 | 문자열 | BN - 트랜잭션을 위해 이전된 값(WEI)
- gasLimit?: 숫자 | 문자열 - 트랜잭션에 제공되는 최대 가스(가스 한도)
- gasPrice?: 숫자 | 문자열 | BN - 트랜잭션에 사용할 가스 가격(WEI)
- data?: 문자열 - 계약의 바이트 코드
- nonce?: 숫자,
- chainId?: 숫자,
- chain?: 문자열,
- hardfork?: 문자열,
- returnTransaction?: 불리언 - true를 사용하면 수동으로 트랜잭션을 보내기 위해 사용될 수 있는 트랜잭션 객체가 반환됩니다.

가스 가격을 구성하는 예를 살펴보겠습니다.

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
