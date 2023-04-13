---
id: peppermint
title: Peppermint
description: Peppermint — модифицированный Ethereum, совместимый с Tendermint
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint — это модифицированный Tendermint. Он изменен, чтобы сделать его совместимым с адресами Ethereum и поддающимся проверке в цепочке Ethereum.

## Обзор {#overview}

1. Изменения в схеме подписи
2. Изменения в `vote`, чтобы его можно было проверить на смарт-контракте Ethereum
3. Изменения в схеме кодирования `vote`

Peppermint использует схему `secp256k1`подписи для проверки голосов Tendermint на смарт-контракте солидности.

Источник: [https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

Он добавляет поле `Data` в `Vote` и структуру `Proposal`, чтобы получить `hash` для транзакций в блоке. В смарт-контракте он проверяет, совпадает ли `Data` с хэшем данных checkpoint и большинством (⅔+1) подписей валидатора. Идея состоит в том, чтобы проверить, согласны ли большинство из набора валидаторов на транзакцию в контракте.

Peppermint использует RLP для получения байт `Vote` вместо кодировки Amino. `Data`Вот `Txs.Hash()`для блока.

Источник: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

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

И используя библиотеку кодирования RLP для получения байтовых данных для подписи на голосовании.

Источник: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

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

Полный Источник: [https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
