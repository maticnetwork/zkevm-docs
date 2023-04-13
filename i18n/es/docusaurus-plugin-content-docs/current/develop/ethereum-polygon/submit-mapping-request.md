---
id: submit-mapping-request
title: Mapeo de tokens
description:  Una guía sobre cómo mapear los tokens entre las cadenas de Ethereum y Polygon utilizando el puente PoS
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

El mapeo es necesario para transferir sus activos hacia y desde  y . Ofrecemos dos puentes para realizar las mismas acciones. Más detalles en el puente se pueden entender [aquí](/develop/ethereum-polygon/getting-started.md).

:::tip

El puente PoS de Polygon está disponible tanto para Polygon Mainnet como para la red de Mumbai.

:::

## Pasos para enviar una solicitud de mapeo {#steps-to-submit-a-mapping-request}

Para mapear tokens entre  y  PoS, puedes utilizar el [Mapper](https://mapper.polygon.technology/). Abra el enlace y haga clic en el botón **de Nuevo Token** en la esquina superior derecha para iniciar una nueva solicitud de mapeo.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Paso 1 →** Elige la red en la que quieres mapear tu token. Puedes elegir  **para** Testnet y  **para**  para el Mainnet.

**Paso 2 →** Selecciona el tipo de token que estás mapeando: **ERC-20**, **ERC-721** o **ERC-1155**.

**Paso 3 →** Introduce tu dirección de token **Ethereum / Goerli** en el campo **Dirección de Token** . Asegúrate de que tu código de contrato de token haya sido verificado en los exploradores de la cadena de bloques **de Ethereum /** Goerli.

**Paso 4 →** Después de añadir la **dirección de los tokens de Ethereum**, los campos correspondientes es decir, **el nombre de los tokens, el símbolo de los tokens, y Decimal** de Token se rellenarán automáticamente con los detalles del contrato.

**Paso 5 →** Ahora, haz clic en el botón **Iniciar el mapeo** para iniciar el proceso de mapeo. Como esto implica una transacción de Ethereum, deberás conectar tu billetera para proceder.

**Paso 6 →** Se te mostrará un modal de revisión con la información del token y las tarifas de gas estimadas para completar el mapeo. Verifica los detalles e inicia la transacción de mapeo seleccionando el botón **de pago de la tarifa de gas para** mapear.

Después de confirmar la transacción desde tu billetera, tienes que esperar a que la transacción se complete en Ethereum. Una vez que la transacción se haya completado, se te mostrará el modal de éxito con la dirección de tu hijo en la red PoS . Puedes seguir verificando la cartografía consultando la dirección del token infantil generada en [Polygonscan](https://polygonscan.com/).

Para una cartografía exitosa de Mainnet, puedes proporcionar tus detalles de token [aquí](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) para ser agregado en la [**lista de tokens de Polygon**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json).

:::tip

En caso de una [<ins>cartografía personalizada de</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-) tokens, puedes visitar nuestra documentación de [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) y utilizar la información proporcionada para crear tu implementación personalizada de FX para mapear tokens.

:::

## Guía de vídeo {#video-guide}

Aquí hay un breve tutorial de vídeo sobre cómo mapear tokens entre **Ethereum Goerli ↔**  

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Tu navegador no admite el elemento de video.</p>
</video>
