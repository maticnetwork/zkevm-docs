---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "รับจำนวนที่อนุมัติสำหรับผู้ใช้"
---

ใช้เมธอด `getAllowance` เพื่อรับจำนวนที่อนุมัติสำหรับผู้ใช้

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

เรียกที่อยู่ที่ให้การอนุมัติว่า `spenderAddress`ซึ่งเป็นผู้ใช้ที่เป็นบุคคลภายนอกหรือสัญญาอัจฉริยะที่สามารถโอนโทเค็นของคุณในนามของคุณได้

ตามค่าเริ่มต้น ค่าของ spenderAddress คือที่อยู่ที่ระบุด้วย ERC20

คุณสามารถระบุค่าที่อยู่ของผู้จ่ายด้วยตนเองได้

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
