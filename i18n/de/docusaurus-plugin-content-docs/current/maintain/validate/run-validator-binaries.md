---
id: run-validator-binaries
title: Führe den Validator Node von Binaries aus
sidebar_label: Using Binaries
description: Verwenden Sie Binärdateien, um deinen validator einzurichten.
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
slug: run-validator-binaries
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
Schritte in diesem Leitfaden beinhalten das Warten auf die H**eimdall **und die B**or **Services und die vollständige Synchronisierung zu sein. Alternativ können Sie einen gewarteten Snapshot verwenden, wodurch die Synchronisierungszeit auf wenige Stunden verkürzt wird.
Ausführliche Anweisungen finden Sie unter [<ins>Snapshot Instructions für Heimdall und Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Für Snapshot Download-Links findest du unter [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/).

:::

Diese Anleitung führt Sie durch die Ausführung eines Polygon-Validatorknotens von Binaries.

Für Systemanforderungen folge den Leitfaden für den [Validator Node System Requirements](validator-node-system-requirements.md) an.

Wenn du den Prüfknoten über Ansible starten und ausführen möchtest, sieh unter [Führen eines Prüfknoten mit Ansible aus](run-validator-ansible.md).

:::caution

Es gibt nur wenige Möglichkeiten, neue Validatoren zu akzeptieren. Neue Prüfer können sich nur dem aktiven Set anschließen, wenn ein bereits aktiver Prüfer ausschaltet.

:::

## Voraussetzungen {#prerequisites}

* Zwei Maschinen – ein [Sentry](/docs/maintain/glossary.md#sentry) und ein [Validator](/docs/maintain/glossary.md#validator).
* `build-essential` sowohl auf dem Sentry- als auch auf dem Validatorrechner installiert.

Zum Installieren:

  ```sh
  sudo apt-get install build-essential
  ```

* Go 1.18 ist sowohl auf dem Sentry- als auch auf dem Validatorrechner installiert.

Zum Installieren:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQ installiert auf dem Sentry und den validator

Hier sind die Befehle zur Installation von RabbitMQ:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

Weitere Informationen zum Herunterladen und Installieren von RabbitMQ [<ins>findest du hier.</ins>](https://www.rabbitmq.com/download.html)

:::

## Übersicht {#overview}

Um zu einem ausgeführten Validatorknoten zu gelangen, führen Sie in dieser **exakten Schrittabfolge** Folgendes aus:

> Wenn diese Schritte nicht in der richtigen Reihenfolge durchgeführt werden, kommt es zu Konfigurationsproblemen.
>  Es ist wichtig zu beachten, dass ein Sentryknoten immer vor dem Validatorknoten eingerichtet werden muss.

1. Bereiten Sie zwei Rechner vor, einen für den Sentryknoten und einen für den Validatorknoten.
2. Installieren Sie die Binaries für Heimdall und Bor auf dem Sentry- und Validatorrechner.
3. Richten Sie die Dienstdateien für Heimdall- und Bor auf dem Sentry- und Validatorrechner ein.
4. Richten Sie die Dienste von Heimdall- und Bor auf dem Sentry- und Validatorrechner ein.
5. Konfigurieren Sie den Sentryknoten.
6. Starte den Sentry-Knoten.
7. Konfiguriere den Prüfknoten.
8. Lege die Eigentümer- und Signierkeys fest.
9. Starte den Prüfknoten.
10. Überprüfen Sie den Knotenstatus in der Community.

## Installieren der Binaries {#installing-the-binaries}

Installieren Sie die Binaries für beide auf dem Sentry- und Validatorrechner.

### Installieren von Heimdall {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) ist der Proof-of-Stake Verifier-Layer,
verantwortlich für die Überprüfung der Darstellung der Plasmablöcke auf dem Ethereum Mainnet.

Die neueste Version, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), enthält einige Verbesserungen wie:
1. Einschränkung der Datengröße in der state sync txs auf:
    * **30 kB** bei Darstellung in **Byte**
    * **60 kB** bei Darstellung als **String**.
2. Erhöhung der **Verzögerungszeit** zwischen den Vertragsevents verschiedener Validatoren, um sicherzustellen, dass der Speicherpool im Falle einer Event-Häufung nicht zu schnell gefüllt wird, was den Fortschritt der Chain behindern könnte.

Im folgenden Beispiel wird gezeigt, wie die Datengröße eingeschränkt ist:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Klonen der [Heimdall-Repository](https://github.com/maticnetwork/heimdall/):

```sh
git clone https://github.com/maticnetwork/heimdall
```

Navigieren Sie zur korrekten [Releaseversion](https://github.com/maticnetwork/heimdall/releases):

```sh
git checkout RELEASE_TAG
```

wo `RELEASE_TAG` der Tag der Releaseversion, die Sie installieren, ist.

Zum Beispiel:

```sh
git checkout v0.3.0
```

Sobald Sie auf der korrekten Version sind, installieren Sie Heimdall:

```sh
make install
source ~/.profile
```

Überprüfen Sie die Heimdall-Installation:

```sh
heimdalld version --long
```

:::note

Vor dem Fortfahren sollte Heimdall sowohl auf dem Sentry- als auch auf dem Validatorrechner installiert werden.

:::

### Installieren von Bor {#installing-bor}

[Bor](/docs/pos/bor) ist der Sidechain-Operator, der als block fungiert, der mit Heimdall synchronisiert, um Blockproduzenten und Verifizierer für jede [Span](/docs/maintain/glossary.md#span) und [Sprint](/docs/maintain/glossary.md#sprint) auszuwählen.

Klonen des [Bor-Repository](https://github.com/maticnetwork/bor):

```sh
git clone https://github.com/maticnetwork/bor
```

Navigieren Sie zur korrekten [Releaseversion](https://github.com/maticnetwork/bor/releases):

```sh
git checkout RELEASE_TAG
```

wo `RELEASE_TAG` der Tag der Releaseversion, die Sie installieren, ist.

Zum Beispiel:

```sh
git checkout v0.3.3
```

Installieren von Bor:

```sh
make bor-all
```

Symlinks erstellen:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Überprüfen der Bor-Installation:

```sh
bor version
```

:::note

Vor dem Fortfahren sollte Bor sowohl auf dem Sentry- als auch auf dem Validatorrechner installiert werden.

:::

## Einrichten von Knotendateien {#setting-up-node-files}

:::note

Knotendateien müssen sowohl auf dem Sentry- als auch auf dem Validatorrechner eingerichtet werden.

:::

### Abrufen des Start-Repositorys {#fetching-the-launch-repository}

Klonen des [Start-Reposytorys](https://github.com/maticnetwork/launch):

```sh
git clone https://github.com/maticnetwork/launch
```

### Einrichten des Startverzeichnisses {#setting-up-the-launch-directory}

#### Auf dem Sentry-Rechner {#on-the-sentry-machine}

Ein `node` Verzeichnis erstellen:

```sh
mkdir -p node
```

Kopieren der Dateien und Skripte aus dem `node` Verzeichnis  in das `launch` Verzeichnis:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### Auf dem Validatorrechner {#on-the-validator-machine}

Ein `node` Verzeichnis erstellen:

```sh
mkdir -p node
```

Kopieren der Dateien und Skripte aus dem `node` Verzeichnis  in das `launch` Verzeichnis:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### Einrichten der Netzwerkverzeichnisse {#setting-up-the-network-directories}

:::note

Diesen Abschnitt sowohl auf dem Sentry- als auch auf dem Validatorrechner ausführen.

:::

#### Einrichten von Heimdall {#setting-up-heimdall}

Wechseln zum `node` Verzeichnis:

```sh
cd ~/node/heimdall
```

Das Installationsskript ausführen:

```sh
bash setup.sh
```

#### Einrichten von Bor {#setting-up-bor}

Wechseln zum `node` Verzeichnis:

```sh
cd ~/node/bor
```

Das Installationsskript ausführen:

```sh
bash setup.sh
```

## Einrichten der Dienste {#setting-up-the-services}

:::note

Diesen Abschnitt sowohl auf dem Sentry- als auch auf dem Validatorrechner ausführen.

:::

Navigieren zum `node` Verzeichnis:

```sh
cd ~/node
```

Das Installationsskript ausführen:

```sh
bash service.sh
```

Kopieren der Dienstdateien in das Systemverzeichnis:

```sh
sudo cp *.service /etc/systemd/system/
```

## Konfigurieren des Sentryknotens {#configuring-the-sentry-node}

Melden Sie sich zunächst auf dem Remote-Sentry-Rechner an.

### Konfigurieren der Heimdall-Dienste {#configuring-the-heimdall-services}

Öffnen der Heimdall-Konfiguration für die Bearbeitung:

```sh
vi ~/.heimdalld/config/config.toml
```

Ändern der folgenden Parameter in `config.toml`:

* `moniker` – beliebiger Name. Beispiel: `moniker = "my-sentry-node"`.
* `seeds` — die Seed-Knotenadressen, die aus einer Knoten-ID, einer IP-Adresse und einem Port bestehen.

  Verwende die folgenden Werte:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — Setze den Wert auf `true`, um den Peer-to-Peer-Austausch zu aktivieren. Beispiel: `pex = true`.
* `private_peer_ids` — die Heimdall-Knoten-ID, die auf dem Validator-Rechner eingerichtet ist.

  Erhalten der Knoten-ID von Heimdall auf dem Validatorrechner:

  1. Melden Sie sich auf dem Validatorrechner an.
  2. Ausführen:
     ```sh
     heimdalld tendermint show-node-id
     ```

Beispiel: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` – Setze den Wert auf `true`, um die Prometheus-Metriken zu aktivieren. Beispiel: `prometheus = true`.
* `max_open_connections` – Setze den Wert auf `100`. Beispiel: `max_open_connections = 100`.

Speichern der Änderungen in `config.toml`.

### Konfigurieren des Bor Services {#configuring-the-bor-service}

Öffnen der Bor-Konfiguration für die Bearbeitung:

```sh
`vi ~/node/bor/start.sh`
```

Fügen Sie in `start.sh` die Boot-Knotenadressen hinzu, die aus einer Knoten-ID, einer IP-Adresse und einem Port bestehen, durch Hinzufügen der folgenden Zeile am Ende der Datei:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Speichern der Änderungen in `start.sh`.

### Konfigurieren einer Firewall {#configuring-a-firewall}

Auf dem Sentry-Rechner müssen die folgenden Ports für die Umgebung `0.0.0.0/0` offen sein:

* `26656` – Ihr Heimdall-Dienst wird Ihren Knoten mit anderen Knoten vom Heimdall-Dienst verbinden.

* `30303` – Ihr Bor-Dienst wird Ihren Knoten mit anderen Knoten vom Bor-Dienst verbinden.

* `22` – Damit der Validator in der Lage ist, von überall aus ssh vorzunehmen.

## Starten des Sentryknotens {#starting-the-sentry-node}

Starten Sie zuerst den Heimdall-Dienst. Sobald der Heimdall-Dienst synchronisiert ist, starten Sie den Bor-Dienst.

:::note

Wie bereits erwähnt, braucht der Heimdall-Dienst mehrere Tage, um sich vollständig von Grund auf neu zu synchronisieren.

Alternativ können Sie einen gewarteten Snapshot verwenden, wodurch die Synchronisierungszeit auf wenige Stunden verkürzt wird.
Ausführliche Anweisungen finden Sie unter [<ins>Snapshot Instructions für Heimdall und Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Links zum Herunterladen von Snapshots finden Sie unter [Polygon Chains Snapshots](https://snapshot.polygon.technology/).

:::

### Starten des Heimdall-Dienstes {#starting-the-heimdall-service}

Starten des Heimdall-Dienstes:

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

In den Protokollen sehen Sie möglicherweise die folgenden Fehler:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Diese Protokolle bedeuten, dass einer der Knoten im Netzwerk eine Verbindung zu Ihrem Knoten verweigert hat.
Warten Sie, bis Ihr Knoten mehr Knoten im Netzwerk erreicht; Sie müssen nichts tun,
um diese Fehler zu beheben.

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
* `false` – der Heimdall-Dienst ist vollständig synchronisiert.

Warten Sie, bis der Heimdall-Dienst vollständig synchronisiert ist.

### Starten des Bor-Dienstes {#starting-the-bor-service}

Sobald der Heimdall-Dienst synchronisiert ist, starten Sie den Bor-Dienst.

Starten des Bor-Dienstes:

```sh
sudo service bor start
```

Überprüfen der Bor-Dienstprotokolle:

```sh
journalctl -u bor.service -f
```

## Konfigurieren des Validatorknotens {#configuring-the-validator-node}

:::note

Um diesen Abschnitt zu vervollständigen, müssen Sie einen RPC-Endpunkt Ihres vollständig synchronisierten Ethereum-Mainnet- -Knoten bereit haben.

:::

### Konfigurieren des Heimdall-Dienstes {#configuring-the-heimdall-service}

Melden Sie sich auf dem Remote-Validatorrechner an.

Öffnen Sie `vi ~/.heimdalld/config/config.toml` für die Bearbeitung.

Ändern Sie in `config.toml` Folgendes:

* `moniker` – beliebiger Name. Beispiel: `moniker = "my-validator-node"`.
* `pex` — Setze den Wert auf `false`, um den Peer-to-Peer-Austausch zu deaktivieren. Beispiel: `pex = false`.
* `private_peer_ids` — Kommentiere den Wert aus, um ihn zu deaktivieren. Beispiel: `# private_peer_ids = ""`.

So erhalten Sie die Knoten-ID von Heimdall auf dem Sentryrechner:

  1. Melden Sie sich auf dem Sentryrechner an.
  1. Führen Sie `heimdalld tendermint show-node-id` aus.

Beispiel: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` – Setzen des Wertes auf `true`, um die Prometheus-Metriken zu aktivieren. Beispiel: `prometheus = true`.

Speichere die Änderungen in `config.toml`.

Öffne `vi ~/.heimdalld/config/heimdall-config.toml` für die Bearbeitung.

Ändern Sie in `heimdall-config.toml` Folgendes:

* `eth_rpc_url` – ein RPC-Endpunkt für einen vollständig synchronisierten Ethereum-Mainnet-Knoten,
d. h. Infura.. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Beispiel: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

Speichern der Änderungen in `heimdall-config.toml`.

### Konfigurieren des Bor-Services {#configuring-the-bor-service-1}

Öffnen Sie `vi ~/.bor/data/bor/static-nodes.json` für die Bearbeitung.

Ändern Sie in `static-nodes.json` Folgendes:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` – die Knoten-ID und
IP-Adresse von Bor, die auf dem Sentryrechner eingerichtet ist.

So erhalten Sie die Knoten-ID von Bor auf dem Sentryrechner:

  1. Melden Sie sich auf dem Sentryrechner an.
  2. Führen Sie `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress` aus.

  Beispiel: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Speichern der Änderungen in `static-nodes.json`.

## Einstellen des Eigentümer- und des Signierschlüssels {#setting-the-owner-and-signer-key}

Auf Polygon wird empfohlen, die Eigentümer- und Signierschlüssel nicht identische zu halten.

* Signierschlüssel – die Adresse, die die
[Checkpoint-Transaktionen](/docs/maintain/glossary.md#checkpoint-transaction) unterzeichnet. Die Empfehlung ist,
mindestens 1 ETH auf der Signieradresse halten.
* Eigentümer – die Adresse, die die Staking-Transaktionen ausführt. Die Empfehlung ist, die MATIC-
-Token auf der Besitzeradresse zu halten.

### Generieren eines privaten Schlüssels für Heimdall {#generating-a-heimdall-private-key}

Sie müssen einen privaten Schlüssel für Heimdall nur auf dem Validatorrechner generieren. Generieren Sie keinen
privaten Schlüssel für Heimdall auf dem Sentryrechner.

Um den privaten Schlüssel zu generieren, führen Sie Folgendes aus:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

wo

* Sie Ihren ETHEREUM_PRIVATE_KEY – den privaten Schlüssel Ihres Ethereum-Wallet haben.

Dies wird Folgendes generieren: `priv_validator_key.json`Verschieben der generierten JSON-Datei auf die Heimdall-Konfiguration
Verzeichnis:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Generieren einer Bor Keystore-Datei {#generating-a-bor-keystore-file}

Sie müssen eine Bor Keystore-Datei nur auf dem Validatorrechner generieren. Generieren Sie keine Bor Keystore-Datei
auf dem Sentryrechner.

Um den privaten Schlüssel zu generieren, führen Sie Folgendes aus:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

wo

* Sie Ihren ETHEREUM_PRIVATE_KEY – den privaten Schlüssel Ihres Ethereum-Wallet haben.

Wenn Sie aufgefordert werden, richten Sie ein Passwort für die Keystore-Datei ein.

Dadurch wird eine `UTC-<time>-<address>` Keystore-Datei generiert.

Verschiebe die generierte Keystore-Datei in das Bor-Konfigurationsverzeichnis:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Fügen Sie password.txt hinzu. {#add-password-txt}

Vergewissern Sie sich, eine `password.txt` Datei zu erstellen, dann fügen Sie die Bor Keystore-Datei rechts in der
`~/.bor/password.txt`Datei ein.

### Fügen Sie Ihre Ethereum-Adresse hinzu. {#add-your-ethereum-address}

Öffne `vi /etc/matic/metadata` für die Bearbeitung.

Füge in `metadata` deine Ethereum-Adresse hinzu. Beispiel: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Speichern der Änderungen in `metadata`.

## Starten des Validatorknotens {#starting-the-validator-node}

An diesem Punkt besteht folgende Voraussetzung:

* Der Heimdall-Dienst auf dem Sentryrechner ist synchronisiert und läuft.
* Der Bor-Dienst wird auf dem Sentryrechner, ausgeführt.
* Der Heimdall-Dienst und der Bor-Dienst sind auf dem Validator-Rechner konfiguriert.
* Ihre Eigentümer- und Signierschlüssel sind konfiguriert.

### Starten des Heimdall-Dienstes {#starting-the-heimdall-service-1}

Sie starten nun den Heimdall-Dienst auf dem Validatorrechner. Sobald der Heimdall-Dienst synchronisiert ist,
Starten Sie den Bor-Dienst auf dem Validatorrechner.

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

* `true` – der Heimdall-Dienst synchronisiert.
* `false` – der Heimdall Dienst ist synchronisiert.

Warten Sie, bis der Heimdall Dienst vollständig synchronisiert ist.

### Starten des Bor-Dienstes {#starting-the-bor-service-1}

Sobald der Heimdall Dienst auf dem Validatorrechner synchronisiert ist, starten Sie den Bor-Dienst auf dem Validatorrechner.

Starten des Bor-Dienstes:

```sh
sudo service bor start
```

Überprüfen der Bor-Dienstprotokolle:

```sh
journalctl -u bor.service -f
```

## Überprüfung mit der Community {#health-checks-with-the-community}

Sobald Ihre Sentry- und Validatorknoten synchronisiert sind und ausgeführt werden, gehen Sie auf
[Discord](https://discord.com/invite/0xPolygon) und fragen Sie die Community, Ihre Knoten zu überprüfen.

## Nächste Schritte: Staking {#next-steps-staking}

Sobald Sie Ihre Sentry- und Validatorknoten überprüft haben, gehen Sie auf die Anleitung für das [Staking](/docs/maintain/validator/core-components/staking.md), um mit der Sicherung des Netzes zu beginnen.
