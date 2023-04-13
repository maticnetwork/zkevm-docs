---
id: writing-style
title: Allgemeine Schreibrichtlinien
sidebar_label: General writing guidelines
description: Befolgen Sie beim Schreiben die folgenden Richtlinien.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - writing
  - contribute
  - style
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: writing-style
---

Diese Richtlinie befasst sich mit den Best Practices für das Verfassen technischer Dokumentationen und mit den Stilregeln, die bei der Entwicklung der Dokumentation für das Polygon-Wiki zu verwenden sind. Das Ziel dieses Leitfadens ist es, Mitwirkenden dabei zu helfen, Inhalte zu schreiben, die klar, prägnant und und einheitlich sind Das Polygon-Team behandelt das Polygon-Wiki als offizielles Docs-Produkt.

## Primäre Richtlinien {#primary-guidelines}

Wir sind überzeugt, dass die Besonderheit von Polygon in seinem kohärenten Design liegt, und wir möchten dieses charakteristische Merkmal auch in Zukunft beibehalten. Das Polygon-Team betreut das Polygon-Wiki als offizielles Docs-Produkt. Von Beginn an haben wir einige Richtlinien festgelegt, die sicherstellen, dass neue Beiträge immer nur das Gesamtprojekt verbessern:

- **Qualität** 1: Der Code im Polygon-Projekt sollte den Stilrichtlinien entsprechen, über genügend Testfälle verfügen, beschreibende Commit-Meldungen haben, Nachweise liefern, dass der Beitrag nicht gegen Kompatibilitätsvorgaben verstößt oder nachteilige Funktionsinteraktionen verursacht, und auch belegen kann, dass eine qualitativ hochwertige Peer-Review durchgeführt wurde.
- **Größe**1: Das Polygon-Projekt zeichnet sich durch eine Kultur der kleinen, regelmäßig eingereichten Pull-Anfragen aus. Je größer eine Pull-Anfrage, desto wahrscheinlicher, dass Sie um eine Reihe von in sich abgeschlossenen und einzeln überprüfbaren kleineren PRs angefragt werden.
- **Wartbarkeit**1: Wenn die Funktion eine laufende Wartung erfordert (z. B. Support für eine bestimmte Datenbankmarke), kann es sein, dass wir Sie ersuchen, diese Aufgabe, Aufrechterhaltung dieser Funktion, zu übernehmen.

Der Styleguide orientiert sich an den folgenden Styleguides:

> Wenn Sie in diesem Handbuch keine Antwort auf eine Frage zu Stil, Sprache oder Terminologie finden können ziehen Sie bitte diese Ressourcen zurate.

