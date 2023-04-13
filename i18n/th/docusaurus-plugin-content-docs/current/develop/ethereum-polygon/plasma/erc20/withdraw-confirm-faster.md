---
id: withdraw-confirm-faster
title: withdraw challenge faster
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

เมธอด `withdrawConfirmFaster` เป็นขั้นตอนที่สองในกระบวนการถอนของ Plasmaในขั้นตอนนี้ จะมีการส่งหลักฐานของธุรกรรมการเบิร์นของคุณ (ธุรกรรมแรก) และสร้างโทเค็น ERC721 ที่มีมูลค่าเทียบเท่ากันขึ้น

หลังจากที่กระบวนการนี้เสร็จเรียบร้อยแล้ว ระยะเวลาการคัดค้านจะเริ่มขึ้น และเมื่อสิ้นสุดระยะเวลาการคัดค้าน ผู้ใช้จะสามารถนำจำนวนที่ถอนคืนไปยังบัญชีของตนบนเชนต้นทางได้

การคัดค้านมีระยะเวลา 7 วันสำหรับ Mainnet

<div class="highlight mb-20px mt-20px">ซึ่งมีความรวดเร็วเพราะสร้างหลักฐานในแบ็คเอนด์คุณต้องกำหนดค่า [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)</div>

**หมายเหตุ** - ธุรกรรม withdrawStart ต้องผ่านเช็คพอยต์เพื่อคัดค้านการถอน

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

เมื่อสิ้นสุดระยะเวลาการคัดค้านแล้ว สามารถเรียก `withdrawExit` เพื่อออกจากกระบวนการถอนและรับจำนวนที่ถอนคืนได้
