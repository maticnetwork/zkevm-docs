---
id: quicknode
title: Bereitstellung eines Smart Contract mit QuickNode
sidebar_label: Using QuickNode
description:  Smarte Contracts auf Polygon mit Brownie und Quicknode. bereitstellen.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Übersicht {#overview}

Python ist eine der vielseitigsten Programmiersprachen; von Forschern, die ihre Testmodelle über Entwickler, die sie in schweren Produktionsumgebungen verwenden, hat es Anwendungsfälle in jedem möglichen technischen Bereich.

In diesem Tutorial wirst du erfahren, wie du [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) Framework zum Schreiben und Bereitstellen eines Smart Contracts nutzt, indem du [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) testnet Knoten für Polygon nutzst.

:::tip

Um das Quicknode-Team zu kontaktieren, sende ihm eine Nachricht oder tagge es auf Twitter [@QuickNode](https://twitter.com/QuickNode).

:::

## Voraussetzungen {#prerequisites}

- Python3 installiert
- Ein Polygon Knoten
- Code Editor
- Befehlszeilenschnittstelle

## Was werden wir hier tun: {#what-you-will-do}

1. Brownie einrichten
2. Zugriff auf Quicknode-Testknoten erhalten
3. Einen Smart-Contract erstellen und bereitstellen
4. Überprüfe die bereitgestellten Vertragsdaten

## Was ist Brownie? {#what-is-brownie}

Die Entwicklung von Smart Contracts wird von JavaScript-basierten Bibliotheken wie [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/) und [Hardhat](https://hardhat.org/) dominiert. Python ist eine vielseitige, highly Sprache und kann auch für Smart Contracts / Web3 Development verwendet werden; [web3.py](https://web3py.readthedocs.io/en/stable/) ist eine überzeugende Python-Bibliothek, die Web3 Anforderungen erfüllt. Brownie Framework ist auf `web3.py`aufgebaut.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) ist ein Python-basiertes Framework zur Entwicklung und zum Testen von Smart Contracts. Brownie unterstützt sowohl Solidity- als auch Vyper-Vertrage und bietet sogar Vertragstests über [Pytest](https://github.com/pytest-dev/pytest) an.

Um die Erstellung und Bereitstellung eines Smart Contracts mit Brownie zu demonstrieren, verwenden wir [Brownie-mixes](https://github.com/brownie-mix), also Projektvorlagen. Genauer gesagt, verwenden wir einen [Token Mix](https://github.com/brownie-mix/token-mix), der eine Vorlage für eine ERC-20-Implementierung ist.

## Abhängigkeiten installieren {#install-dependencies}

Brownie ist auf python3 aufgebaut, also benötigen wir sie für die Arbeit mit Brownie. Lassen Sie uns prüfen, ob wir python3 auf unserem System installiert haben. Geben Sie dazu Folgendes in Ihr Befehlszeilen-Tool ein:

```bash
python3 -V
```

Jetzt siehst du die installierte Version von python3. Falls es nicht installiert ist, lade es von der offiziellen [python-Website](https://www.python.org/downloads/) herunter und installiere es.

Erstellen wir ein Projektverzeichnis, bevor wir Brownie installieren, und machen wir dieses Projektverzeichnis zu unserem aktuellen Arbeitsverzeichnis:

```bash
mkdir brownieDemo
cd brownieDemo
```

Da du jetzt python3 in deinem System installiert hast, installieren wir Brownie mit pip, dem Paketmanager von Python. Pip ist im Prinzip, was npm für JavaScript ist. Gib Folgendes in deiner Befehlszeile ein:

```bash
pip3 install eth-brownie
```

:::tip

Wenn die Installation fehlschlägt, kannst du stattdessen den folgenden Befehl verwenden:`sudo pip3 install eth-brownie`

:::

Um zu überprüfen, ob Brownie richtig installiert wurde, gib deine Befehlszeile `brownie`ein und es sollte die folgende Ausgabe geben:

![img](/img/quicknode/brownie-commands.png)

Um den Token-Mix zu erhalten, gib einfach Folgendes in deiner Befehlszeile ein:

```
brownie bake token
```

Dies wird ein neues Verzeichnis `token/`in unserem Verzeichnis `brownieDemo`erstellen.

### Dateistruktur {#file-structure}

Navigiere zuerst zum `token`Verzeichnis:

```bash
cd token
```

Öffne nun das `token`Verzeichnis in deinem Texteditor. Unter dem `contracts/`Ordner findest du , `Token.sol`der unser Hauptvertrag ist. Du kannst deine eigenen Verträge schreiben oder die Datei `Token.sol`ändern.

Unter dem `scripts/`Ordner findest du `token.py`Python-Skript. Dieses Skript wird verwendet, um den Vertrag zu implementieren, und Änderungen werden auf der Grundlage von Verträgen benötigt.

![img](/img/quicknode/token-sol.png)

Der Vertrag ist ein ERC-20-Vertrag. Mehr über die ERC-20-Standards und -Contracts erfahren Sie in diesem [Leitfaden](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token).

## Starte deinen Polygon Knoten {#booting-your-polygon-node}

QuickNode verfügt über ein globales Netzwerk von Polygon Mainnet und Mumbai Testnet-Knoten. Sie führen auch einen kostenlosen [öffentlichen Polygon RPC](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) aus, aber wenn du die Rate begrenzt erhältst, kannst du dich für einen [kostenlosen Testknoten von QuickNode anmelden](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

![img](/img/quicknode/http_URL.png)

Kopiere die **HTTP-URL**, die später im Tutorial nützlich sein wird.

## Network und Account {#network-and-account-setup}

Wir müssen unseren QuickNode-Endpunkt mit Brownie einrichten. Geben Sie dazu Folgendes in Ihrer Befehlszeile ein:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Ersetzen Sie `YOUR_QUICKNODE_URL`mit der **Mumbai Testnet HTTP** URL, die wir gerade beim Booten unseres Polygon-Knotens erhalten haben.

Im oben stehenden Befehl ist `Ethereum` der Name der Umgebung und `matic_mumbai` ist der benutzerdefinierte Name des Netzwerks. Du kannst deinem benutzerdefinierten Netzwerk jeden beliebigen Namen geben.

Das Nächste, was wir hier tun müssen, ist, eine neue Wallet mit Brownie zu erstellen, um dies zu tun, das Folgendes in deiner Befehlszeile eingeben:

```
brownie accounts generate testac
```

Du wirst aufgefordert, ein Passwort für dein Konto einzurichten! Nach Abschluss der Schritte generiert dies ein Konto zusammen mit einem mnemonic Phrase und speichert es offline. Der Name `testac`ist der Name für unser Konto (Du kannst jeden Namen auswählen, den du magst).

![img](/img/quicknode/new-account.png)

:::note

Mnemonic Phrasen können verwendet werden, um ein Konto wiederherzustellen oder das Konto in andere [<ins>nicht verwahrende Wallets</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode) zu importieren. Das Konto, den du im oben stehenden Bild siehst, wurde nur für diesen Leitfaden erstellt.

:::

Kopiere die Kontoadresse, damit wir einen Test MATIC erhalten können, der zur Bereitstellung unseres Vertrags erforderlich ist.

## Erhalten von Testnet MATIC {#getting-testnet-matic}

Wir werden einige Tests MATIC Token benötigen, um für Gasgebühren zu bezahlen, um unseren Smart Contracts bereitzustellen.

Kopiere die Adresse deines Kontos, das wir in diesem Tutorial erstellt haben, füge es in das Adressfeld von [Polygon Wasserhahn](https://faucet.polygon.technology/) ein und klicke auf **Senden**. Der Faucet sendet dir 0,2 Test-MATIC.

![img](/img/quicknode/faucet.png)

## Bereitstellung deines Smart Contract {#deploying-your-smart-contract}

Bevor du den Vertrag bereitstellst, musst du ihn zusammenstellen, indem du Folgendes erstellst:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

Öffne nun den `scripts/token.py`in deinem Texteditor und nimm die folgenden Änderungen vor:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info Erklärung

Mit dem oben genannten Code haben wir `testac`Konto importiert, das wir zuvor erstellt haben, und in Variable `acct`gespeichert. In der nächsten Zeile haben wir außerdem `'from':`bearbeitet, um Daten von der Variablen zu `acct`empfangen.

:::

Schließlich werden wir unseren Smart Contract bereitstellen:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`ist der Name des benutzerdefinierten Netzwerks, das wir zuvor erstellt haben. Die Aufforderung fragt dich nach dem **Passwort,** das wir zuvor gesetzt haben, während du das Konto machst.

Nachdem du den oben stehenden Befehl ausgeführt hast, musst du den Transaktions-Hash abrufen und Brownie warten darauf, dass die Transaktion bestätigt wird. Sobald die Transaktion bestätigt wurde, liefert sie die Adresse, unter der unser Vertrag am Polygon Mumbai-Testnet bereitgestellt wird.

![img](/img/quicknode/brownie-run.png)

Den bereitgestellten Vertrag findest du, indem du die Vertragsadresse unter [Polygonscan Mumbai](https://mumbai.polygonscan.com/) kopierst und einfügst.

![img](/img/quicknode/polygonscan.png)

## Testen des Vertrags {#testing-the-contract}

Brownie bietet auch die Möglichkeit, die Funktionen von Smart Contracts zu testen. Er nutzt das `pytest`-Framework, um ganz einfach Unit-Tests zu generieren. Mehr Informationen über das Schreiben von Tests auf Brownie findest du [in seiner Dokumentation](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#).

**So werden Verträge bei Polygon mit Brownie und QuickNode bereitgestellt.**

QuickNode, genau wie Polygon, hatte schon immer einen [education-first](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) der developer [Dokumente](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [Tutorial-Videos](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) und eine [Community von](https://discord.gg/DkdgEqE) Web3-Entwicklern bereitstellt, die sich gegenseitig helfen wollen.
