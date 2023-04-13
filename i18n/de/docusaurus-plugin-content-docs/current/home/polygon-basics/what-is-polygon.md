---
id: what-is-polygon
title: Was ist Polygon?
description: Erfahren Sie mehr über die Polygon Skalierungslösung
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/) ist eine Layer 2-Skalierungslösung, die Skalierung durch die Nutzung von Sidechains für die off-chain-Berechnung und ein dezentrales Netzwerk von Proof-of-Stake (PoS) erreicht.

Polygon ist bestrebt, die Skalierbarkeit- und Benutzerfreundlichkeitsprobleme zu lösen, während es nicht Dezentralisierung sowie die Nutzung der vorhandenen Entwicklergemeinschaft und des Ökosystems einschränkt. Es zielt darauf ab, vorhandene Plattformen zu verbessern, indem es dApps und user eine Skalierbarkeit und eine überlegene Benutzererfahrung bietet.

Es ist eine Skalierungslösung für öffentliche Blockchains. Polygon PoS unterstützt alle bestehenden Ethereum-Tools und ermöglicht schnellere und günstigere Transaktionen.

## Wichtige Funktionen & Highlights {#key-features-highlights}

- **Skalierbarkeit**: Schnelle, kostengünstige und sichere Transaktionen auf Polygon-Sidechains mit Finalität auf Mainchain und Ethereum als erste kompatible Layer 1-Basechain.
- **Hoher Durchsatz**: Erreicht bis zu 10.000 TPS auf einer einzigen Sidechain auf internem Testnetz; Mehrere Chains werden für horizontale Skalierung hinzugefügt.
- **Benutzererlebnis**: Smooth UX und Entwicklerabstraktion von Mainchain zu Polygon-Chain; native mobile Apps und SDK mit WalletConnect-Support.
- **Sicherheit**: Polygon-Chain-Betreiber sind selbst Staker im PoS-System
- **Öffentliche Sidechains**: Polygon-Sidechains sind öffentlich (im Vergleich zu einzelnen DApp-Chains), genehmigungslos und in der Lage mehrere Protokolle zu unterstützen.

Das Polygon-System wurde bewusst entwickelt, um willkürliche Zustandsübergänge auf Polygon-Sidechains zu unterstützen, die EVM-enabled sind.

## Delegierten- und Prüferrollen {#delegator-and-validator-roles}

Sie können am Polygon-Netzwerk als Delegierter oder Prüfer teilnehmen. Siehe:

* [Wer ist ein Validator](/docs/maintain/polygon-basics/who-is-validator)
* [Wer ist ein Delegierter](/docs/maintain/polygon-basics/who-is-delegator)

## Architektur {#architecture}

Wenn du ein Validator werden willst, ist es wichtig, dass du die Polygon-Architektur verstehst.

Weitere Informationen finden Sie unter [Polygon Architecture](/docs/maintain/validator/architecture).

### Komponenten {#components}

Um ein tiefgreifenderes Verständnis der Polygon-Architektur zu erhalten, sollten Sie die Kernkomponenten ansehen:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Contracts](/docs/pos/contracts/stakingmanager)

#### Codebases {#codebases}

Um ein detailliertes Verständnis der Kernkomponenten zu erhalten, siehe folgende Codebases:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contracts](https://github.com/maticnetwork/contracts)

## Anleitungen (How-tos) {#how-tos}

### Knoten Setup {#node-setup}

Wenn du einen vollständigen Knoten auf dem Polygon Mainnet oder Mumbai Testnet ausführen möchtest, kannst du den folgenden folgen. [Führe einen Validator](/maintain/validate/run-validator.md) Guide aus.

### Staking Vorgänge {#staking-operations}

Überprüfen Sie, wie der Staking-Vorgang für die Prüfer- und Delegiertenprofile durchgeführt wird:

* [Validator-Staking Vorgänge](docs/maintain/validate/validator-staking-operations)
* [Delegieren](/docs/maintain/delegate/delegate)
