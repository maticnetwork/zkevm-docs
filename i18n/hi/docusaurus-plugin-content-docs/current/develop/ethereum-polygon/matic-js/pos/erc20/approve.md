---
id: approve
title: मंज़ूर करें
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "रूट टोकन पर आवश्यक रकम को मंज़ूर करें."
---

रूट टोकन पर आवश्यक रकम को मंज़ूर करने के लिए `approve`तरीके का इस्तेमाल किया जा सकता है.

पॉलीगॉन चेन पर रकम डिपाज़िट करने के लिए मंज़ूरी आवश्यक है.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## स्पेंडर पते {#spenderaddress}

जिस पते पर मंज़ूरी दी जाती है उसे `spenderAddress` कहा जाता है. ये एक तृतीय-पक्ष यूज़र या स्मार्ट कॉन्ट्रैक्ट है जो आपकी ओर से आपका टोकन ट्रांसफ़र कर सकता है.

डिफ़ॉल्ट रूप से स्पेंडर पता वैल्यू erc20 प्रेडिकेट पता होता है.

आप मैन्युअल रूप से स्पेंडर पता वैल्यू निर्दिष्ट कर सकते हैं.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
