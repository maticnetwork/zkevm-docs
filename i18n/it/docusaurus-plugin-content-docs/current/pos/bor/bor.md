---
id: bor
title: Architettura Bor
description: Il ruolo di Bor nell'architettura Polygon
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Architettura Bor {#bor-architecture}

Polygon è una piattaforma ibrida di **Plasma + Proof-of-Stake (PoS)**. Utilizziamo un'architettura a doppio consenso sul Polygon Network per ottimizzare la velocità e la decentralizzazione. Abbiamo progettato volutamente il sistema per supportare transizioni di stato arbitrarie sulle nostre sidechain, che sono abilitate per EVM.

## Architettura {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

Una blockchain è un insieme di client di network che interagiscono e lavorano insieme. Il client è un software in grado di stabilire un canale di comunicazione p2p con altri client, firmare e trasmettere transazioni, distribuire e interagire con gli smart contract, ecc. Il client viene spesso chiamato "nodo".

Per Polygon, il nodo è progettato con una implementazione a due strati Heimdall (Validator Layer) e Bor(Block Producer Layer).

1. Heimdall
    - Verifica Proof-of-Stake
    - Checkpoint dei blocchi sulla catena principale di Ethereum
    - Gestione di validatori e ricompense
    - Garantire la sincronizzazione con la catena principale di Ethereum
    - Bridge decentralizzato
2. Bor
    - Catena di Polygon
    - VM compatibile con EVM
    - Selezione del set di proponenti e produttori
    - SystemCall
    - Modello di commissione

## Heimdall (strato di validatore) {#heimdall-validator-layer}

Heimdall (the è il purveyor di tutto ciò che avviene nel sistema di Polygon Proof-of-Stake, buono o male.

Heimdall è il nostro livello verificatore della proof-of-stake, responsabile della creazione di un checkpoint per la rappresentazione dei blocchi Plasma sulla catena principale della nostra architettura. Lo abbiamo implementato partendo dal motore di consenso Tendermint e modificando lo schema della firma e diverse strutture di dati.

Per maggiori informazioni, leggi [https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/).

## Bor (il layer produttore di blocchi) {#bor-block-producer-layer}

L'implementazione del nodo Bor è fondamentalmente l'operatore sidechain. La VM della sidechain è compatibile con la EVM. Al momento, è un'implementazione Geth di livello base con un algoritmo di consenso modificato in modo specifico. Tuttavia, verrà ricostruito da zero per renderlo leggero e mirato.

Bor è il nostro layer produttore di blocchi, che in sincronia con Heimdall seleziona i produttori e i verificatori per ogni span e sprint. Le interazioni per gli utenti di Polygon avvengono su questa sidechain, che è compatibile con EVM per sfruttare le funzionalità e la compatibilità degli strumenti e delle applicazioni per sviluppatori di Ethereum.

### Catena di Polygon {#polygon-chain}

Questa catena è una blockchain separata che viene collegata a Ethereum utilizzando un peg bidirezionale. Il peg bidirezionale consente l'intercambiabilità degli asset tra Ethereum e Polygon.

### VM compatibile con EVM {#evm-compatible-vm}

La Ethereum Virtual Machine (EVM) è un potente stack virtuale sandboxed incorporato in ogni nodo Polygon completo, responsabile dell'esecuzione del bytecode dei contratti. I contratti sono in genere scritti in linguaggi di livello superiore, come Solidity, e poi compilati in bytecode EVM.

### Selezione dei proponenti e dei produttori {#proposers-and-producers-selection}

I produttori di blocchi per il livello Bor sono un comitato selezionato dal pool di Validator in base alla loro partecipazione, che avviene a intervalli regolari e viene rimescolata periodicamente. Questi intervalli vengono decisi dalla governance del validatore alla luce della dinastia e della rete.

Il rapporto tra stake/potere di staking indica la probabilità di essere selezionati come membri del comitato di produttori del blocco.

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### Processo di selezione {#selection-process}

- Supponiamo di avere 3 validatori in pool, che sono Alice, Bill e Clara.
- Alice ha eseguito lo staking di 100 token Matic mentre Bill e Clara hanno eseguito lo staking di 40 token Matic.
- I validatori ricevono slot in base allo stake: Alice ha eseguito lo staking di 100 token Matic e riceverà slot in proporzione. Alice otterrà 5 slot in totale. Analogamente, Bill e Clara ricevono in totale 2 slot.
- A tutti i validatori vengono assegnati questi slot [A, A, A, A, A, B, B, C, C]
- Utilizzando i dati storici dei blocchi di Ethereum come seme, mescoliamo questo array.
- Dopo aver rimescolato gli slot utilizzando il seme, diciamo che otteniamo questo array [A, B, A, A, C, B, A, A, C]
- Ora, in base al conteggio dei produttori* (mantenuto dalla governance del validatore)*, si estraggono i validatori dall'alto. Ad esempio, se vogliamo selezionare 5 produttori, otterremo un set di produttori come [A, B, A, A, C]
- Il set del produttore per il prossimo span viene quindi definito come [A: 3, B:1, C:1].
- Utilizzando questo set di validatori e l'algoritmo di selezione dei proponenti di tendermint, scegliamo un produttore per ogni sprint su BOR.

### Interfaccia SystemCall {#systemcall-interface}

SystemCall è un indirizzo interno dell'operatore che si trova sotto EVM. Questo aiuta a mantenere lo stato dei produttori di blocchi per ogni sprint. Verso la fine di uno sprint viene attivata una System Call e viene richiesta la nuova lista di produttori di blocchi. Una volta aggiornato lo stato, le modifiche vengono ricevute dopo la generazione del blocco su Bor a tutti i validatori.

### funzioni {#functions}

#### proposeState {#proposestate}

- La chiamata è consentita solo ai validatori.
- Ispeziona `stateId` per capire se è già proposto o impegnato.
- Proponi il `stateId` e aggiorna il flag su `true`.

#### commitState {#commitstate}

- La chiamata è consentita solo al sistema.
- Ispeziona `stateId` per capire se è già proposto o impegnato.
- Notifica il contratto `StateReceiver` con il nuovo `stateId`.
- Aggiorna il flag `state` su `true` e `remove` il `proposedState`.

#### proposeSpan {#proposespan}

- La chiamata è consentita solo ai validatori.
- Controlla se la proposta di Span è `pending`.
- Aggiorna la Proposta di Span per `true`

#### proposeCommit {#proposecommit}

- La chiamata è consentita solo al sistema.
- Imposta `initial validators` se lo span attuale è zero.
- Controlla le condizioni per `spanId`e `time_period` di Sprint e Span.
- Aggiorna il nuovo `span` e `time_period`.
- Imposta `validators` e `blockProducers` per il `sprint`.
- Aggiorna il flag per `spanProposal` su `true`.

### Modello di commissione Bor {#bor-fee-model}

Per le normali transazioni, le commissioni in token Matic vengono raccolte e distribuite ai produttori di blocchi, in modo simile alle transazioni di Ethereum.

Come altre blockchain, Polygon ha un token nativo chiamato Matic(MATIC). MATIC è un token ERC20 utilizzato principalmente per il pagamento di gas (commissioni di transazione) su Polygon e per il picchettaggio.

:::info

Una cosa importante da notare è che sulla catena Polygon, il token MATIC funziona come token ERC20, ma anche come token nativo, entrambi allo stesso tempo. Pertanto, ciò significa che un utente può pagare il gas con MATIC e inviare MATIC ad altri account.

:::

Per le genesis-contracts, `gasPrice`e `gasLimit`funziona come Ethereum, ma durante l'esecuzione non dedurre le commissioni dal conto del mittente.

Le transazioni genesis dei validatori attuali vengono eseguite con `gasPrice = 0`.

Inoltre, i validatori devono inviare secondo tipi di transazione, come proposte di Stato come depositi e proposte Span su Bor.

## Informazioni tecniche {#technical-insight}

### Contratti Genesis {#genesis-contracts}

[BorValidatorSet(0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒ Questo contratto gestisce il set di validatori per ogni arco di tempo e per ogni sprint.

[BorStateReceiver(0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒ Questo Contratto gestisce il trasferimento dei dati dei contratti arbitrari dai contratti Ethereum ai contratti Polygon.

MaticChildERC20(0x1010) ⇒ Contratto figlio per i token della catena principale che permette di spostare le attività da Ethereum a Polygon.

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

Protocollo Bor

## Glossario {#glossary}

- StartEpoch - Numero di checkpoint dopo il quale un validatore viene attivato e parteciperà al consenso.
- EndEpoch - Numero di checkpoint dopo il quale un validatore è considerato disattivato e non parteciperà al consenso.
- Sprint - Lo sprint è un insieme continuo di blocchi creati da un singolo validatore.
- Span - Lo Span è un grande insieme di blocchi con un set di validatori fisso ma composto da vari sprint. Ad esempio, per uno span di lunghezza pari a 6400 blocchi, sarà composto da 100 sprint di 64 blocchi.
- Dinastia: tempo intercorso tra la fine dell'ultima asta e l'inizio della successiva.

## Risorse {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [Come funziona EVM?](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [Tendermint Selezione Proposer](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
