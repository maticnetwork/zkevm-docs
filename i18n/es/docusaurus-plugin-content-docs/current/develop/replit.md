---
id: replit
title: Implementa un contrato inteligente utilizando la respuesta
sidebar_label: Using Replit
description: Despliega contratos inteligentes utilizando  en Polygon
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Descripción general {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) es una plataforma de codificación que permite escribir código y alojar aplicaciones. Replit es compatible con [el lenguaje de programación Solidity](https://replit.com/@replit/Solidity-starter-beta?v=1), por lo que ofrece todas las características y funcionalidades para que los desarrolladores de Web3 creen e implementen contratos inteligentes.

Este artículo te guía para crear y desplegar un contrato inteligente de solidez en Polygon utilizando la plantilla de desarrollo [de la](https://replit.com/signup) réplica y [la réplica de la solidez (beta de iniciador de solidez)](https://replit.com/@replit/Solidity-starter-beta?v=1).

## Qué vas a hacer {#what-you-will-do}

- Crear una cuenta de Replit
- Crear un entorno de Repl
- Implementa un proyecto de muestra en la red Polygon Mumbai
- Verificar el contrato
- Publicar tu proyecto en un perfil personal de Replit

:::tip

Para ejemplos adicionales sobre la solidez con la respuesta, puedes leer el artículo <ins>**[Comienza con la](https://blog.replit.com/solidity)**</ins> respuesta o revisa <ins>**[la documentación de la solidez de la respuesta y el tutorial del contrato de Cemento](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>.
:::

## Prerrequisitos {#prerequisites}

No necesitas ninguna configuración de entorno local para desplegar tu contrato inteligente de solidez en Polygon utilizando la respuesta.

Necesitas una billetera Web3 integrada en el navegador para interactuar con la red de pruebas Mumbai de Polygon y los contratos implementados. Si ya estás usando MetaMask, te recomendamos crear una cuenta nueva para las pruebas con Replit. Puedes hacerlo desde el menú de la cuenta, que aparece al hacer clic en el avatar de la cuenta, en la esquina superior derecha de la interfaz de MetaMask.

Tienes que preparar los siguientes requisitos previos para poder implementar tu contrato inteligente en Solidity en Polygon:

1. [Crear una cuenta de Replit](https://replit.com/signup)
2. [Descargar la billetera de MetaMask](/docs/develop/metamask/hello)
3. [Configuración de Polygon en MetaMask](/docs/develop/metamask/config-polygon-on-metamask)
4. [Obtener tokens de la red de pruebas](https://faucet.polygon.technology)

## Trabajo con un Repl {#working-with-a-repl}

Cada Repl que creas es un entorno de desarrollo y producción totalmente funcional. Sigue los pasos para crear un Replit inicial de Solidity:

1. [Inicia sesión](https://replit.com/login) o [crea una cuenta](https://replit.com/signup). Después de crear tu [cuenta de respuesta](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide), tu pantalla de inicio incluirá un panel donde podrás ver, crear proyectos y administrar tu cuenta.

![img](/img/replit/dashboard.png)

2. Una vez que haya iniciado sesión, crea un respuesta de inicio de Solidez, selecciona **+ Crear Repl** desde el panel izquierdo o **+** en la esquina superior derecha de la pantalla.

![img](/img/replit/solidity.png)

3. Selecciona la plantilla [**de inicio de la solidez (beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) y dale un título a tu proyecto.

4. Haz clic en **+ Crear Repl** para crear tu proyecto.

:::note

El  de inicio viene con una interfaz amigable para el navegador, construida con la <ins>**[API de JavaScript de Ethereum de](https://web3js.readthedocs.io/en/v1.5.2/)**</ins> Web3, que puedes utilizar para desplegar e interactuar con nuestros contratos. desplegaremos a la red de pruebas de respuesta, una versión personalizada de la cadena de bloques Ethereum gestionada por Replit y optimizada para realizar pruebas.

:::

## Implementación en Polygon {#deploy-on-polygon}

Asegúrate de haber seguido la lista de **requisitos previos** anteriores para que estés listo para desplegar e interactuar con tu contrato inteligente.

1. Haz clic en **Ejecutar** (en la parte superior) para instalar todos los paquetes relevantes e iniciar la interfaz de usuario de despliegue de contrato.

2. Conecta tu billetera MetaMask a la interfaz web y cambia a la [red de pruebas de Mumbai](docs/develop/metamask/config-polygon-on-metamask).

![img](/img/replit/connect.png)

3. Haz clic en **Conectar **, selecciona tu cuenta y selecciona **Conectar**.

![img](/img/replit/deploy-list.png)

4. En la lista desplegable, selecciona el contrato que quieres desplegar. Haz clic en **desplegar**.

5. Recibirás una ventana emergente de MetaMask pidiendo tu confirmación. Aprueba la transacción desde tu billetera para desplegar tu contrato.

## Verificación e implementación de pruebas del contrato  {#verifying-and-testing-your-contract}

Cuando el contrato esté implementado, [dirígete a Polygonscan](https://mumbai.polygonscan.com/) para buscar tu cuenta, ver el contrato que implementaste y copiar la dirección de tu cuenta.

Una vez que tu contrato haya sido desplegado, se mostrará como cajas expandibles debajo de la caja desplegable. Expándelo y mira todas las distintas funciones disponibles. Ahora puedes interactuar con el contrato mediante la interfaz de usuario proporcionada o desde un URL compartible que aparece en la interfaz.

## Publicación en Replit​ {#publish-to-replit}

Replit te permite publicar tus proyectos en un perfil personal. Después de publicarlos, los proyectos aparecerán en tu página publica para que otras personas los vean, interactúen con ellos, los clonen y colaboren.

Sigue los siguientes pasos para publicar tus proyectos en la respuesta:

1. Selecciona el título del proyecto en la parte superior de la pantalla.
2. Completa el nombre y la descripción de tu proyecto y haz clic en **Publicar**.
