---
id: getting-started
title: PoS Bridge
sidebar_label: Introduction
description: Più flessibilità e prelievi più rapidi con Polygon POS.
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

Consulta la più recente [documentazione Matic.js su PoS](../matic-js/get-started.md) per iniziare.

Un bridge è fondamentalmente un insieme di contratti che aiutano a spostare gli asset dalla catena principale alla catena figlio. Esistono principalmente due bridge per spostare gli asset tra Ethereum e Polygon. La prima è il ponte di Plasma e la seconda è chiamata **il Ponte di PoS** o la **prova del ponte di gioco**. Il **Plasma bridge** offre maggiori garanzie di sicurezza grazie al meccanismo di uscita di Plasma.

Tuttavia, cesistono alcune restrizioni sul token figlio e viene applicato un periodo di prelievo di 7 giorni associato a tutte le uscite/tutti i prelievi da Polygon a Ethereum sul Plasma bridge.

Si tratta di una nota dolente per quelle dApp/quegli utenti che abbiano bisogno di una certa **flessibilità** e **prelievi più rapidi**, e sono soddisfatti del livello di sicurezza fornito dal Polygon Proof-of-Stake bridge, garantito da un solido insieme di validatori esterni.

Gli asset basati su proof of stake garantiscono la sicurezza del PoS e un'uscita più rapida con un solo intervallo di checkpoint.

## Passi per usare il PoS Bridge {#steps-to-use-the-pos-bridge}

Prima di entrare in questa sezione dei doc, potrebbe aiutare a comprendere in modo approfondito alcuni termini come interagire con loro mentre cercherai di utilizzare il ponte: [la mapping](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) e il [Meccanismo di Sincronizzazione di Stato](https://docs.polygon.technology/docs/pos/state-sync/state-sync/).

Poi, il primo passo per utilizzare il ponte PoS è la mappatura del **Token di rado** e **del Token di bambino**. Significa che il contratto token sulla catena di radice e il contratto token sulla catena di bambino devono mantenere una connessione (chiamata mapping) per trasferire le risorse tra di loro. Se sei interessato a inviare una richiesta di mappatura, puoi farlo utilizzando [questa guida](/docs/develop/ethereum-polygon/submit-mapping-request/).

A un livello più basso e con più dettaglio, ecco cosa succede:

### deposit {#deposit}

  1. Il proprietario del token **(ERC20/ERC721/ERC1155)** deve approvare un contratto specifico sul PoS bridge per spendere la quantità di token da trasferire. Questo contratto specifico è chiamato **Contratto Predicate** (distribuito sulla rete di Ethereum) che di fatto **blocca la quantità di token da depositare**.
  2. Una volta ottenuta l'approvazione, il passo successivo è quello di **depositare l'asset**. Una chiamata di funzione deve essere effettuata sul `RootChainManager`contratto che a sua volta innesca il `ChildChainManager`contratto sulla catena di Polygon.
  3. Ciò avviene attraverso un meccanismo di sincronizzazione dello stato che può essere compreso in dettaglio [qui](/docs/pos/state-sync/state-sync/).
  4. Il contratto di token per bambini `deposit`viene definito `ChildChainManager`all'interno e la corrispondente quantità di asset token viene **impostata sull'account dell'utente.** È importante notare che solo la `ChildChainManager`può accedere alla `deposit`funzione sul contratto di token bambino.
  5. Una volta che l'utente ottenga i token, questi possono essere **trasferiti quasi istantaneamente con commissioni trascurabili sulla catena di Polygon**.

### Prelievi {#withdrawals}

  1. Ritirare le attività a Ethereum è un processo di 2 fasi in cui il asset token deve essere **prima bruciato sulla catena** di Polygon e quindi la **prova di questa transazione di ustione deve essere presentata** sulla catena di Ethereum.
  2. La transazione burn impiega da 20 minuti a 3 ore per generare il checkpoint sulla catena di Ethereum. Questa operazione è effettuata dai validatori Proof of Stake.
  3. Una volta che la transazione è stata aggiunta al checkpoint, la prova della transazione di ustione può essere presentata sul `RootChainManager`contratto su Ethereum chiamando la `exit`funzione.
  4. Questa chiamata di funzione **verifica l'inclusione del checkpoint** e quindi attiva il contratto Predicate che aveva bloccato i token degli asset quando questi erano stati depositati inizialmente.
  5. Come ultima tappa il **contratto di previsione rilascia i token** bloccati e le rimborsa all'account utenti su Ethereum.

:::tip

Una volta effettuata la mappatura, si può utilizzare l'**SDK matic.js** per interagire con i contratti oppure si può fare lo stesso senza l'SDK. Tuttavia, l'SDK di matic.js è stato progettato in modo molto semplice per rendere il meccanismo di trasferimento degli asset molto facile da integrare in qualsiasi applicazione.

:::