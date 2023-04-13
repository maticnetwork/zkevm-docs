---
id: optimisticoracle
title: UMA's Oracle ng UMA.
sidebar_label: UMA
description: Pinapayagan ng Optimistic Oracle ng UMA ang mga kontrata na mabilis na humiling at tumanggap ng anumang uri ng data
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Pinapayagan ng Optimistic Oracle ng UMA ang mga kontrata na mabilis na humiling at makatanggap ng anumang uri ng data. Ang sistema ng oracle ng UMA ay binubuo ng dalawang pangunahing bahagi:

1. Optimistikong Oracle
2. Mekanismo sa Pagpapatunay ng Data (DVM)

## Optimistic Oracle {#optimistic-oracle}

Pinapayagan ng **Optimistic Oracle** ng UMA ang mga kontrata na mabilis na humiling at makatanggap ng impormasyon sa presyo. Gumaganap ang Optimistic Oracle bilang generalized na laro ng pagdami sa pagitan ng mga kontrata na nag-initiate ng isang kahilingan sa presyo at sistema ng resolusyon ng UMA na kilala bilang Data Verification Mechanism (DVM).

Ang mga presyong iminungkahi ng Optimistic Oracle ay hindi ipapadala sa DVM maliban kung ito ay pinagtatalunan. Pinapayagan nito ang mga kontrata na makakuha ng impormasyon ng presyo sa anumang naunang tinukoy na haba ng oras nang hindi sinusulat ang presyo ng isang asset on-chain.

## Mekanismo ng Pag-verify ng Data (DVM) {#data-verification-mechanism-dvm}

Kung ang hindi pagkakaunawaan ay itinaas, ang kahilingan ay ipapadala sa DVM. Ginagamit ng lahat ng kontratang binuo sa UMA ang DVM bilang backstop upang malutas ang mga hindi pagkakaunawaan. Ang mga hindi pagkakaunawaan na ipinadala sa DVM ay malulutas 48 oras pagkatapos bumoto ng mga may hawak ng token ng UMA sa presyo ng asset sa partikular na oras. Hindi kailangang gamitin ng mga kontrata sa UMA ang Optimistic Oracle maliban kung nangangailangan ito ng presyo ng asset na mas mabilis sa 48 oras.

Ang Mekanismo sa Pagpapatunay ng Data (DVM) ay ang serbisyo sa pagresolba ng hindi pagkakaunawaan para sa mga kontratang binuo sa UMA Protocol. Makapangyarihan ang DVM dahil sumasaklaw ito sa elemento ng paghatol ng tao upang matiyak na ang mga kontrata ay ligtas at wastong pinamamahalaan kapag lumitaw ang mga isyu mula sa pabago-bago (at kung minsan ay mamanipula) na mga merkado.

## Optimistic Oracle Interface {#optimistic-oracle-interface}

Ang Optimistic Oracle ay ginagamit ng mga kontrata sa pananalapi o anumang ikatlong partido upang kunin ang mga presyo. Kapag humiling ng presyo, maaaring magmungkahi ang sinuman ng presyo bilang tugon. Kapag na-propose na, dadaan ang presyo sa isang liveness period kung saan maaaring i-dispute ng sinuman ang iminungkahing presyo at ipadala ang pinagtatalunang presyo sa UMA DVM para sa
kasunduan.

:::info

Ipinapaliwanag ng seksyong ito kung paano maaaring makipag-ugnayan ang iba't ibang kalahok sa Optimistic Oracle. Upang tingnan ang pinaka-updated na mainnet, kovan o L2 deployment ng mga Optimistic Oracle na kontrata, sumangguni sa mga address ng [produksyon](https://docs.umaproject.org/dev-ref/addresses).

:::

Mayroong labindalawang pamamaraan na bumubuo sa Optimistiko Oracle interface.
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

Humihiling ng bagong presyo. Dapat ito ay para sa nakarehistrong tagatukoy ng presyo. Tandaan na awtomatiko itong kino-call ng karamihan sa mga kontrata sa pananalapi na nakarehistro sa system ng UMA, ngunit maaaring i-call ng sinuman para sa anumang nakarehistrong tagatukoy ng presyo. Halimbawa, kino-call ng kontrata ng Expiring Multiparty (EMP) ang paraang ito kapag `expire` kino-call ang paraan nito.

Mga Parameter:
- `identifier`: tagatukoy ng presyo na hinihiling.
- `timestamp`: time stamp ng presyong hinihiling.
- `ancillaryData`: karagdagang data na kumakatawan sa mga karagdagang argumento na ipinapasa kasama ng kahilingan sa presyo.
- `currency`: ERC20 token na ginagamit para sa pagbabayad ng mga gantimpala at bayarin. Dapat aprubahan para magamit sa DVM.
- `reward`: gantimpala na inaalok sa matagumpay na tagapanukala. Babayaran ng tumatawag. Note: ito ay maaaring 0.

