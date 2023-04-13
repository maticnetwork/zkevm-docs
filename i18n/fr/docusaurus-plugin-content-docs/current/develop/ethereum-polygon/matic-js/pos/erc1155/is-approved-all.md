---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Vérifiez si tous les jetons sont approuvés.'
---

`isApprovedAll`la méthode  vérifie si tous les jetons sont approuvés pour un utilisateur. Elle renvoie une valeur booléenne.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
