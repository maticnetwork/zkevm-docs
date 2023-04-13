---
id: delegation
title: การมอบหมายผ่านชาร์ต ตัวตรวจสอบความถูกต้อง
sidebar_label: Delegation
description: การมอบหมายผ่านชาร์ต ตัวตรวจสอบความถูกต้อง
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon รองรับการ Delegate ผ่านการแชร์ตัวตรวจสอบความถูกต้องเมื่อใช้การออกแบบนี้ จะเป็นเรื่องง่ายกว่าในการแจกจ่ายผลตอบแทนและ Slash เป็นจำนวนมาก (Delegator หลายพันราย) ในสัญญา Ethereum โดยไม่ต้องคำนวณมากมาย

Delegator ทำการ Delegate โดยการซื้อส่วนแบ่งของพูลแบบจำกัดจากตัวตรวจสอบความถูกต้องตัวตรวจสอบความถูกต้องแต่ละตัวจะมีโทเค็นการแชร์ตัวตรวจสอบความถูกต้องของตัวเองเรามาเรียกโทเค็นที่แลกเปลี่ยนได้เหล่านี้ `VATIC` ให้กับตัวตรวจสอบความถูกต้อง`A`ทันทีที่ผู้ใช้ Delegate ให้ตัวตรวจสอบความถูกต้อง `A` จะมีการออก `VATIC` ตามอัตราแลกเปลี่ยนของคู่ `MATIC/VATIC`เมื่อผู้ใช้สะสมมูลค่าเพิ่มขึ้น อัตราแลกเปลี่ยนจะบ่งชี้ว่าตอนนี้ผู้ใช้สามารถถอน `MATIC` ได้มากขึ้นสำหรับทุกๆ `VATIC` และเมื่อผู้ใช้ถูก Slash ผู้ใช้จะถอน `MATIC` ได้น้อยลงสำหรับ `VATIC` ของพวกเขา

โปรดทราบว่า `MATIC` คือโทเค็น StakeDelegator ต้องมีโทเค็น `MATIC` เพื่อเข้าร่วมในการ Delegate

ในเบื้องต้น Delegator `D` ซื้อโทเค็นจากพูลเฉพาะของตัวตรวจสอบความถูกต้อง `A` เมื่อ `1 MATIC per 1 VATIC`

เมื่อตัวตรวจสอบความถูกต้องได้รับโทเค็น `MATIC` มากขึ้น จะมีการเพิ่มโทเค็นใหม่ลงในพูลเอาเป็นว่าด้วยการเพิ่มจำนวนพูลของ`100 MATIC`โทเค็นปัจจุบัน จะเพิ่ม`10 MATIC`รางวัลลงในพูลแต่เนื่องจากอุปทานโทเค็น `VATIC` ทั้งหมดไม่เปลี่ยนแปลงเนื่องจากรางวัล อัตราแลกเปลี่ยนจึงกลายเป็น `1 MATIC per 0.9 VATIC`ตอนนี้ตัวมอบหมาย`D`จะได้รับค่าใช้จ่ายเพิ่มเติม`MATIC`สำหรับหุ้นเดียวกัน

`VATIC`: โทเค็นการแชร์ตัวตรวจสอบความถูกต้องที่สร้างให้กับตัวตรวจสอบความถูกต้องโดยเฉพาะ (โทเค็น ERC20)

## ข้อมูลทางเทคนิค {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

