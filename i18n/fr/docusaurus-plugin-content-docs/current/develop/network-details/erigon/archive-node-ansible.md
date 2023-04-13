---
id: archive-node-ansible
title: Configurer un nœud d'Archive avec Ansible
sidebar_label: Set up an Archive Node with Ansible
description: Utiliser Ansible pour configurer un nœud d'archive
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Pour définir le nœud d'archives, vous devez suivre le même processus pour un [<ins>déploiement complet de nœud en utilisant Ansible</ins>](/docs/develop/network-details/full-node-deployment). Cependant, il nécessite une modification de configuration mineure. Vous devez inclure le paramètre suivant dans le fichier `start.sh`:

```makefile
--gcmode 'archive'
```
