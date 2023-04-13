---
id: full-node-binaries
title: 바이너리로 전체 노드 실행
description: 바이너리를 사용하여 풀 Polygon 노드를 배포합니다.
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

이 튜토리얼에서는 바이너리를 사용하여 전체 노드를 시작하고 실행하여 안내합니다. 시스템 요구 사항의 경우 [최소 기술 요구](technical-requirements.md) 사항 가이드를 참조하십시오.

:::tip

이 가이드의 단계에는 Heimdall 및 Bor 서비스가 완전히 동기화될 때까지 기다리는 작업이 포함됩니다. 이 프로세스를 완료하는 데 며칠이 걸립니다.

그러나 유지 관리된 스냅샷을 사용하면 동기화 시간이 몇 시간으로 단축될 수도 있습니다. 자세한 것은 [<ins>Heimdall 및 Bor에 대한 스냅샷 지침</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) 을 참조하십시오.

스냅 샷 다운로드의 링크를 보려면 Polygon [<ins>Chains 스냅 사진</ins>](https://snapshots.polygon.technology/) 페이지를 참조하십시오.

:::

## 개요 {#overview}

- 기계 준비
- 전체 노드 머신에 Heimdall 및 Bor 바이너리 설치
- 전체 노드 머신에서 Heimdall 및 Bor 서비스를 설정하기
- 전체 노드 머신 설정하기
- 전체 노드 머신을 시작하기
- 커뮤니티와의 노드 상태 확인

:::note

정확한 요약 된 행동의 순서를 따라가야 합니다. 그렇지 않으면 문제에 실행합니다.

:::

### 설치`build-essential`

이것은 전체 노드에 **필요합니다.** 설치 하려면 아래 명령을 실행합니다.

```bash
sudo apt-get update
sudo apt-get install build-essential
```

### GO 설치 {#install-go}

또한 전체 노드를 실행하는 데 **필요합니다.** **V1.18 또는 그 이상의** 설치 중 하나를 권장하는 것이 좋습니다.

```bash
wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
bash go-install.sh
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

## 바이너리 설치 {#install-binaries}

Polygon 노드는 2층으로 구성됩니다. Heimdall은 이더리움 네트워크와 병렬 계약을 모니터링하는 입찰서 포크입니다. Bor는 기본적으로 Heimdall 노드가 섞인 블록을 생성하는 Geth 포크입니다.

두 바이너리 모두 올바른 순서로 설치되어 실행하여 올바르게 작동해야합니다.

### Heimdall {#heimdall}

Heimdall 및 관련 서비스의 최신 버전을 설치하십시오. 올바른 [릴리스 버전에](https://github.com/maticnetwork/heimdall/releases) 체크 아웃을 확인하십시오. 최신 버전인 [Heimdall](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) v.0.3.0에 대한 메모에 다음과 같은 개선문이 포함되어 있습니다.
1. 상태 동기화 트랜잭션의 데이터 크기를 다음과 같이 제한합니다.
    * **30Kb** - **바이트**로 표시되는 경우
    * **문자열로** 나타낼 때 **60Kb**
2. 급증하는 이벤트로 인해 체인 진행에 지장이 생기는 경우 메모리 풀이 너무 빨리 채워지지 않도록 여러 검증자의 계약 이벤트 간 **지연 시간**을 늘렸습니다.

다음의 예는 데이터 크기가 제한되는 방식을 보여줍니다.

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

**Heimdall을** 설치하십시오.

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

`heimdalld` 및 `heimdallcli` 바이너리가 설치됩니다. 이제 컴퓨터에서 Heimdall 버전을 확인하여 설치 확인하십시오.

```bash
heimdalld version --long
```

### Bor {#bor}

최신 버전을 설치하십시오. 올바른 [발표 버전에](https://github.com/maticnetwork/bor/releases) git 체크 아웃을 확인하십시오.

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

`bor` 및 `bootnode` 바이너리가 설치됩니다. 이제 컴퓨터에서 Bor 버전을 확인하여 설치 확인하십시오.

```bash
bor version
```

## 노드 파일 구성 {#configure-node-files}

### 시작 저장소 가져오기 {#fetch-launch-repo}

```bash
cd ~/
git clone https://github.com/maticnetwork/launch
```

### 시작 디렉터리 구성 {#configure-launch-directory}

네트워크 디렉터리를 설정하려면 네트워크 이름과 노드 유형이 필요합니다.

**사용 가능한 네트워크**: `mainnet-v1`과`testnet-v4`

**노드 유형**:`sentry`

:::tip

메인넷과 테스트넷 설정을 위해 적절한 사용을 `<network-name>`사용하십시오. Polygon 메인넷과 Mumbai `testnet-v4`테스트넷을 `mainnet-v1`위해 사용하십시오.
:::

```bash
cd ~/
mkdir -p node
cp -rf launch/<network-name>/sentry/<node-type>/* ~/node
```

### 네트워크 디렉터리 구성 {#configure-network-directories}

**Heimdall 데이터 설정**

```bash
cd ~/node/heimdall
bash setup.sh
```

**Bor 데이터 설정**

```bash
cd ~/node/bor
bash setup.sh
```

## 서비스 파일 구성 {#configure-service-files}

적절한 을 사용하여 `service.sh`파일을 다운로드하십시오.`<network-name>` Polygon 메인넷과 Mumbai `testnet-v4`테스트넷을 `mainnet-v1`위해 사용하십시오.

```bash
cd ~/node
wget https://raw.githubusercontent.com/maticnetwork/launch/master/<network-name>/service.sh
```

**메타 데이터** 파일을 생성합니다.

```bash
sudo mkdir -p /etc/matic
sudo chmod -R 777 /etc/matic/
touch /etc/matic/metadata
```

`.service`파일을 만들고 시스템 디렉터리에 복사합니다.

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```


## 설정 파일 설정하기 {#setup-config-files}

- 원격 머신/VM에 로그인합니다.
- `config.toml` 파일에 몇 가지 세부 정보를 추가해야 합니다. `config.toml`파일을 열고 편집하는 데 다음 명령을 실행합니다.`vi ~/.heimdalld/config/config.toml`

구성 파일에서 정보를 변경하고 추가 `Moniker`할 필요가 `seeds`있습니다.

    ```bash
    moniker=<enter unique identifier>
    # For example, moniker=my-sentry-node

    # Mainnet:
    seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656"

    # Testnet:
    seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
    ```

    - **Pex** 값을 `true`로 변경
    - **Prometheus** 값을 `true`로 변경
    - `max_open_connections` 값을 `100`으로 설정

위의 변경을 할 **때 적절한 포맷을** 유지하십시오.

- `~/.heimdalld/config/heimdall-config.toml`에서 다음 구성:

    ```jsx
    eth_rpc_url=<insert Infura or any full node RPC URL to Goerli>
    ```

- 이 명령을 사용하여 Bor를 위해 `start.sh`파일을 엽니다.`vi ~/node/bor/start.sh` 파라그램을 시작하기 위해 다음 깃발을 추가하십시오.

  ```bash
  # Mainnet:
  --bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"

  # Testnet:
  --bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
  ```

- **Archive** 모드를 사용하려면 파일에 다음 깃발을 추가할 수 `start.sh`있습니다.

  ```jsx
  --gcmode 'archive' \
  --ws --ws.port 8546 --ws.addr 0.0.0.0 --ws.origins '*' \
  ```

## 서비스 시작 {#start-services}

Sentry Node에서 이 명령어를 사용하여 전체 Heimdall 노드를 실행합니다.

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

이제 Heimdall이 완전히 **동기화되어** Bor를 시작하는지 확인해야 합니다. Heimdall이 완전히 동기화되지 않은 상태에서 Bor를 시작하면 문제가 자주 발생합니다.

**Heimdall이 동기화되었는지 확인하십시오.**
  1. 원격 시스템/가상 시스템에서 `curl localhost:26657/status`을 실행합니다
  2. 결과에서 `catching_up` 값은 `false`이어야 합니다

Heimdall이 신디사이드되면, 아래 명령을 실행합니다.

```bash
sudo service bor start
```

## Logs {#logs}

로그는 `journalctl`linux 툴에서 관리할 수 있습니다. 다음은 고급 사용에 대한 [자습서입니다. Journalctl 사용 방법](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)

**Heimdall 노드 로그 확인**

```bash
journalctl -u heimdalld.service -f
```

**Heimdall Rest-서버 로그를 확인하십시오.**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Bor Rest-서버 로그를 확인하십시오.**

```bash
journalctl -u bor.service -f
```

## 포트 및 방화벽 설정 {#ports-and-firewall-setup}

포트 22, 26656 및 30303을 Sentry 노드 방화벽의 월드 (0.0.0.0/0)에 엽니다.

요구사항 및 보안 지침에 따라 VPN을 사용하여 포트 22에 대한 액세스를 제한할 수 있습니다.
