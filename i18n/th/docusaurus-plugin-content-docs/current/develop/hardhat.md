---
id: hardhat
title: ส่งสัญญาอัจฉริยะโดยใช้แฮทแบบ
sidebar_label: Using Hardhat
description: ใช้แฮดเพื่อปรับใช้สัญญาอัจฉริยะบน Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## ภาพรวม {#overview}

Hardhat คือสภาพแวดล้อมการพัฒนา Ethereum ที่ให้วิธีง่ายๆในการปรับใช้สัญญาอัจฉริยะ ทำการทดสอบและโค้ดโซริลด็อก ในท้องถิ่น

ในบทช่วยสอนนี้ คุณจะได้เรียนรู้วิธีตั้งค่า Hardhat และใช้งานเพื่อสร้าง ทดสอบ และปรับใช้สัญญาอัจฉริยะอย่างง่าย

### สิ่งที่คุณจะทำ {#what-you-will-do}

- ตั้งค่า Hardhat
- สร้างสัญญาอัจฉริยะอย่างง่าย
- คอมไพล์สัญญา
- ทดสอบสัญญา
- ปรับใช้สัญญา

## การจัดเตรียมสภาพแวดล้อมสำหรับการพัฒนา {#setting-up-the-development-environment}

มีข้อกำหนดทางเทคนิคบางประการก่อนที่เราจะเริ่มโปรดติดตั้งสิ่งต่อไปนี้:

- [Node.js v10+ LTS และ npm](https://nodejs.org/en/) (มาพร้อมโหนด)
- [Git](https://git-scm.com/)

เมื่อเราได้ติดตั้งแล้ว คุณต้องสร้างโปรเจ็กต์แบบน็อป โดยไปที่โฟลเดอร์ว่างโดย`npm init`ดำเนินการและทำตามคำแนะนำในการติดตั้ง Hardhatเมื่อโปรเจกต์ของคุณพร้อมแล้ว คุณควรเรียกใช้:

```bash
npm install --save-dev hardhat
```

เพื่อสร้างโปรเจ็ค Hardhat ของคุณ ทำงาน`npx hardhat`ในโฟลเดอร์โครงการของคุณมาสร้างโปรเจกต์ตัวอย่างและทำตามขั้นตอนเหล่านี้เพื่อลองงานตัวอย่าง และคอมไพล์ ทดสอบ และปรับใช้สัญญาตัวอย่าง

:::note

โครงการตัวอย่างที่ใช้ที่นี่มาจาก[<ins>ไกด์ Hardhat Quickstart</ins>](https://hardhat.org/getting-started/#quick-start) รวมทั้งคู่มือการใช้งานด้วย

:::

## การสร้างโปรเจกต์ {#creating-a-project}

เพื่อสร้างโครงการตัวอย่าง ให้`npx hardhat`ทำงานในโฟลเดอร์โครงการของคุณคุณควรเห็นพรอมต์ต่อไปนี้:

![img](/img/hardhat/quickstart.png)

เลือกโปรเจกต์ JavaScript และทำตามขั้นตอนเหล่านี้เพื่อคอมไพล์ ทดสอบ และปรับใช้สัญญาตัวอย่าง

### การตรวจสอบสัญญา {#checking-the-contract}

โฟลเดอร์ `contracts` มี `Lock.sol` ซึ่งเป็นสัญญาตัวอย่างที่ประกอบด้วยการล็อกดิจิทัลอย่างง่าย ซึ่งผู้ใช้สามารถถอนเงินได้หลังจากช่วงเวลาที่กำหนดไว้เท่านั้น

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### การตั้งค่าสัญญา {#setting-up-the-contract}

- ไปที่ `hardhat.config.js`
- อัปเดต `hardhat-config` ด้วย matic-network-credentials
- สร้างไฟล์ `.env` ในรูทเพื่อจัดเก็บคีย์ส่วนตัวของคุณ
- เพิ่มคีย์ Polygonscan API ลงในไฟล์ `.env` เพื่อยืนยันสัญญาบน Polygonscanคุณสามารถสร้างคีย์ API ได้โดย[การสร้างบัญชี](https://polygonscan.com/register)

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

โปรดทราบว่าไฟล์ด้านบนต้องใช้ DOTENV สำหรับการจัดการตัวแปรสภาพแวดล้อม รวมถึง Ether และ Etherscanตรวจสอบให้แน่ใจว่าได้ติดตั้งแพ็คเกจเหล่านั้นทั้งหมด

ดูคำแนะนำเพิ่มเติมเกี่ยวกับวิธีใช้ DOTENV ได้ที่[<ins>หน้านี้</ins>](https://www.npmjs.com/package/dotenv)

คุณสามารถปรับใช้บน MATIC (Polygon Mainet) ได้ หากคุณเปลี่ยนโพลีกอน_mumbai โดย MATIC

:::

### การคอมไพล์สัญญา {#compiling-the-contract}

ในการคอมไพล์สัญญา คุณต้องติดตั้ง Hardhat Toolbox ก่อน:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

จากนั้นก็แค่เรียกใช้เพื่อคอมไพล์:

```bash
npx hardhat compile
```

### การทดสอบสัญญา {#testing-the-contract}

ในการเรียกใช้การทดสอบกับ Hardhat คุณเพียงแค่ต้องพิมพ์โค้ดต่อไปนี้:

```bash
npx hardhat test
```

และนี่คือผลลัพธ์ที่คาดหวัง:

![img](/img/hardhat/test.png)

### กำลังอัพโหลดบนเครือข่าย Polygon {#deploying-on-polygon-network}

เรียกใช้คำสั่งนี้ในรูทของไดเรกทอรีโปรเจกต์:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

จะมีการปรับใช้สัญญาบน Mumbai Testnet ของ Matic และคุณสามารถตรวจสอบสถานะการใช้งานได้ที่นี่: https://mumbai.polygonscan.com/

**ขอแสดงความยินดี คุณได้ปรับใช้ Greeter Smart Contract สำเร็จแล้วตอนนี้คุณสามารถโต้ตอบกับสัญญาอัจฉริยะได้แล้ว**

:::tip ตรวจสอบสัญญาอย่างรวดเร็วบน Polygonscan

เรียกใช้คำสั่งต่อไปนี้เพื่อยืนยันสัญญาของคุณบน Polygonscan อย่างรวดเร็วทำให้ทุกคนสามารถเห็นซอร์สโค้ดของสัญญาที่ปรับใช้ได้ง่ายสำหรับสัญญาที่มีตัวสร้างที่มีรายการอาร์กิวเมนต์ที่ซับซ้อน โปรดดู[ที่นี่](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
