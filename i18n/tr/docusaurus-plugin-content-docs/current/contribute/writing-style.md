---
id: writing-style
title: Genel Yazma İlkeleri
sidebar_label: General writing guidelines
description: Belge yazarken aşağıdaki ilkelere bağlı kalın.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - writing
  - contribute
  - style
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: writing-style
---

Bu kılavuz teknik belgeleri yazmak için en iyi uygulamalara ve
Polygon Wiki için belge geliştirirken kullanılacak stil kurallarına odaklanır.
Bu kılavuzun amacı, katkıda bulunanların açık, net ve tutarlı içerik yazmalarına
yardımcı olmaktır. Polygon ekibi Polygon Wiki'yi resmi bir Belgeler ürünü olarak sınıflandırır.

## Birincil ilkeler {#primary-guidelines}

Polygon'u özel yapan şeylerden birinin uyumlu tasarımı olduğuna inanıyoruz ve
bu karakteristik özelliğini korumayı amaçlıyoruz. Polygon ekibi Polygon Wiki'yi
resmi bir Belgeler ürünü olarak sınıflandırır. Başlangıçtan beri yeni katkıların projenin geneline yalnızca olumlu etki yapması için
bazı ilkeler belirledik:

- **Kalite**: Polygon projesindeki kod, stil ilkelerini karşılamalı; yeterli sayıda test durumlarını,
açıklayıcı işleme mesajlarını, yapılan katkının herhangi bir
uyumluluk taahhütünü ihlal etmediğinin veya herhangi bir istenmeyen özellik etkileşimine neden olmadığının kanıtını
ve yüksek kaliteli hakem incelemesinin ispatını sunmalıdır.
- **Boyut**: Polygon proje kültüründe küçük, sıkça gönderilen çekme talepleri
yer alır. Bir çekme talebi ne kadar büyük olursa
bağımsız ve tekil olarak değerlendirmeye uygun PR'ler şeklinde tekrar gönderiminin istenme ihtimali o kadar artar.
- **Sürdürülebilirlik**: Özellik sürekli bakım gerektirecek ise (ör. belirli bir
veritabanı markası için destek) bu özelliği sürdürmek için sorumluluk kabul etmenizi
sizden isteyebiliriz.

Stil kılavuzu aşağıdaki stil rehberlerinden yola çıkar:

> Bu kılavuzdaki bir stil, ses tonu veya terminoloji sorusunun cevabını bulamıyorsanız
> lütfen bu kaynaklara başvurun.

