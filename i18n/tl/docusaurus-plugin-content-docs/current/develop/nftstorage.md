---
id: nftstorage
title: Mag-mint ng Mga NFT
description: Mag-mint gamit ang NFT.storage at Polygon.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Tuturuan ka ng tutorial na ito na mag-mint ng NFT gamit ang Polygon blockchain at IPFS/Filecoin storage sa pamamagitan ng NFT.Storage. Kadalasang pinipili ng mga developer ang Polygon, isang solusyon sa pag-scale ng Layer 2 para sa Ethereum, para sa bilis nito at mas mababang gastos sa transaksyon habang pinapanatili ang ganap na pagiging compatible sa EVM ng Ethereum. Gagabayan ka ng tutorial sa paggawa at pag-deploy ng standardized na smart na kontrata, pag-iimbak ng metadata at mga asset sa IPFS at Filecoin sa pamamagitan ng NFT.Storage API at pag-mint ng NFT sa iyong sariling wallet sa Polygon.

## Panimula {#introduction}

Sa tutorial na ito, layunin naming matupad ang tatlong katangian sa aming proseso ng pagmi-mint:

1. *Kakayahang Mai-scale* ng proseso ng pag-mint sa mga tuntunin ng gastos at throughput. Kung naglalayon ang kaso ng paggamit na mabilis na gumawa ng mga NFT, kailangang pangasiwaan ng pinagbabatayang teknolohiya ang lahat ng kahilingan sa pagmi-mint at dapat na mura ang pagmi-mint.
2. *Ang tibay* ng NFT, bilang mga asset, ay maaaring pangmatagalan. Kaya naman, kailangang manatiling magagamit ang mga ito sa buong buhay nila.
3. *Kawalan ng pagbabago* ng NFT at ang asset na kinakatawan nito upang maiwasan ang mga hindi gustong pagbabago at malisyosong aktor na baguhin ang digital asset na kinakatawan ng NFT.

