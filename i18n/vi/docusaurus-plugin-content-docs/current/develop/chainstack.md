---
id: chainstack
title: Triển khai Hợp đồng Thông minh sử dụng Chausack và Tìm
sidebar_label: Using Chainstack
description:  Sử dụng Chaintack và Founry để phát triển Hợp đồng Thông minh trên Polygon
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Tổng quan {#overview}

Phần này sẽ dẫn bạn qua việc triển khai một hợp đồng Hello World bằng [cách sử dụng Chainsack](https://chainstack.com/build-better-with-polygon/) và [Founding](https://github.com/gakonst/foundry/) trên máy kiểm tra Polygon Mumbai.

Chainsack cung cấp cơ sở hạ tầng cho các ứng dụng dựa trên Ethereum và các chuỗi blocksxích khác. Họ duy trì nút và đảm bảo sự kết nối của họ với mạng và cũng cung cấp một giao diện để tương tác với lưới và lưới chính thống.

Foundry là một bộ công cụ nhanh để phát triển ứng dụng Ethereum được viết bằng Rust. Nó cung cấp các thử nghiệm, tương tác với các hợp đồng thông minh EVM, gửi các giao dịch, và lấy lại dữ liệu blockchain.

:::tip

Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với máy chủ [<ins>Discord Chainsack</ins>](https://discord.com/invite/Cymtg2f7pX).

:::

## Những điều bạn sẽ học được {#what-you-will-learn}

Tạo hợp đồng Hello World, sử dụng Chainstack để triển khai nút Polygon và Foundry để triển khai hợp đồng.

## Những điều bạn sẽ làm {#what-you-will-do}

1. Triển khai một nút Polygon bằng Chainstack
2. Thiết lập Foundry
3. Tạo hợp đồng thông minh
4. Triển khai hợp đồng thông minh.

## Triển khai một nút Polygon Mumbai {#deploy-a-polygon-mumbai-node}

Bạn cần một nút để triển khai một hợp đồng thông minh cho mạng blockchain. Theo các bước dưới đây để có được nút của bạn và chạy:

**Bước 11**  đăng ký với [Charintack](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

**Bước 2→** Làm theo hướng dẫn về cách [triển khai một nút Mumbai.](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)

![img](/img/chainstack/join-network.png)

**Bước 3→** Lấy điểm [cuối HTTPS của nút được triển khai.](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## Cài đặt Foundry {#install-foundry}

Foundry là một bộ công cụ phát triển để làm việc với các hợp đồng thông minh. Để bắt đầu làm việc với nó, trước tiên bạn cần cài đặt ngôn ngữ mã hóa Rust.

1. [Cài đặt Rust](https://www.rust-lang.org/tools/install).
1. [Cài đặt Foundry](https://github.com/gakonst/foundry/).

## Khởi tạo với Foundry {#initialize-with-foundry}

Để tạo một dự án soạn sẵn, hãy điều hướng đến thư mục làm việc của bạn và chạy:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## Nạp tiền vào tài khoản của bạn {#fund-your-account}

Bạn sẽ cần một tài khoản ví để triển khai hợp đồng thông minh. Bạn có thể sử dụng [Metaamask](https://metamask.io/) cho điều đó. Bạn cũng cần phải thanh toán gas trên mạng lưới để triển khai hợp đồng. Chỉ cần sao chép ví của bạn và nhận dấu hiệu MATIC của Mumbai [thông qua vòi nước](https://faucet.polygon.technology/).

## Tạo hợp đồng Hello World {#create-the-hello-world-contract}

Trong dự án Foundry được khởi tạo trong `src/`, tạo `HelloWorld.sol`:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## Triển khai hợp đồng {#deploy-the-contract}

Tại thời điểm này, bạn đã sẵn sàng triển khai hợp đồng của mình:

* Bạn có nút của riêng mình trên mạng lưới Polygon Mumbai mà qua đó bạn sẽ triển khai hợp đồng.
* Bạn có Foundry mà bạn sẽ sử dụng để triển khai hợp đồng.
* Bạn có một tài khoản được cấp vốn sẽ triển khai hợp đồng.

Để triển khai hợp đồng, hãy chạy:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

Đây,

* CONTRACT_PATH — đường dẫn đến tệp tin `HelloWorld.sol`.
* PRIVATE_KEY  — khóa riêng tư từ tài khoản của bạn.
* HTTPS_ENDPOINT — [điểm cuối trên nút của bạn](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Ví dụ:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

Bạn luôn có thể kiểm tra việc triển khai hợp đồng trên [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/) bằng hàm băm mới được tạo từ bước cuối cùng.

:::

## Thử nghiệm hợp đồng {#test-the-contract}

Có một lệnh `forge test` trong trường hợp bạn cần kiểm tra xem hợp đồng có hoạt động tốt hay không. Foundry cung cấp nhiều [tùy chọn](https://book.getfoundry.sh/reference/forge/forge-test) (cờ) cho các thử nghiệm cụ thể hơn. Tìm hiểu thêm về kiểm tra viết, thử nghiệm nâng cao và các tính năng khác tại [tài liệu của Foundry](https://book.getfoundry.sh/forge/tests).

**Xin chúc mừng! Bạn đã triển khai hợp đồng thông minh Hello World của bạn trên Polygon.**

Xem thêm tài liệu Chainstack để biết chi tiết về [<ins>hướng dẫn</ins>](https://docs.chainstack.com/tutorials/polygon/) và [<ins>công cụ</ins>](https://docs.chainstack.com/operations/polygon/tools) liên quan đến Polygon.
