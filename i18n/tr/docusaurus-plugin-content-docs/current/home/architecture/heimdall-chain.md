---
id: heimdall-chain
title: Heimdall Zinciri nedir?
sidebar_label: Heimdall Chain
description: Bir sonraki blok zinciri uygulamanızı Polygon üzerinde oluşturun.
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - checkpoint
  - pos
  - verifier
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Heimdall Zinciri {#heimdall-chain}

Heimdall, Polygon Hisse Kanıtı Doğrulama katmanıdır; Plasma bloklarının bir temsilinin mimarimizdeki ana zincire denetim noktası atamasını yapmaktan sorumludur. Bunu, imza düzeninde ve çeşitli veri yapılarında değişiklikler yaparak Tendermint konsensüs motorunun üzerinde geliştirerek uyguladık (implement).

Ana zincir Stake Manager sözleşmesi PoS motoru için güvenilmez bir hisse yönetimi mekanizması olarak işlev görmek için Heimdall düğümü ile birlikte çalışır; bu durum doğrulayıcı kümesini seçmek, doğrulayıcıları güncellemek vb. De dahil olmak üzere. Stake aslında Ethereum akıllı sözleşmesi üzerinde yapıldığından, sadece doğrulayıcı dürüstlüğüne güvenmiyoruz ve bunun yerine bu anahtar kısım için Ethereum zinciri güvenliğini miras alıyoruz.

Heimdall katmanı Bor tarafından üretilen blokların bir Merkle ağacına toplanmasını ve Merkle kökünün periyodik olarak kök zincir yayınlamasını yönetir. Bu periyodik **yayınlamaya "kontrol noktası"** denir. Bor'da birkaç blok ilerlendikten sonra Heimdall katmanında bulunan bir doğrulayıcı:

1. Son denetim noktasından itibaren tüm blokları doğrular
2. Blok hash'lerinin bir merkle ağacını oluşturur
3. Merkle kökünü ana zincire yayınlar

Denetim noktaları iki nedenden dolayı önemlidir:

1. Kök Zincir üzerinde kesinliğin (finality) sağlanması
2. Varlık çekişlerinde yakma kanıtının sağlanması

Sürecin kuşbakışı bir resmi şu şekilde açıklanabilir:

- Havuzdan gelen bir aktif doğrulayıcılar alt kümesi bir zaman aralığı için blok üreticileri olarak hareket etmek üzere seçilir. Her bir zaman aralığının Seçimine en az 2/3 çoğunluk tarafından olur verilecektir. Bu blok üreticileri blok oluşturmaktan ve bunları kalan ağa yayınlamadan sorumludur.
- Bir denetim noktası belli bir aralık sırasında oluşturulan tüm blokların kökünü içerir. Tüm düğümler aynı şeyi doğrular ve imzalarını buna ekler.
- Doğrulayıcı kümesinden seçilen bir teklif belirli bir kontrol noktası için tüm imzaları toplamaktan ve aynı şeyi ana zincir üzerinde işlemekten sorumludur.
- Bloklar oluşturmanın ve aynı zamanda denetim noktaları teklif etmenin sorumluluğu bir doğrulayıcının toplam havuzdaki stake oranına değişken bir şekilde bağlıdır.