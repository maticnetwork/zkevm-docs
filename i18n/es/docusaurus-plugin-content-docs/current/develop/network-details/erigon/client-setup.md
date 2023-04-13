---
id: client-setup
title: Configuración de un cliente de nodo de archivo
sidebar_label: Set up an Archive Node Client
description: "Requisitos del sistema y configuración del cliente"
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Requisitos del sistema {#system-requirements}

### Nodo de archivo {#archive-node}

- CPU de 16 núcleos
- 64 GB de RAM
- Básicamente io1 o superior con al menos 20 k+ y estructura de disco basada en

### Cliente de Erigon {#erigon-client}

- Para un nodo de archivo de   :
- Para un nodo de archivo de Polygon Mumbai:
- SSD o NVMe. Ten en cuenta que el rendimiento de la SSD se deteriora cuando se acerca a la capacidad
- RAM: ≥16 GB, arquitectura de 64 bits
- Versión de Golang ≥1.18, GCC 10+

:::note No se recomienda HDD

En los HDD, Erigon siempre estará N bloques detrás de la punta de la cadena, pero no se quedará atrás.

:::

## Configuración del cliente de Erigon {#erigon-client-setup}

### Cómo instalarlo {#how-to-install}

Ejecuta los siguientes comandos para instalar Erigon:

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

Eso debería crear el binario en `./build/bin/erigon`

Usa la etiqueta `v0.0.5` en nuestro repositorio bifurcado para obtener una versión estable.

### Cómo empezar {#how-to-start}

Para iniciar  , ejecuta:

```bash
erigon --chain=mumbai
```

- Usa `chain=mumbai` para la red de pruebas Mumbai
- Uso `chain=bor-mainnet`para

### Cómo configurar Erigon {#how-to-configure-erigon}

- Si quieres almacenar los archivos de Erigon en una ubicación no predeterminada, usa `-datadir`

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- Si no estás usando **Heimdall** localmente, usa `-bor.heimdall=<your heimdall url>`. Por defecto, intentará conectarse con `localhost:1317`.

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - Si quieres conectarte [a](https://heimdall-api-testnet.polygon.technology)   :

    - Para Polygon Mainnet: [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology)

### Consejos para la sincronización más rápida {#tips-for-faster-sync}

- Usa el equipo con alto nivel de IOPS (operaciones de entrada o salida por segundo) y RAM (memoria de acceso aleatorio) para una sincronización inicial más rápida
- Usa los siguientes comandos para aumentar la velocidad de carga y descarga de instantáneas:

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

Reemplaza `512` por el ancho de banda que admita tu equipo.
