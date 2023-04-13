---
id: the-graph
title: Thiết lập một Dự án với The Graph và Polygon PoS
sidebar_label: The Graph
description: Tìm hiểu cách thiết lập một dự án được lưu trữ với The Graph và Polygon.
keywords:
  - polygon
  - matic
  - graph
  - the graph
  - index
  - query
  - subgraph
image: https://matic.network/banners/matic-network-16x9.png
slug: graph
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Graph, một giao thức phi tập trung để lập chỉ mục và truy vấn dữ liệu chuỗi, hỗ trợ chuỗi Matic. Dữ liệu được xác định thông qua các subgraph rất dễ truy vấn và khám phá. Các subgraph có thể được tạo cục bộ hoặc sử dụng explorer được lưu trữ miễn phí để lập chỉ mục và hiển thị dữ liệu.

> Lưu ý: Xem https://thegraph.com/docs/quick-start để biết thêm chi tiết, cài đặt cục bộ và hơn thế nữa. Tài liệu bao gồm một ví dụ để tìm hiểu cách hoạt động của các subgraph và video này cung cấp một cách giới thiệu tốt.

## Các bước {#steps}

1. Đi tới Graph Explorer (https://thegraph.com/explorer/) và thiết lập một tài khoản. Bạn sẽ cần tài khoản GitHub để xác thực.

2. Đi tới bảng điều khiển của bạn và nhấn vào Thêm Subgraph. Xác định Tên, Tài khoản, Phụ đề của subgraph và cập nhật hình ảnh và thông tin khác (bạn có thể cập nhật sau) nếu muốn.

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. Cài đặt Graph CLI trên máy của bạn (sử dụng npm hoặc yarn)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. Lệnh sau tạo một subgraph lập chỉ mục tất cả các sự kiện của một hợp đồng hiện hữu. Nó cố gắng tìm nạp hợp đồng ABI từ BlockScout và quay trở lại yêu cầu đường dẫn tệp tin cục bộ. Nếu thiếu bất kỳ đối số tùy chọn nào, bạn sẽ phải chuyển qua biểu mẫu tương tác.

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Matic” for Matic mainnet and “Mumbai” for Matic Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on the Matic network: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> Lưu ý: Thông tin chi tiết có tại đây: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. Xác thực bằng dịch vụ được lưu trữ

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
Bạn có thể tìm thấy token truy cập bằng cách truy cập bảng điều khiển của mình trên trang web graph.

6. cd vào thư mục bạn đã tạo và bắt đầu xác định subgraph. Thông tin về cách tạo một subgraph có sẵn trong Tài liệu Graph tại đây. https://thegraph.com/docs/define-a-subgraph

7. Khi bạn đã sẵn sàng, hãy triển khai subgraph của bạn. Bạn luôn có thể thử nghiệm và triển khai lại khi cần thiết.

> Nếu subgraph đã triển khai trước đó của bạn vẫn ở trạng thái Đang đồng bộ, nó sẽ ngay lập tức được thay thế bằng phiên bản mới được triển khai. Nếu subgraph được triển khai trước đó đã được đồng bộ hóa hoàn toàn, Nút Graph sẽ đánh dấu phiên bản mới được triển khai là Phiên bản đang chờ xử lý, đồng bộ hóa ngầm và chỉ thay thế phiên bản hiện được triển khai bằng phiên bản mới sau khi quá trình đồng bộ hóa phiên bản mới kết thúc. Điều này đảm bảo rằng bạn có một subgraph để làm việc trong khi phiên bản mới đang đồng bộ hóa.

```bash
yarn deploy
```

Subgraph của bạn sẽ được triển khai và có thể được truy cập từ bảng điều khiển của bạn.

Bạn có thể tìm hiểu về cách truy vấn subgraph tại đây: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

Nếu bạn muốn đặt subgraph của mình ở chế độ công khai, bạn có thể làm như vậy bằng cách truy cập subgraph từ bảng điều khiển rồi nhấn vào nút chỉnh sửa. Bạn sẽ thấy thanh trượt ở cuối trang chỉnh sửa.
