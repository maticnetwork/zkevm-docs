---
id: nftstorage
title: NFT 발행
description: NFT.storage 및 Polygon으로 발행합니다.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

이 튜토리얼에서는 NFT.Storage를 통해 Polygon 블록체인과 IPFS/Filecoin 스토리지를 사용하여 NFT를 발행하는 방법을 설명합니다. 이더리움을 위한 레이어 2 확장 솔루션인 Polygon은 이더리움의 EVM과 완전한 호환성을 유지하면서 속도와 트랜잭션 비용이 낮다는 점에서 개발자들이 자주 선택하는 솔루션입니다. 이 튜토리얼에서는 NFT.Storage API를 통해 메타데이터와 자산을 IPFS 및 Filecoin에 저장하고 NFT를 사용자의 Polygon 지갑에 발행하는 표준화된 스마트 계약을 생성하고 배포하는 과정을 안내합니다.

## 소개 {#introduction}

이 튜토리얼에서는 발행 프로세스를 통해 다음 세 가지 특성을 달성하는 것을 목표로 합니다.

1. 비용 및 처리량 측면에서 발행 프로세스의 *확장성*. 사용 사례가 NFT를 신속하게 생성하는 것을 목표로 한다면, 기본 기술이 모든 발행 요청을 처리해야 하며 발행 비용이 저렴해야 합니다.
2. NFT의 *내구성*. 자산은 수명이 길 수 있으므로 전체 수명 동안 사용할 수 있어야 합니다.
3. NFT의 *불변성*과 NFT가 나타내는 자산은 원치 않는 변경 및 악의적인 행위자가 NFT가 나타내는 디지털 자산을 변경하는 것을 방지합니다.

