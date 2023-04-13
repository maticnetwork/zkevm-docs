---
id: fx-portal
title: FxPortal
description: EthereumからPolygonにステートまたはデータを転送することができます。
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

PolygonからEthereumデータをネイティブに読み込むための通常のメカニズムは**、ステート同期**を使用しています。これにより、EthereumからPolygonに任意のデータを転送できます。ただし、このアプローチでは、デフォルトのインターフェースを使用できない場合、ルートコントラクトと子コントラクトのマッピングも必要になります。FxPortalは、デプロイされた基本FxPortalコントラクトを使用するだけで、マッピングを伴わずにERC 標準トークンをデプロイできる代替手段を提供します。

## FxPortalとは何ですか？ {#what-is-fxportal}

[Polygonステート同期](../../pos/state-sync/state-sync-mechanism.md)メカニズムの強力でシンプルな実装です。Polygon PoSブリッジは、同じアーキテクチャ上に構築されます。[例](https://github.com/fx-portal/contracts/tree/main/contracts/examples)フォルダのコードは、使用例を示しています。これらの例を使用して、マッピングなしでステート同期を可能にする独自の実装または独自のカスタムブリッジを構築することができます。

コントラクトと例については[、GitHubリポジトリ](https://github.com/fx-portal/contracts)を参照してください。

## どのように動作するのでしょう？ {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol)と[FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol)は、FxPortalが動作する主なコントラクトです。ステート同期メカニズムを使用したマッピングなしで他のチェーン上のユーザー定義メソッドにデータを呼び出し、渡します。デプロイされたメインコントラクトを使用するには、デプロイするスマートコントラクトにFxPortalの基本コントラクトを実装できます - [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol)1と[FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol)。これらのコントラクトに基づいて構築することにより、デプロイされたコントラクトは、データトンネルメカニズムを使用して相互に通信できるようになります。

そうでない場合は、すでに展開されているトンネルコントラクトでトークンをマッピングすることができます。PolygonメインネットとムンバイテストネットのデフォルトのFxTunnel展開の詳細は次のとおりです：

- [Polygon Mainnet](https://static.matic.network/network/mainnet/v1/index.json)
- [ムンバイテストネット](https://static.matic.network/network/testnet/mumbai/index.json)

上記のリンク`FxPortalContracts`からキーワードをご覧ください。すべてのデフォルトのトンネルコントラクトやその他の重要なFxPortalコントラクト展開を確認することができます。

## カスタムFxTunnel実装が必要ですか。 {#do-i-need-a-custom-fxtunnel-implementation}

デフォルトのトンネル実装がユースケースと一致しない場合にのみ**、カスタムFxTunnelを実装**する必要があります。デフォルトのFxPortalトンネルを使用する場合、子コントラクトコードを変更することはできません。子トークンコントラクトのバイトコードは常に固定され、デフォルトの[Fx](https://github.com/fx-portal/contracts/tree/main/contracts/examples)Tunnelデプロイについても常に同じです。カスタムチャイルドトークンが必要な場合、独自のカスタムFxTunnelのために行く必要があります。次に説明を読むと、独自のカスタムFxTunnelを展開する方法を説明します。

次回のセクションを読む前に[、FxPortalステート転送](state-transfer.md)を読み、理解することをお勧めします。これらの次回のセクションには、トンネルコントラクトリンクが添付されています。これらの例を参考にして、独自のカスタムfxトンネルを構築する際に、参考にしてください。

## ERC20転送 {#erc20-transfer}

[子トンネルコントラクト](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer)は、ルートチェーン上のトークン入金と、チャイルドチェーン上の引き出しを可能にします。

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`：展開されたコントラクトで関数を呼び出してERC20トークンをマップし、チャイルドチェーンに対応する子トークンを作成することができます。
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`：マッピングされたトークンアドレス、対応する金額で引き出すことができるアドレス（必要に応じてデータと共に）をコールする`deposit()`方法。最初にトークンを使用するには、標準のERC20`approve`機能を使用してコントラクトを承認する必要があります。

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`：割り当てられたアドレスは、この機能を使用して、子トークン全額を引き出す`deposit()`ことができます。最初にマッピングされたときに作成された子トークンを受け取ります。
- `rootToChildToken`：このパブリック変数には、子トークンマッピングへのルートトークンが含まれています。デプロイされた子トークンのアドレスを知るために、ルートトークンのアドレスを使用してマッピングをクエリできます。

### Ethereum → Polygonから {#polygon}

1. ルート チェーンに独自のERC20トークンをデプロイします。アドレスは、後で必要になります。
2. ルートトンネルのアドレスと額を引数としてルートトークンの`approve()`機能を呼び出すことにより、トークンの転送を承認します。
3. レシーバのアドレスとルートチェーンの額を`deposit()`指定して呼び出しに進み、子チェーンで同等の子トークンを受け取ります。これによりトークンが自動的にマップされます。または、入金する前に、まず、`mapToken()`を呼び出しすることもできます。
4. マッピング後、トンネルの`withdraw`機能`deposit`を使用してクロスチェーン転送を実行できるようになりました。

:::note

ルートチェーン`deposit()`で実行した後、ステート同期が行われるまでに22〜30分かかります。ステート同期が行われたら、所定のアドレスにトークンが入金されます。

:::

### Polygon→Ethereumから {#ethereum}

1. 子コントラクト上の引数として、それぞれのトークンアドレスと額`withdraw()`を使用してを呼び出し、子トークンをルートチェーン上の指定されたレシーバに戻します。これはバーンプルーフの生成に使用されるため、**TXハッシュに注意**してください。

2. 出金を完了する手順は[こちら](#withdraw-tokens-on-the-root-chain)からご覧いただけます。

## ERC721の転送 {#erc721-transfer}

例を示す必要がある場合は、[このERC721ルートと子トンネル](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer)ガイドを参照してください。

### Ethereum → Polygonから {#polygon-1}

1. ルートチェーン上にERC721トークンをデプロイします。アドレスは、後で必要になります。
2. ルートトンネルのアドレスとトークンIDを引数として、ルートトークンの`approve()`機能を呼び出すことにより、トークンの転送を承認します。
3. レシーバのアドレスとルートチェーン上のトークンID`deposit()`を指定してを呼び出し、子チェーン上の同等の子トークンを受け取ります。これによりトークンが自動的にマップされます。または、入金する前に、まず、`mapToken()`を呼び出しすることもできます。

:::note

ルートチェーン`deposit()`で実行した後、ステート同期が行われるまでに22〜30分かかります。ステート同期が行われたら、所定のアドレスにトークンが入金されます。

:::

### Polygon→Ethereumから {#ethereum-1}

1. 子コントラクトの引数としてそれぞれのトークンアドレスとトークンIDを使用して、`withdraw()`を呼び出し、子トークンをルートチェーン上の指定されたレシーバに戻します。**txハッシュが**書き込み証明を生成するために使用されます。

2. 出金を完了する手順は[こちら](#withdraw-tokens-on-the-root-chain)からご覧いただけます。

## ERC1155転送 {#erc1155-transfer}

例を示す必要がある場合は、この[ERC1155ルートと子トンネル](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer)ガイドを参照してください。

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`：ルートERC1155トークンを子チェーンにマップするために使用する
- `deposit(rootToken, user, id, amount, data)`機能：ルートトークンを子チェーンにデポジットするために使用される機能
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`：複数のトークンIDと対応する額に使用される
- `receiveMessage(inputData)`：以下の場合に、ペイロードを使用してバーンプルーフが生成された後に呼び出されます：`inputData`

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`：PolygonからEthereum にトークンを引き出すために使用される
- `withdrawBatch(childToken, ids, amounts, data)`：撤回と同じですが、複数のトークンIDを引き出す場合

### Ethereum → Polygonから {#polygon-2}

1. ERC1155トークンをルートチェーンにデプロイするアドレスは、後で必要になります。
2. トークンをPolygonで`FxERC1155RootTunnel`転送できるように、デプロイされたトークン`setApprovalForAll(operator, approved)`で`FxERC1155RootTunnel`アドレスをコール`operator`します`FxERC1155ChildTunnel`。
3. デプロイされたトークンアドレス`FxERC1155RootTunnel`を。として`mapToken()`呼び出す。`rootToken`これにより、ERC1155トークンをPolygonに展開およびマップするよう`FxERC1155ChildTunnel`指示するメッセージが送信されます。子供トークンアドレスをクエリするには、`rootToChildToken`を参照してください。`FxERC1155ChildTunnel`
4. Ethereum上のトークンアドレス`FxERC1155RootTunnel`を、受信`rootToken`者として、`user`トークンIDとして、およびその量として`deposit()``id`呼び出します。`amount`また、複数のトークンIDに対して`depositBatch()`を呼び出しすることも可能です。

:::note

ルートチェーン`deposit()`で実行した後、ステート同期が行われるまでに22〜30分かかります。ステート同期が行われたら、所定のアドレスにトークンが入金されます。

:::

### Polygon→Ethereumから {#ethereum-2}

1. Polygonにデプロイされた子トークンアドレス`childToken`とトークンIDとしてコール`withdraw()``FxERC1155ChildTunnel`します`id`（子トークンアドレスをマッピングから照会することができます）`rootToChildToken`。また、複数のトークンIDと対応する額を`withdrawBatch()`で呼び出しすることも可能です。**txハッシュが**書き込み証明を生成するために使用されます。

2. 出金を完了する手順は[こちら](#withdraw-tokens-on-the-root-chain)からご覧いただけます。

## ルートチェーンでトークンを引き出す {#withdraw-tokens-on-the-root-chain}

:::info

チャイルドチェーン`withdraw()`で実行した後、チェックポイントが実行されるまでに30〜90分かかります。次のチェックポイントに書き込みトランザクションが含まれていたら、ルートチェーンでトークンを引き出すことができます。

:::

1. **txハッシュ**と**MESSAGE_SENT_EVENT_SIG**を使用して、書き込み証明を生成します。プルーフを生成するには、Polygonがホストするプルーフ生成APIを使用するか、[こちら](https://github.com/maticnetwork/proof-generation-api)で説明したら、プルーフ生成APIをスピンアップすることもできます。

Polygonがホストする証拠生成エンドポイントは[こちら](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})からご覧いただけます。

  - `burnTxHash`Polygonで開始したトランザクションの`withdraw()`トランザクションハッシュです。
  - `eventSignature`機能によって発信されるイベントの署名です`withdraw()`。MESSAGE_SENT_EVENT_SIGのイベント署名は次のとおりです`0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`。

メインネットとテストネットのプルーフ生成APIを使用する例は次のとおりです：-

→ [Polygonメインネットプルーフ生成](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Mumbaiテストネット証明生成](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. GoerliまたはEthereum上のルートトンネルコントラクト`receiveMessage()`で、生成されたペイロードを引数としてフィードします。

## ミント可能なERC-20の転送 {#mintable-erc-20-transfer}

例を示す必要がある場合は、この[Mintable ERC20ルートと子トンネル](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer)ガイドを参照してください。

:::info

MintableトークンFxTunnelの場合、子トークンが最初に展開され、ルートトークンが最初の引き出し/終了プロセスが完了したときにのみ展開されます。ルートトークンコントラクトアドレスは、子コントラクトが展開された直後に事前に決定することができますが、最初の引き出し／終了が完了したときにのみマッピングが存在します。

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`：EthereumからPolygonにトークンをデポジットするには
- `receiveMessage(bytes memory inputData)`：ルートチェーンでトークンを受け取るために`inputData`として供給されるバーンプルーフ

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`：PolygonネットワークにERC20トークンを展開する
- `mintToken(address childToken, uint256 amount)`：Polygonで特定額のトークンをミントする
- `withdraw(address childToken, uint256 amount)`：子チェーン上でトークンをバーンして、ルートチェーンで引き出す方法

### Polygonでのトークンマイニング {#minting-tokens-on-polygon}

1. `FxMintableERC20ChildTunnel`上の`deployChildToken()`を呼び出し、必要なトークン情報をパラメータとして渡します。これは、`rootToken`と`childToken`のアドレスを含む`TokenMapped`イベントを発行します。これらのアドレスに注意してください。
2. `FxMintableERC20ChildTunnel`で`mintToken()`を呼び出して、子チェーンのトークンをミントします。
3. Polygonからトークンを引き出すには、`FxMintableERC20ChildTunnel`で`withdraw()`を呼び出します。トランザクションハッシュに注意してください。これは、バーンプルーフを生成するのに便利です。
4. 出金を完了する手順は[こちら](#withdraw-tokens-on-the-root-chain)からご覧いただけます。

### Ethereumでトークンを引き出す {#withdrawing-tokens-on-ethereum}

生成されたバーンプルーフを、引数として`FxMintableERC20RootTunnel`の`receiveMessage()`に渡します。この後、トークン残高は、ルートチェーンに反映されます。

### Polygonに戻すデポジットトークン {#deposit-tokens-back-to-polygon}

1. トークンを転送するには、`FxMintableERC20RootTunnel`を承認してください。
2. ルートトークンのアドレスとして`rootToken`を、受信者として`user`を使用して、`FxMintableERC20RootTunnel`で`deposit()`を呼び出します。
3. ステート同期イベント（22〜30分）を待ちます。この、子チェーン上のターゲットの受信者の残高をクエリすることができます。

**ERC721**と**ERC1155**のMintable FxTunnelの例は次のとおりです：-

- [FxMintableERC721トンネル](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155トンネル](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## デプロイメントの例 {#example-deployments}

### Goerli {#goerli}

- チェックポイントマネージャー：[0x2890bA17EfE978480615e330ecB65333b880928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- ダミーERC20トークン：[0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel：[0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTunnel：[0xA200766a7D64E54611E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- ダミーERC721トークン：[0x73594a053cb5ddDE5558268d28a774375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTunnel：[0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- ダミーERC1155トークン：[0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d18788cF9DF48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- FxERC20：[0xDDE69724AeFBdb084413719fE745aB66e3b055C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20チャイルドトンネル：[0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunnel：[0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- 子トークンダミーERC20：0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721：[0xf2720927E048726267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721ChildTunnel：[0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155：[0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunnel：[0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

対応するメインネットデプロイメントは[こちら](https://static.matic.network/network/mainnet/v1/index.json)からご覧いただけます。すべてのデフォルトのトンネルコントラクトとその他の重要なFxPortalコントラクトデプロイを確認するキーワードを`FxPortalContracts`探してください。[`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)コントラクトアドレスとABIにアクセスすることができます。

## コントラクトのアドレス {#contract-addresses}

### Mumbaiテストネット {#mumbai-testnet}

| Contract | Deployed address  |
| :----- | :- |
| 1···[FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code)1 | 2··· `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA`|
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Polygon Mainnet {#polygon-mainnet}


| Contract | Deployed address  |
| :----- | :- |
| [FxRoot (Ethereum Mainnet)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code)1 | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2`|
| [FxChild (Polygon Mainnnet)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts)1 | `0x8397259c983751DAf40400790063935a11afa28a`|
