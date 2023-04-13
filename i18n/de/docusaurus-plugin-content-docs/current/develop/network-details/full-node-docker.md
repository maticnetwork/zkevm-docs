---
id: full-node-docker
title: Einen vollständigen Knoten mit Docker ausführen
sidebar_label: Run a full node with Docker
description:  Leitfaden zum Ausführen eines vollständigen Knotens mit Docker
keywords:
  - docs
  - matic
  - docker
  - full node
  - polygon
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Das Polygon-Team gibt offizielle Docker-Bilder aus, mit denen Knoten im Polygon-Mainnet ausgeführt werden können. Diese Anleitung beschreibt die Ausführung eines vollständigen Knotens, können aber auch für die Ausführung von Sentry-Knoten und Validatoren angepasst werden.

:::tip Snapshots

Du wirst feststellen, dass die Synchronisierung von Grund auf sehr lange in Anspruch nehmen kann. Wenn du den Prozess beschleunigen möchtest, kannst du die hier aufgeführten Anweisungen befolgen: [<ins>Snapshot Instructions für Heimdall und Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)

Das sind die aktuellsten Anweisungen, du kannst aber zum Beispiel die unten stehenden Schritte befolgen:
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```

Die `aria2c`Methode wird zum schnellen Herunterladen von Snapshots verwendet. Es gibt eine andere Möglichkeit, in der die heruntergeladenen Snapshots direkt extrahiert werden können, ohne dass es eingreifen kann.

**Schritte dafür sind:**

```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::

## Voraussetzungen {#prerequisites}

Die allgemeine Konfiguration für die Ausführung eines vollständigen Polygon-Knotens sieht **mindestens** 4 CPUs/Cores und 16 GB RAM vor. Für diese Anleitung werden wir AWS und einen `t3.2xlarge`-Instanztyp verwenden. Die App kann sowohl auf x86- als auch auf Arm-Architekturen ausgeführt werden.

Diese Anleitung basiert auf Docker und kann daher mit fast jedem Betriebssystem befolgt werden. Wir verwenden Ubuntu.

In Bezug auf den Speicherplatz brauchst du für einen vollständigen Knoten wahrscheinlich von **2,5 bis 5 Terabytes SSD (oder schneller) Speicher**.

Der Peer-Austausch für einen vollständigen Polygon-Knoten hängt im Allgemeinen davon ab, ob Port 30303 und 26656 geöffnet sind. Wenn du deine Firewall oder Sicherheitsgruppen für AWS konfigurierst, vergewissere dich, dass diese Ports zusammen mit allen Ports geöffnet sind, die du für den Zugriff auf die Maschine brauchst.

TLDR:

- Verwende einen Rechner mit mindestens 4 Cores und 16 GB RAM
- Vergewissere dich, dass du von 2,5 TB auf 5 TB schnellen Speicher hast
- Verwende eine öffentliche IP und öffne die Ports 30303 und 26656

## Ersteinrichtung {#initial-setup}
Jetzt solltest du Shell-Zugriff mit Root-Rechten für einen Linux-Rechner haben.

![img](/img/full-node-docker/term-access.png)

### Installiere Docker {#install-docker}
Wahrscheinlich wird Docker nicht standardmäßig auf deinem Betriebssystem installiert sein. Befolge die Anleitung für deine spezifische Verteilung hier: https://docs.docker.com/engine/install/

Wir befolgen die Anleitung für Ubuntu. Die Schritte findest du unten, lies aber bitte die offizielle Anleitung, falls sie aktualisiert wurden.

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

Jetzt solltest du Docker installiert haben. Um dies zu überprüfen, solltest du einen Befehl wie diesen ausführen können:

```bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

In vielen Fällen ist es unpraktisch, Docker als `root`-Benutzer auszuführen. Wir befolgen daher nach der Installation [diese](https://docs.docker.com/engine/install/linux-postinstall/) Schritte, um mit Docker zu interagieren, ohne `root` sein zu müssen:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Jetzt solltest du dich ausloggen und wieder einloggen können und Docker-Befehle ohne `sudo` ausführen können.

### Einrichtung der Festplatte {#disk-setup}
Die genauen Schritte variieren je nach Bedarf. Wahrscheinlich wirst du eine Root-Partition haben, die dein Betriebssystem auf einem Gerät ausführt. Du wirst wahrscheinlich ein oder mehrere Geräte für die Speicherung der Blockchain-Daten benötigen. Für den Rest des Rundgangs werden wir dieses zusätzliche Gerät auf `/mnt/data` mounten.

In diesem Beispiel haben wir ein Gerät mit 4 TB von verfügbarem Speicherplatz auf `/dev/nvme1n1`befindet. Wir werden das mit den folgenden Schritten are

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

Wir verwenden `df -h`, um sicherzustellen, dass der Mount gut aussieht.

![img](/img/full-node-docker/space.png)

Wenn alles gut aussieht, können wir auch die Home-Verzeichnisse auf diesem Mount für Bor und Heimdall erstellen.

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

Je nach Anwendungsfall und Betriebssystem wirst du wahrscheinlich einen Eintrag in `/etc/fstab` erstellen, um sicherzustellen, dass dein Gerät beim Neustart des Systems gemountet wird.

In unserem Fall befolgen wir einige Schritte wie diese:

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

Jetzt solltest du in der Lage sein, das System neu zu starten und zu bestätigen, dass es deinen Mount richtig lädt.

### Heimdall-Einrichtung {#heimdall-setup}

An diesem Punkt haben wir einen Host, auf dem Docker läuft, und wir haben ausreichend gemounteten Speicher, um unsere Polygon-Knotensoftware zu betreiben. Lass uns also Heimdall konfigurieren und ausführen.

Stelle zuerst sicher, dass wir Heimdall mit Docker ausführen können. Führen Sie den folgenden Befehl aus:

```bash
docker run -it 0xpolygon/heimdall:0.3.0 heimdallcli version
```

Falls du zum ersten Mal, Heimdall mit Docker ausführst, sollte das gewünschte Bild automatisch abgerufen und die Versionsdaten angezeigt werden.

![img](/img/full-node-docker/heimdall-version.png)

Wenn du die Details des Heimdall-Bilds überprüfen oder einen anderen Tag finden möchtest, sieh dir das Repository am Docker Hub an: https://hub.docker.com/repository/docker/0xpolygon/heimdall

Jetzt führen wir den Heimdall `init`-Befehl aus, um unser Home-Verzeichnis einzurichten.

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/bin/heimdalld -it 0xpolygon/heimdall:0.3.0 init --home=/heimdall-home
```

Lassen Sie uns diesen Befehl etwas aufbrechen, falls etwas schief geht.

* Wir verwenden `docker run`einen Befehl über docker.

* Der Schalter `-v /mnt/data/heimdall:/heimdall-home:rw` ist sehr wichtig. Es wird den Ordner montiert, den wir früher `/mnt/data/heimdall`von unserem Host-System erstellt haben, auf in den Container als Docker-Volume `/heimdall-home`als Datenträger.

* `rw` ermöglicht es dem Befehl, dieses Docker-Volume zu beschreiben. Für alle Absichten und Zwecke, aus dem Docker-Container, wird das Heimatverzeichnis für Heimdall `/heimdall-home`sein.

* Das Argument `--entrypoint /usr/bin/heimdalld`is den default für diesen Container.

* Der Switch `-it`wird verwendet, um den Befehl interaktiv auszuführen.

* Schließlich geben wir an, mit welchem Bild wir laufen `0xpolygon/heimdall:0.3.0`möchten.

* Danach sind `init --home=/heimdall-home` Argumente, die an die ausführbare Heimdall-Datei übergeben werden. `init` ist der Befehl, den wir ausführen möchten, und `--home` wird verwendet, um den Speicherort des Home-Verzeichnisses anzugeben.

