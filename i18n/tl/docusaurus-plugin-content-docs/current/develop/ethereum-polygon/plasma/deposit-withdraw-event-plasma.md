---
id: deposit-withdraw-event-plasma
title: Pagsubaybay sa Kaganapan ng Deposito at Checkpoint - Plasma
sidebar_label: Deposit and Checkpoint Event Tracking
description:  "Subaybayan ang mga real-time na kaganapan ng deposito at checkpoint."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Pakitingnan ang pinakabagong [dokumentasyon ng Matic.js sa Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/) upang makapagsimula.

## Mga Kaganapan ng Deposito {#deposit-events}

Kapag naideposito ang isang token mula sa Ethereum papunta sa Polygon, nagsisimulang mangyari ang isang proseso na tinatawag na mekanismo ng pag-sync ng kalagayan na kalaunang mini-mint ang mga token para sa user sa Polygon chain. Tumatagal ang prosesong ito ng halos 22-30 minuto para mangyari at samakatuwid ang pakikinig sa deposit event na ito ay napakahalaga upang lumikha ng isang magandang karanasan ng user. Ito ay isang halimbawang script na maaaring gamitin upang subaybayan ang mga real time na deposit event.

### Pagsubaybay sa realtime na deposit event gamit ang isang web socket connection {#realtime-deposit-event-tracking-using-a-web-socket-connection}

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

### Makasaysayang pagsusuri sa pagkumpleto ng deposito sa pamamagitan ng pag-query sa blockchain. {#historical-deposit-completion-check-by-querying-the-blockchain}

Maaaring gamitin ang script na ito upang tingnan kung ang isang partikular na deposito ay nakumpleto na sa child chain o hindi. Ipinapanatili ng pangunahing chain at child chain ang incrementing ng value ng global counter variable sa parehong chain. Naglalabas ang [StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) contract ng isang event  na mayroong counter value. Ang counter value sa child chain ay maaaring i-query mula sa [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12) contract. Kung ang halaga ng counter sa child chain ay mas malaki kaysa sa o katumbas ng parehong nasa main chain, maituturing na matagumpay na nakumpleto ang deposito.

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

## Mga Checkpoint Event {#checkpoint-events}

### Real-time na pagsubaybay sa status ng checkpoint {#real-time-checkpoint-status-tracking}

Lahat ng transaksyon na nangyayari sa Polygon chain ay naka-checkpoint sa Ethereum chain sa madalas na pagitan ng oras ng mga validator. Sa pagkakataong ito, nasa paligid ng 10 mins ito sa Mumbai at 30 mins sa Polygon mainnet. Nangyayari ang checkpoint sa isang kontrata na tinatawag na kontrata ng RootChain na naka-deploy sa Ethereum chain. Maaaring gamitin ang sumusunod na script upang makinig sa mga real-time na checkpoint inclusion event.

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

### Makasaysayang checkpoint inclusion check sa pamamagitan ng pag-query sa blockchain. {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

Maaari itong i-check gamit ang sumusunod na API. Ang block number ng transaksyon ng burn sa chain ng bata ay kailangang ibigay bilang parameter sa GET API na ito.

```
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
