---
id: withdraw-exit
title: withdraw exit
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# withdrawExit {#withdrawexit}

ใน Plasma ใครก็ตามที่ใช้เมธอด `withdrawExit` สามารถออกจากกระบวนการถอนได้กระบวนการออกจะทำงานได้ก็ต่อเมื่อหลังจากที่สิ้นสุดระยะเวลาการคัดค้านแล้วเท่านั้น

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

ในกรณีหลายโทเค็น คุณยังสามารถออกได้ด้วยการระบุรายการโทเค็นในอาร์เรย์
