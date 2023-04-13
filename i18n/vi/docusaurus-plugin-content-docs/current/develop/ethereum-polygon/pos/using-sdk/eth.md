---
id: eth
title: Hướng dẫn Nạp và Rút ETH
sidebar_label: ETH
description: "Nạp và rút token ETH trên mạng lưới Polygon."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

Xem [Tài liệu Matic.js về ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/) mới nhất.

## Tóm tắt nhanh {#quick-summary}

Phần này của tài liệu liên quan đến cách nạp và rút token ERC20 trên mạng lưới Polygon. Các chức năng phổ biến tồn tại giữa các phần ETH, ERC20, ERC721 và ERC1155 của tài liệu với sự khác biệt trong các mẫu đặt tên và thực hiện sao cho phù hợp với tiêu chuẩn. Điều kiện tiên quyết quan trọng nhất khi sử dụng phần này của tài liệu là hoán đổi tài sản của bạn, vì vậy vui lòng nộp yêu cầu hoán đổi tài sản của bạn [tại đây](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

## Giới thiệu {#introduction}

Hướng dẫn này sử dụng Mạng thử nghiệm Polygon (Mumbai) mà bản thân mạng này cũng được hoán đổi tới Mạng lưới Goerli để minh họa việc chuyển tài sản giữa hai blockchain. Điều quan trọng cần lưu ý là với mục đích của hướng dẫn này, bạn nên sử dụng địa chỉ proxy bất cứ khi nào có thể. Điều này là do mặc dù địa chỉ hợp đồng thực hiện có thể thay đổi khi bản cập nhật mới được thêm vào mã hợp đồng, proxy không bao giờ thay đổi và sẽ chuyển hướng tất cả các lệnh gọi đến sang địa chỉ thực hiện mới nhất. Về bản chất, nếu bạn sử dụng địa chỉ proxy, bạn sẽ không cần lo lắng về bất kỳ thay đổi nào xảy ra trên hợp đồng thực hiện trước khi bạn sẵn sàng.

Ví dụ, vui lòng sử dụng `RootChainManagerProxy`địa chỉ cho sự tương tác thay vì địa chỉ`RootChainManager`. Thông tin về việc triển khai như địa chỉ hợp đồng PoS, ABI, và Address Test Token có thể tìm thấy [ở đây](/docs/develop/ethereum-polygon/pos/deployment/).

Hoán đổi tài sản là một bước cần thiết để tích hợp cầu nối PoS trên ứng dụng của bạn, vì vậy nếu bạn chưa làm vậy thì vui lòng nộp yêu cầu hoán đổi [tại đây](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/). Vì mục đích của hướng dẫn này, đội ngũ đã triển khai token thử nghiệm và đã hoán đổi chúng với cầu nối PoS. Hãy yêu cầu tài sản bạn muốn sử dụng trên [vòi](https://faucet.polygon.technology/) và nếu token thử nghiệm không có sẵn thì hãy liên hệ với đội ngũ trên [Discord](https://discord.com/invite/0xPolygon). Chúng tôi sẽ đảm bảo trả lời bạn ngay lập tức.

Trong hướng dẫn sắp tới, mỗi bước sẽ được giải thích chi tiết cùng với một vài đoạn mã. Tuy nhiên, bạn luôn có thể tham khảo [kho lưu trữ](https://github.com/maticnetwork/matic.js/tree/master/examples) này, tại đây sẽ có tất cả **mã nguồn ví dụ** có thể trợ giúp bạn tích hợp và hiểu rõ về hoạt động của cầu nối PoS.

## Luồng Cấp Cao {#high-level-flow}

Nạp ETH –

1. Tạo lệnh gọi **_depositEtherFor_** trên **_RootChainManager_** và **gửi** ether cần thiết.

Rút ETH –

1. **_Đốt_** token trên chuỗi Polygon.
2. Gọi chức năng **_thoát_** trên **_RootChainManager_** để nộp bằng chứng giao dịch đốt. Lệnh gọi này có thể được thực hiện **_sau khi trạm kiểm soát_** được nộp cho khối chứa giao dịch đốt.

## Các bước {#steps}

### Nạp tiền {#deposit}

Có thể nạp ETH vào chuỗi Polygon bằng cách gọi **depositEtherFor** trên hợp đồng **RootChainManager**. Máy khách Polygon PoS trình bày phương pháp **depositEther** để thực hiện lệnh gọi này.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
Các bài gửi từ Ethereum đến Polygon xảy ra bằng cách sử dụng Cơ chế **Đồng bộ State** và điều này mất khoảng 22-30 phút. Sau khi chờ sự tương tác thời gian này, chúng ta sẽ đề cập kiểm tra số lượng cân bằng bằng cách sử dụng thư viện web3.js/matic.js hoặc sử dụng Metamask. Explorer sẽ chỉ hiển thị số dư nếu có ít nhất một lần chuyển nhượng tài sản đã xảy ra trên chuỗi con. [<ins>Liên kết</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) này giải thích cách theo dõi các sự kiện gửi cọc.
:::

### Đốt {#burn}

RĂNG được gửi làm dấu hiệu ERC20 trên chuỗi Polygon. Rút lui theo quá trình tương tự như rút ra ERC20 tokens.

Để đốt các dấu hiệu và tiến hành tiến trình rút quân, hãy gọi chức năng rút lui của hợp đồng MaticWETH. Vì Ether là dấu hiệu ERC20 trên chuỗi Polygon, bạn cần khởi động dấu hiệu **ERC20** từ máy khách Polygon PoS và sau đó gọi `withdrawStart()`phương pháp để khởi động quá trình cháy.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Lưu trữ hàm băm giao dịch cho lệnh gọi này và sử dụng nó trong khi tạo bằng chứng đốt.

### Thoát {#exit}


Một khi trạm **kiểm soát** đã được gửi cho khối chứa giao dịch burn, người dùng sẽ gọi chức **năng thoát** của `RootChainManager`hợp đồng và thông báo bằng chứng của sự cháy. Sau khi nộp bằng chứng hợp lệ, token được chuyển cho người dùng. Máy khách Polygon POS `erc20` trình bày phương pháp `withdrawExit` để thực hiện lệnh gọi này. Chỉ có thể gọi chức năng này sau khi kèm trạm kiểm soát trong chuỗi chính. Có thể theo dõi việc đưa vào trạm kiểm soát bằng cách làm theo [hướng dẫn](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events) này.


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
