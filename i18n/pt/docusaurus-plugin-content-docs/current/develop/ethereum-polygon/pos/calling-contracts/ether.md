---
id: ether
title: Guia de Retirada e Depósito de Ether
sidebar_label: Ether
description:  "Funções disponíveis para contratos Ether."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## Fluxo de Alto Nível {#high-level-flow}

Depositar Ether -

- Faça o CALL do depositEtherFor no **RootChainManager** e envie o ativo ether.

Retirada de Ether -

1. Faça **_ burn_** de tokens na blockchain da Polygon.
2. Faça o CALL da função de **_saída_** no **_RootChainManager_** para apresentar a prova da transação de burn. Este CALL pode ser feito **_depois do checkpoint_** ser apresentado ao bloco que contém a transação de burn.

## Detalhes da Etapa {#step-details}

### Instanciar os contratos {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### depositar {#deposit}
Ligue para a `depositEtherFor`função do `RootChainManager`contrato. Esta função leva 1 argumento `userAddress`- , que é o endereço do usuário que receberá o depósito na chain Polygon. A quantidade de éter a ser depositada deve ser enviada como valor da transação.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Burn {#burn}
Como o Ether é um token ERC-20 na chain Polygon, seu processo de retirada é o mesmo que a retirada do ERC-20. Os tokens podem ser queimados chamando a `withdraw`função no contrato de token filho. Esta função leva um único argumento, `amount`indicando o número de tokens a ser queimado. A prova deste burn tem de ser apresentada na etapa de saída. Então, armazene o hash da transação.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Saída {#exit}
A função de saída do `RootChainManager`contrato tem de ser chamada para desbloquear e receber os tokens de .`EtherPredicate` Esta função usa um argumento de bytes SINGLE que prova a transação de burn. Espere o ponto de verificação que contém a transação de gravação a ser submetido antes de chamar esta função. A Prova é gerada pela codificação de RLP os seguintes campos:

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