Nachdem der `init`-Befehl ausgeführt wurde, sollte Ihr `/mnt/data/heimdall`-Verzeichnis eine Struktur aufweisen und wie folgt aussehen:

![img](/img/full-node-docker/heimdall-tree.png)

Jetzt müssen wir einige Updates vornehmen, bevor Heimdall gestartet wird. Zuerst bearbeiten wir die `config.toml`-Datei.

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"

sudo emacs /mnt/data/heimdall/config/config.toml
```

Falls du keine Seed-Liste hast, findest du eine in der Dokumentation für die Einrichtung eines vollständigen Knotens. In unserem Fall enthält unsere Datei diese drei Zeilen:

```
# A custom human readable name for this node
moniker="examplenode01"

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://0.0.0.0:26657"

# Comma separated list of seed nodes to connect to
seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

:::caution

Es gibt zwei `laddr`Innere `config.toml`Datei. Vergewissere dich, dass du den `laddr`Parameter nur unter Abschnitt `[rpc]`ändern.

:::

Nun, da deine `config.toml`Datei bereit ist, musst du zwei kleine Änderungen an deiner `heimdall-config.toml`Datei vornehmen. Nutze deinen liebsten Editor, um diese beiden Einstellungen zu aktualisieren:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

Die `eth_rpc_url` sollte auf die URL, die du für Ethereum Mainnet RPC verwendest, aktualisiert werden. Der `bor_rpc_url`in unserem Fall wird auf aktualisiert.`http://bor:8545` Nachdem wir die Änderungen vorgenommen haben, hat unsere Datei folgende Zeilen:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"
```

Der Standard-`init`-Befehl stellt eine `genesis.json` bereit, was aber nicht mit dem Polygon Mainnet oder Mumbai funktioniert. Wenn du einen Mainnet-Knoten einrichtest, kannst du diesen Befehl ausführen, um die richtige Genesis-Datei herunterzuladen:

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/master/builder/files/genesis-mainnet-v1.json
```

Wenn du überprüfen möchtest, ob du die richtige Datei hast, kannst du sie mit diesem Hash vergleichen:

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## Heimdall starten {#starting-heimdall}
Bevor wir Heimdall starten, erstellen wir ein Docker-Netzwerk, damit die Container leicht basierend auf Namen miteinander kommunizieren können. Um das Netzwerk zu erstellen, führe den folgenden Befehl aus:

```bash
docker network create polygon
```

