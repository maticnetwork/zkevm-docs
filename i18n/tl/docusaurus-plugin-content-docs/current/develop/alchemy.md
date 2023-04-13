---
id: alchemy
title: I-deploy ang isang Smart Contract gamit ang Alchemy
sidebar_label: Using Alchemy
description: Gabay na mag-deploy ng mga smart contract gamit ang Alchemy
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Pangkalahatang-ideya  {#overview}

Ang tutorial na ito ay para sa mga developer na bago sa pagpapaunlad ng Ethereum blockcahin o gustong maunawaan ang mga pangunahing kaalaman ng pag-deploy at pakikipag-interaksyon sa mga smart contract. Ilalakad ka nito sa paglikha at pag-deploy ng isang smart contract sa Polygon Mumbai test network gamit ang isang cryptocurrency wallet ([Metamas),](https://metamask.io) [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), at [Alchemy](https://alchemy.com/?a=polygon-docs).

:::tip

Kung may mga tanong o alalahanin ka, mag-abot sa team ng Alchemy sa pamamagitan ng kanilang [<ins>opisyal na Discord</ins>](https://discord.gg/gWuC7zB) server.

:::

## Ano ang matututunan mo {#what-you-will-learn}

Para makagawa ng smart contract sa tutorial na ito, matututunan mo kung paano gamitin ang platform ng Alchemy upang:
- Gumawa ng smart contract application
- I-check ang balanse ng wallet
- I-verify ang mga tawag ng kontrata sa isang blockchain explorer

## Ano ang gagawin mo {#what-you-will-do}

Sa pagsunod sa tutorial, ikaw ay:
1. Magsisimula sa paggawa ng app sa Alchemy
2. Gagawa ng address ng wallet sa Metamask
3. Idagdag ang balanse sa wallet (gamit ang mga test tokens)
4. Gagamit ng Hardhat at Ethers.js upang i-compile at i-deploy ang proyekto
5. I-check ang status ng kontrata sa platform ng Alchemy

## Lumikha at i-deploy ang iyong Smart Contract {#create-and-deploy-your-smart-contract}

### Ikonekta ang Polygon network {#connect-to-the-polygon-network}

Maraming paraan upang gumawa ng mga kahilingan sa Polygon PoS chain. Sa halip na patakbuhin ang iyong sariling node, gagamit ka ng libreng account sa developer platform ng Alchemy at makikipag-interaksyon sa Alchemy Polygon PoS API upang makipag-ugnayan sa Polygon PoS chain. Ang platform ay binubuo ng isang buong suite ng pag-develop na tooling – kabilang dito ang kakayahang mag-monitor ng mga kahilingan, data analytics na nagpapakita ng nangyayari sa ilalim ng hood sa panahon ng pag-deploy ng smart contract, pinahusay na API (Transact, NFTs, atbp), at isang ethers.js SDK.

Kung wala ka na sa isang Alchemy account, magsimulang mag-sign up para sa isang libreng account [dito](https://www.alchemy.com/polygon/?a=polygon-docs). Pagkatapos gawin ang iyong account, mayroon kang opsyon na gawin kaagad ang iyong unang app bago maabot ang dashboard.

![img](/img/alchemy/alchemy-dashboard.png)

### I-like ang iyong App (at API key) {#create-your-app-and-api-key}

Matapos matagumpay na gumawa ng isang Alchemy account, kakailanganin mong bumuo ng isang API key sa pamamagitan ng paglikha ng app. Pinapatunayan nito ang mga kahilingang ginawa sa Polygon Mumbai testnet. Kung hindi ka pamilyar sa mga testnet, tingnan ang [gabay sa testnet na ito](https://docs.alchemyapi.io/guides/choosing-a-network).

Para makabuo ng bagong API key, mag-navigate sa tab ng **Apps** sa navigation bar ng Alchemy dashboard at piliin ang sub-tab ng **Lumikha** App.

![img](/img/alchemy/create-app.png)

I-print ang iyong bagong app na **Hello World**, mag-alok ng maikling paglalarawan, piliin **ang** Polygon para sa chain, at piliin ang **Polygon Mumbai** para sa iyong network.

Sa wakas, i-click ang **Lumikha** ng app. Dapat lumitaw ang iyong bagong app sa mesa sa ibaba.

### Lumikha ng address ng Wallet {#create-a-wallet-address}

Ang Polygon PoS ay isang layer 2 na scaling solution para sa Ethereum. Samakatuwid, kailangan namin ang isang Ethereum wallet at magdagdag ng isang custom na Polygon URL para magpadala at makatanggap ng mga transaksyon sa Polygon Mumbai testnet. Para sa tutorial na ito, gagamitin namin ang MetaMask, isang browser-compatible na cryptocurrency wallet na ginamit para pamahalaan ang iyong wallet address. Kung gusto mong maunawaan pa ang tungkol sa kung paano gumagana ang mga transaksyon sa Ethereum, tingnan ang [gabay sa mga transaksyon na ito](https://ethereum.org/en/developers/docs/transactions/) ng Ethereum Foundation.

Para makuha ang iyong custom na URL ng Polygon RPC mula sa Alchemy, pumunta sa iyong **Hello World** app sa iyong Alchemy dashboard at i-click ang **View Key** sa tuktok na kanang sulok. Tapos magpatuloy at kopyahin ang iyong Alchemy HTTP API key.

![img](/img/alchemy/view-key.png)

Maaari kang mag-download at gumawa ng Metamask account nang libre [dito](https://metamask.io/download.html). Kapag gumawa ka ng account, sundin ang mga hakbang na ito para i-set up ang Polygon POS network sa iyong wallet.

1. Piliin ang **mga Setting** mula sa drop-down na menu sa kanang tuktok ng iyong MetaMask wallet.
2. Piliin ang mga **Network** mula sa menu sa kaliwa.
3. Ikonekta ang iyong wallet sa Mumbai Testnet gamit ang mga sumusunod na parameter:

**Pangalan** ng Network: Polygon Mumbai Testnet

**Bagong URL:** https://polygon-mumbai.g.alchemy.com/v2/your-api-key

**ChainID:** 80001

**Simbolo:** MATIC

**I-block ang URL ng Explorer:** https://mumbai.polygonscan.com/


### Idagdag ang Polygon Mumbai Test MATIC {#add-polygon-mumbai-test-matic}

Kakailanganin mo ang ilang testnet token para i-deploy ang smart contract mo sa Mumbai testnet. Para makakuha ng mga token ng testnet, pumunta sa [Polygon](https://faucet.polygon.technology/) **Mumbai** Gripo, piliin ang Mumbai, piliin ang **MATIC Token**, at ipasok ang iyong address ng wallet ng Polygon, pagkatapos ay i-click ang I-**Submit**. Dahil sa trapiko ng network, maaaring tumagal ng ilang oras para matanggap ang mga token ng iyong testnet.

Maaari mo ring gamitin ang [libreng Mumbai gripo](https://mumbaifaucet.com/?a=polygon-docs) ng Alchemy.

![img](/img/alchemy/faucet.png)

Makikita mo ang mga testnet token sa iyong MetaMask account makalipas ang ilang sandali.

### I-check ang Balance ng Wallet {#check-your-wallet-balance}

Para i-double check na nandoon ang ating balanse, gumawa tayo ng [eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) na kahilingan gamit ang [composer tool ng Alchemy](https://composer.alchemyapi.io/). Piliin ang **Polygon** bilang chain, **Polygon Mumbai** bilang network, `eth_getBalance`bilang paraan, at i-input ang iyong address. Ibabalik nito ang halaga ng MATIC sa ating wallet. Tingnan ang [video na ito](https://youtu.be/r6sjRxBZJuU) para sa mga tagubilin sa kung paano gamitin ang composer tool.

![img](/img/alchemy/get-balance.png)

Pagkatapos mong i-input ang iyong account address ng MetaMask at i-click ang **Send Request**, dapat mong makita ang isang tugon na mukhang ganito:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

Magreresulta ito sa Wei, hindi ETH. Si Wei ang pinakamaliit na denominasyon ng Ether. Ang conversion mula Wei papuntang Ether ay: 1 Ether = 10^18 Wei. Kaya, kung iko-convert natin ang "0xde0b6b3a764000" sa decimal, makakakuha tayo ng 1\*10^18, na katumbas ng 1 ETH. Maaari itong imapa sa 1 MATIC batay sa denominasyon.

:::

### Initialize ang iyong proyekto {#initialize-your-project}

Una, kakailanganin nating gumawa ng folder para sa ating proyekto. Mag-navigate sa iyong [linya ng command](https://www.computerhope.com/jargon/c/commandi.htm) at i-type ang:

```bash
mkdir hello-world
cd hello-world
```

Ngayong nasa loob na tayo ng folder ng ating proyekto, gagamitin natin ang `npm init` para pasimulan ang proyekto. Kung wala ka pang naka-install na npm, sundin ang [mga tagubiling ito](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (kakailanganin din natin ang Node.js kaya i-download din iyon!).

```bash
npm init # (or npm init --yes)
```

Hindi naman talaga mahalaga kung paano mo sasagutin ang mga tanong sa pag-install, narito kung paano namin ito ginawa bilang sanggunian:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Aprubahan ang package.json at ayos na tayo!

### I-download ang [Hardhat](https://hardhat.org/getting-started/#overview)

Ang Hardhat ay isang kapaligiran sa pagpapaunlad upang i-compile, i-deploy, i-test, at i-debug ang iyong Ethereum software. Tinutulungan nito ang mga developer kapag bumubuo ng mga smart contract at dApp nang lokal bago i-deploy sa live chain.

Sa loob ng aming `hello-world`proyekto, tumakbo:

```bash
npm install --save-dev hardhat
```

Tingnan ang page na ito para sa mga karagdagang detalye sa [mga tagubilin sa pag-install](https://hardhat.org/getting-started/#overview).

### Lumikha ng proyekto ng Hardhat {#create-hardhat-project}

Sa loob ng folder ng ating proyektong `hello-world`, patakbuhin ang:

```bash
npx hardhat
```

Dapat kang makakita ng malugod na mensahe at pagpipilian para piliin ang gusto mong gawin. Piliin **ang lumikha ng walang laman na hardhat.config.js**:

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

will ito ng `hardhat.config.js`file para sa amin, na kung saan namin tutukuyin ang lahat ng set up para sa aming proyekto.

### Idagdag ang mga folder ng proyekto {#add-project-folders}

Para panatilihing nakaayos ang aming proyekto, lilikha kami ng dalawang bagong folder. Mag-navigate sa root directory ng iyong proyektong `hello-world` sa iyong linya ng command at i-type ang:

```bash
mkdir contracts
mkdir scripts
```

* Ang `contracts/` ay kung saan natin papanatilihin ang ating hello world smart contract code file
* Ang `scripts/` ay kung saan tayo magpapanatili ng mga script upang i-deploy at makipag-interaksyon sa ating kontrata

### Isulat ang kontrata {#write-the-contract}

I-open ang **hello-world** project sa paborito mong editor, tulad ng [VSCode](https://code.visualstudio.com). nakasulat ang mga Smart contract sa isang language na tinatawag na Solidity na kung saan ang gagamitin namin para isulat ang aming `HelloWorld.sol`smart contract.‌

1. I-navigate ang `contracts`folder at lumikha ng bagong file na tinatawag na`HelloWorld.sol`
2. Nasa ibaba ang isang sampol ng Hello World smart contract mula sa [Ethereum Foundation](https://ethereum.org/en/) na gagamitin natin para sa tutorial na ito. Kopyahin at i-paste ang mga nilalaman sa ibaba sa iyong `HelloWorld.sol` file, at siguraduhing basahin ang mga komento upang maunawaan kung ano ang ginagawa ng kontratang ito:

```solidity
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

Ito ay isang napakasimpleng smart contract na nagtatago ng mensahe sa oras na gawin at maaaring i-update sa pamamagitan ng pag-call sa `update` function.

### Kumonekta sa MetaMask & Alchemy {#connect-with-metamask-alchemy}

Nakagawa na tayo ng Metamask wallet, Alchemy account, at naisulat ang ating smart contract, oras nang pagkonektahin ang tatlo.

Bawat transaksyon na ipinadala mula sa iyong virtual wallet ay nangangailangan ng lagda gamit ang iyong natatanging pribadong key. Para bigyan ang ating program ng pahintulot na ito, maaari nating ligtas na itago ang ating pribadong key (at Alchemy API key) sa isang environment file.

Una, i-install ang dotenv package sa directory ng iyong proyekto:

```bash
npm install dotenv --save
```

Tapos, gumawa ng `.env` file sa root directory ng ating proyekto, at idagdag dito ang pribadong key ng iyong Metamask at HTTP na URL ng Alchemy API.

:::warning Babala

Kailangang pangalanan ang iyong file ng kapaligiran `.env`o hindi ito makikilala bilang isang environment file. Huwag itong pangalanang `process.env` o `.env-custom` o kahit ano pa.

Gayundin, kung gumagamit ka ng isang version control system tulad ng git para pamahalaan ang iyong proyekto, mangyaring **HUWAG** subaybayan ang `.env`file. Idagdag `.env`sa iyong `.gitignore`file para maiwasan ang pag-publish ng secret data.

:::

* Sundin ang [mga tagubiling ito](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) upang i-export ang iyong pribadong key
* Para makuha ang iyong Alchemy HTTP API key (RPC URL), mag-navigate sa iyong **Hello World** app sa dashboard ng iyong account at i-click ang **View Key** sa kanang sulok ng itaas.

Ganito dapat ang hitsura ng iyong `.env`:

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Para talagang ikonekta ang mga ito sa aming code, isasangguni namin ang mga variable na ito sa aming `hardhat.config.js`file sa ibang pagkakataon sa tutorial na ito.

### I-install ang mga Ethers.js {#install-ethers-js}

Ang Ethers.js ay isang library na ginagawang mas madali na makipag-interaksyon at gumawa ng mga kahilingan sa Ethereum sa pamamagitan ng pag-wrap ng [mga standard na JSON-RPC na paraan](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) sa mga mas user-friendly na paraan.

Pinapadali ng Hardhat na mag-integrate ng [mga plugin](https://hardhat.org/plugins/) para sa karagdagang tooling at pinalawig na functionality. Sasamantalahin natin ang [Ethers plugin](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) para sa pag-deploy ng kontrata. Ang [Ethers.js](https://github.com/ethers-io/ethers.js/) ay may mga kapaki-pakinabang na paraan ng pag-deploy ng kontrata.

Sa direktoryo ng proyekto mo, i-type:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Kakailanganin din natin ng ethers sa ating `hardhat.config.js` sa susunod na hakbang.

### I-update ang hardhat.config.js {#update-hardhat-config-js}

Nagdagdag kami ng ilang dependency at mga plugin sa ngayon. Ngayon kailangan na nating i-update `hardhat.config.js`para kinikilala ng aming proyekto ang mga dependency na iyon.

I-update ang iyong `hardhat.config.js` upang maging ganito ang hitsura:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### I-compile ang aming Smart Contract {#compile-our-smart-contract}

Upang masiguro na gumagana naman ang lahat, i-compile natin ang ating kontrata. Ang gawaing `compile` ay isa sa mga built-in na gawain sa hardhat.

Mula sa linya ng command, patakbuhin ang:

```bash
npx hardhat compile
```

Maaaring makakuha ka ng babala tungkol sa `SPDX license identifier not provided in source file`, pero maaaring magtrabaho pa rin ang application. Kung hindi, maaari ka palaging magmensahe sa [Alchemy discord](https://discord.gg/u72VCg3).

### I-deploy ang aming script {#write-our-deploy-script}

Ngayong nakasulat na ang ating kontrata at ayos na ang ating configuration file, oras nang isulat ang ating script sa pag-deploy ng kontrata.

Mag-navigate sa folder na `scripts/` at gumawa ng bagong file na tinatawag na `deploy.js`, at idagdag dito ang mga sumusunod na nilalaman:

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Pinagtibay namin ang mga paliwanag ng Hardhat team sa kung ano ang ginagawa ng bawat isa sa mga linya ng code na ito mula sa kanilang [tutorial sa mga Kontrata](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) na nandito.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Ang isang `ContractFactory` sa ethers.js ay isang abstraction na ginagamit upang mag-deploy ng mga bagong smart contract, kaya ang `HelloWorld` dito ay isang [factory](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\)) para sa mga instance ng ating hello world contract. Kapag ginagamit ang `hardhat-ethers` plugin na `ContractFactory` at `Contract`, ang mga instance ay nakakonekta sa unang signer (may-ari) bilang default.

```javascript
const hello_world = await HelloWorld.deploy();
```

Ang pag-call sa `deploy()` sa isang `ContractFactory` ay sisimulan ang pag-deploy, at magbabalik ng `Promise` na lumulutas sa isang `Contract` object. Ito ang object na may paraan para sa bawat isa sa mga function ng ating smart contract.

### I-deploy ang aming Smart Contract {#deploy-our-smart-contract}

Mag-navigate sa linya ng command at patakbuhin ang:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Dapat mong makita ang isang ganito:

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

Kung pupunta kami sa [Polygon Mumbai explorer](https://mumbai.polygonscan.com/) at maghanap ng aming contract address, dapat nating makita na deployed ito.

Dapat tumugma `To`ang address ng account ng iyong MetaMask at sasabihin ng `From`address ang **Contract Creation.** Pero kung i-click natin ang transaksyon, makikita natin ang contract address namin sa `To`field.

![img](/img/alchemy/polygon-scan.png)

### I-verify ang kontrata {#verify-the-contract}

Nagbibigay ang Alchemy ng isang [explorer](https://dashboard.alchemyapi.io/explorer) kung saan makakahanap ka ng impormasyon tungkol sa mga pamamaraan na itinatambal kasama ang smart contract, tulad ng oras ng pagtugon, status ng HTTP, error code sa iba pa. Magandang kapaligiran ito upang beripikahin ang iyong kontrata at tingnan kung pumasok ang mga transaksyon.

![img](/img/alchemy/calls.png)

**Binabati kita! Idineploy mo lang ang isang matalinong kontrata sa Polygon Mumbai network.**

## Mga Karagdagang Mapagkukunan {#additional-resources}

- [Paano Bumuo ng NFT Smart Contract](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) – May nakasulat na tutorial ang Alchemy na may Youtube video sa paksang ito. Ito ang week 1 ng libreng 10 week nitong **Road sa Web3** dev series
- Quickstart ang mga developer docs ng [Polygon API Quickstart](https://docs.alchemy.com/reference/polygon-api-quickstart) - Nag-develop ang Alchemy sa pagkuha at pagtakbo sa Polygon
