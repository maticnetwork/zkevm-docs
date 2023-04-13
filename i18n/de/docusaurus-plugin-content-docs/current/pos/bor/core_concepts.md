---
id: core_concepts
title: Kernkonzepte
description: Bor ist eine State Chain in Polygon Architektur
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

# Kernkonzepte {#core-concepts}

Bor ist eine Status-Chain in der Polygon-Architektur. Es handelt sich um eine Fork von Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) mit einem Konsens, der Bor genannt wird.

Quelle: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## Konsens {#consensus}

Bor verwendet einen neuen verbesserten Konsens, der vom [Clique-Konsens](https://eips.ethereum.org/EIPS/eip-225) inspiriert ist  https://eips.ethereum.org/EIPS/eip-225

Weitere Details über [Konsens](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5) und Spezifikationen:

## genesis {#genesis}

Der Genesis-Block enthält alle wesentlichen Informationen, um das Netzwerk zu konfigurieren. Es handelt sich im Grunde um die Konfigurationsdatei für die Bor-Chain. Um die Bor-Chain zu starten, muss der Benutzer in den Speicherort der Datei als ein Parameter eintreten.

Bor verwendet `genesis.json` als Genesis-Block und -Parameter.  Hier ist ein Beispiel für Bor `config`genesis:

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

[Config](https://www.notion.so/15ab7eb6e8124142a3641939762d6d67)

[Konsensspezifische Konfiguration](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## EVM/Solidity als VM {#evm-solidity-as-vm}

Bor verwendet eine nicht-modifizierte EVM als VM für Transaktionen. Entwickler können jeden beliebigen Contract darauf einsetzen, indem sie dieselben Tools und Kompilierer wie `solc` ohne Änderungen verwenden.

## Matic als Nativer Token (Gas-Token) {#matic-as-native-token-gas-token}

Bor verwendet einen Matic-Token als nativen Token, ähnlich wie ETH bei Ethereum. Er wird oft Gas-Token genannt. Dieser Token funktioniert fehlerfrei genau wie ETH derzeit auf der Ethereum-Chain funktioniert.

Darüber hinaus stellt Bor einen eingebauten wrapped ERC20-Token für den nativen Token (ähnlich wie der WETH-Token) zur Verfügung, was bedeutet, dass Anwendungen den wrapped MATIC-ERC20-Token in ihren Anwendungen einsetzen können, ohne dass sie ihre eigene Version eines wrapped ERC20 des nativen Matic-Tokens erstellen müssen.

Der wrapped ERC20-Token wird bei `0000000000000000000000000000000000001010` als `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)` auf Bor als einer der Genesis-Contracts eingesetzt.

### Gebühren {#fees}

Der native Token wird zur Gebührenzahlung verwendet, während Transaktionen auf Bor geschickt werden. Diese verhindert Spam auf Bor und bietet Anreize für Blockproduzenten, um die Chain für einen längeren Zeitraum zu betreiben und sie von Fehlverhalten abzuhalten.

Der Sender einer Transaktion legt `GasLimit` und `GasPrice` für jede Transaktion fest und sendet sie auf Bor aus. Jeder Produzent kann den Mindest-Gaspreis festlegen, der für ihn akzeptabel ist, indem er `--gas-price` einsetzt, während er den Bor-Knoten startet. Wenn benutzerdefinierte `GasPrice` auf die Transaktion gleich oder höher ist als der Gaspreis, den der Produzent festgelegt hat, wird der Produzent die Transaktion bestätigen und sie in den nächsten verfügbaren Block einbeziehen. Dies macht es jedem Produzenten möglich, selbst einzustellen, wie hoch der Mindest-Gaspreis sein wird, den er verlangt.

Transaktionsgebühren werden vom Account des Senders in Form von nativen Token abgezogen.

Hier ist die Formel für Transaktionsgebühren:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

Die eingesammelten Gebühren aller Transaktionen werden in einem Block mittels eines Coinbase-Transfers auf den Account des Produzenten übertragen. Je mehr Staking-Macht du hast, desto höher ist die Wahrscheinlichkeit, dass du ein Produzent werden kannst, und Validatoren mit viel Staking-Macht werden dementsprechend mehr Prämien (in Form von Gebühren) einsammeln können.

### Übertragungsempfangsprotokolle {#transfer-receipt-logs}

Jeder Plasma-kompatible ERC20-Token auf Bor fügt ein spezielles Übertragungsempfangsprotokoll hinzu. Beim Matic-Token verhält es sich genauso.

`LogTransfer` ist ein spezielles Protokoll, das allen Plasma-kompatiblen ERC20/721-Token hinzugefügt wird.  Du kannst es als einen 2-Inputs-2-Outputs-UXTO für Übertragungen sehen.  Hier, `output1 = input1 - amount` und `output2 = input2 + amount`  Dies macht es möglich, dass Plasma-Anti-Betrugs-Contracts eine Übertragung von Matic-ERC20-Token (hier: native Token) auf die Ethereum-Chain verifizieren können.

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

Da MATIC Token der native Token ist und keinen Native ERC20-Token hat, fügt Bor den Quittungsprotokoll für jede Übertragung hinzu, die für Native Token mit dem folgenden Golang-Code gemacht wurde. Quelle: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### Nativen Token einzahlen {#deposit-native-token}

Benutzer können native Token empfangen, indem sie Matic-Token auf die Ethereum Mainchain in den `DepositManager`-Contract einzahlen (bereitgestellt auf der Ethereum-Chain). Quelle: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

Mithilfe von `depositERC20`-Token können Benutzer Matic-ERC20-Token (native Token) oder andere ERC20-Token von der Ethereum- auf die Bor-Chain verschieben.

### Native Token abheben {#withdraw-native-token}

Um Token von der Bor- auf die Ethereum-Chain abzuheben, wird genauso vorgegangen wie für alle anderen ERC20-Token. Benutzer können die `withdraw`-Funktion auf dem ERC20-Contract aufrufen, der auf Bor bei `0000000000000000000000000000000000001010`  bereitgestellt wird, um den Abhebungsvorgang für diesen einzuleiten.  Quelle: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## In-built Contracts (Genesis-Contracts) {#in-built-contracts-genesis-contracts}

Bor beginnt mit drei eingebauten Contracts, die oft Genesis-Contracts genannt werden. Diese Contracts sind beim Block 0 verfügbar. Quelle: [https://github.com/maticnetwork/genesis-Contracts](https://github.com/maticnetwork/genesis-contracts)

Diese Verträge werden mithilfe von `solc --bin-runtime` kompiliert. Beispiel: Der folgende Befehl sendet den kompilierten Code für `contract.sol` aus

```bash
solc --bin-runtime contract.sol
```

Der Genesis-Contract wird in `genesis.json` definiert. Wenn Bor bei Block 0 beginnt, lädt er alle Verträge mit dem besagten Code und Saldo.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

Im Folgenden sind die Details für jeden genesis aufgeführt.

### Bor-Validatoren-Auswahl {#bor-validator-set}

Quelle: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

Bereitgestellt unter: `0x0000000000000000000000000000000000001000`

Der `BorValidatorSet.sol`-Contract verwaltet die Validatoren-Auswahl für die Spannen. Wenn eine aktuelle Validatoren-Auswahl und Spannen-Information für einen Contract vorliegen, ermöglicht dies anderen Contracts, diese Information/en zu verwenden. Da Bor Produzenten von Heimdall (externe Quelle) einsetzt, verwendet es einen Systemaufruf, um den Contract-Status zu ändern.

Für den ersten Durchlauf werden alle Produzenten direkt in `BorValidatorSet.sol` definiert.

`setInitialValidators` wird aufgerufen, wenn die zweite Spanne eingestellt wurde. Da Bor den Konstruktor für den Genesis-Contract nicht unterstützt, muss die erste Validatoren-Auswahl auf die `spans`-Map hin ausgerichtet werden.

Die Details der ersten Spanne sind folgende:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Solidity-Contract-Definition:

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

`proposeSpan` kann von jedem gültigen Validator mit null Gebühren aufgerufen werden. Bor ermöglicht es, dass eine`proposeSpan` Transaktion gebührenfrei ist, da sie Teil des System ist.

`commitSpan` wird durch den [System-Call](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9) aufgerufen.

### Statusempfänger {#state-receiver}

Quelle: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

Bereitgestellt unter: `0x0000000000000000000000000000000000001001`

Der Statusempfänger-Contract verwaltet eingehende Status-Sync-Aufzeichnungen. Der `state-sync`-Mechanismus ist im Grunde eine Möglichkeit, Status-Daten von der Ethereum- auf die Bor-Chain zu verschieben.

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

`proposeState` wird von jedem gültigen Validator mit null Gebühren aufgerufen werden. Bor ermöglicht es, dass eine `proposeState`-Transaktion gebührenfrei ist, da sie Teil des System ist.

`commitState` wird durch den [System-Call](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9) aufgerufen.

### Matic-ERC20-Token {#matic-erc20-token}

Quelle: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

Bereitgestellt unter: `0x0000000000000000000000000000000000001010`

Dies ist ein spezieller Vertrag, der native Coin (wie $ETH in Ethereum) wickelt und eine ERC20-Token-Schnittstelle bereitstellt. Beispiel: `transfer`auf diesem Vertrag überträgt native Token. Die `withdraw`Methode in ERC20-Token ermöglicht es Benutzern, ihre Token von Bor in die Ethereum Chain zu verschieben.

Beachte: Dieser Contract unterstützt `allowance` nicht. Das ist für jeden plasma kompatiblen ERC20-Token-Vertrag gleich.

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

## System Call {#system-call}

Nur die Systemadresse, `2^160-2`, erlaubt es, einen Systemaufruf zu tätigen. Bor ruft ihn intern mit der Systemadresse als `msg.sender` auf. Dies ändert den Contract-Zustand und aktualisiert die State-Root für einen bestimmten Block. Inspiriert von [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) und [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Der Systemaufruf ist hilfreich, um von Status auf Contract zu wechseln, ohne eine Transaktion durchzuführen.

Einschränkung: Derzeit können Ereignisse, die mittels eines Systemaufrufs ausgelöst werden, nicht sichtbar gemacht werden und sind weder in einer Transaktion noch in einem Block enthalten.

## Spannen-Management {#span-management}

Eine Spanne ist eine logisch definierte Reihe von Blöcken, für welche eine Auswahl von Validatoren unter allen verfügbaren Validatoren ausgesucht wird. Heimdall wird das Komitee mit Produzenten aus allen Validatoren auswählen. Die Produzenten werden eine Unterauswahl an Validatoren enthalten, die von der Anzahl an Validatoren im System abhängt.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### Span Transaktion vorschlagen {#propose-span-transaction}

Typ: **Heimdall-Transaktion**

Quelle:  [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx` stellt das Validatoren-Komitee für eine bestimmte `span` fest, wenn die Transaktion erfolgreich aufgenommen wurde. Pro Spanne muss eine Transaktion in Heimdall aufgenommen werden. Diese wird auf Heimdall `spanProposeTx` genannt. `spanProposeTx` muss rückgängig gemacht werden, wenn sie häufig gesendet wurde oder wenn innerhalb des aktuellen Komitees (für die gegebene `span`) nicht weniger als 33 % Wechsel im Stake stattgefunden hat.

Das `bor`-Modul auf Heimdall ist zuständig für das Spannen-Management. Hier findest du heraus, wie Bor die Produzenten aus der Liste aller Validatoren auswählt:

1. Bor erstellt eine Vielzahl an Slots, die auf der „Validatoren-Kraft“ basieren. Beispiel: A mit einer Kraft von 10 wird 10 Slots haben, B mit einer Kraft von 20 wird 20 Slots haben.
2. Mithilfe aller Slots, mischt die -`shuffle`Funktion diese durch, indem sie `seed` verwendet und zuerst die `producerCount` -Produzenten auswählt.  Das `bor`-Modul auf Heimdall verwendet den ETH 2.0-Shuffle-Algorithmus, um die Produzenten aus der Gesamtheit der Validatoren auszuwählen. Jede `n`-Spanne verwendet den Block-Hash auf Ethereum-Block (ETH 1.0) `n`  als `seed`. Beachte, dass die auf Slots basierende Auswahl es den Validatoren ermöglicht, auf Grundlage ihrer Leistung ausgewählt zu werden. Der Validator mit höherer Leistung wird mit einer höheren Wahrscheinlichkeit ausgewählt werden. Quelle: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### Tx-Spanne einreichen {#commit-span-tx}

Typ: **Bor-Transaktion**

Es gibt zwei Möglichkeiten, um eine Spanne in Bor einzureichen.

1. **Automatischer Spannen-Wechsel**

    Am Ende der aktuellen Spanne, beim letzten Block des Durchlaufs, fragt Bor die nächste Spanne von Heimdall ab und stellt die Validatoren und Produzenten mithilfe eines Systemaufrufs für die nächste Spanne auf.

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

    Bor setzt neue Produzenten als Blockproduzenten für seine nächsten Blöcke ein.

2. **Forcierung einreichen**

    Sobald die `span` auf Heimdall vorgeschlagen wurde, kann der Validator die Spanne nach vorne forcieren, wenn die Spanne verändert werden muss, bevor die aktuelle Spanne endet. Eine Transaktion, mithilfe derer ein `span` vorgeschlagen werden kann, muss an Bor von einem Validator eingereicht werden. Bor aktualisiert dann die vorgeschlagene Spanne und reicht diese am Ende des aktuellen Durchlaufs ein, indem ein Systemaufruf getätigt wird.


## Statusmanagement (State-Sync) {#state-management-state-sync}

Statusmanagement sendet den Status von der Ethereum- auf die Bor-Chain. Dies wird `state-sync` genannt. Es ist eine Möglichkeit, Daten von der Ethereum- auf die Bor-Chain zu verschieben.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### Statussender {#state-sender}

Quelle: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Um State Sync zu synchronisieren, rufe folgende Methode eines **-Statussender-Contracts** auf der Ethereum-Chain auf. Der `state-sync`-Mechanismus ist im Grunde eine Möglichkeit, Status-Daten von der Ethereum- auf die Bor-Chain zu verschieben.

Benutzer, die `data` vom Contract auf der Ethereum-Chain auf die Bor-Chain verschieben wollen, rufen die `syncSate`-Methode auf `StateSender.sol` auf

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

Der `receiver` -Contract muss in der Child-Chain vorhanden sein, die den Status `data` erhält, sobald der Prozess abgeschlossen ist. `syncState` stellt das `StateSynced`-Ereignis auf Ethereum aus, welches sich folgendermaßen verhält:

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

Sobald das `StateSynced`-Ereignis auf dem `stateSender`-Contract auf der Ethereum-Chain ausgestellt wurde, sendet ein beliebiger Validator die `MsgEventRecord`-Transaktion auf Heimdall.

Nach Bestätigung eines tx auf Heimdall schlägt ein Validator `proposeState` auf Bor mit einer einfachen Transaktion am Ende des Durchlaufs vor; Bor reicht dann `state-sync` ein und stellt es fertig, indem es `commitState` mithilfe eines `system`-Calls aufruft.

Während `commitState`, führt Bor `onStateReceive`, mit `stateId` und `data` als Args, auf Target-Contract aus.

### Schnittstelle für den Statusempfänger {#state-receiver-interface}

`receiver`-Contractauf der Bor Chain muss die folgende Schnittstelle implementieren.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Nur `0x0000000000000000000000000000000000001001` – `StateReceiver.sol`, muss die Funktion `onStateReceive` auf dem Target-Contract aufrufen dürfen.

## Transaktionsgeschwindigkeit {#transaction-speed}

Derzeit funktioniert Bor wie erwartet, mit einer Blockzeit von ~2 bis 4 Sekunden Länge bei 100 Validatoren und 4 Blockproduzenten. Nach mehrfachen Belastungstests mit einer riesigen Anzahl an Transaktionen wird über die genaue Blockzeit entschieden.

Dank der Architektur, die auf einem Durchlaufsystem basiert, kann Bor schnellere Blockcluster generieren, ohne den Produzenten während des aktuellen Durchlaufs austauschen zu müssen. Findet zwischen zwei Durchläufen eine Verzögerung statt, veranlasst dies, dass andere Produzenten einen versendeten Block, oft als `producerDelay` bezeichnet, bekommen

Beachte, dass die Zeit zwischen zwei Durchläufen mehr als bei normalen Zwischenspeicher-Blöcken ist, um die Latenzprobleme zwischen mehreren Produzenten zu reduzieren.

## Angriffe {#attacks}

### Zensur {#censorship}

Bor verwendet eine sehr kleine Auswahl an Produzenten, um Blöcke schneller zu generieren. Dies bedeutet, dass es für Zensurangriffe anfälliger ist als Heimdall. Um dies in den Griff zu bekommen, werden mehrere Tests durchgeführt werden, um die maximale Anzahl an Produzenten für eine akzeptable Blockzeit im System herauszufinden.

Neben diesen sind außerdem einige wenige andere Angriffe denkbar:

1. Ein Produzent zensiert die Transaktion

    In diesem Fall kann der Transaktionssender auf den nächsten Produzentendurchlauf warten, um die Transaktion erneut zu senden.

2. Alle Validatoren machen gemeinsame Sache und zensieren eine bestimmte Transaktion

    In diesem Fall wird das Polygon-System eine Möglichkeit bieten, um eine Transaktion auf der Ethereum-Chain einzureichen und die Validatoren dazu auffordern, die Transaktion in die nächsten `x`-Checkpoints miteinzubeziehen. Wenn die Validatoren es nicht bewerkstelligen, die Transaktion in diesem Zeitfenster miteinzubeziehen, kann der Benutzer die Validatoren abstrafen. Beachte, dass dies derzeit noch nicht möglich ist.

### Betrug {#fraud}

Die Produzenten können während ihres Zuges eine ungültige Transaktion  miteinbeziehen. Dies kann auf mehreren Ebenen möglich sein:

1. Ein Produzent ist betrügerisch

    Wenn ein Produzent eine ungültige Transaktion in einer höheren Ebene einschließt, dann können andere Produzenten eine Fork anlegen und jene Transaktion ausschließen, da ihr gültiger Knoten ungültige Blöcke ignoriert

2. Die Spannen-Produzenten sind betrügerisch

    Wenn andere Produzenten keine Fork anlegen, können wiederum andere Validatoren, die den Block validieren, eine Änderung in der Spanne erzwingen, indem sie ihre eigene Fork anlegen. Dies ist derzeit nicht implementiert, da dafür diesselbe interne Funktionsweise wie bei Geth erforderlich ist. Es ist jedoch Bestandteil unserer zukünftigen Roadmap.

3. Alle Validatoren sind betrügerisch

    Wir gehen davon aus, dass ⅔+1-Validatoren ehrlich sein müssen, damit dieses System korrekt ausgeführt wird.
