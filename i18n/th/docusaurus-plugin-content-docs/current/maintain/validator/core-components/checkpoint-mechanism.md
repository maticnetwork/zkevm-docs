---
id: checkpoint-mechanism
title: กลไกของเช็คพอยต์
sidebar_label: Checkpoints
description: ตรวจสอบสถานะระบบไปยัง Ethereum Mainnet
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Polygon ไม่ได้เป็นแพลตฟอร์มเลเยอร์ 1

Polygon ขึ้นอยู่กับเมนเน็ต Ethereum เป็นเลเยอร์การตั้งค่าเลเยอร์ 1กลไกการ Stake ทั้งหมดจำเป็นต้องซิงค์กับสัญญาใน Ethereum Mainnet

:::

[โปรพอส](/docs/maintain/glossary.md#proposer)สำหรับเช็คพอยต์จะถูกเลือกเริ่มต้นโดยผ่านทาง[อัลกอริทึมแบบยกน้ำหนักของ Tendermint](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html)การตรวจสอบแบบกำหนดเองเพิ่มเติมจะได้รับการดำเนินการโดยอิงตามความสำเร็จในการส่งเช็คพอยต์ สิ่งนี้ทำให้ระบบ Polygon สามารถแยกส่วนกับการคัดเลือกผู้เสนอ Tendermint และช่วยมอบความสามารถต่าง ๆ แก่ Polygon เช่น การเลือกผู้เสนอต่อเมื่อธุรกรรมเช็คพอยต์ใน Ethereum Mainnet ประสบความสำเร็จ หรือมีการยื่นธุรกรรมเช็คพอยต์สำหรับบรรดาบล็อกซึ่งเป็นส่วนของเช็คพอยต์รายก่อนซึ่งไม่สามารถดำเนินการได้

การยื่นเช็คพอยต์โดยประสบความสำเร็จใน Tendermint เป็นการดำเนินกระบวนการอันประกอบด้วย 2 ช่วง:

* ผู้เสนอซึ่งได้รับการคัดเลือกผ่านอัลกอริทึมแบบวนรอบ ส่งเช็คพอยต์พร้อมกับที่อยู่ของผู้เสนอ และใส่ Merkle hash ในช่องผู้เสนอ
* ผู้ตรวจสอบรายอื่นทั้งหมดตรวจสอบความถูกต้องของข้อมูลซึ่งระบุไว้ในช่องผู้เสนอก่อนเพิ่ม Merkle hash ในสถานะของตน

จากนั้นผู้เสนอรายต่อไปจะส่งธุรกรรมการรับรองเพื่อพิสูจน์ว่า [ธุรกรรมเช็คพอยต์](/docs/maintain/glossary.md#checkpoint-transaction) เดิมได้ประสบความสำเร็จใน Ethereum Mainnet การเปลี่ยนชุดผู้ตรวจสอบถูกหน่วงเวลาออกไปโดยโหนดผู้ตรวจสอบใน [Himdall](/docs/maintain/glossary.md#heimdall) ซึ่งฝังตัวอยู่ในโหนดผู้ตรวจสอบความถูกต้องสิ่งนี้ทำให้ Heimdall สามารถซิงค์กับสถานะสัญญา Polygon ใน Ethereum Mainnet ได้ตลอดเวลา

สัญญา Polygon ซึ่งใช้ใน Ethereum Mainnet ถือว่าเป็นแหล่งที่มาของความจริงอย่างสูงสุด ดังนั้นการตรวจสอบความถูกต้องทั้งหมดจะดำเนินการผ่านการไต่ถามสัญญาใน Ethereum Mainnet
