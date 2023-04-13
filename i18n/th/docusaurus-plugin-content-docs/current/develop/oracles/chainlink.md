---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Chainlink คือเครือข่าย oracle แบบย่อยภายในที่สร้างบน Ethereum
keywords:
  - wiki
  - polygon
  - chainlink
  - oracle
  - decentralized
  - data
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Chainlink** ช่วยให้สัญญาของคุณสามารถ**เข้าถึงแหล่งข้อมูลภายนอก** ผ่านเครือข่าย oracle แบบย่อยสลายไม่ว่าสัญญาของคุณจะต้องมีผลการแข่งขันกีฬา สภาพอากาศล่าสุด หรือข้อมูลอื่นๆ ที่เปิดเผยต่อสาธารณะ Chainlink ก็มีเครื่องมือที่จำเป็นให้สัญญาคุณใช้

## ข้อมูลแบบไร้ตัวกลาง {#decentralized-data}

คุณสมบัติอันทรงพลังที่สุดของ Chainlink's ถูกถอดรหัสแล้ว การรวมแล้ว และพร้อมที่จะย่อยข้อมูลบนโซ่โดยส่วนใหญ่ของสกุลเงินดิจิทัลที่ได้รับการนิยมเหล่านี้เป็นที่รู้จักกันในนาม [**ป้อนข้อมูล Chainlink**](https://docs.chain.link/docs/using-chainlink-reference-contracts)

นี่คือตัวอย่างการทำงานของสัญญาที่ดึงราคาล่าสุดของ MATIC บน Mumbai Testnet มีหน่วยเป็น USD

ทั้งหมดที่คุณต้องทำคือเปลี่ยนที่อยู่[พร้อมที่อยู่ใดๆ ของแหล่งข้อมูล](https://docs.chain.link/docs/matic-addresses#config)ที่คุณต้องการ และคุณสามารถเริ่มข้อมูลที่ย่อยได้

```
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai Testnet
     * Aggregator: MATIC/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

## วงจรคำขอและการรับ {#request-and-receive-cycle}

วงจรคำขอและการรับของ Chainlink ช่วยให้สัญญาอัจฉริยะของคุณส่งคำขอไปยัง API ภายนอกใดๆ และใช้การตอบสนองในการนำไปใช้ สัญญาของคุณต้องนิยามสองฟังก์ชัน:

1. หนึ่งเพื่อ**ร้องขอข้อมูล**
2. อีกคนหนึ่งเพื่อ**รับการตอบสนอง**

เพื่อร้องขอข้อมูล สัญญาของคุณจะสร้าง`request`ออบเจ็กต์ซึ่งมอบให้กับoracleเมื่อ Oracle เข้าถึง API และแยกวิเคราะห์การตอบสนองแล้ว Oracle จะพยายามส่งข้อมูลกลับไปยังสัญญาของคุณโดยใช้ฟังก์ชัน callback ที่กำหนดไว้ในสัญญาอัจฉริยะของคุณ

## การใช้งาน {#uses}

1. **แหล่งข้อมูลของ Chainlink**

เหล่านี้คือจุดอ้างอิงข้อมูลที่รวบรวมอยู่แล้วบนเชน และคิวเคสต์ east และวิธีที่ถูกที่สุดในการรับข้อมูลจากโลกจริงปัจจุบันรองรับคู่สกุลเงินดิจิทัลและเงินเฟียตที่ได้รับความนิยมมากที่สุด

สำหรับการทำงานกับ Data Feeds ใช้[**ป้อนข้อมูลของ Polygon จาก**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon)เอกสารการเชื่อมต่อ

2. **ฟังก์ชัน Cainlink ตรวจสอบความถูกต้องที่เชื่อถือได้**

รับหมายเลขแบบสุ่มอย่างเพิ่มเติม ซึ่งหมายเลขแบบสุ่มจะรับประกันว่าเป็นแบบสุ่ม

สำหรับการทำงานกับ Chainlink VRF ใช้[**ที่อยู่ Polygon**](https://docs.chain.link/vrf/v2/subscription/supported-networks) VRF จาก[เอกสาร](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number) Chainlink

3. **สาย API Chainlink**

วิธีการปรับแต่งสัญญาอัจฉริยะของคุณเพื่อทำงานกับ APIS ดั้งเดิม และปรับแต่งเพื่อรับข้อมูลใดๆ ส่งคำขอใด ๆ ผ่านอินเทอร์เน็ต และอื่น ๆ

## ตัวอย่างโค้ด {#code-example}

ในการโต้ตอบกับ API ภายนอก สัญญาอัจฉริยะของคุณควรสืบทอดจาก [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol) ซึ่งเป็นสัญญาที่ออกแบบมาเพื่อให้การประมวลผลคำขอทำได้ง่ายโดยเปิดเผยโครงสร้างที่เรียกว่า `Chainlink.Request` ซึ่งสัญญาของคุณควรใช้เพื่อสร้างคำขอ API

คำขอนั้นควรกำหนดที่อยู่ oracle ไอดีงานค่าธรรมเนียม พารามิเตอร์อะแดปเตอร์ และลายเซ็นฟังก์ชั่นการเรียกในตัวอย่างนี้ จะมีการสร้างคำขอขึ้นในฟังก์ชัน `requestEthereumPrice`

นิยาม `fulfill` ให้เป็นฟังก์ชัน callback

```
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Polygon Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4";
        fee = 10 ** 16; // 0.01 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestBTCCNYPrice() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // NOTE: If this oracle gets more than 5 requests from this job at a time, it will not return.
        request.add("get", "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo");

       // Set the path to find the desired data in the API response, where the response format is:
       // {
       //     "Realtime Currency Exchange Rate": {
       //       "1. From_Currency Code": "BTC",
       //       "2. From_Currency Name": "Bitcoin",
       //       "3. To_Currency Code": "CNY",
       //       "4. To_Currency Name": "Chinese Yuan",
       //       "5. Exchange Rate": "207838.88814500",
       //       "6. Last Refreshed": "2021-01-26 11:11:07",
       //       "7. Time Zone": "UTC",
       //      "8. Bid Price": "207838.82343000",
       //       "9. Ask Price": "207838.88814500"
       //     }
       //     }
        string[] memory path = new string[](2);
        path[0] = "Realtime Currency Exchange Rate";
        path[1] = "5. Exchange Rate";
        request.addStringArray("path", path);

        // Multiply the result by 10000000000 to remove decimals
        request.addInt("times", 10000000000);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}
