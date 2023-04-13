---
id: peppermint
title: Peppermint
description: Peppermint adalah Tendermint yang kompatibel dengan Ethereum
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint adalah modifikasi Tendermint. Tendermint diubah untuk membuatnya kompatibel dengan alamat Ethereum dan dapat diverifikasi di rantai Ethereum.

## Gambaran umum {#overview}

1. Perubahan pada pola tanda tangan
2. Perubahan pada `vote` untuk membuatnya dapat diverifikasi pada kontrak cerdas Ethereum
3. Perubahan pada pola penyandian `vote`

Peppermint menggunakan skema tanda `secp256k1`tangan untuk memverifikasi suara Tendermint dengan kontrak solidity smard.

Sumber: [https://github.com/maticnetwork/tendermint/bob/peppermint/crypto/secp256k1_nocgo.com](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

Peppermint menambahkan kolom `Data` ke dalam struktur `Vote` dan `Proposal` untuk mendapatkan `hash` untuk transaksi di blok tersebut. Pada kontrak cerdas, Peppermint memastikan apakah `Data` sesuai dengan hash data titik periksa dan mayoritas (⅔+1) tanda tangan validator. Gagasannya adalah untuk memverifikasi apakah mayoritas kumpulan validator menyetujui transaksi di kontrak.

Peppermint menggunakan RLP untuk mendapatkan byte `Vote`, dan bukannya penyandian Amino. `Data`Ini `Txs.Hash()`untuk blok.

Sumber: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

```go
// [peppermint] create RLP vote to decode in contract
type CanonicalRLPVote struct {
	ChainID string
	Type    byte
	Height  uint
	Round   uint
	Data    []byte
}
```

Dan menggunakan pustaka penyandian RLP agar memperoleh data byte untuk tanda tangan pada Pemilihan suara.

[Sumber: https://github.com/maticnetwork/tendermint/blob/peppermint/type/voting.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

```go
func (vote *Vote) SignBytes(chainID string) []byte {
	// [peppermint] converted from amino to rlp
	bz, err := rlp.EncodeToBytes(CanonicalizeVote(chainID, vote))
	if err != nil {
		panic(err)
	}
	return bz
}
```

Complete Source: [https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
