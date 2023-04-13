---
id: custom-tokens
title: Cấu hình các tượng tự chọn
description: Định cấu hình token tùy chỉnh trên trên Metamask.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Trang này biểu hiện quá trình cấu hình/thêm các dấu ấn riêng cho Metamank.

Bạn có thể sử dụng quá trình tương tự để thêm bất kỳ dấu hiệu nào cho mạng trên Metamark. Bạn có thể tham khảo bàn [này](#tokens-and-contract-adresses) để hình dung một số ví dụ về các dấu hiệu thử nghiệm với địa chỉ hợp đồng tương ứng của chúng.

## Thêm một dấu hiệu tùy chọn cho tài khoản MetaMask của bạn. {#adding-a-custom-token-to-your-metamask-account}

Đầu tiên, hãy chọn mạng thích hợp cho dấu hiệu mới trên màn hình nhà của Metamark. Sau đó nhấn vào "Nhập Toku".

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

Nó sẽ hướng dẫn bạn đến một màn hình mới. Trên màn hình Chữ Nhập (Đồng thời) , bản sao một địa chỉ trong trường Địa chỉ Token.

:::info
Để minh họa cho quá trình này, chúng ta đang sử dụng một dấu hiệu **ERC20-TESV4** trên **mạng Goerli.** Tìm các dấu thử nghiệm khác từ các mạng khác [<ins>ở đây</ins>](#tokens-and-contract-adresses).
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

Các trường khác sẽ tự động điền. Nhấn vào Thêm Các Biểu Tượng Tự Chọn và sau đó nhấn vào Nhập Toku. Token `TEST` bây giờ sẽ được hiển thị trên tài khoản của bạn trên Metamask.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**Thêm token ERC1155 thử nghiệm vào tài khoản Metamask của bạn**

Mặc dù mạng lưới Polygon hỗ trợ ERC1155, [Metamask vẫn chưa hỗ trợ tiêu chuẩn](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). Cập nhật này được dự kiến trong quý 4 của năm 2021.

### Các tượng và Addies {#tokens-and-contract-adresses}

| token | Mạng lưới | Địa chỉ Hợp đồng |
|---------------|---------|----------------------------------------------|
| ERC20, ESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |