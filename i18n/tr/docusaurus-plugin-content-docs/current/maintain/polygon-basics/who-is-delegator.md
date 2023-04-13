---
id: who-is-delegator
title: Delege eden kimdir
description: Bir düğüm çalıştırmayan token sahipleri
keywords:
  - docs
  - matic
  - polygon
  - delegator
  - Who is a Delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Delegatörler bir [doğrulayıcı](/docs/maintain/glossary.md#validator) düğümü çalıştıramayan veya çalıştırmak istemeyen token sahipleridir. Bunun yerine, kendi doğrulayıcı düğümlerini delege ederek ağı güvenli hale getirirler ve doğrulayıcıları seçmekten sorumlu oldukları için sistem içinde kritik bir rol oynarlar. Delegasyon işlemlerini Ethereum mainnet üzerinde staking sözleşmeleri ile çalıştırırlar.

MATIC token'ları Ethereum mainnet üzerinde işlenen bir sonraki [denetim noktası](/docs/maintain/glossary.md#checkpoint-transaction) ile bond edilir, yani bağlanır. Delege edenlerin istedikleri zaman sistem dışına çıkma seçenekleri de vardır. Doğrulayıcılara benzer şekilde, delegatörler stake'lerini çekmeden önce yaklaşık 9 günlük bir unbonding (bağın çözülmesi) döneminin sona ermesini beklemek zorundadırlar.

## Ücretler ve Ödüller {#fees-and-rewards}

Delegatörler token'larını doğrulayıcılara delege ederek karşılığında yüzde olarak ifade edilen ödüller elde ederler. Delegatörler ödülleri doğrulayıcıları ile paylaştıkları için delegatörler riskleri de paylaşırlar. Bir doğrulayıcı kötü niyetli bir davranışta bulunursa o doğrulayıcının delegatörlerinin her biri delege ettiği stake'le orantılı olarak kesinti cezası alma riskiyle karşılaşır.

Doğrulayıcılar bir [komisyon](/docs/maintain/glossary.md#commission) yüzdesi seçerek alacakları ödüllerin yüzdesini belirlerler. Delegatörler her bir doğrulayıcının komisyon oranını görüntüleyerek her bir doğrulayıcının ödül dağıtımını ve stake'leri üzerinden elde edecekleri göreceli getiri oranını öğrenebilirler.

:::caution Komisyon oranı %100 olan doğrulayıcılar

Bunlar tüm ödülleri alan ve kendi başlarına hissedilecek yeterli token'ları olduğu için delege arayan doğrulayıcılardır.

:::

Delege edenler, tokenlarını diğer doğrulayıcılara yeniden devretme seçeneğine sahiptir. Ödüller her denetim noktasında birikir.

:::tip Aktif bir delegatör olmak

Delegasyon pasif bir faaliyet olarak görülmemelidir, çünkü delegatörler Polygon ağının idamesinin
ayrılmaz bir parçasıdır. Her delegatör kendi riskini yönetmekten sorumludur ama bunu yaparken delegatörler
dürüst doğrulayıcıları seçmeyi amaçlamalıdır.

:::

## Ayrıca bakınız {#see-also}

* [Delege Etme](/docs/maintain/delegate/delegate)
* [Doğrulayıcı SSS](/docs/maintain/validate/faq/validator-faq)
