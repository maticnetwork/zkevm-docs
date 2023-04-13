---
id: network-agnostics
title: Network Agnostic Transactions
sidebar_label: Network Agnostic Transactions
description: "รวม Network Agnostic Transactions ไว้ใน DApp ของคุณ"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## เป้าหมาย {#goal}

ทำธุรกรรมบนเชน Polygon โดยไม่ต้องเปลี่ยนผู้ให้บริการบน Metamask (บทช่วยสอนนี้เหมาะสำหรับผู้ให้บริการในเพจของ Metamask ซึ่งสามารถปรับเปลี่ยนเพื่อดำเนินการธุรกรรมจากผู้ให้บริการรายอื่นได้)

โดยเบื้องหลัง ผู้ใช้ลงนามในเจตนาที่จะทำธุรกรรม ซึ่งส่งต่อโดยผู้ส่งต่อเพื่อดำเนินการในสัญญาที่ปรับใช้บนเชน Polygon


## การเปิดใช้งานการทำธุรกรรมคืออะไร {#what-is-enabling-transaction-execution}

ตัวไคลเอนต์ที่ผู้ใช้เชื่อมต่อกับผู้ใช้ (เว็บเบราว์เซอร์ แอพมือถือ ฯลฯ ) ไม่เคยเชื่อมต่อกับบล็อกได้ แทนที่จะใช้โต้ตอบกับเซิร์ฟเวอร์ Reelayer ธรรมดา (หรือเครือข่ายของelayers) คล้ายกับ วิธีที่จีเอสเอ็น หรือโซลูชันธุรกรรม meta ใด ๆ ทำงานได้ (ดู: [Transaction: : A Mavertion](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590))

สำหรับการกระทำใดๆ ที่ต้องมีปฏิสัมพันธ์กับบล็อกเชน

- ไคลเอ็นต์ร้องขอลายเซ็นรูปแบบ EIP712 จากผู้ใช้
- ส่งลายเซ็นไปยังเซิร์ฟเวอร์ผู้ส่งต่อแบบธรรมดา (ควรมีการป้องกันการยืนยันตัวตน/สแปมที่เรียบง่าย หากใช้สำหรับการทำงานจริง หรือใช้ mexa sdk ของ biconomy: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk))
- ผู้ส่งต่อโต้ตอบกับบล็อกเชนเพื่อส่งลายเซ็นของผู้ใช้ไปยังสัญญาฟังก์ชันในสัญญาที่เรียกว่า `executeMetaTransaction` จะประมวลผลลายเซ็นและดำเนินการกับธุรกรรมที่ร้องขอ (ผ่านการเรียกภายใน)
- ผู้ส่งต่อจ่ายค่าแก๊สเพื่อทำให้ธุรกรรมเกิดขึ้นโดยไม่มีค่าใช้จ่าย🤑

## รวม Network Agnostic Transactions ไว้ใน DApp ของคุณ {#integrate-network-agnostic-transactions-in-your-dapp}

