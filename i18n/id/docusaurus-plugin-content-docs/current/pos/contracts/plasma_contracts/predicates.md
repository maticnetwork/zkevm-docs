---
id: predicates
title: Predicate di Polygon Plasma
description: Rincian implementasi dari Predicates dalam Polygon Plasma
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Predicate di Polygon Plasma {#predicates-in-polygon-plasma}

Artikel ini menyoroti perincian implementasi desain predicate kami. Desain predicate kami sangat terinspirasi dari [Memahami Arsitektur Plasma Rampat](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) dan kami berterima kasih kepada grup plasma untuk hal tersebut. Kami baru-baru ini memublikasikan spesifikasi [MoreVP Berbasis Akun](https://ethresear.ch/t/account-based-plasma-morevp/5480) kami. Postingan yang ditautkan ini adalah prasyarat untuk memahami dokumen ini.

Catatan: `withdrawManager` adalah istilah kami yang di grup plasma disebut *kontrak komitmen*.

## Predicate untuk transfer token ERC20/721 {#predicate-for-erc20-721-token-transfer}

Fungsi yang paling relevan di predicate ERC20/721 adalah `startExit` dan `verifyDeprecation`. Lihat [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol).

Fungsi `startExit` akan dimintakan ketika exitor ingin memulai keluar model MoreVP (merujuk transaksi rujukan yang mendahuluinya).

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

Untuk menantang transisi kondisi lebih tua, predicate membuka fungsi `verifyDeprecation`. 

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

Akhirnya, fungsi `challengeExit` di `withdrawManager` bertanggung jawab memanggil `predicate.verifyDeprecation` dan membatalkan keluar jika itu terbukti benar. Lihat [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184).

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

Sementara ini adalah inti dari logika [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) kami, implementasi sebenarnya jauh lebih mendalam dan dapat ditemukan di  [pull request 12](https://github.com/maticnetwork/contracts/pull/78) ini. Kami mengundang komunitas plasma untuk meninjau hal ini dan memberikan umpan balik mereka yang berharga di sini atau di PR.