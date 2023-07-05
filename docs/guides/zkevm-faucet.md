---
id: zkevm-faucet
title: Polygon zkEVM Faucet
sidebar_label: zkEVM Faucet
description: Gas price recommendations on the Polygon zkEVM.
keywords:
  - polygon
  - zkevm
  - faucet
  - test tokens
  - zkETH
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Polygon Faucet** is the official tool provided by Polygon Labs to obtain Testnet tokens. It functions very similar to other such tools provided by ecosystem partners like Quicknode and Alchemy.

The zkEVM ETH faucet allows anyone to request bridged Goërli ETH tokens on the Polygon zkEVM network. Earlier, it was a bottleneck for developers to obtain Goërli ETH from a faucet and then bridge it over to Polygon zkEVM using the Wallet Suite.

With the latest offering, you can seamlessly explore Polygon zkEVM's functionalities without the need to utilize real ETH tokens.

:::info

Polygon zkEVM network faucet provides 0.02 ETH in a single user request.

We understand that Goërli ETH holds value which might attract malicious actors. That is why, we have integrated certain security measures in place to prevent any DoS attacks on the Faucet.

:::

## Using the Polygon zkETH Faucet

- Navigate to [**faucet.polygon.technology**](https://faucet.polygon.technology/)
   <img src={useBaseUrl("img/zkevm/faucet-zketh.png")} />

- Select the network where you want to receive the test tokens. In our case, we will select **Polygon zkEVM**.

- Select the type of Testnet token that you want to receive. In our case, we only have the option to receive **zkEVM ETH** which is also the default option.

- Enter your **wallet address** (you can copy it from your MetaMask or any wallet that supports testnet tokens)

- Click on the **Submit** button to send your token request

- Click **Confirm** to finalize the transaction

   <img src={useBaseUrl("img/zkevm/confirm-zketh.png")} />

- After confirmation, you will receive the requested Testnet tokens within ~1 minute. You can also verify the transaction by clicking on the Polygonscan link.

   <img src={useBaseUrl("img/zkevm/success-zketh.png")} />
