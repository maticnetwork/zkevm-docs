---
id: core_concepts
title: Ключевые понятия
description: Bor — это цепочка состояния в архитектуре Polygon
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

# Ключевые понятия {#core-concepts}

Bor — это цепочка состояний в архитектуре Polygon. Bor — это форк Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) с новым консенсусом.

Источник: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## consensus {#consensus}

Bor использует новый улучшенный консенсус, вдохновленный [консенсусом Clique](https://eips.ethereum.org/EIPS/eip-225)

Более подробная информация о консенсусе и спецификациях: [Bor Consensus](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## genesis {#genesis}

Генезисный блок содержит всю необходимую информацию для настройки сети. По сути, это файл конфигурации для цепочки Bor. Чтобы загрузить цепочку Bor, пользователю необходимо указать местоположение файла в качестве параметра.

Bor использует `genesis.json` в качестве генезисного блока и параметров.  Вот пример для генеза `config`Bor:

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

[Конфигурация](https://www.notion.so/15ab7eb6e8124142a3641939762d6d67)

[Специальная конфигурация консенсуса](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## EVM/Solidity в качестве виртуальной машины (VM) {#evm-solidity-as-vm}

Bor использует немодифицированную EVM в качестве виртуальной машины для транзакции. Разработчики могут развернуть любой контракт, используя те же инструменты и компилятор Ethereum, что и `solc`, без каких-либо изменений.

## Matic как нативный токен (токен газа) {#matic-as-native-token-gas-token}

В Bor есть нативный токен Matic, аналогичный токену ETH в сети Ethereum. Его также называют токен газа. Этот токен работает аналогично тому, как токен ETH работает в сети Ethereum.

В дополнение к этому, Bor предоставляет встроенный обернутый токен ERC20 для нативного токена (аналогичный токену WETH), что означает, что приложения могут использовать обернутый токен MATIC ERC20 в своих приложениях без создания собственной обернутой версии ERC20 нативного токена Matic.

Обернутый токен ERC20 развертывается на `0000000000000000000000000000000000001010` как `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)` на Bor в качестве одного из контрактов genesis.

### Комиссии {#fees}

Нативный токен используется в качестве комиссии при совершении транзакции в Bor. Это предотвращает спам в Bor, стимулирует блок продюсеров поддерживать цепочку в течение более длительного периода и препятствует ненадлежащему поведению.

Отправитель транзакции определяет `GasLimit` и `GasPrice` для каждой транзакции и транслирует их на Bor. При запуске нода Bor, каждый продюсер может определить, какую минимальную цену на газ он готов принять, используя `--gas-price`. Если определяемая пользователем `GasPrice` в транзакции равна или превышает цену на газ, определенную продюсером, продюсер примет транзакцию и включит ее в следующий доступный блок. Это позволяет каждому продюсеру устанавливать собственные минимальные цены на газ.

Комиссия за транзакцию будет вычтена из счета отправителя в виде нативного токена.

Формула расчета комиссий за транзакцию:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

Собранные комиссии за все транзакции в блоке переводятся на аккаунт продюсера с помощью трансфера coinbase. Наличие большого объема в стейкинге повышает вероятность стать продюсером и позволит валидатору с высокой мощностью стейкинга получать больше наград (комиссий) соответственно.

### Логи трансферных квитанций {#transfer-receipt-logs}

Каждый совместимый с Plasma токен ERC20 в Bor добавляет специальный лог о получении трансфера. Токен Matic не является исключением.

`LogTransfer` — это специальный лог, который добавляется ко всем токенам ERC20/721, совместимым с Plasma.  Рассматривайте это как один UTXO с 2 входами и 2 выходами для трансфера.  Здесь `output1 = input1 - amount` и `output2 = input2 + amount`  Это позволяет защищенным от мошенничества контрактам Plasma проверять передачу токентов Matic ERC20 (в данном случае, нативных токенов) в цепочке Ethereum.

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

Поскольку токен MATIC — это нативный токен и не имеет токена Native ERC20, Bor добавляет журнал получения для каждого перевода для токена Native с использованием следующего кода Golang. Источник: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### Депозит нативного токена {#deposit-native-token}

Пользователь может получить нативный токен, внеся токены Matic в mainchain Ethereum на контракт `DepositManager` (развернутый в цепочке Ethereum). Источник: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

Используя токены `depositERC20`, пользователи могут перемещать токен Matic ERC20 (нативный токен) или любые другие токены ERC20 из цепочки Ethereum в цепочку Bor.

### Вывод нативного токена {#withdraw-native-token}

Вывод из сети Bor в сеть Ethereum работает точно так же, как и с любыми другими токенами ERC20. Пользователь может вызвать функцию `withdraw` контракта ERC20, развернутого на Bor, в `0000000000000000000000000000000000001010`, чтобы инициировать процесс вывода средств для него.  Источник: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## Встроенные контракты (контракты Genesis) {#in-built-contracts-genesis-contracts}

Bor основан на трех встроенных контрактах, часто называемых контрактами genesis. Эти контракты доступны в блоке 0. Источник: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

Эти контракты скомпилированы с помощью `solc --bin-runtime`. Например, следующая команда выдает скомпилированный код для `contract.sol`

```bash
solc --bin-runtime contract.sol
```

Контракт Genesis определяется в `genesis.json`. Когда Bor запускается с нулевого блока, он загружает все контракты с указанным кодом и балансом.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

Ниже приведены данные для каждого контракта генезиса.

### Набор валидаторов Bor {#bor-validator-set}

Источник: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

Развертывается в: `0x0000000000000000000000000000000000001000`

Контракт `BorValidatorSet.sol` управляет набором валидаторов для диапазонов. Наличие в контракте текущего набора валидаторов и информации о диапазоне позволяет другим контрактам использовать эту информацию. Поскольку Bor использует продюсеров из Heimdall (внешний источник), он использует системный вызов для изменения состояния контракта.

Для первого спринта все продюсеры определяются в `BorValidatorSet.sol` напрямую.

`setInitialValidators` вызывается, когда устанавливается второй диапазон. Поскольку Bor не поддерживает конструктор для контракта genesis, первый набор валидаторов должен быть установлен на карту `spans`.

Данные первого диапазона:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Определение контракта Solidity:

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

`proposeSpan` может быть вызван любым действительным валидатором с нулевой комиссией. Bor допускает, чтобы транзакция `proposeSpan` была бесплатной транзакцией, поскольку она является частью системы.

`commitSpan` вызывается через [системный вызов](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Получатель состояния {#state-receiver}

Источник: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

Развертывается в: `0x0000000000000000000000000000000000001001`

Контракт получателя состояния управляет входящими записями синхронизации состояния. Механизм `state-sync` — это способ перемещения данных о состоянии из цепочки Ethereum в Bor.

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

`proposeState` будет вызван любым действительным валидатором с нулевой комиссией. Bor допускает, чтобы транзакция `proposeState` была бесплатной транзакцией, поскольку она является частью системы.

`commitState` вызывается через [системный вызов](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Токен Matic ERC20 {#matic-erc20-token}

Источник: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

Развертывается в: `0x0000000000000000000000000000000000001010`

Это специальный контракт, который обрабатывает нативную монету (например, $ETH в Ethereum) и обеспечивает интерфейс токена ERC20. Пример: в этом `transfer`контракте передает нативные токены. `withdraw`Метод в токена ERC20 позволяет пользователям перенести свои токены из цепочки Bor в Ethereum.

Примечание: Этот контракт не поддерживает `allowance`. Это одинаково для каждого контракта токена ERC20.

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

## Системный вызов {#system-call}

Только системный адрес `2^160-2` позволяет выполнять системный вызов. Bor вызывает его внутри системы с системным адресом `msg.sender`. Он изменяет состояние контракта и обновляет корень состояния для определенного блока. На основе [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) и [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Системный вызов полезен для изменения состояния контракта без совершения какой-либо транзакции.

Ограничение: в настоящее время события, создаваемые системным вызовом, недоступны для наблюдения и не включаются ни в одну транзакцию или блок.

## Управление диапазоном {#span-management}

Диапазон (span) — это логически определенный набор блоков, для которого из всех доступных валидаторов выбирается набор валидаторов. Heimdall выбирает комитет продюсеров из всех валидаторов. Продюсеры будут включать подмножество валидаторов в зависимости от количества валидаторов в системе.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### Предложить транзакцию Span {#propose-span-transaction}

Тип: **Транзакция Heimdall**

Источник: [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx` устанавливает комитет валидаторов для заданных `span` в случае успешного включения транзакции. Одна транзакция для каждого диапазона должна быть включена в Heimdall. Он называется `spanProposeTx` на Heimdall. `spanProposeTx` должен быть возвращен, если его часто отправляют или в текущем комитете произошло изменение стейка не менее, чем на 33% (для заданного `span`).

Модуль `bor` на Heimdall обрабатывает управление диапазоном. Вот как Bor выбирает продюсеров из всех валидаторов:

1. Bor создает несколько слотов на основе мощности валидаторов. Пример: «А» с мощностью 10 будет иметь 10 слотов, «B» с мощностью 20 будет иметь 20 слотов.
2. Функция `shuffle` перемешивает все слоты, используя `seed`, и выбирает первых `producerCount` продюсеров. Модуль `bor` на Heimdall использует алгоритм перетасовки ETH 2.0 для выбора продюсеров из всех валидаторов. Каждый диапазон `n` использует хэш блока Ethereum (ETH 1.0) блока `n`,  как `seed`. Обратите внимание, что выбор на основе слотов позволяет валидаторам выбираться на основе их мощности. Валидатор с более высокой мощностью будет иметь более высокую вероятность быть выбранным. Источник: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### Фиксация диапазона передачи {#commit-span-tx}

Тип: **Транзакция Bor**

Есть два способа фиксации диапазона в Bor.

1. **Автоматическое изменение диапазона**

    В конце текущего диапазона, в последнем блоке последнего спринта, Bor запрашивает у Heimdall следующий диапазон и набор валидаторов и продюсеров для следующего диапазона с помощью системного вызова.

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

    Bor использует новых продюсеров в качестве блок продюсеров для своих следующих блоков.

2. **Принудительная фиксация**

    После того, как `span` предложен Heimdall, валидатор может форсировать проталкивание диапазона, если диапазон необходимо изменить до того, как текущий диапазон закончится. Транзакция для предложения `span` должна быть зафиксирована в Bor любым валидатором. Затем Бор обновляет и фиксирует предложенный диапазон в конце текущего спринта с помощью системного вызова.


## Управление состоянием (State-sync) {#state-management-state-sync}

Управление состоянием отправляет состояние из цепочки Ethereum в цепочку Bor. Это называется `state-sync`. Это способ переместить данные из цепочки Ethereum в цепочку Bor.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### Отправитель состояния {#state-sender}

Источник: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Чтобы синхронизировать управление состоянием, вызовите следующий метод **state sender contract** в цепочке Ethereum. Механизм `state-sync` — это способ перемещения данных о состоянии из цепочки Ethereum в Bor.

Пользователь, который хочет переместить `data` из контракта в цепочке Ethereum в цепочку Bor, вызывает метод `syncSate` на `StateSender.sol`

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

Контракт `receiver` должен присутствовать в дочерней цепочке, которая получает состояние `data` после завершения процесса. `syncState` генерирует событие `StateSynced` на Ethereum, которое выглядит следующим образом:

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

Как только событие `StateSynced` сгенерировано на контракте `stateSender` в цепочке Ethereum, любой валидатор отправляет транзакцию `MsgEventRecord` на Heimdall.

После подтверждения передачи на Heimdall валидатор предлагает `proposeState` на Bor с простой транзакцией, а в конце спринта Bor фиксирует и завершает `state-sync`, вызывая `commitState` с помощью `system` вызова.

В течение `commitState` Bor выполняет `onStateReceive`, с `stateId` и `data` в качестве аргументов по целевому контракту.

### Интерфейс получателя состояний {#state-receiver-interface}

`receiver` контракт в цепочке Bor должен реализовывать следующий интерфейс.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Только `0x0000000000000000000000000000000000001001` — `StateReceiver.sol` должно быть разрешено вызывать функцию `onStateReceive` в целевом контракте.

## Скорость транзакции {#transaction-speed}

В настоящее время Bor работает, как и ожидалось, со временем блока от ~2 до 4 секунд со 100 валидаторами и 4 блок продюсерами. После многократного стресс-тестирования с огромным количеством транзакций будет определено точное время блока.

Использование архитектуры на основе спринта помогает Bor быстрее создавать объемные блоки, не меняя продюсера во время текущего спринта. Задержка между двумя спринтами дает другим продюсерам возможность получать транслируемый блок, часто называемый `producerDelay`

Обратите внимание, что время между двумя спринтами больше, чем обычные блоки, что позволяет создать буфер для уменьшения задержек между несколькими продюсерами.

## Атаки {#attacks}

### Цензура {#censorship}

Bor использует очень небольшой набор продюсеров для создания более быстрых блоков. Это означает, что он подвержен большему количеству атак цензуры, чем Heimdall. Для решения этого будет проведено многократное тестирование, чтобы выяснить максимальное количество продюсеров для приемлемого времени блокировки в системе.

Кроме того, есть несколько возможных атак:

1. Один продюсер цензурирует транзакцию

    В этом случае отправитель транзакции может дождаться следующего спринта продюсера и попытаться повторно отправить транзакцию.

2. Все валидаторы вступают в сговор друг с другом и цензурируют конкретную транзакцию

    В этом случае система Polygon предоставит способ отправить транзакцию в цепочку Ethereum и попросить валидаторов включить транзакцию в следующие `x` checkpoint. Если валидаторы не смогут включить его в течение этого времени, пользователь может сократить валидаторов. Обратите внимание, что в настоящее время это не реализовано.

### Мошенничество {#fraud}

Продюсеры могут включить недействительную транзакцию в свой ход. Это возможно на нескольких уровнях:

1. Один продюсер является мошенником

    Если продюсер включает недопустимую транзакцию на любой высоте, другие продюсеры могут создать ответвление и исключить эту транзакцию, поскольку их действительный нод игнорирует недопустимые блоки

2. Продюсеры диапазонов являются мошенниками

    Если другие продюсеры не создают ответвление, другие валидаторы, проверяющие блок, могут принудительно изменить диапазон, создав собственное ответвление. В настоящее время это не реализовано, поскольку требует внутренней поддержки со стороны Geth. Тем не менее, это есть в наших планах.

3. Все валидаторы являются мошенниками

    Для правильной работы системы предполагается, что ⅔+1 валидаторов являются честными.
