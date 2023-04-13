---
id: state-transfer
title: Paglipat ng Kalagayan
description: Madaling maglipat ng estado o data mula sa Ethereum hanggang sa Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Patuloy na sinusubaybayan ng mga validator ng Polygon ang isang kontrata sa Ethereum chain na tinatawag na `StateSender`. Sa bawat oras na tumatawag ang isang nakarehistrong kontrata sa Ethereum chain sa kontratang ito, naglalabas ito ng isang kaganapan. Gamit ang kaganapang ito, inihahatid ng mga validator ng Polygon ang data sa isa pang kontrata sa Polygon chain. Ginagamit ang mekanismong **State Sync** na ito para magpadala ng data mula sa Ethereum hanggang sa Polygon.

Bukod pa rito, nagpadala ang mga validator ng Polygon ng Ethereum hash ng bawat transaksyon sa polygon chain sa isang regular na batayan. Maaari mong gamitin ang **checkpoint** na ito para patunayan ang anumang transaksyon na naganap sa Polygon. Kapag napatunayan na ang isang transaksyon na naganap sa Polygon chain, puwede nang gamitin ang Ethereum para isagawa ang naaangkop na aksyon.

Magkasama na magagamit ang 2 mekanismong ito para paganahin ang two-way na data (state) na paglipat sa pagitan ng Ethereum at Polygon. Para unawain ang lahat ng mga pakikipag-ugnayan na ito, maaari mong direktang magmana ng aming `FxBaseRootTunnel`(sa Ethereum) at (sa mga kontrata `FxBaseChildTunnel`ng Polygon)

## Root Tunnel Contract {#root-tunnel-contract}

Gamitin ang `FxBaseRootTunnel`kontrata mula [dito](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol). Nagbibigay ang kontratang ito ng access sa mga sumusunod na function:

- `function _processMessageFromChild(bytes memory data)`: Ito ay isang virtual function na kailangang ipatupad sa kontrata na nagmana nito para pangasiwaan ang data na ipinadala mula sa `ChildTunnel`.
- `_sendMessageToChild(bytes memory message)`: Ang function na ito ay maaaring tawagan sa loob ng anumang bytes data bilang mensahe. Ipapadala ang data na ito tulad ng sa child tunnel.
- `receiveMessage(bytes memory inputData)`: Kailangang tawagin ang function na ito para matanggap ang mensaheng ipinapalabas ng `ChildTunnel`. Ang proof ng transaksyon ay kailangang ibigay bilang calldata. Isang halimbawa ng script para makabuo ng patunay na gumagamit ng **matic.js** ay kasama sa ibaba.

## Kontrata sa Child Tunnel {#child-tunnel-contract}

Gamitin ang `FxBaseChildTunnel` kontrata mula [dito](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Ang kontratang ito ay nagbibigay ng access sa mga sumusunod na function:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: Ito ay isang virtual function na kailangang ipatupad ang lohika para pangasiwaan ang mga mensaheng ipinadala mula sa `RootTunnel`.
- `function _sendMessageToRoot(bytes memory message)`: Maaaring i-call sa loob ang function na ito upang maipadala ang anumang bytes na mensahe sa root tunnel.

## Mga Prerequisite {#prerequisites}

- Kailangan mong magmana ng kontrata sa iyong root `FxBaseRootTunnel`contract sa Ethereum. Bilang halimbawa, maaari mong sundin ang [kontratang](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) ito. Katulad nito, magmana ng `FxBaseChildTunnel`kontrata sa iyong anak sa Polygon. Sundin ang [kontrata](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) na ito bilang halimbawa.
- Habang nag-deploy ng iyong root contract sa
  - **Goerli Testnet**, ipasa ang address `_checkpointManager`ng bilang 0**x2890bA17EfE978480615e330ecB6533b880928e** at `_fxRoot`bilang **0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA.**

  - Ang **Ethereum Mainnet** `_checkpointManager`ay 0**x86e4dc95c7fbdbf52e33d563bbdb00823894c287 **`_fxRoot`at **0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2.**
- Para sa pag-deploy ng kontrata ng bata sa **Mumbai testnet**, pumasa sa **0xCf73231F28B7331BBe3124B907840A94851f9f11** tulad ng `_fxChild`sa constructor. Para **sa mainnet** **ng** Polygon, `_fxChild`magiging 0x8397259c983751DAf4000790063935a11afa28a.
- Tumawag `setFxChildTunnel`sa naka-deploy na root tunnel gamit ang address ng batang tunnel. Halimbawa: [0x79cd30ace561a226258918b56ce098a08ce0c707a80bba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- Tumawag `setFxRootTunnel`sa naka-deploy na lagusan ng bata na may address ng ugat tunnel. Halimbawa: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## Halimbawa ng mga kontrata ng bridge ng paglipat ng kalagayan {#example-contracts-of-state-transfer-bridge}

- **Mga Kontrata**: [Repositoryo ng Fx-Portal Github](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Ilipat ang Estado mula sa Ethereum → Polygon {#polygon}

- Kailangan mong tumawag sa `_sendMessageToChild()`loob sa iyong root contract at ipasa ang data bilang argument na ipapadala sa Polygon. Halimbawa: [0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4a20cff960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- Sa kontrata ng child mo, ipatupad ang `_processMessageFromRoot()` virtual function sa `FxBaseChildTunnel` para makuha ang data mula sa Ethereum. Awtomatikong matatanggap ang data mula sa receiver ng Kalagayan kapag naka-sync ang Kalagayan.

## Ilipat ang Estado mula sa Polygon → Ethereum {#ethereum}

1. I-call ang `_sendMessageToRoot()` ethereum sa kontrata ng child mo gamit ang data bilang parameter na ipapadala sa Ethereum. Halimbawa: [0x3cc9f7e675bb4f6af87ee9947bf24c38cbffa0b933d8c981644a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

Pansinin ang transaksyon hash dahil gagamitin ito para makabuo ng patunay pagkatapos nitong makasama bilang checkpoint.

2. **Proof Generation para makumpleto ang lumabas sa root chain**: Bumuo ng patunay gamit ang **tx hash** at **MESSAGE_SENT_EVENT_SIG**. Para makabuo ng patunay, maaari mong gamitin ang proof generation API na naka-host ng Polygon o maaari mo ring i-spin ang sarili mong proof generation API sa pamamagitan ng pagsunod [sa](https://github.com/maticnetwork/proof-generation-api) mga tagubilin dito.

Available ang endpoint ng generation ng proof generation na naka-host ng Polygon [dito.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Ang mga halimbawa ng paggamit ng proof generation API para sa Mainnet at Testnet ay ang mga sumusunod:-

→ [generation ng Mumbai Testnet Proof](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [generation ng Polygon Mainnet Proof](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. Ipatupad ang `_processMessageFromChild()` sa kontrata ng root mo.

4. Gamitin ang nabuong proof bilang input sa `receiveMessage()` para makuha ang data na ipinadala mula sa child tunnel sa iyong kontrata. Halimbawa: [0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) )
