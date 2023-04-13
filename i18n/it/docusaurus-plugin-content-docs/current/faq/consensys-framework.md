---
id: consensys-framework
title: Scalare le FAQ
sidebar_label: Scaling Framework FAQ
description: Costruisci la tua prossima app blockchain su Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Questo quadro deriva dalle quattro domande di Consensys [per giudicare qualsiasi soluzione di scaling.](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017)

## Chi lo opera? {#who-operates-it}
Nodi minatore sulla mainnet Ethereum spostano o "operano" la rete in avanti risolvendo la prova di lavoro e creando nuovi blocchi. La soluzione L2 richiede un ruolo "operatore" simile sulla sua rete, che è l'equivalente del minatore della mainnet Ethereum che può spostare in avanti la rete L2. Tuttavia, ci sono alcune differenze. Ad esempio, oltre all'elaborazione e all'autorizzazione delle transazioni come un minatore, un operatore L2 può anche facilitare gli utenti che entrano ed escono dallo stesso layer L2.

### - Chi o cosa è necessario per operare la rete proof of stake di Polygon? {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

La catena di commit PoS di Polygos si basa su un insieme di validatori per proteggere la rete. Il ruolo dei validatori è quello di eseguire un nodo completo; produrre blocchi, validare e partecipare al consensus ed eseguire il commit dei checkpoint sulla catena principale di Ethereum. Per diventare un validatore, si devono mettere in stake i propri token MATIC con contratti di gestione staking che si trovano sulla mainchain di Ethereum.

Per maggiori dettagli, fare riferimento alla [sezione Validator](/maintain/validate/getting-started.md).

### - Come si fa a diventare operatori nella rete pos di Polygon? A quali regole ci si attiene? {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

Per diventare un validatore, si devono mettere in stake i token MATIC con i contratti di gestione staking che si trovano sulla mainchain di Ethereum.

A tutti gli staker sono distribuite delle ricompense proporzionalmente al loro stake ad ogni checkpoint con l'eccezione che il proponente ottiene un bonus aggiuntivo. Il saldo delle ricompense dell'utente viene aggiornato nel contratto a cui si fa riferimento durante la rivendicazione delle ricompense.

Gli stake sono a rischio di essere tagliati nel caso in cui nodo validatore commetta un atto dannoso come la doppia firma o il tempo di inattività del validatore che influiscono anche sui delegatori collegati a quel checkpoint.

Per maggiori dettagli fare riferimento a [flusso end-to-end a un validatore Polygon](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator) e [le responsabilità di un validatore](/maintain/validate/validator-responsibilities.md).


### - Quali ipotesi di fiducia devono fare gli utenti pos di Polygon sull'operatore? {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

La catena di commit PoS di Polygos si basa su un insieme di validatori per proteggere la rete. Il ruolo dei validatori è quello di eseguire un nodo completo; produrre blocchi, validare e partecipare al consensus ed eseguire il commit dei checkpoint sulla catena principale. Per diventare un validatore, si devono mettere in stake i propri token MATIC con contratti di gestione staking che si trovano sulla catena principale. Finché i 2/3 dello stake ponderato dei validatori è onesto, la catena procederà con precisione.

### - Di che cosa sono responsabili gli operatori? Che potere hanno? {#what-are-the-operators-responsible-for-what-power-do-they-have}

Il ruolo dei validatori è quello di eseguire un nodo completo; produrre blocchi, validare e partecipare al consensus ed eseguire il commit dei checkpoint sulla catena principale.

I validatori hanno il potere di fermare il progresso della catena, di riordinare i blocchi, ecc. supponendo che i 2/3 dei validatori degli stake ponderati non siano onesti. Non hanno il potere di cambiare lo stato, i bilanci degli asset utente, etc.

### - Quali sono le motivazioni per diventare un operatore pos di Polygon? {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

I validatori mettono in stake i loro token MATIC come garanzia per lavorare per la sicurezza della rete e, in cambio del loro servizio, ottengono ricompense.

