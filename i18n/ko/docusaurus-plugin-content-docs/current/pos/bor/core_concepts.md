---
id: core_concepts
title: 핵심 개념
description: Polygon 아키텍처에서 상태 체인Name
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

# 핵심 개념 {#core-concepts}

Bor는 Polygon 아키텍쳐의 상태 체인입니다. 이것은 Bor라고 새롭게 합의된 Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum)의 한 포크입니다.

출처: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## 합의 {#consensus}

Bor는 [Clique](https://eips.ethereum.org/EIPS/eip-225) 컨센서스에서 영감을 얻은 새로운 개선 된 합의를 사용합니다.

컨센서스 및 사양에 대한 자세한 내용 : [Bor 컨센서스](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## genesis {#genesis}

제네시스 블록은 네트워크 구성을 위한 모든 필수 정보를 포함합니다. 기본적으로 Bor 체인의 구성 파일입니다. Bor 체인을 부팅하려면 사용자가 파일의 위치를 매개변수로 전달해야 합니다.

Bor는 `genesis.json`을 제네시스 블록 및 매개변수로 사용합니다.  다음은 Bor 제네시스의 `config`예입니다.

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

[config](https://www.notion.so/15ab7eb6e8124142a3641939762d6d67)

[특정 구성 합의](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## Bor의 가상 머신(VM) EVM/Solidity {#evm-solidity-as-vm}

Bor는 트랜잭션을 위한 VM으로 수정되지 않은 EVM을 사용합니다. 개발자는 아무 변경 없이 동일한 이더리움 도구와 같`solc`은 컴파일러를 사용해 원하는 모든 계약을 배포할 수 있습니다.

## 네이티브 토큰으로서의 매틱 (가스 토큰) {#matic-as-native-token-gas-token}

Bor는 이더리움의 ETH처럼, 네이티브 토큰으로서 매틱 토큰을 가지고 있습니다. 종종 가스 토큰이라고도 합니다. 이 토큰은 현재 ETH가 이더리움 체인에서 작동하는 방식처럼 정확하게 작동합니다.

그 외에도 Bor는 네이티브 토큰에 내장 래핑된 ERC20 토큰(WETH 토큰과 유사)을 제공합니다. 이에 따라 애플리케이션은 자체적으로 매틱 네이티브 토큰의 래핑된 ERC20 버전을 생성할 필요 없이 애플리케이션에서 래핑된 매틱 ERC20 토큰을 사용할 수 있습니다.

래핑된 ERC20 토큰은 제네시스 계약 중 하나로 Bor에서 `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)`로서 `0000000000000000000000000000000000001010`에 배포됩니다.

### 수수료 {#fees}

네이티브 토큰은 Bor에서 트랜잭션을 전송할 때 수수료로 사용됩니다. 이것은 Bor의 스팸을 방지하고 블록프로듀서가 긴 시간 동안 체인을 실행하도록 인센티브를 제공하며 나쁜 행동을 막아줍니다.

트랜잭션 발신자는 각 트랜잭션에 대한 `GasPrice`와 `GasLimit`를 설정하고 Bor에 전파합니다. 각 프로듀서는 Bor 노드 시작 시 `--gas-price`를 사용해 수락할 수 있는 최소 가스 가격을 설정할 수 있습니다. 트랜잭션에서 사용자가 설정한 `GasPrice`이 프로듀서가 설정한 가스 가격보다 크거나 같으면 프로듀서는 트랜잭션을 수락하고 다음 가능한 블록에 그 가격을 포함시킵니다. 이를 통해 각 프로듀서는 자신의 최소 가스 가격 요구를 충족시킬 수 있습니다.

트랜잭션 수수료는 발신자 계정에서 네이티브 토큰으로 공제됩니다.

트랜잭션 수수료 공식은 다음과 같습니다.

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

블록 내 모든 트랜잭션에 대해 징수된 수수료는 Coinbase 이전을 이용해 프로듀서의 계정으로 이체됩니다. 더 많은 스테이킹 파워를 가질수록 프로듀서가 될 확률을 증가시키므로 스테이킹 파워가 높은 유효성 검사자가 더 많은 보상(수수료)을 얻게 됩니다.

### 이체 수신 로그 {#transfer-receipt-logs}

Bor의 플라즈마 호환 가능한 ERC20 토큰은 각각 특별한 이체 수신 로그를 추가합니다. 매틱 토큰도 예외는 아닙니다.

`LogTransfer`는 모든 플라즈마 호환 가능한 ERC20/721 토큰에 추가된 특별한 로그입니다.  이체를 위한 하나의 2-inputs-2-outputs UTXO로 간주하십시오.  여기서, `output1 = input1 - amount`이고 입`output2 = input2 + amount`니다.  이를 통해 플라즈마 사기 방지 계약이 이더리움 체인에서 매틱 ERC20 토큰(여기서는 네이티브 토큰)의 이체를 검증할 수 있게 합니다.

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

Since, MATIC 토큰은 네이티브 토큰이며, AERC20 토큰을 가지고 있지 않으며, Bor는 골랑 코드에 따라 네이티브 토큰에 대해 작성된 각 전송에 대한 영수증 로그를 추가합니다. 출처: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### 네이티브 토큰 입금 {#deposit-native-token}

사용자는 이더리움 메인 체인에서 `DepositManager`계약에 매틱 토큰을 입금해 네이티브 토큰을 받을 수 있습니다 (이더리움 체인에서 배포됨). 출처: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

`depositERC20` 토큰을 사용해 사용자는 매틱 ERC20 토큰(네이티브 토큰) 또는 다른 ERC20 토큰을 이더리움 체인에서 Bor 체인으로 옮길 수 있습니다.

### 네이티브 토큰 인출 {#withdraw-native-token}

Bor 체인에서 이더리움 체인으로 인출은 다른 모든 ERC20 토큰과 동일하게 작동됩니다. 사용자는 Bor에 배포된 ERC20 계약에서 기`withdraw`능을 호출할 수 있으며, 에서`0000000000000000000000000000000000001010` 동일한 출금 프로세스를 시작할 수 있습니다.  출처: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## 내장 계약 (제네시스 계약) {#in-built-contracts-genesis-contracts}

Bor는 제네시스 계약이라고도 불리는 세 가지 내장된 계약으로 시작합니다. 이 계약은 블록 0에서 가능합니다. 출처: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

이러한 계약은 `solc --bin-runtime`을 사용해 컴파일됩니다. 예를 들어, 다음 명령은 `contract.sol`을 위한 컴파일 코드를 내보냅니다.

```bash
solc --bin-runtime contract.sol
```

제네시스 계약은 `genesis.json`에 규정되어 있습니다. Bor가 블록 0에서 시작하면 언급된 코드와 잔액을 가진 모든 계약을 불러옵니다.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

다음은 각 제네시스 계약의 세부 사항입니다.

### Bor 유효성 검사자 세트 {#bor-validator-set}

출처: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

배포 위치: `0x0000000000000000000000000000000000001000`

`BorValidatorSet.sol` 계약은 각 스팬의 유효성 검사자 세트를 관리합니다. 현재 유효성 검사자 세트와 스팬 정보가 계약내용에 포함되어 있으면 다른 계약에서 해당 정보를 이용할 수 있습니다. Bor는 Heimdall(외부 출처)의 프로듀서를 사용하기 때문에, 계약 상태를 교환하기 위해 시스템 호출을 사용합니다.

첫 번째 스프린트의 경우 모든 프로듀서는 `BorValidatorSet.sol`에서 직접 정의됩니다.

두 번째 스팬이 설정되면 `setInitialValidators`가 호출됩니다. Bor는 제네시스 계약의 생성자를 지원하지 않기 때문에 첫 번째 유효성 검사자 세트는 `spans`맵에 설정되어 있어야 합니다.

첫 번째 스팬의 세부 사항은 다음과 같습니다.

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Solidity 계약 정의는 다음과 같습니다.

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

`proposeSpan`은 어느 유효성 검사자든지 수수료 없이 호출할 수 있습니다. `proposeSpan` 트랜잭션은 시스템의 일부이기 때문에 Bor에서 이 트랜젝션을 무료로 할 수 있습니다.

`commitSpan`은 [시스템 호출](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9)을 통해 호출됩니다.

### 상태 리씨버 {#state-receiver}

출처: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

배포 위치: `0x0000000000000000000000000000000000001001`

상태 리씨버 계약은 들어오는 상태 동기화 기록을 관리합니다. `state-sync` 메커니즘은 기본적으로 이더리움 체인에서 Bor로 상태 데이터를 이동시키는 방법입니다.

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

`proposeState`는 어느 유효성 검사자든지 수수료 없이 호출할 수 있습니다. `proposeState` 트랜잭션은 시스템의 일부이기 때문에 Bor에서 이 트랜젝션은 무료로 할 수 있습니다.

`commitState`은 [시스템 호출](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9)을 통해 호출됩니다.

### 매틱 ERC20 토큰 {#matic-erc20-token}

출처: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

배포 위치: `0x0000000000000000000000000000000000001010`

이것은 네이티브 동전을 감싸고 ERC20 토큰 인터페이스를 제공하는 특별 계약입니다. 예: 이 `transfer`계약에서 네이티브 토큰을 전달합니다. ERC20 토큰에서 `withdraw`방법은 사용자가 Bor에서 Eythium 체인에서 토큰을 이동할 수 있습니다.

참고: 본 계약은 `allowance`를 지원하지 않습니다. 이는 모든 플라즈마 호환 ERC20 토큰 계약과 동일합니다.

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

## 시스템 호출 {#system-call}

시스템 호출할 수 있는 유일한 시스템 주소는 `2^160-2`입니다. Bor는 시스템 주소 `msg.sender`를 사용하여 내부적으로 호출합니다. 계약 상태를 변경하고 특정 블록의 상태 루트를 업데이트합니다. [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) 및 [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)에서 영감을 받았습니다.

시스템 호출은 트랜잭션을 수행하지 않고 상태를 계약으로 교환하는 데 유용합니다.

제한 사항: 현재 시스템 호출에서 내보내는 이벤트는 관찰할 수 없으며 어떤 트랜잭션이나 블록에 포함되지 않습니다.

## 스팬 관리 {#span-management}

스팬은 논리적으로 정의된 블록 세트로, 이를 위해 사용 가능한 모든 유효성 검사자 가운데서 유효성 검사자 세트가 선택됩니다. Heimdall은 모든 유효성 검사자 중에서 프로듀서 집단을 선택합니다 프로듀서는 시스템 상 유효성 검사자 수에 따라 유효성 검사자 하위 집합을 포함시킬 것입니다.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### Span 트랜잭션 Propose Propose {#propose-span-transaction}

유형: **Heimdall 트랜잭션**

출처: [https://github.com/maticnetwork/heimdall/bob/development/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx`는 성공적으로 트랜잭션이 포함된 경우 주어진 `span`을 위한 유효성 검사자 집단을 설정합니다. 각 스팬에 대해 하나의 트랜잭션이 반드시 Heimdall에 포함되어야 합니다. 이를 Heimdall에서는 `spanProposeTx`라고 합니다. `spanProposeTx`는 자주 보내지거나 또는 현재 집단 내에서 33% 이상의 스테이크 교환이 발생되는 경우(해당 `span`에서) 반드시 되돌려야 합니다.

Heimdall의 `bor`모듈은 스팬 관리를 통제합니다. Bor가 모든 유효성 검사자들 가운데 프로듀서를 선택하는 방법은 다음과 같습니다.

1. Bor는 유효성 검사자의 파워를 기반으로 복수의 슬롯을 생성합니다. 예를 들어, 10 파워를 가진 A는 슬롯이 10개 있으며, 20 파워를 가진 B는 슬롯이 20개입니다.
2. 모든 슬롯에서 `shuffle`기능은 를`seed` 사용해 슬롯을 섞으며 첫 번째 프`producerCount`로듀서를 선택합니다.  Heimdall의 모듈`bor`은 모든 유효성 검사자 중에서 프로듀서를 선택하는데 ETH 2.0 셔플 알고리즘을 사용합니다. 각 스팬 `n`은 이더리움(ETH 1.0) 블록 `n`의 블록 해시를 `seed`로 사용합니다. 슬롯 기반 선택을 통하여, 파워가 큰 유효성 검사자 우선으로 선정된 점에 유의하세요. 높은 파워를 가진 유효성 검사자는 선정된 확률이 높게 됩니다. 출처: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### 스팬 Tx 커밋 {#commit-span-tx}

유형: **Bor 트랜잭션**

Bor에서 스팬을 커밋하는 방법에는 두 가지가 있습니다.

1. **자동 스팬 교환**

 기존 스팬이 끝날 때, 마지막 스프린트의 마지막 블록에서 Bor는 Heimdall에 다음 스팬을 쿼리하고 시스템 호출을 이용해 다음 스팬을 위한 유효성 검사자와 프로듀서를 설정합니다.

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

 Bor는 새로운 프로듀서를 다음 블록에 대한 블록 프로듀서로 사용합니다.

2. **강제 커밋**

 Heimdall에서 이 제`span`안되면 유효성 검사자는 현재 스팬 종료 전 스팬을 변경해야 할 경우 강제로 스팬 밀어내기를 할 수 있습니다. `span`을 제안하는 트랜잭션은 어떤 유효성 검사자가 반드시 Bor에 커밋해야 합니다. 그 후 Bor는 시스템 콜을 사용해 현재 스프린트의 끝에서 제안된 스팬을 업데이트하고 커밋합니다.


## 상태 관리 (State-sync) {#state-management-state-sync}

상태 관리는 이더리움 체인에서 Bor 체인으로 상태를 보냅니다. 이를 `state-sync`라고 합니다. 이것은 데이터를 이더리움 체인에서 Bor 체인으로 이동시키는 방법입니다.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### 상태 발신자 {#state-sender}

출처: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

상태 동기화(State sync)를 하려면 다음과 같이 이더리움 체인의 **상태 발신자 계약** 메서드를 호출합니다. `state-sync` 메커니즘은 기본적으로 이더리움 체인에서 Bor로 상태 데이터를 이동시키는 방법입니다.

`data`를 이더리움 체인의 계약에서 Bor 체인으로 이동하고자 하는 사용자는 `StateSender.sol`에서 `syncSate`메서드를 호출합니다.

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

`receiver`계약은 반드시 차일드 체인상에 존재해야 하며, 프로세스가 완료되면 차일드 체인은 상태 `data`를 받습니다. `syncState`는 이더리움에서 `StateSynced`이벤트를 다음과 같이 발생시킵니다.

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

 이더리움 체인의 `stateSender`계약에서 `StateSynced`이벤트가 발생하면, 모든 유효성 검사자는 Heimdall에서 트`MsgEventRecord`랜잭션을 보냅니다.

Heimdall의 tx를 확인한 후, 유효성 검사자는 Bor에서 간단한 트랜잭션과 함께 `proposeState`를 제안합니다. Bor는 스프린트의 마지막에 `system`호출을 이용, `commitState`를 호출하여 `state-sync`를 커밋하고 종료합니다.

`commitState`하는 동안, Bor는 대상 계약에서 `stateId` 및 `data`를 매개변수로 `onStateReceive`를 수행합니다.

### 상태 리씨버 인터페이스 {#state-receiver-interface}

Bor 체인의 `receiver` 계약은 반드시 다음의 인터페이스를 구현해야 합니다.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

오직 `0x0000000000000000000000000000000000001001`— 만이 `StateReceiver.sol`대상 계약에서 기능을`onStateReceive` 호출할 수 있습니다.

## 트랜잭션 속도 {#transaction-speed}

Bor는 현재 100대의 유효성 검사자와 4대의 블록 프로듀서로 작동하는데 대략 2~4초의 블록 시간을 예상하고 있습니다. 상당히 많은 양의 트랜잭션을 통한 다양한 스트레스 테스트를 거친 후 정확한 블록 시간이 결정될 예정입니다.

스프린트 기반 아키텍쳐를 사용하면 Bor는 스프린트 중에 프로듀서를 변경하지 않고도 더 빨리 벌크 블록을 생성할 수 있습니다. 두 스프린트 사이에 지연이 생기면 다른 프로듀서가 브로드캐스트된 블록을 받을 수 있으며, 이를 `producerDelay`라고도 합니다.

두 스프린트 사이 시간은 여러 프로듀서 간의 대기 시간을 줄이기 위해 버퍼링할 일반 블록보다 길다는 것을 참조하세요.

## 공격 {#attacks}

### 검열 {#censorship}

Bor는 매우 작은 프로듀서 세트를 사용해 빨리 블록을 생성합니다. 이로 인하여 Heimdall보다 더 많은 검열을 받게될 수 있습니다. 이에 대응하기 위해, 시스템이 수용할 수 있는 블록 시간 내에 가용한 최대 프로듀서 수를 찾기 위한 다양한 테스트가 수행됩니다.

다음을 제외하면 가능한 공격은 거의 없습니다.

1. 프로듀서 하나가 트랜잭션을 검열

 이 경우 트랜잭션 발신자는 다음 프로듀서의 스프린트를 위해 대기하고 트랜잭션을 다시 보내려고 할 수 있습니다.

2. 모든 유효성 검사자가 서로 공모하여 특정 트랜잭션을 검열

이 경우 Polygon 시스템은 이더리움 체인에서 트랜잭션을 제출하는 방법을 제공할 것이며 유효성 검사자에게 다음 `x`체크 포인트에 트랜잭션을 포함하도록 요청합니다. 만약 유효성 검사자가 해당 시간 내에 트랜잭션을 포함시키지 못하면 사용자는 유효성 검사자를 슬래시할 수 있습니다. 이것은 현재 구현되지 않고 있다는 점을 참고하세요.

### 사기 {#fraud}

프로듀서는 자신의 차례에 유효하지 않은 트랜잭션을 포함시킬 수 있습니다. 이는 여러 형태로 일어날 수 있습니다.

1. 한 프로듀서가 사기적

 프로듀서가 어떤 수준에서도 유효하지 않은 트랜잭션을 포함하는 경우, 다른 프로듀서는 포크를 생성할 수 있으며 유효한 노드가 유효하지 않은 블록을 무시하기 때문에 해당 트랜잭션을 제외할 수 있습니다.

2. 스팬 프로듀서가 사기적

 다른 프로듀서가 포크를 생성하지 않는다면 블록을 검증하는 다른 유효성 검사자는 자체 포크를 생성함으로써 스팬을 강제로 교환할 수 있습니다. 이것은 내부적으로 Geth 작업이 필요하기 때문에, 현재는 구현되지 않습니다. 그러나 Polygon의 미래 로드맵에는 있습니다.

3. 모든 유효성 검사자가 사기적

 시스템이 올바르게 작동하기 위해서는 ⅔+1 유효성 검사자는 반드시 정직할 것을 전제로 합니다.
