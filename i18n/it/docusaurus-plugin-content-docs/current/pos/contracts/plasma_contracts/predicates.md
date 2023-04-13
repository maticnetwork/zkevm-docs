---
id: predicates
title: Predicati in Plasma di Polygon
description: Dettagli di implementazione dei Predicati nel Polygon Plasma
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Predicati in Plasma di Polygon {#predicates-in-polygon-plasma}

Questo articolo evidenzia i dettagli di implementazione della nostra progettazione di predicati. La nostra progettazione di predicati è fortemente ispirata da [Comprensione dell'architettura al plasma generalizzata](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) e ringraziamo il gruppo plasma per la stessa cosa. Di recente abbiamo pubblicato la nostra specifica [MoreVP1 basata sull'account](https://ethresear.ch/t/account-based-plasma-morevp/5480). Il post collegato è un prerequisito per la comprensione di questo documento.

Nota: `withdrawManager` è il nostro termine per ciò che il gruppo plasma chiama il *contratto di impegno*.

## Predicato per il trasferimento di token ERC20/721 {#predicate-for-erc20-721-token-transfer}

Le funzioni più rilevanti nei predicati ERC20/721 sono `startExit` e `verifyDeprecation`. Vedi [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol).

La funzione `startExit` verrà invocata quando un exitor desidera avviare un'uscita in stile MoreVP (facendo riferimento alle precedenti transazioni di riferimento).

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

Per le transizioni di stato più vecchie, il predicato espone la funzione `verifyDeprecation`.

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

Infine, la funzione `challengeExit` in `withdrawManager` è responsabile di chiamare `predicate.verifyDeprecation` e annullare l'uscita se restituisce true. Vedi [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184).

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

Sebbene questo costituisca il punto cruciale della nostra logica [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) l'implementazione effettiva è molto più complessa e può essere trovata in questa [richiesta pull 122](https://github.com/maticnetwork/contracts/pull/78). Invitiamo la community di plasma a recensirlo e lasciare il proprio prezioso feedback qui o sul PR.