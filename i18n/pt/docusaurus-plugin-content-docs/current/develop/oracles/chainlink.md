---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: O Chainlink é uma rede de oráculos de blockchain descentralizada construída no Ethereum.
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

O **Chainlink** permite que seus contratos **acessem qualquer fonte de dados externa** através de uma rede de oráculos descentralizada. Quer o seu contrato exija resultados desportivos, a meteorologia ou qualquer outro dado publicamente disponível, a Chainlink fornece as ferramentas necessárias para o seu contrato os poder consumir.

## Dados Descentralizados {#decentralized-data}

Um dos recursos mais poderosos do Chainlink já é descentralizado, agregado e pronto para ser digerido dados da cadeia na maioria das criptomoedas populares. Estes são conhecidos como [**Feeds de Dados do Chainlink**](https://docs.chain.link/docs/using-chainlink-reference-contracts).

Aqui está um exemplo de trabalho de um contrato que obtém o último preço da MATIC em USD na testnet da Mumbai.

Tudo o que precisa fazer é trocar o endereço [com qualquer endereço de um feed de dados](https://docs.chain.link/docs/matic-addresses#config) que desejar, e pode começar a digerir informações de preços.

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

## Ciclo Solicitar e Receber {#request-and-receive-cycle}

O ciclo de Solicitar e Receber da Chainlink permite que os seus contratos inteligentes façam uma solicitação a qualquer API externa e consumam a resposta. Para implementá-lo, o seu contrato tem de definir duas funções:

1. Um para **solicitar os dados** e
2. Outro para **receber a resposta**.

Para solicitar dados, o seu contrato cria um `request`objeto que ele fornece a um oráculo. Assim que o oracle tiver contactado a API e analisado a resposta, irá tentar enviar dados de volta ao seu contrato usando a função de retorno de chamada definida no seu smart contract.

## Utilizações {#uses}

1. **Feeds de dados de Chainlink**

Estes são pontos de referência de dados descentralizados já agregados na chain, e a maneira mais rápida, fácil e mais barata para obter dados do mundo real. Atualmente, suporta alguns dos pares de criptomoedas e moedas fiduciárias mais conhecidos.

Para trabalhar com Feeds de Dados, use os [**Feeds de Dados do Polygon da**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) documentação do Chainlink.

2. **Função de Randomness Verificável do Chainlink**

Obtenha números provavelmente aleatórios, onde o número aleatório é garantido criptograficamente para ser aleatório.

Para trabalhar com o Chainlink VRF, use os [**endereços do Polygon VRF**](https://docs.chain.link/vrf/v2/subscription/supported-networks) da [documentação](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number) do Chainlink.

3. **Chaves da API do Chainlink**

Como configurar o seu contrato inteligente para trabalhar com APIs tradicionais e personalizar para obter dados, enviar solicitações pela Internet e muito mais.

## Exemplo de código {#code-example}

Para interagir com APIs externas, o seu contrato inteligente deve herdar de [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol), que é um contrato desenhado para facilitar as solicitações de processamento. Expõe uma estrutura chamada `Chainlink.Request`, que o seu contrato deve usar para construir a solicitação API.

A solicitação deve definir o endereço de oráculo, o ID do emprego, a taxa, os parâmetros do adaptador e a assinatura da função de retorno de chamada. Neste exemplo, a solicitação é construída na função `requestEthereumPrice`.

`fulfill` é definido como a função de retorno de chamada.

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

## Token do LINK Mainnet da Polygon {#mainnet-polygon-link-token}

Para obter token do Polygon LINK do Mainnet do Ethereum é necessário seguir um processo de 2 etapas.

1. Fazer bridge do seu LINK usando Plasma ou [PoS Bridge](https://wallet.polygon.technology/bridge).
2. Fazer swap do LINK para a versão ERC677 via [Pegswap, implantado pela Chainlink](https://pegswap.chain.link/).

A bridge da Polygon traz uma versão ERC20 do LINK, e LINK é um ERC677, por isso só é preciso atualizá-la com este swap.

## Endereços {#addresses}

Atualmente, existem poucos oracles da Chainlink na Testnet Mumbai da Polygon. Pode sempre fazer RUN de um por si mesmo e listá-lo no Marketplace da Chainlink.

* Oracle:[`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK:[`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Para obter o LINK no Mumbai Testnet, vá para a [faucet Polygon aqui](https://faucet.polygon.technology/).

## APIs suportadas {#supported-apis}

O ciclo de Solicitar e Receber da Chainlink é suficientemente flexível para fazer CALL de qualquer API pública, desde que os parâmetros de solicitação estejam corretos e o formato de resposta seja conhecido. Por exemplo, se o objeto de resposta de um URL que queremos ir buscar estiver formatado assim:`{"USD":243.33}`, o caminho é simples: `"USD"`.

Se uma API responder com um objeto JSON complexo, o parâmetro **caminho** teria de especificar onde recuperar os dados desejados, usando uma string delimitada de pontos para objetos aninhados. Por exemplo, considere a seguinte resposta:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

Aqui seria exigido o seguinte caminho: `"Prices.USD"`. Se houver espaços nas strings ou as strings forem bastante longas, podemos usar a sintaxe mostrada no exemplo acima, onde os passamos como um array de strings.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## Para que são os IDs das Tarefas? {#what-are-job-ids-for}

Pode ter notado que o nosso [exemplo](#code-example) usa um `jobId`parâmetro ao criar a solicitação. As tarefas são compostas por uma sequência de instruções para as quais o oracle está configurado para executar. No [exemplo do código](#code-example) acima, o contrato faz a solicitação ao oracle com a identificação da tarefa: `da20aae0e4c843f6949e5cb3f7cfe8c4`. Esta tarefa em particular está configurada para fazer o seguinte:

* Fazer uma solicitação GET
* Analisar a resposta JSON
* Multiplicar o valor por *x*
* Converter o valor em `uint`
* Apresentar à chain

É por isso que o nosso contrato acrescenta a URL, o caminho onde se podem encontrar os dados pretendidos na resposta JSON e o horário da solicitação; usando as declarações `request.add` . Estas instruções são facilitadas por aquilo que é conhecido como Adaptadores, no oracle.

**Cada solicitação a um oracle deve incluir uma identificação específica da tarefa.**

Aqui indicamos uma lista de tarefas que o oracle da Polygon está configurado para executar.

| Nome | Retornar o tipo | Identificação | Adaptadores |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

A referência completa da API Chainlink pode ser consultada [aqui](https://docs.chain.link/any-api/api-reference).
