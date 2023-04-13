---
id: withdraw-confirm-faster
title: withdrawChallengeFaster
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'バックエンドで生成された証明の引出しを承認します。'
---

`withdrawConfirmFaster`メソッドは、Plasmaを引き出すプロセスの2番目のステップです。このステップでは、バーントランザクション（最初のトランザクション）のプルーフが送信され、同等のバリューのERC721トークンが作成されます。

プロセスが成功すると、チャレンジ期間が開始され、そしてチャレンジ期間が完了すると、ユーザは、引き出した額をルートチェーン上の自分のアカウント内に取り戻すことができます。

挑戦する期間は、Mainnetの7日間です。

バックエンドで証明を生成するため高速です。[setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)を設定する必要があります。

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
