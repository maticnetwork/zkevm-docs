---
id: what-is-polygon
title: Polygon คืออะไร
description: ดูเกี่ยวกับโซลูชั่นการเลื่อนแบบ Polygon
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/) เป็นโซลูชันการปรับขนาดเลเยอร์ 2 ที่ดำเนินการปรับขนาดด้วยการใช้ Sidechain สำหรับการคำนวณ Off-chain และเครือข่ายแบบกระจายศูนย์ของผู้ตรวจสอบ Proof-of-Stake (PoS)

Polygon มุ่งมั่นที่จะแก้ไขปัญหาความสามารถในการปรับขนาดและการใช้งานโดยไม่กระทบต่อการกระจายศูนย์และการใช้ประโยชน์จากชุมชนและระบบนิเวศของนักพัฒนาที่มีอยู่แต่เดิม โดยให้ประสบการณ์ผู้ใช้ที่เหนือกว่ากับระบบ dApps และฟังก์ชันผู้ใช้

ซึ่งเป็นโซลูชันการปรับขนาดสำหรับบล็อกเชนสาธารณะ Polygon PoS รองรับเครื่องมือ Ethereum ที่มีอยู่ทั้งหมดที่มาพร้อมกับธุรกรรมที่เร็วกว่าและถูกกว่า

## ฟีเจอร์สำคัญและไฮไลท์ {#key-features-highlights}

- **ความสามารถในการปรับขนาด**: ธุรกรรมที่รวดเร็ว ค่าใช้จ่ายต่ำ และปลอดภัยบน Polygon Sidechain ที่ดำเนินการ Finality บน Mainchain และ Ethereum เป็นเลเยอร์ 1 ที่เข้ากันได้อันแรกของ Basechain
- **ปริมาณงานที่สูง**: ดำเนินการได้สูงสุด 10,000 TPS บน Sidechain เดียวบน Testnet ภายใน โดยเพิ่มได้อีกหลายเชนสำหรับการปรับขนาดในแนวข้าง
- **ประสบการณ์ของผู้ใช้งาน**: UX ที่ลื่นไหลและ Abstraction ของนักพัฒนาจาก Mainchain ไปยังเชน Polygon รวมถึงแอปมือถือแบบ Native และ SDK ที่รองรับ WalletConnect
- **ความปลอดภัย**: ผู้ดำเนินการเชน Polygon เป็น Staker ในระบบ PoS เองด้วย
- **Sidechain สาธารณะ**: Polygon Sidechain มีลักษณะเป็นสาธารณะ (เมื่อเทียบกับเชน dApp เดี่ยว) ไม่ต้องขออนุญาต และสามารถรองรับได้หลายโปรโตคอล

ระบบ Polygon ได้รับการตั้งใจออกแบบให้รองรับการเปลี่ยนแปลงสถานะตามต้องการบน Polygon Sidechain ซึ่งเปิดใช้งาน EVM ได้

## บทบาทผู้มอบหมายสิทธิ์และผู้ตรวจสอบ {#delegator-and-validator-roles}

คุณสามารถเข้าร่วมเครือข่าย Polygon ได้ในฐานะผู้มอบหมายสิทธิ์หรือผู้ตรวจสอบ ดูรายละเอียด:

* [ผู้ตรวจสอบคือใคร](/docs/maintain/polygon-basics/who-is-validator)
* [ผู้มอบหมายสิทธิ์คือใคร](/docs/maintain/polygon-basics/who-is-delegator)

## สถาปัตยกรรม {#architecture}

หากเป้าหมายของคุณคือการเป็นผู้ตรวจสอบ การเข้าใจสถาปัตยกรรมของ Polygon เป็นสิ่งสำคัญ

ดู[สถาปัตยกรรมของ Polygon](/docs/maintain/validator/architecture) สำหรับข้อมูลเพิ่มเติม

### ส่วนประกอบ {#components}

หากต้องการทำความเข้าใจสถาปัตยกรรมของ Polygon โดยละเอียด โปรดดูส่วนประกอบหลักต่อไปนี้:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [สัญญา](/docs/pos/contracts/stakingmanager)

#### Codebase {#codebases}

หากต้องการทำความเข้าใจส่วนประกอบหลักโดยละเอียด โปรดดู Codebase ต่อไปนี้:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [สัญญา](https://github.com/maticnetwork/contracts)

## วิธีการ {#how-tos}

### การตั้งค่าโหนด {#node-setup}

หากคุณต้องการเรียกใช้โหนดเต็มบน Polygon Maainnet หรือ Mainnet Testnet คุณสามารถติดตามโหนดเรียกใช้ไกด์ [โหนด ตัวตรวจสอบความถูกต้อง](/maintain/validate/run-validator.md)

### การดำเนินการ Stake {#staking-operations}

ดูว่ากระบวนการ Stake สำหรับโปรไฟล์ผู้ตรวจสอบและผู้มอบหมายสิทธิ์ดำเนินการอย่างไร:

* [ผู้ตรวจสอบการดำเนินการ Stake](docs/maintain/validate/validator-staking-operations)
* [Delegate](/docs/maintain/delegate/delegate)
