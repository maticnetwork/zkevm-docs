---
id: deposit-withdraw-event-pos
title: การติดตามอีเวนต์การฝากและเช็คพอยต์ - PoS
sidebar_label: Deposit and Checkpoint Event Tracking
description: "ติดตามจังหวะและความเร็วของธุรกรรมบน Polygon"
keywords:
  - docs
  - matic
  - deposit
  - checkpoint
image: https://matic.network/banners/matic-network-16x9.png
---

## สรุปสั้นๆ {#quick-summary}

ส่วนนี้ของข้อตกลงของเอกสารเกี่ยวกับการติดตามและตรวจสอบจังหวะและความเร็วของการดำเนินการที่เสร็จภายในระบบนิเวศ Polygonการฝากเข้าเครือข่าย (เมื่อเสร็จสิ้นกับสะพาน PoS ) โดยทั่วไปจะใช้ค่าเฉลี่ยประมาณ 22-30 นาที แต่เราเห็นกรณีที่ผู้ใช้งานแสวงหาดูรายงานความคืบหน้าแบบเรียลไทม์ในฐานะนักพัฒนา คุณยังอาจต้องการเพิ่ม UX ของแอปด้วยการตอบกลับผู้ใช้ทันทีในกรณีเหล่านี้ทั้งหมดส่วนนี้อาจมีประโยชน์

## อีเวนต์การฝาก {#deposit-events}

เมื่อมีการฝากโทเค็นจาก Ethereum ไปยัง Polygon กระบวนการที่เรียกว่ากลไกการซิงค์สถานะจะเข้ามามีบทบาท ซึ่งในที่สุดจะมินต์โทเค็นสำหรับผู้ใช้ในเชน Polygonกระบวนการนี้ใช้เวลาประมาณ 22-30 นาทีในการเกิดขึ้น ดังนั้น การรอรับอีเวนต์การฝากจึงมีความสำคัญมากในการสร้างประสบการณ์ผู้ใช้ที่ดีนี่คือสคริปต์ตัวอย่างที่สามารถนำไปใช้เพื่อติดตามอีเวนต์การฝากแบบเรียลไทม์ได้

### การติดตามอีเวนต์การฝากแบบเรียลไทม์โดยใช้การเชื่อมต่อเว็บซ็อกเก็ต {#realtime-deposit-event-tracking-using-a-web-socket-connection}

```jsx
const WebSocket = require("ws");
const Web3 = require("web3");

// For Mumbai
const ws = new WebSocket("wss://ws-mumbai.matic.today/");
// For Polygon mainnet: wss://ws-mainnet.matic.network/
const web3 = new Web3();
const abiCoder = web3.eth.abi;

async function checkDepositStatus(
  userAccount,
  rootToken,
  depositAmount,
  childChainManagerProxy
) {
  return new Promise((resolve, reject) => {
    ws.on("open", () => {
      ws.send(
        `{"id": 1, "method": "eth_subscribe", "params": ["newDeposits", {"Contract": "${childChainManagerProxy}"}]}`
      );

      ws.on("message", (msg) => {
        const parsedMsg = JSON.parse(msg);
        if (
          parsedMsg &&
          parsedMsg.params &&
          parsedMsg.params.result &&
          parsedMsg.params.result.Data
        ) {
          const fullData = parsedMsg.params.result.Data;
          const { 0: syncType, 1: syncData } = abiCoder.decodeParameters(
            ["bytes32", "bytes"],
            fullData
          );

          // check if sync is of deposit type (keccak256("DEPOSIT"))
          const depositType =
            "0x87a7811f4bfedea3d341ad165680ae306b01aaeacc205d227629cf157dd9f821";
          if (syncType.toLowerCase() === depositType.toLowerCase()) {
            const {
              0: userAddress,
              1: rootTokenAddress,
              2: depositData,
            } = abiCoder.decodeParameters(
              ["address", "address", "bytes"],
              syncData
            );

            // depositData can be further decoded to get amount, tokenId etc. based on token type
            // For ERC20 tokens
            const { 0: amount } = abiCoder.decodeParameters(
              ["uint256"],
              depositData
            );
            if (
              userAddress.toLowerCase() === userAccount.toLowerCase() &&
              rootToken.toLowerCase() === rootTokenAddress.toLowerCase() &&
              depositAmount === amount
            ) {
              resolve(true);
            }
          }
        }
      });

      ws.on("error", () => {
        reject(false);
      });

      ws.on("close", () => {
        reject(false);
      });
    });
  });
}

// Param1 - user address
// Param2 - contract address on main chain
// Param3 - amount deposited on main chain
// Param4 - child chain manager proxy address (0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa for mainnet)
checkDepositStatus(
  "0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C",
  "0x47195A03fC3Fc2881D084e8Dc03bD19BE8474E46",
  "1000000000000000000",
  "0xb5505a6d998549090530911180f38aC5130101c6"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

### การตรวจสอบการฝากสำเร็จในอดีตโดยการค้นหาบล็อกเชน {#historical-deposit-completion-check-by-querying-the-blockchain}

ใช้สคริปต์นี้เพื่อตรวจสอบว่ามีการฝากเงินบนเชนย่อยหรือไม่เชนหลักและเชนย่อยจะเพิ่มค่าของตัวแปรตัวนับทั่วไปบนทั้งสองเชนอย่างต่อเนื่องสัญญา [StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) ส่งอีเวนต์ที่มีค่าตัวนับค้นหาค่าตัวนับบนเชนย่อยได้จากสัญญา [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12)หากค่าเคาน์เตอร์บนเชนเด็กจะมากกว่าหรือเท่ากับเดียวกันกับโซ่หลัก จึงสามารถถือได้ว่าค่าฝากนั้นเสร็จเรียบร้อยแล้ว

```jsx
let Web3 = require("web3");

