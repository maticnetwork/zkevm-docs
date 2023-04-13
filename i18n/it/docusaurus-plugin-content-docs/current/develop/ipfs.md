---
id: ipfs
title: IPFS
description: "IPFS - sistema distribuito per l'archiviazione e l'accesso ai dati."
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### Contesto {#context}

La blockchain di Polygon riduce i costi di transazione per l'archiviazione dei dati rispetto alla mainnet di Ethereum; tuttavia, anche questi bassi costi possono sommarsi rapidamente quando si archiviano file di grandi dimensioni. Gli sviluppatori devono inoltre considerare i vincoli di dimensione dei blocchi e le limitazioni di velocità delle transazioni quando memorizzano i dati sulla catena. Una soluzione che affronta tutte queste preoccupazioni è l'IPFS, il File System InterPlanet.

#### Che cos'è l'IPFS? {#what-is-ipfs}

IPFS è un sistema distribuito per l'archiviazione e l'accesso a file, siti web, applicazioni e dati. IPFS utilizza la decentralizzazione, l'indirizzamento dei contenuti e una solida rete peer-to-peer di partecipanti attivi per consentire agli utenti di memorizzare, richiedere e trasferire dati verificabili tra loro.

La decentralizzazione consente di scaricare un file da molte postazioni non gestite da un'unica organizzazione, garantendo resilienza e resistenza alla censura fin da subito.

L'indirizzamento dei contenuti utilizza la crittografia per creare un hash verificabile in modo univoco in base al contenuto di un file piuttosto che alla sua posizione. L'identificatore di contenuto (CID) che ne deriva garantisce che un dato sia identico indipendentemente dal luogo in cui viene memorizzato.

Infine, una comunità attiva di utenti in continua crescita rende possibile la condivisione di contenuti tra pari. Gli sviluppatori caricano e pin il contenuto in IPFS mentre i provider di archiviazione Filecoin o Crust aiutano a garantire una persistente memorizzazione di questo contenuto.


L'archiviazione basata su IPFS consente di memorizzare semplicemente il CID dei contenuti anziché caricare interi file sulla blockchain di Polygon; ciò consente di ridurre i costi, di aumentare le dimensioni dei file e di garantire la persistenza dell'archiviazione. Per maggiori dettagli fare riferimento [alle IPFS Doc](https://docs.ipfs.io/).

### Progetti di esempio {#example-projects}

1. Tutorial in scaffold-eth che mostra come creare una NFT su Polygon con IPFS - [link](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. Costruire un'app web 33 full stack con Next.js, Polygon, Solidity, Il grafico, IPFS e Hardhat - [link](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)
