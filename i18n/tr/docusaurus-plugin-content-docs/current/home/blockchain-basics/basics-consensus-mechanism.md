---
id: consensus-mechanism
title: Konsensüs Mekanizması
description: "PoW, PoS, DPoS, PoSpace ve PoET."
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Konsensüs Mekanizması {#consensus-mechanism}

Konsensüs mekanizması, kripto paralar gibi dağıtık süreçler veya çok aracılı sistemler arasında tek bir veri değeri veya tek bir ağ durumu üzerinde gerekli mutabakatı sağlamak için bilgisayar ve blok zinciri sistemlerinde kullanılan bozukluğa dayanıklı (fault-tolerant) bir mekanizmadır.

## Konsensüs Mekanizması Türleri {#types-of-consensus-mechanism}

### İş Kanıtı {#proof-of-work}
İş kanıtı, hizmeti engelleme saldırılarını (DOS) ve diğer kötü niyetli saldırıları caydırmak için önemsiz olmayan ama fizibıl miktarda çaba gerektiren bir sistemi tarif eder. Bu blok zinciri içinde yeni bloklar oluşturmak için zorlu bir hesaplama bulmacasını çözmeyi gerektirir.

### Hisse Kanıtı {#proof-of-stake}
Bu işlem kanıtı mekanizması, kullanıcıların işlemlerin bloklarını doğrulamak için seçilme şansına sahip olmaları için their bir miktarını belirleme ve bunu yaptıkları için ödüllendirilme şansına sahip olmalarını sağlayarak fikir birliği sağlar. Blok zinciri sisteminde en fazla stake'i satın alan madencilere öncelik verilir.

### Delege Stake Kanıtı {#delegated-proof-of-stake}
Bu konsensüs türü, üst yönetim organlarında üyelerin seçimine benzer. Bu faaliyete ilişkin paydaşlar bu faaliyeti konsensüs sürecine katılacak olan üçüncü taraflara, tanık veya delegelere devredebilirler. Tanıklar ve işlemleri doğrulayan kişiler genellikle bir teklif sunarlar, oy talep ederler ve paydaşlar tarafından seçilir. Bu kuruluşlar tarafından kazanılan ödüller genellikle ağ katılımcıları ile paylaşılır.

### Mekanın Kanıtı {#proof-of-space}
Bu tür bir konsensüs mekanizması Storj.io, Filecoin ve in gibi merkezi olmayan dosya depolama uygulamalarında yararlıdır; burada düğümlerin donanımlarında meşru bir kapasiteye sahip olduklarını kanıtlarlar. Bununla birlikte, PoW mekanizmasında olduğu gibi ağır hesaplama kullanmak yerine, her bir düğümün depolama kapasitesini kullanır. Bazen PoStorage veya PoCapacity olarak da anılır.

### Elapsed Time {#proof-of-elapsed-time}
Daha az bilgisayar kaynakları tükettiği için İş Kanıtına (PoW) daha iyi bir alternatiftir. Her katılımcı düğüm rastgele bir süre için beklemelidir ve uykudan uyanacak ilk düğüm yeni bir blok oluşturma şansı elde eder; bu sayede ağ üzerinden yayılır. Bu işlem, Intel SGX gibi Güvenilir Uygulama Ortamları (TEE) gerektirir ve belleğin izole bir parçası olan ve yalnızca belirli bir talimatlar kümesi kullanılarak erişilebilir.

## **Kaynaklar**

- [Bizans Arıza Hoşgörüsü](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [Konsensüs Mekanizmalarının Türü](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [Genel Bakış ve Konsensüs Sistemi Geliştirme Tarihi](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [Dağıtılmış Konsensüs Anlayışı](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [Bizans Generalleri Sorunu](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)