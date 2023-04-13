---
id: torus
title: Torus
description: Torus คือระบบการจัดการคีย์ที่ไม่ใช่คัสโตเนอรัลสำหรับ dApps
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus เป็นระบบจัดการคีย์ที่ใช้งานง่ายปลอดภัยสำหรับผู้ใช้และปลอดภัย และระบบจัดการคีย์ที่ไม่ใช่คัสโตเนอรต์สำหรับแอพที่พังพินาศเรามุ่งเน้นการจัดเตรียมหนทางสู่ระบบนิเวศแบบไร้ตัวกลางให้แก่ผู้ใช้กระแสหลัก

**ประเภท**:การจัดการที่ไม่ใช่คัสโตเนเจอร์ / HD<br/>**ที่เก็บคีย์ส่วนตัว**: จัดเก็บข้อมูลเบราว์เซอร์ภายในผู้ใช้และเข้ารหัสและจัดเก็บบนเซิร์ฟเวอร์ Torus<br/>**การสื่อสารไปยัง Ethereum Ledger**: Infura <br/>
**การเข้ารหัสคีย์ส่วนตัว**: Mnemonic / Social-Auth-Auth-Authin<br/>

ทั้งนี้ขึ้นอยู่กับความต้องการของโปรแกรมของคุณ Torus สามารถรวมผ่านวอลเลต์ของ Torus หรือด้วยการเชื่อมต่อโดยตรงกับเครือข่าย Torus ผ่านออปสำหรับข้อมูลเพิ่มเติม โปรดดู[เอกสารของ Torus](https://docs.tor.us/)

## การรวมตัวกระเป๋าสตางค์ Torus {#torus-wallet-integration}

หากแอปพลิเคชันของคุณเข้ากันได้กับ MetaMask หรือผู้ให้บริการ Web3 รายอื่น ๆ แล้ว การรวมWallet Torus จะให้คุณเป็นผู้ให้บริการเพื่อห่ออินเตอร์เฟซ Web3 เดียวกันนี้คุณสามารถติดตั้งผ่านแพคเกจ npmสำหรับวิธีและข้อมูลเชิงลึกเพิ่มเติม โปรดเข้าเยี่ยมชมเอกสาร Torus อย่างเป็นทางการเกี่ยวกับการ[รวมของกระเป๋าสตางค์](https://docs.tor.us/wallet/get-started)

### การติดตั้ง {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### ตัวอย่าง {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## การรวมตัวสำหรับการเชื่อมต่อแบบตั้งเอง {#customauth-integration}

หากคุณกำลังมองหาที่จะควบคุม UX ของคุณเอง ตั้งแต่ล็อกอินไปจนถึงอินเตอร์เนชันชันทั้งหมดคุณสามารถใช้โปรแกรมการเขียน ELISTA ได้คุณสามารถรวมผ่านหนึ่งใน SDK ของพวกเขาได้โดยอาศัยอยู่บนแพลตฟอร์ม (s) คุณกำลังสร้างอยู่สำหรับข้อมูลเพิ่มเติม โปรดเข้าเยี่ยม[ชมการรวมกลุ่มออตุส](https://docs.tor.us/customauth/get-started)
