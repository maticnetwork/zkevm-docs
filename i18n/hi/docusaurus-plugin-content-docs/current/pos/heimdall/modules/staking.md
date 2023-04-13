---
id: staking
title: स्टेकिंग
description: मॉड्यूल जो वैलिडेटर से संबंधित transactions transactions और स्टेट का प्रबंधन करता है
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# स्टेकिंग {#staking}

स्टेकिंग मॉड्यूल हेम्डल के लिए वैलिडेटर से संबंधित ट्रांज़ैक्शन और स्टेट का प्रबंधन करता है. नोट करें कि एक वैलिडेटर एथेरेयम चेन पर अपने टोकन को स्टेक करता है और वैलिडेटर बन जाता है. संबंधित वैलिडेटर एथेरेयम के स्टेक में बदलाव को स्वीकार करने के लिए ज़रूरी पैरामीटर्स का इस्तेमाल करके हेम्डल पर ट्रांज़ैक्शन भेजते हैं. स्टेक में बदलाव पर वैलिडेटरों द्वारा बहुमत में एक बार सहमति जताने पर यह मॉड्यूल हेम्डल स्टेट पर वैलिडेटर से जुड़ी जानकारी को सहेज लेता है.

## की/कुंजी मैनेजमेंट {#key-management}

की/कुंजी मैनेजमेंट के लिए, कृपया [वैलिडेटर कुंजी प्रबंधन](/docs/pos/heimdall/validator-key-management) को देखें

## डेलीगेशन {#delegation}

यह मॉड्यूल हेम्डल पर सिर्फ़ वैलिडेटर स्टेकिंग का प्रबंधन करता है. डेलीगेशन एथेरेयम चेन पर स्मार्ट कॉन्ट्रैक्ट्स पर ही उपलब्ध है. डेलीगेशन रिवॉर्ड की गणना को स्मार्ट कॉन्ट्रैक्ट्स पर ऑप्टिमाइज़ करने के लिए हम वैलेडेटर शेयर (प्रति वैलिडेटर ERC20) का इस्तेमाल कर रहे हैं.

ज़्यादा जानकारी के लिए यहाँ देखें: [डेलीगेशन (वैलिडेटर शेयर)](/docs/pos/contracts/delegation)

## रिवॉर्ड {#rewards}

सभी रिवॉर्ड एथेरेयम चेन पर बांटे जाते हैं. वैलिडेटर और डेलीगेटर बस `StakeManager.sol` पर ट्रांज़ैक्शन भेजकर अपने रिवॉर्ड या रि-स्टेक का दावा करते हैं.

