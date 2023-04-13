---
id: faq
title: FAQs
description: FAQs in Bezug auf Polygon
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Häufig gestellte Fragen {#frequently-asked-questions}

## Was ist Polygon? {#what-is-polygon}

Polygon ist eine Skalierungslösung für öffentliche Blockchains, speziell für Ethereum. Polygon bietet Skalierbarkeit und gewährleistet eine überlegene Benutzererfahrung auf sichere und dezentrale Weise. Es hat eine funktionierende Implementierung für Ethereum auf Kovan Testnet. Polygon will andere Blockchains in der Zukunft unterstützen, die es uns ermöglichen, interoperability bereitzustellen, und die Skalierbarkeit für bestehende öffentliche blockchain bietet.

## Wie unterscheidet sich Polygon von anderen Implementierungen von Plasma? {#how-is-polygon-different-from-other-implementations-of-plasma}

Polygon wird von Plasma implementiert, auf staatliche Sidechains basiert, die auf EVM ausgeführt werden, während die anderen Implementierungen von Plasma in erster Linie UTXOs verwenden, die sie auf die Zahlungsspezifisch beschränken. Mit staatlich basierter Sidechains kann Polygon Skalierbarkeit für generische Smart Contracts auch bereitstellen.

Zweitens verwendet Polygon eine öffentliche Checkpointing Ebene, die Checkpoints nach periodischen Intervallen veröffentlicht (im Gegensatz zu Checkpoints nach jedem Block in Plasma Cash), die es den Sidechains ermöglichen, mit hohen Geschwindigkeiten zu arbeiten, während die Checkpoints in Batches veröffentlicht werden. Diese Checkpoints zusammen mit den fraud gewährleisten, dass Polygon Sidechains sicher funktionieren.

## Euer Projekt bietet Skalierbarkeit für Ethereum unter Verwendung von Plasmachains, ist es ein Protokoll oder eine native Blockchain an sich? {#your-project-provides-scalability-for-ethereum-using-plasma-chains-is-it-a-protocol-or-a-native-blockchain-in-itself}

Polygon network ist eine **"Sidechain"** Lösung, bei der Ethereum Main Chain Assets, d.h. alle dApps / Tokens / Protokolle der Main Chain verschoben werden können, auf Polygon Sidechain(s) migriert werden und bei Bedarf Assets wieder in die Main Chain zurückziehen können.

## Was sind die Wettbewerbsvorteile von Polygon gegenüber seinen Konkurrenten? {#what-are-the-competitive-advantages-of-polygon-over-its-competitors}

### L2-Skalierungslösungen {#l2-scaling-solutions}

Polygon ist bestrebt, durch Dezentralisierung Skalierung zu erreichen. Polygon verwendet periodische Checkpoints und Betrugsnachweise. Wenn Benutzer ihre Assets zurückziehen möchten, verwenden sie die Checkpoints, um ihre Assets auf der Sidechain zu beweisen, während Betrugsnachweise benötigt werden, um Betrug oder ein schlechtes Verhalten herauszufordern und Stakers zu schneiden.

Andere Projekte bieten auch L2 Skalierungslösungen an, aber es gibt zwei wichtige Elemente, die wir voneinander unterscheiden:

1. Zum einen konzentriert sich Polygon nicht nur auf finanzielle Transaktionen, sondern auch auf Spiele und andere Utility dApps. Wir haben auch Pläne für vollwertige Finanzdienstleistungen wie das Krediten/Trading von dApps (Token-Swaps, Margin-Trades und vieles mehr).

2. Zweitens, während Polygon Checkpoints für 1-Sekunde Blockzeiten verwendet (mit PoS Layer), haben viele andere Lösungen möglicherweise Blockzeiten größer als die Ethereum-Blockzeiten, da du jeden Block der Sidechain auf die Hauptkette drücken musst.

### L1-Skalierungslösungen {#l1-scaling-solutions}

Außerdem zeichnet sich Polygon unter anderem durch seine Fähigkeit aus, Skalierung zu erreichen und gleichzeitig einen hohen Grad an Dezentralisierung beizubehalten.

Noch wichtiger ist, dass diese scalability ein Problem haben, das Rad neu erfinden. Sie erstellen neue blockchains in denen die Entwickler-Community, das Produktsystem, die technische Dokumentation und Unternehmen aus **"Scratch"** aufgebaut werden müssen. Polygon ist hingegen eine EVM-fähige Chain und verfügt über alle dApps/Assets, die auf der Ethereum Main Chain basieren, mit Skalierbarkeit auf einem Klick verfügbar.

### Zahlungen {#payments}

Wir glauben, dass Polygon einen Vorteil in Sachen Usability hat, da in anderen Lösungen sowohl Sender als auch Empfänger ihre Zahlungskanäle erstellen müssen. Dies ist für die Nutzer sehr umständlich. Bei der Polygon zugrundeliegenden Technologie müssen die Nutzer keine Zahlungskanäle einrichten und benötigen lediglich eine gültige Ethereum-Adresse, um Token zu erhalten. Dies steht auch im Einklang mit unserer langfristigen Vision, das Benutzererlebnis für dezentrale Anwendungen zu verbessern.

### Trading und Finanzen {#trading-and-finance}

Polygon beabsichtigt, DEX (z.B. 0x), Liquidity (z.B. Kyber Network) und andere Arten von Finanzprotokollen wie Lending Protocols (Dharma Protocol) auf seiner Plattform zu aktivieren, die Polygon-Nutzern den Zugriff auf verschiedene 0x), wie DEXs, dApps, LPs und viele andere ermöglicht.

