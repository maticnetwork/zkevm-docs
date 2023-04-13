---
id: core_concepts
title: コアコンセプト
description: BorはPolygonアーキテクチャのステートチェーンです。
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

# コアコンセプト {#core-concepts}

Borは、Polygonアーキテクチャの状態チェーンです。これは、Borと呼ばれる新しいコンセンサスを使用したGethのフォーク[https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum)です。

出典：[https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## consensus {#consensus}

Borは[、Cliqueの](https://eips.ethereum.org/EIPS/eip-225)コンセンサスに触発された新しい改善されたコンセンサスを使用しています。

コンセンサスと仕様の詳細：[Borコンセンサス](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## genesis {#genesis}

ジェネシスブロックには、ネットワークを構成するのに必要な情報がすべて含まれています。これは基本的にBorチェーンのための設定ファイルです。Borチェーンを起動するには、パラメータとしてファイルの場所に渡す必要があります。

Borは、をジェネシスブロックとパラメータとして`genesis.json`を使用します。Borのジェネシスの例を示します`config`：

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

[設定](https://www.notion.so/15ab7eb6e8124142a3641939762d6d67)

[コンセンサス特有の設定](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## VMとしてのEVM/Solidity {#evm-solidity-as-vm}

Borは、変更されていないEVMをトランザクション用にVMとして使用します。開発者は、変更を加えることなく、`solc`と同じEthereumツールとコンパイラを使用して、任意のコントラクトをデプロイできます。

## ネイティブトークンとしてのMatic（ガス用トークン） {#matic-as-native-token-gas-token}

Borには、EthereumのETHに似た、ネイティブトークンとしてMaticトークンがあります。これはよくガス用トークンと呼ばれます。このトークンは、Ehtereumチェーンで現在ETHが果たしている役割と全く同様に機能します。

これに加え、Borは、ネイティブトークン用に内蔵されたラップされたERC20トークン（WETHトークンと似たもの）を提供しています。これはつまり独自のラップされたERC20バージョンのMaticネイティブトークンを作成することなく、アプリケーションがラップされたMATIC ERC20トークンをそのアプリケーションで使用できるということです。

ラップされたERC20トークンは、`0000000000000000000000000000000000001010`で`[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)`としてジェネシスコントラクトの一つとしてBor上でデプロイできます。

### 手数料 {#fees}

ネイティブトークンはBor上でトランザクションを送信する際の手数料として使用します。これにより、Bor上のスパムを防止し、ブロックプロデューサにインセンティブを提供し、チェーンをより長時間にわたり実行し、悪意ある行動を起こさせないようにします。

トランザクションの送信者は、各トランザクションに`GasLimit`と`GasPrice`を定義し、Bor上で配信します。各プロデューサは、Borノードを開始する一方で`--gas-price`を使用して、受け取る最低ガス価格を定義することができます。トランザクションでユーザーが定義した`GasPrice`、プロデューサが定義したガス価格以上の場合、プロデューサはトランザクションを受け入れ、次の可能なブロックにそのトランザクションを含めます。これにより、各プロデューサが独自の最低ガス価格の要件を持つことができるようになります。

トランザクション手数料は、ネイティブトークンで送信者のアカウントから引き落とされます。

以下は、トランザクション手数料の公式です：

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

すべてのトランザクションでブロックに集められた手数料は、Coinbase転送を使用して、プロデューサのアカウントに転送されます。より多くのステーキングパワーを持つことはプロデューサになる可能性が増すため、多くのステーキングパワーを持つバリデータが（手数料に関し）より多くの報酬を得ることができます。

### 転送受領ログ {#transfer-receipt-logs}

Bor上の各Plasma互換ERC20トークンは、特別な転送受領ログを追加します。Maticトークンもこれに関して例外ではありません。

`LogTransfer`は、すべてのPlasma互換ERC20/721トークンに追加された特別なログです。転送用の2入力2出力のUTXOと考えてください。ここに`output1 = input1 - amount`と`output2 = input2 + amount`があります。これによりPlasma fraud-proofコントラクトがEthereumチェーン上でMatic ERC20トークン（ここではネイティブトークン）の転送を確認できます。

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

MATICトークンがネイティブトークンであり、Native ERC20トークンを持っていないため、次のGolangコードを使用してNativeトークンのために行われた転送ごとにレシートログを追加します。出典：[https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### ネイティブトークンの預け入れ {#deposit-native-token}

ユーザーは、Ethereumメインチェーン上のMaticトークンを（Ethereumチェーン上にデプロイされた）`DepositManager`コントラクトに預け入れることにより、ネイティブトークンを受け取ることができます。出典：[https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

`depositERC20`トークンを使用して、ユーザーはMatic ERC20トークン（ネイティブトークン）あるいは他のERC20トークンをEthereumチェーンからBorチェーンに移動することができます。

### ネイティブトークンの引き出し {#withdraw-native-token}

BorチェーンからEtherumチェーンへの引き出しは、他のERC20トークンと全く同様に機能します。ユーザーは、同様の引き出しプロセスを開始するために、Borにデプロイされた、`0000000000000000000000000000000000001010`で、ERC20コントラクトで`withdraw`機能を呼び出すことができます。出典：[https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## 内蔵コントラクト（ジェネシスコントラクト） {#in-built-contracts-genesis-contracts}

Borは、しばしばジェネシスコントラクトと呼ばれる三つの内蔵コントラクトでスタートします。これらのコントラクトは、ブロック0で利用可能です。出典：[https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

これらのコントラクトは`solc --bin-runtime`を使用してコンパイルされます。例えば、次のコマンドは、`contract.sol`用のコンパイルされたコードを出します。

```bash
solc --bin-runtime contract.sol
```

ジェネシスコントラクトは`genesis.json`で定義されます。Borがブロック0でスタートするとき、記載されたコードと残高を含むすべてのコントラクトを読み込みます。

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

各ジェネシス契約の詳細は下記にあります。

### Borバリデータセット {#bor-validator-set}

出典：[https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

`0x0000000000000000000000000000000000001000`でデプロイされます。

`BorValidatorSet.sol`コントラクトはスパン用のバリデータセットを管理します。現在のバリデータセットとスパン情報をコントラクトに持っていることで、他のコントラクトがその情報を使用することを可能にします。Borは、Heimdall（外部ソース）からのプロデューサを使用するため、コントラクトの状態を変更するシステム呼び出しを使用します。

最初のスプリントでは、すべてのプロデューサは直接`BorValidatorSet.sol`に定義されています。

2番目のスパンが設定されるときに、`setInitialValidators`が呼び出されます。Borは、ジェネシスコントラクトのコンストラクタをサポートしていないため、最初のバリデータセットを`spans`マップに設定する必要があります。

最初のスパンの詳細は以下のとおりです：

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Solidityコントラクトの定義：

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

`proposeSpan`は、手数料不要の有効なバリデータによって呼び出すことができます。システムの一部であるため、Borにより、`proposeSpan`トランザクションは、無料のトランザクションになります。

`commitSpan`は、[システムコール](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9)を通じて呼び出されます。

### 状態レシーバ {#state-receiver}

出典：[https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

`0x0000000000000000000000000000000000001001`でデプロイされます。

状態レシーバコントラクトは、受信する状態同期レコードを管理します。この`state-sync`メカニズムは基本的に、状態データをEthereumチェーンからBorに移動させる方法です。

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

`proposeState`は、手数料不要の有効なバリデータにより呼び出すことができます。システムの一部であるため、Borにより、`proposeState`トランザクションは、無料トランザクションができます。

`commitState`は、[システムコール](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9)を通じて呼び出されます。

### MaticERC20トークン {#matic-erc20-token}

出典：[https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

`0x0000000000000000000000000000000000001010`でデプロイされます。

これはネイティブコイン（Ethereumで$ETHのような）をラップし、ERC20トークンインターフェースを提供する特別なコントラクトです。例：このコントラクトでネイティブトークン`transfer`が転送されます。ERC20トークンで`withdraw`メソッドを使用すると、BorからEthereumチェーンにトークンを移動することができます。

注意：このコントラクトは`allowance`をサポートしていません。これは、すべてのプラズマ互換性のあるERC20トークンコントラクトで同じです。

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

## システムコール {#system-call}

`2^160-2`システムアドレスだけが、システムコールが可能です。Borは、内部でシステムアドレスを`msg.sender`として呼び出します。これは、コントラクト状態を変更し、特定のブロックの状態ルートを更新します。[https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md)と[https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)からヒントを得ました。

システムコールは、トランザクションを行わずに状態をコントラクトに変更するのに役立ちます。

制限：システムコールから出されたイベントは現在、観察できず、いかなるトランザクションあるいはブロックにも含まれません。

## スパン管理 {#span-management}

スパンは、論理的に定義されたブロックのセットであり、このためにすべての利用可能なバリデータからバリデータのセットが選択されます。Heimdallは、すべてのバリデータからプロデューサの委員会を選びます。このプロデューサは、システムのバリデータの数に応じてバリデータのサブセットを含みます。

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### スパントランザクションの提案 {#propose-span-transaction}

タイプ：**Heimdallトランザクション**

出典：[https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx`は、トランザクションを含むことに成功した場合、特定の`span`のためにバリデータの委員会を設定します。各スパンに一つのトランザクションをHeimdallに含める必要があります。これはHeimdallで`spanProposeTx`と呼ばれます。`spanProposeTx`は、頻繁に送信されたり、現在の委員会（与えられた`span`）内で33%未満のステーク変更が発生する場合、元に戻す必要があります。

Heimdallの`bor`モジュールはスパン管理を行います。以下は、Borがすべてのバリデータからプロデューサを選ぶ方法です。

1. Borは、バリデータのパワーに基づき、複数のスロットを作成します。例：10のパワーを持つAは、10のスロットを持ちます。20のパワーを持つBは、20のスロットを持ちます。
2. すべてのスロットで、`shuffle`関数はそれらをシャッフル`seed`し、最初のプロデューサーを選択します。Heimdallの`bor`モジュールでは、ETH 2.0シャッフルアルゴリズムを使用して、すべてのバリデータからプロデューサーを選択します`producerCount`。各スパン`n`は、`seed`としてEthereum（ETH 1.0）ブロック`n`のブロックハッシュを使用します。選択に基づくスロットにより、バリデータはそのパワーに基づいて選択されることができるということにご注意ください。バリデータがより大きなパワーを持つほど、選択される可能性が高まります。出典：[https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### span Txのコミット {#commit-span-tx}

タイプ：**Borトランザクション**

Borでスパンをコミットするには2つの方法があります。

1. **自動スパン変更**

現在のスパンの終了時に、最後のスプリントのブロックで、BorがHeimdallの次のスパンにクエリを行い、システムコールを使用して、次のスパンのバリデータとプロデューサを設定します。

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

Borは、次のブロック用のブロックプロデューサとして新しいプロデューサを使用します。

2. **強制コミット**

`span`がHeimdallで提案されると、現在のスパンが終了する前にスパンを変更する必要がある場合、バリデータは、スパンを強制的にプッシュできます。`span`を提案するトランザクションは、いずれかのバリデータによってBorにコミットする必要があります。そのう上で、Borはシステムコールを使用して、現在のスプリントの最後に提案したスパンを更新およびコミットします。


## 状態管理（State-sync（状態同期）） {#state-management-state-sync}

状態管理は、EthereumチェーンからBorチェーンに状態を送信します。これは、`state-sync`と呼ばれます。これは、EthereumチェーンからBorチェーンにデータを移動する方法です。

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### 状態送信者 {#state-sender}

出典：[https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

状態同期を同期させるには、次のメソッド**状態送信者コントラクト**をEthereumチェーンに呼び出します。この`state-sync`メカニズムは基本的に、状態データをEthereumチェーンからBorに移動させる方法です。

`data`をEthereumチェーンのコントラクトからBorチェーンに移動させたいユーザーは、`StateSender.sol`で`syncSate`メソッドを呼び出します。

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

`receiver`コントラクトは、子チェーンに存在する必要があります。子チェーンは、プロセスが完了すると、状態`data`を受け取ります。`syncState`はEthereumで`StateSynced`イベントを出します。これは以下のようになります。

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

一旦`StateSynced`イベントがEthereumチェーンの`stateSender`コントラクトに出されると、どのバリデータもHeimdallの`MsgEventRecord`トランザクションを送信します。

Heimdallでのtxの確認後、バリデータは、シンプルなトランザクションでBorで`proposeState`を提案し、スプリントの最後に、`system`呼び出しを使用して`commitState`を呼び出し、Borは`state-sync`をコミットおよびファイナライズを行います。

`commitState`の間、ターゲットコントラクトに引数として`stateId`と`data`でBorは`onStateReceive`を実行します。

### 状態レシーバインターフェース {#state-receiver-interface}

Borチェーンの`receiver`コントラクトは、次のインターフェースに実装する必要があります。

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

`0x0000000000000000000000000000000000001001` — `StateReceiver.sol`のみが、ターゲットコントラクトで`onStateReceive`機能を呼び出す必要があります。

## トランザクション速度 {#transaction-speed}

Borは現在、100のバリデータと4つのブロックプロデューサで2～4秒のブロック時間で期待どおりに動作しています。大量のトランザクションを使用した複数回のストレステスト後に、実際のブロック時間が決定されます。

スプリントベースのアーキテクチャを使用していることにより、現在のスプリント中のプロデューサを変更することなく、Borがより高速でバルクブロックを生成できます。2スプリント間で遅れが出るため、他のプロデューサが配信されたブロックを受け取ることがあります。これはよく`producerDelay`と呼ばれます。

2スプリント間の時間は、複数のプロデューサ間でのレイテンシー問題を削減するためのバッファーを行うため、通常のブロックより長いことにご注意ください。

## 攻撃 {#attacks}

### 検閲 {#censorship}

Borは、より高速にブロックを作成するために大変小さなプロデューサセットを使用しています。つまり、Heimdallより多くの検閲攻撃にあう傾向にあります。これに対処するため、システム内で受け入れ可能なブロック時間のために必要な最大プロデューサ数を見つけ出すため、複数のテストが行われます。

これ以外に、可能性のある攻撃は次のとおりです：

1. 一つのプロデューサがトランザクションを検閲している

この場合、トランザクションの送信者は次のプロデューサのスプリントを待機し、再びトランザクションの送信を試みることができます。

2. すべてのバリデータが互いに共謀し、特定のトランザクションを検閲している

この場合、Polygonのシステムは、Ethereumチェーン上にトランザクションを送信し、バリデータに次の`x`チェックポイントにトランザクションを含めるよう依頼する方法を提供します。バリデータがトランザクションをその時間内に含められない場合は、ユーザーはバリデータをスラッシュできます。これは現在実装されていないことにご注意ください。

### 詐欺 {#fraud}

プロデューサは自分の番の間に無効なトランザクションを含めることが可能です。これは、複数のレベルで可能です：

1. 1つのプロデューサが不正を行う

1つのプロデューサが、任意の高さで無効なトランザクションを含める場合、他のプロデューサがフォークを作成し、トランザクションを除外できます。これは他のプロデューサの有効なノードが、無効なブロックを無視するためです。

2. スパンプロデューサが不正を行う

他のプロデューサがフォークを作成しない場合、ブロックを検証している他のバリデータは、自分たちのフォークを作成することで強制的にスパンを変更することができます。これにはGethが内部で動作する必要があるため、現在は実装されていません。しかし、将来のロードマップに組み込まれています。

3. すべてのバリデータが不正を行う

前提として、バリデータの3分の２＋１がこのシステムが正しく動作させるために正直である必要があります。
