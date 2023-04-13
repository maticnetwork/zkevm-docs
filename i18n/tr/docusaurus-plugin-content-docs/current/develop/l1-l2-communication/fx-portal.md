---
id: fx-portal
title: FxPortal
description: FxPortal kullanarak without Ethereum'dan Polygon adresine devlet veya veri aktarın.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon'dan Ethereum verilerini doğal olarak okumak için kullanılan mekanizma **State Sync** kullanıyor. Bu yöntem Ethereum'dan Polygon'a gelişigüzel (arbitrary) veri aktarımına olanak sağlar. Bununla birlikte, bu yaklaşım varsayılan arayüz kullanılamıyorsa kök ve alt sözleşmelerin eşlenmiş olmalarını gerektirir. FxPortal, ERC standartlı token'ların herhangi bir eşleme olmadan, devreye alınan temel FxPortal sözleşmeleri kullanılarak devreye alınabileceği bir alternatif sunar.

## FxPortal nedir? {#what-is-fxportal}

Polygon [devlet](../../pos/state-sync/state-sync-mechanism.md) senkronizasyonu mekanizmasının güçlü ama basit bir uygulamasıdır. Polygon PoS köprüsü aynı mimari üzerine kuruludur. [Örnek](https://github.com/fx-portal/contracts/tree/main/contracts/examples) klasöründeki kod, bazı kullanım örneklerinden biridir. Bu örnekleri kendi uygulamalarınızı oluşturmak için veya without herhangi bir devlet senkronizasyonu sağlayan kendi özel köprünüzü oluşturmak için kolayca kullanabilirsiniz.

Sözleşmeler ve örnekler için [GitHub](https://github.com/fx-portal/contracts) deposuna göz atabilirsiniz.

## Nasıl çalışır? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) ve [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) FxPortal üzerinde çalıştığı ana sözleşmelerdir. Bu durum senkronizasyon mekanizmasını kullanarak herhangi bir haritalama yapılmadan diğer zincir üzerinde kullanıcı tarafından tanımlanan yöntemlere veri çağırır ve aktarır. Devreye alınan ana sözleşmeleri kullanmak için, FxPortal'ın temel sözleşmelerini - [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) ve [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol) - devreye aldığınız akıllı sözleşmelerde uygulayabilirsiniz. Bu sözleşmeler üzerinde geliştirme yaptığınızda devreye aldığınız sözleşmeler veri tüneli mekanizması yoluyla birbirleriyle iletişim kurabilecektir.

Aksi takdirde, your zaten konuşlandırılmış tünel sözleşmeleri ile haritalandırmayı seçebilirsiniz. Polygon Mainnet ve Mumbai Testnet için varsayılan FxTunnel dağıtım detayları aşağıdaki gibidir:

- [Polygon Mainnet](https://static.matic.network/network/mainnet/v1/index.json)
- [Mumbai Testnet](https://static.matic.network/network/testnet/mumbai/index.json)

Varsayılan tünel sözleşmelerini ve diğer önemli FxPortal sözleşme dağıtımlarını bulmak için yukarıdaki `FxPortalContracts`bağlantılardaki anahtar kelimeyi arayın.

## Özel FxTunnel Uygulaması gerekiyor mu? {#do-i-need-a-custom-fxtunnel-implementation}

**Özel bir FxTunnel uygulaması** için gitmeniz gerekir, ancak varsayılan tünel uygulamaları kullanım durumunuzla uyumlu değilse. Varsayılan FxPortal tünellerini kullandığınızda, çocuk sözleşmesi kodunu değiştiremezsiniz. Çocuk token sözleşmesi için bytecode her zaman sabitlenir ve [varsayılan FxTunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples) dağıtımları için her zaman aynı kalır. Özel bir çocuk token, ihtiyacınız varsa, kendi özel your gitmelisiniz ve bir sonraki bölümü okumak size kendi özel FxTunnel, dağıtmada daha fazla rehberlik edecektir.

Yaklaşan bölümü okumadan önce [FxPortal Devlet](state-transfer.md) Transferini okumanız ve anlamanız şiddetle tavsiye edilir. Bu bölümlerin her biri buna bağlı olan tünel sözleşmesi bağlantılarına sahip olacaktır. Bu örnekler kendi özel your oluştururken referans olarak alınabilir.

## ERC20 Aktarma {#erc20-transfer}

[Çocuk ve kök tüneli sözleşmeleri](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) kök zincirine token yatırma ve çocuk zinciri üzerindeki para çekme işlemine olanak sağlar.

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: ERC20 token'ınızı eşleştirmek için görevlendirilen sözleşmedeki işlevi çağırabilir ve çocuk zinciri üzerinde karşılık gelen bir çocuk belirteci oluşturabilirsiniz.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: eşleştirilmiş tokenin adresi ile arama `deposit()`yöntemi, karşılık gelen bir miktar ile çekilebilen adres (gerekirse verilerle birlikte). Token'larınızı harcamak için önce standart ERC20 `approve` fonksiyonunu kullanarak sözleşmeyi onaylamış olmalısınız.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: Bu işlevle atanan adres, bu işlevi kullanarak çocuk belirteci miktarını geri `deposit()`çekebilir. İlk eşlendiğinde oluşturulan alt token'ı alacaklardır.
- `rootToChildToken`: Bu genel değişken, çocuk token eşlemesini içeren kök token'ı içerir. Devreye alınan alt token adresini öğrenmek için kök token adresi ile eşlemeyi sorgulayabilirsiniz.

### Ethereum → Polygon {#polygon}

1. Kök zincir üzerinde kendi ERC20 token'ınızı devreye alın. Bu adrese daha sonra ihtiyacınız olacak.
2. Kök tünel adresini ve miktarını argüman olarak kullanıp kök token'ın `approve()` fonksiyonunu çağırarak token'ları aktarma için onaylayın.
3. Alıcının adresi ve kök zincir üzerindeki miktar ile `deposit()` çağrısını yaparak devam edin ve alt zincir üzerindeki eşdeğer alt token'ı alın. Bu işlem token'ın eşlemesini otomatik olarak yapacaktır. Alternatif olarak, fon yatırmadan önce `mapToken()` çağrısını yapabilirsiniz.
4. Mapping yaptıktan sonra artık tünelin `deposit`ve `withdraw`işlevlerini kullanarak çapraz zincir transferlerini you

:::note

Kök zincirinde `deposit()`gerçekleştirdikten sonra, devlet senkronizasyonu için 22-30 dakika sürecektir. Durum senkronizasyonu gerçekleştiğinde, verilen adrese yatırılan tokenleri alırsınız.

:::

### Tarafından Polygon → Ethereum {#ethereum}

1. Alt sözleşme üzerinde karşılık gelen token adresini ve miktarını argümanlar olarak yazıp `withdraw()` çağrısını yaparak alt token'ları kök zincir üzerinde atanan alıcıya geri taşıyın. Yakma kanıtını oluşturmak için kullanılacak olan **işlem hash'ini not edin**.

2. Bu işlemi tamamlamak için gerekli adımları [burada](#withdraw-tokens-on-the-root-chain) bulabilirsiniz.

## ERC721 Transfer {#erc721-transfer}

Bir örneğe ihtiyacınız varsa, lütfen bu [ERC721 Kökü ve Çocuk Tünelleri](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) kılavuzuna göz atın.

### Ethereum → Polygon {#polygon-1}

1. Kök zincir üzerinde kendi ERC721 token'ınızı devreye alın. Bu adrese daha sonra ihtiyacınız olacak.
2. Kök tünel adresini ve token ID'yi argüman olarak kullanıp kök token'ın `approve()` fonksiyonunu çağırarak token'ları aktarma için onaylayın.
3. Alıcının adresi ve kök zincir üzerindeki token ID ile `deposit()` çağrısını yaparak devam edin ve alt zincir üzerindeki eşdeğer alt token'ı alın. Bu işlem token'ın eşlemesini otomatik olarak yapacaktır. Alternatif olarak, fon yatırmadan önce `mapToken()` çağrısını yapabilirsiniz.

:::note

Kök zincirinde `deposit()`gerçekleştirdikten sonra, devlet senkronizasyonu için 22-30 dakika sürecektir. Durum senkronizasyonu gerçekleştiğinde, verilen adrese yatırılan tokenleri alırsınız.

:::

### Tarafından Polygon → Ethereum {#ethereum-1}

1. Alt sözleşme üzerinde karşılık gelen token adresini ve token ID'yi argümanlar olarak yazıp `withdraw()` çağrısını yapın ve alt token'ları kök zincir üzerinde atanan alıcıya geri taşıyın. **Tx karmasının** yanık kanıtı oluşturmak için kullanılacağını unutmayın.

2. Bu işlemi tamamlamak için gerekli adımları [burada](#withdraw-tokens-on-the-root-chain) bulabilirsiniz.

## ERC1155 Aktarma {#erc1155-transfer}

Bir örneğe ihtiyacınız varsa, lütfen bu [ERC1155 Kök ve Çocuk Tünelleri](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) kılavuzuna göz atın.

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: Kök ERC1155 token'ınızı alt zincire eşlemek için kullanılır
- `deposit(rootToken, user, id, amount, data)`: Kök token'ları alt zincire yatırmak için kullanılan fonksiyon
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: Çoklu token ID'leri ve karşılık gelen miktarlar için kullanılır
- `receiveMessage(inputData)`: Yakma kanıtı `inputData` payload'u ile oluşturulduktan sonra çağrılır

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: Polygon'dan Ethereum'a token çekmek için kullanılır
- `withdrawBatch(childToken, ids, amounts, data)`: Fon çekme ile aynıdır; ancak çoklu token ID'lerini çekmek için kullanılır

### Ethereum → Polygon {#polygon-2}

1. ERC1155 token'larınızı kök zincir üzerinde devreye alın. Bu adrese daha sonra ihtiyacınız olacak.
2. the Polygon'a `FxERC1155RootTunnel`aktarmak `operator`için `FxERC1155RootTunnel`adresli belirteci üzerinde konuşlandırılan belirteci `setApprovalForAll(operator, approved)``FxERC1155ChildTunnel`arayın.
3. Konuşlandırılan tokenin adresini şu şekilde `mapToken()``FxERC1155RootTunnel`çağırın.`rootToken` Bu durum bunu Polygon'daki ERC1155 token'ı dağıtması ve haritalandırması için `FxERC1155ChildTunnel`talimat vermeye yönelik bir mesaj gönderecektir. Çocuk token adresini sorgulamak için `rootToChildToken`çağrı.`FxERC1155ChildTunnel`
4. Ethereum üzerindeki tokenin adresini `FxERC1155RootTunnel`, alıcı olarak `rootToken`, `user`token kimliği `id`ve miktarı olarak `deposit()`çağrın.`amount` Alternatif olarak, birden fazla token id'si için `depositBatch()` çağrısını yapabilirsiniz.

:::note

Kök zincirinde `deposit()`gerçekleştirdikten sonra, devlet senkronizasyonu için 22-30 dakika sürecektir. Durum senkronizasyonu gerçekleştiğinde, verilen adrese yatırılan tokenleri alırsınız.

:::

### Tarafından Polygon → Ethereum {#ethereum-2}

1. Polygon üzerinde konuşlandırılan çocuk token'ının adresini `childToken`ve token kimliğini (çocuk belirteci adresi eşleme ile sorgulanabilir) `id`olarak `withdraw()``FxERC1155ChildTunnel``rootToChildToken`çağırın. Alternatif olarak, birden fazla token id'si ve karşılık gelen miktarlar için `withdrawBatch()` çağrısını yapabilirsiniz. **Tx karmasının** yanık kanıtı oluşturmak için kullanılacağını unutmayın.

2. Bu işlemi tamamlamak için gerekli adımları [burada](#withdraw-tokens-on-the-root-chain) bulabilirsiniz.

## Root Zinciri üzerinde Jetonları çekme {#withdraw-tokens-on-the-root-chain}

:::info

Çocuk zincirinde `withdraw()`gerçekleştirdikten sonra bir kontrol noktasının gerçekleşmesi 30-90 dakika sürer. Bir sonraki kontrol noktası yanık işlemini içerdikten sonra, kök zincirindeki tokenleri geri çekebilirsiniz.

:::

1. **tx hash** ve **the** kullanarak yanık kanıtı üretin. Bu kanıtı oluşturmak için Polygon tarafından barındırılan proof oluşturma API'sini kullanabilirsiniz veya [buradaki](https://github.com/maticnetwork/proof-generation-api) talimatları izleyerek kendi proof oluşturma API'nizi de döndürebilirsiniz.

Polygon tarafından barındırılan proof nesil uç noktası [burada](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature}) mevcuttur.

  - `burnTxHash`Polygon'da başlattığınız işlemin `withdraw()`işlem the
  - `eventSignature`Bu olay için verilen bir olay `withdraw()`imzası. for olay imzası `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`(!)

Mainnet ve Testnet için proof nesil API kullanım örnekleri aşağıdaki gibidir:

→ [Polygon Mainnet Proof üretimi](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Mumbai Testnet Proof üretimi](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Goerli veya Ethereum üzerindeki kök tüneli sözleşmesinde `receiveMessage()`argüman olarak üretilen yükü, besleyin.

## Mint'lenebilir ERC-20 Aktarma {#mintable-erc-20-transfer}

Bir örneğe ihtiyacınız varsa, lütfen bu [Mintable ERC20 Kökü ve Çocuk Tünelleri](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) kılavuzuna göz atın.

:::info

Mintable Token FxTunnels durumunda çocuk tokeni ilk olarak konuşlandırılır ve kök tokeni yalnızca ilk geri çekme/çıkış işlemi tamamlandığında konuşlandırılır. Root token sözleşmesi adresi çocuk sözleşmesi uygulandıktan hemen sonra önceden belirlenebilir, ancak haritalama yalnızca ilk çekme / çıkış tamamlandığında teknik olarak mevcut olacaktır.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: Ethereum'dan Polygon'a token yatırmak için kullanılır
- `receiveMessage(bytes memory inputData)`: Kök zincir üzerinde token almak için `inputData` olarak iletilecek yakma kanıtı için kullanılır

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: Polygon ağına bir ERC20 an dağıtmak
- `mintToken(address childToken, uint256 amount)`: Polygon üzerinde belli bir miktar token mint etmek için kullanılır
- `withdraw(address childToken, uint256 amount)`: Kök zincir üzerinde fon çekmek için alt zincirde token yakmak amacıyla kullanılır

### Polygon üzerinde Minting Jetonları {#minting-tokens-on-polygon}

1. `FxMintableERC20ChildTunnel` üzerinde `deployChildToken()` çağrısını yapın ve parametre olarak gerekli token bilgisini geçirin. Bu işlem, `rootToken` ve `childToken` adreslerini içeren bir `TokenMapped` olayı gönderir. Bu adresleri bir yere not edin.
2. Alt zincir üzerinde token mint etmek için `FxMintableERC20ChildTunnel` üzerinde `mintToken()` çağrısını yapın.
3. Polygon'dan token çekmek için `FxMintableERC20ChildTunnel` üzerinde `withdraw()` çağrısını yapın. Bu işlem hash dikkate alın çünkü yanık kanıtı oluşturmak için kullanışlı olacaktır.
4. Bu işlemi tamamlamak için gerekli adımları [burada](#withdraw-tokens-on-the-root-chain) bulabilirsiniz.

### Ethereum üzerinde Jetonları Çekme {#withdrawing-tokens-on-ethereum}

Üretilen yakma kanıtını `FxMintableERC20RootTunnel` üzerindeki `receiveMessage()` içine argüman olarak girin. Bunu yaptıktan sonra, token bakiyesi kök zincir üzerinde yansıtılacaktır.

### Polygon için Para Yatırma Jetonları {#deposit-tokens-back-to-polygon}

1. Token'larınızı aktarmak için `FxMintableERC20RootTunnel` onayını yaptığınızdan emin olun.
2. Kök token adresi olarak `rootToken` ve alıcı olarak `user` belirleyerek `FxMintableERC20RootTunnel` içinde `deposit()` çağrısını yapın.
3. Eyalet senkronizasyonu olayını (22-30 dakika) bekleyin. Bu işlemden sonra, hedef alıcının bakiyesini alt zincir üzerinde sorgulayabilirsiniz.

**ERC721** ve **ERC1155** Mintable FxTunnel örnekleri aşağıdaki gibidir:

- [FxMintableERC721Tüneller](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tüneller](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## Örnek devreye almalar {#example-deployments}

### Goerli {#goerli}

- Checkpoint Manager: [0x2890bA17EfE978480615e330ecB6533b880928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Dummy ERC20 token: [0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTunnel: [0xA200766a7D64E54611E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Dummy ERC721 token: [0x73594a053cb5ddDE558268d28a74375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTunnel: [0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Dummy ERC1155 Jeton: [0x1906d395752FE0c930f8d061DFeb785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d18788cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- FxERC20: [0xDDE69724AeFBdb084413719fE745aB66e3b055C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20ChildTunn: [0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunnel: [0xA2C7eBef68B444056b4A39C2CEC23844275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- Alt token dummy ERC20: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E048726267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721ChildTunn: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunn: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

İlgili Mainnet dağıtımları [burada](https://static.matic.network/network/mainnet/v1/index.json) bulunabilir. Varsayılan tünel sözleşmelerini ve diğer önemli FxPortal sözleşme dağıtımlarını bulmak `FxPortalContracts`için anahtar kelimeyi arayın. Sözleşme adreslerine ve and erişmek için [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)paketten yararlanabilirsiniz.

## Sözleşme Adresleri {#contract-addresses}

### Mumbai test ağı {#mumbai-testnet}

| Sözleşme | Devreye alma adresi  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Polygon Mainnet {#polygon-mainnet}


| Sözleşme | Devreye alma adresi  |
| :----- | :- |
| [FxRoot (Ethereum Mainnet)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild (Polygon Mainnnet)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
