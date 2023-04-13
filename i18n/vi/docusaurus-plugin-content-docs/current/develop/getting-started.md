---
id: getting-started
title: Giới thiệu Polygon PoS
sidebar_label: Quick Start
description: Phát triển ứng dụng blockchain tiếp theo của bạn trên Polygon.
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution Cập nhật Tài liệu Phát triển

Tài liệu đang được cập nhật, nâng cao và cải tiến. Chúng có thể thay đổi. Vui lòng đưa ra vấn đề hoặc yêu cầu kéo nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào.

:::

Chào mừng đến với **Polygon (tiền thân là Mạng lưới Matic)**! Nền tảng đổi mới và thú vị nhất để phát triển ứng dụng blockchain của bạn. Công nghệ blockchain đã sẵn sàng để cách mạng hóa cách thế giới kỹ thuật số quản lý dữ liệu và tiến hành kinh doanh. Bạn có thể tham gia cuộc cách mạng này bằng cách nhận khởi đầu thuận lợi cho việc phát triển ứng dụng phi tập trung (dApp) của Polygon.

Hướng dẫn này sẽ giới thiệu với bạn về hệ sinh thái Polygon. Bạn sẽ tìm thấy liên kết đến các tài nguyên và trang web quý giá, nơi sẽ cung cấp cho bạn thông tin mới nhất về việc xây dựng không chỉ trên Polygon mà còn về sự phát triển ứng dụng blockchain chung.

:::tip Luôn nắm bắt những điều mới mẻ

