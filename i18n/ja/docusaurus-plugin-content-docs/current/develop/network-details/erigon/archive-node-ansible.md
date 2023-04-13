---
id: archive-node-ansible
title: Ansibleでアーカイブノードをセットアップする
sidebar_label: Set up an Archive Node with Ansible
description: Ansibleを使用してアーカイブノードを設定する
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

アーカイブノードを設定するには、[<ins>Ansibleを使用したフルノード展開</ins>](/docs/develop/network-details/full-node-deployment)のために同じプロセスに従う必要があります。しかし、設定を小さく変更する必要があります。ファイルに次のパラメーターを記入する必要があります`start.sh`：

```makefile
--gcmode 'archive'
```
