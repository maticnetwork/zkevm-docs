---
id: deposit-withdraw-event-pos
title: Theo dõi Nạp tiền và Sự kiện Trạm kiểm soát – PoS
sidebar_label: Deposit and Checkpoint Event Tracking
description: "Theo dõi nhịp độ và tốc độ giao dịch trên Polygon."
keywords:
  - docs
  - matic
  - deposit
  - checkpoint
image: https://matic.network/banners/matic-network-16x9.png
---

## Tóm tắt nhanh {#quick-summary}

Phần này của các tiến sĩ với các hợp đồng theo dõi và giám sát tốc độ giao dịch được thực hiện trong hệ sinh thái Polygon. Việc gửi vào mạng (khi thực hiện với cầu PoS) thường chiếm trung bình 22-30 phút nhưng chúng ta đã thấy các trường hợp mà người dùng tìm cách xem báo cáo tiến bộ thực sự. Là nhà phát triển, bạn cũng có thể muốn nâng cao trải nghiệm người dùng trong ứng dụng của bạn với thông tin phản hồi tức thì cho người dùng. Trong tất cả các trường hợp này, phần này có thể hữu dụng.

## Sự kiện Nạp tiền {#deposit-events}

Khi một token được nạp từ Ethereum sang Polygon, một quy trình được gọi là cơ chế đồng bộ trạng thái sẽ hoạt động và cuối cùng mint các token dành cho người dùng trên chuỗi Polygon. Quá trình này mất khoảng 22-30 phút để xảy ra và do đó lắng nghe sự kiện gửi rất quan trọng để tạo ra một trải nghiệm người dùng tốt. Đây là tập lệnh ví dụ có thể được sử dụng để theo dõi các sự kiện nạp tiền theo thời gian thực.

### Theo dõi sự kiện nạp tiền theo thời gian thực bằng kết nối web socket {#realtime-deposit-event-tracking-using-a-web-socket-connection}

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

### Kiểm tra việc hoàn tất nạp tiền trong lịch sử bằng cách truy vấn blockchain {#historical-deposit-completion-check-by-querying-the-blockchain}

Tập lệnh này có thể được sử dụng để kiểm tra xem một khoản tiền nạp cụ thể đã được hoàn tất trên chuỗi con hay chưa. Chuỗi chính và chuỗi con tiếp tục tăng giá trị của một biến bộ đếm toàn cục trên cả hai chuỗi. Hợp đồng [StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) phát hành một sự kiện có giá trị bộ đếm. Có thể truy vấn giá trị bộ đếm trên chuỗi con từ hợp đồng [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12). Nếu giá trị phản công trên chuỗi trẻ em lớn hơn hoặc bằng nhau trên chuỗi chính, thì khoản tiền gửi có thể được xem như đã hoàn thành.

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

## Sự kiện Trạm kiểm soát {#checkpoint-events}

### Theo dõi trạng thái trạm kiểm soát theo thời gian thực {#real-time-checkpoint-status-tracking}

Tất cả các giao dịch xảy ra trên chuỗi Polygon đều được kiểm tra vào chuỗi Ethereum tại các giao dịch thường xuyên của thời gian bởi người xác thực. Lần này là khoảng 10 min trên Mumbai và khoảng 30 min trên Polygon Mainnet. Điểm kiểm tra xảy ra trên một hợp đồng được gọi là sự `RootChainContract`triển khai trên chuỗi Ethereum. Có thể sử dụng tập lệnh sau để lắng nghe các sự kiện đưa vào trạm kiểm soát theo thời gian thực.

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

### Kiểm tra việc đưa vào trạm kiểm soát trong lịch sử bằng cách truy vấn blockchain {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

Có thể kiểm tra việc này bằng API sau. Số lượng khối của giao dịch đốt trên chuỗi trẻ phải được đưa ra như một thông số cho API này.

```js
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
