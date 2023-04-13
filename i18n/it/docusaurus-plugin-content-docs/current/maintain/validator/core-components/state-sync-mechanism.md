---
id: state-sync-mechanism
title: Meccanismo di sincronizzazione dello stato
description: Meccanismo di stato per leggere nativamente i dati Ethereum
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

I validatori sul layer [Heimdall](/docs/maintain/glossary.md#heimdall) acquisiscono l'evento [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) e trasmettono l'evento al layer [Bor](/docs/maintain/glossary.md#bor). Vedi anche [Architettura di Polygon](/docs/pos/polygon-architecture).

Il **contratto ricevitore** eredita [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol), mentre la logica personalizzata si trova all'interno della funzione [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5).

L'ultima versione, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contiene alcuni miglioramenti come:
1. Limitare la dimensione dei dati in stato di sincronizzazione txs a:
    * **30Kb** se rappresentato in **byte**
    * **60Kb** se rappresentato in **stringa**.
2. Aumentare il **ritardo** tra gli eventi del contratto di diversi validatori per far sì che il mempool non si riempa troppo rapidamente in caso di una raffica di eventi che potrebbe ostacolare il progresso della catena.

Il seguente esempio mostra come la dimensione dei dati sia limitata:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## Requisiti per gli utenti {#requirements-for-the-users}

Aspetti necessari affinché le dApp/gli utenti possano lavorare con state-sync:

1. Chiamare la funzione [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33).
2. La funzione `syncState` emette un evento chiamato `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`
3. Tutti i validatori sulla catena Heimdall ricevono l'evento `StateSynced`. Qualsiasi validatore che desideri ottenere la commissione della transazione state sync invia la transazione a Heimdall.
4. Una volta che la transazione `state-sync` su Heimdall sia inclusa in un blocco, viene aggiunta all'elenco state sync in attesa.
5. Dopo ogni sprint su Bor, il nodo Bor recupera gli eventi state sync in attesa da Heimdall mediante una chiamata API.
6. Il contratto ricevitore eredita l'interfaccia `IStateReceiver` e la logica personalizzata per la decodifica dei byte di dati e per l'esecuzione di qualsiasi azione all'interno della funzione [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol).
