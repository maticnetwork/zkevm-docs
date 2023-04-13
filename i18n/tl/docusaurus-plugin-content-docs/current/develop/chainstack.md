---
id: chainstack
title: I-deploy ang isang Smart Contract gamit ang Chainstack at Foundry
sidebar_label: Using Chainstack
description:  Gamitin ang Chainstack at Foundry para bumuo ng Smart Contract sa Polygon
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Pangkalahatang-ideya {#overview}

Ginabayan ka ng bahaging ito sa pamamagitan ng pag-deploy ng isang kontrata ng Hello World gamit ang [Chainstack](https://chainstack.com/build-better-with-polygon/) at [Foundry](https://github.com/gakonst/foundry/) sa Polygon Mumbai testnet.

Nagbibigay ang Chainstack ng imprastraktura para sa mga application na nakabase sa Ethereum at iba pang blockchain. Pinanatili nila ang mga node at ginagarantiya ang kanilang koneksyon sa network at nag-aalok din ng interface na makipag-ugnayan sa mainnet at mga testnet.

Ang Foundry ay isang mabilis na toolkit para sa pagpapaunlad ng application sa Ethereum na nakasulat sa Rust. Nagbibigay ito ng pagsubok, pakikipag-ugnayan sa mga smart contract ng EVM, pagpapadala ng mga transaksyon, at retrieval. ng datos ng blockchain.

:::tip

Kung mayroon kang anumang mga katanungan, mag-abot sa [<ins>Chainstack Discord</ins>](https://discord.com/invite/Cymtg2f7pX) server.

:::

## Ano ang matututunan mo {#what-you-will-learn}

Gumawa ng Hello World contract, gamit ang Chainstack para mag-deploy ng Polygon node at Foundry para i-deploy ang kontrata.

## Ano ang gagawin mo {#what-you-will-do}

1. Mag-deploy ng Polygon node gamit ang Chainstack
2. I-set up ang Foundry
3. Gawin ang smart contract
4. I-deploy ang smart contract

## Mag-deploy ng Polygon Mumbai Node {#deploy-a-polygon-mumbai-node}

Kailangan mo ng node para mag-deploy ng smart contract sa network ng blockchain Sundin ang mga hakbang sa ibaba para get ang node mo at tumatakbo:

**Hakbang 1 →** Mag-sign up sa [Chainstack](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

**Hakbang 2 →** Sundin ang mga tagubilin kung paano mag-deploy ang [isang Mumbai node](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)

![img](/img/chainstack/join-network.png)

**Hakbang 3 →** Kunin ang [endpoint ng deployed node](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## I-install ang Foundry {#install-foundry}

Ang Foundry ay isang toolkit sa pagpapaunlad para magtrabaho sa mga smart contract. Para magsimulang magtrabaho gamit ito, kailangan mo munang i-install ang Rust coding language.

1. [I-install ang Rust](https://www.rust-lang.org/tools/install).
1. [I-install ang Foundry](https://github.com/gakonst/foundry/).

## Pasimulan gamit ang Foundry {#initialize-with-foundry}

Para gumawa ng boilerplate na proyekto, mag-navigate sa iyong working directory at patakbuhin ang:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## Pondohan ang Iyong Account {#fund-your-account}

Kakailanganin mo ng wallet account para i-deploy ang smart contract. Puwede mong gamitin ang [Metamask](https://metamask.io/) para doon. Kakailanganin mo ring magbayad ng gas sa network para i-deploy ang kontrata. Kopyahin lang ang iyong wallet address at makakuha ng Mumbai MATIC token [sa pamamagitan ng gripo](https://faucet.polygon.technology/).

## Gawin ang Hello World contract {#create-the-hello-world-contract}

Sa pinasimulang proyekto sa Foundry sa `src/`, gumawa ng `HelloWorld.sol`:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## I-deploy ang Kontrata {#deploy-the-contract}

Sa puntong ito, handa ka nang i-deploy ang iyong kontrata:

* Mayroon kang sarili mong node sa Polygon Mumbai network at ide-deploy mo ang kontrata sa pamamagitan nito.
* Mayroon kang Foundry na gagamitin mo para i-deploy ang kontrata.
* Mayroon kang napondohang account na magde-deploy sa kontrata.

Para i-deploy ang kontrata, patakbuhin ang:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

Dito,

* CONTRACT_PATH — path papunta sa iyong `HelloWorld.sol` file.
* PRIVATE_KEY — ang pribadong key mula sa iyong account.
* HTTPS_ENDPOINT — [endpoint ng iyong node](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Halimbawa:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

Maaari mo palaging tingnan ang pag-deploy ng kontrata sa [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/) gamit ang bagong na-generate na hash mula sa huling hakbang.

:::

## I-test ang Kontrata {#test-the-contract}

Mayroong `forge test` command sakaling kailangan mong tingnan kung gumagana nang maayos ang kontrata. Nagbibigay ang Foundry ng maraming [opsyon](https://book.getfoundry.sh/reference/forge/forge-test) (mga flag) para sa mas partikular na mga test. Alamin pa ang tungkol sa pagsusulat ng mga test, advanced testing at iba pang feature sa [dokumentasyon ng Foundry](https://book.getfoundry.sh/forge/tests).

**Binabati kita! Idineploy mo ang smart contract ng Hello World sa Polygon.**

Tingnan din ang mga dokumento ng Chainstack para sa higit pang [<ins>mga tutorial</ins>](https://docs.chainstack.com/tutorials/polygon/) at [<ins>mga tool</ins>](https://docs.chainstack.com/operations/polygon/tools) na may kaugnayan sa Polygon.
