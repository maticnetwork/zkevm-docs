---
id: matic-to-ethereum
title: Trasferire dati da Polygon a Ethereum
description: Trasferimento di stato o dati da Polygon a Ethereum tramite Contratti
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Il meccanismo di trasferimento dei dati da Polygon a Ethereum è leggermente diverso da quello da Ethereum a Polygon. Le transazioni **checkpoint** create dai Validatori sulla catena di Ethereum sono utilizzate per raggiungere questo obiettivo. In pratica una transazione viene inizialmente creata su Polygon. Durante la creazione di questa transazione è necessario assicurarsi che **venga emesso un evento** e che il **registro degli eventi includa i dati che vogliamo trasferire** da Polygon a Ethereum.

In un periodo di tempo ( circa 10-30 minuti), questa transazione viene effettuata sotto il controllo della catena Ethereum dai validatori. Una volta effettuato il checkpoint, l'hash della transazione creata sulla catena Polygon può essere inviato come prova al contratto **RootChainManager** sulla catena Ethereum. Questo contratto convalida la transazione, verifica che questa sia inclusa nel checkpoint e infine decodifica i registri degli eventi di questa transazione.

Una volta terminata questa fase, possiamo utilizzare i **dati del registro degli eventi decodificati per eseguire qualsiasi modifica** al contratto root distribuito sulla catena di Ethereum. Per questo dobbiamo anche assicurarci che il cambio di stato su Ethereum avvenga solo in modo sicuro. Per questo motivo, utilizziamo un contratto **Predicate**, ossia un tipo speciale di contratto che può essere attivato solo dal contratto **RootChainManager**. Questa architettura garantisce che i cambiamenti di stato su Ethereum avvengano solo quando la transazione su Polygon viene controllata e verificata sulla catena di Ethereum dal contratto **RootChainManager**.

# Panoramica {#overview}

- Viene eseguita una transazione sul contratto figlio distribuito nella catena di Polygon.
- In questa transazione viene emesso un evento. I parametri di questo **evento includono i dati che devono essere trasferiti** da Polygon a Ethereum.
- I validatori della rete di Polygon raccolgono queste transazioni in uno specifico intervallo temporale (probabilmente 10-30 minuti), le convalidano e **le aggiungono al checkpoint** di Ethereum.
- Viene creata una transazione di checkpoint sul contratto **RootChain** e l'inclusione del checkpoint può essere verificata utilizzando questo [script](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)
- Una volta completata l'aggiunta dei checkpoint, la libreria **matic.js** può essere utilizzata per chiamare la funzione **exit** del contratto **RootChainManager**. La funzione **exit** può essere chiamata utilizzando la libreria matic.js come mostrato in questo [esempio](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js).

- L'esecuzione dello script verifica l'inclusione dell'hash della transazione di Polygon sulla catena di Ethereum e quindi chiama la funzione **exitToken** del contratto [Predicate](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol).
- Questo assicura che la **modifica dello stato del contratto della catena principale** avvenga sempre in modo **sicuro** e **solo attraverso il contratto Predicate**.
- La cosa importante da notare è che la **verifica dell'hash della transazione** da Polygon e **l'attivazione del contratto Predicate** avvengono in una **singola transazione**, garantendo così la sicurezza di qualsiasi cambiamento di stato del contratto root.

# Implementazione {#implementation}

Questa è una semplice dimostrazione di come i dati possono essere trasferiti da Polygon a Ethereum. Questo tutorial mostra un esempio di trasferimento di un valore uint256 attraverso la catena. Ma è possibile trasferire un tipo di dati. Però è necessario codificare i dati in byte e poi emetterli dal contratto figlio. Può essere infine decodificato nel contratto root.

1. Per prima cosa crea la root chain e il contratto della catena figlio. Assicurati che la funzione destinata a effettuare il cambio di stato emetta anche un evento. Questo evento deve includere i dati da trasferire come uno dei propri parametri. Di seguito è riportato un esempio di come deve essere il contratto figlio e root. Si tratta di un contratto molto semplice che ha una variabile dati il cui valore viene impostato utilizzando la funzione setData. La chiamata della funzione setData emette l'evento Data. Il resto del contratto sarà spiegato nelle prossime sezioni di questo tutorial.

A. Contratto figlio

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. Contratto root

Passa questo `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f` come valore per `_predicate` nel costruttore del contratto root.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. Una volta che il contratto figlio e il contratto root sono stati distribuiti rispettivamente sulla catena di Polygon e di Ethereum, questi contratti devono essere mappati utilizzando il PoS bridge. Questa mappatura assicura che venga mantenuta una connessione tra questi due contratti attraverso le catene. Per realizzare questa mappatura, il team di Polygon può essere contattato su [discord](https://discord.com/invite/0xPolygon).

3. Una cosa importante da notare è che, nel contratto principale, c'è un modificatore onlyPredicate. Si consiglia di utilizzare sempre questo modificatore perché assicura che solo il contratto con predicato apporti la modifica di stato al contratto principale. Il contratto predicate è un contratto speciale che attiva il contratto root solo quando la transazione avvenuta sulla catena di Polygon viene verificata dal RootChainManager sulla catena di Ethereum. In questo modo si garantisce un cambio di stato sicuro sul contratto root.

Per testare l'implementazione di cui sopra, possiamo creare una transazione sulla catena di Polygon chiamando la funzione **setData** del contratto figlio. A questo punto dobbiamo aspettare che il checkpoint venga completato. L'inclusione del checkpoint può essere verificata utilizzando questo [script](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js). Una volta completato il checkpoint, chiama la funzione exit del RootChainManager utilizzando l'SDK di matic.js.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

Come mostrato nella schermata precedente, il **txHash** è l'hash della transazione avvenuta sul contratto figlio distribuito sulla catena di Polygon.

**logEventSignature** è l'hash keccack-256 dell'evento Dati. Questo è lo stesso hash che abbiamo incluso nel contratto Predicate. Tutto il codice del contratto utilizzato per questo tutorial e lo script di uscita sono disponibili [qui](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

Una volta completato lo script di uscita, il contratto root sulla catena di Ethereum può essere interrogato per verificare se il valore della variabile **data** che è stato fissato nel contratto figlio si rifletta anche nella variabile **data** del contratto root.
