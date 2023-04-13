---
id: withdraw-confirm
title: withdrawChallenge
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# withdrawConfirm {#withdrawconfirm}

เมธอด `withdrawConfirm` เป็นขั้นตอนที่สองในกระบวนการถอนของ Plasmaในขั้นตอนนี้ จะมีการส่งหลักฐานของธุรกรรมการเบิร์นของคุณ (ธุรกรรมแรก) และสร้างโทเค็น ERC721 ที่มีมูลค่าเทียบเท่ากันขึ้น

หลังจากที่กระบวนการนี้เสร็จเรียบร้อยแล้ว ระยะเวลาการคัดค้านจะเริ่มขึ้น และเมื่อสิ้นสุดระยะเวลาการคัดค้าน ผู้ใช้จะสามารถนำจำนวนที่ถอนคืนไปยังบัญชีของตนบนเชนต้นทางได้

การคัดค้านมีระยะเวลา 7 วันสำหรับ Mainnet

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
