---
id: checkpoint
title: Titik periksa
description: Modul yang mengelola fungsi yang terkait checkpoint
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Titik periksa {#checkpoint}

Modul `checkpoint` mengelola fungsi terkait titik periksa untuk Heimdall. Dibutuhkan rantai Bor ketika titik periksa baru diusulkan di Heimdall untuk memverifikasi hash root titik periksa.

Semua yang berhubungan dengan data pos pemeriksaan dijelaskan dalam rincian [di sini](/docs/pos/heimdall/checkpoint).

## Siklus hidup titik periksa {#checkpoint-life-cycle}

Heimdall menggunakan algoritme seleksi pemimpin yang sama sebagai Tendermint untuk memilih proposal berikutnya. Ketika mengirimkan titik periksa di rantai Ethereum, pengiriman ini mungkin akan gagal karena beberapa alasan seperti batas gas, lalu lintas di Ethereum, dan biaya gas yang tinggi. Itulah sebabnya diperlukan proses titik periksa multitahap.

Setiap titik pemeriksaan memiliki validator sebagai proposer. Jika titik pemeriksaan pada rantai Ethereum gagal atau berhasil, `ack`dan `no-ack`transaksi akan mengubah proposal pada Heimdall untuk pos pemeriksaan berikutnya. Aliran chart berikut mewakili siklus hidup dari titik pemeriksa:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## Pesan {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint` menangani verifikasi titik periksa di Heimdall. Hanya pesan ini yang menggunakan pengkodean RLP karena perlu diverifikasi pada rantai Ethereum.

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

Setelah transaksi ini diproses di Heimdall, `proposer` melakukan pengambilan `votes` dan `sigs` dari Tendermint untuk transaksi ini dan mengirimkan titik periksa di rantai Ethereum.

Karena blok berisi sejumlah transaksi dan memverifikasi transaksi khusus ini di rantai Ethereum, maka bukti Merkle dibutuhkan. Untuk menghindari verifikasi bukti Merkle tambahan di Ethereum, Heimdall hanya mengizinkan satu transaksi di blok jika jenis transaksinya adalah `MsgCheckpoint`

Untuk mengizinkan mekanisme ini, Heimdall menetapkan transaksi `MsgCheckpoint` sebagai transaksi dengan konsumsi gas tinggi. Periksa [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

Transaksi ini akan menyimpan titik periksa yang diusulkan pada kondisi `checkpointBuffer`, dan bukannya pada kondisi daftar titik periksa yang sebenarnya.

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck` menangani pengiriman titik periksa yang berhasil. Berikut `HeaderBlock`ini counter pos pemeriksaan:

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

Terkait `TxHash` dan `LogIndex` yang valid untuk titik periksa yang dikirimkan, transaksi ini memverifikasi peristiwa berikut dan memvalidasi titik periksa di kondisi `checkpointBuffer`: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

Pada verifikasi peristiwa yang sukses, itu memperbarui jumlah titik pemeriksaan yang sebenarnya, juga dikenal sebagai `ackCount`dan membersihkan.`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck` menangani titik periksa yang gagal atau pengusul luring. Transaksi ini hanya valid apabila `CheckpointBufferTime` telah dilewati dari peristiwa berikut:

- Transaksi `ack` terakhir yang berhasil
- Transaksi `no-ack` terakhir yang berhasil

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

Transaksi ini memberikan batas waktu bagi pengusul saat ini untuk mengirim titik periksa/ack sebelum Heimdall memilih `proposer` baru untuk titik periksa berikutnya.

## Parameter {#parameters}

Modul titik periksa ini berisi parameter berikut:

| Kunci | Jenis | Nilai default |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * time.Second |


## Perintah CLI {#cli-commands}

### Parameter {#params}

Untuk mencetak semua parameter:

```go
heimdallcli query checkpoint params --trust-node
```

Hasil yang Diharapkan:

```yaml
checkpoint_buffer_time: 16m40s
```

### Mengirimkan titik periksa {#send-checkpoint}

Perintah berikut mengirimkan transaksi titik periksa di Heimdall:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### Kirim`ack`

Perintah berikut mengirimkan transaksi ack di Heimdall jika titik periksa berhasil di Ethereum:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### Kirim`no-ack`

Perintah berikut mengirimkan transaksi no-ack di Heimdall:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## REST API {#rest-apis}

| Nama | Metode | Endpoint |
|----------------------|------|------------------|
| Dapatkan kondisi buffer titik periksa saat ini | GET | /checkpoint/buffer |
| Dapatkan jumlah titik periksa | GET | /checkpoint/count |
| Dapatkan detail titik periksa berdasarkan indeks blok | GET | /checkpoint/headers/<header-block-index\> |
| Dapatkan titik periksa terakhir | GET | /checkpoint/latest-checkpoint |
| Dapatkan detail no-ack yang lalu | GET | /checkpoint/last-no-ack |
| Detail titik periksa untuk blok awal dan akhir tertentu | GET | /checkpoint/<start\>/<end\> |
| Titik periksa berdasarkan nomor | GET | /checkpoint/<checkpoint-number\> |
| Semua titik periksa | GET | /checkpoint/list |
| Dapatkan jumlah ack, buffer, kumpulan validator, jumlah validator, dan detail last-no-ack | GET | /overview |


Semua API kueri akan memberikan hasilnya dalam format berikut:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
