---
id: core_concepts
title: Concetti fondamentali
description: Bor è la catena di stato nell'architettura Polygon
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

# Concetti fondamentali {#core-concepts}

Bor è una catena di stati nell'architettura Polygon. È un fork di Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) con un nuovo consensus chiamato Bor.

Fonte: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## consensus {#consensus}

Bor utilizza un nuovo consenso migliore, ispirato al [consenso di Clique](https://eips.ethereum.org/EIPS/eip-225)

Maggiori dettagli su consenso e specifiche: [Bor Consensus](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## genesi {#genesis}

Il blocco genesis contiene tutte le informazioni essenziali per configurare la rete. È fondamentalmente il file di configurazione per la catena Bor. Per avviare la catena Bor, l'utente deve passare nella posizione del file come parametro.

Bor utilizza `genesis.json` il blocco Genesis e i parametri. Ecco un esempio per la `config`genesi di Bor

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

[Configurazione](https://www.notion.so/15ab7eb6e8124142a3641939762d6d67)

[Configurazione specifica del consensus](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## EVM/Solidity come VM {#evm-solidity-as-vm}

Bor utilizza la EVM non modificata come VM per una transazione. Gli sviluppatori possono implementare qualsiasi contratto desiderino utilizzando gli stessi strumenti Ethereum e un compilatore come `solc` senza alcuna modifica.

## Matic come token nativo (Gas token) {#matic-as-native-token-gas-token}

Bor ha un token Matic come token nativo simile a ETH in Ethereum. Viene spesso chiamato il token gas. Attualmente, questo token funziona correttamente nella stessa maniera di come ETH funziona sulla catena di Ethereum.

In aggiunta, Bor fornisce un token ERC20 incapsulato integrato per il token nativo (simile al token WETH), il che significa che le applicazioni possono utilizzare il token MATIC ERC20 incapsulato nelle loro applicazioni senza creare la propria versione ERC20 incapsulata del token nativo Matic.

Il token ERC20 incapsulato viene distribuito `0000000000000000000000000000000000001010` come `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)` su Bor come uno dei contratti di genesi.

### Commissioni {#fees}

Un token nativo è utilizzato come commissioni durante l'invio di una transazione su Bor. Questo impedisce lo spam su Bor e incentiva i produttori di blocchi affinché eseguano la catena per un periodo più lungo e scoraggia comportamenti scorretti.

Un mittente della transazione definisce `GasLimit` e `GasPrice` per ogni transazione e la invia su Bor. Ogni produttore può definire quanto gas price minimo possono accettare utilizzando `--gas-price` durante l'avvio di un nodo Bor. Se il `GasPrice` definito dall'utente sulla transazione è uguale o maggiore del gas price definito dal produttore, il produttore accetterà la transazione e la includerà nel successivo blocco disponibile. Ciò permette a ciascun produttore di stabilire il proprio requisito di gas price minimo.

Le commissioni di transazione saranno dedotte dall'account del mittente in termini di token nativo.

Ecco la formula per le commissioni delle transazioni:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

Le commissioni raccolte per tutte le transazioni in un blocco vengono trasferite sull'account del produttore utilizzando il trasferimento di coinbase. Poiché avere più potere di staking aumenta le tue probabilità di diventare un produttore, esso consentirà a un validatore con un potere di staking elevato di raccogliere più premi (in termini di commissioni) di conseguenza.

### Log delle ricevute di trasferimento {#transfer-receipt-logs}

Ogni token ERC20 compatibile con Plasma su Bor aggiunge uno speciale log delle ricevute di trasferimento. Il token Matic non fa eccezione.

`LogTransfer` è un log speciale che viene aggiunto a tutti i token ERC20/721 compatibili con il plasma. Consideralo come un UTXO da 2 ingressi-2 uscite per il trasferimento Qui, `output1 = input1 - amount` e `output2 = input2 + amount`  Ciò consente ai contratti a prova di frode plasma di verificare un trasferimento di token Matic ERC20 (qui, token nativo) sulla catena di Ethereum.

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

Poiché il token MATIC è il token nativo e non dispone di token nativo ERC20, Bor aggiunge il log di ricevuta per ogni trasferimento effettuato per il token nativo utilizzando il codice Golang. Fonte: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### Deposita token nativi {#deposit-native-token}

Un utente può ricevere token nativi depositando token Matic sulla catena principale di Ethereum nel contratto `DepositManager` (distribuito sulla catena di Ethereum). Fonte: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

Utilizzando token `depositERC20`, gli utenti possono spostare il token Matic ERC20 (token nativo) o qualsiasi altro token ERC20 dalla catena Ethereum alla catena Bor.

### Prelevare token nativi {#withdraw-native-token}

Il prelievo dalla catena di Bor alla catena di Ethereum funziona esattamente come qualsiasi altro token ERC20. Un utente può chiamare la funzione `withdraw` sul contratto ERC20, distribuito su Bor, a `0000000000000000000000000000000000001010` per avviare il processo di recesso per lo stesso. [Fonte](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61): https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## Contratti integrati (contratti Genesis) {#in-built-contracts-genesis-contracts}

Bor inizia con tre contratti integrati, spesso chiamati contratti genesi. Questi contratti sono disponibili al blocco 0. Fonte: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

Questi contratti sono compilati utilizzando `solc --bin-runtime`. Esempio, il comando seguente emette codice compilato per `contract.sol`

```bash
solc --bin-runtime contract.sol
```

Il contratto Genesis è definito in `genesis.json`. Quando bor inizia al blocco 0, carica tutti i contratti con il codice e il saldo menzionati.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

Di seguito sono riportati i dettagli per ogni contratto di genesi.

### Set di validatori bor {#bor-validator-set}

Fonte: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

Distribuito presso: `0x0000000000000000000000000000000000001000`

Il contratto `BorValidatorSet.sol` gestisce il set di validatori per gli intervalli. Avere un validatore corrente impostato e raggruppare le informazioni in un contratto consente ad altri contratti di utilizzare tali informazioni. Poiché Bor usa i produttori di Heimdall (fonte esterna), utilizza la chiamata di sistema per modificare lo stato del contratto.

Per il primo sprint tutti i produttori sono definiti in `BorValidatorSet.sol` direttamente.

`setInitialValidators` viene chiamato quando viene impostato il secondo span. Poiché Bor non supporta il costruttore per il contratto di genesi, il primo set di validatori deve essere impostato sulla mappa `spans`.

I dettagli del primo span sono i seguenti:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Definizione di contratto Solidity:

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

`proposeSpan`può essere chiamato da qualsiasi validatore valido con zero commissioni. Bor consente alla transazione `proposeSpan` di essere una transazione gratuita poiché fa parte del sistema.

`commitSpan` viene chiamato tramite la [chiamata di sistema](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Ricevitore dello stato {#state-receiver}

Fonte: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

Distribuito presso: `0x0000000000000000000000000000000000001001`

Il contratto del ricevitore dello stato gestisce i record di sincronizzazione dello stato in entrata. Il meccanismo `state-sync` è fondamentalmente un modo per spostare i dati di stato dalla catena di Ethereum a Bor.

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

`proposeState`può essere chiamato da qualsiasi validatore valido con zero commissioni. Bor consente alla transazione `proposeState`  di essere una gratuita poiché fa parte del sistema.

`commitState` viene chiamato tramite la [chiamata di sistema](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Token Matic ERC20 {#matic-erc20-token}

Fonte: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

Distribuito presso: `0x0000000000000000000000000000000000001010`

Questo è un contratto speciale che avvolge la moneta nativa (come $ETH in Ethereum) e fornisce un'interfaccia di token ERC20. Esempio: `transfer`in questo contratto trasferisce i token nativi. Il `withdraw`metodo in ERC20 consente agli utenti di spostare i propri token dalla catena di Bor alla Ethereum.

Nota: questo contratto non supporta `allowance`Questo è lo stesso per ogni contratto di token compatibile al plasma.

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

## Chiamata di sistema {#system-call}

Solo l'indirizzo di sistema, `2^160-2`, consente di effettuare una chiamata di sistema. Bor lo chiama internamente con l'indirizzo di sistema come `msg.sender`. Cambia lo stato del contratto e aggiorna la root dello stato per un blocco particolare. Ispirato da [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) e [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

La chiamata di sistema è utile per cambiare lo stato in contratto senza effettuare alcuna transazione.

Limitazione: attualmente gli eventi emessi da una chiamata di sistema non sono osservabili e non sono inclusi in alcuna transazione o blocco.

## Gestione di Span {#span-management}

Span è un insieme logicamente definito di blocchi per il quale viene scelto un insieme di validatori tra tutti i validatori disponibili. Heimdall selezionerà il comitato dei produttori di tutti i validatori. I produttori includeranno un sottoinsieme di validatori a seconda del numero di validatori nel sistema.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### Proporre la transazione di Span {#propose-span-transaction}

Tipo: **transazione Heimdall**

Fonte: [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx` imposta il comitato dei validatori per un dato `span` in caso di inclusione di transazione riuscita. Una transazione per ogni span deve essere inclusa in Heimdall. Si chiama `spanProposeTx` su Heimdall. `spanProposeTx` deve essere annullato se viene inviato frequentemente o se si è verificata una variazione di stake non inferiore al 33% all'interno del comitato attuale (per, dato `span`).

Il modulo `bor` su Heimdall si occupa della gestione dello span. Ecco come Bor sceglie i produttori tra tutti i validatori:

1. Bor crea più slot in base alla potenza dei validatori. Esempio: A con potenza 10 avrà 10 slot, B con potenza 20 avrà 20 slot.
2. Con tutti gli slot, la funzione `shuffle` li mescola utilizzando `seed` e seleziona i primi `producerCount` produttori. Il modulo  `bor` su Heimdall utilizza l'algoritmo shuffle ETH 2.0 per scegliere i produttori tra tutti i validatori. Ogni span `n` utilizza l'hash del blocco di Ethereum (ETH 1.0) `n`  come `seed`. Si noti che la selezione basata sugli slot consente ai validatori di essere selezionati in base alla loro potenza. Il validatore di potenza maggiore avrà una probabilità maggiore di essere selezionato. Fonte: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### Eseguire il commit dello span Tx {#commit-span-tx}

Tipo: **transazione Bor**

Ci sono due modi per eseguire il commit dello span in Bor.

1. **Cambio automatico dello span**

    Alla fine dello span corrente, nell'ultimo blocco dell'ultimo sprint, Bor interroga lo span successivo da Heimdall e imposta validatori e produttori per lo span successivo utilizzando una chiamata di sistema.

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

    Bor usa nuovi produttori come produttori di blocchi per i loro blocchi successivi.

2. **Forzare il commit**

    Una volta proposto `span` su Heimdall, il validatore può forzare lo span di spinta nel caso sia necessario modificare lo span prima della fine dello span corrente. Una transazione per proporre un `span` deve essere affidata a Bor da qualsiasi validatore. Bor quindi aggiorna e conferma lo span proposto alla fine dello sprint corrente utilizzando una chiamata di sistema.


## Gestione dello stato (State-sync) {#state-management-state-sync}

La gestione dello stato invia lo stato dalla catena di Ethereum alla catena di Bor. Viene chiamato `state-sync`. Questo è un modo per spostare i dati dalla catena di Ethereum alla catena di Bor.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### Mittente dello stato {#state-sender}

Fonte: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Per sincronizzare la sincronizzazione dello stato, chiamare il seguente metodo **contratto del mittente dello stato** sulla catena di Ethereum. Il meccanismo `state-sync` è fondamentalmente un modo per spostare i dati di stato dalla catena di Ethereum a Bor.

Un utente, che vuole spostare `data` dal contratto sulla catena di Ethereum alla catena di Bor, chiama il metodo `syncSate` su `StateSender.sol`

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

Il contratto `receiver` deve essere presente sulla catena figlio, che riceve lo stato `data` una volta completato il processo. `syncState` emette un evento `StateSynced` su Ethereum, che è il seguente:

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

Una volta che l'evento `StateSynced` è stato emesso sul contratto `stateSender` sulla catena di Ethereum, qualsiasi validatore invia una transazione `MsgEventRecord` su Heimdall.

Dopo la conferma di un tx su Heimdall, un validatore propone `proposeState` su Bor con la transazione semplice e alla fine dello sprint Bor esegue il commit e finalizza `state-sync` chiamando `commitState` utilizzando una chiamata `system`.

Durante `commitState`, Bor esegue `onStateReceive`, con `stateId` e `data` come args, sul contratto target.

### Interfaccia del ricevitore di stato {#state-receiver-interface}

Il contratto `receiver` sulla catena Bor deve implementare la seguente interfaccia.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Solo `0x0000000000000000000000000000000000001001` — `StateReceiver.sol`, deve essere autorizzato a chiamare la funzione `onStateReceive` sul contratto target.

## Velocità delle transazioni {#transaction-speed}

Bor attualmente funziona come previsto con un tempo di blocco di circa 2-4 secondi con 100 validatori e 4 produttori di blocchi. Dopo molteplici stress test con un numero enorme di transazioni, verrà deciso il tempo di blocco esatto.

L'uso dell'architettura basata su sprint aiuta Bor a creare blocchi di massa più veloci senza cambiare il produttore durante lo sprint corrente. Avere un ritardo tra due sprint dà ad altri produttori la possibilità di ricevere un blocco trasmesso, spesso chiamato come `producerDelay`

Si noti che il tempo tra due sprint è superiore ai normali blocchi da salvare nel buffer per ridurre i problemi di latenza tra più produttori.

## Attacchi {#attacks}

### Censura {#censorship}

Bor utilizza un gruppo molto ristretto di produttori per creare blocchi più veloci. Significa che è soggetto a più attacchi di censura rispetto a Heimdall. Per farvi fronte, verranno eseguiti più test per scoprire il numero massimo di produttori per un tempo di blocco accettabile nel sistema.

A parte questo ci sono pochi attacchi possibili:

1. Un produttore sta censurando la transazione

    In tal caso, il mittente della transazione può attendere lo sprint del produttore successivo e provare a inviare nuovamente la transazione.

2. Tutti i validatori sono in collusione tra loro e censurano particolari transazioni

    In questo caso, il sistema Polygon fornirà un modo per inviare una transazione sulla catena di Ethereum e chiedere ai validatori di includere la transazione nei prossimi checkpoint `x`. Se i validatori non riescono a includerlo durante quel lasso di tempo, l'utente può tagliare i validatori. Si noti che questo non è attualmente implementato.

### Truffe {#fraud}

I produttori possono includere una transazione non valida durante il loro turno. Può essere possibile a più livelli:

1. Un produttore è fraudolento

    Se un produttore include una transazione non valida a qualsiasi altezza, altri produttori possono creare un fork ed escludere quella transazione poiché il loro nodo valido ignora i blocchi non validi

2. I produttori di Span sono fraudolenti

    Se altri produttori non creano un fork, altri validatori che stanno convalidando il blocco possono modificare forzatamente lo span creando il proprio fork. Questo non è attualmente implementato poiché richiede il funzionamento interno di Geth. Tuttavia, questo è nella nostra tabella di marcia futura.

3. Tutti i validatori sono fraudolenti

Il presupposto è che i ⅔+1 dei validatori debbano essere onesti per far funzionare correttamente questo sistema.
