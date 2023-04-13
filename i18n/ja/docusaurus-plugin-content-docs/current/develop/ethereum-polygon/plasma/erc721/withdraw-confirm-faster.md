---
id: withdraw-confirm-faster
title: withdrawChallengeFaster
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

`withdrawConfirmFaster`メソッドは、Plasmaを引き出すプロセスの2番目のステップです。このステップでは、バーントランザクション（最初のトランザクション）のプルーフが送信され、同等のバリューのERC721トークンが作成されます。

プロセスが成功すると、チャレンジ期間が開始され、そしてチャレンジ期間が完了すると、ユーザは、引き出した額をルートチェーン上の自分のアカウント内に取り戻すことができます。

Mainnetの場合、チャレンジ期間は7日間です。

<div class="highlight mb-20px mt-20px">バックエンドでプルーフを生成するため高速です。[setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)を設定する必要があります。</div>

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
