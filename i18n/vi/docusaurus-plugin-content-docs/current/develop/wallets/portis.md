---
id: portis
title: Portis
description: Một ví trên nền web được xây dựng nhằm giúp người dùng dễ dàng tham gia.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis là một ví trên nền web, được xây dựng nhằm giúp người dùng dễ dàng tham gia. Nó đi kèm với SDK javascript tích hợp vào DApp và tạo trải nghiệm không ví cục bộ dành cho người dùng. Hơn nữa, nó sẽ xử lý việc thiết lập ví tiền, giao dịch, và phí xăng.

Giống như Metamask, nó không lưu ký – người dùng kiểm soát các khóa của mình, Portis chỉ lưu trữ chúng một cách an toàn. Tuy nhiên, không giống như Metamask, nó được tích hợp vào ứng dụng chứ không phải trình duyệt. Người dùng có các khóa được liên kết với id đăng nhập và mật khẩu của mình.

**Loại**: Không lưu ký/HD <br/>**Kho Key riêng**: Mã hóa và được lưu trữ trên máy chủ Portis<br/> **Liên lạc với Ledger**: Xác định được xác định bởi nhà phát triển<br/> **Mã hóa khóa riêng tư**: Từ gợi nhớ <br/>

## Thiết lập Web3Style name {#set-up-web3}

Cổng Cài đặt trên dApp:

```js
npm install --save @portis/web3
```

Giờ, đăng ký dApp của bạn với Portis để có được ID dApp bằng [bảng điều khiển Portis Dash](https://dashboard.portis.io/).

Nhập `portis`và các vật thể`web3`:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Thiết lập Portis lấy đối số đầu tiên như ID dApp và cuộc tranh luận thứ hai như mạng bạn muốn kết nối. Đây có thể là một chuỗi ký tự hoặc đối tượng.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## Thiết lập Tài khoản {#set-up-account}

Nếu quá trình cài đặt và khởi tạo web3 thành công, mã sau sẽ trả về tài khoản được kết nối thành công:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Công cụ tương ứng với Contact {#instantiating-contracts}

Đây là cách chúng ta sẽ điều chỉnh hợp đồng của chúng:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Đang gọi các Hàm {#calling-functions}

### Đang gọi `call()`Hàm {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### Đang gọi `send()`Hàm {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
