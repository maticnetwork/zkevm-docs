---
id: nftstorage
title: Frapper des NFT
description: Frappez avec NFT.storage et Polygon.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Ce tutoriel vous apprendra à frapper un NFT en utilisant la blockchain Polygon et le stockage IPFS/Filecoin via NFT.Storage. Polygon, une solution de mise à l'échelle de couche 2 pour Ethereum, est souvent choisie par les développeurs pour sa rapidité et ses coûts de transaction réduits tout en maintenant une compatibilité totale avec l'EVM d'Ethereum. Le tutoriel vous guidera dans la création et le déploiement d'un contrat intelligent standardisé, le stockage des métadonnées et des actifs sur IPFS et Filecoin via l'API NFT.Storage et la frappe du NFT sur votre propre portefeuille sur Polygon.

## Introduction {#introduction}

Dans ce tutoriel, nous chercherons à remplir trois caractéristiques avec notre processus de frappe :

1. L'*évolutivité* du processus de frappe en ce qui concerne les coûts et le débit. Si le cas d'utilisation vise à créer rapidement des NFT, la technologie sous-jacente doit traiter toutes les demandes de frappe et la frappe doit être bon marché.
2. La *durabilité* du NFT, car les actifs peuvent avoir une longue durée de vie et doivent donc rester utilisables pendant toute leur durée de vie.
3. L'*immutabilité* du NFT et de l'actif qu'il représente afin d'empêcher les modifications non souhaitées et les acteurs malveillants de modifier l'actif numérique que le NFT représente.

