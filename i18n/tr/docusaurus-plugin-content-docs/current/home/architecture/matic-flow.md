---
id: matic-flow
title: Polygon Nasıl Çalışır
description: Bir sonraki blok zinciri uygulamanızı Polygon üzerinde geliştirin.
keywords:
  - docs
  - matic
  - polygon
  - how polygon works
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygon Nasıl Çalışır {#how-polygon-works}

Polygon, hibrit Hisse Kanıtı (Proof of Stake) ve Plasma için etkinleştirilmiş yan zincirler sağlayan bir blok zinciri uygulama platformudur.

Polygon üç katmanlı mimariye sahiptir:

1. Ethereum üzerinde Staking ve Plasma akıllı sözleşmeleri
2. Heimdall (Hisse Kanıtı katmanı)
3. Bor (blok üreticisi katmanı)

Aşağıdaki resim, bu temel bileşenlerin birbirleriyle nasıl etkileşime girdiğini anlamanıza yardımcı olacaktır:

<img src={useBaseUrl("img/Bor/bor-architecture.png")} />