---
id: api-architecture
title: Arkitektura ng API
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: Mga Read at Write API dagdag ang mga setting ng transaksyon.
---

Sinusunod ng library ang karaniwang arkitektura ng api sa kabuuan at hinati ang mga API sa dalawang uri -

1. Read API
2. Write API

## Read API {#read-api}

Ang mga read API ay hindi naglalathala ng anumang bagay sa blockchain, kaya hindi ito kumokonsumo ng anumang gas. Ang halimbawa ng mga read API ay - `getBalance`, `isWithdrawExited` atbp.

Tingnan nating ang isang halimbawa ng read API -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

Napakasimple ng mga read API at direktang nagbabalik ng resulta.

## Write API {#write-api}

Naglalathala ang mga write API ng kaunting data sa blockchain, kaya kumokonsumo ito ng gas. Ang halimbawa ng mga write API ay - `approve`, `deposit` atbp.

Kapag nagko-call ka ng isang write API - kailangan mo ng dalawang data mula sa resulta.

1. TransactionHash
2. TransactionReceipt

Tingnan natin ang isang halimbawa ng write API at kunin ang transactionhash at receipt -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

## Opsyon ng transaksyon {#transaction-option}

May ilang nakoko-configure na opsyon na magagamit para sa lahat ng API. Maaaring ipasa ang mga configuration na ito sa mga parameter.

Ang mga magagamit na configuration ay -

- from?: string | number - Ang address kung saan dapat magmula ang mga transaksyon.
- to?: string - Ang address kung saan dapat papunta ang mga transaksyon.
- value?: number | string | BN - Ang value na inilipat para sa transaksyon sa wei.
- gasLimit?: number | string - Ang maximum na gas na ibinigay para sa isang transaksyon (limitasyon ng gas).
- gasPrice?: number | string | BN - Ang presyo ng gas sa wei na gagamitin para sa mga transaksyon.
- data?: string - Ang byte code ng kontrata.
- nonce?: number;
- chainId?: number;
- chain?: string;
- hardfork?: string;
- returnTransaction?: boolean - kapag ginawa itong true, ibabalik nito ang object ng transaksyon na maaaring gamitin upang ipadala ang transaksyon nang mano-mano.

Tingnan natin ang isang halimbawa sa pamamagitan ng pag-configure sa gasPrice

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
