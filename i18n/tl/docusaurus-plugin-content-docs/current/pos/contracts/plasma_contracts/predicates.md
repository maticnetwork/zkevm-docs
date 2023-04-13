---
id: predicates
title: Mga Predicate sa Polygon Plasma
description: Pagpapatupad ng mga detalye ng mga Predicate sa Polygon Plasma
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Mga Predicate sa Polygon Plasma {#predicates-in-polygon-plasma}

Binibigyang-diin ng artikulong ito ang mga detalye ng pagpapatupad ng aming disenyo ng predicate. Ang aming disenyo ng predicate ay lubos na inspirado mula sa [Pag-unawa sa Generalized Plasma Architecture](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) at nagpapasalamat kami sa plasma group para sa parehong kadahilanan. Na-publish namin kamakailan ang aming [nakabatay sa Account na MoreVP](https://ethresear.ch/t/account-based-plasma-morevp/5480) na espesipikasyon. Ang naka-link na post ay isang paunang kinakailangan upang maunawaan ang dokumentong ito.

Tandaan: Ang `withdrawManager` ang aming termino para sa tinatawag ng grupo ng plasma na *kontrata ng commitment*.

## Predicate para sa paglipat ng ERC20/721 token {#predicate-for-erc20-721-token-transfer}

Ang pinakamahalagang mga function sa mga ERC20/721 na predicate ay `startExit` at `verifyDeprecation`. Tingnan ang [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol).

Ipapatawag ang `startExit` na function kapag gusto ng isang exitor na magsimula ng MoreVP istilo na style ng exit (tumutukoy sa mga naunang reference na transaksyon).

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

Para sa paghamon sa mga mas lumang mga state na transisyon, ang predicate ay naglalantad ng `verifyDeprecation` na function.

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

Pangwakas, ang `challengeExit` na function sa `withdrawManager` ay responsable sa pag-call sa `predicate.verifyDeprecation` at kakanselahin ang exit kapag ibinalik ang true. Tingnan ang [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184).

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

Bagama't ito ang bumubuo sa pinakabuod ng aming [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) na logic, ang aktwal na implementasyon ay higit na kasangkot at makikita sa [pull request 12](https://github.com/maticnetwork/contracts/pull/78) na ito. Inaanyayahan namin ang komunidad ng plasma na suriin ito at iwanan ang kanilang mahalagang puna dito o sa PR.