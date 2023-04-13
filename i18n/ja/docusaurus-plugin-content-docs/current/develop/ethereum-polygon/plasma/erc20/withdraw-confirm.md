---
id: withdraw-confirm
title: チャレンジを引き出す
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# withdrawConfirm {#withdrawconfirm}

`withdrawConfirm`メソッドは、Plasmaを引き出すプロセスの2番目のステップです。このステップでは、バーントランザクション（最初のトランザクション）のプルーフが提出され、バリューのERC721トークンが作成されます。

このプロセスが成功すると、チャレンジ期間が開始され、そしてチャレンジ期間が完了すると、ユーザは、引き出された額をルートチェーン上のアカウントに戻すことができます。

チャレンジ期間は、Mainnetの7日間です。

**注記**-引き出すことに挑戦するには、withdrawStartトランザクションにチェックポイントを設定する必要があります。

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

チャレンジ期間が完了すると、`withdrawExit`を呼び出して、引き出すプロセスを終了し、引き出された額を取り戻すことができます。
