---
id: delegate
title: Cách uỷ quyền
description: Học cách trở thành người uỷ quyền trên mạng lưới Polygon.
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Cách uỷ quyền {#how-to-delegate}

Đây là một hướng dẫn từng bước để bạn đăng ký trở thành [người uỷ quyền](/docs/maintain/glossary.md#delegator) trên mạng lưới Polygon.

Điều kiện tiên quyết duy nhất là bạn phải có token MATIC và ETH trên địa chỉ mạng chính Ethereum.

## Truy cập bảng điều khiển {#access-the-dashboard}

1. Trong ví của bạn (ví dụ: MetaMask), chọn mạng lưới chính Ethereum.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. Đăng nhập vào [Polygon Staking](https://staking.polygon.technology/).
3. Khi bạn đăng nhập, bạn sẽ thấy một số số số thống kê chung cùng với danh sách của trình xác thực.

![img](/img/staking/home.png)

:::note

Nếu bạn là một trình xác thực, hãy sử dụng một địa chỉ không xác thực khác để đăng nhập vào vai trò đại biểu.

:::

## Uỷ quyền cho một người xác thực {#delegate-to-a-validator}

1. Nhấp vào **Trở thành Người ủy quyền** hoặc cuốn xuống đến một người xác thực cụ thể và nhấp vào **Ủy quyền**.

![img](/img/staking/home.png)

2. Cung cấp số lượng MATIC cần ủy quyền.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. Phê duyệt giao dịch ủy quyền và nhấp **Ủy quyền**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

Sau khi giao dịch ủy quyền hoàn tất, bạn sẽ thấy thông báo **Ủy quyền đã hoàn tất**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## Xem các giao dịch ủy quyền của bạn {#view-your-delegations}

Để xem các giao dịch uỷ quyền của bạn, nhấp [Tài khoản của tôi](https://staking.polygon.technology/account).

![img](/img/staking/myAccount.png)

## Rút phần thưởng {#withdraw-rewards}

1. Nhấp [Tài khoản của tôi](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Bên dưới người xác thực được ủy quyền, nhấp **Rút phần thưởng**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

Thao tác này sẽ rút phần thưởng token MATIC vào địa chỉ Ethereum của bạn.

## Tái góp cổ phần phần thưởng {#restake-rewards}

1. Nhấp [Tài khoản của tôi](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Bên dưới người xác thực được ủy quyền của bạn, nhấp **Tái góp cổ phần phần thưởng**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

Điều này sẽ khởi động lại phần thưởng của bảng chứng chỉ MATIC cho trình xác thực và tăng cọng số lượng cử tri của bạn.

## Mở khoá từ một người xác thực {#unbond-from-a-validator}

1. Nhấp [Tài khoản của tôi](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Bên dưới người xác thực được ủy quyền của bạn, nhấp **Mở khoá**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

Điều này sẽ rút phần thưởng của bạn khỏi trình xác thực và toàn bộ cổ phần của bạn khỏi trình xác thực.

Phần thưởng đã rút ngắn của bạn sẽ xuất hiện ngay lập tức trên tài khoản Ethereum.

Các quỹ cổ phần đã rút của bạn sẽ được khóa đối với 80 [điểm kiểm duyệt](/docs/maintain/glossary.md#checkpoint-transaction).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

Khóa quỹ trong thời hạn mở khóa được áp dụng để đảm bảo không có hành vi độc hại trên mạng lưới.

:::

## Chuyển cổ phần từ nút này sang nút khác {#move-stake-from-one-node-to-another-node}

Chuyển cổ phần từ nút này sang nút khác là một giao dịch đơn lẻ. Không có trì hoãn hoặc thời hạn mở khóa trong sự kiện này.

1. Đăng nhập vào [Tài khoản của tôi](https://wallet.polygon.technology/staking/my-account) trên bảng điều khiển góp cổ phần.
1. Nhấp **Chuyển cổ phần** bên dưới người xác thực được ủy quyền của bạn.
1. Chọn một người xác thực bên ngoài và nhấp **Góp cổ phần tại đây**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. Ghi rõ số lượng cổ phần và nhấp **Chuyển cổ phần**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

Thao tác này sẽ chuyển cổ phần. Bảng điều khiển sẽ cập nhật sau 12 xác nhận khối.

:::info

Cổ phần di chuyển được phép được đưa vào giữa bất kỳ nút nào Ngoại lệ duy nhất là chuyển cổ phần từ một nút Foundation sang nút Foundation khác không được phép.

:::
