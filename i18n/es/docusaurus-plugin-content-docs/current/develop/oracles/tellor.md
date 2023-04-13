---
title: Tellor
description: "Una guía para integrar el oráculo de Tellor en tu contrato de Polygon."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor es un oráculo que proporciona datos resistentes a la censura, asegurados mediante incentivos criptoeconómicos simples. Cualquier persona puede proporcionar y verificar los datos. La estructura flexible de Tellor puede proporcionar cualquier tipo de dato en cualquier intervalo de tiempo para permitir una fácil experimentación o innovación.

## Prerrequisitos (generales) {#soft-prerequisites}

En relación con tu nivel de conocimientos sobre codificación para centrarnos en el aspecto del oráculo, damos por hecho lo siguiente.

Supuestos:

- puedes operar un terminal
- tienes NPM instalado
- sabes cómo usar NPM para administrar dependencias

Tellor es un oráculo de código abierto listo para la implementación. La guía de esta principiante está aquí para mostrar la facilidad con la que se puede levantar y ejecutar con Tellor, proporcionando a su proyecto un oráculo totalmente descentralizado y resistente a la censura.

## Descripción general {#overview}

Tellor es un sistema de oráculo en el que las partes pueden solicitar el valor de un punto de datos fuera de la cadena (por ejemplo, BTC o USD), y los informadores compiten para añadir ese valor a un banco de datos en la cadena, accesible por todos los contratos inteligentes de Polygon. Las entradas a este banco de datos están aseguradas por una red de informadores con participación. Tellor utiliza mecanismos de incentivos criptoeconómicos. La presentación de datos honestos por parte de los informadores se recompensa con la emisión de tokens de Tellor. Los actores de mala fe se castigan y se eliminan de la red rápidamente mediante un mecanismo de litigio.

En este tutorial, trataremos lo siguiente:

- Configuración del kit inicial de herramientas que necesitarás para empezar.
- Explicación de un ejemplo simple.
- Lista de las direcciones de redes de pruebas en las que puedes probar Tellor actualmente.

## Uso de Tellor {#usingtellor}

Lo primero que tienes que hacer es instalar las herramientas básicas necesarias para usar Tellor como oráculo. Usa [este paquete](https://github.com/tellor-io/usingtellor) para instalar los contratos de usuario de Tellor:

`npm install usingtellor`

Una vez instalados, estos permitirán que tus contratos hereden las funciones del contrato "UsingTellor".

¡Genial! Ahora que tienes las herramientas listas, veamos un ejercicio simple en el que recuperamos el precio del bitcoin:

### Ejemplo de BTC/USD {#btc-usd-example}

Hereda el contrato UsingTellor, pasando la dirección de Tellor como un argumento del constructor:

Aquí tienes un ejemplo:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## Direcciones: {#addresses}

Tributos de Tellor: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oráculo: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### ¿Quieres hacer algunas pruebas primero?: {#looking-to-do-some-testing-first}

Red de pruebas Mumbai de Polygon: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

Prueba de tributos:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

¿Necesitas algunos tokens de prueba? Tweet nosotros [en](https://twitter.com/trbfaucet)

Para facilitar su uso, la repo de  viene con una versión del contrato de [Tellor Playground](https://github.com/tellor-io/TellorPlayground) para facilitar la integración. Consulta [aquí](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) una lista de funciones útiles.

#### Para una implementación más sólida del oráculo Tellor, consulta la lista completa de funciones disponibles [aquí](https://github.com/tellor-io/usingtellor/blob/master/README.md).

#### ¿Aún tienes preguntas? Únete a la comunidad [aquí!](https://discord.gg/tellor)