```

## โทเค็น LINK บน Polygon Mainnet {#mainnet-polygon-link-token}

เพื่อรับโทเค็น Mainet Polygon LinK จาก Ethereum Maainnet คุณต้องทำตามขั้นตอน 2

1. บริดจ์ LINK ของคุณโดยใช้ Plasma Bridge หรือ [PoS Bridge](https://wallet.polygon.technology/bridge)
2. แลกเปลี่ยน LINK สำหรับเวอร์ชัน ERC677 ผ่านทาง [Pegswap ซึ่งปรับใช้โดย Chainlink](https://pegswap.chain.link/)

Polygon Bridge นำ LINK เวอร์ชัน ERC20 มาใช้ แต่ LINK เป็น ERC677 ดังนั้นเราจึงต้องอัปเดตด้วยการแลกเปลี่ยนนี้

## ที่อยู่ {#addresses}

ขณะนี้มี Oracle ของ Chainlink เชิงดำเนินการเพียงไม่กี่ตัวบน Polygon Mumbai Testnetคุณสามารถเรียกใช้ Oracle ด้วยตัวเองได้ตลอดเวลาเช่นกัน และแสดงบน Chainlink Marketplace

* Oracle: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

เพื่อรับ LinK บน Tesnet ของ Mumbi มุ่งหน้าไปยัง[ก๊อกสำหรับ Polygon ที่นี่](https://faucet.polygon.technology/)

## API ที่รองรับ {#supported-apis}

วงจรคำขอและการรับของ Chainlink มีความยืดหยุ่นพอที่จะเรียก API สาธารณะใดๆ ก็ได้ ตราบใดที่พารามิเตอร์คำขอถูกต้องและทราบรูปแบบการตอบสนองตัวอย่างเช่น หากอ็อบเจ็กต์การตอบกลับจาก URL ที่เราต้องการดึงข้อมูลมีรูปแบบดังนี้: `{"USD":243.33}` ส่วนพาธนั้นก็เรียบง่าย: `"USD"`

หากมี API จะตอบด้วยวัตถุ JSON ที่ซับซ้อน พารามิเตอร์**ของพาธ**จะต้องระบุว่าจะรับข้อมูลที่ต้องการได้ที่ไหน โดยใช้สตริงแบบเดลีมสำหรับวัตถุที่ขัดข้องยกตัวอย่างเช่น พิจารณาการตอบกลับต่อไปนี้:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

จะต้องมีพาธต่อไปนี้: `"Prices.USD"`หากมีช่องว่างในสตริง หรือสตริงค่อนข้างยาว เราสามารถใช้ไลต์ที่แสดงในตัวอย่างข้างต้น ซึ่งเราส่งพวกเขาทั้งหมดเป็นอาร์เรย์แบบสตริง

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## ID งานมีไว้เพื่ออะไร {#what-are-job-ids-for}

คุณอาจสังเกตเห็นว่า[ตัวอย่าง](#code-example)ที่ใช้`jobId`พารามิเตอร์เมื่อสร้างคำของานประกอบด้วยลำดับคำสั่งที่กำหนดค่า Oracle ให้ทำงานใน[ตัวอย่างโค้ด](#code-example)ด้านบน สัญญาจะส่งคำขอไปยัง Oracle พร้อม ID งาน: `da20aae0e4c843f6949e5cb3f7cfe8c4`งานนี้มีการกำหนดค่าให้ทำดังต่อไปนี้:

* สร้างคำขอ GET
* แยกวิเคราะห์การตอบสนอง JSON
* คูณค่าดังกล่าวด้วย *x*
* แปลงค่าดังกล่าวเป็น `uint`
* ส่งไปยังเชน

นี่คือเหตุผลที่สัญญาของเราเพิ่ม URL, พาธของตำแหน่งที่จะค้นหาข้อมูลที่ต้องการในการตอบสนอง JSON และระยะเวลาลงในคำขอ โดยใช้ชุดคำสั่ง `request.add`สิ่งที่เรียกว่า Adapters ใน Oracle จะช่วยให้คำสั่งเหล่านี้ง่ายขึ้น

**ทุกคำขอที่ส่งไปยัง Oracle ต้องมี ID งานเฉพาะ**

นี่คือรายการของงานที่ Polygon Oracle ได้รับการกำหนดค่าให้เรียกใช้

| ชื่อ | ประเภทการคืนค่า | ID | อะแดปเตอร์ |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

ดูข้อมูลอ้างอิง API ของ Chainlink ฉบับสมบูรณ์ได้[ที่นี่](https://docs.chain.link/any-api/api-reference)
