---
id: validator-key-management
title: Doğrulayıcı anahtar yönetimi
description: İmzacı ve Sahibi Anahtar doğrulayıcı yönetimi
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# Doğrulayıcı anahtar yönetimi {#validator-key-management}

Her doğrulayıcı Polygon'daki doğrulayıcı ile ilgili faaliyetleri yönetmek için iki anahtar kullanır. İmzalayan anahtarı düğümde tutulur ve genellikle `hot` cüzdan olarak değerlendirilir, sahip anahtarı ise son derece güvende tutulmalıdır, nadiren kullanılır ve genellikle `cold` cüzdan olarak değerlendirilir. Stake edilmiş fonlar sahip anahtarıyla kontrol edilir.

Bu sorumlulukların ayrımı, güvenlik ve kullanım kolaylığı arasında etkin bir ticaret yapılmasını sağlamak için yapılmıştır. Her iki anahtar da Ethereum uyumlu adreslerdir ve aynı şekilde çalışır. Ve evet, aynı Sahibi ve İmzacı anahtarlarına sahip olmak mümkündür.

## İmzacı anahtarı {#signer-key}

İmzacı anahtarı, Heimdall blokları, kontrol noktaları ve diğer imzalama ile ilgili faaliyetleri imzalamak için kullanılan bir adrestir. Bu anahtarın özel anahtarı, imza amaçları için Doğrulayıcı düğümü üzerinde olacaktır. Stake, ödüller ya da delegasyonları yönetemez.

Doğrulayıcı bu adreste iki tür denge bulundurmalıdır:

- Heimdall üzerinde doğrulayıcı sorumluluklarını yerine getirmek için Heimdall üzerinde matic token’lar (Topup işlemleri üzerinden)
- Ethereum üzerinde denetim noktalarını göndermek için Ethereum zincirinde ETH

## Sahip anahtarı {#owner-key}

Sahibi anahtarı, imza atanın anahtarını değiştirmek, ödülleri çekmek, Ethereum zinciri üzerindeki delegasyon ile ilgili parametreleri yönetmek için kullanılan bir adrestir. Bu anahtar için özel anahtar her ne pahasına olursa olsun güvende olmalıdır.

Bu anahtar üzerinden yapılan tüm işlemler Ethereum zinciri üzerinde gerçekleştirilecektir.

## İmzacı değişikliği {#signer-change}

`StakingInfo.sol` üzerinde Ethereum zincirinde imzalayan değişikliği durumunda şu olay oluşturulur: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Heimdall köprüsü bu olayları işler ve olaylara dayalı olarak durumu değiştirmek için Heimdall üzerinde işlemleri gönderir.