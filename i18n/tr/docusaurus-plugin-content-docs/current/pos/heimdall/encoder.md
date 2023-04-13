---
id: encoder
title: Kodlayıcı (Pulp)
description: RLP kodlaması kontrol noktası gibi özel işlemler üretecek
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# Kodlayıcı (Pulp) {#encoder-pulp}

Heimdall'ın Ethereum zinciri üzerindeki Heimdall işlemlerini doğrulaması gerekir. Bunun için denetim noktası gibi özel işlemler üretmek için RLP kodlamasını kullanır.

Bu işlem varsayılan amino kodlaması yerine `pulp` (RLP tabanlı) kodlamasını kullanır.

Pulp, arabirim kod çözme işlemini yapmak için ön ek tabanlı basit bir kodlama mekanizması kullanır. `GetPulpHash` yöntemini kontrol edin.

Kaynak: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

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

Aşağıdaki işlem, belirli bir `msg` için ön ek baytlarını döndürür.  İşte hamur kodlaması için bir nesnenin nasıl kaydedileceğine dair bir örnek:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

Kodlama sadece RLP kodlaması ve bu `GetPulpHash`kodlamanın ön planında bulunan hash`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

Decoding aşağıdaki gibi çalışır:

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

:::info Daha fazla bilgi için

Cosmos SDK, iki adet binary wire kodlama protokolünü kullanır: [Amino](https://github.com/tendermint/go-amino/) ve [Protokol Arabellekleri](https://developers.google.com/protocol-buffers). Amino bir nesne kodlama özelliğidir. Proto3 için bir alt kümedir ve arabirim desteği için uzantı sunar. Proto3 hakkında daha fazla bilgi için Amino'nun büyük ölçüde uyumlu olduğu [Proto3 özelliklerine](https://developers.google.com/protocol-buffers/docs/proto3) bakın (Proto2 ile uyumlu değildir).

Daha fazlası için: [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
