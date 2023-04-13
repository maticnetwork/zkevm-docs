---
id: custom-tokens
title: Configurar tokens personalizados
description: Configura tokens personalizado en MetaMask.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Esta página muestra el proceso de configurar o añadir tokens personalizados a Metamask.

Puedes utilizar el mismo proceso para agregar cualquier tokens personalizado a cualquier red en Metamask. Puedes consultar [esta tabla](#tokens-and-contract-adresses) para visualizar algunos ejemplos de tokens de prueba con sus respectivas direcciones de contrato.

## Añadir un token personalizado a tu cuenta de MetaMask {#adding-a-custom-token-to-your-metamask-account}

En primer lugar, elige la red adecuada para el nuevo token en la pantalla de inicio de tu . Luego, haz clic en "Importar tokens".

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

A continuación, te navegará a una nueva pantalla. En la pantalla de importación de tokens, screen, una dirección en el campo Dirección de Token.

:::info
Para ilustrar este proceso, estamos utilizando un token **ERC-20-TESTV4** en la **red de Goerli.** Encuentra otros tokens de pruebas de otras redes [<ins>aquí</ins>](#tokens-and-contract-adresses).
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

Los demás campos se rellenarán automáticamente. Haz clic en Añadir tokens personalizados y luego haz clic en Importar tokens. El token `TEST` ahora debería aparecer en tu cuenta de MetaMask.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**Añadir un token ERC-1155 de prueba a tu cuenta de MetaMask**

Mientras que la red Polygon es compatible con ERC1155, [Metamask aún no soporta el estándar](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). Esa actualización se espera para el cuarto trimestre de 2021.

### Tokens y se adquiere de acuerdo {#tokens-and-contract-adresses}

| token | Red | Dirección del contrato |
|---------------|---------|----------------------------------------------|
| ERC-20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC-721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC-721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |