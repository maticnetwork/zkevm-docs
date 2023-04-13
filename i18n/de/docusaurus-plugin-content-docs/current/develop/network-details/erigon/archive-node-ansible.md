---
id: archive-node-ansible
title: Einrichtung eines Archivknotens mit Ansible
sidebar_label: Set up an Archive Node with Ansible
description: Ansible zum Einrichten eines an verwenden
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Um den Archive festzulegen, musst du denselben Prozess für eine [<ins>vollständige Knotenbereitstellung mit Ansible</ins>](/docs/develop/network-details/full-node-deployment) befolgen. Es erfordert jedoch eine geringfügige Konfigurationsänderung. Du solltest den folgenden Parameter in die Datei `start.sh`einfügen:

```makefile
--gcmode 'archive'
```
