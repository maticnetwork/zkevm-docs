---
id: alchemy
title: Triển khai Hợp đồng Thông minh sử dụng Alchemy
sidebar_label: Using Alchemy
description: Hướng dẫn triển khai các hợp đồng thông minh bằng Alchemy
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Tổng quan {#overview}

Hướng dẫn này dành cho các nhà phát triển mới bắt đầu phát triển blockchain Ethereum hoặc muốn hiểu rõ các nguyên tắc cơ bản của việc triển khai và tương tác với các hợp đồng thông minh. Nó sẽ giúp bạn thông qua việc tạo và triển khai một hợp đồng thông minh trên mạng lưới kiểm tra Polygon Mumbai, bằng ví tiền mật mã ([Metamask](https://metamask.io)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), và [Alchemy](https://alchemy.com/?a=polygon-docs).

:::tip

Nếu bạn có câu hỏi hoặc mối quan tâm, vui lòng liên hệ với đội Alchemy thông qua máy chủ [<ins>Discord chính thức</ins>](https://discord.gg/gWuC7zB) của họ.

:::

## Những điều bạn sẽ học được {#what-you-will-learn}

Để tạo một hợp đồng thông minh trong hướng dẫn này, bạn sẽ học cách sử dụng nền tảng của Alchemy để:
- Tạo một ứng dụng hợp đồng thông minh
- Kiểm tra số dư của ví
- Hợp đồng kiểm tra gọi trong một nhà thám hiểm blockchain

## Những điều bạn sẽ làm {#what-you-will-do}

Thực hiện theo hướng dẫn, bạn sẽ:
1. Bắt đầu tạo ứng dụng trên Alchemy
2. Tạo địa chỉ ví với Metamask
3. Thêm số dư cho ví (sử dụng thử nghiệm)
4. Sử dụng Hardhat và Ethers.js để biên soạn và triển khai dự án
5. Kiểm tra tình trạng hợp đồng trên nền tảng của Alchemy

## Tạo và triển khai Hợp đồng Thông minh của bạn {#create-and-deploy-your-smart-contract}

### Kết nối với mạng Polygon {#connect-to-the-polygon-network}

Có một số cách để thực hiện yêu cầu đối với chuỗi Polygon PoS. Thay vì chạy nút của riêng mình, bạn sẽ sử dụng tài khoản miễn phí trên nền tảng nhà phát triển của Alchemy và tương tác với API PoS Alchemy Polygon để giao tiếp với chuỗi Polygon PoS. Nền tảng bao gồm một bộ phận đầy đủ của nhà phát triển - điều này gồm khả năng giám sát yêu cầu, các nhà phân tích dữ liệu chứng minh điều gì sẽ xảy ra dưới sự triển khai hợp đồng thông minh, APis cải tiến (Truyền, NFTs, v.v.) và một đạo đức .js SDK.

Nếu bạn không có tài khoản Alchemy, hãy bắt đầu bằng cách đăng ký tài khoản miễn phí [ở đây](https://www.alchemy.com/polygon/?a=polygon-docs). Sau khi tạo tài khoản, bạn có tùy chọn tạo ngay ứng dụng đầu tiên của mình trước khi truy cập bảng điều khiển.

![img](/img/alchemy/alchemy-dashboard.png)

### Tạo App của bạn (và phím API) {#create-your-app-and-api-key}

Sau khi tạo một tài khoản Alchemy, bạn sẽ cần tạo một khóa API bằng cách tạo một ứng dụng. Điều này xác thực các yêu cầu được thực hiện cho cuộc thử nghiệm Polygon Mumbai. Nếu bạn không quen thuộc với mạng thử nghiệm, hãy xem [hướng dẫn mạng thử nghiệm này](https://docs.alchemyapi.io/guides/choosing-a-network).

Để tạo một khóa API mới, định hướng đến thẻ **Apps** trên thanh định vị Alchemy dashboard và chọn thẻ gửi **App**

![img](/img/alchemy/create-app.png)

Hãy gọi ứng dụng mới **Hello World**, đưa ra mô tả ngắn, hãy chọn **Polygon** cho chuỗi và chọn **Polygon Mumbai** cho mạng của bạn.

Cuối cùng, hãy nhấn vào **ứng dụng Tạo (Create)**. Ứng dụng mới của bạn sẽ xuất hiện trong bảng bên dưới.

### Tạo một địa chỉ Ví {#create-a-wallet-address}

Polygon PoS là một dung dịch scing lớp 2 cho Ethereum. Do đó, chúng ta cần ví Ethereum và thêm một địa chỉ URL Polygon tự chọn để gửi và nhận được giao dịch trên máy tính thử nghiệm Polygon Mumbai. Đối với hướng dẫn này, chúng ta sẽ sử dụng MetaMask, ví tiền mật mã tương thích với trình duyệt được sử dụng để quản lý địa chỉ ví của bạn. Nếu bạn muốn hiểu thêm về cách thức các giao dịch hoạt động trên Ethereum, hãy xem [hướng dẫn giao dịch này](https://ethereum.org/en/developers/docs/transactions/) của Ethereum Foundation.

Để lấy URL Polygon RPC được phong tục từ Alchemy, hãy đến ứng dụng **Hello World** của bạn trong tờ Alchemy dashboard của bạn và nhấn **View Key** ở góc bên phải. Sau đó, hãy tiếp tục và sao chép khóa API HTTP Alchemy của bạn.

![img](/img/alchemy/view-key.png)

Bạn có thể tải về và tạo tài khoản Metamask miễn phí [tại đây](https://metamask.io/download.html). Khi bạn đã tạo tài khoản, hãy thực hiện theo các bước này để thiết lập mạng Polygon PoS trên ví của bạn.

1. **Chọn Thiết lập** từ thực đơn thả xuống trong góc bên phải trên của ví MetaMask.
2. Chọn **Networks** từ trình đơn sang bên trái.
3. Kết nối ví của bạn với Test Mumbai, bằng các thông số sau:

**Tên:** Polygon Mumbai, Testnet

**URL RPC mới:** https://polygon-mumbai.g.alchemy.com/v2/your -api-key

**ChainID:** 80001

**Ký hiệu:** MATIC

**URL Block Explorer:** https://mumbai.polygnscan.com/


### Thêm phát triển điện thoại xác thực Polygon MumbaiName {#add-polygon-mumbai-test-matic}

Bạn sẽ cần một vài dấu hiệu testnet để triển khai hợp đồng thông minh của bạn cho cuộc thi thi Mumbai. Để có được testnet tokens, hãy đến [Polygon Fairucet](https://faucet.polygon.technology/), chọn **Mumbai**, chọn **MATIC Token**, và nhập địa chỉ Polygon ví của bạn, sau đó nhấn vào **Submit**. Do giao thông mạng có thể mất một thời gian để nhận được số lượng testnet của bạn.

Bạn cũng có thể sử dụng [mạng lưới Mumbai miễn phí](https://mumbaifaucet.com/?a=polygon-docs) của Alchemy.

![img](/img/alchemy/faucet.png)

Bạn sẽ thấy token mạng thử nghiệm trong tài khoản MetaMask của mình ngay sau đó.

### Kiểm tra Cân bằng Ví của bạn {#check-your-wallet-balance}

Để kiểm tra kỹ số dư của chúng ta có ở đó không, hãy tạo yêu cầu [eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) bằng [công cụ soạn thảo của Alchemy](https://composer.alchemyapi.io/). **Chọn Polygon** như chuỗi xích, **Polygon Mumbai** là mạng lưới, `eth_getBalance`như phương pháp, và nhập địa chỉ của bạn. Việc này sẽ hoàn trả số lượng MATIC trong ví của chúng ta. Hãy xem [video này](https://youtu.be/r6sjRxBZJuU) để biết hướng dẫn về cách sử dụng công cụ soạn thảo.

![img](/img/alchemy/get-balance.png)

Sau khi bạn nhập địa chỉ tài khoản MetaMask của bạn và nhấn nút **Gửi Request**, bạn nên xem một phản ứng giống như vầy:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

Kết quả này là ở Wei, không phải ETH. Wei là sự phát triển nhỏ nhất của Ether. Quy đổi từ Wei sang Ether là: 1 Ether = 10^18 Wei. Vì vậy, nếu chúng ta quy đổi "0xde0b6b3a7640000" thành số thập phân, chúng ta nhận được 1\*10^18, tương đương với 1 ETH. Phần này có thể được hoán đổi thành 1 MATIC theo mệnh giá.

:::

### Khởi động dự án của bạn {#initialize-your-project}

Trước tiên, chúng ta sẽ cần tạo thư mục cho dự án của mình. Điều hướng đến [dòng lệnh](https://www.computerhope.com/jargon/c/commandi.htm) của bạn và nhập:

```bash
mkdir hello-world
cd hello-world
```

Bây giờ chúng ta đang ở bên trong thư mục dự án của mình, chúng ta sẽ sử dụng `npm init` để khởi tạo dự án. Nếu bạn chưa cài đặt npm, hãy thực hiện theo [các hướng dẫn này](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (chúng ta cũng sẽ cần Node.js, vì vậy hãy tải xuống!).

```bash
npm init # (or npm init --yes)
```

Việc bạn trả lời các câu hỏi cài đặt như thế nào không thực sự quan trọng, đây là cách chúng tôi đã thực hiện để tham khảo:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Phê duyệt package.json và chúng ta sẵn sàng tiếp tục!

### Tải [Hardhat](https://hardhat.org/getting-started/#overview)

Hardhat là một môi trường phát triển để biên soạn, triển khai, thử nghiệm và gỡ lỗi phần mềm Ethereum của bạn. Hardhat giúp các nhà phát triển khi xây dựng các hợp đồng thông minh và dApps cục bộ trước khi triển khai vào chuỗi trực tiếp.

Bên trong `hello-world`dự án của chúng tôi, hãy chạy:

```bash
npm install --save-dev hardhat
```

Hãy xem trang này để biết thêm chi tiết về [hướng dẫn cài đặt](https://hardhat.org/getting-started/#overview).

### Tạo dự án Hardhat {#create-hardhat-project}

Bên trong thư mục dự án `hello-world`, hãy chạy:

```bash
npx hardhat
```

Bạn nên xem thông điệp chào đón và tùy chọn để chọn điều bạn muốn làm. Chọn **tạo một ổ cứng rỗng.config.js**:

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Điều này sẽ tạo một `hardhat.config.js`tệp tin cho chúng ta, nơi chúng ta sẽ xác định tất cả các thiết lập cho dự án của chúng ta.

### Thêm thư mục dự án {#add-project-folders}

Để giữ dự án của chúng ta được tổ chức, chúng ta sẽ tạo ra hai thư mục mới. Điều hướng đến thư mục gốc `hello-world` của dự án trong dòng lệnh của bạn và nhập:

```bash
mkdir contracts
mkdir scripts
```

* `contracts/` là nơi chúng ta sẽ lưu giữ tệp tin mã hợp đồng thông minh hello world
* `scripts/`là nơi chúng ta sẽ giữ các tập lệnh để triển khai và tương tác với hợp đồng của chúng ta

### Viết hợp đồng {#write-the-contract}

Mở dự án **chào thế giới** trong trình biên tập viên yêu thích của bạn, chẳng hạn như [VScode](https://code.visualstudio.com). Hợp đồng thông minh được viết bằng ngôn ngữ được gọi là Solidity là thứ chúng ta sẽ sử dụng để viết hợp đồng `HelloWorld.sol`thông minh của chúng ta.‌

1. Chuyển sang `contracts`thư mục và tạo một tệp tin mới được gọi`HelloWorld.sol`
2. Dưới đây là hợp đồng thông minh Hello World mẫu từ [Ethereum Foundation](https://ethereum.org/en/) mà chúng tôi sẽ sử dụng cho hướng dẫn này. Sao chép và dán nội dung bên dưới vào tệp tin `HelloWorld.sol` của bạn và nhớ đọc các nhận xét để hiểu rõ hợp đồng này có chức năng gì:

```solidity
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

Đây là một hợp đồng thông minh siêu đơn giản, lưu trữ một thông báo khi tạo và có thể được cập nhật bằng cách gọi chức năng `update`.

### Kết nối với MetaMask và Alchemy {#connect-with-metamask-alchemy}

Chúng ta đã tạo ví Metamask, tài khoản Alchemy và viết hợp đồng thông minh của mình, giờ là lúc kết nối ba tài khoản này.

Mọi giao dịch được gửi từ ví ảo của bạn đều yêu cầu chữ ký sử dụng khóa riêng tư duy nhất của bạn. Để cấp cho chương trình của chúng ta quyền này, chúng ta có thể lưu trữ khóa riêng tư (và khóa API Alchemy) một cách an toàn trong một tệp tin môi trường.

Trước tiên, hãy cài đặt gói dotenv trong thư mục dự án của bạn:

```bash
npm install dotenv --save
```

Sau đó, tạo một tệp tin `.env` trong thư mục gốc của dự án và thêm khóa riêng tư Metamask của bạn và URL API Alchemy HTTP vào đó.

:::warning Cảnh báo

tệp tin môi trường của bạn phải được đặt tên `.env`hoặc nó sẽ không được công nhận như một tệp tin môi trường. Không đặt tên cho nó `process.env` hoặc `.env-custom` bất cứ điều gì khác.

Ngoài ra, nếu bạn đang sử dụng một hệ thống điều khiển phiên bản như git để quản lý dự án của bạn, vui lòng **không** theo dõi tệp `.env`tin. Thêm `.env`vào `.gitignore`tệp tin của bạn để tránh xuất bản dữ liệu bí mật.

:::

* Thực hiện theo [các hướng dẫn này](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) này để xuất khóa riêng tư của bạn
* Để lấy được khóa API Alchemy HTTP (URLP), định hướng ứng dụng **Hello World** của bạn trên dashboard của tài khoản của bạn và nhấn **View Key** ở góc bên phải.

`.env` của bạn sẽ trông như thế này:

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Để thực sự kết nối những thứ này với mã của chúng ta, chúng ta sẽ tham khảo những biến số này trong `hardhat.config.js`tệp tin của chúng ta sau này trong bài hướng dẫn này.

### Cài đặt Ethers.js {#install-ethers-js}

Ethers.js là một thư viện giúp việc tương tác và đưa ra yêu cầu tới Ethereum dễ dàng hơn bằng cách gói [các phương thức JSON-RPC tiêu chuẩn](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) với các phương pháp thân thiện với người dùng hơn.

Hardhat giúp dễ dàng tích hợp các [plugin](https://hardhat.org/plugins/) để tạo công cụ bổ sung và chức năng mở rộng. Chúng ta sẽ tận dụng [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) để triển khai hợp đồng. [Ethers.js](https://github.com/ethers-io/ethers.js/) có các phương pháp triển khai hợp đồng hữu ích.

Trong thư mục dự án của bạn:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Chúng ta cũng sẽ yêu cầu ethers trong `hardhat.config.js` của chúng ta trong bước tiếp theo.

### Cập nhật hardhat.config.js {#update-hardhat-config-js}

Chúng ta đã thêm một số hệ thống phụ thuộc và bổ sung. Bây giờ chúng ta cần cập nhật `hardhat.config.js`để dự án của chúng ta nhận ra các quan hệ phụ thuộc.

Cập nhật `hardhat.config.js` của bạn để trông giống như sau:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### Hợp đồng Thông minh của chúng ta {#compile-our-smart-contract}

Để đảm bảo mọi thứ đều hoạt động, hãy biên soạn hợp đồng của chúng ta. Nhiệm vụ `compile` là một trong những tác vụ hardhat được tích hợp sẵn.

Từ dòng lệnh, hãy chạy:

```bash
npx hardhat compile
```

Bạn có thể nhận được lời cảnh báo về `SPDX license identifier not provided in source file`, nhưng ứng dụng có thể vẫn còn hoạt động tốt. Nếu không, bạn luôn có thể nhắn tin trong [discord Alchemy](https://discord.gg/u72VCg3).

### Viết kịch lệnh triển khai của chúng ta {#write-our-deploy-script}

Bây giờ hợp đồng của chúng ta đã được viết và tệp tin cấu hình của chúng ta đã sẵn sàng, đã đến lúc viết tập lệnh triển khai hợp đồng của chúng ta.

Điều hướng đến thư mục `scripts/` và tạo một tệp tin mới có tên `deploy.js`, thêm các nội dung sau vào đó:

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Chúng ta vừa phỏng theo các giải thích của đội ngũ Hardhat về những gì mỗi dòng mã này thực hiện từ [hướng dẫn Hợp đồng](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) tại đây.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` trongethers.js là một phần trừu tượng được sử dụng để triển khai các hợp đồng thông minh mới, vì vậy `HelloWorld` đây là một  [nhà máy](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\)) về các phiên bản thuộc hợp đồng hello world của chúng ta. Khi sử dụng `hardhat-ethers` plugin `ContractFactory` và `Contract`, các phiên bản được kết nối với người ký đầu tiên (chủ sở hữu) theo mặc định.

```javascript
const hello_world = await HelloWorld.deploy();
```

Việc gọi `deploy()`trên một `ContractFactory` sẽ bắt đầu quá trì triển khai và trả về `Promise` giúp xử lý một `Contract` đối tượng. Đây là đối tượng có phương pháp cho mỗi chức năng trong hợp đồng thông minh của chúng ta.

### Triển khai Hợp đồng Thông minh của chúng ta {#deploy-our-smart-contract}

Điều hướng đến dòng lệnh và chạy:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Bạn nên xem một thứ như vầy:

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

Nếu chúng ta đến nhà [thám hiểm Polygon Mumbai](https://mumbai.polygonscan.com/), và tìm kiếm địa chỉ hợp đồng, chúng ta sẽ có thể thấy rằng nó đã được triển khai thành công.

Địa chỉ sẽ khớp với `From`địa chỉ tài khoản MetaMask của bạn và `To`địa chỉ sẽ nói **là Hợp đồng.** Nhưng nếu chúng ta nhắp vào giao dịch, chúng ta sẽ xem địa chỉ hợp đồng của chúng ta trong thực `To`địa.

![img](/img/alchemy/polygon-scan.png)

### Xác minh hợp đồng {#verify-the-contract}

Alchemy cung cấp một [nhà thám hiểm](https://dashboard.alchemyapi.io/explorer) nơi bạn có thể tìm thấy thông tin về các phương pháp được triển khai cùng với hợp đồng thông minh, như thời gian phản ứng, trạng thái HTTP, mã lỗi giữa số khác. Đây là một môi trường tốt để xác minh hợp đồng của bạn và kiểm tra xem các giao dịch có được thực hiện hay không.

![img](/img/alchemy/calls.png)

**Xin chúc mừng! Bạn vừa triển khai một hợp đồng thông minh cho mạng Polygon Mumbai.**

## Tài nguyên bổ sung {#additional-resources}

- [Cách phát triển một Hợp đồng Thông minh NFT](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) - Alchemy có một bài hướng dẫn được viết với một video Youtube trên chủ đề này. Đây là tuần 1 trong số 10 tuần tự do **của nó đến** chuỗi Web3 dev.
- [Polygon API Quickstart](https://docs.alchemy.com/reference/polygon-api-quickstart) - Hướng dẫn viên phát triển của Alchemy để lên và chạy với Polygon
