---
id: state-sync-mechanism
title: กลไกการซิงค์สถานะ
description: กลไกการซิงค์สถานะเพื่ออ่านข้อมูล Ethereum
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

ผู้ตรวจสอบบนเลเยอร์ [Heimdall](/docs/maintain/glossary.md#heimdall) จะรับเหตุการณ์ [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) และส่งเหตุการณ์ไปยังเลเยอร์ [Bor](/docs/maintain/glossary.md#bor) ดูเพิ่มเติมที่ [สถาปัตยกรรม Polygon](/docs/pos/polygon-architecture)

**สัญญาผู้รับ**จะสืบทอด [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol) และลอจิกแบบกำหนดเองจะเข้าไปอยู่ภายในฟังก์ชัน [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5)

เวอร์ชั่นล่าสุด [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) มีการปรับปรุงสองสามอย่าง เช่น :
1. การจำกัดขนาดข้อมูลในธุรกรรมการซิงค์สถานะไว้ที่:
    * **30Kb** เมื่อแสดงในรูปแบบ**ไบต์**
    * **60Kb** เมื่อแสดงในรูปแบบ**สตริง**
2. เพิ่ม**เวลาหน่วง**ระหว่างอีเวนต์สัญญาของผู้ตรวจสอบที่แตกต่างกัน เพื่อให้แน่ใจว่าพูลหน่วยความจำจะไม่ถูกเติมเต็มอย่างรวดเร็วในกรณีที่เกิดอีเวนต์จำนวนมากซึ่งอาจขัดขวางความคืบหน้าของ Chain ได้

ตัวอย่างต่อไปนี้แสดงให้เห็นว่าขนาดข้อมูลถูกจำกัดอย่างไร:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## ข้อกำหนดสำหรับผู้ใช้ {#requirements-for-the-users}

สิ่งที่ต้องการจาก Dapp/ผู้ใช้ ในการทำงานกับการซิงค์สถานะ (State-Sync) คือ:

1. เรียกใช้ฟังก์ชัน [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33)
2. ฟังก์ชัน `syncState` จะปล่อยเหตุการณ์ที่เรียกว่า `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`
3. ผู้ตรวจสอบทุกคนใน Heimdall Chain จะได้รับ`StateSynced`เหตุการณ์ ผู้ตรวจสอบที่ต้องการรับค่าธรรมเนียมการทำธุรกรรมสำหรับ State Sync จะส่งธุรกรรมไปที่ Heimdall
4. เมื่อ`state-sync`ธุรกรรมบน Heimdall รวมอยู่ในบล็อกแล้ว ธุรกรรมนั้นจะถูกเพิ่มไปยังรายการ State Sync ที่รอดำเนินการ
5. หลังจากที่ทุก Sprint อยู่บน Bor แล้ว โหนด Bor จะดึงข้อมูลเหตุการณ์ State Sync ที่รอดำเนินการจาก Heimdall ผ่านการเรียกใช้ API
6. สัญญาผู้รับจะสืบทอดอินเทอร์เฟซ `IStateReceiver` และลอจิกที่กำหนดเองของการถอดรหัสไบต์ข้อมูลและการดำเนินการใด ๆ ที่อยู่ภายในฟังก์ชัน [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol)
