---
id: core_concepts
title: Khái niệm cốt lõi
description: Bor là chuỗi trạng thái trong kiến trúc Polygon
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

# Khái niệm cốt lõi {#core-concepts}

Bor là chuỗi trạng thái trong kiến trúc Polygon. Đây là một phân nhánh của Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) với cơ chế đồng thuận mới được gọi là Bor.

Nguồn: [https://github.com/maticnet/bor](https://github.com/maticnetwork/bor)

## consensus {#consensus}

Bor sử dụng sự đồng thuận cải thiện mới, lấy cảm hứng từ [sự đồng thuận của Clique](https://eips.ethereum.org/EIPS/eip-225)

Thêm chi tiết về sự đồng thuận và đặc biệt: [Bor Consensus](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## genesis {#genesis}

Khối dựng sẵn chứa tất cả các thông tin cần thiết để cấu hình mạng. Về cơ bản đây là tệp cấu hình cho chuỗi Bor. Để khởi động chuỗi Bor, người dùng cần chuyển vào vị trí của tệp dưới dạng tham số.

Bor sử dụng `genesis.json`như khối dựng sẵn và tham số.  Dưới đây là một ví dụ cho `config`genesis :

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

[Cấu hình đồng thuận cụ thể](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## EVM/Solid như VM {#evm-solidity-as-vm}

Bor sử dụng EVM chưa sửa đổi làm máy ảo cho một giao dịch. Các nhà phát triển có thể triển khai bất kỳ hợp đồng nào họ muốn bằng cách sử dụng các công cụ và trình biên dịch Ethereum giống như `solc`mà không có bất kỳ thay đổi nào.

## Matic dưới dạng phiếu thưởng gốc (phiếu thưởng Gas) {#matic-as-native-token-gas-token}

Bor có phiếu thưởng Matic là phiếu thưởng gốc tương tự như ETH trong Ethereum. Nó thường được gọi là phiếu thưởng gas. Phiếu thưởng này hoạt động đúng như cách ETH hoạt động hiện tại trên chuỗi Ethereum.

Ngoài ra, Bor còn cung cấp phiếu thưởng ERC20 được gói sẵn cho phiếu thưởng gốc (tương tự như phiếu thưởng WETH), có nghĩa là các ứng dụng có thể sử dụng phiếu thưởng MATIC ERC20 được gói trong ứng dụng của họ mà không cần tạo phiên bản ERC20 đã gói của riêng phiếu thưởng gốc Matic.

Phiếu thưởng ERC20 đã bọc được triển khai tại `0000000000000000000000000000000000001010`dưới dạng `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)`trên Bor như một trong những hợp đồng dựng sẵn.

### Phí {#fees}

Phiếu thưởng gốc được sử dụng làm phí trong khi gửi giao dịch trên Bor. Điều này ngăn chặn thư rác trên Bor và khuyến khích Nhà sản xuất khối chạy chuỗi trong thời gian dài hơn và ngăn cản các hành vi xấu.

Người gửi giao dịch xác định `GasLimit`và `GasPrice`cho mỗi giao dịch và phát nó trên Bor. Mỗi nhà sản xuất có thể xác định mức giá gas tối thiểu mà họ có thể chấp nhận bằng cách sử dụng `--gas-price`khi khởi động nút Bor. Nếu giá gas `GasPrice`do người dùng xác định trong giao dịch bằng hoặc cao hơn giá gas của nhà sản xuất, nhà sản xuất sẽ chấp nhận giao dịch đó và đưa giao dịch đó vào khối sẵn có tiếp theo. Điều này cho phép mỗi nhà sản xuất yêu cầu giá gas tối thiểu của riêng mình.

Phí giao dịch sẽ được trừ vào tài khoản của người gửi bằng phiếu thưởng gốc.

Đây là công thức cho phí giao dịch:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

Phí đã thu cho tất cả các giao dịch trong một khối được chuyển vào tài khoản của nhà sản xuất sử dụng giao dịch chuyển nhượng dựa trên đồng. Vì có nhiều sức mạnh góp cổ phần hơn sẽ làm tăng xác suất trở thành nhà sản xuất của bạn, nó sẽ cho phép người xác thực có sức mạnh góp cổ phần cao nhận được nhiều phần thưởng hơn (về phí) tương ứng.

### Chuyển nhượng nhật ký biên nhận {#transfer-receipt-logs}

Mỗi phiếu thưởng ERC20 tương thích với Plasma trên Bor sẽ thêm một nhật ký biên nhận chuyển nhượng đặc biệt. Phiếu thưởng Matic cũng không ngoại lệ.

`LogTransfer` là nhật ký đặc biệt được thêm vào tất cả các phiếu thưởng ERC20/721 tương thích với plasma.  Hãy xem nó như một UTXO 2 đầu vào 2 đầu ra cho việc chuyển nhượng.  Ở đây, `output1 = input1 - amount`và `output2 = input2 + amount`Điều này cho phép các hợp đồng chống gian lận plasma xác minh việc chuyển nhượng các phiếu thưởng Matic ERC20 (ở đây, phiếu thưởng gốc) trên chuỗi Ethereum.

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

Suối, dấu hiệu MATIC là dấu hiệu bản địa và không có dấu hiệu Native ERC20 để ken, Bor thêm nhật ký hóa đơn cho mỗi tờ chuyển giao cho dấu hiệu bản địa bằng cách sử dụng theo mã Golang. Nguồn: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### Nạp tiền phiếu thưởng gốc {#deposit-native-token}

Người dùng có thể nhận được phiếu thưởng gốc bằng cách ký gửi phiếu thưởng Matic trên chuỗi chính Ethereum sang hợp đồng `DepositManager`(được triển khai trên chuỗi Ethereum). Nguồn: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

Sử dụng phiếu thưởng`depositERC20`, người dùng có thể di chuyển phiếu thưởng Matic ERC20 (token gốc) hoặc bất kỳ token ERC20 nào khác từ chuỗi Ethereum sang chuỗi Bor.

### Rút phiếu thưởng gốc {#withdraw-native-token}

Rút tiền từ chuỗi Bor sang chuỗi Ethereum hoạt động giống hệt như bất kỳ phiếu thưởng ERC20 khác. Người dùng có thể gọi chức năng `withdraw`trên hợp đồng ERC20, được triển khai trên Bor, tại `0000000000000000000000000000000000001010` để bắt đầu quy trình rút tiền tương tự.  Nguồn: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## Hợp đồng đã dựng sẵn (hợp đồng genesis) {#in-built-contracts-genesis-contracts}

Bor bắt đầu với ba hợp đồng được tạo sẵn, thường được gọi là hợp đồng genesis. Các hợp đồng này có sẵn tại khối 0. Nguồn: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

Các hợp đồng này được biên dịch bằng cách sử dụng`solc --bin-runtime`. Ví dụ, lệnh sau tạo ra mã đã biên dịch cho `contract.sol`

```bash
solc --bin-runtime contract.sol
```

Hợp đồng Genesis được định nghĩa trong`genesis.json`. Khi bor bắt đầu ở khối 0, nó tải tất cả các hợp đồng với mã và số dư được đề cập.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

Dưới đây là chi tiết cho mỗi hợp đồng genesis.

### Tập hợp người xác thực Bor {#bor-validator-set}

Nguồn: [https://github.com/maticnet/genesis-contains/blob/master/contains/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

Triển khai tại: `0x0000000000000000000000000000000000001000`

Hợp đồng `BorValidatorSet.sol`quản lý tập hợp người xác thực được thiết lập cho span. Việc thiết lập bộ người xác thực hiện tại và mở rộng thông tin vào hợp đồng cho phép các hợp đồng khác sử dụng thông tin đó. Vì Bor sử dụng các nhà sản xuất từ Heimdall (nguồn bên ngoài), nó sử dụng lệnh gọi hệ thống để thay đổi trạng thái hợp đồng.

Đối với sprint đầu tiên, tất cả các nhà sản xuất được xác định trực tiếp trong`BorValidatorSet.sol`.

`setInitialValidators` được triệu tập khi span thứ hai đang được thiết lập. Vì Bor không hỗ trợ phương thức khởi tạo cho hợp đồng genesis, nên tập hợp người xác thực đầu tiên cần được đặt thành bản đồ`spans`.

Chi tiết span đầu tiên như sau:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Định nghĩa hợp đồng Solidity:

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

`proposeSpan` có thể được gọi bởi bất kỳ người xác thực hợp lệ nào mà không phải trả phí. Bor cho phép giao dịch `proposeSpan`là giao dịch miễn phí vì nó là một phần của hệ thống.

`commitSpan` đang được gọi thông qua [ lệnh gọi hệ thống](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Trạng thái người nhận {#state-receiver}

Nguồn: [https://github.com/maticnet/genesis-contains/blob/master/contains/Statereiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

Triển khai tại: `0x0000000000000000000000000000000000001001`

Hợp đồng trạng thái người nhận quản lý các bản ghi đồng bộ trạng thái đến. Cơ chế `state-sync`về cơ bản là một cách để di chuyển dữ liệu trạng thái từ chuỗi Ethereum sang Bor.

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

`proposeState` có thể được gọi bởi bất kỳ người xác thực hợp lệ nào mà không phải trả phí. Bor cho phép giao dịch `proposeState`là giao dịch miễn phí vì nó là một phần của hệ thống.

`commitState` đang được gọi thông qua [ lệnh gọi hệ thống](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Phiếu thưởng ERC20 Matic {#matic-erc20-token}

Nguồn: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

Triển khai tại: `0x0000000000000000000000000000000000001010`

Đây là hợp đồng đặc biệt gói đồng xu bản địa (như ${ EEU, Ethereum) và cung cấp giao diện biểu tượng ERC20. Ví dụ: `transfer`Trên sự chuyển giao hợp đồng này bằng cách chuyển giao bằng chứng. `withdraw`Phương pháp chuyển giao bằng chứng ERC20 cho phép người dùng di chuyển các dấu từ Bor đến chuỗi Ethereum.

Lưu ý: Hợp đồng này không hỗ trợ`allowance`. Điều này giống nhau đối với mỗi hợp đồng vật dụng Plasma ERC20.

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

## Gọi hệ thống {#system-call}

Chỉ địa chỉ hệ thống, `2^160-2`, mới cho phép thực hiện lệnh gọi hệ thống. Bor gọi nó trong nội bộ với địa chỉ hệ thống là`msg.sender`. Nó thay đổi trạng thái hợp đồng và cập nhật trạng thái gốc cho một khối cụ thể. Lấy cảm hứng từ [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) và [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Lệnh gọi hệ thống rất hữu ích để thay đổi trạng thái thành hợp đồng mà không cần thực hiện bất kỳ giao dịch nào.

Giới hạn: Hiện tại các sự kiện phát ra bởi lệnh gọi hệ thống không thể quan sát được và không được bao gồm trong bất kỳ giao dịch hoặc khối nào.

## Quản lý span {#span-management}

Span là một tập hợp các khối được xác định một cách hợp lý, trong đó một tập hợp các trình xác thực được chọn trong số tất cả các trình xác thực có sẵn. Heimdall sẽ chọn ủy ban các nhà sản xuất trong số tất cả những người xác thực. Các nhà sản xuất sẽ bao gồm một tập hợp con người xác thực tùy thuộc vào số lượng người xác thực trong hệ thống.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### Đối tượng chuyển đổi Span {#propose-span-transaction}

Loại: **Giao dịch Heimdall**

Nguồn: [https://github.com/maticnets/heimdall/blob/develope/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx` thiết lập ủy ban người xác thực cho một `span`nhất định trong trường hợp bao hàm giao dịch thành công. Một giao dịch cho mỗi span phải được bao gồm trong Heimdall. Nó được gọi là `spanProposeTx`trên Heimdall. `spanProposeTx` phải hoàn nguyên nếu được gửi thường xuyên hoặc có không ít hơn 33% thay đổi cược xảy ra trong ủy ban hiện tại (vì, cho trước`span`).

Mô-đun `bor`trên Heimdall có chức năng quản lý span. Đây là cách Bor chọn nhà sản xuất trong số tất cả các người xác thực:

1. Bor tạo ra nhiều slot dựa trên sức mạnh của người xác thực. Ví dụ: A có công suất 10 sẽ có 10 slot, B có công suất 20 có 20 slot.
2. Với tất cả các slot, chức năng `shuffle`xáo trộn chúng bằng cách sử dụng `seed`và chọn nhà sản xuất `producerCount`đầu tiên.  Mô-đun `bor`trên Heimdall sử dụng thuật toán xáo trộn ETH 2.0 để chọn nhà sản xuất trong số tất cả các người xác thực. Mỗi span`n` sử dụng hàm băm khối của Ethereum (ETH 1.0) khối `n`là`seed`. Lưu ý rằng lựa chọn dựa trên vị trí cho phép các trình xác thực được chọn dựa trên sức mạnh của mình. Trình xác nhận công suất cao hơn sẽ có xác suất được chọn cao hơn. Nguồn: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### Cam kết span Tx {#commit-span-tx}

Loại: **Giao dịch bor**

Có hai cách để thực hiện span gian trong Bor.

1. **Thay đổi span tự động**

 Vào cuối span hiện tại, ở khối cuối cùng của sprint cuối cùng, Bor truy vấn span tiếp theo từ Heimdall, sau đó đặt các trình xác thực và nhà sản xuất cho span tiếp theo bằng cách sử dụng lệnh gọi hệ thống.

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

 Bor sử dụng các nhà sản xuất mới làm nhà sản xuất khối cho các khối tiếp theo.

2. **Buộc cam kết**

 Sau khi `span`được đề xuất trên Heimdall, người xác thực có thể buộc đẩy span nếu cần thay đổi span trước khi span hiện tại kết thúc. Một giao dịch để đề xuất một `span`phải được cam kết với Bor bởi bất kỳ người xác thực nào. Sau đó Bor cập nhật và thực hiện span được đề xuất vào cuối sprint hiện tại bằng cách sử dụng lệnh gọi hệ thống.


## Quản lý trạng thái (Đồng bộ trạng thái) {#state-management-state-sync}

Quản lý trạng thái gửi trạng thái từ chuỗi Ethereum sang chuỗi Bor. Nó được gọi là`state-sync`. Đây là một cách để di chuyển dữ liệu từ chuỗi Ethereum sang chuỗi Bor.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### Người gửi trạng thái {#state-sender}

Nguồn: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Để đồng bộ trạng thái đồng bộ, hãy thực hiện gọi phương thức **hợp đồng StateSender** sau trên chuỗi Ethereum. Cơ chế `state-sync`về cơ bản là một cách để di chuyển dữ liệu trạng thái từ chuỗi Ethereum sang Bor.

Một người dùng, người muốn chuyển `data`từ hợp đồng trên chuỗi Ethereum sang chuỗi Bor, gọi phương thức `syncSate` trên `StateSender.sol`

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

Hợp đồng `receiver` phải có trên chuỗi con, chuỗi này nhận trạng thái `data`sau khi quá trình hoàn tất. `syncState` phát ra sự kiện `StateSynced`trên Ethereum, như sau:

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

Khi sự kiện `StateSynced`được phát ra trên hợp đồng `stateSender`trên chuỗi Ethereum, bất kỳ người xác thực nào sẽ gửi giao dịch `MsgEventRecord`trên Heimdall.

Sau khi xác nhận tx trên Heimdall, người xác thực đề xuất `proposeState`trên Bor với giao dịch đơn giản và vào cuối sprint, Bor cam kết và kết thúc `state-sync`bằng cách gọi `commitState`sử dụng lệnh gọi`system`.

Trong `commitState`, Bor thực hiện `onStateReceive`, với `stateId`và `data`là args, theo hợp đồng mục tiêu.

### Giao diện trạng thái người nhận {#state-receiver-interface}

Hợp đồng `receiver` trên chuỗi Bor phải thực hiện giao diện sau.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Chỉ `0x0000000000000000000000000000000000001001`— `StateReceiver.sol`, phải được phép để gọi chức năng `onStateReceive`trên hợp đồng mục tiêu.

## Tốc độ giao dịch {#transaction-speed}

Bor hiện hoạt động như mong đợi với thời gian khối ~ 2 đến 4 giây với 100 người xác nhận và 4 nhà sản xuất khối. Sau nhiều thử nghiệm căng thẳng với số lượng giao dịch khổng lồ, thời gian khối chính xác sẽ được quyết định.

Sử dụng kiến trúc dựa trên sprint giúp Bor tạo ra các khối lớn nhanh hơn mà không cần thay đổi nhà sản xuất trong sprint hiện tại. Việc có độ trễ giữa hai lần sprint cho phép các nhà sản xuất khác nhận được một khối được phát sóng, thường được gọi là `producerDelay`

Lưu ý rằng thời gian giữa hai sprint cao hơn các khối bình thường để đệm và giảm các vấn đề về độ trễ giữa nhiều nhà sản xuất.

## Tấn công {#attacks}

### Kiểm duyệt {#censorship}

Bor sử dụng một tập hợp các nhà sản xuất rất nhỏ để tạo ra các khối nhanh hơn. Điều này có nghĩa là nó dễ bị tấn công kiểm duyệt hơn Heimdall. Để giải quyết vấn đề đó, nhiều thử nghiệm sẽ được thực hiện để tìm ra số lượng nhà sản xuất tối đa cho thời gian khối có thể chấp nhận được trong hệ thống.

Ngoài ra, có một số cuộc tấn công có thể xảy ra:

1. Một nhà sản xuất đang kiểm duyệt giao dịch

 Trong trường hợp đó, người gửi giao dịch có thể chờ sprint tiếp theo của nhà sản xuất và cố gắng gửi lại giao dịch.

2. Tất cả các người xác thực đang thông đồng với nhau và kiểm duyệt giao dịch cụ thể

 Trong trường hợp này, hệ thống Polygon sẽ cung cấp một cách để gửi một giao dịch trên chuỗi Ethereum và yêu cầu người xác thực đưa giao dịch vào các điểm kiểm duyệt `x`tiếp theo. Nếu người xác thực không bao gồm nó trong khoảng thời gian đó, người dùng có thể cắt giảm người xác thực. Lưu ý rằng điều này hiện không được triển khai.

### Gian lận {#fraud}

Nhà sản xuất có thể bao gồm giao dịch không hợp lệ trong lượt của họ. Điều này có thể xuất hiện ở nhiều cấp độ:

1. Một nhà sản xuất gian lận

   Nếu một nhà sản xuất bao gồm giao dịch không hợp lệ ở bất kỳ độ cao (số lượng khối) nào, thì các nhà sản xuất khác có thể tạo một nhánh rẽ và loại trừ giao dịch đó vì nút hợp lệ của họ bỏ qua các khối không hợp lệ

2. Nhà sản xuất span gian lận

    Nếu các nhà sản xuất khác không tạo một phân nhánh, thì những người xác nhận khác đang xác nhận khối có thể bắt buộc thay đổi span bằng cách tạo một phân nhánh của riêng họ. Điều này hiện không được triển khai vì nó yêu cầu cách thức hoạt động nội bộ của Geth. Tuy nhiên, đây là lộ trình trong tương lai của chúng tôi.

3. Tất cả các người xác thực đều là gian lận

    Giả định rằng  ⅔+1 người xác thực phải trung thực để hệ thống này hoạt động chính xác.
