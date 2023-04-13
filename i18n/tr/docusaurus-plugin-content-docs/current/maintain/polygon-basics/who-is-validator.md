---
id: who-is-validator
title: Doğrulayıcı kimdir?
sidebar_label: Who is a Validator
description: "Ağda Heimdall ve Bor düğümlerini çalıştıran bir katılımcıdır."
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Doğrulayıcı ağ üzerinde MATIC token'larını sisteme kilitleyen ve ağın çalıştırılmasına yardımcı olmak için Heimdall doğrulayıcı ve Bor blok üreticisi düğümlerini çalıştıran bir katılımcıdır. Doğrulayıcılar MATIC token'larını teminat olarak yatırarak ağın güvenliği için çalışırlar ve bu hizmetlerinin karşılığında ödüller kazanırlar.

Ödüller tüm stakeçilere her denetim noktasında stake'leriyle orantılı olarak dağıtılır; bundan ayrı olarak, teklifçi ilaveten bir bonus alır. Kullanıcının ödül bakiyesi ödüller talep edilirken referans yapılan sözleşmede güncellenir.

Doğrulayıcı düğümünün çifte imzalama gibi kötü niyetli bir eylem gerçekleştirmesi durumunda stake'ler kesinti cezasına çarptırılma riskiyle karşılaşır; bu durum o denetim noktasında bağlantılı (linked) delegatörleri de etkiler.

:::tip

Ağın güvenliğini sağlamak isteyen ancak tam bir düğüm çalıştırmayan kişiler [temsilci](/docs/maintain/glossary.md#delegator) olarak katılabilirler.

:::

## Genel Bakış {#overview}

Polygon ağında doğrulayıcılar düzenli aralıklarla yapılan bir zincir içi açık artırma işlemi ile seçilirler. Bu seçilen doğrulayıcılar blok üreticileri ve doğrulayıcıları olarak katılırlar. Bir [denetim noktası](/docs/maintain/glossary.md#checkpoint-transaction) katılımcılar tarafından doğrulandığında üst zincirde (Ethereum mainnet) güncellemeler yapılır ve bunun üzerine doğrulayıcı ödülleri doğrulayıcıların ağdaki stake'lerine bağlı olarak serbest bırakılır.

Polygon, ağın güvenliğinin sağlanması için bir [doğrulayıcılar](/docs/maintain/glossary.md#validator) kümesine bel bağlar. Doğrulayıcıların rolü bir tam düğüm çalıştırmak, [bloklar üretmek](/docs/maintain/glossary.md#block-producer), doğrulamak ve konsensüse katılmak ve Ethereum mainnet'e [denetim noktaları](/docs/maintain/glossary.md#checkpoint-transaction) işlemektir. Doğrulayıcı olmak isteyenlerin MATIC token'larını Ethereum mainnet'te bulunan staking yönetimi sözleşmeleri ile [stake](/docs/maintain/glossary.md#staking) etmeleri gerekir.

## Çekirdek bileşenleri {#core-components}

[Heimdall](/docs/maintain/glossary.md#heimdall) staking sözleşmeleriyle yayınlanan olayları okuyarak mevcut doğrulayıcılar kümesini doğrulayıcıların güncellenmiş stake oranı ile seçer; bu seçim [Bor](/docs/maintain/glossary.md#bor) tarafından da bloklar üretilirken kullanılır.

[Delegasyon](/docs/maintain/glossary.md#delegator) ayrıca staking sözleşmelerine kaydedilir ve doğrulayıcı gücünde veya düğüm [imzacı adresinde](/docs/maintain/glossary.md#signer-address) ya da unbonding isteklerinde gerçekleşen bir güncelleme bir sonraki denetim noktası işlendiğinde yürürlüğe girer.


## Bir Polygon doğrulayıcısının uçtan uca iş akışı {#end-to-end-flow-for-a-polygon-validator}

Doğrulayıcılar imzalayan düğümlerini kurarlar, verileri senkronize ederler ve sonra güncel kümede bir doğrulayıcı olarak kabul edilmek üzere tokenlarını Ethereum mainnet staking sözleşmelerine stake ederler. Boş bir slot varsa doğrulayıcı hemen kabul edilir. Aksi takdirde bir slot elde etmek için değiştirme mekanizmasından geçmek gerekir.

:::warning

Yeni doğrulayıcıları kabul etmek için sınırlı bir yer vardır. Yeni doğrulayıcılar aktif kümeye ancak o anda aktif olan bir doğrulayıcı unbond yaptığında katılabilir. Doğrulayıcı değişimi için yeni bir açık artırma süreci başlatılacaktır.

:::

Blok üreticileri, belli bir [span](/docs/maintain/glossary.md#span) için blok üretmenin seçilen doğrulayıcıların sorumluluğunda olduğu doğrulayıcı kümesinden seçilir.

Heimdall'daki düğümler üretilen blokları doğrular, konsensüse katılır ve denetim noktalarını Ethereum mainnet'e tanımlanmış aralıklarda işler.

Doğrulayıcıların blok üreticisi veya denetim noktası [teklifçisi](/docs/maintain/glossary.md#proposer) olarak seçilme olasılığı bir doğrulayıcının delegasyonlar da dahil stake'inin toplam havuzdaki oranına bağlıdır.

Doğrulayıcılar her denetim noktasında stake oranlarına bağlı olarak ödüller alırlar; bu ödüllerden denetim noktası teklifçisine dağıtılan teklifçi bonusu düşülür.

Biri dilediği zaman sistemden çıkabilir ve unbonding dönemi sona erdiğinde token'larını çekebilir.

## Ekonomi {#economics}

Bakınız [Ödüller](/docs/maintain/validator/rewards).

## Bir doğrulayıcı düğümü kurma {#setting-up-a-validator-node}

Bakınız [Doğrulama](/docs/maintain/validate/validator-index).

## Ayrıca bakınız {#see-also}

* [Doğrulayıcıların sorumlulukları](/docs/maintain/validate/validator-responsibilities)
* [Doğrula](/docs/maintain/validate/validator-index)
* [Doğrulayıcı SSS](/docs/maintain/validate/faq/validator-faq)
