---
id: erc20
title: Hướng dẫn Nạp và Rút ERC20
sidebar_label: ERC20
description: "Các chức năng có sẵn cho các hợp đồng ERC20."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## Luồng Cấp Cao {#high-level-flow}

Nạp ERC20 –

1. **_Phê duyệt_** hợp đồng **_ERC20Predicate_** để tiêu những token phải được nạp.
2. Tạo lệnh gọi **_depositFor_** trên **_RootChainManager_**.

Rút ERC20 –

1. **_Đốt_** token trên chuỗi Polygon.
2. Gọi chức năng **_thoát_** trên **_RootChainManager_** để nộp bằng chứng giao dịch đốt. Lệnh gọi này có thể được thực hiện **_sau khi trạm kiểm soát_** được nộp cho khối chứa giao dịch đốt.

## Chi tiết thiết lập {#setup-details}

### Tạo hợp đồng {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Phê duyệt {#approve}
Phê duyệt **_ERC20Predicate_** để tiêu token bằng cách gọi chức năng **_phê duyệt_** của hợp đồng token. Chức năng này cần hai đối số người chi tiêu và số lượng. **_người chi tiêu_** là địa chỉ đang được phê duyệt để tiêu token của người dùng. **_số lượng_** là số lượng token có thể tiêu. Giữ số lượng bằng với số tiền nạp để phê duyệt một lần hoặc chuyển số lớn hơn để tránh phê duyệt nhiều lần.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Nạp tiền {#deposit}
Lưu ý rằng rằng token cần được hoán đổi và số lượng phải được phê duyệt để nạp trước khi thực hiện lệnh gọi này.   Gọi `depositFor()`chức năng của hợp đồng`RootChainManager`. Chức năng này lấy 3 đối `userAddress``rootToken`số: `depositData``userAddress`và . Là địa chỉ của người dùng sẽ nhận được tiền gửi trên chuỗi Polygon. `rootToken`Là địa chỉ của dấu hiệu trên chuỗi chính. `depositData`Là số lượng ABIen-en.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Đốt {#burn}
Có thể đốt token trên chuỗi Polygon bằng cách gọi chức năng **_rút tiền_** trên hợp đồng token con. Chức năng này cần một đối số đơn, **_số lượng_** cho thấy số token cần được đốt. Cần nộp bằng chứng đốt này trong bước thoát. Vì vậy hãy lưu trữ hàm băm giao dịch.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Thoát {#exit}
Chức năng thoát trên `RootChainManager`hợp đồng phải được gọi là mở khóa và nhận được các dấu đã trở lại từ .`ERC20Predicate` Chức năng này cần một đối số byte để chứng minh giao dịch đốt. Chờ điểm kiểm tra chứa giao dịch burn sẽ được gửi trước khi gọi chức năng này. Bằng chứng được tạo ra bởi sự mã RLP bởi các trường sau -

1. headerNumber – Số khối tiêu đề trạm kiểm soát có chứa tx đốt
2. blockProof – Bằng chứng rằng tiêu đề khối (trong chuỗi con) là một lá trong gốc merkle đã nộp
3. blockNumber – Số khối có chứa tx đốt trên chuỗi con
4. blockTime – Thời gian khối tx đốt
5. txRoot – Gốc khối giao dịch
6. receiptRoot – Gốc khối biên nhận
7. receipt – Biên nhận giao dịch đốt
8. receiptProof – Bằng chứng biên nhận đốt Merkle
9. branchMask – 32 bit biểu thị đường dẫn biên nhận trong cây merkle patricia
10. receiptLogIndex – Chỉ số Nhật ký để đọc từ biên nhận

Việc tạo bằng chứng theo cách thủ công có thể phức tạp vì vậy bạn nên sử dụng Polygon Edge. Nếu bạn muốn gửi giao dịch theo cách thủ công, bạn có thể chuyển **_encodeAbi_** là **_true_** trong đối tượng tùy chọn để lấy dữ liệu gọi thô.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

Gửi dữ liệu gọi này đến **_RootChainManager_**.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
