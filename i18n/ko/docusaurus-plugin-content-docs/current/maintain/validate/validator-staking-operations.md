---
id: validator-staking-operations
title: Polygon에서 스테이크하기
description: Polygon 네트워크에서 유효한 자로 지낼 방법을 알아보십시오
keywords:
  - docs
  - matic
  - polygon
  - stake
  - claim
  - unstake
slug: validator-staking-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## 기본 요건 {#prerequisites}

### 전체 노드 설정 {#full-node-set-up}

귀하의 유효자 노드가 완전히 설정하고 신디케이드를 설정합니다. 참조:

* [유효성 검사 노드 실행](run-validator.md)
* [Ansible로 유효성 검사 노드 실행](run-validator-ansible.md)
* [바이너리에서 유효성 검사 노드 실행](run-validator-binaries.md)

### 계정 설정 {#account-setup}

귀하의 유효성 검사자 노드에 계정이 설정되었는지 확인하십시오. 확인하려면 **유효성 검사 노드**에서 다음의 명령을 실행하세요.

```sh
    heimdalld show-account
```

출력 결과가 다음과 같은 형식으로 나타납니다.

```json
{
    "address": "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
    "pub_key": "0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19"
}
```

여기에는 유효성 검사 노드에 대한 주소와 공개 키가 표시됩니다. **이 주소는 이더리움에서 서명자 주소와 일치해야** 한다는 점에 유의하십시오.

### 개인 키 표시 {#show-private-key}

이 스텝은 선택 사항입니다.

유효성 검사자 노드에 개인 키가 맞는지 확인하십시오. 확인하려면 **유효성 검사 노드**에서 다음의 명령을 실행하세요.

```sh
heimdalld show-privatekey
```

다음과 같은 출력 결과가 나타납니다.

```json
{
    "priv_key": "0x********************************************************"
}
```

## Polygon에서 스테이크하기 {#stake-on-polygon}

Polygon에서 [유효성 검사자 대시보드](https://staking.polygon.technology/validators/)를 이용하여 스테이크할 수 있습니다.

### 스테이킹 대시보드를 이용해 스테이크하기 {#stake-using-the-staking-dashboard}

1. [유효성 검사자 대시보드](https://staking.polygon.technology/validators/)에 액세스합니다.
2. 지갑으로 로그인합니다. 메타마스크는 권장 지갑입니다. MATIC 토큰이 존재하는 동일한 주소를 사용하여 로그인해야 합니다.
3. **Are you can find the valider**. 노드를 설정하라는 요청을 받을 것입니다. 아직 노드를 설정하지 않은 경우에는 반드시 설정해야 합니다. 설정하지 않고 그대로 진행할 경우 스테이크를 시도할 때 오류가 발생합니다.
4. 다음 화면에서 유효성 검사자 세부 정보, 수수료율 및 스테이킹 금액을 추가합니다.
5. **지금 스테이크**를 클릭합니다.

이 트랜잭션이 완료되면 유효성 검사자가 되기 위한 스테이크가 성공적으로 수행됩니다. 트랜잭션 확인을 위해 세 개의 메시지가 나타납니다.

* 트랜잭션 승인 — 스테이크 트랜잭션이 승인됩니다.
* 스테이크 — 스테이크 트랜잭션이 확인됩니다.
* 저장 —ß 유효성 검사자 세부 정보가 저장됩니다.

:::note

변경 사항이 [스테이킹 대시보드](https://staking.polygon.technology/account)에 적용되기 위해서는 최소한 12개의 블록 확인이 필요합니다.

:::

### 잔액 확인 {#check-the-balance}

주소의 잔액을 확인하려면 다음의 명령을 실행하세요.

```sh
heimdallcli query auth account SIGNER_ADDRESS --chain-id CHAIN_ID
```

명령어 설명

* SIGNER_ADDRESS — [서명자 주소](/docs/maintain/glossary.md#validator)입니다.
* CHAIN_ID — 클라이언트 접두사가 `heimdall-137`인 Polygon 메인넷 체인 ID입니다.

다음과 같은 출력 결과가 나타납니다.

```json
address: 0x6c468cf8c9879006e22ec4029696e005c2319c9d
coins:
- denom: matic
amount:
    i: "1000000000000000000000"
accountnumber: 0
sequence: 0
```

### 유효성 검사자로서 보상 청구하기 {#claim-rewards-as-a-validator}

유효성 검사자로 설정되고 스테이크되면 유효성 검사자 의무를 수행할 때 보상을 얻습니다. 보상은 유효성 검사자로서의 의무를 충실히 수행하면 얻게 됩니다.

보상을 청구하려면 [유효성 검사자 대시보드](https://staking.polygon.technology/account)로 이동하세요.

프로필에 다음의 두 가지 버튼이 있습니다.

* 보상 인출
* 보상 재스테이크

#### 보상 인출 {#withdraw-reward}

유효성 검사자로서 의무를 제대로 수행하는 한 보상을 받을 수 있습니다.

**보상 인출**을 클릭하면 지갑으로 보상이 들어옵니다.

12개의 블록 확인 후 대시보드가 업데이트됩니다.

#### 보상 재스테이크 {#restake-reward}

보상을 재스테이크하는 옵션은 유효성 검사자로서 스테이크를 쉽게 늘릴 수 있는 방법입니다.

**보상 재스테이크**를 클릭하면 보상이 다시 스테이크되고 스테이크 보유 금액이 증가합니다.

12개의 블록 확인 후 대시보드가 업데이트됩니다.
