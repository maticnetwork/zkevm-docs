---
id: getting-started
title: Introducción a las PoS de Polygon
sidebar_label: Quick Start
description: Desarrolla tu próxima apicación de cadena de bloques en Polygon.
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution Actualización de los documentos de desarrollo

Estamos actualizando, incrementando y mejorando los documentos. Estos están sujetos a cambios.
No dudes en plantear un problema o solicitud de incorporación de cambios si tienes preguntas o sugerencias.

:::

Bienvenido a **Polygon (antes, red Matic)**! La plataforma más innovadora y fascinante para desarrollar tu aplicación de cadena de bloques. La tecnología de cadena de bloques está a punto de revolucionar el modo en que el mundo digital maneja los datos y hace negocios. Puedes unirte a esta revolución aprendiendo sobre el desarrollo de aplicaciones descentralizadas (DApp) en Polygon.

Esta guía te presentará el ecosistema de Polygon. Encontrarás enlaces a valiosos recursos y sitios web para ponerte al día con la construcción, no solo en Polygon, sino también el desarrollo de aplicaciones de cadena de bloques en general.

:::tip Mantente informado

Mantente informado de las últimas novedades del constructor del equipo de Polygon
y de la comunidad suscribiéndote a los
[<ins>Grupos de notificaciones </ins>](https://polygon.technology/notifications/).

:::

Polygon's Test Network which is called **Mumbai** connects with **Ethereum's Goërli Testnet.** All the network related details can be found in [network docs](/docs/operate/network).

## Características clave de Polygon {#key-features-of-polygon}

- **Velocidad**: la red Polygon utiliza una cadena de bloques de alto rendimiento con consenso proporcionada por un grupo de productores de bloques seleccionados por las partes interesadas en cada punto de control. Se usa una capa de prueba de participación para validar los bloques y publicar periódicamente pruebas de los productores de bloques en la red principal de Ethereum. Eso permite una velocidad de confirmación de los bloques de aproximadamente 2 segundos mientras se mantiene un alto nivel de descentralización, lo que da como resultado un excelente rendimiento de la red.
- **Escalabilidad**: la red de Polygon alcanza una velocidad hipotética de la transacción de menos de 2 segundos en una sola El uso de varias cadenas laterales le ayuda a la red a administrar millones de transacciones por segundo. Este mecanismo (ya demostrado en la primera cadena lateral de MATIC) permite que la red de Polygon escale fácilmente.
- **Seguridad**: los contratos inteligentes de Polygon se basan en la seguridad de Ethereum. Para salvaguardar la red, emplea tres modelos de seguridad crítica. Usa los **contratos de administración de la participación** de Ethereum y un grupo de validadores incentivados que ejecutan nodos de **Heimdall** y **Bor**. Los desarrolladores también pueden implementar ambos modelos (híbrido) en sus DApp.

## Cómo construir en Polygon {#building-on-polygon}

Si eres desarrollador de Ethereum, ya eres desarrollador de Polygon. Solo tienes que cambiar a la [RPC (llamada a procedimiento remoto) de Polygon](https://polygon-rpc.com/) y empezar. Todas las herramientas de la cadena de bloques de Ethereum con las que estás familiarizado son compatibles con Polygon por defecto, como Truffle, Remix y Web3js.

Puedes implementar aplicaciones descentralizadas para la red de pruebas Mumbai o la red principal de Polygon. La red de pruebas Mumbai de Polygon se conecta con la red de pruebas Goërli de Ethereum, que actúa como su cadena primaria. Puedes encontrar toda la información sobre la red en la [documentación de la red](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/network-details/network.md).

### Billeteras {#wallets}

Para interactuar con la red de Polygon, necesitas una billetera para Ethereum porque Polygon se ejecuta en la máquina virtual de Ethereum (EVM). Puedes optar por configurar una billetera de [MetaMask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) o [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md). Más información relacionada con la billetera y por qué necesitas uno se puede encontrar en nuestra [documentación](https://docs.polygon.technology/docs/develop/wallets/getting-started) de la billetera.

### Contratos inteligentes {#smart-contracts}

Polygon es compatible con muchos servicios que puedes usar para poner a prueba, compilar, depurar e implementar aplicaciones descentralizadas en la red de Polygon. Esto incluye la implementación con [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md) y [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md).

### Cómo conectarse a Polygon {#connecting-to-polygon}

Puedes agregar Polygon a MetaMask o usar Arkane directamente, lo que te permite conectarte a Polygon usando la [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/).

Para conectarse con la red Polygon para leer la información de la cadena de bloques, recomendamos utilizar el SDK de Alchemy.

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### ¿Cómo construir una DApp nueva en Polygon? {#building-a-new-dapp-on-polygon}

Las aplicaciones descentralizadas (DApp) sirven como puente entre los usuarios y la privacidad de sus datos en la cadena de bloques. El creciente número de DApp valida su utilidad dentro del ecosistema de cadena de bloques al resolver problemas como hacer transacciones entre dos participantes sin necesidad de una autoridad central a mediante contratos inteligentes.

Supongamos que no tienes experiencia en la construcción de aplicaciones descentralizadas (DApp). En ese caso, los recursos mencionados a continuación te darán las herramientas necesarias para construir, depurar e implementar DApp en la red de Polygon.

- [DApp con interfaz de usuario y modo administrador: serie de tutoriales](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [MetaMask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Desarrollar una DApp con Fauna, Polygon y React](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### ¿Ya tienes una DApp? {#already-have-a-dapp}

Si ya tienes una aplicación descentralizada (DApp) y estás buscando una plataforma que te ayude a escalar de manera eficiente, estás en el lugar correcto, ya que Polygon te permite lo siguiente:

1. **Fácil migración desde la cadena de la máquina virtual de Ethereum (EVM)**: Polygon se enorgullece de ser la solución definitiva de escalado de capa 2 para Ethereum. Siempre que sean compatibles con la EVM, no tienes que preocuparte por la arquitectura subyacente cuando muevas o implementes tus DApp en la red de Polygon.
2. **Uso de Polygon como capa más veloz para transacciones**: implementar tu DApp en la red principal de Polygon te permite utilizar Polygon como capa más rápida para transacciones para tu DApp. Además, nosotros podemos mapear tus tokens. Para unirte a nuestro [grupo de debates técnicos](http://bit.ly/matic-technical-group) en Telegram para conocer más.

## Notas adicionales {#side-note}

Si esto es abrumador, no te preocupes. Puedes pasar directamente a la acción. Te dejamos algunos consejos para antes de que empieces a explorar los recursos, repositorios y documentos:

1. **Ten en cuenta el costo de estar a la vanguardia:** Como sucede normalmente con la programación especializada, el desarrollo de DApp y de cadenas de bloques avanza muy rápido. Al investigar, es posible que encuentres repositorios de códigos complejos, 404 en algún sitio de documentación o incluso no encuentres documentación alguna. Aprovecha esas oportunidades para comunicarte con nosotros por medio de cualquiera de nuestras redes sociales.
2. **La curva de aprendizaje puede ser desalentadora, pero la barrera para entrar es baja**: la comunidad es muy abierta y acogedora. Los proyectos reciben solicitudes de incorporación de cambios de extraños y resuelven cualquier bloqueo de forma activa. Trabajamos para crear un mundo mejor y apreciamos las contribuciones de cualquier tipo. Estaremos agradecidos de que te incorpores a este fascinante ecosistema de Web3.

:::info Mantente al día

El desarrollo de aplicaciones descentralizadas fomenta la descentralización de la red. Síguenos en redes sociales para obtener más información y novedades sobre el ecosistema de Polygon. [Aquí](https://polygon.technology/community/) están los enlaces a todas las comunidades de Polygon.

:::
