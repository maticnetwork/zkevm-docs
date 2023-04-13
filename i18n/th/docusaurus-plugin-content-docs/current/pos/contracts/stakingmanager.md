---
id: stakingmanager
title: ตัวจัดการ Stake
description: ตัวจัดการการเทคคือสัญญาหลักสำหรับกิจกรรมที่เกี่ยวกับตัวตรวจสอบความถูกต้องบนเครือข่าย Polygon
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

สำหรับหลักฐานของคอนเซ็นต์ความปลอดภัยของ Polygon คือ การยืนยันการยืนยัน และจัดการสแต็กทั้งหมด จะได้รับการดำเนินการบนสัญญาอัจฉริยะ Ethereumการออกแบบทั้งหมดเป็นไปตามปรัชญาของการทำน้อยลงนี้บนสัญญา Mainnetโดยสามารถตรวจสอบข้อมูลและผลักดันการดำเนินการหนักทั้งหมดไปยัง L2 (อ่านเกี่ยวกับ [Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview) )

**ตัวStencils** จะแบ่งออกเป็น**ตัวตรวจสอบความถูกต้อง****, ตัวแทน** และตัว**ดู** (สำหรับรายงานการฉ้อโกง)

[**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) คือสัญญาหลักสำหรับกิจกรรมที่เกี่ยวข้องกับการจัดการตัวตรวจสอบความถูกต้องที่เกี่ยวข้อง`checkPoint`เช่นการยืนยันการแจกจ่ายเงิน และการจัดการเดิมพันด้วยเนื่องจากสัญญาจะใช้**ไอดีของ NFT** เพื่อเป็นแหล่งที่มาของการเป็นเจ้าของ การเปลี่ยนแปลงเจ้าของและเซ็นเซอร์จะไม่ส่งผลกระทบต่อสิ่งใดในระบบ

:::tip

จากที่อยู่ Ethereum ตัว**Stencils สามารถใช้ตัวตรวจสอบความถูกต้องหรือตัวแทน** (เป็นเพียงตัวเลือกการออกแบบไม่มีเหตุผลที่ยากมาก)

:::

## การขอรับการใช้งานแบบถูกต้อง / การแทนที่ {#validator-admissions-replacement}

### การสมัคร {#admissions}
ปัจจุบัน ไม่มีช่องตัวตรวจสอบความถูกต้องเปิดว่างบน Polygon PoSนอกจากนี้ยังมีรายการรอที่จะกลายเป็นตัวตรวจสอบความถูกต้องอีกด้วยในอนาคต หากสล็อตพร้อมใช้งาน ตัวตรวจสอบความถูกต้องอาจนำไปใช้กับการพิจารณาและลบออกจากรายการรอ


### การแทนที่ {#replacement}
IP4 แนะนำแนวคิดของประสิทธิภาพการตรวจสอบความถูกต้องสำหรับการมองเห็นของชุมชนหากตัวตรวจสอบความถูกต้องอยู่ในสถานะที่ไม่ต่อเนื่องสำหรับระยะเวลาขยายเนื่องตามที่ระบุไว้ใน IP4 ก็จะถูกลบออกจากเครือข่ายจากนั้นสล็อตตัวตรวจสอบความถูกต้องจึงสามารถใช้ได้กับผู้ที่ออกจากรายการรอ

:::info

ปัจจุบัน [<ins>เฟส 2 ของ พาร์ทC ใน PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24)นี่คือที่ที่ชุมชนตัดสินใจเกี่ยวกับเกณฑ์การประเมินผลแบบตัวตรวจสอบความถูกต้องสำหรับผู้ตรวจสอบความถูกต้องโดยในเวลา การฝึกนี้จะสร้างกระบวนการประยุกต์ใช้และสิทธิบัตร

:::

## เมธอดส์และตัวแปร {#methods-and-variables}

:::caution การดำเนินการการการตัด

`jail``unJail`, และ`slash`ฟังก์ชั่นไม่ได้ใช้ในขณะนี้เป็นส่วนหนึ่งของการดำเนินการตบตา

:::

### เครื่องมือเปิดตัวตรวจสอบความถูกต้อง {#validatorthreshold}

โดยเก็บจำนวนสูงสุดของตัวตรวจสอบความถูกต้องที่ยอมรับโดยระบบ จึงเรียกว่า ส็อต

### AccountStateRoot {#accountstateroot}

- สำหรับบัญชีต่าง ๆ ที่ทำบน Heimdall สำหรับตัวตรวจสอบความถูกต้องและตัวแทน จึงส่งรากของบัญชีขณะส่ง`checkpoint`ข้อมูล
- ใช้บัญชีผู้ใช้ ในขณะ`claimRewards`และ`unStakeClaim`

