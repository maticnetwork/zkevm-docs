---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Kök token üzerinde maksimum miktarı onaylar.'
---

`approveMax` metodu, kök token üzerinde maksimum miktarı onaylamak için kullanılabilir.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

Onayın verildiği adres `spenderAddress` olarak adlandırılır. Token'ınızı sizin adınıza bir üçüncü taraf kullanıcı veya bir akıllı sözleşme aktarabilir.

Varsayılan olarak, spenderAddress değeri erc20 koşullu adrestir.

Spender adres değerini manuel olarak belirtebilirsiniz.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
