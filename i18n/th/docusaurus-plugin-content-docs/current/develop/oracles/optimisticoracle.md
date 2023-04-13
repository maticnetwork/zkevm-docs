---
id: optimisticoracle
title: Optimistic Oracle ของ UMA
sidebar_label: UMA
description: Oracle ของ UMAช่วยให้สัญญาสามารถร้องขอได้อย่างรวดเร็วและรับข้อมูลประเภทใด
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Oracle ของ UMAช่วยให้สัญญาสามารถร้องขอได้อย่างรวดเร็ว และรับข้อมูลประเภทใด ๆ ระบบoracle ของ UMAจะประกอบด้วยส่วนประกอบหลักสององค์:

1. Optimistic Oracle
2. กลไกการตรวจสอบข้อมูล (Data Verification Mechanism - DVM)

## Optimistic Oracle {#optimistic-oracle}

**Oracle** ของ UMA ช่วยให้สัญญาสามารถร้องขอและได้รับข้อมูลราคาได้อย่างรวดเร็วOracle Optimistic ทำหน้าที่เป็นเกมเพิ่มขึ้นแบบทั่วไประหว่างสัญญาที่เริ่มต้นคำขอราคาและระบบแก้ไขความขัดแย้งของยูเอ็มที่รู้จักกันในนาม กลไกการตรวจสอบความถูกต้องของข้อมูล (DVM)

ราคาที่เสนอโดย Optimistic Oracle จะไม่มีการส่งไปยัง DVM เว้นแต่จะมีการโต้แย้งซึ่งช่วยให้สัญญาเพื่อรับข้อมูลราคาภายในความยาวที่กำหนดล่วงหน้าของเวลาที่กำหนดไว้โดยไม่ต้องเขียนราคาของสินทรัพย์บนเชน

## กลไกการตรวจสอบข้อมูล (Data Verification Mechanism - DVM) {#data-verification-mechanism-dvm}

หากมีการโต้แย้ง จะมีการส่งคำขอไปยัง DVMสัญญาทั้งหมดที่สร้างขึ้นบน UMA ใช้ DVM เป็นแนวป้องกันเพื่อแก้ไขข้อโต้แย้งข้อโต้แย้งที่ส่งไปยัง DMV จะได้รับการแก้ไขภายใน 48 ชั่วโมงหลังจากที่ผู้ถือโทเค็น UMA โหวตราคาของสินทรัพย์ในช่วงเวลาที่กำหนดสัญญาบน UMA ไม่จำเป็นต้องใช้ Optimistic Oracle เว้นแต่ว่าต้องการข้อมูลราคาของสินทรัพย์ภายใน 48 ชั่วโมง

กลไกการตรวจสอบข้อมูล (DVM) คือบริการแก้ไขข้อโต้แย้งสำหรับสัญญาที่สร้างบนโปรโตคอล UMADVM มีประสิทธิภาพเนื่องจากครอบคลุมองค์ประกอบของการพิจารณาของมนุษย์เพื่อให้แน่ใจว่าสัญญาได้รับการจัดการอย่างปลอดภัยและถูกต้องเมื่อเกิดปัญหาจากตลาดที่มีความผันผวน (และบางครั้งก็สามารถควบคุมได้)

## อินเทอร์เฟซ Optimistic Oracle {#optimistic-oracle-interface}

สัญญาทางการเงินหรือบุคคลภายนอกจะใช้ Optimistic Oracle เพื่อเรียกดูข้อมูลราคาเมื่อมีการขอราคาแล้ว ไม่ว่าใครก็สามารถเสนอราคาในการตอบกลับได้เมื่อเสนอแล้ว ราคาจะผ่านช่วงเวลาที่ใช้งานได้ซึ่งไม่ว่าใครก็สามารถโต้แย้งราคาที่เสนอและส่งราคาที่โต้แย้งไปยัง UMA DVM เพื่อทำการตัดสินได้

:::info

