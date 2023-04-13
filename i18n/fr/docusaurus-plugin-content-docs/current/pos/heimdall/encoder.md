---
id: encoder
title: Encodeur (Pulp)
description: Encodage RLP pour produire des transactions spéciales, comme le point de contrôle
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# Encodeur (Pulp) {#encoder-pulp}

Heimdall doit vérifier les transactions de Heimdall sur la chaîne Ethereum. Pour cela, il utilise l'encodage RLP pour produire des transactions spéciales, comme le point de contrôle.

Cette transaction spéciale utilise l'encodage `pulp` (basé sur le RLP) au lieu du l'encodage amino par défaut.

Pulp utilise un mécanisme d'encodage simple basé sur les préfixes pour résoudre le décodage des interfaces. Vérifiez `GetPulpHash`la méthode.

Source: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

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

La commande ci-dessous retourne les octets de préfixe pour un `msg`.  Voici un exemple sur la façon d'enregistrer un objet pour l'encodage de pulpe:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

Le codage est juste un codage RLP et un hachage prepending `GetPulpHash`du :`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

Le décodage fonctionne comme suit:

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

:::info Pour plus d'informations

Le SDK Cosmos utilise deux protocoles d'encodage de fils binaires, [Amino](https://github.com/tendermint/go-amino/) et [Protocol Buffers](https://developers.google.com/protocol-buffers), sachant qu'Amino est une spécification d'encodage d'objets. Il s'agit d'un sous-ensemble de Proto3 avec une extension pour le support de l'interface. Voir la [spécification Proto3](https://developers.google.com/protocol-buffers/docs/proto3) pour plus d'informations sur Proto3, avec lequel Amino est largement compatible (mais pas avec Proto2).

En savoir plus ici : [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
