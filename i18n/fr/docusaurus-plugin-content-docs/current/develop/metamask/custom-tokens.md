---
id: custom-tokens
title: Configurez des jetons personnalisés
description: Configurez des jetons personnalisés Metamask.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cette page montre le processus de configuration/ajout de jetons personnalisés à Metamask.

Vous pouvez utiliser le même processus pour ajouter tous les jetons personnalisés à n'importe quel réseau sur Metamask. Vous pouvez vous référer à [ce tableau](#tokens-and-contract-adresses) pour visualiser quelques exemples de jetons de test avec leurs adresses contractuelles respectives.

## Ajouter un jeton personnalisé à votre compte MetaMask {#adding-a-custom-token-to-your-metamask-account}

Premièrement, choisissez le réseau approprié pour le nouveau jeton sur l'écran d'accueil de votre Metamask. Ensuite, cliquez sur "Importer des jetons".

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

Il vous naviguera ensuite vers un nouvel écran. Sur l'écran Importer des jetons, copiez-collez une adresse dans le champ Adresse jeton.

:::info
Pour illustrer ce processus, nous utilisons un jeton E**RC20-TESTV4 **sur le **réseau Goerli.** Trouvez d'autres jetons de test à partir d'autres réseaux [<ins>ici</ins>](#tokens-and-contract-adresses).
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

Les autres champs se rempliront automatiquement. Cliquez sur Ajouter des jetons personnalisés et puis cliquez sur Importer des jetons. Le jeton `TEST` doit maintenant s'afficher sur votre compte sur Metamask.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**Ajouter un jeton ERC1155 de test à votre compte Metamask**

Bien que le réseau de Polygon prenne en charge la norme ERC1155, [Metamask ne la prend pas encore en charge](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). Cette mise à jour est attendue pour le quatrième trimestre de 2021.

### Jetons et adresses de contrat {#tokens-and-contract-adresses}

| jeton | Réseau | Adresse du Contrat  |
|---------------|---------|----------------------------------------------|
| ERC20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |