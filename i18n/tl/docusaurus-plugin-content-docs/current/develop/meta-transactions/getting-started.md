---
id: meta-transactions
title: Mga Meta na Transaksyon
sidebar_label: Overview
description: Alamin ang mga meta na transaksyon at kung paano mo magagamit ang mga ito.
keywords:
  - docs
  - polygon
  - matic
  - transactions
  - meta transactions
  - gasless
image: https://matic.network/banners/matic-network-16x9.png
slug: meta-transactions
---

Pinakamataas ang mga pang-araw-araw na call para sa smart na kontrata, na umaabot sa humigit-kumulang 2.5 hanggang 3 milyon bawat araw.
Nagsisimula nang mapansin ang gamit ng mga DApp ngunit nagiging biktima ng kanilang tagumpay o ng’
tagumpay ng iba dahil sa mga gas fee. Bukod pa rito, ang mga hadlang sa onboarding ng mga user at ang mga hamon ng kasalukuyan
Hindi madaling ayusin ang UX.

## Pagseserbisyo sa Mga smart na kontrata {#servicing-smart-contracts}

Sa pamamagitan ng disenyo, mga deterministong machine ng kalagayan ang mga smart na kontrata na ipinapatupad kapag ang mga bayarin sa transaksyon ay
binabayaran para magbigyang-serbisyo ang mga lohika ng kontrata sa pamamagitan ng paggamit ng mga mapagkukunang computational ng network.
Nagagawa ito sa pamamagitan ng modelong sinusukat ng gas sa Ethereum (at Polygon).

## Ang Kasalukuyang Kalagayan ng Pag-transact {#the-current-state-of-transacting}

May mga limitasyon sa tradisyunal na modelo ng transaksyon na ito sa Ethereum (at iba pang blockchain).
Karaniwang limitasyon ay ang user na walang paraan upang bayaran ang gas. Bilang default, ang nagpadala ng
transaksyon ay gumaganap bilang nagbabayad, dahil ang mga gawi na ito ay pinagsama. Kaya naman, kung sumubok ang user na gumawa at ipadala
ang transaksyon, responsable sila para sa nauugnay na mga gas fee. Gayundin, kung ang  user ay bumuo, nakikipag-ugnayan
o nagpapatakbo ng dApp, kinakailangang bayaran ng user ang gas.

Hindi makatotohanang asahan ang karaniwang user na bumili ng crypto at bayaran ang gas upang makipag-interaksyon sa
application. Ang maaaring gawin upang matugunan ito ay ang pag-decouple ng nagpadala ng transaksyon mula sa pagkilos
bilang nagbabayad. Nagbibigay-daan ang pagkakataong ito na i-scale ang pagsasagawa ng transaksyon at simulan ang tuluy-tuloy na transaksyon
na karanasan.

Sa halip na direktang pagsasagawa ng transaksyon, magkakaroon ng middleware (sa pamamagitan ng third party) upang mapangasiwaan ang gas.
Dito pumapasok ang mga meta na transaksyon.

## Ano ang mga Meta na Transaksyon? {#what-are-meta-transactions}

Pinapahintulutan ng mga Meta na transaksyon ang sinuman na makipag-interaksyon sa blockchain. Hindi nila hinihiling na magkaroon ang mga user ng
mga token para bayaran ang mga serbisyo ng network sa pamamagitan ng mga bayarin sa transaksyon. Ginagawa ito sa pamamagitan ng pag-decouple ng
nagpadala ng transaksyon at ng nagbabayad ng gas.

Isang solusyon na maaaring mag-onboard ng mga bagong user at makakatulong sa mga kasalukuyan.

Kumilos ang tagapagpatupad ng transaksyon bilang nagpadala. Sa halip na gumastos ng gas, gumawa lamang sila ng
kahilingan sa transaksyon sa pamamagitan ng paglagda sa kanilang nilalayon na pagkilos (ang mga parameter ng transaksyon) gamit ang kanilang pribadong
key. Ang meta na transaksyon ay regular na transaksyon sa Ethereum na may kasamang mga karagdagang parameter na gagawin
ang meta na transaksyon.

Ang mga nilagdaang parameter ng transaksyon ay ipinapasa sa isang pangalawang network, na gumaganap bilang relayer.
Habang may iba't ibang scheme para dito, pumipili ang mga relayer kung aling mga transaksyon ang puwedeng
isumite sa pamamagitan ng pag-validate sa transaksyon (hal., pagiging may-katuturan sa dApp). Sa pag-validate, ang relayer
ay magwra-wrap ng kahilingan (ang nilagdaang mensahe) sa aktwal na transaksyon (na nangangahulugan ng pagbabayad ng bayarin sa gas)
at i-broadcast ito sa network, kung saan binubuksan ng kontrata ang transaksyon sa pamamagitan ng pag-validate sa orihinal
na lagda at isinasagawa ito sa ngalan ng user.

