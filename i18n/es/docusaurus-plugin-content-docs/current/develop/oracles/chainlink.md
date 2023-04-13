---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Chainlink es una red de oráculos de la cadena de bloques descentralizada construida en Ethereum.
keywords:
  - wiki
  - polygon
  - chainlink
  - oracle
  - decentralized
  - data
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Chainlink** permite que tus contratos accedan a **cualquier fuente de datos externa** a través de una red de oráculos descentralizada. Chainlink te ofrece las herramientas necesarias para que el contrato incorpore datos de cualquier tipo, ya sean resultados deportivos, el clima u otra información pública.

## Datos descentralizados {#decentralized-data}

Una de las características más poderosas de Chainlink ya está descentralizada, agregada y lista para ser digerida en la cadena de datos en la mayoría de las criptomonedas populares. Estos se conocen como [**Feeds de datos de Chainlink**](https://docs.chain.link/docs/using-chainlink-reference-contracts).

Aquí hay un ejemplo práctico de un contrato que obtiene el precio más reciente de MATIC en USD en la red de pruebas Mumbai.

Todo lo que tienes que hacer es intercambiar la dirección [con cualquier dirección de un feed de datos](https://docs.chain.link/docs/matic-addresses#config) que desees, y puedes empezar a digerir la información de precios.

```
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai Testnet
     * Aggregator: MATIC/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

## Ciclo de solicitud y recepción {#request-and-receive-cycle}

El ciclo de solicitud y recepción de Chainlink permite que tus contratos inteligentes hagan solicitudes a cualquier API externa e incorporen la respuesta. Para implementarlo, el contrato tiene que definir dos funciones:

1. Uno para **solicitar los datos**, y
2. Otro para **recibir la respuesta**.

Para solicitar datos, tu contrato crea un `request`objeto que proporciona a un oráculo. Cuando el oráculo se haya comunicado con la API y haya analizado la respuesta, intentará enviar de nuevo los datos al contrato usando la función de retrollamada definida en el contrato inteligente.

## Usos {#uses}

1. **Feeds de datos de **

Estos son los puntos de referencia de datos descentralizados ya agregados en la cadena y la forma más rápida, fácil y barata de obtener datos del mundo real. Actualmente, admiten algunos de los pares de criptomonedas y dinero fíat más populares.

Para trabajar con Feeds de datos, utiliza las [**Feeds de datos de Polygon de**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) la documenation. de Chainlink.

2. **Función aleatoria verificable**

Recibe números probablemente aleatorios, donde el número aleatorio está garantizado criptográficamente para ser aleatorio.

Para trabajar con  , utiliza las [**direcciones  de Polygon**](https://docs.chain.link/vrf/v2/subscription/supported-networks) de la [documentación](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number) de  .

3. **Llamadas de la API de Chainlink**

Cómo configurar tu contrato inteligente para que funcione con las API tradicionales y personalizar para obtener cualquier dato, enviar cualquier petición a través de Internet y más.

## Ejemplo de código {#code-example}

Para interactuar con API externas, el contrato inteligente debe ser heredado de [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol), que es un contrato diseñado para facilitar las solicitudes de procesamiento. Tiene una estructura llamada `Chainlink.Request`, que tu contrato debe usar para crear la solicitud a la API.

La solicitud debe definir la dirección oráculo, la ID del trabajo, la tarifa, los parámetros del adaptador y la firma de la función de devolución de llamada. En este ejemplo, la solicitud está construida en la función `requestEthereumPrice`.

`fulfill` se define como la función de retrollamada.

```
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Polygon Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4";
        fee = 10 ** 16; // 0.01 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestBTCCNYPrice() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // NOTE: If this oracle gets more than 5 requests from this job at a time, it will not return.
        request.add("get", "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo");

       // Set the path to find the desired data in the API response, where the response format is:
       // {
       //     "Realtime Currency Exchange Rate": {
       //       "1. From_Currency Code": "BTC",
       //       "2. From_Currency Name": "Bitcoin",
       //       "3. To_Currency Code": "CNY",
       //       "4. To_Currency Name": "Chinese Yuan",
       //       "5. Exchange Rate": "207838.88814500",
       //       "6. Last Refreshed": "2021-01-26 11:11:07",
       //       "7. Time Zone": "UTC",
       //      "8. Bid Price": "207838.82343000",
       //       "9. Ask Price": "207838.88814500"
       //     }
       //     }
        string[] memory path = new string[](2);
        path[0] = "Realtime Currency Exchange Rate";
        path[1] = "5. Exchange Rate";
        request.addStringArray("path", path);

        // Multiply the result by 10000000000 to remove decimals
        request.addInt("times", 10000000000);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}
```

## Token LINK de la red principal de Polygon {#mainnet-polygon-link-token}

Para obtener el token de  de la red principal de Ethereum, debes seguir un proceso de 2 pasos.

1. Conecta tu LINK usando el puente de Plasma o el [puente de PoS](https://wallet.polygon.technology/bridge).
2. Cambia el LINK a la versión ERC677 a través del servicio [Pegswap implementado por Chainlink](https://pegswap.chain.link/).

El puente de Polygon trae una versión ERC-20 de LINK, y LINK es un ERC677, por lo que solo tenemos que actualizarlo con este conversor.

## Direcciones {#addresses}

Actualmente, solo hay algunos oráculos operativos de Chainlink en la red de pruebas Mumbai de Polygon. También puedes ejecutar uno tú mismo e inscribirlo en la tienda de Chainlink.

* Oráculo: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Para obtener LINK en la red de Mumbai, dirígete al [grifo de Polygon aquí](https://faucet.polygon.technology/).

## API soportadas {#supported-apis}

El ciclo de solicitud y recepción de Chainlink es lo suficientemente flexible para llamar a cualquier API pública, siempre que los parámetros de la solicitud sean correctos y el formato de respuesta sea conocido. Por ejemplo, si el objeto de respuesta de un URL del que queremos obtener datos tiene el siguiente formato: `{"USD":243.33}`, la ruta es simple: `"USD"`.

Si una API responde con un objeto JSON complejo, el parámetro **de ruta** tendría que especificar dónde recuperar los datos deseados, utilizando una cadena delimitada por puntos para los objetos anidados. Por ejemplo, considera la siguiente respuesta:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

Esta requerirá la ruta `"Prices.USD"`. Si hay espacios en las cadenas o las cadenas son bastante largas, podemos utilizar la sintaxis que se muestra en el ejemplo anterior, donde los pasamos a todos como una matriz de cuerdas.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## ¿Para qué sirven las ID de trabajo? {#what-are-job-ids-for}

Puede que hayas notado que nuestro [ejemplo](#code-example) utiliza un `jobId`parámetro al construir la solicitud. Los trabajos constan de una secuencia de instrucciones que el oráculo está configurado para ejecutar. En el [ejemplo de código](#code-example) anterior, el contrato le hace una solicitud al oráculo con la ID de trabajo: `da20aae0e4c843f6949e5cb3f7cfe8c4`. Ese trabajo específico está configurado para hacer lo siguiente:

* Hacer una solicitud GET
* Analizar la respuesta JSON
* Multiplicar el valor por *x*
* Convertir el valor a `uint`
* Enviar a la cadena

Por eso el contrato incorpora el URL, la ruta del lugar donde se encuentran los datos deseados en la respuesta JSON y la cantidad de veces en la solicitud, usando las sentencias `request.add`. Estas instrucciones son facilitadas por lo que se conoce como "adaptadores" en el oráculo.

**Todas las solicitudes a un oráculo deben incluir una ID de trabajo específico.**

Esta es la lista de trabajos cuya ejecución está a cargo del oráculo de Polygon.

| Nombre | Tipo de devolución | ID | Adaptadores |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

Puedes encontrar la referencia completa de la API de Chainlink [aquí](https://docs.chain.link/any-api/api-reference).
