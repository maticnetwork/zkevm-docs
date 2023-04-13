---
id: nftstorage
title: Mint NFT
description: Mint bằng NFT.storage và Polygon.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Hướng dẫn này sẽ dạy bạn cách mint một NFT bằng blockchain Polygon và bộ lưu trữ IPFS/Filecoin qua NFT.Storage. Polygon – giải pháp mở rộng Lớp 2 dành cho Ethereum – thường được các nhà phát triển chọn vì tốc độ và chi phí giao dịch thấp hơn trong khi vẫn duy trì khả năng tương thích đầy đủ với EVM của Ethereum. Hướng dẫn này sẽ lần lượt giới thiệu cho bạn cách tạo và triển khai hợp đồng thông minh được chuẩn hóa, lưu trữ siêu dữ liệu và tài sản trên IPFS và Filecoin qua API NFT.Storage và mint NFT vào ví của riêng bạn trên Polygon.

## Giới thiệu {#introduction}

Trong hướng dẫn này, chúng ta sẽ hướng tới việc đáp ứng ba đặc tính bằng quy trình mint của mình:

1. *Khả năng mở rộng* của quy trình mint về mặt chi phí và thông lượng. Nếu trường hợp sử dụng là nhằm nhanh chóng tạo NFT, công nghệ cơ sở cần phải xử lý tất cả các yêu cầu mint và quá trình mint phải rẻ.
2. *Độ bền* của NFT, vì tài sản có thể tồn tại lâu dài và do đó cần duy trì khả năng sử dụng trong suốt thời gian tồn tại của chúng.
3. *Tính bất biến* của NFT và tài sản mà nó đại diện nhằm ngăn chặn các thay đổi không mong muốn và các tác nhân độc hại làm thay đổi tài sản kỹ thuật số mà NFT đại diện.

