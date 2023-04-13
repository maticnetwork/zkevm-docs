---
id: chainstack
title: ส่งสัญญาอัจฉริยะโดยใช้ Chainstack และ Founting
sidebar_label: Using Chainstack
description:  ใช้ Chainstack และ Founting เพื่อพัฒนาสัญญาอัจฉริยะบน Polygon
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## ภาพรวม {#overview}

ส่วนนี้นำคุณโดยการส่งสัญญา Hello World โดยใช้โปรแกรม [Chainstack](https://chainstack.com/build-better-with-polygon/) และ [Fountifying](https://github.com/gakonst/foundry/) บนเน็ตของ Polygon Mumbai

Chainstack ให้โครงสร้างพื้นฐานสำหรับแอปพลิเคชันที่ตั้งอยู่ Ethereum และบล็อกอื่นโดยรักษาโหนดและรับประกันการเชื่อมต่อของเขากับเครือข่าย และยังให้อินเทอร์เฟซเพื่อโต้ตอบกับ Mainet และเน็ตอีกด้วย

Foundry เป็นชุดเครื่องมือที่รวดเร็วสำหรับการพัฒนาแอปพลิเคชัน Ethereum ที่เขียนใน Rust โดยให้การทดสอบ ปฏิสัมพันธ์กับสัญญาอัจฉริยะ EVM การส่งธุรกรรม และรีฟฟ์ข้อมูลของบล็อกเชน

:::tip

หากคุณมีคําถามใด ๆ ให้เข้าถึงใน[<ins>เซิร์ฟเวอร์คอร์ด Chainstack</ins>](https://discord.com/invite/Cymtg2f7pX)

:::

## สิ่งที่คุณจะได้เรียนรู้ {#what-you-will-learn}

สร้างสัญญา Hello World โดยใช้ Chainstack เพื่อปรับใช้โหนด Polygon และ Foundry เพื่อปรับใช้สัญญา

## สิ่งที่คุณจะทำ {#what-you-will-do}

1. ปรับใช้โหนด Polygon โดยใช้ Chainstack
2. ตั้งค่า Foundry
3. สร้างสัญญาอัจฉริยะ
4. ปรับใช้สัญญาอัจฉริยะ

## ปรับใช้โหนด Polygon Mumbai {#deploy-a-polygon-mumbai-node}

คุณต้องใช้โหนดเพื่อปรับใช้สัญญาอัจฉริยะไปยังเครือข่าย blockเชนติดตามขั้นตอนด้านล่างเพื่อเพิ่มโหนดและเรียกใช้:

**ขั้นตอน1** →ลงชื่อด้วย[ชาวสแต็ค](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

**→ขั้นที่ 2** ทำตามคำแนะนำเกี่ยวกับวิธีการ[ปรับใช้โหนด Mabui](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)

![img](/img/chainstack/join-network.png)

**→ขั้นที่ 3** รับ[endpoint ของ HTTPS ที่ติดตั้ง](https://docs.chainstack.com/platform/view-node-access-and-credentials)แล้ว

## ติดตั้ง Foundry {#install-foundry}

Foundry เป็นชุดเครื่องมือพัฒนาเพื่อทำงานกับสัญญาอัจฉริยะเพื่อเริ่มต้นทำงาน คุณจำเป็นต้องติดตั้งภาษาการเขียนโค้ด Rust ก่อน

1. [ติดตั้ง Rust](https://www.rust-lang.org/tools/install)
1. [ติดตั้ง Foundry](https://github.com/gakonst/foundry/)

## เตรียมใช้งานกับ Foundry {#initialize-with-foundry}

เพื่อสร้างโปรเจ็กต์ต้นแบบ ไปที่ไดเรกทอรีการทำงานของคุณ และเรียกใช้:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## เติมเงินบัญชีของคุณ {#fund-your-account}

คุณจะต้องใช้บัญชีวอลเล็ตเพื่อปรับใช้สัญญาอัจฉริยะคุณสามารถใช้ [Metammas](https://metamask.io/) สำหรับสิ่งนั้นได้นอกจากนี้ คุณยังต้องชำระค่าแก๊สบนเครือข่าย เพื่อที่จะปรับใช้สัญญาเพียงคัดลอกที่อยู่กระเป๋าคุมข้อมูลของคุณและรับโทเค็น Mumbi MATIC [ผ่าน faucet](https://faucet.polygon.technology/)

## สร้างสัญญา Hello World {#create-the-hello-world-contract}

สร้าง `src/` ในโปรเจ็กต์ Foundry ที่เตรียมใช้งานแล้วใน `HelloWorld.sol`:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## ปรับใช้สัญญา {#deploy-the-contract}

ณ จุดนี้ คุณพร้อมแล้วที่จะปรับใช้สัญญาของคุณ:

* คุณมีโหนดของคุณเองบนเครือข่าย Polygon Mumbai ซึ่งคุณจะปรับใช้สัญญาผ่านเครือข่ายดังกล่าว
* คุณมี Foundry ที่คุณจะใช้เพื่อปรับใช้สัญญา
* คุณมีบัญชีที่ได้รับเงินที่จะปรับใช้สัญญา

ปรับใช้สัญญาโดยเรียกใช้:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

เอ้านี่

* CONTRACT_PATH - พาธไปยังไฟล์ `HelloWorld.sol` ของคุณ
* PRIVATE_KEY - คีย์ส่วนตัวจากบัญชีของคุณ
* HTTPS_ENDPOINT - [ตำแหน่งข้อมูลของโหนดของคุณ](https://docs.chainstack.com/platform/view-node-access-and-credentials)

ตัวอย่าง:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

คุณสามารถตรวจสอบการปรับใช้ของสัญญาบน [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/) ได้เสมอ โดยใช้แฮชที่สร้างขึ้นใหม่จากขั้นตอนสุดท้าย

:::

## ทดสอบสัญญา {#test-the-contract}

มีคำสั่ง `forge test` ในกรณีที่คุณต้องการตรวจสอบว่าสัญญาทำงานปกติหรือไม่Foundry มี[ตัวเลือก](https://book.getfoundry.sh/reference/forge/forge-test) (ค่าสถานะ) มากมายสำหรับการทดสอบที่มีความเฉพาะเจาะจงมากขึ้นดูเพิ่มเติมเกี่ยวกับการเขียนการทดสอบ การทดสอบขั้นสูง และคุณสมบัติอื่นๆ ใน[เอกสารของ Foundry](https://book.getfoundry.sh/forge/tests)

**ขอแสดงความยินดี คุณได้ส่งสัญญาอัจฉริยะ Hello World บน Polygon**

และดู [<ins>คำแนะนำ</ins>](https://docs.chainstack.com/tutorials/polygon/)และ[<ins>เครื่องมือ</ins>](https://docs.chainstack.com/operations/polygon/tools)ที่เกี่ยวข้องกับ Polygon เพิ่มเติมได้ที่เอกสารของ Chainstack
