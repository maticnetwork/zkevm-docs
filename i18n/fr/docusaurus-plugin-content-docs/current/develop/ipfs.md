---
id: ipfs
title: IPFS
description: "IPFS - système distribué pour le stockage et l'accès aux données."
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### Contexte {#context}

La blockchain de Polygon réduit les coûts de transaction pour le stockage des données par rapport au réseau principal Ethereum; toutefois, même ces coûts réduits s'accumulent rapidement lors du stockage de fichiers volumineux. Les développeurs doivent également tenir compte des contraintes liées à la taille des blocs et aux limitations de vitesse des transactions lors du stockage des données sur la chaîne. Une solution qui répond à toutes ces préoccupations est IPFS, le système de fichiers interplanétaires.

#### Qu'est-ce que l'IPFS? {#what-is-ipfs}

IPFS est un système distribué pour le stockage et l'accès aux fichiers, sites web, applications et données. IPFS utilise la décentralisation, l'adressage de contenu et un réseau peer-to-peer robuste de participants actifs pour permettre aux utilisateurs de stocker, demander et transférer des données vérifiables entre chacun d'eux.

La décentralisation permet de télécharger un fichier à partir de nombreux endroits qui ne sont pas gérés par une seule organisation, ce qui offre une résilience et une résistance à la censure dès le départ.

L'adressage du contenu utilise la cryptographie pour créer un identifiant vérifiable et unique basé sur le contenu d'un fichier plutôt que sur son emplacement. L'identifiant de contenu (CID) qui en résulte donne l'assurance qu'un élément de données est identique quel que soit l'endroit où il est stocké.

Enfin, une communauté active d'utilisateurs en constante augmentation rend possible ce partage de contenu entre pairs. Les développeurs téléchargent et épinglent du contenu sur IPFS, tandis que les fournisseurs de stockage Filecoin ou Crust aident à assurer un stockage persistant de ce contenu.


Le stockage basé sur IPFS vous permet de stocker simplement le CID de votre contenu plutôt que de charger des fichiers entiers sur la blockchain de Polygon, ce qui permet de réduire les coûts, d'augmenter la taille des fichiers et de garantir un stockage permanent. Pour plus de détails, consultez [les Docs IPFS](https://docs.ipfs.io/).

### Exemple de Projets {#example-projects}

1. Tutorial dans les scaffold-eth qui montre comment faire pour tailler un NFT sur Polygon avec IPFS - [lien](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. Créer une application web3 complète avec Next.js, Polygon, Solidity, The Graph, IPFS et Hardhat - [lien](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)
