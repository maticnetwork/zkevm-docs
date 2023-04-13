---
id: peppermint
title: Peppermint
description: Peppermint è una Tendermint compatibile con Ethereum modificata.
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint è un Tendermint modificato. È cambiato per renderlo compatibile con gli indirizzi di Ethereum e verificabile sulla catena di Ethereum.

## Panoramica {#overview}

1. Modifiche allo schema della firma
2. Cambiamenti in `vote` per renderlo verificabile sullo smart contract di Ethereum
3. Modifiche allo schema di codifica `vote`

Peppermint utilizza lo schema di `secp256k1`firma per verificare i voti di Tendermint sullo smart contract di solidity.

Fonte: [https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

Aggiunge il campo `Data`nelle strutture `Vote` e `Proposal` per ottenere `hash` per le transazioni nel blocco. Sullo smart contract controlla se `Data` corrisponde all'hash dei dati del checkpoint e alla maggioranza (⅔+1) delle firme del validatore. L'idea è di verificare se la maggior parte del set di validatori concorda sulla transazione nel contratto.

Peppermint utilizza RLP per ottenere`Vote` byte invece della codifica di Amino. `Data`Ecco `Txs.Hash()`per il blocco.

[Fonte: https://github.com/maticnetwork/tendermint/blob/peppermint/tipi/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

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

E utilizzando la libreria di codifica RLP per ottenere dati byte per la firma su Vote.

[Fonte: https://github.com/maticnetwork/tendermint/blob/peppermint/type/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

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

Fonte completa: [https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
