---
id: tutorial-template
title: Pangkalahatang Template ng Tutorial
sidebar_label: Tutorial template
description: Sundin ang template ng tutorial kapag nagsusulat ng teknikal na tutorial.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - tutorial
  - contribute
  - template
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: tutorial-template
---

Dapat gamitin ang template na ito kapag nagdaragdag ng tutorial sa Wiki
ng Polygon. Maaari mong piliing magdagdag ng tutorial tungkol sa isang paksa na gusto mo.

## Mga pangkalahatang alituntunin {#general-guidelines}

* Ang saklaw ng tutorial ay dapat maging malinaw mula sa pamagat.
* Ang tutorial ay tumpak dapat na nailalarawan ang mga feature
at functionality ng (mga) produkto o (mga) serbisyo.
* Subukang panatilihing mabilis at maigsi ang tutorial, pero ipaliwanag ang pangunahing konsepto kung
naaangkop. Magbigay ng impormasyon tungkol sa background at ng karagdagang konteksto kapag maaari.
* Para sa mga configuration at pagpapatupad na hakbang, maging partikular.
* Subukang gawin ang buong makakaya mo na magdagdag ng mga pansuportang larawan, icon, o screenshot na
dagdag sa nakasulat na content.
  > Ikalulugod din ng team ng dokumentasyon na makipagtulungan sa iyo na gumawa ng mga diagram.
* Tandaan ang audience kung para kanino ka nagsusulat. Kung ang materyal ay may partikular na antas ng hirap
dapat itong banggitin sa tutorial.
  > Kung may mga hakbang na dapat gawin ang isang user bago dumaan sa isang tutorial, pakibanggit ang mga ito.
* Ikalulugod ng team ng dokumentasyon na sumama sa paggawa ng tutorial.
* Tandaang isaalang-alang ang **[Gabay sa istilo](writing-style.md)**.

:::caution Pag-update sa mga kasalukuyang tutorial

Kung mapansin mong ang mga kasalukuyang tutorial sa Wiki ng Polygon
ay hindi sumusunod sa template na ito, ito ay dahil nagpasya ang team ng dokumentasyon
na magpatupad ng pamantayan, kaya pare-pareho ang daloy ng tutorial sa
lahat ng tutorial. Nagsisikap ang team na i-update ang mga tutorial na ito
para magaya ang template na ito. Kung interesado ka, maaari ka ring mag-update ng
umiiral na tutorial para baguhin ang istruktura nito.

:::

## Mga seksyon ng tutorial {#tutorial-sections}

### Pangkalahatang-ideya {#overview}

Ipaliwanag ang (mga) produkto o (mga) serbisyo na tinatalakay sa tutorial.
Magbigay ng impormasyon tungkol sa background para sa layunin ng tutorial at kung ano ang
gustong ipresenta ng tutorial. Ang tutorial ay palaging dapat batay sa paggamit ng
produkto ng Polygon.

### Ang matututunan mo {#what-you-ll-learn}

Ibuod ang matututunan ng user sa buong tutorial.

:::note Halimbawa

Matutuklasan mo kung paano gamitin ang Truffle Suite para gumawa ng dApps
Polygon.

:::

#### Mga resulta ng pagkatuto {#learning-outcomes}

Ilista ang mga resulta ng pagkatuto.

:::note Halimbawa

1. Matututo ka tungkol sa Fauna.
2. Matututo ka kung paano mo magagamit ang ReactJS para sa UI ng dApp mo.
3. Matututo ka kung paano mapangalagaan ang data ng dApp.

:::

Banggitin ang mga paunang kinakailangan at kung ano dapat ang
alam na ng user. I-link ang kinakailangang dokumentasyon para sa mga aspeto
na may alam na dapat ang user.

:::note Halimbawa

Bago simulan ang tutorial na ito, dapat mong maunawaan ang mga pangunahing kaalaman
ng EVM-based na pag-develop ng dApp. Tingnan ang "mga dokumentong ito" para sa higit pang impormasyon.

:::

### Ang gagawin mo {#what-you-ll-do}

Ilista ang mga hakbang sa tutorial at ang mga tool na gagamitin.

:::note Halimbawa

Gagamitin mo ang Solidity para gumawa ng smart contract sa ChainIDE environment.

1. Pag-set up ng wallet
2. Magsulat ng ERC-721 na smart contract
3. Mag-compile ng ERC-721 na Smart Contract
4. Mag-deploy ng ERC-721 na Smart Contract
5. Gumawa ng Flattened File gamit ang Flattener Library
6. Mag-verify ng Smart Contract
7. NFT Minting

:::

### Ang mismong tutorial {#the-tutorial-itself}

Sa pangkalahatan, ang tutorial ay maaaring ipresenta sa pinakamainam na pagkakategorya na
sa palagay ng manunulat ay naaangkop; dapat itong makita sa seksyong [Ang gagawin mo](#what-youll-do)
. Gayunpaman, ang mga seksyon ng tutorial ay nauugnay dapat sa tatlong pangunahing kategorya na ito:

> Tiyaking isinasaalang-alang mo ang mga keyword pati na rin ang SEO kapag gumagawa ng
> mga seksyon.

#### Gumawa ng iyong application {#build-your-application}

Ang content ng pangunahing tutorial. Maaaring kasama rito ang mga seksyon tulad ng "pag-set up", "pag-configure",
at "pagpapatupad" bilang ilang halimbawa.

#### Patakbuhin o I-deploy ang iyong application {#run-or-deploy-your-application}

Ipaliwanag kung paano dapat patakbuhin o i-deploy ng user ang application niya.

#### Subukan ang iyong application {#test-your-application}

Ito ay maaaring pagsusulat ng mga pagsubok para sa isang smart contract, beripikasyon ng smart contract,
atbp.

### Mga susunod na hakbang {#next-steps}

Tapusin ang tutorial at pagnilayan ang mga resulta ng pagkatuto.
Ilista ang mga susunod na hakbang na maaaring gawin ng user.

:::note Halimbawa

Binabati kita sa pag-deploy ng iyong smart contract. Alam mo na kung paano gamitin ang ChainIDE
para gumawa at mag-deploy ng mga smart contract. Pag-isipang subukan ang "tutorial na ito".

:::
