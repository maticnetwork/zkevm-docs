---
id: optimisticoracle
title: Optimistisches Oracle von UMA
sidebar_label: UMA
description: UMA Optimistic Oracle ermöglicht es Verträgen, schnell jede Art von Daten anzufordern und zu empfangen.
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

UMA Optimistic Oracle ermöglicht es Verträgen, schnell jede Art von Daten anzufordern und zu empfangen. Das oracle von UMA besteht aus zwei Kernkomponenten:

1. Optimistisches Oracle
2. Datenverifizierungsmechanismus (DVM)

## Optimistisches Oracle {#optimistic-oracle}

UMA **Optimistic Oracle** ermöglicht es Verträgen, schnell Preisinformationen anzufordern und zu erhalten. Das Optimistic Oracle fungiert als ein generalisiertes Eskalationsspiel zwischen Verträgen, die eine Preisanfrage einleiten, und dem Streitbeilegungssystem der UMA, das als Data Verification Mechanism (DVM) bekannt ist.

Die Preise, die das optimistische Oracle vorschlägt, werden nicht an den DVM gesendet, sofern dagegen nicht Einspruch erhoben wird. Dies ermöglicht es Verträgen, Preisinformationen innerhalb einer beliebigen vorgegebenen Dauer zu erhalten, ohne den Preis eines Assets auf der Chain zu schreiben.

## Datenverifizierungsmechanismus (DVM) {#data-verification-mechanism-dvm}

Falls Einspruch erhoben wird, wird eine Anfrage an den DVM gesendet. Alle Verträge, die auf UMA basieren, verwenden den DVM als Möglichkeit, um Streitigkeiten beizulegen. Einsprüche, die an den DVM gesendet werden, werden innerhalb von 48 Stunden gelöst, nachdem die UMA-Tokeninhaber über einen Preis des Assets zu einem bestimmten Zeitpunkt abstimmen. Verträge auf UMA müssen das optimistische Oracle nicht verwenden, außer es wird ein Preis für ein Asset innerhalb von weniger als 48 Stunden benötigt.

Der Datenverifizierungsmechanismus (DVM) ist der Streitbeilegungsdienst für Verträge, die auf dem UMA-Protokoll basieren. Der DVM ist leistungsstark, weil er menschliche Beurteilungen enthält, um sicherzustellen, dass Verträge sicher und korrekt verwaltet werden, wenn Probleme aufgrund von volatilen (und manchmal manipulierbaren) Märkten entstehen.

## Schnittstelle des optimistischen Oracles {#optimistic-oracle-interface}

Das optimistische Oracle wird von Finanzverträgen oder anderen Dritten verwendet, um Preise abzurufen. Sobald ein Preis angefordert wird, kann jeder als Reaktion einen Preis vorschlagen. Nachdem er vorgeschlagen wurde, durchläuft der Preis eine Lebensdauer, während der jeder den vorgeschlagenen Preis anfechten und den angefochtenen Preis zur Beilegung an den UMA DVM übermitteln kann.

:::info

