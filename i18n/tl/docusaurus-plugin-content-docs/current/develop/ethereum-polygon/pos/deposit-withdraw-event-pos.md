---
id: deposit-withdraw-event-pos
title: Pagsubaybay sa Deposit at Checkpoint Event - PoS
sidebar_label: Deposit and Checkpoint Event Tracking
description: "Subaybayan ang tiyempo at bilis ng mga transaksyon sa Polygon."
keywords:
  - docs
  - matic
  - deposit
  - checkpoint
image: https://matic.network/banners/matic-network-16x9.png
---

## Mabilis na Buod {#quick-summary}

Ang bahaging ito ng mga docs ay nakikipag-ugnayan sa pagsubaybay at pagsubaybay sa bilis at bilis ng mga transaksyon na ginagawa sa loob ng Polygon ecosystem. Karaniwang tumatagal ng average ang pagdedeposito sa network (kapag nagawa sa tulay ng POS) na 22-30 minuto ngunit nakita namin ang mga pagkakataon kung saan hinahanap ng mga gumagamit na makita ang mga ulat ng progreso ng real time time. Bilang developer, makabuuti kung i-augment mo ang UX ng app mo gamit instant feedback sa user. Sa lahat ng mga kasong ito, maaaring maging kapaki-pakinabang ang bahaging ito.

## Mga Kaganapan ng Deposito {#deposit-events}

Kapag naideposito ang isang token mula sa Ethereum papunta sa Polygon, nagsisimulang mangyari ang isang proseso na tinatawag na mekanismo ng pag-sync ng kalagayan na kalaunang mini-mint ang mga token para sa user sa Polygon chain. Tumatagal ang prosesong ito ng tungkol sa ~ 22-30 minuto na mangyari at samakatuwid ang pakikinig sa deposit event ay napakahalaga upang lumikha ng isang magandang karanasan ng user. Ito ay isang halimbawang script na maaaring gamitin upang subaybayan ang mga real time na kaganapan ng deposito.

### Pagsubaybay sa realtime na deposit event gamit ang isang web socket connection {#realtime-deposit-event-tracking-using-a-web-socket-connection}

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

### Makasaysayang pagsusuri sa pagkumpleto ng deposito sa pamamagitan ng pag-query sa blockchain. {#historical-deposit-completion-check-by-querying-the-blockchain}

Maaaring gamitin ang script na ito upang tingnan kung ang isang partikular na deposito ay nakumpleto na sa child chain o hindi. Ang main chain at ang child chain ay patuloy na dinaragdagan ang value ng isang pandaigdigang counter variable sa parehong chain. Naglalabas ang [StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) contract ng isang event  na mayroong counter value. Ang counter value sa child chain ay maaaring i-query mula sa [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12) contract. Kung ang halaga ng counter sa child chain ay mas malaki kaysa sa o katumbas ng parehong nasa main chain, maituturing na matagumpay na nakumpleto ang deposito.

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

## Mga Checkpoint Event {#checkpoint-events}

### Real-time na pagsubaybay sa status ng checkpoint {#real-time-checkpoint-status-tracking}

Lahat ng transaksyon na nangyayari sa polygon chain ay naka-checkpoint sa Ethereum chain sa madalas na pagitan ng oras ng mga validator. Sa pagkakataong ito ay nasa paligid ng 10 mins sa Mumbai at mga 30 mins sa Polygon Mainnet. Naganap ang checkpoint sa isang kontrata na tinatawag na `RootChainContract`deployed sa Ethereum chain. Maaaring gamitin ang sumusunod na script upang makinig sa mga real-time na checkpoint inclusion event.

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

### Makasaysayang checkpoint inclusion check sa pamamagitan ng pag-query sa blockchain. {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

Maaari itong i-check gamit ang sumusunod na API. Ang block number ng transaksyon ng burn sa chain ng bata ay kailangang ibigay bilang parameter sa GET API na ito.

```js
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
