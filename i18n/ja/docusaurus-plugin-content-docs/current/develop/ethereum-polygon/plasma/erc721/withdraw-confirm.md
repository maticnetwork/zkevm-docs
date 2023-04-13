---
id: withdraw-confirm
title: withdrawChallenge
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# withdrawConfirm {#withdrawconfirm}

`withdrawConfirm`メソッドは、Plasmaを引き出すプロセスの2番目のステップです。このステップでは、バーントランザクション（最初のトランザクション）のプルーフが送信され、同等のバリューのERC721トークンが作成されます。

プロセスが成功すると、チャレンジ期間が開始され、そしてチャレンジ期間が完了すると、ユーザは、引き出した額をルートチェーン上の自分のアカウント内に取り戻すことができます。

Mainnetの場合、チャレンジ期間は7日間です。

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
