---
id: transactions
title: ट्रांज़ैक्शन
description: transactions transactions क्या है और जब उनका इस्तेमाल किया जाता है
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# ट्रांज़ैक्शन {#transactions}

Transactions में [संदर्भों](https://docs.cosmos.network/main/core/context.html) और [संदेशों](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) में आयोजित मेटाडाटा शामिल हैं जो मॉड्यूल के हैंडलर के माध्यम से मॉड्यूल के भीतर स्टेट को बदलने को ट्रिगर करता है.

जब यूज़र किसी ऐप्लिकेशन के साथ इंटरैक्ट करना चाहता है और स्टेट में बदलाव करना (मिसाल के तौर पर, कॉइन भेजना) चाहता है, तो वे ट्रांज़ैक्शन बनाते हैं. ट्रांज़ैक्शन को नेटवर्क पर ब्रॉडकास्ट करने से पहले हर एक ट्रांज़ैक्शन के `message` को उपयुक्त अकाउंट से जुड़े निजी की/कुंजी का इस्तेमाल करके साइन किया जाना चाहिए. उसके बाद ट्रांज़ैक्शन को ब्लॉक में शामिल किया जाना चाहिए, वैलिडेट किया जाना चाहिए और फिर सहमति की प्रक्रिया के ज़रिए नेटवर्क द्वारा पारित किया जाना चाहिए. एक ट्रांज़ैक्शन के लाइफ़साइकिल के बारे में ज़्यादा पढ़ने के लिए, [यहाँ](https://docs.cosmos.network/main/basics/tx-lifecycle.html) क्लिक करें.

## प्रकार की परिभाषा {#type-definition}

Transaction ऑब्जेक्ट्स SDK प्रकार हैं जो इंटरफेस को लागू करते `Tx`हैं.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

Transactions: पर अधिक विवरण : [https://docs.cosmos.network/main/core/transactions.html](https://docs.cosmos.network/main/core/transactions.html) . html
