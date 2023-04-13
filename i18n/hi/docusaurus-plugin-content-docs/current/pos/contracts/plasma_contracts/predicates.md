---
id: predicates
title: पॉलीगॉन प्लाज़्मा में प्रीडिकेट्स
description: पॉलीगॉन प्लाजमा में भविष्यवक्ताओं का कार्यान्वयन विवरण
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

# पॉलीगॉन प्लाज़्मा में प्रीडिकेट्स {#predicates-in-polygon-plasma}

यह आलेख हमारे प्रीडिकेट डिज़ाइन को लागू करने की विस्तृत जानकारी देता है. हमारा प्रीडिकेट डिज़ाइन [व्यापक प्लाज़्मा आर्किटेक्चर को समझना](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741) से पूरी तरह प्रेरित है और हम इसके लिए प्लाज़्मा ग्रुप को धन्यवाद देते हैं. हमने हाल ही में अपना [अकाउंट आधारित MoreVP](https://ethresear.ch/t/account-based-plasma-morevp/5480) ब्यौरा प्रकाशित किया है. इस दस्तावेज को समझने के लिए लिंक किए गए पोस्ट को पहले पढ़ना ज़रूरी है.

नोट:`withdrawManager` हमारा शब्द है जिसे प्लाज़्मा ग्रुप *प्रतिबद्धता अनुबंध* कहता है.

## ERC20/721 टोकन ट्रांसफ़र के लिए प्रीडिकेट {#predicate-for-erc20-721-token-transfer}

ERC20/721 प्रीडिकेट्स में सबसे प्रासंगिक फ़ंक्शन `startExit`और `verifyDeprecation`हैं. [IPredicate.sol 5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol) देखें.

एक `startExit`फ़ंक्शन को तब लागू किया जाएगा जब कोई एक्ज़िटर MoreVP शैली का निकास शुरू करना चाहेगा (पहले होने वाले रेफ़रेंस ट्रांज़ैक्शनों का हवाला देते हुए).

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

पुराने स्टेट ट्रांज़िशन को चैलेंज करने के लिए, प्रीडिकेट `verifyDeprecation`फ़ंक्शन को उजागर करता है.

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

आखिर में, अगर रिटर्न सच हों, तो `predicate.verifyDeprecation`को कॉल करने के लिए और निकास को कैंसिल करने के लिए `withdrawManager` में `challengeExit`फ़ंक्शन ज़िम्मेदार होगा. [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184) देखें.

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

जबकि यह हमारे [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) लॉजिक की मूल बात है, फिर भी असल तौर पर लागू करने में और कई बातें शामिल हैं और इस [पुल अनुरोध 12](https://github.com/maticnetwork/contracts/pull/78) में पाई जा सकती हैं. इसकी समीक्षा करने के लिए और यहाँ या PR पर अपना बहुमूल्य फ़ीडबैक देने के लिए हम प्लाज़्मा कम्युनिटी को आमंत्रित करते हैं.