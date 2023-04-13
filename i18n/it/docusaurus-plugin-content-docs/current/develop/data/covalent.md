---
id: covalent
title: Usare Covalent
sidebar_label: Covalent
description: Scopri come utilizzare l'API unificata di Covalent per i dati
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## Introduzione {#introduction}

Polygon migliora notevolmente la scalabilità su Ethereum utilizzando una versione adattata di Plasma
con sidechain basati su PoS che forniscono una soluzione per transazioni più rapide ed
estremamente economiche con finalità sulla catena principale. La rete di Polygon assicura
la continuità utilizzando i checkpoint PoS che vengono inviati alla mainchain di Ethereum.
In questo modo una singola sidechain Polygon riesce a elaborare teoricamente `2^16` transazioni
per blocco e potenzialmente milioni di transazioni su più catene in futuro.

### In breve {#quick-facts}

<TableWrap>

| Proprietà | Valore |
|---|---|
| Polygon Mainnet chainId  | `137` |
| Testnet Polygon Mumbai chainId | `80001` |
| Explorer Polygon Blockchain | https://polygonscan.com/ |
| Tempo di blocco | ~3 secondi |
| Latenza di aggiornamento dei dati | ~6 secondi o 2 blocchi |

</TableWrap>

:::tip Avvio veloce

Guarda **[<ins>questo video introduttivo</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**
per iniziare.

:::

## Endpoint supportati {#supported-endpoints}

Tutti gli endpoint di [__Classe A__](https://www.covalenthq.com/docs/api/#tag--Class-A) sono supportati per la mainnet Matic e la testnet Mumbai. Puoi inviare una richiesta su una delle reti tramite l'API unificata modificando il file `chainId`.

:::info Endpoint

Un elenco completo di tutte le richieste che puoi inviare sulla rete di Polygon usando Covalent
è disponibile nella [<ins>Documentazione dell'API Covalent</ins>](https://www.covalenthq.com/docs/api/).

:::

---

## Appendice {#appendix}

### Token Matic Gas {#matic-gas-token}

Per interagire con la rete Matic sono necessari token MATIC da pagare come gas fee. Le risposte di Covalent
restituiscono automaticamente i campi `gas_*` nelle unità MATIC.

### Mappatura dei token {#token-mapping}

Covalent mantiene una mappatura in tempo reale on-chain degli indirizzi dei token tra la Ethereum mainnet e la catena Matic. Questi indirizzi vengono utilizzati per eseguire la ricerca inversa dei prezzi su Matic e anche per restituire gli URL esatti del logo del token.

Alcuni esempi di token mappati:

| Token | Ethereum mainnet | Mainnet Matic |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### Prezzi dei token {#token-prices}

Per i token con mappatura sulla Ethereum mainnet, Covalent è in grado di restituire i prezzi mappati.
