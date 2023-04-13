---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# withdrawExit {#withdrawexit}

`withdrawExit` metodu sorgulama dönemi tamamlandıktan sonra fon çekme işleminden çıkmak için kullanılabilir.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
