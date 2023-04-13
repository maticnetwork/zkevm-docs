---
id: predicates
title: Polygon Plasmaの述語
description: Polygon Plasmaでの予測の実装詳細
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Polygon Plasmaの述語 {#predicates-in-polygon-plasma}

この記事では、我々の述語設計の実装の詳細に焦点を当てます。我々の述語設計は、[Understanding the Generalized Plasma Architecture](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741)（一般化されたPlasmaアーキテクチャを理解する）に大きく触発されたものであり、同様にPlasmaグループに感謝しています。最近[Account based MoreVP](https://ethresear.ch/t/account-based-plasma-morevp/5480)（アカウントベースのMoreVP）の仕様を公開しました。このリンクは、この記事を理解する上での前提条件です。

注意：`withdrawManager`は、Plasmaグループが*commitment contract*（コミットメントコントラクト）と呼ぶ私たちの用語です。

## ERC20/721トークン転送の述語 {#predicate-for-erc20-721-token-transfer}

ERC20/721の述語で最も関連性の高い機能は、`startExit`と`verifyDeprecation`です。[IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol)を参照してください。

この`startExit`機能は、exitorがMoreVPスタイル終了をスタートさせたい時に呼び出されるものです（以前の参照トランザクションを参照する）。

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

古い状態のトランザクションに対応するため、述語は`verifyDeprecation`機能を公開しています。

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

最後に、`withdrawManager`の`challengeExit`機能は、trueを返す場合、`predicate.verifyDeprecation`を呼び出し、終了をキャンセルする責任があります。[WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184)を参照してください。

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

これが[ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol)ロジックの核心を構成していますが、実際の実装にはより多くのものが含まれ、この[プルリクエスト12](https://github.com/maticnetwork/contracts/pull/78)で確認できます。Plasmaコミュニティに参加して、同様のレビューを行い、ここやPR上に貴重なフィードバックを残してください。