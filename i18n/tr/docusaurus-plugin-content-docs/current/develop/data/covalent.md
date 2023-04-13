---
id: covalent
title: Covalent Kullanma
sidebar_label: Covalent
description: Covalent'in birleştirilmiş API'sini veri için kullanmayı öğrenin
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## Giriş {#introduction}

Polygon, daha hızlı ve aşırı derecede düşük maliyetli işlemler için çözüm sağlayan
ve ana zincirde sonlanan PoS tabanlı yan zincirler ile uyarlanmış bir Plasma sürümü
 kullanarak Ethereum'a muazzam ölçek getiriyor. Polygon ağı,
Ethereum ana zincirine itilen PoS denetim noktaları kullanarak canlılık sağlıyor.
Bu, tek bir Polygon yan zincirinin teorik olarak blok başına `2^16` işlemi ve
gelecekte birden çok zincirde muhtemelen milyonlarca işlemi başarmasını mümkün kılıyor.

### Kısa bilgiler {#quick-facts}

<TableWrap>

| Özellik | Değer |
|---|---|
| Polygon Mainnet zincir kimliği | `137` |
| Polygon Mumbai Testnet zincir kimliği | `80001` |
| Polygon Blockchain Gezgini | https://polygonscan.com/ |
| Blok süresi | ~3 saniye |
| Veri yenileme gecikmesi | ~6 saniye veya 2 Blok |

</TableWrap>

:::tip Hızlı Başlangıç

Bu **[<ins>giriş videosuna</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)** göz atıp
başlangıç yapın.

:::

## Desteklenen uç noktalar {#supported-endpoints}

Matic mainnet ve Mumbai testnet için tüm [__A Sınıfı__](https://www.covalenthq.com/docs/api/#tag--Class-A) uç noktaları desteklenir. Birleşik API üzerinden `chainId`'yi değiştirerek bu ağlardan herhangi birinde sorgulama yapabilirsiniz.

:::info Uç noktalar

Polygon ağında Covalent kullanarak yapabileceğiniz tüm isteklerin tam bir listesi
[<ins>Covalent API belgelerinde</ins>](https://www.covalenthq.com/docs/api/)bulunabilir.

:::

---

## Ek {#appendix}

### Matic Gaz token'ı {#matic-gas-token}

Matic ağında etkileşim kurmak için, gaz ücreti olarak MATIC token ödenmesi gerekir. Covalent'in
yanıtları, `gas_*` alanlarını otomatik olarak MATIC birimi olarak döndürür.

### Token eşleme {#token-mapping}

Covalent; Ethereum mainnet ve Matic zinciri arasında token adreslerinin zincir içi gerçek zamanlı eşlemesini sürdürür. Bu adresler, geri dönüp Matic'te fiyatlara bakmak ve aynı zamanda doğru token logo URL'lerini döndürmek için kullanılır.

Eşlenmiş token'lara bazı örnekler:

| Token | Ethereum mainnet | Matic mainnet |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### Token fiyatları {#token-prices}

Covalent, Ethereum mainnet'e geri eşlemesi olan token'lar için eşlenmiş fiyatlar döndürme becerisine sahiptir.
