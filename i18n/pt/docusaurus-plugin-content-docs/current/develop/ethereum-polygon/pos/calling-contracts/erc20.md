---
id: erc20
title: Guia de Depósito e Retirada de ERC-20
sidebar_label: ERC20
description: "Funções disponíveis para contratos ERC-20."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## Fluxo de Alto Nível {#high-level-flow}

Depositar ERC-20 -

1. **_Aprove_** o contrato **_ERC20Predicate_** para gastar os tokens que têm de ser depositados.
2. Faça um CALL **_depositFor_** no **_RootChainManager_**.

Retirada de ERC-20 -

1. Faça **_burn_** de tokens na blockchain da Polygon.
2. Faça o CALL da função de **_saída_** no **_RootChainManager_** para apresentar a prova da transação de burn. Este CALL pode ser feito **_depois do checkpoint_** ser apresentado ao bloco que contém a transação de burn.

## Detalhes de Configuração {#setup-details}

### Instanciar os contratos {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Aprovar {#approve}
Aprove **_ERC-20Predicate_** para gastar tokens fazendo CALL da função **_aprovar_** do contrato de token. Esta função usa dois argumentos: gastador e quantidade. O **_gastador_** é o endereço que está a ser aprovado para gastar os tokens do utilizador. A **_quantidade_** é a quantidade de tokens que pode ser gasta. Mantenha a quantidade igual à quantidade do depósito para uma aprovação única, ou passe um número maior para evitar ter que aprovar múltiplas vezes.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Depósito {#deposit}
Note que o token precisa de estar mapeado e a quantidade precisa ser aprovada para depósito antes de fazer este CALL.   Ligue para a `depositFor()`função do `RootChainManager`contrato. Esta função leva 3 argumentos: `userAddress``rootToken`, e `depositData`. `userAddress`é o endereço do usuário que receberá o depósito na chain Polygon. é o endereço do token na `rootToken`chain principal. é `depositData`o valor codificado com ABI.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Burn {#burn}
É possível fazer burn de tokens na blockchain da Polygon ao fazer o CALL da função de **_retirada_** no contrato de token filho. Esta função usa um argumento SINGLE: **_quantidade_**, que indica o número de tokens a serem produzidos por burn. A prova deste burn precisa de ser apresentada na etapa de saída. Então, armazene o hash da transação.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Saída {#exit}
A função de saída do `RootChainManager`contrato tem de ser chamada para desbloquear e receber os tokens de .`ERC20Predicate` Esta função usa um argumento de bytes SINGLE que prova a transação de burn. Espere o ponto de verificação que contém a transação de gravação a ser submetido antes de chamar esta função. A Prova é gerada pela codificação de RLP os seguintes campos -

1. headerNumber - número do bloco de cabeçalho do checkpoint que contém o burn tx
2. blockProof - prova de que o cabeçalho do bloco (na chain filha) é uma folha na ROOT merkle apresentada
3. blockNumber - número do bloco que contém o burn tx na chain filha
4. blockTime - tempo de bloco do burn tx
5. txRoot - ROOT de transações do bloco
6. receiptRoot - ROOT de recibos do bloco
7. receipt - recibo da transação de burn
8. receiptProof - prova merkle do recibo de burn
9. branchMask - 32 bits que denotam o caminho do recibo na árvore de merkle patricia
10. receiptLogIndex - índice de registo para ler a partir do recibo

Gerar provas manualmente pode ser complicado; por isso, é aconselhável usar o Polygon Edge. Se quiser enviar a transação manualmente, você pode passar **_encodeAbi_** como **_verdadeiro_** no objeto de opções para obter dados brutos de CALL.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

Envie estes dados de CALL para **_RootChainManager_**.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
