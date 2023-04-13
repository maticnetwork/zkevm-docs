---
id: archive-node-ansible
title: Configurare un nodo Archive con Ansible
sidebar_label: Set up an Archive Node with Ansible
description: Utilizzo di Ansible per impostare un nodo di archivio
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Per impostare il nodo di Archivio, è necessario seguire lo stesso processo per una [<ins>distribuzione completa dei nodo utilizzando Ansible</ins>](/docs/develop/network-details/full-node-deployment). Tuttavia, richiede una piccola modifica di configurazione. Dovresti includere il seguente parametro nel `start.sh`file:

```makefile
--gcmode 'archive'
```
