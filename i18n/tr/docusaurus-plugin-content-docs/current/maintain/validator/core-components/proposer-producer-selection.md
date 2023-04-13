---
id: proposers-producers-selection
title: Teklifçilerin ve Üreticilerin Seçimi
sidebar_label: Proposers & Producers
description: Polygon üzerinde proposer ve blok üreticisi seçimi
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

BOR katmanında çalışacak blok üreticileri, doğrulayıcıların stake'leri esas alınarak Doğrulayıcılar havuzundan seçilen bir komitedir; bu seçim düzenli aralıklarda yapılır. Bu aralıklara Doğrulayıcının dynasty'ye (hanedanlık) ve ağa ilişkin yönetişimiyle karar verilir.

[Stake](/docs/maintain/glossary.md#staking) oranı, [blok üreticileri](/docs/maintain/glossary.md#block-producer) komitesinin bir üyesi olarak seçilebilme olasılığını belirler.

## Seçim süreci {#selection-process}

Diyelim ki havuzda 3 doğrulayıcımız var: Alice, Bill ve Clara:

* Alice 100 MATIC token stake etsin.
* Bill 40 MATIC token stake etsin.
* Clara 40 MATIC token stake etsin.

Doğrulayıcılara stake'lerine slotlar verilir.

Alice 100 MATIC token stake ettiği ve doğrulayıcı yönetişimiyle sürdürülen slot başına maliyet 10 MATIC token olduğundan, Alice toplam 5 slot elde eder. Benzer şekilde, Bill ve Clara toplam 2'şer slot elde ederler.

Doğrulayıcılar Alice, Bill ve Clara'ya aşağıdaki slotlar verilir:

* [A, A, A, A, A, B, B, C, C]

Sonra Polygon Alice, Bill ve Clara slotlarının dizilimini Ethereum blok hash'lerini tohum (seed) olarak kullanarak karar.

Bu karımın sonucunda aşağıdaki slot dizilimi elde edilir:

* [A, B, A, A, C, B, A, A, C]

Şimdi, doğrulayıcı yönetişimiyle sürdürülen toplam blok üreticisi sayısına bağlı olarak, Polygon doğrulayıcıları en üstten başlayarak kullanır — örneğin 5 üreticiden oluşan bir küme için slotların dizilimi [A, B, A, A, C] olur.

Bir sonraki span için üretici kümesi [A:3, B:1, C:1] olarak belirlenir.

Polygon, elde edilen doğrulayıcı kümesini ve Tendermint'in [teklifçi algoritmasını](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) kullanarak Bor'daki her sprint için bir üretici seçer.

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**Efsane:**

* Dynasty (Hanedanlık): Son açık artırmanın bitiş zamanı ile bir sonraki açık artırmanın başlangıç zamanı arasındaki süre.
* Sprint (Depar): Blok üreticileri komitesinin seçildiği zaman aralığı.
* Span (Mesafe): Tek bir üretici tarafından üretilen blokların sayısı.
