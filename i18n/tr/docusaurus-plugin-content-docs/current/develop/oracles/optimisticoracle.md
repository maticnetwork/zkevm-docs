---
id: optimisticoracle
title: UMA'nın İyimser Oracle'ı
sidebar_label: UMA
description: UMA'nın Optimistic Oracle sözleşmelerden her türlü veriyi hızlı bir şekilde talep etmelerini ve almalarını sağlar
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

UMA'nın Optimistic Oracle sözleşmelerin her türlü veriyi hızlı bir şekilde talep etmesine ve almasına izin verir. UMA'nın oracle sistemi iki temel bileşenden oluşur:

1. İyimser Oracle
2. Veri Doğrulama Mekanizması (DVM)

## İyimser Oracle {#optimistic-oracle}

UMA'nın **Optimistic Oracle** sözleşmelerden fiyat bilgilerini hızlı bir şekilde talep etmelerini ve almalarını sağlar. Optimist Oracle fiyat talebini başlatan sözleşmeler ile Veri Doğrulama Mekanizması (DVM) olarak bilinen UMA'nın uyuşmazlık çözümü sistemi arasında genelleştirilmiş bir tırmanma oyunu olarak görev yapmaktadır.

İyimser Oracle vasıtasıyla teklif edilen fiyatlar, fiyata itiraz edilmedikçe, DVM'ye gönderilmez. Bu sayede sözleşmeler, bir varlığın fiyatını zincir üzerinde yazmadan önceden tanımlanmış bir süre içinde fiyat bilgisi elde edebilmektedir.

## Veri Doğrulama Mekanizması (DVM) {#data-verification-mechanism-dvm}

Bir itirazda bulunulursa, talep DVM'ye gönderilir. UMA'da kurulan tüm sözleşmeler DVM'yi ihtilafları çözecek bir payanda olarak kullanır. DVM'ye gönderilen ihtilaflar, UMA token sahipleri varlık fiyatı için belli bir zaman içinde oy kullandıktan sonra 48 saat içinde çözülecektir. UMA üzerindeki sözleşmeler, bir varlığın fiyatına 48 saatten daha hızlı ihtiyaç duymadıkça, İyimser Oracle'ı kullanmaya ihtiyaç duymaz.

Veri Doğrulama Mekanizması (DVM), UMA Protokolü üzerinde geliştirilen sözleşmeler için ihtilaf çözüm hizmetidir. DVM; oynak (ve bazen manipüle edilebilir) piyasalarda ortaya çıkan sorunların güvenli ve doğru şekilde yönetilmesini sağlamak için insan sezgisinden oluşan bir bileşeni kapsadığı için güçlü bir çözümdür.

## İyimser Oracle Arayüzü {#optimistic-oracle-interface}

İyimser Oracle, fiyatları almak için finansal sözleşmeler veya herhangi bir üçüncü taraf tarafından kullanılır. Bir fiyat talep edildikten sonra herkes yanıt olarak fiyat teklif edebilir. Teklif edildikten sonra, fiyat herkesin teklif edilen fiyat hakkında itirazda bulunabileceği ve itiraz edilen fiyatın uzlaşma için UMA DVM'ye gönderilebileceği bir canlılık döneminden geçer.

:::info

