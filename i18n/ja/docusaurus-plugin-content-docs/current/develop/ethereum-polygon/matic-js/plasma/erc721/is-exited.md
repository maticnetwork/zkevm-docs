---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: '引き出しが終了したかどうかを確認します。'
---

`isExited`メソッドは、引き出しが終了したかどうかを確認します。これは、ブーリアンバリューを返します。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
