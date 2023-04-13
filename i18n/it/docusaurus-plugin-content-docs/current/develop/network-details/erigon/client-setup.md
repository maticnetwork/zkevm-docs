---
id: client-setup
title: Configurare un client nodo Archive
sidebar_label: Set up an Archive Node Client
description: "Requisiti di sistema e configurazione client."
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Requisiti di sistema {#system-requirements}

### Nodo Archivio {#archive-node}

- CPU 16 core
- 64 GB di RAM
- Fondamentalmente io1 o sopra con almeno 20k+ iops e struttura del disco basata su raid-0

### Erigon Client {#erigon-client}

- Per un nodo di archivio di Polygon Mainnet: 5TB
- Per un nodo di Archivio di Polygon Mumbai: 1TB
- SSD o NVMe. Tenete presente che le prestazioni SSD si deteriorano quando si è vicino alla capacità
- RAM: >= 16 GB, architettura a 64 bit
- Versione Golang >= 1.18, GCC 10+

:::note HDD non consigliato

Sugli HDD, Erigon rimane sempre N blocchi dietro la punta della catena, ma non rimane indietro.

:::

## Configurazione del client Erigon {#erigon-client-setup}

### Come installare {#how-to-install}

Per installare Erigon, segui questi comandi:

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

Questa operazione dovrebbe creare il binario presso `./build/bin/erigon`

Usa il tag `v0.0.5` sul nostro repository forzato per avere una versione stabile.

### Come iniziare {#how-to-start}

Per iniziare Erigon, eseguire:

```bash
erigon --chain=mumbai
```

- Usa `chain=mumbai` per la testnet Mumbai
- Utilizzo `chain=bor-mainnet`di Polygon Mainnet

### Come configurare Erigon {#how-to-configure-erigon}

- Se desideri memorizzare i file di Erigon in una posizione diversa da quella predefinita, usa `-datadir`

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- Se non usi l'**heimdall** locale, usa `-bor.heimdall=<your heimdall url>`. Per impostazione predefinita, proverà a connettersi a `localhost:1317`.

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - Se vuoi connetterti a Polygon Mumbai Testnet: [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology)

    - Per Polygon Mainnet: [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology)

### Suggerimenti per la più veloce sincronizzazione {#tips-for-faster-sync}

- Usa la macchina con IOPS e RAM elevati per velocizzare la sincronizzazione iniziale
- Utilizza i comandi seguenti per aumentare la velocità di download/upload degli snapshot:

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

Sostituisci `512` con l'ampiezza di banda che la tua macchina può gestire.
