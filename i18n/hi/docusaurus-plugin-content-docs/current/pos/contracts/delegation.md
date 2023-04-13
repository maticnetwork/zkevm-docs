---
id: delegation
title: वैलिडेटर शेयरों के माध्यम से प्रतिनिधिमंडल
sidebar_label: Delegation
description: वैलिडेटर शेयरों के माध्यम से प्रतिनिधिमंडल
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

पॉलीगॉन डेलीगेशन का समर्थन, वैलिडेटर शेयरों के माध्यम से करता है. इस डिजाइन का उपयोग करके, बहुत ज्यादा हिसाब-किताब किए बिना, रिवॉर्ड वितरित करना और एथेरेयम कॉन्ट्रैक्ट्स पर स्केल (हजारों डेलीगेटर्स) के साथ स्लैश करना ज़्यादा आसान है.

डेलीगेटर वैलिडेटरों से सीमित पूल के शेयर ख़रीदकर डेलीगेट करते हैं. प्रत्येक वैलिडेटर के पास अपना खुद का वैलिडेटर शेयर टोकन होगा. आइए एक वैलिडेटर`A` के लिए इन फन्जिबल टोकन `VATIC`को कॉल करें. जैसे ही एक यूज़र एक वैलिडेटर `A`में डेलीगेट करता है, वैसे ही उन्हें `MATIC/VATIC`जोड़े के एक एक्सचेंज रेट के आधार पर`VATIC` जारी किया जाएगा. चूंकि यूज़र्स एक्सचेंज रेट के वैल्यू को उपार्जित करता है, इसलिए इससे संकेत मिलता है कि वे अब प्रत्येक `VATIC`के लिए से और `MATIC`निकाल सकते हैं और जब यूज़र्स स्लैश्ड हो जाता है तो यूज़र्स अपने `MATIC`लिए कम`VATIC` निकालते हैं.

नोट करें कि `MATIC`स्टेकिंग टोकन है. डेलीगेशन में भाग लेने के लिए एक डेलीगेटर के पास `MATIC`टोकन होने चाहिए.

प्रारंभ में, एक डेलीगेटर वैलिडेटर `A`विशिष्ट पूल से टोकन `D`खरीदता है जब `1 MATIC per 1 VATIC`होता है.

जब एक वैलिडेटर को और `MATIC`टोकन प्रदान किया जाता है, तो नए टोकन पूल में जोड़े जाते हैं. टोकन के मौजूदा पूल के साथ कहते `100 MATIC`हैं, पूल में `10 MATIC`रिवार्ड जोड़ा जाता है. लेकिन रिवॉर्ड के कारण `VATIC`टोकन की कुल आपूर्ति में बदलाव न होने के कारण, एक्सचेंज रेट `1 MATIC per 0.9 VATIC`हो जाता है. अब, डेलीगेटर `D`को उन्हीं शेयरों के लिए और `MATIC`मिलते हैं.

`VATIC`: वैलिडेटर विशिष्ट मिंटेड वैलिडेटर शेयर टोकन (ERC20 टोकन)

## तकनीकी विनिर्देश {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

एक्सचेंज रेट की गणना निम्नानुसार की जाती है:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## तरीके और वेरिएबल {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- stakeManager में`_amount`को ट्रांसफ़र करें और एक्टिव स्टेक के लिए टाइमलाइन डेटा स्ट्रक्चर को अपडेट करें.
- `updateValidatorState`का इस्तेमाल टाइमलाइन DS को अपडेट करने के उद्देश्य से किया जाता है.
- `Mint`डेलीगेशन `_amount`के लिए वर्तमान `exchangeRate`का इस्तेमाल करके शेयर करता है.
- `amountStaked`का इस्तेमाल लिक्विड रिवॉर्ड की गणना करने के उद्देश्य से प्रत्येक डेलीगेटर के एक्टिव स्टेक की निगरानी के लिए किया जाता है.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- कुल राशि की गणना करने के लिए शेयरों की वर्तमान `exchangeRate`और संख्या का इस्तेमाल करना (सक्रिय हिस्सेदारी + रिवार्ड)
- `unBond`वैलिडेटर से सक्रिय हिस्से, और अगर कोई हो तो रिवार्ड को डेलिगेटर में transfer validator करना
- stakeManger में `updateValidatorState`का इस्तेमाल करके टाइमलाइन से एक्टिव स्टेक को निकालना चाहिए.
- `delegators`मैपिंग का इस्तेमाल निकासी अवधि में स्टेक की निगरानी करने के उद्देश्य से किया जाता है.

