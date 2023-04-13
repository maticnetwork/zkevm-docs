---
id: erc20
title: Guia de Depósito e Retirada de ERC-20
sidebar_label: ERC20
description: "Depositar e retirar tokens ERC-20 na rede da Polygon."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Verifique a [documentação Matic.js mais recente na ERC-20](https://maticnetwork.github.io/matic.js/docs/pos/erc20/).

Este tutorial usa a Polygon Testnet (Mumbai) que é mapeada para a rede Goerli para demonstrar a transferência de ativo de e para os dois blockchains. Algo **importante a reter** ao seguir este tutorial é que deve usar um endereço Proxy sempre que esteja disponível. Por exemplo, o endereço **RootChainManagerProxy****** tem de ser usado para interação em vez do endereço RootChainManager. Os **endereços de contrato PoS ABI, endereços token de teste,** e outros detalhes de implantação dos contratos PoS Bridge podem ser consultados [aqui](/docs/develop/ethereum-polygon/pos/deployment).

**O mapeamento dos seus ativos** é necessário para integrar a PoS Bridge na sua aplicação. Pode submeter uma solicitação de mapeamento [aqui](/docs/develop/ethereum-polygon/submit-mapping-request). Mas, para efeitos deste tutorial, já implantamos os **tokens de Teste** e mapeamos na ponte PoS. Pode precisar disso para experimentar o tutorial por si só. Pode solicitar o ativo pretendido a partir do [faucet](https://faucet.polygon.technology/). Se os tokens de teste não estiverem disponíveis na faucet, entre em contato conosco na [discórdia](https://discord.com/invite/0xPolygonn).

No próximo tutorial, cada etapa será explicada em detalhe com alguns excertos de código. No entanto, pode sempre consultar este [repositório](https://github.com/maticnetwork/matic.js/tree/master/examples/pos) que terá todo o **código-fonte de exemplo** para ajudar a integrar e entender o funcionamento da PoS Bridge.

## Fluxo de Alto Nível {#high-level-flow}

Depositar ERC-20 -

1. **_Aprove_** o contrato **_ERC20Predicate_** para gastar os tokens que têm de ser depositados.
2. Faça um CALL **_depositFor_** no **_RootChainManager_**.

Retirar ERC-20 -

1. Gravar tokens na chain Polygon.
2. Ligue para a `exit()`função `RootChainManager`de enviar prova da transação de queimadura. Esta chamada pode ser feita depois de ser submetida o checkpoint para o bloco que contém a transação de queimadura.

## Passos Detalhes {#steps-details}

### Aprovar {#approve}

Esta é uma aprovação ERC20 normal para que **_ERC20Predicate_** possa fazer CALL da função **_transferFrom_**. O cliente da Polygon PoS expõe método **_aprovar_** para fazer esta CALL.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### depositar {#deposit}

Observe que o token precisa ser mapeado e aprovado para transferência previamente. O cliente Polygon PoS expõe o `deposit()`método para efetuar esta chamada.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
Depósitos do Ethereum ao Polygon ocorrem usando um mecanismo de **sincronização** de estado e levam cerca de 22-30 minutos. Depois de aguardar este intervalo de tempo, é recomendável verificar o saldo usando a biblioteca web3.js/matic.js ou usar o Metamask. O explorador irá mostrar o saldo apenas se tiver ocorrido no mínimo uma transferência de ativo na chain filha. Este [<ins>link</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) explica como rastrear eventos de depósito.
:::

### Método WithdrawStart para Burn {#withdrawstart-method-to-burn}

O `withdrawStart()`método pode ser usado para iniciar o processo de retirada que irá queimar o valor especificado na chain Polygon.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

Armazene a hash da transação para esta CALL e use-a enquanto gera a prova de burn.

### Saída {#exit}

Assim que o ponto de verificação for submetido para o bloco que contém a transação de queimadura, o utilizador deve chamar a `exit()`função do `RootChainManager`contrato e apresentar a prova de queimadura. Ao enviar provas válidas, os tokens são transferidos para o usuário. O cliente Polygon PoS expõe o `withdrawExit`método para efetuar esta chamada. Esta função pode ser chamada somente após o checkpoint estar incluído na Mainchain. A inclusão do checkpoint pode ser rastreada seguindo [este guia](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).

O método *withdrawExit* pode ser usado para o processo de saída usando o txHash do método *withdrawStart*.

:::note
A transação de saques deve ser marcada para sair do saque.
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
