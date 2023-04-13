---
id: peppermint
title: Peppermint
description: Peppermint ist ein modifiziertes Ethereum-kompatibles Tendermint
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint ist ein modifiziertes Tendermint. Es wurde geändert, um es kompatibel zu Ethereum zu machen und auf der Ethereum-Chain verifizierbar zu machen.

## Übersicht {#overview}

1. Änderungen des Signaturschemas
2. Änderungen an `vote`, um es auf Ethereum-Smart-Contract verifizierbar zu machen
3. Änderungen des Kodierungsschemas von `vote`

Peppermint verwendet `secp256k1`signature um Peppermint über solidity Contracts zu überprüfen.

Quelle: [https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

Es fügt das Feld `Data` zur Struktur `Vote` und `Proposal` hinzu, um `hash` für die Transaktionen im Block zu erhalten. Bei Smart Contracts wird geprüft, ob `Data` mit dem Datenhash des Checkpoints und der Mehrheit (⅔+1) der Validator-Signaturen übereinstimmt. Die Idee ist, zu überprüfen, ob die Mehrheit der Validatoren mit der Transaktion im Contract einverstanden ist.

Peppermint verwendet RLP, um `Vote` Bytes statt Aminokodierung zu erhalten. Hier `Data`ist `Txs.Hash()`für den Block.

Quelle: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

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

Und die Verwendung der RLP-Kodierungslib, um Byte-Daten für die Signatur auf Vote zu erhalten.

Quelle: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

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

Complete Source: [https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
