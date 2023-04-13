---
id: staking
title: SNhận lấy Polygon
description: SNhận lấy Polygon
keywords:
  - docs
  - polygon
  - matic
  - staking
  - unstake
  - restake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# SNhận lấy Polygon {#staking-on-polygon}

Đối với Polygon Network, bất kỳ người tham gia nào có thể được điều kiện để trở thành người xác thực mạng bằng cách chạy một nút đầy đủ. Động cơ chính cho việc chạy một nút đầy đủ cho người xác thực là kiếm được phần thưởng và phí Transaction. Người xác thực tham gia đồng thuận để Polygon khuyến khích tham gia khi họ nhận được phần thưởng khối và phí giao dịch.

Như slops của người xác thực được giới hạn cho mạng lưới, quá trình được chọn như một trình xác thực là tham gia vào một cuộc đấu giá trên chuỗi sẽ xảy ra ở các giao hệ thông thường như được xác định [ở đây](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716).

## Cổ phần {#stake}

Nếu vị trí được mở, thì phiên đấu giá sẽ bắt đầu cho những người xác thực quan tâm:

- Ở đó, họ sẽ đặt giá mua cao hơn giá mua cuối cùng được đưa ra cho vị trí.
- Quy trình Tham gia Đấu giá được nêu tại đây:
    - Phiên đấu giá được tự động bắt đầu sau khi vị trí được mở.
    - Để tham gia đấu giá, hãy Gọi `startAuction()`
    - Thao tác này sẽ khóa tài sản của bạn trong Trình quản lý Ngăn xếp.
    - Nếu có một số giả mạo tiềm năng khác hơn là cọc của bạn, thì số dấu đã khóa sẽ được trả lại cho bạn.
    - Một lần nữa, cổ phần lớn để giành được cuộc đấu giá.
- Vào cuối kỳ đấu giá, người trả giá cao nhất sẽ thắng và trở thành người xác thực trên mạng Polygon.

:::note

Vui lòng giữ nút đầy đủ của bạn nếu bạn đang tham gia vào cuộc đấu giá.

:::

Quy trình trở thành người xác thực sau khi người trả giá cao nhất thắng được slot là được nêu dưới đây:

- Gọi `confirmAuction()` để xác nhận sự tham gia của bạn.
- Cầu trên Heimdall nghe sự kiện này và phát sóng cho Heimdall.
- Sau khi đồng thuận, trình xác thực được thêm vào Heimdall nhưng không được kích hoạt.
- Kiểm tra bắt đầu xác thực chỉ xác thực sau khi (được `startEpoch`xác định [ở đây)](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187).
- Ngay khi các `startEpoch`reach, trình xác thực được thêm vào `validator-set`và bắt đầu tham gia vào cơ chế đồng thuận.

:::info Đề nghị

Để đảm bảo tính bảo mật cho cổ phần của người xác thực, chúng tôi khuyên người xác thực cung cấp địa chỉ `signer` khác mà từ đó việc xác minh các chữ ký `checkPoint` sẽ được xử lý. Điều này sẽ giữ chìa khóa ký kết tách biệt khỏi ví của người xác thực, để số tiền được bảo vệ trong trường hợp hack nút.

:::

### Hủy bỏ cổ phần {#unstake}

Unstaking cho phép xác thực được ra khỏi hồ sơ của người xác thực. Để đảm bảo **sự thành công tốt**, cổ phần của chúng đã được khóa trong 21 ngày tới.

Khi các trình xác thực muốn thoát khỏi mạng và dừng việc xác thực các khối và các kiểm tra dưới trướng đều có thể `unstake`. Hành động này hiện đang ngay lập tức. Sau hành động này, trình xác thực được xem là từ tập hợp của trình xác thực.

### Góp thêm cổ phần {#restake}

Các người xác thực cũng có thể thêm cổ phần vào số lượng của họ để kiếm được nhiều phần thưởng hơn và cạnh tranh cho vị trí xác thực của họ và duy trì vị trí của họ.
