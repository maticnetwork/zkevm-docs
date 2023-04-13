---
id: meta-transactions
title: Meta İşlemler
sidebar_label: Overview
description: Meta işlemler ve bunları nasıl kullanabileceğiniz hakkında bilgi edinin.
keywords:
  - docs
  - polygon
  - matic
  - transactions
  - meta transactions
  - gasless
image: https://matic.network/banners/matic-network-16x9.png
slug: meta-transactions
---

Günlük akıllı sözleşme çağrıları en yüksek düzeyinde, günde yaklaşık 2,5 ilâ 3 milyon rakamına ulaşıyor.
DApp'ler ne kadar faydalı olduklarını fark etmeye başlıyorlar ama gaz ücretleri nedeniyle başarılarının ya da diğerlerinin başarısının
kurbanı oluyorlar. Söylemeye gerek yok, sisteme katılmak isteyen kullanıcıların karşılaştıkları engeller ve şu andaki
kullanıcı deneyimi zorlukları kolay aşılacağa benzemiyor.

## Akıllı Sözleşme Hizmetleri {#servicing-smart-contracts}

Akıllı sözleşmeler tasarımları itibarıyla deterministik durum makineleridir. Ağın bilgi işlem kaynaklarını kullanarak sözleşmenin mantığına hizmet etmek için işlem ücreti ödendiği zaman çalışırlar.
Bu, Ethereum (ve Polygon) üzerinde bir gaz pompası modeli ile gerçekleştirilir.

## İşlemlerin Güncel Durumu {#the-current-state-of-transacting}

Ethereum (ve benzer şekilde diğer blok zincirleri) üzerindeki bu geleneksel işlem modelinde kısıtlamalar vardır.
Yaygın bir kısıt, kullanıcının gaz ücreti yapacak fonunun bulunmamasıdır. Varsayılanda, işlemin göndericisi
bu davranışlar birbiriyle bağlı olduğu için ödeyen taraf olarak hareket eder, bu nedenle bir kullanıcı bir işlem oluşturmayı ve göndermeyi
denediğinde, karşılık gelen gaz ücretlerinden sorumlu olur. Benzer şekilde, bir kullanıcı
bir dApp etkileşimi kurar veya çalıştırırsa, gaz ödemesi gerekir.

Ortalama bir kullanıcının kripto para satın almasını ve uygulama ile etkileşim kurmak için gaz ödemesini beklemek
gerçekçi değildir. Bu sorunu çözmek için yapılabilecek şey, bir işlemin göndericisinin ödeyen taraf rolü ile
bağını kopararak, işlem yürütmeyi ölçeklemek ve sorunsuz bir işlem deneyimi başlatmak için fırsat
yaratmaktır.

Doğrudan işlem yürütme yerine, gaz ücretini halletmek için (bir üçüncü taraf üzerinden) bir aracı yazılım bulunur.
Meta işlemler burada devreye girer.

## Meta İşlemler nedir? {#what-are-meta-transactions}

Meta işlemler, herhangi bir kişinin blok zinciri ile etkileşim kurmasına izin verir. Kullanıcıların ağ hizmetleri için
işlem ücretleri yoluyla ödeme yapmak için token sahibi olmalarını gerektirmezler. Bu yöntem, işlemi gönderen taraf ile
gaz ücretini ödeyen tarafın arasındaki bağın koparılması ile uygulanır.

Yeni kullanıcıları sistemle tanıştırabilecek ve mevcut kullanıcılara yardımcı olabilecek bir çözümdür.

İşlemi yürüten, gönderici olarak hareket eder. Gaz ücreti ödemek yerine, yalnızca
özel anahtarları ile amaçlanan eylemi (işlem parametrelerini) imzalayarak işlem talebi
oluştururlar. Meta işlemi, olağan bir Ethereum işlemidir ve meta işlemini oluşturmak için
ek parametreler içerir.

İmzalanan işlem parametreleri, ikincil bir ağ üzerine geçirilir ve bu ağ bir yönlendirici olarak çalışır.
Bunun için farklı yöntemler olsa da, yönlendiriciler genellikle hangi işlemlerin gönderilmeye
değer olduğunu işlemi doğrulayarak seçerler (ör. dApp ile ilgili olmak). Doğrulama sonrasında, yönlendirici
asıl işlemi (yani gaz ücreti ödemek anlamına gelir) talebi (imzalanmış mesajı) sarmalar
ve sözleşmenin orijinal imzayı doğruladığı ve kullanıcı adına yürüttüğü sözleşmeyi sargısını kaldırdığı
ağ üzerine yayınlar.

