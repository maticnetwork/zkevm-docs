---
id: replit
title: I-deploy ang isang Smart Contract gamit ang Replit
sidebar_label: Using Replit
description: I-deploy ang mga Smart Contract gamit ang ReplitIDE sa Polygon
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Pangkalahatang-ideya {#overview}

Ang [Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) ay coding platform na nagbibigay-daan sa iyong magsulat ng code at mag-host ng mga app. Sinusuportahan ng Replit ang [Solidity programming language](https://replit.com/@replit/Solidity-starter-beta?v=1) kaya nagbibigay ito ng lahat ng feature at functionality para gumawa at mag-deploy ang mga Web3 developer matalinong mga kontrata.

Ginabayan ka ng artikulong ito na magtayo at mag-deploy ng isang solidity smart contract sa Polygon gamit ang [Replit IDE](https://replit.com/signup) at Tugunin ang [Solidity development template (Solidity starter beta)](https://replit.com/@replit/Solidity-starter-beta?v=1).

## Ano ang gagawin mo {#what-you-will-do}

- Gumawa ng Replit account
- Gumawa ng Repl kapaligiran
- I-deploy ang isang sample project sa Polygon Mumbai network
- I-verify ang kontrata
- I-publish ang iyong proyekto sa isang personal na profile ng Replit.

:::tip

Para sa mga karagdagang halimbawa tungkol sa Solidity with Replit, mababasa mo ang artikulong <ins>**[Magsimula sa](https://blog.replit.com/solidity)**</ins> Replit o suriin ang <ins>**[dokumentasyon ng Solidity at tutorial](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins> ng kontrata ng Escrow.
:::

## Mga Kinakailangan {#prerequisites}

Hindi mo kailangan ang anumang setup ng lokal na kapaligiran para i-deploy ang iyong solidity smart contract sa Polygon gamit ang Replit.

Kailangan mo ng web3 wallet na nakabatay sa browser upang makipag-ugnayan sa Polygon Mumbai Testnet at mga naka-deploy na kontrata. Kung gumagamit ka na ng MetaMask, inirerekumenda na lumikha ng isang bagong account para sa pagsubok gamit ang Replit. Magagawa mo ito mula sa menu ng account, na lalabas kapag nag-click ka sa avatar ng account sa kanang sulok sa itaas ng interface ng MetaMask.

Dapat mong i-set up ang lahat ng sumusunod na Prerequisite upang mai-deploy ang iyong smart na kontrata ng solidity sa Polygon:

1. [Gumawa ng Replit account](https://replit.com/signup)
2. [I-download ang Metamask wallet](/docs/develop/metamask/hello)
3. [I-configure ang Polygon sa MetaMask](/docs/develop/metamask/config-polygon-on-metamask)
4. [Kumuha ng mga token ng testnet](https://faucet.polygon.technology)

## Paggamit ng Repl {#working-with-a-repl}

Ang bawat Repl na iyong ginawa ay ganap na gumaganang environment sa pag-unlad at produksyon. Sundin ang mga hakbang upang lumikha ng solidity starter Replit:

1. [Mag-log in](https://replit.com/login) gumawa ng [account](https://replit.com/signup). Matapos na lumikha ng iyong [Replit account](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide), isasama ang iyong home screen ng dashboard kung saan maaari mong tingnan, lumikha ng mga proyekto, at pamahalaan ang iyong account.

![img](/img/replit/dashboard.png)

2. Kapag nag-log in, lumikha ng Solidity starter reply, Piliin **ang + Lumikha** ng Repl mula sa kaliwang panel o **+** sa kanang sulok ng screen.

![img](/img/replit/solidity.png)

3. Piliin ang template ng [**Solidity starter (beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) at bigyan ang iyong proyekto ng isang pamagat.

4. I-click ang **+ Lumikha ng Repl** para lumikha ng iyong proyekto.

:::note

Ang Solidity starter repl ay may browser-friendly na interface, na binuo gamit ang <ins>**[Web3 Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.5.2/)**</ins>, na maaari mong gamitin para i-deploy at makipag-ugnayan sa aming mga kontrata. will namin sa testnet ng Replit, isang custom na bersyon ng Ethereum blockchain na pinamamahalaan ng Replit at na-optimize para sa pagsubok.

:::

## I-deploy Polygon {#deploy-on-polygon}

Siguraduhin na sinunod mo ang listahan ng mga **Prerequisite** sa itaas para handa kang mag-deploy at makipag-ugnayan sa iyong smart contract.

1. I-click ang **Run** (sa Top) para i-install ang lahat ng kaugnay na package at simulan ang pag-deploy ng kontrata sa UI.

2. Ikonekta ang iyong MetaMask wallet sa web interface at lumipat sa [Mumbai Testnet](docs/develop/metamask/config-polygon-on-metamask).

![img](/img/replit/connect.png)

3. I-click ang **I-connect** ang wallet, piliin ang iyong account, saka piliin ang **Connect**.

![img](/img/replit/deploy-list.png)

4. Mula sa dropdown list, piliin ang kontrata na gusto mong i-deploy. I-click ang **I-deploy**.

5. Makakatanggap ka ng window ng popup ng MetaMask na humihingi ng iyong confirmation. I-approve ang transaksyon mula sa iyong wallet para i-deploy ang iyong kontrata.

## Pag-verify at pagsubok sa iyong kontrata {#verifying-and-testing-your-contract}

Kapag na-deploy na ang kontra[ta, Mag-navigate sa Pol](https://mumbai.polygonscan.com/)yganscan upang hanapin ang iyong account, tingnan ang iyong na-deploy na kontrata, at kopyahin ang address ng iyong account.

Kapag na-deploy ang iyong kontrata, magpapakita ito ng mga will kahon sa ibaba ng dropdown box. Palawakin ito at tingnan ang lahat ng iba't ibang mga function na magagamit. Maaari ka na ngayong makipag-interaksyon sa iyong kontrata gamit ang ibinigay na user interface o mula sa naibabahaging URL na ipinapakita sa interface.

## I-publish sa Replit​ {#publish-to-replit}

Nagbibigay-daan ang Replit sa iyo na i-publish ang iyong mga proyekto sa personal na profile. Pagkatapos ng pag-publish, lalabas ang mga proyekto sa iyong page ng spotlight para ma-explore, maka-interact, ma-clone, at maka-collaborate ng iba.

Sundin ang mga hakbang sa ibaba para i-publish ang iyong mga proyekto upang Tugunan:

1. Piliin ang pamagat ng proyekto sa tuktok ng screen.
2. Kumpletuhin ang pangalan ng iyong proyekto at paglalarawan at i-click ang **Publish**.
