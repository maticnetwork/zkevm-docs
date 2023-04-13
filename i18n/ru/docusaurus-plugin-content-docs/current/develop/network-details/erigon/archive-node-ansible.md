---
id: archive-node-ansible
title: Настройка архивного нода с помощью Ansible
sidebar_label: Set up an Archive Node with Ansible
description: Использование Ansible для настройки архивного нода
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Чтобы установить Archive Node, вам необходимо следовать тому же процессу для [<ins>полного развертывания нода с помощью Ansible</ins>](/docs/develop/network-details/full-node-deployment). Однако он требует незначительного изменения конфигурации. В файл должен быть включен следующий `start.sh`параметр:

```makefile
--gcmode 'archive'
```
