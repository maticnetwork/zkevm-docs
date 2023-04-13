---
id: torus
title: Torus
description: Torus là một hệ thống quản lý khóa không phải là giám đốc cho dApps
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus là hệ thống quản lý khóa không giám định cho các ứng dụng bị phát triển, an toàn, và không giám hộ. Chúng tôi tập trung vào việc cung cấp cho người dùng phổ thông một cổng vào hệ sinh thái phi tập trung.

**Type**: Không có Bảo vệ/ HD<br/> **Kho Bỏng Key riêng**: Kho trữ trình duyệt cục bộ của User: Được mã hóa và lưu trữ trên máy chủ Torus<br/> **Giao tiếp với Sổ cái Ethereum**: Infura <br/>**Mã số phím riêng**: Mnemonic / Đăng nhập bằng xác thực<br/>

Tùy thuộc vào nhu cầu ứng dụng của bạn, Torus có thể được tích hợp thông qua Ví Torus, hoặc bằng cách tương tác trực tiếp với Mạng Torus thông qua Customith. Để biết thêm thông tin, hãy thăm [dò tài liệu Torus](https://docs.tor.us/).

## Tích hợp Wallet Torus {#torus-wallet-integration}

Nếu ứng dụng của bạn đã được tương thích với MetaMask hoặc bất kỳ nhà cung cấp Web3, tích hợp Wallet Torus sẽ cung cấp cho bạn một nhà cung cấp để gói giao diện Web3. Bạn có thể cài đặt thông qua một gói npm. Để biết thêm thông tin về cách và thông tin về sự tích [hợp ví](https://docs.tor.us/wallet/get-started) của chúng ta, vui lòng viếng thăm tài liệu chính thức

### Cài đặt {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### Ví dụ {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## Tích hợp sự sự xác thực của CustumAuth {#customauth-integration}

Nếu bạn đang tìm cách kiểm soát UX của mình, từ đăng nhập đến mọi giao tác, thì bạn có thể sử dụng Auth. Bạn có thể tích hợp thông qua một trong số SDK của họ phụ thuộc vào nền tảng (s) bạn đang xây dựng. Để biết thêm thông tin, vui lòng thăm viếng [sự tích hợp của Torus CustourAuth](https://docs.tor.us/customauth/get-started).
