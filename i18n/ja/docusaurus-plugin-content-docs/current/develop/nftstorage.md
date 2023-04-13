---
id: nftstorage
title: NFTをミントする
description: NFT.storageとPolygonでミントします。
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

このチュートリアルでは、PolygonブロックチェーンをミントしてNFTを作成し、NFT.Storageを介して IPFS/Filecoinストレージを作成する方法を説明します。Ethereumのレイヤー2のスケーリングソリューションであるPolygonは、その速度とトランザクションコストの削減、その一方で、EthereumのEVMとのフルな互換性を維持していることから、開発者に選ばれることがよくあります。このチュートリアルでは、標準化されたスマートコントラクトの作成とデプロイ、NFT.Storage APIを介した、PFSとFilecoinへのメタデータと資産の保存、Polygon上での独自のウォレットへのNFTのミントについて説明します。

## 導入 {#introduction}

このチュートリアルでは、ミントプロセスで3つの特性を満たすことを目指します。

1. コストとスループットに関するミントプロセスの*スケーラビリティ*。ユースケースが、NFTを迅速に作成することを目的としている場合、基盤となるテクノロジーは、すべてのミントリクエストを処理する必要があり、ミントは安価でなければなりません。
2. NFTの*耐久性*は、資産は長期間存続する可能性があるため、その存続期間中はフルに使用可能である必要があります。
3. NFTとそれが表す資産の*不変性*は、NFTが表すデジタル資産を不要な変更や悪意のある者が変更するのを防ぎます。

