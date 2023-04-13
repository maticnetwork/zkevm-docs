---
id: adding-a-custom-token
title: การเพิ่มโทเค็นแบบกำหนดเอง
sidebar_label: Adding a Custom Token
description: สร้างแอปบล็อกเชนถัดไปของคุณบน Polygon
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

คุณสมบัติ **การเพิ่มโทเค็นแบบกำหนดเอง** ช่วยให้คุณเพิ่มโทเค็นที่ได้รับการรับรองแล้ว และใช้โทเค็นร่วมกับ Polygon Wallet Suite ได้เพียงแค่คุณค้นหาโทเค็นด้วยที่อยู่ของสัญญาโทเค็น โดยใช้ได้ทั้ง root หรือ child

* **root** คือสัญญาโทเค็นบน Ethereum
* **child** คือสัญญาโทเค็นบน Polygon

### ฉันจะหาสัญญาโทเค็นได้อย่างไร {#how-do-i-find-the-token-contract}

คุณสามารถใช้ชื่อของโทเค็น ค้นหาได้จากทั้ง [Coingecko](http://coingecko.com) หรือ [Coinmarketcap](https://coinmarketcap.com/) ซึ่งคุณจะเห็นที่อยู่ของโทเค็นบนเชน Ethereum (สำหรับโทเค็น ERC 20) และเชนอื่นๆ ที่รองรับ เช่น Polygonที่อยู่โทเค็นในเชนอื่นๆ อาจไม่ได้รับการอัปเดต แต่คุณสามารถใช้ที่อยู่ root ตามความต้องการของคุณได้

เมื่อคุณทำการเลือกโทเค็น คุณสามารถค้นหาโทเค็นได้โดย:
* สัญลักษณ์โทเค็น
* ชื่อโทเค็น
* สัญญา

ซึ่งมีวิธีการทำงานดังต่อไปนี้:

1. สามารถเพิ่มโทเค็นเข้าไปในรายการของคุณได้อย่างง่ายดาย โดยเพิ่มที่อยู่ของสัญญา เช่นเดียวกับโทเค็นแบบกำหนดเอง (เราสนับสนุน

ที่อยู่ของสัญญาบน Polygon หรือ Ethereum):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. เมื่อเรียกดูข้อมูลโทเค็นเรียบร้อยแล้ว แล้วคุณจะพบกับหน้าจอการยืนยัน พร้อมข้อมูลโทเค็นทั้งหมดจากนั้นคุณสามารถเพิ่มโทเค็น เช่นเดียวกับโทเค็นแบบกำหนดเอง ซึ่งถูกเก็บไว้ในระบบของคุณ เราขอแนะนำให้คุณตรวจสอบสัญญาโทเค็นอีกครั้ง เนื่องจากมีการโคลนโทเค็น หรือโทเค็นหลอกลวงจำนวนมาก:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. โทเค็นที่คุณเพิ่มเข้าไปในรายการจะปรากฏขึ้นก็ต่อเมื่อคุณเลือกโทเค็นดังกล่าวนั้น:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

นอกจากนี้ คุณยังสามารถเพิ่มโทเค็นโดยตรงจากแท็บ โทเค็นของหน้าจอ**การจัดการ**:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>