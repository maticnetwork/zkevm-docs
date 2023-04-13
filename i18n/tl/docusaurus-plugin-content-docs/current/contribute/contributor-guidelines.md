---
id: contributor-guidelines
title: Paano Mag-ambag
sidebar_label: Contributor guidelines
description: Maghanda para sa iyong paparating na ambag
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip
Huwag mag-atubiling [magtaas ng isyu sa aming repository ng Polygon Wiki](https://github.com/maticnetwork/matic-docs/issues)
:::

## Tumukoy ng aspeto kung saan Mag-aambag {#identify-an-area-to-contribute-to}

May ilang paraan para tumukoy ng aspeto kung saan ka maaaring mag-ambag sa Wiki:

- Ang pinakamadali ay ang makipag-ugnayan sa isa sa mga [maintainer ng Wiki](/docs/contribute/community-maintainers) 
at sabihing “Gusto kong tumulong na mag-ambag sa Wiki ng Polygon”. Makikipagtulungan sila sa iyo na maghanap
ng aspeto kung saan ka maaaring mag-ambag.
- Kung mayroon kang naiisip na partikular na iaambag ngunit hindi ka sigurado tungkol dito, kumpirmahin kung
ang ambag ay naaangkop sa pamamagitan ng direktang pakikipag-ugnayan sa isa sa [mga maintainer ng Wiki](/docs/contribute/community-maintainers).
- Kung wala kang naiisip na partikular na maiaambag, maaari mo ring i-browse ang mga isyu
na may label na `help wanted` sa [mga Polygon Github repo](https://github.com/maticnetwork).
- Ang mga isyu na may karagdagang label `good first issue` ay itinuturing na naaangkop para sa
mga baguhan.

## Magdagdag sa dokumentasyon ng Polygon {#add-to-the-polygon-documentation}

  - Kung kailangan mong magdagdag ng o baguhin ang kahit ano sa Wiki ng Polygon, maghain ng PR
  laban sa `master`branch (pakitingnan ang sample na PR).
  - Susuriin ng team ng dokumentasyon ang PR o makikipag-ugnayan ito nang naaayon.
  - Repository: https://github.com/maticnetwork/matic-docs
  - Sample na PR: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
Kung gusto mong patakbuhin ang aming Wiki nang lokal sa iyong machine, tingnan ang seksyon [na nagpapatakbo ng Wiki nang](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) lokal. Kung nagdaragdag ka ng bagong dokumento, inirerekomenda na magkaroon lamang ng isang pangunahing buod/introduction at isang link sa iyong Github o dokumentasyon para sa karagdagang detalye.
:::

## Mga panuntunan sa Git {#git-rules}

Ginagamit namin ang `gitchangelog` para sa lahat ng aming repo para sa mga change log. Dahil doon, kailangan naming
sumunod sa sumusunod na kumbensiyon para sa commit message. Hindi magkakaroon ng pag-merge kung hindi mo
sinusunod ang kumbensiyon na ito.

### Kumbensiyon sa commit message {#commit-message-convention}

Ang mga sumusunod ay mga suhestiyon sa kung ano ang posibleng maging kapaki-pakinabang na pag-isipang idagdag sa iyong
mga commit message. Kung gusto mo, maaari mong paghiwalayin nang medyo magkakalapit ang iyong mga commit sa malalaking seksyon:

- ayon sa intent (halimbawa: bago, ayusin, baguhin ...)
- ayon sa object (halimbawa: dokumento, packaging, code ...)
- ayon sa audience (halimbawa: dev, tester, mga user ...)

Bukod rito, maaari kang mag-tag ng ilang commit kung gusto mo:

- Bilang mga “minor” na commit na hindi dapat makakuha ng output sa iyong changelog (mga pagbabago sa cosmetics,
maliit na typo sa mga komento...).
- Bilang “refactor” kung wala ka talagang anumang malaking pagbabago sa feature. Kaya ito ay
hindi rin dapat maging bahagi ng log ng pagbabago na ipinapakita sa pinal na user bilang halimbawa, ngunit
maaari itong kainteresan kung mayroon kang developer changelog.
- Maaari ka ring mag-tag gamit ang “api” para markahan ang mga pagbabago sa API o kung isa itong bago o katulad na API.

Subukang isulat ang iyong commit message sa pamamagitan ng pag-target sa functionality ng user nang madalas hangga't sa magagawa mo.

:::note Halimbawa

Isa itong karaniwang git log `--oneline` para maipakita kung paano maaaring i-store ang impormasyong ito:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

Para sa higit pang impormasyon, mangyaring sumangguni sa
[Ano ang Ilan sa Mahuhusay na Paraan para Pamahalaan ang Isang Changelog Gamit ang Git?](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890).

Para sa higit pang detalye, tingnan ang [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/).