### เดิมพัน/ เดิมพันสำหรับ {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- อนุญาตให้ทุกคนที่มีจำนวนมาก (ในโทเค็น) มากกว่า `currentValidatorSetSize`หากน้อย`minDeposit`กว่า`validatorThreshold`
- ต้องโอน`amount+heimdallFee`, ทำให้ตัวตรวจสอบความถูกต้องเข้าสู่ระยะเวลาการประมูลสำหรับการประมูลสำหรับการประมูล. (เพิ่มเติมในส่วน Auction )
- `updateTimeLine`การอัปเดตโครงสร้างข้อมูลแบบพิเศษ ซึ่งช่วยให้ติดตามตัวตรวจสอบความถูกต้องที่ใช้งานและเดิมพันที่ใช้งานสำหรับจำนวนอีโปช/เช็คพอยต์ที่กำหนด
- หนึ่งเอกลักษณ์`NFT`จะถูกส่งขึ้นบนแต่ละสาย`stake`หรือ`stakeFor`สายใหม่ซึ่งสามารถโอนไปยังทุกคน แต่สามารถเป็นเจ้าของ Ethereum ได้
- `acceptDelegation`ตั้งค่าให้ตรงจริง หากตัวตรวจสอบความถูกต้องต้องการรับการมอบหมาย, จะถูกส่ง`ValidatorShare`สัญญาสำหรับตัวตรวจสอบความถูกต้อง

### ยกเลิก Stake {#unstake}

- ลบตัวตรวจสอบความถูกต้องออกจากชุดตัวตรวจสอบความถูกต้องในอีโปต์ถัดไป (ใช้ได้สำหรับเช็คพอยต์ปัจจุบันที่เรียกว่า`unstake`)
- ลบ Stake ของตัวตรวจสอบความถูกต้องออกจากโครงสร้างข้อมูลไทม์ไลน์ อัปเดตจำนวนสำหรับ Epoch การออกของตัวตรวจสอบความถูกต้อง
- หากตัวตรวจสอบความถูกต้องมีคณะผู้แทนอยู่ เก็บสัญญาตัวแทนและสัญญาตัวแทนการล็อคสำหรับการมอบหมายใหม่

### unStakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- `unstaking`หลังจากนั้น ตัวตรวจสอบความถูกต้องจะถูกนำไปใส่ระยะเวลาการถอนเพื่อให้สามารถเลื่อนได้ หากมีการฉ้อโกงใดๆ ที่พบ`unstaking`หลังจากนั้นสำหรับการทุจริตที่ผ่านมา
- เมื่อมีการกำหนด`WITHDRAWAL_DELAY`ระยะเวลาแล้ว ตัวตรวจสอบความถูกต้องสามารถเรียกฟังก์ชั่นนี้และจัดการการตั้งถิ่นฐานด้วย (`stakeManager`รับรางวัลหากมี จะได้รับโทเค็นกลับ การเผา NFT, ฯลฯ )

### การ Stake ใหม่ {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- อนุญาตให้ตัวตรวจสอบความถูกต้องเพิ่ม Stake โดยใส่จำนวนหรือรางวัลใหม่ หรือทั้งสองอย่าง
- ต้องอัปเดตไทม์ไลน์ (จำนวน) สำหรับการเดิมพันที่ใช้งานอยู่

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

วิธีนี้ช่วยให้ตัวตรวจสอบความถูกต้องสามารถในการถอนใบเสร็จที่สะสมต้องพิจารณาได้รับรางวัลจากสัญญาที่ได้รับการรับรองหากตัวตรวจสอบความถูกต้องยอมรับการมอบหมายตัวแทน

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

วิธีนี้ช่วยให้ตัวตรวจสอบความถูกต้องสามารถในการอัปเดตที่อยู่ผู้ลงนามได้ (ซึ่งใช้เพื่อตรวจสอบความถูกต้องบล็อกบนบล็อกของบล็อกของบล็อกและลายเซ็นเช็คพอยต์บน`stakeManager`)

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

ตัวตรวจสอบความถูกต้องสามารถเพิ่มยอดคงเหลือของพวกเขาสำหรับค่าธรรมเนียม Heimdall โดยกำลังออกคำสั่งด้วยวิธีนี้

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

ใช้วิธีนี้ใช้เพื่อกำจัดค่าธรรมเนียมจาก Heimdall `accountStateRoot`มีการอัปเดตบนเช็คพอยต์แต่ละครั้ง ตัวตรวจสอบความถูกต้องจึงสามารถให้หลักฐานการรวมในรากนี้สำหรับบัญชีบนค่าธรรมเนียม Heimdall และถอนค่าธรรมเนียมได้

