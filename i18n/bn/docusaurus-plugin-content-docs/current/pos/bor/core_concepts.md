---
id: core_concepts
title: মূল ধারণা
description: বোর হল Polygon আর্কিটেকচারের স্টেট চেইন
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

# মূল ধারণা {#core-concepts}

Bor হলো Polygon আর্কিটেকচারে স্টেট চেইন। এটি Geth-এর নতুন কনসেনসাস যুক্ত একটি দ্বিধাবিভাজন [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) যাকে Bor বলা হয়ে থাকে।

উৎস: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## কনসেনসাস {#consensus}

বোর [ক্লিক কনসেনসাস](https://eips.ethereum.org/EIPS/eip-225) দ্বারা অনুপ্রাণিত নতুন উন্নত কনসেনসাস ব্যবহার করে,

ঐক্যমত্য এবং স্পেসিফিকেশনের উপর আরও বিস্তারিত: [Bor Consensus](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## জেনেসিস {#genesis}

জেনেসিস ব্লকে নেটওয়ার্ক কনফিগার করার প্রয়োজনীয় সমস্ত তথ্য রয়েছে। এটি মূলত Bor চেইনের জন্য কনফিগারেশন ফাইল। Bor চেইন বুট করতে, ব্যবহারকারীকে একটি প্যারাম হিসাবে ফাইলের অবস্থানে পাস করতে হবে।

জেনেসিস ব্লক এবং প্যারাম হিসাবে Bor `genesis.json`ব্যবহার করে। এখানে বোর জেনেসিস একটি উদাহরণ `config`:

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

[কনফিগ](https://www.notion.so/15ab7eb6e8124142a3641939762d6d67)

[কনসেনসাস নির্দিষ্ট কনফিগারেশন](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## VM হিসাবে EVM/Solidity {#evm-solidity-as-vm}

লেনদেন জন্য Bor একটি VM হিসাবে মডিফাই না করা EVM ব্যবহার করে। ডেভেলপাররা কোনও পরিবর্তন ছাড়াই একই Ethereum সরঞ্জাম এবং `solc` এর মতো কম্পাইলার ব্যবহার করে তাদের পছন্দ মতো যে কোনও চুক্তি নিয়োগ করতে পারেন।

## নেটিভ টোকেন  (গ্যাস টোকেন) হিসাবে ম্যাটিক {#matic-as-native-token-gas-token}

Bor-এর Ethereum-এ ETH এর অনুরূপ একটি নেটিভ টোকেন হিসাবে একটি Matic টোকেন আছে। একে প্রায়শই গ্যাস টোকেন বলা হয়। Ethereum চেইনে ETH বর্তমানে যেভাবে কাজ করে এই টোকেনটি ঠিক সেভাবেই কাজ করে।

এছাড়া Bor নেটিভ টোকেনটির (WETH টোকেনের মতো) জন্য একটি ইন-বিল্ট আবৃত ERC20 টোকেন প্রদান করে, যার মানে অ্যাপ্লিকেশনগুলি ম্যাটিক নেটিভ টোকেনের, তাদের নিজস্ব আবৃত ERC20 সংস্করণ তৈরি না করেই তাদের অ্যাপ্লিকেশনগুলিতে আবৃত MATIC ERC20 টোকেন ব্যবহার করতে পারবে।

আবৃত ERC20 টোকেন `0000000000000000000000000000000000001010`-এ `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)`-এ হিসেবে Bor এ জেনেসিস চুক্তিগুলির মধ্যে একটি হিসাবে ডিপ্লয় করা হয়।

### ফি {#fees}

Bor-এ লেনদেন পাঠানোর সময় নেটিভ টোকেন ফি হিসাবে ব্যবহার করা হয়। এটি Bor-এ স্প্যাম প্রতিরোধ করে এবং ব্লক প্রযোজকদের দীর্ঘকাল ধরে চেইন চালানোর জন্য ইনসেনটিভ প্রদানে এবং খারাপ আচরণ নিরুদ্ধ করতে সহায়তা করে।

একটি লেনদেন প্রেরক প্রতিটি লেনদেনের জন্য `GasLimit` এবং `GasPrice` সংজ্ঞায়িত করে এবং Bor-এ এটি সম্প্রচার করে। Bor নোড শুরু করার সময় প্রত্যেক প্রযোজক কতটা ন্যূনতম গ্যাসের মূল্য গ্রহণ করতে পারে তা তারা `--gas-price` ব্যবহার করে নির্ধারণ করতে পারেন। লেনদেনে ব্যবহারকারী-নির্ধারিত `GasPrice` প্রযোজক নির্ধারিত গ্যাস মূল্যের চেয়ে সমান বেশি হলে, প্রযোজক লেনদেনটি গ্রহণ করবেন এবং পরবর্তী উপলভ্য ব্লকে সেটি অন্তর্ভুক্ত করবে। এটি প্রতিটি প্রযোজককে তার নিজস্ব ন্যূনতম গ্যাসের মূল্যের প্রয়োজনীয়তা অনুমোদন করতে সক্ষম করে।

প্রেরক অ্যাকাউন্ট থেকে নেটিভ টোকেন আকারে লেনদেন ফি কেটে নেওয়া হবে।

লেনদেন ফিগুলির ফর্মুলা এখানে দেওয়া হলো:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

একটি ব্লকের সমস্ত লেনদেনের জন্য সংগ্রহ করা ফি প্রযোজকের অ্যাকাউন্টে কয়েনবেস ট্রান্সফার ব্যবহার করে ট্রান্সফার করা হয়। যেহেতু বেশি স্টেকিং ক্ষমতা থাকা আপনার একজন প্রযোজক হয়ে ওঠার সম্ভাবনা বাড়িয়ে দেয়, তাই এটি উচ্চতর স্টেকিং ক্ষমতা থাকা একজন যাচাইকারীকে তদনুযায়ী আরও পুরস্কার (ফি পরিপ্রেক্ষিতে) সংগ্রহ করার অনুমতি দেবে।

### ট্রান্সফার রিসিটের লগ {#transfer-receipt-logs}

Bor-এ প্রতিটি Plasma-র সাথে সংগতিপূর্ণ ERC20 টোকেন একটি বিশেষ ট্রান্সফার রিসিট লগ যোগ করে। Matic টোকেন তার কোনও ব্যতিক্রম নয়।

`LogTransfer` হলো একটি বিশেষ লগ, যা Plasma-র সাথে সংগতিপূর্ণ সমস্ত ERC20/721 টোকেনে যোগ করা হয়। ট্রান্সফারের জন্য এটিকে একটি 2-ইনপুট-2-আউটপুট UTXO হিসাবে বিবেচনা করুন। এখানে, `output1 = input1 - amount` এবং `output2 = input2 + amount`  এটি Plasma-কে প্রতারণা-নিরোধী চুক্তিগুলিকে Ethereum চেইনে Matic ERC20 টোকেনগুলির (এখানে, নেটিভ টোকেন) একটি ট্রান্সফার যাচাই করতে দেয়।

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

যেহেতু, ম্যাটিক টোকেন হচ্ছে নেটিভ টোকেন এবং নেটিভ ERC20 টোকেন নেই, বর নিম্নলিখিত Golang কোড ব্যবহার করে নেটিভ টোকেন জন্য তৈরি প্রতিটি ট্রান্সফারের জন্য রিসিট লগ যোগ করে। সূত্র: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### ডিপোজিট নেটিভ টোকেন {#deposit-native-token}

একজন ব্যবহারকারী Ethereum মেইন-চেইনে `DepositManager` চুক্তিতে  (Ethereum চেইনে নিয়োগ করে) মেটিক টোকেনগুলি ডিপোজিট করে নেটিভ টোকেন পেতে পারেন। সূত্র: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

`depositERC20` টোকেনগুলি ব্যবহার করে, ব্যবহারকারীরা Matic ERC20 টোকেন (নেটিভ টোকেন) বা অন্য যে কোনও ERC20 টোকেন, Ethereum চেইন থেকে Bor চেইনে ট্রান্সফার করতে পারেন।

### নেটিভ টোকেন উইথড্র করা {#withdraw-native-token}

Bor চেইন থেকে Ethereum চেইনে উইথড্র করা অন্য যে কোনও ERC20 টোকেনের মতোই কাজ করে। উইথড্র্র প্রক্রিয়া শুরু করতে, এটির জন্য একজন ব্যবহারকারী `0000000000000000000000000000000000001010`-এ Bor-এ নিযুক্ত ERC20 চুক্তিতে `withdraw` ফাংশন কল করতে পারেন। সূত্র: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## ইন-বিল্ট চুক্তি (Genesis চুক্তি) {#in-built-contracts-genesis-contracts}

Bor তিনটি ইন-বিল্ট চুক্তি দিয়ে শুরু করে যাকে প্রায়শই জেনেসিস চুক্তি বলা হয়। এই চুক্তিগুলি ব্লক 0-তে পাওয়া যায়। সূত্র: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

এই চুক্তিগুলি `solc --bin-runtime` ব্যবহার করে কম্পাইল করা হয়। যেমন, এই কমান্ড `contract.sol`-এর জন্য কম্পাইল করা কোড নির্গত করে

```bash
solc --bin-runtime contract.sol
```

Genesis চুক্তি `genesis.json`-এ সংজ্ঞায়িত করা হয়েছে। যখন Bor ব্লক 0-তে শুরু হয়, তখন এটি সমস্ত চুক্তি, উল্লিখিত কোড এবং ব্যালেন্স সহ লোড করে।

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

নীচে প্রতিটি জেনেসিস চুক্তির বিস্তারিত আছে।

### Bor যাচাইকারী সেট {#bor-validator-set}

সূত্র: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

এখানে ডিপ্লয় করা হয়েছে:`0x0000000000000000000000000000000000001000`

`BorValidatorSet.sol`চুক্তি স্প্যানের জন্য যাচাইকারী সেট পরিচালনা করে। একটি চুক্তির মধ্যে একটি বর্তমান যাচাইকারী সেট এবং স্প্যান তথ্য থাকার ফলে অন্যান্য চুক্তি সেই তথ্য ব্যবহার করতে পারে। যেহেতু বোর Heimdall (বহিরাগত উৎস) থেকে প্রযোজক ব্যবহার করে, তাই এটি চুক্তি রাষ্ট্র পরিবর্তন করতে সিস্টেম কল ব্যবহার করে।

প্রথম স্প্রিন্টের জন্য সমস্ত প্রযোজককে সরাসরি `BorValidatorSet.sol`-এ সংজ্ঞায়িত করা হয়।

যখন দ্বিতীয় স্প্যান সেট করা হচ্ছে, তখন `setInitialValidators`-কে আহ্বান করা হয়। যেহেতু Bor, জেনেসিস চুক্তির জন্য কন্সট্রাকটরকে সমর্থন করে না, তাই প্রথম যাচাইকারী সেটটিকে`spans`  ম্যাপে সেট করতে হবে।

প্রথম স্প্যানের বিবরণ এরকম:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

সলিডিটি চুক্তির সংজ্ঞা:

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

`proposeSpan`-কে শূন্য ফি সহ যে কোনও বৈধ যাচাইকারী দ্বারা আহ্বান করা যেতে পারে। Bor, `proposeSpan` লেনদেনকে বিনামূল্যের লেনদেন হিসেবে অনুমতি দেয় যেহেতু এটি সিস্টেমটির অংশ।

`commitSpan`-কে [সিস্টেম কল](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9) এর মাধ্যমে আহ্বান করা হচ্ছে।

### স্টেট রিসিভার {#state-receiver}

সূত্র: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

এখানে ডিপ্লয় করা হয়েছে:`0x0000000000000000000000000000000000001001`

স্টেট রিসিভার চুক্তি ইনকামিং স্টেট সিঙ্ক রেকর্ডগুলি পরিচালনা করে। `state-sync` প্রক্রিয়াটি হল মূলত, স্টেট ডেটা, Ethereum চেইন থেকে Bor-এ স্থানান্তর করার একটি উপায়।

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

`proposeState`-কে শূন্য ফি সহ যে কোনও বৈধ যাচাইকারী দ্বারা আহ্বান করা হবে। Bor,  `proposeState`  লেনদেনকে বিনামূল্যের লেনদেন হিসেবে অনুমতি দেয় যেহেতু এটি সিস্টেমটির অংশ।

`commitState`-কে [সিস্টেম কল](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9) এর মাধ্যমে আহ্বান করা হচ্ছে।

### Matic ERC20 টোকেন {#matic-erc20-token}

সূত্র: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

এখানে ডিপ্লয় করা হয়েছে:`0x0000000000000000000000000000000000001010`

এটি বিশেষ চুক্তি যা নেটিভ কয়েন (যেমন $ETH Ethereum-এ A) মোতাবেক এবং একটি ERC20 টোকেন ইন্টারফেস সরবরাহ করে। উদাহরণ: এই চুক্তির `transfer`উপর নেটিভ টোকেন স্থানান্তর করে। ERC20 টোকেনে `withdraw`পদ্ধতি ব্যবহারকারীদের Bor থেকে Ethereum চেইনে তাদের টোকেন সরাতে দেয়।

নোট: এই চুক্তিটি `allowance`-কে সমর্থন করে না। এটি প্রতিটি প্লাজমা সামঞ্জস্যপূর্ণ ERC20 টোকেন চুক্তির জন্য একই।

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

## সিস্টেম কল {#system-call}

শুধুমাত্র সিস্টেম অ্যাড্রেস`2^160-2`, একটি সিস্টেম কল করার অনুমতি দেয়। Bor `msg.sender` হিসাবে সিস্টেম অ্যাড্রেস দিয়ে এটিকে অভ্যন্তরীণভাবে কল করে। এটি কন্ট্র্যাক্ট স্টেটটি পরিবর্তন করে এবং একটি নির্দিষ্ট ব্লকের জন্য স্টেট রুট আপডেট করে। [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) এবং [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts) এর থেকে অনুপ্রাণিত

সিস্টেম কল কোনও লেনদেন না করে কনট্র্যাক্ট করতে স্টেট পরিবর্তন করতে সহায়ক।

সীমাবদ্ধতা: বর্তমানে সিস্টেম কল দ্বারা নির্গত ইভেন্টগুলি পর্যবেক্ষণযোগ্য নয় এবং কোন লেনদেন বা ব্লকে অন্তর্ভুক্ত নয়।

## স্প্যান পরিচালনা {#span-management}

স্প্যান যৌক্তিকভাবে সংজ্ঞায়িত ব্লকগুলির একটি সেট যার জন্য উপলব্ধ সমস্ত যাচাইকারীর মধ্যে থেকে যাচাইকারীদের বেছে নেওয়া হয়। Heimdall সমস্ত যাচাইকারীর মধ্যে থেকে প্রযোজকদের কমিটি বেছে নেওয়া হবে। প্রযোজকরা সিস্টেমে থাকা যাচাইকারীদের সংখ্যার উপর নির্ভর করে যাচাইকারীদের একটি সাবসেট অন্তর্ভুক্ত করবে।

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### স্প্যান লেনদেন প্রোপোজ করুন {#propose-span-transaction}

ধরন: **Heimdall লেনদেন**

উত্স: [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

সফল লেনদেন অন্তর্ভুক্তির ক্ষেত্রে একটি প্রদত্ত `span` এর জন্য `spanProposeTx` যাচাইকারীদের কমিটি সেট করে। প্রতিটি স্প্যানের জন্য একটি লেনদেন অবশ্যই Heimdall-এ অন্তর্ভুক্ত করতে হবে। Heimdall-এ এটিকে `spanProposeTx` বলা হয়। প্রায়শই পাঠানো হলে বা বর্তমান কমিটির মধ্যে (প্রদত্ত `span`-এর জন্য) 33% স্টেক পরিবর্তন না ঘটলে `spanProposeTx`-কে অবশ্যই আগেকার অবস্থায় ফিরিয়ে আনতে হবে।

Heimdall-এ `bor` মডিউল স্প্যান ম্যানেজমেন্ট পরিচালনা করে। Bor কীভাবে সমস্ত যাচাইকারীদের থেকে প্রযোজকদের বেছে নেয় তা এখানে দেওয়া হলো:

1. যাচাইকারীদের ক্ষমতার উপর ভিত্তি করে Bor একাধিক স্লট তৈরি করে। উদাহরণ: 10 ক্ষমতা থাকা A এর 10টি স্লট থাকবে, 20 ক্ষমতা থাকা B এর 20টি স্লট থাকবে।
2. সমস্ত স্লট সহ, `shuffle` ফাংশন `seed` ব্যবহার করে তাদের অদলবদল করে এবং প্রথম `producerCount` জন প্রযোজককে নির্বাচন করে।  সমস্ত যাচাইকারীদের থেকে প্রযোজকদের নির্বাচন করতে `bor` মডিউল Heimdall-এ ETH 2.0 অদলবদলের অ্যালগরিদম ব্যবহার করে। প্রতিটি স্প্যান`n`, `seed` হিসাবে Ethereum (ETH 1.0) ব্লক `n` এর ব্লক হ্যাশ ব্যবহার করে। উল্লেখ্য যে স্লট ভিত্তিক নির্বাচন, যাচাইকারীদের তাদের ক্ষমতার উপর ভিত্তি করে যাচাইকারীদের নির্বাচিত হওয়ার অনুমতি দেয়। যে যাচাইকারীর ক্ষমতা যত বেশি হবে তার নির্বাচিত হওয়ার জন্য সম্ভাবনা বেশি থাকবে। সূত্র: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### স্প্যান Tx সম্পাদন করা {#commit-span-tx}

ধরন: **Bor লেনদেন**

Bor-এ স্প্যান সম্পাদন করার দুটি উপায় রয়েছে।

1. **স্বয়ংক্রিয় স্প্যান পরিবর্তন**

বর্তমান স্প্যানের শেষে, শেষ স্প্রিন্টের শেষ ব্লকে, Bor, Heimdall থেকে পরবর্তী স্প্যান সন্ধান করে এবং একটি সিস্টেম কল ব্যবহার করে পরবর্তী স্প্যানের জন্য যাচাইকারী এবং প্রযোজকদের সেট করে।

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

    Bor তাদের পরবর্তী ব্লকগুলির জন্য ব্লক প্রযোজক হিসাবে নতুন প্রযোজকদের ব্যবহার করে।

2. **জোর করে সম্পাদন করা**

একবার Heimdall-এ `span` প্রস্তাবিত হওয়ার পরে, বর্তমান স্প্যান শেষ হওয়ার আগে স্প্যান পরিবর্তন করার প্রয়োজন হলে, যাচাইকারী পুশ স্প্যানের জন্য বাধ্য করতে পারেন।  একটি `span` প্রস্তাব করার জন্য একটি লেনদেন অবশ্যই একজন যাচাইকারীর দ্বারা Bor-এ সম্পাদন করতে হবে। Bor তারপর বর্তমান স্প্রিন্টের শেষে একটি সিস্টেম কল ব্যবহার করে প্রস্তাবিত স্প্যান আপডেট এবং সম্পাদন করবে।


## স্টেট ম্যানেজমেন্ট (স্টেট-সিঙ্ক) {#state-management-state-sync}

স্টেট ম্যানেজমেন্ট স্টেটটিকে Ethereum চেইন থেকে Bor চেইনে পাঠায়। এটিকে বলা হয়`state-sync` । এটি Ethereum চেইন থেকে Bor চেইনে ডেটা সরানোর একটি উপায়।

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### স্টেট প্রেরক {#state-sender}

সূত্র: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

স্টেট সিঙ্ক, সিঙ্ক করতে, Ethereum চেইনে নিম্নলিখিত পদ্ধতি **স্টেট প্রেরক চুক্তি** কল করুন। `state-sync` প্রক্রিয়াটি হল মূলত, স্টেট ডেটা, Ethereum চেইন থেকে Bor-এ স্থানান্তর করার একটি উপায়।

একজন ব্যবহারকারী, যিনি `data`-কে Ethereum চেইনে কন্ট্র্যাক্ট থেকে Bor চেইনে সরাতে চান, তিনি `StateSender.sol`-এ `syncSate` পদ্ধতি কল করেন

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

`receiver`-চুক্তিকে অবশ্যই চাইল্ড চেইনে উপস্থিত থাকতে হবে, যা প্রক্রিয়াটি একবার সম্পূর্ণ হলে স্টেট`data`  প্রাপ্ত হয়। `syncState` Ethereum-এ`StateSynced`  ইভেন্ট নির্গত করে, যা নিম্নরূপ:

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

Ethereum চেইনে `stateSender` চুক্তিতে একবার `StateSynced` ইভেন্ট নির্গত হলে, যে কোনও যাচাইকারী Heimdall-এ `MsgEventRecord`লেনদেন পাঠায়।

Heimdall-এ একটি tx নিশ্চিত করার পরে, একজন যাচাইকারী Bor-এ সাধারণ লেনদেনের মাধ্যমে`proposeState`  প্রস্তাব করেন এবং স্প্রিন্টের শেষে, Bor একটি `system` ব্যবহার করে `commitState` কল করে `state-sync` সম্পাদন এবং চূড়ান্ত করে।

`commitState`-র সময়, লক্ষীভূত চুক্তিতে, Bor আর্গুমেন্ট হিসাবে`stateId`  এবং`data`  দিয়`onStateReceive`ে  সম্পাদন করে।

### স্টেট রিসিভার ইন্টারফেস {#state-receiver-interface}

Bor চেইনে `receiver` চুক্তিকে অবশ্যই নিম্নলিখিত ইন্টারফেস কার্যকর করতে হবে।

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

শুধুমাত্র `0x0000000000000000000000000000000000001001` — `StateReceiver.sol`, লক্ষীভূত চুক্তিতে অবশ্যই `onStateReceive` ফাংশনকে কল করার অনুমতি দিতে হবে।

## লেনদেনের গতি {#transaction-speed}

Bor বর্তমানে 100 জন যাচাইকারী এবং 4 জন ব্লক প্রযোজকদের সাথে ~2 থেকে 4 সেকেন্ডের ব্লক সময়ের সাথে প্রত্যাশা অনুযায়ী কাজ করে। বিপুল সংখ্যক লেনদেনের সাথে একাধিক স্ট্রেস টেস্টিং করার পরে, সঠিক ব্লক টাইম স্থির করা হবে।

স্প্রিন্ট-ভিত্তিক নির্মাণ কৌশল ব্যবহার করা, Bor-কে বর্তমান স্প্রিন্টের সময় প্রযোজক পরিবর্তন না করে দ্রুততর বহুসংখ্যক ব্লক তৈরি করতে সহায়তা করে। দুটি স্প্রিন্টের মধ্যে বিলম্ব থাকা, অন্যান্য প্রযোজকদের একটি সম্প্রচারিত ব্লক পেতে দেয়, যাকে প্রায়শই `producerDelay` বলা হয়ে থাকে।

মনে রাখবেন যে, একাধিক প্রযোজকদের মধ্যে বিলম্বের সমস্যা কমাতে বাফার হতে দুটি স্প্রিন্টের মধ্যের সময় সাধারণ ব্লকগুলির চেয়ে বেশি।

## আক্রমণ {#attacks}

### সেন্সরশিপ {#censorship}

দ্রুততর ব্লকগুলি তৈরি করতে Bor প্রযোজকদের একটি খুব ছোট সেট ব্যবহার করে। মানে এটিতে Heimdall-এর চেয়ে বেশি সেন্সরশিপ আক্রমণ হয়ে থাকে। সেটির সাথে মোকাবিলা করতে, সিস্টেমে গ্রহণযোগ্য ব্লক সময়ের জন্য সর্বাধিক সংখ্যক প্রযোজকদের খুঁজে বের করতে একাধিক টেস্টিং করা হবে।

এছাড়াও, বেশ কিছু আক্রমণ সম্ভব:

1. একটি প্রযোজক লেনদেনটি সেন্সর করছে।

সেই ক্ষেত্রে, লেনদেন প্রেরক পরবর্তী প্রযোজকের স্প্রিন্টের জন্য অপেক্ষা করতে পারেন এবং লেনদেনটি আবার পাঠানোর চেষ্টা করতে পারেন।

2. সমস্ত যাচাইকারীরা একে অন্যের সাথে সংঘবদ্ধ হচ্ছে এবং নির্দিষ্ট লেনদেন সেন্সর করছে।

এই ক্ষেত্রে, Polygon সিস্টেম, Ethereum চেইনে একটি লেনদেন জমা দেওয়ার একটি উপায় প্রদান করবে এবং যাচাইকারীদের পরবর্তী `x`টি চেকপয়েন্টে লেনদেনটি অন্তর্ভুক্ত করতে বলবে। সেই সময় পরিসরের মধ্যে যাচাইকারীরা এটিকে অন্তর্ভুক্ত করতে না পারলে ব্যবহারকারী যাচাইকারীদের বাদ দিতে পারেন। মনে রাখবেন যে এটি বর্তমানে কার্যকর করা হয়নি।

### প্রতারণা {#fraud}

প্রযোজকরা তাদের টার্নের সময় অবৈধ লেনদেন অন্তর্ভুক্ত করতে পারেন। একাধিক লেভেলে এটি সম্ভব হতে পারে:

1. একটি প্রযোজক প্রতারক

একজন প্রযোজক কোনও পর্যায়ে অবৈধ লেনদেন অন্তর্ভুক্ত করলে অন্যান্য প্রযোজকরা একটি দ্বিধাবিভাজন তৈরি করতে পারেন এবং লেনদেনটি বাদ দিতে পারেন যেহেতু তাদের বৈধ নোড অবৈধ ব্লকগুলিকে উপেক্ষা করে।

2. স্প্যান প্রযোজকরা প্রতারক

অন্যান্য প্রযোজকরা একটি দ্বিধাবিভাজন তৈরি না করলে, অন্যান্য যাচাইকারী যারা ব্লক যাচাই করছেন, তাদের নিজস্ব দ্বিধাবিভাজন তৈরি করে জোর করে স্প্যান পরিবর্তন করতে পারেন। এটি বর্তমানে কার্যকর করা হয় না যেহেতু Geth, অভ্যন্তরীণ ভাবে কীভাবে কাজ করে তা এর প্রয়োজন। তবে, এটি আমাদের ভবিষ্যৎ চিন্তাভাবনায় রয়েছে।

3. সব যাচাইকারী প্রতারক

    অনুমান করা হয় যে এই সিস্টেমটিকে সঠিক ভাবে কাজ করতে ⅔+1 যাচাইকারীকে সৎ হতে হবে।