### रिवॉर्ड्स निकालें {#withdrawrewards}

```js
function withdrawRewards() public;
```

- एक डेलिगेटर के लिए, रिवार्ड और the की गणना करें और शेयरों की `exchangeRate`बर्न गिनती के आधार पर.
- उदाहरण: अगर एक डेलिगेटर के पास 100 शेयर हैं और एक्सचेंज रेट 200 है तो रिवार्ड 100 टोकन होते हैं, तो डेलिगेटर को 100 टोकन का ट्रांसफ़र कर सकते हैं. शेष हिस्सेदारी 100 है इसलिए एक्सचेंज रेट 200 का इस्तेमाल करके, अब यह 50 शेयरों के लायक है. तो 50 शेयर जला दें. डेलीगेटर के पास अब 100 टोकन (जिसे उन्होंने शुरू में स्टेक / delegated). किया था) के 50 शेयर हैं.

### रीस्टेक {#restake}

Restake दो तरीकों से काम कर सकता है: डेलिगेटर रिवार्ड का इस्तेमाल करके `buyVoucher`या reStake के अधिक शेयरों को खरीद सकता है.

```js
function reStake() public;
```

ऊपर फंक्शन का इस्तेमाल रिस्टोर करने के लिए किया जाता है. शेयरों की संख्या प्रभावित नहीं हुई है क्योंकि `exchangeRate`वही है; इसलिए सिर्फ रिवॉर्ड को वैलिडेटर शेयर कॉन्ट्रैक्ट और स्टेक मैनेजर टाइमलाइन दोनों के लिए एक्टिव स्टेक में ले जाया जाता है.

`getLiquidRewards`संचित रिवार्ड की गणना के लिए इस्तेमाल किया जाता है, यानी डेलिगेटर के पास 100 शेयर हैं और एक्सचेंज रेट 200 है, इसलिए रिवार्ड 100 टोकन हैं. 100 टोकन को सक्रिय दांव में ले जाएँ क्योंकि एक्सचेंज रेट अभी भी उतनी ही संख्या में हिस्सा भी वही रहेगा. केवल फर्क यह है कि अब 200 टोकन को सक्रिय स्टेक में माना जाता है और उसे तुरंत वापस नहीं लिया जा सकता है (लिक्विड रिवार्ड का एक हिस्सा नहीं).

reStaking का उद्देश्य यह है कि चूंकि डेलिगेटर के वैलिडेटर में अब अधिक सक्रिय हिस्सेदारी है और वे उस के लिए अधिक रिवार्ड अर्जित करेंगे, इसलिए डेलिगेटर को होगा.

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

एक बार वापसी की अवधि खत्म हो जाने के बाद, जो डेलिगेटर अपने अपने शेयर को बेच चुके हैं, वे अपने MATIC टोकन का दावा कर सकते हैं. यूज़र को टोकंस ट्रांसफ़र करना चाहिए.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- वैलिडेटर के लिए कमीशन % अपडेट करता है.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

जब एक वैलिडेटर चेकपॉइंट जमा करने के लिए रिवार्ड हो जाता है, तो इस फंक्शन को वैलिडेटर और डेलिगेटर्स के बीच रिवार्ड के वितरण के लिए बुलाया जाता है.
