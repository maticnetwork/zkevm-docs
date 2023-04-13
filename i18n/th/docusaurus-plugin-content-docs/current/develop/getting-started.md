---
id: getting-started
title: ข้อมูลเบื้องต้นเกี่ยวกับ Polygon PoS
sidebar_label: Quick Start
description: สร้างแอปบล็อกเชนถัดไปของคุณบน Polygon
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution การอัปเดตเอกสารประกอบสำหรับนักพัฒนา

เอกสารมีการอัปเดต ปรับปรุง และพัฒนาอย่างต่อเนื่องจึงอาจมีการเปลี่ยนแปลงโปรดแจ้งปัญหาหรือตั้งคำถาม หากมีข้อสงสัยหรือข้อเสนอแนะ

:::

ยินดีต้อนรับสู่ **Polygon (ก่อนหน้านี้คือ Matic Network)**แพลตฟอร์มที่ล้ำสมัยและน่าตื่นเต้นที่สุดสำหรับการพัฒนาแอปพลิเคชันบล็อกเชนของคุณเทคโนโลยีบล็อกเชนพร้อมแล้วสำหรับการพลิกโฉมแนวทางการจัดการข้อมูลและดำเนินธุรกิจในโลกดิจิทัลคุณสามารถเข้าร่วมการเปลี่ยนแปลงครั้งนี้ได้ โดยเริ่มต้นที่การพัฒนาแอปพลิเคชันแบบไร้ตัวกลาง (DApp) ของ Polygon

คู่มือนี้จะให้ข้อมูลเบื้องต้นเกี่ยวกับระบบนิเวศ Polygonคุณจะเห็นลิงก์ไปยังแหล่งข้อมูลและเว็บไซต์อันเป็นประโยชน์ที่จะช่วยให้คุณสร้างได้อย่างรวดเร็ว ไม่เพียงแต่ใน Polygon แต่ยังรวมถึงการพัฒนาแอปพลิเคชันบล็อกเชนทั่วไปด้วย

:::tip ข้อควรทราบ

