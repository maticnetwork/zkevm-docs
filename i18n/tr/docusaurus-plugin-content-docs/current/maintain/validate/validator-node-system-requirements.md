---
id: validator-node-system-requirements
title: Sistem Gereksinimleri
description: Bir doğrulayıcı düğümünü çalıştırmak için sistem gereksinimleri
keywords:
  - docs
  - matic
  - polygon
  - prerequisites
  - requirements
slug: validator-node-system-requirements
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Bu bölümde listelenen sistem gereksinimleri, hem [sentry](/docs/maintain/glossary.md#sentry) düğümü hem de [doğrulayıcı](/docs/maintain/glossary.md#validator) düğümü içindir.

**Asgari** sistem gereksinimleri, düğümleri çalıştırabileceğiniz, ama kurulumun gelecekte olabilecek değişikliklerden etkilenebileceği anlamına gelir.

**Önerilen** sistem gereksinimleri düğümlerin geleceğe hazır olduğu anlamına gelir. Ancak düğümlerinizi geleceğe hazır kılmak için bir üst limit yoktur.

Sentry düğümünü ve doğrulayıcı düğümünü her zaman ayrı makinelerde çalıştırmanız gerekir.

## Asgari sistem gereksinimleri {#minimum-system-requirements}

* RAM: 32 GB
* CPU: 8 çekirdekli
* Depolama: 2,5 TB SSD

:::info

Amazon Web Services (AWS) için asgari gereksinimlere eşdeğer oturumlar (instances) **m5d.2xlarge** veya **t3.2xlarge**'dır ve "unlimited credits" (sınırsız kredi) seçeneği seçilmelidir.

Depolama için 2,5 TB SSD depolama alanının sure emin olun.

:::

## Önerilen sistem gereksinimleri {#recommended-system-requirements}

* RAM: 64 GB
* CPU: 16 çekirdekli
* Depolama: 5 TB SSD
* Bant Genişliği: 1 Gbit/s

:::info

Amazon Web Services (AWS) için önerilen gereksinimlerin eşdeğer oturumu (instance) **m5d.4xlarge**'dır.

OVH için önerilen gereksinimlerin eşdeğer oturumu (instance) **infra-3**'tür.

Ağ için, ayda 3-5 TB veri aktarımı bekleyebilirsiniz.

:::
