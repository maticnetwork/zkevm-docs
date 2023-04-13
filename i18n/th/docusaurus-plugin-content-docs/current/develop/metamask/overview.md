---
id: overview
title: ภาพรวม Metamask
sidebar_label: Overview
description: วิธีเริ่มต้นใช้งาน MetaMask บน Polygon
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[MetaMask](https://metamask.io/) คือคริปโตวอลเล็ตที่สามารถใช้ในเว็บเบราว์เซอร์และบนอุปกรณ์มือถือเพื่อโต้ตอบกับบล็อกเชน Ethereumซึ่งช่วยให้คุณเรียกใช้ Ethereum DApp (แอปแบบไร้ตัวกลาง) ในเบราว์เซอร์ของคุณได้ โดยไม่เรียกใช้โหนด Ethereum เต็มรูปแบบ

**ประเภท**: ไม่เก็บรักษาคีย์ส่วนตัว/HD <br/>
**ที่เก็บคีย์ส่วนตัว**: ที่เก็บข้อมูลเบราว์เซอร์ในเครื่องของผู้ใช้<br/>
**การสื่อสารไปยัง Ethereum Ledger**: Infura <br/>
**การเข้ารหัสคีย์ส่วนตัว**: Mnemonic <br/>

:::warning
โปรดสำรอง**Phrase Recovery Secret** ของคุณหากอุปกรณ์ของคุณแตก ถูกขโมยหรือมีการเสียหายข้อมูล จึงไม่มีทางอื่นในการกู้คืนได้ วลีการกู้คืนลับคือวิธีเดียวในการกู้คืนบัญชี Meta Mask ของคุณตรวจสอบ**[<ins>เคล็ดลับความปลอดภัยและระบบความปลอดภัยขั้นพื้นฐานเพิ่มเติมสำหรับ MetaMake</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**
:::

## คู่มือการตั้งค่า MetaMask สำหรับ Polygon {#guide-to-set-up-metamask-for-polygon}

* [ดาวน์โหลดและติดตั้ง MetaMask](/develop/metamask/tutorial-metamask.md)
* [กำหนดค่า Polygon บน MetaMask](/develop/metamask/config-polygon-on-metamask.md)
* [กำหนดค่าโทเค็นที่กำหนดเอง](/develop/metamask/custom-tokens.md)
* [สร้างและนำเข้าบัญชี](/develop/metamask/multiple-accounts.md)

### 1. ตั้งค่า Web3 {#1-set-up-web3}

#### ขั้นตอนที่ 1 {#step-1}

ติดตั้งสิ่งต่อไปนี้ใน DApp:

  ```javascript
  npm install --save web3
  ```

สร้างไฟล์ใหม่ ตั้งชื่อ `web3.js` และใส่รหัสต่อไปนี้ลงไป:

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

ไฟล์ด้านบนส่งออกฟังก์ชันที่เรียกว่า `getWeb3()` ซึ่งมีวัตถุประสงค์เพื่อขอสิทธิ์การเข้าใช้งานของบัญชี Metamask ผ่านการตรวจจับอ็อบเจ็กต์ส่วนกลาง  (`ethereum` หรือ `web3`) ที่ส่งโดย Metamask

ตามข้อมูลใน[เอกสาร API ของ Metamask](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes):

> เมตามาสก์ จะฉีดยา API ทั่วโลกเข้าสู่เว็บไซต์ที่ผู้ใช้เข้าเยี่ยมชมที่ window.ethereumAPI นี้ช่วยให้เว็บไซต์สามารถร้องขอบัญชี Ethereum ของผู้ใช้ อ่านข้อมูลจากบล็อกผู้ใช้เชื่อมต่อกับ และแนะนำว่าข้อความและธุรกรรมของผู้ใช้ลงนามการปรากฏตัวของอเจ็กต์ผู้ให้บริการแสดงว่ามีผู้ใช้ Ethereum

โดยทั่วไปแล้ว หมายความว่า การมีส่วนขยาย/เพิ่ม-on ที่ติดตั้งในเบราว์เซอร์ของคุณ คุณจะมีการกำหนดตัวแปรทั่วโลกที่เรียกว่า `ethereum`(`web3`สำหรับเวอร์ชั่นเก่า) และใช้ตัวแปรนี้เราจะตั้งตัวแปรนี้เพื่อกำหนดอปราศรัยของเวป3 ของเรา

#### ขั้นตอนที่ 2 {#step-2}

ตอนนี้ในโค้ดลูกค้าของคุณ, นำเข้าไฟล์ด้านบน:

```js
  import getWeb3 from '/path/to/web3';
```

และเรียกฟังก์ชัน:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. ตั้งค่าบัญชี {#2-set-up-account}

ตอนนี้เพื่อส่งธุรกรรม (โดยเฉพาะผู้ที่เปลี่ยนสถานะของบล็อกเชน) เราจะต้องใช้บัญชีเพื่อลงนามธุรกรรมเหล่านั้นเรารวบรวมตัวสัญญาของเราจากออบเจ็กต์สามที่เราสร้างไว้ข้างต้น:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

ฟังก์ชัน `getAccounts()` ส่งกลับอาร์เรย์ของบัญชีทั้งหมดบน Metamask ของผู้ใช้ และ `accounts[0]` เป็นบัญชีที่ผู้ใช้เลือกอยู่ในปัจจุบัน

### 3. สร้างอินสแตนซ์สัญญาของคุณ {#3-instantiate-your-contracts}

เมื่อเรามี`web3`วัตถุของเราเข้าที่ เราจะจัดลำดับสัญญาต่อไป โดยสมมติว่าคุณมีสัญญาและที่อยู่ของ ABI ของคุณอยู่แล้ว:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. เรียกฟังก์ชัน {#4-call-functions}

ตอนนี้สำหรับฟังก์ชัน ใดๆ ที่คุณต้องการจะเรียก จากสัญญาของคุณ เราจึงโต้ตอบโดยตรงกับออบเจ็กต์สัญญาที่ยังไม่กำหนดของเรา (ซึ่ง`myContractInstance`ประกาศใน Step 2)

:::tip การตรวจสอบที่รวดเร็ว

ฟังก์ชัน ที่เปลี่ยนสถานะของสัญญา เรียกว่า `send()`ฟังก์ชันฟังก์ชันที่ไม่ได้เปลี่ยนสถานะสัญญาจะเรียกว่า`call()`ฟังก์ชัน

:::

#### การเรียกฟังก์ชัน `call()` {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### การเรียกฟังก์ชัน `send()` {#functions-1}

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
