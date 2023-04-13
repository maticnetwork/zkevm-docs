---
id: truffle
title: Triển khai Hợp đồng Thông minh bằng Truffle
sidebar_label: Using Truffle
description:  Sử dụng Truffle để triển khai Hợp đồng Thông minh trên Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Tổng quan {#overview}

[Truffle](https://trufflesuite.com/) là một môi trường phát triển blockchain, bạn có thể sử dụng để tạo và kiểm tra các hợp đồng thông minh bằng cách sử dụng Cỗ Máy Ảo Ethereum. Hướng dẫn này nhắm đến cách dạy cách tạo một hợp đồng thông minh bằng Truffle và triển khai nó trên Mạng Polygon tương thích EVM-EVM.

:::note

Bài hướng dẫn này là một phiên bản thích ứng của bài viết [<ins>nhanh Truffle</ins>](https://www.trufflesuite.com/docs/truffle/quickstart).

:::

## Những điều bạn sẽ làm {#what-you-will-do}

- Cài đặt và thiết lập Truffle
- Triển khai hợp đồng với Polygon Network
- Kiểm tra tình trạng triển khai trên Polygonscan

## Điều kiện tiên quyết {#prerequisites}

Có một vài yêu cầu kỹ thuật trước khi chúng ta bắt đầu. Vui lòng cài đặt các mục sau:

- [Node.js v8+ LTS và npm](https://nodejs.org/en/) (đã đóng gói với Node)
- [Git](https://git-scm.com/)

Sau khi đã cài đặt chúng, chúng ta chỉ cần một lệnh để cài đặt Truffle:

```
npm install -g truffle
```

Để xác thực Truffle đã được cài đặt đúng cách, hãy gõ `truffle version`trên một máy bay. Nếu bạn thấy một lỗi , hãy đảm bảo rằng các mô-đun npm được thêm vào đường của bạn.

## Tạo một dự án {#creating-a-project}

### Dự án MetaCoin {#metacoin-project}

Chúng ta sẽ sử dụng một trong những bản mẫu của Truffle mà bạn có thể tìm thấy trên trang [Hộp Truffle](https://trufflesuite.com/boxes/) của họ. [Hộp MetaCoin](https://trufflesuite.com/boxes/metacoin/) tạo một token có thể được chuyển giao giữa các tài khoản.

1. Bắt đầu bằng cách tạo một thư mục mới cho dự án Truffle này:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. Tải hộp MetaCoin:

  ```bash
  truffle unbox metacoin
  ```

Với bước cuối cùng, bạn đã tạo một dự án Truffle đồng xu chứa thư mục với các hợp đồng, triển khai, thử nghiệm, và các tệp tin cấu hình.

Đây là dữ liệu hợp đồng thông minh từ tệp tin `metacoin.sol`:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

Lưu ý rằng ConvertLib đang được nhập ngay sau mệnh đề `pragma`. Trong dự án này, thực tế là có hai hợp đồng thông minh sẽ được triển khai ở đầu cuối: một là Metacoin, chứa tất cả logic gửi và số dư; một là ConvertLib, thư viện dùng để chuyển đổi các giá trị.

:::

### Thử nghiệm Hợp đồng {#testing-the-contract}

Bạn có thể chạy kiểm tra Solidity và Javascript.

1. Trong một thiết bị đầu cuối, hãy chạy thử nghiệm Solidity:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

Bạn nên xem số lượng xuất sau:

![img](/img/truffle/test1.png)

2. Chạy thử nghiệm JavaScript:

  ```bash
  truffle test ./test/metacoin.js
  ```

Bạn nên xem số lượng xuất sau:

![img](/img/truffle/test2.png)

### Biên soạn hợp đồng {#compiling-the-contract}

Hợp đồng thông minh bằng lệnh sau:

```bash
truffle compile
```

Bạn sẽ thấy kết quả sau:

![img](/img/truffle/compile.png)

### Định cấu hình hợp đồng thông minh {#configuring-the-smart-contract}

Trước khi thực sự triển khai hợp đồng, bạn cần thiết lập tệp tin `truffle-config.js`, chèn mạng lưới và dữ liệu bộ biên dịch.

Hãy đến `truffle-config.js`và cập nhật tệp tin với chi tiết mạng Polygon Mumbai.

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

Lưu ý rằng nó cần có sự phát triển của memonic để được chuyển vào `maticProvider`. Đây là cụm từ giống (hoặc khóa riêng) cho tài khoản bạn muốn triển khai từ. Tạo một tệp tin `.secret` mới trong thư mục gốc và nhập cụm từ hạt giống gợi nhớ gồm 12 từ để bắt đầu. Để lấy từ hạt giống từ ví MetaMask, bạn có thể đến thiết lập MetaMask, sau đó từ trình đơn, chọn **Security và Privacy** nơi bạn sẽ thấy một nút ghi **ra lời nhắn**.

### Triển khai trên Polygon Network {#deploying-on-polygon-network}

Thêm MATIC vào ví của bạn bằng [Polygon Faucet](https://faucet.polygon.technology/). Tiếp theo, hãy chạy lệnh này trong thư mục gốc của thư mục dự án:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

Hãy nhớ và `address``transaction_hash`các chi tiết khác được cung cấp sẽ khác biệt. Trên đây chỉ là để cung cấp ý tưởng về cấu trúc.

:::

**Xin chúc mừng! Bạn đã triển khai thành công một Hợp đồng Thông minh bằng Truffle.** Bây giờ bạn có thể tương tác với hợp đồng và cũng kiểm tra tình trạng triển khai của nó trên [Polygonscan](https://mumbai.polygonscan.com/).
