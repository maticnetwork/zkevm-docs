---
id: encoder
title: Encoder (Pulp)
description: RLP ang RLP para makabuo ng mga espesyal na transaksyon, tulad ng checkpoint
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# Encoder (Pulp) {#encoder-pulp}

Kailangang i-verify ng Heimdall ang mga transaksyon ng Heimdall sa Ethereum chain. Para diyan, gumagamit ito ng RLP encoding para makagawa ng mga espesyal na transaksyon, tulad ng mga checkpoint.

Gumagamit ang espesyal na transaksyong ito ng `pulp`(nakabatay sa RLP) na pag-encode sa halip na default na amino encoding.

Gumagamit ang Pulp ng prefix-based na simpleng encoding mechanism para lutasin ang interface decoding. Suriin ang `GetPulpHash`na paraan.

Pinagmulan: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

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

Ang nasa ibaba ay nagbabalik ng prefix-bytes para sa isang naibigay na`msg` . Narito ang isang halimbawa kung paano magparehistro ng isang bagay para sa pag-encode ng pulp:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

Pag-encode ng pag-encode ng pag-encode ng RLP at `GetPulpHash`prepending ng hash ng :`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

Gumagana ang pag-decode ng mga sumusunod:

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

:::info Para sa karagdagang impormasyon

Ang Cosmos SDK ay gumagamit ng dalawang binary wire protocol ng pag-encode, ang [Amino](https://github.com/tendermint/go-amino/) at ang [Protocol Buffers](https://developers.google.com/protocol-buffers), protokol na ang Amino ay isang pagtutukoy object na pag-encode. Ito ay isang subset ng Proto3 na may extension para sa suporta sa interface. Tingnan ang [Proto3 spec](https://developers.google.com/protocol-buffers/docs/proto3) para sa karagdagang impormasyon tungkol sa Proto3, na Amino ay higit sa lahat na katugma sa (ngunit hindi sa Proto2).

Higit pa [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
