---
id: eth
title: คู่มือการฝากและถอน ETH
sidebar_label: ETH
description: "ฝากและถอนโทเค็น ETH บนเครือข่าย Polygon"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### ขั้นตอนการประมวลผลระดับสูง {#high-level-flow}

#### **ฝาก ETH (กระบวนการ 1 ขั้นตอน)**

เมื่อได้รับการอนุมัติแล้ว จะมีการเรียกใช้ฟังก์ชัน **deposit** โดยที่มีการฝากโทเค็นเข้าในสัญญาของ Polygon และพร้อมใช้งานใน Polygon

#### **โอน ETH**

เมื่อคุณมีเงินใน Polygon แล้ว คุณสามารถใช้เงินเหล่านั้นเพื่อส่งให้ผู้อื่นได้ทันที

#### **ถอน ETH (กระบวนการ 3 ขั้นตอน)**

1. การถอนเงินเริ่มต้นจาก Polygonช่วงเช็คพอยต์ใช้เวลา 30 นาที (สำหรับเช็คพอยต์รอรับตัวเน็ตประมาณ 10 นาที) จะถูกตั้งไว้โดยตั้งบล็อกบนเลเยอร์ Polygon ทั้งหมดถูกตรวจสอบความถูกต้องเนื่องจากเช็คพอยต์สุดท้าย
2. เมื่อส่งเช็คพอยต์ไปยังสัญญา ERC20 หลักแล้ว จึงถูกสร้างขึ้นโทเค็นโดยใช้ค่า โดยเทียบเท่าได้
3. สามารถเรียกค่าที่ถอนออกไปยังจำนวนบัญชี ER20 ของคุณได้จากสัญญาโซ่หลักโดยใช้ขั้นตอนการออกจากกระบวนการออก

## รายละเอียดการตั้งค่า {#setup-details}

### การกำหนดค่า Matic SDK {#configuring-matic-sdk}

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

ฝาก**:** สามารถทำได้โดยการเรียก`depositEther()`ผ่าน`depositManagerContract`สัญญา

โปรดทราบว่าโทเค็นจำเป็นต้องได้รับ mapped และได้รับการรับรองสำหรับการโอนล่วงหน้า

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

ฝากจาก Ethereum ไปยัง Polygon จะเกิดขึ้นโดยใช้กลไกการซิงค์สถานะ และใช้เวลาราว 22-30 นาทีหลังจากรอช่วงเวลานี้ ขอแนะนำให้ตรวจสอบยอดคงเหลือโดยใช้ไลบรารี web3.js/matic.js หรือใช้ MetamaskExplorer จะแสดงยอดคงเหลือก็ต่อเมื่อมีการถ่ายโอนสินทรัพย์อย่างน้อยหนึ่งรายการในเชนย่อย[ลิงก์](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma)นี้อธิบายวิธีการติดตามอีเวนต์การฝากเงิน

:::

## transfer {#transfer}

ETH บนเครือข่าย Polygon คือ WETH (โทเค็น ERC20)

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

ผู้ใช้สามารถเรียก`withdraw`ฟังก์ชั่นของสัญญาโทเค็น`getERC20TokenContract`ของเด็กฟังก์ชันนี้จะทำการเบิร์นโทเค็นไคลเอนต์พลาสมา จะเปิดเผย`withdrawStart`วิธีการทำงานเพื่อสร้างสายนี้

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

ผู้ใช้สามารถเรียก`startExitWithBurntTokens()`ฟังก์ชั่นของ`erc20Predicate`สัญญาไคลเอนต์ Polygon Plasma จะเปิดเผยวิธีการในการสร้าง`withdrawConfirm()`สายนี้เรียกฟังก์ชันนี้ได้หลังจากรวมเช็คพอยต์ในเชนหลักแล้วเท่านั้นติดตามการรวมเช็คพอยต์ได้โดยปฏิบัติตาม[คู่มือ](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events)นี้


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. การออกจากกระบวนการ {#3-process-exit}

ผู้ใช้ควรเรียก`processExits()`ฟังก์ชั่นของ`withdrawManager`สัญญา และส่งหลักฐานการเผาไหม้เมื่อส่งตัวพิสูจน์ความถูกต้องแล้ว โทเค็นจะถูกโอนไปยังผู้ใช้ไคลเอนต์พลาสมา จะเปิดเผย`withdrawExit()`วิธีการทำงานเพื่อสร้างสายนี้

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

เช็คพอยต์ ซึ่งเป็นตัวแทนธุรกรรมทั้งหมดที่เกิดขึ้นบน Polygon ไปยังเชน Ethereum ทุก ๆ 5 นาที จะถูกส่งไปยังสัญญาหลักของ Ethereum

:::