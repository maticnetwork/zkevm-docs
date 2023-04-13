---
id: client-setup
title: Configurez un client de nœud d'archive
sidebar_label: Set up an Archive Node Client
description: "Configuration requise du système et configuration du client."
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Exigences du système {#system-requirements}

### Nœuds d'archives {#archive-node}

- CPU 16 cœurs
- RAM 64 Go
- Fondamentalement io1 ou supérieur avec au moins 20 k+ iops et la structure de disque basée sur raid-0

### Client Erigon {#erigon-client}

- Pour un nœud d'archive de Polygon Mainnet: 5 To
- Pour un nœud d'archive de Polygon Mumbai: 1 To
- SSD ou NVMe. Gardez à l'esprit que les performances SSD se détériorent lorsqu'elles sont proches de la capacité
- RAM : >= 16 Go, architecture 64-bit
- Version Golang >= 1,18, GCC 10+

:::note HDD non recommandé

Sur les HDD, Erigon restera toujours N blocs derrière la pointe de la chaîne, mais ne restera pas en arrière.

:::

## Configuration du client Erigon {#erigon-client-setup}

### Comment l'installer {#how-to-install}

Exécutez les commandes suivantes pour installer Erigon :

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

Cela devrait créer le binaire sur `./build/bin/erigon`

Utilisez la balise `v0.0.5` sur notre répertoire dupliqué pour avoir une version stable.

### Comment démarrer {#how-to-start}

Pour démarrer Erigon, exécutez :

```bash
erigon --chain=mumbai
```

- Utiliser `chain=mumbai` pour le testnet Mumbai
- Utilisation `chain=bor-mainnet`pour Polygon Mainnet

### Comment configurer Erigon {#how-to-configure-erigon}

- Si vous voulez stocker les fichiers Erigon dans un emplacement autre que celui par défaut, utilisez `-datadir`

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- Si vous n'utilisez pas **heimdall** local, utilisez `-bor.heimdall=<your heimdall url>`. Par défaut, il essaiera de se connecter à `localhost:1317`.

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - Si vous voulez vous connecter à Polygon Mumbai Testnet utilisez : [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology)

    - Pour Polygon Mainnet: [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology)

### Conseils pour une synchronisation plus rapide {#tips-for-faster-sync}

- Utilisez la machine avec un nombre élevé d'IOPS et de RAM pour une synchronisation initiale plus rapide
- Utilisez les commandes ci-dessous pour augmenter la vitesse de téléchargement/téléversement des instantanés :

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

Remplacez `512` par une bande passante que votre machine peut gérer.
