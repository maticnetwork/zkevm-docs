---
id: staking
title: Fare il passo a Polygon
description: Fare il passo a Polygon
keywords:
  - docs
  - polygon
  - matic
  - staking
  - unstake
  - restake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Fare il passo a Polygon {#staking-on-polygon}

Per la Polygon Network, ogni partecipante può essere qualificato per diventare un validatore di rete eseguendo un nodo completo. L'incentivo principale per l'esecuzione di un nodo completo per i validatori è quello di guadagnare le commissioni di ricompense e di transazione. Il validatore che partecipa al consensus per Polygon è incentivato a partecipare poiché riceve ricompense in blocco e commissioni di transazione.

Poiché le slot per i validatori sono limitate per la rete, il processo per essere selezionato come validatore è quello di partecipare a un'asta on-chain che avviene a intervalli regolari come definito [qui](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716).

## Stake {#stake}

Se lo slot è aperto, allora l'asta è iniziata per i validatori interessati:

- Dove offriranno di più dell'ultima offerta fatta per lo slot.
- Il Processo di Partecipazione all'Asta è delineato qui:
    - L'Asta viene avviata automaticamente una volta che lo slot è aperto.
    - Per avviare la partecipazione all'asta, Chiama `startAuction()`
    - In questo modo bloccherai i tuoi asset in Stack Manager.
    - Se un altro potenziale validatore gioca più di quello della tua stake, allora i token chiusi saranno restituiti a te.
    - Ancora una volta, puntare di più per vincere l'asta.
- Al termine del periodo d'asta, il più alto offerente vince e diventa un Validatore sulla rete Polygon.

:::note

Se stai partecipando all'asta si prega di mantenere il tuo nodo completo in esecuzione.

:::

Il processo di diventare un validatore dopo che il più alto offerente vince la slot è descritto di seguito:

- Chiama `confirmAuction()` per confermare la tua partecipazione.
- Bridge su Heimdall ascolta questo evento e trasmette a Heimdall.
- Dopo il consenso, il validator viene aggiunto a Heimdall ma non è attivato.
- Validator inizia a convalidare solo dopo `startEpoch`(definito [qui)](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187).
- Non appena `startEpoch`raggiunto, il validatore viene aggiunto e inizia `validator-set`a partecipare al meccanismo di consenso.

:::info Recommended

Per garantire la sicurezza per gli stake dei validatori, consigliamo ai validatori di fornire un indirizzo `signer` diverso da cui sarà gestita la verifica di `checkPoint`. Questo è per mantenere la firma della chiave separata dalla chiave del wallet del validator in modo che i fondi siano protetti in caso di nodo hack.

:::

### Annulla lo stake {#unstake}

Lo scartamento consente al validatore di essere fuori dal pool attivo dei validatori. Per garantire **una buona partecipazione**, la loro partecipazione è bloccata per i prossimi 21 giorni.

Quando i validatori vogliono uscire dalla rete e smettere di convalidare i blocchi e di inviare i checkpoint, possono `unstake`. Questa azione è immediata fin d'ora. Dopo questa azione, il validatore viene considerato fuori dal set attivo di validatori.

### Restaking {#restake}

I validatori possono anche aggiungere più puntata alla loro quantità per guadagnare più ricompense e essere competitivi per il loro punto di validatore e mantenere la loro posizione.
