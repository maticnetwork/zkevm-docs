---
id: heimdall-chain
title: Heimdall Chain
description: ตัวตรวจสอบความถูกต้องแบบเดิมพันบนเลเยอร์ตัวตรวจสอบความถูกต้องแบบตั้งบนเครือข่าย Polygon
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Heimdall คือเลเยอร์ตัวตรวจสอบความถูกต้องแบบเดิมพันซึ่งต้องรับผิดชอบในการ[ตรวจสอบ](/docs/maintain/glossary.md#checkpoint-transaction)การเป็นตัวแทนของบล็อกพลาสม่าไปยัง Ethereum MainnetHeimdall  ใช้ [Tendermint](https://tendermint.com/) เป็นหลัก

สัญญาการ Stake ของ Ethereum Mainnet ทำงานร่วมกับโหนด Heimdall เพื่อดำเนินการในฐานะกลไกการจัดการอันน่าเชื่อถือสำหรับเครื่อง PoS รวมถึงการคัดเลือกชุด [ผู้ตรวจสอบ](/docs/maintain/glossary.md#validator) การอัปเดตผู้ตรวจสอบ ฯลฯ เนื่องจากการ Stake ได้รับการดำเนินการผ่านสัญญาใน Ethereum Mainnet ดังนั้น Polygon จึงไม่พึ่งพาเฉพาะความซื่อสัตย์ของผู้ตรวจสอบเท่านั้น แต่สืบต่อความปลอดภัยของ Ethereum Mainnet ด้วย

เลเยอร์ Heimdall จัดการการรวมกลุ่มของบล็อกที่สร้างโดย [Bor](/docs/maintain/glossary.md#bor) ลงใน Merkle Tree และเผยแพร่ Merkle Root เป็นระยะ ๆ ผ่าน Etherreum Mainnet การเผยแพร่เป็นระยะ ๆ นี้ เรียกว่า*การทำเช็คพอยต์*

ทุกสองสามบล็อกบน Bor, ผู้ตรวจสอบ (บนเลเยอร์ Heimdall):

1. ตรวจสอบความถูกต้องทุกบล็อกตั้งแต่เช็คพอยต์สุดท้าย
2. สร้าง Merkle Tree จาก บล็อก Hash
3. เผยแพร่ Merkel root ผ่าน Ethereum Mainnet

เช็คพอยต์มีความสำคัญเนื่องด้วยเหตุผล 2 ประการ:

1. ให้จุดสิ้นสุดบนเชนต้นทาง
2. ให้การพิสูจน์แบบ Proof of Burn ในการถอนสินทรัพย์

ภาพรวมของกระบวนการ:

* ชุดย่อยของผู้ตรวจสอบที่ทำงานอยู่จากกลุ่มที่ได้รับการคัดเลือกเพื่อทำหน้าที่ในฐานะ [ผู้ผลิตบล็อก](/docs/maintain/glossary.md#block-producer) สำหรับ[ช่วงเวลา](/docs/maintain/glossary.md#span) ผู้ผลิตบล็อกเหล่านี้มีหน้าที่รับผิดชอบในการสร้างบล็อกและเผยแพร่บล็อกที่สร้างอยู่บนเครือข่าย
* เช็คพอยต์รวมถึง Merkle Root hash ของบล็อกทั้งหมดที่สร้างในระหว่างช่วงเวลาที่กำหนด โหนดทั้งหมดจะตรวจสอบความถูกต้องของแฮชต้นทาง Merkel และแนบลายเซ็นไปด้วยกัน
* [ผู้เสนอ](/docs/maintain/glossary.md#proposer)ที่ได้รับเลือกจากชุดตัวตรวจสอบความถูกต้องมีหน้าที่รับผิดชอบในการรวบรวมลายเซ็นทั้งหมดสำหรับเช็คพอยต์เฉพาะ และยอมรับเช็คพอยต์บน Etherium Mainnet
* ความรับผิดชอบในการสร้างบล็อก รวมถึงการเสนอเช็คพอยต์จะผันแปรตามอัตราส่วนของ Stake ของผู้ตรวจสอบในพูลโดยรวม

ดูเพิ่มเติมที่ [สถาปัตยกรรม heimdall](/docs/pos/heimdall/overview)
