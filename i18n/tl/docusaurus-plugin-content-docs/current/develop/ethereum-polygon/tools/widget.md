---
id: widget
title: Wallet Widget
sidebar_label: Wallet Widget
description: "Mga tool sa UI para magawa ang mga bridge na transaksyon."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ang widget ng wallet ay isang tool sa UI na maaaring i-embed sa anumang web application para sa pagsasagawa ng mga transaksyon sa bridge - Pagdeposito at Pag-withdraw.

Nakikilala ang bawat widget sa pamamagitan ng natatanging pangalan na matatagpuan mo sa [Widget dashboard](https://wallet.polygon.technology/widget-dashboard) .

### Dashboard ng widget {#widget-dashboard}

Maaaring gawin ang widget mula sa page ng dashboard ng widget sa wallet application. Pinapayagan nito ang user na gumawa ng widget na may ilang naiaangkop na pagpipilian.

Kapag nagawa na ang widget, maaari mong kopyahin ang snippet ng code at idagdag ito sa iyong application o gamitin ang pangalan ng widget at i-configure mo nang mag-isa.

Narito ang link sa widget dashboard -

* mainnet - https://wallet.polygon.technology/widget-dashboard
* testnet - https://wallet-dev.polygon.technology/widget-dashboard

## I-install {#install}

Na-export ang widget bilang javascript library at magagamit bilang npm package.

```bash
npm i @maticnetwork/wallet-widget
```

## Mga halimbawa {#examples}

Gumawa kami ng mga halimbawa para sa iba't ibang balangkas at tool upang matulungan ka sa pagbuo. Matatagpuan ang lahat ng halimbawa sa - [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)

## Paano gamitin {#how-to-use}
### Sa target {#with-target}

Isaalang-alang na mayroon kang button sa iyong app at gusto mong ipakita ang widget kapag nag-click sa button na iyon -

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

Gumawa ng widget kapag handa ka na. Pinakamabuting i-call ang function na gumawa pagkatapos ma-load ang dokumento.

```javascript
await widget.create();
```
Nagawa na ang widget. Ngayon naman, mag-click sa button at lalabas ang widget.

### Walang target {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

Nagawa na ngayon ang widget, pero para ipakita ang widget - kailangan mong i-call ang `show` API.

```
widget.show();
```

Katulad nito, puwede mong itago ang widget sa pamamagitan ng pag-call sa `hide` API.

```
widget.hide();
```

### Mahalagang Tandaan 👉 {#important-note}

1. Batay sa network na "testnet" o "mainnet", kailangan mong gawin ang iyong app sa kani-kanilang dashboard. Inirerekomenda naming gumawa ng app na may parehong pangalan sa parehong testnet at mainnet, para wala kang maging anumang isyu kapag nagpapalit ka ng network.

2. Ang widget ng Wallet ay bahagi ng UI Library. Magmumukhang iba ito sa iba't ibang website at maaaring magkaroon ng ilang isyu tulad ng - mga kulay, pagtugon atbp. Kaya mangyaring gumugol ng ilang oras sa pagsubok at pag-customize. Sa kaso ng anumang tulong na kailangan - mangyaring ipaabot ito sa [team ng suporta](https://support.polygon.technology/).

3. Naka-full screen ang widget ng wallet sa mga mobile device ngunit maaari mo itong i-customize ayon sa `style` configuration.

## Configuration {#configuration}

Maaaring ibigay sa Widget constructor ang configuration.

## Available na configuration ang {#available-configuration-are}

- **target** : string - CSS selector para sa pagpapakita ng widget sa pag-click ng elemento. Halimbawa, "#btnMaticWidget" ang target sa code sa ibaba.

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **network** : string - network na gagamitin. Dalawang opsyon ang magagamit - 'testnet' o 'mainnet'.
- **lapad** : numero - Lapad ng widget
- **taas** : numero - Taas ng widget
- **autoShowTime** : numero - Auto show na widget pagkatapos ng tinukoy na oras sa millisecond
- **appName** : string - pangalan ng iyong app, maaari itong makuha sa dashboard ng widget.
- **posisyon** : string - Itinatakda ang posisyon ng widget. Ang available na mga opsyon ay -
    - sentro
    - ibabang kanan
    - ibabang kaliwa
- **halaga** : string - Paunang punan ang halaga sa text box
- **page** : string - piliin ang page. Available na mga opsyon ay - `withdraw`, `deposit`.
- **overlay** : boolean - ipakita ang overlay widget kapag nabuksan ang widget. By default, hindi ito totoo.
- **style** : object - maglapat ng ilang css style sa widget.

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

## Mga Kaganapan {#events}

Nagpapakita ng ilang kaganapan ang widget na maaaring magamit upang malaman kung ano ang nangyayari sa loob ng application.

### Mag-subscribe sa mga kaganapan {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### Mag-unsubscribe sa mga kaganapan {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> Dapat na kapareho ang callback sa kung ano ang ginamit sa pag-subscribe sa kaganapan. Kaya mas mahusay na iimbak ang callback sa  variable. `

## Listahan ng mga kaganapan: {#list-of-events}

- **load** - Na-load ang widget
- **isara** - Nakasara ang widget
- **approveInit** - Sinisimulan ang transaksyon sa pag-apruba
- **approveComplete** - Nakumpleto ang transaksyon sa pag-apruba
- **approveError** - Nabigo ang transaksyon sa pag-apruba dahil sa ilang error, o tinanggihan ng user ang transaksyon sa Metamask
- **depositInit** - Sinisimulan ang transaksyon sa pagdeposito
- **depositComplete** - Nakumpleto ang transaksyon sa pagdeposito
- **depositError** - Nabigo ang transaksyon sa pagdeposito dahil sa ilang error, o tinanggihan ng user ang kumpletong transaksyon sa pagdeposito sa Metamask
- **burnInit** - Sinisimulan ang transaksyon sa pag-withdraw ng pag-burn
- **burnComplete** - Nakumpleto ang transaksyon sa pag-withdraw ng pag-burn
- **confirmWithdrawInit** - Nakapagsagawa ng checkpoint sa pagwithdraw at nasimulan na ang pagkumpirma sa transaksyon
- **confirmWithdrawComplete** - Nakumpleto na ang transaksyon sa pagkumpirma ng pag-withdraw
- **confirmWithdrawError** - Nabigo ang transaksyon sa pagkumpirma ng pag-withdraw dahil sa ilang error, o tinanggihan ng user ang transaksyon sa pagkumpirma ng pag-withdraw sa Metamask
- **exitInit** - Nasimulan ang transaksyon sa pag-exit sa pag-withdraw
- **exitComplete** - Nakumpleto ang transaksyon sa pag-exit sa pag-withdraw
- **exitError** - Nabigo ang pag-exit sa transaksyon ng pag-withdraw dahil sa ilang error, o tinanggihan ng user ang pag-exit sa transaksyon ng pag-withdraw sa Metamask

## APIS {#apis}

- **ipakita** -
ipakita ang widget

```javascript
widget.show()
```

- **itago** -
itago ang widget

```javascript
widget.hide()
```

- **sa** -
mag-subscribe sa mga kaganapan

```javascript
widget.on('<event name>', callback)
```

- **off** -
mag-unsubscribe sa mga kaganapan

```javascript
widget.off('<event name>', callback)
```
