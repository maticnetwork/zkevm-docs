---
id: getting-started
title: Ethereum↔Polygon Köprüsü
sidebar_label: Overview
description: Polygon ve Ethereum arasında iki yönlü bir işlem kanalı.
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon size Plasma ve PoS güvenliği ile zincirler arası köprü sağlayarak Polygon ve Ethereum arasında güven gerektirmeyen iki yönlü bir işlem kanalı sunuyor. Kullanıcılar bu sayede üçüncü taraf riskine ve piyasa likiditesi sınırlamalarına maruz kalmadan Polygon genelinde token transfer edebilir. **Plasma ve PoS Köprüsü hem Mumbai Testnet'in hem de Polygon Mainnet'te mevcuttur**.

**Polygon köprüsü, yakın anlık, düşük maliyetli ve oldukça esnek bir köprü mekanizması sağlar**. Polygon çift konsensüs mimarisi kullanır (Plasma + Hisse Kanıtı (PoS) platformu)
hız ve merkeziyetçilik için optimize etmek. Sistemin mimarisini, bilinçli bir şekilde, EVM ile çalıştırılan yan zincirlerimizde rastgele durum geçişlerini destekleyecek şekilde tasarladık.

**Token'ınız köprüden geçtiğinde dolaşımdaki arzında hiçbir değişiklik olmaz**;

- Ethereum ağını bırakan tokenler kilitlenir ve aynı sayıda token Polygon üzerinde pegged token ile basılır (1:1).
- Token'ları ethereum ağına geri taşımak için, token'lar Polygon ağında yakılır ve işlem sırasında ethereum ağında token'ların kilidi açılır.

## PoS ve Plasma {#pos-vs-plasma}

|                                      | PoS Köprüsü (Önerilen) | Plasma Bridge |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Kısa açıklama** | DApp Geliştiriciler esneklik ve POS sistemi güvenliği ile daha hızlı para çekme arayışında. | Plasma çıkış mekanizması ile daha fazla güvenlik garantisi arayan dApp Geliştiriciler\. |
| **Yapı** | Çok esnek | Katı, Az Esnek |
| **Fon Yatırma\(Ethereum → Polygon\)** | 22-30 dakika | 22-30 dakika |
| **Fon Çekme\(Polygon → Ethereum\)** | 1 kontrol noktası = ~ 30 dakika ila 6 saat | Ethereum sözleşmesi üzerindeki işlem-çıkış prosedürünü arayın |
| **Güvenlik** | Sağlam bir harici doğrulayıcılar kümesi ile güvenliği sağlanan Hisse Kanıtı sistemi\. | Polygon'un Plasma sözleşmeleri Ethereum'un güvenliğinden destek alır. |
| **Destek Standartları** | ETH, ERC20, ERC721, ERC1155 ve Diğerleri | Sadece ETH, ERC20, ERC721 |

:::info

[**FxPortal**](/develop/l1-l2-communication/fx-portal.md) ise PoS Köprüsü ile çok benzer bir köprü türüdür. Yukarıdaki tabloda PoS için bahsedilen özelliklerle aynı özellikleri paylaşırlar. Tek fark, Tokens köprüden önce FxPortal Köprüsü üzerinde haritalanmasına gerek olmamasıdır. Mapping verilen bir token için başlatılan ilk depozito işlemi sırasında gerçekleşir. Ayrıca, herkes Polygon köprüsünün üzerine kendi özel tünel/köprüleri inşa etmek için of kullanabilir. Herhangi bir köprü kullanımı için FxPortal kullanılması şiddetle tavsiye edilir. PoS ve Plazma üzerindeki yeni token eşlemeleri 31 Ocak 2023 sonrası iptal edilecek, böylece haritalama işlemi tamamen merkeziyetçi ve esnek olacaktır.

:::

## Ek Kaynaklar {#additional-resources}

- [Blok Zinciri Köprülerine Giriş](https://ethereum.org/en/bridges/)
- [Çapraz Zincir Köprüleri Nedir](https://www.alchemy.com/overviews/cross-chain-bridges)
