---
id: predicates
title: Predicates in Polygon Plasma
description: This post highlights the implementation details of our predicate design. Our predicate design is heavily inspired from [Understanding the Generalized Plasma Architecture](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) and we thank the plasma group for the same. We recently published our [Account based MoreVP](https://ethresear.ch/t/account-based-plasma-morevp/5480) specification. The linked post is a pre-requisite to understanding this document.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

This post highlights the implementation details of our predicate design. Our predicate design is heavily inspired from [Understanding the Generalized Plasma Architecture](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) and we thank the plasma group for the same. We recently published our [Account based MoreVP](https://ethresear.ch/t/account-based-plasma-morevp/5480) specification. The linked post is a pre-requisite to understanding this document.

Note: `withdrawManager` is our term for what plasma group calls the *commitment contract*.

### Predicate for ERC20/721 token transfer

The most relevant functions in the ERC20/721 predicates are `startExit` and `verifyDeprecation`. See [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol).

The `startExit` function will be invoked when an exitor wants to start a MoreVP style exit (referencing the preceding reference transactions).

```
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

For challenging older state transitions, the predicate exposes `verifyDeprecation` function.

```
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}

```

Finally, the `challengeExit` function in `withdrawManager` is responsible for calling `predicate.verifyDeprecation` and cancel the exit if it returns true. See [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184).

```
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

While this makes up the crux of our [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) logic, the actual implementation is much more involved and can be found in this [pull request 12](https://github.com/maticnetwork/contracts/pull/78). We invite the plasma community to review the same and leave their precious feedback here or on the PR.