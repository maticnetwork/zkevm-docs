---
id: did-implementation
title: Pagpapatupad ng Polygon DID
sidebar_label: Identity
description: Alamin ang tungkol sa pagpapatupad ng DID sa Polygon
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Ito ay isang gabay sa pagsisimula para sa mga user na gustong gamitin ang mga package sa pagpapatupad na inilathala ng Polygon team, upang mag-generate at maglathala ng Polygon DID sa Polygon ledger.

Binubuo ang Pagpapatupad ng Polygon DID method ng 3 package, ang mga ito ay ang polygon-did-registrar, polygon-did-resolver at polygon-did-registry-contract. Ang isang user na gustong isama ang functionality na magrehistro o magbasa ng DID sa o mula sa Polygon network ay maaaring gamitin ang sumusunod na gabay.

Ang isang DID ay isang natatanging pantukoy na nagawa nang walang presensya ng isang sentral na awtoridad.  Ang DID sa konteksto ng mga Nabeberipikang Kredensyal ay ginagamit upang lumagda ng mga dokumento, sa gayon ay nagpapadali sa user na mapatunayan ang pagmamay-ari ng dokumento kapag kinakailangan.

## Polygon DID Method {#polygon-did-method}

Ang kahulugan ng Polygon DID method ay umaayon sa mga pangunahing espesipikasyon at pamantayan ng DID. Ang isang DID URI ay binubuo ng tatlong bahagi na pinaghiwalay ng mga tutuldok, ang scheme, na sinusundan ng pangalan ng paraan at panghuli ay isang pantukoy na partikular sa paraan. Para sa hitsura ng Polygon na URI:

```
did:polygon:<Ethereum address>
```

Dito ang `did`scheme , ang pangalan ng pamamaraan ay at ang paraan ng partikular `polygon`na identifier ay isang Ethereum address.

## Pagpapatupad ng Polygon DID {#polygon-did-implementation}

Maaaring ipatupad ang Polygon DID sa tulong ng dalawang package, maaaring i-import ng user ang kani-kanilang mga npm library at gamitin ang mga ito para isama ang mga pamamaraan ng Polygon DID sa kani-kanilang mga application. Ang mga detalye para sa pagpapatupad ay ibinigay sa susunod na seksyon.

Para makapagsimula, kailangan mo munang gumawa ng DID. Ang paggawa sa kaso ng Polygon did ay isang enkapsulasyon ng dalawang hakbang, una kung saan kailangan ng user na mag-generate ng DID uri para sa kanilang mga sarili at susunod ay irehistro ito sa Polygon ledger.

### Gumawa ng DID {#create-did}

Sa iyong proyekto para lumikha ng isang polygon DID URI kailangan munang i-install:

```
npm i @ayanworks/polygon-did-registrar --save
```

Kapag natapos ang pag-install, puwede itong gamitin ng user tulad ng sumusunod:

```
import { createDID } from "polygon-did-registrar";
```

Tinutulungan ng `createdDID`function ang user na bumuo ng DID URI. Habang gumagawa ng DID, maaaring may dalawang sitwasyon.

  1. Nagmamay-ari na ang user ng isang wallet at nais mag-generate ng DID na tumutugma sa parehong wallet.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. Kung walang umiiral na wallet ang user at gustong bumuo ng isa, maaaring gamitin ng user:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

Ang parameter ng network sa parehong kaso ay tumutukoy sa kung nais ng user na lumikha ng DID sa Polygon Mumbai Testnet o Polygon Mainnet.

Sample Input:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

Pagkatapos na lumikha ng DID, magkakaroon ka ng DID URI.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### I-register ang {#register-did}

Para i-register ang DID URI at ang kaukulang dokumento ng DID sa ledger, kailangan munang gamitin ng user `polygon-did-registrar`ang mga sumusunod:

```js
import { registerDID } from "polygon-did-registrar";
```

Bilang kailangan sa pag-register ng DID, kailangang tiyakin ng user na ang wallet na corrsponding sa DID ay may kinakailangang balanse ng tokens. Kapag may balanse ang user sa token sa wallet, maaaring gawin ang isang tawag sa pag-andar ng registerDID tulad ng ipinapakita sa ibaba:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

Mga parameter `did`at `privateKey`sapilitan, habang opsyonal itong pumasok sa `url`at ang .`contractAddress` Kung hindi ibibigay ng user ang huling dalawang parameter, kukunin ng library ang mga default na configuration ng network mula sa DID URI.

Kung tutugma ang lahat ng parameter sa mga pagtutukoy at ibinigay ang lahat ng bagay sa tamang order, nagbabalik ang `registerDID`function ng isang transaksyon hash, bumalik ang isang kaukulang error kung hindi man.

At sa mga ito, matagumpay mong natapos ang iyong gawain sa pag-register ng isang DID sa Polygon Network.

## Lutasin ang DID {#resolve-did}

Para magsimula, i-install ang mga sumusunod na aklatan:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

Para basahin ang isang dokumento ng DID sa ledger, sinumang user na may DID polygon URI ay maaaring sa kanilang proyekto ay i-import ang,

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

Matapos i-import ang mga package, maaaring i-retrieve ang dokumento ng DID sa pamamagitan ng paggamit ng:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

kung saan ang `didResolutionResult`bagay ay ang mga sumusunod:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

Dapat tandaan na, walang gagastusing gas ang user habang sinusubukang lutasin ang isang DID.

## I-update ang Dokumento ng DID {#update-did-document}

Para i-encapsulate ang proyekto na may kakayahang i-update ang dokumento ng DIW, kailangan munang gamitin ng user `polygon-did-registrar`ang mga sumusunod:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

Susunod, tawagan ang function:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

Dapat tandaan na i-update ang dokumento ng DI, tanging ang may-ari ng DID ang makapagpapadala ng kahilingan. Ang pribadong key dito ay dapat na naghahawak din ng ilang kaukulang Matic token.

Kung hindi ibibigay ng user ang configuration na may `url` at `contractAddress`, kukunin ng library ang mga default na configuration ng network mula sa DID URI.

## I-delete ang Dokumento ng DID {#delete-did-document}

Sa pagpapatupad ng DIY ng Polygon ay maaari ring bawiin ng isang user ang kanyang DID Document mula sa ledger. Kailangan munang gamitin ng gumagamit `polygon-did-registrar`ang mga sumusunod:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

Saka gamitin ang,

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Sa mga parameter, kapansin-pansin na, ang `url` at `contractAddress` ay mga opsyonal na parameter, na kung hindi ibinigay ng user, isang default na configuration ang kukunin ng function batay sa DID URI.

Mahalaga para sa pribadong key na hawakan ang mga kinakailangang Matic token, alinsunod sa network configuration ng DID, o mabibigo ang transaksyon.

## Pag-aambag sa Repository {#contributing-to-the-repository}

Gamitin ang standard fork, sangay at pull request workflow upang magpanukala ng mga pagbabago sa mga repository. Please ang mga pangalan ng branch sa pamamagitan ng kabilang ang isyu o numero ng bug halimbawa.

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
