---
id: getting-started
title: Puente de PoS
sidebar_label: Introduction
description: Más flexibilidad y retiros más rápidos con las PoS de Polygon.
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

Para empezar, consulta la última [documentación de Matic.js sobre PoS](../matic-js/get-started.md).

Básicamente, un puente es un conjunto de contratos que ayuda a mover activos desde la cadena primaria a la secundaria. Hay dos puentes principales para mover activos entre Ethereum y Polygon. El primero es el puente de Plasma y el segundo se llama **puente** o **puente de prueba de participación **. El **puente de Plasma** ofrece mayor garantía de seguridad debido al mecanismo de salida de Plasma.

No obstante, hay ciertas restricciones en el token secundario y un período de retiro de 7 días asociado a todas las salidas o retiros de Polygon a Ethereum en el puente de Plasma.

Esto es poco conveniente para las Dapps o los usuarios que necesitan cierta **flexibilidad** y **retiros más rápidos**, y están conformes con el nivel de seguridad que ofrece el puente de pruebas de participación de Polygon, asegurado por un robusto conjunto de validadores externos.

Los activos basados en la prueba de participación ofrecen la seguridad de la PoS y salida más rápida con un intervalo de punto de control.

## Pasos para usar el puente de PoS {#steps-to-use-the-pos-bridge}

Antes de entrar en esta sección de los documentos, puede ayudar a tener una comprensión profunda de algunos términos ya que usted interactúa con ellos mientras se trata de utilizar el puente: [Mapeo](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) y el [Mecanismo de sincronización estatal](https://docs.polygon.technology/docs/pos/state-sync/state-sync/).

Luego, el primer paso para utilizar el puente PoS es mapear el **token raíz** y **el token infantil**. Significa que el contrato de token en la cadena de la raíz y el contrato de token en la cadena de niños deben mantener una conexión (llamada mapeo) para transferir activos entre ellos. Si estás interesado en enviar una solicitud de mapeo, por favor, haz eso utilizando [esta guía](/docs/develop/ethereum-polygon/submit-mapping-request/).

En un nivel inferior y con más detalles, esto es lo que sucede:

### deposit (Depósito) {#deposit}

  1. El propietario del activo **(ERC-20/ERC-721/ERC-1155)** debe aprobar un contrato específico en el puente PoS para gastar la cantidad de tokens que se transferirán. Ese contrato específico se denomina **contrato de predicado** (implementado en la red de Ethereum) y **bloquea el monto de los tokens que se depositarán**.
  2. Cuando se da la aprobación, se procede a **depositar el activo**. Una llamada de función debe realizarse en el `RootChainManager`contrato que a su vez activa el `ChildChainManager`contrato en la cadena .
  3. Eso sucede mediante un mecanismo de sincronización del estado, que se explica en detalle [aquí](/docs/pos/state-sync/state-sync/).
  4. La llamada `ChildChainManager`internamente la `deposit`función del contrato de token infantil y la cantidad correspondiente de tokens de activos se **acuñan a la cuenta del usuario.** Es importante observar que solo la función `ChildChainManager`puede `deposit`acceder al contrato de token infantil.
  5. Cuando el usuario recibe los tokens, puede **transferirlos casi instantáneamente por la cadena de Polygon a tasas mínimas**.

### Retiros {#withdrawals}

  1. Retirar los activos a Ethereum es un proceso de 2 pasos en el que el token de activos debe ser **quemado por primera vez en la cadena de Polygon** y luego la **prueba de esta transacción de quemado debe ser presentada** en la cadena de Ethereum.
  2. Se necesitan de 20 minutos a 3 horas para qe la transacción de quemado llegue al punto de control en la cadena de Ethereum. Eso lo hacen los validadores de la prueba de participación.
  3. Una vez que la transacción se haya añadido al punto de control, se puede presentar una prueba de la transacción de quemado en el `RootChainManager`contrato en Ethereum llamando a la `exit`función.
  4. Esa llamada de función **verifica la inclusión del punto de control** y activa el contrato de predicado, que había bloqueado los tokens de activos cuando inicialmente se depositaron.
  5. Como último paso, el **contrato de predicar libera los tokens** bloqueados y los reembolsa a la cuenta de usuarios en Ethereum.

:::tip

Cuando finaliza el mapeo, puedes usar el **SDK de matic.js** para interactuar con los contratos o puedes hacer lo mismo sin el SDK. Sin embargo, el SDK de matic.js tiene un diseño que facilita mucho la integración del mecanismo de transferencia de activos con cualquier aplicación.

:::