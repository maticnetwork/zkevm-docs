---
id: encoder
title: Encoder (Pulp)
description: RLP-Codierung zur Erzeugung spezieller Transaktionen wie Checkpoint
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

Heimdall muss die Transaktionen von Heimdall in der Ethereum Chain verifizieren. Dazu verwendet es RLP-Kodierung, um spezielle Transaktionen wie Checkpoint zu erzeugen.

Diese spezielle Transaktion verwendet die Kodierung durch `pulp` (RLP-basiert) anstelle der Standard-Aminokodierung.

Pulp verwendet einen präfixbasierten einfachen Kodierungsmechanismus, um die Schnittstellendekodierung zu lösen. Methode `GetPulpHash` überprüfen.

Quelle: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

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

Die folgende Funktion liefert Präfix-Bytes für eine gegebene `msg`.  Hier ist ein Beispiel darüber, wie du ein Objekt für die Pulp Codierung registrierst:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

Encoding ist nur RLP-Codierung und vorherzusagen Hash `GetPulpHash`von der :`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

Decoding arbeitet wie folgt:

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

:::info Für mehr Informationen

Das Cosmos SDK verwendet zwei Binärdraht-Kodierungsprotokolle, [Amino](https://github.com/tendermint/go-amino/) und [Protokollpuffer](https://developers.google.com/protocol-buffers), wobei Amino eine Objektkodierungsspezifikation ist. Es handelt sich um eine Untermenge von Proto3 mit einer Erweiterung für die Unterstützung von Schnittstellen. Weitere Informationen zu den [Spezifikationen von Proto3](https://developers.google.com/protocol-buffers/docs/proto3), mit denen Amino weitgehend kompatibel ist (aber nicht mit Proto2), finden Sie in den Spezifikationen für Proto3.

Mehr hier: [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
