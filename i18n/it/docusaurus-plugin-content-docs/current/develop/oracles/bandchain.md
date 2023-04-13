---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain è una Blockchain ad alte prestazioni Costruita per Data Oracle per interrogare i dati delle tradizionali API web
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Band Protocol ti permette di interrogare i dati delle API web tradizionali e di utilizzarli nella blockchain. Gli sviluppatori possono fare query attraverso **BandChain, una blockchain basata** su cosmo per facilitare le richieste e il pagamento di oracle, e quindi utilizzare i dati della dApp attraverso la comunicazione inter-chain. L'integrazione dei dati oracle può essere effettuata in 3 semplici passi:

1. **Scegliere gli oracle script**

    Oracle script è un hash che identifica in modo univoco il tipo di dati da richiedere a band-chain. Questi script sono disponibili [**qui**](https://guanyu-devnet.cosmoscan.io/oracle-scripts). Questi script vengono utilizzati come uno dei parametri durante la richiesta all'oracle.

2. **Richiedere dati da BandChain**

Questo può essere fatto in due modi:

    - **Utilizzando l'esploratore BandChain**

    Puoi cliccare sullo script di oracolo della tua scelta, e poi dalla scheda **Eseguo** puoi passare nei parametri e ottenere la risposta da BandChain. La risposta conterrà il risultato e anche una prova evm. Questa prova deve essere copiata e verrà utilizzata nella fase finale. La BandChain è disponibile [**qui**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer).

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Qui di seguito è un esempio di fare una richiesta di oracle per ottenere i valori del numero casuale. Il valore 100 viene passato al `max_range`parametro della richiesta di oracle. Come risposta otteniamo un hash. Cliccando su questo hash si visualizzeranno i dettagli completi della risposta.

    - **Utilizzando la libreria JS di BandChain-Devnet**

    Puoi interrogare BandChain direttamente utilizzando la libreria BandChain-Devnet. Quando viene interrogato, fornisce una **prova evm** nella risposta. Questa prova può essere utilizzata per la fase finale dell'integrazione di BandChain. La BandChain è docs per il quistare dell'oracle utilizzando la BandChain-Devnet JS Library è [**disponibile**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library). Il payload della richiesta per l'oracle dei numeri casuali sarà simile a questo. Assicurati che il corpo della richiesta sia passato in formato application/json.

3. **Utilizzo dei dati negli smart contract**

  Il passo finale consiste nel distribuire un contratto di validazione e memorizzare le risposte della richiesta di oracle nelle variabili di stato del contratto di validazione. Una volta impostate queste variabili di stato, è possibile accedervi quando la dApp lo richiede. Inoltre, queste variabili di stato possono essere aggiornate con nuovi valori interrogando nuovamente gli oracle script dalla dApp. Di seguito è riportato un contratto di validazione che memorizza il valore del numero casuale utilizzando l'oracle script dei numeri casuali.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

Quando si distribuisce, devono essere passati 3 parametri. Il **primo parametro** è quello `codeHash`che è l'hash dello script di oracle. Il **secondo parametro** è l'oggetto dei parametri di richiesta dello script oracle. Questo deve essere passato in formato byte. BandChain fornisce un'API REST per convertire l'oggetto JSON dei parametri in formato byte. I dettagli dell'API sono disponibili [**qui**](https://docs.bandchain.org/references/encoding-params). Alla risposta ricevuta da questa API deve essere aggiunto uno 0x. Il **terzo parametro** è l'indirizzo del contratto BandChain già distribuito sulla rete Polygon. Band Protocol supporta Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

Un'altra cosa da notare è che il contratto di convalida dovrebbe importare la libreria e l'interfaccia helper che è chiamata `BandChainLib.sol`e `IBridge.sol`rispettivamente. Sono disponibili nei seguenti link: [**Bandchain**](https://docs.bandchain.org/references/bandchainlib-library) Library e l'interfaccia [**IBridge**](https://docs.bandchain.org/references/ibridge-interface).

  Una volta che il contratto di convalida sia stato distribuito, è possibile accedere alle variabili di stato tramite un'interrogazione da parte di una dApp. Analogamente possono essere creati più contratti di convalida per diversi script oracle integrati. L'interfaccia IBridge ha un metodo chiamato `relayAndVerify()`che verifica i valori che vengono aggiornati ogni volta nel contratto di convalida. Il `update()`metodo del contratto di convalida ha la logica per aggiornare le variabili di stato. La prova EVM ottenuta dal querying dello script di oracle deve essere passata al `update()`metodo. Ogni volta che un valore viene aggiornato, il contratto BandChain distribuito su Polygon verifica i dati prima di memorizzarli nella variabile di stato del contratto.

La BandChain fornisce una rete decentralizzata di oracle che possono essere utilizzate dalle dApp per migliorare la logica di smart contract. La BandChain si impegna a implementare il contratto, a memorizzare i valori e a aggiornarli può essere trovata [**qui**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library).