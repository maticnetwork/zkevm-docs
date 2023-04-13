---
id: archive-node-binaries
title: バイナリでアーカイブノードをセットアップする
sidebar_label: Set up an Archive Node with Binaries
description: バイナリを使用してアーカイブノードを設定する
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

アーカイブノードを設定するには、[<ins>バイナリで、フルノードデプロイ</ins>](/docs/develop/network-details/full-node-binaries)の場合と同じプロセスに従う必要があります。しかし、設定を小さく変更する必要があります。`start.sh`ファイルに、以下のパラメータを含める必要があります。

```makefile
--gcmode 'archive'
```
