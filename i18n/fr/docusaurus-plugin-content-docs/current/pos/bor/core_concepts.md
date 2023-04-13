---
id: core_concepts
title: Les Concepts de Base
description: Bor est la chaîne d'état dans l'architecture Polygon
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

# Les Concepts de Base {#core-concepts}

Bor est la chaîne d'état dans l'architecture de Polygon. C'est une fourche de Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) avec un nouveau consensus appelé Bor.

Source: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)  

## consensus {#consensus}

Bor utilise un nouveau consensus amélioré, inspiré par [le consensus Clique](https://eips.ethereum.org/EIPS/eip-225)

Plus de détails sur le consensus et les spécifications: [Bor Consensus](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## genèse {#genesis}

La genèse du bloc contient toutes les informations essentielles pour configurer le réseau. C'est fondamentalement le fichier de configuration pour la chaîne de Bor. Pour démarrer la chaîne de Bor, l'utilisateur doit passer à l'emplacement du dossier en tant que param.

Bor utilise `genesis.json` comme un bloc de Genèse et de params. Voici un exemple pour la genèse Bor `config`:

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

[Une configuration spécifique du consensus](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## EVM/Solidity en tant que VM {#evm-solidity-as-vm}

Bor utilise un EVM non modifié comme une VM pour une transaction. Les développeurs peuvent déployer n'importe quel contrat qu'ils souhaitent en utilisant les mêmes outils et compilateur d'Ethereum comme `solc` sans aucune modification.

## Matic en tant que jeton Originaire (jeton de Gaz) {#matic-as-native-token-gas-token}

Bor a un jeton Matic en tant que jeton originaire similaire à ETH dans Ethereum. Il est souvent appelé jeton de gaz. Ce jeton fonctionne correctement en dépit de comment ETH fonctionne actuellement sur la chaîne Ethereum.

En outre, Bor fournit un jeton ERC20 enveloppé et intégré pour le jeton originaire (similaire à celui du jeton WETH), ce qui signifie que les applications peuvent utiliser un jeton MATIC ERC20 enveloppé dans leurs applications sans créer leur propre version d'ERC20 enveloppée du jeton originaire Matic.

Le jeton ERC20 enveloppé est déployé à `0000000000000000000000000000000000001010` en tant que `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)`sur Bor comme l'un des contrats de genèse.

### Frais {#fees}

Le jeton originaire est utilisé comme frais lors d'un envoie de transaction sur Bor. Cela empêche des spam sur Bor et fournit des avantages aux Producteurs de Bloc afin de faire fonctionner la chaîne pour une plus longue période et décourage les mauvais comportements.

`GasLimit`Un expéditeur de transaction définit       et       `GasPrice`pour chaque transaction et diffuse cela sur Bor. Chaque producteur peut définir la quantité du prix de gaz minimum qu'ils peuvent accepter d'utiliser `--gas-price` tout en démarrant le noeud de Bor. Si un utilisateur défini `GasPrice` sur la transaction est le même ou supérieur par rapport au prix du gaz défini par un producteur, le producteur acceptera la transaction et l'inclura dans le prochain bloc disponible. Cela authorise chaque producteur de permettre leur propre exigence sur le prix minimum de gaz.

Les frais de transaction seront déduits du compte de l'expéditeur en termes de jeton Originaire.

Voici la formule pour les frais de transaction:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

Les frais collectés pour toutes les transactions dans un bloc sont transférées au compte du producteur en utilisant le transfert de coinbase. Sachant qu'avoir plus de puissance de staking augmente votre probabilité de devenir un producteur, cela permettra à un validateur ayant un pouvoir de staking plus élevé de collecter plus de récompenses (en termes de frais) de façon approprié.

### Les registres du reçu de transfert {#transfer-receipt-logs}

Chaque jeton ERC20 compatible au Plasma sur Bor ajoute un registre de reçu du transfert spécial. Le jeton Matic n'est pas une exception à cela.

`LogTransfer`est un registre spécial qui est ajouté à tous les jetons ERC20/721 compatibles au plasma. Considérez-le comme une UTXO de 2-entrées-2-sorties pour le transfert. Ici, `output1 = input1 - amount` et `output2 = input2 + amount` Cela permet aux contrats de plasma résistant aux fraudes de vérifier un transfert des jetons Matic ERC20 (ici, un jeton Originaire ) sur la chaîne Ethereum.

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

Puisque, le jeton MATIC est le jeton natif et n'a pas de jeton Native ERC20, Bor ajoute un journal de réception pour chaque transfert effectué pour le jeton natif en utilisant le code Golang suivant. Source: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### Déposer un jeton originaire {#deposit-native-token}

Un utilisateur peut recevoir un jeton Originaire en déposant des jetons Matic sur la chaîne principale d'Ethereum vers `DepositManager` le contrat (déployé sur la chaîne d'Ethereum). Source: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

En utilisant `depositERC20` des jetons, les utilisateurs peuvent déplacer le jeton Matic ERC20 (jeton Originaire) ou n'importe quels autres jetons ERC20 de la chaîne Ethereum vers la chaîne de Bor.

### Retirer un jeton originaire {#withdraw-native-token}

Retirer de la chaîne de Bor vers la chaîne Ethereum fonctionne exactement comme tous les jetons ERC20. Un utilisateur peut appeller `withdraw` la fonction sur le contrat ERC20, déployé sur Bor, au `0000000000000000000000000000000000001010` pour initier le processus du retrait pour le même. Source: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## Des contrats intégrés (contrats de Genèse) {#in-built-contracts-genesis-contracts}

Bor commence avec trois contrats intégrés, souvent appelés des contrats de genèse. Ces contrats sont disponibles au bloc 0. Source: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

Ces contrats sont compilés en utilisant `solc --bin-runtime`. Exemple, la commande suivante émet un code compilé pour`contract.sol`

```bash
solc --bin-runtime contract.sol
```

Le contrat de genèse est défini dans `genesis.json`. Bor démarre au bloc 0, il charge tous les contrats avec le code et la balance mentionnés.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

Ci-dessous les détails pour chaque contrat de genèse.

### Ensemble de validateur de Bor {#bor-validator-set}

Source: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

Déployé sur: `0x0000000000000000000000000000000000001000`

`BorValidatorSet.sol`Le contrat gestionne l'ensemble de validateur pour les durées. Avoir un ensemble de validateur actuel et des informations de durée dans un contrat permet à d'autres contrats d'utiliser ces informations. Étant donné que Bor utilise des producteurs de Heimdall (source externe), il utilise l'appel de système pour modifier l'état du contrat.

Pour le premier sprint, tous les producteurs sont définis à l'intérieur `BorValidatorSet.sol` directement.

`setInitialValidators` est appelé lorsque la durée de la seconde est définie. Sachant que Bor ne supporte pas le constructeur pour le contrat de genèse, l'ensemble du premier validateur doit être défini sur `spans`map.

Les premiers détails de durée sont les suivants:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

La définition du contrat de Solidity:

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

`proposeSpan` peut être appelé par n'importe quel validateur valide sans aucun frais. Bor permet `proposeSpan` au transaction d'être une transaction libre puisque cela fait partie du système.

`commitSpan` est appelé à travers l'[appel de système](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Récepteur d'état {#state-receiver}

Source: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

Déployé sur: `0x0000000000000000000000000000000000001001`

Le contrat de récepteur d'état gestionne les enregistrements de synchronisation d'état entrants. Le `state-sync` mécanisme est fondamentalement un moyen de déplacer les données d'état de la chaîne d'Ethereum vers Bor.

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

`proposeState` peut être appelé par n'importe quel validateur valide sans aucun frais. Bor permet `proposeState` au transaction d'être une transaction libre puisque cela fait partie du système.

`commitState` est appelé à travers l'[appel de système](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Le jeton Matic ERC20 {#matic-erc20-token}

Source: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

Déployé sur: `0x0000000000000000000000000000000000001010`

Il s'agit d'un contrat spécial qui enveloppe la pièce native (comme $ETH dans Ethereum) et fournit une interface jeton ERC20. Exemple : `transfer`sur ce contrat transfère des jetons natifs. la `withdraw`méthode dans le jeton ERC20 permet aux utilisateurs de déplacer leurs jetons de Bor à la chaîne Ethereum.

Remarque: Ce contrat ne support pas `allowance`. Cela est la même pour chaque contrat de jeton ERC20 compatible au plasma.

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

## Appel de système {#system-call}

Seulement une adresse de système, `2^160-2`, permet de faire un appel de système. Bor fait l'appel en interne avec l'adresse de système comme `msg.sender`. Cela modifie le contrat d'état et met à jour le root d'état pour un bloc particulier. Inspiré de [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) et [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)   

L'appel de système est utile pour modifier l'état afin de faire un contrat sans faire aucune transaction.

Limitation: Actuellement, les événements qui sont émis par l'appel de système ne sont pas observables et ne sont pas inclus dans tout(e) transaction ou un bloc.

## La gestion de durée {#span-management}

La durée est un ensemble de blocs logiquement défini pour lequel un ensemble de validateurs est choisi parmi tous les validateurs disponibles. Heimdall sélectionnera le comité de producteurs parmi tous les validateurs. Les producteurs comprendront un sous-ensemble de validateurs en fonction du nombre de validateurs dans le système.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### Proposez la transaction Span {#propose-span-transaction}

Type: **Transaction d'Heimdall**     

Source: [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx` définit le comité des validateurs pour un `span` en cas d'inclusion de transaction réussie. Une transaction pour chaque durée doit être incluse dans Heimdall. Il est appelé  `spanProposeTx` sur Heimdall.  `spanProposeTx` doit revenir si c'est envoyer fréquement ou si il n'y a pas moins de 30% de monnaie en stake éffectué au sein du comité actuel (pour, vu `span`).

`bor` Le module sur Heimdall s'occupe de la gestion de durée. Voilà comment Bor choisit les producteurs parmi tous les validateurs:

1. Bor crée plusieurs fentes en fonction de la puissance des validateurs. Exemple: A avec la puissance 10 aura 10 fentes, B avec la puissance 20 aura 20 fentes.
2. Grâce aux fentes, `shuffle`la fonctionnalité les traite en utilisant `seed` et sélectionne les premiers `producerCount`producteurs. `bor`Le module  sur Heimdall utilise l'algorithme de traitement ETH 2.0 pour choisir les producteurs de tous les validateurs. Chaque durée `n` utilise l'identifiant du bloc d'Ethereum (ETH 1.0) `n` en tant que `seed`. Veuillez noter que la sélection basée sur les fentes permet aux validateurs d'être sélectionnés en fonction de leur puissance. Le validateur disposant de la plus grande puissance aura une probabilité plus élevée d'être sélectionné. Source: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### Engager la durée de Tx {#commit-span-tx}

Type: **Transaction de Bor**

Il existe deux moyens d'engager la durée dans Bor.

1. **Changement de durée automatique**

À la fin de la durée actuelle, au dernier bloc du dernier sprint, Bor fait une requête de la prochaine durée d'Heimdall et définit les validateurs et les producteurs pour la durée suivante en utilisant un appel de système.

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

Bor utilise de nouveaux producteurs comme des producteurs de bloc pour leurs prochains blocs.

2. **Engager la force**

Une fois que `span` proposé(e) sur Heimdall, le validateur peut forcer la durée si la durée doit être modifiée avant la fin de la durée actuelle. Une transaction pour proposer un(e) `span` doit être engagé(e) vers Bor par n'importe quel validateur. Bor met à jour et engage la durée proposée à la fin du sprint actuel en utilisant un appel de système.


## Une gestion d'état (State-sync) {#state-management-state-sync}

Une gestion d'état envoie l'état de la chaîne Ethereum vers la chaîne de Bor. Il est appelé `state-sync`. Il s'agit d'un moyen de déplacer des données de la chaîne d'Ethereum vers la chaîne de Bor.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### Expéditeur d'état {#state-sender}

Source: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Pour synchroniser la synchronisation d'état, appelez le ** contrat d'expéditeur d'état**  de la méthode suivante sur la chaîne d'Ethereum. Le `state-sync` mécanisme est fondamentalement un moyen de déplacer les données d'état de la chaîne d'Ethereum vers Bor.

Un utilisateur qui veut changer `data` de contrat sur la chaîne d'Ethereum vers la chaîne de Bor, appelle `syncSate` la méthode sur `StateSender.sol`

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

`receiver` contrat doit être présent sur la chaîne enfant, qui reçoit l'état `data` une fois que le processus est terminé. `syncState` émet `StateSynced` l'événement sur Ethereum, qui est le suivant:

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

Une fois que `StateSynced` l'événement est émis sur `stateSender` le contrat sur la chaîne Ethereum, n'importe quel validateur envoie `MsgEventRecord` la transaction sur Heimdall.

Après une confirmation d'un tx sur Heimdall, un validateur propose `proposeState`sur bor avec la simple transaction et à la fin du sprint, Bor engage et finalise `state-sync` en appelant `commitState` en utilisant     un `system`appel.  

Tout au long `commitState`, Bor exécute `onStateReceive`, avec `stateId` et `data` en tant que args, sur le contrat cible.

### L'interface du récepteur d'état {#state-receiver-interface}

`receiver`Le contrat sur la chaîne de Bor doit mettre en oeuvre l'interface suivante.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Seulement `0x0000000000000000000000000000000000001001` -  `StateReceiver.sol`, doit être autorisé à appeller `onStateReceive` la fonction sur le contrat cible.

## Vitesse de transaction {#transaction-speed}

Bor fonctionne actuellement comme prévu avec un temps de bloc de ~2 à 4 secondes avec 100 validateurs et 4 producteurs de bloc. Après plusieurs tests de résistance avec un grand nombre de transactions, le temps exacte de bloc sera décidé.

L'utilisation d'architecture basée sur sprint aide Bor à créer des volumes de blocs plus rapidement sans changer le producteur pendant le sprint actuel. Avoir un retard entre deux sprints donne aux autres producteurs de recevoir un bloc diffusé, souvent appelé comme `producerDelay`

Remarquez que le temps entre deux sprints est supérieure aux blocs normaux à protéger pour réduire les problèmes de latence entre plusieurs producteurs.

## Attaques {#attacks}

### Censure {#censorship}

Bor utilise un très petit ensemble de producteurs pour créer des blocs plus rapides. Cela signifie qu'il est sujet à plus d'attaques de censure que Heimdall. Pour faire face à cela, plusieurs tests seront effectués pour découvrir le nombre maximum de producteurs pour un temps de bloc acceptable dans le système.

En dehors de cela, il existe quelques attaques possibles:

1. Un producteur censure la transaction

Dans ce cas, l'expéditeur de la transaction peut attendre le prochain producteur du sprint et essayer d'envoyer la transaction à nouveau.

2. Tous les validateurs s'arrangent entre eux et censurent une transaction particulière

    Dans ce cas, le système de Polygon fournira un moyen de soumettre une transaction sur la chaîne Ethereum et demandera aux validateurs d'inclure la transaction dans les prochains `x` points de contrôle. Si les validateurs ne parviennent pas à l'inclure pendant l'intervalle de temps, l'utilisateur peut supprimer les validateurs. Remarquez que cela n'est pas actuellement implémenté.

### Fraude {#fraud}

Les producteurs peuvent inclure une transaction invalide pendant leur tour. Cela peut être possible à plusieurs niveaux:

1. Un producteur est frauduleux

     Si un producteur inclut une transaction invalide à n'importe quelle dimension, d'autres producteurs peuvent créer une fourchette et exclure cette transaction puisque leur nœud valide ignore les blocs invalides

2. Les producteurs de durée sont frauduleux

Si d'autres producteurs ne créent pas une fourche, d'autres validateurs qui valident le bloc peuvent changer avec force la durée en créant leur propre fourche. Cela n'est pas actuellement implémenté puisque cela nécessite le fonctionnement de Geth en interne. Cependant, c'est dans notre future feuille de route.

3. Tous les validateurs sont frauduleux

    L'hypothèse est que les validateurs de ⅔ +1 doivent être honnêtes pour faire fonctionner ce système correctement.