[Polygon](https://polygon.technology)は、プロトコルとフレームワークで*スケーラビリティ*の特性に対応します。また、 Ethereumとその仮想マシンと互換性があるため、開発者は、2つのブロックチェーン間でコードを自由に移動できます。同様に、[NFT.Storage](https://nft.storage)は、基盤となる[Filecoin](https://filecoin.io)ネットワークの力で*耐久性*を保証し、IPFSの[·コンテンツアドレス指定](https://nftschool.dev/concepts/content-addressing/)を使用することで、*不変性*を保証します。

このチュートリアルでは、NFTのミントプロセスの概要を説明し、NFT.Storageを使用してデジタル資産を保存する方法を学び、このデジタル資産を使用してPolygonでNFTをミントします。

## 前提条件 {#prerequisites}

NFTに関する一般的な知識により、背景やコンテキストを知ることができます。NFT Schoolでは、[NFTの基本](https://nftschool.dev/concepts/non-fungible-tokens/)、高度なトピック、そしてさらに多くのチュートリアルををカバーしています。

このチュートリアルにあるコードをテストして実行するには、[Node.js](https://nodejs.org/en/download/package-manager/)のインストールが必要です。

Mumbaiテストネットには、少額のMATICトークンが入ったPolygonウォレットも必要です。始めるには、以下の手順に従ってください。

1. **[MetaMask](https://metamask.io/)をダウンロードしインストールします**。MetaMaskは、暗号通貨ウォレットあり、ブロックチェーンアプリケーションへのゲートウェイです。非常に使いやすく、Polygonウォレットの設定など、多くの手順が簡素化されます。
2. **MetamaskをPolygonの[Mumbaiテストネット](https://docs.polygon.technology/docs/develop/metamask/overview)に接続し**、ドロップダウンメニューで選択します。無料のPolygonテストネットを使用してNFTをミントします。
3. [faucet](https://faucet.polygon.technology/)を使用して、**MATIC トークン**をウォレットに受け取ります。Mumbaiテストネットを選択し、Metamaskからのウォレットアドレスをフォームに貼り付けます。NFTをミントするには、少額のMATICを支払う必要があります。これは、NFTのミントや新しいスマートコントラクトの作成など、ブロックチェーンに新しいトランザクションを追加する操作に対してマイナーが請求する料金です。
4. 右上隅にある3つの点をクリックし、[アカウントの詳細]を選択して、Metamaskから**秘密鍵をコピー**します。下部に、秘密鍵をエクスポートするためのボタンがあります。それをクリックし、プロンプトが表示されたらパスワードを入力します。これで、秘密鍵をコピーしてテキストファイルに貼り付けることができます。チュートリアルの後半で、それをブロックチェーンとやり取りするときに使用します。

最後に、テキストエディタまたはコードエディタが必要です。より便利にするために、JavaScriptとSolidityの両方の言語をサポートするエディターを選択してください。適切なオプションは、[solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)拡張機能が有効になっている[Visual Studio Code](https://code.visualstudio.com)です。

## 準備 {#preparation}

### NFT.storageのAPI鍵を取得する {#get-an-api-key-for-nft-storage}

NFT.Storageを使用するには、API鍵が必要です。まず、[NFT.Storageにアクセスして、メールアドレスでログインします](https://nft.storage/login/)。サインインするためのマジックリンクが記載されたメールが届きます -- パスワードは必要ありません。ログインに成功したら、ナビゲーションバーからAPI鍵に移動します。**新しい鍵**を作成するボタンがあります。API鍵名の入力を求められたら、自由に選択するか、「ポリゴン + NFT.Storage」を使用できます。ここで、キー列の内容をコピーするか、チュートリアルの後半でNFT.Storageを参照することができます。

### ワークスペースを設定する {#set-up-your-workspace}

このチュートリアルのワークスペースとして使用できる新しい空のフォルダーを作成します。ファイルシステム上の任意の名前と場所を自由に選択してください。ターミナルを開き、新しく作成されたフォルダーに移動します。

次に、以下のNode.jsの依存関係をインストールします：

- **HardhatおよびHardhat-Ethers** - Ethereum (およびPolygonなどのEthereumと互換性のあるブロックチェーン) の開発環境。
- **OpenZeppelin** - 標準化されたNFTベースコントラクトを特徴とするスマートコントラクトのコレクション。
- **NFT.Storage** - NFT.Storag APIに接続するライブラリ。
- **Dotenv** - 設定用の環境ファイルを処理するライブラリ（例：スクリスクリプトにプライベート鍵を入れる）。

次のコマンドを使用して、すべての依存関係を一度にインストールします：

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhatは、現在のフォルダーで初期化する必要があります。初期化をスタートするには、次を実行します：

```bash
npx hardhat
```

プロンプトが表示されたら、**空のハードハットを**作成するを選択します。コンソール出力は、以下のようになります：

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

hardhatの設定ファイル`hardhat.config.js`にいくつかの変更を行い、Polygon Mumbaiテストネットワークをサポートします。前のステップで作成した`hardhat.config.js`を開きます。Polygonウォレットの秘密鍵を環境ファイルから読み込んでいること、また、この環境ファイルは安全に保管する必要があることに注意してください。必要に応じて、他のrpc.[リンク](https://docs.polygon.technology/docs/develop/network-details/network)を使用することもできます。

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

NFT用のAPIキーを保持するファイルを作成します。ストレージとPolygonウォレットの秘密鍵を保持`.env`します。`.env`ファイルの内容は次のようになります：

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

プレースホルダーを、準備中に作成したAPI鍵とPolygonウォレットの秘密鍵に置き換えます。

プロジェクトを整理するために、3つの新しいフォルダーを作成します。

1. `contracts`：Solidityで記述されたPolygonコントラクト用。
2. `assets`：NFTとしてミントするデジタル資産を含む。
3. `scripts`：準備とミントプロセスを推進するヘルパー。

以下のコマンドを実行します：

```bash
mkdir contracts assets scripts
```

最後に、`assets`フォルダに画像を追加します。この画像は、NFT.Storageにアップロードするアートワークとなり、Polygonで作成されます。とりあえず、名前を`MyExampleNFT.png`とします。素敵なアートの準備ができていない場合は、[簡単なパターンをダウンロード](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu)できます。

## NFTをミントする {#minting-your-nft}

### NFT.Storageで資産データを保存する {#storing-asset-data-with-nft-storage}

NFT.Storageを使用して、デジタル資産とそのメタデータを保存します。NFT.Storageは、デジタル資産をFilecoinとIPFSに自動的にアップロードすることで、不変性と耐久性を保証します。IPFSとFilecoinは、不変の参照のためにコンテンツ識別子（CID）で動作します。IPFSは、地理的に複製されたキャッシングで高速検索を提供し、Filecoinはインセンティブストレージプロバイダで耐久性を保証します。

`scripts`ディレクトリの下に`store-asset.mjs`というスクリプトを作成します。内容は以下のとおりです：

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

スクリプトのメインとなる部分は、`storeAsset`機能です。これは、先に作成したAPI鍵を使用して、NFT.Storageに接続する新しいクライアントを作成します。次に、名前、説明、画像からなるメタデータを紹介します。`assets`ディレクトリのファイルシステムから、NFT資産を直接読み取っていることに注意してください。機能の最後に、メタデータURLを出力し、後からPolygon上でNFTを作成するときに使用します。

スクリプトをセットアップしたら、以下のコマンドを実行してスクリプトを実行できます。

```bash
node scripts/store-asset.mjs
```

出力は、以下のリストのようになります。`HASH`は、保存したアートのCIDです。

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Polygon上でNFTを作成する {#creating-your-nft-on-polygon}

#### ミント用のスマートコントラクトを作成する {#create-the-smart-contract-for-minting}

まず、NFTのミントに使用されるスマートコントラクトを作成します。Polygonは、Ethereumに対応しているため、[Solidity](https://soliditylang.org)でスマートコントラクトを記述します。`contracts`ディレクトリ内に`ExampleNFT.sol`というNFTスマートコントラクト用の新しいファイルを作成します。以下のリストのコードをコピーできます：

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

有効なNFTであるためには、スマートコントラクトが[ERC-721 標準](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)のすべてのメソッドを実装している必要があります。[OpenZeppelin](https://openzeppelin.com)ライブラリの実装を使用します。これは、基本的な機能セットを既に提供し、標準に準拠しています。

スマートコントラクトの先頭で、3つのOpenZeppelinスマートコントラクトクラスをインポートします。

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol`NFTスマートコントラクトが継承するERC-721標準の基本的なメソッドの実装が含まれています。資産だけでなく、メタデータもJSONファイルとしてオフチェーンに保存する拡張機能である`ERC721URIStorage,`を使用します。コントラクトと同様に、このJSONファイルは、ERC-721に準拠する必要があります。

2. `\@openzeppelin/contracts/utils/Counters.sol`は、1だけインクリメントまたはデクリメントできるカウンターを提供します。スマートコントラクトは、カウンターを使用して、ミントされたNFTの総数を追跡し続け、新しいNFTに一意のIDを設定します。

3. `\@openzeppelin/contracts/access/Ownable.sol`は、スマートコントラクトにアクセス制御をセットアップして、スマートコントラクトの所有者 (あなた) だけがNFTをミントできるようにします。

インポートステートメントの後、カスタムのNFTスマートコントラクトが作成されます。これには、カウンター、コンストラクタ、およびNFTを実際に作成するためのメソッドが含まれます。ハードワークのほとんどは、ERC-721標準に準拠したNFTを作成するために必要なメソッドのほとんどを実装するOpenZeppelinから継承された基本コントラクトによって行われます。

カウンターは、NFTの一意の識別子として、ミントメソッドで使用される、ミントされたNFTの総数を追跡します。

コンストラクタでは、スマートコントラクトの名前とシンボル（ウォレットで表される）の2つの文字列引数を渡します。好きなように変更できます。

最後に、NFTを実際に作成できる`mintNFT`メソッドがあります。このメソッドは、スマートコントラクトの所有者のみが実行できるように、`onlyOwner`に設定されています。

`address recipient`最初にNFTを受け取るアドレスを指定します。

`string memory tokenURI`は、NFTのメタデータを記述したJSON文書に対して解決すべきURLです。このケースの場合、それはすでにNFT.Storageに保存されています。メソッドの実行中に、返されたメタデータJSONファイルへのIPFSリンクを使用することができます。

メソッド内部では、カウンターをインクリメントして、NFTの新しい一意の識別子を受け取ります。そして、OpenZeppelinからベースコントラクトが提供するメソッドを呼び出し、新たに作成した識別子とメタデータのURIをセットして受信者にNFTをミントします。このメソッドは実行後、一意の識別子を返します。

#### スマートコントラクトをPolygonにデプロイする {#deploy-the-smart-contract-to-polygon}

さて、いよいよスマートコントラクトをPolygonにデプロイしてみましょう。`scripts`ディレクトリの中に`deploy-contract.mjs`というファイルを新規に作成します。以下のリストの内容をそのファイルにコピーして保存します。

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

コントラクトのデプロイは、hardhatライブラリによって提供されるヘルパー機能を使用して行われます。まず、提供されたファクトリを使用して、前のステップで作成したスマートコントラクトを取得します。次に、それぞれのメソッドを呼び出してデプロイし、デプロイが完了するのを待機します。テストネット環境で、正しいアドレスを取得するために、記述されたコードの下にさらに数行あります。ファイルを保存します`mjs`。

次のコマンドでスクリプトを実行します：

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

すべてが正しければ、次の出力が表示されます：

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

ミントステップで、印刷されたコントラクトアドレスが必要になることに注意してください。コピーして別のテキストファイルに貼り付け、後で使用できるように保存できます。これは、ミントスクリプトがその特定のコントラクトのミントメソッドを呼び出せるようにするために必要です。

#### Polygon上でNFTをミントする {#minting-the-nft-on-polygon}

NFTの作成は、Polygonにたった今デプロイしたばかりのコントラクトを呼び出すだけです。`scripts`ディレクトリ内に`mint-nft.mjs`という名前の新しいファイルを作成し、以下のリストからこのコードをコピーします。

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

最初の2行を編集して、以前のデプロイからの**コントラクトアドレス**と、NFT.Storageで資産を保存するときに返された**メタデータ URL**を挿入します。スクリプトの残りの部分では、NFTの将来の所有者としてのスマートコントラクトへの呼び出しと、IPFS に保存されているメタデータへのポインターをセットアップします。

以下のスクリプトを実行します：

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

以下の出力が表示されます：

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

このチュートリアルのサンプルコードをお探しですか?これは、polygon-nft.storage-demo：·[リンク](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) Githubリポジトリにあります

## 結論 {#conclusion}

このチュートリアルでは、PolygonとNFT.Storageを使用してエンドツーエンドでNFTをミントする方法を学びました。このテクノロジーの組み合わせにより、適切な分散化が実現し、*スケーラビリティ*、*耐久性*、*不変性*が保証されます。

カスタムスマートコントラクトをデプロイして、ニーズに固有のNFTをミントしました。このチュートリアルでは、ERC-721標準に基づく簡単な例を使用しました。ただし、NFT ライフサイクルを管理する複雑なロジックを定義することもできます。より複雑なユースケースについては、後継標準[ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/)からスタートするのが適切です。チュートリアルで使用するライブラリであるOpenZeppelinは、NFTコントラクトの作成に役立つ[コントラクトウィザード](https://docs.openzeppelin.com/contracts/4.x/wizard)を提供します。

ミントの成功は、NFTの貴重な段階のスタートと見なすことができます。その後、NFTを使用して所有権を証明し、他のユーザに譲渡することができます。NFTを転送する理由には、[OpenSea](https://opensea.io)のようなNFTマーケットプレイスの1つでの成功した販売、またはNFTベースのゲームでアイテムを取得するなどの別の種類のイベントが含まれる場合があります。NFTの豊富な可能性を探ることは、間違いなくエキサイティングです。次のステップに進みます。

NFTプロジェクトをNFT.storageで構築するのに役立つ場合は、[Discord](https://discord.gg/Z4H6tdECb9)と[Slack](https://filecoinproject.slack.com/archives/C021JJRH26B)で`#nft-storage`チャンネルに参加することをお勧めします。
