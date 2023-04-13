---
id: move-stake
title: Stake'i Taşıma
description: your paranızı polygon ağı üzerinde taşımak
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Stake'i Foundation düğümlerinden Harici Düğümlere taşıma {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>Tarayıcınız bu video ögesini desteklemiyor.</p>
</video>

Delegatörler şimdi Staking kullanıcı arabirimi üzerindeki Move Stake (Stake'i Taşı) işlevini kullanarak stake'lerini Foundation düğümlerinden diledikleri Harici Düğümlere taşıma seçeneğine sahipler

Stake'i foundation düğümünden harici düğüme taşımak tek bir işlemdir. Dolayısıyla, bu olay sırasında gecikmeler veya unbonding süresi yoktur.

Stake'in yalnızca Foundation düğümünden Harici düğümlere Taşınmasına izin verildiğini lütfen aklınızda bulundurun. Stake'inizi bir Harici düğümden başka bir Harici düğüme taşımak isterseniz önce Unbond yapmanız, sonra yeni harici düğümde delege etmeniz gerekecektir.

Ayrıca, Move Stake (Stake'i Taşı) işlevi, fonların Foundation düğümlerinden Harici düğümlere sorunsuz bir şekilde aktarılmasını sağlamak için Polygon ekibi tarafından geliştirilen geçici bir işlevdir. Ve sadece foundation düğümleri kapatılana kadar aktif kalacaktır.

## Stake Nasıl Taşınır? {#how-to-move-stake}

Staking stake, giriş yapmanız gerekir, önce Delege Adresinizi kullanarak [Staking](https://wallet.polygon.technology/staking) to giriş yapmanız gerekir.

**Delege Adresi** : Vakıf Düğümleri üzerinde Staking için zaten kullanmış olduğunuz adres.

Giriş yaptıktan sonra doğrulayıcıların listesini göreceksiniz.

<img src={useBaseUrl("img/staking/validator-list.png")} />

Şimdi Delegatör Profilinize **gidin ve Gösteri Detayları** düğmesini veya soldaki **My Delegator Detayları** seçeneğini tıklayarak Delegatör Profilinize gidin.

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

Burada **Move Stake** adında yeni bir düğme bulacaksınız.

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

Bu düğmeye tıkladığınızda, Delege edebileceğiniz doğrulayıcıların listesini içeren bir sayfaya yönlendirilirsiniz. Bu listedeki herhangi bir Doğrulayıcıya delege edebilirsiniz.

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

Şimdi devretmek istediğiniz doğrulayıcınızı seçtikten sonra, **Delege Here** düğmesini tıklayın. Bu düğmeye tıklamak bir açılır pencere açar.

<img src={useBaseUrl("img/staking/stake-funds.png")} />

Burada Delege için tüm tutarı otomatik olarak dolduracak **bir** Miktar alanı göreceksiniz. Bir doğrulayıcıya delege etmek için kısmi bir miktar da kullanabilirsiniz.

Örneğin, 1 no.lu Foundation Düğüme 100 Matic token delege ettiyseniz ve şimdi stake'inizi foundation düğümünden bir harici düğüme taşımak istiyorsanız, seçtiğiniz harici düğüme diyelim 50 Matic token gibi kısmi bir miktar delege edebilirsiniz. Geri kalan 50 Matic token 1 no.lu foundation düğümünde kalacaktır. Bunun ardından, geri kalan 50 token'ı başka bir harici düğüme veya aynı harici düğüme delege etmeyi seçebilirsiniz.

Bu miktarı girdikten sonra **Stake Fonları** düğmesine tıklayabilirsiniz. Bunun ardından, Metamask'inizde adresi imzalamak için onay vermeniz istenecektir.

İşlemi imzaladığınızda stake'iniz Foundation düğümünden Harici düğüme başarıyla taşınacaktır. Bununla birlikte, işlemin Staking kullanıcı arabirimine yansıması için 12 blok onayını beklemeniz gerekecektir. Taşınan fonlarınız 12 blok onayından sonra görüntülenmezse, güncellenmiş stake'leri görmek için sayfayı bir kez yenilemeyi deneyin.

Herhangi bir sorunuz varsa ya da herhangi bir sorun yaşarsanız, lütfen [buradan](https://support.polygon.technology/support/home) bir destek talebi gönderin.
