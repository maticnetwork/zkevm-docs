---
id: what-is-proof-of-stake
title: Che cos'è la Proof-of-Stake?
description: Un algoritmo di consenso che si affida ai validatori.
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

# Prova di gioco (PoS) {#proof-of-stake-pos}

Il Proof-of-Stake (PoS) è una categoria di algoritmi di consenso per le blockchain pubbliche basato sullo [stake](/docs/maintain/glossary#staking) di un validatore sulla rete.

Nelle blockchain pubbliche Proof of Work (PoW), l'algoritmo premia i partecipanti in grado di risolvere dei puzzle crittografici per convalidare le transazioni e creare nuovi blocchi. esempi di blockchain di PoW: Bitcoin, precedente Ethereum.

Nelle blockchain pubbliche PoS, un insieme di validatori fa a turno nel proporre e convalidare il blocco successivo. Il peso del voto di ciascun validatore dipende dall'entità del proprio deposito, il cosiddetto [stake](/docs/maintain/glossary#staking). I vantaggi principali del protocollo di consenso PoS includono la sicurezza, il rischio ridotto di centralizzazione e l'efficienza energetica. Esempi di blockchain PoS: Eth2, Polygon.

In generale, un algoritmo di consenso PoS appare in questo modo La blockchain tiene traccia di un insieme di validatori e chiunque possegga la criptovaluta nativa della blockchain (nel caso di Ethereum, ether) può diventare un validatore inviando uno speciale tipo di transazione per vincolare i propri ehter in un deposito. Il processo di creazione e accettazione dei nuovi blocchi viene eseguito tramite un algoritmo di consenso a cui possono partecipare tutti gli attuali validatori.

Esistono vari tipi di algoritmi di consenso e molti modi per assegnare le ricompense ai validatori che partecipino al meccanismo di consenso, quindi esistono tante "varietà" di Proof of Stake. Da un punto di vista dell'algoritmo, i tipi principali sono due: PoS basati sulla chain e PoS basati su [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

Nel protocollo **Proof of Stake basato sulla chain**, l'algoritmo seleziona in modo pseudo-casuale un validatore durante ogni slot di tempo (ad es., uno slot potrebbe essere un intervallo di 10 secondi) e gli assegna il diritto di creare un singolo blocco, il quale deve essere collegato a un blocco precedente (di norma il blocco al termine della precedente catena più lunga) e quindi col tempo la maggior parte dei blocchi convergono in un'unica catena in costante crescita.

Nel protocollo **Proof of Stake basato su BFT**, ai validatori viene assegnato **casualmente** il diritto di *proporre* dei blocchi, ma *il processo per stabilire quale blocco divenga canonico* viene effettuato tramite un processo su più round durante il quale ciascun validatore invia un "voto" per un blocco specifico ad ogni round. Al termine del processo, tutti i validatori (onesti e online) concordano sull'appartenenza permanente di un blocco alla catena. Tieni presente che i blocchi possono essere ancora *concatenati*; la differenza principale risiede nel fatto che il consenso su un blocco possa avvenire entro un solo blocco e non dipenda dalla lunghezza o dimensione della catena dopo di esso.

Per ulteriori dettagli consultare [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

Vedi anche:

* [Delegatore](/docs/maintain/glossary#delegator)
* [Validatore](/docs/maintain/glossary#validator)
