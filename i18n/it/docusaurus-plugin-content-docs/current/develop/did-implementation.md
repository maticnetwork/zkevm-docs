---
id: did-implementation
title: Implementare DID di Polygon
sidebar_label: Identity
description: Scopri come implementare DID su Polygon
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Questa è una guida introduttiva per gli utenti che desiderano utilizzare i pacchetti di implementazione pubblicati dal team di Polygon per generare e pubblicare un DID Polygon sul ledger Polygon.

L'implementazione del metodo DID di Polygon comprende 3 pacchetti, vale a dire il polygon-did-registrar, il polygon-did-resolver e il polygon-did-registry-contract. Un utente che desidera incorporare la funzionalità per registrare o leggere un DID su o dalla rete di Polygon può utilizzare la seguente guida.

Un DID è essenzialmente un identificatore univoco creato senza la presenza di un'autorità centrale.  Un DID nel contesto delle credenziali verificabili viene utilizzato per firmare documenti, facilitando così l'utente nel dimostrare la proprietà del documento quando richiesto.

## Metodo DID di Polygon {#polygon-did-method}

La definizione del metodo DID di Polygon è conforme alle specifiche e agli standard DID-Core. Un URI DID è costituito da tre componenti separati da due punti: lo schema seguito dal nome del metodo e infine da un identificatore specifico del metodo. Per Polygon l'URI sembra:

```
did:polygon:<Ethereum address>
```

Ecco lo schema `did`, il nome del metodo e `polygon`l'identificatore specifico del metodo è un indirizzo ethereum.

## Implementare DID di Polygon {#polygon-did-implementation}

DID di Polygon può essere implementato con l'aiuto di due pacchetti: l'utente può importare le rispettive librerie npm e usarle per incorporare le metodologie Polygon DID nelle rispettive applicazioni. I dettagli per l'implementazione sono forniti nella sezione successiva.

Per iniziare, è necessario prima creare un DID. La creazione di un DID di Polygon prevede l'incapsulamento di due passaggi: innanzitutto l'utente deve generare un URI del DID e successivamente registrarlo nel ledger di Polygon.

### Creare un DID {#create-did}

Nel tuo progetto per creare un polygon DID URI una prima deve installare:

```
npm i @ayanworks/polygon-did-registrar --save
```

Una volta completata l'installazione, l'utente può utilizzarla come segue:

```
import { createDID } from "polygon-did-registrar";
```

La `createdDID`funzione aiuta l'utente a generare un DID Durante la creazione di un DID, possono presentarsi due scenari.

  1. L'utente possiede già un wallet e desidera generare un DID che corrisponda allo stesso portafoglio.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. Se l'utente non dispone di un wallet esistente e vuole generarne uno, l'utente può utilizzare:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

Il parametro di rete in entrambi i casi si riferisce a se l'utente vuole creare la DID su Polygon Mumbai Testnet o Polygon Mainnet.

Input:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

Dopo aver creato un DID, avrai creato un URI DI.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### Registrati {#register-did}

Per registrare l'URI del DID e il corrispondente documento DID sul ledger, l'utente deve prima utilizzare `polygon-did-registrar`come segue:

```js
import { registerDID } from "polygon-did-registrar";
```

Come presupposto per la registrazione della DID, l'utente deve assicurarsi che il wallet corrsponding al DID abbia il necessario equilibrio dei token disponibile. Una volta che l'utente ha un equilibrio di token nel wallet, può essere fatta una chiamata per la funzionalità registerDID come mostrato di seguito:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

I parametri `did`e `privateKey`sono obbligatori, mentre è facoltativo entrare nel `url`e il .`contractAddress` Se l'utente non fornisce gli ultimi due parametri, la libreria recupera le configurazioni predefinite della rete dall'URI del DID.

Se tutti i parametri corrispondono alle specifiche e tutto viene dato in ordine corretto, la `registerDID`funzione restituisce un hash di transazione, un errore corrispondente viene restituito in caso contrario.

E con questo, hai completato con successo il tuo compito di iscrivere una DID sulla Polygon Network.

## Risolvere un DID {#resolve-did}

Per iniziare, installate le seguenti librerie:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

Per leggere un documento DID registrato sul ledger, qualsiasi utente con un URI del DID di Polygon può prima eseguire l'importazione nel proprio progetto

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

Dopo l'importazione dei pacchetti, il documento DID può essere recuperato utilizzando:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

dove `didResolutionResult`l'oggetto è il seguente:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

Da notare che l'utente non dovrà sostenere alcun costo in commissioni gas durante il tentativo di risolvere un DID.

## Aggiornare il documento DID {#update-did-document}

Per incapsulare il progetto con la possibilità di aggiornare il documento DIDI, l'utente deve prima utilizzare `polygon-did-registrar`come segue:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

Successivamente, chiamare la funzione:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

Va notato che per aggiornare il documento DIDI, solo il proprietario di DID può inviare la richiesta. La chiave privata dovrebbe contenere anche alcuni token Matic corrispondenti.

Se l'utente non fornisce la configurazione con `url` e `contractAddress`, la libreria recupera le configurazioni predefinite della rete dall'URI del DID.

## Eliminare un documento DID {#delete-did-document}

Con l'implementazione di Polygon DID un utente può anche revocare il suo documento DID dal ledger. L'utente deve prima utilizzare `polygon-did-registrar`come segue:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

Poi deve utilizzare

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Per quanto riguarda i parametri, è importante notare che, `url` e `contractAddress` sono parametri facoltativi, pertanto se l'utente non li specifica la funzione imposta una configurazione predefinita basata sull'URI del DID.

Affinché la transazione vada a buon fine, è importante verificare che la chiave privata contenga i token Matic necessari, a seconda della configurazione di rete del DID.

## Contribuire al repository {#contributing-to-the-repository}

Usa il flusso di richieste standard fork, branch e pull per proporre modifiche ai repository. Per esempio, i nomi delle ramo sono informativi includendo il numero di problema o di bug .

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
