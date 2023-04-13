---
id: withdraw-confirm
title: withdraw challenge
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# withdrawConfirm {#withdrawconfirm}

เมธอด `withdrawConfirm` เป็นขั้นตอนที่สองในกระบวนการถอนของ Plasmaในขั้นตอนนี้ จะมีการส่งหลักฐานของธุรกรรมการเบิร์นของคุณ (ธุรกรรมแรก) และสร้างโทเค็น ERC721 ที่มีมูลค่าเทียบเท่ากันขึ้น

หลังจากที่กระบวนการนี้เสร็จเรียบร้อยแล้ว ระยะเวลาการคัดค้านจะเริ่มขึ้น และเมื่อสิ้นสุดระยะเวลาการคัดค้าน ผู้ใช้จะสามารถนำจำนวนที่ถอนคืนไปยังบัญชีของตนบนเชนต้นทางได้

การคัดค้านมีระยะเวลา 7 วันสำหรับ Mainnet

**หมายเหตุ** - ธุรกรรม withdrawStart ต้องผ่านเช็คพอยต์เพื่อคัดค้านการถอน

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

เมื่อสิ้นสุดระยะเวลาการคัดค้านแล้ว สามารถเรียก `withdrawExit` เพื่อออกจากกระบวนการถอนและรับจำนวนที่ถอนคืนได้
