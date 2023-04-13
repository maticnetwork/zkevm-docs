---
id: meta-transactions
title: Meta-Transaktionen
sidebar_label: Overview
description: Erfahre mehr über Meta-Transaktionen und wie du sie verwenden kannst.
keywords:
  - docs
  - polygon
  - matic
  - transactions
  - meta transactions
  - gasless
image: https://matic.network/banners/matic-network-16x9.png
slug: meta-transactions
---

Tägliche Smart-Verträge sind auf einem Höchststand und erreichen rund 2,5 bis 3 Millionen pro Tag.
DApps realisieren langsam ihren Nutzen, werden aber Opfer ihres Erfolgs oder des Erfolgs von anderen
aufgrund von Gasgebühren. Außerdem sind die Onboarding-Hürden der Benutzer und die Herausforderungen des aktuellen
UX nicht einfach zu lösen.

## Pflege von Smart-Verträgen {#servicing-smart-contracts}

Smart-Verträge sind deterministische Statusmaschinen, die geführt werden, wenn Transaktionsgebühren
bezahlt werden, um die Logik des Vertrags zu bedienen, indem die Rechnerressourcen des Netzwerks genutzt werden.
Dies wird durch ein Modell mit Gaszähler auf Ethereum (und Polygon) erreicht.

## Der aktuelle Status der Transaktion {#the-current-state-of-transacting}

Es gibt Einschränkungen für dieses traditionelle Transaktionsmodell auf Ethereum (und andere Blockchains).
Eine gemeinsame Einschränkung ist, dass ein Benutzer nicht die Mittel hat, für Gas zu bezahlen. Standardmäßig ist der Absender der
Transaktion der Zahler, da diese Verhaltensweisen gekoppelt werden. Wenn also ein Benutzer versucht,
eine Transaktion zu erstellen und zu senden, ist er für die entsprechenden Gasgebühren zuständig. Falls ein Benutzer eine dApp erstellt, damit interagiert
oder sie ausführt, muss der Benutzer ebenfalls für das Gas bezahlen.

Es ist unrealistisch, zu erwarten, dass der durchschnittliche Benutzer Krypto kaufen und für Gas bezahlen wird, um mit einer
App zu interagieren. Um dieses Problem zu lösen, kann der Absender einer Transaktion nicht mehr als
als Zahler agieren, was die Möglichkeit bietet, die Transaktionsabwicklung zu skalieren und eine nahtlose Transaktion
zu initiieren.

Anstatt die direkte Transaktionsabwicklung zu nutzen, würde eine Middleware (über einen Dritten) das Gas verarbeiten..
Hier kommen Meta-Transaktionen ins Spiel.

## Was sind Meta-Transaktionen? {#what-are-meta-transactions}

Meta-Transaktionen ermöglichen es jedem, mit der Blockchain zu interagieren. Benutzer müssen keine
Token besitzen, um die Dienste des Netzwerks über Transaktionsgebühren zu bezahlen. Dies wird erreicht, indem der
Absender einer Transaktion und der Zahler von Gas voneinander getrennt werden.

Eine Lösung, die neue Benutzer onboarden und bestehende Benutzer unterstützen kann.

Der Ausführende einer Transaktion fungiert als Absender. Anstatt Gas auszugeben, erstellen sie nur eine
Transaktionsanfrage, indem sie ihre beabsichtigte Aktion (die Transaktionsparameter) mit ihrem privaten
Schlüssel unterzeichnen. Die Meta-Transaktion ist eine normale Ethereum-Transaktion, die zusätzliche Parameter enthält, um
die Meta-Transaktion zu erstellen.

Die signierten Transaktionsparameter werden an ein sekundäres Netzwerk weitergegeben, das als Relayer fungiert.
Obwohl es verschiedene Schemata dafür gibt, würden Relayer normalerweise auswählen, welche Transaktionen
sich für die Übermittlung eignen, indem sie die Transaktion bewerten (z. B. ob sie relevant für die dApp sind). Nach der Bewertung, verwandelt der Relayer
die Anfrage (die signierte Nachricht) in eine tatsächliche Transaktion (was bedeutet, dass die Gasgebühr bezahlt wird)
und überträgt sie an das Netzwerk, wo der Vertrag die Transaktion entpackt, indem er die
Originalsignatur bewertet und sie im Namen des Benutzers ausführt.