Per ulteriori dettagli, si prega di fare riferimento a [Qual è l'incentivo](/maintain/validator/rewards.md#what-is-the-incentive) per ulteriori dettagli.

## Come sono i dati? {#how-s-the-data}
Per definizione, una tecnologia Layer 2 deve creare dei checkpoint di dati incrementali su un Layer 1 (mainnet Ethereum). Il nostro problema è quindi con il tempo interstiziale tra quei check-in Layer 1 periodici. In particolare, come vengono generati, memorizzati e gestiti i dati del layer 2 mentre si è lontani dal porto sicuro di layer 1? Siamo più preoccupati per questo perché è quando l'utente è più lontano dalla sicurezza senza fiducia di una mainnet pubblica.

### - Quali sono le condizioni di blocco per il pos di Polygon? {#what-are-the-lock-up-conditions-for-polygon-pos}

Nella maggior parte dei modelli di progettazione dei token, il token è coniato su Ethereum e può essere inviato al pos di Polygon. Per spostare tali token da Ethereum al pos di Polygon, l'utente deve bloccare i fondi in un contratto su Ethereum, e i token corrispondenti vengono quindi coniati sul pos di Polygon.

Il meccanismo di bridge relay viene eseguito dai validatori pos di Polygon che devono essere per i 2/3 d'accordo sull'evento token bloccato su Ethereum per coniare l'importo dei token corrispondente sul pos di Polygon.

Il prelievo degli asset di nuovo su Ethereum è un processo a 2 step in cui i token asset devono essere prima bruciati sulla catena di commit pos di Polygon e quindi prova di questa transazione burn deve essere inviata sulla catena di Ethereum.


Per maggiori dettagli, fare riferimento alle [Passi per utilizzare il ponte PoS](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge).

### - In quanto tempo sono disponibili quei fondi sul pos di Polygon? {#how-soon-are-those-funds-available-on-the-polygon-pos}

Circa 22-30 minuti. Questo avviene tramite un meccanismo di passaggio del messaggio chiamato `state sync`. Ulteriori dettagli sono disponibili [qui](/pos/state-sync/state-sync-mechamism.md).

Il pos di Polygon fornisce supporto per gli utenti che accedono senza un blocco L1 (ad esempio nel caso dell'imbarco di un utente direttamente su Polygon, quindi l'utente desidera uscire sulla mainnet di Ethereum)?

Sì, per ottenerlo viene utilizzato uno speciale meccanismo bridge. Quando un utente desidera uscire su Ethereum, invece del solito metodo per sbloccare i token da un contratto speciale, viene coniato.

Puoi leggere su di loro [qui](/develop/ethereum-polygon/mintable-assets.md).

### - Come può un utente contestare una transazione pos di Polygon non valida? Provare una transazione pos di Polygon valida? {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

Attualmente non c'è modo in catena di contestare una transazione pos di Polygon non valida. Tuttavia, i validatori della catena Polygon PoS presentano punti di controllo periodici a Ethereum: puoi vedere maggiori dettagli [qui](/pos/heimdall/modules/checkpoint.md). È possibile verificare una transazione sulla catena Polygon PoS su Ethereum costruendo una prova dell'albero di Merkle e verificandola rispetto ai punti di controllo periodici che accadono su Ethereum della transazione Polygon PoS e ricevuta Le radici dell'albero di Merkle.

### - Una volta che un utente di Polygon vuole uscire, quanto presto sarà il fondo Layer 1 (più o meno eventuali guadagni o perdite di L2) disponibili su L1? {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

Circa ~ 1-3 ore a seconda della frequenza dei [checkpoint](/pos/heimdall/modules/checkpoint.md). La frequenza è in larga misura una funzione del costo che i validatori sono disposti a spendere per le tariffe del gas ETH per inviare i checkpoint.

### - Prevedi che ci saranno provider di liquidità sul layer 1 disposti a fornire fondi L1 immediatamente rimborsabili agli utenti pos di Polygon esistenti? {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

Ci sono già alcuni giocatori come [Connext](https://connext.network/) e [Biconomy](https://biconomy.io/) che sono o che forniranno questo servizio. Ci sono diversi altri giocatori che andranno in diretta molto presto.

## Com'è lo Stack? {#how-s-the-stack}
Il confronto dello stack è importante per evidenziare cosa ha o non ha cambiato un layer 2 dalla Etherem mainnet.

### - Quanto condivide lo stack pos di Polygon con lo stack della Etherem mainnet? {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

Se sei uno sviluppatore Ethereum, sei già uno sviluppatore pos di Polygon. Tutti gli strumenti con cui hai dimestichezza sono supportati da subito sul pos di Polygon: Truffle, Remix, Web3js e molti altri.

Non ci sono cambiamenti sostanziali nell'interfaccia EVM per il pos di Polygon rispetto a Ethereum.

### -  In cosa differiscono il pos di Polygon dallo stack della Etherem mainnet e quali rischi/ricompense presenta? {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

Non ci sono cambiamenti importanti.

## Prepararsi per il peggio {#preparing-for-the-worst}
Come si prepara il pos di Polygon per:

### -  Un'uscita di massa degli utenti? {#a-mass-exit-of-users}

Finché i ⅔ dei validatori sono onesti, i fondi sulla catena sono sicuri. Nel caso in cui questa ipotesi non sia valida, in uno scenario del genere la catena può fermarsi o può verificarsi un riordino. Sarà necessario il consensus sociale per riavviare la catena da uno stato precedente - incluse le snapshot dello stato pos di Polygon inviate tramite i checkpoint che possono essere usati per farlo.

### - I partecipanti di Polygon che tentano di aggirare il consensus di Polygon. Ad esempio, formando un cartello? {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

Sarà necessario il consensus sociale per riavviare la catena da uno stato precedente rimuovendo quei validatori e riavviandola con un insieme di validatori - incluse le snapshot  dello stato pos di Polygon che vengono inviate tramite i checkpoint che possono essere usati per farlo.


### - Un bug o uno exploit scoperto in una parte critica del suo sistema? {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

È stata prestata attenzione per riutilizzare i componenti testati in battaglia nella costruzione del sistema. Tuttavia, se c'è un bug o uno exploit in una parte critica del sistema, il principale percorso per la risoluzione è il ripristino della catena a uno stato precedente tramite il consensus sociale.