[Polygon](https://polygon.technology)은 프로토콜과 프레임워크로 *확장성* 특성을 해결합니다. 또한 이더리움 및 해당 가상 머신과 호환되므로 개발자가 두 블록체인 사이에서 코드를 자유롭게 이동할 수 있습니다. 마찬가지로, [NFT.Storage](https://nft.storage)는 기본 [Filecoin](https://filecoin.io) 네트워크가 제공하는 *내구성*과 IPFS의 [콘텐츠 주소 지정](https://nftschool.dev/concepts/content-addressing/)을 통한 *불변성*을 보장합니다.

이 튜토리얼에서는 NFT 발행 프로세스의 개요, NFT.Storage를 사용하여 디지털 자산을 저장하는 방법, 디지털 자산을 사용하여 Polygon에서 NFT를 발행하는 방법에 대해 알아봅니다.

## 기본 요건 {#prerequisites}

NFT에 대한 일반저인 지식을 갖추면 배경과 맥락을 이해할 수 있습니다. [NFT School은 NFT 기본 사항](https://nftschool.dev/concepts/non-fungible-tokens/), 고급 주제 및 더 많은 튜토리얼을 제공합니다.

이 튜토리얼에 있는 코드를 테스트하고 실행하려면 [Node.js 설치](https://nodejs.org/en/download/package-manager/)가 필요합니다.

또한 Mumbai 테스트넷에는 소량의 매틱 토큰이 있는 Polygon 지갑이 필요합니다. 아래 지침을 따라 시작하세요.

1. **[메타마스크를](https://metamask.io/) 다운로드하고 설치하세요**. 메타마스크는 암호화폐 지갑이자 블록체인 앱의 관문입니다. 이 제품은 매우 사용하기 쉽고 Polygon 지갑 설정과 같은 많은 단계를 단순화합니다.
2. **메타마스크를 Polygon의 [Mumbai 테스트넷](https://docs.polygon.technology/docs/develop/metamask/overview)에 연결하고** 드롭다운 메뉴에서 선택하세요. 무료로 사용 가능한 Polygon의 테스트넷을 사용하여 NFT를 발행할 것입니다.
3. [Faucet](https://faucet.polygon.technology/)을 사용하여 지갑에 **매틱 토큰을 받으세요**. Mumbai 테스트넷을 선택하고 메타마스크의 지갑 주소를 양식에 붙여 넣으세요. NFT를 발행하려면 채굴자가 블록체인에 새로운 트랜잭션을 추가하는 작업(예: NFT 발행, 새 스마트 계약 생성 등)에 대해 부과하는 수수료인 매틱을 소량 지불해야 합니다.
4. 오른쪽 상단에 있는 점 세 개를 클릭하고 '계정 세부 정보'를 선택하여 메타마스크의 **비공개 키를 복사하세요**. 맨 아래에 비공개 키를 내보낼 수 있는 버튼이 있습니다. 메시지가 나타나면 클릭하고 비밀번호를 입력하세요. 지금은 비공개 키를 복사하여 텍스트 파일에 붙여 넣을 수 있습니다. 나중에 튜토리얼에서 블록체인과 상호작용할 때 사용할 것입니다.

마지막으로 텍스트 또는 코드 편집기가 필요합니다. JavaScript와 Solidity 언어를 모두 지원하는 편집기를 선택하면 더욱 편리합니다. [Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) 확장 프로그램이 사용 설정된 [Visual Studio Code](https://code.visualstudio.com)가 좋은 옵션입니다.

## 준비 {#preparation}

### NFT.storage의 API 키 가져오기 {#get-an-api-key-for-nft-storage}

NFT.Storage를 사용하려면 API 키가 필요합니다. 먼저, [NFT.Storage로 가서 이메일 주소로 로그인하세요](https://nft.storage/login/). 로그인하는 마법 링크가 포함된 이메일을 받게 됩니다. 비밀번호는 필요 없습니다. 로그인한 후 탐색 메뉴를 통해 API 키로 이동합니다. **새 키**를 만들 수 있는 버튼을 찾을 수 있습니다. API 키 이름을 입력하라는 메시지가 나타나면 자유롭게 하나를 선택하거나 'polygon + NFT.Storage'를 사용할 수 있습니다. 지금 키 열의 내용을 복사하거나 튜토리얼의 뒷부분에서 NFT.Storag를 다시 참조할 수 있습니다.

### 작업 공간 설정 {#set-up-your-workspace}

이 튜토리얼의 작업 공간으로 사용할 수 있는 빈 폴더를 새로 만듭니다. 파일 시스템의 이름과 위치를 자유롭게 선택하세요. 터미널을 열고 새로 만든 폴더로 이동합니다.

그다음, 다음 Node.js 종속 항목을 설치합니다.

- **Hardhat 및 Hardhat-Ethers**, 이더리움(및 Polygon과 같은 이더리움 호환 블록체인)을 위한 개발 환경
- **OpenZeppelin**, 표준화된 NFT 기본 계약을 특징으로 하는 스마트 계약 모음
- **NFT.Storage**, NFT.Storage API에 연결할 라이브러리
- **Dotenv**, 구성(예: 스크립트에 비공개 키 삽입)을 위한 환경 파일을 다루는 라이브러리

다음 명령어를 사용하여 모든 종속 항목을 한번에 설치합니다.

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

현재 폴더에서 Hardhat을 초기화해야 합니다. 초기화를 시작하려면 다음을 실행합니다.

```bash
npx hardhat
```

자바다가 **비어** 있는 hatht.config.js를 생성합니다. 콘솔 출력은 다음과 같습니다.

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Polygon Mumbai 테스트 네트워크를 지원하기 `hardhat.config.js`위해 hardhat 구성 파일  일부를 수정할 것입니다. 마지막 단계에서 생성된 `hardhat.config.js`를 엽니다. 환경 파일에서 Polygon 지갑 비공개 키를 로드하고 있으며 이 환경 파일을 안전하게 보관해야 합니다. 필요에 따라 다른 RPC [링크를](https://docs.polygon.technology/docs/develop/network-details/network) 사용할 수도 있습니다.

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

NFT.스토리지 및 Polygon 지갑 전용 키를 `.env`보유할 새로운 파일을 만듭니다. `.env`파일의 내용은 다음과 같이 생겼을 것입니다.

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

자리 표시자를 준비 과정에서 만든 API 키와 Polygon 지갑 비공개 키로 바꿉니다.

프로젝트를 정리하기 위해 다음 세 폴더를 새로 만듭니다.

1. `contracts`, Solidity로 작성된 Polygon 계약의 경우
2. `assets`, NFT로 발행할 디지털 자산 포함
3. `scripts`, 준비와 발행 과정을 이끄는 도우미

다음 명령어를 실행합니다.

```bash
mkdir contracts assets scripts
```

마지막으로, `assets` 폴더에 이미지를 추가합니다. 이 이미지는 NFT.Storage에 업로드하고 Polygon에 발행할 작품이 될 것입니다. 일단 `MyExampleNFT.png`라고 이름을 지정합니다. 멋진 예술 작품이 준비되지 않았다면, [간단한 패턴을 다운로드](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu)할 수 있습니다.

## NFT 발행 {#minting-your-nft}

### NFT.Storage로 자산 데이터 저장 {#storing-asset-data-with-nft-storage}

디지털 자산과 메타데이터를 저장하기 위해 NFT.Storage를 사용할 것입니다. NFT.Storage는 Filecoin과 IPFS에 디지털 자산을 자동으로 업로드하여 불변성과 내구성을 보장합니다. IPFS 및 Filecoin은 변경되지 않는 참조를 위해 콘텐츠 식별자(CID)를 사용합니다. IPFS는 지역별 복제 캐싱을 통해 빠른 검색 기능을 제공하며, Filecoin은 인센티브를 받는 스토리지 공급업체를 통해 내구성을 보장합니다.

`scripts` 디렉터리 아래에 `store-asset.mjs`라는 스크립트를 작성합니다. 아래에 내용이 나열되어 있습니다.

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

스크립트의 주요 부분은 `storeAsset` 함수입니다. 이전에 생성한 API 키를 사용하여 NFT.Storage에 연결하는 새로운 클라이언트를 생성합니다. 다음으로 이름, 설명 및 이미지로 구성된 메타데이터를 소개합니다. 파일 시스템의 `assets` 디렉터리에서 직접 NFT 자산을 읽습니다. 이 함수의 끝에서 메타데이터 URL을 인쇄합니다. 이 URL은 나중에 Polygon에서 NFT를 만들 때 사용하게 됩니다.

스크립트를 설정한 후 다음을 실행하여 스크립트를 실행할 수 있습니다.

```bash
node scripts/store-asset.mjs
```

출력은 아래 목록과 같아야 합니다. 여기서 `HASH`는 방금 저장한 작품의 CID입니다.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Polygon에서 NFT 생성 {#creating-your-nft-on-polygon}

#### 발행을 위한 스마트 계약 생성 {#create-the-smart-contract-for-minting}

먼저, NFT를 발행하는 데 사용될 스마트 계약을 만들 것입니다. Polygon은 이더리움과 호환되기 때문에 [Solidity](https://soliditylang.org)로 스마트 계약을 작성합니다. `contracts` 디렉터리 내에 `ExampleNFT.sol`이라는 NFT 스마트 계약을 위한 새로운 파일을 만듭니다. 아래 목록의 코드 사본을 복사할 수 있습니다.

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

유효한 NFT를 만들려면 스마트 계약에 [ERC-721 표준](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)의 모든 메서드를 구현해야 합니다. 이미 일련의 기본 기능을 제공하고 표준을 준수하는 [OpenZeppelin](https://openzeppelin.com) 라이브러리의 구현을 사용합니다.

스마트 계약 상단에는 다음과 같은 세 가지 OpenZeppelin 스마트 계약 클래스를 가져옵니다.

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol`에는 NFT 스마트 계약이 상속할 ERC-721 표준의 기본 메서드 구현이 포함되어 있습니다. 자산뿐만 아니라 메타데이터도 오프체인 JSON 파일로 저장하기 위한 확장자인 `ERC721URIStorage,`를 사용합니다. 계약과 마찬가지로 이 JSON 파일은 ERC-721을 준수해야 합니다.

2. `\@openzeppelin/contracts/utils/Counters.sol`은 1만큼만 증가하거나 감소시킬 수 있는 카운터를 제공합니다. 스마트 계약은 카운터를 사용하여 발행된 총 NFT 수를 추적하고 새로운 NFT에 고유한 ID를 설정합니다.

3. `\@openzeppelin/contracts/access/Ownable.sol`은 스마트 계약에 대한 액세스 제어를 설정하므로 스마트 계약 소유자만이 NFT를 발행할 수 있습니다.

가져오기 구문을 사용한 후, 카운터, 생성자, 실제로 NFT를 발행하는 메서드를 포함하는 사용자 정의 NFT 스마트 계약을 만들 수 있습니다. 대부분의 힘든 작업은 OpenZeppelin에서 상속받은 기본 계약에 의해 수행되며, 이는 ERC-721 표준을 준수하는 NFT를 만드는 데 필요한 대부분의 메서드를 구현합니다.

카운터는 발행된 총 NFT 수를 추적하며, 이는 발행 메서드에서 NFT의 고유 식별자로 사용됩니다.

생성자에서 스마트 계약 이름과 (지갑에 표시된) 기호에 대한 두 개의 문자열 인수를 전달합니다. 이는 원하는 대로 변경할 수 있습니다.

마지막으로, 실제로 NFT를 발행할 수 있는 메서드 `mintNFT`가 있습니다. 이 메서드는 스마트 계약 소유자만 실행할 수 있도록 `onlyOwner`로 설정됩니다.

`address recipient`처음에는 NFT를 받을 주소를 지정합니다.

`string memory tokenURI`는 NFT의 메타데이터를 설명하는 JSON 문서로 확인해야 하는 URL입니다. 이 경우에는 이미 NFT.Storage에 저장되어 있습니다. 메서드를 실행하는 동안 메타데이터 JSON 파일에 반환된 IPFS 링크를 사용할 수 있습니다.

메서드 내에서 NFT에 대한 새로운 고유 식별자를 수신하기 위해 카운터를 증가시킵니다. 그런 다음 OpenZeppelin에서 기본 계약이 제공하는 메서드를 호출하여 새로 생성된 식별자와 함께 NFT를 수신자에게 발행하고 메타데이터의 URI를 설정합니다. 이 메서드는 실행 후 고유 식별자를 반환합니다.

#### Polygon에 스마트 계약 배포 {#deploy-the-smart-contract-to-polygon}

이제 스마트 계약을 Polygon에 배포할 차례입니다. `scripts` 디렉터리 내에 `deploy-contract.mjs`라는 새 파일을 만듭니다. 아래 목록의 내용을 이 파일에 복사하여 저장하세요.

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

계약 배포는 hardhat 라이브러리에서 제공하는 도우미 함수를 사용해 수행합니다. 먼저, 이전 단계에서 작성한 스마트 계약과 제공된 팩토리를 가져옵니다. 그런 다음 각 메서드를 호출하여 배포하고 배포가 완료될 때까지 기다립니다. 설명된 코드 아래에 테스트넷 환경에서 올바른 주소를 얻기 위한 명령줄이 몇 개 더 있습니다. 파일을 `mjs`저장합니다.

다음 명령으로 스크립트 실행:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

모든 정보가 올바르면 다음 출력이 표시됩니다.

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

인쇄된 계약 주소가 발행 단계에서 필요합니다. 나중에 필요하므로 이 주소를 복사하여 별도의 텍스트 파일에 붙여 넣고 저장할 수 있습니다. 이 과정은 발행 스크립트가 특정 계약의 발행 메서드를 호출하기 위해 필요합니다.

#### Polygon에서 NFT 발행 {#minting-the-nft-on-polygon}

이제 Polygon에 배치한 계약을 호출하기만 하면 NFT가 발행됩니다. `scripts` 디렉터리 내에 `mint-nft.mjs`라는 새 파일을 만들고 아래 목록에서 이 코드를 복사합니다.

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

첫 두 줄을 수정하여 이전 배포의 **계약 주소** 및 NFT.Storage에 자산을 저장할 때 반환된 **메타데이터 URL**을 삽입합니다. 스크립트의 나머지 부분에서는 NFT의 소유자가 될 사용자와 IPFS에 저장된 메타데이터에 대한 포인터로 스마트 계약에 대한 호출을 설정합니다.

이제 다음 스크립트를 실행합니다.

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

다음과 같은 출력이 표시됩니다.

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

이 튜토리얼에서 샘플 코드를 찾고 계시나요? polygon-nft.storage-demo [링크](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) Github 저장소에서 찾을 수 있습니다.

## 결론 {#conclusion}

이 튜토리얼에서는 Polygon 및 NFT.Storage로 NFT를 발행하는 전 과정에 대해 살펴봤습니다. 이 기술 조합을 통해 적절한 분산화를 이루고, *확장성*, *내구성*, *불변성*을 보장할 수 있습니다.

필요에 맞는 NFT를 발행하기 위해 사용자 정의 스마트 계약을 배포했습니다. 이 튜토리얼에서는 ERC-721 표준에 기반한 간단한 예를 사용했습니다. 그러나 NFT 수명 주기를 제어하는 복잡한 논리도 정의할 수 있습니다. 보다 복잡한 사용 사례의 경우 뒤따르는 표준 [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)를 시작하는 것이 좋습니다. 튜토리얼에서 사용하는 라이브러리인 OpenZeppelin은 NFT 계약을 만드는 데 도움이 되는 [계약 마법사](https://docs.openzeppelin.com/contracts/4.x/wizard)를 제공합니다.

성공적인 발행은 NFT의 가치 있는 단계의 시작이라고 볼 수 있습니다. 그런 다음 NFT를 사용하여 소유권을 입증하고 다른 사용자에게 이전할 수 있습니다. NFT를 이전하는 이유에는 [OpenSea](https://opensea.io)와 같은 NFT 마켓플레이스 중 하나에서 성공적인 판매 또는 NFT 기반 게임에서 아이템 획득과 같은 다른 유형의 이벤트 등이 있을 수 있습니다. 다음 단계로 NFT의 다양한 가능성을 탐색하는 것은 분명 흥미로울 것입니다.

NFT.script를 통해 NFT 프로젝트를 구축하는 데 도움을 원한다면 [Disclosion](https://discord.gg/Z4H6tdECb9) 및 [Slack에](https://filecoinproject.slack.com/archives/C021JJRH26B) `#nft-storage`채널에 가입할 것을 권장합니다.
