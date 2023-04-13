---
id: full-node-docker
title: Ejecución de un nodo completo con Docker
sidebar_label: Run a full node with Docker
description:  Guía para ejecutar un nodo completo utilizando Docker
keywords:
  - docs
  - matic
  - docker
  - full node
  - polygon
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

El equipo de Polygon distribuye imágenes oficiales de Docker que se pueden utilizar para ejecutar nodos en la red principal de Polygon. Estas instrucciones son para ejecutar nodos completos, pero se pueden adaptar para ejecutar también nodos centinela y validadores.

:::tip Instantáneas

Encontrarás que la sincronización desde cero puede llevar mucho tiempo. Si quieres acelerar [<ins>el</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) proceso, puedes seguir las instrucciones que se enumeran aquí:

Esas son las instrucciones más actualizadas, pero, a grandes rasgos, puedes hacer algo como lo descrito en los siguientes pasos:
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```

El `aria2c`método se utiliza para descargar las instantáneas más rápido. Existe una forma alternativa en la que las instantáneas descargadas se pueden extraer directamente sin ninguna intervención.

**Pasos para eso:**

```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::

## Prerrequisitos  {#prerequisites}

La configuración general necesaria para ejecutar un nodo completo de Polygon es **al menos** 4 CPU o núcleos y 16 GB de RAM. Para esta explicación, usaremos AWS y un tipo de instancia `t3.2xlarge`. La aplicación se puede ejecutar en arquitecturas x86 y ARM.

Estas instrucciones son para Docker, por lo que deberían ser fáciles de aplicar con casi cualquier sistema operativo, pero nosotros usamos Ubuntu.

En términos de espacio, para un nodo completo probablemente necesitarás de **2,5 a 5 terabytes de almacenamiento SSD (o más)**.

Normalmente, el intercambio entre pares para nodos completos de Polygon depende de que los puertos 30303 y 26656 estén abiertos. Cuando configuras tu firewall o grupos de seguridad para AWS, asegúrate de que estos puertos estén abiertos junto con cualquier puerto que necesites para acceder a la máquina.

TLDR (Demasiado largo, no lo leí):

- Usa una máquina con al menos 4 núcleos y 16 GB de RAM
- Asegúrate de tener de 2,5 TB a 5 TB de almacenamiento rápido
- Usa una IP pública y abre los puertos 30303 y 26656

## Configuración inicial {#initial-setup}
En este punto, debes tener acceso Shell con privilegios de usuario raíz a un equipo con Linux.

![img](/img/full-node-docker/term-access.png)

### Instala Docker {#install-docker}
Lo más probable es que tu sistema operativo no tenga Docker instalado por defecto. Sigue las instrucciones para tu distribución que se encuentran aquí: https://docs.docker.com/engine/install/

Nosotros estamos siguiendo las instrucciones para Ubuntu. Los pasos se incluyen a continuación, pero tienes que consultar las instrucciones oficiales por si se actualizaron.

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

En este punto, debes tener Docker instalado. Para verificar esto, deberías poder ejecutar un comando como el siguiente:

```bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

En muchos casos, no es conveniente ejecutar Docker como usuario `root`, por lo que seguiremos los pasos posteriores a la instalación explicados [aquí](https://docs.docker.com/engine/install/linux-postinstall/) para interactuar con Docker sin necesidad de ser `root`:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Ahora deberías poder cerrar sesión, volver a iniciarla y ejecutar los comandos de Docker sin `sudo`.

### Configuración del disco {#disk-setup}
Los pasos exactos que tienes que seguir aquí variarán mucho en función de tus necesidades. Lo más probable es que tengas una partición en la raíz que ejecuta tu sistema operativo en un dispositivo. Posiblemente, quieras tener uno o más dispositivos para almacenar los datos de la cadena de bloques. Para el resto de la explicación, tendremos ese dispositivo adicional montado en `/mnt/data`.

En este ejemplo, tenemos un dispositivo con 4 TB de espacio disponible ubicado en `/dev/nvme1n1`. Vamos a montar eso utilizando los siguientes pasos:

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

Usamos `df -h` para asegurarnos de que el montaje se vea bien.

![img](/img/full-node-docker/space.png)

Si todo sale bien, podríamos crear también los directorios de inicio en este montaje para Bor y Heimdall.

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

Según tu caso de uso y sistema operativo, quizás quieras crear una entrada en `/etc/fstab` para asegurarte de que tu dispositivo esté montado cuando el sistema se reinicie.

En nuestro caso, estamos siguiendo algunos pasos como este:

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

En este punto, deberías poder reiniciar y confirmar que el sistema cargue tu montaje correctamente.

### Configuración de Heimdall {#heimdall-setup}

Tenemos un host con Docker funcionando en él y tenemos un amplio almacenamiento montado para ejecutar el software del nodo de Polygon. Así que configuremos y ejecutemos Heimdall.

Primero, comprueba que puedas ejecutar Heimdall con Docker. Ejecuta el siguiente comando:

```bash
docker run -it 0xpolygon/heimdall:0.3.0 heimdallcli version
```

Si es la primera vez que ejecutas Heimdall con Docker, debería sacar la imagen requerida automáticamente y mostrar la información de la versión.

![img](/img/full-node-docker/heimdall-version.png)

Si quieres revisar la información de la imagen de Heimdall o buscar otra etiqueta, puedes echarle un vistazo al repositorio de Docker Hub: https://hub.docker.com/repository/docker/0xpolygon/heimdall

Ahora, ejecuta el comando `init` de Heimdall para configurar tu directorio personal.

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/bin/heimdalld -it 0xpolygon/heimdall:0.3.0 init --home=/heimdall-home
```

