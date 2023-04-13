---
id: matic-to-ethereum
title: Ilipat ang data mula sa Polygon patungo sa Ethereum
description: Ilipat ang kalagayan o data mula sa Polygon patungo sa Ethereum sa pamamagitan ng Mga Kontrata
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Medyo naiiba ang mekanismo para sa paglilipat ng data mula sa Polygon patungo sa Ethereum sa paggawa ng pareho para sa Ethereum patungo sa Polygon. Ginagamit ang **checkpoint** na ginawa ng mga Validator sa Ethereum chain para makamit ito. Karaniwang pinapasimulan ang transaksyon sa Polygon. Habang nililikha ang transaksyong ito, kailangan nitong tiyakin na may **nailalabas** na kaganapan at **kasama sa mga log ng kaganapan ang data na nais naming ilipat** mula sa Polygon patungo sa Ethereum.

Sa isang tagal ng panahon ( mga 10-30 mins), naka-check-point ang transaksyong ito sa Ethereum chain ng mga validator. Kapag tapos na ang checkpointing, ang hash ng transaksyon na ginawa sa Polygon chain ay maaaring isumite bilang patunay sa **RootChainManager** na kontrata sa Ethereum chain. Nava-validate ng kontratang ito ang transaksyon, nagpapatunay na kasama sa checkpoint ang transaksyong ito at nagde-decode sa wakas ng mga log ng kaganapan mula sa transaksyong ito.

Kapag natapos na ang yugtong ito, magagamit natin ang **na-decode na data ng log ng kaganapan upang magsagawa ng anumang pagbabago** sa root na kontrata na naka-deploy sa Ethereum chain. Para dito, kailangan din nating tiyakin na ginagawa ang pagbabago ng kalagayan sa Ethereum sa ligtas na paraan lang. Kaya, ginagamit namin ang **Predicate** na kontrata na espesyal na uri ng kontrata na maaari lamang ma-trigger ng kontrata ng **RootChainManager**. Tinitiyak ng arkitektura na ito na mangyayari lamang ang mga pagbabago sa kalagayan ng Ethereum kapag naka-checkpoint ang transaksyon sa Polygon at na-verify sa Ethereum chain sa pamamagitan ng kontrata ng **RootChainManager**.

# Pangkalahatang-ideya {#overview}

- Isinasagawa ang transaksyon sa kontrata ng child na naka-deploy sa Polygon chain.
- Nagbunga din ng  kaganapan ang transaksyong ito. Kasama sa mga parameter ng **kaganapang ito ang data na kailangang ilipat** mula sa Polygon patungo sa Ethereum.
- Kinukuha ng mga validator sa Polygon network ang transaksyong ito sa isang tiyak na agwat ng oras (malamang na 10–30mins), i-validate ang mga ito at **idagdag ang mga ito sa checkpoint** sa Ethereum.
- Ginawa ang checkpoint na transaksyon sa **RootChain** na kontrata at maaaring suriin ang paggamit ng checkpoint sa pamamagitan ng [script](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js) na ito
- Kapag nakumpleto na ang pagdagdag ng checkpoint, maaaring gamitin ang **matic.js** library para ma-call ang **exit** na function ng kontrata ng **RootChainManager**. Maaaring i-call ang **exit** na function gamit ang library ng matic.js tulad ng ipinapakita sa [halimbawa](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js).

- Nagpapatunay ang pagpapatakbo ng script sa pagsasama ng hash na transaksyon sa Polygon sa Ethereum chain, at saka tinatawagan ang **exitToken** function ng [predicate](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol) na kontrata.
- Tinitiyak nito na ang **kalagayan ng pagbabago sa kontrata ng root chain** ay palaging ginagawa sa **ligtas** na paraan at **sa pamamagitan lang ng predicate na kontrata**.
- Mahalagang tandaan na ang **pag-verify ng hash ng transaksyon** mula sa Polygon at **pag-trigger ng predicate** na kontrata ay nangyayari sa **i transaksyon** at tinitiyak, sa gayon, ang seguridad ng anumang pagbabago sa kalagayan sa root na kontrata.

