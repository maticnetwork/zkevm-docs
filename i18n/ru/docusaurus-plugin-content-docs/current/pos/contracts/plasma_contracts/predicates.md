---
id: predicates
title: Предикаты в Polygon Plasma
description: Данные внедрения Predicates в Polygon Plasma
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Предикаты в Polygon Plasma {#predicates-in-polygon-plasma}

В этой статье освещаются детали реализации наших предикатов проектирования. В своей реализации предикатов проектирования мы во многом вдохновлялись статьей [Понимание обобщенной архитектуры Plasma](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741), и мы благодарны группе Plasma за это. Недавно мы опубликовали нашу спецификацию [MoreVP на основе аккаунта](https://ethresear.ch/t/account-based-plasma-morevp/5480). Связанный пост необходим для понимания этого документа.

Примечание. `withdrawManager` — это наш термин для обозначения того, что группа Plasma называет *контрактом-обязательством*.

## Предикат для трансфера токена ERC20/721 {#predicate-for-erc20-721-token-transfer}

Наиболее важными функциями в предикатах ERC20/721 являются `startExit` и `verifyDeprecation`. См. [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol).

Функция `startExit` будет вызываться, когда выходящий хочет запустить выход в стиле MoreVP (ссылаясь на предшествующие контрольные транзакции).

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

Для сложных переходов между старыми состояниями предикат предоставляет функцию `verifyDeprecation`.

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

Наконец, функция `challengeExit` в `withdrawManager` отвечает за вызов `predicate.verifyDeprecation` и отмену выхода, если возвращено значение true. См. [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184).

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

Это суть логики нашего [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol). Реальная реализация гораздо сложнее, и ее можно найти в этом [pull request 12](https://github.com/maticnetwork/contracts/pull/78). Мы приглашаем сообщество Plasma сделать обзор и оставить свои ценные отзывы здесь или через PR.