ส่วนนี้จะอธิบายว่าผู้เข้าร่วมแต่ละคนสามารถโต้ตอบกับ Optimistic Oracle ได้อย่างไรดูการปรับใช้ mainnet, kovan หรือ L2 ที่อัปเดตล่าสุดของสัญญา Optimistic Oracle ได้ใน[ที่อยู่การทำงานจริง](https://docs.umaproject.org/dev-ref/addresses)

:::

อินเทอร์เฟซ Optimistic Oracle ประกอบด้วย 12 เมธอด
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

ขอราคาใหม่ซึ่งต้องใช้สำหรับตัวระบุราคาที่ลงทะเบียนโปรดทราบว่าสัญญาทางการเงินส่วนใหญ่ที่ลงทะเบียนในระบบ UMA จะเรียกเมธอดนี้โดยอัตโนมัติ แต่ทุกคนก็สามารถเรียกใช้กับตัวระบุราคาที่ลงทะเบียนได้ตัวอย่างเช่น สัญญา Expiring Multiparty (EMP) จะเรียกเมธอดนี้เมื่อมีการเรียกเมธอด `expire`

พารามิเตอร์:
- `identifier`: ตัวระบุราคาที่ร้องขอ
- `timestamp`: การประทับเวลาของราคาที่ร้องขอ
- `ancillaryData`: ข้อมูลเสริมที่แสดงอาร์กิวเมนต์เพิ่มเติมที่มีการส่งไปพร้อมกับคำขอราคา
- `currency`: โทเค็น ERC20 ที่ใช้สำหรับการชำระเงินรางวัลและค่าธรรมเนียมต้องได้รับการอนุมัติให้ใช้กับ DVM
- `reward`: รางวัลที่เสนอให้กับผู้เสนอที่ประสบความสำเร็จผู้เรียกจะเป็นผู้จ่ายหมายเหตุ: พารามิเตอร์นี้สามารถเป็น 0 ได้

### proposePrice {#proposeprice}

เสนอมูลค่าราคาสำหรับคำขอราคาที่มีอยู่

พารามิเตอร์:
- `requester`: ผู้ส่งคำขอราคาเริ่มต้น
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ
- `proposedPrice`: ราคาที่กำลังเสนอ

### disputePrice {#disputeprice}

โต้แย้งมูลค่าราคาสำหรับคำขอราคาที่มีอยู่กับข้อเสนอที่ใช้งานอยู่

พารามิเตอร์:
- `requester`: ผู้ส่งคำขอราคาเริ่มต้น
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ

### settle {#settle}

ความพยายามที่จะตัดสินคำขอราคาที่ค้างอยู่จะกลับหากไม่สามารถแก้ไขได้

พารามิเตอร์:
- `requester`: ผู้ส่งคำขอราคาเริ่มต้น
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ

### hasPrice {#hasprice}

ตรวจสอบว่าคำขอนั้นๆ ได้รับการแก้ไขหรือได้รับการตัดสินแล้วหรือยัง (เช่น Optimistic Oracle มีข้อมูลราคาหรือไม่)

พารามิเตอร์:
- `requester`: ผู้ส่งคำขอราคาเริ่มต้น
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ

### getRequest {#getrequest}

รับโครงสร้างข้อมูลปัจจุบันที่มีข้อมูลทั้งหมดเกี่ยวกับคำขอราคา

พารามิเตอร์:
- `requester`: ผู้ส่งคำขอราคาเริ่มต้น
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ

### settleAndGetPrice {#settleandgetprice}

เรียกราคาที่ผู้เรียกร้องขอก่อนหน้านี้ซึ่งจะย้อนกลับ หากคำขอไม่ได้รับการตัดสินหรือไม่สามารถตัดสินได้หมายเหตุ: เมธอดนี้ไม่ใช่การดู ดังนั้นการเรียกนี้อาจตัดสินคำขอราคาได้จริง หากยังไม่ได้รับการแก้ไข

พารามิเตอร์:
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ

### setBond {#setbond}

กำหนดพันธบัตรข้อเสนอที่เชื่อมโยงกับคำขอราคา

พารามิเตอร์:
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ
- `bond`: จำนวนพันธบัตรที่กำหนดเองที่จะกำหนด

### setCustomLiveness {#setcustomliveness}

ตั้งค่าการใช้งานที่กำหนดเองสำหรับคำขอการใช้งานคือระยะเวลาที่ข้อเสนอต้องรอก่อนที่จะได้รับการแก้ไขโดยอัตโนมัติ

พารามิเตอร์:
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ
- `customLiveness`: การใช้งานที่กำหนดเองใหม่

### setRefundOnDispute {#setrefundondispute}

ตั้งค่าคำขอคืนเงินรางวัล หากข้อเสนอถูกโต้แย้งวิธีนี้สามารถช่วย "ป้องกันความเสี่ยง" ผู้เรียกในกรณีที่เกิดความล่าช้าจากข้อโต้แย้งหมายเหตุ: ในกรณีที่มีข้อโต้แย้ง ผู้ชนะยังคงได้รับพันธบัตรของอีกฝ่าย ดังนั้นจึงยังสามารถทำกำไรได้ แม้ว่าจะมีการเรียกคืนรางวัล

พารามิเตอร์:
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ

### disputePriceFor {#disputepricefor}

โต้แย้งคำขอราคากับข้อเสนอที่ทำงานอยู่ในนามของที่อยู่อื่นหมายเหตุ: ที่อยู่นี้จะได้รับรางวัลทั้งหมดจากการโต้แย้งนี้อย่างไรก็ตาม พันธบัตรใดๆ จะถูกดึงออกจากผู้เรียก

พารามิเตอร์:
- `disputer`: ที่อยู่ที่จะตั้งเป็นผู้โต้แย้ง
- `requester`: ผู้ส่งคำขอราคาเริ่มต้น
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ

### proposePriceFor {#proposepricefor}

เสนอมูลค่าราคาในนามของที่อยู่อื่นหมายเหตุ: ที่อยู่นี้จะได้รับรางวัลทั้งหมดที่มาจากข้อเสนอนี้อย่างไรก็ตาม พันธบัตรใดๆ จะถูกดึงออกจากผู้เรียก

พารามิเตอร์:
- `proposer`: ที่อยู่ที่จะตั้งเป็นผู้เสนอ
- `requester`: ผู้ส่งคำขอราคาเริ่มต้น
- `identifier`: ตัวระบุราคาเพื่อระบุคำขอที่มีอยู่
- `timestamp`: การประทับเวลาเพื่อระบุคำขอที่มีอยู่
- `ancillaryData`: ข้อมูลเสริมของราคาที่ร้องขอ
- `proposedPrice`: ราคาที่กำลังเสนอ

## การผสานรวม Optimistic Oracle {#integrating-the-optimistic-oracle}

การสาธิตนี้จะตั้งค่าสัญญา `OptimisticDepositBox` ซึ่งดูแลยอดคงเหลือโทเค็น ERC-20 ของผู้ใช้

บนบล็อกเชนเครือข่ายการทดสอบภายใน ผู้ใช้จะฝาก wETH (Wrapped Ether) เข้าในสัญญาและถอนออก wETH เป็นสกุลเงิน USDตัวอย่างเช่น หากผู้ใช้ต้องการถอน $10,000 USD of wETH, and the ETH/USD exchange rate is $2,000 พวกเขาจะถอน 5 wETH

* ผู้ใช้เชื่อมโยง `OptimisticDepositBox` กับหนึ่งในตัวระบุราคาที่เปิดใช้งานบน DVM

* ผู้ใช้ฝาก wETH ลงใน `OptimisticDepositBox` และลงทะเบียนด้วยตัวระบุราคา `ETH/USD`

* ขณะนี้ผู้ใช้สามารถถอน wETH ที่มียอดเป็นสกุลเงิน USD ออกจาก `DepositBox` ผ่านการเรียกสัญญาอัจฉริยะ ด้วย Optimistic Oracle ที่ให้การแสดงราคาบนเชนด้วยแนวคิดเชิงบวก

ในตัวอย่างนี้ ผู้ใช้จะไม่สามารถโอน weETH ที่มียอดเป็นสกุเงิน USB โดยไม่อ้างอิงฟีดราคา `ETH/USD` นอกเชนได้ดังนั้น Optimistic Oracle จึงช่วยผู้ใช้สามารถ "ดึง" ข้อมูลราคาอ้างอิงได้

คำขอราคาที่ส่งไปยัง Optimistic Oracle ต่างจากคำขอราคาไปยัง DVM ตรงที่สามารถทำการแก้ไขภายในกรอบเวลาการใช้งานที่ระบุ หากไม่มีข้อโต้แย้ง ซึ่งอาจสั้นกว่าระยะเวลาการโหวตของ DVM เป็นอย่างมากระยะเวลาการใช้งานสามารถกำหนดค่าได้ แต่โดยทั่วไปแล้ว จะใช้เวลาสองชั่วโมง เมื่อเทียบกับ 2-3 วันสำหรับการตัดสินผ่าน DVM

ปัจจุบันผู้ขอราคาไม่ต้องจ่ายค่าธรรมเนียมให้กับ DVMผู้ขอสามารถเสนอรางวัลให้กับผู้เสนอที่ตอบสนองคำขอราคา แต่มูลค่าของรางวัลได้รับการกำหนดเป็น `0` ในตัวอย่างนี้

ผู้เสนอราคาจะส่งพันธบัตรไปพร้อมกับราคาของพวกเขา ซึ่งจะได้รับคืนหากราคาไม่ถูกโต้แย้ง หรือหากการตัดสินข้อโต้แย้งเป็นไปตามข้อเสนอของผู้เสนอแต่ในทางตรงกันข้าม พันธบัตรนี้จะได้รับการนำไปใช้เพื่อชำระค่าธรรมเนียมขั้นสุดท้ายให้กับ DVM และจ่ายรางวัลให้กับผู้โต้แย้งที่ประสบความสำเร็จ

ในการสาธิต ผู้ขอไม่ต้องมีพันธบัตรเพิ่มเติมจากผู้เสนอราคา ดังนั้นยอดรวมพันธบัตรที่ส่งจะเท่ากับค่าธรรมเนียม weETH ท้ายสุด ซึ่งในปัจจุบันคือ 0.2 wETHดูรายละเอียดการนำไปใช้ได้ในฟังก์ชัน `proposePriceFor` ใน [สัญญา](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html) `OptimisticOracle`

## การเรียกใช้การสาธิต {#running-the-demo}

1. ตรวจให้แน่ใจว่าคุณได้ปฏิบัติตามขั้นตอนการตั้งค่าที่กำหนดไว้เบื้องต้นทั้งหมด[ที่นี่](https://docs.umaproject.org/developers/setup)แล้ว
2. เรียกใช้อินสแตนซ์ Ganache ภายใน (เช่น not Kovan/Ropsten/Rinkeby/Mainnet) ด้วย `yarn ganache-cli --port 9545`
3. ในอีกหน้าต่างหนึ่ง ให้ย้ายสัญญาโดยรันคำสั่งต่อไปนี้:

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. ในการปรับใช้ [สัญญา](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) `OptimisticDepositBox` และดำเนินการตามขั้นตอนการประมวลผลของผู้ใช้อย่างง่าย ให้เรียกใช้สคริปต์สาธิตต่อไปนี้จากรูทของพื้นที่เก็บข้อมูล:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

คุณควรเห็นเอาต์พุตต่อไปนี้:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## การอธิบายฟังก์ชันต่างๆ ของสัญญา {#explaining-the-contract-functions}

[โค้ดสัญญา](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)`OptimisticDepositBox`แสดงวิธีการโต้ตอบกับ Oracle

ฟังก์ชัน `constructor` จะรวมอาร์กิวเมนต์ `_finderAddress` สำหรับสัญญา `Finder` ของ UMA  ซึ่งเก็บรักษารีจิสทรีของที่อยู่ `OptimisticOracle` หลักประกันที่อนุมัติและรายการตัวระบุราคาที่อนุมัติ และที่อยู่สัญญาที่สำคัญอื่นๆ

ซึ่งช่วยให้ `constructor` ตรวจสอบว่าประเภทหลักประกันและตัวระบุราคาถูกต้อง และช่วยให้ `OptimisticDepositBox` ค้นหาและโต้ตอบกับ `OptimisticOracle` ในภายหลัง

ฟังก์ชัน `requestWithdrawal` รวมถึงการเรียกภายในไปยัง `OptimisticOracle` ที่ขอราคา `ETH/USD`เมื่อส่งคืนแล้ว ผู้ใช้จะสามารถเรียก `executeWithdrawal` เพื่อทำการถอนให้เสร็จสิ้น

มีข้อมูลและคำอธิบายเพิ่มเติมในคอมเม้นท์ของโค้ดดังนั้นโปรดดูว่าคุณสนใจการเรียนรู้เพิ่มเติม

## แหล่งข้อมูลเพิ่มเติม {#additional-resources}

แหล่งข้อมูลเพิ่มเติมเกี่ยวกับ UMA DVM มีดังนี้:

- [สถาปัตยกรรมทางเทคนิค](https://docs.umaproject.org/oracle/tech-architecture)
- [สถาปัตยกรรมทางเศรษฐกิจ](https://docs.umaproject.org/oracle/econ-architecture)
- [บล็อกโพสต์](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8)เกี่ยวกับการออกแบบ DVM ของ UMA
- [เอกสารไวท์เปเปอร์](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf)เกี่ยวกับการออกแบบ DVM ของ UMA
- [พื้นที่เก็บข้อมูลการวิจัย](https://github.com/UMAprotocol/research)สำหรับนโยบายค่าธรรมเนียมที่เหมาะสมที่สุด
- [พื้นที่เก็บข้อมูล UMIP ](https://github.com/UMAprotocol/UMIPs) สำหรับข้อเสนอด้านการกำกับดูแล
