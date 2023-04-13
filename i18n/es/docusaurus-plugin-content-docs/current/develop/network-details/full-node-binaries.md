---
id: full-node-binaries
title: Ejecución de nodos completos con binarios
description: Despliega un nodo Polygon completo utilizando binarios
keywords:
  - docs
  - matic
  - polygon
  - node
  - binaries
  - deploy
  - run full node
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Este tutorial te guía a través de iniciar y ejecutar un nodo completo utilizando binarios. Para los requisitos del sistema, consulta la guía [de requisitos técnicos](technical-requirements.md) mínimos.

:::tip

Los pasos en esta guía incluyen el tiempo de espera para que los servicios de Heimdall y Bor se sincronicen por completo. Este proceso demora varios días.

Como alternativa, puedes utilizar una instantánea mantenida, que reducirá el tiempo de sincronización a unas horas. Para obtener instrucciones detalladas, consulta [<ins>Instrucciones de instantánea para Heimdall y Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Para los enlaces de descarga de instantáneas, consulta la página [<ins>de instantáneas de las cadenas de</ins>](https://snapshots.polygon.technology/) Polygon.

:::

## Descripción general {#overview}

- Preparar la máquina
- Instala los binarios de Heimdall y Bor en la máquina completa del nodo
- Configura los servicios de Heimdall y Bor en la máquina completa del nodo
- Configura la máquina completa del nodo
- Inicia la máquina completa del nodo
- Comprueba la salud de los nodos con la comunidad

:::note

Debes seguir la secuencia exacta de acciones descrita en lo contrario, te encontrarás con problemas.

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```

## Setup config files

**For Mumbai Testnet**

- Configure the following in `~/.heimdalld/config/config.toml`:
    - `moniker=<enter unique identifier>`

```js
 seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
```
- Configure the following in `vi ~/.heimdalld/config/heimdall-config.toml`:

    ```js
    eth_rpc_url =<insert Infura or any full node RPC URL to Goerli>
    ```

- Add the following flag in `vi ~/node/bor/start.sh` to the `bor` start params:

```bash
--bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
```

## Start services

Run the full Heimdall node with the following commands:

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

Once Heimdall is synced, start Bor:

```bash
sudo service bor start
```

## Logs

Logs are managed by `journalctl` linux tool. Here is a link for advanced usage: [https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)

**Check Heimdall node logs**

```bash
journalctl -u heimdalld.service -f
```

**Check Heimdall rest server logs**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Check Bor rest server logs**

```bash
journalctl -u bor.service -f
```

### To check if Heimdall is synced

1. On the remote machine/VM, run `curl localhost:26657/status`
2. In the output, `catching_up` value should be `false`

### **Ports and firewall setup**

Open following ports 22, 26656 and 30303 to world (0.0.0.0/0) on sentry node firewall.

You can use VPN to restrict access for 22 port as per your requirement and security guidelines.


</TabItem>

<TabItem value="mainnet">

# Polygon Full Node Setup Using Binaries

This section guides you through starting and running a full node on a binary.

For the system requirements, see [Minimum Technical Requirements](https://docs.polygon.technology/docs/operate/technical-requirements).

:::note

Steps in this guide involve waiting for the Heimdall and Bor services to fully sync. This process takes several days to complete.

Alternatively, you can use a maintained snapshot, which will reduce the sync time to a few hours. For detailed instructions, see [Snapshot Instructions for Heimdall and Bor](https://forum.matic.network/t/snapshot-instructions-for-heimdall-and-bor/2278).

For snapshot download links, see [Polygon Chains Snapshots](https://snapshots.matic.today/).

:::


## Prerequisites

- One machine is required.
- `build-essential` installed on the Full Node machine.
- To install:
- `sudo apt-get install build-essential`
- Go 1.17 installed on both the Full Node machine.

<!-- ### To install

```bash
wget https://gist.githubusercontent.com/ssandeep/a6c7197811c83c71e5fead841bab396c/raw/go-install.sh
```

```bash
go-install.sh
```

```bash
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

RabbitMQ installed on both the Full Node machines. See Downloading and Installing RabbitMQ. --><!-- - Two machines — one local machine on which you will run the Ansible playbook; one remote machine — for Full Node.
- On the local machine, Ansible installed.
- On the local machine, Python 3.x installed.
- On the remote machine, make sure Go is not installed.
- On the remote machine, your local machine's SSH public key is on the remote machine to let Ansible connect to them. -->


## Overview

- Have the one machine prepared.
- Install the Heimdall and Bor binaries on the Full Node machine.
- Set up the Heimdall and Bor services on the Full Node machine.
- Configure the Full node.
- Start the Full node.
- Check node health with the community.

:::note
You have to follow the exact outlined sequence of actions, otherwise you will run into issues.
:::

### Instalar`build-essential`

Esto es **necesario** para tu nodo completo. Para instalar, ejecuta el siguiente comando:

```bash
sudo apt-get update
sudo apt-get install build-essential
```

### Instala GO {#install-go}

Esto también es **necesario** para ejecutar tu nodo completo. Se recomienda instalar  **o** superior.

```bash
wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
bash go-install.sh
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

## Instala los binarios {#install-binaries}

El nodo Polygon consta de 2 capas: Heimdall y Bor. Heimdall es una bifurcación que supervisa los contratos en paralelo con la red Ethereum. Bor es básicamente un bik Geth que genera bloques destrozados por los nodos Heimdall.

Ambos binarios deben instalarse y ejecutarse en el orden correcto para funcionar correctamente.

### Heimdall {#heimdall}

Instala la última versión de Heimdall y servicios relacionados. Asegúrate de realizar el pago a la [versión](https://github.com/maticnetwork/heimdall/releases) de lanzamiento correcta. Observa que la última versión, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contiene mejoras tales como:
1. Restricción del tamaño de datos en txs de sincronización de estado a:
    * **30 Kb** cuando se representa en **bytes**
    * **60Kb** cuando se representa como **cadena**
2. Aumentar el **tiempo de retraso** entre los eventos del contrato de diferentes validadores para garantizar que el mempool no se llene muy rápidamente en caso de una ráfaga de eventos que pueda obstaculizar el progreso de la cadena.

El siguiente ejemplo muestra cómo se restringe el tamaño de los datos:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Para instalar **Heimdall**, ejecuta los siguientes comandos:

```bash
cd ~/
git clone https://github.com/maticnetwork/heimdall
cd heimdall

# Checkout to a proper version, for example
git checkout v0.3.0
git checkout <TAG OR BRANCH>
make install
source ~/.profile
```

Eso instalará los binarios `heimdallcli` y `heimdalld`. Verifica la instalación consultando la versión Heimdall en tu máquina:

```bash
heimdalld version --long
```

### Bor {#bor}

Instala la última versión de Bor. Asegúrate de hacer la compra a la [versión correcta lanzada](https://github.com/maticnetwork/bor/releases).

```bash
cd ~/
git clone https://github.com/maticnetwork/bor
cd bor

# Checkout to a proper version
# For e.g: git checkout 0.3.3
git checkout <TAG OR BRANCH>
make bor
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Eso instalará los binarios `bootnode` y `bor`. Verifica la instalación consultando la versión de Bor en tu máquina:

```bash
bor version
```

## Configura los archivos del nodo {#configure-node-files}

### Trae el repositorio de inicio {#fetch-launch-repo}

```bash
cd ~/
git clone https://github.com/maticnetwork/launch
```

### Configura el directorio de inicio {#configure-launch-directory}

Es necesario configurar el directorio de la red, el nombre de la red y el tipo de nodo.

**Redes disponibles**`mainnet-v1`:`testnet-v4`

**Tipo de nodo**:`sentry`

:::tip

Para la configuración de  y , utiliza `<network-name>`. Útil `mainnet-v1`para  y `testnet-v4`para  .
:::

```bash
cd ~/
mkdir -p node
cp -rf launch/<network-name>/sentry/<node-type>/* ~/node
```

### Configura los directorios de la red {#configure-network-directories}

**Configuración de los datos de Heimdall**

```bash
cd ~/node/heimdall
bash setup.sh
```

**Configuración de los datos de Bor**

```bash
cd ~/node/bor
bash setup.sh
```

## Configura los archivos de servicio {#configure-service-files}

Descargar `service.sh`archivo utilizando el adecuado.`<network-name>` Útil `mainnet-v1`para  y `testnet-v4`para  .

```bash
cd ~/node
wget https://raw.githubusercontent.com/maticnetwork/launch/master/<network-name>/service.sh
```

Genera el archivo **de** metadatos:

```bash
sudo mkdir -p /etc/matic
sudo chmod -R 777 /etc/matic/
touch /etc/matic/metadata
```

Genera `.service`archivos y cópialos en el directorio del sistema:

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```


## Configuración de archivos de configuración {#setup-config-files}

- Inicia sesión en la máquina remota o máquina virtual (VM)
- Tienes que ingresar algunos datos en el archivo `config.toml`. Para abrir y editar el `config.toml`archivo, ejecuta el siguiente comando:`vi ~/.heimdalld/config/config.toml`

En el archivo de configuración, deberás cambiar y `Moniker`añadir `seeds`información:

    ```bash
    moniker=<enter unique identifier>
    # For example, moniker=my-sentry-node

    # Mainnet:
    seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656"

    # Testnet:
    seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
    ```

    - Cambia el valor de **Pex** a `true`
    - Cambia el valor de **Prometheus** a `true`
    - Configura el valor `max_open_connections` en `100`

Asegúrate de **mantener el formato adecuado cuando** hagas los cambios anteriores.

- Configura lo siguiente en `~/.heimdalld/config/heimdall-config.toml`:

    ```jsx
    eth_rpc_url=<insert Infura or any full node RPC URL to Goerli>
    ```

- Abra el `start.sh`archivo para Bor utilizando este comando:`vi ~/node/bor/start.sh` Añade las siguientes banderas para iniciar los params:

  ```bash
  # Mainnet:
  --bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"

  # Testnet:
  --bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
  ```

- Para habilitar el modo **Archivo,** puedes añadir las siguientes banderas en el `start.sh`archivo:

  ```jsx
  --gcmode 'archive' \
  --ws --ws.port 8546 --ws.addr 0.0.0.0 --ws.origins '*' \
  ```

## Inicia los servicios {#start-services}

Ejecuta el nodo Heimdall completo con estos comandos en tu Nodo Sentry :

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

Ahora, debes asegurarte de que **Heimdall se sincronice** completamente, y entonces solo inicia Bor. Si inicias Bor sin que Heimdall se haya sincronizado completamente, tendrás problemas con frecuencia.

**Para comprobar si Heimdall está sincronizado**
  1. En la máquina remota o VM, ejecuta `curl localhost:26657/status`
  2. En la respuesta, el valor de `catching_up` debe ser `false`

Una vez que Heimdall se sincroniza, ejecuta el siguiente comando:

```bash
sudo service bor start
```

## Registros {#logs}

Los registros pueden ser gestionados por la herramienta `journalctl`. Aquí hay un tutorial para uso avanzado: [Cómo utilizar Journalctl para ver y manipular los registros de Systemd](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Revisa los registros del nodo de Heimdall**

```bash
journalctl -u heimdalld.service -f
```

**Comprueba los registros del servidor de **

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Comprueba los registros del servidor de Bor**

```bash
journalctl -u bor.service -f
```

## Configuración de puertos y firewall {#ports-and-firewall-setup}

Ábrele los puertos 22, 26656 y 30303 al mundo (0.0.0.0/0) en el cortafuegos del nodo centinela.

Puedes usar una VPN para restringir el acceso del puerto 22, según tus requisitos y pautas de seguridad.
