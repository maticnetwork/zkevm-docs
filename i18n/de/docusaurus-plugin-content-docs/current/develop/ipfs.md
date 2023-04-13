---
id: ipfs
title: IPFS
description: "IPFS – verteiltes System, um Daten zu speichern und darauf zuzugreifen."
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### Kontext {#context}

Die Polygon-Blockchain reduziert die Transaktionskosten für die Datenspeicherung im Vergleich zum Ethereum-Mainnet. Doch selbst diese niedrigeren Kosten summieren sich schnell, wenn große Dateien gespeichert werden. Entwickler müssen außerdem Einschränkungen der Blockgröße und der Transaktionsgeschwindigkeit bei der Speicherung von Daten auf der Chain berücksichtigen. Eine Lösung, die all diese Bedenken berücksichtigt, ist IPFS, das InterPlanetary File System.

#### Was ist IPFS? {#what-is-ipfs}

IPFS ist ein verteiltes System, um Dateien, Websites, Apps und Daten zu speichern und darauf zuzugreifen. IPFS nutzt Dezentralisierung, Inhaltsadressierung und ein robustes Peer-to-Peer-Netzwerk mit aktiven Teilnehmern, um es Benutzern zu ermöglichen, verifizierbare Daten zu speichern, anzufordern und zu übertragen.

Durch die Dezentralisierung kann man eine Datei von vielen Standorten herunterladen, die nicht von einer Organisation verwaltet werden, wodurch Resilienz und Schutz vor Zensur sichergestellt werden.

Inhaltsadressierung nutzt Kryptographie, um einen eindeutig verifizierbaren Hash zu erstellen, der darauf basiert, was sich in einer Datei befindet, anstatt wo sie sich befindet. Der resultierende Inhaltskennzeichner (CID) stellt sicher, dass eine Datenmenge, unabhängig davon, wo sie gespeichert ist, identisch ist.

Schließlich ermöglicht eine ständig wachsende aktive Nutzercommunity Peer-to-Peer-Sharing von Inhalten. Entwickler hochladen und pin Inhalte auf IPFS, während Filecoin oder Crust Storage Provider helfen, eine dauerhafte Speicherung dieser Inhalte zu gewährleisten.


Mit dem IPFS-basierten Speicher kannst du die CID für deinen Inhalt speichern, anstatt ganze Dateien auf die Polygon-Blockchain zu laden, was geringere Kosten, größere Dateigrößen und dauerhafte Speicherung zur Folge hat. Für weitere Details verweise [IPFS Docs](https://docs.ipfs.io/).

### Beispielprojekte {#example-projects}

1. Tutorial in scaffold-eth [zeigt,](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example) wie man eine NFT auf Polygon mit IPFS prägt.

2. Erstelle eine vollständige Stack web3 App mit Next.js, Polygon, Solidity, The Graph, IPFS und Hardhat - [Link](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)
