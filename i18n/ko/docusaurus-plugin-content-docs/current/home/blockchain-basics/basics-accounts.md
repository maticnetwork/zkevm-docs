---
id: accounts
title: 계정은 무엇인가요?
sidebar_label: Accounts
description: "EOA 및 계약 계정."
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 계정은 무엇인가요? {#what-are-accounts}

이더리움의 글로벌 상태는 메시지 통과 프레임워크를 통해 서로 상호작용하는 계정으로 구성됩니다. 가장 기본적인 상호 작용은 MATIC 토큰, Polygon의 네이티브 토큰 또는 $ ETH, 이더리움 블록체인의 네이티브 토큰과 같은 일부 값을 보내는 것입니다.

각 계정은 계정의 공개 키에서 생성되는 주소라고 불리는 20바이트 헤스 식별자에 의해 식별됩니다.

**외부적인 소유 계정** 및 **계약 소유** 계정이라는 두 가지 유형의 계정이 있습니다.

## 외부 소유 계정 {#externally-owned-accounts}

EOA는 개인 키에 의해 제어되는 계정이며, 토큰과 메시지를 보낼 수 있습니다.

1. 그들은 트랜잭션을 보낼 수 있습니다(에테르 이적 또는 트리거 계약 코드),
2. 개인 키에 의해 제어되며,
3. 그리고 관련 코드가 없습니다.

## 계약 소유 계정 {#contract-owned-accounts}
계약 소유 계정은 관련 스마트 계약 코드를 가지고 있으며 개인 키는 누구에게도 소유하지 않습니다.

1. 관련 코드를 가지고 있습니다.
2. 코드 실행이 다른 계약에서 받은 트랜잭션 또는 메시지 (호출)에 의해 촉발됩니다.
3. 이 코드가 실행되면 자체 지속적인 저장을 조작하고 다른 계약을 호출 할 수 있습니다.

### 리소스 {#resources}

- [계정에 대해 자세히 알아보기](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
