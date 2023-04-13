---
id: glossary
title: อภิธานศัพท์
description: เงื่อนไข Key Polygon
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## ผู้ผลิตบล็อก (Block producer) {#block-producer}

ผู้ผลิตบล็อก คือ[ผู้ตรวจสอบ](#validator)ที่มีการเคลื่อนไหวอยู่ซึ่งได้รับเลือกให้ทำหน้าที่เป็นผู้ผลิตบล็อกสำหรับ [Span](#span)

ผู้ผลิตบล็อกมีหน้าที่รับผิดชอบในการสร้างบล็อกและเผยแพร่บล็อกที่สร้างขึ้นไปยังเครือข่าย

## Bor {#bor}

โหนด Bor เป็นโหนดที่สร้างบล็อกขึ้นบนเครือข่าย Polygon

Bor ใช้ [Go Ethereum](https://geth.ethereum.org/) เป็นหลัก

## ธุรกรรมเช็คพอยต์ {#checkpoint-transaction}

ธุรกรรมเช็คพอยต์ คือธุรกรรมที่มี Merkle root ของบล็อกต่าง ๆ ของเลเยอร์ [Bor](#bor) ระหว่างช่วงเช็คพอยต์

ธุรกรรมนี้จะเป็นไปตามสัญญาการ Stake ของ Polygon บน Ethereum mainnet ที่ดำเนินการโดยโหนด [Heimdall](#heimdall)

ดูเพิ่มเติม:

* [สถาปัตยกรรม Heimdall: เช็คพอยต์](/docs/pos/heimdall/checkpoint)
* [กลไกของเช็คพอยต์](/docs/maintain/validator/core-components/checkpoint-mechanism)

## ค่าคอมมิชชั่น (Commission) {#commission}

ค่าคอมมิชชั่น คือเปอร์เซ็นต์ของผลตอบแทนที่[ผู้ตรวจสอบ](#validator)ได้รับจาก[ผู้มอบหมายสิทธิ์](#delegator)ที่ทำการ Stake กับผู้ตรวจสอบ

ดูเพิ่มเติมที่[การจ่ายค่าคอมมิชชั่นแก่ผู้ตรวจสอบ](/docs/maintain/validate/validator-commission-operations)

## ผู้มอบหมายสิทธิ์ (Delegator) {#delegator}

ผู้มอบหมายสิทธิ์จะมีบทบาทในการทำให้เครือข่าย Polygon มีความปลอดภัยด้วยการ Stake โทเค็น MATIC กับ[ผู้ตรวจสอบ](#validator)ที่มีอยู่โดยไม่ต้องรันโหนดด้วยตนเอง

ดูเพิ่มเติมที่[ผู้มอบหมายสิทธิ์คือใคร](/docs/maintain/polygon-basics/who-is-delegator)

## โหนดเต็มรูปแบบ (Full node) {#full-node}

โหนดเต็มรูปแบบคือ [โหนด Sentry](#sentry) ที่มีการซิงค์อย่างสมบูรณ์ซึ่งใช้ทั้งโหนด [Heimdall](#heimdall) และ [Bor](#bor)

ดูเพิ่มเติมที่[การปรับใช้โหนดเต็มรูปแบบ](/docs/operate/full-node-deployment)

## Heimdall {#heimdall}

โหนด Heimdall เป็นโหนดที่ทำงานขนานกับ Ethereum Mainnet, ตรวจสอบชุดสัญญาที่ใช้งานบน Ethereum Mainnet และส่ง[เช็คพอยต์](#checkpoint-transaction)ของเครือข่าย Polygon ไปยัง Ethereum Mainnet

Heimdall  ใช้ [Tendermint](https://tendermint.com/) เป็นหลัก

## ที่อยู่ของเจ้าของ (Owner address) {#owner-address}

ที่อยู่ของเจ้าของ คือที่อยู่ที่ใช้ในการ Stake, Restake, เปลี่ยนที่อยู่ผู้ลงนาม, ถอนผลตอบแทน และจัดการพารามิเตอร์ที่เกี่ยวข้องกับการมอบหมายสิทธิ์บน Ethereum Mainnet

ในขณะที่[คีย์ผู้ลงนาม](#signer-address)จะได้รับการเก็บไว้บนโหนดและถือว่าเป็น **Hot** Wallet แต่คีย์เจ้าของจะต้องได้รับการเก็บไว้อย่างปลอดภัย ใช้งานไม่บ่อยนัก และถือว่าเป็น **Cold** Wallet

ดูเพิ่มเติมที่[การจัดการคีย์](validator/core-components/key-management.md)

## ผู้เสนอบล็อก (Proposer) {#proposer}

ผู้เสนอบล็อก คือ[ผู้ตรวจสอบ](#validator)ที่ได้รับเลือกจากอัลกอริทึมให้เป็นผู้เสนอบล็อกใหม่

ผู้เสนอบล็อกจะต้องรับผิดชอบในการรวบรวมลายเซ็นทั้งหมดสำหรับ[เช็คพอยต์](#checkpoint-transaction)ที่เฉพาะเจาะจง และส่งเช็คพอยต์ไปยัง Ethereum Mainnet

## Sentry {#sentry}

โหนด Sentry เป็นโหนดที่ใช้ทั้งโหนด [Heimdall](#heimdall) และโหนด [BOR](#bor) เพื่อดาวน์โหลดข้อมูลจากโหนดอื่น ๆ บนเครือข่ายและเผยแพร่ข้อมูลของ[ผู้ตรวจสอบ](#validator)บนเครือข่าย

โหนด Sentry จะเปิดกว้างสำหรับโหนด Sentry อื่น ๆ ทั้งหมดในเครือข่าย

## Span {#span}

ชุดบล็อกที่กำหนดไว้ในเชิงลอจิกสำหรับกลุ่มผู้ตรวจสอบที่ได้รับคัดเลือกจาก[ผู้ตรวจสอบ](#validator)ที่มีอยู่ทั้งหมด

ผู้ตรวจสอบอย่างน้อย 2 ใน 3 ที่มีสิทธิ์ในการ Stake จะเป็นผู้ตัดสินใจในการเลือกแต่ละ Span

ดูเพิ่มเติมที่[ฉันทามติ Bor: Span](/docs/pos/bor/consensus.md#span)

## การ Stake {#staking}

การ Stake เป็นกระบวนการล็อกโทเค็นไว้ในเงินฝากเพื่อรับสิทธิ์ในการตรวจสอบความถูกต้องของการทำธุรกรรมและสร้างบล็อกบนบล็อกเชนโดยทั่วไปจะดำเนินการในโทเค็นแบบดั้งเดิมสำหรับเครือข่าย ซึ่งสำหรับโทเค็น MATIC จะถูกล็อคโดยตัวตรวจสอบความถูกต้อง/สเตเกอร์ในเครือข่าย Polygonตัวอย่างอื่น ๆ รวมถึง ETH ใน Ethereum (pos-merge) ATOM ใน Cosms ฯลฯ

ดูเพิ่มเติมที่ [Proof of Stake คืออะไร](polygon-basics/what-is-proof-of-stake.md)

## ที่อยู่ของผู้ลงนาม (Signer address) {#signer-address}

ที่อยู่ของผู้ลงนาม คือที่อยู่ของบัญชี Ethereum ของโหนดผู้ตรวจสอบ [Heimdall](#heimdall)ผู้ลงนามจะใช้ที่อยู่นี้ลงนามและส่งธุรกรรม[เช็คพอยต์](#checkpoint-transaction)

ในขณะที่คีย์ผู้ลงนามจะได้รับการเก็บไว้บนโหนดและถือว่าเป็น **Hot** Wallet แต่[คีย์เจ้าของ](#owner-address)จะต้องได้รับการเก็บไว้อย่างปลอดภัย ใช้งานไม่บ่อยนัก และถือว่าเป็น **Cold** Wallet

ดูเพิ่มเติมที่[การจัดการคีย์](validator/core-components/key-management.md)

## ตัวตรวจสอบความถูกต้อง {#validator}

ตัวตรวจสอบความถูกต้อง[เดิมพันโทเค็นของตัวเอง](/docs/maintain/validate/validator-staking-operations) ผ่านสัญญา Matic ที่ดำเนินการบนโมเนต์ Ethereum และกำลังทำงานทั้งโหนด [Heimdall](#heimdall) และโหนด [Bor](#bor) เพื่อส่งเช็คพอยต์เครือข่ายไปยัง Ethereum Mainnet และเพื่อสร้างบล็อกบนเครือข่าย

โหนดผู้ตรวจสอบจะเปิดรับเฉพาะโหนด [Sentry](#sentry) และปิดรับส่วนที่เหลือของเครือข่าย

ดูเพิ่มเติมที่[ใครคือผู้ตรวจสอบ](polygon-basics/who-is-validator.md)
