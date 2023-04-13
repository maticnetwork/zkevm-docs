---
id: withdraw-exit-faster
title: withdraw exit faster
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'ออกจากกระบวนการถอนเร็วขึ้นโดยใช้ txHash จาก withdrawStart'
---

ใช้เมธอด `withdrawExitFaster` เพื่อออกจากกระบวนการถอนเร็วขึ้นโดยใช้ txHash จากเมธอด `withdrawStart`

ซึ่งโดยทั่วไปจะเร็วเพราะสร้างหลักฐานในแบ็คเอนด์คุณจำเป็นต้องกำหนดค่า [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)

**หมายเหตุ** - ธุรกรรม withdrawStart จะต้องผ่านเช็คพอยต์เพื่อออกจากการถอน

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

เมื่อธุรกรรมเสร็จสิ้นแล้วและผ่านเช็คพอยต์เรียบร้อยแล้ว จะดำเนินการฝากยอดในเชนต้นทาง