Tinutugunan ng [Polygon](https://polygon.technology) ang katangian na *kakayahang mai-scale* sa kanilang protokol at balangkas. Compatible din ang mga ito sa Ethereum at sa virtual machine nito, na nagbibigay-daan sa mga developer na malayang ilipat ang kanilang code sa pagitan ng dalawang blockchain. Gayundin, ginagarantiya ng [NFT.Storage](https://nft.storage) ang *tibay* na may kapangyariahan ng napapaloob na [Filecoin](https://filecoin.io) network at *kawalan ng pagbabago* sa pamamagitan ng paggamit ng IPFS' [content addressing](https://nftschool.dev/concepts/content-addressing/).

Sa tutorial na ito, makakakuha ka ng pangkalahatang-ideya ng proseso ng pagmi-mint ng NFT, at matutunan kung paano mag-imbak ng digital asset gamit ang NFT.Storage at gamitin ang digital asset na ito para mag-mint ng iyong NFT sa Polygon.

## Mga Paunang Kinakailangan {#prerequisites}

Magbibigay sa iyo ang pangkalahatang kaalaman tungkol sa mga NFT ng background at konteksto. [Sinasaklaw ng NFT School ang mga basic na kaalaman sa NFT](https://nftschool.dev/concepts/non-fungible-tokens/), mga advanced na paksa at higit pang tutorial.

Upang subukan at patakbuhin ang code na makikita sa tutorial na ito, kakailanganin mo ng [Node.js installation](https://nodejs.org/en/download/package-manager/).

Kakailanganin mo rin ng Polygon wallet sa Mumbai testnet na may maliit na halaga ng MATIC token. Sundin ang mga tagubilin sa ibaba upang makapagsimula:

1. **I-download at i-install ang [Metamask](https://metamask.io/)**. Ang Metamask ay crypto wallet at gateway sa mga blockchain app. Napakadaling gamitin at pinapasimple ang maraming hakbang, hal., pag-set up ng Polygon wallet.
2. **Ikonekta ang Metamask sa Polygon [Mumbai testnet](https://docs.polygon.technology/docs/develop/metamask/overview)** at piliin ito sa dropdown na menu. Gagamitin natin ang testnet ng Polygon para mag-mint ng NFT nang libre.
3. **Tumanggap ng MATIC token** sa iyong wallet sa pamamagitan ng paggamit ng [faucet](https://faucet.polygon.technology/). Piliin ang Mumbai testnet at i-paste ang iyong address ng wallet mula sa Metamask sa form. Para mag-mint ng NFT, kailangan nating bayaran ang maliit na halaga ng MATIC, na bayad na sinisingil ng mga minero para sa mga operasyon para maidagdag ang mga bagong transaksyon sa blockchain, hal., pag-mint ng NFT o paggawa ng bagong smart na kontrata.
4. **Kopyahin ang pribadong key** mula sa Metamask sa pamamagitan ng pag-click sa tatlong tuldok sa kanang sulok sa tuktok at pagpili ng 'Mga detalye ng account'. Sa ibaba, mahahanap mo ang button para mai-export ang pribadong key. I-click ito at ilagay ang iyong password kapag na-prompt. Maaari mong kopyahin at i-paste ang pribadong key sa text file sa ngayon. Gagamitin natin ito mamaya sa tutorial kapag nakikipag-ugnayan sa blockchain.

Panghuli, kakailanganin mo ng text o code editor. Para sa higit pang kaginhawahan, pumili ng editor na may suporta sa wika para sa parehong JavaScript at Solidity. Isang magandang opsyon ang [Visual Studio Code](https://code.visualstudio.com) na naka-enable ang [solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) extension.

## Paghahanda {#preparation}

### Kumuha ng API key para sa NFT.storage {#get-an-api-key-for-nft-storage}

Upang magamit ang NFT.Storage, kailangan mo ng API key. Una, [pumunta sa NFT.Storage upang mag-log in gamit ang iyong email address](https://nft.storage/login/). Makakatanggap ka ng email na may magic link na makakatulong sa iyong mag-sign in -- walang password na kailangan. Pagkatapos mong matagumpay na mag-log in, pumunta sa Mga Key ng API sa pamamagitan ng navigation bar. Makakakita ka ng button upang gumawa ng **Bagong Key**. Kapag na-prompt para sa pangalan ng API key, maaari kang malayang pumili ng isa o gumamit ng "polygon + NFT.Storage". Maaari mong kopyahin ang nilalaman ng key column ngayon o sumangguni pabalik sa NFT.Storage sa ibang pagkakataon sa tutorial.

### I-set up ang iyong workspace {#set-up-your-workspace}

Gumawa ng bagong walang laman na folder na magagamit namin bilang aming workspace para sa tutorial na ito. Huwag mag-atubiling pumili ng anumang pangalan at lokasyon sa iyong system ng pagpa-file. Buksan ang terminal at mag-navigate sa bagong ginawang folder.

Susunod, i-install natin ang sumusunod na Node.js dependencies:

- **Hardhat at Hardhat-Ethers**, isang environment sa pagbuo para sa Ethereum (at mga blockchain na compatible sa Ethereum tulad ng Polygon).
- **OpenZeppelin**, isang koleksyon ng mga smart na kontrata na nagtatampok ng standardized na mga batayang kontrata ng NFT.
- **NFT.Storage**, isang library na maikokonekta sa NFT.Storage API.
- **Dotenv**, isang library para mapangasiwaan ang mga file sa environment para sa pagsasaayos (hal., pag-inject ng mga pribadong key sa script).

Gamitin ang sumusunod na command para i-install ang lahat ng dependencies nang sabay-sabay:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Kailangang pasimulan ang Hardhat sa kasalukuyang folder. order simulan ang pagsisimula ng, i-execute:

```bash
npx hardhat
```

Kapag prompted, piliin **ang Lumikha ng walang laman na hardhat.config.js**. Dapat magmukhang ganito ang iyong console output:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Gagawa kami ng ilang pagbabago sa configuration file ng hardhat `hardhat.config.js` upang suportahan ang network ng pagsubok ng Polygon Mumbai. Buksan ang `hardhat.config.js` na ginawa sa huling hakbang. Pakitandaan na nilo-load namin ang iyong Polygon wallet na pribadong key mula sa environment file dahil dapat panatilihing ligtas ang environment file. Maaari mo ring gamitin ang iba pang [link](https://docs.polygon.technology/docs/operate/network) ng rpc ayon sa kinakailangan.

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

Gumawa ng bagong file na tinatawag `.env`na hahawakan ang iyong API key para sa NFT.Storage at ang iyong pribadong key ng wallet ng Polygon. Dapat magmukhang ganito ang nilalaman ng `.env`file:

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

Palitan ang mga placeholder ng API key na ginawa mo habang naghahanda at ang iyong Polygon wallet pribadong susi.

Upang mapanatiling maayos ang aming proyekto, gagawa kami ng tatlong bagong folder:

1. `contracts`, para sa mga kontratang Polygon na nakasulat sa Solidity.
2. `assets`, naglalaman ng digital asset na imi-mint namin bilang NFT.
3. `scripts`, bilang mga katulong upang himukin ang paghahanda at proseso ng pagmi-mint.

Isagawa ang sumusunod na command:

```bash
mkdir contracts assets scripts
```

Panghuli, idadagdag namin ang larawan sa `assets` na folder. Ang larawang ito ang aming magiging likhang-sining na ia-upload namin sa NFT.Storage at imi-mint sa Polygon. Pangalanan natin ito `MyExampleNFT.png` sa ngayon. Kung wala kang magandang sining na handa, maaari kang [ mag-download ng simpleng pattern](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu).

## Pag-mint ng iyong NFT {#minting-your-nft}

### Pag-iimbak ng data ng asset gamit ang NFT.Storage {#storing-asset-data-with-nft-storage}

Gagamitin namin ang NFT.Storage para i-store ang aming mga digital asset at ang metadata nito. Ginagarantiyahan ng NFT.Storage ang kawalang pagbabago at tibay sa pamamagitan ng awtomatikong pag-upload ng iyong digital asset sa Filecoin at IPFS. Ang IPFS at Filecoin ay tumatakbo sa mga content identifier (CID) para sa hindi nababagong pagtatala. Magbibigay ang IPFS ng mabilis na pagbawi kasama ang geo-replicated caching nito at ginagarantiyahan ng Filecoin ang tibay sa mga nagbibigay ng insentibo sa storage.

Gumawa ng script na tinatawag na `store-asset.mjs` sa ibaba ng `scripts` na directory. Nakalista sa ibaba ang mga nilalaman:

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Ang main na bahagi ng script ay ang `storeAsset` na function. Lumilikha ito ng bagong client na kumokonekta sa NFT.Storage gamit ang API key na ginawa mo kanina. Susunod, ipinakilala namin ang metadata na binubuo ng pangalan, paglalarawan, at larawan. Tandaan na binabasa namin ang asset ng NFT nang direkta mula sa system ng pagpa-file mula sa `assets` na directory. Sa dulo ng function ay ipi-print namin ang metadata URL dahil gagamitin namin ito sa ibang pagkakataon kapag lumilikha ng NFT sa Polygon.

Pagkatapos i-set up ang script, maaari mo itong isagawa sa pamamagitan ng pagtakbo:

```bash
node scripts/store-asset.mjs
```

Dapat magmukha ang iyong output na tulad ng listahan sa ibaba, kung saan ang `HASH` ay ang CID sa sining na kaka-imbak mo lang.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Paggawa ng iyong NFT sa Polygon {#creating-your-nft-on-polygon}

#### Gumawa ng smart na kontrata para sa pagmi-mint {#create-the-smart-contract-for-minting}

Una, gagawa kami ng smart na kontrata na gagamitin para mag-mint ng NFT. Dahil compatible ang Polygon sa Ethereum, isusulat namin ang smart na kontrata sa [Solidity](https://soliditylang.org). Gumawa ng bagong file para sa aming smart na kontrata ng NFT na tinatawag na `ExampleNFT.sol` sa loob ng `contracts` na directory. Maaari mong kopyahin ang code ng listahan sa ibaba:

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

Upang maging wastong NFT, dapat ipatupad ng iyong smart na kontrata ang lahat ng paraan ng [pamantayan ng ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/). Ginagamit namin ang pagpapatupad ng library ng [OpenZeppelin](https://openzeppelin.com), na nagbibigay na ng hanay ng mga main na function at sumusunod sa pamantayan.

Sa kaitaasan ng aming smart na kontrata, nag-import kami ng tatlong klase ng smart na kontrata ng OpenZeppelin:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` ay naglalaman ng pagpapatupad ng mga main na paraan ng pamantayan ng ERC-721, na mamanahin ng aming smart na kontrata ng NFT. Ginagamit namin ang `ERC721URIStorage,` na extension para i-imbak hindi lang ang mga asset kundi pati na rin ang metadata bilang JSON file na off-chain. Tulad ng kontrata, ang JSON file na ito ay kailangang sumunod sa ERC-721.

2. `\@openzeppelin/contracts/utils/Counters.sol` ay nagbibigay ng mga counter na maaari lamang dagdagan o bawasan ng isa. Gumagamit ang aming smart na kontrata ng counter para subaybayan ang kabuuang bilang ng mga NFT na ginawa at saka magtatakda ng natatanging ID para sa aming bagong NFT.

3. `\@openzeppelin/contracts/access/Ownable.sol` ay nagse-set up ng access control sa aming smart na kontrata, kaya ang may-ari lang ng smart na kontrata (ikaw) ang makakapag-mint ng mga NFT.

Pagkatapos ng aming mga pahayag sa pag-import, mayroon kaming custom na smart na kontrata ng NFT, na naglalaman ng counter, constructor, at paraan upang aktwal na mag-mint ng NFT. Ginagawa ang karamihan sa pagsusumikap ng batayang kontrata na minana mula sa OpenZeppelin. Ipinapatupad nila ang karamihan sa mga paraan na kailangan namin upang gumawa ng NFT na sumusunod sa pamantayan ng ERC-721.

Sinusubaybayan ng counter ang kabuuang bilang ng mga NFT na na-mint, at ginagamit ito sa paraan ng pagmi-mint bilang natatanging identifier para sa NFT.

Sa constructor, ipinapasa namin ang dalawang string na argumento para sa pangalan ng smart na kontrata at ang simbolo (kinakatawan ng mga wallet). Maaari mong baguhin ang mga ito sa anumang gusto mo.

Sa wakas, mayroon na tayong paraan na `mintNFT` na nagpapahintulot sa atin na aktwal na mag-mint ng NFT. Ang pamamaraan ay nakatakda sa upang matiyak `onlyOwner`na maaari lamang itong isagawa ng may-ari ng matalinong kontrata.

`address recipient`tinukoy ang address na makakatanggap ng NFT sa una.

`string memory tokenURI`ay isang URL na dapat malutas sa isang JSON na dokumento na naglalarawan sa metadata ng NFT. Sa aming kaso, naka-imbak na ito sa NFT.Storage. Magagamit namin ang ibinalik na link ng IPFS sa metadata JSON file sa panahon ng pagsasagawa ng paraan.

Sa loob ng paraan, dinaragdagan namin ang counter para makatanggap ng bagong natatanging identifier para sa ating NFT. Pagkatapos, iko-call natin ang mga paraan na ibinigay ng batayang kontrata mula sa OpenZeppelin upang mag-mint ng NFT sa tatanggap na gamit ang bagong ginawang identifier at itatakda ang URI ng metadata. Ibinabalik ng pamamaraan ang natatanging identifier pagkatapos ng pagpapatupad.

#### I-deploy ang smart na kontrata sa Polygon {#deploy-the-smart-contract-to-polygon}

Ngayon, oras na para i-deploy ang aming matalinong kontrata sa Polygon. Gumawa ng bagong file na tinatawag na `deploy-contract.mjs` sa loob ng `scripts` na directory. Kopyahin ang mga nilalaman ng listahan sa ibaba sa file na iyon at i-save ito.

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

Ginagawa ang pag-deploy ng kontrata gamit ang mga function ng helper na ibinigay ng hardhat library. Una, nakukuha namin ang smart na kontrata na ginawa namin sa nakaraang hakbang kasama ang ibinigay na pabrika. Pagkatapos, ide-deploy namin ito sa pamamagitan ng pagtawag sa kani-kanilang paraan at maghintay para makumpleto ang pag-deploy. Mayroong ilang higit pang mga linya sa ibaba ng inilarawang code upang makuha ang tamang address sa kapaligiran ng testnet. I-save ang `mjs`file.

I-execute ang script gamit ang sumusunod na command:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

Kung tama ang lahat, makikita mo ang sumusunod na output:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

Tandaan na kakailanganin mo ang naka-print na address ng kontrata sa hakbang ng pagmi-mint. Maaari mong kopyahin at i-paste ito sa hiwalay na text file at i-save ito para sa ibang pagkakataon. Kinakailangan ito para ma-call ng minting script ang paraan para mag-mint ng partikular na kontratang iyon.

#### Pag-mint ng NFT sa Polygon {#minting-the-nft-on-polygon}

Kino-call na lang ngayon ang kontrata para ma-mint ang NFT na kaka-deploy lang namin sa Polygon. Gumawa ng bagong file na tinatawag sa `mint-nft.mjs` sa loob ng `scripts` directory at kopyahin ang code na ito mula sa listahan sa ibaba:

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

I-edit ang unang dalawang linya para ipasok ang iyong **kontrata ng address**mula sa naunang pag-deploy at ang **metadata URL** na ibinalik noong iniimbak ang asset gamit ang NFT.Storage. Isine-setup ng natitirang bahagi ng script ang pag-call sa iyong smart na kontrata sa iyo bilang ang magiging may-ari ng NFT at ang pointer sa metadata na nakaimbak sa IPFS.

Susunod, patakbuhin ang script:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

Maaari mong asahan na makita ang sumusunod na output:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

Naghahanap ng sample code mula sa tutorial na ito? Mahahanap mo ito sa polygon-nft.storage-demo [link](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) Github repo.

## Konklusyon {#conclusion}

Sa tutorial na ito, natutunan namin kung paano mag-mint ng NFT nang end-to-end gamit ang Polygon at NFT.Storage. Nagdudlot ang kumbinasyong ito ng teknolohiya sa wastong desentralisasyon at ginagarantiya ang *kakayahang mai-scale*, *tibay*, at *kawalang pagbabago*.

Nag-deploy kami ng custom na smart na kontrata para mag-mint ng aming NFT na partikular sa aming mga pangangailangan. Para sa tutorial na ito, gumamit kami ng simpleng halimbawang batay sa pamantayan ng ERC-721. Gayunpaman, maaari mo ring tukuyin ang kumplikadong lohika na namamahala sa iyong NFT life cycle. Para sa mas kumplikadong mga kaso ng paggamit, magandang lugar para simulan ang kapalit na pamantayang [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/). Nag-aalok ang OpenZeppelin, ang library na ginagamit namin sa aming tutorial ng [contracts wizard](https://docs.openzeppelin.com/contracts/4.x/wizard) na tumutulong na gumawa ng mga kontrata ng NFT.

Puwedeng tingnan ang matagumpay na pagmi-mint bilang simula ng mahalagang yugto ng NFT. Maaaring gamitin ang NFT upang patunayan ang pagmamay-ari at maaaring ilipat sa ibang user. Kabilang sa mga dahilan para ilipat ang NFT ang matagumpay na pagbebenta sa isa sa mga NFT marketplace tulad ng [OpenSea](https://opensea.io) o ng ibang uri ng kaganapan gaya ng pagkuha ng item sa larong nakabatay sa NFT. Ang paggalugad sa maraming posibilidad para sa mga NFT ay talagang isang kapana-panabik na susunod na hakbang.

Kung gusto mong makatulong sa pagbuo ng iyong NFT project sa NFT.storage, hinihikayat ka naming sumali sa `#nft-storage`channel sa D[iscord ](https://discord.gg/Z4H6tdECb9)at S[lack.](https://filecoinproject.slack.com/archives/C021JJRH26B)
