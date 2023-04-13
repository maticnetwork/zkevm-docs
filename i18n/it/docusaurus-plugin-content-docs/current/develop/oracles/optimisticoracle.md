---
id: optimisticoracle
title: Optimistic Oracle di UMA
sidebar_label: UMA
description: L'Optimistic Oracle di UMA consente ai contratti di richiedere e ricevere rapidamente qualsiasi tipo di dati
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

L'Optimistic Oracle di UMA consente ai contratti di richiedere e ricevere rapidamente qualsiasi tipo di dati. Il sistema oracle di UMA è composto da due componenti fondamentali:

1. Optimistic Oracle
2. Meccanismo di verifica dei dati (DVM)

## Optimistic Oracle {#optimistic-oracle}

L'**Optimistic Oracle** di UMA consente ai contratti di richiedere e ricevere rapidamente informazioni sui prezzi. L'Optimistic Oracle funge da gioco di escalation generalizzato tra i contratti che iniziano una richiesta di prezzo e il sistema di risoluzione delle controversie dell'UMA, noto come il Meccanismo di verifica dei dati (DVM).

I prezzi proposti dall'Optimistic Oracle non verranno inviati al DVM a meno che non vengano contestati. Questo consente ai contratti di ottenere informazioni sui prezzi entro qualsiasi durata predefinita senza scrivere il prezzo di un'asset on-chain.

## Meccanismo di verifica dei dati (DVM) {#data-verification-mechanism-dvm}

Se viene sollevata una controversia, viene inviata una richiesta al DVM. Tutti i contratti basati suUMA utilizzano il DVM come supporto per la risoluzione delle controversie. Le controversie inviate al DVM saranno risolte 48 ore dopo che i titolari di token UMA avranno votato il prezzo dell'asset in un determinato momento. I contratti su UMA non hanno bisogno di utilizzare l'Optimistic Oracle a meno che non richiedano il prezzo di un asset in meno di 48 ore.

Il Meccanismo di verifica dei dati (DVM) è il servizio di risoluzione delle controversie per i contratti basati sul protocollo UMA. Il DVM è potente perché include un elemento di giudizio umano per garantire che i contratti siano gestiti in modo sicuro e corretto quando sorgono problemi legati alla volatilità (e talvolta alla manipolazione) dei mercati.

## Interfaccia Optimistic Oracle {#optimistic-oracle-interface}

L'Optimistic Oracle viene utilizzato dai contratti finanziari o da qualsiasi terza parte per recuperare i prezzi. Una volta richiesto un prezzo, chiunque può proporre un prezzo in risposta. Una volta proposto, il prezzo viene sottoposto a un periodo di attesa in cui chiunque può contestare il prezzo proposto e inviare il prezzo contestato al DVM di UMA per la liquidazione.

:::info

Questa sezione spiega come i diversi partecipanti possono interagire con l'Optimistic Oracle. Per visualizzare le distribuzioni più aggiornate di mainnet, kovan o L2 dei contratti Optimistic Oracle, fai riferimento agli [indirizzi produzione](https://docs.umaproject.org/dev-ref/addresses).

:::

Ci sono dodici metodi che compongono l'interfaccia Optimistic Oracle.
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

Richiede un nuovo prezzo. Deve trattarsi di un identificatore di prezzo registrato. Si noti che questa funzione viene richiamata automaticamente dalla maggior parte dei contratti finanziari registrati nel sistema UMA, ma può essere richiamata da chiunque per qualsiasi identificatore di prezzo registrato. Ad esempio, il contratto Expiring Multiparty (EMP) richiama questo metodo quando viene chiamato il suo metodo `expire`.

Parametri:
- `identifier`: identificativo del prezzo richiesto.
- `timestamp`: timestamp del prezzo richiesto.
- `ancillaryData`: dati accessori che rappresentano gli argomenti aggiuntivi che vengono passati con la richiesta di prezzo.
- `currency`: token ERC20 utilizzato per il pagamento di ricompense e commissioni. Deve essere approvato per l'uso con il DVM.
- `reward`: ricompensa offerta al proponente vincente. Sarà a carico del chiamante. Nota: questo valore può essere 0.

