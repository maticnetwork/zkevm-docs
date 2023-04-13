---
id: erc20
title: Hướng dẫn Nạp và Rút ERC20
sidebar_label: ERC20
description:  "Nạp và rút token ERC20 trên mạng lưới Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

Vui lòng kiểm tra [tài liệu Matic.js về ERC20 Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) mới nhất để bắt đầu và xem các phương pháp cập nhật.

### Luồng Cấp Cao {#high-level-flow}

#### **Nạp ERC20 (quy trình 2 bước)**

1. Token trước tiên cần được phê duyệt cho hợp đồng chuỗi gốc Polygon trên Chuỗi Mẹ (Ethereum/Goerli).
2. Khi đã được phê duyệt, chức năng **nạp tiền** sẽ được gọi ra, khi đó token được nạp vào hợp đồng Polygon và sẵn sàng để sử dụng trong Polygon.

#### **Chuyển ERC20**

Khi đã có quỹ trên Polygon, bạn có thể sử dụng quỹ đó để gửi cho người khác ngay lập tức.

#### **Rút ERC20 (quy trình 3 bước)**

1. Quá trình rút quỹ được khởi tạo từ Polygon. Một khoảng 30 phút (để kiểm tra thử nghiệm chờ đợi khoảng 10 phút) được thiết lập, nơi tất cả các khối trên lớp Polygon đã được xác thực từ lần kiểm tra cuối cùng.
2. Một khi điểm kiểm tra được gửi đến hợp đồng chuỗi chính ERC20, một dấu hiệu NFT (ERC721) được tạo ra bằng giá trị tương đối.
3. Số tiền rút ngắn có thể được nhận lại từ số tiền của bạn từ hợp đồng dây chuyền chính bằng cách sử dụng một quy trình thoát ra.

## Chi tiết thiết lập {#setup-details}

### Định cấu hình Polygon Edge {#configuring-polygon-edge}

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

**Chấp thuận**: Đây là sự chấp thuận của ERC20 bình thường, vì vậy `depositManagerContract`có thể gọi chức năng`transferFrom()`. Máy khách Polygon Plasma đã hiển thị `erc20Token.approve()`phương pháp để thực hiện cuộc gọi này.

**nạp**: Có thể nạp tiền bằng cách gọi **_depositERC20ForUser_** trên hợp đồng depositManagerContract.

Lưu ý rằng trước đó token cần được hoán đổi và phê duyệt để chuyển.

Phương pháp **_erc20Token.deposit_** để thực hiện lệnh gọi này.


```js
const { getPlasmaClient, plasma, from } = require('../utils')

const amount = '1000000000000000000' // amount in wei
const token = plasma.parent.erc20

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token, true)
  const result = await erc20Token.deposit(amount, from)
  const receipt = await result.getReceipt()
  console.log(receipt)
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

:::note

Các bài gửi từ Ethereum đến Polygon xảy ra bằng cách sử dụng cơ chế đồng bộ bang và mất khoảng 5-7 phút. Sau khi chờ khoảng thời gian này, bạn nên kiểm tra số dư bằng thư viện web3.js/matic.js hoặc bằng Metamask. Explorer sẽ chỉ hiển thị số dư nếu có ít nhất một lần chuyển nhượng tài sản đã xảy ra trên chuỗi con. [Liên kết](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) này giải thích cách theo dõi các sự kiện nạp tiền.

:::

## chuyển {#transfer}

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
    const receipt = await result.getReceipt()
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

Người dùng có thể gọi `withdraw()`chức năng của hợp đồng vật dụng trẻ `getERC20TokenContract`em. Chức năng này sẽ đốt token. Máy khách Polygon Plasma đã hiển thị `withdrawStart()`phương pháp để thực hiện cuộc gọi này.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)
  console.log(await result.getReceipt())
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)

```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

Người dùng có thể gọi chức năng **_startExitWithBurntTokens_** của hợp đồng **_erc20Predicate_**. Máy khách Plasma Polygon trình bày phương pháp **_withdrawConfirm_** để thực hiện lệnh gọi này. Chỉ có thể gọi chức năng này sau khi kèm trạm kiểm soát trong chuỗi chính. Có thể theo dõi việc đưa vào trạm kiểm soát bằng cách làm theo [hướng dẫn](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events) này.


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. Thoát Quy trình {#3-process-exit}

Người dùng nên gọi chức năng **_processExits_** của hợp đồng **_withdrawManager_** và nộp bằng chứng đốt. Sau khi gửi bằng chứng hợp lệ, các dấu được chuyển cho người dùng. Máy khách Plasma Polygon trình bày phương pháp **_withdrawExit_** để thực hiện lệnh gọi này.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawExit()
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Một điểm kiểm soát, đây là một đại diện của tất cả giao dịch đang diễn ra trên Polygon Network đến chuỗi ERC20 mỗi ~30 phút, được thường xuyên gửi đến hợp đồng chuỗi chính ERC20.

:::