---
id: account_based_plasma
title: Plasma basato su account
description: Un'implementazione del plasma basata su account
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# Plasma basato su account {#account-based-plasma}

Polygon Plasma segue un modello simile a [Plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160), ma è un'**implementazione basata su account** rispetto ad altre implementazioni basate su UTXO. La sidechain è compatibile con EVM. Utilizzando la costruzione MoreVP, eliminiamo anche la necessità di firme di conferma.

## Layer PoS e checkpoint {#pos-layer-and-checkpoints}

La rete di Polygon utilizza una doppia strategia di Proof of Stake nel livello di controllo e di produttori di blocchi nel livello di produzione dei blocchi per ottenere tempi di blocco più rapidi e raggiungere la finalità della catena principale utilizzando i checkpoint e le prove di frode.

Sul layer di checkpoint della rete di Polygon, dopo un certo numero di blocchi sul layer dei blocchi della rete di Polygon, un validatore (sufficientemente impegnato) creerà un checkpoint sulla catena principale dopo aver convalidato tutti i blocchi sul layer dei blocchi e creato l'albero di Merkle degli hash dei blocchi dall'ultimo checkpoint.

Oltre a fornire la finalizzazione sulla mainchain, i checkpoint svolgono un ruolo nei prelievi in quanto contengono la proof of burn (prelievo) dei token in caso di prelievo dell'utente. Consente agli utenti di provare i token rimanenti sul contratto root utilizzando la prova Patricia Merkle e la prova del blocco di testa. Si noti che per provare i token rimanenti, il blocco dell'intestazione deve essere impegnato nella Catena root attraverso PoS (Stakeholder). Il processo di prelievo comporterà l'addebito di commissioni di gas Ethereum come di consueto. Sfruttiamo molto i checkpoint per i giochi di uscita.

## Registri di eventi simili a UTXO {#utxo-like-event-logs}

Per i trasferimenti ERC20/ERC721, questo si ottiene utilizzando una struttura di dati di registro eventi simile a UTXO. Di seguito è riportato un evento `LogTransfer` come riferimento.

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

Quindi, in pratica, ogni trasferimento ERC20/ERC721 emette questo evento e i saldi precedenti del mittente e del ricevente (`input1` e `input2`) diventano l'ingresso (come UTXO) alla tx e i nuovi bilanci diventano le uscite (`output1` e `output2`). I trasferimenti vengono monitorati attraverso la raccolta di tutti gli eventi `LogTransfer` correlati.

## Giochi di uscita {#exit-games}

Poiché i blocchi sono prodotti da un unico produttore (o da pochissimi produttori), viene a crearsi una situazione per frodare. Parleremo brevemente degli scenari di attacco e poi vedremo come le garanzie di plasma tutelano l'utente.

## Vettori di attacco {#attack-vectors}

### Operatore dannoso {#malicious-operator}
Di seguito vengono illustrati gli scenari in cui l'operatore potrebbe diventare malintenzionato e tentare di imbrogliare.

