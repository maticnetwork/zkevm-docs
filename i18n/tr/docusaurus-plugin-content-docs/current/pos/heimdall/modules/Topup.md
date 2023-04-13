---
id: topup
title: Topup
description: Heimdall zinciri için ücret ödemek için kullanılacak bir miktar
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Topup {#topup}

Heimdall Topup, Heimdall zinciri üzerinde ücret ödemek için kullanılacak miktardır.

Hesabınızı toplamanın iki yolu vardır:

1. Yeni doğrulayıcı işe girdiğinde, bu miktarın üzerinde işlem yapılmasına ek olarak işlem yapılmasına ek olarak yüksek miktardan bahsedebilirler; bu `topup`miktar, Heimdall üzerindeki ücret ödemesini sağlamak için Heimdall zincirinde denge olarak taşınacaktır.
2. Bir kullanıcı doğrudan Heimdall üzerinde üst düzey bakiyeyi artırmak için Ethereum üzerindeki akıllı sözleşmede üst üste binme işlevini çağırabilir.

## Mesajlar {#messages}

### MsgTopup {#msgtopup}

`MsgTopup` işlemi, staking yönetici sözleşmesinde Ethereum zincirinin `TopUpEvent` işlevine göre Heimdall üzerindeki bir adrese bakiye mint etmekten sorumludur.

Bu işlemin işleyicisi top-up talebini işler ve herhangi bir `msg.TxHash` ve `msg.LogIndex` için bakiyeyi yalnızca bir kez artırır. Top-up işlemi birden fazla kez yapılmak istendiğinde `Older invalid tx found` hatasını verir.

Top-up işlem mesajı için yapı şu şekildedir:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

`MsgWithdrawFee` işlemi Heimdall'dan Ethereum zincirine bakiye çekmekten sorumludur. Bir Doğrulayıcı Heimdall'dan herhangi bir miktarda fon çekebilir.

İşleyici, çekme işlemini verilen doğrulayıcının bakiyesinden düşürerek işler ve durumu bir sonraki denetim noktasını göndermek için hazırlar. Bir sonraki olası denetim noktası, belirli doğrulayıcı için fon çekme ile ilgili durumu içerir.

İşleyici, `ValidatorAddress` değerine göre doğrulayıcı bilgisini alır ve fon çekme işlemini yapar.

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## CLI komutları {#cli-commands}

### Topup Ücreti {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### Fon çekme ücreti {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

Hesapta yansıtılan topup miktarını kontrol etmek için aşağıdaki komutu çalıştırın

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## REST API’leri {#rest-apis}

| Ad | Yöntem | URL | Gövde Parametreleri |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Topup Ücreti | POST | /topup/fee | `id` Doğrulayıcı kimliği, `tx_hash` Ethereum zinciri üzerinde başarılı olan topup olayının işlem hash değeri, `log_index` Ethereum zinciri üzerinde çıkarılan topup olayının günlük endeksidir |
| Fon Çekme Ücreti | POST | /topup/withdraw | `amount` Fon çekme miktarı |
