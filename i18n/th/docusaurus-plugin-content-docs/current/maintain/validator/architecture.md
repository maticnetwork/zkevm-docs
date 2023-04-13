---
id: architecture
title: สถาปัตยกรรม
description: Ethereum, Heimdall และ Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

เครือข่าย Polygon จะแบ่งเป็นสามเลเยอร์:

* **เลเยอร์ Ethereum** เป็นชุดสัญญาบน Ethereum Mainnet
* **เลเยอร์** Heimdall ซึ่งเป็นชุดโหนด Heimdall สำหรับตัวประกันที่ทำงานแบบขนานไปยัง Mainet Ethereum โดยตรวจสอบชุดสัญญาการเดิมพันที่ติดตั้งบนเมนเนต์ Ethereum และกระทำการเช็คพอยต์เครือข่าย Polygon ไปยังเมนเน็ต EthereumHeimdall  ใช้ Tendermint เป็นหลัก
* **เลเยอร์** Bor - ชุดโหนด Bor ที่ผลิตบล็อกโดยโหนด HeimdallBor ใช้ Go Ethereum เป็นหลัก

<img src={useBaseUrl("img/staking/architecture.png")} />

## การ Stake และ Plasma Smart Contract บน Ethereum {#staking-and-plasma-smart-contracts-on-ethereum}

เพื่อเปิดใช้งานกลไก [Proof of Stake (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) ใน Polygon ระบบใช้ชุดสัญญาการจัดการ [การ Stake](/docs/maintain/glossary.md#staking) ใน Ethereum Mainnet

สัญญาการ Stake ประกอบด้วยฟีเจอร์ดังต่อไปนี้:

* ทุกคนสามารถ Stake โทเค็น MATIC ในสัญญาการ Stake ใน Ethereum Mainnet และสามารถเข้าร่วมระบบในฐานะ [ผู้ตรวจสอบ](/docs/maintain/glossary.md#validator)
* รับผลตอบแแทนการ Stake จากการตรวจสอบการเปลี่ยนสถานะบนเครือข่าย Polygon
* บันทึก [เช็คพอยต์](/docs/maintain/glossary.md#checkpoint-transaction) ใน Ethereum Mainnet

นอกจากนั้น กลไก PoS ยังทำหน้าที่ลดปัญหาเกี่ยวกับความไม่สามารถเข้าถึงข้อมูลสำหรับ Sidechain ของ Polygon

## Heimdall (เลเยอร์การตรวจสอบความถูกต้อง) {#heimdall-validation-layer}

เลเยอร์ Heimdall จัดการการรวมกลุ่มของบล็อกที่สร้างโดย [Bor](/docs/maintain/glossary.md#bor) ลงใน Merkle Tree และเผยแพร่ Merkle Root เป็นระยะไปยังกลุ่ม Root Chain การเผยแพร่ Snapshot ของ Sidechain ของ Bor เป็นระยะ ๆ เรียกว่า [เช็คพอยต์](/docs/maintain/glossary.md#checkpoint-transaction)

สำหรับทุก 2-3 บล็อกใน Bor, ผู้ตรวจสอบใน เลเยอร์ Heimdall:

1. ตรวจสอบความถูกต้องทุกบล็อกตั้งแต่เช็คพอยต์สุดท้าย
2. สร้างผังต้นไม้ Merkle จากแฮชของบล็อก
3. เผยแพร่แฮชต้นทาง Merkel ไปยัง Ethereum Mainnet

เช็คพอยต์มีความสำคัญเนื่องด้วยเหตุผล 2 ประการ:

1. ให้จุดสิ้นสุดบนเชนต้นทาง
2. ให้การพิสูจน์แบบ Proof of Burn ในการถอนสินทรัพย์

ภาพรวมของกระบวนการ:

* ชุดย่อยของตัวตรวจสอบความถูกต้องที่ใช้งานจากกองกลางจะถูกเลือกเพื่อทำหน้าที่เป็น[ผู้สร้างบล็อก](/docs/maintain/glossary.md#block-producer) สำหรับ [Span](/docs/maintain/glossary.md#span) ผู้สร้างบล็อกเหล่านี้รับผิดชอบในการสร้างบล็อกและเผยแพร่บล็อกที่สร้างบนเครือข่าย
* เช็คพอยต์รวมถึงแฮชต้นทาง Merkle ของบล็อกทั้งหมดที่สร้างขึ้นระหว่างช่วงเวลาที่กำหนดโหนดทั้งหมดจะตรวจสอบความถูกต้องของแฮชต้นทาง Merkel และแนบลายเซ็นไปด้วยกัน
* [ผู้เสนอ](/docs/maintain/glossary.md#proposer)ที่ได้รับเลือกจากชุดตัวตรวจสอบความถูกต้องมีหน้าที่รับผิดชอบในการรวบรวมลายเซ็นทั้งหมดสำหรับเช็คพอยต์เฉพาะ และยอมรับเช็คพอยต์บน Etherium Mainnet
* ความรับผิดชอบในการสร้างบล็อก รวมถึงการเสนอเช็คพอยต์จะผันแปรตามอัตราส่วนของ Stake ของผู้ตรวจสอบในพูลโดยรวม

ดูเพิ่มเติมที่ [สถาปัตยกรรม Heimdall](/docs/pos/heimdall/overview)

## Bor (เลเยอร์ผู้ผลิตบล็อก) {#bor-block-producer-layer}

Bor เป็นผู้ผลิตบล็อก Sidechain ของ Polygon กล่าวคือเป็นหน่วยงานซึ่งรับผิดชอบในส่วนการแปลงธุรกรรมต่าง ๆ เป็นบล็อก

ผู้สร้างบล็อก Bor คือชุดย่อยของตัวตรวจสอบความถูกต้อง และมีการสับเปลี่ยนตามระยะเวลาโดยตัวตรวจสอบความถูกต้องของ [Heimdall](/docs/maintain/glossary.md#heimdall)

ดูเพิ่มเติมที่ [สถาปัตยกรรมของ Bor](/docs/pos/bor/overview)
