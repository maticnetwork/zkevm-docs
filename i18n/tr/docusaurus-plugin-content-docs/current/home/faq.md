---
id: faq
title: SSS
description: Polygon ile ilgili SSS
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Sıkça Sorulan Sorular {#frequently-asked-questions}

## Polygon nedir? {#what-is-polygon}

Polygon genel blok zincirleri için bir ölçeklendirme çözümüdür, özellikle Ethereum Polygon güvenli ve merkezi olmayan bir şekilde üstün bir kullanıcı deneyimi sağlarken ölçeklenebilirlik sağlar. Bu Ethereum için Kovan Testnet üzerinde bir çalışma uygulaması vardır. Polygon gelecekte diğer blok zincirlerini desteklemeyi ve bu sayede mevcut kamu blok zinciri ağlarına ölçeklenebilirlik sunmanın yanı sıra birlikte çalışabilirlik özellikleri sağlamamızı sağlayacak.

## Polygon'un diğer Plasma uygulamalarından farkı nedir? {#how-is-polygon-different-from-other-implementations-of-plasma}

Polygon'un Plazma uygulaması Polygon's çalışan devlet tabanlı yan zincirler üzerine inşa edilirken, Plazma üzerindeki diğer uygulamalar öncelikle UTXO'ları kullanarak bunları ödeme için özel olarak sınırlandırmaktadır. Devlet tabanlı yan zincirlere sahip olmak, Polygon için genel akıllı sözleşmeler için ölçeklenebilirlik sağlamasına olanak sağlar.

İkinci olarak, Polygon periyodik aralıklarla kontrol noktaları (Plasma in her blok için kontrol noktalarından farklı olarak) yayınlayan bir kamu kontrol tabakası kullanır. Bu kontrol noktaları, dolandırıcılık kanıtlarıyla birlikte Polygon'un yan kısımlarının güvenli bir şekilde çalışmasını sağlar.

## Projenizde plasma zincirlerini kullanarak Ethereum için ölçeklenebilirlik sağlıyorsunuz; bu bir protokol müdür yoksa yerel (native) bir blok zinciri midir? {#your-project-provides-scalability-for-ethereum-using-plasma-chains-is-it-a-protocol-or-a-native-blockchain-in-itself}

Polygon ağı, Ethereum ana zincir varlıklarının, yani tüm dApps / Jeton / Ana zincirin Protokolleri taşınıp Polygon to taşınabildiği ve gerektiğinde mal varlıklarını ana zincirine geri çekebileceği bir **"sidechain"** çözümüdür.

## Polygon'un rakipleri üzerindeki rekabet avantajları nelerdir? {#what-are-the-competitive-advantages-of-polygon-over-its-competitors}

### L2 ölçekleme çözümleri {#l2-scaling-solutions}

Polygon merkeziyetsizliği koruyarak ölçek kotarmaya adanmıştır. Polygon'da periyodik denetim noktaları ve fraud proof'lar kullanılır. Kullanıcılar varlıklarını geri çekmek istediklerinde, varlıklarını yan zincir üzerinde kanıtlamak için kontrol noktalarını kullanırlar; sahtekarlık veya kötü davranışlara meydan okumak ve staker kesmek için sahtekarlık kanıtları gereklidir.

Diğer projeler ayrıca L2 ölçeklendirme çözümleri de sunmaktadır ancak üzerinde farklılık gösterdiğimiz iki temel unsur vardır:

1. Öncelikle Polygon sadece finansal işlemlere değil, oyunlara ve diğer faydalı dApp'lere de odaklanıyor. Ayrıca kredi / işlem yapmak gibi tam gelişmiş finansal hizmetler için planlarımız var (token değişiklikleri, marj işlemleri ve çok daha fazlası).

2. İkinci olarak, Polygon 1 saniye blok süreleri için (PoS katmanı ile) kontrol noktaları kullanırken, diğer birçok çözüm, yan zincirin her bloğunu ana zincire itmeniz için Ethereum blok zamanından daha büyük blok kat gösterebilir.

### L1 ölçekleme çözümleri {#l1-scaling-solutions}

Bunun dışında diğer ölçeklendirme projeleri arasında Polygon büyük ölçüde merkeziyetçilik sürdürürken ölçek elde etme kabiliyetinden dolayı öne çıkıyor.

Daha da önemlisi, bu ölçeklenebilirlik projelerinde "tekerleği yeniden icat etme" sorunu var. Geliştirici topluluğu, ürün ekosistemi, teknik dokümantasyon ve işletmelerin **"sıfırdan"** inşa edilmesi gereken yeni blok zincirleri oluşturuyorlar. Polygon, diğer taraftan, EVM tarafından etkinleştirilen bir zincirdir ve Ethereum ana zincirinde bulunan dApps / varlıklara sahip olan ve ölçeklenebilirlik ile bir düğme tıklaması ile kullanılabilir.

### Ödemeler {#payments}

Polygon'un kullanılabilirlik açısından bir avantajı olduğuna inanıyoruz, çünkü diğer çözümlerde hem gönderen hem de alıcının ödeme kanallarını oluşturması gerekiyor. Bu durum kullanıcıları büyük bir zahmete sokuyor. Öte yandan Polygon'un altta yatan teknolojisinde kullanıcılar için ödeme kanalları gerekli değil ve kullanıcıların token'ları almak için yalnızca geçerli bir Ethereum adresine sahip olmaları yeterli. Bu aynı zamanda bizim merkeziyetsiz uygulamalar için uzun dönemde kullanıcı deneyimini iyileştirme vizyonumuzla uyumlu.

### Trading ve Finans {#trading-and-finance}

Polygon DEX'in (ör. 0x), Likidite havuzları (örneğin Kyber Ağı) ve kredi protokolleri (Dharma Protokolü) gibi diğer finansal protokolleri platformunda etkinleştirmeyi amaçlamaktadır; bu da Polygon kullanıcılarının DEX, borç verme dApps, LP'ler ve diğerleri gibi çeşitli finansal hizmetlere erişmesine olanak sağlayacaktır.

## Polygon diğer yan zincir çözümleriyle nasıl karşılaştırılır? {#how-does-polygon-compare-with-other-sidechain-solutions}

Polygon'da tüm yan işlemler, yan zincir ve ana zincir üzerinde birden fazla mekanizma ile güvence altına alınır. Yan zincir üzerinde Blok üreticisi katmanı tarafından yapılan herhangi bir işlem doğrulanır ve ana zincirin kontrolüne son derece merkezi olmayan bir kontrol tabakası tarafından kontrol edilir.

Eğer yan işlerde herhangi bir sahtekarlık işlemi gerçekleşirse, bu işlem kontrol etme katmanı tarafından tespit edilebilir ve ele alınabilir. Blok üreticisi katmanı ve kontrol tabakası ile son derece olası bir senaryoda bile, ana zincirin kamudan gelen herhangi birinin gelip taraftar üzerinde hileli olarak gördükleri herhangi bir işlemi zorlayabileceği sahtekarlık kanıtları vardır.

Bu meydan okuma başarılı olursa, işleyen taraflara büyük bir ekonomik disincentive ceza verilir, çünkü onların stake düşürülür. Ayrıca, kamu meydan okuyan hileli yan işyeri aktörlerinin kesilmiş bahisleri ile ödüllendirilir.

Bu da Polygon'u ekonomik olarak teşvik edilmiş bir yan zincir ağı haline getiriyor ve bu ağ ile ilgili işlemlerin yüksek derecede merkezi olma ve güvenliğine sahip oluyor.

Ayrıca Polygon yan zincirlerinin kapasitesi ve TPS diğer çözümlerden çok daha yüksektir. Özellikle Polygon binlerce işlem yapabilirken, diğerleri de birkaç bin işlemin daha yüksek bir limiti olan tek yan zincirlerdir.

## Hangi prensipler ile yeni yan zincirleri eklenecektir? Özel şirketlerin yerel yan zincirleri için özel bir gereksinim olacak mı? {#via-what-principles-will-new-sidechains-be-added-will-there-be-any-special-requirements-for-private-companies-local-sidechains}

Plasma, devlet kanallarına nazaran, ölçekleme çerçevelerine üstün bir alternatifi temsil eder, en başta çerçevenin sağladığı güvenlik garantileri sayesinde - bu, özünde, kullanıcılar her ne olursa olsun fonlarını asla kaybetmeyecekler, demektir. Tabii parayı geri almakta gecikmeler olabilir, ama bir Bizans Plasma operatörü hiç yoktan para yaratamaz ya da bir işlemi iki kere harcayamaz.

Polygon, gelecekte ekonomik teşviklerin/caydırıcıların öncelikle sistemin güvenliğini ve kararlılığını (stability) sağlayacakları tamamen açık ve genel bir blok zinciri altyapısı olmaya çalışacaktır. Dolayısıyla herkes sisteme katılabilmeli ve konsensüse iştirak edebilmelidir. Bununla birlikte, ağ tohumlama aşamasında başlangıçta Polygon a etkinleştirmek için daha büyük bir rol oynamak zorunda kalacaktır.

Ayrıca, Polygon sidechains öncelikle halka açık yan zincirleri yani diğer kamu blokları gibi herkesin kullanabileceği yan zincirler olacaktır. Bununla birlikte, Enterprise Polygon zincirleri belirli kuruluşlar için özel yan zincirleri (gizlilik dışı etkin) sağlamayı amaçlayacaktır. Bu tür zincirlerin güvenliği ve merkeziyetçiliği ana zincir üzerindeki kontrol tabakası ve sahtekarlık kanıtları kullanılarak hala sağlam tutulur.

## sidechains de ana zincir (Ethereum) ile senkronize edilecek mi? {#will-sidechains-also-be-synced-with-the-main-chain-ethereum}

Kesinlikle. Kamu kontrol katmanı yan zincirlerde meydana gelen tüm işlemleri doğrulayacak ve kanıtları ana zincire yayımlayacak. Yan zincir işlemlerinin kusursuz güvenliğini sağlamak için, Plasma sözleşmesi herhangi bir yan zincir işleminin herhangi bir sahtekarlık faaliyeti için itiraz edilebileceği çeşitli Dolandırıcılık Kanıtları içerir. Bir meydan okuyan başarılı olursa, dolandırıcılık ile ilgili yan zincir aktörlerinin bahisleri kesilir ve meydan okuyana aktarılır. Bu durum sürekli olarak çalışan yüksek bir kazık bug to eşdeğerdir. Bu konuda iyi bir diyagram aşağıdaki gibidir:

![Ekran görüntüsü](../../static/img/matic/Architecture.png)

## Whitepaper'ın sonunda bir "Potansiyel Kullanım Senaryoları" listesi var - bunların hepsi gerçekleştirilecek mi? Hangi sırayla? {#at-the-end-of-the-white-paper-there-is-a-list-of-potential-use-cases-will-all-of-that-be-implemented-in-what-order}

Temel mantık - Ethereum üzerinde çalışan bir dApp / Protokol varsa ancak düşük işlem hacmi ve yüksek işlem ücretleri ile sınırlıysa - o zaman bu dApps / Protokoller için Polygon ağı üzerindeki destek ekleyebiliriz.

## Polygon'un plasma uygulamasını taklit etmek neden zor olacak? {#why-will-it-be-difficult-to-replicate-polygon-s-plasma-implementation}

Bu ağ üzerindeki etkiyle ilgili daha fazla bilgi sahibi olmasına rağmen, blok zinciri çözümleri açık kaynak olmalıdır, çünkü onlar tarafından kullanılan gerçek varlıkları içerir.

Bu durum tüm açık kaynaklı projelerde geçerlidir. Bu, bizim için olduğu kadar diğer rakip uygulamalar için de geçerlidir, zira alacağımız GLP lisansı uygulamamızı kullanan herkesin kodlarını açık kaynaklı yapmalarını zorunlu kılmaktadır. Ancak yine de bu noktada kod kopyalamanın Bitcoin, Ethereum ve diğer projeler için bile geçerli olduğu görülüyor; bir projenin elde edebileceği ağ etkisi ile ilgili.

## Polygon Ağı'nın Plasma uygulamasının özel yanı nedir? {#what-s-special-about-polygon-network-s-plasma-implementation}

Polygon Plazma UTXO sistemi yerine hesap tabanlı bir model sistemi kullanır. Bu sayede Polygon zinciri üzerinde bir EVM kullanmamızın büyük bir avantajı elde etmiş oluruz; bu da bize Polygon ağı için tüm Ethereum ekosistemi, geliştirici araçları, entegrasyon kütüphaneleri vb. Kullanmamızı sağlar.

Polygon ağı ERC20 their herhangi bir değişiklik gerektirmeden dApps tarafından kullanılabilir. Ayrıca, kontrol katmanımız diğer Plazma uygulamalarından daha hızlı büyüklükte siparişler vermemizi sağlar, çünkü biz kontrol noktalarında bireysel blokların kanıtlarını toplu halde gerçekleştiririz, diğer Plazma uygulamaları ise her blok kanıtını ana zincirine sunmalıdır.

## Merkezileşme sorunlarını nasıl çözeceksiniz? {#how-are-you-going-to-solve-the-issues-with-centralization}

Aşağıdaki diyagram size bir fikir verebilir:

![Ekran görüntüsü](../../static/img/matic/Merkle.png)

Bu yüzden öncelikle PoA düğümleri Delege (Proof of of Solvency ile yani yüksek miktarda hisse yatırmaları gerekir) ve KYC temel olarak PoS katmanı tarafından EOS tarzı Delege Kanıtı (DPoS) veya Delege Bizans Arıza Toleransı (DBFT) düğümleri gibi seçilen olarak belirlenecektir.

İkinci olarak, tüm Delege (veya bunların 2/3'ü) kötü aktörleri döndürüp hatalı bloklar üretelim, o zaman tüm blokları doğrulayacak ve herhangi bir sahtekarlık yapıldığında Delege staker have var ve bu nedenle düzeltici eylemler için kontrol etme durduruldu.

Üçüncüsü, Staker PoS katmanı bile (çok sayıda düğüm olacak) hatalı kontrol noktaları üretmek için de kötü bir hal alır ve çarpışır. O zaman bile, Plazma felsefesini takiben, birçok büyük proje tarafından izlenen yan kesimin ölçeklendirilmesi, **Sahtekarlık kanıtlarından** birini yazıyoruz (izleyiciler GitHub'daki depo gözlemcimiz olarak görülebilir). Bu sahtekarlık kanıtı mekanizması, kamuoyunda bulunan herkesin ana zincir olan Ethereum üzerindeki herhangi bir işlemi zorlamalarına olanak tanır.

## Neden Matic Token gerekiyor? {#why-is-matic-token-required}

Aşağıdaki nedenler MATIC of sahip olma ihtiyacını güçlendirir:

### Polygon genel blok zincirleri için genel amaçlı bir ölçeklendirme çözümü olmayı amaçlıyor {#polygon-intends-to-be-a-general-purpose-scaling-solution-for-public-blockchains}

Ethereum'dan ilk basechain olarak başlıyoruz, ancak gelecekte Polygon birden fazla basechain üzerinde konuşlandırılabilir. Yakında eklenecek başka basechain'ler olacak, bu yüzden yan zincirlerde ücretlerin ödenmesinde kullanmak üzere tek bir para birimi (ether) bulundurmak mantıklı olmayacak. Herhangi bir basechain geleceği hakkında varoluşsal bir endişe varsa, bu basechain para biriminin Polygon için yerel bir varlık olarak bulunması ölçeklendirme ağını sakatlayacaktır. Bu yüzden Stakeçi ekosistemini Polygon'un kendi ağ token'ı üzerinde inşa etmek önemlidir.

### Appcoin güvenlik modeli {#appcoin-security-model}

Polygon, Kyber gibi bir likidite havuzu kullanarak bir token takas mekanizmasını soyutlayarak Dapp'lerin Dapp-coin cinsinden Polygon ücretlerini ödemesini etkinleştirmeyi amaçlıyor. Kullanıcı ücretleri ödemek için her kullanır, arka planda dApp-coin MATIC tokenları için değiştirilir. Bu sayede, sorunsuz bir kullanıcı deneyimi sağlamak isteyen DApp geliştiricileri bir Polygon likidite havuzunun sürdürülmesine yardımcı olacaklardır.

### Ağın yeni evrelerde tohumlanması {#seeding-the-network-in-nascent-stages}

Başlangıçta ağda hiç işlem yokken ya da az sayıda işlem varken sistemin tohumunu ekmek uygulamada imkânsızdır, zira bir hayli merkeziyetsizleşmiş Doğrulayıcı katmanına ve blok üreticilerine Eth dağıtamayız. Oysa Matic token'lar kullanarak, token'ların büyük bir yüzdesini blok üreticisi, denetim noktası atayıcı stake'leri tohumlamak ve sonrasında blok ödülleri teklif etmek için dağıtmak üzere ayırdık. Ayırdığımız bu karşılık, ağın ağ etkilerine ulaşması biraz zaman alsa bile stakeçilerin ödüller almalarını garanti eder. Blok Madenciliği ödüllerinin Bitcoin için tutulma nedenine benzer şekilde, stakeçiler ve blok üreticileri ağı güvenli tutmak için bu yolla teşvik edilebilirler.

Endişeniz Geliştiricilerle ilgiliyse, stratejimizin sütunlarından biri giriş bariyerini geliştiriciler için  çok alçak tutmaktır. Tüm Ethereum geliştirme araçlarının Polygon'da orijinal haliyle çalışmalarını sağladık. Testnet üzerinden ücret ödemek için gerekli olan tokenler açısından, Ethereum üzerinde bir geliştirici binası için farklı değildir. Dev, bir Polygon musluğundan testnet için Ethereum üzerindeki olduğu gibi ücretsiz tokenler alır. MATIC token'larına yalnızca Polygon Mainnet'e (yani gaz ücreti) dağıtmak istediğinizde ihtiyacınız vardır; burada gaz ücretinin Ethereum'dan çok daha düşük olduğu ve Ethereum'da ödediğiniz bir işlem ücretinin yaklaşık 1/100'ü civarında.

## Matic token'ların kullanılmasını ve talep edilmesini teşvik eden şey nedir? {#what-drives-the-use-and-demand-for-matic-tokens}

Bu token başlıca iki yerde kullanılır:

1. Bu token, ağdaki işlem ücretlerini ödemek için kullanılır.
2. Bu token, kontrol katmanı ve blok üretim katmanı için Proof of Stake konsensüs mekanizmasına katılmak için staking için kullanılır.

### Token talebinin ikincil nedenlerinden bazıları {#some-of-the-secondary-reasons-for-token-demand}

* Polygon Ağı, Kyber gibi bir likidite havuzunu kullanarak bir token takas mekanizmasını soyutlayarak Dapp'lerin Polygon ücretlerini Dapp-coin cinsinden ödemesini devreye almayı planlıyor. Kullanıcı ücretleri ödemek için her kullanır, arka planda dApp-coin MATIC tokenları için değiştirilir. Bu sayede, sorunsuz bir kullanıcı deneyimi sağlamak isteyen DApp geliştiricileri bir Polygon likidite havuzunun sürdürülmesine yardımcı olacaklardır.

* Daha hızlı çıkışları sağlamak için bir kredi mekanizması uyguluyoruz; bu işlem altında bir alt yazar/borç veren tarafından çıkış belirteci alınabilir ve çıkış miktarını faiz olarak küçük bir ücret ile indirebilirsiniz. Borç veren bir hafta sonra çıkış token'ını kullanarak token'ları talep eder. Bu yolla kullanıcı neredeyse anında çekişler yaparken, borç verenler sağladıkları hizmet için faiz kazanabilmektedir.

### Protokol Düzeyi token'lar yakma {#protocol-level-burning-of-tokens}

Her blokta işlem ücretinin bir yüzdesini yakmayı amaçlıyoruz. Bu durum token'ları doğada deflasyonist yapar ve protokol düzeyinde değeri açısından sabit bir destek sağlar.

### Alçak giriş bariyeri (ve buna bağlı olarak daha yüksek bir çabuk benimsenme şansı) {#low-entry-barrier-and-hence-higher-chances-of-quick-adoption}

DApp'lerin son kullanıcıları sisteme çekmelerine ağırlıklı olarak bel bağlıyoruz. Önemli özelliklerden biri de Ethereum geliştirme ekosistemiyle tam uyumlu bir mimari yapmamızdır; yani tüm akıllı sözleşmeler, cüzdanlar, IDE, DevOps araçları vb. Polygon ile doğrudan uyumludur.

Herhangi bir Ethereum Dapp'ı neredeyse hiçbir önemli değişiklik yapmadan Polygon'a port edilebilir. Bu nedenle, mevcut Ethereum geliştiricilerinin Polygon için geçiş için giriş engelleri ihmal edilebilir ve bu da viral bir dApp benimsenmesini hızlandırabilir. Bu durum Polygon ağı etrafında inşa edilen ağ etkileri nedeniyle çok fazla organik talep getirme potansiyeline sahiptir.

## Token türü ERC20 mi? {#is-token-type-erc20}

Evet. Ve aynı token Polygon Chain için de geçerli olacaktır, yani gelecekte yerel bir to taşınmaya gerek yoktur.

## Ethereum ağına getirebileceğiniz beklenen TPS (saniyede işlem sayısı) nedir? Şu anda test ağında ne çalıştırıyorsunuz? {#what-is-the-expected-tps-you-ll-be-able-to-bring-to-the-ethereum-network-what-are-you-running-at-now-on-testnet}

Tek bir yan zincir saniyede 7,000'den fazla işlem kapasitesine sahiptir. Polygon birden fazla yan zincir ekleme yeteneğine sahiptir, ancak şu anda odak noktamız ağı bir yan zincir ile stabilize etme olacaktır.
