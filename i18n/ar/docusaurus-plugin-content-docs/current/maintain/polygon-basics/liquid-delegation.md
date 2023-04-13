---
id: liquid-delegation
title: Liquid Delegation
sidebar_label: Liquid Delegation
description: "How Polygon uses liquid delegation to maintain the network."
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://matic.network/banners/matic-network-16x9.png
---

In a traditional Proof of Stake mechanism, the blockchain keeps track of a set of validators, And anyone can join this rank or right to validate transactions by sending a special type of transaction which stake their coins(in Ethereum's case, ether) and locks up into a deposit. The process of creating and agreeing to new blocks is then done through a consensus algorithm by all current validators.

They lock up part of their stake for a certain amount of time (like a security deposit), and in return they get a chance proportional to that stake to select the next block

Incentives for participants are Staking rewards — and the possibility of slashing — which encourages token holders and validators to secure PoS blockchain. Staking creates the “skin in the game” necessary for good behaviour such as running nodes in the network and discouraging bad behaviours like failing to remain online or double signing.

### Delegation and need for it

Staking can be expensive and makes barrier of entry higher and in which case it promotes rich getting richer. We want everyone to participate in network security and get token appreciation. The only alternative is to participate in staking pool like mining pool in which you need to trust validators. That's why we think that keeping delegation in protocol is best way to go for new delegators. Since capital, rewards and slashing is protected and open via in-protocol mech.

Delegator's can participate in validation without hosting a full node. But by staking with validators, they can earn reward and strengthen the network by paying a small commission fee(depends on Validator) to a validator of their choice.

### Limitation of Traditional Delegator and Validator pov

Capital lockup cost for both validators and delegators is high due to Proof of Stake protocol design.

Still we can bring more liquidity view mechanism like validator NFT[link to our blog] where any new party who wants to become a validator can buy validator NFT from a validator who wants to exit from system for some reason.

In case of delegators the amount locked is assumed to be in smaller chunks so we want that to be liquid so that participation is more active(i.e. if some delegator thinks that right now opportunities are great in defi but her capital is locked in staking pool even for withdrawal she needs to wait for 21 days)

> Locking up X ether in a deposit is not free; it entails a sacrifice of optionality for the ether holder. Right now, if I have 1000 ether, I can do whatever I want with it; if I lock it up in a deposit, then it's stuck there for months

> In order to prevent attacks like [nothing at stake](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed) and punish validators for their bad participation.

### In protocol vs application layer

> we have both option and why in-protocol is better

> Protocol level staking liquidation needs to have a significant stake(primarily validator's) illiquid

> otherwise there is chance that it might suffer from tragedy of commons(let's say at max anyone owns 5% of pool then no one will take responsibility to run the node)

Application level staking liquidation has trust problem, Protocol level staking liquidation is much more appreciated due to the fact that any new actor can trust it(which attracts more capital, even from smaller actors/delegators)

### Polygon's Solution for Delegation

While exploring delegation we realised that delegation needs to be in-protocol in order to have more trust from delegators.

We were facing similar issue to validators capital liquidity and thought of making it a NFT which can be transfers and exploring on similar thoughts like how it can be made more liquid and sikka-chorus.one 's   awesome design 🙏 [https://blog.chorus.one/delegation-vouchers/](https://blog.chorus.one/delegation-vouchers/)  came to attention.

Thinking in terms of making is share of validator pool is great idea and since Polygon's staking is implemented on ethereum smart contract it opens up a lot more options for us like making it ERC20 compatible so that it can be used in defi protocols.

As of now each validator has their own VMatic(i.e. for validator Ashish there will be AMatic token)

because each validator has different performance(rewards/slashing and commission rate).

Delegators can buy multiple validator share and hedge their risk towards slashing or poor performance of particular validator.

### Advantages

- Since our design follows ERC20 like interface in delegation implementation Defi applications can be build on top of it easily.
- Delegated tokens can be used in lending protocols.
- Delegators can hedge their risk via prediction markets like Auger.

Future scope:

- Currently ERC20 are not fungible with other validators ERC20/Share tokens? but in future we think many new Defi applications can build upon it and make some markets for it or even some better products like
- With [chorus.one](http://chorus.one) initiated research we are also exploring problems like validators shorting their own tokens and other problems.( shorting problems can be avoided via things like validator locking their own stake for x months and other things like validator insurance(on-chain) which will bring more trust for delegators).
- Delegator voting rights in order to participate in governance decisions
- While making delegation liquid we also want to make sure network security and that's why in some form slash-able capital is locked in case of fraud activity.

More on technical design[link to technical spec] published on stack.matic or in separate blog.

Given above design available in-protocol, validators can always implement their own similar mechanisms and stake via a contract which won't be available in Polygon staking UI.

—

linked directly to primary assets

### Future Goals

Things like interchain/cross-chain and all via cosmos hub and everett B-harvest design.

### **:scroll:Resources**

- [Vitalik's pos design](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Intro to Staking Derivatives](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [Staking Pools](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [Inflation in Proof of Stake](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
