---
id: getting-started
title: Developing on Polygon PoS
sidebar_label: Quick Start
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

:::caution Updating the Develop Docs

The docs are being updated, enhanced, and improved. They are subject to change. Please feel free to raise an issue or pull request if you have any queries or suggestions.

:::

Welcome to the most exciting and innovative platform to build your blockchain application on **Polygon Blockchain**. Blockchain technology is poised to revolutionise the way the digital world handles data and does business. Be a part of this revolution and get a head start with decentralised application development on Polygon.

This page will act as your guide into the **Polygon Ecosystem**. You'll find links to some useful resources and websites to get you up and started with building on Polygon in particular and Blockchain in general. Feel free to reach out to us on Telegram/Discord.

## **Developer Quick Start**

If you're an Ethereum Developer, you're already a Polygon developer. All the tools you're familiar with are supported on Polygon out of the box: Truffle, Remix, Web3js. Switch over to Polygon's RPC and get started!

Polygon's Test Network which is called **Mumbai** connects with **Ethereum's Goërli Testnet.** All the network related details can be found in [network docs](/docs/operate/network).

- Set up [Metamask Wallet](/docs/develop/metamask/overview) or [Arkane Wallet](/docs/develop/wallets/arkane/intro)
- Deploy your Contracts on Polygon
    - [Using Alchemy](/docs/develop/alchemy)
    - [Using Chainstack](/docs/develop/chainstack)
    - [Using QuickNode](/docs/develop/quicknode)
    - [Using Remix](/docs/develop/remix)
    - [Using Truffle](/docs/develop/truffle)
    - [Using Hardhat](/docs/develop/hardhat)
    - [Using Replit](/docs/develop/replit)
- Connecting to Polygon [with RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask) by adding Polygon on MetaMask or directly via [Arkane](/docs/develop/wallets/arkane/network).

:::note
You can use the same RPC with web3.js.
:::

```jsx
// Javascript
const Web3 = require('Web3')

// Sign up for a free dedicated RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.
const web3 = new Web3('https://rpc-mumbai.matic.today')

// Sign up for a free dedicated RPC URL at https://www.alchemy.com or other hosted node providers.
const web3 = new Web3('https://polygon-mainnet.g.alchemy.com/v2/<your-api-key>')

// web3 object is now connected with Polygon's node
```

---

### **Already have a dApp?**