### proposePrice {#proposeprice}

Propone un valore di prezzo per una richiesta di prezzo esistente.

Parametri:
- `requester`: mittente della richiesta di prezzo iniziale.
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.
- `proposedPrice`: prezzo proposto.

### disputePrice {#disputeprice}

Contesta un valore di prezzo per una richiesta di prezzo esistente con una proposta attiva.

Parametri:
- `requester`: mittente della richiesta di prezzo iniziale.
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.

### settle {#settle}

Tenta di risolvere una richiesta di prezzo in sospeso. Tornerà se non può essere risolto.

Parametri:
- `requester`: mittente della richiesta di prezzo iniziale.
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.

### hasPrice {#hasprice}

Controlla se una determinata richiesta sia stata risolta o liquidata (cioè se l'optimistic oracle ha un prezzo).

Parametri:
- `requester`: mittente della richiesta di prezzo iniziale.
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.

### getRequest {#getrequest}

Ottiene la struttura dati corrente contenente tutte le informazioni su una richiesta di prezzo.

Parametri:
- `requester`: mittente della richiesta di prezzo iniziale.
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.

### settleAndGetPrice {#settleandgetprice}

Recupera un prezzo precedentemente richiesto da un chiamante. Ritorna se la richiesta non è risolta o risolvibile. Nota: questo metodo non viene visualizzato in modo che questa chiamata possa effettivamente liquidare la richiesta di prezzo se non è stata liquidata.

Parametri:
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.

### setBond {#setbond}

Imposta il vincolo di proposta associato a una richiesta di prezzo.

Parametri:
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.
- `bond`: importo del vincolo personalizzato da impostare.

### setCustomLiveness {#setcustomliveness}

Imposta un valore personalizzato di liveness per la richiesta. La liveness è la quantità di tempo che una proposta deve attendere prima di essere risolta automaticamente.

Parametri:
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.
- `customLiveness`: nuova vivacità personalizzata.

### setRefundOnDispute {#setrefundondispute}

Imposta la richiesta di rimborso della ricompensa se la proposta viene contestata. Questo può aiutare a "coprire" il chiamante in caso di ritardo causato da una controversia. Nota: in caso di controversia, il vincitore riceve comunque l'obbligazione dell'altro, quindi il guadagno è ancora possibile anche se la ricompensa viene rimborsata.

Parametri:
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.

### disputePriceFor {#disputepricefor}

Contesta una richiesta di prezzo con una proposta attiva per conto di un altro indirizzo. Nota: questo indirizzo riceverà tutte le ricompense derivanti da questa controversia. Tuttavia, le obbligazioni vengono estratte dal chiamante.

Parametri:
- `disputer`: indirizzo da impostare come disputante.
- `requester`: mittente della richiesta di prezzo iniziale.
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.

### proposePriceFor {#proposepricefor}

Propone un valore di prezzo per conto di un altro indirizzo. Nota: questo indirizzo riceverà qualsiasi ricompensa derivante da questa proposta. Tuttavia, le obbligazioni vengono estratte dal chiamante.

Parametri:
- `proposer`: indirizzo da impostare come proponente.
- `requester`: mittente della richiesta di prezzo iniziale.
- `identifier`: identificatore di prezzo per identificare la richiesta esistente.
- `timestamp`: timestamp per identificare la richiesta esistente.
- `ancillaryData`: dati accessori del prezzo richiesto.
- `proposedPrice`: prezzo proposto.

## Integrazione dell'Optimistic Oracle {#integrating-the-optimistic-oracle}

Questa demo configura un contratto `OptimisticDepositBox` che custodisce il saldo di token ERC-20 di un utente.

Sulla testnet di una blockchain locale, l'utente depositerà wETH (Wrapped Ether) nel contratto e preleverà wETH denominati in USD. Ad esempio, se l'utente vuole prelevare 2.000 $10,000 USD of wETH, and the ETH/USD exchange rate is $, dovrà prelevare 5 wETH.

* L'utente collega il `OptimisticDepositBox` con uno degli identificatori di prezzo abilitati nel DVM.

* L'utente deposita wETH nel `OptimisticDepositBox` e lo registra con l'identificatore di prezzo di `ETH/USD`.

* L'utente può ora prelevare una quantità di wETH denominata in USD dal proprio `DepositBox` tramite chiamate a smart contract, con l'Optimistic Oracle che consente di applicare prezzi Optimistic sulla catena.

In questo esempio, l'utente non sarebbe stato in grado di trasferire quantità di wETH denominate in USD senza fare riferimento a un feed di prezzo off-chain `ETH/USD`. L'Optimistic Oracle permette quindi all'utente di "estrarre" un prezzo di riferimento.

A differenza delle richieste di prezzo al DVM, una richiesta di prezzo all'Optimistic Oracle può essere risolta entro un determinato periodo di tempo se non sorgono controversie e questo consente tempistiche significativamente più brevi del periodo di votazione del DVM. La finestra della liveness è configurabile, ma in genere è di due ore, rispetto ai 2-3 giorni del regolamento tramite il DVM.

Al momento il richiedente non è tenuto a pagare le commissioni al DVM. Il richiedente può offrire una ricompensa al proponente che risponde a una richiesta di prezzo, ma in questo esempio il valore della ricompensa è impostato su `0`.

Il proponente del prezzo deposita una cauzione insieme al prezzo, che verrà rimborsata se il prezzo non viene contestato o se la controversia si risolve a favore del proponente. In caso contrario, questa obbligazione viene utilizzata per pagare la commissione finale al DVM e per pagare una ricompensa a chi ha avuto successo.

Nella demo, il richiedente non richiede una cauzione aggiuntiva al proponente del prezzo, quindi la cauzione totale è pari alla tariffa finale di 0,2 wETH. Vedi la funzione `proposePriceFor` nel contratto `OptimisticOracle` [](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html) per i dettagli di implementazione.

## Esecuzione della demo {#running-the-demo}

1. Assicurati di aver seguito tutti i passaggi di configurazione necessari [qui](https://docs.umaproject.org/developers/setup).
2. Esegui un'istanza di Ganache locale (cioè non Kovan/Ropsten/Rinkeby/Mainnet) con `yarn ganache-cli --port 9545`
3. In un'altra finestra, migra i contratti eseguendo il seguente comando:

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. Per distribuire il [contratto](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) `OptimisticDepositBox` ed eseguire un semplice flusso di utenti, esegui il seguente script dimostrativo dalla root del repo:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

Dovresti vedere il seguente risultato:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## Spiegazione delle funzioni del contratto {#explaining-the-contract-functions}

Il [codice del contratto](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)`OptimisticDepositBox` mostra come interagire con l'Oracle.

La funzione `constructor` include un argomento `_finderAddress` per il contratto UMA `Finder`, che mantiene un registro dell'indirizzo `OptimisticOracle`, le whitelist delle garanzie e degli identificatori di prezzo approvati e altri indirizzi contrattuali importanti.

Questo permette al `constructor` di verificare che il tipo di garanzia e l'identificativo del prezzo siano validi e permette al `OptimisticDepositBox` di trovare e interagire in seguito con il `OptimisticOracle`.

La funzione `requestWithdrawal` include una chiamata interna al `OptimisticOracle` che richiede il prezzo di `ETH/USD`. Una volta restituita, l'utente può chiamare `executeWithdrawal` per completare il prelievo.

Ci sono molte altre informazioni e spiegazioni nei commenti di codice, per cui ti invitiamo a dare un'occhiata se sei interessato a imparare di più.

## Ulteriori risorse {#additional-resources}

Ecco alcune risorse aggiuntive riguardanti il DVM di UMA:

- [Architettura tecnica](https://docs.umaproject.org/oracle/tech-architecture)
- [Architettura economica](https://docs.umaproject.org/oracle/econ-architecture)
- [Blog post](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) sul design del DVM di UMA
- [Whitepaper](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) sul design del DVM di UMA
- [Repo di ricerca](https://github.com/UMAprotocol/research) per una policy ottimale sulle commissioni
- [Repo UMIP](https://github.com/UMAprotocol/UMIPs) per le proposte di governance
