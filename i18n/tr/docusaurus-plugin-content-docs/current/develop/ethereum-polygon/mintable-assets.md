---
id: mintable-assets
title: Polygon'da Mint Edilebilir Varlıklar
description: Mint'i inceleyin ve Polygon ağında Fx-Portal ile varlık oluşturun.
keywords:
  - docs
  - polygon wiki
  - polygon
  - mintable assets
  - mint
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Varlıklar Ethereum ve Polygon zinciri içinde ve bu zincirler arasında PoS köprüsü kullanılarak aktarılabilir. Bu varlıklar arasında ERC20, ERC721, ERC1155 ve başka birçok token standardı yer alır. Varlıkların çoğu Ethereum zincirinde önceden mevcuttur. Ama Polygon zincirinde yeni varlıklar da oluşturulabilir ve bu varlıklar gerektikçe ve gerektiğinde Ethereum zincirine geri taşınabilir. Bu durum Ethereum üzerinde token minting için harcanan çok fazla gaz ve zaman tasarrufu sağlayabilir.

Polygon zinciri üzerinde varlık oluşturmak çok daha kolaydır ve daha çok önerilen bir yaklaşımdır. **Bu varlıklar gerektiğinde Ethereum zincirine taşınabilir**. Bu tür varlıklara **Polygon mintable varlıklar** denir.

Polygon Mintable token'larında varlıklar Polygon ağında oluşturulur. Polygon'da mint edilmiş bir varlık Ethereum'a taşındığında, ilk olarak söz konusu varlığın yakılması ve ardından Ethereum zincirine bu yakma işleminin kanıtının sunulması gerekir. Polygon Mintable token yeteneklerini kullanmanın önerilen yolu [fx-portal](/develop/l1-l2-communication/fx-portal.md). kullanmaktır.
