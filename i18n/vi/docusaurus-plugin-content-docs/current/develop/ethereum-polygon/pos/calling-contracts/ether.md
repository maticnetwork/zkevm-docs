---
id: ether
title: Hướng dẫn Nạp và Rút Ether
sidebar_label: Ether
description:  "Các chức năng có sẵn cho các hợp đồng Ether."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## Luồng Cấp Cao {#high-level-flow}

Nạp Ether –

- Tạo lệnh gọi depositEtherFor trên **RootChainManager** và gửi tài sản ether.

Rút Ether –

1. **_Đốt_** token trên chuỗi Polygon.
2. Gọi chức năng **_thoát_** trên **_RootChainManager_** để nộp bằng chứng giao dịch đốt. Lệnh gọi này có thể được thực hiện **_sau khi trạm kiểm soát_** được nộp cho khối chứa giao dịch đốt.

## Chi tiết bước {#step-details}

### Tạo hợp đồng {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### nạp {#deposit}
Gọi `depositEtherFor`chức năng của hợp đồng`RootChainManager`. Chức năng này lấy một đối số - `userAddress`đây là địa chỉ của người dùng sẽ nhận được tiền gửi trên chuỗi Polygon. Số lượng ether cần được gửi sẽ được gửi như giá trị của giao dịch.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Đốt {#burn}
Vì Ether là dấu hiệu ERC20 trên chuỗi Polygon, quá trình rút của nó cũng giống như số tiền của ERC20. Các vật dụng có thể bị đốt bằng cách gọi `withdraw`chức năng trên hợp đồng vật dụng của con. Chức năng này cần một đối số duy nhất, chỉ `amount`ra số vật thể sẽ bị bỏng. Cần nộp bằng chứng đốt này trong bước thoát. Vì vậy hãy lưu trữ hàm băm giao dịch.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Thoát {#exit}
Chức năng thoát trên `RootChainManager`hợp đồng phải được gọi là mở khóa và nhận được các dấu đã trở lại từ .`EtherPredicate` Chức năng này cần một đối số byte để chứng minh giao dịch đốt. Chờ điểm kiểm tra chứa giao dịch burn sẽ được gửi trước khi gọi chức năng này. Bằng chứng được tạo ra bởi sự mã hóa RLP-sen, các trường sau:

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
