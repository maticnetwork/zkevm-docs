---
id: run-validator-binaries
title: 비니어스에서 유효성 검사기 노드 실행
sidebar_label: Using Binaries
description: 바이너리 를 사용하여 유효성 검사자 노드를 설정하기
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
이 가이드의 스텝에는 H**eimdall **및 B**or **서비스가 완전히 동기화되기를 기다리는 것을 포함합니다. 그러나 유지 관리된 스냅샷을 사용하면 동기화 시간이 몇 시간으로 단축될 수도 있습니다. 자세한 것은 [<ins>Heimdall 및 Bor에 대한 스냅샷 지침</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233) 을 참조하십시오.

[<ins>스냅</ins>](https://snapshot.polygon.technology/) 샷 다운로드의 링크를 보려면 Polygon 샤인스 Snapshots를 참조하십시오.

:::

이 가이드에서는 유효성 검사 노드를 실행하는 과정을 안내합니다.

시스템 요구 사항의 경우 [유효성 검사자 노드 시스템 요구](validator-node-system-requirements.md) 사항 가이드를 따르십시오.

가능한 Anible을 통해 유효성 검사자 노드를 시작하고 싶다면 [가능한 유효성 검사자 노드를 실행하여 Dr. Kron 을](run-validator-ansible.md) 참조하십시오.

:::caution

새로운 유효성 검사자를 수용할 수 있는 공간은 제한되어 있습니다. 새로운 유효성 검사자는 이미 활성 유효성 검사자 unbonds를 사용하면 액티브 세트에 참여할 수 있습니다.

:::

## 기본 요건 {#prerequisites}

* 머신 두 대 - [센트리](/docs/maintain/glossary.md#sentry) 머신과 [유효성 검사](/docs/maintain/glossary.md#validator) 머신
* `build-essential`이 센트리 머신과 유효성 검사 머신에 모두 설치되어 있어야 합니다.

설치 방법:

  ```sh
  sudo apt-get install build-essential
  ```

* Go 1.18이 센트리 머신과 유효성 검사 머신에 설치되어 있어야 합니다.

설치 방법:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* Sentry와 validator기 모두에 설치된 RabbitMQ.

다음은 RabbitMQ를 설치할 명령입니다.

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

RabbitMQ 설치에 대한 자세한 정보를 [<ins>여기에서</ins>](https://www.rabbitmq.com/download.html) 확인하십시오.

:::


:::info
[<ins>BloXroot 지침에</ins>](/maintain/validate/bloxroute.md) 따라 노드를 BloXroot 게이트웨이에 연결합니다.
:::

## 개요 {#overview}

실행 중인 유효성 검사 노드를 찾으려면 **정확한 단계별 이행 순서**를 수행하세요:

:::caution

이 단계를 순서대로 수행하지 않으면 구성 문제가 발생합니다. 센트리 노드는 항상 유효성 검사 노드보다 먼저 설정해야 한다는 것을 꼭 기억하십시오.

:::

1. 두 대의 머신을 준비합니다. 한 대는 센트리 노드용, 한 대는 유효성 검사 노드용입니다.
2. 센트리 머신과 유효성 검사 머신에 Heimdall과 Bor 바이너리를 설치합니다.
3. 센트리 머신과 유효성 검사 머신에 Heimdall과 Bor 서비스 파일을 설정합니다.
4. 센트리 머신과 유효성 검사 머신에 Heimdall과 Bor 서비스를 설정합니다.
5. 센트리 노드를 구성합니다.
6. 센트리 노드를 시작합니다.
7. 유효성 검사 노드를 구성합니다.
8. 소유자 및 서명자 키를 설정합니다.
9. 유효성 검사 노드를 시작합니다.
10. 커뮤니티와 노드 상태를 확인합니다.

## 바이너리 설치 {#installing-the-binaries}

센트리 머신과 유효성 검사 머신에 바이너리를 설치합니다.

### Heimdall 설치 {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview)은 스테이크 증명 확인자 계층입니다. 이더리움 메인넷에 플라즈마 블록을 나타내는 체크포인트 역할을 합니다.

최신 버전인 [Heimdall](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) v.0.3.0에는 다음과 같은 몇 가지 개선이 포함되어 있습니다.
1. 상태 동기화 트랜잭션의 데이터 크기를 다음과 같이 제한합니다.
    * **30Kb** - **바이트**로 표시되는 경우
    * **60Kb** - **문자열**로 표시되는 경우
2. 급증하는 이벤트로 인해 체인 진행에 지장이 생기는 경우 메모리 풀이 너무 빨리 채워지지 않도록 여러 검증자의 계약 이벤트 간 **지연 시간**을 늘렸습니다.

다음의 예는 데이터 크기가 제한되는 방식을 보여줍니다.

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

[Heimdall 저장소](https://github.com/maticnetwork/heimdall/) 복제:

```sh
git clone https://github.com/maticnetwork/heimdall
```

올바른 [릴리스 버전](https://github.com/maticnetwork/heimdall/releases)으로 이동:

```sh
git checkout RELEASE_TAG
```

`RELEASE_TAG`는 설치하는 릴리스 버전의 태그입니다.

예를 들어:

```sh
git checkout v0.3.0
```

올바른 릴리스를 사용 중이면 Heimdall 설치:

```sh
make install
source ~/.profile
```

Heimdall 설치 확인:

```sh
heimdalld version --long
```

:::note

계속하려면, Heimdall을 센트리 머신과 유효성 검사 머신에 모두 설치해야 합니다.

:::

### Bor 설치 {#installing-bor}

[Bor는](/docs/pos/bor) 블록 제작 레이어를 역할을하는 사이드 세카인 운영자이며, Heimdall과 동기화되어 각 [스펀](/docs/maintain/glossary.md#span) 및 [스프프린에](/docs/maintain/glossary.md#sprint) 대해 블록 제작자 및 검증 장치를 선택하여 각 스펀 및 스펀트에 대해 블록 제작자 및 검증 장치를 선택합니다.

[Bor 리포지토리](https://github.com/maticnetwork/bor) 복제:

```sh
git clone https://github.com/maticnetwork/bor
```

올바른 [릴리스 버전](https://github.com/maticnetwork/bor/releases)으로 이동:

```sh
git checkout RELEASE_TAG
```

`RELEASE_TAG`는 설치하는 릴리스 버전의 태그입니다.

예를 들어:

```sh
git checkout v0.3.3
```

Bor 설치:

```sh
make bor-all
```

심볼릭 링크 생성:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Bor 설치 확인:

```sh
bor version
```

:::note

계속하려면, Bor를 센트리 머신과 유효성 검사 머신에 모두 설치해야 합니다.

:::

## 노드 파일 설정 {#setting-up-node-files}

:::note

노드 파일은 센트리 머신과 유효성 검사 머신 모두에 설정해야 합니다.

:::

### 런치 리포지토리 가져오기 {#fetching-the-launch-repository}

[런치 리포지토리](https://github.com/maticnetwork/launch) 복제:

```sh
git clone https://github.com/maticnetwork/launch
```

### 런치 디렉터리 설정 {#setting-up-the-launch-directory}

#### 센트리 머신에서 {#on-the-sentry-machine}

`node`디렉터리 생성:

```sh
mkdir -p node
```

`launch`디렉터리에서 `node`디렉터리로 파일과 스크립트 복사:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### 유효성 검사 머신에서 {#on-the-validator-machine}

`node`디렉터리 생성:

```sh
mkdir -p node
```

`launch`디렉터리에서 `node`디렉터리로 파일과 스크립트 복사:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### 네트워크 디렉토리 설정 {#setting-up-the-network-directories}

:::note

센트리 머신과 유효성 검사 머신 모두에서 이 세션을 실행합니다.

:::

#### Heimdall 설정 {#setting-up-heimdall}

`node`디렉터리로 변경:

```sh
cd ~/node/heimdall
```

설정 스크립트 실행:

```sh
bash setup.sh
```

#### Bor 설정 {#setting-up-bor}

`node`디렉터리로 변경:

```sh
cd ~/node/bor
```

설정 스크립트 실행:

```sh
bash setup.sh
```

## 서비스 설정 {#setting-up-the-services}

:::note

센트리 머신과 유효성 검사 머신 모두에서 이 세션을 실행합니다.

:::

`node`디렉터리로 이동:

```sh
cd ~/node
```

설정 스크립트 실행:

```sh
bash service.sh
```

서비스 파일을 시스템 디렉터리로 복사:

```sh
sudo cp *.service /etc/systemd/system/
```

## 센트리 노드 구성 {#configuring-the-sentry-node}

원격 센트리 머신에 로그인하여 시작합니다.

### Heimdall 서비스 구성 {#configuring-the-heimdall-services}

편집할 Heimdall 구성 파일 열기:

```sh
vi ~/.heimdalld/config/config.toml
```

에서 `config.toml`다음 매개변수 변경:

* `moniker` — 특정 이름. 예시: `moniker = "my-sentry-node"`.
* `seeds` — 노드 ID, IP 주소 및 포트로 구성되는 시드 노드 주소.

  다음 값 사용:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — 값을 `true`(으)로 설정하여 피어 교환을 활성화합니다. 예시: `pex = true`.
* `private_peer_ids` — 유효성 검사 머신에 설정된 Heimdall의 노드 ID.

  유효성 검사 머신에서 Heimdall의 노드 ID 받기:

  1. 유효성 검사 머신에 로그인합니다.
  2. 다음 실행:
     ```sh
     heimdalld tendermint show-node-id
     ```

  예시: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — 값을 `true`(으)로 설정하여 프로메테우스 메트릭을 활성화합니다. 예시: `prometheus = true`.
* `max_open_connections` — 값을 `100`(으)로 설정합니다. 예시: `max_open_connections = 100`.

`config.toml`에서 변경 사항을 저장합니다.

### Bor 서비스 구성 {#configuring-the-bor-service}

편집할 Bor 구성 파일 열기:

```sh
`vi ~/node/bor/start.sh`
```

`start.sh`에서 노드 ID, IP 주소, 포트로 구성된 부트 노드 주소를 추가하려면 파일 끝에 다음 행 추가:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

`start.sh`에서 변경 사항을 저장합니다.

### 방화벽 구성 {#configuring-a-firewall}

센트리 머신에는 다음 포트가 열려 있어야 합니다`0.0.0.0/0`:

* `26656`- Heimdall 서비스는 노드를 다른 Heimdall 서비스 노드에 연결합니다.

* `30303`- Bor 서비스는 노드를 다른 Bor 서비스 노드에 연결합니다.

* `22`- 유효성 검사자가 어디에 있든 ssh 할 수 있도록 합니다.

## 센트리 노드 시작 {#starting-the-sentry-node}

먼저 Heimdall 서비스를 시작합니다. Heimdall 서비스 동기화가 완료되면, Bor 서비스가 시작됩니다.

:::note

Heimdall 서비스는 처음부터 완전히 동기화하는 데 며칠이 걸립니다.

그러나 유지 관리된 스냅샷을 사용하면 동기화 시간이 몇 시간으로 단축될 수도 있습니다. 자세한 것은 [<ins>Heimdall 및 Bor에 대한 스냅샷 지침</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233) 을 참조하십시오.

스냅샷 다운로드 링크는 [Polygon 체인 스냅샷](https://snapshot.polygon.technology/)을 참조하십시오.

:::

### Heimdall 서비스 시작 {#starting-the-heimdall-service}

Heimdall 서비스를 시작합니다.

```sh
sudo service heimdalld start
```

Heimdall 레스트 서버를 시작합니다.

```sh
sudo service heimdalld-rest-server start
```

Heimdall 서비스 로그를 확인합니다.

```sh
journalctl -u heimdalld.service -f
```

:::note

로그에 다음 오류가 표시될 수 있습니다:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

이 로그는 네트워크의 노드 중 하나가 노드에 대한 연결을 거부했음을 의미합니다. 노드가 네트워크에서 더 많은 노드를 크롤링할 때까지 기다리십시오. 오류 해결을 위해 아무것도 할 필요 없습니다.

:::

Heimdall 레스트 서버 로그를 확인합니다:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Heimdall의 동기화 상태를 확인합니다.

```sh
curl localhost:26657/status
```

출력된 값은 다음과 같습니다. `catching_up`

* `true` — Heimdall 서비스가 동기화 중입니다.
* `false` — Heimdall 서비스가 완전히 동기화되었습니다.

Heimdall 서비스가 완전히 동기화될 때까지 기다리십시오.

### Bor 서비스 시작 {#starting-the-bor-service}

Heimdall 서비스가 동기화되면 Bor 서비스를 시작합니다.

Bor 서비스 시작:

```sh
sudo service bor start
```

Bor 서비스 로그 확인:

```sh
journalctl -u bor.service -f
```

## 유효성 검사 노드 구성 {#configuring-the-validator-node}

:::note

이 섹션을 완료하려면 완전히 동기화된 이더리움 메인넷 노드의 RPC 엔드포인트가 준비되어 있어야 합니다.

:::

### Heimdall 서비스 구성 {#configuring-the-heimdall-service}

원격 유효성 검사 머신에 로그인합니다.

`vi ~/.heimdalld/config/config.toml`을(를) 열어서 편집합니다.

`config.toml`에서, 다음을 변경합니다.

* `moniker` — 특정 이름. 예시: `moniker = "my-validator-node"`.
* `pex` — 값을 `false`(으)로 설정하여 피어 교환을 비활성화 예시: `pex = false`.
* `private_peer_ids` — 값을 주석으로 표시하여 비활성화 예시: `# private_peer_ids = ""`.

  센트리 머신에서 Heimdall의 노드 ID를  얻는 방법:

  1. 센트리 머신에 로그인합니다.
  1. `heimdalld tendermint show-node-id`을(를) 실행합니다.

예시: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — 값을 `true`(으)로 설정하여 프로메테우스 메트릭을 활성화합니다. 예시: `prometheus = true`.

`config.toml`에서 변경 사항을 저장합니다.

`vi ~/.heimdalld/config/heimdall-config.toml`을(를) 열어서 편집합니다.

`heimdall-config.toml`에서, 다음을 변경합니다.

* `eth_rpc_url` — 완전히 동기화된 이더리움 메인넷 노드를 위한 RPC 엔드포인트, 즉 Infura.`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

예시: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

`heimdall-config.toml`에서 변경 사항을 저장합니다.

### Bor 서비스 구성 {#configuring-the-bor-service-1}

`vi ~/.bor/data/bor/static-nodes.json`을(를) 열어서 편집합니다.

`static-nodes.json`에서, 다음을 변경합니다.

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"`- 센트리 머신에 설정된 Bor의 노드 아이디와 IP 주소

  센트리 머신에서 Bor의 노드 ID를 얻는 방법:

  1. 센트리 머신에 로그인합니다.
  2. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`을(를) 실행합니다.

  예시: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

`static-nodes.json`에서 변경 사항을 저장합니다.

## 소유자 키와 서명자 키 설정 {#setting-the-owner-and-signer-key}

Polygon에서는 소유자 키와 서명자 키를 다르게 유지할 것을 권장합니다.

* 서명자 - 체크포인트 트랜잭션에 서명하는 [](/docs/maintain/glossary.md#checkpoint-transaction) 주소입니다. 서명자 주소에 1개 이상의 ETH를 유지하는 것이 좋습니다.
* 소유자 — 스테이킹 트랜잭션을 하는 주소입니다. 사용자 주소에 매틱 토큰을 유지하는 것이 좋습니다.

### Heimdall 개인 키 생성 {#generating-a-heimdall-private-key}

유효성 검사 머신에서만 Heimdall 개인 키를 생성해야 합니다. 센트리 머신에서 Heimdall 개인 키를 생성하지 마십시오.

개인 키를 생성하려면 다음을 실행하세요.

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

여기에서

* ETHEREUM_PRIVATE_KEY — 이더리엄 지갑의 개인 키

그러면 `priv_validator_key.json`이 생성됩니다. 생성된 JSON 파일을 Heimdall 구성으로 이동 디렉토리:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Bor 키스토어 파일 생성 {#generating-a-bor-keystore-file}

유효성 검사 머신에서만 Bor 키스토어 파일을 생성해야 합니다. 센트리 머신에서는 Bor 키스토어 파일을 생성하지 마십시오.

개인 키를 생성하려면 다음을 실행하세요.

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

여기에서

* ETHEREUM_PRIVATE_KEY — 이더리엄 지갑의 개인 키

메시지가 나타나면, 키스토어 파일에 암호를 설정합니다.

그러면 `UTC-<time>-<address>` 키스토어 파일이 생성됩니다.

생성된 키스토어 파일을 Bor 구성 디렉터리로 이동하세요.

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### password.txt 추가 {#add-password-txt}

반드시 `password.txt`파일을 생성한 다음 Bor 키스토어 파일 암호를 바로 파일에`~/.bor/password.txt` 추가하십시오.

### 이더리움 주소 추가 {#add-your-ethereum-address}

`vi /etc/matic/metadata`을(를) 열어서 편집합니다.

`metadata`에서, 이더리움 주소를 추가합니다. 예시: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

`metadata`에서 변경 사항을 저장합니다.

## 유효성 검사 노드 시작 {#starting-the-validator-node}

이 시점에서 반드시 다음 상태가 되어있어야 합니다.

* 센트리 머신의 Heimdall 서비스가 동기화되어 실행 중입니다.
* Bor 서비스가 센트리 머신에서 실행 중입니다.
* 유효성 검사 머신에서 Heimdall 서비스 및 Bor 서비스가 구성되었습니다.
* 소유자 및 서명자 키가 구성되었습니다.

### Heimdall 서비스 시작 {#starting-the-heimdall-service-1}

이제 유효성 검사 머신에서 Heimdall 서비스를 시작합니다. Heimdall 서비스가 동기화되면 유효성 검사 머신에서 Bor 서비스를 시작합니다.

Heimdall 서비스를 시작합니다.

```sh
sudo service heimdalld start
```

Heimdall 레스트 서버를 시작합니다.

```sh
sudo service heimdalld-rest-server start
```

Heimdall 브리지를 시작합니다.

```sh
sudo service heimdalld-bridge start
```

Heimdall 서비스 로그를 확인합니다.

```sh
journalctl -u heimdalld.service -f
```

Heimdall 레스트 서버 로그를 확인합니다:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Heimdall 브리지 로그를 확인합니다.

```sh
journalctl -u heimdalld-bridge.service -f
```

Heimdall의 동기화 상태를 확인합니다.

```sh
curl localhost:26657/status
```

출력된 값은 다음과 같습니다. `catching_up`

* `true` — Heimdall 서비스가 동기화 중입니다.
* `false`- Heimdall 서비스가 동기화되었습니다.

Heimdall 서비스가 완전히 동기화될 때까지기다립니다.

### Bor 서비스 시작 {#starting-the-bor-service-1}

유효성 검사 머신에 Heimdall 서비스가 동기화되면, 유효성 검사 머신에서 Bor 서비스를 시작합니다.

Bor 서비스 시작:

```sh
sudo service bor start
```

Bor 서비스 로그를 확인합니다.

```sh
journalctl -u bor.service -f
```

## 커뮤니티로 상태 확인 {#health-checks-with-the-community}

이제 센트리 노드와 유효성 검사 노드가 동기화되어 실행 중이므로, [Discord로](https://discord.com/invite/0xPolygon) 이동해 커뮤니티에 노드 상태 확인을 요청합니다.

:::note

유효한 사람으로서 항상 서명자 주소를 확인하는 것이 의무적입니다. ETH의 균형이 0.5 ETH에 도달하면 다시 채워져야 합니다. 이를 피하면 노드를 체크 서 트랜잭션을 제출하는 것으로부터 밀어 붙일 것입니다.

:::

## 다음 단계: 스테이킹 {#next-steps-staking}

이제 센트리 노드와 유효성 검사 노드의 상태가 확인되었으니, [스테이킹](/docs/maintain/validator/core-components/staking.md) 가이드로 진행해 네트워크 백업을 시작합니다.
