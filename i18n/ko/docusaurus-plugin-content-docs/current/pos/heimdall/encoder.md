---
id: encoder
title: 인코더 (Pulp)
description: 검문소와 같이 특별 거래를 생성하기 위해 RLP 인코딩을 통해
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# 인코더 (Pulp) {#encoder-pulp}

Heimdall은 이더리움 체인에서 Heimdall 트랜잭션을 검증해야 합니다. 이를 위해 RLP 인코딩을 사용하여 체크포인트와 같은 특수 트랜잭션을 생성합니다.

이 특수 트랜잭션은 디폴트인 amino 인코딩 대신 `pulp` (RLP 기반) 인코딩을 사용합니다.

Pulp는 접두어 기반의 간단한 인코딩 메커니즘을 사용해 인터페이스 디코딩을 해결합니다. `GetPulpHash` 메서드 확인

출처: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

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

아래와 같이 해당 `msg`의 접두어 바이트를 반환합니다.  다음은 purp 인코딩을 위해 객체를 등록하는 방법에 대한 예입니다.

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

Encoding은 RLP 인코딩을 하고 다음 해시 `GetPulpHash`을 준비합니다.`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

다음과 같이 디코딩 작업:

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

:::info 더 자세한 정보

Cosmos SDK는 [Amino](https://github.com/tendermint/go-amino/)와 [프로토콜 버퍼](https://developers.google.com/protocol-buffers) 두 개의 바이너리 와이어 인코딩 프로토콜을 사용하며, Amino는 객체 인코딩 사양입니다. 인터페이스를 지원할 수 있도록 확장된 Proto3의 하위 집합입니다. Proto3에 대한 자세한 정보는 [Proto3 스펙](https://developers.google.com/protocol-buffers/docs/proto3)을 참조하세요. Amino는 Proto3와 대부분 호환됩니다 (Proto 2와는 호환 안됨).

추가 정보: [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
