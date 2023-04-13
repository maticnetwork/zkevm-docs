---
id: truffle
title: ส่งสัญญาอัจฉริยะโดยใช้ Truffle
sidebar_label: Using Truffle
description:  ใช้ Truffle เพื่อปรับใช้สัญญาอัจฉริยะบน Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## ภาพรวม {#overview}

[ทรูฟเฟิล](https://trufflesuite.com/)คือสภาพแวดล้อมการพัฒนาบล็อกเชน ซึ่งคุณสามารถใช้เพื่อสร้างและทดสอบสัญญาแบบสมาร์ทได้โดยใช้อะหารเสมือน Ethereumคู่มือนี้มุ่งไปที่การสอนวิธีสร้างสัญญาอัจฉริยะโดยใช้ทรูฟเฟิล และติดตั้งบนเครือข่าย Polygon ที่รองรับ EVM

:::note

บทเรียนนี้เป็น[<ins>คู่มือเริ่มต้น</ins>](https://www.trufflesuite.com/docs/truffle/quickstart)แบบรวดเร็ว

:::

## สิ่งที่คุณจะทำ {#what-you-will-do}

- ติดตั้งและตั้งค่า Truffle
- การอัปโหลดสัญญาบนเครือข่าย Polygon
- ตรวจสอบสถานะการใช้งานบน Polygonscan

## ข้อกำหนดเบื้องต้น {#prerequisites}

มีข้อกำหนดทางเทคนิคบางประการก่อนที่เราจะเริ่มโปรดติดตั้งสิ่งต่อไปนี้:

- [Node.js v8+ LTS และ npm](https://nodejs.org/en/) (บรรจุด้วย Node)
- [Git](https://git-scm.com/)

เมื่อติดตั้งแล้ว เราใช้เพียงแค่คำสั่งเดียวก็สามารถติดตั้ง Truffle ได้:

```
npm install -g truffle
```

เพื่อตรวจสอบว่า Truffle ถูกติดตั้งอย่างถูกต้อง พิมพ์`truffle version`บนเทอร์มินัลหากเห็นข้อผิดพลาด โปรดตรวจสอบให้แน่ใจว่ามีการเพิ่มโมดูลของ npm ลงในพาธของคุณ

## การสร้างโปรเจกต์ {#creating-a-project}

### โปรเจกต์ MetaCoin {#metacoin-project}

เราจะใช้หนึ่งในต้นแบบของ Truffle ซึ่งคุณสามารถหาได้จากหน้า [Truffle Boxes](https://trufflesuite.com/boxes/)[MetaCoin Box](https://trufflesuite.com/boxes/metacoin/) จะสร้างโทเค็นที่สามารถโอนระหว่างบัญชีได้

1. เริ่มต้นด้วยการสร้างไดเร็กทอรีใหม่สำหรับโปรเจกต์ Truffle นี้:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. ดาวน์โหลด MetaCoin Box:

  ```bash
  truffle unbox metacoin
  ```

ด้วยขั้นตอนสุดท้าย คุณได้สร้างโครงการสำหรับโฟลเดอร์ที่เกี่ยวกับสัญญา การใช้งานการทดสอบและไฟล์การตั้งค่าแบบ Truffle

นี่คือข้อมูลสัญญาอัจฉริยะจากไฟล์ `metacoin.sol`:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

โปรดสังเกตว่าหลังจากชุดคำสั่ง `pragma` จะมีการนำเข้า ConvertLibในโปรเจกต์นี้ มีสัญญาอัจฉริยะสองสัญญาที่จะนำไปปรับใช้ในตอนท้าย: หนึ่งคือ Metacoin ซึ่งรวมลอจิกการส่งและยอดคงเหลือทั้งหมด อีกสัญญาหนึ่งคือ ConvertLib ซึ่งเป็นไลบรารีที่ใช้ในการแปลงค่า

:::

### การทดสอบสัญญา {#testing-the-contract}

คุณสามารถเรียกใช้การทดสอบของ Solidity และ Javascript

1. ในเทอร์มินัล ให้ทำการทดสอบ Solidity:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

คุณควรดูเอาต์พุตต่อไปนี้:

![img](/img/truffle/test1.png)

2. ทำการทดสอบ JavaScript:

  ```bash
  truffle test ./test/metacoin.js
  ```

คุณควรดูเอาต์พุตต่อไปนี้:

![img](/img/truffle/test2.png)

### การคอมไพล์สัญญา {#compiling-the-contract}

รวมสัญญาอัจฉริยะโดยใช้คำสั่งต่อไป:

```bash
truffle compile
```

คุณจะเห็นเอาต์พุตต่อไปนี้:

![img](/img/truffle/compile.png)

### การกำหนดค่าสัญญาอัจฉริยะ {#configuring-the-smart-contract}

ก่อนปรับใช้สัญญาจริง คุณต้องตั้งค่าไฟล์ `truffle-config.js` โดยแทรกข้อมูลเครือข่ายและคอมไพเลอร์

ไปยัง`truffle-config.js`และอัปเดตไฟล์ด้วยรายละเอียดเครือข่าย Magon Polygon

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

โปรดทราบว่าต้องใช้ระบบ nemonic เพื่อส่ง `maticProvider`สำหรับนี่คือวลีเชื้อสาย(หรือคีย์ส่วนตัว) สำหรับบัญชีที่คุณต้องการจะปรับใช้จากงานสร้างไฟล์ `.secret` ใหม่ในรูทไดเรกทอรี และป้อนวลีชุดคำศัพท์ 12 คำของคุณเพื่อเริ่มต้นเพื่อรับคำเชื้อสายจากกระเป๋าตางค์ MetaMask คุณสามารถไปที่การตั้งค่า MetaMask จากนั้นจากเมนู เลือก**ความปลอดภัยและ Privacy** ที่คุณจะได้เห็นปุ่มที่ระบุไว้ว่าจะ**เผยให้เห็นคำSeed**

### กำลังอัพโหลดบนเครือข่าย Polygon {#deploying-on-polygon-network}

เพิ่มMATIC ในกระเป๋าสตางค์ของคุณโดยใช้[ก๊อกน้ำ Polygon](https://faucet.polygon.technology/)ต่อไป, เรียกใช้คำสั่งนี้ในโฟลเดอร์รากของไดเรกทอรีโครงการ:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

`address``transaction_hash`โปรดจำไว้ว่ารายละเอียดที่กำหนด จะแตกต่างกันข้างบนนี้เป็นเพียงการให้แนวคิดเกี่ยวกับโครงสร้างเท่านั้น

:::

**ยินดีด้วย!คุณได้ส่งสัญญาอัจฉริยะโดยใช้ทรัฟเฟิลเรียบร้อยแล้ว**ตอนนี้คุณสามารถโต้ตอบกับสัญญาได้ และตรวจสอบสถานะการใช้งานบน [Polygonsan](https://mumbai.polygonscan.com/)
