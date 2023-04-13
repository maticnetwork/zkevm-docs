---
id: matic-flow
title: How Polygon ทำงานอย่างไร
description: สร้างแอปบล็อกเชนถัดไปของคุณบน Polygon
keywords:
  - docs
  - matic
  - polygon
  - how polygon works
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# How Polygon ทำงานอย่างไร {#how-polygon-works}

Polygon คือแพลตฟอร์มสำหรับแอปพลิเคชันบล็อกเชนที่ให้บริการไซด์เชนไฮบริดทั้งแบบ Proof-of-Stake และแบบที่ใช้งาน Plasma

Polygon มีสถาปัตยกรรม 3 ชั้น:

1. การ Stake และ Plasma Smart Contract บน Ethereum
2. Heimdall (เลเยอร์ Proof of Stake)
3. Bor (เลเยอร์ผู้ผลิตบล็อก)

ภาพด้านล่างจะช่วยให้คุณเข้าใจว่าส่วนประกอบหลักเหล่านี้มีปฏิสัมพันธ์กับแต่ละอื่น:

<img src={useBaseUrl("img/Bor/bor-architecture.png")} />