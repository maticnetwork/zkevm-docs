---
id: zkevm-gas-station
title: Polygon zkEVM Gas Station
sidebar_label: zkEVM Gas Station
description: Gas price recommendations on the Polygon zkEVM.
keywords:
  - polygon
  - zkevm
  - gas price prediction
  - Gas Station
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The goal of **Polygon zkEVM Gas Station** is to provide dApp developers with gas pricing suggestions so they can use it before sending transactions to the **Polygon zkEVM** network. The prediction method is modelled after the [Polygon Gas Station](https://wiki.polygon.technology/docs/develop/tools/polygon-gas-station) but is unique in its own ways.

Polygon zkEVM Gas Station is currently **deployed on the zkEVM Mainnet Beta and Blueberry testnet**, where it analyzes recent 1500 transactions and recommends gas price.

## Usage

<Tabs
  defaultValue="mainnet"
  values={[
    { label: 'zkEVM Mainnet Beta', value: 'mainnet', },
    { label: 'zKEVM Testnet', value: 'testnet', },
  ]
}>

<TabItem value="testnet">

Send a GET request to the [zkEVM Gas Station endpoint](https://gasstation-testnet.polygon.technology/zkevm) to get a gas price recommendation from this oracle.

#### cURL

```bash
curl https://gasstation-testnet.polygon.technology/zkevm
```

#### JavaScript

```javascript
fetch('https://gasstation-testnet.polygon.technology/zkevm')
  .then(response => response.json())
  .then(json => console.log(json))
```

#### Python

```python
import requests
requests.get('https://gasstation-testnet.polygon.technology/zkevm').json()
```

</TabItem>

<TabItem value="mainnet">

Send a GET request to the [zkEVM Gas Station endpoint](https://gasstation.polygon.technology/zkevm) to get a gas price recommendation from this oracle.

#### cURL

```bash
curl https://gasstation.polygon.technology/zkevm
```

#### JavaScript

```javascript
fetch('https://gasstation.polygon.technology/zkevm')
  .then(response => response.json())
  .then(json => console.log(json))
```

#### Python

```python
import requests
requests.get('https://gasstation.polygon.technology/zkevm').json()
```

</TabItem>
</Tabs>

## Interpretation

An example JSON response will look like this.

```json
{
    "safeLow":1,
    "standard":1,
    "fast":1,
    "fastest":1,
    "blockTime":2,
    "blockNumber":308789
}
```

- {'safelow', 'standard', 'fast', 'fastest'} are gas prices in GWei, you can use these prices before sending transaction off to Polygon zkEVM, depending upon your needs
- `blockTime`, in seconds, gives average block time of the network.
- `blockNumber` provides the information of latest block mined when recommendation was made