# Pagpapatupad {#implementation}

Simpleng ipinapamalas nito kung paano mailipat ang data mula sa Polygon patungo sa Ethereum. Ipinapakita ng tutorial na ito ang halimbawa ng paglilipat ng value ng uint256 sa buong chain. Ngunit maaari mong ilipat ang uri ng data. Pero kinakailangan na i-encode ang data sa bytes at saka ilabas ito mula sa kontrata ng child. Maaari itong ma-decode sa wakas sa root na kontrata.

1. Gumawa muna ng root chain at ng kontrata ng child chain. Tiyakin na naghahatid din ng isang kaganapan ang function na nagbabago ng kalagayan. Dapat isama sa kaganapang ito ang data na ililipat bilang isa sa mga parameter nito. Nasa ibaba ang sample na format kung ano dapat ang hitsura ng kontrata ng Child at Root. Napakasimpleng kontrata nito na mayroong variable ng data na itinakda ang value sa pamamagitan ng paggamit ng setData function. Naghahatid ang pag-call sa setData function ng kaganapang kaugnay ng Data. Ipapaliwanag ang iba pang bagay sa kontrata sa paparating na mga seksyon ng tutorial na ito.

A. Kontrata ng child

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. Kontrata ng Root

Ipasa ito `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f` bilang value para sa `_predicate` constructor ng kontrata ng root.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. Kapag na-deploy na ang child at root na kontrata sa Polygon at Ethereum chain ayon sa pagkakabanggit, ang mga kontratang ito ay kailangang maimapa gamit ang PoS bridge. Tinitiyak ng pagmamapa na ito na may koneksyon sa pagitan ng dalawang kontratang ito sa mga chain. Para sa paggawa ng pagmamapa na ito, maaaring ipaabot ito sa team ng Polygon sa [discord](https://discord.com/invite/0xPolygon).

3. Mahalagang tandaan na sa root na kontrata, mayroon lamang onlyPredicate na modifier. Inirerekomenda na gamitin ang modifier na ito palagi dahil sinisigurado nito na ang predicate kontrata lang ang gagawa ng pagbabago ng kalagayan sa root na kontrata. Isang espesyal na kontrata ang predicate na kontrata na nagpapalitaw sa root na kontrata kapag ang transaksyon na nangyari sa Polygon chain ay na-verify ng RootChainManager sa Ethereum chain. Tinitiyak nito ang ligtas na pagbabago ng kalagayan sa root na kontrata.

Para sa pagsubok sa pagpapatupad sa itaas, maaari tayong gumawa ng transaksyon sa Polygon chain sa pamamagitan ng pag-call sa **setData** function ng child na kontrata. Kailangan nating maghintay sa puntong ito para matapos ang checkpoint. Maaaring suriin ang pagsasama ng checkpoint gamit ang [script](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js) na ito. Kapag nakumpleto na ang checkpoint, i-call ang exit function ng RootChainManager gamit ang matic.js SDK.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

Gaya ng ipinapakita sa screenshot sa itaas, ang **txHash** ay ang hash na transaksyon ng transaksyon na nangyari sa child na kontrata na na-deploy sa Polygon chain.

Ang **logEventSignature** ay ang keccack-256 hash ng kaganapan ng data. Ito ang parehong hash na isinama namin sa kontrata ng Predicate. Makikita ang lahat ng code ng kontrata na ginamit para sa tutorial na ito at ang exit script [dito](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

Kapag nakumpleto na ang exit script, maaaring i-query ang root na kontrata sa Ethereum chain para i-verify na kung makikita rin ang value ng variable na **data** na itinakda sa child na kontrata sa variable na **data** ng root na kontrata.
