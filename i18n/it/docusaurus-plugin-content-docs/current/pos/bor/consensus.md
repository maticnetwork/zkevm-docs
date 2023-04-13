---
id: consensus
title: Consensus Bor
description: Meccanismo di bor per la ricerca di nuovi produttori
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Consensus Bor {#bor-consensus}

Il consenso di Bor è ispirato al consenso di Clique: [https://eips.ethereum.org/EIPS/eip-225](https://eips.ethereum.org/EIPS/eip-225). Clique lavora con più produttori predefiniti. Tutti i produttori votano sui nuovi produttori che utilizzano le API di Clique. Si prendono a turno la creazione di blocchi.

Bor individua nuovi produttori attraverso il meccanismo di gestione dello span e dello sprint.

## Validatori {#validators}

Polygon è un sistema Proof-of-stake. Chiunque può mettere in staking il proprio token Matic sullo smart-contract di Ethereum, "contratto di staking", e diventare un validatore del sistema.

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

Una volta che i validatori sono attivi su Heimdall, vengono selezionati come produttori attraverso il modulo `bor`.

Controlla la panoramica di Bor per capire la gestione di span più nei [dettagli:](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab)

## Span {#span}

Un insieme di blocchi logicamente definiti per i quali una serie di validatori è scelta tra tutti i validatori disponibili. Heimdall fornisce i dettagli dello span attraverso le API span-details.

```go
// HeimdallSpan represents span from heimdall APIs
type HeimdallSpan struct {
	Span
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}

// Span represents a current bor span
type Span struct {
	ID         uint64 `json:"span_id" yaml:"span_id"`
	StartBlock uint64 `json:"start_block" yaml:"start_block"`
	EndBlock   uint64 `json:"end_block" yaml:"end_block"`
}

// Validator represents a volatile state for each Validator
type Validator struct {
	ID               uint64         `json:"ID"`
	Address          common.Address `json:"signer"`
	VotingPower      int64          `json:"power"`
	ProposerPriority int64          `json:"accum"`
}
```

Geth (In questo caso, Bor) utilizza il blocco `snapshot` per memorizzare i dati di stato per ciascun blocco, inclusi quelli relativi al consensus.

Ogni validatore nello span contiene potere di voto. In base alla loro potenza, vengono selezionati come produttori di blocchi. Maggiore è la potenza, maggiore è la probabilità di diventare produttori di blocchi. Bor utilizza l'algoritmo di Tendermint per lo stesso scopo. Fonte: [https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## Sprint {#sprint}

Un set di blocchi all'interno di uno span per il quale viene scelto un singolo produttore del blocco per produrne altri. La dimensione dello sprint è un fattore di dimensione di campata. Bor utilizza `validatorSet` per ottenere il proponente/produttore corrente per lo sprint attuale.

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

A parte l'attuale proponente, Bor seleziona i produttori di back-up.

## Autorizzare un blocco {#authorizing-a-block}

I produttori di Bor sono anche chiamati firmatari poiché, per autorizzare un blocco per la rete, il produttore deve firmare l'hash del blocco che contiene **tutto tranne la firma stessa**. Ciò significa che l'hash contiene tutti i campi dell'intestazione e anche `extraData` a eccezione del suffisso di firma di 65 byte.

Questo hash viene firmato utilizzando la curva `secp256k1` standard e la firma risultante di 65 byte è incorporata in `extraData` come suffisso finale di 65 byte.

Ciascun blocco firmato viene assegnato a una difficoltà che attribuisce un peso al blocco. La firma in turno pesa di più (`DIFF_INTURN`) rispetto a quella fuori turno (`DIFF_NOTURN`).

### Strategie di autorizzazione {#authorization-strategies}

Finché i produttori si conformano alle specifiche di cui sopra, possono autorizzare e distribuire i blocchi come ritengono opportuno. La seguente strategia suggerita ridurrà tuttavia il traffico di rete e i piccoli fork, quindi è una funzionalità consigliata:

- Se un produttore è autorizzato a firmare un blocco (è nell'elenco autorizzato)
    - Calcola il tempo di firma ottimale del blocco successivo (genitore + `Period`)
    - Se il produttore è di turno, attende che arrivi l'ora esatta, firma e trasmette immediatamente
    - Se il produttore è fuori turno, ritarda la firma con un `wiggle`

Questa piccola strategia garantirà che il produttore di turno (il cui blocco pesa di più) abbia un leggero vantaggio nel firmare e propagarsi rispetto ai firmatari fuori turno. Inoltre, lo schema permette un po' di scalabilità con un aumento del numero di produttori.

### Firma fuori turno {#out-of-turn-signing}

Bor sceglie più produttori di blocco come backup quando il produttore di turno non produce un blocco. Questo potrebbe accadere per una serie di motivi come:

- Il nodo del produttore del blocco è inattivo
- Il produttore del blocco sta cercando di trattenere il blocco
- Il produttore del blocco non sta producendo un blocco intenzionalmente.

Quando ciò accade, entra in gioco il meccanismo di backup di Bor.

In qualsiasi momento il set di validatori viene archiviato come un array ordinato in base all'indirizzo del firmatario. Supponiamo che il set di validatori sia ordinato come A, B, C, D e che sia il turno di C di produrre un blocco. Se C non produce un blocco entro un tempo sufficiente, D diventa di turno per produrne uno a sua volta. Se D non lo fa, allora lo farà A e poi B.

Tuttavia, poiché ci vorrà del tempo prima che C produca e propaghi un blocco, i validatori di backup attenderanno un certo periodo di tempo prima di iniziare a produrre un blocco. Questo ritardo è chiamato oscillazione.

### Oscillazione {#wiggle}

L'oscillazione è il tempo che un produttore dovrebbe attendere prima di iniziare a produrre un blocco.

- Supponiamo che l'ultimo blocco (n-1) sia stato prodotto all'istante `t`.
- Applichiamo un ritardo minimo tra il blocco corrente e quello successivo mediante un parametro variabile `Period`.
- In condizioni ideali, C aspetterà `Period` e quindi produrrà e propagherà il blocco. Poiché i tempi di blocco in Polygon sono progettati per essere piuttosto bassi (2-4 s), si presume che anche il ritardo di propagazione sia lo stesso valore di `Period`.
- Quindi, se D non vede un nuovo blocco in un tempo `2 * Period`, D inizia immediatamente a produrre un blocco. In particolare, il tempo di oscillazione di D è definito come `2 * Period * (pos(d) - pos(c))` dove `pos(d) = 3` e `pos(c) = 2` nel set di validatori. Supponendo, `Period = 1`, l'oscillazione per D è di 2s.
- Ora se D non produce un blocco, A inizierà a produrne uno quando il tempo di oscillazione di `2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s` è scaduto.
- Analogamente, l'oscillazione per C è `6s`

### Risoluzione dei fork {#resolving-forks}

Mentre il meccanismo di cui sopra aumenta in una certa misura la robustezza della catena, introduce la possibilità di fork. Potrebbe effettivamente essere possibile che C abbia prodotto un blocco, ma che ci sia stato un ritardo maggiore del previsto nella propagazione e che quindi anche D abbia prodotto un blocco, il che porta ad almeno 2 fork.

La risoluzione è semplice: scegliere la catena con maggiore difficoltà. Ma allora la domanda è: come definiamo la difficoltà di un blocco nella nostra configurazione?

### Difficoltà {#difficulty}

- La difficoltà di un blocco prodotto da un firmatario di turno (ad esempio C) è definita come la più alta = `len(validatorSet)`.
- Poiché D è il produttore successivo, se e quando si verifica la situazione in cui D produce il blocco, la difficoltà del blocco sarà definita, proprio come in oscillazione, come `len(validatorSet) - (pos(d) - pos(c))` cioè `len(validatorSet) - 1`
- La difficoltà del blocco prodotto da A mentre agisce come backup diventa `len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))` cioè `2`

Avendo definito la difficoltà di ogni blocco, la difficoltà di un fork è semplicemente la somma delle difficoltà dei blocchi in quel fork. Nel caso in cui si debba scegliere un fork, si sceglie quello con maggiore difficoltà, poiché ciò riflette il fatto che i blocchi sono stati prodotti da produttori di blocchi di turno. Questo semplicemente per fornire all'utente un senso di definitività su Bor.

## Modifica della visualizzazione {#view-change}

Dopo ogni span, Bor cambia la visualizzazione. Significa che recupera nuovi produttori per lo span successivo.

### Eseguire il commit dello span {#commit-span}

Quando lo span corrente sta per terminare (in particolare alla fine del penultimo sprint dello span), Bor estrae un nuovo span da Heimdall. Si tratta di una semplice chiamata HTTP al nodo Heimdall. Una volta recuperati questi dati, viene effettuata una chiamata `commitSpan` al contratto di genesi BorValidatorSet tramite chiamata di sistema.

Bor imposta anche i byte dei produttori nell'intestazione del blocco. Ciò è necessario durante la sincronizzazione rapida di Bor. Durante la sincronizzazione rapida, Bor sincronizza le intestazioni in blocco e convalida se i blocchi vengono creati da produttori autorizzati.

All'inizio di ogni sprint, Bor recupera i byte dell'intestazione precedente per i produttori successivi e inizia a creare blocchi sulla base dell'algoritmo `ValidatorSet`.

Ecco come appare l'intestazione di un blocco:

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## Sincronizzazione dello stato dalla catena di Ethereum {#state-sync-from-ethereum-chain}

Bor fornisce un meccanismo in cui alcuni eventi specifici sulla catena principale di Ethereum vengono trasmessi a Bor. Questo è anche il modo in cui vengono elaborati i depositi nei contratti plasma.

1. Qualsiasi contratto su Ethereum può chiamare [syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33) in `StateSender.sol`. Questa chiamata emette un evento `StateSynced`: https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. Heimdall ascolta questi eventi e `function proposeState(uint256 stateId)`chiama - in tal `StateReceiver.sol`modo fungendo da negozio per le pendenti modifiche dello stato. Nota che la transazione `proposeState` verrà elaborata anche con una commissione gas pari a 0, purché effettuata da uno dei validatori nell'attuale set di validatori: https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L24

3. All'inizio di ogni sprint, Bor estrae i dettagli sui cambiamenti di stato in sospeso utilizzando gli stati di Heimdall e li invia allo stato Bor utilizzando una chiamata di sistema. Vedi `commitState` qui: https://github.com/maticnetwork/genesis-contracts/blob/f85d0409d2a99dff53617ad5429101d9937e3fc3/contracts/StateReceiver.sol#L41
