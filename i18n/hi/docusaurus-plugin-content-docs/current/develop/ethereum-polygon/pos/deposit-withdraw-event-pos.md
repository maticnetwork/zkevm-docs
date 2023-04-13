---
id: deposit-withdraw-event-pos
title: डिपॉज़िट करना और चेकपॉइंट इवेंट को ट्रैक करना - PoS
sidebar_label: Deposit and Checkpoint Event Tracking
description: "पॉलीगॉन पर ट्रांज़ैक्शन के पेस और स्पीड को ट्रैक करें."
keywords:
  - docs
  - matic
  - deposit
  - checkpoint
image: https://matic.network/banners/matic-network-16x9.png
---

## झटपट वाला सारांश {#quick-summary}

डॉस का यह सेक्शन पॉलीगॉन इकोसिस्टम के भीतर किए गए transactions the की गति और गति को ट्रैक और निगरानी करता है. नेटवर्क में  डिपॉज़िट करने में (जब पॉस ब्रिज के साथ किया जाता है) आम तौर पर औसतन 22-30 मिनट लगते हैं, लेकिन हमने ऐसे उदाहरण देखे हैं जहाँ यूज़र प्रगति की रियल टाइम रिपोर्ट देखना चाहते हैं. डेवलपर के रूप में, आप भी यूज़र के तत्काल फ़ीडबैक के साथ अपनी ऐप के UX को बढ़ाना चाहते हैं. इन सभी मामलों में, यह सेक्शन उपयोगी हो सकता है.

## डिपॉज़िट करने के इवेंट {#deposit-events}

जब एथेरेयम से पॉलीगॉन में टोकन डिपॉज़िट किया जाता है, तो स्टेट सिंक मैकेनिज्म नाम की प्रक्रिया वहाँ काम करती है जहाँ अंततः पॉलीगॉन चेन पर यूज़र के लिए टोकन बनाए जाते हैं. इस प्रक्रिया में लगभग 22-30 मिनट लगते हैं, इसलिए यूज़र को एक अच्छा अनुभव देने के लिए डिपॉज़िट इवेंट्स को सुनना बहुत ज़रूरी है. यह एक उदाहरण के तौर पर दी गई स्क्रिप्ट है जिसका इस्तेमाल रियल टाइम में डिपॉज़िट करने के इवेंट्स को ट्रैक करने के लिए किया जा सकता है.

### एक वेब सॉकेट कनेक्शन को इस्तेमाल करके रियल टाइम में डिपॉज़िट करने के इवेंट को ट्रैक करना {#realtime-deposit-event-tracking-using-a-web-socket-connection}

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

### हिस्टोरिकल डिपॉज़िट के पूरा होने की जाँच करने के लिए ब्लॉकचेन पर क्वेरी करना {#historical-deposit-completion-check-by-querying-the-blockchain}

इस स्क्रिप्ट का इस्तेमाल यह जाँचने के लिए किया जा सकता है कि एक विशेष डिपॉज़िट को चाइल्ड चेन पर पूरा किया गया है या नहीं. मुख्य चेन और चाइल्ड चेन, दोनों चेन पर एक ग्लोबल काउंटर वेरिएबल की वैल्यू को बढ़ाते हैं. [StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) कॉन्ट्रैक्ट एक ऐसा इवेंट निकालता है जिसके पास काउंटर वैल्यू होती है. चाइल्ड चेन पर काउंटर वैल्यू के लिए [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12) कॉन्ट्रैक्ट से क्वेरी की जा सकती है. अगर चाइल्ड चेन पर काउंटर वैल्यू मुख्य चेन पर समान या बराबर है, तो जमा को सफलतापूर्वक पूरा किया जा सकता है.

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

## चेकपॉइंट इवेंट {#checkpoint-events}

### रियल-टाइम चेकपॉइंट के स्टेटस को ट्रैक करना {#real-time-checkpoint-status-tracking}

पॉलीगॉन चेन पर होने वाले सभी transactions transactions को वैलिडेटर्स द्वारा समय के लगातार अंतराल पर Ethereum चेन की ओर जांच-पड़ताल किया जाता है. यह बार मुंबई पर 10 मिनट और पॉलीगॉन मैनेट पर लगभग 30 मिनट का है चेकपॉइंट Ethereum चेन पर `RootChainContract`तैनात कॉन्ट्रैक्ट पर होता है. निम्नलिखित स्क्रिप्ट को रियल-टाइम चेकपॉइंट में शामिल इवेंट्स को सुनने के लिए इस्तेमाल किया जा सकता है.

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

### ब्लॉक चेन पर क्वेरी करके हिस्टोरिकल चेकपॉइंट के शामिल होने की जाँच करें {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

इसे निम्नलिखित API का इस्तेमाल करके जाँचा जा सकता है. चाइल्ड चेन पर बर्न transaction the की ब्लॉक नंबर को इस Get API के लिए पैरामीटर के रूप में दिया जाना चाहिए.

```js
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