## Wie vergleicht Polygon mit anderen Sidechain-Lösungen? {#how-does-polygon-compare-with-other-sidechain-solutions}

Auf Polygon werden alle side durch mehrere Mechanismen auf der Sidechain sowie der Main Chain gesichert. Auf der Sidechain werden alle Transaktionen überprüft und auf der Hauptkette durch eine hoch dezentrale Checkpointing Layer überprüft und überprüft.

Wenn eine betrügerische Transaktion auf der Sidechain stattfindet, kann diese von der Checkpointing Ebene erkannt und behandelt werden. Selbst im extremen und höchst unwahrscheinlichen Szenario, in dem die block sowie die Checkpointing Layer beide zusammenfallen, selbst dann hat die Hauptkette Betrugsnachweise, auf die jeder aus der Öffentlichkeit kommen kann und jede Transaktion herausfordern kann, die sie als betrügerisch auf der Sidechain erachten.

Wenn die Herausforderung erfolgreich ist, gibt es eine riesige wirtschaftliche disincentive Strafe für die Kolludierenden Parteien, da ihre Einsätze slashed. werden. Der öffentliche Herausforderer wird außerdem mit den gesättigten Einsätzen der betrügerischen Sidechain-Akteure belohnt.

Polygon ist damit ein wirtschaftlich incentivized Sidechain-Netzwerk, das einen hohen Grad an Dezentralisierung und Sicherheit der Sidechain-Transaktionen hat.

Auch die Kapazität und TPS von Polygon Sidechains sind viel höher als andere Lösungen. Vor allem, wenn Polygon Tausende von Transaktionen haben kann, während andere einzelne Sidechains sind, die eine höhere Grenze von einigen tausend Transaktionen haben.

## Über welche Prinzipien werden neue Sidechains hinzugefügt? Gibt es spezielle Anforderungen für lokale Sidechains? {#via-what-principles-will-new-sidechains-be-added-will-there-be-any-special-requirements-for-private-companies-local-sidechains}

Im Vergleich zu staatlichen Kanälen stellt Plasma eine überlegene Alternative zu Skalierungs-Frameworks dar, vor allem aufgrund der Sicherheitsgarantien, die das Framework bietet – die im Grunde besagen, dass die Nutzer in keinem Fall Geld verlieren werden. Natürlich kann es zu Verzögerungen bei der Rückerstattung des Geldes kommen, aber ein byzantinischer Plasma-Betreiber kann kein Geld aus dem Nichts erschaffen oder eine Transaktion doppelt ausgeben.

Polygon wird sich bemühen, in Zukunft eine vollständig offene und öffentliche Blockchain-Infrastruktur zu sein, bei der die wirtschaftlichen Anreize bzw. die Nachteile in erster Linie die Sicherheit und Stabilität des Systems bestimmen werden. Also sollte jeder in der Lage sein, dem System beizutreten und am Konsens teilzunehmen. In der network Phase jedoch muss Polygon eine größere Rolle spielen, um Sidechain zu aktivieren.

