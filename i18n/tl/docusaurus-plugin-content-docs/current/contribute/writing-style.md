---
id: writing-style
title: Mga Pangkalahatang Alituntunin sa Pagsusulat
sidebar_label: General writing guidelines
description: Sundin ang mga sumusunod na alituntunin kapag nagsusulat.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - writing
  - contribute
  - style
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: writing-style
---

Ang gabay na ito ay nakatuon sa pinakamahuhusay na kagawian para sa pagsusulat ng teknikal na dokumentasyon at sa mga nakasanayang istilo na gagamitin kapag gumagawa ng dokumentasyon para sa Polygon Wiki.
Ang layunin ng gabay na ito ay matulungan ang mga contributor na magsulat ng content na malinaw, hindi paligoy-ligoy,
at hindi pabago-bago. Itinuturing ng team ng Polygon ang Polygon Wiki bilang opisyal na produkto ng Docs.

## Mga pangunahing alituntunin {#primary-guidelines}

Naniniwala kami na ang isa sa mga bagay na nagpapaespesyal sa Polygon ay ang madaling maunawaang disenyo nito at
gusto naming panatilihin ang napakahalagang katangiang ito. Itinuturing ng team ng Polygon ang Polygon Wiki
bilang opisyal na produkto ng Docs. Sa simula pa lang ay tinukoy namin ang ilang mga alituntunin upang matiyak na ang mga bagong
kontribusyon ay magpapahusay lang sa pangkalahatang proyekto:

- **Kalidad**: Ang code sa proyekto ng Polygon ay tumutugma dapat sa mga alituntunin sa istilo na may
sapat na mga test-case, mga naglalarawang commit message, ebidensya na ang kontribusyon
ay hindi lumalabag sa anumang compatibility commitment o magdudulot ng hindi magagandang interaksyon sa feature,
at ebidensya ng mataas na kalidad na pagsusuri ng peer.
- **Laki**: Ang kultura ng mga proyekto ng Polygon ay isa sa maliliit na pull-request, na regular na
isinusumite. Kapag mas malaki ang isang pull-request, mas malamang na hihilingin sa iyo
na magsumite ulit ng serye ng mas maliliit na PR na self-contained at nasusuri nang mag-isa.
- **Kakayahang Ma-maintain**: Kung ang feature ay mangangailangan ng regular na maintenance (hal. suporta
para sa partikular na brand ng database), maaari naming hilingin sa iyong tanggapin ang responsibilidad para sa
pag-maintain ng feature na ito.

Ang Gabay sa istilo ay batay sa mga sumusunod na manual ng istilo:

> Kung hindi mo mahanap sa gabay na ito ang sagot sa isang tanong tungkol sa istilo, boses, o termino,
> kumonsulta sa mga resource na ito.