:::note Meta ve batch kelimeleri bazıları için eş anlamlı olabilir

Açıklamak gerekirse: Bir meta işlemi, bir batch işleminden farklıdır; çünkü bir batch işlemi
birden fazla işlemi aynı anda gönderebilen bir işlemdir ve daha sonra tek bir göndericiden (tek seferlik anahtarla belirli)
sırasıyla yürütülür.

:::

Özet olarak, meta işlemler şu özelliklere sahip bir tasarım kalıbıdır:

* Kullanıcı (gönderici) özel anahtarıyla bir talep imzalar ve bir yönlendiriciye gönderir
* Yönlendirici talebi bir işlem içine sarmalar ve bir sözleşmeye gönderir
* Sözleşme işlemin sargısını açar ve işlemi yürütür

Yerel işlemler, "gönderici"nin aynı zamanda "ödeyici" olduğu anlamına gelir. "Gönderici"den "ödeyici" rolünü ayırarak,
"gönderici" daha ziyade bir "hedefleyici" olarak hareket eder - gönderici blok zinciri üzerinde yürütülmesini istediği işlemin hedefini
mesajları ile ilgili belirli parametreleri içeren bir mesajı imzalayarak
gösterir; tamamen inşa edilmiş bir işlem göstermez.

## Kullanım Senaryoları {#use-cases}

DApp'leri ölçekleme ve akıllı sözleşmeler ile etkileşimleri için meta işlemlerin sunabileceği yetenekleri hayal etmek mümkün.
Kullanıcı yalnızca gazsız bir işlem oluşturma olanağına değil, ayrıca bunu birçok kez yapma ve bir otomasyon aracı
ile yeni nesil uygulamaları pratik kullanım durumları için etkileme olanağına da sahiptir. Meta işlemler
akıllı sözleşme mantığı üzerinde gerçek fayda sağlar ki bunlar genellikle zincir üzerinde gereken gaz ücretleri ve etkileşimler
nedeniyle kısıtlıdır.

### Oylama ile ilgili bir örnek {#example-with-voting}

Bir kullanıcı, zincir üzerinde yönetişime katılmak ister ve bir oylama sözleşmesi ile belli bir sonuç için
oy kullanma niyetindedir. Kullanıcı bu sözleşme özelinde kararını belirten bir mesajı
imzalar. Geleneksel olarak, sözleşme ile etkileşim kurmak (ve sözleşmeyle nasıl etkileşim kuracağını öğrenmek) için bir gaz ücreti ödemesi gerekir;
ancak bunun yerine bir meta işlemi (zincir dışında) oyu ile ilgili bilgiyle beraber imzalayabilir
ve işlemi kendi adına yürütecek olan bir yönlendiriciye geçirir.

İmzalanan mesaj bir yönlendiriciye gönderilir (oylama bilgisi ile ilgili imzalanan işlem parametreleri). Yönlendirici
bu işlemin öncelikli bir oy olduğunu doğrular, oylama isteğini gerçek bir işlem içine sarmalar,
gaz ücretlerini öder ve oylama sözleşmesine yayınlar. Oylama sözleşmesi tarafında her şey kontrol edilip onaylanır
ve oy kullanıcı adına yürütülür.

## Onları Deneyin {#try-them-out}

Farklı yaklaşımlarla aşina olduğunuzu varsayarsak, meta işlemleri dApp'iniz içinde entegre edebilirsiniz
ve meta işlemlere geçiş yapma veya kullanmak için yeni bir dApp oluşturma niyetinize bağlı olarak kullanabilirsiniz.

dApp'inizi Polygon üzerinde Meta İşlemler ile entegre etmek için aşağıdaki yönlendiricilerden biriyle
devam etmeyi veya özel bir çözüm kullanmayı seçebilirsiniz:

* [Biconomy](https://docs.biconomy.io/products/enable-gasless-transactions)
* [Gas Station Network (GSN)](https://docs.opengsn.org/#ethereum-gas-station-network-gsn)
* [Infura](https://infura.io/product/ethereum/transactions-itx)
* [Gelato](https://docs.gelato.network/developer-products/gelato-relay-sdk)
