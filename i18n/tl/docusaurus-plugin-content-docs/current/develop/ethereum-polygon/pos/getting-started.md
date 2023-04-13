---
id: getting-started
title: PoS Bridge
sidebar_label: Introduction
description: Higit na flexibility at mas mabilis na pag-withdraw gamit ang Polygon POS.
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

Pakitingnan ang pinakabagong [dokumentasyon ng Matic.js sa PoS](../matic-js/get-started.md) upang makapagsimula.

Ang bridge ay isang hanay ng mga contract na tumutulong sa paglilipat ng mga asset mula sa root chain patungo sa child chain. Mayroong pangunahing dalawang bridge  upang ilipat ang mga asset sa pagitan ng Ethereum at Polygon. Ang una ay ang tulay ng Plasma at ang ikalawa'y tinatawag na **PoS Bridge** o **Proof Stake bridge**. Ang **Plasma bridge** ay nagbibigay ng mas mataas na garantiya ng seguridad dahil sa Plasma exit mechanism.

Gayunpaman, may ilang partikular na limitasyon ang child token at mayroong 7-araw na panahon ng pag-withdraw na nauugnay sa lahat ng exit/pag-withdraw mula sa Polygon patungo sa Ethereum sa Plasma bridge.

Ito ay medyo masakit para sa mga DApps/user na nangangailangan ng kaunting **flexibility** at **mas mabilis na pag-withdraw** at masaya sa antas ng seguridad na ibinigay ng Polygon Proof-of-Stake bridge, na sinigurado ng isang matatag na hanay ng external validators.

Ang proof of stake based assets ay nagbibigay ng PoS security at mas mabilis na exit na may isang checkpoint interval.

## Mga hakbang sa paggamit ng PoS Bridge {#steps-to-use-the-pos-bridge}

Bago tayo pumasok sa bahaging ito ng mga doc, maaaring makatulong ito na magkaroon ng masusing pag-unawa sa ilang termino habang nakikipag-ugnayan ka sa mga ito habang sinusubukan mong gamitin ang bridge: [Mapping](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) at ang [State Sync Mechanism](https://docs.polygon.technology/docs/pos/state-sync/state-sync/).

Pagkatapos, ang unang hakbang sa paggamit ng tulay ng PoS ay ang the ng **Root Token** at **Child Token**. Nangangahulugan ito na ang kontrata ng token sa root chain at ang kontrata ng token sa chain ng bata ay kailangang magpanatili ng koneksyon (na tinatawag na mapping) para maglipat ng mga asset sa kanilang sarili. Kung interesado kang magsumite ng kahilingan sa pagmamapa, gawin mo na ang paggamit ng [gabay](/docs/develop/ethereum-polygon/submit-mapping-request/) na ito.

Sa mas mababang antas at may mas detalye, ganito ang mangyayari:

### ideposito {#deposit}

  1. Ang may-ari ng asset **(ERC20/ERC721/ERC1155)** token ay kailangang aprubahan ang partikular na contract sa PoS bridge upang gastusin ang halaga ng mga token na ililipat. Ang partikular na contract na ito ay tinatawag na **Predicate Contract** (na-deploy sa Ethereum network) na **nagla-lock ng halaga ng mga token na idedeposito**.
  2. Kapag inaprubahan, ang susunod na hakbang ay **ideposito ang asset**. Kailangang `RootChainManager`gawin ang isang function na tawag sa kontrata na siya namang nag-trigger ng `ChildChainManager`kontrata sa Polygon chain.
  3. Nangyayari ito sa pamamagitan ng mekanismo ng pag-sync ng estado na mauunawaan nang detalyado mula [rito](/docs/pos/state-sync/state-sync/).
  4. Tinatawag ng `ChildChainManager`loob ang `deposit`function ng child token contract at ang kaukulang halaga ng mga asset token ay **minted sa account** ng user. Mahalagang tandaan na lamang ang `ChildChainManager`makaka-access ng `deposit`function sa kontrata ng token ng bata.
  5. Sa sandaling makuha ng user ang mga token, maaari nang **ilipat ang mga ito nang halos agad-agad na may kaunting bayad sa Polygon chain**.

### Mga Withdrawal  {#withdrawals}

  1. Ang pag-withdraw ng mga asset pabalik sa Ethereum ay isang 2-step na proseso kung saan kailangang unang susunugin ang asset token **sa Polygon chain** at saka **kailangang isumite ang patunay ng transaksyon ng sunog na ito** sa Ethereum chain.
  2. Tumatagal nang humigit-kumulang 20 minuto hanggang 3 oras para ma-checkpoint ang burn transaction sa Ethereum chain. Ginagawa ito ng mga Proof of Stake validator.
  3. Kapag naidagdag ang transaksyon sa checkpoint, maaaring isumite ang patunay ng transaksyon ng sunog sa `RootChainManager`Ethereum sa pamamagitan ng pagtawag sa `exit`function.
  4. Bine-verify ng function call na ito **ang pagsasama ng checkpoint** at pagkatapos ay iti-trigger ang Predicate contract na nag-lock sa mga token ng asset noong unang idineposito ang mga asset.
  5. Bilang huling hakbang, nilalabas ng **predicate contract** ang mga naka-lock na token at i-refund ang mga ito sa account ng mga gumagamit sa Ethereum.

:::tip

Kapag tapos na ang pagmamapa, maaari mong gamitin ang **matic.js SDK** upang makipag-ugnayan sa mga contract o magagawa mo rin ito nang wala ang SDK. Gayunpaman, ang matic.js SDK ay idinisenyo sa isang napaka-user-friendly na paraan upang gawing napakadaling isama ang mekanismo ng paglipat ng asset sa anumang application.

:::