---
id: deposit-withdraw-event-plasma
title: การติดตามอีเวนต์การฝากและเช็คพอยต์ - Plasma
sidebar_label: Deposit and Checkpoint Event Tracking
description:  "ติดตามอีเวนต์การฝากและเช็คพอยต์ในแบบเรียลไทม์"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

โปรดตรวจสอบ [เอกสาร Matic.js ล่าสุดเกี่ยวกับ Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/) เพื่อเริ่มต้น

## อีเวนต์การฝาก {#deposit-events}

เมื่อมีการฝากโทเค็นจาก Ethereum ไปยัง Polygon กระบวนการที่เรียกว่ากลไกการซิงค์สถานะจะเข้ามามีบทบาท ซึ่งในที่สุดจะมินต์โทเค็นให้กับผู้ใช้บนเชน Polygonกระบวนการนี้ใช้เวลาประมาณ 22-30 นาทีในการเกิดขึ้น ดังนั้น การรอรับอีเวนต์การฝากจึงมีความสำคัญมากในการสร้างประสบการณ์ผู้ใช้ที่ดีนี่คือสคริปต์ตัวอย่างที่สามารถนำไปใช้เพื่อติดตามอีเวนต์การฝากแบบเรียลไทม์ได้

### การติดตามอีเวนต์การฝากแบบเรียลไทม์โดยใช้การเชื่อมต่อเว็บซ็อกเก็ต {#realtime-deposit-event-tracking-using-a-web-socket-connection}

```jsx
const WebSocket = require("ws");
const _ = require("lodash");

// For Mumbai
const ws = new WebSocket("wss://ws-mumbai.matic.today/");
// For Polygon mainnet: wss://ws-mainnet.matic.network/

async function checkDepositStatus(user, token, childChain) {
  return new Promise((resolve, reject) => {
    ws.on("open", function open() {
      ws.send(
        `{"id": 1, "method": "eth_subscribe", "params": ["newDeposits", {"Contract": "${childChain}"}]}`
      );
      ws.on("message", function incoming(data) {
        var txData = _.get(JSON.parse(data), "params.result.Data", "");
        var userAddress = txData.substring(0, 64).replace(/^0+/, "0x");
        var contractAddress = txData.substring(65, 128).replace(/^0+/, "0x");

        if (
          user &&
          user.toLowerCase() === userAddress.toLowerCase() &&
          token &&
          token.toLowerCase() === contractAddress.toLowerCase()
        ) {
          console.log(data);
          resolve(true); // eslint-disable-line
        }
      });

      ws.on("close", () => {
        reject(false);
      });

      ws.on("error", () => {
        reject(false);
      });
    });
  });
}

// Param1 - user address
// Param2 - contract address on main chain
// Param3 - child chain address (0xD9c7C4ED4B66858301D0cb28Cc88bf655Fe34861 for mainnet)
checkDepositStatus(
  "0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C",
  "0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae",
  "0x1EDd419627Ef40736ec4f8ceffdE671a30803c5e"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

### การตรวจสอบการฝากสำเร็จในอดีตโดยการค้นหาบล็อกเชน {#historical-deposit-completion-check-by-querying-the-blockchain}

ใช้สคริปต์นี้เพื่อตรวจสอบว่ามีการฝากเงินบนเชนย่อยหรือไม่เชนหลักและเชนเด็กยังคงเพิ่มมูลค่าของตัวแปรการนับถอยหลังทั่วโลกบนโซ่ทั้งสองสัญญา [StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) ส่งอีเวนต์ที่มีค่าตัวนับค้นหาค่าตัวนับบนเชนย่อยได้จากสัญญา [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12)หากค่าเคาน์เตอร์บนเชนเด็กจะมากกว่าหรือเท่ากับเดียวกันกับโซ่หลัก จึงสามารถถือได้ว่าค่าฝากนั้นเสร็จเรียบร้อยแล้ว

```js
let Web3 = require("web3");

// For mainnet, use Ethereum RPC
const provider = new Web3.providers.HttpProvider(
  "https://goerli.infura.io/v3/API-KEY"
);
const web3 = new Web3(provider);

// For mainnet, use the Polygon mainnet RPC: <Sign up for a dedicated free RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.>
const child_provider = new Web3.providers.HttpProvider(
  "<insert Mumbai testnet RPC URL>" //get a free RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.
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

ธุรกรรมทั้งหมดที่เกิดขึ้นบนเชน Polygon จะชี้ให้ไปยังเชน Ethereum ในช่วงเวลาที่บ่อยโดยตัวตรวจสอบความถูกต้อง.ครั้งนี้ใช้เวลาประมาณ 10 นาทีบน Mumbai และ 30 นาทีบน Mainnetเช็คพอยต์เกิดขึ้นในสัญญาที่เรียกว่าสัญญา RootChain ที่ปรับใช้บนเชน Ethereumใช้สคริปต์ต่อไปนี้เพื่อรอรับอีเวนต์การรวมเช็คพอยต์แบบเรียลไทม์

```jsx
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

```
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
