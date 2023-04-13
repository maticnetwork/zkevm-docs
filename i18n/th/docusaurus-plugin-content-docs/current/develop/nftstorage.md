---
id: nftstorage
title: มินต์ NFT
description: มินต์ด้วย NFT.storage และ Polygon
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

บทช่วยสอนนี้จะสอนให้คุณมินต์ NFT โดยใช้บล็อกเชน Polygon และที่เก็บข้อมูล IPFS/Filecoin ผ่าน NFT.Storageนักพัฒนามักเลือกใช้ Polygon ซึ่งเป็นโซลูชันการปรับขนาด Layer 2 สำหรับ Ethereum เนื่องจากความเร็วและต้นทุนในการทำธุรกรรมที่ต่ำกว่า ในขณะที่ยังคงความเข้ากันได้อย่างเต็มที่กับ EVM ของ Ethereumบทช่วยสอนนี้จะชี้แจงขั้นตอนการสร้างและปรับใช้สัญญาอัจฉริยะที่ได้มาตรฐาน การจัดเก็บข้อมูลเมตาและสินทรัพย์บน IPFS และ Filecoin ผ่าน NFT.Storage API และการมินต์ NFT ลงในวอลเล็ตของคุณเองบน Polygon

## ข้อมูลเบื้องต้น {#introduction}

ในบทช่วยสอนนี้ เราจะมุ่งหวังที่จะเติมเต็มคุณลักษณะสามประการด้วยกระบวนการมินต์ของเรา:

1. *ความสามารถในการปรับขนาด*ของกระบวนการมินต์ในแง่ต้นทุนและปริมาณงานหากกรณีการใช้งานมีเป้าหมายเพื่อสร้าง NFT อย่างรวดเร็ว เทคโนโลยีพื้นฐานจำเป็นต้องจัดการกับคำขอมินต์ทั้งหมด และการมินต์ควรมีราคาถูก
2. *ความคงทน*ของ NFT เนื่องจากสินทรัพย์สามารถมีอายุการใช้งานยาวนาน ดังนั้นจึงจำเป็นต้องใช้งานได้ตลอดอายุการใช้งาน
3. *ความไม่เปลี่ยนแปลง*ของ NFT และสินทรัพย์ที่แสดงถึง เพื่อป้องกันการเปลี่ยนแปลงที่ไม่ต้องการและป้องกันไม่ให้ตัวดำเนินการที่เป็นอันตรายทำการเปลี่ยนแปลงกับสินทรัพย์ดิจิทัลที่ NFT แสดงถึง

