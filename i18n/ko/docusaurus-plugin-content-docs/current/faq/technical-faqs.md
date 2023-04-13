---
id: technical-faqs
title: 기술 FAQ
description: Polygon에서 차세대 블록체인 앱을 구축하세요.
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 최신 정보 받기

Polygon [<ins>알림에</ins>](https://polygon.technology/notifications/) 가입하여 Polygon 팀과 커뮤니티에서 최신 노드 및 유효성 업데이트를 계속 유지합니다.

:::

### 1. 개인키는 Heimdall과 Bor 키스토어에서 동일한가요? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}
예, 유효성 검사 키와 Bor 키스토어를 생성하는 데 사용되는 개인 키는 동일합니다. 이 경우에 사용되는 개인 키는 Polygon 테스트넷 토큰이 저장되는 지갑의 ETH 주소입니다.

### 2. 일반적인 명령어 목록 {#2-list-of-common-commands}

현재 Linux 패키지에 대한 간편한 다이빙 목록이 있습니다. 이 목록은 더욱 편리한 서비스 이용을 위해 정기적으로 업데이트될 예정입니다.

**Linux 패키지의 경우**

#### A. Heimdall 제네시스 파일을 찾는 곳 {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. heimdall-config.toml을 찾는 곳 {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. config.toml을 찾는 곳 {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. heimdall-seeds.txt를 찾는 곳 {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. Heimdall 시작 {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. Heimdall 레스트 서버 시작 {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. Heimdall 브리지 서버 시작 {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Heimdall 로그 {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Bor 제네시스 파일 찾는 곳 {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. Bor 시작 {#j-start-bor}

`sudo service bor start`

#### K Heimdall 로그 확인 {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. Heimdall 레스트 서버 확인 {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. Heimdall 브리지 로그 확인 {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. bor 로그 확인 {#n-check-bor-logs}

`tail -f bor.log`

#### O. Bor 프로세스 종료 {#o-kill-bor-process}

**리눅스의 경우**:

1. `ps -aux | grep bor` 명령을 실행합니다. Bor에 대한 PID를 가져오고 다음의 명령을 실행합니다.
2. `sudo kill -9 PID`

**바이너리의 경우**:

`CS-2003/bor`로 이동한 다음 `bash stop.sh`를 실행합니다.

### 3. 오류: Failed to unlock account (0x...) No key for given address or file {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

이 오류는 password.txt 파일의 경로가 올바르지 않은 경우에 발생합니다. 이 문제를 해결하려면 다음 절차를 따르세요.

이 오류는 password.txt 및 Keystore 파일의 경로가 올바르지 않은 경우에 발생합니다. 이 문제를 해결하려면 다음 절차를 따르세요.

1. Bor 키스토어 파일을 다음에 복사합니다.

    /etc/bor/dataDir/keystore

2. 그런 다음 password.txt 파일을 다음에 복사합니다.

    /etc/bor/dataDir/

3. `/etc/bor/metadata`에서 정확한 주소를 추가했는지 확인합니다

바이너리의 경우:

1. Bor 키스토어 파일을 다음에 복사합니다.

`/var/lib/bor/keystore/`

2. 그런 다음 password.txt 파일을 다음에 복사합니다.

`/var/lib/bor/password.txt`


### 4. 오류: Wrong Block.Header.AppHash. Expected xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

이런 오류는 보통 Heimdall 서비스가 블록에 걸려 있고 Heimdall에서 되돌리는 메서드을 사용할 수 없는 경우에 발생합니다.

이를 해결하기 위해 사용자는 Heimdall을 완전히 다시 설정해야 합니다.

```bash
    sudo service heimdalld stop

    heimdalld unsafe-reset-all
```

설정을 완료하면 스냅샷부터 다시 동기화해야 합니다.

```bash
    wget -c <Snapshot URL>

    tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

```

그런 다음 Heimdall 서비스를 다시 시작합니다.


### 5. API 키는 어디에서 생성하나요? {#5-from-where-do-i-create-the-api-key}

이 링크에 액세스 하세요: [https://infura.io/register](https://infura.io/register). 계정 및 프로젝트를 설정한 후에는 메인넷이 아닌 Ropsten의 API 키를 복사해야 합니다.

메인넷은 기본적으로 선택됩니다.

### 6. Heimdall이 작동하지 않습니다. 패닉 오류가 발생합니다 {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**실제 오류**: 내 heimdall이 작동하지 않습니다. 로그의 첫 번째 라인은 다음과 같습니다.
panic: Unknown db_backend leveldb, expected either goleveldb or memdb or fsdb

config.toml에서 구성을 `goleveldb`(으)로 변경하세요.


### 7. Heimdall과 Bor의 잔존 파일을 삭제하려면 어떻게 해야 하나요? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

Heimdall과 Bor의 잔존 파일을 삭제하려는 경우, 다음 명령을 실행하면 됩니다. Bor:

리눅스 패키지의 경우:

```$ sudo dpkg -i matic-bor```

그런 다음 Bor 디렉터리를 삭제하세요.

```$ sudo rm -rf /etc/bor```

바이너리의 경우:

```$ sudo rm -rf /etc/bor```

그리고

```$ sudo rm /etc/heimdall```


### 8. 얼마나 많은 유효성 검사자가 동시에 활성화될 수 있습니까? {#8-how-many-validators-can-be-active-concurrently}

동시에 최대 100개의 활성 유효성 검사자가 가능합니다. 이벤트 중간에 한도에 도달하면 더 많은 참여자를 불러들일 것입니다. 활성 유효성 검사자는 대부분 가동 시간이 깁니다. 가동 중단 시간이 긴 참가자는 강제로 퇴출됩니다.

### 9. 얼마나 스테이크해야 하나요? {#9-how-much-should-i-stake}

"스테이크 금액" 및 "Heimdall 수수료 금액" - 얼마나 되나요?

스테이크 금액으로는 최소 10개의 매틱 토큰이 필요하며, Heimdall 수수료는 10개 이상이어야 합니다. 예를 들어, 당신의 스테이크 금액이 400이면 Heimdall 수수료는 20이어야 합니다. Heimdall 비용을 20으로 유지하는 것이 좋습니다.

그러나 스테이크 금액 및 Heimdall 수수료 금액에 입력되는 값은 18자리 십진수로 입력해야 합니다.

예를 들면 다음과 같습니다.

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. 유효성 검사자로 선택되었지만 ETH 주소가 잘못되었습니다. 어떻게 해야 하나요? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

이전에 제출한 ETH 주소에 액세스할 수 있는 경우 해당 계정의 테스트 토큰을 현재 계정으로 전송할 수 있습니다. 그런 다음 노드 설정 프로세스를 시작할 수 있습니다.

해당 ETH 주소에 액세스할 수 없는 경우 토큰을 별도로 전송하지 않습니다. 올바른 ETH 주소로 양식에 다시 등록할 수 있습니다.

### 11. 브리지를 시작하는데 오류가 발생합니다 {#11-i-m-getting-an-error-starting-the-bridge}

**오류**: Object "start" is unknown, try "bridge help". 무시해도 괜찮은가요?

"which bridge"를 확인해 보세요 - `/usr/sbin/bridge`인 경우 올바른 "브리지" 프로그램을 실행하고 있지 않은 것입니다.

`(or $GOBIN/bridge)` 대신 `~/go/bin/bridge`를 시도해 보세요.


### 12. dpkg 오류가 발생합니다 {#12-i-m-getting-dpkg-error}

**오류**: "dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0"

이런 오류는 보통 이전에 시스템에 설치했던 매틱 때문에 발생합니다. 해결하려면 다음을 실행하세요.

`sudo dpkg -r matic-node`


### 13. 유효성 검사 키를 생성할 때 어떤 개인 키를 추가해야 하는지 잘 모르겠습니다 {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

사용될 개인 키는 Polygon 테스트넷 토큰이 저장되는 지갑의 ETH 주소입니다. 양식에 제출된 주소와 연결된 하나의 공용키와 개인 키 쌍을 사용하여 설정을 완료할 수 있습니다.


### 14. Heimdall이 동기화되었는지 알 수 있는 방법이 있나요? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

다음 명령을 실행하여 확인할 수 있습니다.

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

catching_up 값을 확인합니다. false 인 경우, 노드가 모두 동기화된 것입니다.


### 15. 만약 누군가가 톱 10 스테이커가 된다면, 마지막에 매틱 보상을 어떻게 받을까요? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

스테이지 1 보상은 스테이크 기반이 아닙니다. 보상과 관련된 상세한 정보는 https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/를 참조하세요. 이 스테이지에서는 높은 스테이크를 가진 참가자들이라고 해서 자동으로 보상을 받을 자격이 주어지는 것은 아닙니다.


### 16. 내 heimdall 버전은 어떤 것이어야 하나요? {#16-what-should-be-my-heimdall-version}

Heimdall 버전을 확인하려면 다음을 실행하세요.

```heimdalld version```

스테이지 1에 맞는 Heimdall의 올바른 버전은 `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`이어야 합니다


### 17. 스테이크 금액과 수수료 금액으로 얼마를 추가해야 하나요? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

스테이크 금액으로는 최소 10개의 매틱 토큰이 필요하며, Heimdall 수수료는 10개 이상이어야 합니다. 예를 들어, 당신의 스테이크 금액이 400이면 Heimdall 수수료는 20이어야 합니다. Heimdall 비용을 20으로 유지하는 것이 좋습니다.

그러나 스테이크 금액 및 Heimdall 수수료 금액에 입력되는 값은 18자리 십진수로 입력해야 합니다.

예를 들면 다음과 같습니다.

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. `/var/lib/heimdall`과 `/etc/heimdall?`의 차이는 무엇인가요

`/var/lib/heimdall`는 바이너리 설치 방법을 사용할 때의 heimdall dir입니다. `/etc/heimdall`는 Linux 패키지 설치 방법을 위한 것입니다.


### 19. 스테이크 트랜잭션을 할 때 "Gas Exceeded" 오류가 발생합니다 {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

이 오류는 스테이크 또는 수수료 금액 형식으로 인해 발생할 수 있습니다. 스테이크 명령 중에 입력되는 값은 십진수 18개가 있어야 합니다.

그러나 스테이크 금액 및 Heimdall 수수료 금액에 입력되는 값은 18자리 십진수로 입력해야 합니다.

예를 들면 다음과 같습니다.

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. 언제쯤 유효성 검사자가 될 수 있을까요? {#20-when-will-i-get-a-chance-to-become-a-validator}

스테이지 1 이벤트 과정 전반에 걸쳐 유효성 검사자를 점진적으로 추가하고 있습니다. 새로운 외부 유효성 검사자 목록을 점차 공개할 예정입니다. 이 목록은 Discord 채널에서 공개됩니다.


### 21. Heimdall 계정 정보 위치는 어디서 찾을 수 있나요? {#21-where-can-i-find-heimdall-account-info-location}

바이너리의 경우:

    /var/lib/heimdalld/config folder

리눅스 패키지의 경우:

    /etc/heimdall/config


### 22. API 키는 어떤 파일에 추가하나요? {#22-which-file-do-i-add-the-api-key-in}

API 키를 생성했으면 `heimdall-config.toml` 파일에 API 키를 추가해야 합니다.


### 23. 어떤 파일에 persistent_peers를 추가하나요? {#23-which-file-do-i-add-the-persistent_peers}

다음 파일에 persistent_peers를 추가할 수 있습니다:

    /var/lib/heimdalld/config/config.toml


### 24. 응용 프로그램의 데이터를 재설정하지 않고 텐더민트를 재설정했습니까?" {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

이러한 경우 heimdall 구성 데이터를 재설정하고 설치를 다시 실행할 수 있습니다.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. 오류: Unable to unmarshall config Error 1 error(s) decoding {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

오류: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

이 문제는 오타가 있거나, 누락된 부품이나 오래된 구성 파일이 남아 있을 때 주로 발생합니다. 모든 잔존 파일을 삭제한 다음 다시 설정해 보세요.

### 26. Heimdall 및 Bor 서비스 종료 {#26-to-stop-heimdall-and-bor-services}

**리눅스 패키지의 경우**:

Heimdall 종료: `sudo service heimdalld stop`

Bor 종료: `sudo service bor stop`또는

1. `ps -aux | grep bor` 명령을 실행합니다. Bor에 대한 PID를 가져오고 다음의 명령을 실행합니다.
2. `sudo kill -9 PID`

**바이너리의 경우**:

Heimdall 종료: `pkill heimdalld`

브리지 종료: `pkill heimdalld-bridge`

Bor 종료: CS-2001/bor로 이동한 다음 `bash stop.sh`를 실행합니다.

### 27. Heimdall 및 Bor 디렉토리를 삭제하는 방법 {#27-to-remove-heimdall-and-bor-directories}

**Linux 패키지의 경우**:
Heimdall 삭제: `sudo rm -rf /etc/heimdall/*`

Bor 삭제: `sudo rm -rf /etc/bor/*`

**바이너리의 경우**:

Heimdall 삭제: `sudo rm -rf /var/lib/heimdalld/`

Bor 삭제: `sudo rm -rf /var/lib/bor`

### 28. "Wrong Block.Header.AppHash." 오류가 발생할 경우 어떻게 해야 하나요? {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

이 오류는 보통 Infura 요청이 소진될 때 발생합니다. Polygon에서 노드를 설정할 때 구성 파일(Heimdall)에 Infura 키를 추가합니다. 기본적으로 매일 10만 개 요청이 허용되는데 이 한도를 넘으면 이런 문제가 발생하게 됩니다. 이 문제를 해결하기 위해서는 새로운 API 키를 생성하여 `config.toml` 파일에 추가하면 됩니다.