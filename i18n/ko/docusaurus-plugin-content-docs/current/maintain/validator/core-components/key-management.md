---
id: key-management
title: 키 관리
description: 서명자 및 소유자 키 관리
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon에서 각 유효성 검사자는 다음의 두 가지 키를 사용하여 유효성 검사자 관련 활동을 관리합니다.

* 서명자 키
* 소유자 키

## 서명자 키 {#signer-key}

서명자 키는 Heimdall 블록, 체크포인트 및 기타 서명 관련 활동에 사용하는 주소입니다.

서명자 주소의 개인 키는 서명을 목적으로 유효성 검사 노드를 실행하는 시스템에 위치해야 합니다.

서명자 키는 스테이킹, 보상 또는 위임을 관리할 수 없습니다.

유효성 검사자는 [체크포인트](/docs/maintain/glossary.md#checkpoint-transaction)를 보내기 위해 이더리움 메인넷의 서명자 주소에 반드시 ETH를 보관하고 있어야 합니다.

## 소유자 키 {#owner-key}

소유자 키는 서명자 키를 스테이크, 리스테이크 또는 변경하고, 보상을 인출하며, 이더리움 메인넷에서 위임 관련 매개변수를 관리하는데 사용하는 주소입니다. 소유자 키를 위한 개인 키는 어떤 방법으로든 반드시 안전하게 보호해야 합니다.

소유자 키를 통한 모든 트랜잭션은 이더리움 메인넷에서 수행됩니다.

서명자 키는 노드에 보관되고 보통 **핫** 지갑으로 간주되는 데 반해, 소유자 키는 매우 안전하게 보관되어야 하며 드물게 사용되므로 보통 **콜드** 지갑으로 간주됩니다. 스테이크된 자금은 소유자 키가 제어합니다.

서명자 키와 소유자 키의 책임을 이렇게 나누는 이유는 보안과 사용 편의성 간에 효율적인 균형을 이루기 위해서입니다.

두 가지 키 모두 이더리움과 호환 가능한 주소이며 정확히 동일한 방식으로 작동합니다.

## 서명자 변경 {#signer-change}

[서명자 주소 변경](/docs/maintain/validate/change-signer-address)을 참조하세요.
