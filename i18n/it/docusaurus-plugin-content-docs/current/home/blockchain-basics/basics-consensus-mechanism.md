---
id: consensus-mechanism
title: Meccanismo di consensus
description: "PoW, pos , DPoS, PoSpace e PoET."
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Meccanismo di consensus {#consensus-mechanism}

Un meccanismo di consensus è un meccanismo tollerante ai guasti utilizzato nei sistemi informatici e blockchain per raggiungere l'accordo necessario su un singolo valore di dati o su un singolo stato della rete tra processi distribuiti o sistemi multi-agente, come con le criptovalute.

## Tipi di meccanismo di consensus {#types-of-consensus-mechanism}

### Prova del lavoro {#proof-of-work}
Proof of work descrive un sistema che richiede una importo non insignificante ma fattibile di sforzo per scoraggiare gli attacchi dos (denial-of-service) e altri attacchi malevoli. Richiede una sfida per la sua elaborazione per creare nuovi blocchi in Blockchain.

### Proof-of-Stake {#proof-of-stake}
Il meccanismo di prova raggiunge il consenso imponendo agli utenti di puntare una quantità di token in modo da avere la possibilità di essere selezionato per convalidare blocchi di transazioni, e ottenere ricompensato per farlo. La priorità è data ai minatori che hanno acquistato la maggior parte di stake nel sistema blockchain.

### Prova Delegata di gioco {#delegated-proof-of-stake}
Questa forma di consensus rispecchia l'elezione dei membri negli organi direttivi. Invece di mettere a punto le proprie risorse, le parti interessate possono delegare questa attività a terzi, ai testimoni o ai delegati, che parteciperanno al processo di consenso. Testimoni, coloro che convalidano le transazioni, di solito presentano una proposta, chiedono voti e sono eletti dalle parti interessate. Le ricompense ottenute da tali entità sono solitamente condivise con i partecipanti alla rete.

### Prova dello spazio {#proof-of-space}
Questo meccanismo di consenso è utile nelle applicazioni di archiviazione dei file decentralizzate come in Storj.io, Filecoin e Crust, dove i nodi dimostrano di avere una legittima capacità nel proprio hardware. Tuttavia, invece di utilizzare il calcolo pesante come nel meccanismo PoW, è utile la capacità di archiviazione di ogni nodo. A volte indicato anche come PoStorage o PoCapacity.

### Prova del tempo trascorso {#proof-of-elapsed-time}
Un'alternativa migliore alla PoW, che consuma minori risorse computazionali. Ogni nodo partecipante deve aspettare una quantità di tempo casuale e il primo nodo per svegliarsi dal sonno ottiene la possibilità di creare un nuovo blocco, che viene poi propagato attraverso la rete. Richiede Ambienti di Esecuzione fidata ( TEE ) come Intel SGX, che sono una parte isolata della memoria e può essere accessibile solo con una certa serie di istruzioni.

## **Risorse**

- [Tolleranza alla gualla bizantina](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [Tipo di Consensus Mechanisms](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [Panoramica e storia dello sviluppo del Consensus System](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [Comprensione del consenso distribuito](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [Problema dei generali bizantini](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)