---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Aprubahan ang max na halaga sa root token.'
---

Maaaring gamitin ang paraang `approveMax` upang aprubahan ang max na halaga sa root token.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

Tinatawag na `spenderAddress` ang address kung saan ibinibigay ang pag-apruba. Isa itong third-party user o isang smart contract na maaaring ilipat ang iyong token sa ngalan mo.

Bilang default, ang value ng spenderAddress ay ang address ng erc20 predicate.

Maaari mong tukuyin ang value ng spender address nang mano-mano.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
