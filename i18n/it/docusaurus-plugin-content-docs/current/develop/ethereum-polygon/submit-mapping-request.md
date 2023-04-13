---
id: submit-mapping-request
title: Mapping Token
description:  Una guida per la mappa dei token tra le catene di Ethereum e Polygon utilizzando il PoS Bridge
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

La mappatura è necessaria per trasferire le vostre risorse da e per Ethereum e Polygon PoS. Per questa operazione, offriamo due bridge. Per maggiori dettagli sul ponte si possono capire [qui](/develop/ethereum-polygon/getting-started.md).

:::tip

Il ponte Polygon PoS è disponibile sia per Polygon Mainnet che per Mumbai Testnet.

:::

## Passi per l'invio di una richiesta di mappatura {#steps-to-submit-a-mapping-request}

Per mappare i token tra Ethereum e Polygon PoS, puoi utilizzare il [Mapper di Polygon Token](https://mapper.polygon.technology/). Apri il link e clicca sul pulsante **Map Nuovo Token** in alto a destra per avviare una nuova richiesta di mapp.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Passo 1 →** Scegli la rete su cui vuoi mappare il tuo token. Puoi scegliere **Goerli-Mumbai** per Testnet e **Ethereum-Polygon PoS** per la Mainnet.

**Passo 2 →** Seleziona il tipo di token che stai mapping - **ERC20**, **ERC721** o **ERC1155**.

**Passo 3 →** Inserisci l'indirizzo token **Ethereum/Goerli** nel campo **Indirizzo** Token. Assicurati che il codice del contratto token sia stato verificato sugli esploratori di blockchain di **Ethereum/Goerli**.

**Passo 4 →** Dopo aver aggiunto **l'indirizzo** di Token, i campi corrispondenti, vale a dire: **il nome di Token, il Symbol, e il Decimal di Token** saranno automaticamente popolati con i dettagli del contratto.

**Passo 5 →** Ora, clicca sul pulsante **Begin Mapping** per avviare il processo di mappatura. Poiché si tratta di una transazione di Ethereum, dovrai collegare il tuo wallet per procedere.

**Passo 6 →** Ti verrà mostrato un modale di revisione con le informazioni del token e le stime delle gas fee per completare la mappatura. Verifica i dettagli e inizia la transazione di mappatura selezionando il pulsante **Pay Gas fee Per la** mappa.

Dopo la conferma della transazione dal tuo wallet, devi aspettare che la transazione venga completata su Ethereum. Una volta conclusa la transazione, verrà mostrato il modale di successo con il tuo indirizzo di token bambino sulla rete Polygon PoS. Puoi continuare a verificare la mappatura controllando l'indirizzo di token per bambino generato su [Polygonscan](https://polygonscan.com/).

Per una mappatura di successo di Mainnet, puoi fornire i tuoi dati di token [qui](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) per essere aggiunto nella [**lista di Token di Polygon**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json).

:::tip

In caso di [<ins>mappatura</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-) personalizzata, puoi visitare la nostra documentazione [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) e utilizzare le informazioni fornite per costruire la tua implementazione FX personalizzata per la mappa dei token.

:::

## Guida video {#video-guide}

Ecco un video tutorial veloce su come mappare i token tra **Ethereum Goerli ↔ Polygon Mumbai Testnet**:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Il tuo browser non supporta questo elemento video.</p>
</video>
