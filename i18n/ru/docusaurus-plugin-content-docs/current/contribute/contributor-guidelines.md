---
id: contributor-guidelines
title: Как внести вклад
sidebar_label: Contributor guidelines
description: Подготовьтесь к внесению вклада
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
Не стесняйтесь [поднять вопрос в нашем хранилище Polygon Wiki](https://github.com/maticnetwork/matic-docs/issues)
:::

## Определите область, в которой вы хотите внести вклад {#identify-an-area-to-contribute-to}

Есть несколько способов определить область, в которой вы можете внести вклад в вики:

- Самый просто — связаться с одним из [сопровождающих вики](/docs/contribute/community-maintainers) 
и сказать, что вы хотите стать соавтором вики Polygon. Они будут работать с вами и помогут найти область, в которой вы можете внести вклад.
- Если вы имеете в виду конкретный вклад, но не уверены в этом, проверьте возможность внесения такого вклада, связавшись с одним из [сопровождающих вики](/docs/contribute/community-maintainers) напрямую.
- Если вы не выбрали конкретный вклад, вы можете посмотреть вопросы
с меткой `help wanted`в [репозиториях Polygon GitHub](https://github.com/maticnetwork).
- Вопросы с дополнительной меткой `good first issue`считаются идеально подходящими для
первого вклада.

## Дополнение документации Polygon {#add-to-the-polygon-documentation}

  - Если вам нужно дополнить вики Polygon или что-то изменить, отправьте запрос PR
  в `master`(ознакомьтесь с образцом запроса PR).
  - Команда по работе с документацией рассмотрит запрос PR или свяжется с вами.
  - Репозиторий: https://github.com/maticnetwork/matic-docs
  - Образец запроса PR: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
Если вы хотите запустить наш Wiki локально на вашем компьютере, проверьте раздел, [который будет работать на Wiki локально.](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) Если вы добавите новый документ, рекомендуется просто иметь базовый резюме/введение и ссылку на ваш Github или документацию для получения более подробной информации.
:::

## Правила Git {#git-rules}

Мы используем `gitchangelog`для изменения журналов для всех наших репозиториев. Для этого нам требуется соблюдать следующие правила в отношении сообщения commit. Слияния не будет, если вы не будете следовать этим условиям.

### Условия сообщения commit {#commit-message-convention}

Ниже приведены предложения того, что можно добавить в
сообщения commit. Возможно, вы захотите разделить изменения commit на большие разделы:

- по намерениям (например: новое, исправление, изменение...)
- по объекту (например: документация, упаковка, код...)
- по аудитории (например: разработчики, тестировщики, пользователи ...)

Также вы можете помечать некоторые изменения commit тегами:

- незначительные изменения commit не выводятся в журнал изменений (косметические исправления,
опечатки в комментариях...).
- При рефакторинге вы не производите существенных изменений функций. Поэтому эти изменения также не должны отображаться в журнале изменений, отображаемом для конечного пользователя, но могут представлять интерес в составе журнала для разработчиков, если он есть.
- Также вы можете поставить пометку «api», чтобы отметить изменения API, новый API и т. п.

Попробуйте записывать сообщения commit, как можно больше опираясь на функции для пользователя.

:::note Пример

Этот стандартный журнал git `--oneline`показывает, как можно хранить эту информацию:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

Дополнительная информация:
[Способы управления журналом изменений с помощью Git](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890)

Подробнее: [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/).
