---
id: state-transfer
title: การโอนสถานะ
description: การโอนสถานะหรือข้อมูลได้อย่างง่ายดายจาก Ethereum ไปยัง Polygon
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

ตัวตรวจสอบความถูกต้อง Polygon ต่อเนื่องติดตามสัญญาบนเชน Ethereum ที่`StateSender`เรียกทุกครั้งที่สัญญาที่จดทะเบียนในเชน Ethereum เรียกสัญญานี้ สัญญาจะส่งอีเวนต์ออกมาผู้ตรวจสอบ Polygon ใช้อีเวนต์นี้เพื่อถ่ายทอดข้อมูลไปยังสัญญาอื่นบนเชน Polygonกลไก**การซิงค์แบบ State** นี้ใช้ในการส่งข้อมูลจาก Ethereum ไปยัง Polygon

นอกจากนี้ ตัวตรวจสอบความถูกต้องของ Polygon จะส่งแฮชแต่ละธุรกรรมบนเชน Polygon ตามพื้นฐานทั่วไปคุณสามารถใช้**เช็คพอยต์**นี้เพื่อตรวจสอบความถูกต้องของธุรกรรมใด ๆ ที่เกิดขึ้นบน Polygonเมื่อได้รับการยืนยันว่าธุรกรรมจะเกิดขึ้นบนเชน Polygon จึงสามารถใช้ระบบ Ethereum เพื่อดำเนินการที่เหมาะสมได้

สามารถใช้กลไก 2 แบบด้วยกันเพื่อเปิดใช้งานข้อมูลแบบสองทาง (สถานะ) ระหว่าง Ethereum และ Polygonเพื่อลบปฏิสัมพันธ์เหล่านี้ทั้งหมด คุณสามารถรับมรดกของเราโดยตรง (`FxBaseRootTunnel`บน Ethereum) และ (`FxBaseChildTunnel`บนสัญญา Polygon )

## สัญญาทันเนลต้นทาง {#root-tunnel-contract}

ใช้สัญญา `FxBaseRootTunnel` จาก[ที่นี่](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol)สัญญานี้ช่วยให้เข้าถึงฟังก์ชั่นต่อไปนี้:

- `function _processMessageFromChild(bytes memory data)`: นี่คือฟังก์ชั่นเสมือนที่ต้องนำมาใช้ในการดำเนินการในสัญญาซึ่งโดยเนื้อหา เพื่อจัดการข้อมูลที่ส่ง`ChildTunnel`จาก
- `_sendMessageToChild(bytes memory message)`: เรียกฟังก์ชันนี้ภายในโดยใช้ข้อมูลไบต์ใดๆ เป็นข้อความโดยจะส่งข้อมูลนี้ตามที่เป็นไปยังทันเนลย่อย
- `receiveMessage(bytes memory inputData)`: ต้องเรียกฟังก์ชั่นนี้เพื่อได้รับข้อความที่ส่ง`ChildTunnel`โดยต้องแสดงหลักฐานการทำธุรกรรมในรูปแบบ calldataสคริปต์ตัวอย่างที่เพื่อสร้างหลักฐานโดยใช้**ตัวอย่าง** Matic.js รวมอยู่ด้านล่างนี้

## สัญญาทันเนลย่อย {#child-tunnel-contract}

ใช้สัญญา `FxBaseChildTunnel` จาก[ที่นี่](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol)สัญญานี้ให้การเข้าถึงฟังก์ชันต่อไปนี้:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: นี่คือฟังก์ชั่นเสมือนที่ต้องใช้ตรรกาการเพื่อจัดการข้อความที่ส่งมาจาก`RootTunnel`ระบบ
- `function _sendMessageToRoot(bytes memory message)`: เรียกฟังก์ชันนี้ภายในเพื่อส่งข้อความไบต์ใดๆ ไปยังทันเนลต้นทาง

## ข้อกำหนดเบื้องต้น {#prerequisites}

