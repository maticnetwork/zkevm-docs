---
id: responsibilities
title: Sorumluluklar
description: Polygon Ağı üzerinde doğrulayıcı olmanın sorumlulukları
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Gelişmelerden haberdar olun

Polygon bildirim [gruplarına](https://polygon.technology/notifications/) abone olarak Polygon ekibinden ve topluluğundan gelen en son düğüm ve doğrulayıcı güncellemelerini takip edin.

:::

Blok zinciri doğrulayıcısı, blok zinciri içindeki işlemleri doğrulamaktan sorumlu olan kişidir. Polygon Ağı'nda herhangi bir katılımcının ödül kazanmak ve işlem ücretlerini toplamak için bir **Validator Düğümü (Sentry + Validator)** çalıştırarak Polygon'un doğrulayıcı olması için nitelikli olabilir. Doğrulayıcıların iyi bir şekilde katılımını sağlayacaklarından emin olmak için, doğrulayıcılar ekosistem içinde bir stake olarak en az 1 MATIC token kilitler.

:::info

Şu anda bir seferde 100 aktif doğrulayıcı sınırı var. Bir doğrulayıcının ne olduğu hakkında ayrıntılı bir açıklama için [bkz](/maintain/validator/architecture).

Ayrıca, [<ins>PIP4 yönetim</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956) önerisi sözleşme düzeyinde uygulandıktan sonra minimum staking miktarı 10.000 to yükselecektir.

:::

Polygon Ağı üzerindeki [tüm doğrulayıcılar](/maintain/glossary.md#validator) aşağıdaki sorumluluklara sahiptir:

* Teknik düğüm işlemleri (düğümler tarafından otomatik olarak yapılır)
* Operasyonlar
  * Yüksek çalışma süresini (uptime) sürdürme
  * Düğümle ilgili hizmetleri ve işlemleri günlük olarak kontrol edin
  * Düğüm izlemesini çalıştırmak
  * İmzalayanın adresi üzerinde ETH dengesini (0,5 ila 1 arasında) tutun
* Delegasyon
  * Delegasyona açık olun
  * Komisyon oranlarını bildirmek
* İletişim
  * Sorunları iletmek
  * Geri bildirim ve öneriler sunmak
* Blok zinciri üzerindeki doğrulayıcı blokları için staking ödülleri kazanın

## Teknik düğüm operasyonları {#technical-node-operations}

Aşağıdaki teknik düğüm işlemleri **düğümler tarafından otomatik olarak yapılır:**

* Blok üreticisi seçimi:
  * Her bir [span](/docs/maintain/glossary.md#span)'de faaliyet gösterecek blok üreticisi kümesi için doğrulayıcılardan oluşan bir alt küme seçmek
  * Her bir span için blok üreticisi kümesini [Heimdall](/maintain/glossary.md#heimdall) üzerinde tekrar seçme ve seçim bilgilerini düzenli aralıklarla [Bor](/maintain/glossary.md#bor)'a iletme.
* Bor üzerinde blokları doğrulama:
  * Bir Bor yan zincir blokları kümesi için, her bir doğrulayıcı bu blokların blok verilerini bağımsız olarak okur ve verileri Heimdall üzerinde doğrular.
* Denetim noktası gönderimi:
  * Doğrulayıcılar arasından her bir Heimdall bloku için bir [teklifçi](/maintain/glossary.md#proposer) seçilir. [Denetim noktası](/maintain/glossary.md#checkpoint-transaction) teklifçisi Bor blok verilerinin denetim noktasını oluşturur, doğrular ve imzalanan işlemi diğer doğrulayıcıların onayına gönderir.
  * Aktif doğrulayıcılardan 2/3'ünden fazlası denetim noktası üzerinde konsensüse ulaşırsa denetim noktası Ethereum mainnet'e gönderilir.
* Değişikliklerin Ethereum'daki Polygon staking sözleşmelerine senkronize edilmesi:
  * Denetim noktasını gönderme adımının devamında, bu bir harici ağ çağrısı olduğundan, Ethereum'daki denetim noktası işlemi onaylanabilir veya onaylanmayabilir, ya da Ethereum'daki yoğunluk sorunları nedeniyle beklemede kalabilir.
  * Bu durumda, takip eden bir `ack/no-ack` (onayla/onaylama) işlemi bir sonraki denetim noktasının önceki Bor bloklarının bir anlık görüntüsünü de içermesini sağlar. Örneğin, 1 no.lu denetim noktası 1-256 no.lu Bor bloklarını kapsıyorsa ve bir nedenden dolayı başarısız olduysa, bir sonraki 2 no.lu denetim noktası 1-512 no.lu Bor bloklarını kapsayacaktır. Ayrıca bakınız [Heimdall mimarisi: Denetim Noktası](/pos/heimdall/checkpoint).
* Ethereum mainnet'ten Bor yan zincirine durum senkronizasyonu:
  * Sözleşme durumu Ethereum ve Polygon arasında, spesifik olarak [Bor](/maintain/glossary.md#bor) vasıtasıyla taşınabilir:
  * Ethereum'daki bir DApp sözleşmesi Ethereum'daki özel bir Polygon sözleşmesinde bulunan bir fonksiyonu çağırır.
  * İlgili olay Heimdall'a ve ardından Bor'a iletilir.
  * Polygon akıllı sözleşmesinde bir state-sync işlemi çağrılır ve DApp bu değeri Bor'da bulunan bir fonksiyon çağrısı yoluyla Bor'da alabilir.
  * Durumu Polygon'dan Ethereum'a göndermek için de benzer bir mekanizma mevcuttur. Ayrıca bakınız [Durum Senkronizasyonu Mekanizması](/docs/pos/state-sync/state-sync).

## Operasyonlar {#operations}

### Yüksek çalışma süresini (uptime) sürdürmek {#maintain-high-uptime}

Polygon Ağında düğüm çalışma süresi (uptime), doğrulayıcı düğümünün imzaladığı [denetim noktası işlemlerinin](/docs/maintain/glossary.md#checkpoint-transaction) sayısına dayanır.

Bir teklifçi yaklaşık her 34 dakikada bir Ethereum mainnet'e bir denetim noktası işlemi gönderir. Kontrol noktası işlemi, Polygon Ağı'ndaki her [doğrulayıcı](/maintain/glossary.md#validator) tarafından imzalanmalıdır. **Bir kontrol noktası üzerinde to doğrulayıcı düğüm performansının azaltılmasına neden olur**.

Denetim noktası işlemlerinin imzalaması süreci otomatikleştirilmiştir. Doğrulayıcı düğümünüzün tüm geçerli denetim noktası işlemlerini imzaladığından emin olmak için düğümünüzün sağlığını korumanız ve izlemeniz gerekir.

### Düğüm servislerini ve işlemlerini günlük olarak kontrol etmek {#check-node-services-and-processes-daily}

[Heimdall](/maintain/glossary.md#heimdall) ve [Bor](/maintain/glossary.md#bor) ile ilişkili hizmet ve süreçleri günlük olarak kontrol etmelisiniz. Ayrıca, disk kullanımını azaltmak için düğümlerin budaması düzenli olarak yapılmalıdır.

### Düğüm izlemesini çalıştırmak {#run-node-monitoring}

Şunlardan birini çalıştırmanız gerekir:

* Polygon tarafından sağlanan Grafana Panoları. GitHub deposuna bakın: [Matic-Jagar kurulumu](https://github.com/vitwit/matic-jagar)
* Veya, [doğrulayıcı](/maintain/glossary.md#validator) ve [nöbetçi](/maintain/glossary.md#sentry) düğümleri için kendi izleme araçlarınızı kullanın
* Düğümlerde kullanılan Ethereum uç noktası düğümün istek limitleri dahilinde olduğundan emin olmak için izlenmelidir

### ETH bakiyesi bulundurmak {#keep-an-eth-balance}

Bu durumda yeterli miktarda ETH (her zaman eşik değerinin etrafında olması gerekir, yani 0,5 ile 1) için doğrulayıcı [imzalayıcı](/maintain/glossary.md#signer-address) adresiniz üzerinde Ethereum Mainnet'te olmalıdır.

Şunları yapabilmek için ETH'a ihtiyacınız olacaktır:

* Ethereum mainnet'te teklif edilen [denetim noktası işlemlerini](/maintain/glossary.md#checkpoint-transaction) imzalamak.
* Ethereum mainnet'te denetim noktası işlemleri teklif etmek ve göndermek.

İmzacı adresinde yeterli miktarda ETH bulundurmamak şunlara neden olacaktır:

* Denetim noktası gönderiminde gecikmeler. Ethereum ağında işlem gaz fiyatlarının dalgalanabileceğini ve fırlayabileceğini aklınızda bulundurun.
* Denetim noktalarına dahil edilen işlemlerin kesinleşmesinde gecikmeler.
* Sonraki denetim noktası işlemlerinde gecikmeler.

## Delegasyon {#delegation}

### Delegasyona açık olmak {#be-open-for-delegation}

Tüm doğrulayıcılar topluluğun delegasyonu için açık olmalıdır. Her bir doğrulayıcı kendi komisyon oranını belirleme seçeneğine sahiptir. Komisyon oranının üst limiti yoktur.

### Komisyon oranlarını bildirmek {#communicate-commission-rates}

Bu durum doğrulayıcıların komisyon oranlarını iletmek ve komisyon oranı ile topluma değişiklik yapmak için ahlaki görevdir. Komisyon oranlarını bildirmek için tercih edilen platformlar şunlardır:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)

## İletişim {#communication}

### Sorunları iletmek {#communicate-issues}

Sorunları mümkün olduğunca erken bildirmek, topluluğun ve Polygon ekibinin sorunları en kısa sürede düzeltmesini sağlar. Komisyon oranlarını bildirmek için tercih edilen platformlar şunlardır:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### Geri bildirim ve öneriler sunmak {#provide-feedback-and-suggestions}

Polygon'da doğrulayıcı ekosisteminin herhangi bir yönüyle ilgili geri bildiriminize ve önerilerinize değer veriyoruz. Geri bildirimlerin ve önerilerin sunulması için tercih edilen platform [Forumdur](https://forum.polygon.technology/).
