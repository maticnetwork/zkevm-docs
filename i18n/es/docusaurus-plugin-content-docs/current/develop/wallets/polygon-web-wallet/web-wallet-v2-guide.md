---
id: web-wallet-v2-guide
title: Web Wallet Usage Guide
description: Learn how to use the Polygon Web Wallet.
keywords:
  - wallet
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

We have revamped the Polygon Web wallet interface, which has some great UX fixes, a streamlined deposit and withdrawal process, a superior deposit and withdraw tracking module, and notifications on the application to see the status properly.

## Logging into the Polygon Web Wallet

On how to connect to Polygon to Metamask, please refer this [guide](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/) To login to the Polygon Web Wallet you need to access the following URL: https://wallet.polygon.technology/. To login to the testnet version of Polygon Web Wallet, you need to access the following URL: https://wallet-dev.polygon.technology/. How to connect to Polygon to Metamask, please refer this [guide](hhttps://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/)

Once you connect your account with the Web Wallet you will be taken to the landing page with various means on how to transact with the wallet web depending on your use case. We have the Polygon Wallet, perfect for sending, receiving and storing your assets on the Polygon network, the Polygon Bridge, for withdrawals and deposits across networks. Polygon Staking - your go-to place for staking and getting rewards with your $MATIC, and the Widget Dashboard.

<img src={useBaseUrl("img/wallet/wallet-landing-page.png")} width="100%" height="100%" />

Click on the Polygon Wallet or Polygon Bridge, and you will see all your token balances on the Polygon Wallet across the bridges(PoS and Plasma). You don’t need to toggle between bridges which was available in V1.<!-- <img src={useBaseUrl("img/wallet/wallet-one.png")} width="100%" height="100%" /> -->## Depositing Funds from Ethereum to Polygon

Click on the ‘Move Funds to Polygon Mainnet’ button or you can click on the ‘Deposit’ link from any of the token types on ‘Your tokens on Polygon Mainnet’ section. <img src={useBaseUrl("img/wallet/Wallet-two.png")} width="100%" height="100%" />

You will be redirected to the bridge page where you need to enter the deposit amount. <img src={useBaseUrl("img/wallet/Wallet-13.png")} width="100%" height="100%" />

You can see the selected bridge type on “Transfer Mode”. You can change the “Transfer Mode” if you want deposit your funds on particular bridge type(PoS or Plasma)
> Transfer mode will be enabled based on the token chosen

Once you have added the amount that you want to deposit and selected the Bridge type, you can then click on the “Transfer” button.

After you click on the “Transfer” button, you need to click on the “continue” button on “Important (Deposit Disclaimer)” popup.

<img src={useBaseUrl("img/wallet/Wallet-5.png")} width="50%" height="50%" />

Once you click “Continue” from “Important” popup, you will see a “Transfer Overview” popup with the information of Estimation of total gas required for the transaction

<img src={useBaseUrl("img/wallet/Wallet-6.png")} width="50%" height="50%" />

Click on the “Continue” button from “Transfer Overview” popup and you will see a popup opening, similar to the previous one where you can review your transaction details.

<img src={useBaseUrl("img/wallet/Wallet-7.png")} width="50%" height="50%" />

Click on the “Continue” button from “Confirm Transfer” popup.

After you click on the “Continue” button, you need to confirm all your transactions in your MetaMask to make the transaction successful

Once you confirm the transaction, you will see a “Transfer in Progress” popup which will show you the Deposit status. It will take ~7-8 minutes for the tokens to show up on Polygon.

<img src={useBaseUrl("img/wallet/Wallet-8.png")} width="50%" height="50%" />

You can close the “Transfer in Progress” popup and you can see the transaction in the “Action required” section on the header component. Click on the “Action Required” link from the header.

You can see the details on the transaction itself. Click on the latest transaction to see the “Transfer In progress” popup. Once Deposit transaction status is successful, status of the transaction changes to “Success”
> Note: You can view the successful transactions after “Transfer in Progress/Action required” transactions on the popup.
> Note: You can view the successful transactions after “Transfer in Progress/Action required” transactions in the “Action Required” popup. Click on the Deposit success transaction to see the “Transfer Completed” popup.

<img src={useBaseUrl("img/wallet/Wallet-11.png")} width="50%" height="50%" />

Please watch the following video for a tutorial on deposits:

<video loop autoplay width="70%" height="70%" controls="true">
  <source type="video/mp4" src="/img/wallet/depositMatic.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>

## Withdrawing Funds from Polygon Back to Ethereum on PoS Bridge

Withdrawing funds from Polygon back to the Ethereum mainnet via,

PoS Bridge is a simple 2-step process. For the funds to be available back on Ethereum it will take ~3 hours.

To withdraw funds, click on the ‘Withdraw’ link from any of the PoS token on ‘Your tokens on Polygon Mainnet’ section.

<img src={useBaseUrl("img/wallet/wallet-withdraw.png")} width="100%" height="100%" />

You will be redirected to the bridge page where you need to enter the Withdraw amount.

