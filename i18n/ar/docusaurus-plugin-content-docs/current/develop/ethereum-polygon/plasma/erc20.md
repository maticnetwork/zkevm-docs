---
id: erc20
title: ERC20 Deposit and Withdraw Guide
sidebar_label: ERC20
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Please check the latest [Matic.js documentation on Plasma ERC20](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) to get started and view the up-to-date methods.

### High Level Flow

#### **Deposit ERC20 (2 step process)**

1. The tokens need to be first approved to the Polygon rootchain contract on Parent Chain (Ethereum/Goerli).
2. Once approved, the **deposit** function is to be invoked where the tokens get deposited to the Polygon contract, and are available for use in Polygon.

#### **Transfer ERC20**

Once you have funds on Polygon, you can use those funds to send to others instantly.

#### **Withdraw ERC20 (3 step process)**

1. Withdrawal of funds is initiated from Polygon. A checkpoint interval of 30 mins(For testnets wait for ~10 minutes) is set, where all the blocks on the Polygon block layer are validated since the last checkpoint.
2. Once the checkpoint is submitted to the mainchain ERC20 contract, an NFT Exit (ERC721) token is created of equivalent value.
3. The withdrawn funds can be claimed back to your ERC20 acccount from the mainchain contract using a process-exit procedure.

## Setup Details

---

### Configuring Polygon Edge

Install Matic SDK (**_3.0.0)_**

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js

Initiating Maticjs client

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

### process.env

Create a new file in root directory name it process.env

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

---

## deposit.js

**Approve**: This is a normal ERC20 approval so that **_depositManagerContract_** can call **_transferFrom_** function. Polygon Plasma client exposes **_erc20Token.approve_** method to make this call.

**deposit**: Deposit can be done by calling **_depositERC20ForUser_** on depositManagerContract contract.

> Note that token needs to be mapped and approved for transfer beforehand.

**_erc20Token.deposit_** method to make this call.

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

> NOTE: Deposits from Ethereum to Polygon happen using a state sync mechanism and takes about ~5-7 minutes. After waiting for this time interval, it is recommended to check the balance using web3.js/matic.js library or using Metamask. The explorer will show the balance only if at least one asset transfer has happened on the child chain. This [link](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) explains how to track the deposit events.

## transfer.js

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

## Withdraw

### 1. Burn

User can call **_withdraw_** function of **_getERC20TokenContract_** child token contract. This function should burn the tokens. Polygon Plasma client exposes **_withdrawStart_** method to make this call.

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

### 2. confirm-withdraw.js


User can call **_startExitWithBurntTokens_** function of **_erc20Predicate_** contract. This function should burn the tokens. Polygon Plasma client exposes **_withdrawConfirm_** method to make this call. This function can be called only after the checkpoint is included in the main chain. The checkpoint inclusion can be tracked by following this [guide](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events).


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

### 3. Process Exit

A user should call the **_processExits_** function of **_withdrawManager_** contract and submit the proof of burn. Upon submitting valid proof tokens are transferred to the user. Polygon Plasma client exposes **_withdrawExit_** method to make this call.

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

_Note: A checkpoint, which is a representation of all transactions happening on the Polygon Network to the ERC20 chain every ~30 minutes, is submitted to the mainchain ERC20 contract._
