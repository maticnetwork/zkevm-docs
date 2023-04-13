---
id: client-setup
title: Einrichtung eines Archivknoten-Clients
sidebar_label: Set up an Archive Node Client
description: "Systemanforderungen und Client-Setup."
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Systemanforderungen {#system-requirements}

### Archive {#archive-node}

- 16-Core CPU
- 64 GB RAM
- Grundsätzlich io1 oder höher mit mindestens 20k + iops und raid-0 basierte Festplattenstruktur

### Erigon Client {#erigon-client}

- Für einen Archive von Polygon Mainnet: 5TB
- Für einen Archive von Polygon Mumbai: 1TB
- SSD oder NVMe. Denk daran, dass sich die SSD-Leistung verschlechtert, wenn sie nah an der Kapazität
- RAM: >= 16 GB, 64-Bit-Architektur
- Golang-Version >= 1,18, GCC 10+

:::note HDD nicht empfohlen

Auf HDDs wird Erigon immer N Blöcke hinter der Chain-Spitze bleiben, wird aber nicht zurückfallen.

:::

## Einrichtung des Erigon-Clients {#erigon-client-setup}

### Installation {#how-to-install}

Führe die folgenden Befehle aus, um Erigon zu installieren:

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

Dies sollte die Binärdatei bei `./build/bin/erigon` erstellen

Benutze den Tag `v0.0.5` auf unserem gegabelten Repo um eine stabile Version zu erhalten.

### Erste Schritte {#how-to-start}

Um Erigon zu starten, führe aus:

```bash
erigon --chain=mumbai
```

- Verwende `chain=mumbai` für das Mumbai-Testnet
- Verwendung `chain=bor-mainnet`für Polygon Mainnet

### Konfiguration von Erigon {#how-to-configure-erigon}

- Wenn du Erigon-Dateien an einem nicht standardmäßigen Ort speichern möchtest, verwende `-datadir`

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- Falls du kein lokales **Heimdall** verwendest, verwende `-bor.heimdall=<your heimdall url>`. Standardmäßig wird es versuchen, sich mit `localhost:1317` zu verbinden.

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - Wenn du eine Verbindung mit Polygon Mumbai Testnet herstellen möchtest: [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology)

    - Für Polygon Mainnet: [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology)

### Tipps für Faster Sync {#tips-for-faster-sync}

- Verwende das Gerät mit hohem IOPS und RAM für die schnellere Anfangssynchronisation
- Verwende die folgenden Befehle, um die Geschwindigkeit des Down- und Uploads des Snapshots zu erhöhen:

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

Ersetze `512` durch die Bandbreite deines Geräts.
