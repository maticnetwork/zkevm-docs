---
id: liquid-delegation
title: Delega liquida
sidebar_label: Liquid Delegation
description: Come viene usata la delega liquida in Polygon per mantenere la rete.
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

In un tradizionale meccanismo di prova di gioco, la blockchain tiene traccia di una serie di validatori. Chiunque può aderire a questo rango o diritto di convalidare le transazioni inviando una transazione speciale che pone le proprie monete (nel caso di Ethereum, ETH) e si blocca in un deposito. Successivamente, il processo di creazione e di accettazione di nuovi blocchi viene effettuato attraverso un algoritmo di consenso da parte di tutti i validatori attivi.

Bloccano una parte della loro quota per una certa durata (come un deposito di sicurezza), e in cambio ottengono una possibilità proporzionale a quella posta per selezionare il prossimo blocco.

Le ricompense di puntata vengono distribuite come incentivo ai partecipanti.

## Delegazione {#delegation}

Il passaggio può essere costoso, alzare la barriera da entrare, che favorisce i ricchi che diventano più ricchi. Tutti dovrebbero partecipare alla sicurezza di rete e ricevere token di apprezzamento. L'unica altra opzione è unirsi a una piscina di punta simile a una piscina di mining, dove i validatori devono essere affidabili. Riteniamo che il rispetto del protocollo sia il miglior corso d'azione per i nuovi delegatori. Poiché la capitale e le ricompense sono aperte e protette da meccanismi in-protocol

I delegatori possono partecipare alla convalida anche se non ospitano intere nodi. Tuttavia, con i validatori, possono aumentare la forza della rete e guadagnare una piccola carica di commissione (che varia a seconda del validatore) al validatore di loro scelta.

## Limitazione del Delegatore tradizionale e del Validator {#limitation-of-traditional-delegator-and-validator}

Il costo di rinchiudere capitale sia per i validatori che per i delegatori è alto dovuto al modo in cui è progettato il protoccolo Proof of Stake.

Ancora possiamo portare più meccanismo di vista di liquidità come il validatore NFT dove qualsiasi nuova parte che vuole diventare un validatore può acquistare il validatore NFT da un validatore che vuole uscire dal sistema per qualche motivo.

In caso di delegatori, la quantità bloccata è considerata in piccoli chunk per cui vogliamo che sia liquida in modo che la partecipazione sia più attiva (se un delegato pensa che in questo momento le opportunità siano grandi in DeFi, ma la loro capitale sia bloccata nel campo di gioco anche per il ritiro, devono ancora aspettare per 21 giorni).

Inoltre, il blocco X ETH in un deposito non è gratuito, comporta un sacrificio di opzione per il titolare dell'ETH. Se hai 1000 ETH, puoi fare tutto quello che vuoi. Se la rinchiudi in un deposito, allora è bloccato lì per mesi per evitare attacchi come [**niente in gioco**](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed) e punire i validatori per la loro cattiva partecipazione.

## In-Protocol contro Application Layer {#in-protocol-vs-application-layer}

La liquidazione a livello di applicazione ha un problema di fiducia. La liquidazione di livello del protocollo è molto più apprezzata perché ogni nuovo attore può fidarsi di essa (che attrae più capitale, anche da soggetti / delegatori più piccoli).

## La soluzione della delega di Polygon {#polygon-s-solution-for-delegation}

Durante l'esplorazione della delegazione, ci siamo resi conto che la delegazione deve essere in-protocol per avere una maggiore fiducia dei delegatori.

Abbiamo affrontato un problema simile a quello dei validatori la liquidità del capitale e pensato di renderla una NFT che può essere una NFT che può essere trasferita e esplorata su pensieri simili come come può essere reso più liquido e il [design impressionante](https://blog.chorus.one/delegation-vouchers/) di sikka-chorus.one

La condivisione del pool validatori è un'ottima idea e visto che lo staking di Polygon viene implementato attraverso contratti intelligenti (smart contract) su ethereum ci apre tante opzioni come per esempio renderlo compatibile con ERC20 in modo tale da essere utilizzato nei protocolli nell'ambito defi.

Fin d'ora ogni validatore ha una propria VMatic (vale a dire per il validatore Ashish ci sarà un token AMatic perché ogni validatore ha diverse prestazioni (premi e frequenza di commissione). I delegatori possono acquistare più condivisione di validatore e coprire il rischio per le scadenti prestazioni di un particolare validatore.

## Vantaggi {#advantages}

- Poiché il nostro design segue l'ERC20 come l'interfaccia nell'implementazione della delega, le applicazioni DeFi possono essere facilmente costruite sopra di esso.
- I token delegati possono essere utilizzati nei protocolli di prestito.
- I delegatori possono coprire il proprio rischio tramite mercati di previsione come Auger.

Propositi futuri:

- Attualmente l'ERC20 non è fungibile con altri validatori ERC20 / Condividi i token ma in futuro pensiamo che molte nuove applicazioni DeFi possano costruire su di esso e realizzare alcuni mercati o anche alcuni prodotti migliori.
- Con la ricerca avviata da [chorus.one](http://chorus.one), stiamo anche esplorando problemi come i validatori che corrispondono i propri token e altri problemi (il corto dei problemi può essere evitato attraverso cose come il validatore che bloccano la propria partecipazione per X mesi e altre cose come l'assicurazione dei validatori (on-chain) che porteranno maggiore fiducia per i delegatori).
- Diritti di voto del delegatore per partecipare alle decisioni di governance.
- Mentre la delega è liquida, vogliamo anche garantire la sicurezza della rete. Ecco perché, in una certa forma, il capitale slash-able è bloccato in caso di attività di frode.

Data la disponibilità del design incorporato nel protocollo, i validatori possono sempre implementare i propri meccanismi simili e mettere in gioco le proprie monete attraverso un contratto che potrebbe ancora non essere disponibile sull'interfaccia utente dello staking  di Polygon.

## Obiettivi futuri {#future-goals}

Cose come interchain / cross-chain tramite il Cosmos hub e la progettazione di Everett B-harvest

## Risorse {#resources}

- [Il post-design di Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Introduzione ai derivati di staking](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [Le staking pool](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [L'inflazione all'interno del Proof of Stake](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
