---
id: validator-key-management
title: Quản lý khóa người xác thực
description: Quản lý trình xác thực ký tên và Key của chủ và Owner
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# Quản lý khóa người xác thực {#validator-key-management}

Mỗi người xác thực sử dụng hai khóa để quản lý các hoạt động của trình xác thực trên Polygon. Khóa người ký được giữ trên nút và thường được coi là một ví`hot`, trong khi khóa chủ sở hữu được coi là giữ rất an toàn, được sử dụng không thường xuyên, và thường được coi là một ví`cold`. Các quỹ góp cổ phần được kiểm soát bởi khóa chủ sở hữu.

Sự tách biệt này đã được thực hiện để đảm bảo sự trao đổi hiệu quả giữa sự an ninh và sự sử dụng. Cả hai phím đều là địa chỉ tương thích Ethereum và làm việc chính xác như nhau. Và đúng, có thể có cùng một chìa khóa của Owner và Signer.

## Khóa người ký {#signer-key}

Khóa của signer là một địa chỉ được sử dụng cho việc ký kết khối Heimdall , các kiểm tra, và các hoạt động liên quan khác. Khóa riêng tư của khóa này sẽ nằm trên nút Người xác thực cho mục đích ký. Nó không thể quản lý cổ phần, phần thưởng hay ủy quyền.

Trình xác thực phải giữ hai loại cân bằng trên địa chỉ này:

- Phiếu thưởng matic trên Heimdall (thông qua giao dịch Nạp tiền) để thực hiện trách nhiệm người xác thực trên Heimdall
- ETH trên chuỗi Ethereum để gửi điểm kiểm duyệt trên Ethereum

## Khóa chủ sở hữu {#owner-key}

Chìa khóa chủ sở hữu là một địa chỉ được sử dụng cho việc đặt cọc , tái cọc, thay đổi khóa của người ký, phần thưởng rút lại và quản lý các thông số liên quan đến đại biểu trên chuỗi Ethereum. Khóa riêng tư cho khóa này phải an toàn bằng mọi giá.

Tất cả các giao dịch qua khóa này sẽ được thực hiện trên chuỗi Ethereum.

## Thay đổi người ký {#signer-change}

Sự kiện sau được tạo trong trường hợp thay đổi người ký trên chuỗi Ethereum trên `StakingInfo.sol`: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Cầu nối Heimdall xử lý các sự kiện này và gửi các giao dịch trên Heimdall để thay đổi trạng thái dựa trên các sự kiện.