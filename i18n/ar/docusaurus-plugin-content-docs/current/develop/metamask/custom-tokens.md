---
id: custom-tokens
title: Config Custom Tokens
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page demonstrates the process of configuring/adding custom tokens to Metamask. Specifically, we have demonstrated adding the example `TEST` ERC20 and ERC721 tokens to the Görli testnet as well as the Polygon testnet, Mumbai.

You can use this process to add any custom ERC20 tokens to any network on Metamask.

**Adding the `TEST` token (ERC20) to your MetaMask account on the Görli Network**

To display `TEST` tokens on your account on the Görli Network, you can click on the Add Tokens option in Metamask. It will then navigate you to a screen. You then click on Custom Token tab and copy-paste the address below in the Token Address field.

The `TEST` token contract address on Görli is `0x3f152B63Ec5CA5831061B2DccFb29a874C317502`. Note that the `TEST` token is an example ERC20 token contract that is used throughout Polygon developer docs for illustration purposes.

The other fields will auto-populate. Click on Save and then click on Add Tokens. The `TEST` token should now be displayed on your account on Metamask.

**Configuring `Matic TST` tokens to Metamask**

You will also need to configure the `TST` tokens to Polygon’s Testnet for visualization if you are following the introductory Matic.js tutorial. **Switch the network on MetaMask to point to the Polygon testnet - https://rpc-mumbai.matic.today **. On Metamask, this will be shown as `Private Network` or whatever you have named it when adding the custom rpc eg. `mumbai`.

The corresponding `TST` token address on Polygon testnet is `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e`. Note that this token contract address is different from that of Goerli - since this is the `TST` token on the Polygon Network. A detailed, screen-by-screen guide to add custom tokens is shown here:

You can open MetaMask and then click on the option for Add Token.

<img src={useBaseUrl("img/metamask/configure-custom-token-1.png")} />

You will see a screen to either search from a list of already available tokens or add a custom token. Click on Custom Token.

You will see a field to add the Token Address. Paste the token address in the form, and configure the token name as `TST`.

<img src={useBaseUrl("img/metamask/configure-custom-token-2.png")} />

You can then click on Next.

<img src={useBaseUrl("img/metamask/configure-custom-token-3.png")} />

And then click on Add Tokens. You will be navigated back to the home screen and the new token will be displayed in the token list.

**Adding the `ERC721-TESTV4` token (ERC721) to your MetaMask account on the Görli Network**

To display `ERC721-TESTV4` tokens on your account on the Görli Network, you can click on the Add Tokens option in Metamask. It will then navigate you to a screen. You then click on Custom Token tab and copy-paste the address below in the Token Address field.

The `ERC721-TESTV4` token contract address on Görli is `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b`. Note that the `ERC721-TESTV4` token is an example ERC721 token contract.

The token symbol is `ERC721-Testv4` and token of precision is `18`. Click on Add Tokens. The `ERC721-TESTV4` token should now be displayed on your account on Metamask.

**Adding the `ERC721-TESTV4` token (ERC721) to your MetaMask account on the Mumbai Network**

**Switch the network on MetaMask to point to the Polygon testnet - https://rpc-mumbai.matic.today **. On Metamask, this will be shown as `Private Network` or whatever you have named it when adding the custom rpc eg. `mumbai`.

To display `ERC721-TESTV4` tokens on your account on the Mumbai Network, you can click on the Add Tokens option in Metamask. It will then navigate you to a screen. You then click on Custom Token tab and copy-paste the address below in the Token Address field.

The `ERC721-TESTV4` token contract address on Mumbai is `0x33FC58F12A56280503b04AC7911D1EceEBcE179c`. Note that the `ERC721-TESTV4` token is an example ERC721 token contract.

The token symbol is `ERC721-Testv4` and token of precision is `18`. Click on Add Tokens. The `ERC721-TESTV4` token should now be displayed on your account on Metamask.

**Adding a test ERC1155 token to your MetaMask account**

While the Polygon network supports ERC1155, [Metamask does not yet support the standard](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). This update is expected in the fourth quarter of 2021.
