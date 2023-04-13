---
id: quicknode
title: QuickNode를 사용하여 스마트 계약을 배포합니다.
sidebar_label: Using QuickNode
description:  Brownie와 Quickn노드를 사용하여 Polygon에서 스마트 계약을 배포하십시오.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 개요 {#overview}

파이썬은 가장 다재다능한 프로그래밍 언어 중 하나입니다. 무거운 제작 환경에서 테스트 모델을 개발자에게 실행하는 연구자로부터 가능한 모든 기술 분야에서 사례를 사용합니다.

이 튜토리얼에서 사용하면 [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) 프레임 워크를 사용하여 Polygon을 위해 [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) 테스트넷 노드를 활용하여 스마트 계약을 작성하고 배포하는 방법을 배울 수 있습니다.

:::tip

QuickNode 팀에 연락하려면 Twitter에서 [@QuickNode](https://twitter.com/QuickNode)를 태그하거나 메시지를 보내세요.

:::

## 기본 요건 {#prerequisites}

- 파이썬3 설치
- Polygon 노드
- 코드 편집기
- 명령 라인 인터페이스

## 실습할 내용 {#what-you-will-do}

1. Brownie 설정
2. Quicknode 테스트 노드에 액세스
3. 스마트 계약 컴파일 및 배포
4. 배포된 계약 데이터 확인하십시오.

## Brownie 소개 {#what-is-brownie}

스마트 계약 개발은 주로 [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/), [Hardhat](https://hardhat.org/)과 같은 JavaScript 기반 라이브러리가 주도하고 있습니다. 파이썬은 다비글, 고도로 사용되는 언어이며 스마트 계약 / 웹3 개발에 사용될 수 있습니다. [웹3.py는](https://web3py.readthedocs.io/en/stable/) 웹3의 요구를 충족시키는 매력적인 파이썬 라이브러리입니다. Brownie 프레임 워크는 상단에 내장되어 `web3.py`있습니다.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie)는 스마트 계약을 개발하고 테스트할 수 있는 Python 기반 프레임워크입니다. Brownie는 Solidity와 Vyper 계약을 모두 지원하며 [pytest](https://github.com/pytest-dev/pytest)를 통한 계약 테스트 기능도 제공합니다.

Brownie로 스마트 계약 작성 및 배포 과정을 보여주기 위해 템플릿 프로젝트인 [Brownie 믹스](https://github.com/brownie-mix)를 사용하겠습니다. 구체적으로, ERC-20 구현 템플릿인 [토큰 믹스](https://github.com/brownie-mix/token-mix)를 사용할 것입니다.

## 종양 설치 {#install-dependencies}

브라운니는 파이썬3의 상단에 내장되어 있으므로 브라운과 함께 일하기 위해 설치된 것이 필요합니다. 시스템에 python3이 설치된 경우 확인합시다. 그렇게 하려면 명령 라인 툴에서 다음 항목을 입력하십시오.

```bash
python3 -V
```

설치된 python3 버전이 반환됩니다. 설치되지 않은 경우 [python 공식 웹사이트](https://www.python.org/downloads/)에서 다운로드하여 설치하세요.

Brownie를 설치하기 전에 프로젝트 디렉터리를 만들고 이 프로젝트 디렉터리를 현재 작업 디렉터리로 만듭니다.

```bash
mkdir brownieDemo
cd brownieDemo
```

이제 시스템에 python3을 설치했으니 Python의 패키지 매니저인 pip을 사용하여 Brownie를 설치하겠습니다. Pip은 JavaScript의 npm과 유사합니다. 명령 라인에 다음 항목을 입력하십시오.

```bash
pip3 install eth-brownie
```

:::tip

install이 실패하면 다음 명령을 사용할 수 있습니다.`sudo pip3 install eth-brownie`

:::

Brownie가 올바르게 설치되었는지 확인하십시오. 명령 줄에 type `brownie`를 입력하면 다음 출력을 제공해야합니다.

![img](/img/quicknode/brownie-commands.png)

토큰을 받으려면 커맨드 라인에 다음 을 입력하십시오.

```
brownie bake token
```

이것은 우리 디렉터리에 새로운 `token/`디렉토리를 만들 `brownieDemo`것입니다.

### 파일 구조 {#file-structure}

우선, 디렉토리를 `token`탐색하십시오.

```bash
cd token
```

이제 텍스트 에디터에서 `token`디렉토리를 엽니다. 폴더 아래에 주요 계약인 `contracts/`Google을 `Token.sol`찾을 수 있습니다. 자신의 계약을 작성하거나 파일을 수정할 수 `Token.sol`있습니다.

`scripts/`폴더 아래에 `token.py`Python 스크립트를 찾을 수 있습니다. 이 스크립트를 배포하는 데 사용할 것이며, 계약에 따라 수정이 필요합니다.

![img](/img/quicknode/token-sol.png)

계약은 ERC-20 계약입니다. [ERC-20 토큰에 대한](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) 이 가이드에서 ERC-20 표준 및 계약에 대해 더 자세히 알 수 있습니다.

## Polygon 노드 Box {#booting-your-polygon-node}

Quicknode는 Polygon 메인넷과 Mumbai 테스트넷 노드의 글로벌 네트워크를 가지고 있습니다. 또한 [무료 공공 Polyk을](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) 실행합니다. 속도가 제한되면 [QuickNode에서 무료 시험 노드에](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) 가입할 수 있습니다.

![img](/img/quicknode/http_URL.png)

PHP 3에서 나중에 사용할 **HTTP** URL을 복사합니다.

## 네트워크 및 계정 설정 {#network-and-account-setup}

Brownie로 QuickNode 엔드포인트를 설정해야 합니다. 그렇게 하려면 명령 라인에서 다음 항목을 입력하십시오.

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Polygon 노드를 부팅하는 동안 방금 받은 **Mumbai Testnet** `YOUR_QUICKNODE_URL`URL로 대체하십시오.

위의 `Ethereum`명령어에서 은 환경의 `matic_mumbai`이름이고 는 네트워크의 사용자 정의 이름입니다. 사용자 정의 네트워크에 원하는 이름을 지정할 수 있습니다.

다음 작업을 할 일은 Brownie를 사용하여 새로운 지갑을 만드는 것입니다. 다음 단계는 명령행에서 다음 을 입력하십시오.

```
brownie accounts generate testac
```

계정에 암호를 설정하라는 요청을 받을 것입니다! 단계를 마친 후, 이것은 Nmonic 구문을 함께 계정을 생성하고, 오프라인 저장을 합니다. `testac`이름은 우리 계정의 이름(좋아하는 이름을 선택할 수 있음)입니다.

![img](/img/quicknode/new-account.png)

:::note

Mnemonic 구문을 사용하여 계정을 복구하거나 다른 [<ins>비 커스터디얼</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode) 지갑에 계정을 수입할 수 있습니다. 위 이미지에 표시된 계정은 이 가이드 진행을 위해 생성된 계정입니다.

:::

이제 계약을 배포해야 하는 몇 가지 테스트 MATIC를 받을 수 있도록 계정 주소를 복사하십시오.

## TestnetMATIC 사용하기 {#getting-testnet-matic}

스마트 계약을 배포하기 위해 가스 요금을 지불하기 위해 몇 가지 테스트 MATIC 토큰이 필요합니다.

이 튜토리얼에서 작성한 귀하의 계정의 주소를 복사하여 [Polygon](https://faucet.polygon.technology/) faucet의 주소 필드에 붙여 넣으시고 **Submit을** 클릭하십시오. Faucet에서 0.2만큼의 테스트 매틱을 보낼 것입니다.

![img](/img/quicknode/faucet.png)

## 스마트 계약 배포하기 {#deploying-your-smart-contract}

계약을 배포하기 전에 다음 페이지를 컴파일해야 합니다.

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

이제 텍스트 에디터에서 `scripts/token.py`열고 다음 변경을 확인하십시오.

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info 설명

위의 코드를 사용하면 이전에 만든 `testac`계정을 가지고 변수에 `acct`저장했습니다. 또한 다음 라인에서 데이터를 받기 위해 편집 `'from':`부분을 편집하고 `acct`있습니다.

:::

마지막으로, 스마트 계약을 배포할 것입니다.

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`앞서 만든 사용자 정의 네트워크의 이름입니다. 즉시 계정을 만드는 동안 일찍 설정한 **암호를** 물어볼 것입니다.

위 명령어를 실행한 후 트랜잭션 해시를 가져와야 하며, Brownie는 트랜잭션이 확인되기를 기다립니다. 트랜잭션이 확인되면 Polygon Mumbai 테스트넷에 계약이 배포된 주소가 반환됩니다.

![img](/img/quicknode/brownie-run.png)

[Polygonscan Mumbai에서](https://mumbai.polygonscan.com/) 계약 주소를 복사하여 붙여 넣으면 배포된 계약을 확인할 수 있습니다.

![img](/img/quicknode/polygonscan.png)

## 계약 테스트하기 {#testing-the-contract}

Brownie는 스마트 계약 기능을 테스트할 수 있는 옵션도 제공합니다. `pytest` 프레임워크를 사용하여 유닛 테스트를 쉽게 생성합니다. Bronwnie에 대한 쓰기 테스트에 대한 자세한 내용은 [해당 문서](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#)에서 확인할 수 있습니다.

**이제까지 Brownie와 QuickNode를 사용하여 계약을 Polygon에 배포하는 방법을 살펴봤습니다.**

Polygon과 마찬가지로 QuickNode는 항상 개발자 [가이드](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [docs](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [자습서 비디오](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) 및 [웹3 개발자](https://discord.gg/DkdgEqE) 커뮤니티를 제공하는 교육 첫 번째 접근 방식을 가지고 있습니다.
