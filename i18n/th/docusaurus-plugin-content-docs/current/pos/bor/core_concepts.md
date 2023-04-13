---
id: core_concepts
title: แนวคิดหลัก
description: Bor คือเชนสถานะในสถาปัตยกรรมของ Polygon
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

# แนวคิดหลัก {#core-concepts}

Bor เป็นเชนสถานะในสถาปัตยกรรม Polygonโดยเป็นฟอร์คของ Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) โดยมีฉันทามติใหม่ที่ชื่อ Bor

ที่มา: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## consensus {#consensus}

Bor ใช้คอนเซ็นต์ที่ปรับปรุงใหม่ใหม่ ได้รับแรงบันดาลใจจาก[ฉันทามติ Clique](https://eips.ethereum.org/EIPS/eip-225)

รายละเอียดเพิ่มเติมเกี่ยวกับข้อกำหนดและข้อกำหนดของแบรนด์ [Bor Consension](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## genesis {#genesis}

บล็อก Genesis มีข้อมูลที่จำเป็นทั้งหมดในการกำหนดค่าเครือข่ายซึ่งเป็นไฟล์การกำหนดค่าสำหรับเชน Bor โดยพื้นฐานผู้ใช้จำเป็นต้องส่งตำแหน่งของไฟล์เป็นพารามิเตอร์ เพื่อบูตเชน Bor

Bor ใช้ `genesis.json` เป็นบล็อก Genesis และพารามิเตอร์นี่คือตัวอย่างสำหรับ `config`Bor Genesis :

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

[การกำหนดค่า](https://www.notion.so/15ab7eb6e8124142a3641939762d6d67)

[การกำหนดค่าเฉพาะฉันทามติ](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## EVM/Solidity ในฐานะ VM {#evm-solidity-as-vm}

Bor ใช้ EVM ที่ไม่ได้แก้ไขเป็น VM สำหรับธุรกรรมนักพัฒนาสามารถปรับใช้สัญญาใดก็ได้ที่ต้องการโดยใช้เครื่องมือและคอมไพเลอร์เดียวกันของ Ethereum เช่น `solc`โดยไม่มีการเปลี่ยนแปลงใดๆ

## Matic โดยเป็นโทเค็นดั้งเดิม (โทเค็นแก๊ส) {#matic-as-native-token-gas-token}

Bor มีโทเค็น Matic เป็นโทเค็นดั้งเดิมที่คล้ายกับ ETH บน Ethereumซึ่งมักเรียกว่าโทเค็นแก๊สโทเค็นนี้ทำงานอย่างถูกต้องตามลักษณะที่ ETH ทำงานบนเชน Ethereum ในปัจจุบัน

นอกจากนั้น Bor ยังมีโทเค็น ERC20 ที่ฝังในตัวสำหรับโทเค็นดั้งเดิม (คล้ายกับโทเค็น WETH) ซึ่งหมายความว่าแอปพลิเคชันสามารถใช้โทเค็น MATIC ERC20 ที่ฝังในแอปพลิเคชันได้โดยไม่ต้องสร้างโทเค็นดั้งเดิม Matic เวอร์ชัน ERC20 ในตัว

โทเค็น ERC20 ในตัวมีการปรับใช้ที่ `0000000000000000000000000000000000001010`โดยเป็น บ`[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)`น Bor โดยเป็นสัญญา Genesis สัญญาหนึ่ง

### ค่าธรรมเนียม {#fees}

โทเค็นดั้งเดิมใช้เป็นค่าธรรมเนียมในขณะที่ส่งธุรกรรมบน Borซึ่งจะป้องกันสแปมบน Bor และให้สิ่งจูงใจแก่ผู้สร้างบล็อกในการเรียกใช้เชนเป็นเวลานานขึ้น และขัดขวางพฤติกรรมไม่เหมาะสม

ผู้ส่งธุรกรรมกำหนด `GasLimit`และ ส`GasPrice`ำหรับแต่ละธุรกรรมและเผยแพร่บน Borผู้สร้างบล็อกแต่ละรายสามารถกำหนดราคาแก๊สขั้นต่ำที่สามารถยอมรับได้โดยใช้ `--gas-price` ในขณะที่เริ่มต้นโหนด Borหาก `GasPrice`ที่ผู้ใช้กำหนดบนธุรกรรมมีค่าเดียวกันหรือสูงกว่าราคาแก๊สที่ผู้สร้างบล็อกกำหนด ผู้สร้างบล็อกจะยอมรับธุรกรรมนั้นและรวมไว้ในบล็อกที่มีอยู่ถัดไปซึ่งทำให้ผู้สร้างบล็อกแต่ละรายสามารถอนุญาตให้มีข้อกำหนดราคาแก๊สขั้นต่ำของตัวเองได้

ค่าธรรมเนียมการทำธุรกรรมจะถูกหักออกจากบัญชีของผู้ส่งในแง่ของโทเค็นดั้งเดิม

สูตรคำนวณค่าธรรมเนียมธุรกรรมมีดังนี้:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

ค่าธรรมเนียมที่เรียกเก็บสำหรับธุรกรรมทั้งหมดในบล็อกจะถูกโอนไปยังบัญชีของผู้สร้างบล็อกโดยใช้การโอนแบบใช้คอยน์เนื่องจากการมีอำนาจในการเดิมพันมากขึ้นทำให้คุณมีความน่าจะเป็นเพิ่มขึ้นในการเป็นผู้สร้างบล็อก จึงทำให้ตัวตรวจสอบความถูกต้องที่มีอำนาจในการเดิมพันสูงสามารถสะสมรางวัลได้มากขึ้น (ในแง่ของค่าธรรมเนียม) ตามลำดับ

### บันทึกใบเสร็จการโอน {#transfer-receipt-logs}

แต่ละโทเค็น ERC20 ที่เข้ากันได้กับ Plasma บน Bor จะเพิ่มบันทึกใบเสร็จการโอนพิเศษ ไม่เว้นแม้แต่ โทเค็น Matic

`LogTransfer` เป็นบันทึกพิเศษที่เพิ่มลงในโทเค็น ERC20/721 ทั้งหมดที่เข้ากันได้กับ Plasmaให้พิจารณาว่าเป็น UTXO แบบ 2 อินพุตและ 2 เอาต์พุตตัวเดียวสำหรับการโอนนี่คือ `output1 = input1 - amount`และ ซ`output2 = input2 + amount`ึ่งทำให้สัญญาที่ป้องกันการฉ้อโกงบน Plasma สามารถตรวจยืนยันการโอนโทเค็น Matic ERC20 (โทเค็นดั้งเดิมในที่นี้) บนเชน Ethereum ได้

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

นับตั้งแต่, โทเค็น MATIC คือโทเค็นพื้นเมืองและไม่มีโทเค็น Native ER20 Bor เพิ่มปูมบันทึกสำหรับการโอนแต่ละครั้งที่ทำขึ้นสำหรับโทเค็นแบบพื้นเมืองโดยใช้โค้ดต่อไปนี้ของ Golangที่มา: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### ฝากโทเค็นดั้งเดิม {#deposit-native-token}

ผู้ใช้สามารถรับโทเค็นดั้งเดิมได้โดยฝากโทเค็น Matic บนเชนหลัก Ethereum ในสัญญา `DepositManager` (ที่ปรับใช้บนเชน Ethereum)ที่มา: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

ผู้ใช้สามารถใช้โทเค็น `depositERC20`ย้ายโทเค็น Matic ERC20 (โทเค็นดั้งเดิม) หรือโทเค็น ERC20 อื่นใดจากเชน Ethereum ไปยังเชน Bor ได้

### ถอนโทเค็นดั้งเดิม {#withdraw-native-token}

การถอนจากเชน Bor ไปยังเชน Ethereum ทำงานเหมือนกับโทเค็น ERC20 อื่นใดทุกประการผู้ใช้สามารถเรียกฟังก์ชัน `withdraw`บนสัญญา ERC20 ที่เรียกใช้บน Bor ที่ เ`0000000000000000000000000000000000001010`พื่อเริ่มกระบวนการถอนสำหรับการถอนดังกล่าวที่มา: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## สัญญาในตัว (สัญญา Genesis) {#in-built-contracts-genesis-contracts}

Bor เริ่มต้นด้วยสัญญาในตัวสามฉบับ ซึ่งมักเรียกว่าสัญญา Genesisสัญญาเหล่านี้มีอยู่ที่บล็อก 0 ที่มา: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

สัญญาเหล่านี้ใช้ `solc --bin-runtime`ในการคอมไพล์ตัวอย่างเช่น คำสั่งต่อไปนี้แสดงโค้ดที่คอมไพล์แล้วสำหรับ `contract.sol`

```bash
solc --bin-runtime contract.sol
```

สัญญา Genesis ถูกกำหนดไว้ใน `genesis.json`เมื่อ Bor เริ่มต้นที่บล็อก 0 ก็จะโหลดสัญญาทั้งหมดที่มีโค้ดและยอดคงเหลือที่กล่าวถึง

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

ด้านล่างคือรายละเอียดสำหรับสัญญา Genesis แต่ละฉบับ

### ชุดตัวตรวจสอบความถูกต้อง Bor {#bor-validator-set}

ที่มา: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

ปรับใช้ที่: `0x0000000000000000000000000000000000001000`

สัญญา `BorValidatorSet.sol` จัดการชุดตัวตรวจสอบความถูกต้องสำหรับ Spanการป้อนชุดตัวตรวจสอบความถูกต้องปัจจุบันและข้อมูล Span ข้อมูลเข้าในสัญญา ทำให้สัญญาอื่นๆ สามารถใช้ข้อมูลนั้นได้เนื่องจาก Bor ใช้ผู้สร้างบล็อกจาก Heimdall (แหล่งภายนอก) จึงใช้การเรียกระบบเพื่อเปลี่ยนสถานะสัญญา

สำหรับ Sprint ครั้งแรก ผู้สร้างบล็อกทั้งหมดจะถูกกำหนดใน `BorValidatorSet.sol` โดยตรง

`setInitialValidators` จะถูกเรียกเมื่อมีการตั้งค่า Span ครั้งที่สอง เนื่องจาก Bor ไม่รองรับตัวสร้างสำหรับสัญญา Genesis จึงจำเป็นต้องตั้งค่าตัวตรวจสอบความถูกต้องชุดแรกเป็นแมป `spans`

รายละเอียด Span ครั้งแรกมีดังต่อไปนี้:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

คำจำกัดความของสัญญา Solidity:

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

ตัวตรวจสอบความถูกต้องที่ใช้ได้ใดๆ ที่ไม่มีค่าธรรมเนียมสามารถเรียก `proposeSpan`ได้Bor ช่วยให้ธุรกรรม `proposeSpan` เป็นธุรกรรมฟรี เนื่องจากเป็นส่วนหนึ่งของระบบ

`commitSpan` ถูกเรียกผ่าน [การเรียกระบบ](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9)

### ผู้รับสถานะ {#state-receiver}

ที่มา: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

ปรับใช้ที่: `0x0000000000000000000000000000000000001001`

สัญญาผู้รับสถานะจัดการข้อมูลประวัติการซิงค์สถานะขาเข้าโดยพื้นฐานแล้ว กลไก `state-sync` คือวิธีในการย้ายข้อมูลสถานะจากเชน Ethereum ไปยัง Bor

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

`proposeState` จะถูกเรียกโดยตัวตรวจสอบความถูกต้องที่ใช้ได้ใดๆ ที่ไม่มีค่าธรรมเนียมBor ช่วยให้ธุรกรรม `proposeState` เป็นธุรกรรมฟรี เนื่องจากเป็นส่วนหนึ่งของระบบ

`commitState` ถูกเรียกผ่าน [การเรียกระบบ](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9)

### โทเค็น Matic ERC20 {#matic-erc20-token}

ที่มา: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

ปรับใช้ที่: `0x0000000000000000000000000000000000001010`

นี่คือสัญญาพิเศษที่ห่อเหรียญพื้นเมือง (เช่น $Eth ใน Ethereum) และจัดหาอินเตอร์เฟซ   Tokenตัวอย่าง: `transfer`บนสัญญานี้การโอนโทเค็นแบบดั้งเดิม. `withdraw`วิธีการในโทเค็นแบบดั้งเดิมนี้ใน ERC20 ช่วยให้ผู้ใช้สามารถย้ายโทเค็นของพวกเขาจาก Bor ไปยังเชน Ethereum

หมายเหตุ: สัญญานี้ไม่รองรับ `allowance`ซึ่งเหมือนกันสำหรับสัญญาโทเค็น แบบรองรับกับพลาสม่า ER20

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

## การเรียกระบบ {#system-call}

เฉพาะที่อยู่ระบบ `2^160-2` ช่วยให้สามารถทำการเรียกระบบได้โดย Bor จะเรียกเป็นการภายในโดยมีที่อยู่ระบบเป็น `msg.sender`โดยจะเปลี่ยนสถานะสัญญาและอัปเดตต้นทางสถานะสำหรับบล็อกได้รับแรงบันดาลใจจาก [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) และ [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

การเรียกระบบมีประโยชน์ในการเปลี่ยนสถานะเป็นสัญญาโดยไม่ต้องทำธุรกรรมใดๆ

ข้อจำกัด: ปัจจุบัน เหตุการณ์ที่ส่งโดยการเรียกระบบไม่สามารถสังเกตได้ และไม่รวมอยู่ในธุรกรรมหรือบล็อกใดๆ

## การจัดการ Span {#span-management}

Span คือชุดบล็อกที่กำหนดไว้ตามตรรกสำหรับชุดตัวตรวจสอบความถูกต้องถูกเลือกจากหมู่ตัวตรวจสอบความถูกต้องที่มีอยู่ทั้งหมดHeimdall จะเลือกคณะผู้ผลิตรายจากตัวตรวจสอบความถูกต้องทั้งหมดผู้สร้างบล็อกจะรวมตัวตรวจสอบความถูกต้องชุดย่อยตามจำนวนตัวตรวจสอบความถูกต้องในระบบ

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### โปรโตสทรานส์ฟอร์ชัน Span {#propose-span-transaction}

ประเภท: **ธุรกรรม Heimdall**

ที่มา: [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx` ตั้งคณะทำงานของตัวตรวจสอบความถูกต้องสำหรับ `span` ที่กำหนดในกรณีที่รวมธุรกรรมที่สำเร็จต้องรวมหนึ่งธุรกรรมสำหรับแต่ละ Span ไว้บน Heimdallโดยเรียกว่า `spanProposeTx` บน Heimdall `spanProposeTx` ต้องเปลี่ยนกลับ หากถูกส่งบ่อยหรือมีการเปลี่ยนแปลงเดิมพันไม่น้อยกว่า 33% ที่เกิดขึ้นในคณะทำงานปัจจุบัน (สำหรับ `span` ที่กำหนด)

โมดูล `bor` บน Heimdall ใช้ในการจัดการ Spanวิธีการที่ Bor เลือกผู้สร้างบล็อกจากตัวตรวจสอบความถูกต้องทั้งหมดมีดังนี้:

1. Bor สร้างหลายสล็อตตามอำนาจของตัวตรวจสอบความถูกต้องตัวอย่าง: A ที่มีอำนาจ 10 จะมี 10 สล็อต ส่วน B ที่มีอำนาจ 20 จะมี 20 สล็อต
2. ด้วยสล็อตทั้งหมด ฟังก์ชัน `shuffle` จะสับเปลี่ยนสล็อตโดยใช้ `seed` และเลือกผู้สร้างบล็อก `producerCount` รายแรก โมดูล `bor` บน Heimdall ใช้อัลกอริทึมการสับเปลี่ยน ETH 2.0 เพื่อเลือกผู้สร้างบล็อกจากตัวตรวจสอบความถูกต้องทั้งหมดแต่ละ Span `n` ใช้บล็อกแฮชของบล็อก Ethereum (ETH 1.0) `n` เป็น `seed`โปรดทราบว่าการเลือกตามสล็อตช่วยให้ตัวตรวจสอบความถูกต้องถูกเลือกตามอำนาจของตนตัวตรวจสอบความถูกต้องที่มีกำลังสูงกว่าขึ้นจะมีความน่าจะเป็นสูงกว่าที่จะถูกเลือกที่มา: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### ยอมรับ Span Tx {#commit-span-tx}

ประเภท: **ธุรกรรม Bor**

การยอมรับ Span ใน Bor มีอยู่สองวิธีด้วยกัน

1. **การเปลี่ยน Span โดยอัตโนมัติ**

    เมื่อสิ้นสุด Span ปัจจุบัน ที่บล็อกสุดท้ายของ Sprint สุดท้าย Bor จะสืบค้น Span ถัดไปจาก Heimdall และตั้งค่าตัวตรวจสอบความถูกต้องและผู้สร้างบล็อกสำหรับ Span ถัดไปโดยใช้การเรียกระบบ

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

Bor ใช้ผู้สร้างบล็อกใหม่เป็นผู้สร้างบล็อกสำหรับบล็อกถัดไป

2. **บังคับยอมรับ**

เมื่อ `span` เสนอบน Heimdall แล้ว ตัวตรวจสอบความถูกต้องสามารถบังคับพุช Span ได้ หากจำเป็นต้องเปลี่ยน Span ก่อนที่ Span ปัจจุบันจะสิ้นสุดโดยตัวตรวจสอบความถูกต้องใดๆ ก็ตามจะต้องยอมรับธุรกรรมในการเสนอ `span`กับ Borจากนั้น Bor จะอัปเดตและยอมรับ Span ที่เสนอเมื่อสิ้นสุด Sprint ปัจจุบันโดยใช้การเรียกระบบ


## การจัดการสถานะ (การซิงค์สถานะ) {#state-management-state-sync}

การจัดการสถานะจะส่งสถานะจากเชน Ethereum ไปยังเชน Borซึ่งเรียกว่า `state-sync`นี่คือวิธีในการย้ายข้อมูลจากเชน Ethereum ไปยังเชน Bor

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### ตัวส่งสถานะ {#state-sender}

ที่มา: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

หากต้องการซิงค์การซิงค์สถานะ ให้เรียกเมธอดต่อไปนี้ **สัญญาผู้ส่งสถานะ** บนเชน Ethereumโดยพื้นฐานแล้ว กลไก `state-sync` คือวิธีในการย้ายข้อมูลสถานะจากเชน Ethereum ไปยัง Bor

ผู้ใช้ที่ต้องการย้าย `data` จากสัญญาบนเชน Ethereum ไปยังเชน Bor เรียกเมธอด `syncSate` บน `StateSender.sol`

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

สัญญา `receiver`จะต้องมีอยู่บนเชนย่อย ซึ่งได้รับสถานะ `data` เมื่อกระบวนการเสร็จสิ้นแล้ว `syncState`จะส่งเหตุการณ์ `StateSynced` บน Ethereum ซึ่งเป็นเหตุการณ์ต่อไปนี้:

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

เมื่อส่งเหตุการณ์ `StateSynced` บนสัญญา `stateSender` บนเชน Ethereum ตัวตรวจสอบความถูกต้องใดๆ จะส่งธุรกรรม `MsgEventRecord` บน Heimdall

หลังการยืนยัน tx บน Heimdall ตัวตรวจสอบความถูกต้องจะเสนอ `proposeState` บน Bor ด้วยธุรกรรมธรรมดา และเมื่อสิ้นสุด Sprint แล้ว Bor จะยืนยันและสรุป `state-sync` โดยเรียก `commitState` โดยใช้การเรียก `system`

ระหว่าง `commitState` Bor จะดำเนินการ `onStateReceive` โดยมี `stateId` และ `data` เป็นอาร์กิวเมนต์บนสัญญาเป้าหมาย

### อินเทอร์เฟซผู้รับสถานะ {#state-receiver-interface}

สัญญา `receiver` บนเชน Bor ต้องนำอินเทอร์เฟซต่อไปนี้ไปใช้

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

อนุญาตเฉพาะ `0x0000000000000000000000000000000000001001` — `StateReceiver.sol` ให้เรียกฟังก์ชัน `onStateReceive` บนสัญญาเป้าหมายได้

## ความเร็วธุรกรรม {#transaction-speed}

ปัจจุบัน Bor ทำงานตามที่คาดไว้โดยใช้เวลาในการสร้างบล็อกประมาณ 2 ถึง 4 วินาที โดยใช้ตัวตรวจสอบความถูกต้อง 100 ตัวและผู้สร้างบล็อก 4 รายหลังจากที่ใช้ธุรกรรมจำนวนมากทดสอบภาวะวิกฤตหลายครั้ง ก็จะกำหนดเวลาในการสร้างบล็อกที่แน่นอน

การใช้สถาปัตยกรรมที่ใช้ Sprint จะช่วยให้ Bor สร้างบล็อกเป็นกลุ่มได้เร็วขึ้นโดยไม่ต้องเปลี่ยนผู้สร้างบล็อกระหว่าง Sprint ปัจจุบันการเลื่อนเวลาระหว่าง Sprint สองครั้งจะทำให้ผู้สร้างบล็อกอื่นๆ ได้รับบล็อกที่เผยแพร่แล้ว ซึ่งมักเรียกว่า `producerDelay`

โปรดทราบว่าเวลาระหว่าง Sprint สองครั้งนั้นสูงกว่าบล็อกปกติในการบัฟเฟอร์ เพื่อลดปัญหาเวลาแฝงระหว่างผู้สร้างบล็อกหลายราย

## การโจมตี {#attacks}

### การเซ็นเซอร์ {#censorship}

Bor ใช้ผู้สร้างบล็อกจำนวนน้อยมากเพื่อสร้างบล็อกที่เร็วขึ้นซึ่งหมายความว่ามีแนวโน้มว่าจะถูกโจมตีจากการเซ็นเซอร์มากกว่า Heimdallเพื่อจัดการกับกรณีดังกล่าว จะทำการทดสอบหลายครั้งเพื่อค้นหาจำนวนผู้สร้างบล็อกสูงสุดสำหรับเวลาในการสร้างบล็อกที่ยอมรับได้ในระบบ

นอกจากนั้น มีการโจมตีจำนวนเล็กน้อยที่เป็นไปได้:

1. ผู้สร้างบล็อกรายหนึ่งกำลังเซ็นเซอร์ธุรกรรม

ในกรณีดังกล่าว ผู้ส่งธุรกรรมสามารถรอ Sprint ของผู้สร้างบล็อกถัดไปได้ และลองส่งธุรกรรมอีกครั้ง

2. ตัวตรวจสอบความถูกต้องทั้งหมดทำงานร่วมกันและเซ็นเซอร์ธุรกรรมดังกล่าว

ในกรณีนี้ ระบบ Polygon จะจัดเตรียมวิธีในการส่งธุรกรรมบนเชน Ethereum และขอให้ตัวตรวจสอบความถูกต้องรวมธุรกรรมในเช็คพอยต์ `x` ถัดไปหากตัวตรวจสอบความถูกต้องไม่สามารถรวมไว้ได้ภายในกรอบเวลาดังกล่าว ผู้ใช้สามารถยกเลิกตัวตรวจสอบความถูกต้องได้โปรดทราบว่าขณะนี้ยังไม่มีการนำไปใช้งาน

### การฉ้อโกง {#fraud}

ผู้สร้างบล็อกสามารถรวมธุรกรรมที่ไม่ถูกต้องไว้ในรอบของตนได้ซึ่งสามารถทำได้ที่หลายระดับ:

1. ผู้สร้างบล็อกหนึ่งรายฉ้อโกง

หากผู้สร้างบล็อกรวมธุรกรรมที่ไม่ถูกต้องที่ความสูงใดๆ ผู้สร้างบล็อกอื่นๆ ก็สามารถสร้างฟอร์คและแยกธุรกรรมนั้นออกได้ เนื่องจากโหนดที่ถูกต้องจะข้ามบล็อกที่ไม่ถูกต้อง

2. ผู้สร้างบล็อก Span ฉ้อโกง

หากผู้สร้างบล็อกอื่นๆ ไม่สร้างฟอร์ค ตัวตรวจสอบความถูกต้องอื่นๆ ที่ตรวจสอบความถูกต้องของบล็อกสามารถบังคับเปลี่ยน Span ได้โดยสร้างฟอร์คของตัวเองซึ่งปัจจุบันยังไม่ได้นำไปใช้งาน เนื่องจากต้องทราบว่า Geth ทำงานภายในอย่างไรอย่างไรก็ตาม สิ่งนี้อยู่ในแผนกลยุทธ์ในอนาคตของเรา

3. ตัวตรวจสอบความถูกต้องทุกรายฉ้อโกง

ข้อสันนิษฐานคือ ⅔ ของตัวตรวจสอบความถูกต้อง +1 จะต้องซื่อสัตย์จึงจะทำงานระบบนี้ได้อย่างถูกต้อง
