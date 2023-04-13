---
id: predicates
title: Polygon Plasma-তে প্রেডিডেকটসমূহ
description: Polygon প্লাজমাতে Predicates বাস্তবায়ন বিস্তারিত
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Polygon Plasma-তে প্রেডিডেকটসমূহ {#predicates-in-polygon-plasma}

এই নিবন্ধটি আমাদের প্রেডিকেট ডিজাইন কার্যকর করার বিশদ তুলে ধরে। আমাদের প্রেডিকেট ডিজাইন বৃহদাংশে [জেনেরাইলজ করা প্লাজমার নির্মাণ কৌশল সম্পর্কে বোধগম্যতা](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) থেকে অনুপ্রাণিত এবং এর জন্য আমরা প্লাজমা গ্রুপের কাছে কৃতজ্ঞ। সম্প্রতি আমরা আমাদের [অ্যাকাউন্ট ভিত্তিক MoreVP](https://ethresear.ch/t/account-based-plasma-morevp/5480) স্পেসিফিকেশন প্রকাশ করেছি। লিঙ্কযুক্ত পোস্টটি এই ডকুমেন্টটি বোঝার একটি পূর্বশর্ত।

নোট: `withdrawManager` হল আমাদের টিম যার জন্য প্লাজমা গ্রুপকে *প্রতিশ্রুতি চুক্তি*-কে কল করে।

## ERC20/721 টোকেন ট্রান্সফারের জন্য প্রেডিকেট {#predicate-for-erc20-721-token-transfer}

ERC20/721 প্রেডিকেটের সবচেয়ে প্রাসঙ্গিক ফাংশনগুলি হলো `startExit` এবং `verifyDeprecation`। [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol) দেখুন।

একজন প্রস্থানকারী যখন একটি MoreVP স্টাইল প্রস্থান শুরু করতে চান তখন `startExit` ফাংশনটিকে আমন্ত্রণ করা হবে (পূর্ববর্তী রেফারেন্স লেনদেনেগুলির উল্লেখ করে)।

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

পুরোনো স্টেটের ট্রানজিশনগুলিকে চ্যালেঞ্জ করার জন্য, প্রেডিকেটটি `verifyDeprecation` ফাংশন প্রকাশ করে।

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

চূড়ান্তভাবে,`predicate.verifyDeprecation` -কে কল করার জন্য এবং এটি সত্য হিসাবে ফিরে এলে প্রস্থানটি বাতিল করার জন্য`withdrawManager` -এ`challengeExit`  ফাংশনটি দায়ী। [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184) দেখুন।

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

যখন এটি আমাদের [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) লজিকের জটিল সমস্যার মীমাংসা করে তখন প্রকৃত বাস্তবায়ন আরো বেশি জড়িত এবং এটি [পুল অনুরোধ 12](https://github.com/maticnetwork/contracts/pull/78)-এ খুঁজে পাওয়া যেতে পারে। আমরা প্লাজমা কমিউনিটিকে এটি পর্যালোচনা করতে এবং এখানে বা তাদের PR-এ তাদের মূল্যবান মতামত জানানোর আমন্ত্রণ জানাই।