Cập nhật các bản cập nhật trình dựng mới nhất từ đội ngũ Polygon và cộng đồng Polygon bằng cách đăng ký [<ins>Các nhóm thông báo Polygon</ins>](https://polygon.technology/notifications/)

:::

## Tính năng chính của Polygon {#key-features-of-polygon}

- **Tốc độ**: Polygon Network sử dụng một chuỗi blockput cao với sự đồng thuận được cung cấp bởi một nhóm sản xuất Block Sản xuất được chọn bởi các cổ đông theo dõi tại mỗi điểm kiểm soát. Lớp Bằng chứng Cổ phần được sử dụng để xác thực các khối và đăng các bằng chứng định kỳ của Nhà sản xuất khối lên mạng lưới chính Eethereum. Điều này cho phép tốc độ xác nhận khối nhanh trong khoảng 2 giây trong khi vẫn bảo toàn lượng phân quyền cao, mang lại thông lượng tuyệt vời cho mạng lưới.
- **Khả năng**: Polygon Network đạt được tốc độ giao dịch giả định của chúng ta trong khoảng cách ít hơn 2 giây trên một sidechain. Việc sử dụng nhiều chuỗi bên giúp mạng lưới xử lý hàng triệu giao dịch mỗi giây. Cơ chế này (đã được minh họa trong chuỗi bên Matic đầu tiên) cho phép mạng lưới Polygon dễ dàng mở rộng.
- **An ninh**: Hợp đồng thông minh của Polygon dựa vào sự an ninh của Ethereum. Để bảo vệ mạng lưới, nó sử dụng ba mô hình bảo mật quan trọng. Nó sử dụng **các hợp đồng quản lý góp cổ phần** của Ethereum và một nhóm trình xác thực được khuyến khích chạy các nút **Heimdall** và **Bor**. Các nhà phát triển cũng có thể triển khai cả hai mô hình (Kết hợp) vào dApp của mình.

## Xây dựng trên Polygon {#building-on-polygon}

Nếu bạn là nhà phát triển Ethereum, bạn đã là nhà phát triển Polygon rồi. Chỉ cần chuyển sang [Polygon RPC](https://polygon-rpc.com/) và bắt đầu. Tất cả những công cụ bạn quen dùng trên blockchain Ethereum đều được hỗ trợ trên Polygon theo mặc định, chẳng hạn như Truffle, Remix, và Web3js.

Bạn có thể triển khai các ứng dụng phi tập trung cho Mạng thử nghiệm Mumbai Polygon hoặc Mạng lưới chính. Mạng thử nghiệm Mumbai Polygon kết nối với Mạng thử nghiệm Goërli Ethereum, hoạt động như ParentChain của mình. Bạn có thể tìm tất cả thông tin chi tiết liên quan đến mạng lưới trong [tài liệu mạng lưới](https://github.com/maticnetwork/matic-docs/blob/master/docs/operate/network.md).

### Ví {#wallets}

Để tương tác với Mạng lưới Polygon, bạn cần có một ví trên nền Ethereum vì Polygon chạy trên Máy Ảo Ethereum (EVM). Bạn có thể chọn thiết lập một Ví [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) hoặc [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md). Nhiều thông tin liên quan đến ví và tại sao bạn cần một người có thể tìm thấy trong [tài liệu ví](https://docs.polygon.technology/docs/develop/wallets/getting-started) của chúng tôi.

### Hợp đồng Thông minh {#smart-contracts}

Polygon hỗ trợ nhiều dịch vụ bạn có thể sử dụng để thử nghiệm, biên soạn, gỡ lỗi, và triển khai các ứng dụng phi tập trung trên Mạng lưới Polygon. Những dịch vụ này bao gồm việc triển khai bằng [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md), và [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md).

### Kết nối với Polygon {#connecting-to-polygon}

Bạn có thể thêm Polygon vào Metamask hoặc trực tiếp sử dụng Arkane, cho phép bạn kết nối với Polygon bằng [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/).

Để kết nối với mạng Polygon để đọc thông tin blockchain, chúng tôi khuyến nghị sử dụng SDK Alchemy.

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### Xây dựng một dApp mới trên Polygon? {#building-a-new-dapp-on-polygon}

Các ứng dụng phi tập trung (dApp) hoạt động như cầu nối giữa người dùng và quyền riêng tư dữ liệu của họ trên blockchain. Số lượng dApp ngày càng tăng xác thực tính hữu ích của chúng trong hệ sinh thái blockchain, giải quyết các thách thức như thực thi giao dịch giữa hai người tham gia mà không cần cơ quan trung ương qua hợp đồng thông minh.

Giả sử trước đây bạn không có kinh nghiệm xây dựng các ứng dụng phi tập trung (dApp). Trong trường hợp đó, các tài nguyên được đề cập dưới đây sẽ cho bạn một khởi đầu thuận lợi về các công cụ cần thiết để dựng, gỡ lỗi, và triển khai dApp trên Mạng lưới Polygon.

- [Full Stack dApp: Chuỗi hướng dẫn](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Phát triển dApp bằng Fauna, Polygon và React](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### Đã có dApp? {#already-have-a-dapp}

Nếu bạn đã có ứng dụng phi tập trung (dApp) và đang tìm kiếm một nền tảng giúp bạn mở rộng quy mô một cách hiệu quả, thì bạn đang ở đúng nơi vì Polygon cho phép bạn:

1. **Dễ dàng di chuyển Máy Ảo Ethereum (EVM) dựa trên chuỗi**: Polygon tự hào là giải pháp mở rộng quy mô Lớp 2 tối thượng cho Ethereum. Bạn không phải lo lắng về kiến trúc cơ sở khi di chuyển hoặc triển khai dApp của mình vào Mạng lưới Polygon miễn là nó tương thích với EVM.
2. **Sử dụng Polygon như một lớp giao dịch nhanh hơn**: Việc triển khai dApp của bạn vào Mạng lưới chính Polygon cho phép bạn tận dụng Polygon như một lớp giao dịch nhanh hơn cho dApp của bạn. Ngoài ra, bạn có thể lấy token do chúng tôi hoán đổi. Bạn có thể tham gia [nhóm thảo luận kỹ thuật](http://bit.ly/matic-technical-group) của chúng tôi trên Telegram để tìm hiểu thêm.

## Ghi chú bên lề {#side-note}

Nếu thông tin ở đây gây choáng ngợp, không sao cả! Bạn có thể hành động ngay và bắt đầu hack. Dưới đây là một số ghi chú trước khi bạn bắt đầu đi sâu vào nghiên cứu tài nguyên, kho lưu trữ, và tài liệu:

1. **Cẩn thận với cái giá khi dùng công nghệ mới nhất**: Giống như lập trình ngách điển hình, công nghệ phát triển dApp và blockchain chuyển động rất nhanh. Trong khi nghiên cứu, bạn có thể tìm thấy các kho lưu trữ mã phức tạp, 404 trên trang web tài liệu, hoặc thậm chí không có tài liệu. Hãy sử dụng cơ hội đó để liên hệ với chúng tôi qua bất kỳ kênh truyền thông xã hội nào.
2. **Đường cong học tập dễ gây nản lòng, nhưng rào cản gia nhập rất thấp**: Cộng đồng rất cởi mở và chào đón! Các dự án hoan nghênh các yêu cầu kéo từ người ngoài và chủ động giải quyết bất kỳ vấn đề vướng mắc nào. Chúng tôi đang nỗ lực tạo ra một thế giới tốt đẹp hơn và sự đóng góp dưới mọi hình thức đều được đánh giá cao. Chúng tôi sẽ hân hạnh khi bạn tham gia vào hệ sinh thái Web3 tuyệt vời này.

:::info Luôn Cập Nhật

Sự phát triển ứng dụng phi tập trung khuyến khích sự phân cấp mạng lưới. Hãy theo dõi các phương tiện truyền thông xã hội của chúng tôi để biết thêm thông tin chi tiết và cập nhật về hệ sinh thái Polygon. Bạn có thể tìm thấy các liên kết đến tất cả cộng đồng Polygon [tại đây](https://polygon.technology/community/).

:::
