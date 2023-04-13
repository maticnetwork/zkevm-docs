---
id: withdraw-confirm-faster
title: withdrawChallengeFaster
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

เมธอด `withdrawConfirmFaster` เป็นขั้นตอนที่สองในกระบวนการถอนของ Plasmaในขั้นตอนนี้ จะมีการส่งหลักฐานของธุรกรรมการเบิร์นของคุณ (ธุรกรรมแรก) และสร้างโทเค็น ERC721 ที่มีมูลค่าเทียบเท่ากันขึ้น

หลังจากที่กระบวนการนี้เสร็จเรียบร้อยแล้ว ระยะเวลาการคัดค้านจะเริ่มขึ้น และเมื่อสิ้นสุดระยะเวลาการคัดค้าน ผู้ใช้จะสามารถนำจำนวนที่ถอนคืนไปยังบัญชีของตนบนเชนต้นทางได้

การคัดค้านมีระยะเวลา 7 วันสำหรับ Mainnet

<div class="highlight mb-20px mt-20px">ซึ่งมีความรวดเร็วเพราะสร้างหลักฐานในแบ็คเอนด์คุณต้องกำหนดค่า [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)</div>

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
