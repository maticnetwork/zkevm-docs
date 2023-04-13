---
id: overview
title: Tổng quan về MetaMask
sidebar_label: Overview
description: Cách bạn có thể bắt đầu với MetaMask trên Polygon
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Metamask](https://metamask.io/) là một ví mã hóa có thể được sử dụng trong trình duyệt web và thiết bị di động để tương tác với blockchain Ethereum. Nó cho phép bạn chạy các Dapp (Ứng dụng Phi tập trung) Ethereum ngay trong trình duyệt của bạn mà không cần chạy nút Ethereum đầy đủ.

**Loại**: Không lưu ký/HD <br/>**Bộ nhớ khóa riêng tư**: Bộ nhớ trình duyệt cục bộ của người dùng <br/>**Giao tiếp với Sổ cái Ethereum**: Infura <br/>**Mã hóa khóa riêng tư**: Từ gợi nhớ <br/>

:::warning
Vui lòng Hỗ Trợ Bằng Cách Phục Hồi Bí Mật Của Bạn**.** Nếu thiết bị của bạn bị vỡ, bị mất, bị đánh cắp, hoặc có sự tham nhũng dữ liệu, không có cách nào khác để khôi phục nó. Phrase Recovery Bí mật là cách duy nhất để khôi phục tài khoản MetaMask. Kiểm tra thêm **[<ins>Thông tin An toàn và An ninh cơ bản cho MetaMask</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**.
:::

## Hướng dẫn thiết lập MetaMask cho Polygon {#guide-to-set-up-metamask-for-polygon}

* [Tải về và Cài đặt MetaMask](/develop/metamask/tutorial-metamask.md)
* [Định cấu hình Polygon trên MetaMask](/develop/metamask/config-polygon-on-metamask.md)
* [Định cấu hình Token Tùy chỉnh](/develop/metamask/custom-tokens.md)
* [Tạo và Nhập Tài khoản](/develop/metamask/multiple-accounts.md)

### 1. Thiết lập Web3 {#1-set-up-web3}

#### Bước 1 {#step-1}

Cài đặt các mục sau trong DApp của bạn:

  ```javascript
  npm install --save web3
  ```

Tạo một tệp tin mới, đặt tên là `web3.js` và chèn mã sau vào đó:

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

Tệp tin ở trên xuất một chức năng được gọi là `getWeb3()` – mục đích của nó là yêu cầu quyền truy cập của tài khoản metamask qua việc phát hiện một đối tượng toàn cục (`ethereum` hoặc `web3`) do Metamask đưa vào.

Theo [tài liệu API của Metamask](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes):

> MetaMask đã đối mặt với một API toàn cầu vào các trang web được người dùng của nó viếng thăm tại cửa sổ. ethereum. API này cho phép các trang web yêu cầu tài khoản Ethereum của người dùng, đọc dữ liệu từ blockchains người dùng được kết nối với và đề nghị rằng thông điệp người dùng ký hiệu và giao dịch. Sự hiện diện của vật thể nhà cung cấp chỉ ra một người dùng Ethereum.

Trong một điều kiện đơn giản hơn, về cơ bản có nghĩa là việc có thể được cài đặt phần mở rộng/ad-on trong trình duyệt của bạn, bạn sẽ có một định nghĩa biến toàn cầu, được gọi là `ethereum`( cho `web3`các phiên bản cũ), và sử dụng sự thay đổi này chúng ta sẽ có thể điều chỉnh được web3.

#### Bước 2 {#step-2}

Giờ, trong mã máy khách của bạn, hãy nhập tệp tin bên trên:

```js
  import getWeb3 from '/path/to/web3';
```

và gọi chức năng:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. Thiết lập tài khoản {#2-set-up-account}

Bây giờ để gửi giao dịch (đặc biệt là những người thay đổi tình trạng blockchain) chúng ta sẽ cần một tài khoản để ký vào các giao dịch đó. Chúng tôi điều chỉnh các hợp đồng của chúng tôi từ vật thể web3, chúng tôi tạo ra ở trên:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

Hàm `getAccounts()` trả về một mảng gồm tất cả các tài khoản trên metamask của người dùng, và `accounts[0]` là tài khoản hiện được người dùng chọn.

### 3. Khởi tạo hợp đồng của bạn {#3-instantiate-your-contracts}

Khi chúng ta có được `web3`vật thể của chúng ta đã định, chúng ta sẽ điều kiện theo hợp đồng của chúng ta, giả sử bạn có hợp đồng ABI và địa chỉ của bạn đã có:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. Gọi các chức năng {#4-call-functions}

Hiện tại cho bất kỳ chức năng nào bạn muốn gọi từ hợp đồng của bạn, chúng ta sẽ tương tác trực tiếp với vật thể hợp đồng đã được xác định (được `myContractInstance`tuyên bố trong Bước 2).

:::tip Một đánh giá nhanh

Các hoạt động làm thay đổi tình trạng của hợp đồng được gọi là các `send()`hàm Các hoạt động không làm thay đổi tình trạng của hợp đồng được gọi là các `call()`hàm

:::

#### Gọi các chức năng `call()` {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### Gọi các chức năng `send()` {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
