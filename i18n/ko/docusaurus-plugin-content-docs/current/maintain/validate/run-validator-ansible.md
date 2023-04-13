---
id: run-validator-ansible
title: Anible을 가진 유효성 검사자 노드 실행
sidebar_label: Using Ansible
description: Polygon에서 유효 ator 노드를 설정하기 위해 Ansci를 사용하십시오.
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip

이 가이드의 단계에는 **Heimdall** 및 **Bor** 서비스가 완전히 동기화될 때까지 기다리는 작업이 포함됩니다.
이 프로세스를 완료하는 데 며칠이 걸립니다. 그러나 유지 관리된 스냅샷을 사용하면 동기화 시간이 몇 시간으로 단축될 수도 있습니다. 자세한 것은 [<ins>Heimdall 및 Bor에 대한 스냅샷 지침</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) 을 참조하십시오.

[<ins>스냅</ins>](https://snapshot.polygon.technology/) 샷 다운로드의 링크를 보려면 Polygon 샤인스 Snapshots를 참조하십시오.
:::

이 섹션에서는 Ansible 플레이북을 통해 유효성 검사 노드를 시작하고 실행하는 과정을 안내합니다.

시스템 요구 사항은 [유효성 검사 노드 시스템 요구 사항](validator-node-system-requirements.md)을 참조하십시오.

바이너리에서 유효성 검사 노드를 시작하고 실행하려면 [바이너리에서 유효성 검사 노드 실행](run-validator-binaries.md)을 참조하십시오.

:::caution

새로운 유효성 검사자를 수용할 수 있는 공간은 제한되어 있습니다. 새로운 유효성 검사자는 이미 활성 유효성 검사자 unbonds를 사용하면 액티브 세트에 참여할 수 있습니다.

:::

## 기본 요건 {#prerequisites}

* 세 대의 머신— Ansible 플레이북을 실행할 로컬 머신 한 대 및 두 대의 원격 머신 — [센트리](/docs/maintain/glossary.md#sentry) 한 대 및 [유효성 검사자](/docs/maintain/glossary.md#validator) 한 대.
* 로컬 머신에 [Ansible](https://www.ansible.com/)이 설치됩니다.
* 로컬 머신에 [Python 3.x](https://www.python.org/downloads/)이 설치됩니다.
* 원격 머신에 Go가 설치되지 *않았는지* 확인하십시오.
* 로컬 머신의 SSH 공용 키는 Ansible이 연결할 수 있도록 원격 머신에 있습니다.
* 중계 네트워크로 Bloxroute를 이용할 수 있습니다. 신뢰할 수 있는 동료가 [Polygon](https://discord.com/invite/0xPolygon) Discord에서 **@validator-support팀** 연락처(문의)를 필요하면 해당 게이트웨이가 필요하면 POS 유효성 검사자 | 전체 노드 공급자 | 파트너스> 블로크루트로 문의하십시오.

:::info

[<ins>BloXroot 지침에</ins>](/maintain/validate/bloxroute.md) 따라 노드를 BloXroot 게이트웨이에 연결합니다.

:::

## 개요 {#overview}

:::caution

**정확한 요약 된 일련의 동작을** 따라야 합니다. 그렇지 않으면 문제에 실행합니다. 예를 들어, **유효한 노드 전에 sentry 노드가 항상 설정되어야 합니다**.

:::

실행 중인 유효성 검사 노드를 찾으려면 다음을 수행하십시오:

1. 3대의 머신이 준비되어 있습니다.
1. Ansible을 통해 센트리 노드를 설정하세요.
1. Ansible을 통해 유효성 검사 노드를 설정합니다.
1. 센트리 노드를 구성합니다.
1. 센트리 노드를 시작합니다.
1. 유효성 검사 노드를 구성합니다.
1. 소유자 및 서명자 키를 설정합니다.
1. 유효성 검사 노드를 시작합니다.
1. 커뮤니티와 노드 상태를 확인합니다.

## 센트리 노드 설정 {#set-up-the-sentry-node}

로컬 머신에서 [노드-ansible 리포지토리](https://github.com/maticnetwork/node-ansible)를 복제합니다.

```sh
git clone https://github.com/maticnetwork/node-ansible
```

복제된 리포지토리로 변경합니다.

```sh
cd node-ansible
```

센트리 노드와 유효성 검사 노드가 될 원격 머신의 IP 주소를 `inventory.yml` 파일에 추가합니다.

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

예시:

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

원격 센트리 머신이 도달할 수 있는지 확인합니다. 로컬 머신에서 다음을 실행합니다.

```sh
$ ansible sentry -m ping
```

다음을 결과물로 받게 됩니다.

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

센트리 노드 설정 테스트를 수행합니다

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

결과물은 다음과 같습니다.

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

sudo 권한으로 센트리 노드 설정을 수행하세요.

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

설정이 완료되면, 터미널에 완료 메시지가 표시됩니다.

:::note

문제가 발생하여 다시 시작하려면 다음을 실행하세요.

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## 유효성 검사 노드 설정 {#set-up-the-validator-node}

이 시점에서, 센트리 노드를 설정하게 됩니다.

로컬 머신에서, 유효성 검사 노드 설정을 실행하기 위한 Ansible 플레이북이 설정됩니다.

원격 유효성 검사 머신에 도달할 수 있는지 확인합니다. 로컬 머신에서 `ansible validator -m ping`실행하세요.

다음을 결과물로 받게 됩니다.

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

유효성 검사 노드 설정의 테스트를 수행합니다.

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

다음을 결과물로 받게 됩니다.

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

sudo 권한으로 유효성 검사 노드 설정을 수행합니다.

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

설정이 완료되면, 터미널에 완료 메시지가 표시됩니다.

:::note

문제가 발생하여 다시 시작하려면 다음을 실행하세요.

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## 센트리 노드 구성 {#configure-the-sentry-node}

원격 센트리 머신에 로그인합니다.

### Heimdall 서비스 구성 {#configure-the-heimdall-service}

`config.toml` 을(를) 열어서 `vi ~/.heimdalld/config/config.toml`을(를) 편집합니다.

다음을 변경합니다.

* `moniker` — 특정 이름. 예시: `moniker = "my-full-node"`.
* `seeds` — 노드 ID, IP 주소 및 포트로 구성되는 시드 노드 주소.

  다음 값 사용:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — 값을 `true`(으)로 설정하여 피어 교환을 활성화합니다. 예시: `pex = true`.
* `private_peer_ids` — 유효성 검사 머신에 설정된 Heimdall의 노드 ID.

  유효성 검사 머신에서 Heimdall의 노드 ID 받기:

  1. 유효성 검사 머신에 로그인하세요.
  1. `heimdalld tendermint show-node-id`을(를) 실행합니다.

  예시: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — 값을 `true`(으)로 설정하여 프로메테우스 메트릭을 활성화합니다. 예시: `prometheus = true`.
* `max_open_connections` — 값을 `100`(으)로 설정합니다. 예시: `max_open_connections = 100`.

`config.toml`에서 변경 사항을 저장합니다.

### Bor 서비스 구성 {#configure-the-bor-service}

`vi ~/node/bor/start.sh`을(를) 열어서 편집합니다.

`start.sh`에서, 끝에 다음 행을 추가하여 노드 ID, IP 주소 및 포트로 구성된 부팅 노드 주소를 추가합니다.

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

`start.sh`에서 변경 사항을 저장합니다.

`vi ~/.bor/data/bor/static-nodes.json`을(를) 열어서 편집합니다.

`static-nodes.json`에서, 다음을 변경합니다.

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` — 유효성 검사 머신에서 설정된 Bor의 노드 ID 및 IP 주소.

  유효성 검사 머신에서 Bor의 노드 ID 받기:

  1. 유효성 검사 머신에 로그인하세요.
  1. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`을(를) 실행합니다.

  예시: `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`.

`static-nodes.json`에서 변경 사항을 저장합니다.

### 방화벽 구성 {#configure-firewall}

센트리 머신에는 다음 포트가 열려 있어야 합니다`0.0.0.0/0`:

* 26656- Heimdall 서비스는 Heimdall 서비스를 사용하여 노드를 다른 노드에 연결합니다.

* 30303- Bor 서비스는 Bor 서비스를 사용하여 노드를 다른 노드에 연결합니다.

* 22- 유효성 검사자가 어디에 있든 SSH를 수행할 수 있도록 합니다.

:::note

그러나 VPN 연결을 사용하는 경우 VPN IP 주소에서만 들어오는 SSH 연결을 허용할 수 있습니다.

:::

## 센트리 노드 시작 {#start-the-sentry-node}

먼저 Heimdall 서비스를 시작합니다. Heimdall 서비스 동기화가 완료되면, Bor 서비스가 시작됩니다.

:::note

Heimdall 서비스는 처음부터 완전히 동기화할 수 있을 때까지 며칠이 걸립니다.

그러나 유지 관리된 스냅샷을 사용하면 동기화 시간이 몇 시간으로 단축될 수도 있습니다. 자세한 내용은 [<ins>Heimdall 및 Bor의 스냅샷 안내</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233)를 참조하세요.

스냅샷 다운로드 링크는 [Polygon 체인 스냅샷](https://snapshot.polygon.technology/)을 참조하십시오.

:::

### Heimdall 서비스 시작 {#start-the-heimdall-service}

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

로그에서, 다음 오류를 볼 수 있습니다:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

이는 네트워크의 노드 중 하나가 노드에 대한 연결을 거부했음을 의미합니다. 이러한 오류에 대해 아무것도 할 필요가 없습니다. 노드가 네트워크에서 더 많은 노드를 탐색할 때까지 기다립니다.

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

Heimdall 서비스가 완전히 동기화될 때까지기다립니다.

### Bor 서비스 시작 {#start-the-bor-service}

Heimdall 서비스가 완전히 동기화되면, Bor 서비스를 시작합니다.

Bor 서비스를 시작하세요.

```sh
sudo service bor start
```

Bor 서비스 로그 확인합니다

```sh
journalctl -u bor.service -f
```

## 유효성 검사 노드 구성 {#configure-the-validator-node}

:::note

이 섹션을 완료하려면 완전히 동기화된 이더리움 메인넷 노드의 RPC 엔드포인트가 준비되어 있어야 합니다.

:::

### Heimdall 서비스 구성 {#configure-the-heimdall-service-1}

원격 유효성 검사 머신에 로그인합니다.

`config.toml` 을(를) 열어서 `vi ~/.heimdalld/config/config.toml`을(를) 편집합니다.

다음을 변경합니다.

* `moniker` — 특정 이름. 예시: `moniker = "my-validator-node"`.
* `pex` — 값을 `false`(으)로 설정하여 피어 교환을 비활성화 예시: `pex = false`.
* `private_peer_ids` — 값을 주석으로 표시하여 비활성화 예시: `# private_peer_ids = ""`.


  센트리 머신에서 Heimdall의 노드 ID를 얻는 방법:

  1. 센트리 머신에 로그인합니다.
  1. `heimdalld tendermint show-node-id`을(를) 실행합니다.

  예시: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — 값을 `true`(으)로 설정하여 Prometheus 메트릭을 활성화합니다. 예시: `prometheus = true`.

`config.toml`에서 변경 사항을 저장합니다.

`vi ~/.heimdalld/config/heimdall-config.toml`을(를) 열어서 편집합니다.

`heimdall-config.toml`에서, 다음을 변경합니다.

* `eth_rpc_url` — 완전히 동기화된 이더리움 메인넷 노드를 위한 RPC 엔드포인트입니다, 예: Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

예시: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


`heimdall-config.toml`에서 변경 사항을 저장합니다.

### Bor 서비스 구성 {#configure-the-bor-service-1}

`vi ~/.bor/data/bor/static-nodes.json`을(를) 열어서 편집합니다.

`static-nodes.json`에서, 다음을 변경합니다.

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — 센트리 머신에 설정된 Bor의 노드 ID 및 IP 주소.

  센트리 머신에서 Bor의 노드 ID를 얻는 방법:

  1. 센트리 머신에 로그인합니다.
  1. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`을(를) 실행합니다.

  예시: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

`static-nodes.json`에서 변경 사항을 저장합니다.

## 소유자 및 서명자 키 설정 {#set-the-owner-and-signer-key}

Polygon에서는 소유자와 서명자 키를 다르게 유지해야 합니다.

* 서명자 — [체크포인트 트랜잭션](../glossary#checkpoint-transaction)을 서명하는 주소. 서명자 주소에 ETH를 1개 이상 유지하는 것이 좋습니다.
* 소유자 — 스테이킹 트랜잭션을 하는 주소. 매틱 토큰을 소유자 주소에 보관하는 것이 좋습니다.

### Heimdall 개인 키 생성 {#generate-a-heimdall-private-key}

유효성 검사 머신에서만 Heimdall 개인 키를 생성해야 합니다. **센트리 머신에서는 Heimdall 개인 키를 생성하지 마십시오.**

개인 키를 생성하려면 다음을 실행하세요.

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

EySogon_PRIVATE_KEY - 이더리움 지갑의 개인 키

:::

그러면 `priv_validator_key.json`이 생성됩니다. 생성된 JSON 파일을 Heimdall 구성 디렉터리로 이동하세요.

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Bor 키스토어 파일 생성 {#generate-a-bor-keystore-file}

유효성 검사 머신에서만 Bor 키스토어 파일을 생성해야 합니다. **센트리 머신에서는 Bor 키스토어 파일을 생성하지 마세요.**

개인 키를 생성하려면 다음을 실행하세요.

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — 이더리엄 지갑의 개인 키

:::

메시지가 나타나면, 키스토어 파일에 암호를 설정합니다.

그러면 `UTC-<time>-<address>` 키스토어 파일이 생성됩니다.

생성된 키스토어 파일을 Bor 구성 디렉터리로 이동하세요.

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### 추가`password.txt`

반드시 `password.txt` 파일을 생성한 다음에 Bor키스토어 파일 암호를 `~/.bor/password.txt` 파일에 추가하세요.

### 이더리움 주소 추가 {#add-your-ethereum-address}

`vi /etc/matic/metadata`을(를) 열어서 편집합니다.

`metadata`에서, 이더리움 주소를 추가합니다. 예시: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

`metadata`에서 변경 사항을 저장합니다.

## 유효성 검사 노드 시작 {#start-the-validator-node}

이 시점에서 반드시 다음 상태가 되어있어야 합니다.

* 센트리 머신에서 Heimdall 서비스가 완전히 동기화되고 실행되고 있습니다.
* Bor 서비스가 센트리 머신에서 실행 중입니다.
* 유효성 검사 머신에서 Heimdall 서비스 및 Bor 서비스가 구성되었습니다.
* 소유자 및 서명자 키가 구성되었습니다.

### Heimdall 서비스 시작 {#start-the-heimdall-service-1}

이제 유효성 검사 머신에서 Heimdall 서비스를 시작합니다. Heimdall 서비스가 동기화되면, 유효성 검사 머신에서 Bor 서비스를 시작합니다.

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
* `false` — Heimdall 서비스가 완전히 동기화되었습니다.

Heimdall 서비스가 완전히 동기화될 때까지기다립니다.

### Bor 서비스 시작 {#start-the-bor-service-1}

유효성 검사 머신에서 Heimdall 서비스가 완전히 동기화되면, 유효성 검사 머신에서 Bor 서비스를 시작합니다.

Bor 서비스를 시작하세요.

```sh
sudo service bor start
```

Bor 서비스 로그 확인합니다

```sh
journalctl -u bor.service -f
```

## 커뮤니티와의 노드 상태 확인 {#check-node-health-with-the-community}

센트리 노드와 유효성 검사 노드가 동기화되어 실행 중이므로 [Discord](https://discord.com/invite/0xPolygon)로 이동하여 커뮤니티에 노드 상태를 점검하도록 요청하십시오.

:::note

유효한 사람으로서 항상 서명자 주소를 확인하는 것이 의무적입니다. ETH의 균형이 0.5 ETH에 도달하면 다시 채워져야 합니다. 이를 피하면 노드를 체크 서 트랜잭션을 제출하는 것으로부터 밀어 붙일 것입니다.

:::

## 스테이킹 진행 {#proceed-to-staking}

센트리 및 유효성 검사 노드 상태를 확인했으므로 [스테이킹](/docs/maintain/validator/core-components/staking)을 진행합니다.
