---
id: fx-portal
title: FxPortal
description: Transfiere datos o estado de Ethereum a Polygon sin cartografiar con FxPortal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

El mecanismo habitual para leer nativamente los datos de  de Polygon es utilizar **la sincronización **. Eso permite la transferencia de datos arbitrarios de Ethereum a Polygon. Sin embargo, este enfoque también requiere el mapeo de los contratos primarios y secundarios si no se puede usar la interfaz predeterminada. FxPortal ofrece una alternativa para implementar tokens ERC estandarizados sin ningún tipo de mapeo, solo utilizando los contratos de base implementados de FxPortal.

## ¿Qué es FxPortal? {#what-is-fxportal}

Es una implementación potente pero simple del mecanismo de [sincronización de estado](../../pos/state-sync/state-sync-mechanism.md) de Polygon. El puente de PoS de Polygon está construido con la misma arquitectura. El código en [la](https://github.com/fx-portal/contracts/tree/main/contracts/examples) carpeta de ejemplos son algunos ejemplos de uso. Puedes utilizar estos ejemplos fácilmente para construir tus propias implementaciones o propio puente personalizado que permite cualquier sincronización de estado sin mapear.

Puedes revisar el [repositorio de GitHub](https://github.com/fx-portal/contracts) para ver contratos y ejemplos.

## ¿Cómo funciona? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) y [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) son los principales contratos en los que trabaja FxPortal. Llama y transmite datos a métodos definidos por el usuario en la otra cadena sin ningún mapeo utilizando el mecanismo de sincronización de estado. Para usar los contratos principales implementados, puedes implementar contratos de base de FxPortal en los contratos inteligentes que implementes, a saber, [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) y [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Al basarse en estos contratos, los contratos que implementes podrán comunicarse entre sí mediante el mecanismo de túnel de datos.

De lo contrario, puedes elegir mapear tus tokens con los contratos de túnel ya desplegados. Los detalles de despliegue por defecto de  para Polygon Mainnet y Mumbai son los siguientes:

- [Red principal de Polygon](https://static.matic.network/network/mainnet/v1/index.json)
- [Testnet de Mumbai](https://static.matic.network/network/testnet/mumbai/index.json)

Busca la palabra clave `FxPortalContracts`en los enlaces anteriores para encontrar todos los contratos de túnel por defecto y otras despliegues importantes de contratos de FxPortal.

## ¿Necesito una implementación personalizada de FxTunnel? {#do-i-need-a-custom-fxtunnel-implementation}

Debes ir a una **implementación personalizada** de FxTunnel solo si las implementaciones por defecto del túnel no se alinean con tu caso de uso. Cuando uses los túneles de FxPortal por defecto, no podrás modificar el código de contrato infantil. El bytecode para el contrato de token infantil siempre se fija y siempre sigue el mismo para las [despliegues por defecto ](https://github.com/fx-portal/contracts/tree/main/contracts/examples). En caso de que necesites un token infantil personalizado, debes ir por tu propio FxTunnel personalizado y leer la siguiente parte te guiará más en la implementación de tus propios FxTunnels personalizados.

Es altamente recomendable leer y entender la [transferencia de estado de FxPortal](state-transfer.md) antes de leer la siguiente sección. Cada una de estas secciones siguientes tendrá enlaces de contratos de túnel de ejemplo asociados a ella. Estos ejemplos se pueden tomar como una referencia mientras se construyen sus propios túneles de corriente personalizados.

## Transferencia de ERC-20 {#erc20-transfer}

Los contratos de [túnel raíz y niños](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) permiten el depósito de tokens en la cadena de la raíz y la retirada en la cadena .

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: puedes llamar a la función en el contrato desplegado para mapear tu token ERC-20 y crear un token infantil correspondiente en la cadena infantil.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: `deposit()`método de llamada con la dirección del token mapeado, la dirección que puede retirar con una cantidad correspondiente (junto con datos si es necesario). Debes haber aprobado el contrato utilizando la `approve`función ERC-20 estándar para gastar tus tokens primero.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: la dirección asignada `deposit()`puede retirar toda la cantidad de token infantil utilizando esta función. Recibirá el token secundario creado en el mapeo inicial.
- `rootToChildToken`: Esta variable pública contiene el token raíz a la cartografía de tokens infantil. Puedes consultar el mapeo con la dirección del token primario para conocer la dirección del token secundario implementado.

### Desde  → Polygon {#polygon}

1. Implementa tu token ERC-20 en la cadena primaria. Necesitarás esta dirección más tarde.
2. Aprueba los tokens para la transferencia llamando a la función `approve()` del token primario usando la dirección del túnel primario y la cantidad como argumentos.
3. Llama a `deposit()` con la dirección del receptor y la cantidad en la cadena primaria para recibir el token secundario equivalente en la cadena secundaria. Esto también mapeará el token de forma automática. Como alternativa, puedes llamar a `mapToken()` primero, antes de hacer el depósito.
4. Después de mapping, ahora deberías poder ejecutar transferencias de la cadena utilizando las `withdraw`funciones `deposit`del túnel.

:::note

Después de haber realizado `deposit()`en la cadena raíz, tomará 22 a 30 minutos para que ocurra la sincronización . Una vez que se produzca la sincronización estatal, obtendrás los tokens depositados en la dirección dada.

:::

### Desde  → Ethereum {#ethereum}

1. Llama a `withdraw()` con la dirección y el monto del token respectivo como argumentos en el contrato secundario para mover los tokens secundarios nuevamente al receptor designado en la cadena primaria. **Observa el hash de la transacción**, ya que este se usará para generar la prueba de quemado.

2. Aquí puedes encontrar los pasos para completar el [retiro](#withdraw-tokens-on-the-root-chain).

## Transferencia ERC-721 {#erc721-transfer}

En caso de que necesites un ejemplo, consulta esta guía [de túneles de raíz y niños .](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer)

### Desde  → Polygon {#polygon-1}

1. Implementa tu token ERC-721 en la cadena primaria. Necesitarás esta dirección más tarde.
2. Aprueba los tokens para la transferencia llamando a la función `approve()` del token primario usando la dirección del túnel primario y la ID del token como argumentos.
3. Llama a `deposit()` con la dirección del receptor y la ID del token en la cadena primaria para recibir el token secundario equivalente en la cadena secundaria. Esto también mapeará el token de forma automática. Como alternativa, puedes llamar a `mapToken()` primero, antes de hacer el depósito.

:::note

Después de haber realizado `deposit()`en la cadena raíz, tomará 22 a 30 minutos para que ocurra la sincronización . Una vez que se produzca la sincronización estatal, obtendrás los tokens depositados en la dirección dada.

:::

### Desde  → Ethereum {#ethereum-1}

1. Llama a `withdraw()` con la dirección y la ID del token respectivo como argumentos en el contrato secundario para mover los tokens secundarios nuevamente al receptor designado en la cadena primaria. **Observa que el hash tx** se utilizará para generar la prueba de quemado.

2. Aquí puedes encontrar los pasos para completar el [retiro](#withdraw-tokens-on-the-root-chain).

## Transferencia de ERC-1155 {#erc1155-transfer}

En caso de que necesites un ejemplo, consulta esta guía [de túneles de raíz y niños .](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer)

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: Se utiliza para mapear su token ERC-1155 root a la cadena infantil
- `deposit(rootToken, user, id, amount, data)`: función utilizada para depositar tokens primarios en la cadena secundaria
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: se usa para varias ID de token y los montos correspondientes
- `receiveMessage(inputData)`: se debe llamar después de haber generado la prueba de quemado con la carga útil como `inputData`

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: se usa para retirar el token de Polygon a Ethereum
- `withdrawBatch(childToken, ids, amounts, data)`: igual que el anterior, pero para retirar varias ID de token

### Desde  → Polygon {#polygon-2}

1. Implementa tu token ERC-1155 en la cadena primaria. Necesitarás esta dirección más tarde.
2. Llama `setApprovalForAll(operator, approved)`al token desplegado con la `FxERC1155RootTunnel`dirección para `operator`permitir `FxERC1155RootTunnel`transferir tus tokens a `FxERC1155ChildTunnel`Polygon.
3. `mapToken()`Llama `FxERC1155RootTunnel`a la dirección de tu token desplegado como .`rootToken` Esto enviará un mensaje para que se le `FxERC1155ChildTunnel`instruya que se despliegue y se mapee el token ERC-1155 en Polygon. Para consultar la dirección de su token de hijo, `rootToChildToken`llama .`FxERC1155ChildTunnel`
4. Haz una `deposit()`llamada `FxERC1155RootTunnel`con la dirección del token en Ethereum como , `rootToken`receptor como , ID de `user`token como `id`y la cantidad como .`amount` Como alternativa, puedes llamar a `depositBatch()` para varias ID de token.

:::note

Después de haber realizado `deposit()`en la cadena raíz, tomará 22 a 30 minutos para que ocurra la sincronización . Una vez que se produzca la sincronización estatal, obtendrás los tokens depositados en la dirección dada.

:::

### Desde  → Ethereum {#ethereum-2}

1. Haz una `withdraw()`llamada `FxERC1155ChildTunnel`con la dirección del token infantil desplegado en Polygon como el id `childToken`y el token como `id`(la dirección del token infantil se puede consultar desde la `rootToChildToken`cartografía). Como alternativa, puedes llamar a `withdrawBatch()` para varias ID de token y los montos correspondientes. **Observa que el hash tx** se utilizará para generar la prueba de quemado.

2. Aquí puedes encontrar los pasos para completar el [retiro](#withdraw-tokens-on-the-root-chain).

## Retira los tokens en la cadena de raíz {#withdraw-tokens-on-the-root-chain}

:::info

Después de haber realizado `withdraw()`en la cadena infantil, tomará 30 a 90 minutos para que ocurra un punto de control. Una vez que el siguiente punto de control incluye la transacción de quemado, puedes retirar los tokens en la cadena raíz.

:::

1. Genera la prueba de quemado utilizando el **hash de**  y **MESSAGE_SENT_EVENT_SIG**. Para generar la prueba, puedes utilizar la API de generación de pruebas alojada por Polygon o también puedes hacer crecer tu propia API de generación de pruebas siguiendo las instrucciones [aquí](https://github.com/maticnetwork/proof-generation-api).

El extremo de generación de pruebas alojado por Polygon está disponible [aquí.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

  - `burnTxHash`es el hash de la `withdraw()`transacción que inició en Polygon.
  - `eventSignature`es la firma del evento del evento emitido por la `withdraw()`función. La firma del evento para el  es `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Los ejemplos de uso de la API de generación de pruebas para la  y Testnet son los siguientes:

→ [Generación de   ](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Generación de prueba de Testnet](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Alimenta la carga útil generada como el argumento `receiveMessage()`a en el contrato de túnel raíz correspondiente en Goerli o Ethereum.

## Transferencia de ERC-20 acuñable {#mintable-erc-20-transfer}

En caso de que necesites un ejemplo, consulta esta guía [de túneles de raíz y niños .](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer)

:::info

En el caso de FxTunnels de Token Mintable, el token infantil se despliega primero y el token raíz se despliega solo cuando se complete el primer proceso de salida. La dirección del contrato de token raíz se puede determinar previamente después de que se despliegue el contrato infantil, pero técnicamente el mapeo solo existirá cuando se complete la primera salida.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: para depositar tokens de Ethereum en Polygon
- `receiveMessage(bytes memory inputData)`: prueba de quemado que debe ingresarse como `inputData` para recibir tokens en la cadena primaria

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: desplegar un token ERC-20 en la red Polygon
- `mintToken(address childToken, uint256 amount)`: acuñar una cantidad determinada de tokens en Polygon
- `withdraw(address childToken, uint256 amount)`: para quemar tokens de la cadena secundaria a fin de retirarlos en la cadena primaria

### Mintar tokens en Polygon {#minting-tokens-on-polygon}

1. Llama a `deployChildToken()` en `FxMintableERC20ChildTunnel` y pasa la información necesaria del token como parámetros. Esto emite un evento de `TokenMapped` que contiene las direcciones de `rootToken` y `childToken`. Anota esas direcciones.
2. Llama a `mintToken()` en `FxMintableERC20ChildTunnel` para acuñar tokens en la cadena secundaria.
3. Llama a `withdraw()` en `FxMintableERC20ChildTunnel` para retirar tokens de Polygon. Observa el hash de la transacción, ya que esto será útil para generar la prueba de quemado.
4. Aquí puedes encontrar los pasos para completar el [retiro](#withdraw-tokens-on-the-root-chain).

### Retirar tokens en Ethereum {#withdrawing-tokens-on-ethereum}

Ingresa la prueba de quemado generada como argumento en `receiveMessage()` en `FxMintableERC20RootTunnel`. A continuación, el saldo del token se verá reflejado en la cadena primaria.

### Deposita tokens de vuelta a Polygon {#deposit-tokens-back-to-polygon}

1. Cerciórate de aprobar `FxMintableERC20RootTunnel` para poder transferir los tokens.
2. Llama a `deposit()` en `FxMintableERC20RootTunnel` usando `rootToken` como dirección del token primario y `user` como receptor.
3. Espera a que el evento de sincronización de estado (22-30 minutos). Luego, podrás consultar el saldo del receptor objetivo en la cadena secundaria.

Los ejemplos **de** FxTunnel Mintable ERC-721 y **ERC-1155** son los siguientes :

- [FxMintableERC721Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## Implementaciones de ejemplo {#example-deployments}

### Goerli {#goerli}

- Administrador de punto de control: [0x2890bA17EfE978480615e330ecB65333b880928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- token ERC-20 Dummy : [0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC-20RootTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc-42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC-20RootTunnel: [0xA200766a7D64E54611E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- token Dummy ERC-721: [0x73594a053cb5ddDE-DE-5558268d28a-774375-E-23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC-721: [0xF-220464-48369303-196645-876-8C-7D-972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Token Dummy ERC1155: [0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d187888cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- FxERC20: [0xDDE69724AeFBdb084413719fE745aB66e3b055C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC-20Tunnel: [0x9C-37a-Ebdb-7D-337E-0215-BC-40-15-2-2--](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- [FxMintableERC20ChildTunnel: 0xA2C7eBEf68B444056b4A39C2CEC2384275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- Token ERC-20 secundario ficticio: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E048726267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721ChildTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunnel: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

Las correspondientes despliegues de Mainnet se pueden encontrar [aquí](https://static.matic.network/network/mainnet/v1/index.json). Busca la palabra clave `FxPortalContracts`para encontrar todos los contratos de túnel por defecto y otras implementaciones importantes de contratos de FxPortal. Puedes hacer uso del [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)paquete para acceder a las direcciones del contrato y ABIs.

## Direcciones de contratos {#contract-addresses}

### Red de pruebas de Mumbai {#mumbai-testnet}

| Contrato | Dirección implementada  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Red principal de Polygon {#polygon-mainnet}


| Contrato | Dirección implementada  |
| :----- | :- |
| [FxRoot (red principal de Ethereum)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild (red principal de Polygon)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
