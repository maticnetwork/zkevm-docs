---
id: getting-started
title: Ethereum↔Polygon Bridge
sidebar_label: Overview
description: Ein Zweiwege-Transaktionskanal zwischen Polygon und Ethereum.
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Mit der Einführung der Cross-Chain-Bridge mit Plasma und PoS-Security bietet dir Polygon einen dezentralen (Trustless) Zweiwege-Transaktionskanal zwischen Polygon und Ethereum. Dadurch können die Benutzer die Token über das gesamte Polygon übertragen, ohne sich den Risiken seitens Dritter auszusetzen oder die Marktliquidität einzuschränken. **Die Plasma und PoS Bridge ist sowohl auf Mumbai Testnet als auch auf Polygon Mainnet verfügbar**.

**Polygon bridge bietet einen Brückenmechanismus, der nahezu sofort, kostengünstig und flexibel ist**. Polygon verwendet eine Dual-Consensus-Architektur(Plasma + Proof-of-Stake (PoS) Plattform), um für Geschwindigkeit und Dezentralisierung zu optimieren. Wir haben bewusst ein solches System aufgebaut, das beliebige EVM-fähige Zustandsübergänge auf unseren Sidechains unterstützt.

**Die zirkulierende Lieferung deines Tokens bei Überquerung der Bridge ändert sich nicht**;

- Token, die das Ethereum-Netzwerk verlassen, werden gesperrt und die gleiche Anzahl von Token auf Polygon als pegged Token (1:1) angezeigt.
- Um die Token wieder in das Ethereum-Netzwerk zu bewegen, werden die Token auf dem Polygon-Netzwerk gebrannt und währenddessen auf dem Ethereum-Netzwerk freigeschaltet.

## PoS vs. Plasma {#pos-vs-plasma}

|                                      | PoS Bridge(empfohlen) | Plasma-Bridge |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Kurzbeschreibung** | DApp Developers, die nach Flexibilität und schnellere Auszahlungen mit POS-Systemsicherheit suchen. | DApp-Entwickler, die erhöhte Sicherheitsgarantien mit dem Plasma-Exit-Mechanismus suchen\. |
| **Aufbau** | Hochflexibel | Starr, weniger flexibel |
| **Einzahlung\(Ethereum → Polygon\)** | 22-30 Minuten | 22-30 Minuten |
| **Abhebung\(Polygon → Ethereum\)** | 1 Checkpoint = ~ 30 Minuten bis 6 Stunden | Rufe zum process-exit auf dem Vertrag von Ethereum an |
| **Sicherheit** | Das System Proof\-of\-Stake, gesichert durch einen robusten Satz externer Prüfer\. | Polygon’s Plasma minimiert Piggybacking gegen die Sicherheit von Ethereum. |
| **Support-Standards** | ETH, ERC20, ERC721, ERC1155 u. a. | Nur ETH, ERC20, ERC72ur |

:::info

Das [**FxPortal**](/develop/l1-l2-communication/fx-portal.md) ist eine andere Art von Brücke, die der PoS Bridge sehr ähnlich ist. Sie teilen die gleichen Eigenschaften wie für PoS in der obigen Tabelle erwähnt. Der einzige Unterschied ist, dass Token vor der Überbrückung nicht auf der FxPortal Bridge zugeordnet werden müssen. Das Mapping geschieht während der ersten Einzahlungstransaktion, die für einen bestimmten Token initiiert wird. Außerdem kann jeder von dem FxPortal Gebrauch machen, um seine eigenen benutzerdefinierten Tunnels / Brücken auf der Polygon Bridge zu erstellen. Es wird dringend empfohlen, das FxPortal für jeden bridging Fall zu verwenden. Neue token auf PoS und Plasma werden nach dem 31.01.2023 abgeraten, damit der Mapping-Prozess vollständig dezentralisiert und flexibel ist.

:::

## Zusätzliche Ressourcen {#additional-resources}

- [Einführung in Blockchain Bridges](https://ethereum.org/en/bridges/)
- [Was sind Cross-Chain Bridges](https://www.alchemy.com/overviews/cross-chain-bridges)
