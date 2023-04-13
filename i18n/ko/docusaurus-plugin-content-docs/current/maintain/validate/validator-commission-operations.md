---
id: validator-commission-operations
title: 수수료 운영
description: 유효자 커미션을 설정하고 변경합니다.
keywords:
  - docs
  - matic
  - polygon
  - validator
  - commission operations
slug: validator-commission-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

유효성 검사자는 자신이 받을 [수수료](/docs/maintain/glossary.md#commission)를 설정하고 변경할 수 있습니다.

유효성 검사자가 청구할 수 있는 수수료율에는 제한이 없습니다. 보상의 최소 0%부터 최대 100%까지 가능합니다.

또한 수수료율을 언제든지 횟수에 상관없이 원하는 만큼 자주 변경하실 수 있습니다.

다만 유효성 검사자는 수수료율을 변경한 경우 커뮤니티에 이를 알려야 하는 책임이 있습니다. [유효성 검사자의 책임](/docs/maintain/validator/responsibilities)을 참조하세요.

## 유효성 검사자로서 수수료율 설정하기 {#set-up-your-commission-rate-as-a-validator}

처음 유효성 검사자 스테이킹 프로세스의 일환으로 수수료율을 설정하게 됩니다. [유효성 검사자 스테이킹 운영](validator-staking-operations.md)을 참조하세요.

## 수수료율 변경 {#change-your-commission-rate}

수수료율은 다음과 같이 변경할 수 있습니다.

1. 소유자 주소로 [스테이킹 대시보드](https://staking.polygon.technology/)에 로그인합니다.
1. 프로필에서 **프로필 편집**을 클릭합니다.
1. **수수료** 필드에 수수료율을 새로 입력합니다.

트랜잭션을 확인하고 서명하면 수수료율이 설정됩니다.

수수료가 업데이트되면 80개 체크포인트만큼의 냉각기간이 있습니다.
