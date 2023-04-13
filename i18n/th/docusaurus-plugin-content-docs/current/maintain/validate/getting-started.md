---
id: validator-index
title: ดัชนีสำหรับผู้ตรวจสอบ
description: ชุดคู่มือเกี่ยวกับวิธีการเรียกใช้และใช้งานโหนดตัวตรวจสอบความถูกต้องบนเครือข่าย Polygon
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip ข้อควรทราบ

ติดตามการอัปเดตโหนดและตัวตรวจสอบความถูกต้องล่าสุดจากทีม Polygon และชุมชนด้วยการสมัครรับ[การแจ้งเตือน](https://polygon.technology/notifications/) Polygon

:::

ผู้ตรวจสอบคือผู้มีบทบาทสำคัญในการทำให้เครือข่าย Polygon ดำเนินต่อไป ผู้ตรวจสอบจะเรียกใช้โหนดแบบเต็มรูปแบบและทำให้
เครือข่ายมีความปลอดภัยโดยการนำโทเค็น MATIC มาทำการ Stake เพื่อสร้างบล็อก ตรวจสอบยืนยันธุรกรรม และมีส่วนร่วมในระบบฉันทามติแบบ PoS

:::info

มีพื้นที่จำกัดสำหรับการยอมรับผู้ตรวจสอบที่จะเข้ามาใหม่ ผู้ตรวจสอบใหม่สามารถเข้าร่วมกับชุดที่ทำงานอยู่ได้ต่อเมื่อผู้ตรวจสอบที่ทำงานอยู่ในปัจจุบันถอนตัว

โดยจะมีการดำเนินกระบวนการประมวลใหม่สำหรับการแทนที่ผู้ตรวจสอบ

:::

## ภาพรวม {#overview}

Polygon ประกอบด้วยสามเลเยอร์ต่อไปนี้:

* เลเยอร์ Ethereum — เป็นชุดสัญญาบน Ethereum Mainnet
* เลเยอร์ Heimdall เป็นชุดของโหนด Heimdall แบบ Proof-of-Stake ซึ่งใช้แบบบคู่ขนานกับ Ethereum Mainnet ดำเนินการติดตามชุดสัญญาการ Stake ซึ่งปรากฏใน Ethereum Mainnet และส่งเช็คพอยต์ของเครือข่าย Polygon ไปยัง Ethereum Mainnet Heimdall  ใช้ Tendermint เป็นหลัก
* เลเยอร์ Bor — เป็นชุดโหนด Bor ที่สร้างบล็อกที่สับเปลี่ยนโดยโหนด Heimdall Bor ใช้ Go Ethereum เป็นหลัก

ในการเป็นผู้ตรวจสอบบนเครือข่าย Polygon คุณต้องเรียกใช้:

* โหนด Sentry — เครื่องที่แยกต่างหากที่เรียกใช้โหนด Heimdall และโหนด Borโหนด Sentry จะเปิดรับโหนดทุกโหนดในเครือข่าย Polygon
* โหนดผู้ตรวจสอบ — เครื่องที่แยกต่างหากที่เรียกใช้โหนด Heimdall และโหนด Bor โหนดผู้ตรวจสอบจะเปิดรับเฉพาะโหนด Sentry และปิดรับส่วนที่เหลือของเครือข่าย
* ทำการ Stake โทเค็น MATIC ในสัญญาการ Stake ที่ใช้งานบน Ethereum Mainnet

## องค์ประกอบ {#components}

### Heimdall {#heimdall}

Heimdall จะดำเนินการสิ่งต่อไปนี้:

* ติดตามและตรวจสอบสัญญาการ Stake บน Ethereum Mainnet
* ตรวจสอบการเปลี่ยนแปลงสถานะทั้งหมดใน Bor Chain
* ส่งเช็คพอยต์ของสถานะ Bor Chain ให้กับ Ethereum Mainnet

Heimdall  ใช้ Tendermint เป็นหลัก

:::info ดูเพิ่มเติมที่

* GitHub repository: [Heimdall](https://github.com/maticnetwork/heimdall)
* GitHub repository: [สัญญาการ Stake](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* โพสต์ในบล็อก: [Heimdall และ Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Bor จะดำเนินการสิ่งต่อไปนี้:

* สร้างบล็อกบนเครือข่าย Polygon

Bor เป็นโหนดและเลเยอร์ผู้ผลิตบล็อกสำหรับเครือข่าย Polygon มันขึ้นอยู่กับค่า Go Ethereumบล็อกที่สร้างบน Bor จะได้รับการตรวจสอบโดยโหนด Heimdall

:::info ดูเพิ่มเติมที่

* GitHub repository: [Bor](https://github.com/maticnetwork/bor)
* โพสต์ในบล็อก: [Heimdall และ Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

ส่วนนี้จะแนะนำคุณในหัวข้อต่อไปนี้:

* [ความรับผิดชอบของผู้ตรวจสอบ](validator-responsibilities.md)
* การเข้าร่วมเครือข่ายในฐานะผู้ตรวจสอบ:
  * [เริ่มและเรียกใช้โหนดด้วย Ansible](run-validator-ansible.md)
  * [เริ่มและเรียกใช้โหนดด้วยไบนารี](run-validator-binaries.md)
  * [การ Stake ในฐานะผู้ตรวจสอบ](validator-staking-operations.md)
* การรักษาโหนดผู้ตรวจสอบของคุณ:
  * [เปลี่ยนที่อยู่กระเป๋าเงินของผู้ลงนาม](change-signer-address.md)
  * [เปลี่ยนค่าคอมมิชชั่น](validator-commission-operations.md)

ความช่วยเหลือจากชุมชน:

* [Discord](https://discord.com/invite/0xPolygon)
* [ฟอรั่ม](https://forum.polygon.technology/)