Vamos a romper este comando un poco en caso de que cualquier cosa sale mal.

* Estamos utilizando `docker run`para ejecutar un comando a través de docker.

* El conmutador `-v /mnt/data/heimdall:/heimdall-home:rw` es muy importante. Se está montando la carpeta que hemos creado anteriormente `/mnt/data/heimdall`desde nuestro sistema de host a dentro `/heimdall-home`del contenedor como volumen de docker.

* `rw` permite que el comando escriba en este volumen de Docker. Para todos los propósitos y propósitos, desde el contenedor de docker, el directorio principal de Heimdall `/heimdall-home`será.

* El argumento `--entrypoint /usr/bin/heimdalld`está superando el punto de entrada por defecto para este contenedor.

* El switch `-it`se utiliza para ejecutar el comando de forma interactiva.

* Por último, estamos especificando qué imagen queremos ejecutar con `0xpolygon/heimdall:0.3.0`.

* Después de eso, `init --home=/heimdall-home` son los argumentos que se le pasan al ejecutable de Heimdall. `init` es el comando que queremos ejecutar y `--home` se usa para especificar la ubicación del directorio principal.

Después de ejecutar el comando `init`, tu directorio `/mnt/data/heimdall` debería tener cierta estructura y verse así:

![img](/img/full-node-docker/heimdall-tree.png)

Ahora hay que hacer algunas actualizaciones antes de iniciar Heimdall. Primero, tienes que editar el archivo `config.toml`.

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"

sudo emacs /mnt/data/heimdall/config/config.toml
```

Si no tienes una lista de semillas, puedes encontrar una en la documentación para configurar un nodo completo. En nuestro caso, el archivo tiene estas tres líneas:

```
# A custom human readable name for this node
moniker="examplenode01"

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://0.0.0.0:26657"

# Comma separated list of seed nodes to connect to
seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

:::caution

Hay dos `laddr`dentro de `config.toml`archivo. Asegúrate de que solo cambies el `laddr`parámetro en la `[rpc]`sección.

:::

Cuando tengas el archivo `config.toml` configurado, deberás hacer dos pequeños cambios en el archivo `heimdall-config.toml`. Usa tu editor preferido para actualizar estos dos ajustes:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

`eth_rpc_url` debe actualizarse con el URL que usas para la llamada de procedimiento remoto (RPC) de la red principal de Ethereum. El `bor_rpc_url`en nuestro caso se actualizará a.`http://bor:8545` Después de hacer las ediciones, nuestro archivo tiene estas líneas:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"
```

El comando `init` predeterminado proporciona una `genesis.json`, pero esta no funcionará con la red principal de Polygon ni con Mumbai. Si estás configurando un nodo de en la red principal, puedes ejecutar este comando para descargar el archivo de génesis correcto:

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/master/builder/files/genesis-mainnet-v1.json
```

Para verificar que tienes el archivo correcto, puedes compararlo con este hash:

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## Inicio de Heimdall {#starting-heimdall}
Antes de iniciar Heimdall, hay que crear una red de Docker para que los contenedores puedan conectarse fácilmente entre sí basándose en los nombres. Para crear la red, ejecuta el siguiente comando:

```bash
docker network create polygon
```