Bu bölüm, farklı katılımcıların İyimser Oracle ile nasıl etkileşim kurabileceğini açıklamaktadır. İyimser Oracle sözleşmelerinin en güncel mainnet, kovan veya Katman 2 dağıtımlarını görüntülemek için [üretim adreslerine](https://docs.umaproject.org/dev-ref/addresses) başvurun.

:::

İyimser Oracle arayüzünü oluşturan on iki yöntem bulunur.
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

Yeni bir fiyat talep eder. Bu, kayıtlı bir fiyat tanımlayıcısı için olmalıdır. Bu metodun UMA sisteminde kayıtlı çoğu finansal sözleşme tarafından otomatik olarak çağrıldığını ve herhangi bir kayıtlı fiyat tanımlayıcısı için herkes tarafından çağrılabileceğini unutmayın. Örneğin, Sona Eren Çoklu Parti (EMP) sözleşmesi, `expire` metodu çağrıldığında bu metodu çağırır.

Parametreler:
- `identifier`: Talep edilen fiyat tanımlayıcısı.
- `timestamp`: Talep edilen fiyatın zaman damgası.
- `ancillaryData`: Fiyat talebi ile geçirilen ek argümanları temsil eden yardımcı veri.
- `currency`: Ödül ve ücretlerin ödemesi için kullanılan ERC20 token'ı. DVM ile kullanım için onaylanmış olmalıdır.
- `reward`: Başarılı bir teklif sahibine sunulan ödül. Çağrıyı yapan tarafından ödenecektir. Not: Bu 0 olabilir.

### proposePrice {#proposeprice}

Mevcut bir fiyat talebi için bir fiyat değeri önerir.

Parametreler:
- `requester`: Başlangıç fiyat talebinin göndericisidir.
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.
- `proposedPrice`: Teklif edilen fiyattır.

### disputePrice {#disputeprice}

Aktif bir teklif içeren mevcut fiyat talebi için bir fiyat değerine itiraz eder.

Parametreler:
- `requester`: Başlangıç fiyat talebinin göndericisidir.
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.

### settle {#settle}

Açık bir fiyat talebini uzlaştırmayı dener. Eğer yerleşemezse geri dönecektir.

Parametreler:
- `requester`: Başlangıç fiyat talebinin göndericisidir.
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.

### hasPrice {#hasprice}

Belli bir talebin çözülmüş veya uzlaştırılmış (yani iyimser oracle'ın bir fiyatı) olup olmadığını kontrol eder.

Parametreler:
- `requester`: Başlangıç fiyat talebinin göndericisidir.
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.

### getRequest {#getrequest}

Bir fiyat talebi hakkında tüm bilgiyi içeren güncel veri yapısını alır.

Parametreler:
- `requester`: Başlangıç fiyat talebinin göndericisidir.
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.

### settleAndGetPrice {#settleandgetprice}

Daha önce bir çağırıcı tarafından talep edilen fiyatı alır. Talep uzlaştırılmış veya uzlaştırılabilir değilse ilk haline döner. Not: Bu metot görünüm değildir, bu yüzden bu çağrı fiyat talebi zaten uzlaştırılmamışsa uzlaştırabilir.

Parametreler:
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.

### setBond {#setbond}

Bir fiyat talebi ile ilişkili teklif bonosunu yapılandırın.

Parametreler:
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.
- `bond`: Ayarlanacak özel bono miktarıdır.

### setCustomLiveness {#setcustomliveness}

Talep için bir özel canlılık değeri belirler. Canlılık, bir talebin otomatik olarak çözümlenmeden önce beklemek zorunda olduğu zaman miktarıdır.

Parametreler:
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.
- `customLiveness`: Yeni özel canlılıktır.

### setRefundOnDispute {#setrefundondispute}

Teklif ihtilaflı ise talebi ödülü geri ödemeye ayarlar. İhtilaf nedenli bir gecikme durumunda çağrıyı yapanı "hedge" etmeye yardım edebilir. Not: Bir ihtilaf durumunda kazanan yine de diğerinin bonosunu alır, bu yüzden ödül geri ödense bile yine de elde edilecek bir kâr vardır.

Parametreler:
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.

### disputePriceFor {#disputepricefor}

Aktif bir teklif içeren bir fiyat talebine bir başka adres adına itiraz eder. Not: Bu adres bu itirazdan gelen ödülleri alacaktır. Ancak bonolar çağrıyı yapandan çekilir.

Parametreler:
- `disputer`: İhtilafçı olarak ayarlanacak adres.
- `requester`: Başlangıç fiyat talebinin göndericisidir.
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.

### proposePriceFor {#proposepricefor}

Bir başka adres adına bir fiyat değeri teklif eder. Not: Bu adres, bu tekliften gelen ödülleri alacaktır. Ancak bonolar çağrıyı yapandan çekilir.

Parametreler:
- `proposer`: Teklifçi olarak ayarlanacak adrestir.
- `requester`: Başlangıç fiyat talebinin göndericisidir.
- `identifier`: Mevcut talebi tanımlayacak fiyat tanımlayıcısıdır.
- `timestamp`: Mevcut talebi tanımlayacak zaman damgasıdır.
- `ancillaryData`: Talep edilen fiyatın yardımcı verisidir.
- `proposedPrice`: Teklif edilen fiyattır.

## İyimser Oracle'ı Entegre Etme {#integrating-the-optimistic-oracle}

Bu demoda bir kullanıcının ERC-20 token bakiyesini emanete alan bir `OptimisticDepositBox` sözleşmesi kurulacaktır.

Yerel bir test ağı blok zinciri üzerinde, kullanıcı, sözleşmeye wETH (Sarmalanmış Ether) yatıracak ve USD cinsinden wETH çekecektir. Örneğin, eğer bir kullanıcı $10,000 USD of wETH, and the ETH/USD exchange rate is $2.000 tutarında fon çekmek isterse o kullanıcı 5 wETH çekecektir.

* Kullanıcı `OptimisticDepositBox` sözleşmesini DVM üzerinde etkinleştirilmiş fiyat tanımlayıcılarından biriyle bağlar.

* Kullanıcı `OptimisticDepositBox` sözleşmesine wETH yatırır ve sözleşmeyi `ETH/USD` fiyat tanımlayıcısı ile kaydeder.

* Kullanıcı şimdi, İyimser Oracle'ın iyimser zincir içi fiyatlama için etkinleştirilmiş olmasıyla, akıllı sözleşme çağrıları yoluyla `DepositBox` kasasından USD cinsinden wETH miktarı çekebilir.

Bu örnekte kullanıcı zincir dışı bir `ETH/USD` fiyat yayınına referans yapmaksızın USD cinsinden wETH miktarlarını aktaramayacaktır. Bu nedenle İyimser Oracle kullanıcının bir referans fiyat "çekmesine" olanak tanır.

DVM'ye iletilen fiyat taleplerinin aksine, İyimser Oracle'a iletilen bir fiyat talebi, herhangi bir ihtilaf yoksa belirtilen bir canlılık penceresi içinde çözülebilir, ki bu süre, DVM oylama döneminden önemli ölçüde daha kısa olabilir. Canlılık penceresi yapılandırılabilir ama tipik olarak iki saattir, oysa bu süre DVM üzerinden yapılan uzlaşmalar için 2-3 gündür.

Fiyat talebinde bulunanın bu aşamada DVM'ye ücret ödemesi gerekmez. Talepte bulunan, fiyat talebine yanıt veren teklifçiye bir ödül teklif edebilir ama bu ödülün değeri bu örnekte `0` olarak ayarlanır.

Fiyat teklif eden, fiyatı ile beraber bir bono yayınlar, bu bono fiyata itiraz yoksa veya itiraz teklif eden kişinin lehine çözülürse iade edilir. Aksi takdirde, bu bono DVM'ye nihai ücreti ödemekte ve başarılı itirazcıya bir ödül ödemesi yapmakta kullanılır.

Demoda gösterildiği gibi, talep sahibi fiyat teklifçisinden ek bir bono istemez, bu nedenle yayınlanan bononun toplam değeri wETH son ücretine, yani 0,2 wETH'e eşittir. Uygulama ayrıntıları için `OptimisticOracle` [sözleşmesi](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html) içindeki `proposePriceFor` fonksiyonuna göz atın.

## Demoyu Çalıştırma {#running-the-demo}

1. [Burada](https://docs.umaproject.org/developers/setup) yer alan tüm ön kurulum adımlarını takip ettiğinizden emin olun.
2. Yerel bir Ganache oturumunu (yani Kovan/Ropsten/Rinkeby/Mainnet olmayan bir oturumu) `yarn ganache-cli --port 9545` ile çalıştırın
3. Başka bir pencerede, sözleşmeleri aşağıdaki komutu çalıştırarak taşıyın:

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. `OptimisticDepositBox` [sözleşmesini](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) devreye almak ve basit kullanıcı akışını tamamlamak için, depo kökünden aşağıdaki demo betiğini çalıştırın:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

Aşağıdaki çıktıyı görmeniz gerekir:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## Sözleşme Fonksiyonlarının Açıklaması {#explaining-the-contract-functions}

`OptimisticDepositBox`[Sözleşme kodu](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) Oracle ile nasıl etkileşime gireceğini gösterir.

`constructor` fonksiyonu, `OptimisticOracle` adresinin, onaylanan teminatın ve fiyat tanımlayıcı beyaz listelerinin ve diğer önemli sözleşme adreslerinin kaydını tutan UMA `Finder` sözleşmesi için bir `_finderAddress` argümanı içerir.

Bu, `constructor` ögesinin teminat türünün ve fiyat tanımlayıcısının geçerli olduğunu kontrol etmesine ve `OptimisticDepositBox` ögesinin daha sonra `OptimisticOracle` ögesini bulmasına ve onunla etkileşmesine imkân verir.

`requestWithdrawal` fonksiyonu `OptimisticOracle` ögesine `ETH/USD` fiyatını talep eden dahili bir çağrı içerir. Çağrı döndürüldüğünde, kullanıcı fon çekme işlemini tamamlamak için `executeWithdrawal` ögesini çağırabilir.

Kod yorumlarında daha fazla bilgi ve açıklama var, bu yüzden daha fazla bilgi edinmek istiyorsanız lütfen bir göz atın.

## Ek Kaynaklar {#additional-resources}

UMA DVM ile ilgili bazı ek kaynaklar burada:

- [Teknik Mimari](https://docs.umaproject.org/oracle/tech-architecture)
- [Ekonomik Mimari](https://docs.umaproject.org/oracle/econ-architecture)
- UMA'nın DVM tasarımı hakkında [blog yazısı](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8)
- UMA'nın DVM tasarımı hakkında [whitepaper](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf)'ı
- Optimal ücret politikası hakkında [araştırma deposu](https://github.com/UMAprotocol/research)
- Yönetişim teklifleri için [UMIP deposu](https://github.com/UMAprotocol/UMIPs)
