---
id: encoder
title: Encoder (Pulp)
description: codifica RLP per produrre transazioni speciali, come il checkpoint
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

Heimdall ha bisogno di verificare le transazioni di Heimdall sulla catena di Ethereum. Per questo utilizza la codifica RLP per produrre transazioni speciali, come checkpoint.

Questa transazione speciale utilizza la codifica `pulp` (basata su RLP) invece della codifica amminica predefinita.

Pulp utilizza un semplice meccanismo di codifica basato su prefisso per risolvere la decodifica dell'interfaccia. Verifica il metodo `GetPulpHash`.

Fonte: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

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

Quanto segue restituisce byte di prefisso per un dato `msg`.  Ecco un esempio su come registrare un oggetto per la codifica delle pulp:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

La codifica è solo la codifica RLP e l'hash prepending `GetPulpHash`della :`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

La decodifica funziona come segue:

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

:::info Per maggiori informazioni

Cosmos SDK utilizza due protocolli di codifica del cavo binario, [Amino](https://github.com/tendermint/go-amino/) e [Protocol Buffers](https://developers.google.com/protocol-buffers), dove Amino è una specifica di codifica degli oggetti. È un sottoinsieme di Proto3 con un'estensione per il supporto dell'interfaccia. Per ulteriori informazioni su Proto3, vedi [Proto3 spec](https://developers.google.com/protocol-buffers/docs/proto3), con cui Amino è ampiamente compatibile (ma non con Proto2).

Maggiori info qui: [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
