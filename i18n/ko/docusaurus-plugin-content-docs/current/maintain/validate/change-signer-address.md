---
id: change-signer-address
title: 서명자 주소 변경
description: 유효한 사람의 서명자 주소를 변경하기
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

[서명자 주소가](/docs/maintain/glossary.md#signer-address) 무엇인지에 대한 자세한 내용은 키 관리를 참조하세요.
[키 관리](/docs/maintain/validator/core-components/key-management).

## 사전 요구 사항 {#prerequisites}

새 유효성 검사 노드가 완전히 동기화되고 새 서명자 주소로 실행 중인지 확인합니다.

## 서명자 주소 변경 {#change-the-signer-address}

이 가이드에서는 기존 유효성 검사 노드를 노드 1로, 새 유효성 검사 노드를 노드 2로 설명합니다.

1. 노드 1 주소로 [스테이킹 대시보드](https://staking.polygon.technology/)에 로그인합니다.
2. 프로필에서 **프로필 편집**을 클릭합니다.
3. **서명자 주소** 입력란에 노드 2 주소를 입력합니다.
4. **서명자 공개 키** 입력란에 노드 2 공개 키를 입력합니다.

   공개 키를 가져오려면 유효성 검사 노드에서 다음 명령을 실행하십시오:

   ```sh
   heimdalld show-account
   ```

**저장**을 클릭하면 노드에 대한 새로운 세부 정보가 저장됩니다. 이는 본질적으로 노드 1이 스테이크를 제어하고, 보상이 전송되는 등의 주소가 된다는 것을 의미합니다. 노드 2는 이제 블록 서명, 체크포인트 서명 등의 작업을 수행합니다.
