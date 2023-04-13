---
id: widget
title: Widget Ví
sidebar_label: Wallet Widget
description: "Các công cụ UI để thực thi các giao dịch cầu nối."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Widget ví là một công cụ UI có thể được nhúng trong bất kỳ ứng dụng web nào nhằm thực thi các giao dịch cầu nối – Nạp tiền và Rút tiền.

Mỗi widget được xác định bằng một tên duy nhất mà bạn có thể nhận từ [Bảng điều khiển widget](https://wallet.polygon.technology/widget-dashboard).

### Bảng điều khiển widget {#widget-dashboard}

Có thể tạo widget từ trang bảng điều khiển widget trong ứng dụng ví. Điều này cho phép người dùng tạo widget mới với một số tùy chọn có thể tùy chỉnh.

Sau khi đã tạo widget, bạn có thể sao chép đoạn mã và thêm nó trong ứng dụng của mình hoặc sử dụng tên widget và tự định cấu hình.

Dưới đây là liên kết đến bảng điều khiển widget –

* mạng lưới chính – https://wallet.polygon.technology/widget-dashboard
* mạng thử nghiệm – https://wallet-dev.polygon.technology/widget-dashboard

## Cài đặt {#install}

Widget được xuất dưới dạng thư viện javascript và có sẵn dưới dạng gói npm.

```bash
npm i @maticnetwork/wallet-widget
```

## Ví dụ {#examples}

Chúng tôi đã tạo các ví dụ cho các khuôn khổ và công cụ khác nhau để giúp bạn với việc phát triển. Tất cả các ví dụ đều có tại địa chỉ – [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)

## Cách sử dụng {#how-to-use}
### Có mục tiêu {#with-target}

Hãy coi là bạn có một nút trong ứng dụng của mình và bạn muốn hiển thị widget khi nhấn vào nút đó –

```html
<button id="btnMaticWidget"></btn>
```

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'mainnet' // network to be used - testnet or mainnet
});
```

Tạo widget bất cứ khi nào bạn sẵn sàng. Tốt nhất là gọi chức năng tạo sau khi tài liệu được nạp.

```javascript
await widget.create();
```
widget được tạo, bây giờ hãy nhấn vào nút của bạn và widget sẽ được hiển thị.

### Không có mục tiêu {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

giờ widget đã được tạo, nhưng để hiển thị widget – bạn sẽ phải gọi API `show`.

```
widget.show();
```

Tương tự, bạn có thể ẩn widget, bằng cách gọi API `hide`.

```
widget.hide();
```

### Lưu ý Quan trọng 👉 {#important-note}

1. Dựa trên "mạng thử nghiệm" hoặc "mạng lưới chính" của mạng lưới, bạn cần tạo ứng dụng của mình trên bảng điều khiển tương ứng. Chúng tôi khuyên bạn tạo ứng dụng có cùng tên trên cả mạng thử nghiệm và mạng lưới chính, để bạn không gặp bất kỳ sự cố nào khi thay đổi mạng lưới.

2. Widget ví là Thư viện UI và khi ở trên trang web khác, widget này trông sẽ hơi khác và có thể có một số sự cố như – màu sắc, khả năng phản hồi, v.v. Vì vậy, hãy dành một chút thời gian để thử nghiệm và tùy chỉnh. Trong trường hợp cần trợ giúp – vui lòng liên hệ với [đội ngũ hỗ trợ](https://support.polygon.technology/).

3. Widget ví hiển thị toàn màn hình trong thiết bị di động nhưng bạn có thể tùy chỉnh theo cấu hình `style`.

## Cấu hình {#configuration}

Cấu hình có thể được cung cấp trong trình khởi tạo Widget.

## Các cấu hình có sẵn là {#available-configuration-are}

- **target** : string – Bộ chọn CSS để hiển thị widget khi nhấn vào yếu tố. Ví dụ: "#btnMaticWidget" sẽ là mục tiêu trong mã dưới đây.

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **network** : string – mạng lưới sẽ được sử dụng. Hai tùy chọn có sẵn – "mạng thử nghiệm" hoặc "mạng lưới chính".
- **width** : number – Chiều rộng của widget
- **height** : number – Chiều cao của widget
- **autoShowTime** : number – Tự động hiển thị widget sau thời gian chỉ định tính bằng mili giây
- **appName** : string – tên ứng dụng của bạn, có thể lấy trên bảng điều khiển widget.
- **position** : string – Thiết lập vị trí của widget. Các tùy chọn có sẵn là –
    - trung tâm
    - dưới cùng bên phải
    - dưới cùng bên trái
- **amount** : string – Điền trước số lượng vào hộp văn bản
- **page** : string – chọn trang. Các tùy chọn có sẵn là – `withdraw`,`deposit`.
- **overlay** : boolean – hiển thị lớp phủ khi widget được mở. Theo mặc định sẽ là false.
- **style** : object – áp dụng một số kiểu css cho widget.

```
var widget = new MaticWidget({
    appName: "<your app id>", //appName from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'testnet' // network to be used - testnet or mainnet,
    style:{
      color:'red'
    }
});
```

## Sự kiện {#events}

Widget phát hành một số sự kiện có thể được sử dụng để biết điều gì đang xảy ra trong ứng dụng.

### Đăng ký các sự kiện {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### Hủy đăng ký các sự kiện {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> Lệnh gọi ngược phải giống như lệnh đã được sử dụng để đăng ký sự kiện. Vì vậy, tốt hơn là bạn nên lưu trữ lệnh gọi ngược trong một biến. `

## Danh sách các sự kiện: {#list-of-events}

- **load** – Widget được nạp
- **close** – Widget bị đóng
- **approveInit** – Giao dịch phê duyệt được khởi tạo
- **approveComplete** – Giao dịch phê duyệt được hoàn tất
- **approveError** – Giao dịch phê duyệt không thành công do lỗi nào đó, hoặc người dùng từ chối giao dịch trên Metamask
- **depositInit** – Giao dịch nạp tiền được khởi tạo
- **depositComplete** – Giao dịch nạp tiền được hoàn tất
- **depositError** – Giao dịch nạp tiền không thành công do lỗi nào đó, hoặc người dùng từ chối hoàn thành giao dịch nạp tiền trên Metamask
- **burnInit** – Giao dịch rút tiền được khởi tạo
- **burnComplete** – Giao dịch rút tiền được hoàn tất
- **confirmWithdrawInit** – Quá trình rút tiền đi qua trạm kiểm soát và giao dịch xác nhận được khởi tạo
- **confirmWithdrawComplete** – Giao dịch xác nhận rút tiền được hoàn tất
- **confirmWithdrawError** – Giao dịch xác nhận rút tiền không thành công do lỗi nào đó, hoặc người dùng từ chối giao dịch xác nhận rút tiền trên Metamask
- **exitInit** – Giao dịch thoát rút tiền được khởi tạo
- **exitComplete** – Giao dịch thoát rút tiền được hoàn tất
- **exitError** – Giao dịch thoát rút tiền không thành công do lỗi nào đó, hoặc người dùng từ chối giao dịch thoát rút tiền trên Metamask

## APIS {#apis}

- **show** – hiển thị widget

```javascript
widget.show()
```

- **hide** – ẩn widget

```javascript
widget.hide()
```

- **on** – đăng ký các sự kiện

```javascript
widget.on('<event name>', callback)
```

- **off** – hủy đăng ký các sự kiện

```javascript
widget.off('<event name>', callback)
```
