---
id: archive-node-ansible
title: Configura un nodo de archivo con Ansible
sidebar_label: Set up an Archive Node with Ansible
description: Usando Ansible para configurar un nodo de archivo
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Para establecer el nodo de archivo, debes seguir el mismo proceso para un [<ins>despliegue completo de nodos utilizando Ansible</ins>](/docs/develop/network-details/full-node-deployment). Sin embargo, requiere un cambio de configuración menor. Deberías incluir el siguiente parámetro en el `start.sh`archivo:

```makefile
--gcmode 'archive'
```
