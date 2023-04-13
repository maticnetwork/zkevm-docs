---
id: optimisticoracle
title: Oráculo optimista de UMA
sidebar_label: UMA
description: El Oracle Optimista de la UMA permite que los contratos soliciten y reciban cualquier tipo de datos
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

El Oracle Optimista de UMA permite que los contratos soliciten y reciban cualquier tipo de datos. El sistema oráculo de UMA se compone de dos componentes principales:

1. Oráculo optimista
2. Mecanismo de verificación de datos (DMV)

## Oráculo optimista {#optimistic-oracle}

El **Oracle Optimista** de la UMA permite que los contratos soliciten y reciban información de precios rápidamente. El Oracle Optimistic actúa como un juego de escalada generalizada entre contratos que inician una solicitud de precios y el sistema de resolución de disputas de UMA conocido como el Mecanismo de verificación de datos (DVM).

Los precios propuestos por el oráculo optimista no se le enviarán al DVM, a menos que haya una disputa. Esto permite a los contratos obtener información de precios en cualquier período de tiempo predefinido sin escribir el precio de un activo en cadena.

## Mecanismo de verificación de datos (DMV) {#data-verification-mechanism-dvm}

Si se inicia una disputa, se le envía una solicitud al DVM. Todos los contratos creados en UMA usan el DVM como respaldo para resolver disputas. Las disputas enviadas al DVM se resuelven 48 horas después de que los titulares de tokens de UMA votan el precio del activo en un momento dado. Los contratos de UMA no tienen que recurrir al oráculo optimista, a menos que necesiten el precio de un activo antes de 48 horas.

El mecanismo de verificación de datos (DMV) es el servicio de resolución de disputas para contratos creados con base en el protocolo de UMA. El DVM es poderoso porque comprende un elemento de criterio humano para asegurar que los contratos se administren de forma segura y correcta cuando surgen problemas con los mercados volátiles (y, a veces, manipulables).

## Interfaz del oráculo optimista {#optimistic-oracle-interface}

El oráculo optimista es utilizado por los contratos financieros o por cualquier tercero para recuperar los precios. Cuando se solicita un precio, cualquiera puede responder con una propuesta de precio. Una vez propuesto, el precio pasa por un período al aire, en el que cualquiera puede controvertirlo y enviarle el precio controvertido al DVM de UMA para buscar un acuerdo.

:::info