- **Migrating from Ethereum chain (or any EVM based chain for that matter)**

    Deploy all your smart contracts directly on Polygon chain. You don't have to worry about the underlying architecture, as long as it is EVM compatible!

    [Deploying your dApp on Polygon](https://docs.polygon.technology/docs/integrate/quickstart)

- **Using Polygon as a faster transactions layer**

    Using Polygon as a transactions layer in your dApp deployed on Mainnet, you can get started with getting your tokens mapped by us.

    Getting your tokens mapped on Polygon: 👋🏼 Ping us on [http://bit.ly/matic-technical-group](http://bit.ly/matic-technical-group)

### **Building a new dApp on Polygon?**

**Start building!**

- [Full Stack dApp: Tutorial Series](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- Getting to know your tools:

    - [Web3js](https://www.dappuniversity.com/articles/web3-js-intro), [Ethers.js](https://docs.ethers.io/v5/),[Remix](https://docs.polygon.technology/docs/develop/remix/), [Truffle](https://docs.polygon.technology/docs/develop/truffle), [Metamask](/docs/develop/metamask/overview), [Arkane](/docs/develop/wallets/arkane/intro)
- [Develop a dApp using Fauna, Polygon and React](/docs/develop/dapp-fauna-polygon-react)
- [Integrating Webhooks](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api/using-notify)
- [Archive Nodes with Debug namespace](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)

**Advanced**

- [Sidechains and Plasma](https://docs.polygon.technology/docs/home/blockchain-basics/sidechain)
- [Polygon's architecture and Security](https://docs.polygon.technology/docs/home/architecture/security-models)
- [When to use Plasma](https://docs.polygon.technology/docs/home/architecture/security-models)
- [Moving assets from Mainchain to Polygon chain: the Plasma way](/docs/develop/ethereum-polygon/matic-js/get-started.md)
- [Swapping Plasma Assets](https://docs.polygon.technology/docs/develop/advanced/swap-assets)

**Other links**

- [Video Tutorials Library](https://www.notion.so/Video-Tutorials-Library-f16cbb8c3d9d47d8bc809e06519f110c)
- [Writings by the Team](https://www.notion.so/Writings-by-the-Team-c979819406894abb964cb50ae197f376)
- [Matic Tools](https://www.notion.so/f5739c3ed3cc40e3ae71d5935a72143d)
- [FAQs](https://docs.polygon.technology/docs/faq/technical-faqs)

### **Learn the developer tools**

- [CryptoZombies](https://cryptozombies.io/)
- [Full stack dapp tutorial series](https://kauri.io/#collections/Full%20Stack%20dApp%20Tutorial%20Series/full-stack-dapp-tutorial-series-intro/)
- [Alchemy (Blockchain APIs and Developer Tools)](https://alchemy.com/?a=polygon-docs)
- [QuickNode (Multi-chain Blockchain infrastructure)](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)
- [Infura Docs](https://infura.io/docs)
- [Getting Started with Infura and Polygon](https://docs.infura.io/infura/networks/polygon-pos/tutorials/send-a-transaction)
- [Truffle Suite Docs](https://www.trufflesuite.com/docs) (Recommended)
- [Truffle tutorial](https://www.trufflesuite.com/tutorial) (Recommended)
- [Parity Wiki](https://openethereum.github.io/)
- [Geth docs](https://geth.ethereum.org/)
- [Remix](https://remix.ethereum.org/)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- [Ethernaut](https://ethernaut.openzeppelin.com/)
    - A game that teaches security
- [Capture the Ether](https://capturetheether.com/)
    - A game that teaches security

### **Learn the Basics of Development**

- [Full stack dapp tutorial series](https://kauri.io/#collections/Full%20Stack%20dApp%20Tutorial%20Series/full-stack-dapp-tutorial-series-intro/)
- [Web3 developer Stack](https://www.quicknode.com/guides/web3-sdks/the-web3-developer-stack)
- [Deploy a smart contract using REMIX IDE](https://www.quicknode.com/guides/solidity/how-to-deploy-a-smart-contract-on-matic-polygon)
- [How to create a token (ERC20)](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token)
- [Integrating IPFS with Ethereum](https://www.quicknode.com/guides/web3-sdks/how-to-integrate-ipfs-with-ethereum)
- [Hello World Smart Contract](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract)
- [How to Create an NFT](https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft)
- [Truffle tutorial](https://www.trufflesuite.com/tutorial)
- [Dapp University](https://www.youtube.com/channel/UCY0xL8V6NzzFcwzHCgB8orQ)
- [ConsenSys Academy Developer Program On-Demand course](https://consensys.net/academy/ondemand/)
- [What is Ethereum?](https://blockgeeks.com/guides/ethereum/)
- [Read Mastering Ethereum](https://github.com/ethereumbook/ethereumbook)
- [OpenZeppelin Learn Docs](https://docs.openzeppelin.com/learn/)

### **Get Involved with Hackathons**

Hackathons take place at blockchain conferences and meetups all over the world. Chances are you can’t hop on a plane on a moment’s notice, but some conferences or projects host virtual hackathons open to anyone with an internet connection. Check [Polygon's Hackathons Discord Channel](https://discord.com/invite/0xPolygon)

# **Keeping Up with Development**

### **Social Media**

Dapp development encourages network decentralization, and it also embodies it. Developers are located everywhere in the world! As such, social media has become important to keep people in touch across time zones. Besides the popular platforms, you may be less familiar with platforms such as Telegram, Discord and Gitter.

Reddit:

- https://reddit.com/r/0xPolygon
- https://reddit.com/r/ethereum
- https://reddit.com/r/ethdev
- https://reddit.com/r/ethereumnoobies

Twitter:

- [Bankless: How to Use Crypto Twitter](https://bankless.substack.com/p/how-to-use-crypto-twitter-to-level-77c)
- [EthHub](https://twitter.com/ethhub_io)
- [QuickNode](https://twitter.com/QuickNode)
- [Alchemy](https://twitter.com/AlchemyPlatform)
- [CodeFi](https://twitter.com/ConsenSysCodefi)
- [ConsenSys Labs](https://twitter.com/ConsenSys)
- [Universal Login](https://twitter.com/unilogin)
- [MetaCartle](https://twitter.com/meta_cartel)
- [Ethereum Foundation](https://twitter.com/ethereum)
- [DAI Dao](https://twitter.com/rDAI_dao)
- [ETHGlobal](https://twitter.com/ETHGlobal)
- [MakerDao](https://twitter.com/MakerDAO)
- [DeFi Pulse](https://twitter.com/defipulse)
- [DeFi Prime](https://twitter.com/defiprime)
- [Uniswap](https://twitter.com/UniswapExchange)
- [Compound](https://twitter.com/compoundfinance)
- [Gnosis](https://twitter.com/gnosisPM)
- [Nexus Mutual](https://twitter.com/NexusMutual)
- [Argent](https://twitter.com/argentHQ)
- [The Token Analyst](https://twitter.com/thetokenanalyst)
- [EF Devcon account](https://twitter.com/EFDevcon)
- [Status](https://twitter.com/ethstatus?lang=en)
- [OpenZeppelin](https://twitter.com/openzeppelin)

### **Newsletters**

- [Week In Ethereum](https://weekinethereumnews.com/)
- [QuickNode: #Web3Vibes](https://www.getrevue.co/profile/quiknode)
- [Alchemy: Supercharged](https://www.alchemy.com/newsletter)
- [EthHub](https://ethhub.io/)
- [Chain Letter](https://forms.technologyreview.com/chain-letter/)
- [ConsenSys Newsletter Digest](https://share.hsforms.com/1HiFwsb55S5GUf-EOe0KP8Q2urwb?email=)

### **Podcasts**

- [Zero Knowledge](https://www.zeroknowledge.fm/)
- [Into the Ether](https://ethhub.substack.com/)
- [Unconfirmed](https://unconfirmed.libsyn.com/)
- [Epicenter](https://epicenter.tv/)
- [11:FS Blockchain Insider](https://bi.11fs.com/)

## Pointers

If this is overwhelming, that’s okay! You can jump right into the fire and start hacking. Here are a few pointers before you start diving into resources, repositories, and documentation.

1. **Beware the cost of being on the bleeding edge** More so than typical niche programming, dapp and blockchain development moves very quickly. Deep into learning, you may find complex code repositories, 404s on a documentation site, or, perhaps, no documentation at all. Rather than seeing this as a deterrent, see it as an invitation to a **Opportunity**. Ping on our developer channel, find the Discord / Gitter / Telegram channel, post on Stack Overflow or Reddit — you may be surprised at the rate of response and openness of the community.
2. **The learning curve may be daunting, but the barrier to entry is low**. All communities have their grumps, of course, but if you do the work, put in the effort, it will be noticed. Projects welcome pull requests from outsiders and support will be there if you’ve exhausted every other resource. We’re working on creating a better world and can use all the help we can get. We’re just glad you’re here.
