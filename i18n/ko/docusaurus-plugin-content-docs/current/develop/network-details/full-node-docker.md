---
id: full-node-docker
title: Docker로 전체 노드 실행
sidebar_label: Run a full node with Docker
description:  Docker를 사용하여 전체 노드를 실행하는 가이드
keywords:
  - docs
  - matic
  - docker
  - full node
  - polygon
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon 팀은 Polygon 메인넷에서 노드를 실행하는 데 사용할 수 있는 공식 Docker 이미지를 배포합니다. 이러한 지침은 전체 노드를 실행하기 위한 것이지만, Sentry 노드 및 검증자 실행에도 적용할 수 있습니다.

:::tip 스냅샷

처음부터 동기화하면 매우 오랜 시간이 걸릴 수 있다는 것을 알게 될 것입니다. 프로세스를 가속화하고 싶다면 여기에 나열된 지침을 따르십시오 : [<ins>Heimdall 및 Bor에 대한 스냅 샷</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) 지침서

최신 안내지만, 대략 다음과 같은 단계를 수행할 수 있습니다.
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```

이 `aria2c`방법은 스냅 샷을 더 빨리 다운로드하는 데 사용됩니다. 다운로드 된 스냅 샷을 직접 추출할 수 있는 대체 방법이 있습니다.

**다음 단계:**

```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::

## 기본 요건 {#prerequisites}

Polygon 전체 노드를 실행하기 위한 일반적인 구성은 **최소** 4개의 CPU/코어와 16GB의 RAM을 사용하는 것입니다 이 과정에서는 AWS와 `t3.2xlarge` 인스턴스 유형을 사용합니다. 애플리케이션은 x86 및 Arm 아키텍처에서 모두 실행할 수 있습니다.

이 안내는 Docker를 기반으로 하므로 거의 모든 운영체제에서 쉽게 따를 수 있지만 여기서는 Ubuntu를 사용합니다.

공간 측면에서 볼 때 **2.5에서 5테라바이트의 스토리지 또는 더 빠르게) 저장을** 필요로 할 수 있습니다.

일반적으로 Polygon 전체 노드의 피어 교환은 열리는 포트 30303 및 26656에 따라 달라집니다. AWS를 위해 방화벽 또는 보안 그룹을 구성 할 때 이 포트는 해당 포트에 필요한 모든 포트와 함께 열려 있는지 확인하십시오.

TLDR:

- 4개 이상의 코어와 16GB RAM이 있는 머신을 사용하세요
- 빠른 스토리지 2.5TB에서 5TB 까지 있는지 확인하십시오.
- 공개 IP를 사용하고 포트 30303 및 26656을 엽니다

## 초기 설정 {#initial-setup}
이 단계에서 리눅스 머신에 대한 루트 권한을 가진 셸 액세스 권한이 있어야 합니다.

![img](/img/full-node-docker/term-access.png)

### Docker 설치 {#install-docker}
대부분의 경우 운영체제에는 기본적으로 Docker가 설치되어 있지 않습니다. 다음 링크에서 특정 배포에 대한 지침을 따르세요. https://docs.docker.com/engine/install/

여기서는 Ubuntu의 지침을 따릅니다. 아래에서 단계를 설명하지만, 업데이트되었을 수 있으니 공식 안내를 확인하세요.

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

이 단계에서 Docker가 설치되어 있어야 합니다. 확인하려면 다음과 같은 명령어를 실행할 수 있습니다.

```bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

대부분의 경우 `root` 사용자로 Docker를 실행하는 것은 불편하므로 `root`가 될 필요 없이 Docker와 상호작용하기 위해 [여기](https://docs.docker.com/engine/install/linux-postinstall/)에 설명된 설치 후 단계를 따릅니다.

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

이제 로그아웃했다가 다시 로그인하고 `sudo` 없이 Docker 명령어를 실행할 수 있습니다.

### 디스크 설정 {#disk-setup}
여기서 필요한 정확한 단계는 사용자의 필요에 따라 크게 달라집니다. 대부분 하나의 장치에서 운영체제를 실행하는 루트 파티션이 있습니다. 실제로 블록체인 데이터를 보관할 하나 이상의 장치가 필요할 수 있습니다. 나머지 과정에서 `/mnt/data`에 추가 장치를 마운트할 것입니다.

이 예시에서 4TB 공간을 가진 장치가 `/dev/nvme1n1`있습니다. 아래 단계를 사용하여 마운트할 것입니다.

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

제대로 마운트되었는지 확인하기 위해 `df -h`를 사용합니다.

![img](/img/full-node-docker/space.png)

제대로 완료했다면 이 마운트에 Bor와 Heimdall에 대한 홈 디렉터리를 만듭니다.

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

사용 사례와 운영체제에 따라, 시스템을 재부팅할 때 장치가 마운트되었는지 확인하기 위해 `/etc/fstab`에 항목을 만들 수 있습니다.

여기서는 다음과 같은 단계를 따릅니다.

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

이 단계에서 시스템을 재부팅하고 마운트된 장치가 올바르게 로드되는지 확인할 수 있습니다.

### Heimdall 설정 {#heimdall-setup}

이 단계에 이르면 Docker가 실행되는 호스트가 있고 Polygon 노드 소프트웨어를 실행하기에 충분한 마운트 스토리지가 있습니다. 이제 Heimdall을 구성하고 실행해 보겠습니다.

먼저 Docker로 Heimdall을 실행할 수 있는지 확인해봅니다. 다음 명령어를 실행합니다.

```bash
docker run -it 0xpolygon/heimdall:0.3.0 heimdallcli version
```

Docker를 사용하여 Heimdall을 실행하는 것이 처음인 경우 Heimdall는 필요한 이미지를 자동으로 가져와 버전 정보를 출력합니다.

![img](/img/full-node-docker/heimdall-version.png)

Heimdall 이미지의 세부 정보를 확인하거나 다른 태그를 찾으려면 Docker Hub의 저장소를 살펴보세요. https://hub.docker.com/repository/docker/0xpolygon/heimdall

이제 Heimdall `init` 명령어를 실행하여 홈 디렉터리를 설정합니다.

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/bin/heimdalld -it 0xpolygon/heimdall:0.3.0 init --home=/heimdall-home
```

어떤 일이 잘못되면 이 명령을 조금 위반합시다.

* 우리는 도킹 스테이션을 통해 명령을 실행하는 데 `docker run`사용하고 있습니다.

* 스위치 `-v /mnt/data/heimdall:/heimdall-home:rw`는 매우 중요합니다. 호스트 `/heimdall-home`시스템에서 `/mnt/data/heimdall`일찍 만든 폴더를 부피로 장착하고 있습니다.

* `rw`를 사용하면 명령어가 이 Docker 볼륨에 쓸 수 있습니다. 도킹 용기 내에서 모든 인텐트와 목적을 위해 Heimdall의 홈 디렉토리를 사용할 수 `/heimdall-home`있습니다.

* 인거는 이 컨테이너의 기본 엔트리 포인트를 최우선 과제로 삼고 `--entrypoint /usr/bin/heimdalld`있습니다.

* 이 `-it`스위치는 명령을 상호 작용적으로 실행하는 데 사용됩니다.

* 마지막으로 우리는 어떤 이미지를 실행할지 `0xpolygon/heimdall:0.3.0`지정합니다.

* 이후 `init --home=/heimdall-home`은 Heimdall 실행 파일로 전달되는 인수입니다. `init`은 실행할 명령어고 `--home`은 홈 디렉터리의 위치를 지정하는 데 사용됩니다.

`init` 명령어를 실행하면 `/mnt/data/heimdall` 디렉터리는 다음과 같은 구조로 표시됩니다.

![img](/img/full-node-docker/heimdall-tree.png)

이제 Heimdall을 시작하기 전에 몇 가지 업데이트를 해야 합니다. 먼저 `config.toml` 파일을 편집합니다.

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"

