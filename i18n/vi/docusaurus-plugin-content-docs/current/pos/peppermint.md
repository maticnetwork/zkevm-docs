---
id: peppermint
title: Peppermint
description: Bạc hà là một Tendermint đã cải tiến
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint là một Tendermint đã được sửa đổi. Nó được thay đổi để tương thích với các địa chỉ Ethereum và có thể xác minh được trên chuỗi Ethereum.

## Tổng quan {#overview}

1. Thau đổi về lược đồ chữ ký
2. Thay đổi đối với `vote`để làm cho nó có thể xác minh được trên hợp đồng thông minh Ethereum
3. Các thay đổi đối với `vote`lược đồ mã hóa

Peppermint sử dụng kế hoạch đặc `secp256k1`trưng để xác thực số phiếu bầu cho hợp đồng thông minh của Tendermint.

Nguồn: [https://github.com/maticnet/struc/bblob/peppermint/crypto/secp256k1/secp256k1_noc.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

Nó thêm`Data` trường vào `Vote`và `Proposal`cấu trúc để lấy `hash`cho các giao dịch trong khối. Trên hợp đồng thông minh, nó sẽ kiểm tra xem `Data` có khớp với hàm băm dữ liệu điểm kiểm duyệt và phần lớn (⅔+1) chữ ký trình xác thực hay không. Ý tưởng là xác minh xem phần lớn bộ xác thực có đồng ý về giao dịch trong hợp đồng hay không.

Peppermint sử dụng RLP để lấy `Vote`byte  thay vì mã hóa Amino. Đây `Data`là `Txs.Hash()`cho khối nhà.

Nguồn: [https://github.com/maticnet/struc/blob/peppermint/type/canical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

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

Và sử dụng lib mã hóa RLP để lấy dữ liệu byte cho chữ ký trên Vote.

Nguồn: [https://github.com/maticnet/struc/blom/peppermint/typept/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

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

Complete Source: [https://github.com/maticnet/entric/mint](https://github.com/maticnetwork/tendermint)
