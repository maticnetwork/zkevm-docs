---
id: state-transfer
title: Transferencia de estado
description: Transfiere datos o estado de forma sencilla desde Ethereum a Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Los validadores de Polygon monitorean continuamente un contrato en la cadena Ethereum llamada `StateSender`. Cada vez que un contrato registrado en la cadena de Ethereum llama a ese contrato, este emite un evento. Usando ese evento, los validadores de Polygon le transmiten los datos a otro contrato en la cadena de Polygon. Este mecanismo **de sincronización de estado** se utiliza para enviar datos desde Ethereum a Polygon.

Además, los validadores de Polygon envían un hash de cada transacción en la cadena de Polygon de forma regular. Puedes utilizar este **punto** de control para validar cualquier transacción que se haya realizado en Polygon. Una vez que una transacción haya sido verificada de haber ocurrido en la cadena Polygon, Ethereum se puede utilizar para llevar a cabo la acción adecuada.

Estos dos mecanismos se pueden utilizar juntos para permitir la transferencia de datos bidireccional (estado) entre Ethereum y Polygon. Para resumir todas estas interacciones, puedes heredar directamente nuestros contratos `FxBaseRootTunnel`(en Ethereum) y `FxBaseChildTunnel`(en Polygon).

## Contrato del túnel primario {#root-tunnel-contract}

Usa el contrato `FxBaseRootTunnel` desde [aquí](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol). Este contrato da acceso a las siguientes funciones:

- `function _processMessageFromChild(bytes memory data)`: esta es una función virtual que debe implementarse en el contrato que la hereda para manejar los datos que se envían desde `ChildTunnel`.
- `_sendMessageToChild(bytes memory message)`: esta función se puede llamar internamente con cualquier tipo de datos en bytes como mensaje. Esos datos se enviarán tal como están al túnel secundario.
- `receiveMessage(bytes memory inputData)`: esta función necesita ser llamada para recibir el mensaje emitido por `ChildTunnel`. La prueba de la transacción se tiene que proporcionar como calldata (datos de llamada). Un script de ejemplo para generar pruebas utilizando **matic.js** se incluye a continuación.

## Contrato del túnel secundario {#child-tunnel-contract}

Usa el contrato `FxBaseChildTunnel` desde [aquí](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Ese contrato da acceso a las siguientes funciones:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: esta es una función virtual que necesita implementar la lógica para manejar los mensajes enviados desde `RootTunnel`.
- `function _sendMessageToRoot(bytes memory message)`: se puede llamar internamente a esta función para enviar cualquier mensaje en bytes al túnel primario.

## Prerrequisitos {#prerequisites}

- Necesitas heredar el `FxBaseRootTunnel`contrato en tu contrato raíz en Ethereum. Como ejemplo, puedes seguir este [contrato](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol). Del mismo modo, herencia el `FxBaseChildTunnel`contrato en su hijo en Polygon. Sigue este [contrato](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) como ejemplo.
- Mientras despliega tu contrato raíz en
  - **Goerli Testnet**, pasa **la****** dirección de la    `_checkpointManager`y `_fxRoot`.

  -  **es** **0x86e4dc95c7fbbf52e33d563bb00823894c287****** `_fxRoot`y `_checkpointManager`es 0xfe5e5D361b2ad62c541bAb87C45a0B018389a2.
- Para desplegar el contrato infantil en **la red de pruebas de Mumbai**, pase  **como** `_fxChild`en constructor. Para   **,**`_fxChild` será 0**x8397259c983751DAf40400790063935a11afa28a.**
- Convoca `setFxChildTunnel`a túnel raíz desplegado con la dirección del túnel infantil. Ejemplo: [0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- Convoca `setFxRootTunnel`a un túnel infantil desplegado con la dirección del túnel raíz. Ejemplo: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## Contratos de ejemplo del puente de transferencia de estado {#example-contracts-of-state-transfer-bridge}

- **Contratos**: [Repositorio Github](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Transferencia estatal desde Ethereum → Polygon {#polygon}

- Debes llamar `_sendMessageToChild()`internamente en tu contrato raíz y pasar los datos como un argumento que se enviará a Polygon. Ejemplo: [0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- En el contrato secundario, implementa la función virtual `_processMessageFromRoot()` en `FxBaseChildTunnel` para recuperar los datos de Ethereum. Los datos se recibirán automáticamente del receptor de estado cuando se sincronice el estado.

## Transferencia de Estado desde  → Ethereum {#ethereum}

1. Llama a `_sendMessageToRoot()` internamente en el contrato secundario con los datos como parámetro para enviarlos a Ethereum. Ejemplo: [0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

Observa el hash de la transacción, ya que se utilizará para generar pruebas después de que se haya incluido como punto de control.

2. **Generación de prueba para completar la salida en la cadena raíz**: genera la prueba utilizando el **hash de tx** y **MESSAGE_SENT_EVENT_SIG**. Para generar la prueba, puedes utilizar la API de generación de pruebas alojada por Polygon o también puedes hacer crecer tu propia API de generación de pruebas siguiendo las instrucciones [aquí](https://github.com/maticnetwork/proof-generation-api).

El extremo de generación de pruebas alojado por Polygon está disponible [aquí.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Los ejemplos de uso de la API de generación de pruebas para la  y Testnet son los siguientes:

→ [Generación de prueba de Testnet](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Generación de   ](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. Implementa `_processMessageFromChild()` en el contrato primario.

4. Usa la prueba generada como entrada a `receiveMessage()` para recuperar los datos enviados desde el túnel secundario al contrato. Ejemplo: [0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b66ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) )