[Polygon](https://polygon.technology) giải quyết đặc tính *khả năng mở rộng* bằng giao thức và khuôn khổ của chúng. Chúng cũng tương thích với Ethereum và máy ảo của nó, cho phép các nhà phát triển di chuyển mã của mình tự do giữa hai blockchain. Tương tự, [NFT.Storage](https://nft.storage) đảm bảo *độ bền* bằng sức mạnh của mạng lưới [Filecoin](https://filecoin.io) cơ sở và *tính bất biến* bằng cách sử dụng [tính năng nhắm đến nội dung](https://nftschool.dev/concepts/content-addressing/) của IPFS.

Trong hướng dẫn này, bạn sẽ nắm được tổng quan về quy trình mint NFT, tìm hiểu cách lưu trữ tài sản kỹ thuật số bằng NFT.Storage và sử dụng tài sản kỹ thuật số này để mint NFT của bạn trên Polygon.

## Điều kiện tiên quyết {#prerequisites}

Kiến thức chung về NFT sẽ cung cấp cho bạn thông tin và bối cảnh. [NFT School chứa kiến thức cơ bản về NFT](https://nftschool.dev/concepts/non-fungible-tokens/), các chủ đề nâng cao và mang đến nhiều hướng dẫn hơn.

Để thử nghiệm và chạy mã có trong hướng dẫn này, bạn sẽ cần [cài đặt Node.js](https://nodejs.org/en/download/package-manager/) đang hoạt động.

Bạn cũng sẽ cần ví Polygon trên mạng thử nghiệm Mumbai với một số lượng nhỏ token MATIC. Thực hiện theo hướng dẫn bên dưới để bắt đầu:

1. **Tải về và cài đặt [Metamask](https://metamask.io/)**. Metamask là ví mã hóa và cổng vào các ứng dụng blockchain. Nó rất dễ sử dụng và đơn giản hóa nhiều bước, ví dụ: thiết lập ví Polygon.
2. **Kết nối Metamask với [mạng thử nghiệm Mumbai](https://docs.polygon.technology/docs/develop/metamask/overview) của Polygon** và chọn trong trình đơn thả xuống. Chúng ta sẽ sử dụng mạng thử nghiệm của Polygon để mint NFT vì nó miễn phí.
3. **Nhận token MATIC** về ví của bạn bằng cách sử dụng [vòi](https://faucet.polygon.technology/). Chọn mạng thử nghiệm Mumbai và dán địa chỉ ví của bạn từ Metamask vào biểu mẫu. Để mint một NFT, chúng ta cần trả một số lượng nhỏ MATIC, là phí do thợ đào tính phí cho các hoạt động thêm giao dịch mới vào blockchain, ví dụ: mint NFT hoặc tạo hợp đồng thông minh mới.
4. **Sao chép khóa riêng tư của bạn** từ Metamask bằng cách nhấn vào dấu ba dấu chấm ở góc trên cùng bên phải và chọn "Chi tiết tài khoản". Ở phía dưới cùng, bạn có thể tìm thấy một nút để xuất khóa riêng tư của mình. Nhấn vào và nhập mật khẩu của bạn khi được nhắc. Bạn có thể sao chép và dán khóa riêng tư trong tệp tin văn bản lúc này. Về sau, chúng ta sẽ sử dụng nó trong hướng dẫn khi tương tác với blockchain.

Cuối cùng, bạn sẽ cần một trình soạn thảo mã hoặc văn bản. Để tiện lợi hơn, hãy chọn một trình soạn thảo có hỗ trợ ngôn ngữ cho cả JavaScript và Solidity. Một lựa chọn tốt là [Visual Studio Code](https://code.visualstudio.com) đã kích hoạt sẵn phần mở rộng [solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity).

## Chuẩn bị {#preparation}

### Lấy khóa API cho NFT.storage {#get-an-api-key-for-nft-storage}

Để sử dụng NFT.Storage, bạn cần một khóa API. Trước tiên, [hãy tới NFT.Storage để đăng nhập bằng địa chỉ email của bạn](https://nft.storage/login/). Bạn sẽ nhận được một email chứa liên kết ma thuật giúp bạn đăng nhập -- không cần mật khẩu. Sau khi bạn đăng nhập thành công, hãy truy cập Khóa API qua thanh điều hướng. Bạn sẽ tìm thấy một nút tạo **Khóa Mới**. Khi được nhắc nhập tên khóa API, bạn có thể tự do chọn tên hoặc sử dụng “polygon + NFT.Storage”. Bạn có thể sao chép nội dung của cột khóa lúc này hoặc tham khảo lại NFT.Storage ở phần sau của hướng dẫn.

### Thiết lập vùng làm việc của bạn {#set-up-your-workspace}

Tạo một thư mục trống mới mà chúng ta có thể sử dụng làm vùng làm việc của mình cho hướng dẫn này. Cứ thoải mái chọn bất kỳ tên và vị trí nào trên hệ thống tệp tin của bạn. Mở một thiết bị đầu cuối và điều hướng đến thư mục mới được tạo.

Tiếp theo, chúng ta sẽ cài đặt phần phụ thuộc Node.js sau:

- **Hardhat và Hardhat-Ethers**, một môi trường phát triển dành cho Ethereum (và các blockchain tương thích Ethereum như Polygon).
- **OpenZeppelin**, một bộ sưu tập các hợp đồng thông minh có các hợp đồng cơ sở NFT được tiêu chuẩn hóa.
- **NFT.Storage**, một thư viện để kết nối với API NFT.Storage.
- **Dotenv**, một thư viện để xử lý các tệp tin môi trường dành cho cấu hình (ví dụ: đưa các khóa riêng tư vào tập lệnh).

Sử dụng lệnh sau để cài đặt tất cả các phần phụ thuộc cùng một lúc:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Cần khởi tạo Hardhat trong thư mục hiện tại. Để bắt đầu quá trình khởi tạo, hãy thực thi:

```bash
npx hardhat
```

Khi được nhắc lại, hãy chọn **Tạo một ổ cứng rỗng.config.js**. Kết xuất bảng điều khiển của bạn sẽ giống như thế này:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Chúng ta sẽ thực hiện một số sửa đổi đối với tệp tin cấu hình hardhat `hardhat.config.js` để hỗ trợ mạng lưới thử nghiệm Polygon Mumbai. Mở `hardhat.config.js` được tạo trong bước cuối cùng. Xin lưu ý rằng chúng ta đang tải khóa riêng tư ví Polygon của bạn từ tệp tin môi trường và tệp tin môi trường này phải được giữ an toàn. Bạn thậm chí có thể sử dụng [liên kết](https://docs.polygon.technology/docs/operate/network) rpc khác theo yêu cầu.

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

Tạo một tệp tin mới được gọi `.env`là sẽ giữ khóa API cho NFT. Storage và ví Polygon của bạn. Nội dung của `.env`tệp tin sẽ trông giống như :

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

Thay thế các phần giữ chỗ bằng khóa API bạn được tạo trong quá trình chuẩn bị và khóa riêng tư ví Polygon của bạn.

Để tạo tính tổ chức cho dự án, chúng ta sẽ tạo ba thư mục mới:

1. `contracts`, dành cho các hợp đồng Polygon được viết trong Solidity.
2. `assets`, chứa tài sản kỹ thuật số chúng ta sẽ mint làm NFT.
3. `scripts`, làm thư mục trợ giúp thúc đẩy quy trình chuẩn bị và mint.

Hãy thực thi lệnh sau:

```bash
mkdir contracts assets scripts
```

Cuối cùng, chúng ta sẽ thêm một hình ảnh vào thư mục `assets`. Hình ảnh này sẽ là tác phẩm nghệ thuật mà chúng ta sẽ tải lên NFT.Storage và mint trên Polygon. Chúng ta sẽ đặt tên là `MyExampleNFT.png` ngay. Nếu chưa có sẵn một số tác phẩm nghệ thuật đẹp mắt, bạn có thể [tải về một mẫu đơn giản](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu).

## Mint NFT của bạn {#minting-your-nft}

### Lưu trữ dữ liệu tài sản bằng NFT.Storage {#storing-asset-data-with-nft-storage}

Chúng ta sẽ sử dụng NFT.Storage để lưu trữ tài sản kỹ thuật số và siêu dữ liệu của nó. NFT.Storage đảm bảo tính bất biến và độ bền bằng cách tự động tải tài sản kỹ thuật số của bạn lên Filecoin và IPFS. IPFS và Filecoin hoạt động trên mã định danh nội dung (CID) để tham chiếu bất biến. IPFS sẽ cung cấp khả năng truy xuất nhanh chóng bằng bộ nhớ đệm được sao chép theo địa lý và Filecoin đảm bảo độ bền với các nhà cung cấp dịch vụ lưu trữ được khuyến khích.

Tạo một tập lệnh gọi là `store-asset.mjs` bên dưới thư mục `scripts`. Nội dung được liệt kê dưới đây:

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Phần chính của tập lệnh là chức năng `storeAsset`. Nó tạo một máy khách mới kết nối với NFT.Storage bằng khóa API mà bạn đã tạo trước đó. Tiếp theo chúng ta giới thiệu siêu dữ liệu bao gồm tên, mô tả, và hình ảnh. Lưu ý rằng chúng ta đang đọc tài sản NFT trực tiếp từ hệ thống tệp tin từ thư mục `assets`. Ở phần cuối của chức năng, chúng ta sẽ in URL siêu dữ liệu vì sau này chúng ta sẽ sử dụng nó khi tạo NFT trên Polygon.

Sau khi thiết lập tập lệnh , bạn có thể thực thi bằng cách chạy:

```bash
node scripts/store-asset.mjs
```

Kết quả của bạn sẽ trông giống như danh sách dưới đây, trong đó `HASH` là CID cho tác phẩm nghệ thuật mà bạn vừa lưu trữ.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Tạo NFT của bạn trên Polygon {#creating-your-nft-on-polygon}

#### Tạo hợp đồng thông minh để mint {#create-the-smart-contract-for-minting}

Trước tiên, chúng ta sẽ tạo hợp đồng thông minh được sử dụng để mint NFT. Vì Polygon tương thích với Ethereum nên chúng ta sẽ viết hợp đồng thông minh trong [Solidity](https://soliditylang.org). Tạo một tệp tin mới cho hợp đồng thông minh NFT của chúng ta gọi là `ExampleNFT.sol` trong thư mục `contracts`. Bạn có thể sao chép mã của danh sách dưới đây:

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

Để trở thành một NFT hợp lệ, hợp đồng thông minh của bạn phải triển khai tất cả các phương pháp của [tiêu chuẩn ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/). Chúng ta sử dụng cách triển khai của thư viện [OpenZeppelin](https://openzeppelin.com), vốn đã cung cấp một tập hợp các chức năng cơ bản và tuân thủ tiêu chuẩn.

Ở phần trên cùng của hợp đồng thông minh, chúng ta nhập ba lớp hợp đồng thông minh OpenZeppelin:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` chứa quá trình triển khai các phương pháp cơ bản của tiêu chuẩn ERC-721 mà hợp đồng thông minh NFT của chúng ta sẽ kế thừa. Chúng ta sử dụng `ERC721URIStorage,`, đây là một tiện ích mở rộng để lưu trữ không chỉ tài sản mà cả siêu dữ liệu dưới dạng tệp tin JSON ngoài chuỗi. Giống như hợp đồng, tệp tin JSON này cần tuân thủ ERC-721.

2. `\@openzeppelin/contracts/utils/Counters.sol` cung cấp những bộ đếm chỉ có thể tăng hoặc giảm một. Hợp đồng thông minh của chúng ta sử dụng một bộ đếm để theo dõi tổng số NFT được mint và thiết lập ID duy nhất trên NFT mới của chúng ta.

3. `\@openzeppelin/contracts/access/Ownable.sol` thiết lập kiểm soát truy cập trên hợp đồng thông minh của chúng ta, sao cho chỉ chủ sở hữu hợp đồng thông minh (bạn) mới có thể mint NFT.

Sau các câu lệnh nhập, chúng ta có hợp đồng thông minh NFT tùy chỉnh của mình, hợp đồng này chứa một bộ đếm, một trình khởi tạo, và một phương pháp để thực sự mint NFT. Hầu hết các công việc khó khăn được thực hiện bởi hợp đồng cơ sở kế thừa từ OpenZeppelin, công cụ này triển khai hầu hết các phương pháp mà chúng tôi yêu cầu để tạo NFT theo tiêu chuẩn ERC-721.

Bộ đếm theo dõi tổng số lượng NFT được mint, được sử dụng trong phương pháp mint dưới dạng mã định danh duy nhất cho NFT.

Trong trình khởi tạo, chúng ta chuyển vào hai đối số chuỗi ký tự cho tên của hợp đồng thông minh và biểu tượng (được đại diện bằng ví). Bạn có thể thay đổi chúng thành bất cứ điều gì bạn thích.

Cuối cùng, chúng ta có phương pháp `mintNFT` cho phép chúng ta thực sự mint NFT. Phương pháp này được đặt thành `onlyOwner` để đảm bảo rằng chỉ chủ sở hữu hợp đồng thông minh mới có thể thực thi.

`address recipient`Chỉ định địa chỉ sẽ nhận được NFT ngay lúc đầu.

`string memory tokenURI` là một URL sẽ phân giải thành tài liệu JSON mô tả siêu dữ liệu của NFT. Trong trường hợp của chúng ta, nó đã được lưu trữ trên NFT.Storage. Chúng ta có thể sử dụng liên kết IPFS trả về tới tệp tin JSON siêu dữ liệu trong quá trình thực thi phương pháp.

Bên trong phương pháp, chúng ta tăng bộ đếm để nhận một mã định danh duy nhất mới cho NFT của mình. Sau đó, chúng ta gọi những phương thức được hợp đồng cơ sở cung cấp từ OpenZeppelin để mint NFT cho người nhận với mã định danh mới được tạo và thiết lập URI của siêu dữ liệu. Phương pháp này trả về mã định danh duy nhất sau khi thực thi.

#### Triển khai hợp đồng thông minh cho Polygon {#deploy-the-smart-contract-to-polygon}

Bây giờ, đã đến lúc triển khai hợp đồng thông minh của chúng ta cho Polygon. Tạo một tệp tin mới gọi là `deploy-contract.mjs` trong thư mục `scripts`. Sao chép nội dung của danh sách dưới đây vào tệp tin đó và lưu lại.

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

Việc triển khai hợp đồng được thực hiện bằng các chức năng trợ giúp do thư viện hardhat cung cấp. Trước tiên, chúng ta lấy hợp đồng thông minh mà chúng ta đã tạo trong bước trước đó bằng nhà máy được cung cấp. Sau đó chúng ta triển khai bằng cách gọi phương pháp tương ứng và chờ việc triển khai được hoàn tất. Có một vài dòng nữa bên dưới mã được mô tả để lấy địa chỉ chính xác trong môi trường mạng thử nghiệm. Lưu tệp `mjs`tin.

Thực hiện kịch bản với lệnh sau:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

Nếu mọi thứ đều chính xác, bạn sẽ thấy kết quả sau:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

Lưu ý rằng bạn sẽ cần địa chỉ hợp đồng đã in trong bước mint. Bạn có thể sao chép và dán nó vào một tệp tin văn bản riêng biệt và lưu để dùng sau. Điều này là cần thiết để tập lệnh mint có thể gọi phương pháp mint của hợp đồng cụ thể đó.

#### Mint NFT trên Polygon {#minting-the-nft-on-polygon}

Việc mint NFT bây giờ chỉ đơn thuần là gọi hợp đồng mà chúng ta vừa triển khai cho Polygon. Tạo một tệp tin mới gọi là `mint-nft.mjs` bên trong thư mục `scripts` và sao chép mã này từ danh sách dưới đây:

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Chỉnh sửa hai dòng đầu tiên để chèn **địa chỉ hợp đồng** của bạn từ lần triển khai trước đó và **URL siêu dữ liệu** được trả về khi lưu trữ tài sản bằng NFT.Storage. Phần còn lại của tập lệnh thiết lập lệnh gọi tới hợp đồng thông minh của bạn với tư cách là chủ sở hữu tương lai của NFT và con trỏ tới siêu dữ liệu được lưu trữ trên IPFS.

Tiếp theo, hãy chạy tập lệnh:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

Bạn có thể mong đợi thấy kết quả sau:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

Bạn đang tìm kiếm mã mẫu từ hướng dẫn này ư? Bạn có thể tìm thấy trong kho lưu trữ Github [liên kết](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) polygon-nft.storage-demo.

## Kết luận {#conclusion}

Trong hướng dẫn này, chúng ta đã học cách mint NFT toàn trình với Polygon và NFT.Storage. Sự kết hợp công nghệ này dẫn đến sự phân cấp phù hợp và đảm bảo *khả năng mở rộng*, *độ bền*, và *tính bất biến*.

Chúng ta đã triển khai một hợp đồng thông minh tùy chỉnh để mint NFT cụ thể cho nhu cầu của mình. Đối với hướng dẫn này, chúng ta đã sử dụng một ví dụ đơn giản dựa trên tiêu chuẩn ERC-721. Tuy nhiên, bạn cũng có thể định nghĩa logic phức tạp chi phối vòng đời NFT của bạn. Để tìm hiểu các trường hợp sử dụng phức tạp hơn, tiêu chuẩn kế nhiệm [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) là nơi khởi đầu rất tốt. OpenZeppelin, thư viện mà chúng ta sử dụng trong hướng dẫn có cung cấp [trình hướng dẫn hợp đồng](https://docs.openzeppelin.com/contracts/4.x/wizard) giúp tạo hợp đồng NFT.

Việc mint thành công có thể được xem là bước khởi đầu của giai đoạn có giá trị của NFT. NFT sau đó có thể được sử dụng để chứng minh quyền sở hữu và có thể chuyển nhượng cho những người dùng khác. Lý do chuyển nhượng NFT có thể bao gồm việc bán thành công trên một trong những thị trường NFT như [OpenSea](https://opensea.io), hoặc một loại sự kiện khác như thu mua một vật phẩm trong một trò chơi dựa trên NFT. Khám phá khả năng phong phú dành cho NFT chắc chắn là một bước thú vị tiếp theo.

Nếu bạn muốn giúp xây dựng dự án NFT của bạn với kho NFT, chúng tôi khuyến khích bạn tham `#nft-storage`gia kênh trên D[iscord ](https://discord.gg/Z4H6tdECb9)và S[lack.](https://filecoinproject.slack.com/archives/C021JJRH26B)
