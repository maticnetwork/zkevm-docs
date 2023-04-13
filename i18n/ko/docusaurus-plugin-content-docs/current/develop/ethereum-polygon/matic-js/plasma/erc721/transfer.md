---
id: transfer
title: transfer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: '토큰을 한 사용자에게서 다른 사용자에게로 이전합니다.'
---

`transfer` 메서드를 사용하면 토큰을 한 사용자에게서 다른 사용자에게로 이전할 수 있습니다.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
