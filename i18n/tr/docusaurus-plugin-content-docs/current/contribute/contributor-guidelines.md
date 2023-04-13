---
id: contributor-guidelines
title: Nasıl Katkıda Bulunabilirsiniz?
sidebar_label: Contributor guidelines
description: Gelecekteki katkınıza hazırlanın
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip
[Polygon Wiki depomuz üzerinde bir sorun](https://github.com/maticnetwork/matic-docs/issues) oluşturmaktan çekinmeyin
:::

## Katkıda Bulunacağınız bir alan belirleyin {#identify-an-area-to-contribute-to}

Wiki için katkıda bulunabileceğiniz bir alan belirlemenin birkaç yolu vardır:

- En kolay yol, [Wiki için katkıda bulunanlar](/docs/contribute/community-maintainers) listesinden birine ulaşmak
ve "Polygon Wiki'ye katkıda bulunmak istiyorum" demektir. Katkıda bulunabileceğiniz bir alan bulmak için
sizinle birlikte çalışacaklardır.
- Aklınızda belirli bir katkı varsa ancak bundan emin değilseniz, bunun uygun olup olmadığını
[Wiki için katkıda bulunanlar](/docs/contribute/community-maintainers) listesinden biriyle doğrudan iletişime geçerek doğrulayın.
- Aklınızda katkıda bulunacak belirli bir konu yoksa,
[Polygon Github bilgi deposu](https://github.com/maticnetwork) üzerinde `help wanted` olarak etiketlenmiş konuları gözden geçirebilirsiniz.
- Ayrıca `good first issue` olarak etiketlenmiş konular, yeni başlayanlar için ideal olarak
kabul edilmektedir.

## Polygon belgelerine katkıda bulunun {#add-to-the-polygon-documentation}

  - Polygon Wiki'de ekleme veya değiştirme yapmanız gerekirse
  `master` dalına bir PR (çekme isteği) gönderin (örnek PR'ye göz atın).
  - Belgelerden sorumlu ekip PR'yi inceleyecek ya da ilgili birime iletecektir.
  - Bilgi Deposu: https://github.com/maticnetwork/matic-docs
  - Örnek PR: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
Wiki cihazımızı makinenizde yerel olarak çalıştırmak istiyorsanız, [Wiki ile ilgili bölümü yerel olarak çalıştırın.](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) Yeni bir belge ekliyorsanız, daha fazla bilgi için temel bir özet / giriş ve your veya your bir bağlantı olması önerilir.
:::

## Git kuralları {#git-rules}

Tüm bilgi depolarımızda değişiklik günlükleri için `gitchangelog` kullanıyoruz. Bunun için,
aşağıdaki işleme mesajı (commit message) kuralına uymamız gerekiyor. Bu kurala uymazsanız
birleştirme (merge) olmayacaktır.

### İşleme mesajı kuralı {#commit-message-convention}

Aşağıda, işleme mesajınıza eklemeyi düşünmeyi yararlı bulabileceğiniz hususlarda
öneriler yer almaktadır. İşlemelerinizi kabaca iki büyük bölüme ayırmak isteyebilirsiniz:

- amaca göre (örneğin: yeni, düzeltme, değişiklik ...)
- nesneye göre (örneğin: belge, paketleme, kod ...)
- hedef kitleye göre (örneğin: geliştiriciler, test edenler, kullanıcılar ...)

Ayrıca bazı işlemeleri etiketlemek isteyebilirsiniz:

- Değişiklik günlüğünüze kaydedilmeyecek "minor" işlemeler olarak (kozmetik değişiklikler,
açıklamalar kısmında küçük bir yazım hatası...).
- Önemli özellik değişiklikleri yapmıyorsanız “refactor” olarak. Böylece,
bu değişiklikler son kullanıcıya gösterilen değişiklik günlüğünde yer almaz ama
geliştirici değişiklik günlüğünüz varsa orada yer almasında fayda olabilir.
- Ayrıca API değişikliklerini işaretlemek için ya da yeni bir API veya benzeri bir şey söz konusu ise "api" etiketini kullanabilirsiniz.

İşleme mesajınızı elinizden geldiğince kullanıcı işlevselliğini hedefleyerek yazmaya çalışın.

:::note Örnek

Bu, bu bilgilerin nasıl saklanabileceğini göstermek için `--oneline` etiketli standart bir git günlüğüdür:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

Daha fazla bilgi için lütfen
[Git Kullanarak Değişiklik Günlüğü Yönetmenin İyi Yöntemleri Nelerdir?](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890) makalesine başvurun.

Daha fazla bilgi için [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/) adresine göz atın.
