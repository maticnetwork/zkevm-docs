---
id: transfer
title: 이전
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Maticjs를 시작합니다'
---

# 이전 {#transfer}

`transfer` 메서드는 토큰을 한 사용자에서 다른 사용자로 이전합니다.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
