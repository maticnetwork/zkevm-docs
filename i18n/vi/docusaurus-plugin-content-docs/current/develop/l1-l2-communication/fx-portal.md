---
id: fx-portal
title: FxPortal
description: Chuyển tình trạng hoặc dữ liệu từ Ethereum sang Polygon mà không có bản đồ bằng FxPortal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cơ chế thông thường để đọc dữ liệu Ethereum từ Polygon đang sử dụng **Sync**. Điều này cho phép chuyển dữ liệu tùy ý từ Ethereum sang Polygon. Tuy nhiên, phương pháp này cũng yêu cầu hoán đổi các hợp đồng gốc và con nếu không thể sử dụng giao diện mặc định. FxPortal cung cấp một giải pháp thay thế trong đó các token chuẩn hóa ERC có thể được triển khai mà không cần hoàn đổi, chỉ cần sử dụng các hợp đồng FxPortal cơ sở đã triển khai.

## FxPortal là gì? {#what-is-fxportal}

Nó là một hệ thống quyền lực nhưng đơn giản thực hiện của cơ chế [đồng bộ](../../pos/state-sync/state-sync-mechanism.md) Polygon state. Cầu nối Polygon PoS được xây dựng trên cùng kiến trúc. Mã trong thư mục [ví dụ](https://github.com/fx-portal/contracts/tree/main/contracts/examples) là một số ví dụ về sự sử dụng. Bạn có thể dễ dàng sử dụng những ví dụ này để xây dựng các cuộc thi thực hiện của riêng mình hoặc cầu nối riêng của bạn, nó cho phép bất kỳ đồng bộ bang nào mà không có bản đồ.

Bạn có thể kiểm tra kho [lưu trữ Github](https://github.com/fx-portal/contracts) cho các hợp đồng và các ví dụ.

## Cách thức hoạt động? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) và [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) là các hợp đồng chính của nó có hiệu quả. Nó gọi và thông qua dữ liệu cho các phương pháp được xác định trên chuỗi khác mà không có bản đồ nào bằng cơ chế đồng bộ bang. Để sử dụng các hợp đồng chính đã triển khai, bạn có thể thực thi các hợp đồng cơ sở của FxPortal trong những hợp đồng thông minh bạn triển khai – [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) và [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Bằng cách xây dựng trên các hợp đồng này, các hợp đồng đã triển khai của bạn sẽ có thể giao tiếp với nhau bằng cơ chế đường hầm dữ liệu.

Nếu không, bạn có thể chọn bản đồ các dấu của mình với các hợp đồng đường hầm đã triển khai. Thông tin triển khai FxTunnel mặc định cho Polygon Mainnet và Testnet theo cách sau:

- [Mạng lưới chính Polygon](https://static.matic.network/network/mainnet/v1/index.json)
- [MumbaiName](https://static.matic.network/network/testnet/mumbai/index.json)

Tìm kiếm từ khóa `FxPortalContracts`trong liên kết trên để tìm tất cả các hợp đồng đường hầm mặc định và các triển khai hợp đồng của FxPortal quan trọng khác.

## Tôi có cần một Sự Kích Thích FxTunnel Tự Chọn không? {#do-i-need-a-custom-fxtunnel-implementation}

Bạn phải đi để **thực thi FxTunnel một cách tự lập**, chỉ khi thực hiện đường hầm mặc định không hợp tác với trường hợp sử dụng. Khi sử dụng đường hầm mặc định FxPortal thì bạn không thể sửa đổi mã hợp đồng của trẻ em. Mã bytecode cho hợp đồng vật dụng trẻ em luôn được sửa chữa và luôn luôn luôn được sửa chữa như vậy cho sự [triển khai của FxTunnel mặc định](https://github.com/fx-portal/contracts/tree/main/contracts/examples). Trong trường hợp bạn cần một đứa trẻ được đề cập , bạn phải đi tìm FxTunnel riêng của bạn, và đọc phần tiếp theo sẽ hướng dẫn bạn thêm trong việc triển khai các Fxtunnell riêng của bạn.

Nó được khuyến nghị rất cao để đọc và hiểu [Truyền Thông Liên bang FxPortal](state-transfer.md) trước khi bạn đọc phần sắp tới. Mỗi phần sắp tới sẽ có liên hệ với hợp đồng đường hầm ví dụ với nó. Những ví dụ này có thể được thực hiện như một sự tham khảo trong khi xây dựng đường hầm fx-đường hầm riêng của bạn.

## Chuyển ERC20 {#erc20-transfer}

Hợp [đồng đường hầm của trẻ và người gốc](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) có thể tạo ra ký gửi của các dấu hiệu trên chuỗi gốc và rút trên dây chuyền trẻ.

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: Bạn có thể gọi chức năng trên hợp đồng triển khai để xác định dấu hiệu ERC20 của bạn và tạo dấu hiệu cho trẻ tương ứng trên chuỗi trẻ em.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: gọi `deposit()`phương pháp gọi với địa chỉ của bộ đồ đã định, địa chỉ có thể rút lại với một số lượng tương ứng (cùng với dữ liệu nếu cần). Bạn phải phê duyệt hợp đồng trước bằng chức năng `approve` của ERC20 chuẩn để tiêu token của mình.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: Địa chỉ được phân công trong `deposit()`có thể rút tất cả số lượng vật dụng bằng chức năng này. Chúng sẽ nhận token con được tạo khi đã hoán đổi lần đầu.
- `rootToChildToken`: Biến thể công khai này chứa dấu hiệu gốc cho bản đồ vật dụng của con. Bạn có thể truy vấn việc hoán đổi bằng địa chỉ của token gốc để biết địa chỉ của token con đã triển khai.

### Từ Polygon Ethereum {#polygon}

1. Triển khai token ERC20 của riêng bạn trên chuỗi gốc. Bạn sẽ cần địa chỉ này sau.
2. Phê duyệt token để chuyển bằng cách gọi chức năng `approve()` của token gốc bằng địa chỉ của đường hầm gốc và số lượng dưới dạng các đối số.
3. Tiến hành gọi `deposit()` bằng địa chỉ của người nhận và số lượng trên chuỗi gốc để nhận token con tương đương trên chuỗi con. Việc này sẽ tự động hoán đổi token. Hoặc bạn có thể gọi `mapToken()` trước khi nạp.
4. Sau khi chuyển đồ, bạn sẽ có thể thực hiện các chuyển giao chéo bằng cách sử dụng các chức năng `deposit`và `withdraw`chức năng của đường hầm.

:::note

Sau khi bạn thực hiện `deposit()`trên chuỗi gốc sẽ mất 22-30 phút để đồng bộ bang hiện hữu. Một khi đồng bộ bang xảy ra, bạn sẽ nhận được số hiệu ở địa chỉ đã định.

:::

### Từ Polygon → Ethereum {#ethereum}

1. Tiến hành gọi `withdraw()` bằng địa chỉ token và số lượng tương ứng dưới dạng đối số trên hợp đồng con để chuyển token con về người nhận đã định trên chuỗi gốc. **Lưu ý hàm băm tx** vì nó sẽ được sử dụng để tạo bằng chứng đốt.

2. Bạn có thể tìm thấy các bước để hoàn thành sự rút ở [đây](#withdraw-tokens-on-the-root-chain).

## Chuyển ERC721 {#erc721-transfer}

Trong trường hợp bạn cần một ví dụ, vui lòng kiểm tra xem [hướng dẫn đường hầm ERC721 này và trẻ em](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer).

### Từ Polygon Ethereum {#polygon-1}

1. Triển khai token ERC721 của riêng bạn trên chuỗi gốc. Bạn sẽ cần địa chỉ này sau.
2. Phê duyệt token để chuyển bằng cách gọi chức năng `approve()` của token gốc với địa chỉ của đường hầm gốc và ID token dưới dạng các đối số.
3. Tiến hành gọi `deposit()` bằng địa chỉ của người nhận và ID token trên chuỗi gốc để nhận token con tương đương trên chuỗi con. Việc này sẽ tự động hoán đổi token. Hoặc bạn có thể gọi `mapToken()` trước khi nạp.

:::note

Sau khi bạn thực hiện `deposit()`trên chuỗi gốc sẽ mất 22-30 phút để đồng bộ bang hiện hữu. Một khi đồng bộ bang xảy ra, bạn sẽ nhận được số hiệu ở địa chỉ đã định.

:::

### Từ Polygon → Ethereum {#ethereum-1}

1. Tiến hành gọi  `withdraw()`bằng địa chỉ token và ID token tương ứng dưới dạng đối số trên hợp đồng con để chuyển token con về người nhận đã định trên chuỗi gốc. **Ghi chú sự hash, tx** sẽ được sử dụng để tạo ra bằng chứng cháy.

2. Bạn có thể tìm thấy các bước để hoàn thành sự rút ở [đây](#withdraw-tokens-on-the-root-chain).

## Chuyển ERC1155 {#erc1155-transfer}

Trong trường hợp bạn cần một ví dụ, vui lòng kiểm tra [kỹ thuật viên ERC1155 Root và Đường hầm Trẻ em](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) này.

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: Được sử dụng để hoán đổi token ERC1155 gốc của bạn với chuỗi con
- `deposit(rootToken, user, id, amount, data)`: Chức năng được sử dụng để nạp token gốc vào chuỗi con
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: Được sử dụng cho nhiều Id token và số lượng tương ứng
- `receiveMessage(inputData)`: Được gọi sau khi bằng chứng đốt đã được tạo ra với trọng tải trả tiền là `inputData`

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: Được sử dụng để rút token từ Polygon sang Ethereum
- `withdrawBatch(childToken, ids, amounts, data)`: Giống như rút nhưng để rút nhiều Id token

### Từ Polygon Ethereum {#polygon-2}

1. Triển khai token ERC1155 của bạn trên chuỗi gốc. Bạn sẽ cần địa chỉ này sau.
2. Gọi `setApprovalForAll(operator, approved)`trên dấu hiệu triển khai với `FxERC1155RootTunnel`địa chỉ để cho `operator`phép `FxERC1155RootTunnel`chuyển dấu của bạn đến Polygon`FxERC1155ChildTunnel`.
3. Hãy gọi `mapToken()`điện thoại `FxERC1155RootTunnel`bằng địa chỉ của token như là .`rootToken` Điều này sẽ gửi một thông điệp để `FxERC1155ChildTunnel`hướng dẫn nó để triển khai và bản đồ dấu hiệu ERC1155 trên Polygon. Để truy cập địa chỉ dấu hiệu của con, hãy gọi điện thoại `rootToChildToken`.`FxERC1155ChildTunnel`
4. Hãy `deposit()`gọi `FxERC1155RootTunnel`bằng địa chỉ của dấu hiệu trên Ethereum như , người `rootToken`nhận như , chứng thực vật là , chứng thực `user`hiện tượng `id`và số lượng như .`amount` Hoặc bạn cũng có thể gọi `depositBatch()` cho nhiều id token.

:::note

Sau khi bạn thực hiện `deposit()`trên chuỗi gốc sẽ mất 22-30 phút để đồng bộ bang hiện hữu. Một khi đồng bộ bang xảy ra, bạn sẽ nhận được số hiệu ở địa chỉ đã định.

:::

### Từ Polygon → Ethereum {#ethereum-2}

1. Gọi `withdraw()`điện thoại `FxERC1155ChildTunnel`với địa chỉ của dấu hiệu trẻ em được triển khai trên Polygon như là `childToken`dấu hiệu `id`(địa chỉ dấu hiệu của trẻ em có thể được lưu trữ từ bản đồ)`rootToChildToken`. Hoặc bạn cũng có thể gọi `withdrawBatch()` cho nhiều id token và số lượng tương ứng. **Ghi chú sự hash, tx** sẽ được sử dụng để tạo ra bằng chứng cháy.

2. Bạn có thể tìm thấy các bước để hoàn thành sự rút ở [đây](#withdraw-tokens-on-the-root-chain).

## Triệt thị các tượng trưng cho Chin RootName {#withdraw-tokens-on-the-root-chain}

:::info

Sau khi bạn thực hiện `withdraw()`trên chuỗi trẻ em, sẽ mất 30-90 phút để có một điểm kiểm tra để xảy ra. Một khi trạm kiểm tra tiếp theo gồm giao dịch burn, bạn có thể rút các dấu trên chuỗi gốc.

:::

1. Tạo bằng chứng đốt bằng cách sử dụng **tx hash**, và **thông điệp_SENT_EVENT_SIG**. Để tạo chứng cứ, bạn có thể sử dụng API hoặc sử dụng API bằng chứng được tổ chức bởi Polygon hoặc bạn cũng có thể xoay xở cho hệ thống API của riêng mình bằng cách tuân theo các hướng dẫn [ở đây](https://github.com/maticnetwork/proof-generation-api).

Điểm cuối bằng chứng được tổ chức bởi Polygon có sẵn ở [đây.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

  - `burnTxHash`là sự hời hợt của giao `withdraw()`dịch bạn đã khởi động trên Polygon.
  - `eventSignature`là dấu hiệu sự kiện của sự kiện được phát hiện bởi chức năng`withdraw()`. Chữ ký sự kiện cho thông điệp_SENT_EVENT_SIG là `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Ví dụ API thế hệ thông minh cho Mainnet và Testnet như sau:

→ [Polygon Mainnet Production](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Mumbai, Testnet Proof generation](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Nạp tải payfounce đã tạo ra như cuộc đối số `receiveMessage()`trong hợp đồng đường hầm tương ứng trên Goerli hoặc Ethereum.

## Chuyển ERC-20 có thể mint {#mintable-erc-20-transfer}

Trong trường hợp bạn cần một ví dụ, vui lòng kiểm tra xem [hướng dẫn Đường hầm Mintable ERC20 và Trẻ em](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) này.

:::info

Trong trường hợp của Tintable Token Fxtunnn, vật dụng trẻ được triển khai trước và dấu hiệu gốc được triển khai chỉ khi quá trình rút đầu tiên được hoàn thành. Địa chỉ hợp đồng chủ yếu có thể được xác định ngay sau khi hợp đồng trẻ được triển khai, nhưng bản đồ sẽ tồn tại về mặt kỹ thuật chỉ khi lần rút đầu tiên được hoàn thành.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: Để nạp token từ Ethereum sang Polygon
- `receiveMessage(bytes memory inputData)`: Bằng chứng đốt cần cung cấp dưới dạng `inputData` để nhận token trên chuỗi gốc

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: Để triển khai một dấu hiệu ERC20 trên mạng Polygon
- `mintToken(address childToken, uint256 amount)`: Mint một số lượng token cụ thể trên Polygon
- `withdraw(address childToken, uint256 amount)`: Để đốt token trên chuỗi con để rút trên chuỗi gốc

### Vật dụng Minting on Polygon {#minting-tokens-on-polygon}

1. Gọi `deployChildToken()` trên `FxMintableERC20ChildTunnel` và chuyển thông tin token cần thiết dưới dạng các tham số. Việc này phát hành một sự kiện `TokenMapped` chứa các địa chỉ  `rootToken`và `childToken`. Hãy ghi lại các địa chỉ này.
2. Gọi `mintToken()` trên `FxMintableERC20ChildTunnel` để mint token trên chuỗi con.
3. Gọi `withdraw()` trên `FxMintableERC20ChildTunnel` để rút token trên Polygon. Ghi chú sự cố giao dịch khi điều này sẽ có ích để tạo ra bằng chứng cháy.
4. Bạn có thể tìm thấy các bước để hoàn thành sự rút ở [đây](#withdraw-tokens-on-the-root-chain).

### Triệt mài các tượng trên Ethereum {#withdrawing-tokens-on-ethereum}

Cung cấp bằng chứng đốt đã tạo dưới dạng đối số cho `receiveMessage()` trong `FxMintableERC20RootTunnel`. Sau đó, số dư token sẽ được phản ánh trên chuỗi gốc.

### Đồng ý gửi về Polygon {#deposit-tokens-back-to-polygon}

1. Đảm bảo bạn phê duyệt `FxMintableERC20RootTunnel` để chuyển token của mình.
2. Gọi `deposit()` trong `FxMintableERC20RootTunnel` với `rootToken` dưới dạng địa chỉ của token gốc và `user` dưới dạng người nhận.
3. Chờ sự kiện đồng bộ bang (22-30 min). Sau đó, bạn có thể truy vấn số dư của người nhận đích trên chuỗi con.

Các ví dụ **ERC721** và **ERC1155** Mintable FxTunnel như sau:

- [Đường hầm FxMintableERC721,](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [Đường hầm FxMintableERC1155,](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## Cách triển khai ví dụ {#example-deployments}

### Goerli {#goerli}

- Trình Quản lý Checkpoint: [0x2890bA17E978480615e30ecB65333b80928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Dummy ERC20 token: [0xe9c7873f81c815d64c71c223462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTnel: [0x3658cFDE5e9629b080805EB06AACFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTnel: [0xA200766a7D64E5461E232A6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Dummy ERC721 token: [0x73594a053cb5dDE5558268d28a74375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTnel: [0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Dummy ERC1155 Token: [0x1906d395752FE0c930f8d061DFEb785e6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnnel : [0x48DE785970ca6eD289315036B6d187888cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- FxERC20: [0xDDE69724AeFBdb084413719fE745aB6e3b055C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20Childnel: [0x9C37aEbbdb7D337E0215BC40152d689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20Childnnel: [0xA2C7eBEf68B44056b4056b4A39C2384275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- Token con ERC20 giả: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E048726267C0221ffA41A888528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721Childnnel: [0x3658cFDE5e9629b080805EB06ACFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b35C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155Childnel: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

Có thể tìm thấy sự triển khai của Mainnet tương ứng [ở đây](https://static.matic.network/network/mainnet/v1/index.json). Tìm từ khóa `FxPortalContracts`để tìm tất cả các hợp đồng đường hầm mặc định và sự triển khai hợp đồng FxPortal quan trọng khác. Bạn có thể sử dụng [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)gói để truy cập vào địa chỉ hợp đồng và ABIS.

## Địa chỉ Hợp đồng {#contract-addresses}

### Mạng thử nghiệm Mumbai {#mumbai-testnet}

| Hợp đồng | Địa chỉ đã triển khai  | | :----- | :- | | [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` | | [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Mạng lưới chính Polygon {#polygon-mainnet}


| Hợp đồng | Địa chỉ đã triển khai  | | :----- | :- | | [FxRoot (Mạng lưới chính Ethereum)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` | | [FxChild (Mạng lưới chính Polygon)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
