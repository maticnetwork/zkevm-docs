---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'อนุมัติจำนวนสูงสุดบนโทเค็นต้นทาง'
---

ใช้เมธอด `approveMax` เพื่ออนุมัติจำนวนสูงสุดบนโทเค็นต้นทางได้

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

เรียกที่อยู่ที่ให้การอนุมัติว่า `spenderAddress`ซึ่งเป็นผู้ใช้ที่เป็นบุคคลภายนอกหรือสัญญาอัจฉริยะที่สามารถโอนโทเค็นของคุณในนามของคุณได้

ตามค่าเริ่มต้น ค่าของ spenderAddress คือที่อยู่ที่ระบุด้วย ERC20

คุณสามารถระบุค่าที่อยู่ของผู้จ่ายด้วยตนเองได้

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
