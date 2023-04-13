---
id: peppermint
title: Peppermint
description: PeppermintはEthereumと互換性のあるテンダーミントを変更しました。
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermintは、変更済みのTendermintです。Ethereumアドレスと互換性を持たせ、Ethereumチェーンで検証可能にするために変更されました。

## 概要 {#overview}

1. 署名スキームに変更する
2. `vote`に変更して、Ethereumスマートコントラクトで検証可能にする
3. `vote`エンコーディングスキームに変更する

Peppermintは、Solidityスマートコントラクトでテンダーミントの投票を検証するために`secp256k1`署名スキームを使用しています。

出典[：https://github.com/maticnetwork/tendermint/blob/pepermint/crypto/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

これは、`Vote`と`Proposal`構造に`Data`フィールドを追加し、ブロックにトランザクション用の`hash`を取得します。スマートコントラクトでは、`Data`がチェックポイントデータハッシュとバリデータ署名の多数派（3分の２プラス1）に一致するかを確認します。このアイデアは、バリデータセットの多数派がコントラクトのトランザクションに合意するかを確認するものです。

Peppermintは、RLPを使用して、Aminoエンコーディングではなく`Vote`バイトを取得します。ブロックについては`Data`こちら`Txs.Hash()`です。

[ソース：https://github.com/maticnetwork/tendermint/blob/pepermint/types/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

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

そして、RLPエンコーディングライブラリを使用して、投票で署名用のバイトデータを取得します。

[ソース：https://github.com/maticnetwork/tendermint/blob/pepermint/types/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

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

完全なソース：[https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
