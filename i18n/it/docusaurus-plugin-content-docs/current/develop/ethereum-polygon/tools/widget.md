---
id: widget
title: Widget Wallet
sidebar_label: Wallet Widget
description: "Strumenti dell'interfaccia utente per eseguire le transazioni bridge."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Il widget Wallet è uno strumento dell'interfaccia utente che può essere incorporato in qualsiasi applicazione web per l'esecuzione di transazioni bridge, deposito e prelievo.

Ogni widget è identificato da un nome univoco che puoi ottenere dalla [dashboard dei Widget](https://wallet.polygon.technology/widget-dashboard).

### Dashboard dei Widget {#widget-dashboard}

Il widget può essere creato dalla pagina della dashboard del widget nell'applicazione del wallet. Permette all'utente di creare un nuovo widget con alcune opzioni personalizzabili.

Una volta creato il widget, puoi copiare lo snippet di codice e aggiungerlo alla tua applicazione oppure utilizzare il nome del widget e configurarlo da solo.

Ecco il link alla dashboard del widget.

* mainnet - https://wallet.polygon.technology/widget-dashboard
* testnet - https://wallet-dev.polygon.technology/widget-dashboard

## Installazione {#install}

Il widget è esportato come libreria javascript e disponibile come pacchetto npm.

```bash
npm i @maticnetwork/wallet-widget
```

## Esempi {#examples}

Abbiamo creato esempi per diversi framework e strumenti per aiutarti nello sviluppo. Tutti gli esempi sono disponibili qui: [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)

## Modalità di utilizzo {#how-to-use}
### Con target {#with-target}

Considera di avere un pulsante nella tua applicazione e di voler mostrare un widget quando viene cliccato tale pulsante.

```html
<button id="btnMaticWidget"></btn>
```

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'mainnet' // network to be used - testnet or mainnet
});
```

Crea il widget quando sei pronto. È meglio chiamare la funzione create dopo la creazione del documento.

```javascript
await widget.create();
```
Il widget è stato creato, ora clicca sul tuo pulsante e il widget verrà visualizzato.

### Senza target {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

Il widget è stato creato, ma per mostrarlo dovrai chiamare l'API `show`.

```
widget.show();
```

Allo stesso modo puoi nascondere il widget chiamando l'API `hide`.

```
widget.hide();
```

### Importante 👉 {#important-note}

1. In base alla rete "testnet" o "mainnet", devi creare la tua applicazione nella rispettiva dashboard. Ti consigliamo di creare l'app con lo stesso nome sia su testnet che su mainnet, in modo da non avere problemi quando cambi rete.

2. Il widget Wallet è una libreria UI e su siti web diversi avrà un aspetto diverso e potrebbe presentare alcuni problemi legati a: colori, reattività ecc. Quindi, ti invitiamo a dedicare un po' di tempo ai test e alla personalizzazione. Se hai bisogno di aiuto, contatta il [team di assistenza](https://support.polygon.technology/).

3. Il widget Wallet è a schermo intero sui dispositivi mobili, ma puoi personalizzarlo tramite la configurazione `style`.

## Configurazione {#configuration}

La configurazione può essere fornita nel costruttore del Widget.

## Le configurazioni disponibili sono {#available-configuration-are}

- **target** : stringa - Selettore CSS per mostrare il widget al clic dell'elemento. Ad esempio, "#btnMaticWidget" sarà il target nel codice sottostante.

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **network** : stringa - rete da usare. Sono disponibili due opzioni: 'testnet' e 'mainnet'.
- **width** : numero - Larghezza del widget
- **height** : numero - Altezza del widget
- **autoShowTime** : numero - Mostra automaticamente il widget dopo un tempo specificato in millisecondi
- **appName** : stringa - nome della tua app, che può essere recuperato nella dashboard del widget.
- **position** : stringa - Imposta la posizione del widget. Le opzioni disponibili sono: -
    - center
    - bottom-right
    - bottom-left
- **amount** : stringa - Precompila l'importo nella casella di testo
- **page** : stringa - seleziona la pagina Le opzioni disponibili sono `withdraw`, `deposit`.
- **overlay** : booleano - mostra l'overlay quando il widget viene aperto. Per impostazione predefinita è "false".
- **style** : oggetto - applica alcuni stili css al widget.

```
var widget = new MaticWidget({
    appName: "<your app id>", //appName from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'testnet' // network to be used - testnet or mainnet,
    style:{
      color:'red'
    }
});
```

## Eventi {#events}

Il widget emette alcuni eventi che possono essere utilizzati per sapere cosa sta succedendo all'interno dell'applicazione.

### Iscriversi agli eventi {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### Annullare l'iscrizione agli eventi {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> Il callback deve essere lo stesso utilizzato per iscriversi all'evento. Quindi è meglio memorizzare il callback in una variabile. `

## Elenco di eventi: {#list-of-events}

- **load** - Il widget è caricato
- **close** - Il widget è chiuso
- **approveInit** - La transazione di approvazione viene inizializzata
- **approveComplete** - La transazione di approvazione è stata completata
- **approveError** - La transazione di approvazione non è riuscita a causa di un errore o l'utente ha negato la transazione su Metamask
- **depositInit** - La transazione di deposito è inizializzata
- **depositComplete** - La transazione di deposito è stata completata
- **depositError** - La transazione di deposito non è riuscita a causa di un errore o l'utente ha negato la transazione di deposito completa su Metamask.
- **burnInit** - La transazione burn di prelievo viene inizializzata
- **burnComplete** - La transazione burn di prelievo è stata completata
- **confirmWithdrawInit** - Il prelievo viene controllato e la transazione di conferma viene inizializzata.
- **confirmWithdrawComplete** - Transazione di conferma del prelievo completata
- **confirmWithdrawError** - La transazione di conferma del prelievo non è andata a buon fine a causa di un errore o l'utente ha negato la transazione di conferma del prelievo su Metamask
- **exitInit** - La transazione di uscita del prelievo viene inizializzata
- **exitComplete** - La transazione di uscita del prelievo è stata completata
- **exitError** - La transazione di uscita dal prelievo non è riuscita a causa di un errore, oppure l'utente ha negato la transazione di uscita dal prelievo su Metamask

## API {#apis}

- **show** -
mostra il widget

```javascript
widget.show()
```

- **hide** -
nasconde il widget

```javascript
widget.hide()
```

- **on** -
permette di iscriversi agli eventi

```javascript
widget.on('<event name>', callback)
```

- **off** -
permette di annullare l'iscrizione agli eventi

```javascript
widget.off('<event name>', callback)
```
