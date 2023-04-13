---
id: deposit-withdraw-event-pos
title: ডিপোজিট এবং চেকপয়েন্ট ইভেন্ট ট্র্যাকিং - PoS
sidebar_label: Deposit and Checkpoint Event Tracking
description: "Polygon-এ লেনদেনের গতি-বিধি ট্র্যাক করুন।"
keywords:
  - docs
  - matic
  - deposit
  - checkpoint
image: https://matic.network/banners/matic-network-16x9.png
---

## ক্ষুদ্র সারাংশ {#quick-summary}

ডকসের এই বিভাগটি Polygon ইকোসিস্টেমের মধ্যে সম্পন্ন লেনদেনের গতি এবং গতি ট্র্যাকিং এবং পর্যবেক্ষণ করছে। নেটওয়ার্কে ডিপোজিট করতে (PoS ব্রিজ ব্যবহার করলে) সাধারণত 22-30 মিনিট সময়ের প্রয়োজন হয়ে থাকে। তবে আমরা দেখতে পেয়েছি অনেক ব্যবহারকারী রিয়েল টাইমে অগ্রগতির রিপোর্ট দেখতে চায়। একজন ডেভেলাপার হিসেবে, আপনি ব্যবহারকারীকে সঙ্গে সঙ্গে প্রতিক্রিয়া জানানোর মাধ্যমে আপনার অ্যাপের UX আরো উন্নত করতে পারেন। এই সব সব ক্ষেত্রে, এই বিভাগে দরকারী হতে পারে।

## ইভেন্ট ডিপোজিট করুন {#deposit-events}

Ethereum থেকে Polygon-এ কোনো টোকেন ডিপোজিট করা হলে স্টেট সিঙ্ক মেকানিজম নামক একটি প্রক্রিয়া সম্পাদিত হয়। এটি ব্যবহারকারীদের জন্য Polygon চেইনে টোকেন মিন্ট করে। এই প্রক্রিয়াটি ঘটতে প্রায় ~22-30 মিনিট সময় নেয় এবং তাই একটি ভাল ব্যবহারকারীর অভিজ্ঞতা তৈরি করতে ডিপোজিট ইভেন্ট শোনা খুবই গুরুত্বপূর্ণ। এটি একটি উদাহরণমূলক স্ক্রিপ্ট যা ব্যবহার করে রিয়েল টাইমে ডিপোজিটের ইভেন্টগুলো ট্র্যাক করা যাবে।

### ওয়েব সকেট সংযোগ ব্যবহার করে রিয়েলটাইম ডিপোজিট ইভেন্ট ট্র্যাকিং {#realtime-deposit-event-tracking-using-a-web-socket-connection}

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

### ব্লকচেইনে প্রশ্ন করে ঐতিহাসিক ডিপোজিট সম্পাদন পরীক্ষা {#historical-deposit-completion-check-by-querying-the-blockchain}

এই স্ক্রিপ্টটি ব্যবহার করে চাইল্ড চেইনে একটি নির্দিষ্ট ডিপোজিট সম্পন্ন হয়েছে কিনা তা পরীক্ষা যাবে। মেইন ও চাইল্ড দুটি চেইনই দুটি চেইনের গ্লোবাল কাউন্টার ভেরিয়েবলের মান বৃদ্ধি করে চলেছে। [StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) চুক্তি কাউন্টার মান থাকা একটি ইভেন্ট ইমিট করে। চাইল্ড চেইনের কাউন্টার মান [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12) চুক্তি থেকে প্রশ্ন করা যাবে। যদি চাইল্ড চেইনে কাউন্টার মান প্রধান চেইনে একই চেয়ে বেশি বা সমান হয়, তাহলে ডিপোজিট সফলভাবে সম্পন্ন হিসাবে বিবেচনা করা যেতে পারে।

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

## চেকপয়েন্ট ইভেন্ট {#checkpoint-events}

### রিয়েল-টাইম চেকপয়েন্ট স্ট্যাটাস ট্র্যাকিং {#real-time-checkpoint-status-tracking}

Polygon চেইনে যে সমস্ত লেনদেনে All া All া যা এই সময় মুম্বাইতে প্রায় 10 মিনিট এবং Polygon Mainnet-এ প্রায় 30 মিনিট আছে। চেকপয়েন্ট Ethereum চেইনে `RootChainContract`নিযুক্ত একটি চুক্তি উপর ঘটে। নিম্নলিখিত স্ক্রিপ্টটি ব্যবহার করে রিয়েল-টাইম চেকপয়েন্ট অন্তর্ভুক্তির ইভেন্টগুলো সম্পর্কে জানা যাবে।

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

### ব্লকচেইনে প্রশ্ন করে ঐহিহাসিক চেকপয়েন্ট অন্তর্ভুক্তি পরীক্ষা {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

নিম্নলিখিত API ব্যবহার করে এটি পরীক্ষা করা যেতে পারে। চাইল্ড চেইনে বার্ন লেনদেনের ব্লক নম্বর এই GET API-এ একটি প্যারামিটার হিসাবে দেওয়া উচিত।

```js
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
