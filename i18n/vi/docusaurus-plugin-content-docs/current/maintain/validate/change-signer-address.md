---
id: change-signer-address
title: Thay đổi địa chỉ người ký của bạn
description: Thay đổi địa chỉ của người xác thực của bạn
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Để biết thêm thông tin về [địa chỉ người ký](/docs/maintain/glossary.md#signer-address), xem
[Quản lý khóa](/docs/maintain/validator/core-components/key-management).

## Điều kiện tiên quyết {#prerequisites}

Đảm bảo nút xác thực mới của bạn đã được đồng bộ hoàn toàn và đang chạy địa chỉ người ký mới.

## Thay đổi địa chỉ người ký {#change-the-signer-address}

Hướng dẫn này đề cập đến nút xác thực hiện tại của bạn là Nút 1 và nút xác thực mới của bạn là Nút 2.

1. Đăng nhập vào [bảng điều khiển góp cổ phần](https://staking.polygon.technology/) bằng địa chỉ Nút 1.
2. Trên hồ sơ của bạn, nhấp **Chỉnh sửa hồ sơ**.
3. Trong trường **Địa chỉ người ký**, ghi rõ địa chỉ Nút 2.
4. Trong trường **Khóa công khai của người ký**, ghi rõ khóa công khai Nút 2.

Để lấy khóa công khai, chạy lệnh sau trên nút xác thực:

   ```sh
   heimdalld show-account
   ```

Nhấp **Lưu** sẽ lưu các chi tiết mới cho nút của bạn. Điều này căn bản có nghĩa là Nút 1 sẽ là địa chỉ kiểm soát cổ phần của bạn nơi mà các phần thưởng sẽ được gửi đến, v.v. Và Nút 2 bây giờ sẽ thực hiện các hoạt động như ký khối, ký điểm kiểm duyệt, v.v.