ज़्यादा जानकारी के लिए यहाँ देखें: [रिवॉर्ड](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## मैसेज {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

जब कोई नया वैलिडेटर सिस्टम में शामिल होता है, तब `MsgValidatorJoin`स्टेकिंग को संभालता है. जब वैलिडेटर एकबार एथेरेयम में `StakingManager.sol` में `stake` या `stakeFor` कॉल करता है और जब नया `Staked` इवेंट एमिट किया जाता है.

स्रोत: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

```jsx
/**
 * Staked event - emitted whenever new validator
 *
 * @param signer           Signer address for the validator
 * @param validatorId      Validator id
 * @param activationEpoch  Activation epoch for validator
 * @param amount           Staked amount
 * @param total            Total stake
 * @param signerPubKey     Signer public key (required by Heimdall/Tendermint)
 */
event Staked(
    address indexed signer,
    uint256 indexed validatorId,
    uint256 indexed activationEpoch,
    uint256 amount,
    uint256 total,
    bytes signerPubkey
);
```

`activationEpoch`चेकपॉइंट काउंट है जहां से कोई वैलिडेटर हेम्डल पर एक्टिव हो जाएगा.

अगर स्लॉट उपलब्ध न रहें, तो स्मार्ट कॉन्ट्रैक्ट पर स्टेक कॉल फेल हो जाता है. वैलिडेटर स्लॉट सिस्टम में वैलिडेटरों की संख्या को सीमित करने का तरीका हैं. स्लॉट एथेरेयम स्मार्ट कॉन्ट्रैक्ट्स पर प्रबंधित किए जाते हैं.

हेम्डल ट्रांज़ैक्शन के लिए `ValidatorJoin` मैसेज ये रहा:

```go
type MsgValidatorJoin struct {
	From         hmTypes.HeimdallAddress `json:"from"`
	ID           hmTypes.ValidatorID     `json:"id"`
	SignerPubKey hmTypes.PubKey          `json:"pub_key"`
	TxHash       hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex     uint64                  `json:"log_index"`
}
```

### MsgStakeUpdate {#msgstakeupdate}

जब कोई वैलिडेटर रि-स्टेक करता है या कोई नया डेलीगेशन शामिल होता है, तो `MsgStakeUpdate` स्टेक अपडेट को संभालता है. दोनों में से किसी भी मामले में, नया `StakeUpdate` इवेंट एमिट किया जाता है.

```jsx
/**
 * Stake update event - emitted whenever stake gets updated
 *
 * @param validatorId      Validator id
 * @param newAmount        New staked amount
 */
event StakeUpdate(
	uint256 indexed validatorId,
	uint256 indexed newAmount
);
```

हेम्डल ट्रांज़ैक्शन के लिए `MsgStakeUpdate` मैसेज ये रहा:

```go
// MsgStakeUpdate represents stake update
type MsgStakeUpdate struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgValidatorExit {#msgvalidatorexit}

किसी वैलिडेटर द्वारा एथेरेयम में एक्ज़िट की प्रक्रिया शुरू करने के बाद `MsgValidatorExit` वैलिडेटर एक्ज़िट की प्रक्रिया को संभालता है. यह `SignerUpdate` इवेंट एमिट करता है.

```jsx
/**
 * Unstake init event - emitted whenever validator initiates the exit
 *
 * @param user                Signer
 * @param validatorId         Validator id
 * @param deactivationEpoch   Deactivation epoch for validator
 * @param amount              Unstaked amount
 */
event UnstakeInit(
    address indexed user,
    uint256 indexed validatorId,
    uint256 deactivationEpoch,
    uint256 indexed amount
);
```

हेम्डल ट्रांज़ैक्शन के लिए `MsgValidatorExit` मैसेज ये रहा:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

जब कोई वैलिडेटर एथेरेयम में साइनर की/कुंजी को अपडेट करता है, तब `MsgSignerUpdate` साइनर अपडेट को संभालता है. यह `SignerUpdate`इवेंट एमिट करता है.

```jsx
/**
 * Signer change event - emitted whenever signer key changes
 *
 * @param validatorId      Validator id
 * @param oldSigner        Current old signer
 * @param newSigner        New signer
 * @param signerPubkey     New signer public key
 */
event SignerChange(
    uint256 indexed validatorId,
    address indexed oldSigner,
    address indexed newSigner,
    bytes signerPubkey
);
```

हेम्डल ट्रांज़ैक्शन के लिए `MsgSignerUpdate` मैसेज ये रहा:

```go
// MsgSignerUpdate signer update struct
type MsgSignerUpdate struct {
	From            hmTypes.HeimdallAddress `json:"from"`
	ID              hmTypes.ValidatorID     `json:"id"`
	NewSignerPubKey hmTypes.PubKey          `json:"pubKey"`
	TxHash          hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex        uint64                  `json:"log_index"`
}
```

## CLI कमांड्स {#cli-commands}

### वैलिडेटर की पूरी जानकारी {#validator-details}

**साइनर के पते द्वारा**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

इस कमांड को यह आउटपुट दिखाना चाहिए:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

**वैलिडेटर के पते द्वारा**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

इस कमांड को यह आउटपुट दिखाना चाहिए:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

### वैलिडेटर ज़्वाइन {#validator-join}

यह कमांड CLI के ज़रिए वैलिडेटर ज़्वाइन कमांड भेजता है:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

`tx-hash` की वैल्यू एथेरेयम ट्रांज़ैक्शन (TX) हैश के समान होनी चाहिए जिसने `Staked` इवेंट एमिट किया है और `log-index` वही होना चाहिए जिस पर इवेंट का इंडेक्स एमिट होता है.

## REST API {#rest-apis}

| नाम | तरीका | एंडपॉइंट |
|----------------------|------|------------------|
| हेम्डल वैलिडेटर समूह पाएं | पाएं | /staking/validator-set |
| वैलिडेटर की पूरी जानकारी पाएं | पाएं | /staking/validator/validator-id |


क्वेरी वाले सभी API नीचे दिए गए फ़ॉर्मेट में होंगे:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
