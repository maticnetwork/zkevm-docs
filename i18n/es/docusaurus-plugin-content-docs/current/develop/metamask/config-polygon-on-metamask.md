---
id: config-polygon-on-metamask
title: Add Polygon Network
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In order to view the flow of funds in your accounts, on the Polygon Network, you will need to configure Polygon `{testnet, mainnet}` URL on Metamask.

There are two ways to do it:
1. [Using Polygonscan](/develop/metamask/config-polygon-on-metamask.md#polygon-scan)
2. [Add the Polygon network manually](/develop/metamask/config-polygon-on-metamask.md#add-the-polygon-network-manually)

### Using Polygonscan

:::note
Please make sure you have already installed <ins>**[Metamask](https://metamask.io/)**</ins>!
:::

<Tabs
  defaultValue="mainnet"
  values={[
    { label: 'Polygon-Mainnet', value: 'mainnet', },
 { label: 'Mumbai-Testnet', value: 'mumbai', },
 ]
}>

<TabItem value="mumbai">

Please follow the steps to add Polygon's Mumbai-Testnet:

- Navigate to [mumbai.polygonscan.com](https://mumbai.polygonscan.com/)

<img src={useBaseUrl("img/metamask/testnet-button.png")} />
<p></p>

- Scroll down to the bottom of the page and click on the button `Add Mumbai Network`

<img src={useBaseUrl("img/metamask/testnet-addnetwork.png")} />

- Once you click the button you will see a MetaMask Notification, now click on **Approve**.
You will be directly switched to Polygon’s Mainnet now in the network dropdown list. You can now close the dialog.

</TabItem>

<TabItem value="mainnet">

Please follow the steps to add Polygon’s Mainnet:

- Navigate to [polygonscan.com](https://polygonscan.com/)

<img src={useBaseUrl("img/metamask/mainnet-button.png")} />
<p></p>

- Scroll down to the bottom of the page and click on the button `Add Polygon Network`

<img src={useBaseUrl("img/metamask/mainnet-addnetwork.png")} />

- Once you click the button you will see a MetaMask Notification, now click on **Approve**.
You will be directly switched to Polygon’s Mainnet now in the network dropdown list. You can now close the dialog.

</TabItem>

</Tabs>

If you are facing any issue, **Add the Network Manually(steps given below)**

### Add the Polygon network manually

<Tabs
  defaultValue="mainnet"
  values={[
    { label: 'Polygon-Mainnet', value: 'mainnet', },
 { label: 'Mumbai-Testnet', value: 'mumbai', },
 ]
}>

<TabItem value="mumbai">
To add Polygon's Mumbai-Testnet, click on the Network selection dropdown and then click on Custom RPC.

<img src={useBaseUrl("img/metamask/select-network.png")} />

It will open up a form with 2 tabs on the top, Settings and Info. In the Settings tab you can add `Matic Mumbai` in the Network Name field, URL `https://rpc-mumbai.maticvigil.com/` in the New RPC URL field, `80001` in Chain ID field, `MATIC` in Currency Symbol field and `https://mumbai.polygonscan.com/` in Block Explorer URL field.

<img src={useBaseUrl("img/metamask/metamask-settings-mumbai.png")} />

Once you’ve added the URL in the New Network field, click on Save. You will be directly switched to Polygon’s Mumbai-Testnet now in the network dropdown list. You can now close the dialog.
</TabItem>

<TabItem value="mainnet">
To add Polygon’s Mainnet, click on the Network selection dropdown and then click on Custom RPC.

<img src={useBaseUrl("img/metamask/select-network.png")} />

It will open up a form with 2 tabs on the top, Settings and Info. In the Settings tab you can add `Polygon Mainnet` in the Network Name field, URL `https://polygon-rpc.com/` in the New RPC URL field, `137` in Chain ID field, `MATIC` in Currency Symbol field and `https://polygonscan.com/` in Block Explorer URL field.

<img src={useBaseUrl("img/metamask/metamask-settings-mainnet.png")} />

Once you’ve added the information click on Save. You will be directly switched to Polygon’s Mainnet now in the network dropdown list. You can now close the dialog.
</TabItem>
</Tabs>

**You have successfully added Polygon Network to your Metamask!**
