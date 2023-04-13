---
id: bor
title: Bor Mimarisi
description: Polygon mimarisinde Bor rolü
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Bor Mimarisi {#bor-architecture}

Polygon hibrit **bir Plazma + Plasma Proof of -Stake (PoS)** platformu. Hız ve merkeziyetsizlik için optimizasyon sağlamak üzere Polygon Ağı’nda çift konsensüs mimarisini kullanıyoruz. Sistemin mimarisini, bilinçli bir şekilde, EVM ile çalıştırılan yan zincirlerimizde rastgele durum geçişlerini destekleyecek şekilde tasarladık.

## Mimari {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

Blok zinciri, birbiriyle etkileşime geçen ve birlikte çalışan ağ istemcilerinden oluşan bir kümedir. İstemci, diğer istemcilerle p2p iletişim kanalı kurabilen, işlemleri imzalayabilen ve yayımlayabilen, akıllı sözleşmeleri devreye alıp onlarla etkileşime geçebilen ve benzer işlemleri yapabilen bir yazılımdır. İstemci genellikle düğüm olarak adlandırılır.

Polygon için düğüm iki katmanlı bir uygulama ile Heimdall (Validator Layer) ve Bor(Block Üreticisi Katmanı) ile tasarlanmıştır.

1. Heimdall
    - Hisse kanıtı doğrulaması
    - Ethereum ana zinciri üzerinde blokların denetim noktasından geçirilmesi
    - Doğrulayıcı ve Ödül Yönetimi
    - Ethereum ana zinciri ile eşitleme sağlanması
    - Merkezî Olmayan Köprü
2. Bor
    - Polygon Zinciri
    - EVM ile Uyumlu VM
    - Teklif Sahipleri ve Üretici kümesi seçimi
    - SystemCall
    - Ücret Modeli

## Heimdall (Validator katmanı) {#heimdall-validator-layer}

Heimdall (All-Protector), Polygon Proof of Stake sisteminde meydana gelen her şeyin purveyor (iyi veya All-Protector)

Heimdall, Hisse Kanıtı Doğrulama katmanımızdır ve Plasma bloklarının bir temsilinin mimarimizdeki ana zincire denetim noktası atamasını yapmaktan sorumludur. Bunu, imza düzeninde ve çeşitli veri yapılarında değişiklikler yaparak Tendermint konsensüs motorunun üzerinde geliştirerek uyguladık (implement).

Daha fazla bilgi için lütfen [https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/) adresindeki yazıyı okuyun.

## Bor (Blok Üreticisi katmanı) {#bor-block-producer-layer}

Bor düğüm uygulaması temel olarak yan zincir operatörüdür. Yan zincir sanal makinesi (VM) EVM uyumludur. Bu, şu anda, konsensüs algoritmasında yapılan özel değişiklikleri içeren temel bir Geth uygulamasıdır (implementation). Ancak, bu uygulama en temel adımdan başlanarak geliştirilip hafif ve odaklanmış hale getirilecektir.

Bor, Blok üreticisi katmanımızdır ve Heimdall ile senkronize bir şekilde her bir span ve sprint için üreticileri ve doğrulayıcıları seçer. Polygon kullanıcıları için etkileşim, Ethereum geliştirici araçları ve uygulamalarının işlevselliğine ve uyumluluğuna olanak vermek üzere EVM ile uyumlu olan bu yan zincir üzerinde gerçekleşir.

### Polygon Zinciri {#polygon-chain}

Bu zincir, iki yönlü bağlantı kullanılarak Ethereum’a eklenen ayrı bir blok zinciridir. İki yönlü bağlantı, Ethereum ve Polygon arasında varlıkların takas edilebilmesine olanak verir.

### EVM ile Uyumlu VM {#evm-compatible-vm}

Ethereum Virtual Machine (EVM), her bir tam Polygon düğümüne gömülü olan ve sözleşme bayt kodunun yürütülmesinden sorumlu olan güçlü, yalıtımlı bir sanal yığındır. Sözleşmeler genellikle Solidity gibi daha yüksek seviyeli dillerde yazılır ve ardından EVM bayt koduna derlenir.

### Teklif Sahiplerinin ve Üreticilerin Seçimi {#proposers-and-producers-selection}

Bor katmanı için blok Üreticileri, stake’lerine göre düzenli olarak Doğrulayıcı havuzundan seçilen bir komitedir ve belirli aralıklarla karıştırılır. Bu aralıklar, dynasty ve ağ için Doğrulayıcı yönetişimi tarafından kararlaştırılır.

Stake oranı/Staking gücü, blok üreticisi komitesine üye olarak seçilme olasılığını belirtir.

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### Seçim Süreci {#selection-process}

- Havuzumuzda 3 doğrulayıcı olduğunu ve isimlerinin Alice, Bill ve Clara olduğunu varsayalım.
- Alice 100 Matic token stake ederken Bill ve Clara 40 Matic token stake etti.
- Doğrulayıcılara, stake’e göre slot verilir. Alice 100 Matic token stake ettiği için slotları da bununla orantılı olarak alacaktır. Alice toplamda 5 slot alacaktır. Benzer şekilde, Bill ve Clara'nın her biri de toplam 2 slot alır.
- Tüm doğrulayıcılara bu slotlar verilir [A, A, A, A, A, B, B, C, C]
- Geçmiş Ethereum blok verilerini tohum olarak kullanarak bu diziyi karıştırıyoruz.
- Tohumu kullanarak slotları karıştırdıktan sonra, diyelim ki bu diziyi elde ediyoruz [A, B, A, A, C, B, A, A, C]
- Şimdi Üretici sayısına *(doğrulayıcı yönetişimi tarafından tutulur)* bağlı olarak doğrulayıcıları yukarıdan aşağıya sıralıyoruz. Örneğin, 5 üretici seçmek istiyorsak üretici kümesi böyle oluyor [A, B, A, A, C]
- Böylece bir sonraki span için üretici kümesi [A: 3, B:1, C:1] şeklinde tanımlanıyor.
- Bu doğrulayıcı kümesini ve tendermint’in teklif sahibi seçim algoritmasını kullanarak BOR üzerindeki her sprint için bir üretici seçiyoruz.

### SystemCall Arabirimi {#systemcall-interface}

Sistem çağrısı, EVM altındaki bir dâhili operatör adresidir. Her sprint için Blok Üreticilerinin durumunun korunmasına yardımcı olur. Sistem Çağrısı sprint’in sonuna doğru tetiklenir ve yeni Blok Üreticileri listesi için istek yapılır. Durum güncellendikten sonra Bor üzerinde blok oluşturmanın ardından değişiklikler tüm Doğrulayıcılara iletilir.

### fonksiyonlar {#functions}

#### proposeState {#proposestate}

- Yalnızca doğrulayıcılara çağrı yapılmasına izin verilir.
- Zaten teklif edilmiş veya taahhüt edilmişse `stateId`’yi denetleyin.
- `stateId`’yi teklif edin ve bayrağı `true` olarak güncelleyin.

#### commitState {#commitstate}

- Yalnızca Sisteme çağrı yapılmasına izin verilir.
- Zaten teklif edilmiş veya taahhüt edilmişse `stateId`’yi denetleyin.
- `StateReceiver` Sözleşmesini yeni `stateId` ile bilgilendirin.
- `state` bayrağını `true` olarak güncelleyin ve `proposedState`'i `remove` edin.

#### proposeSpan {#proposespan}

- Yalnızca doğrulayıcılara çağrı yapılmasına izin verilir.
- Span teklifinin `pending` olup olmadığını kontrol edin.
- Span Teklifini `true` olarak güncelleyin

#### proposeCommit {#proposecommit}

- Yalnızca Sisteme çağrı yapılmasına izin verilir.
- Mevcut span sıfır ise `initial validators`’ı ayarlayın.
- Sprint ve Span’in `spanId` ve `time_period`’ı için koşulları kontrol edin.
- Yeni `span` ve `time_period`’ı güncelleyin.
- `sprint` için `validators` ve `blockProducers`’ı ayarlayın.
- `spanProposal` için bayrağı `true` olarak güncelleyin.

### Bor Ücret Modeli {#bor-fee-model}

Ethereum işlemlerine benzer şekilde, normal işlemde Matic token cinsinden ücretler toplanır ve blok üreticilerine dağıtılır.

Diğer blok zincirlerinin olduğu gibi Polygon’un da Matic (MATIC) adlı bir yerel token’ı vardır. MATIC aslen Polygon ve staking için gaz (işlem ücretleri) ödemesi için kullanılan bir ERC20 token’dır.

:::info

Dikkat edilmesi gereken önemli bir şey, Polygon zinciri üzerinde MATIC token’ların ERC20 olarak çalışmanın yanı sıra aynı zamanda yerel token olarak da çalışmasıdır. Dolayısıyla bu, kullanıcının gazı MATIC ile ödeyebilmesi ve diğer hesaplara MATIC gönderebilmesi anlamına gelir.

:::

genesis-contracts, için `gasPrice`ve Ethereum ile aynı şekilde `gasLimit`çalışır, ancak yürütme sırasında gönderenin hesabından ücretleri düşmez.

Mevcut doğrulayıcılardan genesis işlemleri `gasPrice = 0` ile yürütülür.

Ayrıca, doğrulayıcılar Bor'daki mevduat ve Span önerileri gibi Devlet önerileri gibi aşağıdaki işlem türlerini göndermelidir.

## Teknik Bilgi {#technical-insight}

### Genesis Sözleşmeleri {#genesis-contracts}

[BorValidatorSet(0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒ Bu sözleşme, her bir span ve spring için doğrulayıcı kümesini yönetir.

[BorStateReceiver(0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒ Bu sözleşme, gelişigüzel sözleşme verilerinin Ethereum sözleşmelerinden Polygon sözleşmelerine aktarımını yönetir

MaticChildERC20(0x1010) ⇒ Ana Zincir token’ları için varlıkların Ethereum’dan Polygon’a taşınmasına olanak veren Alt Sözleşme.

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

Bor Protokolü

## Sözlük {#glossary}

- StartEpoch - Bir doğrulayıcının etkinleştirildiği ve konsensüse katılacağı denetim noktası numara gönderisi.
- EndEpoch - Bir doğrulayıcının devre dışı olarak değerlendirildiği ve konsensüse katılmayacağı denetim noktası numara gönderisi.
- Sprint - Sprint, tek bir doğrulayıcı tarafından oluşturulan sürekli bir blok kümesidir.
- Span -  Span, sabit bir doğrulayıcı kümesine sahip olan ancak çeşitli sprint’lerden oluşan büyük bir blok kümesidir. Örneğin 6400 blokluk bir uzunluk için 64 bloklu 100 sprint’ten oluşur.
- Dynasty: Son açık artırmanın bitiş zamanı ve bir sonraki açık artırmanın başlangıç zamanı arasındaki süre.

## Kaynaklar {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [EVM nasıl çalışır?](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [Tendermint Teklif Seçimi](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
