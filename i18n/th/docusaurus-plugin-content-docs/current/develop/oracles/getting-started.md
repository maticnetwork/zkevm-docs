---
id: getting-started
title: เริ่มต้น
sidebar_label: Getting Started
description: โซลูชั่นที่มีอยู่สำหรับดึงข้อมูลห่วงโซ่ออกไปยัง dApps ของ Polygon
keywords:
  - wiki
  - polygon
  - data oracles
  - chainlink
  - bandchain
  - api3
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

โดยมักจะต้องเข้าถึงข้อมูลจากโลกภายนอกที่เกี่ยวข้องกับข้อตกลงของคอนเทนต์แต่สัญญาแบบฉลาดไม่สามารถเข้าถึงข้อมูลจากนอกเครือข่าย blockเชนoracle เป็นวิธีสำหรับ**บล็อกเชน หรือสัญญาแบบฉลาดเพื่อโต้ตอบกับข้อมูลภายนอก**

เนื่องจากบล็อกเชนถูกกำหนดให้เป็นถนนทางเดียว Oracle จึงเป็นเส้นทางระหว่างอีเวนต์นอกเชนและอีเวนต์ในเชนOracle เหล่านี้เป็นบริการที่ส่งและยืนยันเหตุการณ์ที่เกิดขึ้นในโลกจริง และส่งข้อมูลนี้ไปยังสัญญาอัจฉริยะ ซึ่งทำให้เกิดการเปลี่ยนแปลงสถานะบนบล็อกเชน

Oracle ขาเข้านำข้อมูลนอกเชนหรือโลกแห่งความจริงมาสู่บล็อกเชน ในขณะที่ Oracle ขาออกทำตรงกันข้าม โดยจะแจ้งเอนทิตีภายนอกบล็อกเชนของอีเวนต์ที่เกิดขึ้น

## Ortho Blockเชน {#blockchain-oracles}

ในการผสานรวม DApp ของคุณกับ Oracle บน Polygon คุณสามารถเลือกใช้หนึ่งในโซลูชันต่อไปนี้:

 1. [API3](api3.md)
 2. [Chainlink](chainlink.md)
 3. [BandChain](bandchain.md)
 4. [Razor](razor.md)
 5. [Tellor](tellor.md)
 6. [UMA](optimisticoracle.md)

## แหล่งข้อมูล {#resources}

1. [ปัญหาด้าน Blockchain Oracle คืออะไร](https://blog.chain.link/what-is-the-blockchain-oracle-problem/)
1. [Blockchain Oracle คืออะไร](https://cryptobriefing.com/what-is-blockchain-oracle/)
2. [Blockchain Oracle ประเภทต่างๆ](https://blockchainhub.net/blockchain-oracles/)
3. [บทช่วยสอน: การรับข้อมูลราคาแบบไร้ตัวกลาง](https://docs.chain.link/docs/get-the-latest-price)
4. [บทช่วยสอน: วิธีผสานรวม Razor บน Polygon](https://docs.razor.network/tutorial/matic/)
