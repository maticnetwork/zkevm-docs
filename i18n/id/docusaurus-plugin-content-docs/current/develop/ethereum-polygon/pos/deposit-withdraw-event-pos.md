---
id: deposit-withdraw-event-pos
title: Pelacakan Peristiwa Setor dan Titik Periksa - PoS
sidebar_label: Deposit and Checkpoint Event Tracking
description: "Melacak laju dan kecepatan transaksi di Polygon."
keywords:
  - docs
  - matic
  - deposit
  - checkpoint
image: https://matic.network/banners/matic-network-16x9.png
---

## Ringkasan Singkat {#quick-summary}

Bagian doks ini berurusan dengan pelacakan dan memantaunya dan kecepatan transaksi yang dilakukan di dalam ekosistem Polygon. Menyimpan ke dalam jaringan (ketika dilakukan dengan jembatan PoS) biasanya membutuhkan rata-rata 22-30 menit tetapi kami telah melihat contoh di mana pengguna berusaha untuk melihat laporan kemajuan waktu yang nyata. Sebagai pengembang, Anda mungkin juga ingin menambahkan UX dari aplikasi Anda dengan umpan balik langsung untuk pengguna. Dalam semua kasus ini, bagian ini mungkin berguna.

## Peristiwa Penyetoran {#deposit-events}

Ketika token disetorkan dari Ethereum ke Polygon, sebuah proses yang disebut mekanisme sinkronisasi kondisi bekerja dan pada akhirnya akan mencetak token untuk pengguna pada rantai Polygon. Proses ini membutuhkan sekitar ~22-30 menit untuk terjadi dan karenanya mendengarkan peristiwa deposit sangat penting untuk membuat pengalaman pengguna yang baik. Ini adalah skrip contoh yang dapat digunakan untuk melacak peristiwa setor dalam waktu nyata.

### Pelacakan peristiwa setor waktu nyata menggunakan koneksi soket web {#realtime-deposit-event-tracking-using-a-web-socket-connection}

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

### Pemeriksaan penyelesaian setor secara historis dengan melakukan kueri terhadap blockchain {#historical-deposit-completion-check-by-querying-the-blockchain}

Skrip ini dapat digunakan untuk memeriksa apakah proses setor tertentu telah selesai pada rantai anak atau tidak. Rantai utama dan rantai anak terus menambahkan nilai dari variabel penghitungan global pada kedua rantai tersebut. Kontrak [StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) mengeluarkan peristiwa yang memiliki nilai penghitungan. Nilai penghitungan pada rantai anak dapat diminta dari kontrak [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12). Jika nilai kontra pada rantai anak lebih besar atau sama dengan yang sama pada rantai utama, maka deposit dapat dianggap sebagai sukses.

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

## Peristiwa Titik Periksa {#checkpoint-events}

### Pelacakan status titik periksa dalam waktu nyata {#real-time-checkpoint-status-tracking}

Semua transaksi yang terjadi pada rantai Polygon diperiksa ke rantai Ethereum pada interval waktu yang sering oleh validator. Kali ini sekitar 10 menit di Mumbai dan sekitar 30 menit di Polygon Mainnet. Titik pemeriksaan terjadi pada kontrak yang disebut yang `RootChainContract`disebarkan pada rantai Ethereum. Skrip berikut dapat digunakan untuk memperhatikan peristiwa inklusi titik periksa dalam waktu nyata.

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

### Pemeriksaan inklusi titik periksa secara historis dengan melakukan kueri terhadap blockchain {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

Ini dapat diperiksa menggunakan API berikut. Jumlah blok transaksi bakar pada rantai anak harus diberikan sebagai parameter ke API ini.

```js
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