:::note Ang mga salitang meta at batch ay maaaring magkahalintulad para sa ilan

Upang linawin: ang meta na transaksyon ay iba sa batch na transaksyon, kung saan ang  batch na transaksyon ay
transaksyon na puwedeng ipadala ang maramihang transaksyon nang minsanan at na maisasagawa ng i nagpadala
(i hindi tinukoy) sa pagkakasunud-sunod.

:::

Sa buod, ang mga meta na transaksyon ay isang pattern ng disenyo kung saan:

* Ang isang user (nagpadala) ay pumirma ng kahilingan gamit ang kanilang pribadong key at ipinapadala ito sa isang relayer
* Binabalot ng relayer ang kahilingan sa tx at ipinapadala ito sa isang kontrata
* Binubuksan ng kontrata ang tx at isinasakatuparan ito

Ang mga native na transaksyon ay nagpapahiwatig na ang "nagpadala" ay siya ring "nagbabayad". Kapag inaalis ang "nagbabayad" mula sa
ang "nagpadala", ang "nagpadala" ay nagiging mas katulad ng "naglalayon" - ipinapakita ng nagpadala ang layunin ng transaksyon
gusto nilang ipatupad sa blockchain sa pamamagitan ng pagpirma ng mensaheng naglalaman ng mga partikular na parameter na nauugnay sa
kanilang mensahe, at hindi isang ganap na ginawang transaksyon.

## Gamitin ang Mga Kaso {#use-cases}

Maiisip ng isa ang mga kakayahan ng mga meta na transaksyon para sa pag-scale ng mga dApp at pakikipag-ugnayan sa mga smart na kontrata.
Hindi lamang makakagawa ang user ng transaksyong walang gas fee, ngunit magagawa rin nila ito nang maraming beses, at sa pamamagitan ng automation
tool, maaaring maimpluwensyahan ng mga meta na transaksyon ang susunod na wave ng mga application para sa mga praktikal na kaso ng paggamit. Mga meta na transaksyon
na i-enable ang tunay na utility sa lohika ng smart na kontrata, na kadalasang limitado dahil sa mga gas fee at mga interaksyon
na kinakailangang on-chain.

### Halimbawa sa pagboto {#example-with-voting}

Gusto ng user na lumahok sa on-chain na pamamahala, at nilalayon nilang bumoto para sa isang partikular na resulta sa pamamagitan ng
kontrata ng pagboto. Lalagdaan ng user ang mensahe na nagsasaad ng desisyon ng user sa boto sa partikular na
kontrata. Ayon sa kaugalian, kakailanganin nilang bayaran ang gas fee para sa pakikipag-ugnayan sa kontrata (at alam kung paano
makipag-interaksyon sa kontrata), ngunit sa halip, maaari nilang lagdaan ang meta na transaksyon (off-chain) gamit ang kinakailangang
impormasyon para sa kanilang boto at ipasa ito sa relayer na magsasagawa ng transaksyon sa kanilang ngalan.

Ang nilagdaang mensahe ay ipapadala sa relayer (ang nilagdaang tx params tungkol sa impormasyon sa pagboto). Ang relayer
ay ang nagva-validate na priyoridad na pagboto ang transaksyong ito, binabalot ang kahilingan sa pagboto sa isang aktwal na transaksyon,
nagbabayad ng mga gas fee, at ipinapalabas ito sa kontrata sa pagboto. Sinusuri ang lahat sa bahagi ng kontrata sa pagboto
at isinasagawa ang boto sa ngalan ng user.

## Subukan ang Mga Ito {#try-them-out}

Ipagpalagay na pamilyar ka sa iba't ibang paraan na maaari mong gawin upang maisama ang mga meta na transaksyon sa iyong
dApp. At depende sa kung lilipat ka sa mga meta na transaksyon o bumubuo ng bagong dApp ang paggamit nito.

Upang isama ang iyong dApp sa Mga Meta na Transaksyon sa Polygon, maaari kang pumiling sumama sa isa sa mga sumusunod
relayer o bumuo ng custom na solusyon:

* [Biconomy](https://docs.biconomy.io/products/enable-gasless-transactions)
* [Network ng Gas Station (GSN)](https://docs.opengsn.org/#ethereum-gas-station-network-gsn)
* [Infura](https://infura.io/product/ethereum/transactions-itx)
* [Gelato](https://docs.gelato.network/developer-products/gelato-relay-sdk)
