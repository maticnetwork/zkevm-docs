---
id: archive-node-binaries
title: Configura un nodo de archivo con binarios
sidebar_label: Set up an Archive Node with Binaries
description: Uso de binarios para configurar un nodo de archivo
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Para configurar el nodo de archivo, tienes que seguir el mismo procedimiento que para [<ins>implementar un nodo completo con binarios</ins>](/docs/develop/network-details/full-node-binaries). Sin embargo, requiere un cambio de configuración menor. Debes incluir el siguiente parámetro en el archivo `start.sh`:

```makefile
--gcmode 'archive'
```
