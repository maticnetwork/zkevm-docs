---
id: erc20
title: ERC20 입금 및 출금 가이드
sidebar_label: ERC20
description:  "Polygon 네트워크에서 ERC20 토큰을 입금하고 출금합니다."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

시작하려면 [플라스마 ERC20에 대한 Matic.js 최신 문서](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/)를 확인하고 최신 메서드를 살펴보세요.

### 상위 수준 흐름 {#high-level-flow}

#### **ERC20 입금(2단계 프로세스)**

1. 토큰은 상위 체인(이더리움/Goerli)에서 Polygon 루트체인 계약 승인을 먼저 받아야 합니다.
2. 승인되면, 토큰이 Polygon 계약에 예치되고 Polygon 네트워크에서 사용 가능할 때 **입금** 함수를 호출합니다.

#### **ERC20 이전**

Polygon에 자금이 있다면 즉시 다른 사람에게 보낼 수 있습니다.

#### **ERC20 출금(3단계 프로세스)**

1. 자금 출금은 Polygon에서 시작됩니다. 30분(테스트넷의 경우 약 10분 동안 기다린다면) 검문간격은 마지막 체크포인트 이후 Polygon 블록층의 모든 블록이 검증되는 곳입니다.
2. 검문소가 메인 체인 ERC20 계약에 제출되면 NFT 출구(ERC721) 토큰이 동등한 값으로 생성됩니다.
3. 철회 된 기금은 Process-출구 절차를 사용하여 메인 체인 계약에서 ERC20 account로 다시 청구될 수 있습니다.

## 세부 사항 설정 {#setup-details}

### Polygon 엣지 구성 {#configuring-polygon-edge}

matic SDK(**_3.0.0_**) 설치하기( Matic SDK)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Maticjs 클라이언트 시작

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

다음 컨텐츠와 함께 명명 `process.env`된 루트 디렉터리에 새로운 파일을 생성합니다.

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## deposit {#deposit}

**Pro **: 이것은 일반적인 ERC20 승인이므로 함수를 호출 할 `depositManagerContract`수 `transferFrom()`있습니다. Polygon Plasma 클라이언트는 이 호출을 만드는 `erc20Token.approve()`방법을 노출합니다.

**입금**: depositManagerContract 계약에서 **_depositERC20ForUser_**를 호출하여 입금할 수 있습니다.

토큰 이전을 위한 매핑 및 승인이 사전에 이루어져야 합니다.

이 호출을 하기 위한 **_erc20Token.deposit_** 메서드입니다.


```js
const { getPlasmaClient, plasma, from } = require('../utils')

const amount = '1000000000000000000' // amount in wei
const token = plasma.parent.erc20

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token, true)
  const result = await erc20Token.deposit(amount, from)
  const receipt = await result.getReceipt()
  console.log(receipt)
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

:::note

이더리움에서 Polygon에 대한 예시를 국가 동기화 메커니즘을 사용하여 직접 예치하고 약 5~7분을 차지합니다. 이 정도 간격의 시간을 기다린 후 web3.js/matic.js 라이브러리 또는 메타마스크를 사용해 잔액을 확인하는 것이 좋습니다. 하위 체인에서 1회 이상의 자산 이전이 발생한 경우에만 탐색기에 잔액이 표시됩니다. 이 [링크](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma)에서는 입금 이벤트 추적 방법을 설명합니다.

:::

## transfer {#transfer}

```js

const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
    const receipt = await result.getReceipt()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## 출금 {#withdraw}

### 1. 소각 {#1-burn}

사용자는 `getERC20TokenContract`아동 토큰의 계약의 `withdraw()`기능을 호출 할 수 있습니다. 이 함수를 사용하면 토큰이 소각됩니다. Polygon Plasma 클라이언트는 이 호출을 만드는 `withdrawStart()`방법을 노출합니다.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)
  console.log(await result.getReceipt())
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)

```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

사용자는 **_erc20Predicate_** 계약의 **_startExitWithBurntTokens_** 함수를 호출할 수 있습니다. Polyson 플라스마 클라이언트는 이 호출을 위한 **_withdrawConfirm_** 메서드를 제공합니다. 이 함수는 메인 체인에 체크포인트가 포함된 후에만 호출할 수 있습니다. [가이드](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events)를 따라 체크포인트 포함 상태를 추적할 수 있습니다.


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. 프로세스 종료 {#3-process-exit}

사용자는 **_withdrawManager_** 계약의 **_processExits_** 함수를 호출하고 소각 증명을 제출해야 합니다. 유효한 증거를 제출하면 토큰을 사용자에게 전달합니다. Polygon 플라스마 클라이언트는 이 호출을 위한 **_withdrawExit_** 메서드를 제공합니다.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawExit()
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Polygon 네트워크에서 ERC20 체인에 대한 모든 트랜잭션을 나타내는 체크포인트는 매 30분 마다 메인 체인 ERC20 계약에 정기적으로 제출합니다.

:::