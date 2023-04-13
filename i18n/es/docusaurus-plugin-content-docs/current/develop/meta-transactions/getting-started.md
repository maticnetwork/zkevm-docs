---
id: meta-transactions
title: Metatransacciones
sidebar_label: Overview
description: Aprende sobre metatransacciones y cómo puedes usarlas.
keywords:
  - docs
  - polygon
  - matic
  - transactions
  - meta transactions
  - gasless
image: https://matic.network/banners/matic-network-16x9.png
slug: meta-transactions
---

Las llamadas diarias a contratos inteligentes alcanzaron su récord: entre 2,5 y 3 millones al día.
Las DApp están empezando a darse cuenta de su utilidad, pero se están volviendo víctimas de su éxito o el éxito de otros
debido a las tarifas de gas, sin mencionar que los obstáculos de la incorporación de nuevos usuarios y los desafíos de la actual
experiencia de usuario no son cosa sencilla.

## Al servicio de los contratos inteligentes {#servicing-smart-contracts}

Por su diseño, los contratos inteligentes son máquinas de estado deterministas que se ejecutan cuando se pagan tarifas de transacción
para servirle a la lógica del contrato usando los recursos informáticos de la red.
Esto se hace mediante un modelo de medición de gas en Ethereum (y Polygon).

## El estado actual de las transacciones {#the-current-state-of-transacting}

Este modelo tradicional de transacciones en Ethereum (y otras blockchains similares) tiene sus limitaciones.
Una limitación frecuente es que el usuario no tiene los medios para pagar el gas. Por defecto, el remitente de la
transacción actúa como pagador, ya que estos comportamientos están vinculados. Entonces, si un usuario intenta crear y enviar
una transacción, este será responsable de las tarifas de gas asociadas. Asimismo, si el usuario crea una DApp, interactúa
con ella o la ejecuta, este tiene que pagar el gas.

Es poco realista esperar que el usuario promedio compre criptomonedas y pague el gas para interactuar con una
aplicación. Lo que se puede hacer para solucionar este asunto es desvincular al remitente de su papel
de pagador, lo que permitiría escalar la ejecución de la transacción e iniciar una transacción sin interrupciones .

En lugar de una transacción directa, habría un middleware (mediante un tercero) para gestionar el gas.
Aquí entran en el juego las metatransacciones.

## ¿Qué son las metatransacciones? {#what-are-meta-transactions}

Las metatransacciones permiten que cualquier persona interactúe con la cadena de bloques. Estas no exigen que los usuarios tengan
tokens para pagar los servicios de la red mediante las tarifas por transacción. Esto se lleva a cabo desvinculando al
remitente de la transacción del pagador del gas.

Esta solución puede atraer nuevos usuarios y ayuda a los existentes.

Quien ejecuta la transacción actúa como remitente. En lugar de gastar gas, este solo crea una
solicitud de transacción firmando la acción prevista (los parámetros de la transacción) con su clave privada
. La metatransacción es una transacción regular de Ethereum que incluye parámetros adicionales para crear
la metatransacción.

Los parámetros firmados de la transacción se pasan a una red secundaria, que actúa como transmisor.
Si bien hay distintos esquemas para esto, los transmisores normalmente elegirán qué transacciones
enviar al validar la transacción (por ejemplo, por ser relevante para la DApp). Tras la validación, el transmisor
envuelve la solicitud (el mensaje firmado) en una transacción real (lo que implica el pago de la tarifa de gas)
y la envía a la red, donde el contrato la desenvuelve validando la firma original
y la ejecuta en nombre del usuario.

:::note Las palabras meta y lote pueden ser análogas para algunos

Aclaremos: las metatransacciones son diferentes de las transacciones en lote. Las últimas son
operaciones que pueden enviar varias transacciones a la vez, que luego se ejecutan desde un único remitente
(único nonce especificado) en secuencia.

:::

En resumen, las metatransacciones son un patrón de diseño en el que:

* Un usuario (remitente) firma una solicitud con su clave privada y se la envía a un transmisor
* El transmisor envuelve la solicitud en una transacción y se la envía a un contrato
* El contrato desenvuelve la transacción y la ejecuta

Las transacciones nativas implican que el “remitente” también es el “pagador”. Al desvincular al “pagador” del
“remitente”, el “remitente” se vuelve más un “aspirante”, es decir, quien muestra la intención de hacer la transacción
en la cadena de bloques al firmar un mensaje que contiene parámetros específicos relacionados
con el mensaje, y no una transacción totalmente construida.

## Casos de uso {#use-cases}

Es fácil imaginarse las capacidades de las metatransacciones para escalar las DApp y las interacciones con los contratos inteligentes.
Los usuarios pueden no solo crear transacciones sin gas, sino también hacerlo muchas veces y, con una herramienta de automatización,
las metatransacciones pueden influir en la próxima ola de aplicaciones para casos de uso práctico. Las metatransacciones
posibilitan una utilidad real en la lógica de los contratos inteligentes, que muchas veces se ve limitada debido a las tarifas de gas y las interacciones
requeridas en la cadena.

### Ejemplo con votación {#example-with-voting}

Un usuario quiere participar en la gobernanza en la cadena y pretende votar por un resultado determinado por medio de un
contrato de votación. El usuario firma un mensaje donde indica su decisión en un voto en este
contrato en particular. Tradicionalmente, tendría que pagar una tarifa de gas por interactuar con el contrato (y saber cómo
interactuar con el contrato), pero ahora puede firmar una metatransacción (fuera de la cadena) con la información necesaria
sobre el voto y pasársela al transmisor, que ejecuta la transacción en su nombre.

El mensaje firmado se le envía a un transmisor (los parámetros de la transacción firmados sobre la información del voto). El transmisor
confirma que esta transacción es un voto prioritario, envuelve la solicitud de votación en una transacción real,
paga las tarifas de gas y la transmite al contrato de votación. Todo se verifica al final del contrato de votación,
y el voto se ejecuta en nombre del usuario.

## Pruébalas {#try-them-out}

Asumiendo que conoces los diferentes enfoques, puedes integrar las metatransacciones a tu
DApp y dependiendo de si estás migrando a las metatransacciones o creando una DApp nueva.

Para integrar tu DApp con las metatransacciones en Polygon, puedes optar por usar uno de los siguientes
transmisores o crear una solución personalizada:

* [Biconomy](https://docs.biconomy.io/products/enable-gasless-transactions)
* [Gas Station Network (GSN)](https://docs.opengsn.org/#ethereum-gas-station-network-gsn)
* [Infura](https://infura.io/product/ethereum/transactions-itx)
* [Gelato](https://docs.gelato.network/developer-products/gelato-relay-sdk)