ติดตามการอัปเดตจากผู้สร้างล่าสุดจากทีมงานและชุมชน Polygon โดยสมัครติดตาม[<ins>กลุ่มการแจ้งเตือน Polygon</ins>](https://polygon.technology/notifications/)

:::

## คุณสมบัติหลักของ Polygon {#key-features-of-polygon}

- **ความเร็ว**: เครือข่าย Polygon ใช้บล็อกโซ่แบบรองรับสูงพร้อมทามติที่กำหนด โดยกลุ่มผู้ผลิตบล็อกที่เลือกโดยผู้ถือส่วนได้กำหนดไว้โดยแต่ละเช็คพอยต์ใช้เลเยอร์ Proof of Stake ในการตรวจสอบความถูกต้องของบล็อกและโพสต์หลักฐานของผู้สร้างบล็อกไปยัง Ethereum Mainnet เป็นระยะๆซึ่งช่วยให้มีอัตราการยืนยันบล็อกอย่างรวดเร็วที่ประมาณ 2 วินาที ในขณะที่รักษาการทำงานแบบไร้ตัวกลางในระดับสูงเอาไว้ได้ จึงส่งผลให้มีอัตราความเร็วที่ยอดเยี่ยมสำหรับเครือข่าย
- **ความสามารถในการปรับขนาด**: เครือข่าย Polygon จะบรรลุความเร็วแบบสมมุติฐานของเวลาน้อยกว่า 2 วินาทีบนเซิดีเชนการใช้หลายๆ ไซด์เชนช่วยให้เครือข่ายจัดการกับธุรกรรมได้หลายล้านธุรกรรมต่อวินาทีกลไกนี้ (แสดงให้เห็นแล้วในไซด์เชนแรกของ Matic) ช่วยให้เครือข่าย Polygon สามารถปรับขนาดได้อย่างง่ายดาย
- **การรักษาความปลอดภัย**: Polygon คือ Polygon จะรอรับการรักษาความปลอดภัยของ Ethereumโดยใช้รูปแบบการรักษาความปลอดภัยที่สำคัญสามรูปแบบในการปกป้องเครือข่ายใช้**สัญญาการจัดการการเดิม**พันของ Ethereum และกลุ่มตัวตรวจสอบความถูกต้องที่ใช้งานระบบ **Heimdall** และ **Bor**นักพัฒนายังสามารถปรับใช้ทั้งสองรูปแบบ (ไฮบริด) ใน DApp ของพวกตนได้

## การสร้างใน Polygon {#building-on-polygon}

หากคุณเป็นนักพัฒนา Ethereum แสดงว่าคุณเป็นนักพัฒนา Polygon แล้วเพียงเปลี่ยนไปใช้ [Polygon RPC](https://polygon-rpc.com/) และเริ่มต้นทำงานPolygon รองรับเครื่องมือทั้งหมดที่คุณคุ้นเคยบนบล็อกเชน Ethereum เช่น Truffle, Remix และ Web3js

คุณสามารถปรับใช้แอปพลิเคชันแบบไร้ตัวกลางกับ Polygon Mumbai Testnet หรือ MainnetPolygon Mumbai Testnet เชื่อมต่อกับ Ethereum Goërli Testnet ซึ่งทำหน้าที่เป็นเชนหลักคุณสามารถดูรายละเอียดเกี่ยวกับเครือข่ายทั้งหมดได้ใน[เอกสารประกอบเกี่ยวกับเครือข่าย](https://github.com/maticnetwork/matic-docs/blob/master/docs/operate/network.md)

### วอลเล็ต {#wallets}

ในการโต้ตอบกับเครือข่าย Polygon คุณต้องมีวอลเล็ตที่ใช้ Ethereum เนื่องจาก Polygon ทำงานบน Ethereum Virtual Machine (EVM)คุณสามารถเลือกตั้งค่าวอลเล็ต [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) หรือ [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md)เพิ่มเติมบนข้อมูลเกี่ยวกับกระเป๋าตังและทำไมคุณถึงต้องการจึงสามารถพบได้ใน[เอกสารกระเป๋าสตางค์](https://docs.polygon.technology/docs/develop/wallets/getting-started)ของเรา

### สัญญาอัจฉริยะ {#smart-contracts}

Polygon รองรับบริการมากมายที่คุณสามารถใช้เพื่อทดสอบ คอมไพล์ ดีบัก และปรับใช้แอปพลิเคชันแบบไร้ตัวกลางบนเครือข่าย Polygonซึ่งรวมถึงการใช้ [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md) และ [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md)

### การเชื่อมต่อกับ Polygon {#connecting-to-polygon}

คุณสามารถเพิ่ม Polygon ลงใน Metamask หรือใช้งาน Arkane โดยตรง ซึ่งช่วยให้คุณเชื่อมต่อกับ Polygon ได้โดยใช้ [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/)

เพื่อเชื่อมต่อกับเครือข่าย Polygon เพื่ออ่านข้อมูลบล็อกเชน เราแนะนำให้ใช้ Alchemy SDK

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### กำลังสร้าง DApp ใหม่บน Polygon ใช่ไหม {#building-a-new-dapp-on-polygon}

แอปพลิเคชันแบบไร้ตัวกลาง (DApp) ทำหน้าที่เป็นสะพานเชื่อมระหว่างผู้ใช้กับความเป็นส่วนตัวของข้อมูลบนบล็อกเชนจำนวน DApp ที่เพิ่มขึ้นแสดงให้เห็นถึงประโยชน์ของแอปพลิเคชันเหล่านี้ภายในระบบนิเวศบล็อกเชน ซึ่งช่วยแก้ปัญหาต่างๆ เช่น การดำเนินการธุรกรรมระหว่างผู้เข้าร่วมสองคนผ่านสัญญาอัจฉริยะ โดยไม่จำเป็นต้องใช้อำนาจจากส่วนกลาง

สมมติว่าคุณไม่มีประสบการณ์ในการสร้างแอปพลิเคชันแบบไร้ตัวกลาง (DApp) มาก่อนในกรณีดังกล่าว แหล่งข้อมูลที่กล่าวถึงด้านล่างจะช่วยให้คุณเริ่มต้นใช้เครื่องมือที่จำเป็นในการสร้าง ดีบัก และปรับใช้ DApp บนเครือข่าย Polygon ได้อย่างรวดเร็ว

- [DApp แบบ Full Stack: ชุดบทช่วยสอน](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [พัฒนา DApp โดยใช้ Fauna, Polygon และ React](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### มี DApp แล้วใช่ไหม {#already-have-a-dapp}

หากคุณมีแอปพลิเคชันแบบไร้ตัวกลาง (DApp) อยู่แล้ว และกำลังมองหาแพลตฟอร์มที่จะช่วยให้คุณปรับขนาดได้อย่างมีประสิทธิภาพ คุณมาถูกที่แล้วเพราะ Polygon ช่วยให้คุณ:

1. **ย้ายข้อมูลจากเชนที่ใช้ Ethereum Virtual Machine (EVM) ได้อย่างง่ายดาย**: Polygon ภูมิใจในการเป็นสุดยอดโซลูชันการปรับขนาด Layer-2 สำหรับ Ethereumคุณไม่ต้องกังวลเกี่ยวกับสถาปัตยกรรมพื้นฐานในขณะย้ายหรือปรับใช้ DApp ของคุณกับเครือข่าย Polygon ตราบใดที่ยังเข้ากันได้กับ EVM
2. **ใช้ Polygon เป็นเลเยอร์ในการทำธุรกรรมที่เร็วกว่า**: การปรับใช้ DApp ของคุณกับ Polygon Mainnet ช่วยให้คุณสามารถใช้ประโยชน์จาก Polygon ให้เป็นเลเยอร์ในการทำธุรกรรมที่เร็วกว่าสำหรับ DAppนอกจากนี้ คุณยังสามารถรับโทเค็นของคุณที่เราแมปได้อีกด้วยคุณสามารถเข้าร่วม[กลุ่มแลกเปลี่ยนความเห็นทางเทคนิค](http://bit.ly/matic-technical-group)ของเราบน Telegram เพื่อเรียนรู้เพิ่มเติม

## หมายเหตุเพิ่มเติม {#side-note}

ถ้าดูซับซ้อน ไม่เป็นไรคุณสามารถลองใช้งานในทันทีและเริ่มต้นการจัดการได้เลยจุดสังเกตบางประการก่อนที่คุณจะเริ่มลงลึกในเรื่องทรัพยากร พื้นที่เก็บข้อมูล และเอกสารมีดังนี้:

1. **ระวังค่าใช้จ่ายของการใช้เทคโนโลยีขั้นสูง:** เช่น การเขียนโปรแกรมเฉพาะกลุ่มทั่วไป เพราะการพัฒนา DApp และบล็อกเชนนั้นก้าวไปอย่างรวดเร็วขณะค้นคว้า คุณอาจพบพื้นที่เก็บข้อมูลรหัสที่ซับซ้อน, ข้อผิดพลาดรหัส 404 ในเว็บไซต์เอกสาร หรือแม้แต่ไม่มีเอกสารประกอบถือว่าเป็นโอกาสในการติดต่อเราผ่านช่องทางโซเชียลมีเดีย
2. **อาจต้องใช้ความพยายามสูงในการเรียนรู้ แต่ก็เริ่มต้นได้ง่ายๆ**: ชุมชนเปิดกว้างและยินดีต้อนรับโปรเจกต์ยินดีรับคำขอ Pull จากบุคคลภายนอกและแยกวิเคราะห์ให้กับผู้สร้างบล็อกทุกรายอย่างแข็งขันเรากำลังดำเนินการสร้างโลกที่ดีขึ้นและยินดีรับความช่วยเหลือในทุกรูปแบบเราจะรู้สึกยินดีต้อนรับคุณเข้าสู่ระบบนิเวศ Web3 ที่น่าทึ่งนี้

:::info คอยติดตามข่าวสาร

การพัฒนาแอปพลิเคชันแบบไร้ตัวกลางช่วยสนับสนุนการทำงานแบบไร้ตัวกลางของเครือข่ายติดตามโซเชียลมีเดียของเราเพื่อรับข้อมูลเชิงลึกและการอัปเดตเพิ่มเติมเกี่ยวกับระบบนิเวศ Polygonคุณสามารถหาลิงก์ไปยังชุมชน Polygon ทั้งหมดได้[ที่นี่](https://polygon.technology/community/)

:::
