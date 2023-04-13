---
id: getting-started
title: PoS Bridge
sidebar_label: Introduction
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Please check the latest [Matic.js documentation on PoS](../matic-js/get-started.md) to get started.

A bridge is basically a set of contracts that help in moving assets from the root chain to the child chain. There are primarily two bridges to move assets between Ethereum and Polygon. First one is the Plasma bridge and the second one is called the **PoS Bridge** or **Proof of Stake bridge**. **Plasma bridge** provides an increased security guarantee due to the Plasma exit mechanism.

However, there are certain restrictions on the child token and there is a 7-day withdrawal period associated with all exits/withdraws from Polygon to Ethereum on the Plasma bridge.

This is quite painful for those DApps/users who need some **flexibility** and **faster withdrawals**, and are happy with the level of security provided by the Polygon Proof-of-Stake bridge, secured by a robust set of external validators.

Proof of stake based assets provides PoS security and faster exit with one checkpoint interval.

## Steps to use the PoS Bridge

Before we enter into this section of the docs, it may help to have a thorough understanding of these terms as you'll interact with them while trying to use the bridge. [Mapping](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) and the [State Sync Mechanism](https://docs.polygon.technology/docs/pos/state-sync/state-sync/)

Done with those links? Let's continue to a high level overview of the flow then.

- The first step to using the PoS bridge is mapping the **Root Token** and **Child Token**. Don't worry, this isn't anything complex. It just means that the token contract on the root chain and the token contract on the child chain have to maintain a connection (called mapping) to transfer assets between themselves. If you're interested in submitting a mapping request, please do that [here](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

At a lower level and with more detail, this is what happens

### Deposit

- The owner of the asset token approves the Predicate Contract to lock down the amount of tokens to be deposited. Once this approval transaction has confirmed, the owner of the asset token interacts with the **RootChainManager** contract to complete the deposit.

- Next up, the asset is deposited with the **State Sync Mechanism**. if you didn't get a run-through of what the State Sync Mechanism is, it's in its simplest form the native mechanism to send data from Ethereum Network to the Polygon Network. The inner workings of the mechanism itself comprises of a function call that is made of the **RootChainManager** which triggers the **ChildChainManager** contract.

Want to see this in video format? Please check it out below

<video loop autoplay width="70%" height="70%" controls="true">
  <source type="video/mp4" src="/img/matic-to-eth/deposit-eth-matic.mp4"></source>
  <p>Your browser does not support the video element.</p>
</video>

### Withdrawals

- Withdrawing assets is a breeze with the PoS bridge. It's as simple as burning the asset tokens on the Polygon chain, collecting the transaction hash of this burn transaction, and submitting it to the **RootChainManager**. The **RootChainManager** then calls for the predicate contract to release the funds that were locked on the Ethereum chain.

- Once the burn transaction is validated on the Polygon chain, it takes 30 minutes to 3 Hours for this burn transaction to be checkpointed. Checkpointing is the process of merging the Polygon transactions into the Ethereum blockchain.

- Next up, the proof of this burn transaction is submitted to the **RootChainManager** by calling the exit function. This function call takes in the burnHash for verifying the checkpoint inclusion and only then triggers the Predicate Contract which unlocks and releases the funds that were deposited.

Want to watch all of this in video form? Please check it out below

- Once mapping is done, you can either use the **matic.js SDK** to interact with the contracts or you can do the same without the SDK. However, the matic.js SDK is designed in a very user friendly way to make the asset transfer mechanism very easy to integrate with any application.

- **The complete cycle of transferring assets from Ethereum to Polygon and then back to Ethereum** will be explained through this tutorial. In short, the process can be summed up as mentioned below:

  1. Owner of the asset **(ERC20/ERC721/ERC1155)** token has to approve a specific contract on the PoS bridge to spend the amount of tokens to be transferred. This specific contract is called the **Predicate Contract** (deployed on the Ethereum network) which actually **locks the amount of tokens to be deposited**.
  2. Once the approval is given, the next step is to **deposit the asset**. A function call has to be made on the **RootChainManager** contract which in turn triggers the **ChildChainManager** contract on the Polygon chain.
  3. This happens through a state sync mechanism which can be understood in detail from [here](https://docs.polygon.technology/docs/pos/state-sync/state-sync/).
  4. The **ChildChainManager** internally calls the **deposit** function of the child token contract and the corresponding amount of asset tokens are **minted to the users account**. It is important to note that only the ChildChainManager can access the deposit function on the child token contract.
  5. Once the user gets the tokens, they can be **transfered almost instantly with negligible fees on the Polygon chain**.
  6. Withdrawing assets back to Ethereum is a 2 step process in which the asset tokens has to be **first burnt on the Polygon chain** and then the **proof of this burn transaction has to be submitted** on the Ethereum chain.
  7. It takes about 20 mins to 3 hours for the burn transaction to be checkpointed into the Ethereum chain. This is done by the Proof of Stake validators.
  8. Once the transaction has been added to the check point, a proof of the burn transaction can be submitted on the **RootChainManager** contract on Ethereum by calling the **exit** function.
  9. This function call **verifies the checkpoint inclusion** and then triggers the Predicate contract which had locked the asset tokens when the assets were deposited initially.
  10. As the final step, the **predicate contract releases the locked tokens** and refunds it to the Users account on Ethereum.