:::note Die Begriffe Meta und Batch werden manachmal als Synonyme verwendet.

Zur Klarstellung: Eine Meta-Transaktion unterscheidet sich von einer Batch-Transaktion, da eine Batch-Transakation
mehrere Transaktionen gleichzeitig versenden kann, die dann von einem einzigen Absender
(einer angegebenen Nonce) nacheinander ausgeführt werden.

:::

Zusammenfassend sind Meta-Transaktionen ein Designmuster, für das gilt:

* Ein Benutzer (Absender) signiert eine Anfrage mit seinem privaten Schlüssel und sendet sie an einen Relayer.
* Der Relayer verpackt die Anfrage in eine tx, und sendet sie an einen Vertrag.
* Der Vertrag entpackt die tx, und führt sie aus.

Native Transaktionen bedeuten, dass der „Absender“ auch der „Zahler“ ist. Wird der "Zahler" aus
dem „Absender“ entfernt, wird der „Absender“ eher eine „Absicht“ – der Absender beschreibt die Absicht der Transaktion
die er auf der Blockchain ausführen möchte, indem er eine Nachricht signiert, die bestimmte Parameter betreffend
seine Nachricht enthält und keine vollständig konstruierte Transaktion ist.

## Anwendungsfälle {#use-cases}

Man kann sich das Potenzial von Meta-Transaktionen vorstellen, um dApps und Interaktionen mit Smart-Verträgen zu skalieren. Ein Benutzer kann nicht nur eine gaslose Transaktion erstellen, sondern dies beliebig oft wiederholen und ein
Automatisierungstool nutzen. Meta-Transaktionen können die nächste App-Welle für praktische Anwendungsfälle beeinflussen. Meta-Transaktionen
geben der Smart-Vetragslogik einen echten Nutzen, welcher aufgrund von Gasgebühren und den Interaktionen,
die auf der Chain nötig sind, oft begrenzt ist.

### Beispiel mit Abstimmung {#example-with-voting}

Ein Benutzer möchte an der Governance auf der Chain teilnehmen und beabsichtigt, mit einem
Voting-Vertrag für ein bestimmtes Ergebnis zu stimmen. Der Benutzer würde eine Nachricht signieren, die die Stimme des Benutzers in diesem
Vertrag darstellt. Traditionell muss er eine Gasgebühr bezahlen, um mit dem Vertrag interagieren zu können (und wissen, wie man
mit dem Vertrag interagiert). Stattdessen kann er eine Meta-Transaktion (ohne Chain) mit den erforderlichen
Informationen für die Stimmabgabe unterzeichnen und sie an einen Relayer übermitteln, der die Transaktion in seinem Namen ausführt.

Die signierte Nachricht wird an einen Relayer gesendet (die signierten tx-Parameter über die Voting-Information). Der Relayer
bestätigt, dass diese Transaktion eine Vorzugsstimme ist, fügt die Abstimmungsanfrage in eine tatsächliche Transaktion ein,
bezahlt die Gasgebühren und sendet sie an den Voting-Vertrag. Auf Seiten des Voting-Vertrags wird alles
überprüft und die Stimme im Namen des Benutzers abgegeben.

## Jetzt ausprobieren {#try-them-out}

Voraussetzung ist, dass du die verschiedenen Ansätze zur Integration einer Meta-Transaktionen in deine
dApp kennst. Außerdem hängt es davon ab, ob du zu Meta-Transaktionen wechselst oder eine neue dApp erstellst.

Um deine dApp mit Meta-Transaktionen in Polygon zu integrieren, kannst du eine der folgenden
Relayer auswählen oder eine benutzerdefinierte Lösung erstellen:

* [Biconomy](https://docs.biconomy.io/products/enable-gasless-transactions)
* [Gas Station Network (GSN)](https://docs.opengsn.org/#ethereum-gas-station-network-gsn)
* [Infura](https://infura.io/product/ethereum/transactions-itx)
* [Gelato](https://docs.gelato.network/developer-products/gelato-relay-sdk)
