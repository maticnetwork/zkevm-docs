---
title: Tellor
description: "Một hướng dẫn để tích hợp Tellor vào hợp đồng Polygon của bạn."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor là một oracle cung cấp dữ liệu chống kiểm duyệt được bảo mật bằng các biện pháp khuyến khích kinh tế mã hóa đơn giản. Dữ liệu có thể được bất kỳ ai cung cấp và được tất cả mọi người kiểm tra. Cấu trúc linh hoạt của Tellor có thể cung cấp bất kỳ dữ liệu nào vào bất kỳ khoảng thời gian nào nhằm dễ dàng cho phép thử nghiệm/đổi mới.

## Điều kiện tiên quyết (Mềm) {#soft-prerequisites}

Chúng tôi đang giả định những điều sau đây về kỹ năng lập trình của bạn để tập trung vào khía cạnh oracle.

Các giả định:

- bạn có thể điều hướng một thiết bị đầu cuối
- bạn đã cài đặt npm
- bạn biết cách sử dụng npm để quản lý các phần phụ thuộc

Tellor là một oracle đang hoạt động và có nguồn mở luôn sẵn sàng để thực hiện. Hướng dẫn của người khởi đầu này ở đây để hiển thị sự thoải mái với việc người có thể lên và chạy với Tellor, cung cấp dự án của bạn với một nhà tiên thực hiện và kiểm duyệt.

## Tổng quan {#overview}

Tellor là một hệ thống oracle, trong đó các bên có thể yêu cầu giá trị của điểm dữ liệu ngoài chuỗi (ví dụ: BTC/USD) và những người báo cáo cạnh tranh để thêm giá trị này vào ngân hàng dữ liệu trực tuyến, có thể truy cập bằng tất cả các hợp đồng thông minh Polygon. Thông tin đầu vào cho ngân hàng dữ liệu này được bảo mật bởi một mạng lưới người báo cáo có góp cổ phần. Tellor sử dụng các cơ chế khuyến khích kinh tế mã hóa. Việc người báo cáo nộp dữ liệu trung thực sẽ được thưởng bằng việc phát hành token của Tellor. Bất kỳ người nào có hành vi xấu cũng nhanh chóng bị phạt và loại bỏ khỏi mạng lưới bằng cơ chế tranh chấp.

Trong hướng dẫn này, chúng ta sẽ xem xét kỹ lưỡng:

- Thiết lập bộ công cụ ban đầu bạn sẽ cần để bắt đầu chạy.
- Xem qua một ví dụ đơn giản.
- Liệt kê các địa chỉ mạng thử nghiệm của những mạng lưới mà bạn hiện có thể thử nghiệm Tellor.

## UsingTellor {#usingtellor}

Điều đầu tiên bạn sẽ muốn làm là cài đặt các công cụ cơ bản cần thiết để sử dụng Tellor làm oracle của bạn. Sử dụng [gói này](https://github.com/tellor-io/usingtellor) để cài đặt các Hợp đồng Người dùng Tellor:

`npm install usingtellor`

Khi đã được cài đặt, gói này sẽ cho phép các hợp đồng của bạn kế thừa các chức năng từ hợp đồng "UsingTellor".

Tuyệt vời! Giờ thì bạn đã có các công cụ sẵn sàng, hãy cùng xem xét kỹ lưỡng một bài tập đơn giản trong đó chúng ta truy xuất giá bitcoin:

### Ví dụ BTC/USD {#btc-usd-example}

Kế thừa hợp đồng UseTellor, chuyển địa chỉ Tellor làm đối số trình khởi tạo:

Dưới đây là một ví dụ:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## Địa chỉ: {#addresses}

Tellor Tributes: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### Bạn đang tìm cách thực hiện một số thử nghiệm trước?: {#looking-to-do-some-testing-first}

Mạng thử nghiệm Polygon Mumbai:[`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

Các Vật thể thử nghiệm:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

Cần thử nghiệm không? Tweet chúng tôi ở ['@trbfaucet'](https://twitter.com/trbfaucet)

Để dễ sử dụng, sự phát triển của UsingTellor sẽ đến với một phiên bản của [hợp đồng Playground](https://github.com/tellor-io/TellorPlayground) để tích hợp dễ dàng hơn. Xem [đây](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) để xem danh sách các hàm có ích

#### Để thực hiện oracle Tellor mạnh mẽ hơn, hãy xem danh sách đầy đủ các chức năng có sẵn [tại đây.](https://github.com/tellor-io/usingtellor/blob/master/README.md)

#### Vẫn còn câu hỏi không? Hãy tham gia vào cộng đồng [đây!](https://discord.gg/tellor)
