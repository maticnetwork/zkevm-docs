---
id: core_concepts
title: मुख्य संकल्पनाएँ
description: बोर पॉलीगॉन आर्किटेक्चर में स्टेट चेन है
keywords:
  - docs
  - matic
  - Core Concepts
  - polygon
  - state chain
  - architecture
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# मुख्य संकल्पनाएँ {#core-concepts}

बोर, पॉलीगॉन आर्किटेक्चर में स्टेट चेन है. यह बोर नामक नई सहमति के साथ गेथ [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) का एक फोर्क है.

स्रोत: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## सहमति {#consensus}

बोर [क्लॉक सहमति](https://eips.ethereum.org/EIPS/eip-225) से प्रेरित नई सुधरी सहमति का इस्तेमाल करता है.

सहमति और विनिर्देशों का अधिक विवरण : [बोर सहमति](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## जेनेसिस {#genesis}

जेनेसिस ब्लॉक में नेटवर्क को कॉन्फ़िगर करने के लिए सभी जानकारी मौजूद है. यह मूल रूप से बोर चेन के लिए कॉन्फ़िगरेशन फ़ाइल है. बोर चेन को बूट करने के लिए, यूज़र को एक पैरामीटर के रूप में फ़ाइल के लोकेशन के बारे में बताना पड़ता है.

बोर, जेनेसिस ब्लॉक और पैराम्स के रूप में `genesis.json`का इस्तेमाल करता है. यहां बोर जेनेसिस के लिए एक उदाहरण `config`है:

```json
"config": {
    "chainId": 15001,
    "homesteadBlock": 1,
    "eip150Block": 0,
    "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "bor": {
      "period": 1,
      "producerDelay": 4,
      "sprint": 64,
      "validatorContract": "0x0000000000000000000000000000000000001000",
      "stateReceiverContract": "0x0000000000000000000000000000000000001001"
    }
  }
```

[कॉन्फ़िगरेशन](https://www.notion.so/15ab7eb6e8124142a3641939762d6d67)

[सहमति विशिष्ट कॉन्फ़िगरेशन](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## VM के रूप में EVM/सॉलिडिटी {#evm-solidity-as-vm}

बोर, ट्रांज़ैक्शन के लिए एक VM के रूप में असंसोधित EVM का इस्तेमाल करता है. डेवलपर्स ऐसे किसी भी कॉन्ट्रैक्ट को डिप्लॉय कर सकते हैं जिन्हें वे बिना किसी परिवर्तन के एक ही एथेरेयम टूल्स और कम्पाइलर जैसे `solc`का इस्तेमाल करना चाहते हैं.

## नेटिव टोकन (गैस टोकन) के रूप में मैटिक {#matic-as-native-token-gas-token}

बोर में एथेरेयम में ETH के समान एक नेटिव टोकन के रूप में एक मैटिक टोकन होता है. इसे अक्सर गैस टोकन कहा जाता है. यह टोकन ठीक उसी तरह काम करता है जिस तरह ETH, एथेरेयम चेन पर वर्तमान में काम करता है.

इसके अलावा, बोर, नेटिव टोकन (WETH टोकन की तरह) के लिए एक इन-बिल्ट रैप्ड ERC20 प्रदान करता है, जिसका मतलब है कि एप्लिकेशन, मैटिक नेटिव टोकन के अपने ही रैप्ड ERC20 वर्जन का निर्माण किए बिना अपने ऐप्लिकेशनों में रैप्ड मैटिक ERC20 टोकन का इस्तेमाल कर सकते हैं.

रैप्ड ERC20 टोकन को जेनेसिस कॉन्ट्रैक्ट्स में से एक के रूप में बोर पर `0000000000000000000000000000000000001010`के रूप में `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)`पर डिप्लॉय किया जाता है.

### फीस {#fees}

बोर पर ट्रांज़ैक्शन भेजते समय फीस के रूप में नेटिव टोकन का इस्तेमाल किया जाता है. यह बोर पर स्पैम को रोकता है और ब्लॉक प्रोड्यूसर्स को अधिक लम्बी अवधि के लिए चेन को संचालित करने के लिए प्रोत्साहित करता है और खराब व्यवहार को हतोत्साहित करता है.

एक ट्रांज़ैक्शन सेंडर प्रत्येक ट्रांज़ैक्शन के लिए `GasLimit`और `GasPrice`को निर्दिष्ट  करता है और बोर पर उसका प्रसारण करता है. प्रत्येक प्रोड्यूसर निर्दिष्ट कर सकता है कि बोर नोड को शुरू करते समय वे`--gas-price` का इस्तेमाल करके न्यूनतम कितनी गैस कीमत को स्वीकार कर सकते हैं. अगर ट्रांज़ैक्शन पर यूज़र-निर्दिष्ट`GasPrice`, प्रोड्यूसर द्वारा निर्दिष्टगैस कीमत के समान या अधिक है तो प्रोड्यूसर, ट्रांज़ैक्शन को स्वीकार करेगा और अगले उपलब्ध ब्लॉक में उसे शामिल करता है. इससे प्रत्येक प्रोड्यूसर को अपनी न्यूनतम गैस कीमत आवश्यकता को पूरा करने में आसानी होती है.

ट्रांज़ैक्शन फ़ीस को नेटिव टोकन के संदर्भ में सेंडर अकाउंट से काटा जाएगा.

यहाँ ट्रांज़ैक्शन फ़ीस का फार्मूला दिया गया है:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

एक ब्लॉक में सभी ट्रांज़ैक्शन के लिए एकत्र की गई फ़ीस को कॉयनबेस ट्रांसफार का इस्तेमाल करके प्रोड्यूसर के अकाउंट में स्थानांतरित कर दिया जाता है. चूंकि स्टेकिंग पावर के अधिक होने से एक प्रोड्यूसर बनने की आपकी संभावना बढ़ जाती है, इसलिए यह एक वैलिडेटर को एक उच्च स्टेकिंग पावर के साथ एक वैलिडेटर को तदनुसार और अधिक रिवॉर्ड (फ़ीस के संदर्भ में) इकट्ठा करने की अनुमति देगा.

### ट्रांसफ़र रिसीप्ट लॉग्स {#transfer-receipt-logs}

बोर पर प्रत्येक प्लाज़्मा कॉम्पैटिबल ERC20 टोकन, एक स्पेशल रिसीप्ट लॉग जोड़ता है. मैटिक टोकन इसका अपवाद नहीं है.

`LogTransfer`एक विशेष लॉग है जिसे सभी प्लाज़्मा कॉम्पैटिबल ERC20/721 टोकन में जोड़ा जाता है. इसे ट्रांसफ़र के लिए एक 2-इनपुट-2-आउटपुटपुट UTXO समझें. यहाँ, `output1 = input1 - amount`और  `output2 = input2 + amount`यह प्लाज़्मा फ्रॉड-प्रूफ कॉन्ट्रैक्ट्स को एथेरेयम चेन पर मैटिक ERC20 टोकन (यहां, नेटिव टोकन) के एक ट्रांसफ़र को सत्यापित करने की अनुमति देता है.

```jsx
/**
 * @param token    ERC20 token address
 * @param from     Sender address
 * @param to       Recipient address
 * @param amount   Transferred amount
 * @param input1   Sender's amount before the transfer is executed
 * @param input2   Recipient's amount before the transfer is executed
 * @param output1  Sender's amount after the transfer is executed
 * @param output2  Recipient's amount after the transfer is executed
 */
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amount,
    uint256 input1,
    uint256 input2,
    uint256 output1,
    uint256 output2
);
```

से, MATIC टोकन मूल टोकन है और इसमें Native ERC20 टोकन नहीं है, तो बोर Golang कोड का इस्तेमाल करके नेटिव टोकन के लिए किए गए प्रत्येक transfer र के लिए receipt ट लॉग जोड़ता है. स्रोत: [https://github.com/maticnetwork/bor/blob/por/state_trope.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

```go
// addTransferLog adds transfer log into state
func addTransferLog(
	state vm.StateDB,
	eventSig common.Hash,

	sender,
	recipient common.Address,

	amount,
	input1,
	input2,
	output1,
	output2 *big.Int,
) {
	// ignore if amount is 0
	if amount.Cmp(bigZero) <= 0 {
		return
	}

	dataInputs := []*big.Int{
		amount,
		input1,
		input2,
		output1,
		output2,
	}

	var data []byte
	for _, v := range dataInputs {
		data = append(data, common.LeftPadBytes(v.Bytes(), 32)...)
	}

	// add transfer log
	state.AddLog(&types.Log{
		Address: feeAddress,
		Topics: []common.Hash{
			eventSig,
			feeAddress.Hash(),
			sender.Hash(),
			recipient.Hash(),
		},
		Data: data,
	})
}
```

### नेटिव टोकन डिपाज़िट करें {#deposit-native-token}

एक यूज़र एथेरेयम मेन-चेन पर मैटिक टोकन को `DepositManager` कॉन्ट्रैक्ट (एथेरेयम चेन पर डिप्लॉय किया गया) में डिपाज़िट करके नेटिव टोकन प्राप्त कर सकता है. स्रोत: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

`depositERC20`टोकन का इस्तेमाल करके, यूज़र्स मैटिक ERC20 टोकन (नेटिव टोकन) या किसी अन्य ERC20 टोकन को एथेरेयम चेन से बोर चेन में ले जा सकते हैं.

### नेटिव टोकन निकालें {#withdraw-native-token}

बोर चेन से एथेरेयम चेन में निकासी, किसी अन्य ERC20 टोकन की तरह ही काम करता है. एक यूज़र बोर`0000000000000000000000000000000000001010` पर डिप्लॉय किए गए ERC20 पर ﻿`withdraw`फंक्शन को कॉल कर सकता है, ताकि उसके लिए निकासी प्रक्रिया शुरू की जा सकें. स्रोत: [https://github.com/maticnetwork/contacts/blob/develop/contacts/toccts/trops/tels/maticchilderc20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## इन-बिल्ट कॉन्ट्रैक्ट्स (जेनेसिस कॉन्ट्रैक्ट्स) {#in-built-contracts-genesis-contracts}

बोर तीन इन-बिल्ट कॉन्ट्रैक्ट्स के साथ शुरू होता है, जिसे अक्सर जेनेसिस कॉन्ट्रैक्ट्स कहा जाता है. ये कॉन्ट्रैक्ट्स ब्लॉक 0 पर उपलब्ध हैं. स्रोत: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

इन कॉन्ट्रैक्ट्स को `solc --bin-runtime`का इस्तेमाल करके कम्पाइल किया जाता है. उदाहरण, निम्नलिखित कमांड का इस्तेमाल करने पर `contract.sol`के लिए कम्पाइल्ड कोड निकलता है

```bash
solc --bin-runtime contract.sol
```

जेनेसिस कॉन्ट्रैक्ट को`genesis.json` में निर्दिष्ट किया गया है. जब बोर, ब्लॉक 0 पर शुरू होता है, तो वह उल्लिखित कोड और बैलेंस के साथ सभी कॉन्ट्रैक्ट्स को लोड करता है.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

नीचे प्रत्येक जेनेसिस कॉन्ट्रैक्ट के लिए विवरण हैं.

### बोर वैलिडेटर समूह {#bor-validator-set}

स्रोत: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

डिप्लॉय किया गया:`0x0000000000000000000000000000000000001000`

`BorValidatorSet.sol`कॉन्ट्रैक्ट, स्पान्स के लिए वैलिडेटर समूह का प्रबंधन करता है. एक कॉन्ट्रैक्ट में एक मौजूदा वैलिडेटर समूहऔर स्पान की जानकारी होने पर, अन्य कॉन्ट्रैक्ट्स को उस जानकारी का इस्तेमाल करने की अनुमति मिलती है. चूंकि बोर, हेम्डल (बाहरी स्रोत) से प्रोड्यूसरों का इस्तेमाल करता है, इसलिए यह कॉन्ट्रैक्ट स्टेट को बदलने के लिए सिस्टम कॉल का इस्तेमाल करता है.

पहले स्प्रिंट के लिए सभी प्रोड्यूसरों को सीधे `BorValidatorSet.sol`में परिभाषित किया जाता है.

`setInitialValidators`को तब कॉल किया जाता है जब दूसरा स्पान सेट किया जा रहा होता है. चूंकि बोर, जेनेसिस कॉन्ट्रैक्ट के लिए कंस्ट्रक्टर की सहायता नहीं करता है, इसलिए पहले वैलिडेटर समूह को `spans`नक्शे पर सेट करने की आवश्यकता होती है.

पहला स्पान विवरण निम्नलिखित है:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

सॉलिडिटी कॉन्ट्रैक्ट की परिभाषा:

```jsx
contract BorValidatorSet {
  // Current sprint value
  uint256 public sprint = 64;

  // Validator details
  struct Validator {
    uint256 id;
    uint256 power;
    address signer;
  }

  // Span details
  struct Span {
    uint256 number;
    uint256 startBlock;
    uint256 endBlock;
  }

  // set of all validators
  mapping(uint256 => Validator[]) public validators;

  // set of all producers
  mapping(uint256 => Validator[]) public producers;

  mapping (uint256 => Span) public spans; // span number => span
  uint256[] public spanNumbers; // recent span numbers

	/// Initializes initial validators to spans mapping since there is no way to initialize through constructor for genesis contract
	function setInitialValidators() internal

	/// Get current validator set (last enacted or initial if no changes ever made) with a current stake.
	function getInitialValidators() public view returns (address[] memory, uint256[] memory;

  /// Returns bor validator set at given block number
  function getBorValidators(uint256 number) public view returns (address[] memory, uint256[] memory);

  /// Proposes new span in case of force-ful span change
  function proposeSpan() external;

  /// Commits span (called through system call)
  function commitSpan(
    uint256 newSpan,
    uint256 startBlock,
    uint256 endBlock,
    bytes calldata validatorBytes,
    bytes calldata producerBytes
  ) external onlySystem;

  /// Returns current span number based on current block number
  function currentSpanNumber() public view returns (uint256);
}
```

`proposeSpan`को शून्य फ़ीस के साथ किसी भी वैलिडेटर द्वारा कॉल किया जा सकता है. बोर, `proposeSpan`ट्रांज़ैक्शन को मुफ्त ट्रांज़ैक्शन होने की अनुमति देता है क्योंकि यह सिस्टम का हिस्सा है.

`commitSpan`को [सिस्टम कॉल](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9) के माध्यम से कॉल किया जा रहा है.

### स्टेट रिसीवर {#state-receiver}

स्रोत: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

डिप्लॉय किया गया:`0x0000000000000000000000000000000000001001`

स्टेट रिसीवर कॉन्ट्रैक्ट, इनकमिंग स्टेट समकालिक रिकॉर्ड का प्रबंधन करता है. `state-sync`मैकेनिज्म मूल रूप से स्टेट डेटा को एथेरेयम चेन से बोर में ले जाने का एक तरीका है.

```jsx
contract StateReceiver {
  // proposed states
  IterableMapping.Map private proposedStates;

  // states and proposed states
  mapping(uint256 => bool) public states;

   /**
	 * Proposes new state from Ethereum chain
	 * @param stateId  State-id for new state
	 */
  function proposeState(
    uint256 stateId
  ) external;

	/**
	 * Commits new state through the system call
	 * @param recordBytes   RLP encoded record: {stateId, contractAddress, data}
	 */
  function commitState(
    bytes calldata recordBytes
  ) external onlySystem;

  // Get pending state ids
  function getPendingStates() public view returns (uint256[] memory);
}
```

`proposeState`को शून्य फ़ीस वाले किसी भी वैध वैलिडेटर द्वारा कॉल किया जाएगा. बोर,`proposeState` ट्रांज़ैक्शन को मुफ्त ट्रांज़ैक्शन होने की अनुमति देता है क्योंकि यह सिस्टम का हिस्सा है.

`commitState`को [सिस्टम कॉल](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9) के माध्यम से कॉल किया जा रहा है.

### मैटिक ERC20 टोकन {#matic-erc20-token}

स्रोत: [https://github.com/maticnetwork/contracts/blob/contracts/contracts/tacts/tels/Maticchilderc20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

डिप्लॉय किया गया:`0x0000000000000000000000000000000000001010`

यह विशेष कॉन्ट्रैक्ट है जो देशी सिक्का को लपेटता है (जैसे कि Ethereum) में $ETH और ERC20 टोकन इंटरफेस प्रदान करता है. उदाहरण: इस कॉन्ट्रैक्ट `transfer`पर देशी टोकन्स को contract करता है. ERC20 टोकन में जो `withdraw`तरीके है वह उपयोगकर्ता को अपने टोकन को बोर से Ethereum चेन में ले जा सकता है.

ध्यान दें: यह कॉन्ट्रैक्ट `allowance`को सपोर्ट नहीं करता है. यह हर प्लाज़्मा कम्पेटिबल ERC20 टोकन कॉन्ट्रैक्ट के लिए समान है.

```jsx
contract MaticChildERC20 is BaseERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);

  uint256 public currentSupply;
  uint8 private constant DECIMALS = 18;

  constructor() public {}

  // Initializes state since genesis contract doesn't support constructor
  function initialize(address _childChain, address _token) public;

  /**
   * Deposit tokens to the user account
   * This deposit is only made through state receiver address
   * @param user   Deposit address
   * @param amount Withdraw amount
   */
  function deposit(address user, uint256 amount) public onlyOwner;

  /**
   * Withdraw amount to Ethereum chain
   * @param amount Withdraw amount
   */
  function withdraw(uint256 amount) public payable;

  function name() public pure returns (string memory) {
      return "Matic Token";
  }

  function symbol() public pure returns (string memory) {
      return "MATIC";
  }

  function decimals() public pure returns (uint8) {
      return DECIMALS;
  }

  /**
   * Total supply for the token.
   * This is 10b tokens, same as total Matic supply on Ethereum chain
   */
  function totalSupply() public view returns (uint256) {
      return 10000000000 * 10**uint256(DECIMALS);
  }

  /**
   * Balance of particular account
   * @param account Target address
   */
  function balanceOf(address account) public view returns (uint256) {
      return account.balance;
  }

  /**
   *  Function that is called when a user or another contract wants to transfer funds
   *  @param to Address of token receiver
   *  @param value Number of tokens to transfer
   *  @return Returns success of function call
   */
  function transfer(address to, uint256 value) public payable returns (bool) {
    if (msg.value != value) {
		  return false;
    }
    return _transferFrom(msg.sender, to, value);
  }

  /**
   * This enables to transfer native token between users
   * while keeping the interface the same as that of an ERC20 Token
   * @param _transfer is invoked by _transferFrom method that is inherited from BaseERC20
   */
  function _transfer(address sender, address recipient, uint256 amount) internal {
    address(uint160(recipient)).transfer(amount);
    emit Transfer(sender, recipient, amount);
  }
}
```

## सिस्टम कॉल {#system-call}

केवल सिस्टम पता, `2^160-2`, सिस्टम कॉल करने की अनुमति देता है. बोर इसे सिस्टम पता के साथ आंतरिक रूप से `msg.sender`के रूप में कॉल करता है. यह कॉन्ट्रैक्ट स्टेट को बदल देता है और एक विशेष ब्लॉक के लिए स्टेट रुट को अपडेट करता है. [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) और [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts) से प्रेरित

सिस्टम कॉल कोई ट्रांज़ैक्शन किए बिना स्टेट को कॉन्ट्रैक्ट में बदलने में सहायक होता है.

सीमा: वर्तमान में सिस्टम कॉल द्वारा उत्सर्जित घटनाएं, देखने योग्य नहीं होती हैं और किसी भी ट्रांज़ैक्शन या ब्लॉक में शामिल नहीं होती हैं.

## स्पान प्रबंधन {#span-management}

स्पान, तार्किक रूप से परिभाषित किए गए ब्लॉक का एक समूह है जिसके लिए सभी उपलब्ध वैलिडेटरों में से वैलिडेटरों का एक समूह चुना जाता है. हेम्डल सभी वैलिडेटरों में से प्रोड्यूसरों की कमेटी को चुनेगा. प्रोड्यूसरों में सिस्टम में वैलिडेटरों की संख्या के आधार पर वैलिडेटरों का एक उपसमूह शामिल होगा.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### प्रोपोज स्पिन Span {#propose-span-transaction}

प्रकार: **हेम्डल ट्रांज़ैक्शन**

[स्रोत: https://github.com/matikngnes/heimdall/blob/development/bor/हैंडler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx`सफल ट्रांज़ैक्शन समावेश के मामले में एक दिए गए `span`के लिए वैलिडेटरों की कमेटी बनाता है. प्रत्येक स्पान के लिए एक ट्रांज़ैक्शन को हेम्डल में शामिल किया जाना चाहिए. इसे हेम्डल पर `spanProposeTx`कहा जाता है. `spanProposeTx`को वापस करना चाहिए यदि उसे बार-बार भेजा जा रहा है या यदि वर्तमान कमेटी (दिए गए `span`के लिए) के भीतर 33% से कम स्टेक बदलाव नहीं होता है.

हेम्डल पर `bor`मॉड्यूल स्पान प्रबंधन को संभालता है. यहाँ बताया गया है कि बोर सभी वैलिडेटरों में से प्रोड्यूसरों को कैसे चुनता है:

1. बोर वैलिडेटरों के पावर के आधार पर मल्टिपल स्लॉट बनाता है. उदाहरण: पावर 10 वाले A में 10 स्लॉट होंगे, पावर 20 वाले B में 20 स्लॉट होंगे.
2. सभी स्लॉट के साथ,`shuffle`फंक्शन का इस्तेमाल करके उनमें फेरबदल करता है `seed`और पहले प्रोड्यूसरों`producerCount`को चुनता है. हेम्डल पर `bor`मॉड्यूल सभी वैलिडेटरों में से प्रोड्यूसरों को चुनने के लिए ETH 2.0 शफल अल्गोरिथम का इस्तेमाल करता है. प्रत्येक स्पान के रूप `n`में एथेरेयम (ETH 1.0) ब्लॉक के ब्लॉक हैश का इस्तेमाल `n`करता है`seed`. नोट करें कि स्लॉट आधारित चयन वैलिडेटरों को उनके पावर के आधार पर चुने जाने की अनुमति देता है. अधिक पावर वाले वैलिडेटर के चुने जाने की सम्भावना अधिक होगी. स्रोत: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

```go
// SelectNextProducers selects producers for the next span by converting power to slots
// spanEligibleVals - all validators eligible for next span
func SelectNextProducers(blkHash common.Hash, spanEligibleVals []hmTypes.Validator, producerCount uint64) (selectedIDs []uint64, err error) {
	if len(spanEligibleVals) <= int(producerCount) {
		for _, val := range spanEligibleVals {
			selectedIDs = append(selectedIDs, uint64(val.ID))
		}
		return
	}

	// extract seed from hash
	seed := helper.ToBytes32(blkHash.Bytes()[:32])
	validatorIndices := convertToSlots(spanEligibleVals)
	selectedIDs, err = ShuffleList(validatorIndices, seed)
	if err != nil {
		return
	}
	return selectedIDs[:producerCount], nil
}

// converts validator power to slots
func convertToSlots(vals []hmTypes.Validator) (validatorIndices []uint64) {
	for _, val := range vals {
		for val.VotingPower >= types.SlotCost {
			validatorIndices = append(validatorIndices, uint64(val.ID))
			val.VotingPower = val.VotingPower - types.SlotCost
		}
	}
	return validatorIndices
}
```

### कमिट स्पान Tx {#commit-span-tx}

प्रकार: **बोर ट्रांज़ैक्शन**

बोर में स्पान कमिट करने के दो तरीके हैं.

1. **स्वचालित स्पान बदलाव**

वर्तमान स्पान के अंत में, अंतिम स्प्रिंट के अंतिम ब्लॉक में, बोर, हेम्डल से अगले स्पान पर सवाल उठाता है और एक सिस्टम कॉल का इस्तेमाल करके अगले स्पान के लिए वैलिडेटरों और प्रोड्यूसरों को नियत करता है.

    ```jsx
    function commitSpan(
        bytes newSpan,
        address proposer,
        uint256 startBlock,
        uint256 endBlock,
        bytes validatorBytes,
        bytes producerBytes
     ) public onlySystem;
    ```

बोर अपने अगले ब्लॉक के लिए ब्लॉक प्रोड्यूसरों के रूप में नए प्रोड्यूसरों का इस्तेमाल करता है.

2. **जबरदस्ती कमिट करें**

हेम्डल पर प्रस्ता`span`वित होने के बाद, वैलिडेटर, वर्तमान स्पान के समाप्त होने से पहले, स्पान को बदलने की आवश्यकता होने पर, स्पान को जबरदस्ती पुश कर सकता है. एक `span`को प्रपोज करने के लिए एक ट्रांज़ैक्शन को किसी भी वैलिडेटर द्वारा बोर में कमिट किया जाना चाहिए. बोर तब एक सिस्टम कॉल का इस्तेमाल करके वर्तमान स्प्रिंट के अंत में प्रस्तावित स्पान को अद्यतन और सुपुर्द करता है.


## स्टेट प्रबंधन (स्टेट-समकालिकता) {#state-management-state-sync}

स्टेट प्रबंधन स्टेट को एथेरेयम चेन से बोर चेन में भेजता है. इसे `state-sync`कहा जाता है. यह डेटा को एथेरेयम चेन से बोर चेन में ले जाने का एक तरीका है.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### स्टेट सेंडर {#state-sender}

स्रोत: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

स्टेट सिंक को समकालिक बनाने के लिए, एथेरेयम चेन पर निम्नलिखित तरीके **स्टेट सेंडर कॉन्ट्रैक्ट** को कॉल करें. `state-sync`मैकेनिज्म मूल रूप से स्टेट डेटा को एथेरेयम चेन से बोर में ले जाने का एक तरीका है.

एक यूज़र, जो एथेरेयम चेन पर कॉन्ट्रैक्ट से `data`को बोर चेन में ले जाना चाहता है, `syncSate`तरीके से `StateSender.sol`पर कॉल करता है

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

`receiver`कॉन्ट्रैक्ट को अवश्य ही चाइल्ड चेन पर मौजूद रहना चाहिए, जो प्रक्रिया के पूरा होने पर स्टेट `data`को रिसीव करता है, `syncState`एथेरेयम पर `StateSynced`इवेंट को एमिट करता है, जो निम्नलिखित है:

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

एथेरेयम चेन पर `stateSender`कॉन्ट्रैक्ट पर `StateSynced`इवेंट के उत्सर्जित होने पर, कोई भी वैलिडेटर हेम्डल पर `MsgEventRecord`ट्रांज़ैक्शन भेजता है.

हेम्डल पर एक tx की पुष्टि होने के बाद, एक वैलिडेटर सिंपल ट्रांज़ैक्शन के साथ बोर पर `proposeState`को प्रस्तावित करता है और स्प्रिंट के अंत में, बोर एक `system`कॉल की मदद से `commitState`को कॉल करके `state-sync` को कमिट और फाइनल करता है.

`commitState` के दौरान, बोर लक्षित कॉन्ट्रैक्ट पर आर्ग्स के रूप में `data` और `stateId` के साथ, `onStateReceive` को निष्पादित करता है.

### स्टेट रिसीवर इंटरफ़ेस {#state-receiver-interface}

बोर चेन पर `receiver` कॉन्ट्रैक्ट को नीचे दिया गया इंटरफ़ेस लागू करना चाहिए.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

सिर्फ `0x0000000000000000000000000000000000001001` — `StateReceiver.sol`, लक्षित कॉन्ट्रैक्ट पर `onStateReceive` फ़ंक्शन को कॉल करने की अनुमति दी जानी चाहिए.

## ट्रांज़ैक्शन की गति {#transaction-speed}

बोर वर्तमान में 100 वैलिडेटरों और 4 ब्लॉक प्रोड्यूसरों के साथ ~2 से 4 सेकंड के ब्लॉक समय के साथ उम्मीद के अनुसार काम करता है. असंख्य ट्रांज़ैक्शन के साथ कई तनाव परीक्षण के बाद, सटीक ब्लॉक समय निर्धारित किया जाएगा.

स्प्रिंट आधारित आर्किटेक्चर का इस्तेमाल करने से बोर को वर्तमान स्प्रिंट के दौरान प्रोड्यूसर को बदले बिना अधिक तेज बल्क ब्लॉक का निर्माण करने में मदद मिलती है. दो स्प्रिंट के बीच देरी होने पर, अन्य प्रोड्यूसरों को एक प्रसारित ब्लॉक प्राप्त होता है, जिसे अक्सर `producerDelay`कहा जाता है

नोट करें कि दो स्प्रिंट के बीच का समय, कई प्रोड्यूसरों के बीच लेटेंसी की समस्या को कम करने के लिए बफर करने के लिए सामान्य ब्लॉक से अधिक होता है.

## अटैक {#attacks}

### सेंसरशिप {#censorship}

 बोर तेजी से ब्लॉक बनाने के लिए प्रोडूसर्स के एक बहुत छोटे समूह का उपयोग करता है. इसका मतलब है कि हेम्डल की तुलना में इस पर अधिक सेंसरशिप अटैक की आशंका है. उससे निपटने के क्रम में, सिस्टम में स्वीकार्य ब्लॉक समय के लिए प्रोड्यूसरों की अधिकतम संख्या का पता लगाने के लिए कई परीक्षण किए जाएंगे.

इसके अलावा कुछ और अटैक भी हो सकते हैं:

1. एक प्रोड्यूसर ट्रांज़ैक्शन को सेंसर कर रहा है

उस मामले में, ट्रांज़ैक्शन सेंडर अगले प्रोड्यूसर के स्प्रिंट का इंतजार कर सकता है और ट्रांज़ैक्शन को फिर से भेजने की कोशिश कर सकता है.

2. सभी वैलिडेटर साँठ-गाँठ के साथ काम कर रहे हैं और विशेष ट्रांज़ैक्शन को सेंसर कर रहे हैं

इस मामले में, पॉलीगॉन सिस्टम, एथेरेयम चेन पर एक ट्रांज़ैक्शन सबमिट करने का एक तरीका प्रदान करेगा और वैलिडेटरों को अगले `x`चेकपॉइंट में ट्रांज़ैक्शन को शामिल करने के लिए कहेगा. यदि वैलिडेटर उस समय सीमा के दौरान इसे शामिल करने में विफल रहते हैं, तो यूज़र, वैलिडेटरों को स्लैश कर सकता है. नोट करें कि यह वर्तमान में लागू नहीं है.

### धोखाधड़ी {#fraud}

प्रोड्यूसर्स अपनी बारी के दौरान अवैध ट्रांज़ैक्शन को शामिल कर सकते हैं. यह कई स्तरों पर हो सकता है:

1. एक प्रोड्यूसर धोखेबाज है

यदि एक प्रोड्यूसर ऊँचाई पर अवैध ट्रांज़ैक्शन को शामिल करता है, तो अन्य प्रोड्यूसर एक फोर्क बना सकते हैं और उस ट्रांज़ैक्शन को बाहर कर सकते हैं क्योंकि उनका वैध नोड, अवैध ब्लॉक को अनदेखा कर देता है

2. स्पान प्रोड्यूसर्स धोखेबाज हैं

यदि अन्य प्रोड्यूसर्स एक फोर्क नहीं बनाते हैं, तो ब्लॉक को वैलिडेट कर रहे अन्य वैलिडेटर्स अपना खुद का फोर्क बनाकर स्पान को जबरदस्ती बदल सकते हैं. यह वर्तमान में लागू नहीं है क्योंकि इसके लिए यह आवश्यक है कि गेथ आंतरिक रूप से कैसे काम करता है. हालांकि, यह हमारे भावी रोडमैप में है.

3. सभी वैलिडेटर्स धोखेबाज हैं

माना जाता है कि इस सिस्टम को सही ढंग से काम करने के लिए ⅔+1 वैलिडेटरों को ईमानदार होना ही चाहिए.
