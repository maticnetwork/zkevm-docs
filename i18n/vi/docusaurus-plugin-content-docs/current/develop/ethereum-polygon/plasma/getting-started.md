---
id: getting-started
title: Cầu nối Plasma
sidebar_label: Introduction
description: Tương tác với cầu nối Plasma và Mạng lưới Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Vui lòng kiểm tra [tài liệu Matic.js về Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/) mới nhất để bắt đầu.

Cầu nối về cơ bản là một tập hợp các hợp đồng trợ giúp việc di chuyển tài sản từ chuỗi gốc sang chuỗi con. Về cơ bản, có hai loại cầu nối để di chuyển tài sản giữa Ethereum và Polygon. Cầu nối đầu tiên là cầu nối Plasma và cầu nối thứ hai được gọi là **Cầu nối POS** hoặc **cầu nối Bằng chứng Cổ phần**. **Cây cầu Plasma** cung cấp sự đảm bảo tăng cường an ninh do cơ chế thoát Plasma.

Tuy nhiên, có các hạn chế nhất định trên token con và có kỳ rút tiền 7 ngày liên quan đến tất cả các lần thoát/rút tiền từ Polygon sang Ethereum trên cầu nối Plasma. [Cầu nối POS](/docs/develop/ethereum-polygon/pos/getting-started) linh hoạt hơn và rút tiền nhanh hơn.

Bài hướng dẫn này sẽ hoạt động như một hướng dẫn theo bước tiến để hiểu và sử dụng cây cầu Plasma bằng [Matic JS](https://github.com/maticnetwork/matic.js), đây là cách dễ dàng nhất để tương tác với Cầu Plasma trên Polygon Network.

## Luồng tài sản trong Cầu nối Plasma {#assets-flow-in-plasma-bridge}

Chúng tôi sẽ trình bày luồng chuyển giao tài sản trên Polygon trong hướng dẫn này và cách thức bạn có thể thực hiện tương tự bằng Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. Tài sản mật mã gửi người dùng trong hợp đồng Polygon trên chuỗi chính
2. Một khi các dấu gửi được xác nhận trên chuỗi chính, các dấu tương ứng sẽ được phản chiếu trên chuỗi Polygon
   - Hiện người dùng hiện có thể chuyển tức thì token cho bất kỳ ai họ muốn với phí không đáng kể. Chuỗi Polygon có các khối nhanh hơn (xấp xỉ 1 giây). Bằng cách đó, việc chuyển nhượng sẽ được thực hiện tức thì.
3. Một khi người dùng đã sẵn sàng, chúng có thể rút các dấu còn lại khỏi chuỗi chính. Quá trình rút quỹ được khởi tạo từ Chuỗi bên Plasma. Khoảng thời gian kiểm soát 5 phút được thiết lập, trong đó tất cả các khối trên lớp khối Polygon được xác thực kể từ trạm kiểm soát cuối cùng.

4. Một khi điểm kiểm tra được gửi đến hợp đồng chuỗi chính Ethereum, một dấu hiệu Thoát NFT (ERC721) được tạo ra bằng giá trị tương đối.
5. Số tiền đã rút ngắn có thể được nhận lại từ danh sách Ethereum của bạn từ hợp đồng dây chuyền chính bằng cách sử dụng một quy trình thoát ra.
   - Người dùng cũng có thể thoát nhanh qua 0x hoặc Dharma (sắp ra mắt!)

### Điều kiện tiên quyết
: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Vòi Görli {#görli-faucet}

Để thực hiện bất kỳ giao dịch nào, bạn cũng sẽ cần một chút Ether trong các tài khoản thử nghiệm mà bạn sẽ sử dụng khi thực hiện theo hướng dẫn. Trong trường hợp bạn không có EU nào trên Görli, bạn có thể sử dụng các liên kết faucet được đưa vào đây - https://goerli-faucet.slock.it/.

### Vòi Polygon {#polygon-faucet}

Xuyên suốt hướng dẫn này, chúng tôi sẽ sử dụng token ERC20 `TEST` trên mạng lưới Görli như một ví dụ. Đây là token THỬ NGHIỆM. Trong DApp của bạn, bạn có thể thay thế nó bằng bất kỳ token ERC20 nào. Để lấy một số `TEST`token Thử nghiệm trên Mạng lưới Polygon, bạn có thể truy cập [Vòi Polygon](https://faucet.polygon.technology/).

:::note

Để sử dụng các dấu hiệu của bạn để gửi và rút tiền, bạn sẽ phải lấy dấu hiệu 'bản đồ', về cơ bản là tạo hợp đồng trên chuỗi chính và side-pendor 'nhận thức về sự cố của bạn.

:::

### Thiết lập cơ bản cho Ví Metamask (Không bắt buộc) {#basic-setup-for-the-metamask-wallet-optional}

1. [Tạo một ví dụ](/docs/develop/metamask/hello): Nếu bạn mới với ví dụ, sau đó thiết lập Tài khoản MetaMask.
2. [Cấu hình thử nghiệm Polygon để](/docs/develop/metamask/config-polygon-on-metamask) dễ dàng hình dung dòng chảy của quỹ trên Polygon, nó sẽ được hướng dẫn nếu bạn cấu hình thử nghiệm Polygon trên Metamank. Lưu ý rằng ở đây chúng tôi đang sử dụng Metamask chỉ nhằm mục đích trực quan hóa. Không hề có yêu cầu sử dụng Metamask đối với việc sử dụng Polygon.
3. [Tạo Nhiều Tài Khoản](/docs/develop/metamask/multiple-accounts): Trước khi bắt đầu làm theo hướng dẫn, hãy chuẩn bị sẵn 3 tài khoản thử nghiệm Ethereum.
4. [Định cấu hình token trên Polygon](/docs/develop/metamask/custom-tokens): Để dễ dàng xem luồng quỹ  trên Polygon bằng Matic.js, bạn có thể định cấu hình token trên Metamask. Việc `TEST`token, được lấy làm ví dụ cho sự hướng dẫn này, có thể được cấu hình trong MetaMask để dễ dàng hình dung số lượng tài khoản. Lưu ý lần nữa là **tùy chọn**. Bạn có thể truy cập rất dễ dàng về cân bằng vật dụng và các biến khác bằng [web3.js](https://web3js.readthedocs.io/en/1.0/)
