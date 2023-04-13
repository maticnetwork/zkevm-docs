---
id: archive-node-binaries
title: Set up an Archive Node with Binaries
sidebar_label: Set up an Archive Node with Binaries
description: Using binaries to set up an archive node
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-logo.png
---

To set the Archive Node, you need to follow the same process for a [<ins>deploying a full node with binaries</ins>](/docs/operate/full-node-binaries). However, it requires a minor configuration change. You should include the following parameter at the `start.sh` file:

```makefile
--gcmode 'archive'
```