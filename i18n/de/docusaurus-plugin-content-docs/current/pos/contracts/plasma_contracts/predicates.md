---
id: predicates
title: Prädikate in Polygon Plasma
description: Implementierungsdetails von Predicates in Polygon Plasma
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Prädikate in Polygon Plasma {#predicates-in-polygon-plasma}

In diesem Artikel werden die Implementierungsdetails unseres Prädikatsdesigns erläutert. Unser Prädikatsdesign ist stark vom [Verständnis der generalisierten Plasma-Architektur](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) inspiriert, und wir danken der Plasmagruppe für diese Anregung. Wir haben vor kurzem unsere [Kontenbasierte MoreVP](https://ethresear.ch/t/account-based-plasma-morevp/5480) Spezifikation veröffentlicht. Der verknüpfte Post ist Voraussetzung, um dieses Dokument zu verstehen.

Hinweis: `withdrawManager` ist unsere Bezeichnung für das, was die Plasmagruppe den *Verpflichtungsvertrag* nennt.

## Prädikat für die ERC20/721-Token-Übertragung {#predicate-for-erc20-721-token-transfer}

Die relevantesten Funktionen in den ERC20-/721-Prädikaten sind `startExit` und `verifyDeprecation`. Siehe [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol).

Die Funktion `startExit` wird aufgerufen, wenn ein Exitor einen Exit im MoreVP-Stil (mit Verweis auf die vorangegangenen Referenztransaktionen) starten will.

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

Für anspruchsvolle ältere Zustandsübergänge stellt das Prädikat die Funktion `verifyDeprecation` dar.

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

Schließlich ist die Funktion `challengeExit` in `withdrawManager` dafür verantwortlich, `predicate.verifyDeprecation` aufzurufen und den Exit abzubrechen, wenn sie true zurückgibt. Siehe [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184).

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

Während dies den Kern unserer [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) Logik ausmacht, ist die tatsächliche Implementierung viel komplizierter und kann in dieser [Pull-Anfrage 12](https://github.com/maticnetwork/contracts/pull/78) gefunden werden. Wir laden die Plasma-Community ein, diese zu überprüfen und ihr wertvolles Feedback hier oder auf der PR-Seite zu hinterlassen.