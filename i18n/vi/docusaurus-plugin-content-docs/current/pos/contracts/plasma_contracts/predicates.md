---
id: predicates
title: Hợp đồng logic điều kiện trong Polygon Plasma
description: Chi tiết thực hiện của Predicates trong Polygon Plasma
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Hợp đồng logic điều kiện trong Polygon Plasma {#predicates-in-polygon-plasma}

Bài viết này nêu bật các chi tiết triển khai thiết kế hợp đồng logic điều kiện của chúng tôi. Thiết kế hợp đồng logic điều kiện của chúng tôi được truyền cảm hứng rất nhiều từ [Hiểu biết về Kiến trúc Plasma Tổng quát](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) và chúng tôi cảm ơn nhóm plasma vì điều này. Gần đây, chúng tôi đã xuất bản đặc tả [MoreVP dựa trên Tài khoản](https://ethresear.ch/t/account-based-plasma-morevp/5480) của mình. Bài đăng được liên kết là điều kiện tiên quyết để hiểu tài liệu này.

Lưu ý: `withdrawManager`là thuật ngữ của chúng tôi cho *hợp đồng cam kết* được đề cập trong nhóm plasma.

## Hợp đồng logic điều kiện cho chuyển nhượng token ERC20/721 {#predicate-for-erc20-721-token-transfer}

Các chức năng có liên quan nhất trong các hợp đồng logic điều kiện ERC20/721 là `startExit`và`verifyDeprecation`. Xem [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol).

Chức năng `startExit`sẽ được gọi khi một trình kết thúc muốn bắt đầu một lối thoát kiểu MoreVP (tham chiếu đến các giao dịch tham chiếu trước đó).

```solidity
function startExit(bytes calldata data, bytes calldata exitTx) external {
  referenceTxData = decode(data)

  // Verify inclusion of reference tx in checkpoint / commitment// returns priority which is something like that defined in minimum viable plasma (blknum * 1000000000 + txindex * 10000 + logIndex)// Here, logIndex is the index of the log in the tx receipt.
  priority = withdrawManager.verifyInclusion(referenceTxData)

  // validate exitTx - This may be an in-flight tx, so inclusion will not be checked
  exitAmount = processExitTx(exitTx)

  // returns the balance of the party at the end of referenceTx - this is the "youngest input" to the exitTx
  closingBalance = processReferenceTx(referenceTxData)

  // The closing balance of the exitTx should be <= the referenced balancerequire(
    closingBalance >= exitAmount,
    "Exiting with more tokens than referenced"
  );

  withdrawManager.addExitToQueue(msg.sender, token, exitAmount, priority)
}
```

Đối với các chuyển đổi trạng thái cũ hơn đầy thử thách, hợp đồng logic điều kiện biểu thị hàm`verifyDeprecation`.

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

Cuối cùng, hàm `challengeExit`trong `withdrawManager`chịu trách nhiệm gọi `predicate.verifyDeprecation`và hủy bỏ lối ra nếu nó trả về kết quả đúng. Xem [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184).

```solidity
function challengeExit(uint256 exitId, uint256 inputId, bytes calldata challengeData) external {
  PlasmaExit storage exit = exits[exitId];
  Input storage input = exit.inputs[inputId];
  require(
    exit.token != address(0x0) && input.signer != address(0x0),
    "Invalid exit or input id"
  );
  bool isChallengeValid = IPredicate(exit.predicate).verifyDeprecation(
    encodeExit(exit),
    encodeInputUtxo(inputId, input),
    challengeData
  );
  if (isChallengeValid) {
    deleteExit(exitId);
    emit ExitCancelled(exitId);
  }
}
```

Trong khi điều này tạo nên điểm mấu chốt cho logic [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) của chúng tôi, việc triển khai thực tế có liên quan nhiều hơn và có thể được tìm thấy trong [yêu cầu kéo 12](https://github.com/maticnetwork/contracts/pull/78) này. Chúng tôi mời cộng đồng plasma đánh giá và để lại phản hồi quý giá của họ tại đây hoặc trên PR.