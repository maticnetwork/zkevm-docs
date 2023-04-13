---
id: matic-to-ethereum
title: โอนข้อมูลจาก Polygon ไปยัง Ethereum
description: โอนสถานะหรือข้อมูลจาก Polygon ไปยัง Ethereum ผ่านสัญญา
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

กลไกการโอนข้อมูลจาก Polygon ไปยัง Ethereum นั้นแตกต่างจากการทำแบบเดียวกันสำหรับ Ethereum ไปยัง Polygon เล็กน้อย**ธุรกรรมเช็คพอยต์**ที่สร้างขึ้นโดยตัวตรวจสอบความถูกต้องบนเชน Ethereum จะใช้เพื่อบรรลุสิ่งนี้โดยพื้นฐานแล้ว จะเริ่มสร้างธุรกรรมบน Polygonขณะสร้างธุรกรรมนี้ จะต้องตรวจสอบให้แน่ใจว่า**มีการส่งอีเวนต์ออกมา** และ**บันทึกอีเวนต์มีข้อมูลที่เราต้องการโอน**จาก Polygon ไปยัง Ethereum

ในระยะเวลาหนึ่ง (ประมาณ 10-30 นาที) ธุรกรรมนี้คือการเช็ค-ชี้บนเชน Ethereum โดยตัวตรวจสอบความถูกต้องของตัวตรวจสอบความถูกต้องเมื่อผ่านเช็คพอยต์เรียบร้อยแล้ว จะสามารถส่งแฮชของธุรกรรมที่สร้างขึ้นบนเชน Polygon เป็นหลักฐานในสัญญา **RootChainManager** บนเชน Ethereumสัญญานี้ตรวจสอบความถูกต้องของธุรกรรม ตรวจสอบว่าธุรกรรมนี้รวมอยู่ในเช็คพอยต์ และสุดท้ายจะถอดรหัสบันทึกอีเวนต์จากธุรกรรมนี้

เมื่อระยะนี้สิ้นสุดลง เราสามารถใช้**ข้อมูลบันทึกอีเวนต์ที่ถอดรหัสเพื่อทำการเปลี่ยนแปลงใดก็ได้**ในสัญญาต้นทางที่ปรับใช้บนเชน Ethereum ได้สำหรับสิ่งนี้ เราจำเป็นต้องตรวจสอบให้แน่ใจด้วยว่า มีการทำการเปลี่ยนสถานะบน Ethereum เมื่อปลอดภัยเท่านั้นดังนั้น เราจึงใช้ประโยชน์จากสัญญา **Predicate** ซึ่งเป็นสัญญาประเภทพิเศษที่ทริกเกอร์ได้โดยสัญญา **RootChainManager** เท่านั้นสถาปัตยกรรมนี้ช่วยให้แน่ใจว่าการเปลี่ยนแปลงสถานะบน Ethereum จะเกิดขึ้นก็ต่อเมื่อธุรกรรมบน Polygon ผ่านเช็คพอยต์และมีการตรวจสอบความถูกต้องบนเชน Ethereum โดยสัญญา **RootChainManager**

# ภาพรวม {#overview}

- ธุรกรรมจะดำเนินการในสัญญาย่อยที่ปรับใช้บนเชน Polygon
- มีอีเวนต์เกิดขึ้นในธุรกรรมนี้ด้วยพารามิเตอร์ของ**อีเวนต์นี้รวมถึงข้อมูลที่ต้องโอน**จาก Polygon ไปยัง Ethereum
- ตัวตรวจสอบความถูกต้องบนเครือข่าย Polygon จะหยิบธุรกรรมนี้ขึ้นมาในระยะเวลาเฉพาะ (อาจจะ 10-30 นาที) ตรวจสอบความถูกต้องและ**เพิ่มไปยังเช็คพอยต์**บน Ethereum
- สร้างธุรกรรมเช็คพอยต์สร้างขึ้นในสัญญา **RootChain** และตรวจสอบการรวมเช็คพอยต์ได้โดยใช้[สคริปต์](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)นี้
- เมื่อการเพิ่มเช็คพอยต์เสร็จสิ้น จะสามารถใช้ไลบรารี **matic.js**  เพื่อเรียกฟังก์ชัน **exit** ของสัญญา **RootChainManager** และเรียกฟังก์ชัน **exit** โดยใช้ไลบรารี matic.js ดังที่แสดงใน[ตัวอย่าง](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js)นี้

- การเรียกใช้สคริปต์ ตรวจสอบการรวมแฮชธุรกรรม Polygon บนเชน Ethereum จากนั้นจึงเรียกฟังก์ชัน **exitToken** ของสัญญา [Predicate](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol)
- สิ่งนี้ทำให้มั่นใจได้ว่า **การเปลี่ยนแปลงสถานะของสัญญาเชนต้นทาง**เกิดขึ้นด้วยวิธีการที่**ปลอดภัย**เสมอและ**ผ่านสัญญา Predicate เท่านั้น**
- สิ่งสำคัญที่ควรทราบคือ  **การตรวจสอบความถูกต้องของแฮชธุรกรรม**จาก Polygon และ**การทริกเกอร์สัญญา Predicate** จะเกิดขึ้นใน**ธุรกรรมรายการเดียว** และทำให้มั่นใจได้ถึงความปลอดภัยของการเปลี่ยนแปลงสถานะใดๆ ในสัญญาต้นทาง

