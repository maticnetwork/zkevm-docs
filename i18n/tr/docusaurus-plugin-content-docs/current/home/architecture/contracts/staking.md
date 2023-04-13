---
id: staking
title: Polygon üzerinde staking
description: Polygon üzerinde staking
keywords:
  - docs
  - polygon
  - matic
  - staking
  - unstake
  - restake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Polygon üzerinde staking {#staking-on-polygon}

Polygon Ağı için herhangi bir katılımcı tam düğüm çalıştırarak ağ doğrulayıcısı olma niteliğine sahip olabilir. Doğrulayıcılar için tam bir düğüm çalıştırmanın birincil teşvik, Ödül ve İşlem ücretlerini kazanmaktır. Polygon için konsensüse iştirak eden doğrulayıcı iştirak etmeye teşvik edilir çünkü blok ödülleri ve işlem ücreti alır.

Doğrulayıcı yuvaları ağ için sınırlı olduğundan, doğrulayıcı olarak seçilecek işlem, [burada](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716) tanımlandığı gibi düzenli aralıklarla gerçekleşen bir zincir üstü açık artırmaya katılmaktır.

## Stake Etme {#stake}

Pozisyon açıksa, açık artırma ilgilenen doğrulayıcılar için başlatılır:

- Burada adaylar bu pozisyon için yapılan son tekliften daha yüksek bir teklif yapacaklardır.
- Açık Artırmaya İştirak Süreci ana hatlarıyla şöyledir:
    - Pozisyon açıldığında açık artırma otomatik olarak başlatılır.
    - Açık artırmaya iştirak etmek için `startAuction()` komutunu çağırın
    - Bunu yaptığınızda varlıklarınız Stack Manager'da kilitlenir.
    - Başka bir potansiyel doğrulayıcı hisseden daha fazla işlem yaparsa, kilitli tokenler size geri döndürülür.
    - Yine, açık artırmayı kazanmak için daha fazla bahis yapın.
- Müzayede süresi sonunda en yüksek teklif veren kazanır ve Polygon ağı üzerinde bir Validator haline gelir.

:::note

Açık artırmaya katılıyorsanız lütfen tam düğüm çalışmanızı sağlayın.

:::

En yüksek teklif verenin kazanmasından sonra bir doğrulayıcı olma süreci aşağıdaki şekilde özetlenmiştir:

- İştirakinizi onaylamak için `confirmAuction()` komutunu çağırın.
- Heimdall üzerindeki Köprü bu olayı dinler ve Heimdall için yayınlar
- Konsensüs sonrasında doğrulayıcı Heimdall'a eklenir ancak is
- Doğrulayıcı yalnızca [(burada](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187) `startEpoch`tanımlanan) sonra doğrulamaya başlar.
- Ulaşır `startEpoch`ulaşmaz, doğrulayıcı eklenir `validator-set`ve konsensüs mekanizmasına katılmaya başlar.

:::info Tavsiye edilen

Doğrulayıcının stake'inin güvenliğini sağlamak için, doğrulayıcının `checkPoint` imzalarının doğrulanacağı farklı bir `signer` adresi belirlemesini tavsiye ederiz. Bu durum anahtarın doğrulayıcının cüzdan anahtarından ayrı olarak imzalamayı sürdürür, böylece bir düğüm kesmek durumunda fonlar korunur.

:::

### Stake'i Kaldırma {#unstake}

Staking, doğrulayıcının doğrulayıcının aktif doğrulayıcının havuzundan çıkmasına izin verir. **İyi Katılımın** sağlanabilmesi için bu bahisleri önümüzdeki 21 gün için kilitlenir.

Doğrulayıcılar ağdan çıkmak ve blokları doğrulamayı ve kontrol noktalarını göndermeyi durdurmak istediklerinde bunu `unstake`yapabilirler. Bu işlem şu an için hemen gerçekleşmektedir. Bu işlemden sonra doğrulayıcı aktif doğrulayıcı kümesinden çıkarılır.

### Yeniden Stake Etme {#restake}

Doğrulayıcı maddeler daha fazla ödül kazanmak ve doğrulayıcı noktası için rekabetçi olmak ve konumunu korumak için miktarlarına daha fazla hisse ekleyebilirler.
