---
id: delegate
title: วิธีการมอบหมายสิทธิ์
description: เรียนรู้วิธีเป็นผู้มอบหมายสิทธิ์ในเครือข่าย Polygon
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# วิธีการมอบหมายสิทธิ์ {#how-to-delegate}

นี่คือคำแนะนำทีละขั้นตอนที่จะช่วยให้คุณสามารถเป็น [ผู้มอบหมายสิทธิ์](/docs/maintain/glossary.md#delegator) ในเครือข่าย Polygon

มีข้อกำหนดเบื้องต้นอยู่เพียงอย่างเดียวคือ คุณต้องมีโทเค็น MATIC และ ETH อยู่ในที่อยู่ของ Ethereum Mainnet

## เข้าสู่แดชบอร์ด {#access-the-dashboard}

1. ในวอลเล็ตของคุณ (เช่น MetaMask) ให้เลือก Ethereum Mainnet

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. เข้าสู่[ระบบ Polygon Sting](https://staking.polygon.technology/).
3. เมื่อคุณเข้าระบบ คุณจะเห็นสถิติโดยรวมบางส่วนพร้อมกับรายการตัวตรวจสอบความถูกต้อง

![img](/img/staking/home.png)

:::note

หากคุณเป็นตัวตรวจสอบความถูกต้อง ให้ใช้ที่อยู่การตรวจสอบความถูกต้องที่แตกต่างไปยังล็อกอินเป็นตัวแทนการทำงาน

:::

## มอบหมายสิทธิ์ให้กับผู้ตรวจสอบ {#delegate-to-a-validator}

1. คลิก **ต้องการเป็นผู้มอบหมายสิทธิ์ (Become a Delegator)** หรือเลื่อนลงไปที่ ผู้ตรวจสอบ (Validator) ที่ต้องการ แล้วคลิก **มอบหมายสิทธิ์ (Delegate)**

![img](/img/staking/home.png)

2. ระบุจำนวน MATIC ที่จะมอบหมายสิทธิ์

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. อนุมัติธุรกรรมการมอบหมายสิทธิ์และคลิก **มอบหมายสิทธิ์ (Delegate)**

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

หลังจากธุรกรรมการมอบหมายสิทธิ์เสร็จสมบูรณ์ คุณจะเห็นข้อความ **การมอบหมายสิทธิ์เสร็จสมบูรณ์ (Delegation Completed)**

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## ดูการมอบหมายสิทธิ์ของคุณ {#view-your-delegations}

หากต้องการดูการมอบหมายสิทธิ์ของคุณ ให้คลิก [บัญชีของฉัน (My Account)](https://staking.polygon.technology/account)

![img](/img/staking/myAccount.png)

## ถอนผลตอบแทน {#withdraw-rewards}

1. คลิก [บัญชีของฉัน (My Account)](https://staking.polygon.technology/account)

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. ภายใต้ผู้ตรวจสอบที่ได้รับมอบหมายสิทธิ์ของคุณ ให้คลิก **ถอนผลตอบแทน (Withdraw Reward)**

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

การดำเนินการนี้จะเป็นการถอนผลตอบแทนเป็นโทเค็น MATIC ไปยังที่อยู่กระเป๋าของ Ethereum ของคุณ

## การ Restake ผลตอบแทน {#restake-rewards}

1. คลิก [บัญชีของฉัน (My Account)](https://staking.polygon.technology/account)

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. ภายใต้ผู้ตรวจสอบที่ได้รับมอบสิทธิ์ ให้คลิก **Restake ผลตอบแทน (Restake Reward)**

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

ซึ่งจะรีวอร์ดโทเค็นสำหรับตัวตรวจสอบความถูกต้องและเพิ่มจำนวนเดิมพันของตัวแทนของคุณ

## ปลดล็อกจากผู้ตรวจสอบ {#unbond-from-a-validator}

1. คลิก [บัญชีของฉัน (My Account)](https://staking.polygon.technology/account)

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. ภายใต้ผู้ตรวจสอบที่ได้รับมอบสิทธิ์ของคุณ ให้คลิก **ปลดล็อก (Unbond)**

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

ซึ่งจะทำให้  ถอนรางวัลของคุณออกจากตัวตรวจสอบความถูกต้องและเดิมพันทั้งหมดของคุณออกจากตัวตรวจสอบความถูกต้อง

รีวอร์ดที่ถอนของคุณจะปรากฏขึ้นทันทีบนบัญชี Ethereum ของคุณ

เงิน Stake ที่ถอนออกของคุณจะถูกล็อกไว้เป็นระยะเวลาเท่ากับ 80 [เช็คพอยต์](/docs/maintain/glossary.md#checkpoint-transaction)

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

การล็อกเงินทุนไว้ในช่วงเวลาการปลดล็อก (Unbonding Period) นั้น ก็เพื่อให้แน่ใจว่าจะไม่มีพฤติกรรมที่เป็นอันตรายบนเครือข่าย

:::

## ย้ายเงิน Stake จากโหนดหนึ่งไปยังอีกโหนด {#move-stake-from-one-node-to-another-node}

การย้ายเงิน Stake จากโหนดหนึ่งไปยังอีกโหนดจะถือเป็นธุรกรรมเดียวในระหว่างเหตุการณ์นี้ จะไม่มีความล่าช้าหรือระยะเวลาการปลดล็อกเข้ามาเกี่ยวข้อง

1. ล็อกอินเข้าสู่ [บัญชีของฉัน (My Account)](https://wallet.polygon.technology/staking/my-account) บนแดชบอร์ดการ Stake
1. คลิก **ย้าย Stake (Move Stake)** ภายใต้ผู้ตรวจสอบที่ได้รับมอบสิทธิ์ของคุณ
1. เลือกผู้ตรวจสอบที่เป็นบุคคลภายนอก แล้วคลิก **Stake ที่นี่ (Stake here)**

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. ระบุจำนวนเงินที่จะ Stake และคลิก **ย้าย Stake (Move Stake)**

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

การดำเนินการนี้จะเป็นการย้าย Stakeแดชบอร์ดจะได้รับการอัปเดต หลังจากการยืนยันบล็อก 12 อัน

:::info

อนุญาตให้เดิมพันการย้ายระหว่างโหนดใด ๆยกเว้นเพียงอย่างเดียวคือย้ายเดิมพันจากโหนด Foundation หนึ่งไปยังโหนด Foundation ซึ่งไม่อนุญาตให้ย้ายเดิมพันจากโหนด Foundation

:::
