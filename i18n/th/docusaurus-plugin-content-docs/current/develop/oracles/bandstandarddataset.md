---
id: bandstandarddataset
title: Band Standard Dataset
sidebar_label: Standard Dataset
description: ฐานข้อมูล Band Stardard นำเสนอข้อมูลราคาแบบเรียลไทม์สำหรับสัญลักษณ์มากกว่า 196+ ซึ่งครอบคลุมทั่วสินทรัพย์ crypto การแลกเปลี่ยนและสินค้าต่างประเทศ
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - standard dataset
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

ผู้พัฒนาที่สร้างบน Polygon สามารถใช้ประโยชน์จากโครงสร้างพื้นฐานของ Band ได้ด้วยห้องพยากรณ์ของ Band ตอนนี้พวกเขารวมข้อมูลราคาของ cryptourency ต่าง ๆ เพื่อรวมเข้ากับการใช้งานของพวกเขา

## โทเค็นที่รองรับ {#supported-tokens}

ในปัจจุบัน สามารถดูรายการสัญลักษณ์ที่รองรับได้ที่ [data.bandprotocol.com](http://data.bandprotcool.com)นับจากนี้เป็นต้นไป รายการนี้จะยังคงขยายต่อไปตามความต้องการของนักพัฒนาและข้อเสนอแนะของชุมชน

## คู่ราคา {#price-pairs}

เมธอดต่อไปนี้สามารถใช้งานร่วมกับการจับคู่โทเค็นหลัก/รอง (Base/Quote) ทุกรูปแบบได้ ตราบใดที่ชุดข้อมูลยังรองรับสัญลักษณ์ของโทเค็นหลักและรอง

### การค้นหาราคา {#querying-prices}

ปัจจุบัน มีสองวิธีสำหรับนักพัฒนาเพื่อค้นหาราคาจากพิธีเปิดของ Band : ผ่านทาง`StdReference`สัญญาอัจฉริยะของ Polygon และผ่านไลบรารีผู้ช่วยของ [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)JavaScript

### สัญญาอัจฉริยะ Solidity {#solidity-smart-contract}

เพื่อตรวจสอบราคาจากoracle ของ Band Protoctor สัญญาอัจฉริยะควร`StdReference`อ้างอิงสัญญาของ Band โดยเฉพาะ ทั้งวิธีการ`getReferenceData`และวิธีการ`getReferenceDatabulk`ต่างๆ

`getReferenceData`ใช้สตริงสองสายเป็นอินพุต สัญลักษณ์`base`และ`quote`สัญลักษณ์ ตามลำดับจากนั้นจะค้นหาสัญญา `StdReference` เพื่อดูอัตราล่าสุดสำหรับทั้งสองโทเค็นนั้น และคืนค่าโครงสร้าง `ReferenceData` ตามที่แสดงด้านล่าง

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk` จะใช้สองรายการแทน ซึ่งคือรายการโทเค็น `base` และรายการ `quotes`จากนั้นจึงดำเนินการไปยังการค้นหาแบบเดียวกันราคาสำหรับแต่ละฐาน / คู่ที่อ้างว้าง แต่ละดัชนี และส่งชุดของ`ReferenceData`โครงสร้างกลับมา

ตัวอย่างเช่น ถ้าเราเรียก `getReferenceDataBulk` ด้วย `['BTC','BTC','ETH']` และ `['USD','ETH','BNB']` อาร์เรย์ `ReferenceData` ที่คืนค่าจะมีข้อมูลเกี่ยวกับคู่ดังกล่าว:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## ที่อยู่สัญญา {#contract-addresses}

| บล็อกเชน | ที่อยู่สัญญา |
| -------------------- | :------------------------------------------: |
| Polygon (ทดสอบ) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

ไลบรารีตัวช่วยโหนดของ Band [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js)  ยังรองรับฟังก์ชัน `getReferenceData` ที่คล้ายกันฟังก์ชัน นี้ใช้อาร์กิวเมนต์หนึ่งตัว รายการคู่โทเค็นเพื่อค้นหาผลลัพธ์ได้จากนั้นจะคืนค่ารายการค่าอัตราที่สอดคล้องกัน


### ตัวอย่างการใช้งาน {#example-usage}

โค้ดด้านล่างแสดงตัวอย่างการใช้งานของฟังก์ชั่น:

```javascript
const { Client } = require('@bandprotocol/bandchain.js');

// BandChain's REST Endpoint
const endpoint = 'https://rpc.bandchain.org';
const client = new Client(endpoint);

// This example demonstrates how to query price data from
// Band's standard dataset
async function exampleGetReferenceData() {
  const rate = await client.getReferenceData(['BTC/ETH','BAND/EUR']);
  return rate;
}

(async () => {
  console.log(await exampleGetReferenceData());
})();

```

ผลลัพธ์ที่เกี่ยวข้องจะคล้ายกับ:

```bash
$ node index.js
[
    {
        pair: 'BTC/ETH',
        rate: 30.998744363906173,
        updatedAt: { base: 1615866954, quote: 1615866954 },
        requestID: { base: 2206590, quote: 2206590 }
    },
    {
        pair: 'BAND/EUR',
        rate: 10.566138918332376,
        updatedAt: { base: 1615866845, quote: 1615866911 },
        requestID: { base: 2206539, quote: 2206572 }
    }
]
```

ในแต่ละคู่จะมีการคืนค่าข้อมูลต่อไปนี้:

- `pair`: สตริงคู่สัญลักษณ์หลัก/รอง
- `rate`: อัตราผลลัพธ์ของคู่ที่ระบุ
- `updated`: การประทับเวลาที่อัปเดตสัญลักษณ์หลักและสัญลักษณ์รองบน BandChain ล่าสุด`USD`สำหรับ, นี่จะเป็นแสตมป์เวลาปัจจุบัน
- `rawRate`: อ็อบเจ็กต์นี้ประกอบด้วยสองส่วน
  - `value` คือค่า `BigInt` ของอัตราจริง คูณด้วย `10^decimals`
  - `decimals` จึงเป็นเลขชี้กำลังโดยที่ `rate` ใช้คูณเพื่อให้ได้ `rawRate`

## ตัวอย่างการใช้งาน {#example-usage-1}

[สัญญา](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db)นี้แสดงตัวอย่างการใช้สัญญา `StdReference` ของ Band และฟังก์ชัน `getReferenceData`