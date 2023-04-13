---
id: is-aproved
title: Ang isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# Ang isApproved {#isapproved}

`isApproved` na paraan ay nagsusuri kung naaprubahan ang token para sa tinukoy na tokenId. Ibinabalik nito ang boolean value.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