sudo emacs /mnt/data/heimdall/config/config.toml
```

시드 목록이 없는 경우 전체 노드 설정 문서에서 찾을 수 있습니다. 이 경우 파일에 다음과 같이 세 줄이 표시됩니다.

```
# A custom human readable name for this node
moniker="examplenode01"

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://0.0.0.0:26657"

# Comma separated list of seed nodes to connect to
seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

:::caution

`laddr`내부 파일이 두 개 `config.toml`있습니다. 섹션에서 `laddr`파라미터를 변경했는지 `[rpc]`확인하십시오.

:::

이제 `config.toml` 파일이 준비되었으므로 `heimdall-config.toml` 파일에 간단한 두 가지 변경 사항을 적용해야 합니다. 원하는 편집기를 사용하여 다음 두 가지 설정을 업데이트합니다.

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

`eth_rpc_url`을 이더리움 메인넷 RPC에 사용하는 URL로 업데이트되어야 합니다. `bor_rpc_url`이 경우 해당 경우 업데이트 될 것입니다.`http://bor:8545` edits를 작성한 후, 파일은 다음 라인을 가지고 있습니다.

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"
```

기본 `init` 명령어는 `genesis.json`을 제공하지만 Polygon 메인넷 또는 Mumbai에서는 작동하지 않습니다. 메인넷 노드를 설정하는 경우 다음 명령어를 실행하여 올바른 제네시스 파일을 다운로드할 수 있습니다.

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/master/builder/files/genesis-mainnet-v1.json
```

올바른 파일이 있는지 확인하려면 다음 해시를 사용해 확인하면 됩니다.

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## Heimdall 시작 {#starting-heimdall}
Heimdall을 시작하기 전에, 컨테이너가 이름으로 쉽게 네트워크를 형성할 수 있도록 Docker 네트워크를 만듭니다. 네트워크를 생성하려면 다음 명령어를 실행합니다.

```bash
docker network create polygon
```

이제 Heimdall을 시작하겠습니다. 다음 명령어를 실행합니다.

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.3.0 start --home=/heimdall-home
```

이 명령어의 많은 부분이 익숙해 보일 것이므로, 이제 새로운 것에 대해 이야기해보죠.

* `-p 26657:26657` 및 `-p 26656:26656` 스위치는 포트 매핑입니다. 이것은 도킹 스테이션을 통해 호스트 포트를 컨테이너의 포트에 `26657`매핑할 수 있으며, 같은 `26657`설정을 할 수 있습니다.`26656`

* 이 `--net polygon`스위치가 도킹 스테이커에게 Polygon 네트워크에서 이 컨테이너를 실행하여 kdog 네트워크에서 실행됩니다.

* `--name heimdall`디버깅에 유용한 컨테이너를 지정하지만, 다른 컨테이너가 Heimdall에 연결할 때 사용되는 모든 이름입니다.

* `-d`인거는 부커에게 이 컨테이너를 배경에서 실행합니다.

* 이 `--restart unless-stopped`스위치는 도킹 스테이커가 수동으로 수동으로 중단되지 않는 한 자동으로 컨테이너를 다시 시작하십시오.

* 마지막으로, 실제로 홈 디렉토리를 설정하는 `init`대신 애플리케이션을 실행하는 데 사용되고 `start`있습니다.

이때 진행 상황을 확인하면 도움이 됩니다. 다음 두 명령어가 유용할 수 있습니다.

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

이 단계에서 Heimdall은 동기화를 시작합니다. 로그를 보면 다음과 같은 정보가 담긴 로그가 나와있는 로그를 볼 수 있습니다.

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

이와 같은 정보가 표시되지 않으면 노드가 충분한 피어를 찾지 못한 것일 수 있습니다. 이 단계에서 다른 유용한 명령어는 Heimdall 동기화 상태를 확인하는 RPC 호출입니다.

```bash
curl localhost:26657/status
```

다음과 같은 응답이 반환됩니다.

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

이 초기 설정 단계에서는 `sync_info` 필드에 주의해야 합니다. `catching_up`가 true면 Heimdall이 완전히 동기화되지 않았음을 의미합니다. `sync_info` 내의 다른 속성을 확인하여 Heimdall이 얼마나 지연되고 있는지 알 수 있습니다.

## Bor 시작 {#starting-bor}

이 단계에서는 Heimdall을 성공적으로 실행하는 노드가 있어야 합니다. 그렇다면 Bor를 실행할 준비가 되었습니다.

Bor를 시작하기 전에 Heimdall REST 서버를 실행해야 합니다. 이 명령어는 Bor가 Heimdall에서 정보를 검색하는 데 사용하는 REST API를 시작합니다. 서버를 시작할 명령은 다음과 같습니다.

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.3.0 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

이 명령어에는 주목할 만한 두 가지 다른 부분이 있습니다. `start` 명령어를 실행하는 대신 `rest-server` 명령어를 실행합니다. 또한 REST 서버에 Heimdall과 통신하는 방법을 알려주는 `~–node “tcp://heimdall:26657”~`를 전달합니다.