Jetzt starten wir Heimdall. Führen Sie den folgenden Befehl aus:

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.3.0 start --home=/heimdall-home
```

Viele Teile dieses Befehls werden dir vertraut sein. Also lasst uns darüber reden, was neu ist.

* Die Schalter `-p 26657:26657` und `-p 26656:26656` sind Port-Mappings. Dies wird docker anweisen, den Host-Port auf den Container-Port `26657`zuzuordnen, `26657`und zwar für .`26656`

* Der `--net polygon`Switch sagt docker, diesen Container im Polygon-Netzwerk auszuführen.

* `--name heimdall`benennt den Container, der für das Debuggen nützlich ist, aber er ist der Name, der für andere Container verwendet wird, um sich mit Heimdall zu verbinden.

* Das `-d`Argument teilt docker mit, diesen Container im Hintergrund auszuführen.

* Der Switch teilt docker mit, den Container automatisch neu zu starten, es sei denn, er wurde manuell `--restart unless-stopped`gestoppt.

* Schließlich `start`wird verwendet, um die Anwendung tatsächlich auszuführen, anstatt `init`die gerade das Home-Verzeichnis einrichten.

Jetzt solltest du überprüfen, was gerade passiert. Diese beiden Befehle können nützlich sein:

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

Jetzt sollte Heimdall mit der Synchronisierung beginnen. Wenn du die Protokolle ansiehst, solltest du ein Protokoll von Informationen sehen, das ausgespucht wird, das wie folgt aussieht:

```
2022-12-14T19:43:23.687640820Z INFO [2022-12-14|19:43:23.687] Executed block                               module=state height=26079 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.721220869Z INFO [2022-12-14|19:43:23.721] Committed state                              module=state height=26079 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.730533414Z INFO [2022-12-14|19:43:23.730] Executed block                               module=state height=26080 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.756646938Z INFO [2022-12-14|19:43:23.756] Committed state                              module=state height=26080 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.768129711Z INFO [2022-12-14|19:43:23.767] Executed block                               module=state height=26081 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.794323918Z INFO [2022-12-14|19:43:23.794] Committed state                              module=state height=26081 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.802989809Z INFO [2022-12-14|19:43:23.802] Executed block                               module=state height=26082 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.830960386Z INFO [2022-12-14|19:43:23.830] Committed state                              module=state height=26082 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.840941976Z INFO [2022-12-14|19:43:23.840] Executed block                               module=state height=26083 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.866564767Z INFO [2022-12-14|19:43:23.866] Committed state                              module=state height=26083 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.875395744Z INFO [2022-12-14|19:43:23.875] Executed block                               module=state height=26084 validTxs=0 invalidTxs=0
```

Falls du keine Informationen wie diese siehst, findet dein Knoten möglicherweise nicht genügend Peers. Der andere nützliche Befehl ist zu diesem Zeitpunkt ein RPC-Call, um den Status der Heimdall-Synchronisierung zu überprüfen:

```bash
curl localhost:26657/status
```

Dies liefert eine Antwort wie diese:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "0698e2f205de0ffbe4ca215e19b2ee7275d2c334",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "heimdall-137",
      "version": "0.32.7",
      "channels": "4020212223303800",
      "moniker": "examplenode01",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://0.0.0.0:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "812700055F33B175CF90C870B740D01B0C5B5DCB8D22376D2954E1859AF30458",
      "latest_app_hash": "83A1568E85A1D942D37FE5415F3FB3CBD9DFD846A42CBC247DFD6ABB9CE7E606",
      "latest_block_height": "16130",
      "latest_block_time": "2020-05-31T17:06:31.350723885Z",
      "catching_up": true
    },
    "validator_info": {
      "address": "3C6058AF387BB74D574582C2BEEF377E7A4C0238",
      "pub_key": {
        "type": "tendermint/PubKeySecp256k1",
        "value": "BOIKA6z1q3l5iSJoaAiagWpwUw3taAhiEMyZ9ffxAMznas2GU1giD5YmtnrB6jzp4kkIqv4tOmuGYILSdy9+wYI="
      },
      "voting_power": "0"
    }
  }
}
```

In dieser ersten Einrichtungsphase ist es wichtig, auf das `sync_info`-Feld zu achten. Wenn `catching_up` wahr ist, bedeutet dies, dass Heimdall nicht vollständig synchronisiert ist. Du kannst die anderen Eigenschaften in `sync_info` überprüfen, um einschätzen zu können, wie weit im Rückstand sich Heimdall befindet.

## Bor starten {#starting-bor}

Jetzt solltest du einen Knoten haben, auf dem Heimdall erfolgreich ausgeführt wird. Jetzt bist du bereit, Bor auszuführen.

Bevor wir mit Bor beginnen, müssen wir den Heimdall Rest-Server ausführen. Dieser Befehl startet eine REST-API, mit der Bor Informationen von Heimdall abrufen kann. Der Befehl zum Starten des Servers ist:

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.3.0 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

Zwei Teile dieses Befehls sind anders und sollten beachtet werden. Anstatt den `start`-Befehl auszuführen, führen wir den `rest-server`-Befehl aus. Außerdem geben wir `~–node “tcp://heimdall:26657”~` weiter, was dem Rest-Server sagt, wie er mit Heimdall kommunizieren kann.

Wenn dieser Befehl erfolgreich ausgeführt wird, solltest du beim Ausführen zwei Befehle sehen, die jetzt `docker ps`laufen. Wenn du diesen Befehl ausführst, solltest du außerdem einige grundlegende Ausgaben sehen:

