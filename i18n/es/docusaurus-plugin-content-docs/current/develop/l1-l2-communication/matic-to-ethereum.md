---
id: matic-to-ethereum
title: Transferencia de datos de Polygon a Ethereum
description: Transfiere estados o datos de Polygon a Ethereum por medio de contratos
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

El mecanismo de transferencia de datos de Polygon a Ethereum difiere un poco del de Ethereum a Polygon. Para ello, se usan transacciones de **punto de control** creadas por los validadores de la cadena de Ethereum. Básicamente, se crea una transacción inicial en Polygon. Al crear la transacción, hay que cerciorarse de que **se emita un evento** y de que los **registros del evento incluyan los datos que queremos transferir** de Polygon a Ethereum.

En un período de tiempo (unos 10 a 30 minutos), esta transacción es señalada en la cadena Ethereum por los validadores. Después de eso, se puede enviar el hash de la transacción creada en la cadena de Polygon como prueba al contrato del **RootChainManager** (Adminsitrador de la cadena primaria) de la cadena de Ethereum. Ese contrato valida la transacción, verifica que haya pasado por el punto de control y, por último, decodifica los registros de su evento.

Cuando termina esa etapa, se pueden usar los **datos del registro del evento decodificados para hacer cualquier cambio** en el contrato primario implementado en la cadena de Ethereum. Para ello, también es necesario cerciorarse de que el cambio de estado en Ethereum se haga de manera segura. Por eso, usamos un contrato de **predicado**, es decir, un tipo especial de contrato que solo puede ser activado por el contrato del **RootChainManager** (Administrador de la cadena primaria). Esa arquitectura garantiza que los cambios de estado en Ethereum ocurran solo si la transacción fue sometida al punto de control en Polygon y verificada por el contrato del **RootChainManager** (Administrador de la cadena primaria) en la cadena de Ethereum.

# Descripción general {#overview}

- Se ejecuta una transacción en el contrato secundario implementado en la cadena de Polygon.
- También se emite un evento en esa transacción. Los parámetros del **evento incluyen los datos que deben transferirse** de Polygon a Ethereum.
- Los validadores de la red de Polygon recogen esa transacción por un intervalo específico (probablemente, entre 10 y 30 minutos), la validan y la **agregan al punto de control** de Ethereum.
- Se crea una transacción de punto de control en el contrato de la **RootChain** (cadena primaria) y se puede comprobar la inclusión del punto de control con esta [secuencia de comandos](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)
- Cuando finaliza la adición del punto de control, se puede usar la biblioteca de **matic.js** para llamar a la función de **salida** del contrato del **RootChainManager** (Administrador de la cadena primaria). En este [ejemplo](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js) se muestra cómo llamar a la función de **salida** usando la biblioteca de matic.js.

- La ejecución de la secuencia de comandos verifica la inclusión del hash de la transacción de Polygon en la cadena de Ethereum y, a su vez, llama a la función **exitToken** del contrato [de predicado](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol).
- Eso garantiza que el **cambio de estado en el contrato de la cadena primaria** se haga siempre de forma **segura** y **solo por medio del contrato de predicado**.
- Es importante tener en cuenta que la **verificación del hash de la transacción** de Polygon y la **activación del contrato de predicado** suceden en la **misma transacción**, y eso garantiza la seguridad de cualquier cambio de estado en el contrato primario.

# Implementación {#implementation}

Esta es una demostración simple de cómo se transfieren los datos de Polygon a Ethereum. Este tutorial muestra un ejemplo de transferencia de un valor de uint256 a través de la cadena. Se puede transferir cualquier tipo de datos, pero es necesario codificarlos en bytes y luego emitirlos desde el contrato secundario. Los datos se decodificarán finalmente en el contrato primario.

1. Primero, crea los contratos primario y secundario. Cerciórate de que la función que hace el cambio de estado también emita un evento. El evento debe incluir los datos que serán transferidos como uno de sus parámetros. Más abajo, se incluye un formato de ejemplo de cómo deben ser los contratos secundario y primario. Este es un contrato muy sencillo, que contiene una variable de datos, cuyo valor se establece usando una función setData. Llamar a la función setData emite el evento de datos. El resto de los componentes del contrato se explica en las secciones siguientes de este tutorial.

A. Contrato secundario

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. Contrato primario

Pasa `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f` como el valor de `_predicate` en el constructor del contrato primario.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. Cuando se hayan implementado los contratos secundario y primario en las cadenas de Polygon y Ethereum, respectivamente, estos pueden mapearse usando el puente de PoS. El mapeo garantiza que se mantenga una conexión entre los dos contratos entre las cadenas. Para hacer el mapeo, puedes comunicarte con el equipo de Polygon en [Discord](https://discord.com/invite/0xPolygon).

3. Es importante mencionar que en el contrato primario hay un modificador onlyPredicate. Se recomienda usar siempre este modificador, ya que garantiza que solo el contrato de predicado haga los cambios de estado en el contrato primario. El contrato de predicado es un contrato especial que activa el contrato primario solo si la transacción realizada en la cadena de Polygon fue verificada por el RootChainManager (Administrador de la cadena primaria) en la cadena de Ethereum. Eso garantiza cambios de estado seguros en el contrato primario.

Para comprobar la implementación anterior, se puede crear una transacción en la cadena de Polygon llamando a la función **setData** del contrato secundario. En este punto, hay que esperar que se complete el punto de control. La inclusión del punto de control se puede comprobar con esta [secuencia de comandos](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js). Cuando finalice el punto de control, llama a la función de salida del RootChainManager (Administrador de la cadena primaria) con el SDK de matic.js.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

Como se muestra en la captura anterior, **txHash** es el hash de la transacción que se realizó en el contrato secundario implementado en la cadena de Polygon.

**logEventSignature** es el hash de keccack-256 del evento de datos. Es el mismo hash que incluimos en el contrato de predicado. El código completo del contrato que se usó para este tutorial y la secuencia de comandos de salida se pueden encontrar [aquí.](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

Cuando se completa la secuencia de comandos de salida, se puede consultar el contrato primario de la cadena de Ethereum para verificar si el valor de la variable de **datos** que se estableció en el contrato secundario también se reflejó en la variable de **datos** del contrato primario.
