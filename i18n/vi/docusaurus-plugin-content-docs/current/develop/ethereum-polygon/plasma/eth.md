---
id: eth
title: Hướng dẫn Nạp và Rút ETH
sidebar_label: ETH
description: "Nạp và rút token ETH trên mạng lưới Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### Luồng Cấp Cao {#high-level-flow}

#### **Nạp ETH (quy trình 1 bước**)

Chức năng **nạp tiền** sẽ được gọi ra, khi đó token được nạp vào hợp đồng Polygon và có sẵn để sử dụng trong mạng lưới Polygon.

#### **Chuyển ETH**

Khi đã có quỹ trên Polygon, bạn có thể sử dụng quỹ đó để gửi cho người khác ngay lập tức.

#### **Rút ETH (quy trình 3 bước)**

1. Quá trình rút quỹ được khởi tạo từ Polygon. Một khoảng 30 phút (để kiểm tra, hãy chờ khoảng 10 phút) được thiết lập, nơi tất cả khối trên lớp Polygon đã được xác thực từ khi kiểm tra lần kiểm tra cuối cùng.
2. Một khi điểm kiểm tra được gửi đến hợp đồng chuỗi chính ERC20, một dấu hiệu NFT (ERC721) được tạo ra bằng giá trị tương đối.
3. Số tiền rút ngắn có thể được nhận lại từ số tiền của bạn từ hợp đồng dây chuyền chính bằng cách sử dụng một quy trình thoát ra.

## Chi tiết thiết lập {#setup-details}

### Định cấu hình SDK Matic {#configuring-matic-sdk}

Cài đặt Matic SDK (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Đang khởi tạo máy khách Maticjs

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

Tạo một tệp tin mới trong thư mục gốc có tên `process.env`là, với nội dung sau:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## nạp {#deposit}

**cọc**: Deposit có thể thực hiện bằng cách gọi `depositEther()`theo hợp đồng`depositManagerContract`.

Lưu ý rằng dấu hiệu cần được vẽ và được chấp thuận để chuyển giao trước khi.

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

Các bài gửi từ Ethereum đến Polygon xảy ra bằng cách sử dụng cơ chế đồng bộ bang và mất khoảng 22-30 phút. Sau khi chờ khoảng thời gian này, bạn nên kiểm tra số dư bằng thư viện web3.js/matic.js hoặc bằng Metamask. Explorer sẽ chỉ hiển thị số dư nếu có ít nhất một lần chuyển nhượng tài sản đã xảy ra trên chuỗi con. [Liên kết](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) này giải thích cách theo dõi các sự kiện nạp tiền.

:::

## chuyển {#transfer}

ETH trên mạng lưới polygon là một WETH (Token ERC20).

```js
const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## Rút tiền {#withdraw}

### 1. Đốt {#1-burn}

Người dùng có thể gọi `withdraw`chức năng của hợp đồng vật dụng trẻ `getERC20TokenContract`em. Chức năng này sẽ đốt token. `withdrawStart`Phương pháp hiển thị máy khách Polygon Plasma, để thực hiện cuộc gọi này.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

Người dùng có thể gọi `startExitWithBurntTokens()`chức năng của hợp đồng`erc20Predicate`. Máy khách Polygon Plasma đã hiển thị `withdrawConfirm()`phương pháp để thực hiện cuộc gọi này. Chỉ có thể gọi chức năng này sau khi kèm trạm kiểm soát trong chuỗi chính. Có thể theo dõi việc đưa vào trạm kiểm soát bằng cách làm theo [hướng dẫn](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events) này.


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. Thoát Quy trình {#3-process-exit}

Người dùng sẽ gọi `processExits()`chức năng của `withdrawManager`hợp đồng và thông báo bằng chứng của sự cháy. Sau khi gửi bằng chứng hợp lệ, các dấu được chuyển cho người dùng. `withdrawExit()`Phương pháp hiển thị máy khách Polygon Plasma, để thực hiện cuộc gọi này.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Một điểm kiểm soát, đây là một đại diện của tất cả giao dịch đang diễn ra trên Polygon đến chuỗi Ethereum mỗi ~5 phút, được thực hiện thường xuyên gửi đến hợp đồng chuỗi chính Ethereum.

:::