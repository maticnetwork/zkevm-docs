---
id: get-allowance
title: अलाउंस पाएँ
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "यूज़र के लिए मंज़ूर की गई रकम पाएँ."
---

यूज़र के लिए मंज़ूर की गई रकम पाने के लिए `getAllowance` तरीके का इस्तेमाल किया जा सकता है.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## स्पेंडर पते {#spenderaddress}

जिस पते पर मंज़ूरी दी जाती है उसे `spenderAddress` कहा जाता है. ये एक तृतीय-पक्ष यूज़र या स्मार्ट कॉन्ट्रैक्ट है जो आपकी ओर से आपका टोकन ट्रांसफ़र कर सकता है.

डिफ़ॉल्ट रूप से स्पेंडर पता वैल्यू erc20 प्रेडिकेट पता होता है.

आप मैन्युअल रूप से स्पेंडर पता वैल्यू निर्दिष्ट कर सकते हैं.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
