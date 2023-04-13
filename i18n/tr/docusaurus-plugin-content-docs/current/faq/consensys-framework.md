---
id: consensys-framework
title: Ölçeklendirme Çerçevesi SSS
sidebar_label: Scaling Framework FAQ
description: Bir sonraki blok zinciri uygulamanızı Polygon üzerinde oluşturun.
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Bu [çerçeve, herhangi bir ölçeklendirme çözümünü Yargılamak için](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017) Consensys'in Dört sorusundan türetilmiştir.

## Bunu Kim İşletiyor? {#who-operates-it}
Mainnet Ethereum'daki madenci düğümleri İş Kanıtını (Proof of Work) çözerek ve yeni bloklar üreterek ağı ilerletir, diğer bir deyişle "işletir". L2 çözümü kendi ağı üzerinde benzer bir "işletici" rolü gerektirir; bu, Ethereum mainnet'in L2 ağını ilerletebilen madenci rolüne eşdeğer bir roldür. Fakat arada birkaç farklılık vardır. Örneğin bir L2 işleticisi bir madenci gibi işlemleri işlemek ve yetkilendirmek yanında, kullanıcıların L2 katmanına girip çıkmalarına aracılık da edebilir.

### - Polygon Hisse Kanıtı (Proof of Stake) ağını işletmek için kim veya ne gerekiyor? {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

Polygon PoS commit zinciri ağın güvenliğini sağlamak için bir doğrulayıcılar kümesine bel bağlar. Doğrulayıcıların rolü bir tam düğüm çalıştırmak, bloklar üretmek, doğrulama yaparak konsensüse katılmak ve Ethereum mainchain üzerinde denetim noktaları işlemektir. Doğrulayıcı olmak için Ethereum ana zincirinde bulunan staking yönetimi sözleşmeleri vasıtasıyla MATIC token'lar stake etmek gerekir.

Daha fazla ayrıntı için lütfen [Validator bölümüne](/maintain/validate/getting-started.md) bakın.

### - Polygon PoS ağında nasıl işletici olunur? İşleticiler hangi kurallara tabi? {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

Doğrulayıcı olmak için Ethereum mainchain'de bulunan staking yönetimi sözleşmeleri
vasıtasıyla MATIC token'lar stake etmek gerekir.

Ödüller tüm stakeçilere stake'leriyle orantılı olarak her denetim noktasında dağıtılır; bunun bir istisnası, teklifçinin bir ek bonus almasıdır. Kullanıcının ödül bakiyesi, ödüller talep edilirken referans yapılan sözleşmede
güncellenir.

Doğrulayıcı düğüm çift imzalama, doğrulayıcının downtime olması gibi kötü niyetli
bir eylemde bulunması ve bu eylemin de o denetim noktasında bağlı delegatörleri
etkilemesi durumunda stake'lere kesinti cezası uygulanması riski doğar.

Daha fazla ayrıntı için lütfen şu adrese bakın [Bir Polygon doğrulayıcısına uçtan uca akış](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator) ve [bir doğrulayıcının sorumlulukları](/maintain/validate/validator-responsibilities.md)


### - Polygon PoS kullanıcılarının işletici hakkında hangi güven varsayımlarında bulunması gerekir? {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

Polygon PoS commit zinciri ağın güvenliğini sağlamak için bir doğrulayıcılar kümesine bel bağlar. Doğrulayıcıların rolü bir tam düğümü çalıştırmaktır; bloklar üretmek, doğrulamak ve konsensüse katılmak ve ana zincirde denetim noktaları işlemek. Bir doğrulayıcı olmak için MATIC token'ları ana zincirde bulunan staking yönetimi sözleşmeleri yoluyla stake etmek gerekir.
Doğrulayıcıların ağırlıklandırılmış stake'lerinin ⅔'ü dürüst olduğu sürece zincir doğru bir şekilde ilerleyecektir.

### - İşleticilerin sorumlulukları nelerdir? Hangi yetkiye sahiplerdir? {#what-are-the-operators-responsible-for-what-power-do-they-have}

Doğrulayıcıların rolü bir tam düğümü çalıştırmaktır; bloklar üretmek, doğrulamak ve konsensüse katılmak ve ana zincirde denetim noktaları işlemek.