In diesem Abschnitt erfährst du, wie verschiedene Teilnehmer mit dem optimistischen Oracle interagieren können. Um die am häufigsten aktualisierten Mainnet-, Kovan- oder L2-Bereitstellungen der optimistischen Oracle-Verträge zu sehen, lies die [Produktionsadressen](https://docs.umaproject.org/dev-ref/addresses).

:::

Es gibt zwölf Methoden, aus denen die optimistische Oracle-Schnittstelle besteht.
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

Fordert einen neuen Preis an. Muss für eine registrierte Preiskennzahl gelten. Beachten bitte, dass dies automatisch von den meisten Finanzverträgen aufgerufen wird, die im UMA-System registriert sind, aber von jedem für jede registrierte Preiskennzahl aufgerufen werden kann. Der Expiring Multiparty (EMP) Vertrag ruft zum Beispiel diese Methode auf, wenn seine `expire`-Methode aufgerufen wird.

Parameter:
- `identifier`: angeforderte Preiskennzahl.
- `timestamp`: Zeitstempel des angeforderten Preises.
- `ancillaryData`: Zusatzdaten, die zusätzliche Args darstellen, welche mit der Preisanfrage weitergegeben werden.
- `currency`: ERC20-Token für die Zahlung von Prämien und Gebühren. Muss für die Verwendung mit dem DVM genehmigt werden.
- `reward`: Prämie für einen erfolgreichen Vorschlagenden. Wird vom Antragsteller bezahlt. Beachte: Das kann 0 sein.

### proposePrice {#proposeprice}

Schlägt einen Preis für eine vorhandene Preisanfrage vor.

Parameter:
- `requester`: Absender der anfänglichen Preisanfrage.
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.
- `proposedPrice`: Der vorgeschlagene Preis.

### disputePrice {#disputeprice}

Erhebt Einspruch gegen einen Preis für eine vorhandene Preisanfrage mit einem aktiven Vorschlag.

Parameter:
- `requester`: Absender der anfänglichen Preisanfrage.
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.

### settle {#settle}

Versucht, eine offene Preisanfrage beizulegen Wird zurückkehren, wenn es nicht abgewickelt werden kann.

Parameter:
- `requester`: Absender der anfänglichen Preisanfrage.
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.

### hasPrice {#hasprice}

Prüft, ob eine Anfrage gelöst oder beigelegt wurde (d. h. das optimistische Oracle hat einen Preis dafür).

Parameter:
- `requester`: Absender der anfänglichen Preisanfrage.
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.

### getRequest {#getrequest}

Ruft die aktuelle Datenstruktur mit allen Informationen über eine Preisanfrage ab.

Parameter:
- `requester`: Absender der anfänglichen Preisanfrage.
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.

### settleAndGetPrice {#settleandgetprice}

Ruft einen Preis ab, der zuvor von einem Antragstellenden angefordert wurde. Wird zurückgesetzt, falls die Anfrage nicht beigelegt wird oder nicht beigelegt werden kann. Hinweis: Diese Methode ist nicht sichtbar, damit dieser Aufruf die Preisanfrage beilegen kann, falls sie noch nicht beigelegt wurde.

Parameter:
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.

### setBond {#setbond}

Legt den vorgeschlagenen Bond für eine Preisanfrage fest.

Parameter:
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.
- `bond`Benutzerdefinierter Bond-Betrag.

### setCustomLiveness {#setcustomliveness}

Legt einen benutzerdefinierten Lebendigkeitswert für die Anfrage fest. Lebendigkeit ist die Zeit, die eine Anfrage warten muss, bevor sie automatisch beigelegt wird.

Parameter:
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.
- `customLiveness`: Neue benutzerdefinierte Lebendigkeit.

### setRefundOnDispute {#setrefundondispute}

Legt die Anfrage fest, um die Prämie zurückzuerstatten, falls der Vorschlag angefochten wird. Dadurch kann der Antragsteller im Falle einer durch einen Einspruch verursachten Verzögerung „abgesichert“ werden. Hinweis: Im Falle eines Einspruchs erhält der Gewinner trotzdem den Bond des anderen und kann auf diese Weise auch dann Gewinne machen, wenn die Prämie zurückerstattet wird.

Parameter:
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.

### disputePriceFor {#disputepricefor}

Ficht eine Preisanfrage mit einem aktiven Vorschlag im Namen einer anderen Adresse an. Hinweis: Diese Adresse erhält alle Prämien aus diesem Streitfall. Alle Bonds werden jedoch vom Antragsteller abgebucht.

Parameter:
- `disputer`: Adresse, die den Einspruch erhoben hat.
- `requester`: Absender der anfänglichen Preisanfrage.
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.

### proposePriceFor {#proposepricefor}

Schlägt einen Preiswert im Namen einer anderen Adresse vor. Hinweis: Diese Adresse erhält alle Prämien aus diesem Vorschlag. Alle Bonds werden jedoch vom Antragsteller abgebucht.

Parameter:
- `proposer`: Adresse, die als Vorschlagender festgelegt wird.
- `requester`: Absender der anfänglichen Preisanfrage.
- `identifier`: Preiskennzahl zur Identifikation der vorhandenen Anfrage.
- `timestamp`: Zeitstempel, um die vorhandene Anfrage zu identifizieren.
- `ancillaryData`: Zusatzdaten des angeforderten Preis.
- `proposedPrice`: Der vorgeschlagene Preis.

## Integration des optimistischen Oracles {#integrating-the-optimistic-oracle}

Diese Demo richtet einen `OptimisticDepositBox`Vertrag ein, der das ERC-20-Token-Guthaben eines Benutzers verwaltet.

Auf eine lokale Testnet-Blockchain zahlt der Benutzer wETH (Wrapped Ether) in den Vertrag ein und hebt wETH in USD ab. Wenn Benutzer zum Beispiel $10,000 USD of wETH, and the ETH/USD exchange rate is $2.000 abheben möchte, würde er 5 wETH abheben.

* Das Benutzer verknüpft das `OptimisticDepositBox` mit einer der Preiskennzahlen, die im DVM aktiviert wurden.

* Der Benutzer zahlt wETH in das `OptimisticDepositBox` ein und registriert es mit der `ETH/USD`-Preiskennzahl.

* Der Benutzer kann jetzt einen wETH-Betrag in USD von seinem `DepositBox` über Smart Contract-Aufrufe abheben, wobei das optimistische Oracle eine optimistische Preisgestaltung auf der Chain ermöglicht.

In diesem Beispiel hätte der Benutzer keinen wETH-Betrag in USD übertragen können, ohne sich auf einen Off-Chain-`ETH/USD`-Preisfeed zu beziehen. Das optimistische Oracle ermöglicht es dem Benutzer daher, einen Referenzpreis „abzurufen“.

Im Gegensatz zu Preisanfragen an den DVM, kann eine Preisanfrage an das optimistische Oracle innerhalb eines festgelegten Lebendigkeitsfensters gelöst werden, sofern es keine Einsprüche gibt, das wesentlich kürzer ist als die DVM-Abstimmungsperiode Das Lebendigkeitsfenster ist konfigurierbar, normalerweise ist es aber zwei Stunden lang. Im Vergleich dazu, dauern Beilegungen über den DVM 2–3 Tage.

Der Preis-Antragsteller ist derzeit nicht verpflichtet, Gebühren an den DVM zu bezahlen. Der Antragsteller kann eine Prämie für den Vorschlagenden anbieten, der auf eine Preisanfragen antwortet. Der Prämienbetrag ist in diesem Beispiel `0`.

Der Preis-Vorschlagende veröffentlicht einen Bond mit seinem Preis, welcher erstattet wird, falls der Preis nicht angefochten wird oder falls ein Einspruch zugunsten des Vorschlagenden beigelegt wird. Ansonsten wird der Bond verwendet, um die endgültige Gebühr an den DVM und eine Prämie an die Person, die den Einspruch erhoben hat, zu bezahlen.

In der Demo benötigt der Antragsteller keinen zusätzlichen Bond vom Preis-Vorschlagenden, weshalb der gesamte gepostete Bond der wETH-Endgebühr entspricht, die derzeit 0,2 wETH beträgt. In der `proposePriceFor`-Funktion im `OptimisticOracle` [-Vertrag](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html) findest du Implementierungsdetails.

## Ausführung der Demo {#running-the-demo}

1. Stelle sicher, dass du die [hier](https://docs.umaproject.org/developers/setup) beschriebenen, erforderlichen Einrichtungsschritte befolgt hast.
2. Führe eine lokale Ganache-Instanz (d. h. nicht Kovan/Ropsten/Rinkeby/Mainnet) mit `yarn ganache-cli --port 9545` aus
3. Migriere in einem anderen Fenster die Verträge, indem du den folgenden Befehl ausführst:

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. Um den `OptimisticDepositBox` [-Vertrag](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) bereitzustellen und einen Benutzerfluss zu durchlaufen, führe das folgende Demo-Skript über die Root des Repo aus:

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

Du solltest die folgende Ausgabe sehen:

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## Beschreibung der Vertragsfunktionen {#explaining-the-contract-functions}

Der `OptimisticDepositBox`[Vertragscode](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) zeigt, wie du mit der Oracle interagierst.

Die `constructor`-Funktion enthält ein `_finderAddress`-Argument für den UMA`Finder`-Vertrag, der ein Register der `OptimisticOracle`-Adresse, die genehmigte Sicherheit, Preiskennzahl-Whitelisten und andere wichtige Vertragsadressen enthält.

Das ermöglicht es dem `constructor`, zu prüfen, dass der Sicherheitstyp und die Preiskennzahl gültig sind, und ermöglicht es dem `OptimisticDepositBox`, das `OptimisticOracle` später zu finden und damit zu interagieren.

Die -`requestWithdrawal`-Funktion enthält einen internen Aufruf an `OptimisticOracle`, mit dem der `ETH/USD`-Preis angefordert wird. Sobald er zurückgegeben wurde, kann der Benutzer `executeWithdrawal` aufrufen, um die Auszahlung abzuschließen.

Es gibt viel mehr Informationen und Erklärungen in den code also schau dir mal an, wenn du mehr erfahren möchtest.

## Zusätzliche Ressourcen {#additional-resources}

Hier sind einige zusätzliche Ressourcen betreffend den UMA DVM:

- [Technische Architektur](https://docs.umaproject.org/oracle/tech-architecture)
- [Ökonomische Architektur](https://docs.umaproject.org/oracle/econ-architecture)
- [Blogbeitrag](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8) über das Design von UMAs DVM
- [Whitepaper](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf) über das Design von UMAs DVM
- [Studien-Repo](https://github.com/UMAprotocol/research) für optimale Gebührenrichtlinien
- [UMIP-Repo](https://github.com/UMAprotocol/UMIPs) für  Governance-Vorschläge
