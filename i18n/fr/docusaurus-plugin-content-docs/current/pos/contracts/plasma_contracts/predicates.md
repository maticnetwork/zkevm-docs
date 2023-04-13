---
id: predicates
title: Les prédicats dans le Plasma de Polygon
description: Détails de la mise en œuvre des prédicats dans le plasma Polygon
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Les prédicats dans le Plasma de Polygon {#predicates-in-polygon-plasma}

Cet article présente les détails de la mise en œuvre de notre conception de prédicat. La conception de notre prédicat est fortement inspirée de [la Compréhension de l'Architecture Généralisée de Plasma](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741), et nous en remercions le groupe de Plasma également. Nous avons récemment publié notre spécification [MoreVP basée sur le Compte](https://ethresear.ch/t/account-based-plasma-morevp/5480). La lecture de la publication liée est un pré-requis pour comprendre ce document.

Remarque: `withdrawManager` est notre terme pour ce que le groupe plasma appelle le *contrat d'engagement*.

## Prédicat pour le transfert de jetons ERC20/721 {#predicate-for-erc20-721-token-transfer}

Les fonctions les plus pertinentes dans les prédicats ERC20/721 sont `startExit` et `verifyDeprecation`. Voir [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol).

La `startExit` fonction  sera invoquée lorsqu'un exitor souhaite lancer une sortie de type MoreVP (en faisant référence aux transactions de référence précédentes).

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

Pour défier les transitions d'état plus anciennes, le prédicat expose `verifyDeprecation` la fonction.

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

Enfin, la `challengeExit` fonction dans `withdrawManager` est chargée d'appeler `predicate.verifyDeprecation` et d'annuler la sortie si elle revient avec évidence. Voir [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184).

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

Bien que cela constitue l'essentiel de notre logique [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol), la mise en œuvre actuelle est beaucoup plus complexe et se trouve dans cette [demande de retrait 12](https://github.com/maticnetwork/contracts/pull/78). Nous invitons la communauté de plasma à les examiner également et à laisser leurs précieux commentaires ici ou sur le PR.