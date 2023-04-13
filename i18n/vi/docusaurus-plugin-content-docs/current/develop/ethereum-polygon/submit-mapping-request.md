---
id: submit-mapping-request
title: Đồng hồ hóa đơn
description:  Một hướng dẫn về cách xác thực các dấu hiệu giữa Ethereum và Polygon Chain bằng cầu PoS.
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Mapping là cần thiết để chuyển tài sản của bạn sang và từ Ethereum và Polygon PoS. Chúng tôi cung cấp hai cầu nối để làm điều tương tự. Thông tin chi tiết trên cây cầu có thể được hiểu [ở đây](/develop/ethereum-polygon/getting-started.md).

:::tip

Cầu Polygon PoS có sẵn cho cả Polygon Mainnet cũng như Mumbai.

:::

## Các bước để nộp yêu cầu hoán đổi {#steps-to-submit-a-mapping-request}

Để có thể sử dụng bản đồ để có biểu tượng giữa Ethereum và Polygon PoS, bạn có thể sử dụng [bản đồ Polygon Token Maper](https://mapper.polygon.technology/). Mở đường dây và nhấn vào nút **Map Token trên** góc phải để khởi động một yêu cầu bản đồ mới.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Bước 1→** Chọn mạng trên đó bạn muốn bản đồ bộ nhớ. Bạn có thể chọn **Goerli-Mumbai** cho Testnet, và **Ethereum-Polygon PoS** cho Mainnet.

**Bước 2→** Chọn loại vật dụng bạn đang bản đồ - **ERC20**, **ERC721**, hoặc **ERC1155**.

**Bước 3→** Nhập địa chỉ dấu hiệu **Ethereum/Goerli** trong địa chỉ **Ethereum Token**. Đảm bảo mã hợp đồng vật dụng của bạn đã được xác thực trên các nhà thám hiểm **blocktamine /Goerli**.

**Bước 4→** Sau khi thêm **Địa chỉ Token Ethereum**, các cánh đồng tương ứng. **Tên, Token Symol, Token Decimal** sẽ được tự động lưu trữ với chi tiết hợp đồng.

**Bước 5→** Bây giờ, hãy nhấn vào nút **Beginal Mapping** để khởi động quá trình bản đồ. Như điều này liên quan đến giao dịch Ethereum, bạn sẽ cần kết nối ví của bạn để tiến hành.

**Bước 6→** Bạn sẽ được hiển thị một phương thức xem xét với thông tin vật dụng và phí xăng ước tính để hoàn thành bản đồ. Kiểm tra chi tiết và khởi động giao dịch bản đồ bằng cách chọn **Số Lượng Gas Pay To Map**

Sau khi xác nhận giao dịch từ ví của bạn, bạn phải đợi giao dịch để hoàn thành trên Ethereum. Khi giao dịch đã hoàn thành, bạn sẽ được hiển thị sự thành công với địa chỉ biểu hiện của con trên mạng Polygon PoS. Bạn có thể tiếp tục xác thực bản đồ bằng cách kiểm tra địa chỉ biểu đồ của trẻ em được tạo ra trên [Polygonscan](https://polygonscan.com/).

Để có bản đồ Mainnet thành công, bạn có thể cung cấp thông tin về dấu hiệu của bạn ở [đây](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) để được thêm vào [**danh sách Polygon Token**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json).

:::tip

Trong trường hợp có [<ins>bản đồ lưu niệm riêng</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-), bạn có thể thăm viếng tài liệu [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) của chúng tôi và sử dụng thông tin được cung cấp để xây dựng việc thực hiện FX tự chọn để tạo bản đồ thành thành.

:::

## Hướng dẫn Video {#video-guide}

Dưới đây là bài hướng dẫn video nhanh chóng về cách xác thực các dấu hiệu giữa **Ethereum Goerli ↔ Polygon Mumbai**:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Trình duyệt của bạn không hỗ trợ yếu tố video.</p>
</video>
