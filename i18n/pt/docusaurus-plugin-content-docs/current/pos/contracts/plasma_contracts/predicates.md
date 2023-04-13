---
id: predicates
title: Predicados no Plasma da Polygon
description: Detalhes da implementação de Predicados no Polygon Plasma
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Predicados no Plasma da Polygon {#predicates-in-polygon-plasma}

Este artigo destaca os detalhes da implementação do nosso design de predicados. O nosso design de predicados é fortemente inspirado em [Compreender a Arquitetura Plasma Generalizada](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) e agradecemos ao grupo Plasma pelo mesmo. Publicamos recentemente a nossa especificação [MoreVP baseado na conta](https://ethresear.ch/t/account-based-plasma-morevp/5480) . Esta publicação é um pré-requisito para entender este documento.

Nota: `withdrawManager`é o nosso termo para aquilo a que o grupo Plasma chama *contrato de compromisso*.

## Predicado para a transferência de tokens ERC-20/721 {#predicate-for-erc20-721-token-transfer}

As funções mais relevantes dos predicados ERC-20/721 são `startExit` e `verifyDeprecation`. Ver [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol).

A função `startExit` será invocada quando um exitor quiser iniciar uma saída do estilo MoreVP (referenciando as transações de referência anteriores).

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

Para desafiar as transições de estado mais antigas, o predicado expõe a função `verifyDeprecation` .

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

Por fim, a função `challengeExit` em `withdrawManager` é responsável por fazer CALL `predicate.verifyDeprecation` e cancelar a saída, se for verdadeira. Ver [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184).

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

Embora este seja o cerne da nossa lógica [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) , a implementação real está muito mais envolvida e pode ser encontrada neste [pull request 12](https://github.com/maticnetwork/contracts/pull/78). Convidamos a comunidade do Plasma a rever o mesmo e a deixar o seu precioso feedback aqui ou na PR.