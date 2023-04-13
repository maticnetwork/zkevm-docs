---
id: move-stake
title: Chuyển cổ phần
description: Di chuyển cổ phần của bạn trên mạng polygon
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Chuyển cổ phần từ Nút nền tảng sang Nút bên ngoài {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>Trình duyệt của bạn không hỗ trợ yếu tố video.</p>
</video>

Người ủy quyền được lựa chọn để chuyển cổ phần của họ từ Nút nền tảng sang bất kỳ Nút bên ngoài nào mà họ chọn bằng cách sử dụng chức năng Chuyển cổ phần trên UI góp cổ phần

Chuyển cổ phần từ nút nền tảng sang nút bên ngoài là một giao dịch đơn lẻ. Vì vậy không có sự chậm trễ hoặc thời gian mở khoá trong sự kiện này.

Vui lòng lưu ý rằng Chuyển cổ phần chỉ được phép thực hiện từ Nút nền tảng sang Nút bên ngoài. Nếu bạn muốn chuyển cổ phần của mình từ một Nút bên ngoài sang Nút bên ngoài khác, bạn trước hết sẽ phải Mở khoá và sau đó Ủy quyền trên nút bên ngoài mới.

Ngoài ra, chức năng Chuyển cổ phần là một chức năng tạm thời được phát triển bởi nhóm Polygon để đảm bảo chuyển tiếp dễ dàng các quỹ từ Nút nền tảng sang Nút bên ngoài. Và sẽ chỉ hoạt động cho đến khi các nút nền tảng được tắt.

## Cách chuyển cổ phần {#how-to-move-stake}

Để Di chuyển cọc, trước tiên, bạn sẽ cần đăng nhập vào [UI](https://wallet.polygon.technology/staking) bằng Địa chỉ Delegator của bạn.

**Địa** chỉ Delegator: Địa chỉ mà bạn đã sử dụng cho STake trên The Foundation Nodes.

Một khi đăng nhập, bạn sẽ thấy danh sách của người xác thực.

<img src={useBaseUrl("img/staking/validator-list.png")} />

Bây giờ hãy đến hồ sơ Delegator của bạn bằng cách nhấn vào nút **Delegator** hoặc tùy chọn **Chi tiết Delegator của tôi**.

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

Ở đây bạn sẽ tìm thấy một nút mới tên là **Move Stake**.

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

Nhấp vào nút đó sẽ chuyển bạn tới một trang có danh sách người xác thực mà bạn có thể Ủy quyền. Bạn có thể ủy quyền cho bất kỳ Người xác thực nào có trên danh sách này.

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

Bây giờ sau khi chọn trình xác thực của bạn mà bạn muốn đại biểu, hãy nhấn vào nút **Delegate Đây**. Ấn nút trên nút đó sẽ mở một cửa sổ popup.

<img src={useBaseUrl("img/staking/stake-funds.png")} />

Ở đây bạn sẽ thấy một trường **Amount** sẽ tự động có số lượng đông người với toàn bộ số lượng cho Sự Trị. Bạn cũng có thể sử dụng một phần số lượng để ủy quyền cho người xác thực.

Ví dụ, nếu bạn đã ủy quyền 100 token matic cho Nút nền tảng 1 và bây giờ bạn muốn chuyển cổ phần của mình từ nút nền tảng sang nút bên ngoài, bạn có thể ủy quyền một phần số lượng cho nút bên ngoài mà bạn chọn, giả sử 50 token Matic. Số còn lại của 50 token Matic sẽ vẫn được giữ tại Nút nền tảng 1. Sau đó bạn có thể chọn để hoặc ủy quyền phần số còn lại của 50 token sang nút bên ngoài khác hoặc cùng nút bên ngoài.

Khi bạn đã nhập số lượng bạn có thể nhấn vào nút **Stake Funds**. Thao tác này sau đó sẽ yêu cầu xác nhận trên Metamask của bạn để ký địa chỉ.

Sau khi bạn đã ký giao dịch, cổ phần của bạn sẽ chuyển thành công từ Nút nền tảng sang Nút bên ngoài. Tuy nhiên, bạn sẽ phải chờ 12 xác nhận khối để nó hiển thị trên UI góp cổ phần. Nếu các quỹ đã chuyển của bạn không hiển thị sau 12 xác nhận khối, thử làm mới trang một lần để xem các cổ phần được cập nhật.

Nếu bạn có bất kỳ câu hỏi nào hoặc bất kỳ vấn đề nào, vui lòng gửi nhãn [tại đây](https://support.polygon.technology/support/home).
