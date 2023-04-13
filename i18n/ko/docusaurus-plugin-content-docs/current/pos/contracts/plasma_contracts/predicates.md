---
id: predicates
title: Polygon 플라즈마 술어
description: Polygon Plasma에서 예측의 구현 세부 정보
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Polygon 플라즈마 술어 {#predicates-in-polygon-plasma}

이 글에서는 술어 설계 구현의 세부 사항을 집중적으로 알아봅니다. Polygon의 술어 설계는 [일반화된 플라즈마 아키텍처 이해하기](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741)로 부터 많은 영향을 받았으며, 플라즈마 그룹에 감사드립니다. Polygon은 최근 [MoreVP 기반 계정](https://ethresear.ch/t/account-based-plasma-morevp/5480)에 대한 설명서를 발간했습니다. 링크된 게시물은 이 문서를 이해하기 위한 전제 조건입니다.

참조: `withdrawManager`는 플라즈마 그룹의 *확정 계약*에 해당하는 Polygon의 용어입니다.

## ERC20/721 토큰 이전 술어 {#predicate-for-erc20-721-token-transfer}

ERC20/721 술어에서 가장 관련성이 높은 기능은 `startExit`과 `verifyDeprecation`입니다. [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol)를 참고하세요.

`startExit`기능은 종료하고 나가고자 하는 자가 MoreVP 스타일로 나가기를 원할 때 이용됩니다.(이전 트랜잭션 참조).

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

이전 상태 전환을 거부하는 경우, 술어는 `verifyDeprecation` 기능을 노출합니다.

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

마지막으로, `withdrawManager`의 `challengeExit` 기능은 true로 돌아올 경우 `predicate.verifyDeprecation`을 호출하고 나가기를 취소하는 작업을 수행합니다. [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184)를 참고하세요.

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

이것이 Polygon [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) 논리의 핵심을 구성하지만, 실제 구현에는 훨씬 더 관여하고 있으며, [pull request 12](https://github.com/maticnetwork/contracts/pull/78)에서 자세한 내용을 볼 수 있습니다. 위 내용의 검토를 위해 플라즈마 커뮤니티를 초대합니다. 귀중한 피드백을 여기 또는 PR에 남겨 주세요.