---
id: snapshot-instructions-heimdall-bor
title: Heimdall 및 Bor 스냅샷
description: 빠른 동기화를 위한 Heimdall 및 Bor 스냅샷 지침
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
  - heimdall
  - bor
  - snapshots
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

새로운 센트리, 유효성 검사자 또는 풀 노드 서버를 설정할 때 스냅샷을 사용하는 것이 좋습니다. 네트워크에서 동기화를 하지 않고도 동기화 속도를 높일 수 있습니다. Heimdall 및 Bor 모두의 경우에서 스냅샷을 사용하면 며칠을 절약할 수 있습니다.

:::tip

최신 스냅 샷을 보려면 [<ins>Polygon 샤인스 Snapshot을</ins>](https://snapshot.polygon.technology/) 방문하십시오.

:::

## Heimdall 스냅샷 {#heimdall-snapshot}

먼저, 노드 설정 가이드에 따라 **필수 조건**을 갖추도록 노드를 설정해야 합니다. Heimdall이 동기화할 서비스를 시작하기 전에 아래 단계를 따라 스냅샷을 사용하십시오.

1. 다음 명령을 실행하여 가상 머신에서 Heimdall의 스냅샷 tar 파일을 다운로드합니다.

```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-08.tar.gz
```

2. 다음 명령을 실행하여 Heimdall 데이터 디렉터리에서 tar 파일의 압축을 풉니다.
```
// You must ensure you are running this command before you start the Heimdall service on your node.
// If your Heimdall service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Heimdall service again:
tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

// If your Heimdall data directory is different,
// please replace the directory name in the command for starting the Heimdall service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Heimdall Data directory:
tar -xzvf heimdall-snapshot-2021-11-08.tar.gz -C /var/lib/heimdall/data/
```

## Bor 스냅샷 {#bor-snapshot}

먼저, 노드 설정 가이드에 따라 **필수 조건**을 갖추도록 노드를 설정해야 합니다. Bor가 동기화할 서비스를 시작하기 전에 아래 단계를 따라 스냅샷을 사용하십시오.

1. 다음 명령을 실행하여 가상 머신에서 스냅샷 tar 파일을 다운로드합니다.
```
aria2c -x6 -s6  <snapshot_url>

// For example, this will download the snapshot of Heimdall:
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-08.tar.gz
```

2. 다음 명령을 실행하여 Bor 데이터 디렉터리에서 tar 파일의 압축을 풉니다.

```
// You must ensure you are running this command before you start the Bor service on your node.
// If your Bor service has started, please stop the service and run the following command:
// Once unpacking is complete, you can start the Bor service again.

tar -xzvf <snapshot file> -C <BOR_DATA_DIRECTORY>

// If your bor data directory is different
// please replace the directory name in the command for starting the Bor service.
// When this command completes, you may delete the tar file to reclaim space.

// For example, this will unpack the tar file in the Bor data directory:
tar -xzvf bor-fullnode-snapshot-2022-11-08.tar.gz -C /var/lib/bor/data/bor/chaindata
```

:::note

이 `aria2c`방법은 스냅 샷을 더 빨리 다운로드하는 데 사용됩니다. 다운로드 된 스냅 샷을 직접 추출할 수 있는 대체 방법이 있습니다.

**다음 단계:**


```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c     https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::