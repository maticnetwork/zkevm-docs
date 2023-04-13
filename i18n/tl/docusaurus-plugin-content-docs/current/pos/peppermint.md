---
id: peppermint
title: Peppermint
description: Ang Peppermint ay isang binagong Ethereum compatible Tendermint
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Ang Peppermint ay isang minodipikang Tendermint. Binago ito upang gawin itong compatible sa mga Ethereum address at nabeberipika sa Ethereum chain.

## Pangkalahatang-ideya {#overview}

1. Mga pagbabago sa scheme ng lagda
2. Mga pagbabago sa `vote`upang gawin itong nabeberipika sa Ethereum matalinong kontrata
3. Mga pagbabago sa scheme ng pag-encode sa `vote`

Gumagamit ang Peppermint ng `secp256k1`signature scheme para i-verify ang mga boto ng Tendermint sa pag-iisa na smart contract.

Pinagmulan: [https://github.com/maticnetwork/tendermint/blob /peppermint/crypto/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

Nagdaragdag ito`Data` ng field sa `Vote`at `Proposal`struct upang makakuha ng `hash`para sa mga transaksyon sa block. Sa smart contract, sinusuri nito kung `Data`tumutugma ito sa checkpoint hash ng data at karamihan (⅔+1) ng validator signatures. Ang ideya ay i-verify kung ang karamihan ng validator set ay sumasang-ayon sa transaksyon sa kontrata.

`Vote`Ginagamit ng Peppermint ang RLP upang makakuha ng bytes sa halip na pag-encode ng Amino. Narito `Data`para `Txs.Hash()`sa block.

Pinagmulan: [https://github.com/maticnetwork/tendermint/blob /peppermint/types/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

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

At gamit ang RLP encoding lib para makakuha ng byte data para sa lagda sa Vote.

Pinagmulan: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

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

Kumpletong Pinagmulan: [https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
