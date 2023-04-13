---
id: withdraw-exit-faster
title: 引き出しをより素早く終了する
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'withdrawStartからtxHashを使用して、引き出しプロセスをより速く終了します。'
---

`withdrawExitFaster`メソッドは、`withdrawStart`メソッドからtxHashを使用して、引き出しプロセスをより速く終了するために使用できます。

バックエンドで証明を生成するため、一般的に高速です。[setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)を設定する必要があります。

**注意事項**- 引き出しを終了するには、withdrawStartトランザクションにチェックポイントを設定する必要があります。

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

トランザクションが完了し、チェックポイントの設定が完了すると、ルートチェーンにトークン の量が入金されます。
