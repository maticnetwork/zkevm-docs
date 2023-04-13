---
id: approve-max
title: मैक्स स्वीकृत करें
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'रूट टोकन पर अधिकतम रकम स्वीकृत करें.'
---

`approveMax`तरीके का उपयोग रूट टोकन पर मैक्स राशि मंज़ूर करने के लिए किया जा सकता है.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress  {#spenderaddress}

जिस पते पर मंज़ूरी दी जाती है उसे `spenderAddress` कहा जाता है. ये एक तृतीय-पक्ष यूज़र या स्मार्ट कॉन्ट्रैक्ट है जो आपकी ओर से आपका टोकन ट्रांसफ़र कर सकता है.

डिफ़ॉल्ट रूप से स्पेंडर पता वैल्यू erc20 प्रेडिकेट पता होता है.

आप मैन्युअल रूप से स्पेंडर पता वैल्यू निर्दिष्ट कर सकते हैं.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
