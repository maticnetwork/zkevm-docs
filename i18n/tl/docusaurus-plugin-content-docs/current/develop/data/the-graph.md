---
id: the-graph
title: Pag-set up ng Proyekto gamit ang The Graph at Polygon PoS
sidebar_label: The Graph
description: Alamin kung paano mag-set up ng naka-host na proyekto gamit ang The Graph at Polygon.
keywords:
  - polygon
  - matic
  - graph
  - the graph
  - index
  - query
  - subgraph
image: https://matic.network/banners/matic-network-16x9.png
slug: graph
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sinusuportahan ng Graph na isang desentralisadong protokol para sa pag-index at pag-query ng data ng chain ang Matic chain. Ang data na tinukoy sa pamamagitan ng mga subgraph ay madaling i-query at i-explore. Maaaring gawin ang mga subgraph nang lokal, o gumamit ng libreng naka-host na explorer para sa indexing at pagpapakita ng data.

> Note: Tingnan ang https://thegraph.com/docs/quick-start para sa mga karagdagang detalye, lokal na pag-install at iba pa. Kasama sa mga dokumento ang isang halimbawa para sa pag-aaral kung paano gumagana ang mga subgraph at nagbibigay ang video na ito ng magandang panimula.

## Mga Hakbang {#steps}

1. Pumunta sa Graph Explorer (https://thegraph.com/explorer/) at mag-setup ng account. Kakailanganin mo ng GitHub account para sa pag-authenticate.

2. Pumunta sa iyong dashboard at i-click ang Idagdag ang Subgraph. Tukuyin ang Pangalan, Account, at Subtitle ng subgraph at i-update ang larawan at iba pang impormasyon (maaari mong i-update sa ibang pagkakataon) kung ninanais.

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. I-install ang Graph CLI sa iyong machine (gamit ang alinman sa npm o yarn)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. Gumagawa ang sumusunod na command ng subgraph na nag-i-index sa lahat ng kaganapan ng umiiral na kontrata. Tinatangka nitong i-fetch ang ABI ng kontrata mula sa BlockScout at umaatras sa paghiling ng lokal na path ng file. Kung nawawala ang alinman sa mga opsyonal na argumento, dadalhin ka nito sa  interaktibong anyo.

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Matic” for Matic mainnet and “Mumbai” for Matic Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on the Matic network: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> Note: Narito ang mga karagdagang detalye: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. Mag-authenticate gamit ang naka-host na serbisyo

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
Mahahanap mo ang access token sa pamamagitan ng pagpunta sa iyong dashboard sa graph website.

6. cd patungo sa directory na ginawa mo at simulang tukuyin ang subgraph. Ang impormasyon sa paggawa ng subgraph ay available sa Mga Dokumento ng Graph na narito sa https://thegraph.com/docs/define-a-subgraph

7. Kapag handa ka na, i-deploy ang iyong subgraph. Maaari ka palaging gumawa ng pagsubok at mag-redeploy kung kinakailangan.

> Kung ang iyong nakaraang na-deploy na subgraph ay nasa status pa rin na Nagsi-sync, kaagad itong papalitan ng bagong na-deploy na bersyon. Kung ganap nang naka-sync ang nakaraang na-deploy na subgraph, mamarkahan ng Graph Node ang bagong na-deploy na bersyon bilang Nakabinbing Bersyon, isi-sync ito sa background, at papalitan lang ang kasalukuyang naka-deploy na bersyon ng bago kapag natapos na ang pagsi-sync sa bagong bersyon. Tinitiyak nito na mayroon kang subgraph na magagamit habang nagsi-sync ang bagong bersyon.

```bash
yarn deploy
```

Ide-deploy ang iyong subgraph at maa-access mula sa iyong dashboard.

Maaari mong alamin ang tungkol sa pag-query sa subgraph dito: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

Kung gusto mong gawing pampubliko ang iyong subgraph, maaari mong gawin ito sa pamamagitan ng pag-access sa iyong subgraph mula sa iyong dashboard at saka i-click ang button na i-edit. Makikita mo ang slider sa ibaba ng page ng pag-edit.