Polygon Sidechains wären in erster Linie öffentliche Sidechains sein, d.h. Sidechains für jeden, der genau wie andere öffentliche Blockchain verwenden kann. Enterprise Polygon Chains werden jedoch beabsichtigen, dedizierte Sidechains für bestimmte Organisationen bereitzustellen. Die Sicherheit und Dezentralisierung solcher Ketten würde weiterhin intakt gehalten werden, indem du die Checkpointing Layer und die Betrugsnachweise auf der Hauptkette nutzst.

## Werden Sidechains auch mit der Hauptkette (Ethereum) synchronisiert? {#will-sidechains-also-be-synced-with-the-main-chain-ethereum}

Auf jeden Fall. Die öffentliche Checkpointing Layer wird alle Transaktionen validieren, die auf den Sidechains passieren, und die Proofs an die Hauptkette veröffentlichen. Um die narrensichere Sicherheit von Sidechain-Transaktionen zu gewährleisten, enthält der main verschiedene Arten von Fraud Proofs, bei denen jegliche Sidechain-Transaktionen für jede betrügerische Aktivität herausgefordert werden können. Wenn ein Herausforderer gelingt, werden die Einsätze der am Betrug beteiligten Sidechain-Akteure slashed und an den Challenger übertragen. Dies entspricht einer jemals laufenden High Stake Bug Bounty. Ein gutes Diagramm zum Verständnis ist wie folgt:

![Screenshot](/img/matic/Architecture.png)

## Am Ende des Whitepapers befindet sich eine Liste mit „Potenziellen Anwendungsfällen“ – werden diese alle umgesetzt? In welcher Reihenfolge? {#at-the-end-of-the-white-paper-there-is-a-list-of-potential-use-cases-will-all-of-that-be-implemented-in-what-order}

Die grundlegende Logik ist, wenn es ein dApp / Protokoll gibt, das an Ethereum arbeitet, aber durch einen niedrigen Transaktionsdurchsatz und hohe Transaktionsgebühren begrenzt ist, dann werden wir in der Lage sein, Unterstützung für diese dApps / Protokolle im Polygon-Netzwerk hinzuzufügen.

## Warum wird es schwierig sein, Polygons Plasma-Implementierung zu replizieren? {#why-will-it-be-difficult-to-replicate-polygon-s-plasma-implementation}

Obwohl es mehr um den Netzwerkeffekt geht, in dem das Netzwerk das Ökosystem besser skalieren oder wachsen kann als andere, müssen Blockchain-Lösungen Open Source sein, da sie die tatsächlichen Assets von ihnen einbeziehen.

Es ist bei allen Open Source Projekten der Fall. Das gilt sowohl für uns als auch für die anderen konkurrierenden Implementierungen, da wir unsere GPL-Lizenz haben werden, die jeden, der unsere Implementierung nutzt, zwingend dazu verpflichtet, seinen Code als Open Source zu veröffentlichen. Aber wieder der Punkt ist, dass das Kopieren von Code selbst für Bitcoin, Ethereum und andere Projekte anwendbar ist, es geht um den Netzwerkeffekt, den ein Projekt erreichen kann.

## Was ist das Besondere an der Plasma-Implementierung von Polygon Network? {#what-s-special-about-polygon-network-s-plasma-implementation}

Polygon Plasma verwendet ein kontobasiertes Modellsystem und nicht das UTXO System. Dies bietet uns einen großen Vorteil der Verwendung eines EVM auf der Polygon der es uns ermöglicht, das gesamte Ethereum Ökosystem, Entwickler-Tools, Integrationsbibliotheken usw. für das Polygon-Netzwerk zu nutzen.

Das Polygon Netzwerk kann von dApps verwendet werden, ohne Änderungen an ihren ERC20-Token zu erfordern. Darüber hinaus ermöglicht es uns, Größenordnungen schneller als andere Plasma-Implementierungen zu sein, weil wir die Proofs einzelner Blöcke in den Checkpoints ablegen, während andere Plasma-Implementierungen jeden Block-Proof der Hauptkette unterwerfen müssen.

## Wie wollt ihr die Probleme mit der Zentralisierung lösen? {#how-are-you-going-to-solve-the-issues-with-centralization}

Hier ist ein Diagramm, um den Kontext zu verdeutlichen:

![Screenshot](/img/matic/Merkle.png)

