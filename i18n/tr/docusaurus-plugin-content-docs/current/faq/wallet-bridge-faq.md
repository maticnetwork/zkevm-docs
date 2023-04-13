---
id: wallet-bridge-faq
title: Cüzdan <>Köprüsü SSS
description: Bir sonraki blok zinciri uygulamanızı Polygon üzerinde oluşturun.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Polygon Web Cüzdanını nerede kullanabilirim? {#where-can-i-use-the-polygon-web-wallet}
İşte Polygon Cüzdan Suite URL'si: https://wallet.polygon.technology/ Polygon Cüzdan Suite, Polygon tarafından sağlanan Web3 uygulamalarından oluşan bir koleksiyondur. [Polygon Cüzdan](https://wallet.polygon.technology/polygon/assets) (merkezi olmayan bir cüzdan), [Polygon Köprüsü](https://wallet.polygon.technology/polygon/bridge/deposit) (L1-L2 köprüsü), [Polygon Staking](https://staking.polygon.technology/) (MATIC tokenlarını işlemek ve devretmek için bir ortam) ve [Polygon Güvenli Köprü](https://safe-bridge.polygon.technology/safe) (çok amaçlı bir köprü) oluşur.

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## Şu anda hangi cüzdanlar destekleniyor? {#which-wallets-are-currently-supported}

Metamask, Coinbase, Bitski Cüzdanı, Venly ve WalletConnect şu anda desteklenen are

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## Polygon cüzdanım ile ne yapabilirim? {#what-can-i-do-with-my-polygon-wallet}

- Polygon'daki bir hesaba fonlar gönderebilirsiniz.
- Ethereum'dan Polygon'a (köprüyü kullanarak) fonlar yatırabilirsiniz.
- Polygon'dan Ethereum'a (yine köprüyü kullanarak) fonlar çekebilirsiniz.

## MetaMask cüzdanım Polygon cüzdana bağlanmıyor {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

Bu durum birçok nedene bağlı olarak meydana gelebilir. **Başka bir zaman** denemenizi, **başka bir tarayıcı** kullanmanızı veya bunlardan herhangi biri yardımcı olmazsa, **[destek ekibimizle iletişime](https://support.polygon.technology/support/home)** geçmenizi öneririz.

## Polygon Cüzdan Suite kullanarak Ethereum'dan Polygon için nasıl para yatırabilirim? {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
Lütfen aşağıdaki videoyu izleyin veya [bu](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon) öğreticiyi izleyin.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>Tarayıcınız bu video ögesini desteklemiyor.</p>
</video>

## Polygon Cüzdan Suite kullanarak Polygon üzerinden Polygon üzerinden Ethereum'dan para çekebilirim. {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
Lütfen aşağıdaki videoyu izleyin veya [bu](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge) öğreticiyi izleyin.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>Tarayıcınız bu video ögesini desteklemiyor.</p>
</video>

## Polygon Cüzdan Suite kullanarak Plasma Köprüsü üzerinden Polygon üzerinden Ethereum'dan para çekebilirim. {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
Lütfen aşağıdaki videoyu izleyin veya [bu](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge) öğreticiyi izleyin.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>Tarayıcınız bu video ögesini desteklemiyor.</p>
</video>

## Polygon Cüzdan Token listesine yeni veya özel bir token nasıl eklenir? {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
Lütfen [bu öğretici](/docs/faq/adding-a-custom-token) ile ilgili izleyin.

## Token sözleşmesini nasıl bulabilirim? {#how-do-i-find-the-token-contract}

Yeni veya özel bir token eklemeye çalışırken token sözleşmesi adresi gerekli olacaktır. Bu token'ı name veya CoinMarketCap üzerinden arayabilirsiniz; burada Ethereum zinciri üzerindeki (ERC20 tokenları için) adresini ve Polygon gibi diğer desteklenen blok zincirlerini görebilirsiniz. Diğer zincirlerdeki token adresi güncellenmiş olmayabilir ama tabii kök adresini her türlü amaç için kullanabilirsiniz.

## Ben fonlarımı yatırdım ama bunu Metamask'ta görmüyorum. Ne yapmalıyım? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

Özel token adresini Metamask'e manuel olarak eklemeniz gerekir.

Metamask'ı açın ve aşağı kaydırıp **Import tokens** (Token'lar içe aktar) seçeneğine tıklayın.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

Ardından, ilgili sözleşme adresi, sembol ve ondalık hassasiyeti ekleyin. Sözleşme adresleri (bu durumda PoS-WETH) bu bağlantıdan bulunabilir: [https://docs.polygon.technology/docs/operate/mapped-tokens/](https://docs.polygon.technology/docs/operate/mapped-tokens/). Polygon Mainnet'teki bakiyeleri görüntülemek için alt token adresini eklemeniz gerekecektir. Hassasiyetin ondalığı WEET için 18'dir (çoğu token için kesinliğin ondalığı 18'dir).

## Polygon Mainnet'i Metamask'e nasıl ekleyebilirim? {#how-can-i-add-polygon-mainnet-on-metamask}

[Bu öğretici](/docs/develop/metamask/config-polygon-on-metamask) kontrol edin.

## Token'ım listede görünmüyor. Kimle iletişime geçmeliyim? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Discord veya Telegram'da Polygon ekibine ulaşın ve token'ınızı listeleye aldırın. Ama önce token'ınızın eşlenmiş (mapped) olduğundan emin olun. Mapp edilmiyorsa lütfen [at](https://mapper.polygon.technology/) bir istek yükseltin.

## Kontrol noktası ulaştıktan sonra işlemimi iptal edebilir miyim? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
Polygon Mainnet'te para çekme işlemi başlatıldığında, ne yazık ki iptal edilemez veya geri alınamaz. Para çekme işlemlerinde tokenler Polygon Mainnet'ten yakılır ve Ethereum Mainnet'e basılır. Bu nedenle, Polygon zincirinden bir kez yakılan tokenler cüzdanınıza geri döndürülemez.

## Gaz ücreti çok yüksek, işlemimi iptal edebilir miyim? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

Ne yazık ki, tokenler Polygon Mainnet'ten yakıldıktan sonra çekme işlemini iptal edemeyiz. Başka bir deyişle, bir işlemi başlatıldıktan sonra iptal etmek imkansızdır. Gaz ücreti Polygon tarafından kontrol edilmez. Bu durum ağ tıkanıklığına ve Ethereum Mainnet'teki belirli bir bloğun işlemlerinin sayısına bağlıdır. Mevcut gaz ücretini karşılayamayacağınızı düşünüyorsanız, gaz ücreti alt taraftayken daha sonra işleminize devam etmeye çalışabilirsiniz. Ethereum Mainnet üzerindeki gaz ücretini buradan da izleyebilirsiniz: https://etherscan.io/gastracker


## Token'larımı Polygon'dan başka bir cüzdana veya borsaya gönderebilir miyim? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Polygon from borsalara/cüzdanlara doğrudan token gönderemezsiniz. Önce Polygon'dan Ethereum'a çekiş yapmanız, sonra bunu borsa adresinize göndermeniz gerekir (tabii borsanız veya cüzdanınız bu ağı desteklediğini bildirmemişse).

## Doğrudan bir borsa/cüzdan için para gönderme hatasını yaptım. Yardım edebilir misiniz? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

Maalesef bu tür durumlarda yardımcı olamıyoruz. Bir tek Ethereum'u destekleyen borsalara doğrudan fonlar göndermeyin, önce Polygon'dan Ethereum'a çekiş yapın, sonra borsa adresinize gönderin.

## Yanlış bir adrese transfer yaptım. Fonları nasıl geri alabilirim? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

Maalesef geri alamazsınız. Bu adrese ait özel anahtarların yalnızca sahibi bu varlıkların taşınmasına neden olabilir. Jeton gönderdiğiniz adresin doğru adrese olup olmadığını doğrulamak her zaman önerilir.

## İşlemim çok uzun zamandır bekliyordu, ne yapabilirim? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
İşlem, aşağıdaki nedenlerden dolayı düşürülebilir:

1. İşlemi gönderirken düşük gaz fiyatı ayarlayın.
2. Ethereum Mainnet'teki tıkanıklıktan dolayı gaz fiyatındaki ani bir artış.
3. Bu işlem sizin tarafınızdan cüzdanınızdan iptal edilir veya yeni bir işlemle değiştirilir.

Düşen işlemlerle şu şekilde devam edebilirsiniz:

1. İşleminiz bir saatten fazla sıkışmışsa **bir Yeniden Deneme** düğmesi gösterilecektir. Aynı işlemi tamamlamak için **Yeniden** Deneme düğmesine tıklayabilirsiniz. Bu videoda **Try Again** özelliğini nasıl kullanacağınız hakkında daha fazla bilgi için başvurabilirsiniz.
2. Lütfen MetaMask cüzdanınızı da kontrol edin çünkü sometimes sıralı işlemlerden dolayı bazen işlemler düşürülebilir. Bu durumda, sıralı işlemleri temizleyin veya MetaMask ile aynı tarayıcıda yeniden yükleyin.
3. the alternatif bir tarayıcıya yükleyebilir ve ardından işlemi Polygon Cüzdan Suite kullanarak tamamlamaya çalışabilirsiniz.
4. Bu bağlantıyı bekleyen çekilme işlemini tamamlamak için de kullanabilirsiniz. İşlem karmasını arama seçeneğine yapıştırın ve işlemi tamamlamak için **Çıktı Onay** düğmesine tıklayın.

## Fon yatırma onaylandı ama bakiye güncellenmedi ise ne yapabilirim? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

Mevduat işleminin tamamlanması için 22-30 dakika gerekir. Lütfen bir süre bekleyin ve **Yenileme Dengesini** tıklayın.

## Denetim noktası oluşmuyorsa ne yapmalıyım? {#what-should-i-do-if-the-checkpoint-is-not-happening}

Kontrol noktaları bazen Ethereum üzerindeki ağ tıkanıklığına göre 45 dakikadan fazla bir saat sürer, bir bilet çıkarmadan önce bir süre beklemenizi öneririz.

## İşlemim takıldı. {#my-transaction-is-stuck}

Kullanıcıların karşılaşabileceği ortak hataları listeledik. Çözümü, hata görselinin altında bulabilirsiniz. Size farklı bir hata gösteriliyorsa ekibimizin sorunu gidermesi için lütfen [bir destek bileti oluşturun](https://support.polygon.technology/support/home).

  - ### Yaygın Hatalar {#common-errors}
a. Fon çekme işlemi Initialised (başlatıldı) aşamasında kaldı.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

  b. RPC Hatası

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/operate/network#matic-mainnet) for more information.

  c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

  Bu durum genelde kendiliğinden çözülen bir kapanma-açılma hatasıdır. Adımı yeniden başlatırken hâlâ aynı hatayı alıyorsanız daha ileri bir sorun giderme için gerekli tüm bilgileri içeren [bir destek bileti oluşturun.](https://support.polygon.technology/)


## Yetersiz bakiye hatası görüntüleniyor. {#i-m-shown-an-insufficient-balance-error}

Polygon ağında fon çekme ve yatırma işlemleri ucuzdur. Ethereum mainnet'te bir miktar ETH bakiyesi bulundurarak yetersiz bakiye hatası temizlenebilir. Bu durum genellikle yetersiz bir denge sorununu ortadan kaldırır. Bu işlem Polygon Mainnet'te yapılan bir işlemse, yeterli miktarda MATIC token'a sahip olmanızı gerektirecektir.

## İşlemlerim gezginde görünmüyor. Ne yapmalıyım? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

Muhtemelen Polygonscan'la ilgili bir dizinleme sorunudur bu. Daha fazla açıklama için [lütfen Destek](https://support.polygon.technology/support/home) Ekibiyle iletişime geçin.

## Ethereum'da bir fon yatırma işlemi başlattım ama hâlâ beklemede olarak görünüyor. Ne yapmalıyım? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

Tedarik ettiğiniz gaz muhtemelen çok düşük. Bir süre beklemeli ve mine edilmediyse işlemi yeniden yapmanız gerekir. Ek yardım için lütfen cüzdan adresiniz, işlem özütleriniz (varsa) ve ilgili ekran görüntüleri ile birlikte [destek ekibine](https://support.polygon.technology/support/home) ulaşın.

## Bir işlem hash'i almıyorum ve fon yatırma işlemlerim işleme konmuyor. Neler oluyor? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

Muhtemelen daha önce bekleyen işlemleriniz var, lütfen önce bunları iptal edin veya hızlandırın. Ethereum'da işlemler ancak birbiri ardına gerçekleşebilir.

## Polygon'un fon çekme için ücret almadığı belirtiliyor ama işlem sırasında ödeme yapıyoruz. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Plasma bridge ile bir fon çekme işlemi, bir adımı Polygon Mainnet'te ve iki adımı Ethereum Mainnet'de tamamlanan 3 adıma bölünmüştür. PoS köprüsünde fon çekme işlemi iki adımda gerçekleşir: Polygon ağında token yakma ve Ethereum ağında kanıt gönderme. Polygon Mainnet'te gerçekleşen token yakma işleminin maliyeti çok düşüktür. Ethereum Mainnet'te gerçekleşen diğer adımların ücreti·[buradan](https://ethgasstation.info/) doğrulanabilecek cari gaz fiyatına bağlı olarak ETH cinsinden ödenmesi gerekecektir.

## Fon yatırmaya çalışıyordum ama Onayla adımında işlem durdu. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

İşlem hâlâ **Onayla** adımındaysa henüz tamamlanmamıştır. İşlemi tamamlamak için gaz ücretini ödemeniz gerekir, o zaman işlem tamamlanacaktır.

## Polygon cüzdan "User denied transaction signature" (Kullanıcı işlem imzasını reddetti) mesajı gösteriyor. {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

Bu hata genelde kullanıcının MetaMask'ta bir işlemi iptal etmesi veya imzalamayı reddetmesi nedeniyle oluşur. MetaMask cüzdanı tarafından istendiğinde **işlemi iptal** etmek yerine **onay** üzerine tıklayarak imzalamaya devam edin.

## İşlem başarılı ama beklemede olduğunu gösterir. {#the-transaction-is-successful-but-it-shows-pending}

İşleminiz tamamlandığında ve fonlarınızı aldığınızda ancak yine de işlem UI üzerinde bekleyen bir destek bileti oluşturduğunuzda, ilgili ayrıntıları ve ekran görüntüleri göndererek destek bileti yükseltebilirsiniz.

## Polygon'da Desteklenen Değişim Listesi nedir? {#what-is-the-list-of-supported-exchanges-on-polygon}

MATIC madeni para birçok borsada işlem görebilir. Bununla birlikte, ticaret için bir tane seçerken kendi araştırmanızı yapmak her zaman önemlidir. Bazı borsaların mevcut their değişiklik yapmaya devam etmesi ve aynı zamanda bakım sürelerine sahip olması alışılmadık bir durum değildir.

MATIC bulabileceğiniz borsalar listesi için [Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) adresini ziyaret edebilirsiniz.

## Polygon donanım cüzdanları destekliyor mu? {#does-polygon-support-hardware-wallets}

Evet, aşağıdaki donanım cüzdanlarını destekliyoruz:
1. Trezor
2. Ledger

Kullanıcılar Donanım cüzdanı seçeneğini MetaMask üzerinde bağlayıp işlemlerine devam edebilirler. İşte donanım cüzdanını Metamask üzerine bağlamak için bağlantı: https://metamask.zendesk.com/hc/en-us/articles/440852261275

## MATIC tokeni neden PoS üzerinde desteklenmiyor? {#why-isn-t-the-matic-token-supported-on-pos}

MATIC, Polygon'un yerel token'ıdır ve Polygon zincirinde bir sözleşme adresi vardır: 0x0000000000000000000000000000000000001010. Gaz için de ödeme yapmak için kullanılır. MATIC token'ın PoS köprüsünde eşlenmesi, MATIC'in Polygon zincirinde ek bir sözleşme adresine sahip olmasına yol açacaktır. Bu yeni token adresi gaz ücreti ödemek için kullanılamayacağından ve Polygon zincirinde mecburen normal bir ERC20 token'ı olarak kalacağından, mevcut sözleşme adresiyle çakışacaktır. Bu nedenle bu karışıklığı önlemek için MATIC ile yalnızca Plazma üzerinde tutmaya karar verdik.

## Token'ları nasıl eşlerim? {#how-do-i-map-tokens}

[Lütfen bu öğretici] (/docs/develop/ethereum-polygon/submit-mapping-request) için başvurun veya [doğrudan Token](https://mapper.polygon.technology/) to gidebilirsiniz.

## İşlem çok uzun sürüyorsa veya gaz fiyatı çok yüksekse ne yapmalıyım? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

İşlem süresi ve gaz fiyatı, ağ tıkanıklığına göre değişir ve aynı zamanda ağın madencileri arasındaki arz ve talep ile belirlenir.

Ne yapabilirdiniz:
- Sabırlı olun.
- Çok yavaş ise gaz ücretini artırın.
- İşlemleri göndermeden önce ücretleri kontrol edin. Here gaz izcisi için bir bağlantı: https://etherscan.io/gastracker

Yapmamanız gerekenler:
- Lütfen gaz limitini düşük ayarlamayın veya işleminiz başarısız olabilir.
- İşlemi iptal etmeye kalkışmayın. Ücretleri önceden kontrol edin.


## Gaz limitini veya gaz fiyatını değiştirebilir miyim? {#can-i-change-the-gas-limit-or-the-gas-price}

Gaz limiti sözleşmede çağrılan fonksiyonun belirli gereksinimlerine göre uygulama tarafından tahmin edilir ve ayarlanır. Gaz limiti değiştirilmemelidir. İşlem ücretlerini artırmak veya azaltmak için yalnızca gaz fiyatı değiştirilebilir.

## İşlemleri nasıl hızlandırabilirim? {#how-to-speed-up-the-transactions}
Bunu gaz ücretlerini artırarak yapabilirsiniz. Metamask'ta nasıl yapılacağını açıklayan bir bağlantı: https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-or https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-or-Cancel-a-Pending-Transaction.

## Gaz ücreti için MATIC token ne kadar yeterlidir? {#how-much-matic-token-is-enough-for-the-gas-fee}
Kullanıcıların Polygon mainnet'te en az 0,01 MATIC olması gerekir.

## Bir destek biletini nereden oluşturabilirim? {#where-do-i-raise-a-support-ticket}
Uzmanlarımızdan yardım almak istiyorsanız, lütfen bize https://support.polygon.technology/support/home. adresinden bir mesaj gönderin.

## Varlıkları zincirler arasında köprü yoluyla nasıl aktarırım? {#how-do-i-bridge-assets-across-chains}

Polygon varlıklarını Ethereum'dan Polygon konumuna taşımak için bir köprü sunar ve bunun tersi de geçerlidir. Bu wiki [Köprü bölümünde]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) bu konuda daha fazla bilgi edinebilirsiniz.

Bununla birlikte, Polygon'a ait olmayan herhangi bir harici hizmeti kullanıyorsanız, eğitici ve talimatlar talep etmek için müşteri hizmetlerine ulaşmanızı öneririz. Web3 hizmetlerini kullanırken kendi araştırmanızı yapmak da önemlidir.

## OpenSea'de veya Polygon bridge kullanan başka bir uygulamada token çekme sorunu yaşıyorum. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

Çekme işleminizin sıkışmasıyla ilgili bir sorununuz varsa, Polygon yanık hash'iniz varsa sizi yerden çıkarmanıza yardımcı olmak için https://cayma [https://withdraw.polygon.technology](https://withdraw.polygon.technology) ile çekme köprüsü sunar. Bu araçla hızlıca sisteme eklenirsiniz ve sorun çözülür. OpenSea ve diğer dApp'lerle işleminizle ilgili diğer soruların uygulama ekibi tarafından ele alınması gerekecektir.

## Dolandırıldım. Token'larımı nasıl geri alacağım? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

Ne yazık ki kaybolan coin'leri kurtaracak bir işlem yoktur. Bir işlem yapmadan önce kontrol etmeye ve bunu tamamlamadan önce çift kontrole devam etmenizi rica ederiz. Polygon ağının ve resmi our hediye gönderileri veya token katlama işlemine katılmadığını ve organizasyon adına size asla yaklaşmayacağımızı unutmayın. Bu türden girişimleri dikkate almayın, büyük bir ihtimalle dolandırıcılık girişimleridir. Tüm iletişimimiz resmi our geçer.

## Cüzdanımda bazı yetkisiz işlemler var. Cüzdanım heklendi mi? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

Ne yazık ki bu ağda istenmeyen işlemler geri döndürülemez.
Özel anahtarlarınıza dikkat etmeniz ve·**bunları hiç kimseyle paylaşmamanız** çok önemli.
Cüzdanınızda fonlarınız kaldıysa bunları hemen yeni bir cüzdana aktarın.

## Ethereum, test ağı olarak Goerli özelliğine sahiptir. Polygon Network'ün de bir test ağı var mı? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

Ethereum Ağı'nın test ağı olarak Goerli'ye sahip olduğu için, Polygon Mainnet'in Mumbai var. Bu test ağındaki tüm işlemler Mumbai Explorer'da dizinlenecektir.

## my diğer token'lar için nasıl değiştirebilirim? {#how-can-i-swap-my-tokens-for-other-tokens}
Lütfen aşağıdaki videoyu izleyin veya [bu](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap) öğreticiyi izleyin.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>Tarayıcınız bu video ögesini desteklemiyor.</p>
</video>

## Jeton Swap çok yavaş. {#the-token-swap-is-too-slow}

Token'ları takas etmeye çalışıyorsanız ve bu çok uzun sürüyorsa, aynı işlemi farklı bir web tarayıcıda deneyebilirsiniz. Bu işe yaramaz ve bir hatayla karşılaşırsanız lütfen Destek ekibimize bir ekran görüntüsü gönderin.

## Hangi token, token için gaz ücretleri olarak tahsil edilir? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
Sadece MATİK.

## Jetonumu gaz için nasıl değiştirebilirim? {#how-can-i-swap-my-token-for-gas}
Lütfen aşağıdaki videoyu izleyin veya [bu](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas) öğreticiyi izleyin.

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>Tarayıcınız bu video ögesini desteklemiyor.</p>
</video>

## Gaz için takas için hangi token'lar kullanılabilir? {#which-tokens-can-be-used-to-swap-for-gas}
Sadece bu jetonlar için "Gaz için Swap " için desteklenir: ETH, USDC, USDT, DAI, AAVE, LINK, WBTC, UNI, GHST , TEL, EMON ve COMBO.

## ETH token'ları nasıl alınır? {#how-to-get-eth-tokens}
ETH token'larını satın almak için bunları bir takas üzerinde başka bir token veya fiat para karşılığında takas edebilir, onları bir rampada (veya Metamask'ta) satın alabilir veya [Polygon'un token takas özelliğini](https://wallet.polygon.technology/polygon/token-swap) kullanarak ETH için diğer tokenları değiştirebilirsiniz.

## Gaz ücretlerini ödemek için MATIC token'lar nasıl alabilirim? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

Size bu konuda yardımcı olacak [Gas Swap](https://wallet.polygon.technology/gas-swap/) (gaz takası) hizmeti sunuyoruz. İşleminizi tamamlamak için ihtiyacınız olan MATIC miktarını seçersiniz ve bunu Ether veya USDT gibi diğer token'larla takas edebilirsiniz. Bunun **gazsız bir işlem** olduğunu belirtmekte fayda görüyoruz.

## MATIC token'ları doğrudan nereden alabilirim? {#where-can-i-get-matic-tokens-directly}

Bu nedenle MATIC token'ları merkezi ([Binance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/), et.al) veya Merkezi Olmayan ([Uniswap](https://uniswap.org/), [QuickSwap](https://quickswap.exchange/#/swap)) borsasından satın alınabilir. Ayrıca [Transak](https://transak.com/) ve [Ram](https://ramp.network/) gibi rampaları araştırabilir ve deneyebilirsiniz. MATIC coin'ler satın alma amacınız, onları nereden satın alacağınızı ve ağı da belirlemelidir. Amacınız staking veya delege ise Ethereum mainnet üzerinde MATIC bulundurmanız önerilir. Niyetiniz Polygon Mainnet'te bir işlemse, Polygon Mainnet'te MATIC ile tutmalı ve işlem yapmalısınız.





