---
id: encoder
title: Encoder (Pulp)
description: Кодирование RLP для создания специальных транзакций, таких как checkpoint
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

Heimdall необходимо проверить транзакции Heimdall в сети Ethereum. Для этого он использует кодирование RLP для создания специальных транзакций, таких как checkpoint.

Эта специальная транзакция использует кодировку `pulp` (на основе RLP) вместо кодировки amino по умолчанию.

Pulp использует простой механизм кодирования на основе префиксов для решения проблемы декодирования интерфейса. См. метод `GetPulpHash`.

Источник: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

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

Приведенный ниже пример возвращает префикс-байты для заданного `msg`.  Вот пример того, как зарегистрировать объект для кодирования пульпы:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

Кодирование — это просто кодирование RLP и хэш предварительного `GetPulpHash`отображения :`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

Декодирование работает следующим образом:

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

:::info Для получения дополнительной информации

В Cosmos SDK используются два протокола двоичного кодирования: [Amino](https://github.com/tendermint/go-amino/) и [Protocol Buffers](https://developers.google.com/protocol-buffers), где Amino — это спецификация кодирования объекта. Это подмножество Proto3 с расширением для поддержки интерфейса. См. [спецификацию Proto3](https://developers.google.com/protocol-buffers/docs/proto3) для получения дополнительной информации о Proto3, с которым Amino в значительной степени совместим (но не с Proto2).

Подробнее здесь: [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
