---
id: how-state-sync-works
title: स्टेट सिंक कैसे काम करता है?
description: "स्टेट को एथेरेयम चेन से बोर चेन में भेजना."
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# स्टेट सिंक कैसे काम करता है? {#how-does-state-sync-work}

स्टेट मैनेजमेंट, स्टेट को एथेरेयम चेन से बोर चेन में भेजता है. इसे **स्टेट सिंक** कहा जाता है.

Ethereum से बोर में स्टेट transfer Ethereum सिस्टम कॉल के माध्यम से होता है. इसका ध्यान रखें, एक यूजर Ethereum. पर जमा मैनेजर को यूएसडीसी को जमा करता है. वैलिडेटर उन घटनाओं को सुनते हैं जो उन्हें Heimdall स्टेट में स्टोर करते हैं. बोर को सबसे हाल का स्टेट-सिंक रिकॉर्ड मिलता है और एक सिस्टम कॉल का इस्तेमाल करके बोर स्टेट (बोर में USDC के बराबर अमाउंट के मिंट्स) को अपडेट करता है.

## स्टेट सेंडर {#state-sender}

स्रोत: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

स्टेट सिंक करने के लिए, कॉन्ट्रैक्ट एथेरेयम चेन में नीचे दिया गया तरीका **स्टेट सेंडर कॉन्ट्रैक्ट** कॉल करता है.

```jsx
contract StateSender {
	/**
	 * Emits `stateSynced` events to start sync process on Ethereum chain
	 * @param receiver    Target contract on Bor chain
	 * @param data        Data to send
	 */
	function syncState (
		address receiver,
		bytes calldata data
	) external;
}
```

`receiver`कॉन्ट्रैक्ट को चाइल्ड चेन पर मौजूद रहना चाहिए, जो प्रक्रिया के पूरा होने पर `data` स्टेट को रिसीव करता है, एथेरेयम पर `StateSynced`इवेंट को एमिट `syncState`करता है, जो नीचे दिया गया है:

```jsx
/**
 * Emits `stateSynced` events to start sync process on Ethereum chain
 * @param id                  State id
 * @param contractAddress     Target contract address on Bor
 * @param data                Data to send to Bor chain for Target contract address
 */
event StateSynced (
	uint256 indexed id,
	address indexed contractAddress,
	bytes data
);
```

एक बार एथेरेयम चेन में `stateSender` कॉन्ट्रैक्ट पर `StateSynced` इवेंट एमिट हो जाने पर, हेम्डल उन इवेंट्स पर गौर करता है और 2/3+ वैलिडेटर्स के इस पर सहमत हो जाने पर हेम्डल स्टेट में जोड़ देता है.

हर स्प्रिंट के बाद (फ़िलहाल बोर में 64 ब्लॉक), बोर नया स्टेट-सिंक रिकॉर्ड लेता है और `system` कॉल का इस्तेमाल करते हुए स्टेट को अपडेट करता है. उसी के लिए कोड यहाँ है: [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

`commitState` के दौरान, बोर लक्षित कॉन्ट्रैक्ट पर आर्ग्स के रूप में `data` और `stateId` के साथ, `onStateReceive` को निष्पादित करता है.

## बोर में स्टेट रिसिवर इंटरफ़ेस {#state-receiver-interface-on-bor}

बोर चेन पर `receiver` कॉन्ट्रैक्ट को नीचे दिया गया इंटरफ़ेस लागू करना चाहिए.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

सिर्फ `0x0000000000000000000000000000000000001001` — `StateReceiver.sol`, लक्षित कॉन्ट्रैक्ट पर `onStateReceive` फ़ंक्शन को कॉल करने की अनुमति दी जानी चाहिए.

## सिस्टम कॉल {#system-call}

केवल सिस्टम पता, `2^160-2`, सिस्टम कॉल करने की अनुमति देता है. बोर इसे सिस्टम पता के साथ `msg.sender` के रूप में आंतरिक रूप से कॉल करता है. यह कॉन्ट्रैक्ट स्टेट को बदल देता है और एक खास ब्लॉक के लिए स्टेट रुट को अपडेट करता है. [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) और [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts) से प्रेरित

सिस्टम कॉल कोई ट्रांज़ैक्शन किए बिना स्टेट को कॉन्ट्रैक्ट में बदलने में सहायक होता है.

## स्टेट-सिंक लॉग और बोर ब्लॉक रिसिप्ट {#state-sync-logs-and-bor-block-receipt}

सिस्टम कॉल द्वारा एमिट किए गए इवेंट्स सामान्य लॉग के मुकाबले एक अलग तरीके से संभाले जाते हैं. यहाँ कोड है: [https://github.com/matikngnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90)

बोर क्लाइंट के लिए सिर्फ एक नई tx/रसीद पैदा करता है, जिसमें स्टेट सिंक के लिए सभी लॉग शामिल होते हैं. Tx हैश को ब्लॉक नंबर और ब्लॉक हैश (उस स्प्रिंट में आखिरी ब्लॉक में).

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

यह कोई सहमति लॉजिक नहीं बदलता है, केवल क्लाइंट में परिवर्तन होता `eth_getBlockByNumber``eth_getTransactionReceipt`है. और इसमें derived. के साथ स्टेट सिंक लॉग शामिल होते `eth_getLogs`हैं. नोट करें कि ब्लॉक में ब्लूम फिल्टर स्टेट-सिंक लॉग में शामिल चीज़ों को शामिल नहीं करता है. इसमें शामिल नहीं है `transactionRoot`या में व्युत्पन्न tx शामिल नहीं है.`receiptRoot`