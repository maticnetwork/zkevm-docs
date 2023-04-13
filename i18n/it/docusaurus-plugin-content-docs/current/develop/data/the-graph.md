---
id: the-graph
title: Configurare un progetto con The Graph e pos di Polygon
sidebar_label: The Graph
description: Scopri come configurare un progetto in hosting The Graph e Polygon.
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

The Graph è un protocollo decentralizzato per l'indicizzazione e l'interrogazione dei dati della catena che supporta la catena Matic. I dati definiti tramite subgraph sono facili da interrogare ed esplorare. I subgraph possono essere creati localmente o tramite un explorer con servizio di hosting gratuita per l'indicizzazione e la visualizzazione dei dati.

> Nota: Consulta https://thegraph.com/docs/quick-start per maggiori dettagli, installazione locale e altro. I documenti includono un esempio per imparare il funzionamento dei subgraph e questo video fornisce una buona introduzione.

## Passaggi {#steps}

1. Vai su Graph Explorer (https://thegraph.com/explorer/) e crea un account. Per l'autenticazione sarà necessario disporre di un account GitHub.

2. Vai sulla dashboard e fai clic su Aggiungi Subgraph. Definisci il nome del subgraph, l'account e il sottotitolo, aggiorna l'immagine e le altre informazioni (puoi aggiornare in seguito) se lo desideri.

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. Installa Graph CLI sul tuo dispositivo (usando npm o yarn)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. Il comando seguente crea un subgraph che indicizza tutti gli eventi di un contratto esistente. Tenta di recuperare l'ABI del contratto da BlockScout e torna a richiedere un percorso di file locale. Se manca uno degli argomenti facoltativi, verrai indirizzato a un modulo interattivo.

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

> Nota: Maggiori dettagli al seguente link: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. Autenticarsi con il servizio di hosting

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
Puoi trovare il token di accesso andando sulla tua dashboard sul sito web di The Graph.

6. cd nella directory che hai creato e inizia a definire il subgraph. Le informazioni sulla creazione di un subgraph sono disponibili in Graph Docs qui. https://thegraph.com/docs/define-a-subgraph

7. Quando sei pronto, implementa il tuo subgraph. Puoi sempre testare e ridistribuire secondo necessità.

> Se il subgraph che hai implementato in precedenza è ancora nello stato di Sincronizzazione, verrà immediatamente sostituito con la versione appena implementata. Se il subgraph implementato in precedenza è già completamente sincronizzato, Graph Node contrassegnerà la versione appena implementata come Versione in sospeso, la sincronizzerà in background e sostituirà la versione attualmente implementata con quella nuova solo una volta terminata la sincronizzazione della nuova versione. Ciò garantisce di avere un subgraph con cui lavorare durante la sincronizzazione della nuova versione.

```bash
yarn deploy
```

Il tuo subgraph verrà implementato e sarà possibile accedervi dalla dashboard.

Puoi scoprire come interrogare il subgraph qui: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

Se vuoi rendere pubblico il tuo subgraph, puoi farlo accedendo al subgraph dalla dashboard e quindi facendo clic sul pulsante modifica. Vedrai il cursore nella parte inferiore della pagina di modifica.
