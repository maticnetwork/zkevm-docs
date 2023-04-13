---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Начните работать с maticjs'
---

# isExitedMany {#isexitedmany}

Метод `isExitedMany` проверяет, был ли выполнен выход из вывода. Он возвращает логическое значение.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
