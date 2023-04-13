---
id: covalent
title: การใช้ Covalent
sidebar_label: Covalent
description: เรียนรู้วิธีใช้ API รวมของ Covalent สำหรับข้อมูล
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## ข้อมูลเบื้องต้น {#introduction}

Polygon นำขนาดที่ใหญ่มหาศาลมาสู่ Ethereum โดยใช้ Plasma ในเวอร์ชันที่มีการปรับตัวด้วยไซด์เชนบน PoS ที่ให้โซลูชันสำหรับธุรกรรมที่เร็วขึ้นและมีต้นทุนต่ำมากที่มีความมีผลสมบูรณ์ของธุรกรรมบนเชนหลักเครือข่าย Polygon ทำให้เกิดความมีชีวิตชีวาโดยใช้เช็คพอยต์ PoS ซึ่งได้รับการส่งไปยังเชนหลัก Ethereumซึ่งในทางทฤษฎี ทำให้ไซด์เชน Polygon เดียว ทำธุรกรรมต่างๆ ได้ถึง `2^16` ธุรกรรมต่อบล็อก และอาจจะหลายล้านธุรกรรมบนหลายเชนในอนาคต

### ข้อเท็จจริงสั้นๆ {#quick-facts}

<TableWrap>

| คุณสมบัติ | ค่า |
|---|---|
| chainId ของ Polygon Mainnet | `137` |
| chainId ของ Polygon Mumbai Testnet | `80001` |
| Polygon Blockchain Explorer | https://polygonscan.com/ |
| เวลาในการสร้างบล็อก | ประมาณ 3 วินาที |
| เวลาแฝงในการรีเฟรชข้อมูล | ประมาณ 6 วินาทีหรือ 2 บล็อก |

</TableWrap>

:::tip การเริ่มต้นด่วน

ดู**[<ins>วิดีโอแนะนำนี้</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**
เพื่อเริ่มต้น

:::

## Endpoint ที่รองรับ {#supported-endpoints}

รองรับ [__Class A__](https://www.covalenthq.com/docs/api/#tag--Class-A) Endpoint ทั้งหมดสำหรับ Matic Mainnet และ Mumbai Testnetคุณสามารถค้นหาเครือข่ายใดก็ได้ผ่านทาง API รวม โดยเปลี่ยน `chainId`

:::info Endpoint

รายการคำขอทั้งหมดโดยละเอียดที่คุณสามารถทำได้บนเครือข่าย Polygon โดยใช้ Covalentมีอยู่ใน[<ins>เอกสาร Covalent API</ins>](https://www.covalenthq.com/docs/api/)

:::

---

## ภาคผนวก {#appendix}

### โทเค็นสำหรับจ่ายค่าแก๊สของ Matic {#matic-gas-token}

ในการติดต่อกับเครือข่าย Matic จะต้องใช้โทเค็น MATIC เพื่อชำระเป็นค่าแก๊สคำตอบของ Covalentจะส่งคืนฟิลด์ `gas_*` โดยอัตโนมัติในหน่วย MATIC

### การแม็ปโทเค็น {#token-mapping}

Covalent รักษาการแม็ปที่อยู่โทเค็นแบบเรียลไทม์บนเชนระหว่าง Ethereum Mainnet กับเชน Maticใช้ที่อยู่เหล่านี้ในการค้นราคาแบบย้อนกลับบน Matic และส่งคืน URL โลโก้ของโทเค็นที่ถูกต้อง

ตัวอย่างบางส่วนของโทเค็นที่แม็ป:

| โทเค็น | Ethereum Mainnet | Matic Mainnet |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### ราคาโทเค็น {#token-prices}

Covalent จะสามารถส่งคืนราคาที่แม็ปได้สำหรับโทเค็นที่มีการแม็ปกลับไปยัง Ethereum Mainnet
