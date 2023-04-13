---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain es una cadena de bloques de alto rendimiento creada para Oracle de datos para consultar datos de las API web tradicionales
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

El protocolo Band te permite consultar datos de API web tradicionales y usarlos en la cadena de bloques. Los desarrolladores pueden hacer consultas a través **de BandChain, una cadena de bloques basada en el cosmos** para facilitar las solicitudes de los oráculos y el pago, y luego utilizar los datos en la aplicación a través de la comunicación entre cadenas. La integración de los datos del oráculo se puede hacer en 3 pasos simples:

1. **Elegir las secuencias de comandos del oráculo**

    La secuencia de comandos del oráculo es un hash que identifica de forma exclusiva el tipo de datos que se le solicitan a BandChain. Esas secuencias de comandos se pueden encontrar [**aquí**](https://guanyu-devnet.cosmoscan.io/oracle-scripts). Las secuencias de comandos se usan como uno de los parámetros al hacerle la solicitud al oráculo.

2. **Solicitarle los datos a BandChain**

Esto se puede hacer de dos formas:

    - **Utilizando el explorador de la cadena**

    Puedes hacer clic en el guion de la opción y, a continuación, desde la pestaña **Ejecutar** puedes pasar en los parámetros y obtener la respuesta de BandChain. La respuesta contendrá el resultado y también una prueba de la EVM. Tienes que copiar esta prueba para usarla en el paso final. El documento de la cadena de  para consultar el oráculo utilizando el explorador está disponible [**aquí**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer).

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Dado anteriormente es un ejemplo de hacer una solicitud de oráculo para obtener los valores de número aleatorio. El valor 100 se transmite al `max_range`parámetro de la solicitud oráculo. Se obtiene un hash como respuesta. Al hacer clic en ese hash, se mostrarán todos los detalles de la respuesta.

    - **Utilizando la biblioteca JS de **

    Puedes consultar BandChain directamente a través de la biblioteca de  . Cuando se hace la consulta, esta incluye una **prueba de la EVM** en la respuesta. Esta prueba puede usarse para el paso final de la integración de BandChain. El documento de la cadena de  para consultar el oráculo utilizando la biblioteca JS de  de  de  está disponible [**aquí**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library). La carga útil de la solicitud de oráculo del número aleatorio se verá así. Asegúrate de que el cuerpo de la solicitud se pase en el formato application/json.

3. **Uso de los datos en los contratos inteligentes**

  El último paso es implementar un contrato de validación y guardar las respuestas a la solicitud del oráculo en las variables de estado de los contratos de validación. Una vez que se establezcan esas variables de estado, se puede acceder a ellas cuando la DApp lo requiera. Las variables de estado también pueden actualizarse con valores nuevos consultando las secuencias de comandos del oráculo nuevamente desde la DApp. A continuación, se muestra un contrato de validación que almacena el valor numérico aleatorio usando la secuencia de comandos del oráculo del número aleatorio.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

Al desplegar, se deben pasar 3 parámetros. El **primer parámetro** es el `codeHash`que es el hash de guion . El **segundo parámetro** es el objeto de parámetros de solicitud de script . Esto debe ser aprobado en formato de bytes. BandChain ofrece una API de REST para convertir el objeto JSON de parámetros a formato de bytes. Los detalles de la API se encuentran [**aquí**](https://docs.bandchain.org/references/encoding-params). Es necesario agregarle 0x a la respuesta recibida de esta API. El **tercer parámetro** es la dirección del contrato de cadena que ya se despliega en la red de Polygon. El protocolo Band admite la V3 de Polygon: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

Otra cosa a tener en cuenta es que el contrato de validación debe importar la biblioteca e interfaz que se llama `BandChainLib.sol`y `IBridge.sol`respectivamente. Se pueden encontrar en los siguientes enlaces: Biblioteca de [**la cadena de banda**](https://docs.bandchain.org/references/bandchainlib-library) y la interfaz de [**IBridge**](https://docs.bandchain.org/references/ibridge-interface).

  Una vez implementado el contrato de validación, se puede acceder a las variables de estado enviando consultas desde una DApp. De igual manera se pueden crear múltiples contratos de validación para diferentes scripts de oracle incorporados. La interfaz de IBridge tiene un método llamado `relayAndVerify()`que verifica los valores que se están actualizando cada vez en el contrato de validación. El `update()`método en el contrato de validación tiene la lógica de actualizar las variables de estado. La prueba de EVM obtenida de la consulta del script oráculo debe pasar al `update()`método. Cada vez que se actualiza un valor, el contrato de BandChain desplegado en Polygon verifica los datos antes de almacenarlos en la variable de estado del contrato.

La cadena de  proporciona una red descentralizada de oráculos que pueden ser utilizados por dApps para impulsar su lógica de contrato inteligente. El documento de la cadena BandChain para desplegar el contrato, almacenar los valores y actualizarlos se puede encontrar [**aquí**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library).