[Polygon](https://polygon.technology) จัดการคุณลักษณะ*ความสามารถในการปรับขนาด*ด้วยโปรโตคอลและเฟรมเวิร์กนอกจากนี้ยังเข้ากันได้กับ Ethereum และเครื่องเสมือน จึงทำให้นักพัฒนาสามารถย้ายโค้ดของตนได้อย่างอิสระระหว่างสองบล็อกเชนในทางเดียวกัน [NFT.Storage](https://nft.storage) รับประกัน*ความคงทน*ด้วยประสิทธิภาพของเครือข่าย [Filecoin](https://filecoin.io) และ*ความไม่เปลี่ยนแปลง* โดยใช้[การระบุคอนเทนต์](https://nftschool.dev/concepts/content-addressing/)ของ IPFS

ในบทช่วยสอนนี้ คุณจะได้รับภาพรวมของกระบวนการมินต์ NFT เรียนรู้วิธีจัดเก็บสินทรัพย์ดิจิทัลด้วย NFT.Storage และใช้สินทรัพย์ดิจิทัลนี้เพื่อมินต์ NFT ของคุณบน Polygon

## ข้อกำหนดเบื้องต้น {#prerequisites}

ความรู้ทั่วไปเกี่ยวกับ NFT จะให้ข้อมูลพื้นฐานและบริบทแก่คุณ[NFT School ครอบคลุมพื้นฐาน NFT](https://nftschool.dev/concepts/non-fungible-tokens/) หัวข้อขั้นสูง และมีบทช่วยสอนเพิ่มเติม

ในการทดสอบและเรียกใช้โค้ดที่พบในบทช่วยสอนนี้ คุณจะต้องมี[การติดตั้ง Node.js](https://nodejs.org/en/download/package-manager/) ที่ใช้งานได้

คุณจะต้องมีวอลเล็ต Polygon บน Mumbai Testnet ที่มีโทเค็น MATIC อยู่เล็กน้อยทำตามคำแนะนำด้านล่างเพื่อเริ่มต้น:

1. **ดาวน์โหลดติดตั้ง [Metamask](https://metamask.io/)**Metamask เป็นกระเป๋าเงินคริปโตและประตูสู่แอปบล็อกเชนใช้งานง่ายมากและทำให้หลายขั้นตอนง่ายขึ้น เช่น การตั้งค่าวอลเล็ต Polygon
2. **เชื่อมต่อ Metamask กับ [Mumbai Testnet](https://docs.polygon.technology/docs/develop/metamask/overview)**  ของ Polygon และเลือกในเมนูแบบเลื่อนลงเราจะใช้ Testnet ของ Polygon เพื่อมินต์ NFT ของเรา เนื่องจากไม่มีค่าใช้จ่าย
3. **รับโทเค็น MATIC** ไปยังวอลเล็ตของคุณโดยใช้ [Faucet](https://faucet.polygon.technology/)เลือก Mumbai Testnet และวางที่อยู่วอลเล็ตจาก Metamask ลงในแบบฟอร์ม ในการมินต์ NFT เราต้องจ่าย MATIC จำนวนเล็กน้อย ซึ่งเป็นค่าธรรมเนียมที่นักขุดเรียกเก็บเป็นค่าการดำเนินการเพื่อเพิ่มธุรกรรมใหม่ไปยังบล็อกเชน เช่น การมินต์ NFT หรือการสร้างสัญญาอัจฉริยะใหม่
4. **คัดลอกคีย์ส่วนตัวของคุณ**จาก Metamask โดยคลิกที่จุดสามจุดที่มุมบนขวาและเลือก "Account details"ที่ด้านล่าง คุณจะพบปุ่มสำหรับส่งออกคีย์ส่วนตัวของคุณคลิกและป้อนรหัสผ่านของคุณเมื่อได้รับแจ้งคุณสามารถคัดลอกและวางคีย์ส่วนตัวในไฟล์ข้อความได้ในขณะนี้เราจะใช้มันในภายหลังในบทเรียนเมื่อเชื่อมต่อกับบล็อกเชน

สุดท้าย คุณจะต้องมีโปรแกรมแก้ไขข้อความหรือโค้ดเพื่อความสะดวกยิ่งขึ้น เลือกตัวแก้ไขที่รองรับภาษาสำหรับทั้ง JavaScript และ Solidityตัวเลือกที่ดีคือ [Visual Studio Code](https://code.visualstudio.com) ที่มีส่วนขยาย [Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) เปิดใช้งาน

## การเตรียมการ {#preparation}

### รับคีย์ API สำหรับ NFT.storage {#get-an-api-key-for-nft-storage}

ในการใช้ NFT.Storage คุณต้องมีคีย์ APIขั้นแรก [ไปที่ NFT.Storage เพื่อเข้าสู่ระบบด้วยที่อยู่อีเมลของคุณ](https://nft.storage/login/)คุณจะได้รับอีเมลพร้อมลิงก์สุดพิเศษที่ให้คุณลงชื่อเข้าใช้ได้ โดยที่ไม่ต้องใช้รหัสผ่านหลังจากเข้าสู่ระบบสำเร็จแล้ว ให้ไปที่คีย์ API ผ่านแถบนำทางคุณจะพบปุ่มสำหรับสร้าง**คีย์ใหม่**เมื่อได้รับพร้อมท์ให้ใส่ชื่อคีย์ API คุณสามารถเลือกหนึ่งรายการหรือใช้ “polygon + NFT.Storage” ได้อย่างอิสระคุณสามารถคัดลอกเนื้อหาของคอลัมน์หลักตอนนี้หรืออ้างอิงกลับไปที่ NFT.Storage ในภายหลังในบทช่วยสอน

### ตั้งค่าพื้นที่ทำงานของคุณ {#set-up-your-workspace}

สร้างโฟลเดอร์เปล่าใหม่ที่เราสามารถใช้เป็นพื้นที่ทำงานสำหรับบทช่วยสอนนี้คุณสามารถเลือกชื่อและตำแหน่งใดก็ได้ในระบบไฟล์ของคุณเปิดเทอร์มินัล แล้วไปที่โฟลเดอร์ที่สร้างขึ้นใหม่

ต่อไป เราจะติดตั้งรูปแบบการขึ้นต่อกัน Node.js ต่อไปนี้:

- **Hardhat และ Hardhat-Ethers** สภาพแวดล้อมการพัฒนาสำหรับ Ethereum (และบล็อกเชนที่เข้ากันได้กับ Ethereum เช่น Polygon)
- **OpenZeppelin** คอลเลกชันสัญญาอัจฉริยะที่มีสัญญาพื้นฐาน NFT ที่ได้มาตรฐาน
- **NFT.Storage** ไลบรารีสำหรับเชื่อมต่อกับ NFT.Storage API
- **Dotenv** ไลบรารีสำหรับจัดการไฟล์แวดล้อมสำหรับการกำหนดค่า (เช่น การแทรกคีย์ส่วนตัวลงในสคริปต์)

ใช้คำสั่งต่อไปนี้เพื่อติดตั้งรูปแบบการขึ้นต่อกันทั้งหมดพร้อมกัน:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat ต้องได้รับการเตรียมใช้งานในโฟลเดอร์ปัจจุบันในการเริ่มการเตรียมใช้งาน ให้ดำเนินการ:

```bash
npx hardhat
```

เมื่อเสร็จแล้ว เลือก**สร้างฮาร์ดแฮตว่าง.config.js**เอาต์พุตคอนโซลของคุณควรมีลักษณะดังนี้:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

เราจะทำการแก้ไขบางอย่างกับไฟล์การกำหนดค่า `hardhat.config.js` เพื่อรองรับเครือข่ายการทดสอบ Polygon Mumbaiเปิด `hardhat.config.js` ที่สร้างขึ้นในขั้นตอนสุดท้ายโปรดทราบว่าเรากำลังโหลดคีย์ส่วนตัวสำหรับวอลเล็ต Polygon ของคุณจากไฟล์แวดล้อม และต้องเก็บไฟล์แวดล้อมนี้ไว้ให้ปลอดภัยคุณสามารถใช้[ลิงก์](https://docs.polygon.technology/docs/operate/network)  RPC อื่นได้ตามข้อกำหนด

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

สร้างไฟล์ใหม่ที่เรียกว่า `.env`ซึ่งจะเก็บกุญแจ API ของคุณสำหรับการจัดเก็บ NFT.Storage และคีย์กระเป๋าสตางค์ Polygon ส่วนตัวเนื้อหาของ`.env`ไฟล์ควรมีลักษณะบางอย่างเช่น:

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

แทนที่ตัวยึดตำแหน่งด้วยคีย์ API ที่คุณสร้างขึ้นระหว่างการเตรียมการและคีย์ส่วนตัวสำหรับวอลเล็ต Polygon ของคุณ

เพื่อให้โปรเจกต์ของเราเป็นระเบียบ เราจะสร้างโฟลเดอร์ใหม่สามโฟลเดอร์:

1. `contracts` สำหรับสัญญา Polygon ที่เขียนใน Solidity
2. `assets` ที่มีสินทรัพย์ดิจิทัลที่เราจะมินต์เป็น NFT
3. `scripts` เป็นผู้ช่วยในการขับเคลื่อนกระบวนการเตรียมการและการมินต์

ดำเนินการตามคำสั่งต่อไปนี้:

```bash
mkdir contracts assets scripts
```

สุดท้าย เราจะเพิ่มรูปภาพในโฟลเดอร์ `assets`ภาพนี้จะเป็นงานศิลปะของเราที่เราจะอัปโหลดไปยัง NFT.Storage และมินต์บน Polygonซึ่งเราจะเรียกว่า `MyExampleNFT.png` ในตอนนี้หากคุณไม่มีงานศิลปะที่ดีพร้อม คุณสามารถ[ดาวน์โหลดรูปลวดลายง่ายๆ](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu)

## การมินต์ NFT {#minting-your-nft}

### การจัดเก็บข้อมูลสินทรัพย์ด้วย NFT.Storage {#storing-asset-data-with-nft-storage}

เราจะใช้ NFT.Storage เพื่อจัดเก็บสินทรัพย์ดิจิทัลและข้อมูลเมตาของเราNFT.Storage รับประกันความไม่เปลี่ยนแปลงและความคงทนโดยการอัปโหลดสินทรัพย์ดิจิทัลของคุณไปยัง Filecoin และ IPFS โดยอัตโนมัติIPFS และ Filecoin ทำงานกับตัวระบุเนื้อหา (CID) สำหรับการอ้างอิงที่ไม่เปลี่ยนแปลงIPFS จะให้การดึงข้อมูลอย่างรวดเร็วด้วยการแคชที่จำลองตามพื้นที่ และ Filecoin จะรับประกันความคงทนด้วยผู้ให้บริการพื้นที่จัดเก็บข้อมูลที่ได้รับผลตอบแทน

สร้างสคริปต์ชื่อ `store-asset.mjs` ใต้ไดเรกทอรี `scripts`เนื้อหาอยู่ด้านล่าง:

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

ส่วนหลักของสคริปต์คือฟังก์ชัน `storeAsset`ซึ่งจะสร้างไคลเอ็นต์ใหม่ที่เชื่อมต่อกับ NFT.Storage โดยใช้คีย์ API ที่คุณสร้างไว้ก่อนหน้านี้ต่อไปเราจะแนะนำข้อมูลเมตาซึ่งประกอบด้วยชื่อ คำอธิบาย และภาพโปรดทราบว่าเรากำลังอ่านเนื้อหา NFT โดยตรงจากระบบไฟล์จากไดเรกทอรี `assets`ในตอนท้ายของฟังก์ชัน เราจะพิมพ์ URL ของข้อมูลเมตา เนื่องจากเราจะใช้ในภายหลังเมื่อสร้าง NFT บน Polygon

หลังจากตั้งค่าสคริปต์แล้ว คุณสามารถดำเนินการได้โดยเรียกใช้:

```bash
node scripts/store-asset.mjs
```

เอาต์พุตของคุณควรมีลักษณะเหมือนรายการด้านล่าง โดยที่ `HASH` เป็น CID ของงานศิลปะที่คุณเพิ่งเก็บไว้

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### การสร้าง NFT บน Polygon {#creating-your-nft-on-polygon}

#### สร้างสัญญาอัจฉริยะสำหรับการมินต์ {#create-the-smart-contract-for-minting}

ขั้นแรก เราจะสร้างสัญญาอัจฉริยะที่จะใช้ในการมินต์ NFTเนื่องจาก Polygon เข้ากันได้กับ Ethereum เราจะเขียนสัญญาอัจฉริยะใน [Solidity](https://soliditylang.org)สร้างไฟล์ใหม่สำหรับสัญญาอัจฉริยะ NFT ของเราที่ชื่อ `ExampleNFT.sol` ในไดเรกทอรี `contracts`คุณสามารถคัดลอกโค้ดของรายการด้านล่าง:

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

เพื่อให้เป็น NFT ที่ถูกต้อง สัญญาอัจฉริยะของคุณต้องใช้เมธอดทั้งหมดของ[มาตรฐาน ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)เราใช้การนำไลบรารี [OpenZeppelin](https://openzeppelin.com) มาใช้ ซึ่งมีชุดฟังก์ชันพื้นฐานอยู่แล้ว และเป็นไปตามมาตรฐาน

ที่ด้านบนสุดของสัญญาอัจฉริยะ เราได้นำเข้าคลาสของสัญญาอัจฉริยะ OpenZeppelin มาสามคลาส:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` มีการนำเมธอดพื้นฐานของมาตรฐาน ERC-721 ไปใช้ ซึ่งสัญญาอัจฉริยะ NFT ของเราจะสืบทอดเราใช้ `ERC721URIStorage,` ซึ่งเป็นส่วนขยายที่ไม่ได้จัดเก็บแค่สินทรัพย์ แต่ยังจัดเก็บข้อมูลเมตาเป็นไฟล์ JSON นอกเชนอีกด้วยเช่นเดียวกับสัญญา ไฟล์ JSON นี้ต้องเป็นไปตาม ERC-721

2. `\@openzeppelin/contracts/utils/Counters.sol` มีตัวนับที่สามารถเพิ่มหรือลดได้ทีละหนึ่งหน่วยเท่านั้นสัญญาอัจฉริยะของเราใช้ตัวนับเพื่อติดตามจำนวน NFT ทั้งหมดที่มินต์เสร็จ และเพื่อตั้งค่า ID ที่ไม่ซ้ำใน NFT ใหม่ของเรา

3. `\@openzeppelin/contracts/access/Ownable.sol` ตั้งค่าการควบคุมการเข้าถึงบนสัญญาอัจฉริยะของเรา ดังนั้นเฉพาะเจ้าของสัญญาอัจฉริยะ (คุณ) เท่านั้นสามารถมินต์ NFT ได้

หลังจากชุดคำสั่งนำเข้าของเรา เรามีสัญญาอัจฉริยะ NFT แบบกำหนดเอง ซึ่งมีตัวนับ ตัวสร้าง และเมธอดการมินต์ NFT จริงงานหนักส่วนใหญ่จะได้รับการดำเนินการโดยสัญญาพื้นฐานที่สืบทอดมาจาก OpenZeppelin ซึ่งใช้เมธอดส่วนใหญ่ที่เราต้องใช้เพื่อสร้าง NFT ที่เป็นไปตามมาตรฐาน ERC-721

ตัวนับจะติดตามจำนวน NFT ทั้งหมดที่มินต์เสร็จ ซึ่งใช้ในเมธอดการมินต์เป็นตัวระบุเฉพาะสำหรับ NFT

ในตัวสร้าง เราส่งผ่านสตริงอาร์กิวเมนต์สองตัวสำหรับชื่อของสัญญาอัจฉริยะและสัญลักษณ์ (แสดงอยู่ในวอลเล็ต)คุณสามารถเปลี่ยนได้ตามที่คุณต้องการ

ท้ายสุด เรามีเมธอด `mintNFT` ที่ช่วยให้เรามินต์ NFT ได้จริงมีการตั้งค่าเมธอดเป็น `onlyOwner` เพื่อให้แน่ใจว่าเจ้าของสัญญาอัจฉริยะสามารถดำเนินการได้คนเดียวเท่านั้น

`address recipient`กำหนดที่อยู่ที่จะได้รับ NFT ในตอนแรก

`string memory tokenURI` เป็น URL ที่ควรแยกวิเคราะห์เอกสาร JSON ที่อธิบายข้อมูลเมตาของ NFTซึ่งในกรณีของเรา เก็บไว้ใน NFT.Storage แล้วเราสามารถใช้ลิงก์ IPFS ที่ส่งคืนกับไฟล์ JSON ของข้อมูลเมตาระหว่างการดำเนินการของเมธอดได้

ในเมธอดนี้ เราเพิ่มตัวนับเพื่อรับตัวระบุใหม่ที่ไม่ซ้ำให้กับ NFT ของเราจากนั้น เราจะเรียกเมธอดที่ได้รับจากสัญญาพื้นฐานจาก OpenZeppelin เพื่อมินต์ NFT ให้กับผู้รับด้วยตัวระบุที่สร้างขึ้นใหม่และตั้งค่า URI ของข้อมูลเมตาเมธอดจะส่งคืนตัวระบุเฉพาะหลังจากดำเนินการ

#### ปรับใช้สัญญาอัจฉริยะกับ Polygon {#deploy-the-smart-contract-to-polygon}

ถึงเวลาปรับใช้สัญญาอัจฉริยะของเรากับ Polygon แล้วสร้างไฟล์ใหม่ชื่อ `deploy-contract.mjs` ในไดเรกทอรี `scripts`คัดลอกเนื้อหาของรายการด้านล่างลงในไฟล์นั้นแล้วบันทึก

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

การปรับใช้สัญญาทำได้โดยใช้ฟังก์ชันตัวช่วยที่ไลบรารี Hardhat จัดเตรียมไว้ขั้นแรก เราจะรับสัญญาอัจฉริยะที่เราสร้างขึ้นในขั้นตอนก่อนหน้าโดยใช้ Factory ที่จัดเตรียมไว้จากนั้น เราจะปรับใช้โดยเรียกเมธอดเที่เกี่ยวข้องและรอให้การปรับใช้เสร็จสมบูรณ์มีอีกสองสามบรรทัดด้านล่างโค้ดที่อธิบายไว้เพื่อรับที่อยู่ที่ถูกต้องในสภาพแวดล้อม Testnetบันทึก`mjs`แฟ้ม

ประมวลผลสคริปต์ด้วยคำสั่งต่อไปนี้:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

หากทุกอย่างถูกต้อง คุณจะเห็นเอาต์พุตต่อไปนี้:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

โปรดทราบว่าคุณจะต้องมีที่อยู่สัญญาที่พิมพ์ออกมาในขั้นตอนการมินต์คุณสามารถคัดลอกและวางลงในไฟล์ข้อความแยกต่างหากและบันทึกไว้สำหรับภายหลังนี่เป็นสิ่งจำเป็นเพื่อให้สคริปต์การมินต์สามารถเรียกเมธอดการมินต์ของสัญญาเฉพาะนั้น

#### การมินต์ NFT บน Polygon {#minting-the-nft-on-polygon}

การมินต์ NFT ตอนนี้เพียงแค่เรียกสัญญาที่เราเพิ่งปรับใช้ไปยัง Polygonสร้างไฟล์ใหม่ชื่อ `mint-nft.mjs` ในไดเรกทอรี `scripts` และคัดลอกโค้ดนี้จากรายการด้านล่าง:

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

แก้ไขสองบรรทัดแรกเพื่อแทรก**ที่อยู่สัญญา**ของคุณจากการปรับใช้ก่อนหน้านี้และ **URL ของข้อมูลเมตา**ที่ส่งคืนเมื่อจัดเก็บสินทรัพย์ด้วย NFT.Storageสคริปต์ที่เหลือจะตั้งค่าการเรียกสัญญาอัจฉริยะกับคุณในฐานะผู้ที่จะเป็นเจ้าของ NFT และตัวชี้ไปยังข้อมูลเมตาที่จัดเก็บไว้ใน IPFS

ต่อไป ให้เรียกใช้สคริปต์:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

คุณสามารถคาดว่าจะเห็นผลลัพธ์ต่อไปนี้:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

มองหาโค้ดตัวอย่างจากบทช่วยสอนนี้อยู่ใช่ไหมคุณสามารถพบโค้ดได้ในพื้นที่เก็บข้อมูล polygon-nft.storage-demo ([ลิงก์](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo))

## สรุป: {#conclusion}

ในบทช่วยสอนนี้ เราได้เรียนรู้วิธีมินต์ NFT ตั้งแต่ต้นจนจบด้วย Polygon และ NFT.Storageการผสมผสานเทคโนโลยีนี้ส่งผลให้เกิดการทำงานแบบไร้ตัวกลางที่เหมาะสม และรับประกัน*ความสามารถในการปรับขนาด* *ความคงทน* และ*การไม่เปลี่ยนแปลง*

เราปรับใช้สัญญาอัจฉริยะที่กำหนดเองเพื่อมินต์ NFT ของเราตามความต้องการของเราโดยเฉพาะสำหรับบทช่วยสอนนี้ เราใช้ตัวอย่างง่ายๆ ตามมาตรฐาน ERC-721อย่างไรก็ตาม คุณยังสามารถกำหนดลอจิกที่ซับซ้อนซึ่งควบคุมวงจรชีวิต NFT ของคุณสำหรับกรณีการใช้งานที่ซับซ้อนมากขึ้น [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) มาตรฐานที่ตามมานั้นเป็นจุดเริ่มต้นที่ดีOpenZeppelin ไลบรารีที่เราใช้ในบทช่วยสอนของเรามี[ตัวช่วยสร้างสัญญา](https://docs.openzeppelin.com/contracts/4.x/wizard)ที่ช่วยสร้างสัญญา NFT

การมินต์ที่ประสบความสำเร็จถือเป็นจุดเริ่มต้นของขั้นตอนอันมีค่าของ NFTจากนั้นสามารถใช้ NFT เพื่อพิสูจน์ความเป็นเจ้าของและสามารถโอนไปยังผู้ใช้รายอื่นๆเหตุผลในการโอน NFT อาจรวมถึงการขายที่ประสบความสำเร็จในตลาดกลางของ NFT เช่น [OpenSea](https://opensea.io) หรืออีเวนต์ประเภทอื่น เช่น การรับไอเท็มในเกมที่ใช้ NFTแน่นอนว่า การสำรวจความเป็นไปได้มากมายสำหรับ NFT เป็นขั้นตอนต่อไปอันน่าตื่นเต้น

หากคุณต้องการช่วยสร้างโครงการ NFT ของคุณด้วยการจัดเก็บ NFT.ให้เรารวมถึง`#nft-storage`ช่องทางบน [Display](https://discord.gg/Z4H6tdECb9) และ [Slack](https://filecoinproject.slack.com/archives/C021JJRH26B)