- [Gabay sa Istilo ng Google](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md)
- [Ang Oxford Style Manual](https://global.oup.com/academic/product/new-oxford-style-manual-9780198767251?cc=nl&lang=en&)
- [Ang Microsoft Manual of Style](https://docs.microsoft.com/en-us/style-guide/welcome/)

### Static-site generator {#static-site-generator}

Ginawa ang Wiki gamit ang [Docusaurus](https://docusaurus.io/), na isang static-site generator para sa
paggawa ng mga site ng dokumentasyon sa markdown. Sinusunod ng Wiki ang sumusunod na template ng metadata
para sa mga markdown file na ito at dapat itong iangkop para sa bawat bagong dokumento:

```
---
id: wiki-maintainers
title: Wiki Maintainers
sidebar_label: Maintainers
description: A list of Polygon Wiki maintainers
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - docs
  - maintainers
  - contributors
image: https://matic.network/banners/matic-network-16x9.png
slug: community-maintainers
---
```

Mayroong ilang mahalagang aspeto na dapat isaalang-alang kapag isinusulat ang metadata para sa isang markdown file:
- Hinihiling namin sa mga contributor na gumamit ng **natatanging id**; iwasang gumamit **lang** ng mga karaniwang salita o pangungusap gaya ng "Panimula" o "Pangkalahatang-ideya".
- Ang **pamagat** ay ang pangungusap na ginagamit sa simula ng artikulong "Mga Pangkalahatang Alituntunin sa Pagsusulat" para sa artikulong ito. Kaya hindi kinakailangang magdagdag ng H1/H2 na header para ipakilala ang bawat artikulo. Sa halip, gamitin ang **pamagat** na ito mula sa metadata.
- Ang **paglalarawan** ay hindi maaaring masyadong mahaba, dahil ginagamit ito sa mga tile ng index na may limitasyon sa bilang ng mga character. Halimbawa, ang paglalarawan na "Ang Blockchain ay isang immutable ledger para sa pag-record ng mga transaksyon" para sa *basics-blockchain.md* ay lumalabas sa isang tile ng index tulad ng:
![img](/img/contribute/index-tile.png)

  Kaya ang **paglalarawan** ay dapat magkaroon ng **hanggang 60 character**, kabilang ang mga espasyo sa pagitan ng mga character.
- Mahalaga ang mga keyword para mapahusay ang SEO at mailarawan ang artikulo. Subukang magkaroon ng kahit limang keyword man lang.

:::note

Pakitingnan ang
[opisyal na dokumentasyon ng metadata](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) para sa higit pang detalye.

:::

### Ibahagi sa mambabasa ang karanasan {#share-the-experience-with-the-reader}

- First Person: Huwag gumamit ng "Ako". Huwag masyadong gumamit ng first person na point of view at
huwag itong intensyonal na gamitin. Kapag sobrang ginamit, ang first person na pagsasalaysay ay maaaring magdulot ng labis na pakiramdam ng isang
ibinahaging karanasan at makagulo sa paglalakbay ng mambabasa.
- Second Person: Sa pangkalahatan, direktang kausapin ang mambabasa. Para sa mga tutorial, gumamit ng first
peron na plural—kami, namin, amin—o ng second person na point of view. Dahil ang mga tutorial ay nagbibigay ng
mas gumagabay na diskarte sa isang paksa, ang first person na plural ay isang mas natural at
karaniwang tinatanggap na kagawian kaysa sa iba pang uri ng dokumentasyon.
- Third Person: Huwag gumamit ng "kami" para tukuyin ang Polygon o Polygon Technology.
- Active Voice: Gumamit ng pangkasalukuyang panahunan (present tense) hangga't maaari. Mayroong mga sitwasyon kung saan ang passive
voice ay angkop; bumalik sa passive voice kapag kailangang maging focus ang agent.
- Tandaan ang presensya ng tao: kapag gumagamit ng dynamic na tono kapag naglalarawan ng mga teknikal na konsepto,
lubos na natutulungan ang mambabasa na makakonekta sa materyal kumpara sa paglalarawan sa
ginagawa lang ng software (o code).
- Mga Panghalip: gumamit ng mga gender-neutral na panghalip, tulad ng "they" hangga't maaari. Sa karaniwan, maaari mong
gawing plural mula sa singular ang anumang pangngalan para masunod ang subject-verb pronoun agreement at iwasan ang
gumamit ng mga gender-specific na panghalip tulad ng "he", "him", "his" o "she," "her," "hers".
  - Mag-ingat sa mga hindi pantao at posibleng hindi tiyak na panghalip. Kung gumagamit ka ng alinman sa mga sumusunod na
  hindi pantaong panghalip, tiyaking sagutin ang "ng ano?", "ng alin?", o "bilang ano?" sa pangungusap.
    - lahat, iba, anuman
    - bawat isa, alinman
    - ilan, marami, wala,
    - isa, iba pa
    - pareho, ilan, tulad ng
    - iyon, sila, mga ito, mga iyon

### Pagiging mabilis at maigsi {#being-swift-and-concise}

- Ang dokumentasyon ay mabisa at makabuluhan kapag ginagamit ang mga kinakailangang salita at tamang parirala.
  - Gumamit ng mga karaniwan at kilalang salita hangga't maaari.
  - Umiwas sa mabulaklak na salita at mga labis na pampanitikang parirala.
  - Umiwas sa jargon, mga kolokyalismo, at mga idiyomatikong parirala.
  - Umiwas sa mga pang-abay at mga subjective na pahayag. Halimbawa, huwag gumamit ng mga salita at parirala na may
  madali, mabilis, lang, daglian. Kung kinakailangan, mas mahusay din mag-underexaggerate sa halip na
  mag-overexaggerate.
  - Huwag gumamit ng mga pariralang nagiging sanhi ng pagiging malabo. Halimbawa, sa halip na "Kapag live ang release na ito...” gamitin ang “Pagkatapos maging live ng release na ito...”.
  - Maging mas maingat sa pagpili ng salita. Pagpiling gamitin ang “noong” (na nagpapahiwatig ng yugto ng panahon) sa halip na
  “dahil” (na nagpapahiwatig ng sanhi at bunga) o paggamit ng “minsan” (isang beses na pangyayari) sa halip na “pagkatapos”
  (bawat pagkakataon).
  - Iwasan ang mga tandang padamdam.
- Iwasang magdagdag ng mga hindi kinakailangang salita o parirala. Ilang halimbawa:
  - Sa halip na sabihin ang “at pagkatapos”, gamitin lang ang “pagkatapos”.
  - Sa halip na sabihin ang “Nang sa gayon”, gamitin na lang ang “para”.
  - Sa halip na sabihin ang “pati na”, gamitin na lang ang “at”.
  - Sa halip na sabihin ang “via”, gumamit ng naaangkop na salita sa Tagalog tulad ng “sa pamamagitan ng” o “gamit ang”.
- Gumamit ng conversational tone na hindi masyadong pormal, ngunit dapat pa ring maging propesyonal.
- Linaw: bigyang-buhay ang salita o parirala hangga't maaari. Halimbawa:
  - Sa halip na sabihin ang “hal.”, gamitin ang “halimbawa”.
  - Sa halip na sabihin ang “i.e.”, gamitin ang “ibig sabihin” o kaya baguhin ang paraan ng pagkakasulat sa pangungusap para linawin ang mensaheng gustong iparating nang hindi
  nangangailangan ng dagdag na kuwalipikasyon.
  - Sa halip na sabihin ang “atbp.”, gamitin ang “at iba pa” o baguhin ang nilalaman para hindi na kailangang gamitin ang termino. Sa halip
  na “atbp.” para tapusin ang isang listahan ng mga halimbawa, mag-focus sa isa o dalawang halimbawa at gamitin ang “tulad ng” o "gaya ng".
  - Sa halip na “caveat”, gumamit ng naaangkop na kapalit na salita sa Tagalog gaya ng “paunawa”, “mag-ingat”, o “babala”.
  - Ang mga contraction ay nagbibigay sa dokumentasyon ng mas natural na conversational tone—para sa mga nagsasalita sa Tagalog sa partikular.
  Maging alerto kung kailan at kung bakit ka gumagamit ng mga contraction.

## Istruktura {#structure}

Dapat isaayos ang mga dokumento ayon sa mga seksyon. Ang bawat seksyon ay may tungkulin dapat na
maglahad ng tema o paksa. Sa bawat seksyon, magkakaroon ng isa o higit pang talata.
Iisang ideya lang dapat ang ipinapabatid ng bawat talata. Subukang iwasang ulitin ang magkakaparehong ideya
sa iba't ibang seksyon, at hatiin ang mga talatang maraming tinatalakay na punto.
Dapat maunawaan ng mambabasa kung tungkol saan ang isang talata mula sa unang pangungusap nito.

## Dokumentasyon ng produkto {#product-documentation}

Kung nagsusulat ka tungkol sa isang partikular na produkto, siguraduhing ang dokumento ay kaugnay sa
produkto. Dati, ang dokumentasyon ng Polygon ay naka-generalize, batay sa Polgon PoS.
Ngayong marami nang Polygon-based na produkto, ang mga contributor ay kailangang mag-ingat sa kanilang
mga idinaragdag.

Halimbawa, ang "Pag-deploy ng smart contract sa Polygon gamit ang ####" ay hindi malinaw. Kung ang tutorial na ito
ay tumutukoy sa Polygon PoS, dapat itong maging malinaw, tulad ng,
"Pag-deploy ng smart contract sa Polygon PoS gamit ang ####". Narito pa ang katulad na halimbawa gamit ang
Polygon Rollup, tulad ng Polygon Hermez, "Pag-deploy ng smart contract sa Polygon Hermez gamit ang ####".

Tiyaking ang dokumentasyon ng produkto, ito man ay pangkalahatang gabay o tutorial, ay nakalagay
sa tamang Hub ng dokumentasyon ng produkto. Para sa karamihan ng mga dokumento, ang kanilang sanggunian nasa ilalim dapat ng
isa sa mga pangkalahatang Hub (hal. "Develop" o "Validate"), ngunit ang aktwal na dokumento
ay mapapailalim sa dokumentasyon ng produkto nito. Kakailanganin mo banggitin ang dokumento sa Hub sa pamamagitan ng
pagdaragdag nito sa `sidebars.js`.
Gayunpaman, ang aktwal na dokumento mismo ay magiging nasa kaukulang Hub nito ng dokumentasyon ng produkto,
at ire-redirect nito ang user kapag nag-click siya rito. Nalalapat ang parehong alituntunin sa karamihan ng
mga dokumento. Ang sanggunian ng mga ito ay nasa ilalim dapat ng isa sa mga pangkalahatang Hub, ngunit ang aktwal na dokumento
ay mapapailalim sa dokumentasyon ng produkto nito.

Ang karamihan ng API-based na dokumentasyon sa Wiki ng Polygon ay
dokumentasyong sanggunian, maliban sa mga API na nabanggit sa mga tutorial.
Halimbawa, ang dokumentasyon ng API sa Matic.js ay nagbibigay ng impormasyon tungkol sa
istruktura, mga parameter, at mga return value para sa bawat function o paraan sa API.

## Dokumentasyon ng API {#api-documentation}

Isaalang-alang ang sumusunod kapag nagdodokumento ng API:

* Isang maayos na panimula na nagbibigay ng starting point.
* Isang malinaw na paglalarawan ng call o kahilingan. Ilarawan ang ginagawa ng endpoint.
* Isang kumpletong listahan ng parameter:
  * Mga uri ng parameter
  * Mga syntax expression na may mga placeholder na nagpapakita ng mga available na parameter
  * Espesyal na formatting
* Mga halimbawa ng code para sa maraming language.
* Isang sample na call na may inaasahang output.
* Mga Error Code. Mga edge case.
* Mga tagubilin sa kung paano kunin ang mga API key, kung kinakailangan.
* Palaging kapaki-pakinabang na magtala ng mga karaniwang FAQ o scenario.
* Mga link sa mga karagdagang resource tulad ng mga post sa social media, blog, o video content.
