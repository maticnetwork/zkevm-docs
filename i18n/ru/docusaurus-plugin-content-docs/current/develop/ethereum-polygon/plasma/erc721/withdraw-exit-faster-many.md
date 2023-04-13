---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Начните работать с maticjs'
---

# withdrawExitFasterMany {#withdrawexitfastermany}

Метод `withdrawExitFasterMany` можно использовать для утверждения всех токенов.

Он выполняется быстро, потому что генерирует доказательство на серверном уровне. Серверный уровень можно настроить с выделенным приватным rpc.

**Примечание.** Для выхода из процесса вывода необходимо установить контрольные точки для транзакции withdrawStart.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
