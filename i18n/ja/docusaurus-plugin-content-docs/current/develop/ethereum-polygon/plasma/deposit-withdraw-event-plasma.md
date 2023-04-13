---
id: deposit-withdraw-event-plasma
title: 入金とチェックポイントのイベント追跡 - Plasma
sidebar_label: Deposit and Checkpoint Event Tracking
description:  "リアルタイムの入金およびチェックポイントイベントを追跡します。"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

最新の[PlasmaのMatic.jpドキュメント](https://maticnetwork.github.io/matic.js/docs/plasma/)を確認して始めましょう。

## 入金イベント {#deposit-events}

トークンがEthereumからPolygonにデポジットされると、状態同期メカニズムと呼ばれるプロセスが開始され、最終的にPolygonチェーン上でユーザのトークンが作成されます。このプロセスは、22〜30分程度かかります。したがって、デポジットイベントを聴くことが非常に重要です。これは、実時間でデポジットイベントを追跡するために使用できるサンプルスクリプトです。

### Webソケット接続を使用した実時間でのデポジットイベントの追跡 {#realtime-deposit-event-tracking-using-a-web-socket-connection}

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

### ブロックチェーンへのクエリによるデポジット完了履歴のチェック {#historical-deposit-completion-check-by-querying-the-blockchain}

このスクリプトは、子チェーン上で特定のデポジットが完了したかどうかをチェックするために使用できます。メインチェーンと子チェーンは、両チェーンでグローバルカウンター変数の値を増加させ続けます。[StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38)コントラクトは、カウンター値を持つイベントを発行します。子チェーンのカウンター値は、[StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12)コントラクトからクエリできます。チャイルドチェーン上のカウンター値がメインチェーン上の同じまたは同等である場合、デポジットを正常に完了したと考えることができます。

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

## チェックポイントイベント {#checkpoint-events}

### 実時間でのチェックポイント状態の追跡 {#real-time-checkpoint-status-tracking}

Polygonチェーンで実行されるすべてのトランザクションは、バリデータによって頻繁に時間ごとにEthereumチェーンにチェックポイントされます。今回はムンバイで10分、Polygonメインネットで30分程度です。チェックポイントは、EthereumチェーンにデプロイされたRootChainコントラクトと呼ばれるコントラクトで生じます。以下のスクリプトを使用して、実時間のチェックポイントインクルージョンのイベントをリッスンできます。

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

### ブロックチェーンのクエリによる、履歴チェックポイントのインクルージョンチェック {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

これは、以下のAPIを使用してチェックできます。子チェーン上のburnトランザクションのブロック番号を、このGET APIのパラメータとして指定する必要があります。

```
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
