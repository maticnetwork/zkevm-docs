---
id: submit-mapping-request
title: Mapping Request
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Mapping is necessary in order to transfer your assets to and from the Ethereum and Polygon. We offer two bridges to do the same. More details on the bridge can be understood from [here](/docs/develop/ethereum-polygon/getting-started).

### Steps to submit a mapping request

The mapping request has to be submitted on [https://mapper.polygon.technology/](https://mapper.polygon.technology/). You can then click on the "Map New Token" button on the top right corner to create a new mapping request.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />


- The type of [bridge](/docs/develop/ethereum-polygon/getting-started) has to be selected from the **"Choose map type"** dropdown.
- The type of your token can be selected by switching among the three tabs marked as "ERC20", "ERC721" and "ERC1155". For mapping any other token standard, you can reach out to the Polygon team on [Discord](https://discord.com/invite/XvpHAxZ) or create a ticket [here](https://support.polygon.technology/support/home) and keep "Token Mapping" in the ticket title.
- **"Choose network"** will let you select the network on which you need the mapping to be done. For mainnet mappings you can choose **Ethereum - Polygon Mainnet**  and for testnet mappings you can choose **Goerli Testnet - Mumbai**.
- Enter your Ethereum/Goerli token address in the  **"Ethereum token address"** field. Ensure that your token contract code is verified on the [Ethereum](https://etherscan.io/)/[Goerli](https://goerli.etherscan.io/) blockchain explorers.
- In case you need a standard ERC20/ERC721/ERC1155 child token, you may leave the **"Polygon token address"** field empty. But, if you need a custom child token ( standard ERC functions + custom functions ), you can follow this [guide](/docs/develop/ethereum-polygon/pos/mapping-assets) to create a custom child token. Once you deploy your custom child token, you can mention the contract address in the **"Polygon token address"** field. Please ensure that you verify your child token contract code too on [Polygon](https://polygonscan.com/)/[Mumbai](https://mumbai.polygonscan.com/) explorer.
- If your root token is verified, the **name**, **symbol** and **decimals** fields will be automatically filled for you and these fields cannot be edited.
- You may choose either **"Polygon Mintable"** or a **"Non Polygon Mintable"** token from the drop down. More details on the Polygon Mintable tokens can be found [here](/docs/develop/ethereum-polygon/mintable-assets).
- It is mandatory to mention your email for communication.

In  case of a custom child mapping, there is a checklist that you need to finish before you submit the mapping request. Tokens that already exist on Ethereum and have to be moved on to the Polygon chain can be called as "Non Polygon-Mintable" tokens and the tokens which are going to be minted on Polygon first and then moved to Ethereum can be called as "Polygon Mintable" tokens. Lets look at the check list for both these types

### Mapping checklist

**Non Polygon-Mintable**

1. The deposit and withdraw functions are present on the child token contract. (Reference Template contract - [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508), [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238), [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818))
2. Only the ChildChainManagerProxy address has the right to call the deposit function. (ChildChainManagerProxy - on [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) , on [Polygon Mainnet](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/) )
3. Mint function is an internal function ( This gets called by deposit function internally )

**Polygon Mintable ( guide -** [https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets) )

1. The deposit and withdraw function is present in the child token contract. (Reference Template contract - [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildMintableERC20.sol#L1492-#L1519), [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildMintableERC721.sol#L2160-#L2275), [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildMintableERC1155.sol#L1784-#L1851))
2. Only the ChildChainManagerProxy address has the right to call the deposit function. (ChildChainManagerProxy - on [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) , on [Polygon Mainnet](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/) )
3. The root chain contract is a standard [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/DummyMintableERC20.sol#L1481)/[ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/DummyMintableERC721.sol#L2169)/[ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/DummyMintableERC1155.sol#L1785)
4.  The mint function on the root contract can only be called by the corresponding token, PredicateProxyAddress (PredicateProxy addresses for each token type can be found [here](/docs/develop/ethereum-polygon/mintable-assets#contract-to-be-deployed-on-ethereum).
