---
title: Tellor
description: "คู่มือในการรวมออรเคิลของ Tellor ลงในสัญญา Polygon ของคุณ"
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor เป็น Oracle ที่ให้ข้อมูลการป้องกันการตรวจสอบยับยั้งที่ใช้การจูงใจทางระบบเศรษฐกิจที่ใช้สกุลเงินดิจิทัลอย่างง่ายในการสร้างความปลอดภัยใครๆ ก็สามารถให้และตรวจสอบข้อมูลได้โครงสร้างที่ยืดหยุ่นของ Tellor สามารถให้ข้อมูลใดๆ ในช่วงเวลาใดก็ได้ เพื่อให้สามารถทดลอง/สร้างนวัตกรรมได้ง่าย

## ข้อกำหนดเบื้องต้น (ด้านซอฟต์แวร์) {#soft-prerequisites}

เราถือว่าข้อมูลต่อไปนี้เป็นข้อมูลเกี่ยวกับระดับทักษะการเขียนโค้ดของคุณ โดยเน้นไปที่ด้าน Oracle

สมมุติฐาน:

- คุณสามารถไปยังส่วนต่างๆ ของเทอร์มินัลได้
- คุณมี npm ติดตั้งอยู่
- คุณรู้วิธีใช้ npm เพื่อจัดการรูปแบบการขึ้นต่อกัน

Tellor เป็น Oracle แบบไลฟ์และโอเพนซอร์สที่พร้อมสำหรับการนำไปใช้คู่มือผู้เริ่มต้นนี้อยู่ที่นี่เพื่อแสดงความง่ายซึ่งสามารถลุกขึ้นและทำงานกับเทลเลอร์ โดยจัดหาโปรเจ็กต์ของคุณด้วยโอเรเตอร์ที่ป้องกันการเซ็นเซอร์แบบย่อยสลายและเซ็นเซอร์อย่างเต็มที่

## ภาพรวม {#overview}

Tellor เป็นระบบ Oracle ที่ฝ่ายต่างๆ สามารถขอค่าของจุดข้อมูลนอกเชน (เช่น BTC/USD) และผู้รายงานจะแข่งขันกันเพื่อเพิ่มค่านี้ลงในธนาคารข้อมูลในเชน ซึ่งสามารถเข้าถึงได้โดยสัญญาอัจฉริยะของ Polygon ทั้งหมดข้อมูลที่ป้อนไปยังธนาคารข้อมูลนี้ได้รับการรักษาความปลอดภัยโดยเครือข่ายผู้รายงานที่ทำการ StakeTellor ใช้กลไกการจูงใจทางระบบเศรษฐกิจที่ใช้สกุลเงินดิจิทัลการส่งข้อมูลอย่างเที่ยงตรงโดยผู้รายงานจะได้รับรางวัลโดยการออกโทเค็นใหม่ของ Tellorผู้มีส่วนร่วมที่ไม่เป็นที่ยอมรับจะถูกลงโทษและลบออกจากเครือข่ายอย่างรวดเร็วโดยใช้กลไกการโต้แย้ง

ในบทช่วยสอนนี้ เราจะพูดถึง:

- การตั้งค่าชุดเครื่องมือเริ่มต้นที่คุณจะต้องศึกษาและใช้งาน
- ดูตัวอย่างง่ายๆ
- ระบุที่อยู่ Testnet ของเครือข่ายที่คุณสามารถทดสอบ Tellor ได้ในขณะนี้

## การใช้ Tellor {#usingtellor}

สิ่งแรกที่คุณต้องทำคือติดตั้งเครื่องมือพื้นฐานที่จำเป็นสำหรับการใช้ Tellor เป็น Oracle ของคุณใช้[แพ็คเกจนี้](https://github.com/tellor-io/usingtellor)เพื่อติดตั้งสัญญาผู้ใช้ Tellor:

`npm install usingtellor`

เมื่อติดตั้งแล้ว สัญญาของคุณจะสามารถสืบทอดฟังก์ชันจากสัญญา "UsingTellor" ได้

เยี่ยมไปเลยคุณมีเครื่องมือพร้อมแล้ว ตอนนี้มาดูแบบฝึกหัดง่ายๆ ที่เราจะดึงข้อมูลราคา Bitcoin กัน:

### ตัวอย่าง BTC/USD {#btc-usd-example}

สืบทอดสัญญา UseTellor โดยส่งที่อยู่ของ Tellor เป็นอาร์กิวเมนต์ constructor:

นี่เป็นตัวอย่าง:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## ที่อยู่: {#addresses}

Tellor Tributes: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### ต้องการทำการทดสอบก่อนใช่ไหม {#looking-to-do-some-testing-first}

Polygon Mumbai Testnet: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

การทดสอบ:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

ต้องการโทเค็นการทดสอบไหมTweet us ที่ ['@trbfaucet'](https://twitter.com/trbfaucet)

เพื่อความสะดวกในการใช้งาน อีโรต์ของ UsingTellor มาพร้อมกับ[สัญญา](https://github.com/tellor-io/TellorPlayground) Style Playground แบบ Tellor เพื่อการรวมที่ง่ายขึ้นดู[ที่นี่](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)เพื่อหารายละเอียดของฟังก์ชั่นที่เป็นประโยชน์

#### สำหรับการนำ Oracle ของ Tellor ไปใช้แบบที่มีประสิทธิภาพมากขึ้น โปรดดูรายการฟังก์ชันทั้งหมดที่มี[ที่นี่](https://github.com/tellor-io/usingtellor/blob/master/README.md)

#### ยังมีคำถามอยู่เหรอเข้าร่วมชุมชน[ที่](https://discord.gg/tellor)นี่!
