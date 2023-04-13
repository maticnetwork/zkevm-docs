---
id: walletconnect
title: WalletConnect
description: Một giao thức mở tạo ra giao tiếp DApp-Wallet.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** là một giao thức mở, không phải là ví - được xây dựng để tạo một sự liên kết giữa dApps và ví. Ví và một ứng dụng hỗ trợ giao thức này sẽ cho phép một đường dây bảo mật thông qua một khóa chia sẻ giữa hai pee. Một kết nối do DApp khởi tạo, hiển thị mã QR với URI WalletConnect tiêu chuẩn và kết nối được thiết lập khi ứng dụng ví phê duyệt yêu cầu kết nối. Các yêu cầu khác về việc chuyển nhượng quỹ được xác nhận trên chính ứng dụng ví.

## Thiết lập Web33 {#set-up-web3}


Để thiết lập dApp của bạn để kết nối với Ví điện thoại Polygon của người dùng, bạn có thể sử dụng nhà cung cấp WalletConnect để kết nối trực tiếp với Polygon. Cài đặt các mục sau trong DApp của bạn:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Cài đặt `matic.js`cho sự tích hợp Polygon:

```bash
$ npm install @maticnetwork/maticjs
```

Và thêm mã sau trong dApp;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

Tiếp theo, thiết lập nhà cung cấp Polygon và Rousten thông qua vật thể của WalletConnect:

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

Chúng ta đã tạo hai đối tượng nhà cung cấp ở trên để khởi tạo đối tượng Web3 của chúng ta với:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Công cụ tương ứng với Contact {#instantiating-contracts}

Một khi chúng ta có **được vật thể web3**, sự điều kiện của hợp đồng liên quan đến các bước giống như Metamark. Đảm bảo bạn có **hợp đồng ABI** và **địa chỉ** đã sẵn sàng.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Đang gọi các Hàm {#calling-functions}

:::info

Khóa riêng sẽ lưu lại trong ví của người dùng và **ứng dụng không truy cập nó theo bất kỳ cách nào**.

:::

Chúng ta có hai loại chức năng ở Ethereum, tùy thuộc vào sự tương tác với khối số. Chúng ta `call()` khi đọc dữ liệu và `send()` khi chúng ta viết dữ liệu.

### Gọi các chức năng `call()` {#functions}

Việc đọc dữ liệu không cần chữ ký, vì vậy mã sẽ giống như vầy:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### Gọi các chức năng `send()` {#functions-1}

Vì viết vào blockchain cần chữ ký, chúng ta sẽ nhắc người dùng trên ví của họ (hỗ trợ WalletConnec) để ký vào sự giao dịch.

Điều này liên quan đến ba bước:
1. Khởi tạo giao dịch
2. Lấy chữ ký trên giao dịch
3. Gửi giao dịch đã ký

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

Đoạn mã trên tạo một đối tượng giao dịch, đối tượng này sau đó được gửi đến ví của người dùng để lấy chữ ký:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`function propts người dùng cho chữ ký của họ và `sendSignedTransaction()`gửi giao dịch đã ký (trả lại biên lai giao dịch trên thành công).
