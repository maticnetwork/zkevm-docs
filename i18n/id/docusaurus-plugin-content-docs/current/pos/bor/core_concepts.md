---
id: core_concepts
title: Konsep Inti
description: Bor adalah rantai keadaan dalam arsitektur Polygon
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

# Konsep Inti {#core-concepts}

Bor adalah rantai kondisi dalam arsitektur Polygon. Ini adalah fork atau percabangan Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) dengan konsensus baru yang disebut Bor.

Sumber: [https://github.com/maticnetwork/bor](https://github.com/maticnetwork/bor)

## consensus {#consensus}

Bor menggunakan konsensus baru yang diilhami oleh [konsensus Clique](https://eips.ethereum.org/EIPS/eip-225)

Detail lebih lanjut tentang konsensus dan spesifikasi: [Bor Consensus](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5)

## genesis {#genesis}

Blok genesis berisi semua informasi penting untuk mengonfigurasi jaringan. Ini pada dasarnya adalah file konfig untuk rantai Bor. Untuk melakukan boot pada rantai Bor, pengguna perlu memberikan lokasi file sebagai parameter.

Bor menggunakan `genesis.json` sebagai parameter dan blok Genesis.  Berikut ini contoh untuk genesis `config`Bor:

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

[Konfig khusus konsensus](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## EVM/Solidity sebagai VM {#evm-solidity-as-vm}

Bor menggunakan EVM yang tidak dimodifikasi sebagai VM untuk transaksi. Para pengembang dapat menempatkan kontrak apa pun yang mereka inginkan menggunakan alat Ethereum dan kompilator yang sama seperti `solc` tanpa perubahan apa pun.

## Matic sebagai token Asli (token Gas) {#matic-as-native-token-gas-token}

Bor memiliki token Matic sebagai token asli yang sama dengan ETH di Ethereum. Token ini sering disebut token gas. Bekerjanya token ini dengan benar berhubungan dengan cara kerja ETH saat ini di rantai Ethereum.

Selain itu, Bor menyediakan token ERC20 yang dibungkus bawaan untuk token aslinya (mirip dengan token WETH), yang artinya aplikasi dapat menggunakan token ERC20 MATIC yang dibungkus dalam aplikasi mereka tanpa membuat ERC20 yang dibungkus versi mereka sendiri dari token asli Matic tersebut.

Token ERC20 yang dibungkus ditempatkan di `0000000000000000000000000000000000001010` sebagai `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)` di Bor sebagai salah satu kontrak genesis.

### Biaya {#fees}

Token asli digunakan sebagai biaya ketika mengirimkan transaksi di Bor. Ini mencegah spam di Bor dan memberikan insentif ke Produsen Blok guna menjalankan rantainya selama periode yang lebih lama dan mencegah perilaku buruk.

Pengirim transaksi menetapkan `GasLimit` dan `GasPrice` untuk setiap transaksi dan menyiarkannya di Bor. Setiap produsen dapat menetapkan seberapa besar harga gas minimum yang dapat mereka terima menggunakan `--gas-price` ketika memulai node Bor. Jika `GasPrice` yang ditetapkan pengguna pada transaksi sama atau lebih besar dibandingkan harga gas yang ditetapkan produsen, maka produsen akan menerima transaksi tersebut dan memasukkannya dalam blok yang tersedia berikutnya. Ini memungkinkan setiap produsen untuk memperbolehkan syarat harga gas minimumnya sendiri.

Biaya transaksi akan dikurangi dari akun pengirim terkait dengan token Asli.

Berikut adalah rumus biaya transaksi:

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

Biaya yang terkumpul untuk semua transaksi dalam satu blok ditransfer ke akun produsen menggunakan transfer coinbase. Karena memiliki kekuatan staking yang lebih besar meningkatkan kemungkinan Anda menjadi produsen, maka validator dengan kekuatan staking yang tinggi dapat mengumpulkan imbalan yang lebih besar (terkait dengan biaya).

### Log tanda terima transfer {#transfer-receipt-logs}

Setiap token ERC20 yang kompatibel dengan Plasma di Bor menambahkan log tanda terima transfer khusus. Token Matic pun tidak terkecuali.

`LogTransfer` adalah log khusus yang ditambahkan ke semua token ERC20/721 yang kompatibel dengan plasma.  Anggap saja ini sebagai satu UTXO dengan 2 masuk dan 2 keluar untuk transfer.  Di sini, `output1 = input1 - amount` dan `output2 = input2 + amount`  Dengan begitu kontrak bukti penipuan plasma dapat memverifikasi transfer token ERC20 Matic (di sini, token Asli) di rantai Ethereum.

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

Sejak itu, tanda MATIC adalah tanda asli dan tidak memiliki token ERC20 asli, Bor menambahkan log tanda terima untuk setiap transfer yang dibuat untuk tanda asli menggunakan kode Golang. Sumber: [https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

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

### Token asli setoran {#deposit-native-token}

Pengguna dapat menerima token Asli dengan menyetorkan token Matic di rantai utama Ethereum ke kontrak `DepositManager` (yang ditempatkan di rantai Ethereum). Sumber: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

Dengan menggunakan token `depositERC20`, pengguna dapat memindahkan token ERC20 Matic (token Asli) atau token ERC20 lainnya dari rantai Ethereum ke rantai Bor.

### Penarikan token asli {#withdraw-native-token}

Penarikan dari rantai Bor ke rantai Ethereum berlangsung persis seperti token ERC20 lainnya. Pengguna dapat memanggil fungsi `withdraw` pada kontrak ERC20, yang ditempatkan di Bor, di `0000000000000000000000000000000000001010`  untuk memulai proses penarikan dengan cara yang sama.  Sumber: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## Kontrak bawaan (kontrak Genesis) {#in-built-contracts-genesis-contracts}

Bor dimulai dengan tiga kontrak bawaan, yang sering disebut kontrak genesis. Kontrak-kontrak ini tersedia di blok 0. Sumber: [https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

Kontrak-kontrak ini dikompilasi menggunakan `solc --bin-runtime`. Contoh, perintah berikut menghasilkan kode yang dikompilasi untuk `contract.sol`

```bash
solc --bin-runtime contract.sol
```

Kontrak genesis ditetapkan di `genesis.json`. Ketika bor dimulai di blok 0, bor memuat semua kontrak dengan saldo dan kode yang disebutkan.

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

Di bawah ini adalah rincian untuk setiap kontrak genesis.

### Kumpulan validator Bor {#bor-validator-set}

Sumber: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

Ditempatkan di: `0x0000000000000000000000000000000000001000`

Kontrak `BorValidatorSet.sol` mengelola kumpulan validator untuk span. Memasukkan set validator dan informasi span saat ini ke dalam kontrak memungkinkan kontrak lain menggunakan informasi tersebut. Karena Bor menggunakan produsen dari Heimdall (sumber eksternal), maka Bor menggunakan panggilan sistem untuk mengubah kondisi kontrak.

Untuk sprint pertama, semua produsen ditetapkan di `BorValidatorSet.sol` secara langsung.

`setInitialValidators` dipanggil ketika span kedua sedang diatur. Karena Bor tidak mendukung konstruktor untuk kontrak genesis, kumpulan validator pertama perlu diatur untuk peta `spans`.

Detail span pertama adalah sebagai berikut:

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Ketentuan kontrak Solidity:

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

`proposeSpan` dapat dipanggil oleh validator valid apa pun dengan biaya nol. Bor memungkinkan transaksi `proposeSpan` menjadi transaksi gratis karena transaksi ini adalah bagian dari sistem.

`commitSpan` dipanggil melalui [panggilan sistem](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Penerima kondisi {#state-receiver}

Sumber: [https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

Ditempatkan di: `0x0000000000000000000000000000000000001001`

Kontrak penerima kondisi mengelola rekaman sinkronisasi kondisi yang masuk. Mekanisme `state-sync` pada dasarnya adalah cara untuk memindahkan data kondisi dari rantai Ethereum ke Bor.

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

`proposeState` akan dipanggil oleh validator valid apa pun dengan biaya nol. Bor memungkinkan transaksi `proposeState` menjadi transaksi gratis karena ini adalah bagian dari sistem tersebut.

`commitState` dipanggil melalui [panggilan sistem](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9).

### Token ERC20 Matic {#matic-erc20-token}

Sumber: [https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

Ditempatkan di: `0x0000000000000000000000000000000000001010`

Ini adalah kontrak khusus yang membungkus koin asli (seperti $ETH di Ethereum) dan menyediakan antarmuka token ERC20. Contoh: `transfer`pada kontrak transfer token native . `withdraw`metode dalam token ERC20 memungkinkan pengguna untuk memindahkan token mereka dari Bor ke rantai Ethereum.

Catatan: Kontrak ini tidak mendukung `allowance`. Ini sama untuk setiap kontrak token ERC20.

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

## Panggilan sistem {#system-call}

Hanya alamat sistem, `2^160-2`, memungkinkan pembuatan panggilan sistem. Bor memanggilnya secara internal dengan alamat sistem sebagai `msg.sender`. Ini mengubah kondisi kontrak dan memperbarui root kondisi untuk blok tertentu. Terinspirasi dari [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) dan [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Panggilan sistem berguna untuk mengubah kondisi ke kontrak tanpa membuat transaksi apa pun.

Keterbatasan: Saat ini peristiwa yang dihasilkan oleh panggilan sistem tidak dapat diamati dan tidak disertakan dalam transaksi atau blok apa pun.

## Manajemen span {#span-management}

Span adalah kumpulan blok yang ditetapkan secara logis yang menjadi alasan dipilihnya sekumpulan validator dari antara semua validator yang tersedia. Heimdall akan memilih komite produsen dari semua validator. Produsen akan menambahkan sebagian dari validator tergantung pada jumlah validator dalam sistem tersebut.

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### Proposal Transaksi {#propose-span-transaction}

Jenis: **Transaksi Heimdall**

[Sumber: https://github.com/maticnetwork/heimdall/blob/develd/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

`spanProposeTx` menentukan komite validator untuk `span` tertentu seandainya transaksi yang berhasil disertakan. Satu transaksi untuk setiap span harus dimasukkan di Heimdall. Ini disebut `spanProposeTx` di Heimdall. `spanProposeTx` harus kembali jika sering dikirimkan atau tidak sampai kurang dari 33% perubahan stake yang terjadi di dalam komite saat ini (untuk, `span` tertentu).

Modul `bor` di Heimdall menangani manajemen span. Berikut ini bagaimana Bor memilih produsen dari semua validator:

1. Bor membuat banyak slot berdasarkan kekuatan validator. Contoh: A dengan kekuatan 10 akan memiliki 10 slot, B dengan kekuatan 20 akan memiliki 20 slot.
2. Dengan semua slot, fungsi `shuffle` mengacaknya menggunakan `seed` dan memilih `producerCount` produsen pertama. Modul `bor` di Heimdall menggunakan algoritme pengacakan ETH 2.0 untuk memilih produsen dari semua validator. Setiap span `n` menggunakan hash blok dari blok Ethereum (ETH 1.0) `n` sebagai `seed`. Ingatlah pemilihan yang berdasarkan slot memungkinkan validator dipilih berdasarkan kekuatan mereka. Semakin besar kekuatan validator, maka akan semakin besar kemungkinannya untuk dipilih. Sumber: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

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

### Menjalankan span Tx {#commit-span-tx}

Jenis: **Transaksi Bor**

Ada dua cara untuk menjalankan span di Bor.

1. **Perubahan span otomatis**

    Di akhir span saat ini, di blok terakhir dari sprint terakhir, Bor meminta span berikutnya dari Heimdall dan menentukan validator dan produsen untuk span selanjutnya menggunakan panggilan sistem.

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

    Bor menggunakan produsen baru sebagai produsen blok untuk blok mereka berikutnya.

2. **Memaksa jalan**

    Setelah `span` diusulkan di Heimdall, validator dapat mendorong paksa span jika span harus diubah sebelum span saat ini berakhir. Transaksi untuk mengusulkan `span` harus dijalankan ke Bor oleh validator apa pun. Bor kemudian memperbarui dan menjalankan span yang diusulkan di akhir sprint saat ini menggunakan panggilan sistem.


## Manajemen kondisi (Sinkronisasi kondisi) {#state-management-state-sync}

Manajemen kondisi mengirimkan kondisi dari rantai Ethereum ke rantai Bor. Ini disebut `state-sync`. Ini adalah cara untuk memindahkan data dari rantai Ethereum ke rantai Bor.

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### Pengirim kondisi {#state-sender}

Sumber: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Untuk menyinkronkan sinkronisasi kondisi, panggil metode berikut **kontrak pengirim kondisi** di rantai Ethereum. Mekanisme `state-sync` pada dasarnya adalah cara untuk memindahkan data kondisi dari rantai Ethereum ke Bor.

Pengguna yang ingin memindahkan `data` dari kontrak di rantai Ethereum ke rantai Bor, memanggil metode `syncSate` di `StateSender.sol`

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

Kontrak `receiver` harus berada di rantai anak, yang menerima `data` kondisi setelah proses selesai. `syncState` menghasilkan peristiwa `StateSynced` di Ethereum, sebagai berikut:

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

Setelah peristiwa `StateSynced` dihasilkan di kontrak `stateSender` di rantai Ethereum, validator apa pun mengirimkan transaksi `MsgEventRecord` di Heimdall.

Setelah konfirmasi tx di Heimdall, validator mengusulkan `proposeState` di Bor dengan transaksi sederhana dan di akhir sprint, Bor menjalankan serta memfinalisasi `state-sync` dengan memanggil `commitState` menggunakan panggilan `system`.

Selama `commitState`, Bor mengeksekusi `onStateReceive`, dengan `stateId`, dan `data` sebagai argumen, pada kontrak target.

### Antarmuka penerima kondisi {#state-receiver-interface}

Kontrak `receiver` di rantai Bor harus mengimplementasikan antarmuka berikut.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Hanya `0x0000000000000000000000000000000000001001` — `StateReceiver.sol`, harus diperbolehkan untuk memanggil fungsi `onStateReceive` di kontrak target.

## Kecepatan transaksi {#transaction-speed}

Bor saat ini bekerja seperti yang diharapkan dengan waktu blok ~2 sampai 4 detik dengan 100 validator dan 4 produsen blok. Setelah banyak pengujian stres dengan jumlah transaksi yang besar, waktu blok yang tepat akan diputuskan.

Penggunaan arsitektur berbasis sprint membantu Bor untuk membuat blok dalam jumlah besar dengan lebih cepat tanpa mengubah produsen selama sprint saat ini. Keterlambatan antara dua sprint yang dialami akan memberikan produsen lain kesempatan untuk menerima blok yang disiarkan, yang sering disebut sebagai `producerDelay`

Ingatlah waktu antara dua sprint lebih tinggi dibandingkan waktu yang dibutuhkan blok normal untuk melakukan buffer guna mengurangi masalah latensi antara banyak produsen.

## Serangan {#attacks}

### Penyensoran {#censorship}

Bor menggunakan sekumpulan produsen dalam jumlah yang sangat kecil untuk membuat blok yang lebih cepat. Artinya ini lebih rentan terhadap serangan penyensoran dibandingkan Heimdall. Untuk mengatasinya, banyak pengujian akan dilakukan untuk mengetahui jumlah maksimal produsen untuk waktu blok yang pantas di sistem.

Selain itu, ada beberapa kemungkinan serangan:

1. Satu produsen menyensor transaksi

    Dalam kasus itu, pengirim transaksi dapat menunggu sprint produsen berikutnya dan mencoba mengirimkan kembali transaksi itu.

2. Semua validator berkolusi satu sama lain dan menyensor transaksi tertentu

    Dalam kasus ini, sistem Polygon akan menyediakan cara untuk mengirimkan transaksi di rantai Ethereum dan meminta validator untuk memasukkan transaksi tersebut di titik periksa `x` berikutnya. Jika validator gagal untuk memasukkannya selama jendela waktu ini, pengguna dapat melakukan pemotongan terhadap validator tersebut. Ingatlah saat ini hal tersebut belum diimplementasikan.

### Penipuan {#fraud}

Produsen dapat memasukkan transaksi yang tidak valid saat giliran mereka. Tindakan ini mungkin terjadi di sejumlah tingkat:

1. Satu produsen curang

    Jika produsen memasukkan transaksi yang tidak valid di tingkat mana pun, produsen lain dapat membuat percabangan atau fork dan mengeluarkan transaksi itu karena node valid mereka mengabaikan blok yang tidak valid

2. Produsen span curang

    Jika produsen lain tidak membuat percabangan atau fork, validator lain yang memvalidasi blok ini dapat dengan paksa mengubah span dengan membuat fork mereka sendiri. Saat ini hal tersebut belum diimplementasikan karena hal itu memerlukan cara bekerjanya Geth secara internal. Namun, ini ada dalam rencana strategis masa depan kami.

3. Semua validator curang

    Asumsinya adalah bahwa ⅔+1 validator harus jujur untuk menjalankan sistem ini dengan benar.
