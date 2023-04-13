---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# isExited {#isexited}

`isExited`メソッドは、引き出しが終了したかどうかをチェックします。これは、ブーリアンバリューを返します。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
