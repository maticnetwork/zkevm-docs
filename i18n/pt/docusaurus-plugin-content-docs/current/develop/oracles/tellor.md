---
title: Tellor
description: "Um guia para integrar o oráculo do Tellor no seu contrato do Polygon."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor é um oracle que fornece dados resistentes à censura que são protegidos por incentivos cripto-económicos simples. Os dados podem ser fornecidos por qualquer pessoa e verificados por todos. A estrutura flexível do Tellor pode fornecer qualquer dado, em qualquer intervalo de tempo, para oferecer uma experimentação/inovação fácil.

## Pré-requisitos (Soft) {#soft-prerequisites}

Estamos a assumir o seguinte sobre o seu nível de competências de codificação para nos centrarmos no oracle.

Suposições:

- consegue navegar num terminal
- tem o NPM instalado
- sabe como usar um NPM para gerir as dependências

Tellor é um oracle de código aberto e vivo pronto para implementação. Este guia para iniciantes está aqui para mostrar a facilidade com que se pode obter e executar com o Tellor, proporcionando ao seu projeto um oráculo totalmente descentralizado e resistente à censura.

## Visão geral {#overview}

Tellor é um sistema de oracle onde as partes podem solicitar o valor de um ponto de dados fora da chain (por exemplo, BTC/USD) e os repórteres competem para adicionar este valor a um banco de dados na chain, acessível por todos os smart contratos da Polygon. As entradas para neste banco de dados estão protegidas por uma rede de repórteres staked. Tellor utiliza mecanismos de incentivo cripto-económicos. O envio de dados honestos pelos repórteres é recompensado pela emissão do token Tellor. Quaisquer ação negativa será rapidamente punida e o autor removido da rede por um mecanismo de disputa.

Neste tutorial vamos abordar:

- Configuração do kit de ferramentas inicial que será necessário para arrancar.
- Análise de um exemplo simples.
- Listagem de endereços testnet de redes nas quais pode testar o Tellor.

## UsingTellor (Usar o Tellor) {#usingtellor}

A primeira coisa que terá de fazer é instalar as ferramentas básicas necessárias para usar o Tellor como o seu oracle. Use [este pacote](https://github.com/tellor-io/usingtellor) instalar os contratos do utilizador Tellor:

`npm install usingtellor`

Concluída a instalação, os seus contratos poderão herdar as funções do contrato 'UsingTellor'.

Excelente! Agora que tem as ferramentas prontas, vamos avançar para um exercício simples onde recuperamos o preço do bitcoin:

### Exemplo BTC/USD {#btc-usd-example}

Herdar o contrato UsingTellor, passando o endereço Tellor como um argumento construtivo:

Um exemplo:

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

## Endereços: {#addresses}

Tributos do Tellor: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle:[`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### Quer primeiro fazer uns testes? {#looking-to-do-some-testing-first}

Testnet Mumbai da Polygon: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

Tributos de teste:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

Precisa de alguns tokens de teste? Tweet em ['@trbfaucet'](https://twitter.com/trbfaucet)

Para facilitar a utilização, o repo UsingTellor vem com uma versão do [contrato do Tellor Playground](https://github.com/tellor-io/TellorPlayground) para facilitar a integração. Veja [aqui](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) uma lista de funções úteis.

#### Para uma implementação mais robusta do oracle Tellor, consulte a lista completa de funções disponíveis [aqui.](https://github.com/tellor-io/usingtellor/blob/master/README.md)

#### Ainda tem perguntas? Junte-se à comunidade [aqui!](https://discord.gg/tellor)