이 명령이 성공적으로 실행되면, 이제 두 개의 명령어 컨테이너를 볼 `docker ps`수 있습니다. 또한 이 명령어를 실행하면 다음과 같은 기본 출력이 표시됩니다.

```bash
curl localhost:1317/bor/span/1
```

Bor는 이 인터페이스를 사용합니다. JSON 출력이 없다면 뭔가 잘못이 있습니다!

이제 Bor를 위해 `genesis`파일을 다운로드합시다.

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/master/builder/files/genesis-mainnet-v1.json'
```

이 파일에 대한 `sha256 sum`을 다시 확인합니다.

```
# sha256sum genesis.json
4bacbfbe72f0d966412bb2c19b093f34c0a1bd4bb8506629eba1c9ca8c69c778  genesis.json
```

이제 Bor를 시작하기 위해 기본 구성 파일을 만들어야 합니다.

```bash
docker run -it  0xpolygon/bor:0.3.3 dumpconfig | sudo tee /mnt/data/bor/config.toml
```

이 명령은 기본 설정으로 .toml 파일을 생성합니다. 파일에 몇 가지 변경을 할 것이므로 좋아하는 에디터와 함께 열고 몇 가지 업데이트를 만들 수 있습니다. 참고 : 우리는 변경 된 라인을 보여주고 있습니다.

참고로, Bor 이미지의 자세한 내용은 [https://hub.docker.com/laration](https://hub.docker.com/repository/docker/0xpolygon/bor) /docker/0xPolygon/bor를 확인할 수 있습니다.

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

이제 Bor를 시작할 준비가 되었습니다. 다음 명령어를 사용합니다.
```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.3.3 server --config /bor-home/config.toml
```

모든 것이 잘 된다면, 이렇게 보이는 많은 로그를 볼 수 있습니다.

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

Bor의 동기화 상태를 확인할 수 있는 몇 가지 방법이 있습니다. 가장 간단한 방법은 `curl`을 사용하는 것입니다.

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

이 명령을 실행할 때 다음과 같은 결과를 제공합니다.

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

동기화된 `currentBlock`과 알고 있는 `highestBlock`을 나타냅니다. 노드가 이미 신디사이저에 있다면, 우리는 얻을 수 `false`있습니다.

## 스냅샷 {#snapshots}
처음부터 동기화하면 매우 오랜 시간이 걸릴 수 있다는 것을 알게 될 것입니다. 프로세스를 가속화하고 싶다면 [https://docs.polygon.technology/docs/development/networks/snapps/snapping/snappinformation/snapping-snappinformation-snapping-heimdall-bor/에서](https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/) 나열된 지침을 확인할 수 있습니다.

최신 안내지만, 대략 다음과 같은 단계를 수행할 수 있습니다.

```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# At this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
