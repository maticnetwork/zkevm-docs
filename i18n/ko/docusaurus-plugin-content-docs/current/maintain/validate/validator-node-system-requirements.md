---
id: validator-node-system-requirements
title: 시스템 요구 사항
description: 유효성 검사 노드를 실행하는 시스템 요구 사항
keywords:
  - docs
  - matic
  - polygon
  - prerequisites
  - requirements
slug: validator-node-system-requirements
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

이 섹션에 나열된 시스템 요구 사항은 [센트리](/docs/maintain/glossary.md#sentry) 노드와 [유효성 검사](/docs/maintain/glossary.md#validator) 노드 모두에 대한 것입니다.

**최소** 시스템 요구 사항은 노드를 실행할 수는 있지만, 미래의 설정까지 보장하지는 않습니다.

**권장** 시스템 요구 사항은 노드가 미래에도 실행될 수 있는 수준입니다. 그러나 향후  언제까지 노드 실행을 보장할 수는 없습니다.

항상 별도의 시스템에서 센트리 노드와 유효성 검사 노드를 실행해야 합니다.

## 최소 시스템 요구 사항 {#minimum-system-requirements}

* RAM: 32GB
* CPU: 8코어
* Storage: 2.5 TB SSD

:::info

AWS(Amazon Web Services)의 경우 최소 요구 사항 인스턴스와 동등한 것은 무제한 크레딧이 선택된 **m5d.2xlarge** 또는 **t3.2xlarge**입니다.

저장을 위해 2.5TB SSD 저장이 확장될 수 있는지 확인하십시오.

:::

## 권장 시스템 요구 사항 {#recommended-system-requirements}

* RAM: 64GB
* CPU: 16코어
* Storage: 5 TB SSD
* 광대역: 1Gbit/s

:::info

AWS(Amazon Web Services)의 경우 권장 요구 사항 인스턴스와 동등한 것은 **m5d.4xlarge**입니다.

OVH의 경우 권장 요구 사항 인스턴스와 동등한 것은 **infra-3**입니다.

네트워크의 경우 한 달에 3-5TB의 데이터가 전송될 것으로 예상됩니다.

:::
