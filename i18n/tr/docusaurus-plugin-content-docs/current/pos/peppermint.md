---
id: peppermint
title: Peppermint
description: Peppermint modifiye edilmiş Ethereum uyumlu bir Tendermint
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint uyarlanmış bir Tendermint'tir. Ethereum adresleri ile uyumlu ve Ethereum zinciri üzerinde doğrulanabilir olacak şekilde değiştirilmiştir.

## Genel Bakış {#overview}

1. İmza planında değişiklikler
2. Ethereum akıllı sözleşmesinde doğrulanabilir hâle getirmeye yönelik `vote` değişiklikleri
3. `vote` kodlama planında değişiklikler

Peppermint Tendermint oylarını doğrulamak için `secp256k1`imza şemasını kullanır.

Kaynak: [https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go) / secp256k1/secp256k1_nocgo.go

Bloktaki işlemlere `hash` almak için `Vote` içine `Data` alanı ve `Proposal` yapısı ekler. Akıllı sözleşme üzerinde, `Data`'nın denetim noktası veri hash'i ve doğrulayıcı imzalarının çoğunluğu (⅔+1) ile eşleşip eşleşmediğini kontrol eder. Burada amaç, doğrulayıcı kümesinin çoğunluğunun sözleşmedeki işlem üzerinde hemfikir olup olmadığını doğrulamaktır.

Peppermint, Amino kodlaması yerine `Vote` bayt'ları almak için RLP kullanır. `Data`İşte blok `Txs.Hash()`için.

Kaynak: [https://github.com/maticnetwork/tendermint/blob/peppermint/types / canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

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

Ve Vote üzerinde imza için byte verisi almak için RLP kodlama kütüphanesi kullanır.

Kaynak: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

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

Komple Kaynak: [https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
