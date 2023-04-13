---
id: derivatives
title: Türevler
description: Doğrulayıcı hisseleri üzerinden delegasyon
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon, doğrulayıcı payları üzerinden [delegasyonu](/docs/maintain/glossary#delegator) destekler. Bu tasarımı kullanarak, çok fazla hesaplama yapmaya gerek kalmadan, Ethereum mainnet sözleşmelerinde ölçeğe paralel olarak ödüller dağıtmak ve kesinti cezaları uygulamak daha kolaydır.

Delegatörler doğrulayıcılardan sınırlı bir havuzda bulunan paylar satın alarak delegasyon yaparlar. Her doğrulayıcı kendi doğrulayıcı payı token'ına sahiptir.

Doğrulayıcı A'ya ait değiştirilebilir (fungible) doğrulayıcı payı token'larına VATIC adı verelim. Bir kullanıcı Doğrulayıcı A'ya delegasyon yaptığında, kullanıcıya MATIC-VATIC çiftinin çevrim kuru üzerinden hesaplanan VATIC verilir. Kullanıcının varlığı değer kazandıkça, çevrim kuru kullanıcının her bir VATIC için daha fazla MATIC çekebileceğini gösterir. Doğrulayıcılara kesinti cezası uygulandığında ise kullanıcılar VATIC'leri karşılığında daha az MATIC çekerler.

MATIC'in staking token'ı olduğunu unutmayın. Bir delegatörün delegasyona katılabilmek için MATIC token'larına sahip olması gerekir.

İlk başta, Delegatör D, çevrim kuru 1 MATIC = 1 VATIC iken Doğrulayıcı A'ya özgü havuzdan tokenlar satın alır.

Bir doğrulayıcı daha fazla MATIC token ile ödüllendirildiğinde, yeni token'lar havuza eklenir.

Mevcut havuzda 100 MATIC token varken, havuza  10 MATIC ödül eklendiğini varsayalım. VATIC token'larının toplam arzı ödüllerden dolayı değişmediği için, döviz kuru 0,9 VATIC başına 1 MATIC olur. Şimdi, Delegatör D paylaşımları halinde aynı miktar için daha fazla MATIC elde edilir.

## Sözleşme içindeki akış {#the-flow-in-the-contract}

`buyVoucher`: Bu fonksiyon bir doğrulayıcıya bir delegasyon işlemi yapılırken çağrılır. Delegasyon miktarı, yani `_amount`, önce stake yöneticisine, yani `stakeManager`'a aktarılır; stake yöneticisi, onaylanması üzerine, delegasyon paylarını `Mint` vasıtasıyla cari çevrim kuru, yani `exchangeRate` üzerinden mint eder.

Çevrim kuru şu formülle hesaplanır:

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`: Bu fonksiyon bir delegatör bir doğrulayıcıdan unbond (delegasyon iptali) yaptığında çağrılır. Bu fonksiyon temelde delegasyon sırasında satın alınan voucher'ların (bir tür makbuz) satılması işlemini başlatır. Delegatörlerin token'larını talep edebilmeleri (`claim`) için bir çekiş süresinin dolması gerekir.

`withdrawRewards`: Bir delegatör olarak `withdrawRewards` fonksiyonunu çağırarak ödüllerinizi talep edebilisiniz.

`reStake`: Yeniden stake etmek iki şekilde yapılabilir: a) delege eden `buyVoucher` fonksiyonunu kullanarak daha fazla pay alabilir ya da ödüllerini `reStake` fonksiyonunu kullanarak yeniden stake edebilir. Bir doğrulayıcıya daha fazla token stake ederek yeniden stake edebilirsiniz ya da bir delegatör olarak elde ettiğiniz ödüllerinizi yeniden stake edebilirsiniz. Yeniden stake etmekteki (`reStaking`) amaç şudur: delegatörün doğrulayıcısı daha fazla aktif stake'e sahip olduğunda bunun karşılığında daha fazla ödül kazanır, dolayısıyla delegatörün kazanacağı ödül de artar.

`unStakeClaimTokens`: Çekme süresi dolduğunda, paylarını satan delegatörler MATIC token'larını talep edebilirler.

`updateCommissionRate`: Bu fonksiyon doğrulayıcının komisyonun %'sini günceller. Ayrıca bakınız: [Doğrulayıcı Komisyon Operasyonları](/docs/maintain/validate/validator-commission-operations).

`updateRewards`: Bir doğrulayıcı bir [denetim noktası](/docs/maintain/glossary#checkpoint-transaction) göndermesi karşılığında ödüller kazandığında bu fonksiyon ödüllerin doğrulayıcı ve delegatörler arasında dağıtılması için çağrılır.