Ahora, inicia Heimdall. Ejecuta el siguiente comando:

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.3.0 start --home=/heimdall-home
```

Muchas de las piezas de este comando se verán familiares. Así que hablemos de lo que es nuevo.

* Los conmutadores `-p 26657:26657` y `-p 26656:26656` son mapeos de puertos. Esto dará instrucciones a que el puerto anfitrión mapee el puerto de destino `26657`al puerto de contenedores `26657`y lo mismo para.`26656`

* El `--net polygon`switch le dice a Docker que ejecute este contenedor en la red .

* `--name heimdall`es nombrar el contenedor que es útil para depurar, pero es todo el nombre que se utilizará para que otros contenedores se conecten a Heimdall.

* El `-d`argumento le dice a Docker que ejecute este contenedor en el fondo.

* El switch le `--restart unless-stopped`indica que reinicie automáticamente el contenedor a menos que se detuvo manualmente.

* Finalmente, se `start`está utilizando para ejecutar la aplicación en lugar de la `init`cual simplemente configura el directorio de inicio.

En este punto, es útil revisar y ver qué está pasando. Estos dos comandos pueden ser útiles:

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

Ahora, Heimdall debería iniciar la sincronización. Cuando miras los registros, deberías ver un registro de información que se escupe que se vea así:

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

Si no ves ninguna información como esta, es posible que tu nodo no esté encontrando suficientes pares. El otro comando útil en este punto es la llamada RPC para revisar el estado de la sincronización de Heimdall:

```bash
curl localhost:26657/status
```

Eso arrojará una respuesta como la siguiente:

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

En esta etapa inicial de la configuración, es importante prestarle atención al campo `sync_info`. Si `catching_up` es verdadero, Heimdall no está completamente sincronizado. Puedes revisar las demás propiedades en `sync_info` para hacerte una idea de cuánto le falta a Heimdall para terminar.

## Inicio de Bor {#starting-bor}

En este punto, deberías tener un nodo ejecutándose correctamente en Heimdall. Ahora estás listo para ejecutar Bor.

Antes de empezar con Bor, tienes que ejecutar el servidor REST de Heimdall. Este comando iniciará una API de REST, que Bor utiliza para recuperar la información de Heimdall. El comando para iniciar el servidor es:

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.3.0 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

Hay dos partes de este comando que son diferentes y que vale la pena mencionar. En lugar de ejecutar `start`, vamos a ejecutar el comando `rest-server`. Además, estamos pasando `~–node “tcp://heimdall:26657”~`, que le indica al servidor REST cómo comunicarse con Heimdall.

Si este comando se ejecuta correctamente, cuando se `docker ps`ejecuta, deberías ver dos contenedores de comandos en ejecución ahora. Asimismo, si ejecutas este comando, deberías ver alguna salida básica:

```bash
curl localhost:1317/bor/span/1
```

Bor dependerá de esta interfaz. Así que si no ves la salida de JSON, ¡hay algo mal!

Ahora vamos a descargar el `genesis`archivo para Bor específicamente:

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/master/builder/files/genesis-mainnet-v1.json'
```

Revisemos nuevamente el `sha256 sum` de este archivo:

```
# sha256sum genesis.json
5c10eadfa9d098f7c1a15f8d58ae73d67e3f67cf7a7e65b2bd50ba77eeac67e1  genesis.json
```

Ahora necesitamos crear un archivo de configuración por defecto para iniciar .

```bash
docker run -it  0xpolygon/bor:0.3.3 dumpconfig | sudo tee /mnt/data/bor/config.toml
```

Este comando va a generar un archivo .toml con la configuración por defecto. Vamos a hacer algunos cambios en el archivo, así que ábrelo con tu editor favorito y hacer algunas actualizaciones. Nota: solo estamos mostrando las líneas que se cambian.

Para referencia, puedes ver los detalles de la imagen de Bor aquí: [https://hub.docker.com/repository/docker/0xpolygon/bor](https://hub.docker.com/repository/docker/0xpolygon/bor)

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

Ahora, deberías estar listo para iniciar Bor. Vamos a utilizar este comando:
```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.3.3 server --config /bor-home/config.toml
```

Si todo salió bien, deberías ver un montón de registros que se parecen así:

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

Hay varias formas de revisar el estado de sincronización de Bor. La más sencilla es con `curl`:

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

Cuando ejecutas este comando, te dará un resultado como:

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

Esto indicará el `currentBlock` que se ha sincronizado y el `highestBlock` en cuestión. Si el nodo ya está sincronizado, deberíamos `false`obtener.

## Instantáneas {#snapshots}
Encontrarás que la sincronización desde cero puede llevar mucho tiempo. Si quieres acelerar [el](https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/) proceso, puedes seguir las instrucciones que se enumeran aquí:

Esas son las instrucciones más actualizadas, pero, a grandes rasgos, puedes hacer algo como lo descrito en los siguientes pasos:

```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# At this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
