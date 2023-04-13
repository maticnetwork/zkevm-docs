---
id: eth
title: Guia de Depósito e Retirada de ETH
sidebar_label: ETH
description: "Depositar e retirar tokens ETH na rede da Polygon."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

Consulte a [documentação Matic.js mais recente sobre ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/).

## Resumo Rápido {#quick-summary}

Esta secção dos documentos faz uma abordagem sobre como depositar e retirar tokens ERC-20 na rede da Polygon. Existem funções comuns entre as secções ETH, ERC-20, ERC-721 e ERC-1155 dos documentos com variâncias nos padrões de nomeação e implementação, de acordo com as normas. O pré-requisito mais importante para usar esta secção dos documentos é o mapeamento dos seus ativos, por isso deve submeter a sua solicitação de mapeamento [aqui](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

## Introdução {#introduction}

O guia usa a Polygon Testnet (Mumbai) que por sua vez está mapeada na Rede Goerli para demonstrar a transferência de ativos entre os dois blockchains. É importante notar que, para o propósito deste tutorial, deve usar um endereço proxy sempre que possível. Isto ocorre porque enquanto o contrato de implementação é passível de ser alterado quando é acrescentada uma nova atualização ao código do contrato, o proxy nunca muda e redireciona todas as CALLS recebidas para a implementação mais recente. Essencialmente, se usar o endereço proxy, não terá de se preocupar com quaisquer alterações que aconteçam no contrato de implementação antes de estar preparado.

Por exemplo, use o `RootChainManagerProxy`endereço para interações em vez do `RootChainManager`endereço. Detalhes de implantação, como endereços de contratos PoS, ABI e Endereços de Testar podem ser encontrados [aqui](/docs/develop/ethereum-polygon/pos/deployment/).

O mapeamento dos seus ativos é uma etapa necessária para integração do PoS Bridge na sua aplicação por isso, se ainda não o fez, submeta uma solicitação de mapeamento [aqui](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/). Para a finalidade deste tutorial, a equipa implantou tokens de teste e fez o seu mapeamento na PoS Bridge. Faça a solicitação do ativo que pretende usar no [faucet](https://faucet.polygon.technology/) e se os tokens de teste não estiverem disponíveis, entre em contacto com a equipa no [Discord](https://discord.com/invite/0xPolygon). Iremos certificar-nos de que recebe uma resposta imediatamente.

No próximo tutorial, cada etapa será explicada em detalhe com alguns excertos de código. No entanto, pode sempre consultar este [repositório](https://github.com/maticnetwork/matic.js/tree/master/examples) que terá todo o **código-fonte de exemplo** para ajudar a integrar e entender o funcionamento da PoS Bridge.

## Fluxo de Alto Nível {#high-level-flow}

Depósito ETH -

1. Faça a CALL **_depositEtherFor_** no **_RootChainManager_** e **envie ** o ether pretendido.

Retirar ETH -

1. Faça **_burn_** de tokens na blockchain da Polygon.
2. Faça o CALL da função de **_saída_** no **_RootChainManager_** para apresentar a prova da transação de burn. Este CALL pode ser feito **_depois do checkpoint_** ser apresentado ao bloco que contém a transação de burn.

## Etapas {#steps}

### Depósito {#deposit}

ETH pode ser depositado na chain da Polygon fazendo a CALL **depositEtherFor** no contrato **RootChainManager**. O cliente da Polygon PoS expõe o método **depositEther** para fazer este CALL.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
Depósitos do Ethereum ao Polygon são realizados usando o Mecanismo de Sincronização de **Estado** e isso leva cerca de 22-30 minutos. Depois de aguardar este intervalo de tempo, é recomendável verificar o saldo usando a biblioteca web3.js/matic.js ou usar o Metamask. O explorador irá mostrar o saldo apenas se tiver ocorrido no mínimo uma transferência de ativo na chain filha. Este [<ins>link</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) explica como rastrear eventos de depósito.
:::

### Burn {#burn}

O ETH é depositado como um token ERC-20 na chain Polygon. A retirada segue o mesmo processo da retirada de tokens ERC-20.

Para gravar os tokens e envolver o processo de retirada, chame a função de retirada do contrato MaticWETH. Como o Ether é um token **ERC-20** na chain Polygon, é necessário iniciar o token ERC-20 do cliente Polygon PoS e chamar o `withdrawStart()`método para iniciar o processo de queimadura.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Armazene a hash da transação para esta CALL e use-a enquanto gera a prova de burn.

### Saída {#exit}


Assim que o **ponto** de verificação for submetido para o bloco que contém a transação de queimadura, o utilizador deve chamar a função de **saída** do `RootChainManager`contrato e apresentar a prova de queimadura. Após a apresentação, os tokens de prova válidos são transferidos para o utilizador. O cliente da Polygon PoS `erc20`expõe o `withdrawExit`método para fazer este CALL. Esta função pode ser chamada somente após o checkpoint estar incluído na Mainchain. A inclusão do checkpoint pode ser monitorizada seguindo este [guia](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
