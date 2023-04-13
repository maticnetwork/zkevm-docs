---
id: custom-tokens
title: Özel Tokens Yapılandırma
description: Metamask üzerinde özel token'ları yapılandırın.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Bu sayfa, Metamask'e özel token'ları yapılandırma / ekleme işlemini göstermektedir.

Metamask'taki herhangi bir ağa herhangi bir özel token'ı eklemek için aynı işlemi kullanabilirsiniz. Bu [tabloya](#tokens-and-contract-adresses) başvurabilirsiniz, bu tabloya kendi sözleşme adresleri ile test belirteçleri örneklerini görselleştirmek için.

## MetaMask hesabınıza özel bir token ekleme {#adding-a-custom-token-to-your-metamask-account}

İlk olarak, Metamask'ınızın ana ekranındaki yeni token için uygun ağı seçin. Ardından "Import Token'leri" üzerine tıklayın.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

Daha sonra sizi yeni bir ekrana yönlendirecektir. Import Token ekranında, Token Adresi alanında bir adresi copy-paste

:::info
Bu süreci göstermek için **Goerli ağında** bir E**RC20-TESTV4 **tokeni kullanıyoruz. Bu sitedeki diğer ağlardan gelen diğer test [<ins>token'larını</ins>](#tokens-and-contract-adresses) bulun.
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

Diğer alanlar otomatik olarak doldurulacaktır. Özel Jeton on tıklayın ve ardından Import Token'ı tıklayın. `TEST` token'ı artık Metamask hesabınızda görüntüleniyor olmalıdır.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**Metamask hesabınıza bir test ERC1155 token'ı ekleme**

Polygon ağı ERC1155 destekler; fakat [Metamask henüz bu standardı desteklememektedir.](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-) Bu güncelleme 2021 yılının dördüncü çeyreğinde beklenmektedir.

### Jeton ve Sözleşme Adresleri {#tokens-and-contract-adresses}

| token | Ağ | Sözleşme Adresi |
|---------------|---------|----------------------------------------------|
| ERC20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |