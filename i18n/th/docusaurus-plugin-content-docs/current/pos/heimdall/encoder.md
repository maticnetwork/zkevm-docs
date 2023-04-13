---
id: encoder
title: ตัวเข้ารหัส (Pulp)
description: การเข้ารหัส RLP เพื่อสร้างธุรกรรมพิเศษ เช่น เช็คพอยต์
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# ตัวเข้ารหัส (Pulp) {#encoder-pulp}

Heimdall จำเป็นต้องตรวจสอบธุรกรรมของ Heimdall บนเชน Ethereumดังนั้นจึงใช้การเข้ารหัส RLP เพื่อสร้างธุรกรรมพิเศษ เช่น เช็คพอยต์

ธุรกรรมพิเศษนี้ใช้การเข้ารหัส `pulp` (ตาม RLP) แทนการเข้ารหัส Amino เริ่มต้น

Pulp ใช้กลไกการเข้ารหัสที่เรียบง่ายตามคำนำหน้าเพื่อแก้ปัญหาการถอดรหัสอินเทอร์เฟซตรวจสอบเมธอด `GetPulpHash`

ที่มา: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

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

ชุดคำสั่งด้านล่างจะส่งกลับไบต์นำหน้าสำหรับ `msg` ที่กำหนดนี่คือตัวอย่างเกี่ยวกับวิธีลงทะเบียนออบเจ็กต์สำหรับการเข้ารหัสของ Eulp :

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

การเข้ารหัสเป็นเพียงการเข้ารหัส RLP และแฮชการเตรียม`GetPulpHash`ของ :`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

การถอดรหัสทำงานดังต่อไปนี้:

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

:::info สำหรับข้อมูลเพิ่มเติม

Cosmos SDK ใช้โปรโตคอลการเข้ารหัสแบบมีสายแบบไบนารี 2 แบบคือ [Amino](https://github.com/tendermint/go-amino/) และ [Protocol Buffers](https://developers.google.com/protocol-buffers) โดยที่ Amino เป็นข้อกำหนดการเข้ารหัสอ็อบเจ็กต์เป็นชุดย่อยของ Proto3 พร้อมส่วนขยายสำหรับรองรับอินเทอร์เฟซดูข้อมูลเพิ่มเติมเกี่ยวกับ Proto3 ได้ใน[ข้อมูลจำเพาะ Proto3](https://developers.google.com/protocol-buffers/docs/proto3) ซึ่งส่วนใหญ่เข้ากันได้กับ Amino (แต่ไม่ใช่กับ Proto2)

ข้อมูลเพิ่มเติมที่นี่: [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