1. Token che compaiono dal nulla / spese doppie / ricevute malformate che aumentano (per un account controllato dall'operatore) o diminuiscono (per un utente) in modo fraudolento il saldo dei token.
2. Indisponibilità dei dati Dopo che un utente invia una tx, supponiamo che l'operatore includa la tx nel blocco di plasma ma renda i dati della catena non disponibili per l'utente. In questo caso, se un utente inizia un'uscita da una tx più vecchia, potrebbe essere sfidato sulla catena mostrando la tx più recente. Diventa facile mettere in difficoltà l'utente.
3. Checkpoint errato Nel peggiore dei casi, un operatore potrebbe eseguire A.1 e (o) A.2 e colludere con i validatori per impegnare le transizioni di stato non valide nella catena principale.
4. Arresto della sidechain L'operatore smette di produrre blocchi e la catena si arresta. Se un checkpoint non è stato inviato per una durata specifica, è possibile contrassegnare la side chain come arrestata sulla catena principale. Dopodiché non sarà più possibile inviare altri checkpoint.

Per le ragioni sopra elencate o per altri motivi, se la catena plasma è diventata disonesta, l'utente deve iniziare a uscire ed è nostra aspirazione quella di fornire costruzioni di uscita sulla catena principale che gli utenti possano sfruttare, se e quando sarà il momento.

### Utente dannoso {#malicious-user}

1. L'utente inizia l'uscita da un tx impegnato ma continua a spendere token nella side chain. Si tratta di un'operazione simile alla spesa doppia, ma avviene su due catene.

Stiamo lavorando sulle idee di [MoreVp 7](https://ethresear.ch/t/more-viable-plasma/2160). In poche parole, MoreVP introduce un nuovo modo di calcolare la priorità di uscita, chiamata "priorità di ingresso più giovane". Invece di ordinare le uscite in base all'età dell'output, moreVP ordina le uscite in base all'età dell'input più giovane. Questo ha l'effetto di far sì che le uscite di output, anche se sono incluse in blocchi trattenuti dopo transazioni "provenienti dal nulla", vengano elaborate correttamente a patto che provengano solo da input validi. Definiamo `getAge` che assegna un'età a una tx inclusa. Questo è come definito nel [plasma minimo eseguibile 1](https://ethresear.ch/t/minimal-viable-plasma/426).

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## Scenari di uscita {#exit-scenarios}

Introdurre una terminologia prima di continuare a discutere gli scenari di uscita:

- **Utente ritirato**: un utente che vuole uscire dalla catena plasma.
- **Tx impegnata**: una tx che è stata inclusa in un blocco della catena Polygon e che è stata controllata nella catena root.
- **Tx spesa**: una tx che modifica il saldo dei token dell'utente in risposta a un'azione firmata dall'utente (non include i trasferimenti di token in entrata). Può trattarsi di un trasferimento avviato dall'utente, di una tx burn ecc.
- **Tx di riferimento**: tx che precedono la tx di uscita per quel particolare utente e token. Come definito nel nostro schema UTXO basato sull'equilibrio dei conti, le uscite del tx di riferimento diventano gli ingressi del tx da cui si esce.
- **Priorità di uscita MoreVP**: età dell'ingresso più giovane (tra le tx di riferimento) a una particolare tx. Il più delle volte viene utilizzato per calcolare la priorità di uscita.

### Brucia i token {#burn-tokens}

Per uscire dalla sidechain, l'utente deve lanciare una tx di *prelievo o burn dei token* sulla catena plasma. Questa tx emette un evento `Withdraw`.

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

Qui `input1` indica il saldo precedente dell'utente per il token in questione e `output1` indica il numero di token rimasti nella side chain. Questa costruzione è coerente con il nostro schema basato *UTXO* sull'account. Un utente presenterà la ricevuta di questa tx di prelievo per prelevare i token sulla catena principale. Quando si fa riferimento a questa ricevuta, l'utente deve anche fornire i seguenti dati:

1. Prova Merkle dell'inclusione di una ricevuta in un blocco della side chain (`receiptsRoot`)
2. Prova Merkle dell'inclusione di una transazione in un blocco della side chain (`transactionsRoot`)
3. Prova dell'inclusione dell'intestazione del blocco della side chain nel checkpoint della catena root

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

Ogni volta che un utente desidera uscire dalla catena plasma, deve bruciare i token sulla side chain (o astrarre dall'applicazione client, cioè il wallet), attendere che venga eseguito il checkpoint e quindi avviare l'uscita dalla tx di ritiro sottoposta a checkpoint.

### Uscita dagli ultimi trasferimenti ERC20/721 (MoreVP) {#exit-from-the-last-erc20-721-transfers-morevp}

Consideriamo lo scenario: l'utente ha effettuato un trasferimento ERC20 sulla side chain. L'operatore ha aggiunto una tx fuori dal nulla poco prima del trasferimento dell'utente e ha colluso con i validatori per controllare questo blocco. In questo scenario e, più in generale, nei vettori di attacco da A1 ad A3 discussi in precedenza, l'utente potrebbe non aver avuto l'opportunità di bruciare i propri token prima dell'inserimento di una tx malevola e quindi dovrebbe iniziare un'uscita dall'ultima tx con checkpoint sulla catena principale. Partendo da questo vettore di attacco e suddividendo i due scenari:

**Trasferimento in uscita:** ho trasferito alcuni token a un utente, ma ho notato che l'operatore ha incluso una tx dannosa nel blocco/checkpoint prima di includere la mia tx di trasferimento. Devo iniziare a uscire dalla catena. Avvierò un'uscita dalla tx di trasferimento. Come definito in MoreVP, dovrò fornire una tx di riferimento (*input UTXO*) che definirà la priorità di uscita dell'uscita. Quindi, farò riferimento a una tx che ha aggiornato il saldo del mio token e che precede il messaggio di trasferimento in uscita.

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

**Trasferimento in entrata:** ho notato che l'operatore ha incluso una tx malevola nel blocco/checkpoint prima di includere la mia tx di trasferimento in entrata. Inizierò un'uscita dalla tx di trasferimento in entrata facendo riferimento al saldo della controparte - perché qui l'*UTXO di ingresso* è il saldo token della controparte.

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### Uscita da una transazione in volo (MoreVP) {#exit-from-an-in-flight-transaction-morevp}

Questo scenario serve a combattere l'indisponibilità dei dati. Supponiamo che io abbia fatto una tx ma non so se sia stata inclusa a causa della mancata disponibilità dei dati. Posso avviare un'uscita da questa tx in volo facendo riferimento all'ultima tx con checkpoint. L'utente deve fare attenzione a non fare alcuna tx ogni volta che avvia un'uscita in stile MoreVP, altrimenti verrà sfiduciato.

**Note:** quando esce da una costruzione in stile MoreVP, l'utente può avviare un'uscita fornendo le tx di riferimento, la tx di uscita e posizionando un piccolo `exit bond`. Per qualsiasi uscita, se l'uscita viene contestata con successo, l'uscita verrà annullata e l'obbligazione di uscita verrà sequestrata.

## Limitazioni {#limitations}

1. Grande dimensione della prova: prova Merkle dell'inclusione della transazione e prova Merkle dell'inclusione del blocco (che contiene la transazione) nel checkpoint.
2. Uscita di massa: se l'operatore è malintenzionato, gli utenti devono avviare l'uscita di massa.

La specifica è in fase nascente e apprezzeremmo qualsiasi feedback che ci aiuti a migliorarla o a riprogettarla del tutto se questa costruzione è irrimediabilmente difettosa. L'implementazione è un lavoro in corso nel nostro repository [dei](https://github.com/maticnetwork/contracts) contratti.