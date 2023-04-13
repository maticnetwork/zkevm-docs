---
id: archive-node-binaries
title: Configurare un nodo Archive con i binari
sidebar_label: Set up an Archive Node with Binaries
description: Usare i binari per impostare un nodo di archivio
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Per impostare il nodo Archive, è necessario seguire la stessa procedura necessaria per distribuire [<ins>un nodo completo con i binari</ins>](/docs/develop/network-details/full-node-binaries). Tuttavia, richiede una piccola modifica di configurazione. È necessario includere il seguente parametro nel file `start.sh`:

```makefile
--gcmode 'archive'
```
