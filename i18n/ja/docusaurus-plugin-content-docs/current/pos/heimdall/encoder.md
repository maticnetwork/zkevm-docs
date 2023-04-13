---
id: encoder
title: エンコーダ（Pulp）
description: チェックポイントなどの特別なトランザクションを生成するためのRLPエンコード
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# エンコーダ（Pulp） {#encoder-pulp}

Heimdallは、Ethereumチェーン上のHeimdallのトランザクションを確認する必要があります。このために、RLPエンコーディングを使用して、チェックポイントなどの特殊なトランザクションを生成します。

この特殊なトランザクションは、デフォルトのaminoエンコーディングではなく、`pulp`（RLPベースの）エンコーディングを使用しています。

Pulpは、プレフィックスベースのシンプルなメカニズムを使用してインターフェースデコーディングを解決します。メソッドを`GetPulpHash`確認してください。

出典：[https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

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

以下は、与えられた`msg`のプレフィックスバイトを返します。パルプエンコードのためのオブジェクトを登録する方法を例に示します：

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

エンコードは、RLPエンコードと`GetPulpHash`前提のハッシュに過ぎません：`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

デコードは次のとおりです：

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

:::info 詳細については、こちらをご覧ください。

CosmosSDKは、二つのバイナリワイヤエンコーディングプロトコル、[Amino](https://github.com/tendermint/go-amino/)およびAminoがオブジェクトエンコーディングの仕様である[Protocol Buffers](https://developers.google.com/protocol-buffers)を使用しています。これは、インターフェースサポート用の拡張のあるProto3のサブセットです。Aminoが広範囲に互換性のある（しかしProto2ではありません）Proto3についての詳細情報は、[Proto3 spec](https://developers.google.com/protocol-buffers/docs/proto3)（Proto3仕様）をご覧ください。

詳細は：[https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
