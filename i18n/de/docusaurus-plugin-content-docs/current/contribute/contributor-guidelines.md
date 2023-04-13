---
id: contributor-guidelines
title: Mein Beitrag
sidebar_label: Contributor guidelines
description: Bereiten Sie sich auf Ihren kommenden Beitrag vor
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
Du kannst [ein Problem in unserem Polygon Wiki Repository](https://github.com/maticnetwork/matic-docs/issues) aufzeigen.
:::

## Einen Bereich festlegen, zu dem Sie einen Beitrag leisten möchten {#identify-an-area-to-contribute-to}

Es gibt verschiedene Wege, ein Gebiet auszuwählen, zu dem Sie einen Beitrag für das Wiki leisten können:

- Am einfachsten ist es, sich an einen der [Wiki-Maintainer](/docs/contribute/community-maintainers) zu wenden und mitzuteilen: „Ich möchte das Polygon-Wiki unterstützen“. Gemeinsam mit Ihnen wird man ein Gebiet finden, zu dem Sie einen Beitrag leisten können.
- Wenn Sie einen bestimmten Beitrag im Auge haben, Sie aber unsicher sind, ob dieser geeignet ist, wenden Sie sich bitte direkt an einen der [Wiki-Maintainer](/docs/contribute/community-maintainers).
- Wenn Sie keinen bestimmten Beitrag im Auge haben, können Sie auch die Themen durchsuchen, die `help wanted`auf den [Polygon GitHub Repos](https://github.com/maticnetwork) gekennzeichnet sind.
- Themen mit einer zusätzlichen `good first issue`Kennzeichnung sind bestens für den Einstieg geeignet.

## Zur Polygon-Dokumentation hinzufügen {#add-to-the-polygon-documentation}

  - Wenn Sie etwas in Polygon Wiki hinzufügen oder ändern möchten, erstellen Sie bitte eine Pressemitteilung für den entsprechenden`master` Bereich (sehen Sie sich bitte die Beispiel-PM an).
  - Das Dokumentationsteam wird sich die PM ansehen und ggfs. Schritte einleiten
  - Repository: https://github.com/maticnetwork/matic-docs
  - Beispiel PM: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
Wenn du unser Wiki lokal auf deinem Rechner ausführen möchtest, schau auf den Abschnitt [auf dem du das Wiki](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) lokal ausführen möchtest. Wenn du ein neues Dokument hinzufügst, wird es empfohlen, nur eine grundlegende Zusammenfassung/Einführung und einen Link zu deiner Github oder deiner Dokumentation zu haben, um weitere Details zu erhalten.
:::

## Git-Regeln {#git-rules}

Für alle Änderungsprotokolle und Repos benutzen wir `gitchangelog`. Dafür müssen wir die folgende Vereinbarung für verbindliche Nachrichten einhalten. Es wird keine Zusammenfassung geben, wenn Sie. diese Vereinbarung nicht einhalten.

### Vereinbarung für verbindliche Nachrichten  {#commit-message-convention}

Im Folgenden finden Sie Vorschläge, was in Ihren Übergabenachrichten nützlich sein könnte. Sie könnten etwa Ihre Commits grob in große Abschnitte unterteilen:

- absichtlich (zum Beispiel: neu, beheben, ändern ...)
- nach Objekt (zum Beispiel: doc, Verpackung, Code ...)
- von Publikum (zum Beispiel: dev, tester, Benutzer ...)

Darüber hinaus könnten Sie einige Commits markieren:

- Als „geringfügige“-Commits, die nicht in Ihr Änderungsprotokoll aufgenommen werden sollen (kosmetische Änderungen, kleine Tippfehler in Kommentaren...).
- Als „Überarbeitung“, wenn Sie wirklich keine wesentlichen Funktionsänderungen aufweisen. Daher sollte dies nicht zum Änderungsprotokoll gehören, das beispielsweise dem Endbenutzer angezeigt wird, sondern könnte von Interesse sein, wenn Sie ein Änderungsprotokoll für Entwickler führen.
- Sie könnten auch mit „Api“ markieren, um API-Änderungen zu markieren oder ob es sich um eine neue API oder ähnliches handelt.

Verfassen Sie Ihre Übergabenachricht so oft wie möglich mit Blick auf die Benutzerfunktionen

:::note Beispiel

Dies ist ein normales Git-Protokoll `--oneline`und zeigt, wie diese Informationen gespeichert werden können:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

Für weitere Informationen lesen Sie bitte [Wie verwaltet man ein Änderungsprotokoll mit Git](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890).

Weitere Details finden Sie unter [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/).