โปรดทราบว่า`accountStateRoot`มีการเขียนใหม่เพื่อป้องกันการออกจากเช็คบนเช็คหลายจุด (สำหรับรากเก่าและบันทึกบัญชีบน`stakeManager`) `accumSlashedAmount`จะถูกใช้งานไม่ได้ในขณะนี้และจะใช้สำหรับการเลื่อนบน Heimdall หากจำเป็น

### StakingNFT {#stakingnft}

สัญญา ERC721 มาตรฐาน โดยมีข้อจำกัดไม่กี่ข้อ เช่น โทเค็นต่อผู้ใช้และลบด้วยลักษณะเลื่อมใสได้

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

เพื่อเริ่มประมูลหรือประมูลที่สูงขึ้นในการประมูลที่ใช้งานอยู่แล้ว จึงใช้ฟังก์ชันระยะเวลาการประมูลทำงานเป็นรอบเช่นเดียวกัน `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`จึง**ต้องตรวจสอบระยะเวลาการประมูลที่ถูกต้อง**

`perceivedStakeFactor`ใช้คำนวณตรวาการคำนวณตรวรกะแบบเป๊ะ*เดิมพันเก่า (โน้ตปัจจุบันใช้โดยปริยาย 1 WIP เพื่อเลือกฟังก์ชั่น)**ต้องตรวจสอบการประมูลจากช่วงการประมูลที่ผ่านมา หากยังมีอะไรเกิดขึ้น** (สามารถเลือกที่จะไม่`confirmAuction`เรียกเพื่อที่จะได้รับเงินทุนในการประมูลต่อไป)โดยทั่วไปการประมูลแบบอังกฤษอย่างต่อเนื่องจะดำเนินการ`auctionPeriod`ใน

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **ต้องตรวจสอบว่านี่ไม่ใช่ยุติ**
- หากผู้ประมูลคนสุดท้ายเป็นเจ้าของ`validatorId`ร้าน พฤติกรรมก็ควรจะคล้ายกับการรีเซกซ์ก่อน
- ในกรณีที่สอง ยกเลิกการ Stake `validatorId` และเพิ่มผู้ใช้ใหม่เป็นตัวตรวจสอบความถูกต้องจากเช็คพอยต์ถัดไป สำหรับผู้ใช้ใหม่ รูปแบบการทำงานจะคล้ายคลึงกับ stake/stakeFor

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- การเขียนมีไว้สำหรับสัญญา RootChain เท่านั้นเมื่อส่งเช็คพอยต์
- `voteHash` ว่าจะให้ตัวตรวจสอบความถูกต้องทั้งหมดลงนามที่ใด (ข้อตกลง BFT ⅔+1)
- ฟังก์ชันนี้จะตรวจสอบเฉพาะการลงนามที่ไม่ซ้ำกันและตรวจสอบอิทธิพลระดับ ⅔+1 ที่ลงนามบนต้นทางของเช็คพอยต์ (รวมอยู่ในการตรวจสอบความถูกต้อง `voteHash` ในสัญญา RootChain สำหรับข้อมูลทั้งหมด) `currentValidatorSetTotalStake` แสดง Stake ที่ใช้งานอยู่ในปัจจุบัน
- รีฟเวอร์ จะถูกแจกจ่ายตามสัดส่วนกับเดิมพันของตัวตรวจสอบความถูกต้องเพิ่มเติมเกี่ยวกับรางวัลใน[อีเวนต์แบบเดอีเวนต์ของรางวัล](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2)

### isValidator {#isvalidator}

ตรวจสอบหากตัวตรวจสอบความถูกต้องที่ให้เป็นตัวตรวจสอบความถูกต้องที่ทำงานสำหรับ ePoach ปัจจุบัน

## โครงสร้างข้อมูลไทม์ไลน์ {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

สัญญาล็อกเกอร์แบบกลางสำหรับอีเวนต์ตัวตรวจสอบความถูกต้องและคณะผู้แทนรวมฟังก์ชั่นในการอ่านเพียงไม่กี่แบบคุณสามารถตรวจสอบโค้ดต้นฉบับของ[สัญญา StingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) บน GitHub

## ValidatorShareFactory {#validatorsharefactory}

สัญญาของโรงงานเพื่อปรับใช้`ValidatorShare`สัญญาสำหรับตัวตรวจสอบความถูกต้องแต่ละตัวที่ opt-in สำหรับการมอบหมายงานคุณสามารถตรวจสอบโค้ดต้นฉบับของสัญญา [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) บน GitHub
