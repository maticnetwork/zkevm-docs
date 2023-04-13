---
id: delegator-faq
title: Delege Eden SSS
sidebar_label: Delegator FAQ
description: Polygon ağı üzerindeki Delegasyon ile ilgili SSS
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### Staking Panosu URL'si nedir? {#what-is-the-staking-dashboard-url}

Staking gösterge paneli URL'si is

### Minimum stake miktarı nedir? {#what-is-the-minimum-stake-amount}

Delege edilecek minimum stake miktarı yoktur. Bununla birlikte, her zaman 1 MATIC tokeni ile başlayabilirsiniz.

### Delege edersem ne kadar ödül alacağım? {#how-many-rewards-will-i-get-if-i-delegate}

Lütfen tahminlerinizi belirlemek için [Staking Rewards](https://staking.polygon.technology/rewards-calculator) Hesaplayıcısını kullanın.

### İşlemim neden bu kadar uzun sürüyor? {#why-does-my-transaction-take-so-long}

Polygon'un tüm staking işlemleri, güvenlik nedenleriyle Ethereum üzerinde gerçekleşir.

Bir işlemin tamamlanmasının ne kadar süreceği ayırdığınız gaz ücretlerine ve ayrıca o anda Ethereum mainnet'teki ağ yoğunluğuna bağlıdır. Gaz ücretlerini artırmak için “Hız Artırma” seçeneğini her zaman kullanabilirsiniz, böylece işleminizin yakında tamamlanabilmesi için.

### Şu anda hangi cüzdanlar destekleniyor? {#which-wallets-are-currently-supported}

Şu anda yalnızca masaüstü web tarayıcıda Metamask uzantısı ve Coinbase Wallet desteklenmektedir. Ayrıca desteklenen mobil cüzdanlardan WalletConnect ve Walletlink'i kullanarak Staking UI panosu ile masaüstü/dizüstü bilgisayarda etkileşim kurabilirsiniz. Yakında başka cüzdanlar için de aşamalı olarak destek ekleyeceğiz.

### Donanım cüzdanlar destekleniyor mu? {#are-hardware-wallets-supported}

Evet, donanım cüzdanlar desteklenmektedir. Metamask üzerinde "Connect Hardware Wallet" (Donanım Cüzdanı Bağla) seçeneğini kullanarak Donanım cüzdanınızı bağlayıp delegasyon işlemine devam edebilirsiniz.

### Neden doğrudan Binance'ten stake edemiyorum? {#why-can-t-i-stake-directly-from-binance}

Binance üzerinden staking yapmak henüz desteklenmiyor. Binance bunu desteklemeye başlarsa ve başladığında bir duyuru yapılacaktır.

### Delegasyonumu tamamladım, detayları nerede kontrol edebilirim? {#i-have-completed-my-delegation-where-can-i-check-details}

Delegasyonunuzu tamamladıktan sonra Ethereum üzerinde 12 blok onayını bekleyin (yaklaşık 3-5 dakika), ardından on **Hesabıma** tıklayabilirsiniz.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Ödüllerimi nerede kontrol edebilirim? {#where-can-i-check-my-rewards}

On sol taraftaki **Hesabım** seçeneğine tıklayabilirsiniz.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Gaz ücretlerini ödemek için ETH'ye ihtiyacım var mı? {#do-i-need-eth-to-pay-for-gas-fees}

Evet. Her ihtimale karşı yaklaşık 0,05-0,1 ETH bulundurmanız gerekir.

### Staking için Polygon Mainnet ağına Matic token'ları yatırmam gerekiyor mu? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

Hayır. Tüm fonlarınızın Ethereum Mainnet'te olması gerekiyor.

### İşlemi yapmak istediğimde Confirm (onayla) düğmem etkin değil, neden? {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

Gaz ücretleri için yeterli ETH'niz olduğunu kontrol edin.

### Ödül ne zaman dağıtılır? {#when-does-reward-get-distributed}

Ödüller bir denetim noktası gönderildiğinde dağıtılır.

Şu anda, 20188 MATIC tokenları her bir delege için başarılı bir kontrol noktası gönderimi için orantılı olarak dağıtılmaktadır. Ayrıca, her bir delegatöre dağıtılan ödül yüzdesi her bir denetim noktasında delegatörün, doğrulayıcının göreceli stake'ine ve toplam stake'e bağlı olarak değişecektir.

(Denetim noktasını gönderen doğrulayıcının hesabına yazılan %10 oranında bir teklifçi bonusu bulunduğunu, ancak zaman içinde bu ekstra bonusun etkisinin farklı doğrulayıcılar tarafından çoklu denetim noktaları gönderilmesi üzerine sıfırlandığını aklınızda bulundurun.)

Denetim noktası gönderimi doğrulayıcılardan biri tarafından yaklaşık her 34 dakikada bir yapılır. Bu süre yaklaşıktır ve Polygon Heimdall katmanı üzerindeki doğrulayıcı konsensüsüne bağlı olarak değişebilir. Bu aynı zamanda Ethereum Ağına bağlı olarak da değişebilir. Ağda yüksek bir yoğunluk denetim noktalarının gecikmesine neden olabilir.

Staking sözleşmesi üzerindeki kontrol noktalarını [buradan](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287) takip edebilirsiniz

### Her bir denetim noktasında ödül neden azalmaya devam ediyor? {#why-does-reward-keep-getting-decreased-every-checkpoint}

Kazanılan ödüller ağda her bir denetim noktasında kilitlenmiş toplam arza bağlı olacaktır. Staking sözleşmelerinde daha fazla MATIC token kilitlendikçe bunun önemli ölçüde değişeceği beklenmektedir.

Ödüller ilk başlarda daha yüksek olacak ve kilitlenen arz %'si arttıkça azalmaya devam edecektir. Kilitlenmiş arzdaki bu değişim her bir denetim noktasında yakalanır ve ödüller buna göre hesaplanır.

### Ödüllerimi nasıl alabilirim? {#how-can-i-claim-my-rewards}

**Ödüllerinizi Çekiliş Ödülünü Alın** düğmesine tıklayarak anında talep edebilirsiniz. Böylece birikmiş ödülleriniz Metamask'teki delegasyon hesabınıza aktarılır.

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### Unbonding süresi nedir? {#what-is-the-unbonding-period}

Polygon'da unbonding süresi şu anda yaklaşık 9 gündür. Bu süre daha önce 19 gündü. Bu süre orijinal olarak devredilen miktar ve yeniden delege edilen miktarlar için geçerlidir - bu işlem yeniden devredilmeyen herhangi bir ödül için geçerli değildir.

### Unbond yaptıktan sonra ödül almaya devam edecek miyim? {#will-i-keep-receiving-rewards-after-i-unbond}

Hayır, bir kez bağlanmadan sonra ödül almayı bırakacaksınız.

### Delegasyon kaç işlem gerektirir? {#how-many-transactions-does-the-delegation-require}

Delegasyon iki işlem gerektirir, biri ardına Biri talebi **onaylamak** için diğeri **de Mevduat** için.

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### Ödülleri Yeniden Delege Etmek ne anlama gelir? {#what-does-redelegate-rewards-mean}

Ödüllerinizi yeniden düzenlemek basitçe biriktirdiğiniz ödülleri yeniden düzenleyerek hissenizi artırmak istediğiniz anlamına gelir.

### Herhangi bir doğrulayıcıya stake edebilir miyim? {#can-i-stake-to-any-validator}

Evet. Tüm doğrulayıcılar şu anda Polygon Foundation [Polygon Vakfı] düğümleridir.

Polygon mainnet'i kademeli olarak kullanıma sunuyoruz. Daha sonra harici doğrulayıcılar da kademeli olarak devreye alınacaktır. Daha fazla bilgi için lütfen https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/ sayfasına bakın.

### Hangi web tarayıcı Staking Panosuyla uyumlu? {#which-browser-is-compatible-with-staking-dashboard}

Chrome, Firefox ve Brave

### Metamask'im giriş yaptıktan sonra onay sırasında takılıp kaldı, ne yapmalıyım? Veya giriş yapmaya çalıştığımda hiçbir şey olmuyor? {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

Aşağıdakileri kontrol edin:

- Cesur kullanıyorsanız, lütfen ayarlar panelinde **Kripto Cüzdanları** Kullanma seçeneğini kapatın.
- Metamask'te oturum açmış olup olmadığınızı denetleyin
- Metamask'te Trezor/Ledger ile oturum açmış olup olmadığınızı denetleyin. Buna ek olarak, eğer etkinleştirilmemişse, Ledger cihazınız üzerinde sözleşmeleri çağırma iznini de açmanız gerekir.
- Sisteminizin zaman damgasını kontrol edin. Sistem saati doğru değilse düzeltmeniz gerekecektir.

### Binance'ten veya diğer borsalardan Polygon cüzdanına nasıl fon gönderebilirim? {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

Teknik olarak, Polygon Cüzdan Paketi/Staking arabirimi sadece bir web uygulamasıdır. Şu anda şu cüzdanları desteklemektedir - Metamask, WalletConnect ve WalletLink.

Öncelikle, paranızı Binance'ten veya Metamask'taki Ethereum adresinize ait başka bir borsadan çekmelisiniz. Metamask'in nasıl kullanıldığını bilmiyorsanız Google'da arama yapın. Başlamanıza yardımcı olacak birçok video ve blog var.

### Ne zaman doğrulayıcı olabilirim ve bunun için kaç jeton yapmalıyım? {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

Bir kullanıcının doğrulayıcı olabilmesi için şu koşulların karşılanması gerekir:
1. Bir doğrulayıcı ağdan ayrılmaya karar verdiğinde veya
2. Açık artırma mekanizmasını bekleyip aktif olmayan bir doğrulayıcının yerini aldığında.

Minimum stake miktarı, bir kullanıcının diğer bir kullanıcıdan daha yüksek bir teklif verdiği açık artırma sürecine bağlıdır.

### Delege ederken ödül kazandıysam ve aynı doğrulayıcı düğümüne daha fazla fon eklersem ne olur? {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

Aynı doğrulayıcı düğümüne daha fazla fon delege etmeden önce ödüllerinizi yeniden delege etmediyseniz ödülleriniz otomatik olarak çekilecektir.

Bunun olmasını istemiyorsanız, daha fazla fon delege etmeden önce ödüllerinizi yeniden delege edin.

### Token'larımı Metamask üzerinden Staking panosunda delege ettim. Sistemimi veya cihazımı açık tutmam gerekiyor mu? {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

Hayır. Delegasyon işlemleriniz onaylandıktan ve tokenlarınızı **Toplam Stake** ve **Yeni Ödül** bölümlerine yansıyan olarak görebilirsiniz, o zaman işiniz biter. Sisteminiz veya cihazınızı açık tutmanıza gerek yoktur.

### Ben de bağlanmadım, Unbond için ne kadar zaman gerekecek? {#i-have-unbonded-how-long-will-it-take-to-unbond}

Unbond olma süresi şu anda 82 denetim noktası olarak ayarlanmıştır. Bu süre yaklaşık 9 gündür. Her bir denetim noktası yaklaşık 34 dakika sürer. Fakat bazı denetim noktaları Ethereum üzerinde yoğunluk nedeniyle yaklaşık 1 saate kadar gecikebilir.

### Ben de bir araya gelmedim ve şimdi Claim Stake düğmesini görüyorum, ama bu devre dışı, neden bu? {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

Claim Stake düğmesi ancak unbond olma süreniz dolduğunda etkin olacaktır. Unbond olma süresi şu anda 82 denetim noktası olarak belirlenmiştir.

### Claim Stake düğmesinin ne zaman etkin olacağını öğrenebilir miyim? {#do-i-know-when-will-the-claim-stake-button-be-enabled}

Evet, Claim Stake düğmesinin altında, Claim Stake düğmesinin etkin olması için kaç denetim noktası kaldığını gösteren bir not göreceksiniz. Her bir denetim noktası yaklaşık 30 dakika sürer. Fakat bazı denetim noktaları Ethereum üzerinde yoğunluk nedeniyle yaklaşık 1 saate kadar gecikebilir.

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### Delegasyonumu Foundation Düğümlerinden Harici düğümlere nasıl aktarabilirim? {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

Delegasyonunuzu Staking kullanıcı arabirimindeki **Move Stake** (stake'i taşı) seçeneğini kullanarak aktarabilirsiniz. Bu fonksiyon Delegasyonunuzu Foundation düğümünden dilediğiniz başka bir harici düğüme aktaracaktır.

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

Diğer doğrulayıcılar listesini göreceksiniz:

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### Delegasyonumu Foundation düğümlerinden harici düğümlere aktardığımda unbond olma süresi olacak mı? {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

Delegasyonunuzu Foundation düğümlerinden harici düğümlere aktardığınızda Unbond olma süresi olmayacaktır. Bu, gecikme olmadan direkt aktarma olacaktır. Fakat bir Foundation Düğümünden veya bir Harici Düğümden unbond yapıyorsanız bunun için bir unbond olma süresi olacaktır.

### Delegasyon aktarma sırasında bir harici düğüm seçmeye dair belli hususlar var mı? {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

Hayır. Dilediğiniz bir düğümü seçebilirsiniz.

### Delegasyonu Foundation Düğümünden Harici düğüme aktarırsam birikmiş ödüllerim ne olur? {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

Delegasyonu aktarmadan önce ödüllerinizi almadıysanız, delegasyonunuzu Foundation düğümünden Harici düğüme başarıyla aktardığınızda o ana dek birikmiş Ödüller hesabınıza geri aktarılacaktır.

### Harici Düğümlerde delegasyon Foundation Düğümlerinde delegasyonla aynı mı olacak? {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

Evet, Vakıf düğümleri ile aynı şekilde çalışacaktır.

### Bir Harici Düğüme delege ettikten sonra yine ödül alacak mıyım? {#will-i-still-get-rewards-after-delegating-to-an-external-node}

Evet, ödüller daha önce Foundation düğümlerinde olanla aynı şekilde dağıtılacak. Her başarılı denetim noktası gönderimi ödüller getirecektir. Ödüller her denetim noktasında şu anda uygulanan stake oranına göre hesaplanacak ve dağıtılacaktır.

### Bir Harici Düğümden unbond yaparsam bir unbond olma süresi olacak mı? {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

Evet, unbond olma süresi şu anda uygulananla aynı kalacaktır. 82 Denetim Noktası.

### Delegasyonumu Foundation düğümünden Harici düğüme aktardıktan sonra bir kilitleme süresi olacak mı? {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

Hayır. Delegasyonunuzu aktardıktan sonra kilitleme süresi olmayacaktır.

### Delegasyonumu Foundation'dan Harici düğümlere kısmen aktarabilir miyim? {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

Evet, stake'inizi Foundation düğümünden harici bir düğüme kısmen taşıma seçeneğiniz olacaktır. Geri kalan kısmi Stake'iniz Foundation düğümünde kalacaktır. Daha sonra bunu dilediğiniz başka bir düğüme veya aynı düğüme taşıyabilirsiniz.

### Delegasyonumu bir harici düğümden başka bir harici düğüme aktarabilir miyim? {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

Hayır, **Move Stake** seçeneği yalnızca Foundation Düğümlerinde mevcuttur. Delegasyonunuzu bir harici düğümden başka bir harici düğüme aktarmak isterseniz önce unbond yapmanız, sonra başka bir harici düğüme delege etmeniz gerekecektir.

### Foundation düğümleri ne zaman kapatılacak? {#when-will-the-foundations-node-be-turned-off}

Vakıf düğümleri Ocak 2021 sonuna kadar kapatılacaktır.

### Gelecekte Foundation düğümleri olacak mı? {#will-there-be-any-foundation-nodes-in-the-future}

Hayır, gelecekte Foundation düğümleri olmayacak.

### Bir Move Stake yaptığımda kaç işlem için Gaz ödemem gerekir? {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

Move Stake tek bir işlemdir. Tüm işlemler Ethereum Blockchain'de olacaktır, bu yüzden Move Stake işlemi yaparken bir miktar ETH harcamanız gerekecektir.
