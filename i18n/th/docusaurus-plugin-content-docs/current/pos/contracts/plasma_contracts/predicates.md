---
id: predicates
title: Predicate ใน Polygon Plasma
description: รายละเอียดการดำเนินการของ Predicates ใน Polygon Plasma
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Predicate ใน Polygon Plasma {#predicates-in-polygon-plasma}

บทความนี้เน้นรายละเอียดการนำไปใช้ของการออกแบบ Predicate ของเราการออกแบบ Predicate ของเราได้รับแรงบันดาลใจอย่างมากจาก[การทำความเข้าใจสถาปัตยกรรม Plasma ทั่วไป](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) ซึ่งเราต้องขอขอบคุณกลุ่ม Plasmaเมื่อเร็วๆ นี้ เราได้เผยแพร่ข้อกำหนด [MoreVP ที่ใช้บัญชีเป็นหลัก](https://ethresear.ch/t/account-based-plasma-morevp/5480)โพสต์ที่เชื่อมโยงเป็นข้อกำหนดเบื้องต้นเพื่อทำความเข้าใจเอกสารนี้

หมายเหตุ: `withdrawManager` เป็นคำของเราที่กลุ่ม Plasma ใช้เรียก*สัญญาข้อผูกมัด*

## Predicate สำหรับการโอนโทเค็น ERC20/721 {#predicate-for-erc20-721-token-transfer}

ฟังก์ชันที่เกี่ยวข้องมากที่สุดใน ERC20/721 Predicate คือ `startExit` และ `verifyDeprecation`ดู [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol)

ฟังก์ชัน `startExit` จะได้รับการเรียกใช้เมื่อผู้ออกต้องการเริ่มต้นการออกรูปแบบ MoreVP (อ้างถึงธุรกรรมอ้างอิงก่อนหน้า)

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

สำหรับการคัดค้านการเปลี่ยนสถานะเก่ากว่า Predicate จะแสดงฟังก์ชัน `verifyDeprecation`

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

สุดท้าย ฟังก์ชัน `challengeExit` ใน `withdrawManager` มีหน้าที่เรียก `predicate.verifyDeprecation` และยกเลิกการออก หากส่งกลับค่า trueดู [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184)

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

แม้ว่าสิ่งนี้จะประกอบเป็นจุดสำคัญของลอจิก [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) ของเรา แต่จะมีความเกี่ยวข้องกับการนำไปใช้จริงมากกว่าและดูได้ใน[คำขอ Pull 12](https://github.com/maticnetwork/contracts/pull/78) นี้เราเชิญชวนชุมชน Plasma มาตรวจสอบและแสดงความเห็นอันมีค่าที่นี่หรือใน PR