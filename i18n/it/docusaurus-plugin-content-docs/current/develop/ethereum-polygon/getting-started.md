---
id: getting-started
title: Bridge Ethereum↔Polygon
sidebar_label: Overview
description: Un canale di transazione bidirezionale tra Polygon ed Ethereum.
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon ti offre un canale di transazione bidirezionale affidabile tra Polygon ed Ethereum con l'introduzione del bridge cross-chain con sicurezza Plasma e PoS. Grazie a questo strumento gli utenti possono trasferire token su Polygon senza incorrere in rischi di terzi e limitazioni di liquidità del mercato. **Il Plasma e il PoS Bridge sono disponibili sia su Mumbai Testnet che su Polygon Mainnet**.

**Polygon bridge fornisce un meccanismo di ponte che è quasi istantaneo, a basso costo e abbastanza flessibile**. Polygon utilizza un'architettura a doppio consenso (piattaforma Plasma + Proof-of-Stake (PoS))
ottimizzare per la velocità e la decentralizzazione. Abbiamo volutamente progettato il sistema perché supporti transizioni di stato arbitrarie sulle nostre sidechain, che sono abilitate all'EVM.

**Quando il tuo token passa per il bridge, l'offerta dei token in circolazione non subisce alcuna modifica**:

- I Token che lasciano la rete Ethereum sono bloccati e lo stesso numero di token vengono coniati su Polygon come un token pegged (1:1).
- Per riportare i token sulla rete di ethereum, i token vengono bruciati sulla rete di Polygon e durante il processo vengono sbloccati sulla rete di ethereum.

## PoS e Plasma {#pos-vs-plasma}

|                                      | Bridge PoS (consigliato) | Plasma bridge |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Breve descrizione** | DApp Developers che cerca una flessibilità e un prelievo più rapido con la sicurezza del sistema POS. | Sviluppatori di dApp che cercano maggiori garanzie di sicurezza con il meccanismo di uscita Plasma. |
| **Struttura** | Estremamente flessibile | Rigida, meno flessibile |
| **Deposito (Ethereum → Polygon)** | 22-30 minuti | 22-30 minuti |
| **Prelievo (Polygon → Ethereum)** | 1 checkpoint = ~ 30 minuti a 6 ore | Chiamare la procedura di uscita del processo sul contratto di Ethereum |
| **Sicurezza** | Sistema Proof-of-Stake, protetto da un solido insieme di validatori esterni. | I contratti plasma di Polygon sfruttano la sicurezza di Ethereum. |
| **Standard supportati** | ETH, ERC20, ERC721, ERC1155 e altri | Solo ETH, ERC20, ERC721 |

:::info

[**FxPortal**](/develop/l1-l2-communication/fx-portal.md) è un altro tipo di ponte che è molto simile al PoS Bridge. Condividono le stesse caratteristiche di cui sopra per il PoS. L'unica differenza è che i Token non devono essere mappati sul FxPortal Bridge prima di essere ponti. La mappatura avviene durante la prima transazione di deposito che viene avviata per un dato token. Inoltre, chiunque può utilizzare il FxPortal per costruire le proprie tunnel/ponti personalizzati sopra il ponte di Polygon. È altamente raccomandato utilizzare la FxPortal per qualsiasi caso d'uso di ponte. Nuove mappature di token su PoS e Plasma saranno scoraggiate dopo il 31 gen 2023, in modo che il processo di mappatura sia completamente decentralizzato e flessibile.

:::

## Ulteriori risorse {#additional-resources}

- [Introduzione a Blockchain Bridges](https://ethereum.org/en/bridges/)
- [Cosa sono i ponti di Cross-Chain](https://www.alchemy.com/overviews/cross-chain-bridges)
