---
id: widget
title: Widget de billetera
sidebar_label: Wallet Widget
description: "Herramientas de la interfaz de usuario para ejecutar transacciones de puente"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

El widget de billetera es una herramienta de la interfaz de usuario que se puede integrar a cualquier aplicación web para ejecutar transacciones de puente, es decir, depósitos y retiros.

Cada widget está identificado con un nombre único, que puedes obtener en el [panel de control de widgets](https://wallet.polygon.technology/widget-dashboard).

### Panel de control de widgets {#widget-dashboard}

El widget se puede crear desde la página del panel de control de widgets, en la aplicación de la billetera. Esta le permite al usuario crear widgets nuevos con algunas opciones personalizables.

Una vez creado el widget, puedes copiar el fragmento del código y agregárselo a tu aplicación o usar el nombre del widget y configurarlo tú mismo.

Estos son los enlaces al panel de control de widgets:

* Red principal: https://wallet.polygon.technology/widget-dashboard
* Red de pruebas: https://wallet-dev.polygon.technology/widget-dashboard

## Instalación {#install}

El widget se exporta como biblioteca de javascript y está disponible como paquete npm.

```bash
npm i @maticnetwork/wallet-widget
```

## Ejemplos {#examples}

Creamos ejemplos para diferentes marcos y herramientas para ayudarte con el desarrollo. Todos los ejemplos se encuentran en [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)

## Cómo se usa {#how-to-use}
### Con objetivo {#with-target}

Supongamos que tienes un botón en tu aplicación y quieres mostrar el widget al hacer clic en ese botón:

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

Crea el widget cuando estés listo. Es mejor llamar a la función de creación después de haber cargado el documento.

```javascript
await widget.create();
```
El widget está creado. Ahora, haz clic en el botón y se mostrará el widget.

### Sin objetivo {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

El widget está creado, pero, para mostrarlo, tienes que llamar a la API de `show`.

```
widget.show();
```

Del mismo modo, puedes ocultar el widget llamando a la API de `hide`.

```
widget.hide();
```

### Nota importante 👉 {#important-note}

1. Dependiendo de la red, de pruebas o principal, tienes que crear tu aplicación en el panel de control correspondiente. Recomendamos crear la aplicación con el mismo nombre en ambas redes para no tener problemas al cambiar de red.

2. El widget de billetera es una biblioteca de interfaz de usuario y tendrá una apariencia diferente en los distintos sitios web, y puede presentar problemas con los colores, la capacidad de respuesta, etc. Por eso, dedica tiempo a hacer pruebas y personalizar las opciones. Si necesitas ayuda, comunícate con el [equipo de soporte](https://support.polygon.technology/).

3. El widget de billetera ocupa toda la pantalla en los dispositivos móviles, pero puedes personalizarlo mediante la configuración de `style`.

## Configuración {#configuration}

El constructor de widgets puede proporcionar la configuración.

## Los ajustes disponibles son los siguientes: {#available-configuration-are}

- **target** (objetivo) (cadena): selector de CSS para mostrar el widget al hacer clic en el elemento. Por ejemplo, "#btnMaticWidget" es el objetivo en el código de abajo.

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **network** (red) (cadena): la red que se usará. Hay dos opciones disponibles, a saber, "testnet" (red de pruebas) y "mainnet" (red principal).
- **width** (ancho) (número): ancho del widget
- **height** (altura) (número): altura del widget
- **autoShowTime** (número): aparición automática del widget después de un tiempo específico expresado en milisegundos
- **appName** (cadena): nombre de la aplicación; se puede obtener del panel de control de widgets.
- **position** (posición) (cadena): establece la posición del widget. Las opciones disponibles son las siguientes:
    - centro
    - inferior-derecha
    - inferior-izquierda
- **amount** (monto) (cadena): escribe previamente el monto en el cuadro de texto
- **page** (página) (cadena): selecciona la página. Las opciones disponibles son `withdraw`, `deposit`.
- **overlay** (superposición) (booleano): muestra la superposición cuando se abre el widget. Por defecto, es falso.
- **style** (estilo) (objeto): aplica ciertos estilos de CSS al widget.

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

## Eventos {#events}

El widget emite algunos eventos que sirven para saber lo que está sucediendo dentro de la aplicación.

### Suscribirse a los eventos {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### Desuscribirse de los eventos {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> La retrollamada debe ser la misma que la que se utilizó para suscribirse al evento. Por eso, es conveniente guardar la retrollamada en una variable. `

## Lista de eventos: {#list-of-events}

- **load**: el widget está cargado
- **close**: el widget está cerrado
- **approveInit**: la transacción de aprobación está inicializada
- **approveComplete**: la transacción de aprobación está completa
- **approveError**: la transacción de aprobación falló debido a un error o el usuario rechazó la transacción en MetaMask
- **depositInit**: la transacción de depósito está inicializada
- **depositComplete**: la transacción de depósito está completa
- **depositError**: la transacción de depósito falló debido a un error o el usuario rechazó la transacción de depósito completa en MetaMask
- **burnInit**: la transacción de quemado de retiro está inicializada
- **burnComplete**: la transacción de quemado de retiro está completa
- **confirmWithdrawInit**: el retiro se verificó en el punto de control y la transacción de confirmación está inicializada
- **confirmWithdrawComplete**: la transacción de confirmación de retiro está completa
- **confirmWithdrawError**: la transacción de confirmación de retiro falló debido a un error o el usuario rechazó la transacción de confirmación de retiro en MetaMask
- **exitInit**: la transacción de salida del retiro está inicializada
- **exitComplete**: la transacción de salida del retiro está completa
- **exitError**: la transacción de salida del retiro falló debido a un error o el usuario rechazó la transacción de salida del retiro en MetaMask

## API {#apis}

- **show** (mostrar):
mostrar el widget

```javascript
widget.show()
```

- **hide** (ocultar):
ocultar el widget

```javascript
widget.hide()
```

- **on** (activado):
suscribirse a eventos

```javascript
widget.on('<event name>', callback)
```

- **off** (desactivado):
desuscribirse de eventos

```javascript
widget.off('<event name>', callback)
```