// For mainnet, use Ethereum RPC
const provider = new Web3.providers.HttpProvider(
  "https://goerli.infura.io/v3/API-KEY"
);
const web3 = new Web3(provider);

// For mainnet, use the Polygon mainnet RPC: <Sign up for a dedicated free RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.>
const child_provider = new Web3.providers.HttpProvider(
  "<insert Mumbai testnet RPC URL>" //Get a free RPC URL from https://rpc.maticvigil.com/ or other hosted node providers.
);

const child_web3 = new Web3(child_provider);

const contractInstance = new child_web3.eth.Contract(
  [
    {
      constant: true,
      inputs: [],
      name: "lastStateId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
  "0x0000000000000000000000000000000000001001"
);

async function depositCompleted(txHash) {
  let tx = await web3.eth.getTransactionReceipt(txHash);
  let child_counter = await contractInstance.methods.lastStateId().call();
  let root_counter = web3.utils.hexToNumberString(tx.logs[3].topics[1]);
  return child_counter >= root_counter;
}

// Param 1 - Deposit transaction hash
depositCompleted(
  "0x29d901174acd42d4651654a502073f3c876ff85b7887b2e2634d00848f6c982e"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

## อีเวนต์ของเช็คพอยต์ {#checkpoint-events}

### การติดตามสถานะเช็คพอยต์แบบเรียลไทม์ {#real-time-checkpoint-status-tracking}

ธุรกรรมทั้งหมดที่เกิดขึ้นบนเชน Polygon จะชี้ให้ไปยังเชน Ethereum ที่ช่วงเวลาที่บ่อยโดยตัวตรวจสอบความถูกต้องของเมเยอร์ครั้งนี้ใช้เวลาประมาณ 10 นาทีบน Mumbi และประมาณ 30 นาทีบน Polygon Mainnetเช็คพอยต์จะเกิดขึ้นบนสัญญาที่เรียกว่า การ`RootChainContract`จัดส่งบนเชน Ethereumใช้สคริปต์ต่อไปนี้เพื่อรอรับอีเวนต์การรวมเช็คพอยต์แบบเรียลไทม์

```js
const Web3 = require("web3");

// Ethereum provider
const provider = new Web3.providers.WebsocketProvider(
  "wss://goerli.infura.io/ws/v3/api-key"
);

const web3 = new Web3(provider);

// Sign up for a free dedicated RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.
const chil_provider = new Web3.providers.HttpProvider(
  "<insert Mumbai testnet RPC URL>"
);
const child_web3 = new Web3(chil_provider);

// txHash - transaction hash on Polygon
// rootChainAddress - root chain proxy address on Ethereum
async function checkInclusion(txHash, rootChainAddress) {
  let txDetails = await child_web3.eth.getTransactionReceipt(txHash);

  block = txDetails.blockNumber;
  return new Promise(async (resolve, reject) => {
    web3.eth.subscribe(
      "logs",
      {
        address: rootChainAddress,
      },
      async (error, result) => {
        if (error) {
          reject(error);
        }

        console.log(result);
        if (result.data) {
          let transaction = web3.eth.abi.decodeParameters(
            ["uint256", "uint256", "bytes32"],
            result.data
          );
          if (block <= transaction["1"]) {
            resolve(result);
          }
        }
      }
    );
  });
}

// Param1 - Burn transaction hash on child chain
// Param2 - RootChainProxy Address on root chain (0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287 for mainnet)
checkInclusion(
  "0x9d1e61d9daaa12fcd00fcf332e1c06fd8253a949b4f2a4741c964454a67ea943",
  "0x2890ba17efe978480615e330ecb65333b880928e"
)
  .then((res) => {
    console.log(res);
    provider.disconnect();
  })
  .catch((err) => {
    console.log(err);
  });
```

### การตรวจสอบการรวมเช็คพอยต์ในอดีตโดยการค้นหาบล็อกเชน {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

ซึ่งสามารถตรวจสอบได้โดยใช้ API ต่อไปนี้จำนวนบล็อกของธุรกรรมการเผาบนเชนเด็กจะต้องได้รับเป็นพารามิเตอร์สำหรับ Get API นี้

```js
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