คำนวณอัตราแลกเปลี่ยนดว้ยสูตรด้านล่าง:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## เมธอดส์และตัวแปร {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- โอน `_amount` ไปยัง StakeManager และอัปเดตโครงสร้างข้อมูลไทม์ไลน์สำหรับ Stake ที่ใช้งานอยู่
- ใช้ `updateValidatorState` เพื่ออัปเดต DS ของไทม์ไลน์
- การ Delegate `Mint` จะทำการแชร์โดยใช้ `exchangeRate` ปัจจุบันสำหรับ `_amount`
- ใช้ `amountStaked` เพื่อติดตาม Stake ที่ใช้งานอยู่ของแต่ละ Delegator เพื่อคำนวณรางวัลที่มีสภาพคล่อง

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- การใช้ปัจจุบัน`exchangeRate`และจำนวนหุ้นเพื่อคำนวณจำนวนรวม (เดิมพันที่ ใช้งาน+รีวอร์ด)
- `unBond`เดิมพันที่ทำงานจากตัวตรวจสอบความถูกต้องและโอนรีวอร์ดไปยังตัวมอบหมายหากมี
- ต้องลบ Stake ที่ใช้งานอยู่ออกจากไทม์ไลน์โดยใช้ `updateValidatorState` ใน stakeManger
- การแมป `delegators` ใช้เพื่อติดตาม Stakeในช่วงการถอน

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- สำหรับตัวแทน คำนวณผลตอบแทน และการโอน และขึ้นอยู่กับจำนวนการ`exchangeRate`เผาของหุ้นด้วย
- ตัวอย่าง: หากตัวมอบหมายมีหุ้น 100 และอัตราแลกเปลี่ยนมี 200 ดังนั้นจะได้รับ 100 โทเค็น โอนโทเค็น 100 ไปยังตัวแทนเดิมพันที่เหลืออยู่ที่ 100 ดังนั้นโดยใช้อัตราแลกเปลี่ยน 200 ตอนนี้จึงมีค่าเท่ากับ 50 หุ้นดังนั้นจึงเผาหุ้น 50ปัจจุบัน Delegator มี 50 หุ้นมูลค่า 100 โทเค็น (ซึ่งเขาได้ปัก/ ตัวไว้เบื้องต้น)

### การ Stake ใหม่ {#restake}

การคืนสามารถทำงานได้ในสองวิธี: ตัวมอบหมายสามารถซื้อหุ้นเพิ่มเติม`buyVoucher`โดยใช้รีเซ็ตรับรางวัล

```js
function reStake() public;
```

ใช้ฟังก์ชัน Overเพื่อรีวาร์ด Stakeจำนวนการแชร์ไม่ได้รับผลกระทบเพราะ `exchangeRate` เหมือนเดิม ดังนั้นจะย้ายเฉพาะรางวัลไปยัง Stake ที่ใช้งานอยู่สำหรับทั้งสัญญาการแชร์ตัวตรวจสอบความถูกต้องและไทม์ไลน์ stakeManager

`getLiquidRewards`ใช้สำหรับรางวัลที่สะสมเพื่อคำนวณค่าใช้จ่าย เช่น ตัวแทน มีหุ้น 100 ส่วน และอัตราแลกเปลี่ยนคือ 200 ดังนั้นรางวัลจึงเป็น 100 โทเค็นย้ายโทเค็น 100 ไปยังเดิมพันที่ใช้งานอยู่ เนื่องจากอัตราแลกเปลี่ยนยังเป็นจำนวนเดียวกันของแชร์จะยังคงเหมือนกันข้อแตกต่างเดียวคือปัจจุบัน โทเค็น 200 ถูกพิจารณาว่าเป็นเดิมพันที่ใช้งานและไม่สามารถถอนได้ทันที (ไม่ใช่ส่วนหนึ่งของรีวอร์ดเหลว)

จุดประสงค์ของการรับกลับคือ เนื่องจากตัวตรวจสอบความถูกต้องของตัวตรวจสอบความถูกต้องของมอบหมายมีเดิมพันที่ใช้งานมากขึ้น และจะได้รับรางวัลเพิ่มเติมสำหรับตัวมอบหมายก็จะเช่นกัน

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

เมื่อสิ้นสุดระยะเวลาการถอนแล้ว ผู้มอบหมายผู้ขายหุ้นของพวกเขาสามารถเรียกร้องโทเค็นของ MATIC ของตัวเองต้องโอนโทเค็นไปยังผู้ใช้

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- อัปเดต % ค่าคอมมิชชั่นสำหรับตัวตรวจสอบความถูกต้อง

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

เมื่อตัวตรวจสอบความถูกต้องได้รับรางวัลสำหรับเช็คพอยต์การจัดส่ง ฟังก์ชัน จะถูกเรียกให้สามารถจ่ายค่าเริ่มต้นของรางวัลระหว่างตัวตรวจสอบความถูกต้องและตัวแทน
