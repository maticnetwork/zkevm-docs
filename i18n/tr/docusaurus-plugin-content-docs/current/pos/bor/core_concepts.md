---
id: core_concepts
title: Temel Kavramlar
description: Bor Polygon mimarisinde devlet zinciridir
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

# Temel Kavramlar {#core-concepts}

Bor, Polygon mimarisinde durum zinciridir. Bor adlı yeni konsensüs ile Geth'in [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) bir çatallanmasıdır.

Kaynak: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## consensus {#consensus}

Bor [Clique](https://eips.ethereum.org/EIPS/eip-225) konsensüs ile ilham alan yeni geliştirilmiş konsensüs kullanır

Konsensüs ve spesifikasyonlar hakkında daha fazla ayrıntı: [Bor Konsensüs](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## genesis {#genesis}

Genesis bloku, ağı yapılandırmak için gereken tüm bilgileri içerir. Temelde, Bor zinciri için yapılandırma dosyasıdır. Bor zincirini önyüklemek için, kullanıcı dosya konumunu bir parametre olarak iletmelidir.

Bor, Genesis bloku ve parametreler olarak `genesis.json` kullanır.  İşte Bor cinsiyeti için bir `config`örnek:

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

[Yapılandırma](https://www.notion.so/15ab7eb6e8124142a3641939762d6d67)

[Konsensüse özel yapılandırma](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## VM olarak EVM/Solidity {#evm-solidity-as-vm}

Bor, işlem için VM olarak değiştirilmemiş EVM kullanır. Geliştiriciler, aynı Ethereum araçlarını ve `solc` gibi bir derleyiciyi hiçbir değişiklik yapmadan kullanarak istedikleri her türlü sözleşmeyi devreye alabilirler.

## Yerel token (Gaz token'ı) olarak Matic {#matic-as-native-token-gas-token}

Bor, Ethereum'daki ETH'ye benzer şekilde, yerel bir token olarak Matic token'a sahiptir. Buna genellikle gaz token'ı denir. Bu token, tıpkı şu anda Ethereum zinciri üzerinde ETH'nin çalıştığı gibi doğru bir şekilde çalışır.

Buna ek olarak, Bor yerel token için yerleşik bir erc20 wrapped token (WETH token'a benzer) sağlar ve bu da uygulamaların Matic yerel token'ın kendi wrapped erc20 versiyonlarını oluşturmadan uygulamalarında wrapped MATIC ERC20 token'ı kullanabileceği anlamına gelir.

Wrapped ERC20 token, Bor üzerinde genesis sözleşmelerinden biri olarak `0000000000000000000000000000000000001010` konumunda `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)` olarak devreye alınır.

### Ücretler {#fees}

Yerel token, Bor üzerinde işlem gönderirken ücret olarak kullanılır. Bu, Bor üzerinde spam'i önler, blok üreticilerini zinciri daha uzun süre çalıştırmaya teşvik eder ve kötü davranışlardan vazgeçirir.

Bir işlem göndericisi her bir işlem için `GasLimit` ve `GasPrice` tanımlar ve Bor üzerinde yayımlar. Her üretici, Bor düğümünü başlatırken, `--gas-price` kullanarak asgari olarak ne kadar gaz fiyatı kabul edebileceğini tanımlayabilir. Eğer işlemde kullanıcı tarafından tanımlanan `GasPrice`, üretici tarafından tanımlanan gaz fiyatı ile aynı veya daha yüksek ise, üretici işlemi kabul eder ve bir sonraki müsait bloka dâhil eder. Bu da her bir üreticinin kendi asgari gaz fiyatı gereksinimini belirlemesine olanak sağlar.

İşlem ücretleri yerel token cinsinden gönderenin hesabından düşülür.

İşlem ücretleri için formül şöyledir:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

Bir blok içindeki tüm işlemler için toplanan ücretler, coinbase aktarımı kullanılarak üreticinin hesabına aktarılır. Daha fazla staking gücüne sahip olmak üretici olma olasılığınızı artırdığından, yüksek staking gücüne sahip bir doğrulayıcının buna göre daha fazla ödül (ücret olarak) toplamasına olanak sağlar.

### Aktarım dekontu kayıtları {#transfer-receipt-logs}

Bor üzerindeki her bir Plasma uyumlu ERC20 token, özel bir aktarım dekontu kaydı ekler. Matic token da buna bir istisna değildir.

`LogTransfer`, plasma uyumlu tüm ERC20/721 token'larına eklenen özel bir kayıttır.  Bunu aktarım için 2 girişli ve 2 çıkışlı bir UTXO olarak düşünün.  Burada, `output1 = input1 - amount` ve `output2 = input2 + amount`  Bu, plasma sahtekârlığına meydan vermeyen sözleşmelerin Ethereum zinciri üzerinde Matic ERC20 token'larının (burada, Yerel token) aktarımını doğrulamasına olanak sağlar.

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

MATIC token doğal token'dır ve Native ERC20 token'ı bulunmadığı için Bor Native token'ı takip eden Golang kodunu kullanarak Native token için yapılan her transfer için makbuz günlüğü ekler. Kaynak: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### Yerel token yatırma {#deposit-native-token}

Bir kullanıcı, Ethereum ana zincirindeki `DepositManager` sözleşmesine (Ethereum zincirinde devreye alınan) Matic token'ları yatırarak Yerel token alabilir. Kaynak: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

Kullanıcılar, `depositERC20` token'larını kullanarak Matic ERC20 token'larını (Yerel token) veya diğer tüm ERC20 token'larını Ethereum zincirinden Bor zincirine taşıyabilir.

### Yerel token çekme {#withdraw-native-token}

Ethereum zincirinden Bor zincirine fon çekme süreci tüm diğer ERC20 token'larındaki gibi işler. Bir kullanıcı, aynısı için fon çekme sürecini başlatmak için Bor üzerinde `0000000000000000000000000000000000001010` konumunda devreye alınmış ERC20 sözleşmesindeki `withdraw` işlevini çağırabilir.  Kaynak: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## Yerleşik sözleşmeler (Genesis sözleşmeleri) {#in-built-contracts-genesis-contracts}

Bor, çoğu zaman genesis sözleşmeleri olarak adlandırılan üç yerleşik sözleşmeyle başlar. Bu sözleşmeler blok 0'da mevcuttur. Kaynak: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

Bu sözleşmeler `solc --bin-runtime` kullanılarak derlenir. Örneğin, aşağıdaki komut `contract.sol` için derlenmiş kodu yayımlar

```bash
solc --bin-runtime contract.sol
```

Genesis sözleşmesi, `genesis.json` içinde tanımlanır. Bor blok 0'da başladığında, anılan kod ve bakiye ile tüm sözleşmeleri yükler.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

Aşağıda her genesis sözleşmesi için detaylar verilmiştir.

### Bor doğrulayıcı kümesi {#bor-validator-set}

Kaynak: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

Devreye alma yeri: `0x0000000000000000000000000000000000001000`

`BorValidatorSet.sol` sözleşmesi, span'ler için doğrulayıcı kümesini yönetir. Bir sözleşme içinde mevcut bir doğrulayıcı kümesinin ve span bilgilerinin bulunması, diğer sözleşmelerin o bilgileri kullanmasına olanak sağlar. Bor Heimdall'daki (haricî kaynak) üreticileri kullandığından, sözleşme durumunu değiştirmek için sistem çağrısını kullanır.

İlk sprint için, tüm üreticiler doğrudan `BorValidatorSet.sol` içinde tanımlanır.

İkinci span ayarlanırken `setInitialValidators` çağrılır. Bor genesis sözleşmesi için yapılandırıcıyı desteklemediğinden, ilk doğrulayıcı kümesinin `spans` eşlemesine ayarlanması gerekir.

İlk span'in ayrıntıları şöyledir:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Solidity sözleşme tanımı:

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

`proposeSpan`, ücretleri sıfır olan herhangi bir geçerli doğrulayıcı tarafından çağrılabilir. Bor, sistemin bir parçası olduğundan `proposeSpan` işleminin ücretsiz olmasına izin verir.

`commitSpan`, [sistem çağrısı](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9) yoluyla çağrılır.

### Durum alıcı {#state-receiver}

Kaynak: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

Devreye alma yeri: `0x0000000000000000000000000000000000001001`

State receiver sözleşmesi, gelen durum eşitleme kayıtlarını yönetir. `state-sync` mekanizması, temelde durum verilerini Ethereum zincirinden Bor'a taşımanın bir yoludur.

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

`proposeState`, ücretleri sıfır olan herhangi bir geçerli doğrulayıcı tarafından çağrılır. Bor, sistemin bir parçası olduğundan `proposeState` işleminin ücretsiz olmasına izin verir.

`commitState`, [sistem çağrısı](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9) yoluyla çağrılır.

### Matic ERC20 token {#matic-erc20-token}

Kaynak: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

Devreye alma yeri: `0x0000000000000000000000000000000000001010`

Bu sözleşme yerli sikke (Ethereum içinde $ETH gibi) saran ve ERC20 token arayüzü sağlayan özel bir sözleşmedir. Örnek: Bu sözleşmede yerel token'ları `transfer`aktarır. ERC20 token'daki `withdraw`yöntem, kullanıcıların tokenlarını Bor üzerinden Ethereum zincirine taşımalarına izin verir.

Not: Bu sözleşme, `allowance` için destek sağlamaz. Bu durum her plazma uyumlu ERC20 token sözleşmesi için aynıdır.

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

## Sistem çağrısı {#system-call}

Yalnızca sistem adresi olan `2^160-2`, bir sistem çağrısı yapılmasına izin verir. Bor bunu sistem adresi ile dâhili olarak, `msg.sender` olarak çağırır. Sözleşme durumunu değiştirir ve belirli bir blok için durum kökünü günceller. Şunlardan ilham alınmıştır: [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) ve [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Sistem çağrısı, hiçbir işlem yapmadan sözleşme durumunu değiştirmeye yarar.

Sınırlama: Şu an için, sistem çağrısı tarafından yayımlanan olaylar gözlemlenemez ve herhangi bir işleme veya bloka dâhil edilmez.

## Span yönetimi {#span-management}

Span, mantıksal olarak tanımlanmış bir blok kümesidir ve bu blok kümesi için müsait tüm doğrulayıcılar arasından bir doğrulayıcı kümesi seçilir. Heimdall, tüm doğrulayıcılar arasından üreticiler komitesini seçer. Üreticiler, sistemdeki doğrulayıcı sayısına bağlı olarak bir alt doğrulayıcı kümesi içerir.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### Span İşlemini Teklif Edin {#propose-span-transaction}

Türü: **Heimdall işlemi**

Kaynak: [https://github.com/maticnetwork/heimdall/blob/gelişim/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx`, işlemin başarılı bir şekilde dâhil edilmesi durumunda belirli bir `span` için doğrulayıcı komitesini belirler. Heimdall'a her bir span için bir işlem dâhil edilmelidir. Heimdall'da buna `spanProposeTx` denir. Eğer sık gönderiliyorsa veya mevcut komite içinde %33'ten az olmayan bir stake değişikliği olmuşsa (belirli bir `span` için), `spanProposeTx` geri döndürülmelidir.

Heimdall üzerindeki `bor` modülü, span yönetimini gerçekleştirir. Bor, tüm doğrulayıcılar arasından üreticileri şu şekilde seçer:

1. Bor, doğrulayıcının gücüne dayalı olarak birden çok slot oluşturur. Örnek: Gücü 10 olan A 10 slot'a sahip olacak, gücü 20 olan B ise 20 slot'a sahip olacaktır.
2. `shuffle` işlevi, `seed` kullanarak tüm slot'ları karıştırır ve ilk `producerCount` üreticiyi seçer.  Heimdall'daki `bor` modülü tüm doğrulayıcılar arasından üreticileri seçmek için ETH 2.0 karıştırma algoritmasını kullanır. Her span `n`'i, Ethereum (ETH 1.0) blok `n`'inin blok hash'ini, `seed` olarak kullanır. Slot tabanlı seçimin, doğrulayıcıların güçlerine göre seçilmelerine olanak verdiğini unutmayın. Doğrulayıcının gücü ne kadar yüksek olursa, seçilme olasılığı da o kadar yüksek olur. Kaynak: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### Span İşlemini Kaydetme {#commit-span-tx}

Türü: **Bor işlemi**

Bor'da span kaydetmenin iki yolu vardır.

1. **Otomatik span değiştirme**

    Mevcut span'in sonunda, son sprint'in son blokunda, Bor bir sonraki span'i Heimdall'dan sorgular ve bir sistem çağrısı kullanarak bir sonraki span için doğrulayıcıları ve üreticileri belirler.

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

    Bor yeni üreticileri, sonraki blokları için blok üreticisi olarak kullanır.

2. **Zorla kaydetme**

    Heimdall üzerinde `span` teklif edildiğinde, eğer mevcut span sona ermeden önce span'in değiştirilmesi gerekiyorsa, doğrulayıcı span'i zorla gönderebilir. Bir `span` teklif edilen bir işlem, herhangi bir doğrulayıcı tarafından Bor'da kaydedilmelidir. Bunun ardından, Bor teklif edilen span'i bir sistem çağrısı kullanarak mevcut sprint'in sonunda günceller ve kaydeder.


## Durum yönetimi (State-sync) {#state-management-state-sync}

Durum yönetimi, durumu Ethereum zincirinden Bor zincirine gönderir. Buna `state-sync` denir. Bu, verileri Ethereum zincirinden Bor zincirine taşımanın bir yoludur.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### Durum gönderici {#state-sender}

Kaynak: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Durum eşitlemeyi başlatmak için, Ethereum zincirinde **durum gönderici sözleşmesinde** aşağıdaki yöntemi çağırın. `state-sync` mekanizması, temelde durum verilerini Ethereum zincirinden Bor'a taşımanın bir yoludur.

Ethereum zincirinden Bor zincirine `data` taşımak isteyen bir kullanıcı, `StateSender.sol` üzerinde `syncSate` yöntemini çağırır

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

Süreç tamamlandığında durum `data`'ini alan `receiver` sözleşmesi alt zincir üzerinde mevcut olmalıdır. `syncState`, `StateSynced` olayını Ethereum üzerinde yayımlar ve bu da aşağıdaki şekildedir:

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

Ethereum zinciri üzerindeki `stateSender` sözleşmesinde `StateSynced` olayı yayımlandığında, herhangi bir doğrulayıcı Heimdall üzerinde `MsgEventRecord` işlemini gönderir.

Bir işlemin Heimdall üzerinde onaylanmasından sonra, bir doğrulayıcı Bor üzerinde basit bir işlemle `proposeState` teklif eder ve sprint'in sonunda Bor bir `system` çağrısı kullanıp `commitState` işlevini çağırarak `state-sync`'i kaydeder ve kesinleştirir.

`commitState` sırasında, Bor, argüman olarak `stateId` ve `data` ile hedef sözleşme üzerinde `onStateReceive` işlevini yürütür.

### State receiver arabirimi {#state-receiver-interface}

Bor zinciri üzerindeki `receiver` sözleşmesi, aşağıdaki arabirimi uygulamalıdır.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Yalnızca `0x0000000000000000000000000000000000001001` - `StateReceiver.sol`'e, hedef sözleşme üzerindeki `onStateReceive` işlevini çağırma izni verilmelidir.

## İşlem hızı {#transaction-speed}

Bor şu anda 100 doğrulayıcı ve 4 blok üreticisi ile yaklaşık 2 ila 4 saniyelik blok süresiyle beklendiği gibi çalışmaktadır. Büyük sayıda işlemlerle çoklu gerilim testi yapıldıktan sonra, tam blok süresine karar verilecektir.

Sprint tabanlı bir mimarinin kullanılması, Bor'un mevcut sprint sırasında üretici değiştirmeden daha hızlı toplu bloklar oluşturmasına yardımcı olmaktadır. İki sprint arasında bir bekleme süresinin olması, diğer üreticilerin yayımlanmış bir bloku almalarına olanak sağlar ve buna da genellikle `producerDelay` denir

İki sprint arasındaki sürenin, çoklu üretici arasındaki gecikme sorunlarını azaltmak için normal blokların arabelleğe almasından daha uzun olduğunu unutmayın.

## Saldırılar {#attacks}

### Sansür {#censorship}

Bor, blokları daha hızlı oluşturmak için çok küçük bir üretici kümesi kullanır. Bu da Heimdall'a oranla sansür saldırılarına daha açık olduğu anlamına gelir. Bu sorunu gidermek adına, sistemde kabul edilebilir blok süresi için maksimum üretici sayısını bulmak amacıyla çoklu test yapılacaktır.

Bunun dışında birkaç saldırı daha mümkündür:

1. Bir üreticinin işlemi sansürlemesi

    Böyle bir durumda, işlemi gönderen bir sonraki üreticinin sprint'ini bekleyebilir ve işlemi tekrar göndermeye çalışabilir.

2. Tüm doğrulayıcıların topluca iş birliği halinde belirli bir işlemi sansürlemesi

    Böyle bir durumda, Polygon sistemi Ethereum zinciri üzerinde bir işlem gönderilmesi için bir yol sağlayacak ve doğrulayıcıların işlemi sıradaki `x` denetim noktasından birine dâhil etmelerini isteyecektir. Eğer doğrulayıcılar bu süre zarfında işlemi dâhil etmezse, kullanıcı doğrulayıcılara ceza kesintisi uygulayabilir. Bunun şu anda uygulanmadığını unutmayın.

### Sahtecilik {#fraud}

Üreticiler, sıraları geldiğinde geçersiz bir işlemi bloka dâhil edebilirler. Bu, birkaç düzeyde mümkün olabilir:

1. Tek bir üreticinin sahtecilik yapması

    Eğer bir üretici herhangi bir yükseklikte geçersiz bir işlemi d^hil ederse, diğer üreticiler bir çatallanma oluşturabilir ve kendi geçerli düğümleri geçersiz blokları görmezden geldiğinden o işlemi hariç tutabilir

2. Span üreticilerinin sahtecilik yapması

    Eğer diğer üreticiler bir çatallanma oluşturmazsa, bloku doğrulayan diğer doğrulayıcılar kendi çatallanmalarını oluşturarak span'i zorla değiştirebilirler. Bu şu anda uygulanmamaktadır, çünkü Geth'in dâhili olarak çalışmasını gerektirir. Ancak bu, gelecekteki yol haritamızda yer almaktadır.

3. Tüm doğrulayıcıların sahtecilik yapması

    Bu sistemin doğru bir şekilde çalışması için doğrulayıcıların ⅔+1'inin dürüst olması gerektiği varsayılmaktadır.
