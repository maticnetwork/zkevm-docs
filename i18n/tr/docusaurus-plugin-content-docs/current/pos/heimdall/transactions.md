---
id: transactions
title: İşlemler
description: İşlemler nedir ve ne zaman kullanıldıkları
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# İşlemler {#transactions}

İşlemler, [modül](https://docs.cosmos.network/main/core/context.html) içindeki durum değişikliklerini tetikleyen bağlamlarda ve [iletilerde](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) tutulan meta verilerden oluşur.

Kullanıcılar bir uygulamayla etkileşime geçmek ve durum değişiklikleri (ör. coin göndermek) yapmak istediklerinde işlem oluştururlar. İşlem ağa yayımlanmadan önce her bir işlemin `message`’ı uygun hesapla bağlantılı özel anahtar kullanılarak imzalanmalıdır. Daha sonra işlemin bloka dâhil edilmesi, doğrulanması ve konsensüs süreci ile ağ tarafından onaylanması gerekir. Bir işlemin yaşam döngüsü hakkında daha fazla bilgi edinmek için [buraya](https://docs.cosmos.network/main/basics/tx-lifecycle.html) tıklayın.

## Tür Tanımı {#type-definition}

İşlem nesneleri arabirimi uygulayan SDK `Tx`türleridir.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

İşlemler hakkında daha fazla ayrıntı: [https://docs.cosmos.network/main/core/transactions.html](https://docs.cosmos.network/main/core/transactions.html)
