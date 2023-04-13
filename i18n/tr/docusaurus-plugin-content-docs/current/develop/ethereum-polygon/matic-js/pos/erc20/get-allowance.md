---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "Kullanıcı için onaylanan miktarı alır."
---

`getAllowance` metodu, kullanıcı için onaylanan miktarı almak için kullanılabilir.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

Onayın verildiği adres `spenderAddress` olarak adlandırılır. Token'ınızı sizin adınıza bir üçüncü taraf kullanıcı veya bir akıllı sözleşme aktarabilir.

Varsayılan olarak, spenderAddress değeri erc20 koşullu adrestir.

Spender adres değerini manuel olarak belirtebilirsiniz.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
