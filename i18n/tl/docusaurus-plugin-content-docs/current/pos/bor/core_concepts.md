---
id: core_concepts
title: Mga pangunahing konsepto
description: Ang Bor ay state chain sa arkitektura ng Polygon
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

# Mga pangunahing konsepto {#core-concepts}

Ang Bor ay state chain sa Polygo arkitektura. Ito ay isang fork ng Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) na may bagong consensus na tinatawag na Bor.

Pinagmulan: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## consensus {#consensus}

Gumagamit ang Bor ng bagong pinabuting pinagkasunduan, na inspirasyon ng [pinagkasunduan](https://eips.ethereum.org/EIPS/eip-225) ng Clique

Higit pang mga detalye sa pinagkasunduan at mga pagtutukoy: Pinagkasunduan ng [Bor](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## genesis {#genesis}

Ang genesis block ay naglalaman ng lahat ng mahahalagang impormasyon para i-configure ang network. Ito ay karaniwang ang config file para sa Bor chain. Para i-boot up ang Bor chain, kailangang ipasa ng user ang lokasyon ng file bilang param.

Gumagamit ang bor bilang block at params `genesis.json`ng Genesis. Narito ang isang halimbawa para sa genesis ng Bor `config`:

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

[Espesipikong config ng consensus](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## EVM/Solidity bilang VM {#evm-solidity-as-vm}

Gumagamit ang Bor ng hindi nabagong EVM bilang isang VM para sa isang transaksyon. Maaaring mag-deploy ang mga developer ng anumang kontrata na gusto nila gamit ang parehong mga tool at compiler ng Ethereum nang `solc`walang anumang pagbabago.

## Matic bilang Native token (Gas token) {#matic-as-native-token-gas-token}

Ang Bor ay may Matic token bilang katutubong token na katulad ng ETH sa Ethereum. Madalas itong tinatawag na gas token. Ang token na ito ay gumagana nang tama sa kung paano gumagana ang ETH sa kasalukuyan sa Ethereum chain.

Bukod pa riyan, nagbibigay ang Bor ng in-built na wrapped ERC20 token para sa native token (katulad ng WETH token), na nangangahulugang maaaring gumamit ang mga aplikasyon ng wrapped MATIC ERC20 token sa kanilang mga aplikasyon nang hindi gumagawa ng sarili nilang wrapped na ERC20 na bersyon ng Matic native token.

Ang wrapped na token na ERC20 ay naka-deploy sa `0000000000000000000000000000000000001010` bilang `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)` sa Bor bilang isa sa mga genesis na kontrata.

### Mga Bayarin {#fees}

Ginagamit ang native token bilang mga bayarin habang nagpapadala ng transaksyon sa Bor. Pinipigilan nito ang spam sa Bor at nagbibigay ng mga insentibo sa mga Block Producer upang patakbuhin ang chain nang mas matagal na panahon at pinipigilan ang masamang pag-uugali.

Tinutukoy ng nagpadala ng transaksyon ang `GasLimit` at `GasPrice` para sa bawat transaksyon at ibino-broadcast ito sa Bor. Maaaring tukuyin ng bawat producer kung magkano ang minimum na gas price na maaari nilang tanggapin gamit ang `--gas-price` habang sinisimulan ang Bor node. Kung ang tinukoy ng user na `GasPrice` sa transaksyon ay pareho o mas malaki kaysa sa gas price na tinukoy ng producer, tatanggapin ng producer ang transaksyon at isasama ito sa susunod na available na block. Binibigyang-daan nito ang bawat producer na pahintulotan ang sarili nitong minimum na pangangailangan sa gas price.

Ang mga bayarin sa transaksyon ay ibabawas mula sa account ng sender sa pamamagitan ng mga Native token.

Narito ang formula para sa mga bayarin sa transaksyon:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

Ang mga nakolektang bayarin para sa lahat ng transaksyon sa isang block ay inililipat sa account ng producer gamit ang coin based na paglipat. Dahil ang pagkakaroon ng mas maraming staking power ay nagpapataas ng iyong posibilidad na maging isang producer, ito ay magbibigay-daan sa isang validator na may mataas na staking power upang mangolekta ng higit pang mga reward (sa pamamagitan ng mga bayarin) nang naaayon.

### Maglipat ng mga log ng resibo {#transfer-receipt-logs}

Ang bawat Plasma compatible na ERC20 token sa Bor ay nagdadagdag ng isang espesyal na log ng resibo sa paglilipat. Hindi bukod ang Matic token doon.

Ang `LogTransfer` ay isang espesyal na log na idinagdag sa lahat ng plasma compatible na mga ERC20/721 token. Isaalang-alang ito bilang isang 2-inputs-2-outputs na UTXO para sa paglipat. `output2 = input2 + amount`Dito at Ito `output1 = input1 - amount`ay nagbibigay-daan sa mga kontrata ng pandaraya sa plasma na i-verify ang paglipat ng mga token ng Matic ERC20 (dito, Native token) sa Ethereum chain.

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

Mula noo, ang MATIC token ang katutubong token at wala pang Native ERC20 token, nagdadagdag ang Bor ng resibo log para sa bawat transfer na ginawa para sa Native token gamit ang sumusunod sa Golang code. Pinagmulan: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### Ideposito token native {#deposit-native-token}

Ang isang user ay maaaring makatanggap ng Native token sa pamamagitan ng pagdedeposito ng mga Matic token sa Ethereum main chain upang `DepositManager` na kontrata (na-deploy sa Ethereum chain). Pinagmulan: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

Gamit ang mga `depositERC20` token, maaaring ilipat ng mga user ang Matic ERC20 token (Native token) o anumang iba pang ERC20 token mula sa Ethereum chain patungo sa Bor chain.

### I-withdraw ang native token {#withdraw-native-token}

Ang pag-withdraw mula sa Bor chain patungo sa Ethereum chain ay gumagana nang eksakto tulad ng iba pang ERC20 token. Maaaring i-call ng user ang `withdraw` na function ng ERC20 na kontrata, na na-deploy sa Bor, sa `0000000000000000000000000000000000001010` upang simulan ang proseso ng pag-withdraw para sa kapareho. Pinagmulan: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## Mga in-built na kontrata (mga Genesis na kontrata) {#in-built-contracts-genesis-contracts}

Nagsisimula ang Bor sa tatlong in-built na kontrata, kadalasang tinatawag na mga genesis na kontrata. Ang mga kontratang ito ay available sa block 0. Pinagmulan: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

Ang mga kontratang ito ay na-complie gamit ang `solc --bin-runtime`. Halimbawa, ang sumusunod na command ay naglalabas ng compiled na code para sa `contract.sol`

```bash
solc --bin-runtime contract.sol
```

Tinukoy ang Genesis na kontrata sa `genesis.json`. Kapag nagsimula ang bor sa block 0, nilo-load nito ang lahat ng kontrata gamit ang nabanggit na code at balanse.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

Nasa ibaba ang mga detalye para sa bawat genesis contract.

### Itinakda bor validator {#bor-validator-set}

Pinagmulan: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

Na-deploy sa: `0x0000000000000000000000000000000000001000`

Ang `BorValidatorSet.sol` na kontrata ang namamahala ng validator set para sa mga span. Ang pagkakaroon ng kasalukuyang validator set na nagtakda at impormasyon ng span sa isang kontrata ay nagbibigay-daan sa ibang mga kontrata na gamitin ang impormasyong iyon. Dahil gumagamit ang Bor ng mga producer mula sa Heimdall (isang external na pinagmulan), gumagamit ito ng system call para baguhin ang state ng kontrata.

Para sa unang sprint, lahat ng mga producer na tinukoy sa `BorValidatorSet.sol` nang direkta.

Ang `setInitialValidators` ay tinatawag kapag ang pangalawang span ay itinatakda. Dahil hindi sinusuportahan ng Bor ang constructor para sa genesis na kontrata, ang unang validator set ay kailangang itakda sa `spans` na mapa.

Ang mga detalye ng unang span ay ang mga sumusunod:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Depinisyon ng solidity na kontrata:

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

Ang `proposeSpan` ay maaaring tawagan ng sinumang validator na walang bayad. Pinapayagan ng Bor na ang `proposeSpan` na transaksyon ay maging libreng transaksyon dahil bahagi ito ng system.

Ang `commitSpan` ay tinatawag sa pamamagitan ng [na sytem call](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Receiver ng state {#state-receiver}

Pinagmulan: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

Na-deploy sa: `0x0000000000000000000000000000000000001001`

Ang kontrata ng receiver ng state ay namamahala sa mga papasok na rekord ng pag-sync ng state. Ang `state-sync` na mekanismo ay isa lamang paraan upang ilipat ang state ng data mula sa Ethereum chain patungo sa Bor chain.

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

Ang `proposeState` ay tatawagin ng anumang valid na validator na walang bayad. Pinapayagan ng Bor na ang `proposeState` na transaksyon ay maging libreng transaksyon dahil bahagi ito ng system.

`commitState`ay tinatawag sa pamamagitan ng tawag sa [sistema](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Token ng Matic ERC20 {#matic-erc20-token}

Pinagmulan: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

I-deploy sa:`0x0000000000000000000000000000000000001010`

Ito ang espesyal na kontrata na bumabalot ng katutubong barya (tulad ng $ETH sa Ethereum) at nagbibigay ng interface ng token ng ERC20. Halimbawa: `transfer`sa kontratang ito naglilipat ng mga katutubong token. Pinapayagan ng `withdraw`paraan ang mga gumagamit ng ERC20 na ilipat ang kanilang mga token mula sa Bor hanggang sa Ethereum chain.

Tandaan: Hindi sinusuportahan ng kontratang ito`allowance`. Parehong ito para sa bawat kontrata ng compatible ng token ng plasma na ERC20.

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

## Sistema call {#system-call}

`2^160-2`Tanging ang system address, ang nagbibigay-daan sa paggawa ng systema call. Tinatawag ito ng Bor sa loob ng system address bilang `msg.sender`. Binabago nito ang state ng kontrata at ina-update ang state root para sa isang partikular na block. Inspirado mula sa [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) at [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Nakakatulong ang system call na baguhin ang state sa kontrata nang hindi gumagawa ng anumang transaksyon.

Limitasyon: Sa kasalukuyan, ang mga kaganapang ibinubuga ng mga tawag sa system ay hindi nakikita at hindi kasama sa anumang transaksyon o block.

## Pamamahala ng Span {#span-management}

Ang span ay isang lohikal na tinukoy na hanay ng mga bloke kung saan ang isang hanay ng mga validator ay pinili mula sa lahat ng magagamit na mga validator. Pipiliin ng Heimdall ang komite ng mga producer mula sa lahat ng validator. Ang mga producer ay magsasama ng isang subset ng mga validator depende sa bilang ng mga validator sa systema.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### I-propose ang Transaksyon ng Span {#propose-span-transaction}

Uri: **Heimdall transaksyon**

Pinagmulan: [https://github.com/maticnetwork/heimdall/blob /develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx`nagtatakda ng komite ng mga validator para sa isang ibinigay `span`sa kaso ng matagumpay na pagsasama ng transaksyon. Isang transaksyon para sa bawat span ang dapat isama sa Heimdall. Ito ay tinatawag na `spanProposeTx` sa Heimdall. Dapat ibalik ng `spanProposeTx` kung madalas na ipinapadala o walang mas mababa sa 33% na pagbabago sa stake sa loob ng kasalukuyang komite (para sa, sa ibinigay na `span`).

Ang `bor` na module sa Heimdall ay humahawak ng pamamahala ng span. Narito kung paano pinipili ng Bor ang mga producer mula sa lahat ng validator:

1. Gumagawa ang Bor ng maramihang slot batay sa kapangyarihan ng mga validator. Halimbawa: Ang A na may power 10 ay magkakaroon ng 10 slot, at B na may power 20 ay may 20 slot.
2. Sa lahat ng mga slot, sina-shuffle ng `shuffle` na function ang mga ito gamit ang `seed` at pinipili ang unang `producerCount` na mga producer. Ang `bor` na module sa Heimdall ay gumagamit ng ETH 2.0 shuffle algorithm upang pumili ng mga producer mula sa lahat ng mga validator. Ang bawat span na `n` ay gumagamit ng block hash ng Ethereum (ETH 1.0) na block `n` bilang `seed`. Tandaan na ang pagpili batay sa mga slot ay nagbibigay-daan sa mga validator na mapili batay sa kanilang power. Ang may mas mataas na power na validator ay magkakaroon ng mas mataas na posibilidad na mapili. Pinagmulan: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### I-commit ang span Tx {#commit-span-tx}

Uri: **Bor na transaksyon**

May dalawang paraan para mag-commit ng span sa Bor.

1. **Awtomatikong pagbabago ng span**

    Sa dulo ng kasalukuyang span, sa huling block ng huling sprint, kine-query ng Bor ang susunod na span mula sa Heimdall at nagtatakda ng mga validator at mga producer para sa susunod na span gamit ang isang system call.

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

    Gumagamit ang Bor ng mga bagong producer bilang mga block producer para sa kanilang mga susunod na block.

2. **Puwersahang pag-commit**

    Kapag ang `span` ay nagmungkahi sa Heimdall, maaaring puwersahin ng validator ang push span kung kailangang baguhin ang span bago matapos ang kasalukuyang span. Ang isang transaksyon na magmungkahi ng isang `span` ay dapat mai-commit sa Bor ng anumang validator. Pagkatapos ay ina-update at gagawin ni Bor ang iminungkahing span sa pagtatapos ng kasalukuyang sprint gamit ang isang systema call.


## Pamamahala sa state (State-sync) {#state-management-state-sync}

Ipinapadala ng pamamahala ng estado ang estado mula sa Ethereum chain patungo sa Bor chain. Tinatawag itong `state-sync`. Ito ay isang paraan upang ilipat ang data mula sa Ethereum chain patungo sa Bor chain.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### Sender ng state {#state-sender}

Pinagmulan: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Para i-sync ang state sync, i-call ang sumusunod na paraan ng **kontrata ng state sender** sa Ethereum chain. Ang `state-sync` na mekanismo ay isa lamang paraan upang ilipat ang state ng data mula sa Ethereum chain patungo sa Bor chain.

Ang isang user, na gustong lumipat sa `data` mula sa kontrata sa Ethereum chain patungo sa Bor chain, ang mag-call sa `syncSate` pamamaraan sa `StateSender.sol`

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

Ang `receiver` na kontrata ay dapat na naroroon sa child chain, na tumatanggap ng state na `data` kapag nakumpleto ang proseso. Ang `syncState` ay naglalabas ng `StateSynced` na event sa Ethereum, na siyang sumusunod:

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

Kapag nailabas na ang `StateSynced` na event sa `stateSender` na kontrata sa Ethereum chain, magpapadala ang anumang validator ng `MsgEventRecord` na transaksyon sa Heimdall.

Pagkatapos ng kumpirmasyon ng isang tx sa Heimdall, isang validator ang magmumungkahi ng `proposeState` sa Bor na may simpleng transaksyon at sa dulo ng sprint, ang Bor ay gagawa at magtatapos ng `state-sync` a pamamagitan ng pag-call sa `commitState` gamit ang `system` na call.

`data`Sa panahon `commitState`nagpapatupad Bor,`onStateReceive` na may at b`stateId`ilang args, sa kontrata ng target.

### Interface ng receiver ng state {#state-receiver-interface}

`receiver`kontrata sa Bor chain ay dapat ipatupad ang sumusunod na interface.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

`0x0000000000000000000000000000000000001001``StateReceiver.sol`Dapat lamang pahintulutan na tumawag sa isang `onStateReceive`function sa target na kontrata.

## Bilis ng transaksyon {#transaction-speed}

Kasalukuyang gumagana ang Bor gaya ng inaasahan sa ~2 hanggang 4 na segundo ng block time na may 100 validator at 4 na block producer. Pagkatapos ng maramihang pagsubok sa stress na may malaking bilang ng mga transaksyon, ang eksaktong block time ay pagpapasyahan.

Ang paggamit ng arkitektura na nakabatay sa sprint ay nakakatulong sa Bor na gumawa ng mas mabilis na bulk block nang hindi binabago ang producer sa kasalukuyang sprint. Ang pagkakaroon ng pagkaantala sa pagitan ng dalawang sprint ay nagbibigay sa iba pang mga producer na makatanggap ng isang naka-broadcast na block, na kadalasang tinatawag na `producerDelay`

Tandaan na ang oras sa pagitan ng dalawang sprint ay mas mataas kaysa sa mga normal na block para i-buffer para mabawasan ang mga issue sa latency sa pagitan ng maramihang producer.

## Mga Pag-atake {#attacks}

### Censorship {#censorship}

Gumagamit ang Bor ng napakaliit na set ng mga producer para gumawa ng mas mabilis na mga block. Nangangahulugan ito na madaling atakehin ito ng mas higit na censorship kaysa sa Heimdall. Upang harapin iyon, maramihang pagsubok ang gagawin para malaman ang maximum na bilang ng mga producer para sa katanggap-tanggap na block time sa system.

Bukod doon, kakaunti ang posibleng pag-atake:

1. Sini-censor ng isang producer ang transaksyon

    Sa kasong iyon, maaaring maghintay ang sender ng transaksyon para sa sprint ng susunod na producer at subukang ipadala muli ang transaksyon.

2. Lahat ng mga validator ay nakikipagsabwatan sa isa't isa at sini-censor ang partikular na transaksyon

    Sa kasong ito, magbibigay ang Polygon system ng paraan upang magsumite ng transaksyon sa Ethereum chain at hilingin sa mga validator na isama ang transaksyon sa mga susunod na `x` na check point. Kung pumalya ang mga validator na isama ito sa window ng oras na iyon, maaaring i-slash ng user ang mga validator. Tandaan na hindi ito kasalukuyang ipinapatupad.

### Panlilinlang {#fraud}

Maaaring isama ng mga producer ang invalid na transaksyon sa panahon ng kanilang turn. Maaari itong maging posible sa maramihang antas:

1. Isang producer ang mapanlinlang

    Kung ang isang producer ay may kasamang invalid na transaksyon sa anumang taas, ang ibang mga producer ay maaaring gumawa ng isang fork at ibukod ang transaksyon na iyon dahil ang kanilang valid na node ay hindi pinapansin ang mga invalid na block

2. Ang mga producer ng span ay mapanlinlang

    Kung ang ibang mga producer ay hindi gumawa ng fork, ang ibang mga validator na nagba-validate sa block ay maaaring puwersahang baguhin ang span sa pamamagitan ng paggawa ng kanilang sariling fork. Hindi ito kasalukuyang ipinapatupad dahil nangangailangan ito ng kung paano internal na gumagana ang Geth. Gayunpaman, ito ay nasa aming roadmap sa hinaharap.

3. Lahat ng mga validator ay mapanlinlang

    Ipinapalagay na ang ⅔+1 na mga validator ay dapat maging tapat upang gumana nang tama ang system na ito.
