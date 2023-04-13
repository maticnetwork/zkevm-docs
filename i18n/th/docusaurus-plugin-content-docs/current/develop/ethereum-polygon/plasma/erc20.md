---
id: erc20
title: คู่มือการฝากและถอน ERC20
sidebar_label: ERC20
description:  "ฝากและถอนโทเค็น ERC20 บนเครือข่าย Polygon"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

โปรดตรวจสอบเอกสาร [Matic.js ล่าสุดบน Plasma ERC20](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) เพื่อเริ่มต้นและดูวิธีการล่าสุด

### ขั้นตอนการประมวลผลระดับสูง {#high-level-flow}

#### **ฝาก ERC20 (กระบวนการ 2 ขั้นตอน)**

1. โทเค็นต้องได้รับการอนุมัติก่อนสำหรับสัญญาเชนต้นทาง Polygon บนเชนหลัก (Ethereum/Goerli)
2. เมื่อได้รับการอนุมัติแล้ว จะมีการเรียกใช้ฟังก์ชัน **deposit** โดยที่มีการฝากโทเค็นเข้าในสัญญาของ Polygon และพร้อมใช้งานใน Polygon

#### **โอน ERC20**

เมื่อคุณมีเงินใน Polygon แล้ว คุณสามารถใช้เงินเหล่านั้นเพื่อส่งให้ผู้อื่นได้ทันที

#### **ถอน ERC20 (กระบวนการ 3 ขั้นตอน)**

1. การถอนเงินเริ่มต้นจาก Polygonค่าเช็คพอยต์ภายใน 30 นาที (สำหรับเช็คพอยต์รอรับการรอรับประมาณ 10 นาที) มีการตั้งค่าบล็อกทั้งหมดบนเลเยอร์ Polygon จึงตรวจสอบความถูกต้องตั้งแต่เช็คพอยต์สุดท้าย
2. เมื่อส่งเช็คพอยต์ไปยังสัญญา ERC20 หลักแล้ว จึงถูกสร้างขึ้นโทเค็นโดยใช้ค่า โดยเทียบเท่าได้
3. สามารถเรียกค่าที่ถอนออกไปยังจำนวนบัญชี ER20 ของคุณได้จากสัญญาโซ่หลักโดยใช้ขั้นตอนการออกจากกระบวนการออก

## รายละเอียดการตั้งค่า {#setup-details}

### การกำหนดค่า Polygon Edge {#configuring-polygon-edge}

ติดตั้ง SDK Matic (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

การเริ่มต้นไคลเอ็นต์ Maticjs

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

สร้างไฟล์ใหม่ในไดเรกทอรีรากที่มีชื่อ`process.env`ด้วย พร้อมเนื้อหาต่อไปนี้:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## deposit {#deposit}

**นี่**คือการอนุมัติ ER20 ปกติ จึง`depositManagerContract`สามารถเรียก`transferFrom()`ฟังก์ชันไคลเอนต์ Polygon Plasma จะเปิดเผยวิธีการในการสร้าง`erc20Token.approve()`สายนี้

**ฝาก**: การฝากสามารถทำได้โดยเรียก **_depositERC20ForUser_** บนสัญญา depositManagerContract

โปรดทราบว่าจะต้องมีการแมปและอนุมัติโทเค็นสำหรับการฝากก่อน

เมธอด **_erc20Token.deposit_** เพื่อทำการเรียกนี้


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

ฝากจาก Ethereum ไปยัง Polygon จะเกิดขึ้นโดยใช้กลไกการซิงค์สถานะ และใช้เวลาราว 5-7 นาทีหลังจากรอช่วงเวลานี้ ขอแนะนำให้ตรวจสอบยอดคงเหลือโดยใช้ไลบรารี web3.js/matic.js หรือใช้ MetamaskExplorer จะแสดงยอดคงเหลือก็ต่อเมื่อมีการถ่ายโอนสินทรัพย์อย่างน้อยหนึ่งรายการในเชนย่อย[ลิงก์](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma)นี้อธิบายวิธีการติดตามอีเวนต์การฝากเงิน

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

## ถอน {#withdraw}

### 1. เบิร์น {#1-burn}

ผู้ใช้สามารถเรียก`withdraw()`ฟังก์ชั่นของสัญญาโทเค็น`getERC20TokenContract`ของเด็กฟังก์ชันนี้จะทำการเบิร์นโทเค็นไคลเอนต์ Polygon Plasma จะเปิดเผยวิธีการในการสร้าง`withdrawStart()`สายนี้

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

ผู้ใช้สามารถเรียกฟังก์ชัน **_startExitWithBurntTokens_** ของสัญญา **_erc20Predicate_**ไคลเอนต์พลาสมา จะเปิดเผย**_การถอนโฮสต์ยืนยัน_**วิธีการที่จะทำให้เรียกนี้เรียกฟังก์ชันนี้ได้หลังจากรวมเช็คพอยต์ในเชนหลักแล้วเท่านั้นติดตามการรวมเช็คพอยต์ได้โดยปฏิบัติตาม[คู่มือ](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events)นี้


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

### 3. การออกจากกระบวนการ {#3-process-exit}

ผู้ใช้ควรเรียกฟังก์ชัน **_processExits_** ของสัญญา **_withdrawManager_** และส่งหลักฐานการเบิร์นเมื่อส่งตัวพิสูจน์ความถูกต้องแล้ว โทเค็นจะถูกโอนไปยังผู้ใช้ไคลเอนต์ Polygon Plasma จะเปิดเผยวิธีการ**_ถอนเพื่อ_**ทำการเรียกนี้

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

เช็คพอยต์ ซึ่งเป็นตัวแทนธุรกรรมทั้งหมดที่เกิดขึ้นบนเครือข่าย Polygon ไปยังเชน ERC20 ทุก ๆ ~ 30 นาทีจะถูกส่งไปยังสัญญาหลักของเชนโดยทั่วไป

:::