```bash
curl localhost:1317/bor/span/1
```

Bor stützt sich auf diese Benutzeroberfläche. Wenn du also keine JSON-Ausgabe siehst, gibt es etwas falsch!

Nun lasst uns die `genesis`Datei für Bor herunterladen:

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/master/builder/files/genesis-mainnet-v1.json'
```

Überprüfen wir noch einmal die `sha256 sum` für diese Datei:

```
# sha256sum genesis.json
5c10eadfa9d098f7c1a15f8d58ae73d67e3f67cf7a7e65b2bd50ba77eeac67e1  genesis.json
```

Nun müssen wir eine Standard-Konfigurationsdatei erstellen, um Bor zu starten.

```bash
docker run -it  0xpolygon/bor:0.3.3 dumpconfig | sudo tee /mnt/data/bor/config.toml
```

Dieser Befehl wird eine .toml mit Standardeinstellungen generieren. Wir werden ein paar Änderungen an der Datei vornehmen, also öffne sie mit deinem favorite und mache ein paar Updates. Hinweis: Wir zeigen nur die Zeilen, die geändert werden.

Zum Referenz kannst du die Details zum Bor Bild hier sehen: [https://hub.docker.com/repository/docker/0xpolygon/bor](https://hub.docker.com/repository/docker/0xpolygon/bor)

```bash
# Similar to moniker, you might want to update this with a name of your own choosing
identity = "docker.example"

# Setting this to the location of a mount that we'll make
datadir = "/bor-home"

# We'll want to specify some boot nodes
[p2p]
  [pep.discovery]
    bootnodes = ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303", "enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"]

# Because we're running inside docker, we'll likely need to change the way we connect to heimdall
[heimdall]
  url = "http://heimdallrest:1317"

# Assumming you want to access the RPC, you'll need to make a change here as well
[jsonrpc]
  [jsonrpc.http]
    enabled = true
    host = "0.0.0.0"
