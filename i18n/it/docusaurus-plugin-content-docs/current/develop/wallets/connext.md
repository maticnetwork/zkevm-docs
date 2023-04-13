---
id: connext
title: Trasferimenti crosschain utilizzando Connext
description: Costruisci la tua prossima app blockchain su Polygon.
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connext è una rete di liquidità crosschain che consente scambi veloci e completamente non custodiali tra catene compatibili con evm e sistemi Ethereum L2.

Ethereum sta passando al multichain. Con la crescente adozione di catene e L2 compatibili con l'evm, è emersa una nuova sfida legata alla frammentazione della liquidità all'interno dell'ecosistema. Connext risolve questo problema collegando i pool di liquidità discreti di ogni catena in una rete globale, senza introdurre nuove e significative considerazioni sulla fiducia degli utenti. Gli sviluppatori possono sfruttare questa liquidità per creare una nuova classe di dApp nativamente "chain-agnostic" su Connext.

Ad alto livello, Connext consente agli utenti di scambiare l'assetA sulla catenaA con l'assetB sulla catenaB utilizzando trasferimenti condizionati. Questo avviene in pochi, semplici passaggi:

Alice, un utente di Connext, invia un trasferimento condizionato di assetA a Bob. Bob, un fornitore di liquidità (alias un router), invia una quantità equivalente di assetB ad Alice. Alice sblocca il suo trasferimento condizionato per ricevere l'assetB, che a sua volta permette a Bob di fare lo stesso. I router costituiscono la spina dorsale della nostra rete, fornendo liquidità su diverse catene e guadagnando commissioni per farlo. Per saperne di più su come funziona in modo affidabile, puoi consultare il nostro Protocol Primer.

Per impostare i trasferimenti di crosschain dall'Ethereum Goerli Testnet alla Polygon Mumbai Testnet in una dApp del browser, si prega di passare attraverso questa [guida.](https://docs.connext.network/quickstart-polygon-matic-integration)
