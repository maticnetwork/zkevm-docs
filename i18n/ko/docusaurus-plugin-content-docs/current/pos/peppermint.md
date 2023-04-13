---
id: peppermint
title: 페퍼민트
description: Peppermint는 수정 된 이더리움 호환 Tendermint입니다.
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# 페퍼민트 {#peppermint}

페퍼민트는 수정된 텐더민트입니다. 이더리움 주소와 호환 가능하고 이더리움 체인에서 검증 가능하도록 변경되었습니다.

## 개요 {#overview}

1. 서명 체계 변경
2. 이더리움 스마트 계약에서 검증할 수 있도록 `vote`로 변경
3. `vote`로 인코딩 체계 변경

Peppermint는 `secp256k1`서명 기법을 사용하여 Solidity 스마트 계약에 Tendermint 표를 확인합니다.

출처: [https://github.com/maticnetwork/tablob/permint/cyppermint/cyppermint/secp256k1/secp256k1_nego.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

이것은 `Data`필드를  `Vote`와 `Proposal` 구조에 추가하여, 블록의 트랜잭션을 위한 `hash`를 얻습니다. 스마트 계약에서, 페퍼민트는 `Data`가 체크포인트 데이터 해시와 대부분(⅔+1)의 유효성 검사자 서명과 일치하는지 확인합니다.  이는 유효성 검사자 세트 대다수가 계약상의 트랜잭션에 동의하는지 확인하고자 하는 것입니다.

페퍼민트는 Amino 인코딩 대신 `Vote` 바이트를 얻기 위해 RLP를 사용합니다. 다음은 블록을 `Txs.Hash()`위한 `Data`것입니다.

출처: [https://github.com/maticnetwork/tablob/peptermint/permint/types/conical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

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

그리고 RLP 인코딩 라이브러리를 사용해 투표시 서명을 위한 바이트 데이터를 얻습니다.

출처: [https://github.com/maticnetwork/tablob/peptermint/type/tive/table/table.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

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

전체 출처: [https://github.com/maticnetwork/tonmt를](https://github.com/maticnetwork/tendermint) 완성한 https://github.com/ticnetwork/tonmt를 완성합니다.