```

Jetzt sollten wir bereit sein, Bor zu starten. Wir werden diesen Befehl verwenden:
```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.3.3 server --config /bor-home/config.toml
```

Wenn alles gut lief, solltest du viele Protokolle sehen, die wie folgt aussehen:

```bash
2022-12-14T19:53:51.989897291Z INFO [12-14|19:53:51.989] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:47:46Z
2022-12-14T19:53:51.989925064Z INFO [12-14|19:53:51.989] Fetching state sync events               queryParams="from-id=4&to-time=1590882466&limit=50"
2022-12-14T19:53:51.997640841Z INFO [12-14|19:53:51.997] StateSyncData                            Gas=0       Block-number=12800 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.021990622Z INFO [12-14|19:53:52.021] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:49:58Z
2022-12-14T19:53:52.022015930Z INFO [12-14|19:53:52.021] Fetching state sync events               queryParams="from-id=4&to-time=1590882598&limit=50"
2022-12-14T19:53:52.040660857Z INFO [12-14|19:53:52.040] StateSyncData                            Gas=0       Block-number=12864 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.064795784Z INFO [12-14|19:53:52.064] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:52:10Z
2022-12-14T19:53:52.064828634Z INFO [12-14|19:53:52.064] Fetching state sync events               queryParams="from-id=4&to-time=1590882730&limit=50"
2022-12-14T19:53:52.085029612Z INFO [12-14|19:53:52.084] StateSyncData                            Gas=0       Block-number=12928 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.132067703Z INFO [12-14|19:53:52.131] ✅ Committing new span                    id=3                startBlock=13056 endBlock=19455 validatorBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822 producerBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822
2022-12-14T19:53:52.133545235Z INFO [12-14|19:53:52.133] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:54:22Z
2022-12-14T19:53:52.133578948Z INFO [12-14|19:53:52.133] Fetching state sync events               queryParams="from-id=4&to-time=1590882862&limit=50"
2022-12-14T19:53:52.135049605Z INFO [12-14|19:53:52.134] StateSyncData                            Gas=0       Block-number=12992 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.152067646Z INFO [12-14|19:53:52.151] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:56:34Z
2022-12-14T19:53:52.152198357Z INFO [12-14|19:53:52.151] Fetching state sync events               queryParams="from-id=4&to-time=1590882994&limit=50"
2022-12-14T19:53:52.176617455Z INFO [12-14|19:53:52.176] StateSyncData                            Gas=0       Block-number=13056 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.191060112Z INFO [12-14|19:53:52.190] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:58:46Z
2022-12-14T19:53:52.191083740Z INFO [12-14|19:53:52.190] Fetching state sync events               queryParams="from-id=4&to-time=1590883126&limit=50"
2022-12-14T19:53:52.223836639Z INFO [12-14|19:53:52.223] StateSyncData                            Gas=0       Block-number=13120 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.236025906Z INFO [12-14|19:53:52.235] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:00:58Z
2022-12-14T19:53:52.236053406Z INFO [12-14|19:53:52.235] Fetching state sync events               queryParams="from-id=4&to-time=1590883258&limit=50"
2022-12-14T19:53:52.269611566Z INFO [12-14|19:53:52.269] StateSyncData                            Gas=0       Block-number=13184 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.283199351Z INFO [12-14|19:53:52.283] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:03:10Z
2022-12-14T19:53:52.283737573Z INFO [12-14|19:53:52.283] Fetching state sync events               queryParams="from-id=4&to-time=1590883390&limit=50"
2022-12-14T19:53:52.314141359Z INFO [12-14|19:53:52.314] StateSyncData                            Gas=0       Block-number=13248 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.325150782Z INFO [12-14|19:53:52.325] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:05:22Z
2022-12-14T19:53:52.325171075Z INFO [12-14|19:53:52.325] Fetching state sync events               queryParams="from-id=4&to-time=1590883522&limit=50"
2022-12-14T19:53:52.354470271Z INFO [12-14|19:53:52.354] StateSyncData                            Gas=0       Block-number=13312 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.372354857Z INFO [12-14|19:53:52.372] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:07:34Z
2022-12-14T19:53:52.372389214Z INFO [12-14|19:53:52.372] Fetching state sync events               queryParams="from-id=4&to-time=1590883654&limit=50"
2022-12-14T19:53:52.398246950Z INFO [12-14|19:53:52.398] StateSyncData                            Gas=0       Block-number=13376 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.413321099Z INFO [12-14|19:53:52.413] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:09:46Z
2022-12-14T19:53:52.413345355Z INFO [12-14|19:53:52.413] Fetching state sync events               queryParams="from-id=4&to-time=1590883786&limit=50"
2022-12-14T19:53:52.437176855Z INFO [12-14|19:53:52.437] StateSyncData                            Gas=0       Block-number=13440 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.450356966Z INFO [12-14|19:53:52.450] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:11:58Z
```

Es gibt einige Möglichkeiten, den Synchronisierungszustand von Bor zu überprüfen. Am einfachsten ist es mit `curl`:

```bash
curl 'localhost:8545/' \
--header 'Content-Type: application/json' \
-d '{
	"jsonrpc":"2.0",
	"method":"eth_syncing",
	"params":[],
	"id":1
}'
```

Wenn du diesen Befehl ausführst, wird dir ein Ergebnis wie:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x2eebf",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x1d4ee3e",
    "startingBlock": "0x0",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Dies zeigt dem `currentBlock`, was synchronisiert wurde, und zeigt die `highestBlock`, die wir kennen, an. Wenn der Knoten bereits synchronisiert ist, sollten wir `false`erhalten.

## Snapshots {#snapshots}
Du wirst feststellen, dass die Synchronisierung von Grund auf sehr lange in Anspruch nehmen kann. Wenn du den Prozess beschleunigen möchtest, kannst du die hier aufgeführten Anweisungen befolgen: [https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/](https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/)

Das sind die aktuellsten Anweisungen, du kannst aber zum Beispiel die unten stehenden Schritte befolgen:

```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# At this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