- เลือกระหว่าง biconomy/โหนดผู้ส่งต่ออย่างง่ายที่กำหนดเอง

  - สำหรับ biconomy ให้ตั้งค่า DApp จากแดชบอร์ดและบันทึก api-id และ api-key โปรดดู: [บทช่วยสอน: Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) หรือ [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **ขั้นตอน:**

    1. มาลงทะเบียนสัญญาของเรากับแดชบอร์ด biconomy กัน
       1. ไปที่[เอกสารเป็นทางการของ Biconomy](https://docs.biconomy.io/biconomy-dashboard)
       2. ขณะลงทะเบียน DApp ให้เลือก `Polygon Mumbai`
    2. คัดลอก `API key` เพื่อใช้ในส่วนหน้า
    3. และเพิ่มฟังก์ชัน `executeMetaTransaction` ใน Manage-Api และตรวจสอบให้แน่ใจว่าเปิดใช้งาน meta-tx(ตรวจสอบตัวเลือก "native-metatx")

  - หากคุณต้องการใช้อบีอีอีที่เองที่ส่งธุรกรรมเซ็นบนบล็อกเชน คุณสามารถอ้างอิงถึงโค้ดเซิร์ฟเวอร์ได้ที่นี่: [https://github.com/angelhotra/ETHOnline-Workshop/master/2-network-agnew-agnotic-tranfer](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- ตรวจสอบให้แน่ใจว่าสัญญาที่คุณต้องการโต้ตอบด้วยนั้นสืบทอดมาจาก `NativeMetaTransactions` - 👀 ดูฟังก์ชัน `executeMetaTransaction` คร่าวๆ ในสัญญา
- ลิงก์: [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



```jsx

let data = await web3.eth.abi.encodeFunctionCall({
    name: 'getNonce',
    type: 'function',
    inputs: [{
        name: "user",
        type: "address"
      }]
  }, [accounts[0]]);

  let _nonce = await web3.eth.call ({
    to: token["80001"],
    data
  });

  const dataToSign = getTypedData({
    name: token["name"],
    version: '1',
    salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
    verifyingContract: token["80001"],
    nonce: parseInt(_nonce),
    from: accounts[0],
    functionSignature: functionSig
  });

  const msgParams = [accounts[0], JSON.stringify(dataToSign)];

  let sig = await eth.request ({
    method: 'eth_signTypedData_v3',
    params: msgParams
  });

  ```


- เมื่อคุณมีผู้ส่งต่อและการตั้งค่าสัญญาแล้ว ไคลเอ็นต์จำเป็นต้องสามารถดึงลายเซ็นรูปแบบ EIP712 และเรียก API ด้วยพารามิเตอร์ที่จำเป็น

refs[:/github.com/angelhotra/ETHOnline-Workshop/bob/6b615b8a4ef053c17729c7215725303c8e1b/2-network-agnostic-transign.js#L47](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

    ```jsx

    let data = await web3.eth.abi.encodeFunctionCall({
        name: 'getNonce',
        type: 'function',
        inputs: [{
            name: "user",
            type: "address"
          }]
      }, [accounts[0]]);

      let _nonce = await web3.eth.call ({
        to: token["80001"],
        data
      });

      const dataToSign = getTypedData({
        name: token["name"],
        version: '1',
        salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
        verifyingContract: token["80001"],
        nonce: parseInt(_nonce),
        from: accounts[0],
        functionSignature: functionSig
      });
      const msgParams = [accounts[0], JSON.stringify(dataToSign)];

      let sig = await eth.request ({
        method: 'eth_signTypedData_v3',
        params: msgParams
      });
    ```

เรียก [API ref: https://github.com/angelhotra/ETHOnline-Workshop/blob/6b615b8a4ef053c17729c7215725303c8e1b/2-network-agne-agnostic-transign.js#L110](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

    ```jsx
    const response = await request.post(
        'http://localhost:3000/exec', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    หากใช้ Biconomy ควรเรียกรายการต่อไปนี้:

    ```jsx
    const response = await request.post(
        'https://api.biconomy.io/api/v2/meta-tx/native', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    โดยที่ `txObj` ควรมีลักษณะดังนี้:

    ```json
    {
        "to": "0x2395d740789d8C27C139C62d1aF786c77c9a1Ef1",
        "apiId": <API ID COPIED FROM THE API PAGE>,
        "params": [
            "0x2173fdd5427c99357ba0dd5e34c964b08079a695",
            "0x2e1a7d4d000000000000000000000000000000000000000000000000000000000000000a",
            "0x42da8b5ac3f1c5c35c3eb38d639a780ec973744f11ff75b81bbf916300411602",
            "0x32bf1451a3e999b57822bc1a9b8bfdfeb0da59aa330c247e4befafa997a11de9",
            "27"
        ],
        "from": "0x2173fdd5427c99357ba0dd5e34c964b08079a695"
    }
    ```

- หากคุณใช้ API แบบกำหนดเอง จะดำเนินการกับฟังก์ชัน `executeMetaTransaction` ในสัญญา:

(ref: [https://github.com/angelhotra/ETHOnline-Workshop/blob/6b615b8a4e53c17729c7215725303c8e1b/2-network-agne-agnostic-transfver/server/index.js#L40)](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

    ```jsx
    try {
        let tx = await contract.methods.executeMetaTransaction(
          txDetails.from, txDetails.fnSig, r, s, v
        ).send ({
          from: user,
          gas: 800000
        })
        req.txHash = tx.transactionHash
      } catch (err) {
        console.log (err)
        next(err)
      }
    ```

    หากกำลังใช้ biconomy การเรียกฝั่งไคลเอ็นต์จะมีลักษณะดังนี้:

    ```jsx
    // client/src/App.js
    import React from "react";
    import Biconomy from "@biconomy/mexa";

    const getWeb3 = new Web3(biconomy);
    biconomy
        .onEvent(biconomy.READY, () => {
          // Initialize your dapp here like getting user accounts etc
          console.log("Mexa is Ready");
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa
    			console.error(error);
        });

    /**
    * use the getWeb3 object to define a contract and calling the function directly
    */

    ```
