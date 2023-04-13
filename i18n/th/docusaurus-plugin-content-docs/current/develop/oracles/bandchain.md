---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain คือบล็อกเชนที่มีประสิทธิภาพสูงสร้างขึ้นเพื่อ Oracle เพื่อตรวจสอบข้อมูลจาก API ดั้งเดิม
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Band Protocol ช่วยให้คุณสามารถค้นหาข้อมูลจาก Web API แบบดั้งเดิมและใช้ในบล็อกเชนผู้พัฒนาสามารถทำการค้นหายผ่านทาง **BandChain, บล็อกเชนแบบโคส**สำหรับการอำนวยความสะดวกการร้องขอและการชำระเงิน จากนั้นใช้ข้อมูลบน dApp ผ่านการสื่อสารระหว่างระบบการรวมข้อมูล Oracle สามารถทำได้ใน 3 ขั้นตอนง่ายๆ:

1. **การเลือกสคริปต์ Oracle**

    สคริปต์ Oracle คือแฮชที่ระบุประเภทของข้อมูลที่จะขอจาก band-chain โดยเฉพาะหาสคริปต์เหล่านี้ได้[**ที่นี่**](https://guanyu-devnet.cosmoscan.io/oracle-scripts)ใช้สคริปต์เหล่านี้เป็นหนึ่งในพารามิเตอร์ ในขณะที่สร้างคำขอ Oracle

2. **การขอข้อมูลจาก BandChain**

สามารถทำได้ในสองวิธี:

    - **โดยใช้ผู้สำรวจ BandChain**

    คุณสามารถคลิกบนสคริปต์ของคิวลอเรลที่คุณเลือกได้ จากนั้นจากแท็บ **Everyday** ที่คุณสามารถส่งผ่านพารามิเตอร์และได้รับการตอบกลับจาก BandChainการตอบกลับจะประกอบด้วยผลลัพธ์และหลักฐาน evmต้องคัดลอกหลักฐานนี้ และจะใช้ในขั้นตอนสุดท้ายเอกสารของ BandChain สำหรับการค้นหารอราเคิลโดยใช้ผู้สำรวจมีให้เลือก[**ที่นี่**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer)

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    ตัวอย่างที่ให้ข้างต้นคือตัวอย่างในการสร้างคำขอของ oracle เพื่อให้ได้ค่าแบบสุ่มๆค่า 100 จะถูกส่งไปยัง`max_range`พารามิเตอร์ของคําขอ oracleเราได้รับแฮชในการตอบสนองการคลิกที่แฮชนี้จะแสดงรายละเอียดทั้งหมดของการตอบกลับให้เราทราบ

    - **โดยใช้ไลบรารี JS BandChain-Devnet**

    คุณสามารถค้นหาแบนด์เชนได้โดยตรงโดยใช้ไลบรารี BandChain-Devnetเมื่อค้นหา BandChain จะให้**หลักฐาน evm** ในการตอบสนองใช้หลักฐานนี้สำหรับขั้นตอนสุดท้ายของการรวม BandChainเอกสารของ BandChain สำหรับการค้นหารอราเคิลโดยใช้ไลร์ BandChain-Devnet มีอยู่[**ที่นี่**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library)เพย์โหลดคำขอสำหรับ Oracle ตัวเลขสุ่มจะมีลักษณะดังนี้ตรวจสอบให้แน่ใจว่าได้ส่งเนื้อหาคำขอในรูปแบบ application/json

3. **การใช้ข้อมูลในสัญญาอัจฉริยะ**

  ขั้นตอนสุดท้ายคือการปรับใช้สัญญาการตรวจสอบและจัดเก็บการตอบสนองจากคำขอ Oracle ลงในตัวแปรสถานะสัญญาการตรวจสอบเมื่อตั้งค่าตัวแปรสถานะเหล่านี้แล้ว จะสามารถเข้าถึงได้ตามที่และเมื่อ dapp ต้องการนอกจากนี้ ยังสามารถอัปเดตตัวแปรสถานะเหล่านี้ด้วยค่าใหม่ได้โดยการค้นหาสคริปต์ Oracle อีกครั้งจาก DAppด้านล่างเป็นสัญญาการตรวจสอบที่เก็บค่าตัวเลขสุ่มโดยใช้สคริปต์ Oracle ตัวเลขสุ่ม

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

เมื่อมีการใช้ ต้องผ่านพารามิเตอร์ 3 พารเตอร์**พารามิเตอร์แรก**คือค่า`codeHash`ซึ่งเป็นแฮชของสคริปต์ของ oracle**พารามิเตอร์ตัวที่สอง**คือคำขอพารามิเตอร์ของสคริปต์ของ oracleจะต้องถูกส่งผ่านในรูปแบบไบต์BandChain จัดเตรียม REST API สำหรับการแปลงอ็อบเจ็กต์ JSON พารามิเตอร์เป็นรูปแบบไบต์ดูรายละเอียด API ได้[**ที่นี่**](https://docs.bandchain.org/references/encoding-params)ต้องเติม 0x เข้าไปในการตอบสนองที่ได้รับจาก API นี้**พารามิเตอร์ตัวที่**สามคือที่อยู่สัญญาของสัญญา BandChain ซึ่งถูกส่งไปบนเครือข่าย Polygon แล้วBand Protocol รองรับ Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf

อีกสิ่งหนึ่งที่ต้องทราบคือสัญญาการตรวจสอบความถูกต้องควรนำเข้าไลบรารีและอินเทอร์เฟซผู้ช่วยให้ระบบซึ่งเรียกว่า `BandChainLib.sol`และ`IBridge.sol`ตามลำดับสามารถพบได้ในลิงก์ที่ต่อไปนี้: [**ไลบรารีบล็อกและ**](https://docs.bandchain.org/references/bandchainlib-library)อินเตอร์เฟซ [**IBridge**](https://docs.bandchain.org/references/ibridge-interface)

  เมื่อมีการปรับใช้สัญญาการตรวจสอบ จะสามารถเข้าถึงตัวแปรสถานะโดยการค้นหาจาก DAppสัญญาการตรวจสอบความถูกต้องหลายแบบสามารถสร้างขึ้นสำหรับสคริปต์ของ oracle ที่สร้างขึ้นแบบเดียวกันได้อินเทอร์เฟส IBridge มีวิธีการที่เรียกว่า ซึ่งตรวจสอบค่า`relayAndVerify()`ที่ได้รับการอัปเดตแต่ละครั้งในสัญญาการตรวจสอบความถูกต้อง`update()`วิธีการในสัญญาการตรวจสอบความถูกต้องมีตรรกาการเพื่ออัปเดตตัวแปรของสถานะการพิสูจน์ EVM ที่ได้รับจากการค้นหารูปแบบ oracle จะต้องถูกส่งไปยัง`update()`ขั้นตอนแต่ละครั้งเป็นค่าจะอัพเดท สัญญาแบบ BandChain ที่นำไปใช้บน Polygon จะตรวจสอบข้อมูลก่อนที่จะเก็บไว้ในตัวแปรของสัญญา

BandChain มีเครือข่ายของorges ที่สามารถใช้งานได้โดยระบบ dApps เพื่อเพิ่มตรรกาการของสัญญาอัจฉริยะเอกสารของ BandChain ในการส่งสัญญา จัดเก็บค่าและอัปเดตจะพบเอกสาร[**เหล่านี้ได้ที่นี่**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library)