### proposePrice {#proposeprice}

Nagmumungkahi ng value ng presyo para sa umiiral na kahilingan sa presyo.

Mga Parameter:
- `requester`: nagpadala ng paunang kahilingan sa presyo.
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.
- `proposedPrice`: presyo na iminungkahi.

### disputePrice {#disputeprice}

Pinagtatalunang value ng presyo para sa umiiral na kahilingan sa presyo na may aktibong panukala.

Mga Parameter:
- `requester`: nagpadala ng paunang kahilingan sa presyo.
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.

### mag-settle {#settle}

Mga pagtatangka upang ayusin ang isang natitirang kahilingan sa presyo. Babalikan kung hindi ito be

Mga Parameter:
- `requester`: nagpadala ng paunang kahilingan sa presyo.
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.

### hasPrice {#hasprice}

Tinitingnan kung ang ibinigay na kahilingan ay nalutas o naayos na (ibig sabihin, may presyo ang optimistic oracle).

Mga Parameter:
- `requester`: nagpadala ng paunang kahilingan sa presyo.
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.

### getRequest {#getrequest}

Kinukuha ang kasalukuyang istruktura ng data na naglalaman ng lahat ng impormasyon tungkol sa kahilingan sa presyo.

Mga Parameter:
- `requester`: nagpadala ng paunang kahilingan sa presyo.
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.

### settleAndGetPrice {#settleandgetprice}

Kinukuha ang presyo na dati nang hiniling ng nag-call. Ire-revert kung ang kahilingan ay hindi naayos o naaayos. Note: hindi navie-view ang paraang ito kaya maaaring aktwal na ayusin ng call na ito ang kahilingan sa presyo kung hindi pa ito naaayos.

Mga Parameter:
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.

### setBond {#setbond}

Itakda ang panukalang bond na nauugnay sa kahilingan sa presyo.

Mga Parameter:
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.
- `bond`: custom na halaga ng bond na itatakda.

### setCustomLiveness {#setcustomliveness}

Nagtatakda ng custom na liveness ng value para sa kahilingan. Ang liveness ay ang tagal ng oras na dapat maghintay ang panukala bago ito awtomatikong malutas.

Mga Parameter:
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.
- `customLiveness`: bagong custom ng liveness.

### setRefundOnDispute {#setrefundondispute}

Itinatakda ang kahilingan na i-refund ang gantimpala kung pinagtatalunan ang panukala. Makakatulong ito na "iwasan" ang nagko-call sakaling magkaroon ng pagkaantala na sanhi ng hindi pagkakaunawaan. Note: kung sakaling magkaroon ng hindi pagkakaunawaan, natatanggap pa rin ng nanalo ang bond ng isa, kaya may kikitain pa rin kahit na na-refund ang gantimpala.

Mga Parameter:
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.

### disputePriceFor {#disputepricefor}

Dini-dispute ang kahilingan sa presyo s aktibong panukala sa ngalan ng isa pang address. Note: makakatanggap ang address na ito ng anumang gantimpala na magmumula sa hindi pagkakaunawaan na ito. Gayunpaman, nakuha mula sa nagko-call ang anumang bond.

Mga Parameter:
- `disputer`: address na itatakda bilang ang nakikipagtalo.
- `requester`: nagpadala ng paunang kahilingan sa presyo.
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.

### proposePriceFor {#proposepricefor}

Nagmumungkahi ng value ng presyo sa ngalan ng isa pang address. Note: makakatanggap ang address na ito ng anumang gantimpala na magmumula sa hindi pagkakaunawaan na ito. Gayunpaman, nakuha mula sa nagko-call ang anumang bond.

Mga Parameter:
- `proposer`: address na itatakda bilang tagapanukala.
- `requester`: nagpadala ng paunang kahilingan sa presyo.
- `identifier`: tagatukoy ng presyo upang matukoy ang umiiral na kahilingan.
- `timestamp`: timestamp para matukoy ang umiiral na kahilingan.
- `ancillaryData`: karagdagang data ng presyong hinihiling.
- `proposedPrice`: presyo na iminungkahi.

## Pag-integrate sa Optimistic Oracle {#integrating-the-optimistic-oracle}

Magse-set up ang demo na ito ng `OptimisticDepositBox` na kontrata na nag-iingat sa balanseng token na ERC-20 ng user.

Sa lokal na testnet blockchain, idedeposito ng user ang wETH (Wrapped Ether) sa kontrata at iwi-withdraw ang wETH na denominasyon sa USD. Halimbawa, kung gusto ng user na i-withdraw ang $10,000 USD of wETH, and the ETH/USD exchange rate is $2,000, iwi-withdraw nila ang 5 wETH.

* Ini-link ng user ang `OptimisticDepositBox` sa isa sa mga tagatukoy ng presyo na in-enable sa DVM.

* Nagdeposito ang user ng wETH sa `OptimisticDepositBox` at inirehistro ito gamit ang `ETH/USD` na tagatukoy ng presyo.

