---
id: full-node-deployment
title: Ansible로 풀 노드 실행하기
description: Ansciive를 사용하여 풀 노드를 배포합니다.
keywords:
  - docs
  - polygon
  - matic
  - node
  - full node setup
  - ansible
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

이 튜토리얼에서는 Anable을 사용하여 전체 노드를 시작하고 실행하여 귀하를 안내합니다.

[Anyscript](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) 북을 사용하면 전체 노드를 구성 및 관리합니다. 시스템 요구 사항에 대한 [최소 기술 요구](technical-requirements.md) 사항 가이드를 참조하십시오.

:::tip

이 가이드의 스텝에는 Heimdall 및 Bor 서비스가 완벽하게 동기화되도록 기다리는 것을 포함합니다. 이 프로세스를 완료하는 데 며칠이 걸립니다.

또는 유지 된 스냅 샷을 사용하여 동기화 시간을 몇 시간으로 줄일 수 있습니다. 자세한 것은 [<ins>Heimdall 및 Bor에 대한 스냅샷 지침</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) 을 참조하십시오.

스냅 샷 다운로드의 링크를 보려면 Polygon [<ins>Chains 스냅 사진</ins>](https://snapshot.polygon.technology/) 페이지를 참조하십시오.

:::

## 기본 요건 {#prerequisites}

- Finython3.x를 사용하여 로컬 머신에 Anisible을 설치하십시오. Python2.x 버전이 설치된 경우, 설정은 작동하지 않습니다.
    - 피타고스 3.x를 사용하여 Anible을 설치하십시오. 컴퓨터에 핍이 없다면 [여기에](https://pip.pypa.io/en/stable/) 명시된 단계를 따르십시오. 설치 `pip3 install ansible`실행 용납 가능합니다.
- Polygon [PoS Anible 저장소](https://github.com/maticnetwork/node-ansible#requirements) 를 위해 확인하십시오. 요구 사항.
- 또한 Go가 환경에 **설치되지 않았는지** 확인해야 합니다. Go가 설치되어 있으면 Ansible이 Go의 특정 패키지를 설치하도록 요구하기 때문에 Ansible을 통해 풀 노드를 설정하려고 하면 문제가 발생합니다.
- 또한, 가상 시스템/시스템에 Polygon 유효성 검사자, Heimdall 또는 Bor와 관련된 이전 설정이 없어야 합니다. 그러한 경우 설정에 문제가 발생하므로 삭제해야 합니다.

:::info Heimdall 소스 향상

최신 Heimdall 버전인 **[v.0.3.0에는](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)** 몇 가지 개선이 포함되어 있습니다. 서로 다른 유효성 검사자의 계약 이벤트 간의 지연 시간이 **늘어** 밈 풀이 채우지 않도록 합니다. 체인의 진행 상황을 방해할 수 있는 이벤트의 터빈이 발생하면 신속하게 가능합니다.

또한, **상태 싱크 tx에서 30KB(바이트에서 표시되는 경우) 및 60KB(문자열로 정의 된 경우)로 표시되는 경우** 데이터 크기는 제한되었습니다. 예시:

```bash
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```
:::

## 전체 노드 설치 {#full-node-setup}

- 전체 노드가 설정되어 있는 원격 머신 또는 VM에 액세스 할 수 있는지 확인하십시오.
  > 자세한 내용은 [https://github.com/maticnetwork/node-anable#setup을](https://github.com/maticnetwork/node-ansible#setup) 참조하십시오.
- 클론 [(https://github.com/maticnetnet/node-anible](https://github.com/maticnetwork/node-ansible) 저장소를 클론 : /github.com/micnetnetwork/node-anible 저장소를 제공합니다.
- node-anscripe 폴더에 탐색 :`cd node-ansible`
- `inventory.yml`파일을 편집하고 섹션에서 IP(s)를 `sentry->hosts`삽입하십시오.
  > 자세한 내용은 [https://github.com/maticnetwork/node-anable#인벤토리를](https://github.com/maticnetwork/node-ansible#inventory) 참조하십시오.
- 원격 기계가 실행 가능하도록 접속하면 체크하십시오.`ansible sentry -m ping`
- 올바른 기계가 설정되면, 다음 명령을 실행합니다.

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry" --list-hosts

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry" --list-hosts
  ```

  <img src={useBaseUrl("img/network/full-node-mumbai.png")} />

- 다음으로, 이 명령어를 사용하여 전체 노드를 설정합니다.

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry"

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry"
  ```

- 다음 문제를 사용하면 전체 설정을 삭제하고 청소하십시오.
  ```
  ansible-playbook playbooks/clean.yml
  ```

- Anible 플레이북을 시작하면 리모컨에 로그인하십시오.

- Heimdall 시드 노드:

  ```bash
  moniker=<enter unique identifier>

  # Mainnet:
  seeds="d3a8990f61bb3657da1664fe437d4993c4599a7e@3.211.248.31:26656,d3d7d397339c9126235dfab11bf925e269776f4f@3.212.183.151:26656,68254d33685fad151e45bfe1ed33d538ba6ec8cb@3.93.224.197:26656,d26c54ebbf274896f12977bb13d83ac1237a8226@184.73.124.158:26656,f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656"

  # Testnet:
  seeds="b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656,4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,7a6c7b5d25b13ce3448b047dbebeb1a19cc2e092@18.213.200.99:26656"
  ```
- 부노드:

  ```bash
  # Mainnet:
  bootnode ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303","enode://4be7248c3a12c5f95d4ef5fff37f7c44ad1072fdb59701b2e5987c5f3846ef448ce7eabc941c5575b13db0fb016552c1fa5cca0dda1a8008cf6d63874c0f3eb7@3.93.224.197:30303","enode://32dd20eaf75513cf84ffc9940972ab17a62e88ea753b0780ea5eca9f40f9254064dacb99508337043d944c2a41b561a17deaad45c53ea0be02663e55e6a302b2@3.212.183.151:30303"]

  # Testnet:
  bootnodes ["enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303","enode://f0f48a8781629f95ff02606081e6e43e4aebd503f3d07fc931fad7dd5ca1ba52bd849a6f6c3be0e375cf13c9ae04d859c4a9ae3546dc8ed4f10aa5dbb47d4998@34.226.134.117:30303"]
  ```

- Heimdall이 동기화되었는지 확인하는 방법
    - 원격 시스템/가상 시스템에서 `curl localhost:26657/status`을 실행합니다
    - 결과에서 `catching_up` 값은 `false`이어야 합니다

- Heimdall이 신디사이드되면, 실행
    - `sudo service bor start`

Anible을 사용하여 전체 노드를 성공적으로 세웠습니다.

:::note

Bor가 데이터에 대한 허가 오류를 제시하는 경우, Bor 사용자가 Bor 파일의 소유자를 만들기 위해 이 명령을 실행합니다.

```bash
sudo chown bor /var/lib/bor
```

:::
## Logs {#logs}

로그는 `journalctl`linux 툴에서 관리할 수 있습니다. 다음은 고급 사용에 대한 [자습서입니다. Journalctl 사용 방법](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)

**Heimdall 노드 로그 확인**

```bash
journalctl -u heimdalld.service -f
```

**Bor Rest-서버 로그를 확인하십시오.**

```bash
journalctl -u bor.service -f
```

## 포트 및 방화벽 설정 {#ports-and-firewall-setup}

포트 22, 26656 및 30303을 Sentry 노드 방화벽의 월드 (0.0.0.0/0)에 엽니다.

요구사항 및 보안 지침에 따라 VPN을 사용하여 포트 22에 대한 액세스를 제한할 수 있습니다.