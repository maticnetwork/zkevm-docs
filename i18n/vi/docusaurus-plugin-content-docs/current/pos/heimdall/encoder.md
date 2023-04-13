---
id: encoder
title: Mã hoá (Pulp)
description: Mã hóa RLP để tạo ra các giao dịch đặc biệt, như điểm kiểm tra
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# Mã hoá (Pulp) {#encoder-pulp}

Heimdall cần xác minh các giao dịch của Heimdall trên chuỗi Ethereum. Đối với điều đó, nó sử dụng mã hóa RLP để tạo ra các giao dịch đặc biệt, như điểm kiểm duyệt.

Giao dịch đặc biệt này sử dụng mã hóa`pulp` (dựa trên RLP) thay vì mã hóa amino mặc định.

Pulp sử dụng cơ chế mã hóa đơn giản dựa trên tiền tố để giải mã giao diện. Kiểm tra `GetPulpHash`phương pháp.

Nguồn: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

```go
const (
	// PulpHashLength pulp hash length
	PulpHashLength int = 4
)

// GetPulpHash returns string hash
func GetPulpHash(name string) []byte {
	return crypto.Keccak256([]byte(name))[:PulpHashLength]
}
```

Dưới đây trả về byte tiền tố cho một nhất định`msg`.  Dưới đây là một ví dụ về cách đăng ký một vật thể cho sự phát âm của pulp:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

Mã hóa chỉ là mã RLP và sự kiện trước khi chờ đợi `GetPulpHash`của :`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

Mã hóa hoạt động như sau:

```go
// retrieve type of objet based on prefix
rtype := typeInfos[hex.EncodeToString(incomingData[:PulpHashLength])]

// create new object
newMsg := reflect.New(rtype).Interface()

// decode without prefix and inject into newly created object
if err := rlp.DecodeBytes(incomingData[PulpHashLength:], newMsg); err != nil {
	return nil, err
}

// result => newMsg
```

:::info Để tìm thông tin thêm

Cosmos SDK sử dụng hai giao thức mã hóa dây nhị phân, [Amino](https://github.com/tendermint/go-amino/) và [Bộ đệm giao thức](https://developers.google.com/protocol-buffers), trong đó Amino là một đặc điểm kỹ thuật mã hóa đối tượng. Nó là một tập hợp con của Proto3 với một phần mở rộng để hỗ trợ giao diện. Xem [thông số kỹ thuật của Proto3](https://developers.google.com/protocol-buffers/docs/proto3) để biết thêm thông tin, phần lớn Amino tương thích với Proto3 (nhưng không phải với Proto2).

Thêm thông tin ở đây: [https://docs.cossos.net/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
