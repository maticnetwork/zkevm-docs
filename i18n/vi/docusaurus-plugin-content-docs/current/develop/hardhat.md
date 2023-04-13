---
id: hardhat
title: Triển khai Hợp đồng Thông minh sử dụng Hardhat
sidebar_label: Using Hardhat
description: Sử dụng Hardhat để triển khai Hợp đồng Thông minh trên Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Tổng quan {#overview}

Hardhat là một môi trường phát triển Ethereum cung cấp một cách dễ dàng để triển khai các hợp đồng thông minh, chạy các thử nghiệm và mã Solidity.

Trong hướng dẫn này, bạn sẽ học cách thiết lập và sử dụng Hardhat để xây dựng, thử nghiệm và triển khai một hợp đồng thông minh đơn giản.

### Những điều bạn sẽ làm {#what-you-will-do}

- Thiết lập Hardhat
- Tạo một hợp đồng thông minh đơn giản
- Biên soạn hợp đồng
- Thử nghiệm hợp đồng
- Triển khai hợp đồng

## Thiết lập môi trường phát triển {#setting-up-the-development-environment}

Có một vài yêu cầu kỹ thuật trước khi chúng ta bắt đầu. Vui lòng cài đặt các mục sau:

- [Node.js v10+ LTS và npm](https://nodejs.org/en/) (đi kèm Nút)
- [Git](https://git-scm.com/)

Sau khi đã cài đặt, bạn cần tạo một dự án npm bằng cách vào một thư mục trống, chạy `npm init` và thực hiện theo hướng dẫn để cài đặt Hardhat. Khi dự án của bạn đã sẵn sàng, bạn nên chạy:

```bash
npm install --save-dev hardhat
```

Để tạo dự án Hardhat, hãy chạy `npx hardhat` trong thư mục dự án của bạn. Hãy cùng tạo dự án mẫu và đi qua các bước này để thử một nhiệm vụ mẫu và biên soạn, thử nghiệm và triển khai hợp đồng mẫu.

:::note

Dự án mẫu được sử dụng tại đây đến từ [<ins>cẩm nang Bắt đầu nhanh Hardhat</ins>](https://hardhat.org/getting-started/#quick-start), cũng như hướng dẫn của nó.

:::

## Tạo một dự án {#creating-a-project}

Để tạo một dự án mẫu, hãy chạy `npx hardhat` trong thư mục dự án của bạn. Bạn sẽ thấy lời nhắc sau:

![img](/img/hardhat/quickstart.png)

Chọn dự án JavaScript và đi qua các bước này để biên soạn, thử nghiệm và triển khai hợp đồng mẫu.

### Kiểm tra hợp đồng {#checking-the-contract}

Thư mục `contracts` có chứa `Lock.sol`, đây là một hợp đồng mẫu bao gồm một khóa kỹ thuật số đơn giản, nơi người dùng chỉ có thể rút quỹ sau khoảng thời gian đã cho.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### Thiết lập hợp đồng {#setting-up-the-contract}

- Đi đến `hardhat.config.js`
- Cập nhật `hardhat-config` với matic-network-credentials
- Tạo tệp tin `.env` trong gốc để lưu trữ khóa riêng tư của bạn
- Thêm khóa API Polygonscan vào tệp tin `.env` để xác minh hợp đồng trên Polygonscan. Bạn có thể tạo khóa API bằng cách [tạo tài khoản](https://polygonscan.com/register)

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

Lưu ý rằng tệp tin ở trên yêu cầu DOTENV, để quản lý các biến môi trường lẫn ether và etherscan. Đảm bảo cài đặt tất cả các gói đó.

Tìm thêm hướng dẫn về cách sử dụng DOTENV trên [<ins>trang này</ins>](https://www.npmjs.com/package/dotenv).

Bạn có thể triển khai trên MATIC(Polygon mainnet) nếu bạn thay đổi polygon_mumbai bằng MATIC

:::

### Biên soạn hợp đồng {#compiling-the-contract}

Để biên soạn hợp đồng, trước hết bạn cần cài đặt Hộp công cụ Hardhat:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Sau đó, chỉ cần chạy để biên soạn:

```bash
npx hardhat compile
```

### Thử nghiệm Hợp đồng {#testing-the-contract}

Để chạy các thử nghiệm với Hardhat, bạn chỉ cần gõ như sau:

```bash
npx hardhat test
```

Và đây là kết quả dự kiến:

![img](/img/hardhat/test.png)

### Triển khai trên Polygon Network {#deploying-on-polygon-network}

Chạy lệnh này trong gốc của thư mục dự án:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Hợp đồng sẽ được triển khai trên Mạng thử nghiệm Mumbai của Matic, và bạn có thể kiểm tra trạng thái triển khai tại đây: https://mumbai.polygonscan.com/

**Xin chúc mừng! Bạn đã triển khai thành công Hợp đồng Thông minh Greeter. Giờ bạn có thể tương tác với Hợp đồng Thông minh.**

:::tip Nhanh chóng Xác minh hợp đồng trên Polygonscan

Hãy chạy các lệnh sau để nhanh chóng xác minh hợp đồng của bạn trên Polygonscan. Việc này giúp mọi người dễ dàng xem mã nguồn của hợp đồng đã triển khai của bạn. Đối với những hợp đồng có trình khởi tạo với danh sách đối số phức tạp, hãy xem [tại đây](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html).

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
