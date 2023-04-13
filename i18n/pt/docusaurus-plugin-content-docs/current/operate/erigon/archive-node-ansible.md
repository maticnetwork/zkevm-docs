---
id: archive-node-ansible
title: Set up an Archive Node with Ansible
sidebar_label: Set up an Archive Node with Ansible
description: Using Ansible to set up an archive node
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-logo.png
---

To set the Archive Node, you need to follow the same process for a [<ins>full node deployment using Ansible</ins>](/docs/operate/full-node-deployment). However, it requires a minor configuration change. You should include the following parameter in the `start.sh` file:

```makefile
--gcmode 'archive'
```