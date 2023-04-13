---
id: client-setup
title: 아카이브 노드 클라이언트 설정하기
sidebar_label: Set up an Archive Node Client
description: "시스템 요구사항 및 클라이언트 설정"
keywords:
  - erigon
  - archive
  - node
  - docs
  - polygon
  - client
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 시스템 요구 사항 {#system-requirements}

### Archive 노드 {#archive-node}

- 16코어 CPU
- 64GB RAM
- 기본적으로 적어도 20k+ iops 및 공습-0 기반 디스크 구조를 가진 1개 이상의 iop 또는 그 이상입니다.

### Errigon 클라이언트 {#erigon-client}

- Polygon 메인넷의 Archive 노드를 위해 5TB
- Polygon Mumbai의 Archive 노드를 위해 : 1TB
- SSD 또는 NVMe. 용량에 가까워지면 SSD 성능이 악화된다는 점을 명심하십시오.
- RAM: >= 16GB, 64비트 아키텍쳐
- Golang 버전 >= 1.18, GCC 10+

:::note HDD는 권장되지 않습니다.

HDD에서 Erigon은 항상 체인 팁의 N개 블록 뒤에 위치하며, 이보다 뒤처지지는 않습니다.

:::

## Erigon 클라이언트 설정 {#erigon-client-setup}

### 설치 방법 {#how-to-install}

Erigon을 설치하려면 다음 명령을 실행합니다.

```bash
git clone --recurse-submodules -j8 https://github.com/maticnetwork/erigon.git
cd erigon
git checkout v0.0.5
make erigon
```

`./build/bin/erigon`에 바이너리가 생성됩니다.

안정적인 버전을 사용하려면 포크한 리포지토리에서 `v0.0.5` 태그를 사용합니다.

### 시작 방법 {#how-to-start}

Erigon을 시작하십시오.

```bash
erigon --chain=mumbai
```

- 뭄바이 테스트넷의 경우에는 `chain=mumbai`를 사용합니다.
- Polygon 메인넷을 `chain=bor-mainnet`위해 사용하기

### Erigon 구성 방법 {#how-to-configure-erigon}

- Erigon 파일을 기본 위치가 아닌 다른 위치에 저장하려면 `-datadir`을 사용합니다.

    ```
    erigon --chain=mumbai --datadir=<your_data_dir>
    ```

- 로컬 **Heimdall**을 사용하지 않는 경우 `-bor.heimdall=<your heimdall url>`을 사용합니다. 자동적으로 `localhost:1317`에 연결을 시도합니다.

    ```makefile
    erigon --chain=mumbai --bor.heimdall=<your heimdall url> --datadir=<your_data_dir>
    ```

    - Polygon Mumbai Testnet 사용과 연결하고 싶다면 [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology).technology.technology에 접속하려면 https://heimmalth-api-testnet.technology.technology를 참조하십시오.

    - Polygon 메인넷의 경우 [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology).technology의 경우

### 더 빠른 동기화 팁 {#tips-for-faster-sync}

- 더 빠른 초기 동기화를 위해 IOPS가 높고 RAM 용량이 큰 시스템을 사용하십시오.
- 스냅샷 다운로드/업로드 속도를 높이려면 아래 명령을 사용하십시오.

```makefile
--torrent.upload.rate="512mb" --torrent.download.rate="512mb"
```

`512`를 시스템이 관리할 수 있는 대역폭으로 대체합니다.
