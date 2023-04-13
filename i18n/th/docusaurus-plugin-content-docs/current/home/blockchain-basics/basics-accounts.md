---
id: accounts
title: บัญชีคืออะไร
sidebar_label: Accounts
description: "บัญชี EOA และบัญชีสัญญา"
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# บัญชีคืออะไร {#what-are-accounts}

สถานะของ Ethereum ทั่วโลกประกอบด้วยบัญชีที่สื่อสารต่อกันและกันผ่านเฟรมเวิร์กการส่งต่อสาร ปฏิสัมพันธ์พื้นฐานที่สุดคือการส่งค่า - เช่นโทเค็น MATIC โทเค็นแบบดั้งเดิมของ Polygon คือ โทเค็นพื้นเมืองของบล็อกเชน Ethereum

แต่ละบัญชีจะถูกระบุโดยตัวระบุของ hex 20 byte ซึ่งเรียกว่า ที่อยู่ ซึ่งสร้างขึ้นจากคีย์สาธารณะของบัญชี

มีบัญชีสองประเภท: **บัญชีที่ได้รับการรับรองและบัญชีเจ้าของแบบหมด******อายุแล้ว

## บัญชี Externally Owned Account {#externally-owned-accounts}

EOA คือบัญชีที่ควบคุมโดยคีย์ส่วนตัว โดยมีความสามารถในการส่งโทเค็นและข้อความ

1. โดยสามารถส่งธุรกรรม (ether transverever, ether หรือโค้ดสัญญาที่ทริกเกอร์)
2. ถูกควบคุมโดยคีย์ส่วนตัว
3. และไม่มีโค้ดที่เกี่ยวข้อง

## บัญชีสัญญา (Contract Owned Account) {#contract-owned-accounts}
บัญชีที่เจ้าของเป็นบัญชีที่มีโค้ดสัญญาที่เกี่ยวข้องกับโค้ดสัญญาและคีย์ส่วนตัวของพวกเขาจะไม่เป็นเจ้าของโดยใคร

1. พวกเขามีโค้ดที่เกี่ยวข้อง
2. การดำเนินการของพวกเขารับตัวโดยการดำเนินการหรือข้อความ (call) ที่ได้รับจากสัญญาอื่น
3. และเมื่อโค้ดนี้ดำเนินการแล้ว มันจะดำเนินการด้วยความซับซ้อนแบบพล.อ. (Turing Enveless) - จัดการจัดเก็บแบบดำเนินการต่อเองและสามารถเรียกสัญญาอื่น

### แหล่งข้อมูล {#resources}

- [อ่านเพิ่มเติมเกี่ยวกับบัญชี](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
