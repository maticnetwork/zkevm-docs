---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: Ang BandChain ay isang High-performance na Blockchain na binuo para sa Oracle ng Data para sa query data mula sa tradisyonal na web API
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Binibigyang-daan ka ng Band Protocol na mag-query ng data mula sa mga tradisyunal na web API at gamitin ito sa blockchain. Maaaring gumawa ang mga developer ng mga query sa pamamagitan ng **BandChain, isang cosmos-based na blockchain** para sa pagpapadali ng mga kahilingan at pagbabayad ng oracle, at saka gamitin ang data sa dApp sa pamamagitan ng inter-chain communication. Ang pagsasama ng data ng oracle ay maaaring gawin sa 3 simpleng hakbang:

1. **Pagpili ng mga script ng oracle**

    Ang Oracle script ay  hash na natatanging kinikilala ang uri ng data na hihilingin mula sa band-chain. Ang mga script na ito ay matatagpuan [**dito**](https://guanyu-devnet.cosmoscan.io/oracle-scripts). Ang mga script na ito ay ginagamit bilang isa sa mga parameter habang gumagawa ng kahilingan sa oracle.

2. **Paghiling ng data mula sa BandChain**

Magagawa ito sa dalawang paraan:

    - **Gamit ang BandChain explorer**

    Maaari mong i-click ang oracle script ng iyong pinili, at pagkatapos ay mula sa **Execute** tab na maaari mong ipasa ang mga parameter at makuha ang tugon mula sa BandChain. Ang tugon ay maglalaman ng resulta at isang evm proof din. Ang patunay na ito ay kailangang kopyahin at gagamitin sa huling hakbang. Available ang mga BandChain docs para sa pag-query ng oracle gamit ang explorer [**dito**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer).

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Dahil sa itaas ay isang halimbawa ng paggawa ng kahilingan ng oracle para makuha ang mga random na value ng numero. Ipinapasa ang value 100 sa `max_range`parameter ng kahilingan ng oracle Kumuha hash bilang tugon. Ipapakita ng pag-click sa hash na ito sa atin ang kumpletong mga detalye ng tugon.

    - **Gamit ang BandChain-Devnet JS Library**

    Maaari mong i-query ang BandChain nang direkta gamit ang library ng BandChain-Devnet. Kapag na-query, nagbibigay ito ng **evm proof** sa tugon. Maaaring gamitin ang patunay na ito para sa huling hakbang ng pagsasama ng BandChain. Available ang mga BandChain docs para sa querying oracle gamit ang BandChain-Devnet JS Library [**dito**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library). Magiging ganito ang hiling na payload para sa random na numero ng oracle. Tiyaking naipasa ang katawan ng kahilingan sa aplikasyon /json na format.

3. **Gamit ang data sa mga smart na kontrata**

Ang huling hakbang ay ang pag-deploy ng a kontrata ng pagpapatunay at iimbak ang mga tugon mula sa kahilingan ng orakulo sa mga variable ng estado ng mga kontrata sa pagpapatunay. Kapag naitakda na ang mga variable ng kalagayan na ito, maa-access ang mga ito kapag kinakailangan ng dApp. Gayundin ang mga variable ng estado na ito ay maaaring ma-update gamit ang mga bagong halaga sa pamamagitan ng pagtatanong muli sa mga script ng oracle mula sa dApp. Ang ibinigay sa ibaba ay isang wastong kontrata na nag-iimbak ng palambang na halaga ng numero gamit ang random na numero ng oracle script.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

Kapag nag-deploy, kailangang lumipas ang 3 parameter. Ang **unang parameter** ay ang kung `codeHash`saan ay ang oracle script hash. Ang **ikalawang** parameter ay ang oracle script na humiling ng mga parameter object. Kailangan itong ipasa sa format ng bytes. Nagbibigay ang BandChain ng REST API para sa pag-convert ng parameter na JSON object sa bytes na format. Matatagpuan ang mga detalye ng API [**dito**](https://docs.bandchain.org/references/encoding-params). Kailangang magdagdag ng 0x sa tugon na natanggap mula sa API na ito. Ang **ikatlong parameter** ay ang contract address ng BandChain contract na naka-deploy na sa Polygon network. Sinusuportahan ng Band Protocol ang Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

Isa pang dapat tandaan ay dapat i-import ng validation contract ang katulong library at interface na tinatawag `BandChainLib.sol`at ayon sa `IBridge.sol`pagkakabanggit. Matatagpuan sila sa mga sumusunod na link: interface ng [**Bandchain**](https://docs.bandchain.org/references/bandchainlib-library) Library at [**Ibridge**](https://docs.bandchain.org/references/ibridge-interface)

Kapag na-deploy na ang kontrata sa pagpapatunay, maa-access ang mga variable ng estado sa pamamagitan ng pagtatanong mula sa isang dApp. Katulad ng maraming contract ng validation ay maaaring lumikha para sa iba't ibang in-built na oracle script. May isang paraan ang interface ng Ibridge na tinatawag na nagpapatunay ng mga values `relayAndVerify()`na na-update sa bawat oras sa validation contract. Ang `update()`paraan sa validation contract ay may logic na i-update ang mga state variable. Ang proof ng EVM na nakuha mula sa pag-query ng oracle script ay kailangang ipasa ang `update()`pamamaraan. Sa bawat oras na napapanahon ang isang value, nililimitahan ng kontrata ng BandChain sa Polygon ang data bago storing ito sa contract state.

Nagbibigay ang BandChain ng desentralisadong network ng mga oracle na maaaring gamitin ng dApps para mapalakas ang kanilang smart contract logic. Ang mga BandChain docs sa pag-deploy ng kontrata, pag-store ng mga values, at pag-update ng mga ito ay matatagpuan [**dito**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library).