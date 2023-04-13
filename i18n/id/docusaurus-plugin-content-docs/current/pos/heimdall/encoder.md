---
id: encoder
title: Enkoder (Pulp)
description: Enkode RLP untuk menghasilkan transaksi khusus, seperti checkpoint
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# Enkoder (Pulp) {#encoder-pulp}

Heimdall harus memverifikasi transaksi Heimdall di rantai Ethereum. Untuk itu, Heimdall menggunakan pengodean RLP untuk menghasilkan transaksi khusus, seperti titik periksa.

Transaksi khusus ini menggunakan pengodean `pulp` (berbasis RLP) sebaliknya dari pengodean amino default.

Pulp menggunakan mekanisme pengodean sederhana berbasis prefiks untuk memecahkan pendekodean antarmuka. Periksa metode `GetPulpHash`.

Sumber: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

```go
const (
	// PulpHashLength pulp hash length
	PulpHashLength int = 4
)

// GetPulpHash returns string hash
func GetPulpHash(name string) []byte {
	return crypto.Keccak256([]byte(name))[:PulpHashLength]
}
```

Yang berikut ini mengembalikan bytes prefiks untuk `msg` tertentu.  Berikut ini contoh tentang bagaimana mendaftarkan objek untuk pengkodean pulp:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

Encoding hanya berisi pengkodean RLP dan menunggu hash `GetPulpHash`dari:`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

Dekoding bekerja sebagai berikut:

```go
// retrieve type of objet based on prefix
rtype := typeInfos[hex.EncodeToString(incomingData[:PulpHashLength])]

// create new object
newMsg := reflect.New(rtype).Interface()

// decode without prefix and inject into newly created object
if err := rlp.DecodeBytes(incomingData[PulpHashLength:], newMsg); err != nil {
	return nil, err
}

// result => newMsg
```

:::info Untuk informasi

Cosmos SDK menggunakan dua protokol pengodean kabel biner, [Amino](https://github.com/tendermint/go-amino/) dan [Protocol Buffers](https://developers.google.com/protocol-buffers), di mana Amino adalah spesifikasi pengodean objek. Ini adalah subbagian Proto3 dengan ekstensi untuk dukungan antarmuka. Lihat [spesifikasi Proto3](https://developers.google.com/protocol-buffers/docs/proto3) untuk informasi lebih lanjut tentang Proto3, dengan amino yang sebagian besar kompatibel (tetapi tidak dengan Proto2).

Lebih lanjut di sini: [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