- [Google Stil Kılavuzu](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md)
- [The Oxford Style Manual](https://global.oup.com/academic/product/new-oxford-style-manual-9780198767251?cc=nl&lang=en&)
- [The Microsoft Manual of Style](https://docs.microsoft.com/en-us/style-guide/welcome/)

### Statik site üreteci {#static-site-generator}

Bu Wiki, [Docusaurus](https://docusaurus.io/) kullanılarak geliştirilir; Docusaurus, markdown
biçiminde belge siteleri kurmak için kullanılan bir statik site üretecidir. Bu Wiki markdown dosyaları için aşağıdaki meta veri taslağını
temel alır ve her yeni belge için uyarlanmalıdır:

```
---
id: wiki-maintainers
title: Wiki Maintainers
sidebar_label: Maintainers
description: A list of Polygon Wiki maintainers
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - docs
  - maintainers
  - contributors
image: https://matic.network/banners/matic-network-16x9.png
slug: community-maintainers
---
```

Bir markdown dosyası için meta veriyi yazarken dikkate alınması gereken bazı önemli noktalar vardır:
- Katkıda bulunanlardan **benzersiz bir kimlik** kullanmalarını; **yalnızca** "Giriş" veya "Genel Bakış" gibi genel geçer kelimeler veya cümleler kullanmaktan kaçınmalarını bekliyoruz.
- **Başlık**, makalenin başında kullanılan cümledir; bu makalenin başlığı "Genel Yazma İlkeleri"dir. Bu nedenle bir makalenin girişinde bir H1/H2 header (üst bilgi/başlık) eklemek gerekli değildir. Bunun yerine, meta veriden gelen bu **başlığı** kullanın.
- **Açıklama** çok uzun olmamalıdır; zira karakter sayısı limiti bulunan dizin kutucuklarında kullanılır. Örneğin, *basics-blockchain.md* için kullanılan "Blok zinciri işlemleri kaydetmek için kullanılan değiştirilemez bir defterdir" açıklaması, dizin kutucuğunda şu şekilde görünür:
![img](/img/contribute/index-tile.png)

  **Açıklama**, karakterler arasındaki boşluklar da dahil, en çok **60 karakter** uzunluğunda olmalıdır.
- Anahtar kelimeler arama motoru optimizasyonunu (SEO) artırmak ve makaleyi tanıtmak için önemlidir. En az beş anahtar kelime yazmaya çalışın.

:::note

Lütfen bu arada
daha fazla bilgi için [resmi meta veri belgelerine](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) göz atın.

:::

### Deneyimi okuyucu ile paylaşın {#share-the-experience-with-the-reader}

- Birinci Şahıs: "Ben" veya "bana" demeyin. Birinci şahıs anlatımını seyrek olarak ve belli bir amaçla
kullanın. Birinci şahıs anlatımı aşırı kullanıldığında paylaşılan bir deneyim duygusunu
zayıflatarak okuyucunun yolculuğunu bulanıklaştırabilir.
- İkinci Şahıs: Çoğu durumda, okuyucuya doğrudan hitap edin. Eğitimler için ya birinci çoğul şahıs,
yani "biz", "bizim", "bizimkiler", ya da ikinci şahıs anlatımını kullanın. Eğitimler bir konu ile ilgili
daha yönlendirici bir yaklaşım sunduğundan ötürü, birinci çoğul şahıs diğer belgelere göre
daha doğal ve yaygın olarak kabul görmüş bir uygulamadır.
- Üçüncü Şahıs: Polygon veya Polygon teknolojisinden bahsederken "biz" zamirini kullanmayın.
- Etken Çatı: Mümkün olan her durumda şimdiki zaman kullanın. Edilgen çatının uygun olabileceği
durumlar da olabilir; yapılan işin odak noktası olması gerektiği durumlarda edilgen konuşma kipine dönebilirsiniz.
- İnsan faktörünü unutmayın: Teknik konseptleri anlatırken dinamik bir ton takınmak,
yazılımı (veya kodu) sadece yaptığı işle anlatmaya kıyasla okuyucunun materyal ile daha iyi bağlantı kurmasına
yardımcı olur.
- Zamirler: İngilizce yazıyorsanız mümkün olan her durumda "they" gibi cinsiyet belirtmeyen zamirler kullanın. Genel olarak herhangi bir adı
tekilden çoğula değiştirerek özne-yüklem-zamir uyumunu sağlayabilir ve
"he", "him", "his", veya "she", "her", "hers" gibi cinsiyet belirten adıllar kullanmaktan kaçınabilirsiniz.
  - Kişi belirtmeyen ve muğlak olabilecek zamirler kullanırken dikkatli olun. Aşağıdaki kişi belirtmeyen zamirlerden birini kullandığınızda
  aynı cümlede "of what?", "of which?" veya "as what?" sorularını cevapladığınızdan emin olun.
    - all, another, any
    - each, either
    - few, many, neither, none
    - one, other
    - same, several, some, such
    - that, them, these, those

### Kısa ve öz anlatın {#being-swift-and-concise}

- Bir belge gerekli sözcükler ve doğru ifadeler kullanıldığında güçlü ve anlamlı olur.
  - Mümkün olan her durumda yaygın, iyi bilinen sözcükler kullanın.
  - Süslü anlatımlardan ve abartılı edebi ifadelerden kaçının.
  - Jargon, konuşma dili ve deyim kullanımından kaçının.
  - Zarflar ve sübjektif ifadeler kullanmaktan kaçının. Örneğin, aşağıdakileri içeren sözcük ve ifadelerden kaçının
  kolayca/easily, hızlıca/rapidly, basitçe/simply, çabucak/quickly. İhtiyaç olursa, bir şeyi olduğundan az göstermek
  abartmaktan daha iyidir.
  - Muğlaklık katan ifadeler kullanmayın. Örneğin, "Bu sürüm canlıya geçtiğinde..." (When this release is live...) yerine
  "Bu sürüm canlıya geçtikten sonra..." (After this release is live...) deyin.
  - Sözcük seçimine özellikle dikkat edin. (Sebep-sonuç ilişkisi ima eden) "because" yerine (bir zaman aralığı ima eden) "since"
  ya da "after" (her seferinde) yerine "once" (bir seferlik) kullanımını
  tercih etmek gibi.
  - Ünlem işaretleri kullanmaktan kaçının.
- Gereksiz sözcükler veya ifadeler kullanmaktan kaçının. Bazı örnekler:
  - "and then" (ve sonra) yerine "then" (sonra) kullanın.
  - "In order to" (amacıyla) yerine "to" (için) kullanın.
  - "As well as" (yanı sıra) yerine sadece "and" (ve) kullanın.
  - "Via" (üzerinden) yerine doğru İngilizce ikamesi olan "using" (kullanarak), "through" (yoluyla) veya "by" (vasıtasıyla) gibi kelimeleri kullanın.
- Çok resmi olmayan ama yine de profesyonellik sezdiren bir konuşma dili kullanın.
- Netlik: Kelimeyi veya ifadeyi mümkün olduğunca açık haliyle kullanın. Örneğin:
  - "E.g." (ör.) yerine "for example" (örneğin) kullanın.
  - "Yani" anlamında kullanılan "i.e" yerine "that is" (diğer bir deyişle) kullanın veya cümleyi ekstra niteleme ifadesi kullanmaya gerek olmadan
  yeniden oluşturun.
  - "Etc." (vs. veya vb.) yerine "and so on" (vesaire) kullanın veya içeriği bu terime gerek kalmayacak şekilde değiştirin. Bir örnekler listesini
  bitirirken "etc." (vs.) demek yerine, bir veya iki örneği odak noktası yapıp geri kalanlarını "such as" (mesela/söz gelişi...) veya "like" (...gibi) edatlarıyla tamamlayın.
  - "Caveat" (ikaz) yerine doğru İngilizce/Türkçe ikamesi olan "notice" (duyuru/bildirim), "caution" (dikkat) veya "warning" (uyarı) gibi kelimeleri kullanın.
  - Can't veya don't gibi kaynaştırmalar en azından İngilizce yazanların daha doğal bir konuşma dilini tutturmalarına yardımcı olur.
  Kaynaştırmaları yerli yerinde kullanmaya özen gösterin.

## Yapı {#structure}

Belgeler bölümler halinde düzenlenmelidir. Her bölüm bir temayı veya konuyu
ele almalıdır. Her bölümde bir veya birden çok paragraf bulunur.
Her paragraf yalnızca bir düşünce ifade etmelidir. Aynı düşünceleri farklı bölümlerde tekrar etmekten
kaçının ve birden fazla tartışma noktası içeren paragrafları bölün.
Okuyucunun bir paragrafın konusunu daha ilk cümlede anlaması gerekir.

## Ürün belgeleri {#product-documentation}

Belli bir ürün hakkında yazıyorsanız belgenin o ürünü çağrıştırdığından
emin olun. Daha önce Polygon belgeleri genel nitelikteydi, ağırlıklı olarak Polygon PoS ürünüyle ilgiliydi.
Ama şimdi birden fazla Polygon ürünü mevcut olduğundan, katkıda bulunanların yaptıkları
eklemelerde dikkatli olmaları gerekir.

Örneğin, "### kullanarak Polygon üzerinde akıllı sözleşme devreye almak" muğlak bir ifadedir. Bu eğitim
Polygon PoS ürününe atıfta bulunuyorsa bu net bir şekilde ifade edilmelidir. Örneğin,
"### kullanarak Polygon PoS üzerinde akıllı sözleşme devreye almak". Aynı örneği Polygon Hermez gibi bir Polygon Rollup ile kullanırsak,
"### kullanarak Polygon Hermez üzerinde akıllı sözleşme devreye almak".

Genel kılavuzlar veya eğitimler için ürün belgelerinin doğru
belge Hub'ına eklendiğinden emin olun. Çoğu belge için referans bilgileri
genel Hub'lardan (ör. "Geliştirme" veya "Doğrulama") birinde bulunmalıdır; ancak belge ait olduğu
ürün belgeleri altında yer alacaktır. Belgeyi Hub üzerinde referanslamak için
onu `sidebars.js` üzerine eklemeniz gerekir.
Bununla birlikte, belgenin kendisi ilgili ürünün belge Hub'ı içinde yer alacaktır
ve kullanıcı üzerine tıkladığında onu yönlendirecektir. Aynı kural çoğu belge için
geçerlidir. Referansları genel Hub'lardan birinde bulunmalıdır; ancak belgenin kendisi
ilgili ürün belgelerinin içinde yer alacaktır.

Polygon Wiki üzerindeki çoğu API tabanlı belge, referans belgesi
biçimindedir. Eğitimlerde sözü geçen API'ler buna istisnadır.
Örneğin, Matic.js üzerindeki API belgeleri
API içindeki her işlev veya metot için yapı, parametreler ve döndürülen değerler hakkında bilgi sağlar.

## API belgeleri {#api-documentation}

Bir API belgelemesi üzerinde çalışırken aşağıdakileri göz önünde bulundurun:

* Bir başlangıç noktası sunan sağlam bir giriş.
* Çağrı veya isteğin net bir açıklaması. Uç noktanın yaptığı şeyin açıklaması.
* Tam bir parametre listesi:
  * Parametre türleri
  * Kullanılabilir parametreleri gösteren yer tutucuları içeren söz dizimi ifadeleri
  * Özel biçimlendirme
* Birden fazla dil için kod örnekleri.
* Beklenen çıktıyı içeren bir çağrı örneği.
* Hata Kodları. Edge cases (uç senaryolar)
* Gerekirse API anahtarlarının nasıl alınacağıyla ilgili talimatlar.
* En çok sorulan sorulara veya senaryolara değinmekte her zaman fayda vardır.
* Sosyal medya paylaşımları, bloglar veya video içerikleri gibi ek kaynaklara bağlantılar.