Die PoA-Knoten werden also zuerst Delegierte sein (mit Proof of Solvency d.h. sie müssen eine hohe Menge an Stake hinterlegen) und KYC im Grunde von der PoA ausgewählt werden, genau wie ein EOS style Delegated Proof of Stake (DPoS) oder Delegated Byzantine Fault Tolerance (DBFT) Knoten.

Zweitens nehmen wir an, dass alle Delegaten (oder 2/3. von ihnen) schlechte Schauspieler drehen und fehlerhafte Blöcke produzieren, dann haben Sie PoS-Layer, die alle Blöcke validieren und wenn Betrug begangen werden, die Stakes von Delegaten werden gesättigt und die Checkpointing für die Korrekturaktionen gestoppt.

Drittens sagen wir mal, sogar die Staker PoS Schicht (die eine große Anzahl von Knoten wäre) wird auch schlecht und umgefallen, um fehlerhafte Checkpoints zu produzieren, d.h. alle PoA sind korrupt und PoS sind korrupt. Selbst dann, nach der Plasma-Philosophie, schreiben wir eines der begehrten Dinge der sidechain **Fraud** Proofs, die von vielen großen Projekten angesehen werden (die Watchers können als unsere watchers auf GitHub angesehen werden). Dieser fraud ermöglicht es jedem in der Öffentlichkeit, jede Transaktion auf der Hauptkette zu fordern, Ethereum.

## Warum wird der Matic Token benötigt? {#why-is-matic-token-required}

Die folgenden Gründe verstärken die Notwendigkeit, MATIC Token zu haben:

### Polygon beabsichtigt, eine Allzweck-Skalierungslösung für öffentliche Blockchains zu sein. {#polygon-intends-to-be-a-general-purpose-scaling-solution-for-public-blockchains}

Wir fangen auf Ethereum als unser erstes Basechain an, aber in der Zukunft Polygon auf mehreren Basechains einsatzbereit sein. Es werden bald weitere Basechains hinzukommen, sodass es keinen Sinn ergibt, eine Währung (Ether) zu haben, die für die Zahlung von Gebühren auf den Sidechains verwendet wird. Wenn es ein existentielles Anliegen über irgendeine Basechains Zukunft gibt, die Währung dieser Basechains als natives Asset für Polygon zu haben, wird das scaling krippeln. Daher ist es wichtig, das Staker-Ökosystem auf Polygons eigenem Netzwerk-Token aufzubauen.

### Appcoin Sicherheitsmodell {#appcoin-security-model}

Polygon beabsichtigt, Dapps zu ermöglichen, Polygon-Gebühren in Dapp-Coins zu bezahlen, indem ein Token-Swap-Mechanismus unter Verwendung eines Liquiditätspools wie Kyber abstrahiert wird. Der Benutzer verwendet ihre dApp-coins einfach, um Gebühren zu bezahlen, im Hintergrund wird die dApp-coins für MATIC-Token ausgetauscht. Daher werden die DApp-Entwickler, die eine nahtlose Benutzererfahrung bieten wollen, dabei helfen, einen Polygon-Liquiditätspool zu unterhalten.

### Das Netzwerk in nascent Phasen einsetzen {#seeding-the-network-in-nascent-stages}

Es ist praktisch unmöglich, den Seeding-Prozess für das System zu starten, wenn es nur wenige oder gar keine txns im Netzwerk gibt, da wir Eth nicht an den hochgradig dezentralen Validator-Layer und die Block Producer verteilen können. Mit den Matic-Tokens haben wir einen großen Prozentsatz der Token für das Seeding der Block Producer, die Checkpointer-Stakes und die späteren Block-Prämien vorgesehen. Diese Bestimmung stellt sicher, dass die Staker auch dann Belohnungen erhalten, wenn das Netzwerk einige Zeit braucht, um Netzwerkeffekte anzunehmen. Es ist vergleichbar mit dem Grund, warum Block Mining Prämien für Bitcoin beibehalten wurden, Staker und Block Producer können auf diese Weise motiviert werden, um das Netzwerk sicher zu halten.

