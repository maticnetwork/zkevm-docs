---
id: fx-portal
title: FxPortal
description: Ilipat ang estado o data mula sa Ethereum hanggang sa Polygon nang hindi mapping gamit ang FxPortal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Ang karaniwang mekanismo para natively basahin ang data ng Ethereum mula sa Polygon ay gumagamit ng **State Sync**. Nagbibigay-daan ito para mailipat ang arbitrary na data mula sa Ethereum patungo sa Polygon. Gayunpaman, nangangailangan din ang diskarteng ito ng pagmamapa ng root at child contract kung hindi magagamit ang default na interface. Nag-aalok ang FxPortal ng alternatibo kung saan maaaring i-deploy ang mga standardized na token ng ERC nang walang kasangkot na pagmamapa, gamit lamang ang mga naka-deploy na base na kontrata ng FxPortal.

## Ano ang FxPortal? {#what-is-fxportal}

Ito ay isang malakas pa simpleng pagpapatupad ng [state sync](../../pos/state-sync/state-sync-mechanism.md) ng Polygon. Polygon pos bridge ay binuo sa arkitektura ng simula. Ang code sa folder ng [mga halimbawa](https://github.com/fx-portal/contracts/tree/main/contracts/examples) ay ilang halimbawa ng paggamit. Madali mong gamitin ang mga halimbawa na ito para magtayo ng sarili mong implementations o sariling custom na bridge na nagpapahintulot sa anumang state-sync nang walang mapping.

Maaari mong tingnan ang [imbakan](https://github.com/fx-portal/contracts) ng GitHub para sa mga kontrata at halimbawa.

## Paano ito gumagana? {#how-does-it-work}

Ang [FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) at [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) ang mga pangunahing kontrata kung saan gumagana ang FxPortal. Nanawagan ito at ipinapasa ang data sa mga user-defined na pamamaraan sa kabilang chain nang walang anumang pagmamapa gamit ang state sync mechanism. Upang magamit ang mga naka-deploy na main na kontrata, maaari mong ipatupad ang mga base na kontrata ng FxPortal sa mga smart na kontrata na iyong idine-deploy - [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) at [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Sa pamamagitan ng pagbuo sa mga kontratang ito, magagawa ng iyong mga naka-deploy na kontrata na makipag-ugnayan sa isa't isa gamit ang mekanismo ng data tunnel.

Kung hindi, maaari mong piliin na mapa ang iyong mga token gamit ang mga naka-deploy na kontrata ng tunnel. Ang mga detalye ng deployment ng default na FxTunnel para sa Polygon Mainnet at Mumbai Testnet ay ang mga sumusunod:

- [Polygon Mainnet](https://static.matic.network/network/mainnet/v1/index.json)
- [Mumbai Testnet](https://static.matic.network/network/testnet/mumbai/index.json)

Hahanapin ang keyword sa mga link sa itaas para hanapin ang lahat ng default na kontrata ng tunnel at iba pang mahahalagang pag-deploy ng kontrata `FxPortalContracts`ng FxPortal.

## Kailangan ko ba ng Pagpapatupad ng Custom FxTunnel? {#do-i-need-a-custom-fxtunnel-implementation}

Dapat kang pumunta para sa isang **custom na pagpapatupad** ng FxTunnel kung hindi nakahanay ang mga default na pagpapatupad ng tunnel sa iyong use case. Kapag ginamit mo ang default na lagusan ng FxPortal, hindi mo maaaring baguhin ang child contract code. Laging naayos ang bytecode para sa child token contract at laging nananatili ang pareho para sa [mga default na FxTunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples). Kung sakaling kailangan mo ng isang custom na token ng bata, dapat kang pumunta para sa iyong sariling custom na FxTunnel, at sa pagbabasa ng susunod na bahagi ay gagabayan ka pa sa pag-deploy ng iyong sariling custom na FxTunnels.

Lubhang inirerekomenda na basahin at maunawaan ang [FxPortal State Transfer](state-transfer.md) bago mo basahin ang paparating na seksyon. Ang bawat isa sa mga paparating na seksyon ay magkakaroon ng mga halimbawa ng mga link ng kontrata ng tunnel na naka-attach dito. Maaaring gawin ang mga halimbawa na ito bilang sanggunian habang nagtatayo ng iyong sariling custom na fx-tunnels.

## Paglipat ng ERC20 {#erc20-transfer}

Pinagana ng mga [kontrata](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) ng tunnel ng bata at root ang deposito ng mga token sa root chain at pag-withdraw sa chain ng bata.

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: Maaari mong tawagan ang function sa naka-deploy na kontrata para mapa ang iyong ERC20 token at lumikha ng kaukulang child token sa chain ng bata.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: `deposit()`paraan ng panawagan sa address ng naka-map na token, ang address na maaaring mag-withdraw ng kaukulang halaga (kasama ang data kung kinakailangan). Dapat na inaprubahan mo ang kontrata gamit ang karaniwang ERC20 `approve` na function upang gastusin muna ang iyong mga token.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: Maaaring i-withdraw ng `deposit()`address ang lahat ng halaga ng child token gamit ang function na ito. Tatanggapin nila ang child token na ginawa noong unang naimapa.
- `rootToChildToken`: Naglalaman ang pampublikong variable na ito ng root token sa child token mapping. Maaari mong i-query ang pagmamapa gamit ang address ng root token para malaman ang address ng na-deploy na child token.

### Mula sa Ethereum → Polygon {#polygon}

1. I-deploy ang sarili mong ERC20 token sa root chain. Kakailanganin mo ng address na ito sa ibang pagkakataon.
2. Aprubahan ang mga token para mailipat sa pamamagitan ng pag-call sa `approve()` function ng root token na may address ng root tunnel at ang halaga bilang mga argumento.
3. Magpatuloy sa pag-call sa `deposit()` kasama ang address ng tatanggap at ang halaga sa root chain upang matanggap ang katumbas na child token sa child chain. Awtomatikong imamapa din nito ang token. Bilang kahalili, maaari mo munang i-call ang `mapToken()` bago magdeposito.
4. Pagkatapos ng mapping, dapat mo na ngayong mag-execute ang mga transfer ng cross-chain gamit ang `deposit`at mga `withdraw`function ng tunnel.

:::note

Pagkatapos mong magtanghal `deposit()`sa root chain, aabutin ng 22-30 minuto ang pag-sync ng state. Kapag nangyari ang pag-sync ng estado, makukuha mo ang mga token na idineposito sa ibinigay na address.

:::

### Mula sa Polygon → Ethereum {#ethereum}

1. Magpatuloy sa pag-call sa `withdraw()` gamit ang kaukulang address at halaga ng token bilang mga argumento sa kontrata ng child upang ilipat ang mga child token pabalik sa itinalagang tatanggap sa root chain. **Tandaan ang tx hash** dahil ito ang gagamitin para makabuo ng proof ng pag-burn.

2. Makikita mo ang mga hakbang para makumpleto ang withdrawal [dito](#withdraw-tokens-on-the-root-chain).

## ERC721 Transfer {#erc721-transfer}

Kung sakaling kailangan mo ng halimbawa, tingnan ang [gabay ng ERC721 Root at Child](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) Tunnels.

### Mula sa Ethereum → Polygon {#polygon-1}

1. I-deploy ang sarili mong ERC721 token sa root chain. Kakailanganin mo ng address na ito sa ibang pagkakataon.
2. Aprubahan ang mga token para mailipat sa pamamagitan ng pag-call sa `approve()` na function ng root token na may address ng root tunnel at gamit ang token ID bilang mga argumento.
3. Magpatuloy sa pag-call sa `deposit()` gamit ang address ng tatanggap at token ID sa root chain upang matanggap ang katumbas na child token sa child chain. Awtomatikong imamapa din nito ang token. Bilang kahalili, maaari kang tumawag `mapToken()`muna bago magdeposito.

:::note

Pagkatapos mong magtanghal `deposit()`sa root chain, aabutin ng 22-30 minuto ang pag-sync ng state. Kapag nangyari ang pag-sync ng estado, makukuha mo ang mga token na idineposito sa ibinigay na address.

:::

### Mula sa Polygon → Ethereum {#ethereum-1}

1. Magpatuloy sa pag-call sa `withdraw()` gamit ang kaukulang token address at token ID bilang mga argumento sa kontrata ng child upang ilipat ang mga child token pabalik sa itinalagang tatanggap sa root chain. Pansinin ang gagamitin **ng tx hash** para makabuo ng burn proof.

2. Makikita mo ang mga hakbang para makumpleto ang withdrawal [dito](#withdraw-tokens-on-the-root-chain).

## Paglipat ng ERC1155 {#erc1155-transfer}

Kung sakaling kailangan mo ng halimbawa, tingnan ang [gabay ng ERC1155 Root at Child](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) Tunnels.

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: Ginagamit para imapa ang iyong root na ERC1155 token sa child chain
- `deposit(rootToken, user, id, amount, data)`: Function na ginagamit para maideposito ang mga root token sa child chain
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: Ginagamit para sa maramihang token Id at mga katumbas na halaga
- `receiveMessage(inputData)`: Iko-call pagkatapos mabuo ang proof ng pag-burn gamit ang payload bilang`inputData`

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: Ginagamit para i-withdraw ang token mula sa Polygon patungo sa Ethereum
- `withdrawBatch(childToken, ids, amounts, data)`: Pareho sa i-withdraw ngunit para sa pag-withdraw ng maramihang token Id

### Mula sa Ethereum → Polygon {#polygon-2}

1. I-deploy ang iyong ERC1155 token sa root chain. Kakailanganin mo ng address na ito sa ibang pagkakataon.
2. Tumawag `setApprovalForAll(operator, approved)`sa naka-deploy na token gamit ang `FxERC1155RootTunnel`address para `operator`payagan na `FxERC1155RootTunnel`ilipat ang iyong mga token sa `FxERC1155ChildTunnel`Polygon.
3. `mapToken()`Tumawag sa `FxERC1155RootTunnel`iyong deployed na token 's address bilang .`rootToken` Magpapadala ito ng mensahe para `FxERC1155ChildTunnel`magturo dito na i-deploy at i-map ang ERC1155 token sa Polygon. Para i-query ang token address ng iyong anak, tumawag `rootToChildToken`sa .`FxERC1155ChildTunnel`
4. `deposit()`Tumawag `FxERC1155RootTunnel`sa address ng token sa Ethereum bilang , `rootToken`receiver bilang , `user`token id bilang `id`at ang halaga ng .`amount` Bilang kahalili, maaari mo ring i-call ang `depositBatch()` para sa maramihang mga token id.

:::note

Pagkatapos mong magtanghal `deposit()`sa root chain, aabutin ng 22-30 minuto ang pag-sync ng state. Kapag nangyari ang pag-sync ng estado, makukuha mo ang mga token na idineposito sa ibinigay na address.

:::

### Mula sa Polygon → Ethereum {#ethereum-2}

1. `withdraw()``FxERC1155ChildTunnel`Tumawag sa address ng child token na naka-deploy sa Polygon dahil ang `childToken`at ang token id bilang `id`(maaaring queried ang child token address mula sa `rootToChildToken`mapping). Bilang kahalili, maaari mo ring i-call ang `withdrawBatch()` para sa maramihang token id at mga katumbas na halaga. Pansinin ang gagamitin **ng tx hash** para makabuo ng burn proof.

2. Makikita mo ang mga hakbang para makumpleto ang withdrawal [dito](#withdraw-tokens-on-the-root-chain).

## I-withdraw ang mga Token sa Root Chain {#withdraw-tokens-on-the-root-chain}

:::info

Pagkatapos mong magtanghal `withdraw()`sa chain ng bata, aabutin ng 30-90 minuto ang isang checkpoint na magaganap. Kapag kasama ng susunod na checkpoint ang transaksyon ng burn, maaari mong i-withdraw ang mga token sa root chain.

:::

1. Bumuo ng patunay na sunog gamit ang **tx hash** at **MESSAGE_SENT_EVENT_SIG**. Para makabuo ng patunay, maaari mong gamitin ang proof generation API na naka-host ng Polygon o maaari mo ring i-spin ang sarili mong proof generation API sa pamamagitan ng pagsunod [sa](https://github.com/maticnetwork/proof-generation-api) mga tagubilin dito.

Available ang endpoint ng generation ng proof generation na naka-host ng Polygon [dito.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

  - `burnTxHash`ay ang transaksyon hash ng `withdraw()`transaksyong sinimulan mo sa Polygon.
  - `eventSignature`ay ang lagda ng event na nilabas ng `withdraw()`function. Ang lagda ng kaganapan para sa MESSAGE_SENT_EVENT_SIG ay `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Ang mga halimbawa ng paggamit ng proof generation API para sa Mainnet at Testnet ay ang mga sumusunod:-

→ [generation ng Polygon Mainnet Proof](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [generation ng Mumbai Testnet Proof](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. I-feed ang nabuong payload bilang argument `receiveMessage()`sa kani-kanilang root tunnel contract sa Goerli o Ethereum.

## Paglipat ng Mintable ERC-20 {#mintable-erc-20-transfer}

Kung sakaling kailangan mo ng halimbawa, tingnan ang [Mintable na ERC20 Root at Child Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) na gabay.

:::info

Sa kaso ng Mintable Token FxTunnels, nakukuha muna ng child token ang naka-deploy at ang root token ay naka-deploy lamang kapag natapos ang unang withdraw/exit process. Maaaring paunang tinutukoy ang root token contract address pagkatapos na mag-deploy ang kontrata ng bata, pero technically exist ang pagmamapa kapag natapos ang unang withdrawal/exit.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: Upang ideposito ang mga token mula sa Ethereum patungo sa Polygon
- `receiveMessage(bytes memory inputData)`: Proof ng pag-burn na ilalagay bilang ang `inputData` para tumanggap ng mga token sa root chain

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: Para mag-deploy ang isang ERC20 token sa network ng Polygon
- `mintToken(address childToken, uint256 amount)`: Mag-mint ng partikular na halaga ng mga token sa Polygon
- `withdraw(address childToken, uint256 amount)`: Upang mag-burn ng mga token sa child chain nang mai-withdraw sa root chain

### Pagmimina ng mga Token sa Polygon {#minting-tokens-on-polygon}

1. I-call ang `deployChildToken()` sa `FxMintableERC20ChildTunnel` at ipasa ang kinakailangang impormasyon ng token bilang mga parameter. Naglalabas ito ng `TokenMapped` na kaganapan na naglalaman ng `rootToken` at `childToken` na mga address. Tandaan ang mga address na ito.
2. I-call ang `mintToken()` sa `FxMintableERC20ChildTunnel` para mag-mint ng token sa child chain.
3. I-call ang `withdraw()` sa `FxMintableERC20ChildTunnel` para i-withdraw ang mga token mula sa Polygon.. Pansinin ang transaksyon hash dahil ito ay darating nang madali-dali para makabuo ng patunay ng sunog.
4. Makikita mo ang mga hakbang para makumpleto ang withdrawal [dito](#withdraw-tokens-on-the-root-chain).

### I-withdraw ang mga Token sa Ethereum {#withdrawing-tokens-on-ethereum}

Gamitin ang nabuong proof ng pag-burn bilang argumento sa `receiveMessage()` sa `FxMintableERC20RootTunnel`. Pagkatapos nito, makikita ang balanse ng token sa root chain.

### Mag-deposito ng mga Token pabalik sa Polygon {#deposit-tokens-back-to-polygon}

1. Tiyaking aprubahan mo ang `FxMintableERC20RootTunnel` para mailipat ang iyong mga token.
2. Tumawag `deposit()`sa s`FxMintableERC20RootTunnel`a bi`rootToken`lang address root token at bi`user`lang tatanggap.
3. Hintaying para sa state sync event (22-30 mins). Pagkatapos nito, maaari mong i-query ang balanse ng target na tatanggap sa child chain.

Ang **ERC721** at **ERC1155** Minimum FxTunnel examples ay ang mga sumusunod :-

- [FxMintableERC721Tunels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## Halimbawa ng mga pag-deploy {#example-deployments}

### Goerli {#goerli}

- Checkpoint Manager: [0x2890bA17EfE978480615e330ecB6533b880928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Dummy ERC20 token: [0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTunnel: [0xA200766a7D64E54611E2D232A6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Dummy ERC721 token: [0x73594a053cb5ddDE558268d28a774375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTunnel: [0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Token ng Dummy ERC1155: [0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d18788cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- FxERC20: [0xDDE69724AeFBdb084413719fE745aB66e3b055C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20ChildTunnel: [0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunnel: [0xA2C7eBEf68B44056b4A39C2CEC23844275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- child token dummy ERC20: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E048726267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721ChildTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunnel: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

Makikita [ang](https://static.matic.network/network/mainnet/v1/index.json) mga kaukulang pag-deploy ng Mainnet dito. Hahanapin ang keyword `FxPortalContracts`para hanapin ang lahat ng default na kontrata ng tunnel at iba pang mahahalagang pag-deploy ng kontrata ng FxPortal. Maaari mong gamitin ang [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)package para ma-access ang mga contract address at ABI.

## Mga Address ng Kontrata {#contract-addresses}

### Testnet ng Mumbai {#mumbai-testnet}

| Kontrata | Na-deploy na address  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Polygon Mainnet {#polygon-mainnet}


| Kontrata | Na-deploy na address  |
| :----- | :- |
| [FxRoot (Ethereum Mainnet)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild (Polygon Mainnnet)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
