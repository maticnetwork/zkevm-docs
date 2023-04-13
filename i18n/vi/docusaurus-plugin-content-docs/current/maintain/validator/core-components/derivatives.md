---
id: derivatives
title: Phái sinh
description: Sự xác thực thông qua số cổ phần xác thực
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon hỗ trợ [ủy quyền](/docs/maintain/glossary#delegator) thông qua cổ phần xác thực. Bằng cách sử dụng mô hình này, sẽ dễ dàng hơn để phân phối phần thưởng cắt giảm có quy mô theo hợp đồng mạng lưới chính Ethereum mà không cần phải tính toán nhiều.

Người ủy quyền ủy quyền bằng cách mua cổ phần của một bể hữu hạn từ những người xác thực. Mỗi người xác thực có token cổ phần xác thực riêng của mình.

Giả dụ người token cổ phần xác thực có thể thay thế VATIC cho Người xác thực A. Khi người dùng uỷ quyền cho Người xác thực A, người dùng được cấp VATIC theo tỷ giá trao đổi giữa MATIC-VATIC. Khi người dùng tích luỹ giá trị, tỷ giá trao đổi biểu thị người dùng có thể rút thêm MATIC cho mỗi VATIC. Khi người xác thực bị cắt giảm, người dùng sẽ rút được ít MATIC hơn đối VATIC của họ.

Lưu ý rằng MATIC là token góp cổ phần. Người ủy quyền cần có token MATIC để tham gia vào ủy quyền.

Ban đầu, Người ủy quyền D mua token từ bể cụ thể của Người xác thực A khi tỷ giá trao đổi là 1 MATIC đổi 1 VATIC.

Khi người xác thực được thưởng thêm token MATIC, các token mới được thêm vào bể.

Giả sử với bể hiện tại gồm 100 token MATIC, 10 phần thưởng MATIC được thêm vào bể. Vì tổng số nguồn cung cấp của VMAC đã không thay đổi do phần thưởng, tỷ lệ trao đổi trở thành 1 MATIC trên 0.9 VATIC. Hiện tại, Delegator D sẽ nhận được nhiều MATIC hơn cho cùng một số lượng nếu cổ phần.

## Dòng chảy trong hợp đồng {#the-flow-in-the-contract}

`buyVoucher`: Chức năng này được quy định khi thực hiện một quy trình ủy quyền đối với người xác thực. Ủy quyền `_amount`trước hết được chuyển tới `stakeManager`, sau khi xác nhận sẽ tạo ra cổ phần ủy quyền qua `Mint` bằng cách sử dụng hiện tại.`exchangeRate`

Tỷ lệ trao đổi được tính theo công thức:

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`: Đây là chức năng được gọi khi người ủy quyền mở khoá từ một người xác thực. Chức năng này cơ bản kích hoạt quy trình bán phiếu quà tặng mua trong khi ủy quyền. Thời hạn rút sẽ được xem xét trước khi người ủy quyền có thể `claim` token của họ.

`withdrawRewards`: Với tư cách là một người ủy quyền, bạn có thể nhận phần thưởng bằng cách sử dụng chức năng `withdrawRewards`.

`reStake`: Tái góp cổ phần có thể thực hiện theo hai cách: a) người ủy quyền có thể mua thêm cổ phần bằng cách sử dụng phần thưởng `buyVoucher` hoặc `reStake`. Bạn có thể tái góp cổ phần bằng cách góp thêm token cho người xác thực hoặc bạn có thể tái góp cổ phần là các phần thưởng tích luỹ của bạn với tư cách là một người ủy quyền. Mục đích của `reStaking` là vì người xác thực của người ủy quyền bây giờ có thêm cổ phần hoạt động, họ sẽ giành được thêm phần thưởng từ đó và người ủy quyền cũng vậy.

`unStakeClaimTokens`: Sau khi thời hạn rút đã hết, những người ủy quyền đã bán cổ phần của họ có thể nhận token MATIC của họ.

`updateCommissionRate`: Cập nhật % hoa hồng đối với người xác thực. Xem [Hoạt động hoa hồng cho người xác thực](/docs/maintain/validate/validator-commission-operations).

`updateRewards`: Khi một người xác thực nhận phần thưởng từ việc gửi [điểm kiểm duyệt](/docs/maintain/glossary#checkpoint-transaction), chức năng này được sử dụng để giải ngân các phần thưởng giữa người xác thực và người ủy quyền.
