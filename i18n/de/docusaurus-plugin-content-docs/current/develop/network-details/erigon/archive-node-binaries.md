---
id: archive-node-binaries
title: Einrichtung eines Archivknoten mit Binärdateien
sidebar_label: Set up an Archive Node with Binaries
description: Mit Binärdateien zum Einrichten eines archive
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Um den Archivknoten einzurichten, musst du den Ablauf einer [<ins>Bereitstellung eines vollständigen Knotens mit Binärdateien</ins>](/docs/develop/network-details/full-node-binaries) befolgen. Es erfordert jedoch eine geringfügige Konfigurationsänderung. Die `start.sh`-Datei sollte den folgenden Parameter enthalten:

```makefile
--gcmode 'archive'
```
