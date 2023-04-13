---
id: getting-started
title: บริดจ์ Plasma
sidebar_label: Introduction
description: โต้ตอบกับบริดจ์ Plasma และเครือข่าย Polygon
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

โปรดตรวจสอบ[เอกสาร Matic.js ล่าสุดเกี่ยวกับ Plasma ](https://maticnetwork.github.io/matic.js/docs/plasma/)เพื่อเริ่มต้น

บริดจ์คือชุดสัญญาที่ช่วยในการย้ายสินทรัพย์จากเชนต้นทางไปยังเชนย่อยมีสองบริดจ์หลักสำหรับย้ายสินทรัพย์ระหว่าง Ethereum และ Polygonบริดจ์แรกคือบริดจ์ Plasma และบริดจ์ที่สองเรียกว่า**บริดจ์ PoS **หรือ **บริดจ์ Proof of Stake****bridge Plasma** ให้การประกันด้านความปลอดภัยที่เพิ่มขึ้นเนื่องจากกลไกการออกจากพลาสมา

อย่างไรก็ตาม มีข้อจำกัดบางประการเกี่ยวกับโทเค็นย่อย และมีระยะเวลาการถอน 7 วันที่เกี่ยวข้องกับการออก/การถอนออกจาก Polygon ไปยัง Ethereum บนบริดจ์ Plasma[บริดจ์ PoS](/docs/develop/ethereum-polygon/pos/getting-started) มีความยืดหยุ่นมากกว่าและมีการถอนเงินเร็วขึ้น

บทเรียนนี้จะทำหน้าที่เป็นคู่มือขั้นตอนเพื่อทำความเข้าใจและใช้บริดจ์ Plasma โดยใช้สะพาน [Matic JS](https://github.com/maticnetwork/matic.js) ซึ่งเป็นวิธีที่ง่ายที่สุดในการโต้ตอบกับสะพานพลาสมาบนเครือข่าย Polygon

## ขั้นตอนการประมวลผลสินทรัพย์ในบริดจ์ Plasma {#assets-flow-in-plasma-bridge}

เราจะนำเสนอขั้นตอนการประมวลผลสำหรับการโอนสินทรัพย์บน Polygon ในบทช่วยสอนนี้ และวิธีที่คุณสามารถทำเช่นเดียวกันโดยใช้ Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. ฝากสินบน crypto สำหรับผู้ใช้ในสัญญา Polygon บนเชนหลัก
2. เมื่อโทเค็นที่ฝากจะได้รับการยืนยันบนเชนหลักแล้ว โทเค็นที่เกี่ยวข้องจะได้รับการยืนยันบนเชน Polygon
   - ขณะนี้ผู้ใช้สามารถโอนโทเค็นให้คนที่พวกเขาต้องการทันทีโดยมีค่าธรรมเนียมเล็กน้อยเชน Polygon มีบล็อกที่สร้างได้เร็วกว่า (ประมาณ 1 วินาที)นั่นคือเหตุผลที่ทำการโอนได้แทบจะในทันที
3. เมื่อผู้ใช้พร้อมแล้ว ก็จะสามารถถอนโทเค็นที่เหลือจากเชนหลักเริ่มต้นการถอนเงินจากไซด์เชน Plasmaมีการตั้งค่าช่วงเช็คพอยต์ 5 นาที โดยตรวจสอบบล็อกทั้งหมดบนชั้นบล็อก Polygon ตั้งแต่เช็คพอยต์สุดท้าย
4. เมื่อส่งเช็คพอยต์ไปยังสัญญา Ethereum หลักแล้ว จึงสร้างโทเค็นแบบ Exit NFT (ERC721) ด้วยค่าที่เท่ากัน
5. สามารถเรียกค่าที่ถอนถอนออกไปยังจำนวนบัญชี Ethereum ของคุณจากสัญญาหลักโดยใช้ขั้นตอนการออกจากกระบวนการออก
   - ผู้ใช้ยังสามารถออกได้อย่างรวดเร็วผ่าน 0x หรือ Dharma (เร็วๆ นี้)

### ข้อกำหนดเบื้องต้น: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Görli Faucet {#görli-faucet}

ในการทำธุรกรรมใดๆ คุณจะต้องมี Ether ในบัญชีทดสอบที่คุณจะใช้ในขณะที่ทำตามบทช่วยสอนในกรณีที่คุณไม่มี ETH ใด ๆ บน Göri คุณสามารถใช้ลิงก์ของ faucet ที่ให้ไว้ที่นี่ คือ https://goerli-faucet.slock.it/

### Polygon Faucet {#polygon-faucet}

ในบทช่วยสอนนี้ เราจะใช้โทเค็น ERC20 `TEST`บนเครือข่าย Görli เป็นตัวอย่างนี่คือโทเค็น "ทดสอบ"ใน DApp คุณสามารถแทนที่ด้วยโทเค็น ERC20 ใดก็ได้ในการรับโทเค็น `TEST` สำหรับทำสอบบนเครือข่าย Polygon คุณสามารถเข้าถึง [Polygon Faucet](https://faucet.polygon.technology/)

:::note

เพื่อใช้โทเค็นของคุณเองสำหรับเงินฝากและถอนเงิน คุณจะต้องได้รับ 'mapped' ซึ่งโดยหลักหมายถึงการทำสัญญาบนเชนหลักและ sidechain 'reade' ของโทเคนที่กำหนดเองของคุณ

:::

### การตั้งค่าพื้นฐานสำหรับวอลเล็ต Metamask (ไม่บังคับ) {#basic-setup-for-the-metamask-wallet-optional}

1. [สร้างกระเป๋าสตางค์](/docs/develop/metamask/hello) หากคุณยังใหม่กับกระเป๋าสตางค์ ให้ตั้งบัญชีผู้ใช้ MetaMask
2. [ปรับแต่งเน็ตทดสอบ Polygon ](/docs/develop/metamask/config-polygon-on-metamask): เพื่อแสดงการไหลของกองทุนบน Polygon ได้อย่างง่ายดาย จึงเป็นการแนะนำหากคุณกำหนดค่า tnet ของ Polygon บน Metamสก์โปรดทราบว่าเราใช้ Metamask ที่นี่เพื่อจุดประสงค์ในการแสดงข้อมูลเท่านั้นการใช้ Metamask ไม่ถือเป็นข้อกำหนดในการใช้งาน Polygon
3. [สร้างหลายบัญชี](/docs/develop/metamask/multiple-accounts): ก่อนเริ่มต้นด้วยบทช่วยสอน โปรดเตรียมบัญชีทดสอบ Ethereum ให้พร้อมไว้ 3 บัญชี
4. [กำหนดค่าโทเค็นบน Polygon](/docs/develop/metamask/custom-tokens): เพื่อดูขั้นตอนการประมวลผลเงินบน Polygon ได้อย่างง่ายดายโดยใช้ Matic.js คุณสามารถกำหนดค่าโทเค็นบน Metamask`TEST`โทเค็น จึงนำเป็นตัวอย่าง สำหรับบทเรียนนี้ จึงสามารถปรับค่าได้ใน MetaMask เพื่อจะได้เห็นภาพค่าผ่านบัญชีได้อย่างง่ายดายโปรดทราบว่าตัวเลือกนี้จะเป็น**ตัวเลือก**คุณสามารถตรวจสอบสมดุลของโทเค็นได้ง่ายและตัวแปรอื่นๆ โดยใช้[เว็บ3.js](https://web3js.readthedocs.io/en/1.0/)