- คุณต้องรับ`FxBaseRootTunnel`สัญญาในสัญญาแบบสืบทอดบน Ethereumตัวอย่างเช่น คุณสามารถทำตาม[สัญญา](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol)นี้เช่นเดียวกัน `FxBaseChildTunnel`สัญญาแบบรับมรดกในตัวลูกของคุณบน Polygonทำตาม[สัญญา](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol)นี้เพื่อใช้เป็นตัวอย่าง
- ในขณะที่กำลังใช้สัญญาเบื้องต้นของคุณบน
  - **Geerli Tesnet** ส่งที่อยู่`_checkpointManager`ของ 0**x**2890bA17E978480615e333b80928 `_fxRoot`และ **0x3d1d3E34f7fB6D26245E640E1c50710eFF15bA**

  - **Ethereum Maainnet** `_checkpointManager`คือ 0**x86e4dc95c7fbdb**52e33d563bdb0823894c287 `_fxRoot`และ 0**xf5e5D361b2ad62c541b87C45a0B9B018389a2**
- สำหรับการติดตั้ง**สัญญาเด็กบนเน็ตของ Mabui** ผ่าน **0xCf73231F28B7331BB3124B907840A94851f9f11** ตาม`_fxChild`ตัวสร้างเตอร์สำหรับ **Polygon Mainnet** `_fxChild`จะเป็น 0**x8397259c983751DAF4040079063935a111afa28**
- เรียก`setFxChildTunnel`บนอุโมงค์ต้นทางพร้อมที่อยู่ของอุโมงค์เด็กตัวอย่าง: [0x79cd30ace561a26258918b56ce098a08e0c707a80bbba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- เรียก`setFxRootTunnel`บนอุโมงค์เด็กที่ใช้งานพร้อมที่อยู่ของอุโมงค์ต้นทางตัวอย่าง: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2fc4b864d2b45a8b7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## ตัวอย่างสัญญาของบริดจ์การโอนสถานะ {#example-contracts-of-state-transfer-bridge}

- **สัญญา**: [ไดเรกทอรี](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)ของ Fx-Portal Github
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## การโอนสถานะจาก Ethereum → Polygon {#polygon}

- คุณต้องเรียกภายในใน`_sendMessageToChild()`สัญญาเบื้องต้นของคุณและส่งข้อมูลเพื่อส่งอาร์กิวเมนต์ไปยัง Polygonตัวอย่าง: [0x28705fcae757a0c8694bd167cb94a2696a0bc9645eb420cff96053764c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- ในสัญญาย่อยของคุณ ให้ใช้ฟังก์ชันเสมือน `_processMessageFromRoot()` ใน `FxBaseChildTunnel` เพื่อดึงข้อมูลจาก Ethereumข้อมูลจะได้รับโดยอัตโนมัติจากผู้รับสถานะเมื่อมีการซิงค์สถานะ

## การโอนสถานะจาก Polygon →อีthereum {#ethereum}

1. เรียก `_sendMessageToRoot()` ภายในสัญญาย่อยโดยใช้ข้อมูลเป็นพารามิเตอร์ที่จะส่งไปยัง Ethereumตัวอย่าง: [0x3cc9f7e675bb4f6af87e9947bf24c38cbfa0b933d8c98164a2f2b550e6a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

โปรดทราบว่าแฮชของธุรกรรมเนื่องจากจะถูกนำมาใช้เพื่อสร้างหลักฐานหลังจากที่รวมเข้าเป็นเช็คพอยต์

2. **Proof Generation เพื่อเสร็จสิ้นการออกจากห่วงโซ่ราก**: สร้างหลักฐานโดยใช้**แฮช**และ**เมสเวน_EVENT**เพื่อสร้างหลักฐาน, คุณสามารถใช้ API รุ่นหลักฐานที่เป็นเจ้าภาพจัดการโดย Polygon หรือคุณยังสามารถหมุนรุ่นหลักฐานของคุณเองได้โดยทำตามคำแนะนำ[ที่นี่](https://github.com/maticnetwork/proof-generation-api)

endpoint รุ่นพิสูจน์ความปลอดภัยมีให้เลือกใช้ Polygon มีใช้งาน[ที่นี่](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

ตัวอย่าง API สำหรับการใช้งานสำหรับ Maainnet และ Tesnet มีดังนี้:

→ [รุ่นพิสูจน์ของ Mubi Testnet](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [รุ่นของ Polygon Maainnet](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. นำ `_processMessageFromChild()` ไปใช้ในสัญญาต้นทางของคุณ

4. ใช้หลักฐานที่สร้างขึ้นเป็นอินพุตเข้าใน `receiveMessage()` เพื่อดึงข้อมูลที่ส่งจากทันเนลย่อยเข้าในสัญญาคุณตัวอย่าง: [0x436dcd50659bea715a09d9257295dc21290769daeeea7f0b66166e75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515)
