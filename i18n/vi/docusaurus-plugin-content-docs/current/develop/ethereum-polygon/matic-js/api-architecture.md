---
id: api-architecture
title: Kiến trúc API
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: API Đọc và Ghi cộng với cài đặt giao dịch.
---

Thư viện tuân theo kiến trúc api chung xuyên suốt và các API được chia thành hai loại -

1. API Đọc
2. API Ghi

## API Đọc {#read-api}

Các API Đọc không phát hành bất kỳ thứ gì trên blockchain, vì vậy nó không tiêu thụ bất kỳ gas nào. Ví dụ về các API đọc là - `getBalance`, `isWithdrawExited` v.v.

Hãy xem một ví dụ về API Đọc -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

Các API Đọc rất đơn giản và trả về kết quả trực tiếp.

## API Ghi {#write-api}

Các API Ghi phát hành một số dữ liệu trên blockchain, vì vậy nó tiêu thụ gas. Ví dụ về các API Ghi là - `approve`, `deposit` v.v.

Khi bạn đang gọi một API Ghi - bạn cần hai dữ liệu từ kết quả.

1. TransactionHash
2. TransactionReceipt

Chúng ta hãy xem một ví dụ về API Ghi và lấy transactionhash và biên nhận -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

## Tùy chọn giao dịch {#transaction-option}

Có một số tùy chọn có thể định cấu hình có sẵn cho tất cả các API. Các cấu hình này có thể được chuyển trong các tham số.

Các cấu hình có sẵn là -

- from?: string | number - Các giao dịch địa chỉ nên được thực hiện từ.
- to?: string - Các giao dịch địa chỉ nên được thực hiện tới.
- value?: number | string | BN - Giá trị được chuyển cho giao dịch trong wei.
- gasLimit?: number | string - Gas tối đa được cung cấp cho giao dịch (giới hạn gas).
- gasPrice?: number | string | BN - Giá gas trong wei để sử dụng cho các giao dịch.
- data?: string - Mã byte của hợp đồng.
- nonce?: number;
- chainId?: number;
- chain?: string;
- hardfork?: string;
- returnTransaction?: boolean - làm đúng sẽ trả về đối tượng giao dịch có thể được sử dụng để gửi giao dịch theo cách thủ công.

Hãy xem một ví dụ bằng cách định cấu hình gasPrice

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
