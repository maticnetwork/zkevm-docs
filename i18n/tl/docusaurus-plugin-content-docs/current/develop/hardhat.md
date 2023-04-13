---
id: hardhat
title: I-deploy ang isang Smart Contract gamit ang Hardhat
sidebar_label: Using Hardhat
description: Gamitin ang Hardhat para mag-deploy ang isang Smart Contract sa Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Pangkalahatang-ideya {#overview}

Ang hardhat ay isang kapaligiran ng pag-unlad ng Ethereum na nagbibigay ng madaling paraan para mag-deploy ang mga smart contract, magpatakbo ng mga pagsubok at mag-debug ng Solidity code nang lokal.

Sa tutorial na ito, matututunan mo kung paano mag-set up ng Hardhat at gamitin ito upang bumuo, mag-test at mag-deploy ng isang simpleng smart contract.

### Ano ang gagawin mo {#what-you-will-do}

- I-set up ang Hardhat
- Gumawa ng simpleng smart contract
- Magtipon ng kontrata
- I-test ang kontrata
- I-deploy kontrata

## Pag-set up ng development environment {#setting-up-the-development-environment}

May ilang teknikal na kinakailangan bago tayo magsimula. I-install ang mga sumusunod:

- [Node.js v10+ LTS at npm](https://nodejs.org/en/) (na mayroong Node)
- [Git](https://git-scm.com/)

Kapag na-install na natin iyon, kailangan mong gumawa ng npm project sa pamamagitan ng pagpunta sa isang blangkong folder, pagpapatakbo sa `npm init`, at pagsunod sa mga tagubilin nito upang i-install ang Hardhat. Kapag handa na ang iyong proyekto, dapat mong patakbuhin ang:

```bash
npm install --save-dev hardhat
```

Upang gawin ang iyong proyekto sa Hardhat, patakbuhin ang `npx hardhat` sa folder ng iyong proyekto.
Gawin natin ang halimbawang proyekto at gawin ang mga hakbang na ito upang subukan ang isang halimbawang gawain at tipunin, i-test, at i-deploy ang halimbawang kontrata.

:::note

Ang halimbawang proyekto na ginamit dito ay mula sa [<ins>gabay para sa Mabilis na Pagsisimula sa Hardhat</ins>](https://hardhat.org/getting-started/#quick-start) pati na rin ang mga tagubilin nito.

:::

## Paggawa ng proyekto {#creating-a-project}

Upang gumawa ng halimbawang proyekto, patakbuhin ang `npx hardhat` sa folder ng iyong proyekto. Dapat mong makita ang mga sumusunod na prompt:

![img](/img/hardhat/quickstart.png)

Piliin ang JavaScript project at dumaan sa mga hakbang na ito para magtipon, mag-test at mag-deploy ng halimbawang kontrata.

### Pagsusuri sa kontrata {#checking-the-contract}

Ang `contracts` folder ay naglalaman ng `Lock.sol`, isang halimbawang kontrata na binubuo ng isang simpleng digital lock, kung saan makakapag-withdraw lang ang mga user ng pondo pagkatapos ng isang partikular na yugto ng panahon.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### Pag-set up ng kontrata {#setting-up-the-contract}

- Pumunta sa `hardhat.config.js`
- I-update ang `hardhat-config` gamit ang mga kredensiyal ng matic-network
- Gumawa ng `.env` file sa root upang i-store ang iyong pribadong key
- Magdagdag ng Polygonscan API key sa `.env` file para i-verify ang kontrata sa Polygonscan. Maaari kang bumuo ng API key sa pamamagitan ng [paggawa ng isang account](https://polygonscan.com/register)

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

Tandaan na ang file sa itaas ay nangangailangan ng DOTENV para sa pamamahala ng mga variable ng kapaligiran at saka ng ethers at etherscan. Siguraduhing i-install ang lahat ng package na iyon.

Maghanap ng higit pang mga tagubilin sa kung paano gamitin ang DOTENV sa [<ins>page na ito</ins>](https://www.npmjs.com/package/dotenv).

Maaari kang mag-deploy sa MATIC(Polygon mainnet) kung babaguhin mo ang polygon_mumbai ng MATIC

:::

### Pagtipon ng kontrata {#compiling-the-contract}

Upang magtipon ng kontrata, kailangan mo munang i-install ang Hardhat Toolbox:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

At patakbuhin lang ito para magtipon:

```bash
npx hardhat compile
```

### Pag-test sa Kontrata {#testing-the-contract}

Upang magpatakbo ng mga test sa Hardhat, kailangan mo lang i-type ang mga sumusunod:

```bash
npx hardhat test
```

At ito ang inaasahang output:

![img](/img/hardhat/test.png)

### Pag-deploy sa Polygon Network {#deploying-on-polygon-network}

Patakbuhin ang command na ito sa root ng direktoryo ng proyekto:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Ide-deploy ang kontrata sa Mumbai Testnet ng Matic, at maaari mong tingnan ang status ng pag-deploy dito: https://mumbai.polygonscan.com/

**Binabati kita! Matagumpay mong na-deploy ang Greeter Smart Contract. Puwede ka na ngayong makipag-interaksyon sa Smart Contract.**

:::tip Mabilis na Pag-verify ng mga kontrata sa Polygonscan

Patakbuhin ang mga sumusunod na command upang mabilis na ma-verify ang iyong kontrata sa Polygonscan. Ginagawa nitong madali para sa sinuman na makita ang source code ng iyong na-deploy na kontrata. Para sa mga kontratang mayroong constructor na may kumplikadong listahan ng argumento, tingnan [dito](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html).

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