En esta sección, se explica el modo en que distintos participantes pueden interactuar con el oráculo optimista. Para ver las implementaciones más actualizadas de los contratos del oráculo optimista en la red principal, Kovan o capa 2 (L2), consulta las [direcciones de producción](https://docs.umaproject.org/dev-ref/addresses).

:::

Hay doce métodos que conforman la interfaz del oráculo optimista.
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

Solicita un precio nuevo. Esto debe ser para un identificador de precio registrado. Ten en cuenta que la mayoría de los contratos financieros que están registrados en el sistema de UMA llaman a esta función de forma automática, pero cualquiera puede usarla para solicitar un identificador de precio registrado. Por ejemplo, el contrato de Expiring Multiparty (EMP) llama a este método cuando se llama a su método `expire`.

Parámetros:
- `identifier`: identificador del precio solicitado.
- `timestamp`: fecha y hora del precio solicitado.
- `ancillaryData`: datos complementarios que representan argumentos adicionales que se pasan con la solicitud de precio.
- `currency`: token ERC-20 utilizado para el pago de recompensas y tarifas. Requiere aprobación para usarlo con el DVM.
- `reward`: recompensa ofrecida al proponente exitoso. La pagará el llamador. Nota: Su valor puede ser 0.

### proposePrice {#proposeprice}

Propone un valor de precio para una solicitud de precio existente.

Parámetros:
- `requester`: remitente de la solicitud de precio inicial.
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.
- `proposedPrice`: precio propuesto.

### disputePrice {#disputeprice}

Controvierte el valor de un precio para una solicitud de precio existente con una propuesta activa.

Parámetros:
- `requester`: remitente de la solicitud de precio inicial.
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.

### settle {#settle}

Intenta resolver una solicitud de precio pendiente. Se revertirá si no se puede liquidar.

Parámetros:
- `requester`: remitente de la solicitud de precio inicial.
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.

### hasPrice {#hasprice}

Revisa si una solicitud determinada se respondió o se dirimió (es decir que el oráculo optimista tiene un precio).

Parámetros:
- `requester`: remitente de la solicitud de precio inicial.
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.

### getRequest {#getrequest}

Obtiene la estructura de datos actual que contiene toda la información sobre una solicitud de precio.

Parámetros:
- `requester`: remitente de la solicitud de precio inicial.
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.

### settleAndGetPrice {#settleandgetprice}

Recupera un precio antes solicitado por un llamador. Se revierte si la solicitud no está resuelta o no puede resolverse. Nota: Este método no es puro, por lo que la llamada puede resolver la solicitud de precio si no está resuelta.

Parámetros:
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.

### setBond {#setbond}

Establece la "fianza propuesta" asociada a la solicitud de precio.

Parámetros:
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.
- `bond`: monto de fianza personalizada por establecer.

### setCustomLiveness {#setcustomliveness}

Establece un valor para que la solicitud esté al aire personalizado. El tiempo al aire es la cantidad de tiempo que una propuesta debe esperar antes de ser autoresuelta.

Parámetros:
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.
- `customLiveness`: nuevo tiempo al aire personalizado.

### setRefundOnDispute {#setrefundondispute}

Establece la solicitud de reembolso de la recompensa si la propuesta es controvertida. Esto puede ayudar a "cubrir" al llamador en caso de una demora ocasionada por la controversia. Nota: En el caso de una controversia, el ganador igual recibe la fianza de la otra parte, así que tendrá una ganancia, aunque se reembolse la recompensa.

Parámetros:
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.

### disputePriceFor {#disputepricefor}

Controvierte una solicitud de precio con una propuesta activa en nombre de otra dirección. Nota: Esa dirección recibirá las recompensas que provengan de la controversia. Sin embargo, las fianzas son para el llamador.

Parámetros:
- `disputer`: dirección para establecer como disputador.
- `requester`: remitente de la solicitud de precio inicial.
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.

### proposePriceFor {#proposepricefor}

Propone un valor de precio en nombre de otra dirección. Nota: Esta dirección recibe las recompensas que provengan de esa propuesta. Sin embargo, las fianzas son para el llamador.

Parámetros:
- `proposer`: dirección para establecer como proponente.
- `requester`: remitente de la solicitud de precio inicial.
- `identifier`: identificador de precio para identificar la solicitud existente.
- `timestamp`: fecha y hora para identificar la solicitud existente.
- `ancillaryData`: datos complementarios del precio solicitado.
- `proposedPrice`: precio propuesto.

## Integración del oráculo optimista {#integrating-the-optimistic-oracle}

En esta demostración, se establecerá un contrato `OptimisticDepositBox`, que custodia el saldo del token ERC-20 de un usuario.

En una cadena de bloques de la red de pruebas local, el usuario deposita wETH (Ether envueltos) en el contrato y retira wETH denominados en USD. Por ejemplo, si quisiera retirar 2000 $10,000 USD of wETH, and the ETH/USD exchange rate is $, retiraría 5 wETH.

* El usuario vincula la `OptimisticDepositBox` con uno de los identificadores de precios habilitados en el DVM.

* Luego deposita wETH en la `OptimisticDepositBox` y los registra con el identificador de precio `ETH/USD`.

* Ahora puede retirar un monto de wETH denominado en USD de su `DepositBox` mediante llamadas del contrato inteligente y el oráculo optimista permite la fijación optimista de precios en la cadena.

En este ejemplo, el usuario no habría podido transferir montos de wETH denominados en USD sin recurrir a un sistema de alimentación de datos de precios de `ETH/USD` fuera de la cadena. Por consiguiente, el oráculo optimista le permite al usuario "extraer" un precio de referencia.

A diferencia de las solicitudes al DVM, las solicitudes de precio al oráculo optimista se pueden resolver en una ventana especificada de tiempo al aire si no hay controversias, el cual probablemente sea mucho más breve que el período de votación del DVM. La ventana de tiempo al aire se puede ajustar, pero normalmente dura dos horas, frente a los dos a tres días que tarda la resolución mediante el DVM.

Por el momento, el remitente de la solicitud de precio no tiene que pagar ninguna comisión por el DVM. Este puede ofrecerle una recompensa al proponente que responde a la solicitud de precio, pero, en este ejemplo, el valor de la recompensa se configuró en `0`.

El proponente del precio deposita a una fianza junto con el precio, que se le reembolsará si no es controvertido o si la controversia se resuelve en su favor. De lo contrario, esa fianza se utiliza para pagar la tarifa final al DVM y una recompensa al disputador que gana la controversia.

En la demostración, el solicitante no le exige una fianza adicional al proponente, por lo que la fianza total depositada es igual a la tarifa final de wETH, actualmente, de 0,2 wETH. Consulta la función `proposePriceFor` en el [contrato](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html) `OptimisticOracle` para conocer la información sobre implementación.

## Ejecución de la demostración {#running-the-demo}

1. Cerciórate de haber seguido todos los pasos de configuración que son prerrequisitos mencionados [aquí](https://docs.umaproject.org/developers/setup).
2. Ejecuta una instancia local de Ganache (es decir, no Kovan, Ropsten, Rinkeby, red principal) con `yarn ganache-cli --port 9545`
3. En otra ventana, migra los contratos ejecutando el siguiente comando:

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. Para implementar el [contrato](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) `OptimisticDepositBox` y seguir un procedimiento simple, ejecuta la siguiente secuencia de comandos de demostración desde la raíz del repositorio:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

Deberías ver el siguiente resultado:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## Explicación de las funciones del contrato {#explaining-the-contract-functions}

El [código del contrato](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)`OptimisticDepositBox` muestra cómo interactuar con el Oracle.

La función `constructor` incluye un argumento `_finderAddress` para el contrato `Finder` de UMA, que lleva un registro de la dirección de `OptimisticOracle`, las listas aprobadas de identificadores de garantías y precios y otras direcciones de contratos importantes.

Eso le permite al `constructor` revisar si el tipo de garantía y el identificador de precio son válidos y a `OptimisticDepositBox`, encontrar el `OptimisticOracle` e interactuar con él después.

La función `requestWithdrawal` incluye una llamada interna al `OptimisticOracle` que solicita el precio de `ETH/USD`. Cuando haya obtenido la respuesta, el usuario puede llamar a `executeWithdrawal` para completar el retiro.

Hay mucha más información y explicación en los comentarios de código, así que por favor, echa un vistazo si estás interesado en aprender más.

## Recursos adicionales {#additional-resources}

Aquí tienes algunos recursos más sobre el DVM de UMA:

- [Arquitectura técnica](https://docs.umaproject.org/oracle/tech-architecture)
- [Arquitectura económica](https://docs.umaproject.org/oracle/econ-architecture)
- [Publicación del blog](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) sobre el diseño del DVM de UMA
- [Documento técnico](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) sobre el diseño del DVM de UMA
- [Repositorio de investigación](https://github.com/UMAprotocol/research) para una política óptima de tarifas
- [Repositorio de UMIP](https://github.com/UMAprotocol/UMIPs) para propuestas de gobernanza
