---
id: withdraw-confirm-faster
title: チャレンジをより早く引き出す
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'バックエンドで生成された証明の引出しを承認します。'
---

`withdrawConfirmFaster`メソッドは、Plasmaを引き出すプロセスの2番目のステップです。ステップでは、バーントランザクション（最初のトランザクション）のプルーフが提出され、バリューのERC721トークンが作成されます。

プロセスが成功すると、チャレンジ期間が開始され、そしてチャレンジ期間が完了すると、ユーザは引き出した金額をルートチェーンのアカウントに戻すことができます.プロセスが成功すると、チャレンジ期間が開始され、そしてチャレンジ期間が完了すると、ユーザは、引き出した額をルートチェーン上の自分のアカウント内に取り戻すことができます。

Mainnetの場合、チャレンジ期間は7日間です。

バックエンドで証明を生成するため高速です。[setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)を設定する必要があります。

**注意事項**-引き出すことに挑戦するには、withdrawStartトランザクションにチェックポイントを設定する必要があります。

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

チャレンジ期間が完了すると、`withdrawExit`を呼び出して、引き出すプロセスを終了し、引き出された額を取り戻すことができます。
