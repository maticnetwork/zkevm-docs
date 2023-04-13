---
id: archive-node-binaries
title: 바이너리로 아카이브 노드 설정하기
sidebar_label: Set up an Archive Node with Binaries
description: 이니어를 사용하여 압축 노드를 설정하기
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

아카이브 노드를 설정하려면 [<ins>바이너리를 사용하여 전체 노드를 배포하는 경우</ins>](/docs/develop/network-details/full-node-binaries)와 동일한 프로세스를 따라야 합니다. 그러나 사소한 구성 변경이 필요합니다. `start.sh` 파일에 다음 파라미터를 포함시켜야 합니다.

```makefile
--gcmode 'archive'
```
