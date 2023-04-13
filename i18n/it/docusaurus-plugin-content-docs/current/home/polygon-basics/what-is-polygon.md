---
id: what-is-polygon
title: Che cos'è Polygon?
description: Scopri la soluzione di scaling Polygon
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/) è una soluzione di scalabilità Layer 2 che raggiunge la scalabilità utilizzando delle sidechain per il calcolo off-chain e una rete decentralizzata di validatori Proof-of-Stake (PoS).

Polygon si impegna a risolvere i problemi di scalabilità e usabilità senza compromettere la decentralizzazione, la sicurezza e sfruttando la community di sviluppatori e l'ecosistema esistenti. Mira a migliorare le piattaforme esistenti fornendo scalabilità e una migliore esperienza utente alle dApp e alle funzionalità utente.

È una soluzione di scalabilità per blockchain pubbliche. La PoS di Polygon supporta tutti gli strumenti di Ethereum nonché transazioni più veloci ed economiche.

## Caratteristiche principali e punti salienti {#key-features-highlights}

- **Scalabilità**: Transazioni rapide, economiche e sicure su sidechain Polygon con finalità raggiunte su mainchain ed Ethereum come prima basechain Layer 1 compatibile
- **Alta produttività**: Raggiunti fino a 10.000 TPS su una singola sidechain su testnet interno; più catene da aggiungere  per la scalabilità orizzontale.
- **Esperienza utente**: Smooth UX e astrazione degli sviluppatori dalla mainchain alla catena Polygon; app mobili native e SDK con supporto WalletConnect.
- **Sicurezza**: Gli operatori della catena Polygon sono essi stessi degli staker nel sistema PoS.
- **Sidechai pubbliche**: Le sidechain Polygon sono di natura pubblica (rispetto alle catene dApp individuali), senza autorizzazioni e in grado di supportare più protocolli.

Il sistema Polygon è stato progettato consapevolmente per supportare transizioni di stato arbitrarie sulle sidechain Polygon, che sono abilitate per EVM.

## Delegatore e ruoli di validatore {#delegator-and-validator-roles}

Puoi partecipare alla rete di Polygon come delegatore o validatore. Consultare:

* [Chi è un Validatore](/docs/maintain/polygon-basics/who-is-validator)
* [Chi è un Delegatore](/docs/maintain/polygon-basics/who-is-delegator)

## Architettura {#architecture}

Se il tuo obiettivo è quello di diventare un validatore, è essenziale comprendere l'architettura di Polygon.

Per ulteriori informazioni vedi [Architettura Polygon](/docs/maintain/validator/architecture).

### Componenti {#components}

Per ottenere una comprensione dettagliata dell'architettura Polygon, controlla i componenti principali:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Contratti](/docs/pos/contracts/stakingmanager)

#### Code base {#codebases}

Per ottenere una comprensione dettagliata dei componenti principali, consulta le seguenti basi di codice:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contratti](https://github.com/maticnetwork/contracts)

## Istruzioni {#how-tos}

### Configurazione del nodo {#node-setup}

Se vuoi eseguire un nodo completo sulla Polygon Mainnet o su Mumbai Testnet, puoi seguire il [Esegui una guida per il nodo di](/maintain/validate/run-validator.md) Validatore.

### Operazioni di staking {#staking-operations}

Verifica come viene eseguito il processo di staking per i profili di validatore e delegatore:

* [Operazioni di staking del validatore](docs/maintain/validate/validator-staking-operations)
* [Delegare](/docs/maintain/delegate/delegate)
