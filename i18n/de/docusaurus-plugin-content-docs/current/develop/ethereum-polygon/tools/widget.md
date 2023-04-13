---
id: widget
title: Wallet-Widget
sidebar_label: Wallet Widget
description: "UI-Tools für Bridge-Transaktionen."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Das Wallet-Widget ist ein UI-Tool, das in jede Web-App integriert werden kann, um Bridge-Transaktionen auszuführen – Ein- und Auszahlung.

Jedes Widget wird durch einen eindeutigen Namen identifiziert, den du am [Widget-Dashboard](https://wallet.polygon.technology/widget-dashboard) findest.

### Widget-Dashboard {#widget-dashboard}

Das Widget kann über das Widget-Dashboard in der Wallet-App erstellt werden. Es ermöglicht es dem Benutzer, ein neues Widget mit einigen anpassbaren Optionen zu erstellen.

Sobald das Widget erstellt wurde, kannst du das Code-Snippet kopieren und in deine App einfügen oder den Widget-Namen verwenden und selbst konfigurieren.

Hier ist der Link zum Widget-Dashboard -

* Mainnet – https://wallet.polygon.technology/widget-dashboard
* testnet – https://wallet-dev.polygon.technology/widget-dashboard

## Installieren {#install}

Das Widget wird als Javascript-Bibliothek exportiert und ist als npm-Paket verfügbar.

```bash
npm i @maticnetwork/wallet-widget
```

## Beispiele {#examples}

Wir haben Beispiele für verschiedene Frameworks und Tools erstellt, um dich bei der Entwicklung zu unterstützen. Alle Beispiele findest du unter – [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)

## Anleitung {#how-to-use}
### Mit Ziel {#with-target}

In deiner App befindet sich eine Schaltfläche, die nach einem Klick das Widget anzeigt -

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

Widget erstellen, sobald es bereit ist. Rufe die Erstellungsfunktion am besten auf, nachdem das Dokument geladen wurde.

```javascript
await widget.create();
```
das Widget wird erstellt. Klicke jetzt auf deine Schaltfläche und das Widget wird angezeigt.

### Ohne Ziel {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

das Widget wird jetzt erstellt, aber um das Widget anzuzeigen – musst du die `show`API aufrufen.

```
widget.show();
```

Du kannst das Widget auch verbergen, indem du die `hide`API aufrufst.

```
widget.hide();
```

### Wichtiger Hinweis 👉 {#important-note}

1. Je nach Netzwerk – „testnet“ oder „mainnet“ – musst du deine App auf dem entsprechenden Dashboard erstellen. Wir empfehlen, die App mit demselben Namen sowohl auf testnet als auch auf mainnet zu erstellen, damit es beim Netzwerkwechsel keine Probleme gibt.

2. Das Wallet-Widget ist die UI-Bibliothek. Sie sieht auf unterschiedlichen Websites anders aus, was Problem mit Dingen wie Farben, Responsiveness etc. mit sich bringen kann. Teste und personalisiere also sorgfältig. Falls du Hilfe brauchst, wende dich bitte an das [Support-Team](https://support.polygon.technology/).

3. Das Wallet-Widget wird auf mobilen Geräten im Vollbildmodus angezeigt, du kannst es aber anpassen, indem du es `style`konfigurierst.

## Konfigurierung {#configuration}

Die Konfigurierung kann im Widget-Constructor bereitgestellt werden.

## Verfügbare Konfigurationen sind {#available-configuration-are}

- **target** : string - CSS-Selektor zum Anzeigen des Widgets per Mausklick auf das Element. Im unten stehenden Code ist das Ziel zum Beispiel „#btnMaticWidget“.

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **network** : String – das zu verwendende Netzwerk. Es stehen zwei Optionen zur Verfügung – „testnet“ oder „mainnet“.
- **width** : Zahl - Breite des Widgets
- **height** : Zahl - Höhe des Widgets
- **autoShowTime** : Zahl - Automatische Anzeige des Widgets nach der angegebenen Zeit in Millisekunden
- **appName** : String - Name deiner App, der dem Widget-Dashboard entnommen werden kann.
- **position** : String - Legt die Position des Widgets fest. Die verfügbaren Optionen sind -
    - Mitte
    - Unten rechts
    - Unten links
- **amount** : String - Gib den Betrag vorab in das Textfeld ein
- **page** : String - Wähle die Seite. Verfügbare Optionen sind - `withdraw`, `deposit`.
- **overlay** : Boolescher Wert - Overlay anzeigen, wenn das Widget geöffnet wird. Die Standardeinstellung ist „falsch“.
- **style** : Objekt - Wende css-Styles auf dein Widget an.

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

## Ereignisse {#events}

Das Widget sendet einige Ereignisse, über die du erfährst, was in der App geschieht.

### Events abonnieren {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### Events abbestellen {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> Callback sollte dem entsprechen, mit dem das Event abonniert wurde. Daher ist es besser, das Callback in einer Variable zu speichern. `

## Eventliste: {#list-of-events}

- **load** - Das Widget wurde geladen
- **close** - Das Widget ist geschlossen
- **approveInit** - Die Genehmigungstransaktion wurde gestartet
- **approveComplete** - Die Genehmigungstransaktion ist abgeschlossen
- **approveError** - Die Genehmigungstransaktion ist aufgrund eines Fehlers fehlgeschlagen oder der Benutzer hat die Transaktion auf Metamask verweigert
- **depositInit** - Die Einzahlungstransaktion wird gestartet
- **depositComplete** - Die Einzahlungstransaktion ist abgeschlossen
- **depositError** - Die Einzahlungstransaktion ist aufgrund eines Fehlers fehlgeschlagen oder der Benutzer hat die komplette Einzahlungstransaktion auf Metamask verweigert
- **burnInit** - Die Auszahlungs-Burn-Transaktion wird gestartet
- **burnComplete** - Die Auszahlungs-Burn-Transaktion ist abgeschlossen
- **confirmWithdrawInit** - Die Auszahlung passiert den Checkpoint und die Bestätigungstransaktion wird gestartet
- **confirmWithdrawComplete** - Die Bestätigungstransaktion der Auszahlung ist abgeschlossen
- **confirmWithdrawError** - Die Bestätigungstransaktion der Auszahlung ist aufgrund eines Fehlers fehlgeschlagen oder der Benutzer hat die Bestätigungstransaktion der Auszahlung auf Metamask verweigert
- **exitInit** - Die Exit-Transaktion der Auszahlung wurde gestartet
- **exitComplete** - Die Exit-Transaktion der Auszahlung ist abgeschlossen
- **exitError** - Die Exit-Transaktion der Auszahlung ist aufgrund eines Fehlers fehlgeschlagen oder der Benutzer hat die Exit-Transaktion der Auszahlung auf Metamask verweigert

## APIS {#apis}

- **anzeigen** -
Widget anzeigen

```javascript
widget.show()
```

- **verbergen** -
Widget verbergen

```javascript
widget.hide()
```

- **ein** -
Events abonnieren

```javascript
widget.on('<event name>', callback)
```

- **aus** -
Events abbestellen

```javascript
widget.off('<event name>', callback)
```