* Maaari na ngayong i-withdraw ng user ang USD-denominated na halaga ng wETH mula sa kanilang `DepositBox` sa pamamagitan ng mga call sa smart na kontrata, na may Optimistic Oracle na nag-enable sa optimistic on-chain na pagpepresyo.

Sa halimbawang ito, hindi sana mailipat ng user ang mga value ng wETH na may denominasyon sa USD nang hindi nagre-refer ng off-chain na `ETH/USD` feed ng presyo. Nagbibigay-daan ang Optimistic Oracle sa user, samakatwid, na "hilahin" ang reference ng presyo.

Hindi tulad ng mga kahilingan sa presyo sa DVM, maaaring malutas ang kahilingan sa presyo sa Optimistic Oracle sa loob ng tinukoy na window ng liveness kung walang mga hindi pagkakaunawaan, na maaaring mas maikli kaysa sa panahon ng pagboto ng DVM. Maaaring i-configure ang window ng liveness, ngunit karaniwang dalawang oras, kumpara sa 2-3 araw para sa settlement sa pamamagitan ng DVM.

Hindi kasalukuyang kinakailangan ng humihiling ng presyo na bayaran ang mga bayarin sa DVM. Maaaring mag-alok ang humiling ng gantimpala para sa tagapanukala na tumugon sa kahilingan sa presyo, ngunit nakatakda ang value ng gantimpala sa `0` sa halimbawang ito.

Nag-post ng bond ang tagapanukala ng presyo kasama ang kanilang presyo, na ire-refund kung hindi pinagtatalunan ang presyo, o kung nalutas ang hindi pagkakaunawaan na pabor ng tagapanukala. Kung hindi, ginagamit ang bond na ito upang bayaran ang huling bayad sa DVM at magbayad ng gantimpala sa matagumpay na nakipagtalo.

Sa demo, hindi nangangailangan na humiling ng karagdagang bond mula sa tagapanukala ng presyo, kaya katumbas ang kabuuang nai-post na bond ng panghuling bayad sa wETH na umiiral na 0.2 wETH. Tingnan ang `proposePriceFor` na function sa `OptimisticOracle` [na kontrata](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html) para sa mga detalye ng pagpapatupad.

## Patakbuhin ang Demo {#running-the-demo}

1. Tiyaking sinunod mo ang lahat ng kinakailangang hakbang sa pag-setup [dito](https://docs.umaproject.org/developers/setup).
2. Patakbuhin ang lokal na halimbawa ng Ganache (i.e. hindi Kovan/Ropsten/Rinkeby/Mainnet) gamit ang `yarn ganache-cli --port 9545`
3. Sa isa pang window, i-migrate ang mga kontrata sa pamamagitan ng pagpapatakbo ng sumusunod na command:

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. Upang i-deploy ang `OptimisticDepositBox` [na kontrata](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) at dumaan sa simpleng daloy ng user, patakbuhin ang sumusunod na demo script mula sa root ng repo:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

Dapat mong makita ang sumusunod na output:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## Pagpapaliwanag sa Mga Pag-andar ng Kontrata {#explaining-the-contract-functions}

Ipinapakita ng `OptimisticDepositBox`c[ontract code ](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)kung paano makipag-ugnayan sa Oracle.

Kasama sa `constructor`function ang isang `_finderAddress`argument para sa kontrata ng UMA, na nagpapanatili ng isang registry ng `OptimisticOracle`address, naaprubahang collateral at price identifier whitelist, at iba pang mahahalagang address ng `Finder`kontrata.

Nagbibigay-daan ito sa `constructor` na tingnan ang uri ng collateral at ang tagatukoy ng presyo at nagpapahintulot na `OptimisticDepositBox` makipag-interaksyon sa `OptimisticOracle` sa bandang huli.

Kasama sa `requestWithdrawal` na function ang panloob na call sa `OptimisticOracle` na humihiling ng `ETH/USD` sa presyo. Kapag pag-withdraw na, call ang user `executeWithdrawal`para makumpleto ang pag-withdraw.

Maraming karagdagang impormasyon at paliwanag sa mga komento ng code, kaya tingnan kung interesado kang mag-aral nang higit pa.

## Mga Karagdagang Mapagkukunan {#additional-resources}

Narito ang ilang karagdagang mapagkukunan tungkol sa UMA DVM:

- [Teknikal na Arkitektura](https://docs.umaproject.org/oracle/tech-architecture)
- [Arkitekturang Pang-ekonomiya](https://docs.umaproject.org/oracle/econ-architecture)
- [Blog post](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) sa DVM design ng UMA
- [Whitepaper](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) sa disenyo ng DVM ng UMA
- [Research repo](https://github.com/UMAprotocol/research) para sa bayad na patakaran sa optimal na bayad
- [UMIP repo](https://github.com/UMAprotocol/UMIPs) para sa mga panukala sa pamamahala
