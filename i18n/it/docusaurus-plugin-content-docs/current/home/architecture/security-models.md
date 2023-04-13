---
id: security-models
title: Modelli di Sicurezza
description: PoS, Plasma e Hybrid securities
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Modelli di Sicurezza {#security-models}

Polygon fornisce tre tipi di modelli di sicurezza per uno sviluppatore per costruire le loro dApp su:

1. [Sicurezza Proof of Stake](#proof-of-stake-security)
2. [Sicurezza Plasma](#plasma-security)
3. [Ibrido (Plasma + PoS)](#hybrid)

Abbiamo descritto ciascuno di questi modelli di sicurezza offerti da Polygon e il workflow dello sviluppatore per ciascuno con un esempio dApp di seguito.

## Sicurezza Proof of Stake {#proof-of-stake-security}

La sicurezza della prova di gioco (PoS) è fornita dallo strato di Heimdall & Bor che è costruita su Tendermint. Un checkpoint è vincolato alla catena root solo quando i ⅔ dei validatori lo ha firmato.

Per abilitare il meccanismo di PoS sulla nostra piattaforma, abbiamo implementato una serie di contratti di gestione dello staking su Ethereum, nonché un insieme di validatori incentivati che operano i nodi Heimdall e Bor. Questo implementa le seguenti funzionalità:

- La capacità per chiunque di mettere in staking token MATIC sullo smart contract di Ethereum e unirsi al sistema come Validatore
- Guadagna ricompense staking per convalidare le transizioni stato su Polygon

Il meccanismo PoS funge anche da mitigazione al problema di indisponibilità di dati per le nostre sidechain in termini di Plasma.

Abbiamo un layer con finality veloce che periodicamente finalizza lo stato delle sidechain tramite checkpoint. La finality veloce ci aiuta a consolidare lo stato della sidechain. La catena compatibile con EVM ha pochi validatori e un tempo di blocco più rapido con una produttività elevata. Sceglie la scalabilità su alti livelli di decentralizzazione. Heimdall garantisce che il commit dello stato finale sia a prova di proiettile e passi attraverso un ampio set di validatori e quindi un'elevata decentralizzazione.

**Per gli sviluppatori**

Come sviluppatore dApp sulla sicurezza di PoS, la procedura è semplice come l'adozione del tuo smart contract e la distribuisce sulla rete Polygon PoS. Questo è possibile grazie all'architettura basata sull'account che consente una sidechain compatibile con EVM.

## Sicurezza Plasma {#plasma-security}

Polygon fornisce "Garanzie di Plasma" in relazione a vari scenari di attacco. I due principali casi esaminati sono:

- L'operatore della catena (o in Polygon, lo strato di Heimdall) è corrotto, o
- L'utente è danneggiato

In entrambi i casi, se le risorse di un utente sulla catena plasmatica sono state compromesse, devono iniziare l'uscita di massa. Polygon fornisce delle costruzioni sullo smart contract della rootchain, che possono essere sfruttate. Per maggiori dettagli e specifiche tecniche relative a questa costruzione e di questo attacco vettori considerati, leggi [qui](https://ethresear.ch/t/account-based-plasma-morevp/5480).

In effetti, la sicurezza offerta dai contratti plasma di Polygon si aggancia alla sicurezza di Ethereum. I fondi degli utenti sono sempre a rischio solo se Ethereum non funziona. In poche parole, una catena di plasma è sicura tanto quanto il meccanismo di consensus della catena principale. Questo può essere estrapolato per dire che la catena plasmatica può utilizzare meccanismi di consenso davvero semplici e ancora essere sicuro.

**Per gli sviluppatori**

Come sviluppatore dApp, se vuoi costruire su Polygon con la garanzia di sicurezza del Plasma, devi scrivere previsioni personalizzate per i tuoi smart contract. Questo significa sostanzialmente scrivere i contratti esterni che si occupano delle condizioni di disputa stabilite dalle costruzioni plasmatiche di Polygon.

## ibrido {#hybrid}

Oltre alla pura sicurezza del plasma e alla pura prova di sicurezza del gioco che è possibile nelle dApp implementate su Polygon, esiste anche un approccio ibrido che gli sviluppatori possono seguire - il che significa semplicemente avere sia il Plasma che la prova di gioco garantiscono su alcuni particolari flussi di lavoro della dApp.

Questo approccio è meglio compreso con un esempio.

Considera una dApp di gioco con una serie di smart contract che descrivono la logica del gioco. Diciamo che il gioco utilizza il suo token erc20 per ricompensare i giocatori. Ora, gli smart contract che definiscono la logica di gioco possono essere implementati direttamente sulla sidechain Polygongarantendo sicurezza Proof of stake ai contratti, mentre il trasferimento di token erc20 può essere protetto con garanzie Plasma e prova di frode incorporate nei contratti della catena root di Polygon.
