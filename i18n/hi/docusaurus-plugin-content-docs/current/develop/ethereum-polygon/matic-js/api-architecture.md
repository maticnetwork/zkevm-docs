---
id: api-architecture
title: API आर्किटेक्चर
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: पढ़ने वाले और लिखे जाने वाले API और इनके ट्रांज़ैक्शन की सेटिंग्स.
---

लाइब्रेरी पूरे तरीके से आम API आर्किटेक्चर को फ़ॉलो करती है और सभी API दो प्रकारों में विभाजित होते हैं -

1. पढ़े जाने वाले API
2. लिखे जाने वाले API

## पढ़े जाने वाले API {#read-api}

पढ़े जाने वाला API ब्लॉकचेन पर कुछ प्रकाशित नहीं करता, इसलिए यह कोई गैस फ़ीस खर्च नहीं करता है. जाने वाले APIs के उदाहरण हैं - `getBalance`, `isWithdrawExited` इत्यादि.

आइए, पढ़े जाने वाले API का एक उदाहरण देखते हैं -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

पढ़े जाने वाले API बहुत सरल होते हैं और परिणाम सीधे भेजते हैं.

## 2. लिखे जाने वाले API {#2-write-api}

लिखे जाने वाले API ब्लॉकचेन पर कुछ डेटा प्रकाशित करता है, इसलिए यह गैस को खर्च करता है. लिखे जाने वाले APIs के उदाहरण हैं - `approve`, `deposit` इत्यादि.

जब आप एक लिखे जाने वाले API को कॉल कर रहे हो - आपको परिणाम से दो डेटा की आवश्यकता होती है.

1. TransactionHash
2. TransactionReceipt

आइए, लिखे जाने वाले API का एक उदाहरण देखते हैं और transactionhash एवं रसीद प्राप्त करते हैं -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### ट्रांज़ैक्शन के विकल्प {#transaction-option}

सभी API's के लिए कुछ कॉन्फ़िगर करने योग्य विकल्प मौजूद हैं. इन कॉन्फ़िगरेशन्स को पैरामीटर में पारित किया जा सकता है.

मौजूद कॉन्फ़िगरेशन्स हैं -

- from?: स्ट्रिंग | नंबर - इससे ट्रांज़ैक्शन का पता बनाया जाना चाहिए.
- to?: स्ट्रिंग - इसके लिए ट्रांज़ैक्शन का पता बनाया जाना चाहिए.
- value?: नंबर | स्ट्रिंग | BN - Wei में ट्रांज़ैक्शन के लिए ट्रांसफ़र हुई वैल्यू.
- gasLimit?: नंबर | स्ट्रिंग - एक ट्रांज़ैक्शन के लिए दी गई अधिकतम गैस (गैस की सीमा).
- gasPrice?: नंबर | स्ट्रिंग | BN - Wei में ट्रांज़ैक्शन के लिए इस्तेमाल की जाने वाली गैस की कीमत.
- data?: स्ट्रिंग - कॉन्ट्रैक्ट का बाइट कोड.
- nonce?: नंबर;
- chainId?: नंबर;
- chain?: स्ट्रिंग;
- hardfork?: स्ट्रिंग;
- returnTransaction?: boolean - इसे सच करने पर ट्रांज़ैक्शन हुआ ऑब्जेक्ट रिटर्न कर दिया जाएगा जिसे ट्रांज़ैक्शन को मैन्युअली भेजने में इस्तेमाल किया जा सकता है.

आइए, गैस की क़ीमत को कॉन्फ़िगर करके इसका एक उदाहरण देखते हैं

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
