---
id: staking-faq
title: Staking SSS
sidebar_label: Staking FAQ
description: Bir sonraki blok zinciri uygulamanızı Polygon üzerinde geliştirin.
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Token'lar Polygon'da nasıl stake edilir? {#how-to-stake-tokens-on-polygon}

Staking için Ethereum Mainnet'te fonlarınızın olması gerekecektir (daha fazla bilgi [burada](https://etherscan.io/gastracker)). Staking Dashboard kullanarak Ethereum ağında MetaMask 'e giriş yapın. https://staking.polygon.technology/

Bunun nasıl yapıldığının canlı gösterimi için bu videoyu izleyin:

<video autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/staking.mp4"></source>
  <p>Tarayıcınız bu video öğesini desteklemiyor.</p>
</video>

### Matic token'larımı stake ettim. Nasıl daha fazla stake edebilirim? {#i-ve-staked-my-matic-tokens-how-can-i-stake-more}
"Your Delegations"a (Delegasyonlarınız) gidip stake'lerden birini seçin ve "Stake More" (Daha Fazla Stake Et) seçeneğini tıklayın.

Bunun nasıl yapıldığının canlı gösterimi için bu videoyu izleyin:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/staking-more.mov"></source>
  <p>Tarayıcınız bu video öğesini desteklemiyor.</p>
</video>

### Neden stake edemiyorum? {#why-am-i-not-able-to-stake}

Token'larınızı delege edebilmek için Ethereum Mainnet'te fonlarınız olup olmadığını kontrol edin. Staking yalnızca Ethereum Ağı üzerinde yapılabilir.

### Staking sekmesini görüntüleyemiyorum. Staking'e nasıl erişebilirim? {#i-am-unable-to-view-the-staking-tab-how-do-i-access-staking}

Sadece **https://staking.polygon.technology/**, erişmeniz yeterlidir, burada aşağıdaki açılış sayfasını göreceksiniz:

<img src={useBaseUrl("img/staking_faq/staking-lp.png")} height="500px"/>

Alternatif olarak, [Polygon Cüzdan](https://wallet.polygon.technology/) Suit'e giriş yaptıktan sonra **Daha Fazla Uygulamalar > Staking** üzerine tıklayabilirsiniz. Kullanıcılar **Staking Genel Bakış** sayfasına inecektir. Rehber kaynak:

<img src={useBaseUrl("img/staking_faq/staking-app.png")} height="500px"/>

### Daha iyi ödüller için hangi Doğrulayıcıyı seçeceğimi nasıl bilebilirim? {#how-do-i-know-which-validator-to-select-for-better-rewards}

Bu, hangi doğrulayıcıya stake etmek istediğinize dair anlayışınıza ve araştırmanıza bağlıdır. Doğrulayıcılar listesini buradan bulabilirsiniz: https://staking.polygon.technology/validators

### Nasıl unbond edilir? {#how-to-unbond}

Bir Doğrulayıcıdan unbond yapmak için MyAccount'a (Hesabım) gidin; burada "Your Delegations"ı (Delegasyonlarınız) bulursunuz.
Burada doğrulayıcıların her biri için bir Unbond düğmesi göreceksiniz. Unbond etmek istediğiniz doğrulayıcının Unbond düğmesini tıklayın.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/step1unbond.png")} height="400px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/step2unbond.png")} height="500px"/><br/>

Bunun nasıl yapılacağının canlı gösterimi için bu videoyu izleyin:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/unbond.mp4"></source>
  <p>Tarayıcınız bu video öğesini desteklemiyor.</p>
</video>

### Unbond etme süresi nedir? {#what-is-the-unbonding-period}

Unbond etme süresi Polygon'da 80 denetim noktasıdır. Bu da yaklaşık 3-4 gündür. Her denetim noktasının atanması yaklaşık 3 saat alır. Ancak bazı denetim noktalarının atanması Ethereum'da yoğunluk nedeniyle gecikebilir.
Bu süre ilk delege edilen miktar ve yeniden delege edilen miktarlar için geçerlidir. Yeniden delege edilmeyen ödüller için geçerli değildir.

### Ödüller nasıl yeniden stake edilir? {#how-to-restake-rewards}

"My Account"a giderek "Your Delegations"ı kontrol edin.
"Restake Reward"a (Ödülü Yeniden Stake Et) tıkladığınızda Metamask hesabınızdan onaylama yapmanız istenecektir. İşlemi onayladığınızda yeniden stake etme işlemi tamamlanmış olur.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/restake-rewards1.png")} height="300px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/restake-rewards2.png")} height="415px"/><br/>

Bunun nasıl yapılacağının canlı gösterimi için bu videoyu izleyin:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/restake.mp4"></source>
  <p>Tarayıcınız bu video öğesini desteklemiyor.</p>
</video>

### Ödülleri Yeniden Stake Etmek istiyorum ama bunu yapamıyorum. {#i-want-to-restake-rewards-but-i-am-unable-to}

Ödülleri yeniden stake edebilmek için en az **2 Matic** sahibi olmanız gerekir.

### Ödüller nasıl çekilir? {#how-to-withdraw-rewards}

Ödüllerinizi "My Account"a tıklayarak talep edebilirsiniz; bir doğrulayıcının tüm delegatörleri görüntülenir. "Withdraw Reward" (Ödül Çek) düğmesine tıklayın; ödüller Metamask'taki delege edilenler hesabınıza aktarılacaktır.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/withdraw1.png")} height="300px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/withdraw2.png")} height="380px"/><br/>

Bunun nasıl yapılacağının canlı gösterimi için bu videoyu izleyin:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/claim-rewards.mp4"></source>
  <p>Tarayıcınız bu video öğesini desteklemiyor.</p>
</video>

### Ödüller Çekmek istiyorum ama yapamıyorum. {#i-want-to-withdraw-rewards-but-i-am-unable-to}

Ödülleri çekebilmek için en az **2 Matic** sahibi olmanız gerekir.

### Stake nasıl talep edilir? {#how-to-claim-stake}

**Unbond etme süresi tamamlandığında** Claim Stake (Stake Talep Et) düğmesi etkin olur, o zaman stake ettiğiniz token'ları talep edebilirsiniz. Token'lar hesabınıza aktarılacaktır.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake1.png")} height="400px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake2.png")} height="300px"/><br/>

`Step 3` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake3.png")} height="400px"/><br/>

Bunun nasıl yapılacağının canlı gösterimi için bu videoyu izleyin:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/claiming-stake.mov"></source>
  <p>Tarayıcınız bu video öğesini desteklemiyor.</p>
</video>

### Donanım cüzdanlar destekleniyor mu? {#are-hardware-wallets-supported}

Evet, donanım cüzdanlar desteklenmektedir. Metamask üzerinde "Connect Hardware Wallet" (Donanım Cüzdanı Bağla) seçeneğini kullanarak Donanım cüzdanınızı bağlayıp delegasyon işlemine devam edebilirsiniz.

### Neden doğrudan Binance'ten stake edemiyorum? {#why-can-t-i-stake-directly-from-binance}

Binance üzerinden staking yapmak henüz desteklenmiyor. Binance bunu desteklemeye başlarsa ve başladığında bir duyuru yapılacaktır.

### Staking için Polygon Mainnet ağına Matic token'ları yatırmam gerekiyor mu? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

Hayır. Tüm fonlarınızın Ethereum Mainnet'te olması gerekiyor.

### Ödüller ne zaman dağıtılır? {#when-do-rewards-get-distributed}

Ödüller bir denetim noktası gönderildiğinde dağıtılır.

Her bir denetim noktası başarıyla gönderildiğinde yaklaşık 20.188 Matic token her bir delegatöre, o delegatörün stake'inin tüm doğrulayıcıların ve delegatörlerin toplam staking havuzuna olan oranına göre dağıtılır. Ayrıca, her bir delegatöre dağıtılan ödül yüzdesi her bir denetim noktasında delegatörün, doğrulayıcının göreceli stake'ine ve toplam stake'e bağlı olarak değişecektir.

(Denetim noktasını gönderen doğrulayıcının hesabına yazılan %10 oranında bir teklifçi bonusu bulunduğunu, ancak zaman içinde bu ekstra bonusun etkisinin farklı doğrulayıcılar tarafından çoklu denetim noktaları gönderilmesi üzerine sıfırlandığını aklınızda bulundurun.)

Denetim noktası gönderimi doğrulayıcılardan biri tarafından yaklaşık her 34 dakikada bir yapılır. Bu süre Polygon Heimdall katmanındaki doğrulayıcı konsensüsüne bağlı olarak değişebilir. Bu aynı zamanda Ethereum Ağına bağlı olarak da değişebilir. Ağda yüksek bir yoğunluk denetim noktalarının gecikmesine neden olabilir.

Staking sözleşmesi üzerindeki denetim noktalarını buradan takip edebilirsiniz: https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287

### Ödüller neden her denetim noktasında sürekli azalıyor? {#why-do-rewards-keep-getting-decreased-at-every-checkpoint}

Kazanılan ödüller her bir denetim noktası itibarıyla ağda fiilen mevcut toplam kilitli arza bağlı olacaktır. Staking sözleşmelerine daha fazla MATIC token kilitlendikçe bu durumun önemli ölçüde değişeceği beklenmektedir.
İlk başta ödüller daha yüksek olacak ve kilitli arz yüzdesi arttıkça ödüller azalmaya devam edecektir. Kilitli arzdaki bu değişim her bir denetim noktasında tespit edilir ve ödüller de buna göre hesaplanır.

### Unbond yaptıktan sonra ödül almaya devam edecek miyim? {#will-i-keep-receiving-rewards-after-i-unbond}

Hayır. Unbond yaptıktan sonra artık ödül alamazsınız.

### Stake'i başka bir doğrulayıcıya taşıyabilir miyim? {#can-i-move-the-stake-to-another-validator}
Evet, "Your Delegations"a gidip "Move Stake"i (Stake'i Taşı) tıklayın, sonra yeni doğrulayıcınızı seçin.

Bunun nasıl yapılacağının canlı gösterimi için bu videoyu izleyin:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/moving.mp4"></source>
  <p>Tarayıcınız bu video öğesini desteklemiyor.</p>
</video>

### Staking Panosu ile hangi tarayıcılar uyumludur? {#which-browsers-are-compatible-with-the-staking-dashboard}

Chrome, Firefox ve Brave.

### Oturum açmaya çalıştığımda hiçbir şey olmuyor veya oturum açtıktan sonra onaylama aşamasında Metamask'ım takılıp kalıyor. Ne yapmalıyım? {#nothing-happens-when-i-try-to-log-in-or-my-metamask-is-stuck-at-confirming-after-logging-in-what-do-i-do}

Aşağıdakileri kontrol edin:
- Brave kullanıyorsanız ayarlar panelinde "Use Crypto Wallets" (Kripto Cüzdanlar Kullan) seçeneğini kapatın.
- Metamask'ta oturumunuzun açılıp açılmadığını kontrol edin.
- Metamask'te Trezor/Ledger ile oturum açıp açmadığınızı kontrol edin. Buna ek olarak, eğer etkinleştirilmemişse, Ledger cihazınız üzerinde sözleşmeleri çağırma iznini de açmanız gerekir.
- Sisteminizin zaman damgasını kontrol edin. Sistem saati doğru değilse düzeltmeniz gerekecektir.