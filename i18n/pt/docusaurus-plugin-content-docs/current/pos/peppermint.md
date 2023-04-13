---
id: peppermint
title: Peppermint
description: O Peppermint é um Tendermint compatível com Ethereum modificado
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

O Peppermint é um Tendermint modificado. É alterado para o tornar compatível com endereços da Ethereum e verificável na chain Ethereum.

## Visão geral {#overview}

1. Alterações no esquema de assinatura
2. Alterações no `vote` para o tornar verificável no contrato inteligente da Ethereum
3. Alterações no esquema de codificação de `vote`

O Peppermint usa esquema de `secp256k1`assinatura para verificar os votos do Tendermint sobre contrato inteligente de solidez.

Fonte: [https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

Este adiciona o campo `Data` na estrutura `Vote` e `Proposal` para obter `hash` para transações no bloco. No contrato inteligente, este verifica se os `Data` correspondem ao hash dos dados do checkpoint e à maioria (⅔+1) das assinaturas dos validadores. A ideia é verificar se a maioria do conjunto de validadores concorda com a transação que consta do contrato.

O Peppermint usa o RLP para obter bytes de `Vote`, em vez da codificação da Amino. Aqui `Data`está `Txs.Hash()`para o bloco.

Fonte: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

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

E usa a lib de codificação do RLP para obter dados de bytes para assinatura nos votos.

Fonte: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

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
