---
id: approve
title: pag-apruba
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "Aprubahan ang kinakailangang halaga sa root token."
---

Maaaring gamitin ang paraang `approve` upang aprubahan ang kinakailangang halaga sa root token.

Kinakailangan ang pag-apruba upang makapagdeposito ng halaga sa polygon chain.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

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
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
