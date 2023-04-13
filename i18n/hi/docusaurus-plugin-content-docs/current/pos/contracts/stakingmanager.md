---
id: stakingmanager
title: स्टेकिंग मैनेजर
description: स्टेकिंग मैनेजर पॉलीगॉन नेटवर्क पर validator-related गतिविधियों को संभालने का मुख्य कॉन्ट्रैक्ट है.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

पॉलीगॉन की सुरक्षा के सबूत के आधार पर आम सहमति के लिए, सभी 2/2/2/1 the सत्यापन और स्टेकिंग के हैंडलिंग को Ethereum स्मार्ट कॉन्ट्रैक्ट पर रिवार्ड किया जाता है. संपूर्ण डिजाइन मेननेट कॉन्ट्रैक्ट पर कम करने के इस दर्शन का अनुसरण करता है. यह सूचना सत्यापन करता है और [सभी](https://wiki.polygon.technology/docs/pos/heimdall/overview) computation-heavy ऑपरेशन को L2 में धकेल देता है (हेम्डल के बारे में पढ़ें).

**स्टेकर** **को वैलिडेटर्स**, **डेलिगेटर्स** और **वॉटर्स** में विभाजित किया जाता है (धोखाधड़ी की रिपोर्ट के लिए).

[**स्टेकमैनेजर**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) `checkPoint`सिग्नेचर सत्यापन और इनाम वितरण और स्टेक मैनेजमेंट जैसे वैलिडेटर से संबंधित गतिविधियों को संभालने का मुख्य कॉन्ट्रैक्ट है. चूंकि कॉन्ट्रैक्ट **NFT ID** का इस्तेमाल स्वामित्व के स्रोत के रूप में कर रहा है, इसलिए स्वामित्व और signer में बदलाव सिस्टम में कुछ भी प्रभावित नहीं होगा.

:::tip

एक Ethereum पते से, **स्टेकर केवल एक वैलिडेटर या डेलिगेटर हो सकता** है (यह सिर्फ एक डिज़ाइन विकल्प है, कोई हार्ड कारण नहीं).

:::

## वैलिडेटर एडमिशन / रिप्लेसमेंट {#validator-admissions-replacement}

### एडमिशन {#admissions}
वर्तमान में, पॉलीगॉन PoS पर कोई ओपन वैलिडेटर स्लॉट उपलब्ध नहीं है. वैलिडेटर बनने के लिए वेटर लिस्ट भी है. भविष्य में, अगर स्लॉट उपलब्ध हो जाते हैं, तो वैलिडेटर वेटलिस्ट को से दूर करने के लिए आवेदन कर सकते हैं.


### रिप्लेसमेंट {#replacement}
PIP4 ने सामुदायिक दृश्यता के लिए वैलिडेटर प्रदर्शन को प्रदर्शित करने की अवधारणा को पेश किया. अगर एक वैलिडेटर एक लंबे समय के लिए अस्वस्थ स्टेट में है जो PIP4 में उल्लिखित है, तो वे नेटवर्क से off-boarded हैं. वैलिडेटर स्लॉट को तब वेटलिस्ट से निकलने वाले लोगों के लिए उपलब्ध कराया जाता है.

:::info

वर्तमान में, [<ins>PIP4 में पार्ट C के चरण 2 को</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) लागू किया जा रहा है. यह उस समय है जब समुदाय वैलिडेटर की संभावना मूल्यांकन मानदंडों पर फैसला करता है. समय में, यह व्यायाम एक एप्लिकेशन और एडमिशन की प्रक्रिया का उत्पादन करेगा.

:::

## तरीके और वेरिएबल {#methods-and-variables}

:::caution स्लाइसिंग इम्प्लीमेंट

`jail`, `unJail`और `slash`फंक्शन का इस्तेमाल वर्तमान में स्लैशिंग के कार्यान्वयन के हिस्से के रूप में नहीं किया जाता है.

:::

### validatorThreshold {#validatorthreshold}

यह सिस्टम द्वारा स्वीकार किए गए वैलिडेटर्स की अधिकतम संख्या को स्टोर करता है, जिसे स्लॉट भी कहते हैं.

### अकाउंट स्टेट रुट {#accountstateroot}

- वैलिडेटर्स और डेलिगेटर के लिए Heimdall पर किए गए विभिन्न अकाउंटिंग के लिए, अकाउंट रूट को जमा करते समय जमा किया जाता `checkpoint`है.
- accRoot का इस्तेमाल जबकि `claimRewards`और`unStakeClaim`

### हिस्से/हिस्सेदारी के लिए {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- जो भी राशि (MATIC टोकन में) `minDeposit`के साथ किसी को भी कम हो , अगर कम `currentValidatorSetSize`हो तो अनुमति देता है.`validatorThreshold`
- नीलामी इंटरवल (नीलामी सेक्शन में अधिक) के लिए वैलिडेटर को नीलामी की अवधि में शामिल करना `amount+heimdallFee`चाहिए.
- `updateTimeLine`विशेष समय-समय डेटा संरचना को अपडेट करता है, जो दी गई epoch / चेकपॉइंट गिनती के लिए सक्रिय वैलिडेटर्स और एक्टिव स्टेक की ट्रैक रखता है.
- हर नए `stake`या कॉल पर एक अद्वितीय को मिंट किया जाता है, जिसे किसी को भी transferred र किया जा सकता `NFT``stakeFor`है, लेकिन 1:1 Ethereum पता के स्वामित्व में हो सकता है.
- `acceptDelegation`अगर वैलिडेटर प्रतिनिधिमंडल को स्वीकार करना चाहते हैं तो वैलिडेटर के लिए `ValidatorShare`कॉन्ट्रैक्ट को तैनात किया जाता है.

### अनस्टेक करें {#unstake}

- अगले ePoch में सेट किए गए वैलिडेटर से वैलिडेटर को हटा दें (एक बार बुलाया जाने वाला मौजूदा चेकपॉइंट के लिए केवल वैध `unstake`है)
- टाइमलाइन डेटा स्ट्रक्चर से वैलिडेटर के स्टेक को हटाएं, वैलिडेटर के निकास अवधि के लिए काउंट को अद्यतित करें.
- अगर वैलिडेटर का प्रतिनिधिमंडल होता तो नए डेलिगेशन के लिए सभी रिवार्ड और लॉक प्रतिनिधिमंडल कॉन्ट्रैक्ट को इकट्ठा करें.

### क्लेम अनस्टेक करें {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- इसके `unstaking`बाद, वैलिडेटर्स को वापस लेने की अवधि में डाल दिया जाता `unstaking`है, ताकि उन्हें बाद में कोई धोखाधड़ी मिल जाए तो उन्हें स्लैश किया जा सकता है.
- एक बार की `WITHDRAWAL_DELAY`अवधि की सेवा करने के बाद, वैलिडेटर इस फंक्शन को कॉल कर सकते हैं और (अगर कोई हो जाए तो रिवार्ड को प्राप्त हो `stakeManager`जाए, जो स्टेक टोकन को वापस ले लें, NFT, को जला दें)

### रीस्टेक करें {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- वैलिडेटरों को नया आइटम या रिवॉर्ड या दोनों डालकर अपना स्टेक बढ़ाने की अनुमति देता है.
- सक्रिय दांव के लिए समय-समय (मात्रा) को अपडेट करना चाहिए.

### रिवॉर्ड्स निकालें {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

यह तरीका वैलिडेटर्स को जमा रिवार्ड वापस लेने की अनुमति देता है, अगर वैलिडेटर प्रतिनिधिमंडल को स्वीकार करता है, तो प्रतिनिधिमंडल कॉन्ट्रैक्ट से रिवार्ड मिलने पर विचार करना चाहिए.

### साइनर अपडेट करें {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

यह तरीका वैलिडेटर्स को signer पता को अपडेट करने की अनुमति देता है (जिसका इस्तेमाल पॉलीगॉन ब्लॉकचेन और चेकपॉइंट सिग्नेचर पर ब्लॉक को वैलिडेट करने के लिए किया जाता `stakeManager`है).

### मुफ्त में टॉप अप करें {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

वैलिडेटर इस तरीके का इनवॉयस करके Heimdall फीस के लिए अपने बैलेंस को टॉप अप कर सकते हैं.

### क्लेम फ़ीस {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

इस तरीके का इस्तेमाल Heimdall. से फीस वापस लेने के लिए किया जाता है. हर चेकपॉइंट पर अपडेट किया जाता `accountStateRoot`है, जिससे वैलिडेटर Heimdall पर अकाउंट के लिए इस रूट में शामिल होने का सबूत प्रदान कर सकते हैं और फीस वापस ले सकते हैं.

ध्यान दें कि मल्टीपल चेकपॉइंट पर निकलने को रोकने के लिए (पुरानी रूट और रिव्यू के लिए) को दोबारा लिखा जाता `accountStateRoot``stakeManager`है. फिलहाल इसका इस्तेमाल नहीं किया `accumSlashedAmount`जाता है और अगर जरूरत हो तो Heimdall पर स्लैश करने के लिए इस्तेमाल किया जाएगा.

### स्टेकिंग NFT {#stakingnft}

मानक ERC721 कॉन्ट्रैक्ट के साथ कुछ प्रतिबंधों जैसे कि प्रति यूजर एक टोकन और अनुक्रमिक तरीके से मिंट हो जाती है.

### नीलामी शुरू करें {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

पहले से ही चल रही नीलामी पर बोली या बोली को शुरू करने के लिए, इस फंक्शन का इस्तेमाल किया जाता है. नीलामी की अवधि की तरह चक्रों में चलती है `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`ताकि उसे **सही नीलामी अवधि की जांच करनी चाहिए.**

`perceivedStakeFactor`सटीक फैक्टर* पुरानी स्टेक की गणना करने के लिए इस्तेमाल किया जाता है (नोट करें कि फंक्शन को चुनने के लिए डिफ़ॉल्ट 1 WIP द्वारा होता है). **पिछली नीलामी की अवधि से नीलामी की जांच करनी होगी** (अगर कोई अभी भी जारी है (अगली नीलामी में अपनी राजधानी को बाहर निकालने के लिए कोई `confirmAuction`कॉल नहीं करना चुन सकता है). आमतौर पर एक में लगातार इंगलिश की नीलामी हो रही है `auctionPeriod`.

### नीलामी बोली की पुष्टि करें {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **यह जांच करना चाहिए कि यह नीलामी की अवधि नहीं है.**
- अगर आखिरी बोलीदाता का मालिक `validatorId`है, तो व्यवहार को आराम करने के समान होना चाहिए.
- दूसरे मामले में को अनस्टेक करें `validatorId`और अगले चेकपॉइंट से वैलिडेटर के रूप में नया यूज़र जोड़ें क्योंकि नए यूज़र का व्यवहार, स्टेक/स्टेकफॉर की तरह होना चाहिए.

### सिग्नेचर जाँचें {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- चेकपॉइंट सबमिट करते समय राइट्स सिर्फ रूटचेन कॉन्ट्रैक्ट के लिए होते हैं
- `voteHash`जिस पर सभी वैलिडेटर साइन करते हैं (BFT ⅔+1 एग्रीमेंट)
- यह फ़ंक्शन केवल अनोखे सिग्नेचर को वैलिडेट करता है और ⅔+1 की जाँच करता है, पॉवर ने चेकपॉइंट रुट (सभी डेटा के लिए रूटचेन कॉन्ट्रैक्ट में `voteHash`सत्यापन में शामिल) पर साइन किया है `currentValidatorSetTotalStake`जो वर्तमान एक्टिव स्टेक प्रदान करता है.
- वैलिडेटर की हिस्सेदारी को आनुपातिक रूप से वितरित किया जाता है. [Rewards वितरण](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2) में अधिक

### वैलिडेटर है {#isvalidator}

जाँचें कि अगर एक दिया गया वैलिडेटर मौजूदा ePoch, के लिए सक्रिय वैलिडेटर है.

## टाइमलाइन डेटा स्ट्रक्चर {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## स्टेकिंग की जानकारी {#stakinginfo}

वैलिडेटर और प्रतिनिधिमंडल दोनों के इवेंट के लिए केंद्रीकृत लॉगिंग कॉन्ट्रैक्ट में कुछ ही read read शामिल हैं. आप GitHub पर [Stakinginfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) कॉन्ट्रैक्ट के सोर्स कोड को चेक कर सकते हैं.

## वैलिडेटर शेयर फ़ैक्टरी {#validatorsharefactory}

प्रतिनिधिमंडल के लिए ऑप्ट इन करने वाले प्रत्येक वैलिडेटर के लिए `ValidatorShare`कॉन्ट्रैक्ट को तैनात करने का एक फैक्ट्री कॉन्ट्रैक्ट है. आप GitHub पर [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) के सोर्स कोड को चेक कर सकते हैं.
