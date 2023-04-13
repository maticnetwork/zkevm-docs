---
id: archive-node-binaries
title: Configurer un nœud d'archivage avec des binaires
sidebar_label: Set up an Archive Node with Binaries
description: Utiliser des binaires pour configurer un nœud d'archive
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Pour configurer le nœud d'archivage, vous devez suivre le même processus que pour un [<ins>déploiement d'un nœud complet avec des binaires</ins>](/docs/develop/network-details/full-node-binaries). Cependant, il nécessite une modification de configuration mineure. Vous devez inclure le paramètre suivant au fichier `start.sh` :

```makefile
--gcmode 'archive'
```
