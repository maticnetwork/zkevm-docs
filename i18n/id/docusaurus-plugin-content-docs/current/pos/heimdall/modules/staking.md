---
id: staking
title: Staking
description: Modul yang mengelola transaksi dan keadaan yang berhubungan dengan validator
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Staking {#staking}

Modul staking mengelola transaksi dan kondis terkait validator untuk Heimdall. Ingatlah validator melakukan staking pada token mereka di rantai Ethereum dan menjadi validator. Masing-masing validator mengirimkan transaksi di Heimdall menggunakan parameter yang diperlukan untuk menyetujui perubahan stake Ethereum tersebut. Setelah mayoritas validator menyetujui perubahan pada stake, modul ini menyimpan informasi validator pada kondisi Heimdall.

## Pengelolaan kunci {#key-management}

Untuk pengelolaan kunci, lihat [Pengelolaan kunci validator](/docs/pos/heimdall/validator-key-management)

## Delegasi {#delegation}

Modul ini hanya mengelola staking validator di Heimdall. Delegasi hanya tersedia di kontrak cerdas pada rantai Ethereum. Untuk mengoptimalkan penghitungan imbalan delegasi di kontrak cerdas, kami menggunakan pembagian validator (ERC20 per validator).

Detail lebih lanjut di sini: [Delegasi (Pembagian validator)](/docs/pos/contracts/delegation)

## Imbalan {#rewards}

Semua imbalan didistribusikan di rantai Ethereum. Validator dan delegator mengeklaim imbalan mereka atau melakukan restake hanya dengan mengirimkan transaksi di `StakeManager.sol`

Detail lebih lanjut di sini: [Imbalan](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## Pesan {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin` menangani staking ketika validator baru bergabung dengan sistem. Setelah validator memanggil `stake` atau `stakeFor` pada `StakingManager.sol` di Ethereum, maka peristiwa `Staked` baru ini dihasilkan.

Sumber: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

```jsx
/**
 * Staked event - emitted whenever new validator
 *
 * @param signer           Signer address for the validator
 * @param validatorId      Validator id
 * @param activationEpoch  Activation epoch for validator
 * @param amount           Staked amount
 * @param total            Total stake
 * @param signerPubKey     Signer public key (required by Heimdall/Tendermint)
 */
event Staked(
    address indexed signer,
    uint256 indexed validatorId,
    uint256 indexed activationEpoch,
    uint256 amount,
    uint256 total,
    bytes signerPubkey
);
```

`activationEpoch` adalah jumlah titik periksa, tempat validator akan menjadi aktif di Heimdall.

Panggilan stake pada kontrak cerdas gagal jika slot tidak tersedia. Slot validator adalah cara untuk membatasi sejumlah validator di sistem.  Slot dikelola di kontrak cerdas Ethereum.

Berikut adalah pesan `ValidatorJoin` untuk transaksi Heimdall:

```go
type MsgValidatorJoin struct {
	From         hmTypes.HeimdallAddress `json:"from"`
	ID           hmTypes.ValidatorID     `json:"id"`
	SignerPubKey hmTypes.PubKey          `json:"pub_key"`
	TxHash       hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex     uint64                  `json:"log_index"`
}
```

### MsgStakeUpdate {#msgstakeupdate}

`MsgStakeUpdate` menangani pembaruan stake ketika validator melakukan re-stake atau delegasi baru masuk. Dalam kasus mana pun, peristiwa `StakeUpdate` baru dihasilkan.

```jsx
/**
 * Stake update event - emitted whenever stake gets updated
 *
 * @param validatorId      Validator id
 * @param newAmount        New staked amount
 */
event StakeUpdate(
	uint256 indexed validatorId,
	uint256 indexed newAmount
);
```

Berikut adalah pesan `MsgStakeUpdate` untuk transaksi Heimdall:

```go
// MsgStakeUpdate represents stake update
type MsgStakeUpdate struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgValidatorExit {#msgvalidatorexit}

`MsgValidatorExit` menangani proses keluar validator setelah validator memulai proses keluar di Ethereum. Ini akan menghasilkan peristiwa `SignerUpdate`.

```jsx
/**
 * Unstake init event - emitted whenever validator initiates the exit
 *
 * @param user                Signer
 * @param validatorId         Validator id
 * @param deactivationEpoch   Deactivation epoch for validator
 * @param amount              Unstaked amount
 */
event UnstakeInit(
    address indexed user,
    uint256 indexed validatorId,
    uint256 deactivationEpoch,
    uint256 indexed amount
);
```

Berikut adalah pesan `MsgValidatorExit` untuk transaksi Heimdall:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate` menangani pembaruan penandatangan ketika validator memperbarui kunci penandatangan di Ethereum. Ini akan menghasilkan peristiwa `SignerUpdate`.

```jsx
/**
 * Signer change event - emitted whenever signer key changes
 *
 * @param validatorId      Validator id
 * @param oldSigner        Current old signer
 * @param newSigner        New signer
 * @param signerPubkey     New signer public key
 */
event SignerChange(
    uint256 indexed validatorId,
    address indexed oldSigner,
    address indexed newSigner,
    bytes signerPubkey
);
```

Berikut adalah pesan `MsgSignerUpdate` untuk transaksi Heimdall:

```go
// MsgSignerUpdate signer update struct
type MsgSignerUpdate struct {
	From            hmTypes.HeimdallAddress `json:"from"`
	ID              hmTypes.ValidatorID     `json:"id"`
	NewSignerPubKey hmTypes.PubKey          `json:"pubKey"`
	TxHash          hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex        uint64                  `json:"log_index"`
}
```

## Perintah CLI {#cli-commands}

### Detail validator {#validator-details}

**Berdasarkan alamat penandatangan**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

Perintah ini harus menampilkan keluaran berikut:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

**Berdasarkan alamat validator**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

Perintah ini harus menampilkan keluaran berikut:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

### Penggabungan validator {#validator-join}

Perintah ini mengirimkan perintah penggabungan validator melalui CLI:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

Nilai `tx-hash` harus sama dengan hash Ethereum TX yang menghasilkan peristiwa `Staked` dan `log-index` harus sama di indeks tempat dihasilkannya peristiwa tersebut.

## REST API {#rest-apis}

| Nama | Metode | Endpoint |
|----------------------|------|------------------|
| Dapatkan kumpulan validator Heimdall | GET | /staking/validator-set |
| Dapatkan detail validator | GET | /staking/validator/validator-id |


Semua API kueri akan dihasilkan dalam format berikut:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