# การนำไปใช้ {#implementation}

นี่เป็นการสาธิตง่ายๆ ว่าสามารถถ่ายโอนข้อมูลจาก Polygon ไปยัง Ethereum ได้อย่างไรบทช่วยสอนนี้แสดงตัวอย่างการโอนค่า uint256 ข้ามเชนคุณสามารถโอนประเภทข้อมูลได้ แต่จำเป็นต้องเข้ารหัสข้อมูลเป็นไบต์แล้วปล่อยออกจากสัญญาย่อยซึ่งสุดท้ายแล้ว จะสามารถถอดรหัสที่สัญญาต้นทางได้

1. ขั้นแรกให้สร้างเชนต้นทางและสัญญาเชนย่อยตรวจสอบให้แน่ใจว่าฟังก์ชันที่ทำการเปลี่ยนแปลงสถานะส่งอีเวนต์ด้วยอีเวนต์นี้ต้องมีข้อมูลที่จะถ่ายโอนเป็นหนึ่งในพารามิเตอร์รูปแบบตัวอย่างของสัญญาย่อยและสัญญาต้นทางต้องมีลักษณะตามด้านล่างนี้นี่เป็นสัญญาเรียบง่ายที่มีตัวแปรข้อมูลซึ่งตั้งค่าโดยใช้ฟังก์ชัน setDataการเรียกฟังก์ชัน setData ปล่อยอีเวนต์ Dataจะอธิบายส่วนที่เหลือในสัญญาในส่วนถัดไปของบทช่วยสอนนี้

A. สัญญาย่อย

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. สัญญาต้นทาง

ส่งผ่าน `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f` นี้เป็นค่าสำหรับ `_predicate` ในตัวสร้างสัญญาต้นทาง

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. เมื่อปรับใช้สัญญาย่อยและสัญญาต้นทางบนเชน Polygon และ Ethereum ตามลำดับ จะต้องแมปสัญญาเหล่านี้โดยใช้บริดจ์ PoSการแมปนี้ช่วยให้มั่นใจได้ว่ามีการรักษาการเชื่อมต่อระหว่างสัญญาทั้งสองนี้ทั่วทั้งเชนสำหรับการแมปนี้ สามารถติดต่อทีม Polygon บน [Discord](https://discord.com/invite/0xPolygon)

3. สิ่งสำคัญประการหนึ่งที่ควรทราบคือ ในสัญญาต้นทาง จะมีตัวแก้ไข onlyPredicateขอแนะนำให้ใช้ตัวแก้ไขนี้เสมอ เพราะจะทำให้แน่ใจได้ว่ามีเพียงสัญญา Predicate เท่านั้นที่ทำการเปลี่ยนแปลงสถานะบนสัญญาต้นทางได้สัญญา Predicate เป็นสัญญาพิเศษที่ทริกเกอร์สัญญาต้นทางก็ต่อเมื่อธุรกรรมที่เกิดขึ้นบนเชน Polygon ได้รับการยืนยันโดย RootChainManager บนเชน Ethereum เท่านั้นซึ่งทำให้แน่ใจว่ามีการเปลี่ยนสถานะบนสัญญาต้นทางอย่างปลอดภัย

สำหรับการทดสอบการปรับใช้ข้างต้น เราสามารถสร้างธุรกรรมบนเชน Polygon โดยเรียกฟังก์ชัน **setData** ของสัญญาย่อยเราต้องรอ ณ จุดนี้ก่อนเช็คพอยต์เสร็จสิ้นตรวจสอบการรวมเช็คพอยต์โดยใช้[สคริปต์](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)นี้เมื่อเช็คพอยต์เสร็จสิ้น ให้เรียกฟังก์ชัน exit ของ RootChainManager โดยใช้ matic.js SDK

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

ดังที่แสดงในภาพหน้าจอด้านบน **txHash** หมายถึงแฮชของธุรกรรมสำหรับธุรกรรมที่เกิดขึ้นบนสัญญาย่อยที่ปรับใช้บนเชน Polygon

**logEventSignature** คือแฮช keccak-256 ของอีเวนต์ Dataนี่คือแฮชเดียวกันกับที่เราได้รวมไว้ในสัญญา Predicateดูรหัสสัญญาทั้งหมดที่ใช้สำหรับบทช่วยสอนนี้และสคริปต์  exit ได้[ที่นี่](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

เมื่อสคริปต์ exit เสร็จสิ้น จะสามารถค้นหาสัญญาต้นทางบนเชน Ethereum เพื่อตรวจสอบได้ว่าค่าของตัวแปร **data** ที่มีการตั้งค่าไว้ในสัญญาย่อยนั้นแสดงถึงตัวแปร **data** ของสัญญาต้นทางด้วยหรือไม่
