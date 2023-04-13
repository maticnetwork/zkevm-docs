---
id: encoder
title: Codificador (Pulp)
description: Codificação de RLP para produzir transações especiais, como ponto de verificação
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# Codificador (Pulp) {#encoder-pulp}

O Heimdall tem de verificar as transações do Heimdall na chain da Ethereum. Para isso, este usa a codificação RLP para produzir transações especiais, como checkpoint.

Esta transação especial usa a codificação `pulp` (baseada em RLP) em vez da codificação amino padrão.

O Pulp usa um mecanismo de codificação simples baseado no prefixo para resolver a descodificação de interface. Verifique o método `GetPulpHash`.

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

O abaixo retorna prefix-bytes para um dado `msg`.  Aqui está um exemplo sobre como registrar um objeto para codificação de polpa:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

A codificação é apenas a codificação de RLP e o hash prepending `GetPulpHash`do :`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

A descodificação funciona da seguinte forma:

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

:::info Para mais informações

O SDK Cosmos utiliza dois protocolos de codificação de fio binário, [Amino](https://github.com/tendermint/go-amino/) e [Buffers de Protocolo](https://developers.google.com/protocol-buffers), onde o Amino é uma especificação de codificação de objeto. É um subconjunto do Proto3 com uma extensão para suporte de interface. Consulte a [especificação do Proto3](https://developers.google.com/protocol-buffers/docs/proto3) para obter mais informações sobre o Proto3, com a qual o Amino é em grande parte compatível (mas não com o Proto2).

Mais aqui: [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