Wenn du dir Sorgen um die Entwickler machst: Eine der Säulen unserer Strategie ist es, die Einstiegshürde für Entwickler sehr niedrig zu halten. Wir haben dafür gesorgt, dass alle Ethereum-Entwicklungstools auf Polygon sofort funktionieren. In Bezug auf die Token, die für die Zahlung von Gebühren auf testnet benötigt werden, ist es für einen Entwickler nicht anders, der auf Ethereum aufbaut. Der dev erhält kostenlose Token für das Testnet von einem Polygon Wasserhahn, genau wie auf Ethereum. Du brauchst MATIC-Token nur, wenn du auf Polygon Mainnet bereitstellen möchtest, wo die Gasgebühr viel niedriger ist als Ethereum, etwa 1/100 einer Transaktionsgebühr, die du auf Ethereum bezahlen würdest.

## Was bestimmt die Verwendung und die Nachfrage nach Matic-Tokens? {#what-drives-the-use-and-demand-for-matic-tokens}

Es gibt zwei Hauptverwendungszwecke für den Token:

1. Der Token wird verwendet, um für die Transaktionsgebühren im Netzwerk zu bezahlen.
2. Der Token wird verwendet, um am Proof of Stake Consensus Mechanismus für die Checkpointing Layer und Blockproduktion Layer teilzunehmen.

### Einige der sekundären Gründe für die Token-Nachfrage {#some-of-the-secondary-reasons-for-token-demand}

* Polygon beabsichtigt, Dapps zu ermöglichen, Polygon-Gebühren in Dapp-Coins zu bezahlen, indem ein Token-Swap-Mechanismus unter Verwendung eines Liquiditätspools wie Kyber abstrahiert wird. Der Benutzer verwendet ihre dApp-coins einfach, um Gebühren zu bezahlen, im Hintergrund wird die dApp-coins für MATIC-Token ausgetauscht. Daher werden die DApp-Entwickler, die eine nahtlose Benutzererfahrung bieten wollen, dabei helfen, einen Polygon-Liquiditätspool zu unterhalten.

* Um schnellere Exits zu ermöglichen, implementieren wir einen Kreditmechanismus mit Dharma Protocol, in dem ein Underwriter/Kreditgeber den Exit-Token empfangen und den Exit-Betrag mit einer kleinen Gebühr als Zinsen auszahlen kann. Der Lender fordert die Token dann nach einer Woche unter Verwendung des Exit-Tokens ein. Der Benutzer erhält somit nahezu sofortige Auszahlungen, während die Lender Zinsen für den von ihnen erbrachten Service verdienen können.

### Das Burning von Token auf Protokollebene {#protocol-level-burning-of-tokens}

Wir beabsichtigen, einen Prozentsatz der Transaktionsgebühr in jedem Block zu verbrennen. Dies macht die Token in der Natur deflationär und unterstützt sie in Bezug auf ihren Wert auf Protokollebene.

### Niedrige Einstiegshürde (und damit höhere Chancen auf schnelle Akzeptanz) {#low-entry-barrier-and-hence-higher-chances-of-quick-adoption}

Wir werden uns stark auf DApps stützen, um die Endnutzerakzeptanz herzustellen. Eine der wichtigsten Features ist, dass wir eine Architektur unterhalten, die vollständig mit dem Ethereum Development Ökosystem kompatibel ist, d.h. alle Smart Contracts, Wallets, IDE, DevOps-Tools usw. sind direkt mit Polygon kompatibel.

Jede Ethereum-Dapp kann fast ohne signifikante Änderungen auf Polygon übertragen werden. Die entry für die vorhandenen Ethereum-Entwickler für den Übergang zu Polygon sind also vernachlässigbar, was eine virale dApp überspringen kann. Dies hat das Potenzial, eine Menge organische Nachfrage zu bringen, da Netzwerkeffekte sich um das Polygon Netzwerk aufbauen.

## Ist der Tokentyp ERC20? {#is-token-type-erc20}

Ja. Und der gleiche Token wird auch auf Polygon Chain anwendbar sein, d.h. keine Notwendigkeit, in Zukunft zu einem nativen Token zu verschieben.

## Was ist die zu erwartende TPS, die ihr in das Ethereum-Netzwerk einbringen könnt? Wie hoch ist sie im Moment im Testnet? {#what-is-the-expected-tps-you-ll-be-able-to-bring-to-the-ethereum-network-what-are-you-running-at-now-on-testnet}

Eine einzige Sidechain hat die Kapazität von 7.000 + Transaktionen pro Sekunde. Polygon hat die Möglichkeit, mehrere Sidechain hinzuzufügen, aber aktuell wäre unser Fokus auf der Stabilisierung des Netzwerks mit einer Sidechain.