- [1···Googles Styleguide 1](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md)
- [1···Das Oxford Style Handbuch](https://global.oup.com/academic/product/new-oxford-style-manual-9780198767251?cc=nl&lang=en&)
- [1···Das Microsoft-Handbuch des Stils 1](https://docs.microsoft.com/en-us/style-guide/welcome/)

### Generator für statische Webseiten {#static-site-generator}

Das Wiki wird mit [Docusaurus](https://docusaurus.io/)1 erstellt, einem Generator für statische Sites zum Aufbau von Dokumentationsseiten in Markdown. Das Wiki orientiert sich für seine Markdown-Dateien an den folgenden Metadatenvorlagen und sollte für jedes neue Dokument angepasst werden:

```
---
id: wiki-maintainers
title: Wiki Maintainers
sidebar_label: Maintainers
description: A list of Polygon Wiki maintainers
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - docs
  - maintainers
  - contributors
image: https://matic.network/banners/matic-network-16x9.png
slug: community-maintainers
---
```

Beim Schreiben der Metadaten für eine Markdown-Datei sind einige wichtige Aspekte zu beachten:
- Wir bitten Mitwirkende, eine 1···**eindeutige ID****** 1 zu verwenden; und nur mit allgemeinen Begriffen oder Sätzen wie „Einführung“ oder „Überblick“ zu arbeiten.
- Der **1**···Titel1 ist der Satz, der am Anfang des Artikels verwendet wird, die „Allgemeine Schreibrichtlinien„ für diesen Artikel. Es ist also nicht notwendig, einen H1/H2-Header hinzuzufügen, um jeden Artikel einzuleiten. Verwenden Sie stattdessen diesen·**Titel**1 aus den Metadaten.
- Die **Beschreibung** darf nicht zu lang sein, da sie auf den Indexkacheln verwendet wird, die eine Begrenzung der Zeichenanzahl haben. Beispielsweise erscheint die Beschreibung „Blockchain ist ein unveränderliches Hauptbuch zur Aufzeichnung von Transaktionen“ für die 1···*basics-blockchain.md*1 auf einer Indexkachel als solche: ![img](/img/contribute/index-tile.png)

Die **Beschreibung**··**bis zu 60 Zeichen** haben, wobei Leerzeichen zwischen den Zeichen zu berücksichtigen sind.
- Keywords sind wichtig, um SEO zu optimieren und für die Artikelbeschreibung. Versuchen Sie es mit mindestens fünf Keywords.

:::note

Siehe dazu [Offizielle Metadaten-Dokumentation](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) für weitere Details.

:::

### Teilen Sie die Erfahrung mit dem Leser {#share-the-experience-with-the-reader}

- Erste Person: Verwenden Sie nicht „Ich“ oder „Mich“. Setzen Sie die Ich-Perspektive sparsam und bewusst ein. Wenn die Ich-Erzählung zu oft verwendet wird, kann sie das Gefühl einer gemeinsamen Erfahrung überlagern und die Leserreise vernebeln.
- Zweite Person: Sprechen Sie den Leser in den meisten Fällen direkt an. Verwenden Sie für Tutorials entweder die erste Person Mehrzahl – wir, uns, unser, unser – oder berichten aus der Sicht der zweiten Person. Da Tutorials das Thema eher unter Anleitung behandeln, ist die Verwendung der ersten Person Mehrzahl eine natürlichere und allgemein anerkannte Praxis als bei anderen Dokumentationsformen.
- Dritte Person: Verwenden Sie nicht „wir“, um sich auf Polygon oder Polygon-Technologie zu beziehen.
- Aktive Sprache: Verwenden Sie, wann immer möglich die Gegenwartsform. Es gibt Situationen, in denen die Passivform ausreicht; kehren Sie zum Passiv zurück, wenn der Agent im Mittelpunkt stehen muss.
- Denken Sie an die menschliche Präsenz: ein dynamischer Tonfall bei der Beschreibung technischer Konzepte hilft einem Leser in der Praxis, mit den Unterlagen eine Verbindung herzustellen, anstatt Software (oder Code) als Funktionalität zu beschreiben.
- Pronomen: Verwenden Sie nach Möglichkeit geschlechtsneutrale Pronomen wie „sie“. Im Allgemeinen können Sie jedes Substantiv vom Singular in den Plural umwandeln, um eine Subjekt-Verb-Pronomen-Übereinstimmung zu erreichen und die Verwendung von geschlechtsspezifischen Pronomen wie "er", "ihm", "sein" oder "sie", "ihr", "ihr" vermeiden.
  - Seien Sie vorsichtig bei unpersönlichen und möglicherweise mehrdeutigen Pronomen. Wenn Sie eines der folgenden unpersönlichen Pronomen verwenden achten Sie darauf, dass Sie mit "von was?", "von welchem?" oder "als was?" antworten. In dem Satz.
    - Alle, andere, jede/r
    - jeweils, entweder
    - Wenige, viele, weder, keine,
    - Ein, anderer
    - gleich, mehrere, einige, so
    - Das, sie, diese, jene

### Schnell und prägnant sein {#being-swift-and-concise}

- Dokumentation ist dann eindrücklich und aussagekräftig, wenn die notwendigen Begriffe und di richtigen Ausdrücke verwendet werden.
  - Verwenden Sie nach Möglichkeit gebräuchliche, bekannte Wörter.
  - Vermeiden Sie blumige Sprache und übertriebene literarische Phrasen.
  - Vermeiden Sie Jargon, Umgangssprache und Redewendungen.
  - Vermeiden Sie Adverbien und subjektive Aussagen. Verwenden Sie beispielsweise keine Wörter und Sätze, die einfach, schnell, unkompliziert, rasant enthalten. Zur Not ist es auch besser tief zu stapeln als zu übertreiben.
  - Verwenden Sie keine Ausdrücke, die Mehrdeutigkeiten hervorrufen. Beispiel: Anstelle von „Wenn diese Veröffentlichung live ist …“ Verwenden Sie „Nachdem diese Version live ist ...“
  - Achten Sie besonders auf die Wortwahl. Verwenden Sie stattdessen „seit“ (was einen Zeitraum impliziert). statt „weil“ (impliziert Ursache und Ergebnis) oder „einmal“ (einmaliges Vorkommen) anstelle von „nach“ verwenden (jedes Mal).
  - Vermeiden Sie Ausrufezeichen.
- Vermeiden Sie das Hinzufügen unnötiger Wörter oder Phrasen. Einige Beispiele:
  - Anstatt „und dann“ zu sagen, verwenden Sie einfach „dann“.
  - Anstatt „um zu“ zu sagen, verwenden Sie einfach „um“.
  - Anstatt „sowie“ zu sagen, verwenden Sie einfach „und“.
  - Anstatt „via“ zu sagen, verwenden Sie einen angemessenen englischen Ersatz wie „mithilfe“, „durch“ oder „mittels.
- Verwenden Sie einen Gesprächston, der nicht zu förmlich ist, aber dennoch professionell sein sollte.
- Klarheit: das Wort oder den Satz möglichst lebendig gestalten. Zum Beispiel:
  - Anstatt „z. B.“ zu sagen, verwenden Sie „zum Beispiel“.
  - Anstatt "d.h." zu sagen, sollten Sie "das heißt" verwenden oder den Satz so umformulieren, dass die Bedeutung klar wird, ohne dass eine zusätzliche Angabe erforderlich ist.
  - Anstatt „usw.“ zu sagen, verwenden Sie „und so weiter“ oder überarbeiten Sie den Inhalt, damit der Begriff überflüssig wird. Anstelle von "usw." sollten Sie sich auf ein oder zwei Beispiele konzentrieren und " wie zum Beispiel" oder "wie" verwenden.
  - Verwenden Sie anstelle von " Achtung" ein geeignetes englisches Wort wie " Hinweis", "Vorsicht" oder "Warnung".
  - Verkürzungen verleihen der Dokumentation einen natürlicheren Gesprächston – zumindest für Englischsprachige. Seien Sie sich bewusst, wann und warum Sie mit Verkürzungen arbeiten.

## Aufbau {#structure}

Dokumente sollten in Abschnitten organisiert werden. Jeder Abschnitt sollte ein Motiv oder einen Themenbereich abbilden. Innerhalb jedes Abschnitts gibt es einen oder mehrere Absätze. Jeder Absatz sollte nur einen Gedanken vermitteln. Wiederholen Sie nicht denselben Gedanken In verschiedenen Abschnitten, und unterteilen Sie die Absätze, die mehrere Diskussionspunkten haben. Der Leser sollte vom ersten Satz an verstehen, worum es in einem Absatz geht.

## Produktdokumentation {#product-documentation}

Wenn Sie über ein bestimmtes Produkt schreiben, stellen Sie sicher, dass das Dokument dem Produkt ähnelt. Bisher wurde die Polygon-Dokumentation basierend auf Polygon PoS allgemein gehalten. Jetzt, da es mehrere Polygon-basierte Produkte gibt, müssen Mitwirkende im Umgang mit Ergänzungen auf der Hut sein.

Zum Beispiel ist „Bereitstellen eines Smart Contracts auf Polygon mit ####“ mehrdeutig. Wenn sich dieses Tutorial auf Polygon PoS bezieht, sollte es klar sein, wie in „Bereitstellen eines Smart Contracts auf Polygon PoS mit ####„. Hier das gleiche Beispiel mit einem Polygon Rollup, wie Polygon Hermez, „Bereitstellen eines Smart Contracts auf Polygon Hermez mit ####“.

Stellen Sie sicher, dass die Produktdokumentation hinzugefügt wird, unabhängig davon, ob es sich um eine allgemeine Anleitung oder ein Tutorial handelt Zum richtigen Produktdokumentations-Hub. Für die meisten Dokumente sollte ihre Referenz unter einem der allgemeinen Hubs (z. B. „Entwickeln“ oder „Validieren“) vorhanden sein, aber das eigentliche Dokument wird unter seiner Produktdokumentation ausgegeben. Sie müssen auf das Dokument im Hub verweisen, indem Sie es zu·`sidebars.js` hinzufügen. Das eigentliche Dokument selbst wird jedoch in seinem jeweiligen Produktdokumentations-Hub vorhanden sein, und es wird den Benutzer umleiten, sobald er darauf klickt. Die gleiche Richtlinie gilt für die meisten. Unterlagen. Ihre Referenz sollte unter einem der allgemeinen Hubs existieren, aber das eigentliche Dokument wird unter seiner Produktdokumentation ausgegeben.

Der Großteil der API-basierten Dokumentation im Polygon-Wiki sind Referenzdokumentationen, mit Ausnahme der in Tutorials erwähnten APIs. Beispielsweise bietet die API-Dokumentation zu Matic.js Informationen über die Struktur, Parameter und Rückgabewerte für jede Funktion oder Methode in der API.

## API-Dokumentation {#api-documentation}

Berücksichtigen Sie beim Dokumentieren einer API Folgendes:

* Eine solide Einführung, die einen Ausgangspunkt bietet.
* Eine klare Beschreibung des Aufrufes oder der Anfrage. Beschreiben Sie, was der Endpunkt tut.
* Eine vollständige Parameterliste:
  * Parametertypen
  * Syntaxausdrücke mit Platzhaltern, die verfügbare Parameter anzeigen
  * Spezielle Formatierung
* Codebeispiele für mehrere Sprachen.
* Ein Beispielaufruf mit der erwarteten Ausgabe.
* Fehlercodes. Edge-Fälle.
* Anweisungen zum Erwerb von API-Schlüsseln, falls erforderlich.
* Die Beachtung gemeinsamer FAQs oder Szenarien ist immer nützlich.
* Links zu zusätzlichen Ressourcen wie Social Media-Beiträge, Blogs oder Video-Inhalten.