<img src={useBaseUrl("img/wallet/Wallet-13.png")} width="100%" height="100%" />
> Note: Transfer mode will be enabled based on the token chosen

Once you have added the amount that you want to Withdraw and selected the Bridge type, you can then click on the “Transfer” button.

After you click on the “Transfer” button, you need to click on the “continue” button on “Important(Withdraw Disclaimer)” popup.

<img src={useBaseUrl("img/wallet/Wallet-14.png")} width="50%" height="50%" />

Once you click “Continue” from “Important” popup, you will see a “Transfer Overview” popup with the information of Estimation of total gas required for the transaction.

<img src={useBaseUrl("img/wallet/Wallet-15.png")} width="50%" height="50%" />

Click on the “Continue” button from “Transfer Overview” popup and you will see a popup opening, similar to the previous one where you can review your transaction details.

<img src={useBaseUrl("img/wallet/Wallet-16.png")}  width="50%" height="50%" />

Click on the “Continue” button from “Confirm Transfer” popup. After you click on the “Continue” button, you need to confirm the transaction in your MetaMask to make the transaction successful. Once the transaction is approved, you will see a popup on your screen like this,

<img src={useBaseUrl("img/wallet/Wallet-17.png")} width="50%" height="50%" />

The first transaction is to initiate your withdrawal. You can close the “Transfer in Progress” popup. And you can see the transaction in the “Action required” section on the header component. Click on the “Action Required” link from the header.

You can see the details on the transaction itself. You need to wait for the checkpoint to arrive. This could take upto ~3 hours to complete. Once the checkpoint is arrived it should change the status to “Action Required”. Click on the latest transaction that you have initiated to withdraw to see the “Transfer In progress” popup.

<img src={useBaseUrl("img/wallet/Wallet-19.png")} width="50%" height="50%" />

You will need to confirm the second transaction. Once you have confirmed the second transaction, you will receive your funds back on Ethereum.
> Note: You can view the successful transactions after “Transfer in Progress/Action required” transactions in the “Action Required” popup.

Please watch the following video for a tutorial on withdrawals:

<video loop autoplay width="70%" height="70%" controls="true">
  <source type="video/mp4" src="/img/wallet/WithdrawMatic.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>

## Withdrawing Funds from Polygon Back to Ethereum on Plasma Bridge

Withdrawing funds from Polygon back to the Ethereum mainnet via, Plasma Bridge is a 3-step process but with a caveat.

To withdraw funds, click on the ‘Withdraw’ link from any of the Plasma token type on ‘Your tokens on Polygon Mainnet’ section.

<img src={useBaseUrl("img/wallet/wallet-withdraw.png")} width="100%" height="100%" />

You will be redirected to the bridge page where you need to enter the Withdraw amount.

<img src={useBaseUrl("img/wallet/Wallet-33.png")} width="100%" height="100%" />

Once you have added the amount that you want to Withdraw and you can then click on the “Transfer” button. After you click on the “Transfer” button, you need to click on the “continue” button on “Important(Withdraw Disclaimer)” popup.

<img src={useBaseUrl("img/wallet/Wallet-24.png")} width="50%" height="50%" />

Once you click “Continue” from “Important” popup, you will see a “Transfer Overview” popup with the information of Estimation of total gas required for the transaction.

<img src={useBaseUrl("img/wallet/Wallet-25.png")} width="50%" height="50%" />

Click on the “Continue” button from “Transfer Overview” popup and you will see a popup opening, similar to the previous one where you can review your transaction details.

<img src={useBaseUrl("img/wallet/Wallet-26.png")} width="50%" height="50%" />

Click on the “Continue” button from “Confirm Transfer” popup.

After you click on the “Continue” button, you need to confirm all your transactions on your MetaMask wallet to make the transaction successful.This will be the first of 3 transactions that will need to be completed. Once the transaction is approved, you will see a popup on your screen like this,<!-- <img src={useBaseUrl("img/wallet/Wallet-27.png")} width="50%" height="50%" /> -->The first transaction is to initiate your withdrawal. Once the Withdraw transaction is initiated, you need to wait for the checkpoint to arrive. This could take upto ~3 hours to complete. You can close the “Transfer in Progress” popup. And you can see the transaction in the “Action required” section on the header component. Click on the “Action Required” link from the header.

You can see the details on the transaction itself. Once the checkpoint is arrived it should change the status to “Action Required”. Click on the latest transaction that you have initiated to withdraw to see the “Transfer In progress” popup.<!-- <img src={useBaseUrl("img/wallet/Wallet-29.png")} width="50%" height="50%" /> -->To get funds back to Ethereum you will need to confirm one last time. Once you have confirmed all these transactions, you will receive your funds back on Ethereum.<!-- <img src={useBaseUrl("img/wallet/Wallet-31.png")} width="50%" height="50%" /> -->> Note: You can view the successful transactions after “Transfer in Progress/Action required” transactions in the “Action Required” popup.
> Note: In case you have any queries, feel free to raise a ticket here https://support.polygon.technology/support/home

