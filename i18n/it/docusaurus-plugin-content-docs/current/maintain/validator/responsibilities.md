---
id: responsibilities
title: del validatore
description: Le responsabilità di essere un validatore sulla Polygon Network
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Rimani informato

Continua con gli ultimi aggiornamenti del nodo e del validatore del team di Polygon e della comunità abbonandosi ai [gruppi di notifica di Polygon](https://polygon.technology/notifications/).

:::

Un validatore della blockchain è un'entità responsabile di convalidare le transazioni all'interno della blockchain. Sulla Polygon Network, ogni partecipante può essere qualificato per diventare un validatore di Polygon, eseguendo un **Nodo Validator (Sentry + Validator)** per guadagnare ricompense e raccogliere le commissioni di transazione. Al fine di garantire la partecipazione in buona fede dei validatori, questi devono vincolare nell'ecosistema uno stake minimo pari a un (1) token MATIC.

:::info

Attualmente esiste un limite di 100 validatori attivi alla volta. Per una descrizione dettagliata su cosa è un validatore, vedere [Validator](/maintain/validator/architecture).

Inoltre, dopo che la [<ins>proposta di governance del PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956) sarà attuata a livello di contratto, il limite di puntata minimo aumenterà a 10.000 MATIC.

:::

Un [validatore](/maintain/glossary.md#validator) della rete di Polygon ha le seguenti responsabilità:

* Operazioni tecniche (effettuate automaticamente dai nodi)
* Operazioni
  * Mantenere un tempo di funzionamento elevato
  * Controllare i servizi e i processi correlati al nodo
  * Eseguire il monitoraggio del nodo
  * Mantenere il saldo dell'ETH (tra 0,5 e 1) sull'indirizzo del firmatario
* Delegazione
  * Essere aperto alla delegazione
  * Comunicare i tassi di commissione
* Comunicazione
  * Comunicare i problemi
  * Fornire feedback e suggerimenti
* Guadagnare le ricompense per convalidare i blocchi sulla blockchain

## Operazioni tecniche relative al nodo {#technical-node-operations}

Le seguenti operazioni di nodo tecnico vengono **effettuate automaticamente dai nodi:**

* Selezione del produttore del blocco:
  * Selezionare un sottoinsieme di validatori per il set del produttore del blocco per ogni [span](/docs/maintain/glossary.md#span)
  * Per ogni span, selezionare nuovamente il set del produttore del blocco su [Heimdall](/maintain/glossary.md#heimdall) e trasmettere periodicamente le informazioni a [Bor](/maintain/glossary.md#bor)
* Convalidare i blocchi su Bor:
  * Per una serie di blocchi della sidechain di Bor, ogni validatore legge indipendentemente i dati del blocco per tali blocchi e convalida i dati su Heimdall.
* Invio del checkpoint:
  * Per ciascun blocco di Heimdall viene scelto un [proponente](/maintain/glossary.md#proposer) tra i validatori. Il proponente del [checkpoint](/maintain/glossary.md#checkpoint-transaction) crea il checkpoint per i dati del blocco di Bor, li convalida e trasmette la transazione firmata per consentire ad altri validatori di dare il loro consenso.
  * Se oltre 2/3 dei validatori attivi raggiunge il consenso sul checkpoint, questo viene inviato alla Ethereum mainnet.
* Modifiche alla sincronizzazione dei contratti di staking di Polygon su Ethereum:
  * Proseguendo dalla fase d'invio del checkpoint, e trattandosi di una call di rete esterna, la transazione del checkpoint su Ethereum potrebbe essere confermata o meno, oppure potrebbe rimanere in attesa per via di problemi di congestione su Ethereum.
  * In questo caso, vi è un processo `ack/no-ack` da seguire per far sì che il checkpoint successivo contenga anche uno snapshot dei blocchi di Bor precedenti. Ad esempio, se il checkpoint 1 destinato ai blocchi Bor 1-256 non viene completato per qualsiasi ragione, il successivo checkpoint 2 viene destinato ai blocchi Bor 1-512. Vedi anche [Architettura Heimdall: checkpoint](/pos/heimdall/checkpoint).
* State sync dalla Ethereum mainnet alla Bor sidechain:
  * Lo stato del contratto può essere spostato tra Ethereum e Polygon, nello specifico mediante [Bor](/maintain/glossary.md#bor):
  * Un contratto dApp su Ethereum chiama una funzione su un contratto speciale Polygon su Ethereum.
  * L'evento corrispondente viene trasmesso a Heimdall e quindi a Bor.
  * Viene chiamata una transazione state-sync su uno smart contract Polygon e la dApp può ottenere il valore su Bor mediante una funzione call su Bor stesso.
  * Un meccanismo simile avviene per trasmettere lo stato da Polygon a Ethereum. Vedi anche [Meccanismo State Sync](/docs/pos/state-sync/state-sync).

## Operazioni {#operations}

### Mantenere un tempo di funzionamento elevato {#maintain-high-uptime}

Il tempo di funzionamento di un nodo sulla rete di Polygon si basa sul numero di [transazioni di checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) firmate dal nodo validatore.

Un proponente invia una transazione di checkpoint alla Ethereum mainnet approssimativamente ogni 34 minuti. La transazione di checkpoint deve essere firmata da ogni [validatore](/maintain/glossary.md#validator) della rete Polygon. **La mancata firma di una transction del checkpoint porta alla diminuzione delle prestazioni del nodo del validatore**.

Il processo di firma delle transazioni di checkpoint è automatizzato. Per garantire che il tuo nodo validatore firmi tutte le transazioni di checkpoint valide, devi mantenere e monitorare l'integrità del tuo nodo.

### Controlla quotidianamente i servizi e i processi del nodo {#check-node-services-and-processes-daily}

Devi controllare ogni giorno i servizi e i processi associati a [Heimdall](/maintain/glossary.md#heimdall) e [Bor](/maintain/glossary.md#bor). Inoltre, la potatura dei nodi dovrebbe essere effettuata regolarmente per ridurre l'utilizzo del disco.

### Eseguire il monitoraggio del nodo {#run-node-monitoring}

Devi utilizzare:

* Le dashboard Grafana fornite da Polygon. Vedi GitHub repository: [Configurazione Matic-Jagar](https://github.com/vitwit/matic-jagar)
* Oppure, utilizzare i tuoi strumenti di monitoraggio per i nodi [di validatore](/maintain/glossary.md#validator) e di [sentry](/maintain/glossary.md#sentry)
* L'endpoint di Ethereum utilizzato sui nodi dovrebbe essere monitorato per garantire che il nodo sia entro i limiti di richiesta

### Mantenere il saldo di ETH {#keep-an-eth-balance}

Devi mantenere una quantità adeguata di ETH (dovrebbe essere sempre intorno al valore di soglia vale a dire da 0,5 a 1) sull'indirizzo del [tuo firmatore](/maintain/glossary.md#signer-address) di validatore sull'Ethereum Mainnet.

Hai bisogno degli ETH per:

* Firmare le transazioni di [checkpoint](/maintain/glossary.md#checkpoint-transaction) proposte sulla Ethereum mainnet.
* Proporre e inviare le transazioni di checkpoint sulla Ethereum mainnet.

Il mancato mantenimento di un importo di ETH sufficiente sull'indirizzo del firmatario risulterà in:

* Ritardi negli invii del checkpoint. Ricorda che le gas fee per completare le transazioni sulla rete di Ethereum possono fluttuare e aumentare notevolmente.
* Ritardi nella finalizzazione delle transazioni incluse nei checkpoint.
* Ritardi nelle successive transazioni di checkpoint.

## Delegazione {#delegation}

### Disponibilità alla delegazione {#be-open-for-delegation}

Tutti i validatori devono essere aperti per la delegazione della comunità. Ogni validatore può scegliere di impostare i propri tassi di commissione. Non esiste alcun limite massimo per i tassi di commissione.

### Comunicare i tassi di commissione {#communicate-commission-rates}

È il dovere morale dei validatori comunicare le tariffe di commissione e le modifiche della tariffa di commissione alla comunità. Le piattaforme migliori per comunicare i tassi di commissione sono:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)

## Comunicazione {#communication}

### Comunicare i problemi {#communicate-issues}

Comunicare le questioni quanto prima possibile assicura che la comunità e il team Polygon possano risolvere i problemi il prima possibile. Le piattaforme migliori per comunicare i tassi di commissione sono:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### Fornire feedback e suggerimenti {#provide-feedback-and-suggestions}

A Polygon, valutiamo i tuoi feedback e suggerimenti su qualsiasi aspetto dell'ecosistema del validatore. Il [Forum](https://forum.polygon.technology/) è la piattaforma preferita per fornire feedback e suggerimenti.
