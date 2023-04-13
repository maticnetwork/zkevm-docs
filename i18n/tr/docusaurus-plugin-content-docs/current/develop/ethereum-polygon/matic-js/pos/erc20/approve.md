---
id: approve
title: approve
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "Gerekli miktarı kök token'da onayla."
---

`approve` metodu gerekli miktarı kök token'da onaylamak için kullanılabilir.

miktarı polygon zincirine yatırmak için onay (approve) gereklidir.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

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
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