Doğrulayıcıların ağırlıklandırılmış stake'lerinin 3'te 2'sinin dürüst olmadığı varsayıldığında, doğrulayıcılar zincirin ilerlemesini durdurma, blokları yeniden sıralama vb. yetkisine sahiptir. Durumu, kullanıcının varlık bakiyelerini vb. değiştirme yetkileri yoktur.

### - Bir Polygon PoS işleticisi olmak için motivasyonlar nelerdir? {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

Doğrulayıcılar MATIC token'larını teminat olarak yatırarak ağın güvenliği için çalışırlar ve bu hizmetlerinin karşılığında ödüller kazanırlar.

Lütfen daha fazla ayrıntı için [teşvik](/maintain/validator/rewards.md#what-is-the-incentive) edilen nedir ile ilgili bilgi

## Veri nasıl? {#how-s-the-data}
Bir Katman 2 teknolojisi, tanımı gereği, bir Katman 1'de (Ethereum mainnet) artan veri denetim noktaları oluşturmalıdır. O halde kaygımız, bu periyodik Katman 1 check-in'leri arasındaki boşluk süresi ile ilgilidir. Spesifik olarak, Katman 2 verisi Katman 1'in güvenli limanından uzaktayken nasıl üretilir, depolanır ve yönetilir? En çok bunla ilgileniyoruz, çünkü bu, kullanıcının bir genel mainnet'te güven gerektirmeyen (trustless) güvenlikten en uzak olduğu andır.

### - Polygon PoS için kilitleme (lock-up) koşulları nelerdir? {#what-are-the-lock-up-conditions-for-polygon-pos}

Çoğu token tasarım örüntülerinde, token Ethereum'da mint edilir ve Polygon PoS'a gönderilebilir. Böyle bir token'ı Ethereum'dan Polygon PoS'a taşımak için kullanıcının Ethereum'da bir sözleşmede fonlar kilitlemesi gerekir ve karşılık gelen token'lar daha sonra Polygon PoS'ta mint edilir.

Bu köprü röle mekanizması, karşılık gelen token miktarının Polygon PoS'ta mint edilmesi için Ethereum'da kilitli token olayı üzerinde 3'te 2 mutabakata varması gereken Polygon PoS doğrulayıcıları tarafından çalıştırılır.

Varlıkların ethereum'a geri çekilmesi 2 adımlı bir işlemdir; bu işlemde ilk önce varlık token'larının Polygon PoS commit zincirinde yakılması ve sonra bu yakma işleminin kanıtının Ethereum zincirine gönderilmesi gerekir.


Daha fazla ayrıntı için [PoS köprüsünü kullanmak için](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge) Adımlara bakın.

### - Bu fonlar Polygon PoS'ta ne kadar sürede kullanılabilir hale gelir? {#how-soon-are-those-funds-available-on-the-polygon-pos}

Yaklaşık 22-30 dakika. Bu işlem bir mesaj aktarma mekanizması ile `state sync`yapılır. Daha fazla ayrıntı [burada](/pos/state-sync/state-sync-mechamism.md) bulunabilir.

Polygon PoS, L1'de kilitleme yapmaksızın giriş yapan kullanıcılar için destek sağlıyor mu (yani, bir kullanıcının doğrudan Polygon'a katılması, sonra Ethereum mainnet'e çıkış yapmak istemesi durumunda)?

Evet, bunu yapmak için özel bir köprü mekanizması kullanılır. Kullanıcı Ethereum'a çıkmak istediğinde, özel bir sözleşmeden token'ların kilidini açma yöntemi yerine token mint edilir.

Bu konuda [burada](/develop/ethereum-polygon/mintable-assets.md) okuyabilirsiniz.

### - Bir kullanıcı geçersiz bir Polygon PoS işlemine nasıl itiraz eder? Geçerli bir Polygon PoS işlemini kanıtlamak? {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

Şu anda zincir içinde geçersiz bir Polygon PoS işlemine itiraz etmenin bir yolu yoktur. Bununla birlikte, Polygon PoS zincirinin doğrulayıcıları Ethereum'a periyodik olarak kontrol noktaları gönderir - [daha](/pos/heimdall/modules/checkpoint.md) fazla ayrıntı burada görebilirsiniz. Bir Merkle ağacı kanıtı oluşturarak ve Polygon PoS işleminin Ethereum üzerinde gerçekleştiği periyodik kontrol noktalarına karşı doğrulayarak Polygon PoS zinciri üzerindeki bir işlemi doğrulamak ve Merkle ağacı kökleri makbuz etmek mümkündür.

### - Bir Polygon kullanıcısı çıkmak istediğinde kilitli Katman 1 fonu (artı veya eksi herhangi bir L2 kazancı veya kayıp) L1'de ne kadar sürede kullanılabilir? {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

[Kontrol](/pos/heimdall/modules/checkpoint.md) noktalarının sıklığına bağlı olarak yaklaşık 1-3 saat. Sıklık büyük ölçüde doğrulayıcıların denetim noktaları göndermek için ETH gaz ücretleri harcamaya istekli oldukları maliyetin bir fonksiyonudur.

### - Katman 1'de mevcut Polygon PoS kullanıcılarına anında geri ödenebilir L1 fonları sağlamaya istekli Likidite Sağlayıcıları olacağını öngörüyor musunuz? {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

Bu hizmeti veren veya verecek olan [Connext](https://connext.network/) ve [Biconomy](https://biconomy.io/) gibi birkaç oyuncu var. Çok yakında canlıya geçecek başka oyuncular da var.

## Stack nasıl? {#how-s-the-stack}
Stack karşılaştırması, Katman 2'nin Ethereum mainnet'inden neyi değiştirip değiştirmediğini aydınlatmak için önemli.

### - Polygon PoS stack'i Ethereum mainnet stack'i ile ne ölçüde paylaşım yapar? {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

Eğer bir Ethereum Geliştiricisi iseniz zaten bir Polygon PoS geliştiricisi sayılırsınız. Bildiğiniz tüm araçlar kullanıma hazır olarak Polygon PoS'ta desteklenir: Truffle, Remix, Web3js ve çok daha fazlası.

Polygon PoS için EVM arayüzünde Ethereum'a nazaran büyük bir değişiklik yoktur.

### - Polygon PoS, Ethereum mainnet stack'inden nerede farklılaşır ve bu hangi riskleri / ödülleri getirir? {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

Önemli bir değişiklik yoktur.

## En Kötüsü için Hazırlanma {#preparing-for-the-worst}
Polygon PoS sistemi aşağıdaki senaryolara nasıl hazırdır:

### -  Kullanıcıların topluca çıkışı? {#a-mass-exit-of-users}

Doğrulayıcılardan ⅔'ü dürüst olduğu sürece zincirdeki fonlar güvendedir. Bu varsayımın geçerli olmaması durumunda, böyle bir senaryoda zincir durabilir veya yeniden sıralama meydana gelebilir. Bunun üzerine zinciri daha önceki bir durumdan yeniden başlatmak için sosyal konsensüs gerekecek - bunu yapmak için kullanılabilecek denetim noktaları yoluyla gönderilen Polygon PoS durumunun anlık görüntüleri dahil.

### - Polygon katılımcılarının Polygon konsensüsü manipüle etmeye çalışması. Örneğin bir kartel oluşturarak? {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

Bunun üzerine bu doğrulayıcıları uzaklaştırarak ve zinciri yeni bir doğrulayıcılar kümesiyle yeniden başlatarak zinciri daha önceki bir durumdan yeniden başlatmak için sosyal konsensüs gerekecektir - bunu yapmak için kullanılabilecek denetim noktaları yoluyla gönderilen Polygon PoS durumunun anlık görüntüleri dahil.


### - Sisteminin kritik bir parçasında bir hata (bug) veya açıklardan yararlanma (exploit) keşfedilmesi? {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

Sistemin inşasında muharebe testinden geçmiş bileşenlerin yeniden kullanılmasına özen gösterilmiştir. Ancak sistemin kritik bir parçasında bir hata veya açıklardan yararlanma varsa, zinciri daha önceki bir duruma sosyal konsensüs yoluyla geri yüklemek ana çözüm yoludur.
