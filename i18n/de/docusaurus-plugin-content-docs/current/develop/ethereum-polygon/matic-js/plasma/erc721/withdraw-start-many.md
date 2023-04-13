---
id: withdraw-start-many
title: WithdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'Initiieren Sie den Abhebungsprozess'
---

Die `withdrawStartMany`-Methode kann angewandt werden, um den Abhebungsvorgang zu initiieren, der den multiplen Token auf die Polygon-Chain brennt.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
