---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Проверяет, был ли выполнен выход из вывода.'
---

Метод `isExited` проверяет, был ли выполнен выход из вывода. Он возвращает логическое значение.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
