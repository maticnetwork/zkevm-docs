---
id: api-architecture
title: Arquitetura API
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: Leia e escreva as definições de transação plus da API.
---

A biblioteca segue a arquitetura API comum e as APIs estão divididas em dois tipos -

1. API de leitura
2. API de gravação

## API de leitura {#read-api}

As APIs de leitura não publicam nada na blockchain e não consomem gás. Exemplo de APIs de leitura são - `getBalance`, `isWithdrawExited` etc.

Vamos ver um exemplo de API de leitura -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

As APIs de leitura são muito simples e devolvem o resultado diretamente.

## API de gravação {#write-api}

As APIs de gravação publicam alguns dados na blockchain e consomem gás Exemplo de APIs de gravação são - `approve`, `deposit` etc.

Para chamar uma API de gravação precisa de dois dados do resultado.

1. TransactionHash
2. TransactionReceipt

Vamos ver um exemplo de API de gravação e obter o transactionhash e recibo -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

## Opção de transação {#transaction-option}

Existem algumas opções configuráveis que estão disponíveis para todas as API. Estas configurações podem ser passadas em parâmetros.

As configurações disponíveis são -

- from?: string | número - O endereço a partir do qual as transações devem ser feitas.
- to?: string - O endereço para o qual as transações devem ser feitas.
- valor?: número | string | BN - O valor transferido para a transação em wei.
- gasLimit?: número | string - O máximo de gás fornecido para uma transação (limite de gás).
- gasPrice?: número | string | BN - O preço de gás em wei a usar para transações.
- data?: string - O código de bytes do contrato.
- nonce?: número;
- chainId?: número;
- chain?: string;
- hardfork?: string;
- returnTransaction?: booleano - quando verdadeiro irá devolver o objeto da transação que pode ser usado para enviar a transação manualmente.

Vamos ver um exemplo ao configurar o gasPrice

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
