---
id: what-is-proof-of-stake
title: Che cos'è la Proof-of-Stake?
description: Scopri cosa è il meccanismo di consenso della prova di Stake
keywords:
  - docs
  - matic
  - polygon
  - stake
  - delegate
  - validate
  - pos
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Che cos'è la Proof-of-Stake? {#what-is-proof-of-stake}

Il Proof-of-Stake (PoS) è una categoria di algoritmi di consenso per le blockchain pubbliche basato sullo [stake](/docs/maintain/glossary.md#staking) di un validatore sulla rete.

Nelle blockchain pubbliche Proof of Work (PoW), l'algoritmo premia i partecipanti in grado di risolvere dei puzzle crittografici per convalidare le transazioni e creare nuovi blocchi. esempi di blockchain: Bitcoin, Ethereum (prima di unirsi).

Nelle blockchain pubbliche PoS, un insieme di validatori fa a turno nel proporre e convalidare il blocco successivo. Il peso del voto di ciascun validatore dipende dall'entità del proprio deposito, il cosiddetto [stake](/docs/maintain/glossary.md#staking). I vantaggi principali del protocollo di consenso PoS includono la sicurezza, il rischio ridotto di centralizzazione e l'efficienza energetica. Esempi di blockchain: Ethereum 2.0, Polygon.

In generale, un algoritmo di consenso PoS appare in questo modo La blockchain tiene traccia di una serie di validatori e chiunque sia in possesso della crittografia di base della blockchain (nel caso di Ethereum, ETH) può diventare un validatore inviando una speciale transazione che blocca la propria ETH in una deposita. Il processo di creazione e accettazione dei nuovi blocchi viene eseguito tramite un algoritmo di consenso a cui possono partecipare tutti gli attuali validatori.

Esistono vari tipi di algoritmi di consenso e molti modi per assegnare le ricompense ai validatori che partecipino al meccanismo di consenso, quindi esistono tante "varietà" di Proof of Stake. Dalla prospettiva algoritmica, ci sono due tipi principali: PoS a catena e [PoS in stile BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

Nel protocollo **Proof of Stake basato sulla chain**, l'algoritmo seleziona in modo pseudo-casuale un validatore durante ogni slot di tempo (ad es., uno slot potrebbe essere un intervallo di 10 secondi) e gli assegna il diritto di creare un singolo blocco, il quale deve essere collegato a un blocco precedente (di norma il blocco al termine della precedente catena più lunga) e quindi col tempo la maggior parte dei blocchi convergono in un'unica catena in costante crescita.

In **BFT Proof of Stake**, i validatori vengono assegnati **a caso** il diritto di **proporre** blocchi. Il accordo su cui è **canonico** avviene attraverso un processo multi-round in cui ogni validatore invia una **Vota** per un blocco specifico durante ogni round e alla fine del processo, tutti i validatori (onesti e online) concordano in modo permanente se qualsiasi blocco sia parte della catena. Si noti che i blocchi possono ancora essere **chained insieme**. La differenza fondamentale è che il consenso su un blocco può entrare in un blocco e non dipende dalla lunghezza o dalle dimensioni della catena dopo di esso.

Per ulteriori dettagli, fare riferimento a [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

## Vedi anche {#see-also}

* [Delegatore](/docs/maintain/glossary.md#delegator)
* [Validatore](/docs/maintain/glossary.md#validator)
