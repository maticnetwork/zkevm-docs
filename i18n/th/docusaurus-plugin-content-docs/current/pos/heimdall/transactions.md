---
id: transactions
title: ธุรกรรม
description: ธุรกรรมและเมื่อไหร่ที่ใช้แล้ว
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# ธุรกรรม {#transactions}

ธุรกรรมประกอบด้วยข้อมูลที่ประกอบด้วยข้อมูลที่จัดขึ้นใน[บริบท](https://docs.cosmos.network/main/core/context.html)และ[ข้อความ](https://docs.cosmos.network/main/building-modules/messages-and-queries.html)ที่กระตุ้นการเปลี่ยนสถานะภายในโมดูล ผ่านตัวจัดการของโมดูล

เมื่อผู้ใช้ต้องการโต้ตอบกับแอปพลิเคชันและเปลี่ยนสถานะ (เช่น การส่งคอยน์) แสดงว่ากำลังสร้างธุรกรรมโดยจะต้องลงนามแต่ละ`message`ของธุรกรรมโดยใช้คีย์ส่วนตัวที่ผูกกับบัญชีที่เหมาะสม ก่อนที่จะเผยแพร่ธุรกรรมสู่เครือข่ายจากนั้น จะต้องรวมธุรกรรมไว้ในบล็อก ตรวจสอบความถูกต้อง แล้วจึงได้รับอนุมัติจากเครือข่ายผ่านกระบวนการฉันทามติ คลิก[ที่นี่](https://docs.cosmos.network/main/basics/tx-lifecycle.html) เพื่ออ่านข้อมูลเพิ่มเติมเกี่ยวกับวงจรชีวิตของธุรกรรม

## คำจำกัดความของประเภท {#type-definition}

วัตถุการดำเนินการคือประเภท SDK ที่ใช้`Tx`อินเตอร์เฟซ

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

รายละเอียดเพิ่มเติมเกี่ยวกับธุรกรรม: [https://docs.cosmos.network/หลัก/contract/transaction.html](https://docs.cosmos.network/main/core/transactions.html)
