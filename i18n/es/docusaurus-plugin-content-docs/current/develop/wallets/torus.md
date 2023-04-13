---
id: torus
title: Torus
description: Torus es un sistema de gestión de claves no custodiales para dApps
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus es un sistema de gestión de claves no custodiales para aplicaciones descentralizadas, seguro y fácil de usar. Nos centramos en proporcionar a los usuarios sin experiencia previa en el tema una puerta de enlace al ecosistema descentralizado.

**Tipo**: No <br/>**Almacenamiento de claves privada**: almacenamiento local de navegador / Cifrado y almacenado en servidores Torus<br/> **Comunicación con el libro mayor de Ethereum**: Infura <br/>
**Codificación de claves privadas**:  /<br/>

Dependiendo de las necesidades de su aplicación, Torus se puede integrar a través de la billetera Torus, o interactuando directamente con la red Torus a través de CustomAuth. Para obtener más información, visita la [documentación de Torus](https://docs.tor.us/).

## Integración de billetera Torus {#torus-wallet-integration}

Si tu aplicación ya es compatible con MetaMask o cualquier otro proveedor de Web3, la integración de la billetera Torus te dará un proveedor para que envolver la misma interfaz Web3. Puedes instalar a través de un paquete . Para obtener más formas e información en profundidad, visita la documentación oficial de Torus sobre [la integración de la billetera](https://docs.tor.us/wallet/get-started).

### Instalación {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### Ejemplo {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## Integración de  {#customauth-integration}

Si estás buscando controlar tu propia UX, desde el inicio de sesión hasta cada interacción, puedes utilizar  . Puedes integrarte a través de uno de sus SDKs dependiendo de la(s) plataforma(s) en la que estés construyendo. Para obtener más información, visita [la integración de  ](https://docs.tor.us/customauth/get-started).
