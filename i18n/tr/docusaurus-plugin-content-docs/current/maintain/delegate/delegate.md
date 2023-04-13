---
id: delegate
title: Delegasyon nasıl yapılır?
description: Polygon Ağı üzerinde nasıl delege eden olabileceğinizi öğrenin.
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Delegasyon nasıl yapılır? {#how-to-delegate}

Bu, Polygon Ağı üzerinde [delege eden](/docs/maintain/glossary.md#delegator) olmanıza yardımcı olacak bir adım adım kılavuzdur.

Tek ön koşul, Ethereum mainnet adresinizde MATIC token'larınızı ve ETH bulundurmaktır.

## Panoya erişme {#access-the-dashboard}

1. Cüzdanınızda (örneğin, MetaMask), Ethereum mainnet'i seçin.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. [Polygon Staking](https://staking.polygon.technology/)'e giriş yapın.
3. Giriş yaptıktan sonra, doğrulayıcılar listesi ile birlikte bazı genel istatistikleri göreceksiniz.

![img](/img/staking/home.png)

:::note

Bir doğrulayıcı iseniz , delege olarak oturum açmak için farklı bir doğrulayıcı olmayan adres kullanın.

:::

## Bir doğrulayıcıya delege etme {#delegate-to-a-validator}

1. **Become a Delegator** (Delege Eden Ol) seçeneğine tıklayın veya belirli bir doğrulayıcıya ulaşana dek sayfayı aşağı kaydırıp **Delegate** (Delege Et) seçeneğine tıklayın.

![img](/img/staking/home.png)

2. Delege edilecek MATIC miktarını girin.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. Delegasyon işlemini onaylayın ve **Delegate** (Delege Et) seçeneğine tıklayın.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

Delegasyon işlemi tamamlandıktan sonra, **Delegation Completed** (Delegasyon Tamamlandı) iletisini göreceksiniz.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## Delegasyonlarınızı görüntüleme {#view-your-delegations}

Delegasyonlarınızı görüntülemek için [My Account](https://staking.polygon.technology/account)'a (Hesabım) tıklayın.

![img](/img/staking/myAccount.png)

## Ödülleri çekme {#withdraw-rewards}

1. [My Account](https://staking.polygon.technology/account)'a (Hesabım) tıklayın.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Delege ettiğiniz doğrulayıcının altındaki **Withdraw Reward** (Ödülü Çek) seçeneğine tıklayın.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

Bunun ardından, MATIC token ödülleriniz Ethereum adresinize çekilecektir.

## Ödülleri tekrar stake etme {#restake-rewards}

1. [My Account](https://staking.polygon.technology/account)'a (Hesabım) tıklayın.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Delege ettiğiniz doğrulayıcının altındaki **Restake Reward** (Ödülü Tekrar Stake Et) seçeneğine tıklayın.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

Bu durum MATIC token ödüllerini doğrulayıcıya geri kazandıracak ve heyet payınızı artıracaktır.

## Bir doğrulayıcıdan bağı kaldırma {#unbond-from-a-validator}

1. [My Account](https://staking.polygon.technology/account)'a (Hesabım) tıklayın.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Delege ettiğiniz doğrulayıcının altındaki **Unbond** (Bağı Kaldır) seçeneğine tıklayın.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

Bu durum sizin ödüllerinizi doğrulayıcıdan ve tüm your doğrulayıcı tarafından geri çekecektir.

Çekilen ödülleriniz hemen Ethereum hesabınızda görünecektir.

Çektiğiniz stake fonları 80 [denetim noktası](/docs/maintain/glossary.md#checkpoint-transaction) boyunca kilitlenecektir.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

Delegasyonu kaldırma sürecindeki fon kilitleme işlemi, ağ üzerinde kötü niyetli hiçbir davranış olmadığından emin olmak içindir.

:::

## Stake'i bir düğümden başka bir düğüme taşıma {#move-stake-from-one-node-to-another-node}

Stake'in bir düğümden başka bir düğüme taşınması tek bir işlemdir. Bu olay sırasında hiçbir gecikme veya delegasyon kaldırma süreci yoktur.

1. Staking panosu üzerindeki [My Account'a](https://wallet.polygon.technology/staking/my-account) (Hesabım) giriş yapın.
1. Delege ettiğiniz doğrulayıcının altındaki **Move Stake** (Stake'i Taşı) seçeneğine tıklayın.
1. Harici bir doğrulayıcı seçin ve **Stake here** (burada Stake et) seçeneğine tıklayın.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. Stake miktarını girin ve **Move Stake** (Stake'i Taşı) seçeneğine tıklayın.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

Bunun ardından, stake taşınacaktır. Pano, 12 blok onayından sonra güncellenecektir.

:::info

Hareketli bir miktar herhangi bir düğüm arasında izin verilir. Tek istisna, bir Vakıf düğümünden bir vakıf düğümünden başka bir Vakıf düğümüne taşınma ve buna izin verilmeyen bir durumdur.

:::
