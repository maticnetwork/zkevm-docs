---
id: archive-node-binaries
title: Настройка архивного нода с двоичными файлами
sidebar_label: Set up an Archive Node with Binaries
description: Использование двоичных файлов для настройки архивного нода
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Для настройки архивного нода применяется тот же процесс, что и для [<ins>развертывания полного нода с двоичными файлами</ins>](/docs/develop/network-details/full-node-binaries). Однако он требует незначительного изменения конфигурации. В файл `start.sh` нужно включить следующий параметр:

```makefile
--gcmode 'archive'
```
