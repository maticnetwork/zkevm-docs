---
id: bandstandarddataset
title: Tập dữ liệu chuẩn Band
sidebar_label: Standard Dataset
description: Band Stardard Dataset cung cấp thông tin giá trị thực tế cho hơn 196+ ký hiệu vượt qua tài sản crypto, trao đổi ngoại hối và hàng hóa
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - standard dataset
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Các nhà phát triển xây dựng trên Polygon hiện có thể có lợi thế khi phát triển cơ sở hạ tầng của Phương thức Band được phát triển Với Quả tiên tri của Giao thức Band, chúng hiện có thể truy cập vào nhiều dữ liệu giá tiền tệ mật khác nhau để tích hợp vào ứng dụng của chúng.

## Các token được hỗ trợ {#supported-tokens}

Hiện tại, có thể tìm thấy danh sách các ký hiệu được hỗ trợ tại địa chỉ [data.bandprotocol.com](http://data.bandprotcool.com). Trong tương lai, danh sách này sẽ tiếp tục mở rộng dựa trên nhu cầu của nhà phát triển và phản hồi của cộng đồng.

## Các cặp giá {#price-pairs}

Các phương pháp sau có thể làm việc với bất kỳ tổ hợp cặp yết giá/định giá nào, miễn là các ký hiệu yết giá và định giá được tập dữ liệu hỗ trợ.

### Truy vấn giá {#querying-prices}

Hiện tại, có hai phương pháp cho các nhà phát triển để truy khảo giá từ Nhà tiên tri của Band Protocols: thông qua hợp đồng `StdReference`thông minh của Band trên Polygon và thông qua thư viện trợ [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)JavaScript của họ.

### Hợp đồng Thông minh Solidity {#solidity-smart-contract}

Để truy vấn giá từ Nhà tiên tri Band Protoc, một hợp đồng thông minh sẽ tham khảo hợp đồng của `StdReference`Band, đặc biệt là các `getReferenceDatabulk`phương pháp `getReferenceData`và

`getReferenceData`lấy hai chuỗi như sự input, biểu tượng `base`và biểu tượng`quote`, tương ứng. Sau đó sẽ truy vấn hợp đồng `StdReference` để biết tỷ lệ mới nhất cho hai token đó, và trả về một cấu trúc `ReferenceData`, được hiển thị bên dưới.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

Thay vào đó, `getReferenceDataBulk` lấy hai danh sách, một danh sách token `base`, và một danh sách `quotes`. Sau đó nó tiến hành truy vấn tương tự giá cho mỗi cặp cối/trích dẫn ở mỗi index, và trả lại một loạt các cấu `ReferenceData`trúc.

Ví dụ: nếu chúng ta gọi `getReferenceDataBulk` bằng `['BTC','BTC','ETH']` và `['USD','ETH','BNB']`, mảng `ReferenceData` được trả về sẽ chứa thông tin liên quan đến các cặp:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## Địa chỉ Hợp đồng {#contract-addresses}

| Blockchain | Địa chỉ Hợp đồng |
| -------------------- | :------------------------------------------: |
| Polygon (Thử nghiệm) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

Thư viện trình trợ giúp nút của Band [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) cũng hỗ trợ một chức năng `getReferenceData` tương tự. Chức năng này lấy một đối số, một danh sách các cặp vật dụng để truy vấn. Sau đó, sẽ trả về một danh sách giá trị tương ứng.


### Cách sử dụng ví dụ {#example-usage}

Mã bên dưới hiển thị một ví dụ sử dụng của chức năng:

```javascript
const { Client } = require('@bandprotocol/bandchain.js');

// BandChain's REST Endpoint
const endpoint = 'https://rpc.bandchain.org';
const client = new Client(endpoint);

// This example demonstrates how to query price data from
// Band's standard dataset
async function exampleGetReferenceData() {
  const rate = await client.getReferenceData(['BTC/ETH','BAND/EUR']);
  return rate;
}

(async () => {
  console.log(await exampleGetReferenceData());
})();

```

Kết quả tương ứng sẽ tương ứng sau đó sẽ giống như:

```bash
$ node index.js
[
    {
        pair: 'BTC/ETH',
        rate: 30.998744363906173,
        updatedAt: { base: 1615866954, quote: 1615866954 },
        requestID: { base: 2206590, quote: 2206590 }
    },
    {
        pair: 'BAND/EUR',
        rate: 10.566138918332376,
        updatedAt: { base: 1615866845, quote: 1615866911 },
        requestID: { base: 2206539, quote: 2206572 }
    }
]
```

Đối với mỗi cặp, các thông tin sau sẽ được trả về:

- `pair`: Chuỗi ký tự của cặp biểu tượng yết giá/định giá
- `rate`: Tỷ lệ kết quả của cặp đã cho
- `updated`: Dấu thời gian mà tại đó các ký hiệu yết giá và định giá được cập nhật lần gần nhất trên BandChain. Đối với `USD`, đây sẽ là một dấu hiệu thời gian hiện tại.
- `rawRate`: Đối tượng này bao gồm hai phần.
  - `value`là giá trị `BigInt` của tỷ lệ thực sự, nhân với `10^decimals`
  - Sau đó, `decimals` là số mũ được nhân với `rate` để có được `rawRate`

## Cách sử dụng ví dụ {#example-usage-1}

[Hợp đồng](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) này minh họa một ví dụ về việc sử dụng hợp đồng `StdReference` của Band và chức năng `getReferenceData`.