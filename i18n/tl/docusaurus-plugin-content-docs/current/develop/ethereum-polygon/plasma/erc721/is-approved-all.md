---
id: is-approved
title: Ang isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# Ang isApprovedAll {#isapprovedall}

 `isApprovedAll` na paraan ay nagsusuri kung inaaprubahan ang lahat ng token. Ibinabalik nito ang boolean value.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
