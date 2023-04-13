---
id: predicates
title: Polygon Plasma'da koşullar
description: Polygon Plazmasında Öngörülerin Uygulanması Detayları
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# Polygon Plasma'da koşullar {#predicates-in-polygon-plasma}

Bu makale, koşul tasarımımızın uygulama ayrıntılarını vurgulamaktadır. Koşul tasarımımız ilhamını büyük çapta [Genelleştirilmiş Plasma Mimarisini Anlamak](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) makalesinden almaktadır ve plasma grubuna aynı nedenle teşekkürlerimizi sunuyoruz. Yakın zamanda [Hesap tabanlı MoreVP](https://ethresear.ch/t/account-based-plasma-morevp/5480) özelliklerimizi yayımladık. Bağlantısı sunulan gönderi, bu belgeyi anlamak için bir önkoşuldur.

Not: Plasma grubunun *taahhüt sözleşmesi * olarak adlandırdığı terim için biz `withdrawManager` kullanıyoruz.

## ERC20/721 token aktarımı için koşul {#predicate-for-erc20-721-token-transfer}

ERC20/721 koşullarındaki en geçerli işlevler `startExit` ve `verifyDeprecation` işlevleridir. Bkz. [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol).

Çıkış yapan kullanıcı bir MoreVP türü çıkış başlatmak istediğinde `startExit` işlevi çağrılacaktır (önceki referans işlemlerine atıfla).

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

Daha eski durum geçişlerini sınamak için, koşul `verifyDeprecation` işlevini çağırır.

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

Son olarak, `withdrawManager` içindeki `challengeExit` işlevi, `predicate.verifyDeprecation` çağrısından ve "true" sonucu alınması halinde çıkışı iptal etmekten sorumludur. Bkz. [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184).

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

 [ERD20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) mantığımızın püf noktaları bundan ibaret olmakla beraber, uygulamanın kendisi çok daha karmaşıktır ve buradaki [çekme isteği 12](https://github.com/maticnetwork/contracts/pull/78) üzerinde bilgileri bulunabilir. Plasma topluluğunu aynı gözden geçirmeyi yapmaları ve değerli yorumlarını buraya veya çekme isteğine bırakmaları için davet ediyoruz.