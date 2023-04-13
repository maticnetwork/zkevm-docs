---
id: validator-staking-operations
title: Góp cổ phần trên Polygon
description: Học cách xác thực như một trình xác thực trên Polygon Network
keywords:
  - docs
  - matic
  - polygon
  - stake
  - claim
  - unstake
slug: validator-staking-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Điều kiện tiên quyết {#prerequisites}

### Thiết lập nút đầy đủ {#full-node-set-up}

Nút xác thực của bạn đã thiết lập đầy đủ và đồng bộ. Xem thêm:

* [Chạy một nút xác thực](run-validator.md)
* [Chạy một Nút Người xác thực với Ansible](run-validator-ansible.md)
* [Chạy một Nút xác thực từ Nhị phân](run-validator-binaries.md)

### Thiết lập tài khoản {#account-setup}

Trên nút xác thực của bạn, hãy kiểm tra xem tài khoản đã được thiết lập. Để kiểm tra, hãy chạy lệnh sau **trên nút xác thực**:

```sh
    heimdalld show-account
```

Kết quả của bạn sẽ xuất hiện ở định dạng sau:

```json
{
    "address": "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
    "pub_key": "0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19"
}
```

Thao tác này sẽ hiển thị địa chỉ và khóa công khai cho nút xác thực của bạn. Ghi chú rằng **địa chỉ này phải khớp với địa chỉ của người ký trên Ethereum**.

###
Hiển thị khóa riêng tư  {#show-private-key}

Bước này là tùy chọn.

Trên nút xác thực của bạn, hãy kiểm tra xem khóa riêng là đúng. Để kiểm tra, hãy chạy lệnh sau **trên nút xác thực**:

```sh
heimdalld show-privatekey
```

Kết quả sau sẽ xuất hiện:

```json
{
    "priv_key": "0x********************************************************"
}
```

## Góp cổ phần trên Polygon {#stake-on-polygon}

Bạn có thể đặt cổ phần vào Polygon bằng cách sử dụng [bảng điều khiển của người xác thực](https://staking.polygon.technology/validators/).

### Góp cổ phần bằng bảng điều khiển góp cổ phần {#stake-using-the-staking-dashboard}

1. Truy cập [bảng điều khiển của người xác thực](https://staking.polygon.technology/validators/).
2. Đăng nhập với ví của bạn. MetaMask là ví được khuyến nghị. Bạn phải đảm bảo rằng bạn đăng nhập bằng cùng một địa chỉ mà các dấu MATIC hiện tại.
3. Nhấn vào **Trở Thành Một Người Kiểm Tra** Bạn sẽ được yêu cầu thiết lập nút của bạn. Nếu bạn chưa thiết lập nút của mình thì bạn sẽ cần phải làm như vậy, bằng không, nếu tiếp tục thì bạn sẽ gặp lỗi khi cố gắng góp cổ phần.
4. Trên màn hình tiếp theo, thêm chi tiết về người xác thực của bạn, tỷ lệ hoa hồng và số lượng góp cổ phần của bạn.
5. Nhấp vào **Góp cổ phần** ngay.

Sau khi giao dịch hoàn tất, bạn sẽ góp cổ phần thành công để trở thành người xác thực. Bạn sẽ được yêu cầu ba lần để xác nhận giao dịch.

* Phê duyệt giao dịch — bước này sẽ chấp thuận giao dịch cổ phần của bạn.
* Góp cổ phần — Bước này sẽ xác nhận giao dịch cổ phần của bạn.
* Lưu —ß Thao tác này sẽ lưu thông tin chi tiết về người xác thực của bạn.

:::note

Để các thay đổi có hiệu lực trên [bảng điều khiển góp cổ phần](https://staking.polygon.technology/account), thì cần có tối thiểu 12 xác nhận khối.

:::

### Kiểm tra số dư {#check-the-balance}

Kiểm tra số dư của địa chỉ của bạn:

```sh
heimdallcli query auth account SIGNER_ADDRESS --chain-id CHAIN_ID
```

ở đâu

* SIGNER_ADDRESS —[địa chỉ người ký ](/docs/maintain/glossary.md#validator)của bạn.
* CHAIN_ID — ID chuỗi mạng lưới chính Polygon với tiền tố ứng dụng máy khách:`heimdall-137`.

Kết quả sau sẽ xuất hiện:

```json
address: 0x6c468cf8c9879006e22ec4029696e005c2319c9d
coins:
- denom: matic
amount:
    i: "1000000000000000000000"
accountnumber: 0
sequence: 0
```

### Nhận phần thưởng với tư cách là người xác thực {#claim-rewards-as-a-validator}

Sau khi bạn được thiết lập và góp cổ phần trong vai trò là người xác thực, bạn sẽ kiếm được phần thưởng khi thực hiện các nhiệm vụ của người xác thực. Khi bạn thực hiện các nhiệm vụ của người xác thực một cách nghiêm túc, bạn sẽ nhận được phần thưởng.

Để nhận phần thưởng, bạn có thể truy cập [bảng điều khiển người xác thực](https://staking.polygon.technology/account) của mình.

Bạn sẽ thấy hai nút trên hồ sơ của mình:

* Rút tiền thưởng
* Góp cổ phần bằng phần thưởng

#### Rút tiền thưởng {#withdraw-reward}

Với tư cách là người xác thực, bạn sẽ nhận phần thưởng miễn là bạn thực hiện các nhiệm vụ của người xác thực của mình.

Nhấp vào **Rút ​​phần thưởng** sẽ nhận được phần thưởng của bạn về ví của mình.

Bảng điều khiển sẽ cập nhật sau 12 xác nhận khối.

#### Góp cổ phần bằng phần thưởng {#restake-reward}

Góp cổ phần bằng phần thưởng của bạn là một cách dễ dàng để tăng cổ phần của người xác thực cho bạn.

Nhấp vào **Góp cổ phần bằng Phần thưởng** sẽ mua lại cổ phần bằng phần thưởng của bạn và tăng mức cổ phần của bạn.

Bảng điều khiển sẽ cập nhật sau 12 xác nhận khối.
