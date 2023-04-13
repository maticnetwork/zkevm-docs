---
id: peppermint
title: Peppermint
description: Peppermint est un Tendermint modifié compatible Ethereum
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint est un Tendermint modifié. Il est modifié pour le rendre compatible avec les adresses Ethereum et vérifiable sur la chaîne Ethereum.

## Aperçu {#overview}

1. Modifications du schéma de signature
2. Modifications apportées à `vote` pour le rendre vérifiable sur le contrat intelligent Ethereum
3. Modifications du `vote`schéma d'encodage

Peppermint utilise un schéma de `secp256k1`signature pour vérifier les votes Tendermint sur le contrat intelligent solidité.

Source: [https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

Il ajoute `Data`le champ dans `Vote`et `Proposal`la structure pour obtenir `hash` pour les transactions dans le bloc. Sur le contrat intelligent, il vérifie si `Data` correspond à l'identifiant des données du point de contrôle et à la majorité (⅔+1) des signatures du validateur. L'idée est de vérifier si la majorité de l'ensemble des validateurs consent avec la transaction du contrat.

Peppermint utilise RLP pour obtenir `Vote` des octets au lieu de l'encodage Amino. `Data`Voici `Txs.Hash()`pour le bloc.

Source: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

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

Et utilise la librairie d'encodage RLP pour obtenir des données d'octets pour la signature sur le Vote.

Source: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

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

Source complète: [https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
