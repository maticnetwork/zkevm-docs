---
id: withdraw-start-many
title: WithdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'Initiiere den Auszahlungsprozess'
---

`withdrawStartMany`-Methode kann angewandt werden, um den Auszahlungsvorgang zu starten, der die vorgegebenen Mengen an mehreren Token auf die Polygon-Chain entsprechend brennt.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
