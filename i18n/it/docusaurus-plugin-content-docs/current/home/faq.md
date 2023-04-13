---
id: faq
title: DOMANDE FREQUENTI
description: FAQ relative a Polygon
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Domande frequenti {#frequently-asked-questions}

## Che cos'è Polygon? {#what-is-polygon}

Polygon è una soluzione di scaling per le blockchains pubbliche, in particolare Ethereum. Polygon offre scalabilità garantendo una migliore esperienza utente in modo garantita e decentralizzata. Ha un'implementazione di lavoro per Ethereum su Kovan Testnet. Polygon intende supportare altre blockchain in futuro, che ci consentiranno di fornire funzionalità di interoperabilità insieme a offrire scalabilità alle attuali reti pubbliche di blockchain.

## Cosa differenzia Polygon dalle altre implementazioni di Plasma? {#how-is-polygon-different-from-other-implementations-of-plasma}

L'implementazione di Polygons del Plasma è costruita su sidechain basate sullo stato che si avvale di EVM, mentre le altre implementazioni di Plasma utilizzano principalmente UTXO che le restringe a essere specifiche per il pagamento. Avere sidechains basate sullo stato permette a Polygon di fornire scalabilità anche per gli smart contract generici.

In secondo luogo, Polygon utilizza uno strato pubblico di checkpointing che pubblica i checkpoint dopo intervalli periodici (a differenza dei checkpoint dopo ogni blocco in Plasma Cash) che consente alle sidechains di operare ad alte velocità durante la pubblicazione dei checkpoint in batch. Questi checkpoint insieme alle prove di frode garantiscono che le sidechain di Polygon's funzionino in modo sicuro.

## Il vostro progetto fornisce scalabilità per Ethereum utilizzando le catene plasma, è un protocollo o una blockchain nativa di per sé? {#your-project-provides-scalability-for-ethereum-using-plasma-chains-is-it-a-protocol-or-a-native-blockchain-in-itself}

La rete Polygon è una soluzione **"sidechain"** in cui le asset della catena principale di Ethereum, vale a dire tutte le dApps / Token/ Protocolli della catena principale possono essere spostate / migrate verso Polygon sidechain(s) e quando necessario, è possibile ritirare le risorse alla catena principale.

## Quali sono i vantaggi competitivi di Polygon rispetto ai suoi concorrenti? {#what-are-the-competitive-advantages-of-polygon-over-its-competitors}

### Soluzioni di scalabilità del L2 {#l2-scaling-solutions}

Polygon mira a raggiungere la scalabilità con la decentralizzazione. Utilizza checkpoint periodici e meccanismi antifrode. Quando gli utenti vogliono ritirare le proprie risorse, utilizzano i checkpoint per dimostrare le proprie risorse sulla sidechain, mentre sono necessarie prove di frode per sfidare le frodi o qualsiasi cattivo comportamento e gli staker di slash.

Altri progetti offrono anche soluzioni di scaling L2, ma ci sono due elementi chiave che differiscono su:

1. In primo luogo, Polygon si concentra non solo sulle transazioni finanziarie ma anche su giochi e altre dApps di utilità. Abbiamo anche piani per i servizi finanziari full-blown come il prestito / il trading dApps (token swaps, margin trading e molto altro).

2. In secondo luogo, mentre Polygon utilizza i checkpoint per 1 secondo volte (con lo strato di PoS), molte altre soluzioni potrebbero avere tempi di blocco superiori ai tempi di blocco Ethereum in quanto è necessario spingere ogni blocco della sidechain alla catena principale.

### Soluzioni di scaling L1 {#l1-scaling-solutions}

Oltre a ciò, tra gli altri progetti di scaling, Polygon si distingue per la sua capacità di raggiungere la scala mantenendo un gran grado di decentralizzazione.

Cosa più importante, questi progetti di scalabilità hanno un problema "reinventare la ruota". Stanno creando nuove blockchain in cui la comunità degli sviluppatori, l'ecosistema dei prodotti, la documentazione tecnica e le imprese devono essere costruite da **"scratch"**. Polygon, d'altra parte, è una catena abilitata ad EVM e dispone di tutte le dApps / asset costruite sulla catena principale di Ethereum con scalabilità disponibile al click di un pulsante.

### Pagamenti {#payments}

Crediamo che Polygon abbia un vantaggio in termini di usabilità perché, in altre soluzioni, sia il mittente che il destinatario devono creare i propri canali di pagamento. È una cosa alquanto scomoda per gli utenti. Invece, con la tecnologia sottostante di Polygon non è necessario che gli utenti creino dei canali di pagamento, e per ricevere i token è sufficiente disporre di un valido indirizzo Ethereum. Ciò è in linea con la nostra visione a lungo termine per migliorare l'esperienza utente per applicazioni decentralizzate.

### Trading e finanza {#trading-and-finance}

Polygon intende consentire a DEX (ad esempio 0x), pool di Liquidity (ad esempio Kyber Network) e altri tipi di protocolli finanziari come il protocollo di concessione (Dharma) sulla sua piattaforma, che consentirà agli utenti di Polygon di accedere a diverse applicazioni di serivce finanziarie come DEX, predisporre dApps, LP e molti altri.

## Come si confronta con altre soluzioni di sidechain? {#how-does-polygon-compare-with-other-sidechain-solutions}

Su Polygon, tutte le transazioni laterali sono garantite da molteplici meccanismi sulla sidechain e la catena principale. Sulla sidechain, tutte le transazioni effettuate dallo strato di produttore Block vengono verificate e controllate alla catena principale con uno strato di checkpoint altamente decentralizzato.

Se avviene una transazione fraudolenta sulla sidechain, può essere individuata e gestita dallo strato di checkpoint. Anche in uno scenario estremamente difficile e molto improbabile in cui lo strato di produttore di blocco e lo strato di checkpointing sia la collude, anche allora la catena principale ha delle prove di frode su cui chiunque del pubblico può venire a contestare qualsiasi transazione che ritenga fraudolente sulla sidechain.

Se la sfida è di successo, c'è un enorme disincentivo economico/la pena finanziaria per le parti colluding, in quanto le loro posizioni sono ridotte. Inoltre, lo sfidante pubblico viene premiato con le stakes degli attori fraudolenti sidechain.

Questo rende Polygon una rete di sidechain che ha un elevato grado di decentralizzazione e sicurezza delle transazioni sidechain.

Anche la capacità e il TPS delle sidechains di Polygon sono molto più alta di altre soluzioni. Soprattutto quando Polygon può avere migliaia di transazioni mentre altre sono singole sidechain che hanno un limite più alto di poche migliaia di transazioni.

## In che modo verranno aggiunte nuove sidechain Ci saranno requisiti speciali per le sidechain locali delle aziende private? {#via-what-principles-will-new-sidechains-be-added-will-there-be-any-special-requirements-for-private-companies-local-sidechains}

Per quanto riguarda i canali dello stato, Plasma rappresenta un'alternativa superiore ai framework per lo scaling, principalmente grazie alle garanzie sulla sicurezza fornite dal framework - che in pratica dicono che gli utenti non potranno perdere in nessun caso i propri fondi. Certo, potrebbero esserci dei ritardi nel recuperare i soldi, ma un operatore Bizantino di Plasma non può creare denaro dal nulla, o spenderlo due volte su una transazione.

In futuro Polygon cercherà di essere una blockchain completamente aperta e pubblica, dove gli incentivi/disincentivi economici guideranno principalmente la sicurezza e la stabilità del sistema. Quindi chiunque dovrebbe essere in grado di unirsi al sistema e partecipare al consenso. Nella fase di semilavorato della rete, tuttavia, inizialmente Polygon dovrà svolgere un ruolo più ampio per consentire le sidechains.

Inoltre, le sidechains di Polygon sarebbero principalmente le sidechains pubbliche, vale a dire le sidechain disponibili per chiunque possa utilizzare proprio come altre blockchain pubbliche. Tuttavia, le catene Enterprise Polygon intendono fornire una sidechains dedicata (non privacy abilita) per particolari organizzazioni. La sicurezza e il decentramento di tali catene sarebbero ancora intatte utilizzando lo strato di checkpoint e le prove di frode sulla catena principale.

## Le sidechain saranno sincronizzate con la catena principale (Ethereum)? {#will-sidechains-also-be-synced-with-the-main-chain-ethereum}

Certamente. Lo strato di checkpointing pubblico convaliderà tutte le transazioni che avviene sulle sidechain e pubblicherà le prove alla catena principale. Per garantire una sicurezza insensata delle transazioni di sidechain, il principale contratto di Plasma contiene vari tipi di Fraud Proofs in cui tutte le transazioni di sidechain possono essere contestate per qualsiasi attività fraudolente. Se uno sfidante riesce, le posizioni degli attori della sidechain coinvolti nella frode vengono ridotte e vengono trasferite allo challenger. Questo equivale a una sempre in esecuzione di una bounty di bug di alto livello. Un buon diagramma per capire è come di seguito:.

![Screenshot](/img/matic/Architecture.png)

## Alla fine del vostro Libro Bianco è presente un elenco di "potenziali casi d'uso" - verranno implementati tutti quanti? In che ordine? {#at-the-end-of-the-white-paper-there-is-a-list-of-potential-use-cases-will-all-of-that-be-implemented-in-what-order}

La logica di base è - se esiste una dApp / Protocol, che sta lavorando su Ethereum, ma è limitata da una bassa transazione e da alte commissioni di transazione, allora saremo in grado di aggiungere supporto a queste dApps / Protocolli sulla rete Polygon.

## Sarà difficile replicare l'implementazione plasma di Polygon? {#why-will-it-be-difficult-to-replicate-polygon-s-plasma-implementation}

Anche se è più l'effetto di rete in termini di quale rete è in grado di scalare / crescere l'ecosistema meglio di altri, le soluzioni blockchain devono essere open source perché coinvolgono le reali asset da loro utilizzate.

È il caso di tutti i progetti open source. È tanto applicabile a noi quanto lo è alle implementazioni rivali, in quando noi avremo la nostra licenza GPL che obbliga chiunque utilizzi la nostra implementazione a rendere obbligatoriamente open source il proprio codice. Ma ancora una volta, il punto è che la copia del codice è applicabile anche a Bitcoin, Ethereum e a qualsiasi altro progetto, è più sull'effetto di rete che un progetto può realizzare.

## Cosa c'è di speciale riguardo l'implementazione di Plasma della Polygon Network? {#what-s-special-about-polygon-network-s-plasma-implementation}

Polygon Plasma utilizza un modello system basato su account piuttosto che il sistema UTXO. Questo ci offre un enorme vantaggio nell'utilizzare un EVM sulla catena di Polygon che ci permette di utilizzare l'intero ecosistema Ethereum, gli strumenti per gli sviluppatori, le librerie di integrazione, ecc. per la rete Polygon.

La rete Polygon può essere utilizzata dalle dApp senza richiedere alcuna modifica ai propri token ERC20. Inoltre, il nostro livello di checkpointing ci permette di essere ordini di magnitudini più velocemente di altre implementazioni del Plasma perché we le prove dei singoli blocchi nei checkpoint, mentre altre implementazioni del Plasma devono presentare ogni prova di blocco alla catena principale.

## In che modo si risolvono problemi con la centralizzazione? {#how-are-you-going-to-solve-the-issues-with-centralization}

Ecco un diagramma per fornirvi un po' di contesto:

![Screenshot](/img/matic/Merkle.png)

Quindi, in primo luogo, i nodi di PoA saranno Delegati (con la prova di solvibilità, cioè devono depositare una grande quota di stake) e KYC sostanzialmente selezionati dallo strato di PoS proprio come una Proof Delegated di Stake (DPoS) o nodi Delegata di Faglia bizantina (DBFT).

In secondo luogo, supponiamo che tutti i Delegati (o 2/3 di loro) girino i cattivi attori e producano blocchi difettosi, allora hai le staffette di livello di PoS che convalideranno tutti i blocchi e se vengono commesse eventuali frodi, le posta in gioco dei Delegati vengono sbloccate e il checkpoint viene fermato per le azioni correttive.

In terzo luogo, diciamo anche lo strato di Staker PoS (che sarebbe un gran numero di nodi) si danneggia e si collude per produrre punti di check-point difettosi cioè tutte le PoA sono corrotte e le PoS sono corrotte. Anche allora, seguendo la filosofia del Plasma, stiamo scrivendo una delle ambite cose dello scaling della sidechain, **delle prove di frode** che vengono osservate da molti grandi progetti (gli watcher possono essere visti come nostri watcher di repository su GitHub). Questo meccanismo di prova delle frodi consente a chiunque sia in pubblico di sfidare qualsiasi transazione sulla catena principale, Ethereum.

## Perché è necessario il token Matic? {#why-is-matic-token-required}

Le seguenti ragioni rafforzano la necessità di avere MATIC token:

### Polygon intende essere una soluzione di scalare gli obiettivi generali per le blockchains pubbliche {#polygon-intends-to-be-a-general-purpose-scaling-solution-for-public-blockchains}

Partiamo da Ethereum come la nostra prima basechain, ma in futuro Polygon può essere distribuito su più basechains. Presto saranno aggiunte altre basechain, quindi non avrebbe senso avere un'unica valuta (ether) per pagare le commissioni sulle sidechain. Se c'è una preoccupazione esistenziale per qualsiasi futuro di basechains avere la valuta di base come asset nativo per Polygon rovinerà la rete di scaling. Di conseguenza, è importare costruire l'ecosistema degli Staker sul token proprio della rete di Polygon.

### Modello di sicurezza Appcoin {#appcoin-security-model}

Polygon ha intenzione di permettere alle dApp di pagare le commissioni in dApp-coin astraendo un meccanismo di swap dei token sfruttando una pool di liquidità come Kyber. L'utente usa semplicemente le sue dApp-coin per pagare le commissioni, in background la dApp-coin è scambiata per i token MATIC. Poiché gli sviluppatori di dApp desiderano fornire un'esperienza utente priva di problemi, contribuiranno a mantenere un pool di liquidità per Polygon.

### Spostare la rete in fasi nascenti {#seeding-the-network-in-nascent-stages}

È praticamente impossibile mettere in seed il sistema quando non ci sono token nella rete, in quanto non possiamo distribuire Eth all'altamente decentralizzato layer dei Validatori e ai produttori dei blocchi. Mentre con i token Matic, abbiamo fornito un'ampia percentuale di token da distribuire per mettere in seed i produttori di blocchi, lo staking dei checkpointer e, di conseguenza, offrire le ricompense per i blocchi. Tale fornitura assicura che gli staker ricevano delle ricompense anche nel caso in cui la rete richieda del tempo per riflettere gli effetti della rete. Le ricompense per il mining dei blocchi di Bitcoin venivano mantenute per motivi simili: in questo modo, gli staker e i produttori di blocchi possono venire incentivati a garantire la sicurezza della rete.

Se la vostra preoccupazione sono gli sviluppatori, sappiate che uno dei punti saldi della nostra strategia è garantire a essi di poter accedere facilmente all'ecosistema. Ci siamo assicurati che tutti gli strumenti degli sviluppatori di Ethereum funzionino fin da subito con Polygon. Per quanto riguarda i token necessari per pagare le tasse su testnet, non è diverso per uno sviluppatore che costruisce su Ethereum. Il dev ottiene i token gratuiti per la testnet da un rubinetto di Polygon, proprio come è su Ethereum. Hai bisogno di token MATIC solo quando vuoi distribuire su Polygon Mainnet, dove la gas fee è molto inferiore a quella di Ethereum, intorno all'1/100th di una transazione fee che pagheresti su Ethereum.

## Cosa spinge l'utilizzo e la domanda dei token Matic? {#what-drives-the-use-and-demand-for-matic-tokens}

Ci sono due utilizzi primari per i token:

1. Il token viene utilizzato per pagare le commissioni di transazione nella rete.
2. Il token viene utilizzato per partecipare al meccanismo di consenso della prova di gioco per il checkpoint dello strato e il blocco dello strato di produzione.

### Alcune delle ragioni secondarie per la richiesta di token {#some-of-the-secondary-reasons-for-token-demand}

* Polygon ha intenzione di permettere alle dApp di pagare le commissioni in dApp-coin astraendo un meccanismo di swap dei token sfruttando una pool di liquidità come Kyber. L'utente usa semplicemente le sue dApp-coin per pagare le commissioni, in background la dApp-coin è scambiata per i token MATIC. Poiché gli sviluppatori di dApp desiderano fornire un'esperienza utente priva di problemi, contribuiranno a mantenere un pool di liquidità per Polygon.

* Per consentire le uscite più veloci stiamo implementando un meccanismo di prestito utilizzando il protocollo di Dharma in cui un sottoscrittore / prestatore può ricevere l'uscita token e erogare l'importo di uscita con una piccola quota come interesse. Il prestatore dunque reclama i token una settimana dopo aver utilizzato il token di uscita. L'utente quindi ottiene prelievi quasi immediati, mentre i prestatori possono guadagnare interessi per i servizi che forniscono.

### Burn dei token a livello di protocollo {#protocol-level-burning-of-tokens}

Intendiamo bruciare una percentuale della commissione di transazione in ogni blocco. Questo rende i token deflazionari in natura e gli fornisce un supporto costante in termini di valore a livello del protocollo.

### Scarse barriere di ingresso (e di conseguenza maggiori possibilità di una rapida adozione) {#low-entry-barrier-and-hence-higher-chances-of-quick-adoption}

Faremo fortemente affidamento sulle dApp per coadiuvare l'adozione degli utenti finali. Una delle caratteristiche chiave è che manteniamo un'architettura pienamente compatibile con l'ecosistema di sviluppo di Ethereum, cioè tutti gli smart contract, i wallet, le IDE, gli strumenti DevOps ecc sono direttamente compatibili con Polygon.

Qualsiasi dApp di Ethereum può essere trasportata su Polygon virtualmente senza modifiche. Quindi le barriere di ingresso per gli sviluppatori Ethereum esistenti alla transizione verso Polygon sono trascurabili che possono saltare un'adozione virale dApp. Questo ha il potenziale per portare a una grande quantità di domanda organica dovuta agli effetti di rete che si sviluppano intorno alla rete Polygon.

## Il token è di tipo ERC20? {#is-token-type-erc20}

Sì. E lo stesso token sarà applicabile anche a Polygon Chain, vale a dire non è necessario passare a un token nativo in futuro.

## Qual è il TPS previsto che riuscirete a portare sulla rete di Ethereum? Qual è il valore attuale sulla testnet? {#what-is-the-expected-tps-you-ll-be-able-to-bring-to-the-ethereum-network-what-are-you-running-at-now-on-testnet}

Una singola sidechain ha la capacità di 7.000 transazioni al secondo. Polygon ha la capacità di aggiungere più sidechains, ma attualmente, la nostra attenzione sarebbe quella di stabilizzare la rete con una sidechain.
