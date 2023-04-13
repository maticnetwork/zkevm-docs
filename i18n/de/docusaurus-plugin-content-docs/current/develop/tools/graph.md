---
id: graph
title: Einrichtung eines gehosteten Projekts mit The Graph und Polygon
description: Einrichten eines gehosteten Projekts mit Graph und Polygon.
keywords:
  - graph
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Graph, ein dezentrales Protokoll zur Indizierung und Abfrage von Chain-Daten unterstützt die Polygon-Chain. Daten, die durch Subgraphen definiert sind, lassen sich leicht abfragen und erkunden. Subgraphen können lokal erstellt werden oder einen kostenlosen gehosteten Explorer für die Indizierung und Datenanzeige verwenden.

> Hinweis: Siehe https://thegraph.com/docs/quick-start für weitere Infos, lokale Installation und mehr. Die Dokumente enthalten ein Beispiel für die Funktionsweise der Subgraphen. Das vorliegende Video bietet eine schnelle Einführung.

## Schritte {#steps}

1. Gehe zum Graph Explorer (https://thegraph.com/explorer/) und richte ein Konto ein. Dazu brauchst du ein GitHub-Konto für die Authentifizierung.

2. Gehe zu deinem Dashboard und klicke auf „Subgraph hinzufügen“. Lege den Name, Konto und Untertitel des Subgraphs fest und aktualisiere bei Bedarf das Bild und andere Informationen (evtl. auch später).

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. Installiere Graph CLI auf deinem Rechner (mithilfe von npm oder Yarn)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. Der folgende Befehl erstellt einen Subgraph, der alle Ereignisse eines bestehenden Contracts indexiert. Er versucht, Contract-ABI aus BlockScout zu holen und fällt zurück auf die Anforderung eines lokalen Dateipfads. Wenn eines der optionalen Argumente fehlt, wirst du durch ein interaktives Formular geführt.

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Polygon” for Matic mainnet and “Mumbai” for Polygon Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on Polygon: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> Hinweis: Weitere Informationen findest du unter https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. Authentifikation mit dem gehosteten Dienst

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
Du kannst den Zugriffstoken finden, wenn du zu deinem Dashboard auf der Graph-Webseite gehst.

6. cd in das von dir erstellte Verzeichnis und beginne mit dem Definieren des Subgraphs. Informationen zum Erstellen eines Subgraphs sind in den Graph Docs hier verfügbar. https://thegraph.com/docs/define-a-subgraph

7. Wenn du bereit bist, stelle deinen Subgraph bereit. Du kannst ihn immer nach Bedarf testen und neu bereitstellen.

> Wenn dein zuvor bereitgestellter Subgraph noch im Status Syncing ist, wird er sofort durch die neu bereitgestellte Version ersetzt. Wenn der zuvor bereitgestellte Subgraph bereits vollständig synchronisiert ist, markiert Graph Node die neu bereitgestellte Version als Pending Version, synchronisiert sie im Hintergrund und ersetzt nur die derzeit bereitgestellte Version durch die neue Version - sobald die Synchronisierung der neuen Version abgeschlossen ist. Dadurch wird sichergestellt, dass du während der Synchronisierung der neuen Version einen Subgraph hast, mit dem du arbeiten kannst.

```bash
yarn deploy
```

Dein Subgraph wird bereitgestellt und auf ihn kann von deinem Dashboard aus zugegriffen werden.

Hier erfährst du alles über die Abfrage des Subgraphs: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

Falls dein Subgraph öffentlich sein soll, rufe ihn von deinem Dashboard aus ab und klicke auf die Edit-Taste. Unten auf der Edit-Seite siehst du dann den Slider.
