---
id: auth
title: Auth
description: Temel işlem ve hesap türlerini belirlemek için modül
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Auth Modülü {#auth-module}

Bu belge Heimdall `auth`modülünü tanımlar.

`auth` modülü, bir uygulama için temel işlem ve hesap türlerini belirlemekten sorumludur. Tüm temel işlem doğruluk kontrollerinin (imzalar, nonce'lar, ek alanlar) gerçekleştirildiği fiyat işleyicisini içerir ve diğer modüllerin hesapları okuma, yazma ve değiştirmesine olanak tanıyan hesap koruyucusunu açığa çıkarır.

## Gaz ve Ücretler {#gas-and-fees}

Ücretler, ağ operatörü için iki amaca hizmet eder.

Ücretler, her tam düğüm tarafından depolanan durumun büyümesini kısıtlar ve küçük ekonomik değer ihtiva eden işlemlerin genel amaçlı sansürlenmesine izin verir. Ücretler, doğrulayıcıların kullanıcı ağ ve kimlik bilgileri ile ilgilenmediği bir anti-spam mekanizması olarak en uygun şekilde kullanılır.

Heimdall herhangi bir işlem için özel sözleşme veya kodu desteklemediği için, sabit maliyet işlemleri kullanır. Sabit maliyetli işlemler için doğrulayıcı, Ethereum zincirinde hesaplarını doldurabilir ve [Topup](Topup.md) modülünü kullanarak Heimdall üzerinde token alabilir.

## Türler {#types}

Hesapların yanı sıra (Devlette belirtilen) uth modülü tarafından maruz kalan tipler **StdSignature****,** isteğe bağlı bir genel anahtarın ve byte dizisi olarak kriptografik imzanın birleşimi, **StdTx** ve **StdSignDoc** ile stdSignature kullanılarak `sdk.Tx`arabirimi uygulayan bir yapı olan **StdTx** için işlem gönderen imzalamalı bir yeniden başlatma önleme yapısı olarak belirlenmiştir.

### StdSignature {#stdsignature}

`StdSignature`, bir bayt dizisinin türleridir.

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

Bir `StdTx`,  `sdk.Tx` arabirimini uygulayan ve birçok işlem türünün amacına hizmet edecek kadar jenerik olması muhtemel bir yapıdır.

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

 `StdSignDoc`,  imzalanması gereken bir yeniden çalıştırmayı önleme yapısıdır. Gönderilen herhangi bir işlemin (ki belli bir bayt dizisi üzerinden uygulanan bir imzadan ibarettir) yalnızca Heimdall üzerine ulaştığında yürütülebilir olmasını sağlar.

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### Hesap {#account}

İşlemler için adresleri, coin'leri ve nonce'ları yönetir. Ayrıca işlemleri imzalar ve doğrular.

Kaynak: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## Parametreler {#parameters}

Auth modülü aşağıdaki parametreleri içerir:

| Anahtar | Tip | Varsayılan değer |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | string | "1000000000000000" |


## CLI Komutları {#cli-commands}

### Hesabı göster {#show-account}

Hesap ile ilgili verileri Heimdall'a yazdırmak için;

```bash
heimdalld show-account
```

Beklenen Sonuç:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### Hesap ve coin detayları {#account-and-coin-details}

Hesap detaylarını, paralar, sıra ve hesap numarasını görüntülemek için;

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

Beklenen Sonuç:

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### Parametreler {#parameters-1}

Tüm parametreleri yazdırmak için;

```go
heimdallcli query auth params
```

Beklenen Sonuç:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## REST API’leri {#rest-apis}

| Ad | Bitiş noktası | Açıklama |
|----------------------|--------|------------------|
| Hesap ayrıntıları | /auth/accounts/{address} | Bir adres için tüm ayrıntıları getirir |
| Hesap dizisi ayrıntıları | /auth/accounts/{address}/sequence | Yalnızca imza için gerekli ayrıntıları getirir |
| Auth parametreleri | /auth/params | Auth modülünün kullandığı tüm parametreleri getirir |
