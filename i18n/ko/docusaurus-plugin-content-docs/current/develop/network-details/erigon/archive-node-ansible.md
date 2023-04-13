---
id: archive-node-ansible
title: Ansible로 아카이브 노드 설정하기
sidebar_label: Set up an Archive Node with Ansible
description: Anysci를 사용하여 아카이브 노드를 설정하기
keywords:
  - erigon
  - archive
  - node
  - ansible
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Archive Node를 설정하기 위해서는 [<ins>Ancessible 를 사용하여 전체 노드</ins>](/docs/develop/network-details/full-node-deployment) 배포에 대한 동일한 프로세스를 따라야 합니다. 그러나 사소한 구성 변경이 필요합니다. 파일에 다음 파라미터를 포함시켜야 `start.sh`합니다.

```makefile
--gcmode 'archive'
```
