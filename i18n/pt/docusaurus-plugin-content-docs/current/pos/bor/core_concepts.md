---
id: core_concepts
title: Conceitos principais
description: Bor é cadeia de estado na arquitetura do Polygon
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

# Conceitos principais {#core-concepts}

A BOR é uma chain de estado na arquitetura Polygon. É um fork da Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) com o consenso novo, denominado BOR.

Fonte: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## consensus {#consensus}

O Bor usa novo [consenso](https://eips.ethereum.org/EIPS/eip-225) melhorado, inspirado no consenso do Clique

Mais detalhes sobre consenso e especificações: [Consenso do Bor](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## génese {#genesis}

O bloco génese contém todas as informações essenciais para configurar a rede. É basicamente o ficheiro config para a chain BOR. Para inicializar a chain BOR, o utilizador precisa de passar a localização do ficheiro como um parâmetro.

A BOR usa `genesis.json`como bloco génese e parâmetros.  Aqui está um exemplo para a gênese do Bor `config`:

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

[Config específico de consenso](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## EVM/Solidity como VM {#evm-solidity-as-vm}

A BOR usa uma EVM não modificada como VM para a transação. Os programadores podem implantar qualquer contrato que desejem, utilizando as mesmas ferramentas da Ethereum e um compilador como `solc` sem quaisquer alterações.

## MATIC como token nativo (token de gás) {#matic-as-native-token-gas-token}

A BOR tem um token MATIC como token nativo, semelhante ao ETH na Ethereum. É frequentemente denominado token de gás. Este token funciona corretamente da mesma forma que o ETH funciona atualmente na chain Ethereum.

Além disso, a BOR fornece um wrapped token ERC-20 integrado para o token nativo (semelhante ao token WETH), o que significa que as aplicações podem utilizar o wrapped token ERC-20 MATIC nas suas aplicações sem criar a sua própria versão wrapped ERC-20 do token nativo MATIC.

O wrapped token ERC-20 é implantado em `0000000000000000000000000000000000001010` como `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)` na BOR, como um dos contratos génese.

### Taxas {#fees}

Os tokens nativos são usados como taxas ao enviar transações na BOR. Isto impede o spam na BOR e serve de incentivo para que os produtores de blocos executem a chain por um período mais longo, ao mesmo tempo que desencoraja o mau comportamento.

O remetente de uma transação define o `GasLimit` e o `GasPrice` para cada transação e transmite-a na BOR. Cada produtor pode definir o preço de gás mínimo que pode aceitar utilizando `--gas-price` ao iniciar o nó BOR. Se o `GasPrice` definido pelo utilizador na transação for igual ou superior ao preço do gás definido pelo produtor, este irá aceitar a transação e incluí-la no próximo bloco disponível. Isto permite que cada produtor aceite o seu próprio requisito de preço de gás mínimo.

As taxas de transação serão deduzidas da conta do remetente, em termos de token nativo.

Segue-se a fórmula para as taxas de transação:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

As taxas recolhidas para todas as transações de um bloco são transferidas para a conta do produtor utilizando a transferência coinbase. Uma vez que um maior poder de staking aumenta a probabilidade de se tornar produtor, um validador com maior poder de staking poderá obter mais recompensas (em termos de taxas).

### Registos de recibos de transferência {#transfer-receipt-logs}

Cada token ERC-20 compatível com Plasma que se encontre na BOR adiciona um registo especial de recibos de transferência. Neste caso, o token MATIC não é exceção.

`LogTransfer` é um registo especial que é adicionado a todos os tokens ERC-20/721 compatíveis com Plasma. Considere-o como uma UTXO de 2 entradas e 2 saídas para transferência.  Neste caso, `output1 = input1 - amount` e  `output2 = input2 + amount`. Isto permite que os contratos do plasma à prova de fraude verifiquem a transferência de tokens ERC-20 MATIC (aqui, token nativo) na chain Ethereum.

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

Como o token MATIC é o token nativo e não tem token ERC-20 Nativo, o Bor adiciona o log de recibos para cada transferência feita para token nativos usando o código do Golang seguindo o código. Fonte: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### Depositar um token nativo {#deposit-native-token}

Um utilizador pode receber um token nativo depositando tokens MATIC na mainchain Ethereum para o contrato `DepositManager` (implantado na chain Ethereum). Fonte: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

Utilizando tokens `depositERC20`, os utilizadores podem mover o token ERC-20 MATIC (token nativo) ou quaisquer outros tokens ERC-20 da chain Ethereum para a chain BOR.

### Retirar um token nativo {#withdraw-native-token}

A retirada da chain BOR para a chain Ethereum funciona exatamente como com quaisquer outros tokens ERC-20. O utilizador pode chamar a função `withdraw` no contrato ERC-20, implantado na BOR, em  `0000000000000000000000000000000000001010` para iniciar o processo de retirada do mesmo.  Fonte: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## Contratos integrados (contratos génese) {#in-built-contracts-genesis-contracts}

A BOR começa com três contratos integrados, frequentemente denominados contratos génese. Estes contratos estão disponíveis no bloco 0. Fonte: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

Estes contratos são compilados utilizando `solc --bin-runtime`. Por exemplo, o seguinte comando emite código compilado para `contract.sol`

```bash
solc --bin-runtime contract.sol
```

O contrato génese é definido em `genesis.json`. Quando começa no bloco 0, a BOR carrega todos os contratos com o código e o saldo mencionados.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

Abaixo estão os detalhes de cada contrato de gênese.

### Conjunto de validadores BOR {#bor-validator-set}

Fonte: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

Implantado em: `0x0000000000000000000000000000000000001000`

O contrato `BorValidatorSet.sol` gere o conjunto de validadores para spans. Ter o conjunto de validadores e informações sobre span atuais num contrato permite que outros contratos utilizem essas mesmas informações. Uma vez que a BOR usa produtores da Heimdall (fonte externa), esta usa a chamada do sistema para alterar o estado do contrato.

Para o primeiro sprint todos os produtores são definidos diretamente em `BorValidatorSet.sol`.

É feito CALL de `setInitialValidators` quando o segundo span está a ser definido. Dado que a BOR não suporta o construtor para o contrato génese, o primeiro conjunto de validadores tem de ser definido para o mapa `spans`.

Seguem-se os detalhes do primeiro span:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Definição do contrato Solidity:

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

`proposeSpan` pode ser chamado por qualquer validador válido sem taxas. A BOR permite que a transação `proposeSpan` seja uma transação gratuita, pois faz parte do sistema.

Está a ser feita CALL de `commitSpan` através da [CALL do sistema](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Destinatário do estado {#state-receiver}

Fonte: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

Implantado em: `0x0000000000000000000000000000000000001001`

O contrato destinatário do estado gere os registos de sincronização do estado recebidos. O mecanismo `state-sync` é basicamente uma maneira de mover os dados do estado da chain Ethereum para a BOR.

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

`proposeState` pode ser chamado por qualquer validador válido sem taxas. A BOR permite que a transação `proposeState` seja uma transação gratuita, pois faz parte do sistema.

Está a ser feita CALL de `commitState` através da [CALL do sistema](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Token ERC-20 MATIC {#matic-erc20-token}

Fonte: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

Implantado em: `0x0000000000000000000000000000000000001010`

Este é um contrato especial que envolve moeda nativa (como $ETH no Ethereum) e fornece uma interface de token ERC20. Exemplo: `transfer`neste contrato transfere tokens nativos. o `withdraw`método no token ERC20 permite que os utilizadores movam os seus tokens da Bor para a chain Ethereum.

Nota: este contrato não suporta `allowance`. Isto é mesmo para todos os contratos de token ERC-20 compatíveis com plasma.

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

## CALL de sistema {#system-call}

Apenas o endereço do sistema, `2^160-2`, permite fazer uma CALL de sistema. A BOR faz CALL deste, internamente, com o endereço do sistema como `msg.sender`. Altera o estado do contrato e atualiza a raiz de estado para um determinado bloco. Inspirado em [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) e [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

A chamada do sistema é útil para alterar o estado do contrato sem efetuar qualquer transação.

Limitação: atualmente, os eventos emitidos pela chamada do sistema não são observáveis e não estão incluídos em qualquer transação ou bloco.

## Gestão de span {#span-management}

Span é um conjunto de blocos logicamente definidos para os quais é escolhido um conjunto de validadores de entre todos os validadores disponíveis. A Heimdall irá selecionar o comité de produtores entre todos os validadores. Os produtores incluirão um subconjunto de validadores, dependendo do número de validadores no sistema.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### Propor Transação de Span {#propose-span-transaction}

Tipo: **transação Heimdall**

Fonte: [https://github.com/maticnetwork/heimdall/blob/developer/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx` define o comité de validadores para um determinado `span`, no caso da inclusão de transação com êxito. Na Heimdall é necessário incluir uma transação para cada span. É chamado `spanProposeTx` na Heimdall. `spanProposeTx` deve reverter se for enviado com frequência ou não houver menos de 33% de alteração do stake dentro do comité atual (para o `span` indicado).

O módulo `bor` da Heimdall é responsável pela gestão de span. Veja como a BOR escolhe os produtores de entre todos os validadores:

1. A BOR cria vários slots com base no poder dos validadores. Exemplo: A com poder 10 terá 10 slots, B com poder 20 terá 20 slots.
2. Com todos os slots, a função `shuffle` baralha-os usando `seed` e seleciona os primeiros produtores `producerCount`. O módulo `bor` da Heimdall usa o algoritmo de baralhamento ETH 2.0 para escolher produtores de entre todos os validadores. Cada span `n` usa o hash de bloco do bloco da Ethereum (ETH 1.0) `n` como `seed`. Note que a seleção baseada em slots permite que os validadores sejam selecionados com base no seu poder. O validador de maior poder terá uma maior probabilidade de ser selecionado. Fonte: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### Compromisso de span Tx {#commit-span-tx}

Tipo: **transação BOR**

Há duas maneiras de fazer o compromisso do span na BOR.

1. **Alteração automática do span**

    No final do span atual, no último bloco do último sprint, a BOR consulta o próximo span da Heimdall e os conjuntos de validadores e produtores para o próximo span, usando uma chamada do sistema.

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

    A BOR usa os novos produtores como produtores dos seus blocos seguintes.

2. **Forçar compromisso**

    Assim que o `span` é proposto na Heimdall, o validador pode forçar o span, se este tiver de ser alterado, antes que o span atual termine. Tem de ser feito o compromisso da transação para propor um `span` para a BOR por qualquer validador. Em seguida, a BOR atualiza e faz o compromisso do span proposto no final do sprint atual usando uma CALL do sistema.


## Gestão do estado (sincronização do estado) {#state-management-state-sync}

A gestão do estado envia o estado da chain Ethereum para a chain BOR. Isto chama-se `state-sync`. Trata-se de uma maneira de mover dados da chain Ethereum para a chain BOR.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### Remetente do estado {#state-sender}

Fonte: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Para efetuar a sincronização do estado, faça CALL do seguinte método **contrato de remetente do estado** na chain Ethereum. O mecanismo `state-sync` é basicamente uma maneira de mover os dados do estado da chain Ethereum para a BOR.

Um utilizador que queira mover `data` do contrato na chain Ethereum para a chain BOR faz CALL do método `syncSate` no `StateSender.sol`

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

O contrato `receiver` tem de estar presente na chain filha, que recebe os `data` do estado assim que o processo terminar. `syncState` emite um evento `StateSynced` na Ethereum, que é o seguinte:

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

Assim que o evento `StateSynced` é emitido no contrato `stateSender` da chain Ethereum, qualquer validador envia a transação `MsgEventRecord` na Heimdall.

Depois da confirmação de uma tx na Heimdall, um validador propõe o `proposeState` na BOR com a transação simples e, no final do sprint, a BOR faz o compromisso e finaliza a `state-sync` fazendo CALL de `commitState` através de uma CALL do `system`.

Durante o `commitState`, a BOR executa `onStateReceive`, com `stateId` e `data` como argumentos, no contrato de destino.

### Interface do destinatário do estado {#state-receiver-interface}

O contrato `receiver` na chain BOR tem de implementar a seguinte interface.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Apenas `0x0000000000000000000000000000000000001001` — `StateReceiver.sol` deve ter permissão para fazer CALL da função `onStateReceive` no contrato de destino.

## Velocidade de transação {#transaction-speed}

Atualmente, a BOR funciona como esperado com um tempo de bloco de ~2 a 4 segundos, com 100 validadores e 4 produtores de blocos. O tempo de bloco exato será decidido depois de múltiplos testes de stress com um número enorme de transações.

A utilização da arquitetura baseada em sprints ajuda a BOR a criar blocos em massa mais rápidos, sem alterar o produtor durante o sprint atual. A existência de um atraso entre dois sprints dá a outros produtores a oportunidade de receber um bloco difundido, muitas vezes denominado `producerDelay`

Note que o tempo entre dois sprints é maior do que o dos blocos normais para o buffer, para reduzir os problemas de latência entre múltiplos produtores.

## Ataques {#attacks}

### Censura {#censorship}

A BOR usa um conjunto muito pequeno de produtores para criar blocos mais rápidos. Isto significa que é propensa a mais ataques de censura do que a Heimdall. Para lidar com esta questão, serão efetuados múltiplos testes para descobrir o número máximo de produtores para um tempo de bloco aceitável no sistema.

Além disso, são possíveis alguns ataques:

1. Um produtor está a censurar a transação

    Neste caso, o remetente da transação pode esperar pelo sprint do produtor seguinte e tentar enviar a transação novamente.

2. Todos os validadores estão a agir em conluio e a censurar uma transação específica

    Neste caso, o sistema Polygon irá oferecer uma maneira de enviar uma transação na chain Ethereum e pedir aos validadores que incluam a transação nos `x` checkpoints seguintes. Se os validadores não a incluírem durante essa janela de tempo, o utilizador pode cortar os validadores. Note que este não é implementado atualmente.

### Fraude {#fraud}

Os produtores podem incluir uma transação inválida durante o seu turno. Isto pode ser possível a vários níveis:

1. Um produtor é fraudulento

    Se um produtor incluir uma transação inválida a qualquer altura, os outros produtores podem criar um fork e excluir a dita transação, uma vez que o seu nó válido ignora blocos inválidos

2. Os produtores de span são fraudulentos

    Se os outros produtores não criarem um fork, os outros validadores que estão a validar o bloco podem alterar forçosamente o span criando o seu próprio fork. Isto não está implementado atualmente, pois é necessário saber como a Geth funciona internamente. No entanto, faz parte dos nossos planos futuros.

3. Todos os validadores são fraudulentos

    Parte-se do pressuposto de que ⅔+1 dos validadores têm de ser honestos para fazerem funcionar corretamente este sistema.