[Polygon](https://polygon.technology) répond à la caractéristique d'*évolutivité* avec son protocole et son cadre. Elles sont également compatibles avec Ethereum et sa machine virtuelle, ce qui permet aux développeurs de déplacer librement leur code entre les deux blockchains. De même, [NFT.Storage](https://nft.storage) garantit la *durabilité* avec la puissance du réseau sous-jacent [Filecoin](https://filecoin.io) et l'*immutabilité* en utilisant l'[adressage du contenu](https://nftschool.dev/concepts/content-addressing/) d'IPFS.

Dans ce tutoriel, vous aurez un aperçu du processus de frappe de NFT, vous apprendrez à stocker un actif numérique avec NFT.Storage et à utiliser cet actif numérique pour frapper votre NFT sur Polygon.

## Prérequis {#prerequisites}

Des connaissances générales sur les NFT vous donneront un contexte. [La NFT School couvre les bases des NFT](https://nftschool.dev/concepts/non-fungible-tokens/), des sujets avancés et propose davantage de tutoriels.

Pour tester et exécuter le code trouvé dans ce tutoriel, vous aurez besoin d'une [installation Node.js](https://nodejs.org/en/download/package-manager/) en état de marche.

Vous aurez également besoin d'un portefeuille Polygon sur le testnet Mumbai avec une petite quantité de jeton MATIC. Suivez les instructions ci-dessous pour commencer :

1. **Téléchargez et installez [Metamask](https://metamask.io/)**. Métamasque est un portefeuille de crypto-monnaies et une passerelle vers les applications blockchain. C'est très facile à utiliser et simplifie de nombreuses étapes, par exemple la mise en place d'un portefeuille de Polygon.
2. **Connectez Metamask au [testnet Mumbai](https://docs.polygon.technology/docs/develop/metamask/overview)** de Polygon et sélectionnez-le dans le menu déroulant. Nous utiliserons le testnet de Polygon pour frapper notre NFT, car c'est gratuit.
3. **Recevez le jeton MATIC** dans votre portefeuille en utilisant le [robinet](https://faucet.polygon.technology/). Sélectionnez le testnet Mumbai et collez l'adresse de votre portefeuille de Metamask dans le formulaire. Pour frapper un NFT, nous devons payer un petit montant de MATIC, qui sont des frais facturés par les mineurs pour les opérations visant à ajouter de nouvelles transactions à la blockchain, par exemple, frapper un NFT ou créer un nouveau contrat intelligent.
4. **Copiez votre clé privée** de Metamask en cliquant sur les trois points dans le coin supérieur droit et en sélectionnant « Détails du compte ». En bas, vous trouverez un bouton pour exporter votre clé privée. Cliquez dessus et entrez votre mot de passe lorsque vous y êtes invité. Pour l'instant, vous pouvez copier et coller la clé privée dans un dossier texte. Nous l'utiliserons plus tard dans le tutoriel lorsque nous interagirons avec la blockchain.

Enfin, vous aurez besoin d'un éditeur de texte ou de code. Pour rendre les choses plus simples, choisissez un éditeur qui prend en charge à la fois JavaScript et Solidity. Une bonne option est [Visual Studio Code](https://code.visualstudio.com) avec l'extension [solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) activée.

## Préparation {#preparation}

### Obtenez une clé API pour NFT.storage {#get-an-api-key-for-nft-storage}

Afin d'utiliser NFT.Storage, vous avez besoin d'une clé API. Tout d'abord, [allez sur NFT.Storage pour vous connecter avec votre adresse e-mail](https://nft.storage/login/). Vous recevrez un e-mail contenant un lien magique qui vous permettra de vous connecter - aucun mot de passe n'est nécessaire. Après vous être connecté avec succès, allez à Clés API via la barre de navigation. Vous trouverez un bouton pour créer une **Nouvelle clé**. Lorsque vous êtes invité à saisir un nom de clé API, vous pouvez en choisir un librement ou utiliser « polygon + NFT.Storage ». Vous pouvez copier le contenu de la colonne clé maintenant ou consulter NFT.Storage plus tard dans le tutoriel.

### Configurer votre espace de travail {#set-up-your-workspace}

Créez un nouveau dossier vide que nous pouvons utiliser comme espace de travail pour ce tutoriel. N'hésitez pas à choisir un nom et un emplacement sur votre système de fichiers. Ouvrez un terminal et allez au dossier nouvellement créé.

Ensuite, nous allons installer les dépendances Node.js suivantes :

- **Hardhat et Hardhat-Ethers**, un environnement de développement pour Ethereum (et les blockchains compatibles avec Ethereum comme Polygone).
- **OpenZeppelin**, une collection de contrats intelligents comprenant des contrats de base NFT standardisés.
- **NFT.Storage**, une bibliothèque pour se connecter à l'API NFT.Storage.
- **Dotenv**, une bibliothèque permettant de gérer les fichiers d'environnement pour la configuration (par exemple, l'injection de clés privées dans le scénario).

Utilisez la commande suivante pour installer toutes les dépendances en une seule fois :

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat doit être initialisé dans le dossier actuel. Afin de démarrer l'initialisation, exécutez :

```bash
npx hardhat
```

Lorsque vous êtes invité, choisissez **Créer un hardhat.config.js vide**. Votre sortie console devrait ressembler à ceci :

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Nous allons apporter quelques modifications au fichier de configuration de hardhat `hardhat.config.js` pour prendre en charge le réseau de test Polygon Mumbai. Ouvrez le `hardhat.config.js` qui a été créé à la dernière étape. Veuillez noter que nous chargeons la clé privée de votre portefeuille de Polygon à partir d'un fichier d'environnement et que ce fichier d'environnement doit être conservé en lieu sûr. Vous pouvez même utiliser d'autres [liens](https://docs.polygon.technology/docs/develop/network-details/network) rpc, selon vos besoins.

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

Créez un nouveau fichier appelé `.env`qui contiendra votre clé API pour NFT.Storage et votre clé privée portefeuille Polygon. Le contenu du `.env`fichier devrait ressembler à quelque chose comme :

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

Remplacez les espaces vides par la clé API que vous avez créée lors de la préparation et par la clé privée de votre portefeuille de Polygon.

Pour garder notre projet organisé, nous allons créer trois nouveaux dossiers :

1. `contracts`, pour les contrats Polygon écrits dans Solidity.
2. `assets`, contenant l'actif numérique que nous allons frapper comme NFT.
3. `scripts`, en tant qu'assistants pour conduire le processus de préparation et de frappe.

Exécutez la commande suivante :

```bash
mkdir contracts assets scripts
```

Enfin, nous allons ajouter une image dans le dossier `assets`. Cette image sera notre œuvre d'art que nous téléchargerons sur NFT.Storage et frapperons sur Polygon. Nous le nommerons `MyExampleNFT.png` pour l'instant. Si vous n'avez pas de belles illustrations prêtes, vous pouvez [télécharger un modèle simple](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu).

## Frapper votre NFT {#minting-your-nft}

### Stocker des données d'actifs avec NFT.Storage {#storing-asset-data-with-nft-storage}

Nous utiliserons NFT.Storage pour stocker notre actif numérique et ses métadonnées. NFT.Storage garantit l'immuabilité et la durabilité en téléchargeant automatiquement votre actif numérique sur Filecoin et IPFS. IPFS et Filecoin fonctionnent avec des identifiants de contenu (CID) pour un référencement immuable. IPFS permettra une récupération rapide grâce à sa mise en cache géo-répliquée et Filecoin garantit la durabilité grâce à des fournisseurs de stockage récompensés.

Créez un scénario appelé `store-asset.mjs` dessous le répertoire `scripts`. Les contenus sont énumérés ci-dessous :

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

La partie principale du scénario est la fonction `storeAsset`. Elle crée un nouveau client qui se connecte à NFT.Storage en utilisant la clé API que vous avez créée précédemment. Nous présentons ensuite les métadonnées, qui comprennent le nom, la description et l'image. Notez que nous lisons l'actif NFT directement depuis le système de fichiers, dans le répertoire `assets`. À la fin de la fonction, nous imprimerons l'URL des métadonnées, car nous l'utiliserons plus tard lors de la création du NFT sur Polygon.

Après avoir configuré le scénario, vous pouvez l'exécuter en exécutant :

```bash
node scripts/store-asset.mjs
```

Votre sortie devrait ressembler à la liste ci-dessous, où `HASH` est le CID de l'art que vous venez de stocker.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Créer votre NFT sur Polygon {#creating-your-nft-on-polygon}

#### Créer le contrat intelligent pour la frappe {#create-the-smart-contract-for-minting}

Tout d'abord, nous allons créer un contrat intelligent qui sera utilisé pour frapper le NFT. Puisque Polygon est compatible avec Ethereum, nous allons écrire le contrat intelligent dans [Solidity](https://soliditylang.org). Créez un nouveau fichier pour notre contrat intelligent NFT nommé `ExampleNFT.sol`dans le répertoire `contracts`. Vous pouvez copier le code du listing ci-dessous :

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

Pour être un NFT valide, votre contrat intelligent doit implémenter toutes les méthodes de la [norme ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/). Nous utilisons l'implémentation de la bibliothèque [OpenZeppelin](https://openzeppelin.com), qui fournit déjà un ensemble de fonctionnalités de base et adhère à la norme.

Au sommet de notre contrat intelligent, nous importons trois classes de contrats intelligents OpenZeppelin :

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` contient la mise en œuvre des méthodes de base de la norme ERC-721, dont notre contrat intelligent NFT héritera. Nous utilisons le `ERC721URIStorage,` qui est une extension permettant de stocker non seulement les actifs mais aussi les métadonnées dans un fichier JSON hors chaîne. Comme le contrat, ce fichier JSON doit adhérer à la norme ERC-721.

2. `\@openzeppelin/contracts/utils/Counters.sol` fournit des compteurs qui peuvent être seulement incrémentés ou décrémentés que d'une unité. Notre contrat intelligent utilise un compteur pour suivre le nombre total de NFT frappés et pour définir l'tdentifiant unique de notre nouveau NFT.

3. `\@openzeppelin/contracts/access/Ownable.sol` met en place un contrôle d'accès sur notre contrat intelligent, de sorte que seul le propriétaire du contrat intelligent (vous) peut créer des NFT.

Après nos déclarations d'importation, nous avons notre contrat intelligent NFT personnalisé, qui contient un compteur, un constructeur et une méthode pour créer le NFT. Le gros du travail est effectué par le contrat de base hérité d'OpenZeppelin, qui met en œuvre la plupart des méthodes dont nous avons besoin pour créer un NFT adhérant à la norme ERC-721.

Le compteur garde la trace du nombre total de NFT frappés, qui est utilisé dans la méthode de frappe comme un identifiant unique pour le NFT.

Dans le constructeur, nous passons deux arguments de chaîne de caractères pour le nom du contrat intelligent et le symbole (représenté dans les portefeuilles). Vous pouvez les modifier comme bon vous semble.

Enfin, nous avons notre méthode `mintNFT` qui nous permet de frapper réellement le NFT. La méthode est définie sur `onlyOwner` pour s'assurer qu'elle ne puisse être exécutée que par le propriétaire du contrat intelligent.

`address recipient`spécifie l'adresse qui recevra le NFT au début.

`string memory tokenURI` est une URL qui doit mener à un document JSON décrivant les métadonnées des NFT. Dans notre cas, c'est déjà stocké sur NFT.Storage. Nous pouvons utiliser le lien IPFS renvoyé vers le fichier JSON de métadonnées pendant l'exécution de la méthode.

À l'intérieur de la méthode, nous incrémentons le compteur pour recevoir un nouvel identifiant unique pour notre NFT. Ensuite, nous appelons les méthodes fournies par le contrat de base d'OpenZeppelin pour frapper le NFT au destinataire avec l'identifiant nouvellement créé et en définissant l'URI des métadonnées. La méthode renvoie l'identifiant unique après exécution.

#### Déployer le contrat intelligent sur Polygon {#deploy-the-smart-contract-to-polygon}

Maintenant, il est temps de déployer notre contrat intelligent sur Polygon. Créez un nouveau fichier appelé `deploy-contract.mjs` dans le répertoire `scripts`. Copiez le contenu de la liste ci-dessous dans ce fichier et enregistrez-le.

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

Le déploiement du contrat se fait avec les fonctions d'aide fournies par la bibliothèque hardhat. Tout d'abord, nous récupérons le contrat intelligent que nous avons créé à l'étape précédente avec la fabrique fournie. Ensuite, nous le déployons en appelant la méthode correspondante et attendons que le déploiement soit terminé. Il y a quelques lignes supplémentaires dessous le code décrit pour obtenir l'adresse correcte dans l'environnement testnet. Enregistrez le `mjs`fichier.

Exécutez le script avec la commande suivante :

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

Si tout est correct, vous verrez le résultat suivant :

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

Notez que vous aurez besoin de l'adresse imprimée du contrat lors de l'étape de frappe. Vous pouvez le copier et le coller dans un fichier texte distinct et l'enregistrer pour plus tard. Cela est nécessaire pour que le scénario de frappe puisse appeler la méthode de frappe de ce contrat spécifique.

#### Créer des NFT sur Polygon {#minting-the-nft-on-polygon}

La frappe de NFT consiste maintenant à appeler le contrat que nous venons de déployer sur Polygon. Créez un nouveau fichier appelé `mint-nft.mjs` dans le répertoire `scripts` et copiez ce code à partir du listing ci-dessous :

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

Modifiez les deux premières lignes pour insérer votre **adresse de contrat** du déploiement précédent et l'**URL de métadonnées** qui a été retournée lors du stockage de l'actif avec NFT.Storage. Le reste du scénario établit l'appel à votre contrat intelligent avec vous comme futur propriétaire du NFT et le pointeur vers les métadonnées stockées sur IPFS.

Ensuite, exécutez le scénario :

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

Vous pouvez attendre de voir le résultat suivante :

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

Vous recherchez le code d'exemple de ce tutoriel ? Vous pouvez le trouver dans le référentiel Github du [lien](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) polygon-nft.storage-demo.

## Conclusion {#conclusion}

Dans ce tutoriel, nous avons appris à frapper un NFT de bout en bout avec Polygon et NFT.Storage. Cette combinaison de technologies aboutit à une décentralisation appropriée et garantit l'*évolutivité*, *la durabilité* et l'*immuabilité*.

Nous avons déployé un contrat intelligent personnalisé pour frapper notre NFT en fonction de nos besoins. Pour ce tutoriel, nous avons utilisé un exemple simple basé sur la norme ERC-721. Cependant, vous pouvez également définir une logique complexe qui régit le cycle de vie de votre NFT. Pour les cas d'utilisation plus complexes, la norme [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) qui lui succède est un bon point de départ. OpenZeppelin, la bibliothèque que nous utilisons dans notre tutoriel, offre un [assistant de contrats](https://docs.openzeppelin.com/contracts/4.x/wizard) qui aide à créer des contrats NFT.

La réussite de la frappe peut être considérée comme le début de la phase de valeur du NFT. Le NFT peut alors être utilisé pour prouver la propriété et peut être transféré à d'autres utilisateurs. Les raisons pour transférer un NFT peuvent inclure une vente réussie sur l'un des marchés de NFT comme [OpenSea](https://opensea.io), ou un autre type d'événement comme l'acquisition d'un objet dans un jeu basé sur le NFT. L'exploration des riches possibilités offertes par les NFT est assurément une prochaine étape passionnante.

Si vous souhaitez aider à construire votre projet NFT avec NFT.storage, nous vous encourageons à rejoindre le `#nft-storage`canal sur D[iscord ](https://discord.gg/Z4H6tdECb9)et S[lack.](https://filecoinproject.slack.com/archives/C021JJRH26B)
