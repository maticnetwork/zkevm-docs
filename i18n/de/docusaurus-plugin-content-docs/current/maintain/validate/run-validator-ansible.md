---
id: run-validator-ansible
title: Führe den Prüferknoten mit Ansible aus
sidebar_label: Using Ansible
description: Verwenden Sie Ansible, um deinen Prüferknoten auf Polygon einzurichten.
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip

Die Schritte in dieser Anleitung beinhalten das Warten auf eine vollständige Synchronisierung der Dienste **Heimdall** und **Bor**.
Dieser Vorgang dauert mehrere Tage. Alternativ kannst du einen gewarteten Snapshot verwenden, wodurch die Synchronisierungszeit auf wenige Stunden verkürzt wird. Ausführliche Anweisungen findest du unter [<ins>Snapshot-Anweisungen für Heimdall und Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Für Snapshot Download-Links findest du unter [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/).
:::

Dieser Abschnitt gibt dir eine Anleitung zum Starten und Ausführen des Prüfknotens über ein Ansible-Playbook.

Für die Systemanforderungen siehe [Systemanforderungen für Prüfknoten](validator-node-system-requirements.md).

Wenn du den Prüfknoten aus den Binärdateien starten und ausführen möchtest, siehe [Einen Prüfknoten aus Binärdateien ausführen](run-validator-binaries.md).

:::caution

Es gibt nur wenige Möglichkeiten, neue Validatoren zu akzeptieren. Neue Prüfer können sich nur dem aktiven Set anschließen, wenn ein bereits aktiver Prüfer ausschaltet.

:::

## Voraussetzungen {#prerequisites}

* Drei Rechner – ein lokaler Rechner, auf dem du das Ansible-Playbook ausführst; zwei Remote-Rechner – ein [Sentry](/docs/maintain/glossary.md#sentry)- und ein [Validator](/docs/maintain/glossary.md#validator)-Rechner.
* Auf dem lokalen Rechner ist [Ansible](https://www.ansible.com/) installiert.
* Auf dem lokalen Rechner ist [Python 3.x](https://www.python.org/downloads/) installiert.
* Stelle sicher, dass auf den Remote-Rechnern Go *nicht* installiert ist.
* Der öffentliche SSH-Schlüssel deines lokalen Rechners befindet sich auf den Remote-Rechnern, damit Ansible sich mit ihnen verbinden kann.
* Wir haben Bloxroute als Relaisnetzwerk verfügbar. Wenn du ein Gateway benötigst, um als dein Trusted Peer hinzugefügt zu werden, kontaktiere bitte **@validator-support-team** in [Polygon Discord](https://discord.com/invite/0xPolygon) > POS VALIDATORS | FULL NODE PROVIDERS | PARTNERS > bloxroute.

## Übersicht {#overview}

Gehe wie folgt vor, um einen Prüfknoten zum Laufen zu bringen:

1. Bereite die drei Rechner vor.
1. Richte einen Sentry-Knoten über Ansible ein.
1. Richte einen Prüfknoten über Ansible ein.
1. Konfiguriere den Sentry-Knoten.
1. Starte den Sentry-Knoten.
1. Konfiguriere den Prüfknoten.
1. Lege die Eigentümer- und Signierkeys fest.
1. Starte den Prüfknoten.
1. Überprüfe die Knotengesundheit mit der Community.

:::note

Du musst dich **genau an die beschriebene Reihenfolge der Aktionen** halten, sonst treten Probleme auf.

Zum Beispiel muss ein Sentry-Knoten immer vor dem Prüfknoten eingerichtet werden.

:::

## Den Sentry-Knoten einrichten {#set-up-the-sentry-node}

Klone auf deinem lokalen Rechner das [Repository node-ansible](https://github.com/maticnetwork/node-ansible):

```sh
git clone https://github.com/maticnetwork/node-ansible
```

Wechsle zum geklonten Repository:

```sh
cd node-ansible
```

Füge die IP-Adressen der Remote-Rechner, die als Sentry-Knoten und Prüfknoten fungieren sollen, in die `inventory.yml`-Datei ein.

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

Beispiel:

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

Überprüfe, ob der Remote-Sentry-Rechner erreichbar ist.  Führe auf dem lokalen Rechner Folgendes aus:

```sh
$ ansible sentry -m ping
```

Du solltest folgende Ausgabe erhalten:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Führe einen Testlauf für die Einrichtung des Sentry-Knotens durch:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

Die Ausgabe wird wie folgt sein:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Führe die Einrichtung des Sentry-Knotens mit sudo-Rechten durch:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

Sobald die Einrichtung abgeschlossen ist, wird auf dem Terminal eine Meldung über den Abschluss angezeigt.

:::note

Wenn du auf ein Problem stößt und noch einmal von vorne anfangen möchtest, führe Folgendes aus:

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## Den Prüfknoten einrichten {#set-up-the-validator-node}

Nun hast du den Sentry-Knoten eingerichtet.

Auf deinem lokalen Rechner hast du auch das Ansible-Playbook eingerichtet, um die Einrichtung des Prüfknotens durchzuführen.

Überprüfe, ob der entfernte Validator-Rechner erreichbar ist. Auf der lokalen Maschine `ansible validator -m ping`ausführen.

Du solltest folgende Ausgabe erhalten:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Führe einen Testlauf für die Einrichtung des Prüfknotens durch:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

Du solltest folgende Ausgabe erhalten:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Führe die Einrichtung des Prüfknotens mit sudo-Rechten durch:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

Sobald die Einrichtung abgeschlossen ist, wird auf dem Terminal eine Meldung über den Abschluss angezeigt.

:::note

Wenn du auf ein Problem stößt und noch einmal von vorne anfangen möchtest, führe Folgendes aus:

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## Konfiguriere den Sentry-Knoten {#configure-the-sentry-node}

Melde dich am entfernten Sentry-Rechner an.

### Konfiguriere den Heimdall-Dienst {#configure-the-heimdall-service}

Öffne `config.toml` zum Bearbeiten von `vi ~/.heimdalld/config/config.toml`.

Ändere Folgendes:

* `moniker` — beliebiger Name. Beispiel: `moniker = "my-full-node"`.
* `seeds` — die Seed-Knotenadressen, die aus einer Knoten-ID, einer IP-Adresse und einem Port bestehen.

  Verwende die folgenden Werte:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — Setze den Wert auf `true`, um den Peer-to-Peer-Austausch zu aktivieren. Beispiel: `pex = true`.
* `private_peer_ids` — die Heimdall-Knoten-ID, die auf dem Validator-Rechner eingerichtet ist.

  So kannst du die Heimdall-Knoten-ID auf dem Validator-Rechner empfangen:

  1. Melde dich am Validator-Rechner an.
  1. Führe `heimdalld tendermint show-node-id` aus.

  Beispiel: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` – Setze den Wert auf `true`, um die Prometheus-Metriken zu aktivieren. Beispiel: `prometheus = true`.
* `max_open_connections` – Setze den Wert auf `100`. Beispiel: `max_open_connections = 100`.

Speichern der Änderungen in `config.toml`.

### Konfiguriere den Bor-Dienst {#configure-the-bor-service}

Öffne `vi ~/node/bor/start.sh` für die Bearbeitung.

Füge in `start.sh` die Boot-Knotenadressen hinzu, die aus einer Knoten-ID, einer IP-Adresse und einem Port bestehen, indem du die folgende Zeile am Ende anfügst:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Speichere die Änderungen in `start.sh`.

Öffne `vi ~/.bor/data/bor/static-nodes.json` für die Bearbeitung.

Ändere in `static-nodes.json` Folgendes:

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` – die Knoten-ID und die IP-Adresse von Bor, die auf dem Validator-Rechner eingerichtet sind.

  So empfängst du die Knoten-ID von Bor auf dem Validator-Rechner:

  1. Melde dich am Validator-Rechner an.
  1. Führe `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress` aus.

  Beispiel: `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`.

Speichere die Änderungen in `static-nodes.json`.

### Konfiguriere Firewall {#configure-firewall}

Auf dem Sentry-Rechner müssen die folgenden Ports für die Umgebung `0.0.0.0/0` offen sein:

* 26656– Dein Heimdall-Dienst verbindet deinen Knoten mit anderen Knoten, die den Heimdall-Dienst nutzen.

* 30303 – Dein Bor-Dienst verbindet deinen Knoten mit anderen Knoten, die den Bor-Dienst nutzen.

* 22 – Damit der Validator in der Lage ist, von überall aus ssh vorzunehmen.

:::note

Wenn er jedoch eine VPN-Verbindung nutzt, kann er eingehende ssh-Verbindungen nur von der VPN-IP-Adresse aus zulassen.

:::

## Den Sentry-Knoten starten {#start-the-sentry-node}

Starte zuerst den Heimdall-Dienst. Sobald der Heimdall-Dienst synchronisiert ist, starte den Bor-Dienst.

:::note

Der Heimdall-Dienst braucht mehrere Tage, um vollständig von Grund auf neu zu synchronisieren.

Alternativ kannst du einen gewarteten Snapshot verwenden, wodurch die Synchronisierungszeit auf wenige Stunden verkürzt wird. Ausführliche Anweisungen findest du unter [<ins>Snapshot-Anleitungen für Heimdall und Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Links zum Herunterladen von Snapshots findest du unter [Snapshots von Polygon Chains](https://snapshot.polygon.technology/).

:::

### Starte den Heimdall-Dienst {#start-the-heimdall-service}

Die neueste Version, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), enthält einige Verbesserungen wie:
1. Einschränkung der Datengröße in der state sync txs auf:
    * **30 kB** bei Darstellung in **Byte**
    * **60 kB** bei Darstellung als **String**.
2. Erhöhung der **Verzögerungszeit** zwischen den Vertragsevents verschiedener Validatoren, um sicherzustellen, dass der Speicherpool im Falle einer Event-Häufung nicht zu schnell gefüllt wird, was den Fortschritt der Chain behindern könnte.

Im folgenden Beispiel wird gezeigt, inwiefern die Datengröße eingeschränkt ist:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Starte den Heimdall-Dienst:

```sh
sudo service heimdalld start
```

Starte den Heimdall-Rest-Server:

```sh
sudo service heimdalld-rest-server start
```

Überprüfe die Heimdall-Dienstprotokolle:

```sh
journalctl -u heimdalld.service -f
```

:::note

In den Protokollen siehst du möglicherweise die folgenden Fehlermeldungen:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Diese signalisieren, dass einer der Knoten im Netzwerk eine Verbindung zu deinem Knoten abgelehnt hat. Du brauchst bei diesen Fehlern nichts zu unternehmen. Warte, bis dein Knoten weitere Knoten im Netzwerk gecrawlt hat.

:::

Überprüfen der Heimdall-Rest-Server-Protokolle:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Überprüfen des Synchronisierungsstatus von Heimdall:

```sh
curl localhost:26657/status
```

In der Ausgabe ist der `catching_up`-Wert:

* `true` — der Heimdall-Dienst synchronisiert gerade.
* `false` — der Heimdall-Dienst ist vollständig synchronisiert.

Warte, bis der Heimdall-Dienst vollständig synchronisiert ist.

### Starte den Bor-Dienst {#start-the-bor-service}

Sobald der Heimdall-Dienst vollständig synchronisiert ist, starte den Bor-Dienst.

Starten des Bor-Dienstes:

```sh
sudo service bor start
```

Überprüfe die Bor-Dienstprotokolle:

```sh
journalctl -u bor.service -f
```

## Konfiguriere den Prüfknoten {#configure-the-validator-node}

:::note

Um diesen Abschnitt abzuschließen, musst du einen RPC-Endpunkt deines vollständig synchronisierten Ethereum Mainnet-Knotens bereithalten.

:::

### Konfiguriere den Heimdall-Dienst {#configure-the-heimdall-service-1}

Melde dich bei dem Remote-Validator-Rechner an.

Öffne `config.toml` zum Bearbeiten von `vi ~/.heimdalld/config/config.toml`.

Ändere Folgendes:

* `moniker` — beliebiger Name. Beispiel: `moniker = "my-validator-node"`.
* `pex` — Setze den Wert auf `false`, um den Peer-to-Peer-Austausch zu deaktivieren. Beispiel: `pex = false`.
* `private_peer_ids` — Kommentiere den Wert aus, um ihn zu deaktivieren. Beispiel: `# private_peer_ids = ""`.


  So empfängst du die Heimdall-Knoten-ID auf dem Sentry-Rechner:

  1. Melde dich beim Sentry-Rechner an.
  1. Führe `heimdalld tendermint show-node-id` aus.

  Beispiel: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` – Setze den Wert auf `true`, um die Prometheus-Metriken zu aktivieren. Beispiel: `prometheus = true`.

Speichere die Änderungen in `config.toml`.

Öffne `vi ~/.heimdalld/config/heimdall-config.toml` für die Bearbeitung.

Ändere in `heimdall-config.toml` Folgendes:

* `eth_rpc_url` – einen RPC-Endpunkt in einen vollständig synchronisierten Ethereum Mainnet-Knoten, d. h. Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Beispiel: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


Speichere die Änderungen in `heimdall-config.toml`.

### Konfiguriere den Bor-Dienst {#configure-the-bor-service-1}

Öffne `vi ~/.bor/data/bor/static-nodes.json` für die Bearbeitung.

Ändere in `static-nodes.json` Folgendes:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` – die Knoten-ID und die IP-Adresse von Bor auf dem Sentry-Rechner eingerichtet.

  So empfängst du die Bor-Knoten-ID auf dem Sentry-Rechner:

  1. Melde dich auf dem Sentry-Rechner an.
  1. Führe `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress` aus.

  Beispiel: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Speichere die Änderungen in `static-nodes.json`.

## Den Eigentümer- und Signierkey festlegen {#set-the-owner-and-signer-key}

Auf Polygon solltest du unterschiedliche Eigentümer- und Signierkeys verwenden.

* Signierer – die Adresse, die die [Checkpoint-Transaktionen](../glossary#checkpoint-transaction) unterschreibt. Es wird empfohlen, mindestens 1 ETH auf der Signieradresse zu behalten.
* Eigentümer — die Adresse, die die Staking-Transaktionen ausführt. Es wird empfohlen, die MATIC-Token auf der Eigentümeradresse zu behalten.

### Generiere einen Heimdall-Private Key {#generate-a-heimdall-private-key}

Du musst nur auf dem Validator-Rechner einen Private Key für Heimdall generieren. **Generiere keinen Private Key für Heimdall auf dem Sentry-Rechner.**

Um den privaten Schlüssel zu generieren, führen Sie Folgendes aus:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — der Private Key deines Ethereum Wallets

:::

Dies wird Folgendes generieren: `priv_validator_key.json`Verschiebe die generierte JSON-Datei in das Heimdall-Konfigurationsverzeichnis:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Generiere eine Bor Keystore-Datei {#generate-a-bor-keystore-file}

Du musst nur auf dem Validator-Rechner eine Bor Keystore-Datei generieren. **Generiere keine Bor Keystore-Datei auf dem Sentry-Rechner.**

Um den privaten Schlüssel zu generieren, führen Sie Folgendes aus:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

Sie Ihren ETHEREUM_PRIVATE_KEY – den privaten Schlüssel Ihres Ethereum-Wallet haben.

:::

Wenn Sie aufgefordert werden, richten Sie ein Passwort für die Keystore-Datei ein.

Dadurch wird eine `UTC-<time>-<address>` Keystore-Datei generiert.

Verschiebe die generierte Keystore-Datei in das Bor-Konfigurationsverzeichnis:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Füge hinzu.`password.txt`

Vergewissere dich, dass du eine `password.txt`-Datei erstellst, füge dann das Bor Keystore-Dateipasswort rechts in der `~/.bor/password.txt`-Datei hinzu.

### Füge deine Ethereum-Adresse hinzu {#add-your-ethereum-address}

Öffne `vi /etc/matic/metadata` für die Bearbeitung.

Füge in `metadata` deine Ethereum-Adresse hinzu. Beispiel: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Speichern der Änderungen in `metadata`.

## Den Prüfknoten starten {#start-the-validator-node}

An diesem Punkt besteht folgende Voraussetzung:

* Der Heimdall-Dienst auf dem Sentry-Rechner wurde vollständig synchronisiert und wird ausgeführt.
* Der Bor-Dienst wird auf dem Sentry-Rechner ausgeführt.
* Der Heimdall-Dienst und der Bor-Dienst sind auf dem Validator-Rechner konfiguriert.
* Deine Eigentümer- und Signierkeys sind konfiguriert.

### Starte den Heimdall-Dienst {#start-the-heimdall-service-1}

Du startest nun den Heimdall-Dienst auf dem Validator-Rechner. Sobald der Heimdall-Dienst synchronisiert ist, startest du den Bor-Dienst auf dem Validator-Rechner.

Starten des Heimdall-Dienstes:

```sh
sudo service heimdalld start
```

Starte den Heimdall-Rest-Server:

```sh
sudo service heimdalld-rest-server start
```

Starte die Heimdall-Bridge:

```sh
sudo service heimdalld-bridge start
```

Überprüfe die Heimdall-Dienstprotokolle:

```sh
journalctl -u heimdalld.service -f
```

Überprüfe die Heimdall-Rest-Server-Protokolle:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Überprüfe die Protokolle der Heimdall-Bridge:

```sh
journalctl -u heimdalld-bridge.service -f
```

Überprüfe den Synchronisierungsstatus von Heimdall:

```sh
curl localhost:26657/status
```

In der Ausgabe ist der `catching_up`-Wert:

* `true` — der Heimdall-Dienst synchronisiert gerade.
* `false` — der Heimdall-Dienst ist vollständig synchronisiert.

Warte, bis der Heimdall-Dienst vollständig synchronisiert ist.

### Starte den Bor-Dienst {#start-the-bor-service-1}

Sobald der Heimdall-Dienst auf dem Validator-Rechner vollständig synchronisiert ist, startest du den Bor-Dienst auf dem Validator-Rechner.

Starten des Bor-Dienstes:

```sh
sudo service bor start
```

Überprüfe die Bor-Dienstprotokolle:

```sh
journalctl -u bor.service -f
```

## Den Knotenstatus in der Community überprüfen {#check-node-health-with-the-community}

Jetzt, wo deine Sentry- und Validator-Knoten synchronisiert sind und ausgeführt werden, gehe zu [Discord](https://discord.com/invite/0xPolygon) und bitte die Community, deine Knoten auf ihre Gesundheit zu überprüfen.

## Mit dem Staking fortfahren {#proceed-to-staking}

Jetzt, wo deine Sentry- und Validator-Knoten auf ihre Gesundheit überprüft wurden, fahre mit dem [Staking](/docs/maintain/validator/core-components/staking) fort.
