---
id: contributor-guidelines
title: 기여 방법
sidebar_label: Contributor guidelines
description: 다음 기여 준비
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip
[Polygon 저장소에서 문제를](https://github.com/maticnetwork/matic-docs/issues) 제기할 수 있는 무료 느낌
:::

## 기여할 분야 확인 {#identify-an-area-to-contribute-to}

위키에 기여할 수 있는 분야를 확인하는 몇 가지 방법이 있습니다.

- 가장 쉬운 방법은 [위키 관리자](/docs/contribute/community-maintainers) 중 한 명에게 연락해 Polygon 위키 기여 의사를 밝히는 것입니다. 관리자들은 여러분이 기여할 분야를 찾도록 도와드릴 것입니다.
- 기여하고 싶은 특정 내용이 있지만 확신이 들지 않는다면, [위키 관리자](/docs/contribute/community-maintainers) 중 한 명에게 직접 연락해 해당 기여가 적절할지 확인하세요.
- 특정한 기여 내용이 생각나지 않으면, [Polygon GitHub 리포지토리](https://github.com/maticnetwork)에서 `help wanted`로 표시된 항목들을 살펴보세요.
- `good first issue` 레이블이 추가된 문제는 초보자에게 적합합니다.

## Polygon 문서에 추가 {#add-to-the-polygon-documentation}

  - Polygon 위키에 추가하거나 변경해야 할 사항이 있으면, `master` 브랜치에 대한 PR을 제출해 주세요(PR 샘플 참조).
  - 문서 팀이 PR을 검토하거나 적절한 조차를 취할 것입니다.
  - 리포지토리: https://github.com/maticnetwork/matic-docs
  - PR 샘플: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
기계에서 Wiki를 현지에서 운영하고 싶다면 [해당](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) 섹션을 현지에서 확인할 수 있습니다. 새로운 문서를 추가하는 경우 자세한 내용은 기본 요약/소개 및 Github 또는 문서에 대한 링크를 갖는 것이 좋습니다.
:::

## Git 규칙 {#git-rules}

Polygon은 모든 리포지토리의 로그를 변경하는데 `gitchangelog`를 이용합니다. 이를 위해 다음의 커밋 메시지 규칙을 준수해야 합니다. 본 규칙을 따르지 않을 경우 머지(merge)할 수 없습니다.

### 커밋 메시지 규칙 {#commit-message-convention}

다음은 커밋 메시지에 추가하고자 할 때 고려할 수 있는 유용한 제안들입니다. 커밋을 대략적으로 다음과 같이 큰 섹션으로 나눌 수 있습니다.

- 의도별(예: 신규, 해결, 교환...)
- 객체별(예: 문서, 패키지, 코드...)
- 대상별(예: 개발자, 테스터, 사용자..)

또한 다음의 경우 일부 커밋에 태그를 지정할 수 있습니다.

- 변경 로그에 나타나지 않는 '사소한' 커밋 (외관 변경, 댓글의 작은 오타 등).
- 중요한 기능 변경이 없는 '리팩터링'. 따라서 이는 최종 사용자에게 보여지는 변경 로그의 일부도 아니어야 하지만, 개발자 변경 로그가 있다면 관심이 있을 수 있습니다.
- 'API' 변경 사항을 표시하거나 새 API 또는 이와 유사한 경우, 'api'로 태그를 지정할 수도 있습니다.

가능한 한 자주 사용자 기능을 대상으로 커밋 메시지를 작성하세요.

:::note 예시

이것은 표준 git 로그 `--oneline`로, 이러한 정보를 저장하는 방법을 보여줍니다.

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

자세한 내용은 다음을 참조하세요 [Git으로 변경 로그를 관리하는 좋은 방법은 무엇인가요?](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890)

자세한 내용은 [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/)을 참조하세요.
