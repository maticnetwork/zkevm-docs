---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "Kunin ang naaprubahang halaga para sa user."
---

Maaaring gamitin ang paraang `getAllowance` upang kunin ang naaprubahang halaga para sa user.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

Tinatawag na `spenderAddress` ang address kung saan ibinibigay ang pag-apruba. Isa itong third-party user o isang smart contract na maaaring ilipat ang iyong token sa ngalan mo.

Bilang default, ang value ng spenderAddress ay ang address ng erc20 predicate.

Maaari mong tukuyin ang value ng spender address nang mano-mano.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
