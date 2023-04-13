---
id: truffle
title: Truffle을 사용하여 스마트 계약 배포하기
sidebar_label: Using Truffle
description:  Turnfle을 사용하여 Polygon에서 스마트 계약을 배포하십시오.
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 개요 {#overview}

[Truffle은](https://trufflesuite.com/) 이더리움 가상 머신을 활용하여 스마트 계약을 생성하고 테스트하는 데 사용할 수 있는 블록체인 개발 환경입니다. 이 가이드는 Truffle을 사용하여 스마트 계약을 생성하고 EVM-호환 Polypygon 네트워크에 배치하는 방법을 가르치는 것을 목표로 합니다.

:::note

이 튜토리얼은 [<ins>Truffle 퀵스타트 가이드</ins>](https://www.trufflesuite.com/docs/truffle/quickstart) 문서의 적응 버전인 Truffle 퀵스타트 가이드 문서의 일부입니다.

:::

## 실습할 내용 {#what-you-will-do}

- 트러플 설치 및 설정하기
- Polygon 네트워크에 계약 배포하기
- Polygonscan에서 배포 상태를 확인하십시오.

## 기본 요건 {#prerequisites}

시작하기 전에 몇 가지 기술적 요구 사항이 있습니다. 다음을 설치하십시오.

- [Node.js v8+ LTS 및](https://nodejs.org/en/) npm(Node로 패키지)
- [Git](https://git-scm.com/)

위의 설치가 완료되면 이제 다음 명령 하나로 트러플을 설치할 수 있습니다.

```
npm install -g truffle
```

Truffle이 제대로 설치되었는지 확인하려면 `truffle version`터미널에 입력하십시오. 오류가 발생하면 npm 모듈이 경로에 추가되었는지 확인하십시오.

## 프로젝트 만들기 {#creating-a-project}

### 메타코인 프로젝트 {#metacoin-project}

[트러플 박스](https://trufflesuite.com/boxes/) 페이지에 있는 트러플의 표준 서식 중 하나를 사용하겠습니다. [메타코인 박스](https://trufflesuite.com/boxes/metacoin/)는 계정 간에 전송할 수 있는 토큰을 생성합니다.

1. 이 트러플 프로젝트를 위해 새로운 디렉토리를 만드는 것으로 시작합니다.

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. 메타코인 박스를 다운로드합니다.

  ```bash
  truffle unbox metacoin
  ```

마지막 단계를 통해 계약, 배포, 테스트 및 구성 파일이 있는 폴더를 공동 작성한 Truffle 프로젝트를 만들었습니다.

다음은 `metacoin.sol` 파일의 스마트 계약 데이터입니다.

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

ConvertLib를 `pragma` 명령문 바로 뒤에 가져온다는 것에 유의하십시오. 이 프로젝트에는 실제로 마지막에 배포될 두 개의 스마트 계약이 있습니다. 하나는 모든 전송 및 잔액 로직을 포함하는 메타코인이고, 다른 하나는 값을 변환하는 데 사용되는 라이브러리인 ConvertLib입니다.

:::

### 계약 테스트하기 {#testing-the-contract}

Solidity와 Javascript 테스트를 실행할 수 있습니다.

1. 터미널에서 Solidity 테스트를 실행합니다.

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

다음 출력을 참조하십시오.

![img](/img/truffle/test1.png)

2. 자바스크립트 테스트를 실행합니다.

  ```bash
  truffle test ./test/metacoin.js
  ```

다음 출력을 참조하십시오.

![img](/img/truffle/test2.png)

### 계약 컴파일하기 {#compiling-the-contract}

다음 명령을 사용하여 스마트 계약을 컴파일하십시오.

```bash
truffle compile
```

다음 출력이 표시됩니다.

![img](/img/truffle/compile.png)

### 스마트 계약 구성하기 {#configuring-the-smart-contract}

실제로 계약을 배포하기 전에 네트워크 및 컴파일러 데이터를 삽입하여 `truffle-config.js` 파일을 설정해야 합니다.

Polygon Mumbai 네트워크 세부 사항으로 파일을 `truffle-config.js`가서 업데이트합니다.

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

참고: mnonic을 통해 전달해야 `maticProvider`합니다. 이것은 배포하고자 하는 계정에 대한 시드 문구(또는 개인 키)입니다. 루트 디렉토리에 새 `.secret` 파일을 만들고 12단어 니모닉 시드 구문을 입력하여 시작합니다. 메타마스크 지갑에서 시드 단어를 얻으려면 메뉴에서 메타마스크 설정을 사용할 수 있습니다. 메뉴에서 경우 **시드의 단어를** 공개하는 버튼을 볼 수 있는 **보안 및 개인 정보를** 선택하십시오.

### Polygon 네트워크에 배포하기 {#deploying-on-polygon-network}

[Polygon Faucet을](https://faucet.polygon.technology/) 사용하여 지갑에 MATIC를 추가합니다. 다음으로, 프로젝트 디렉터리에 있는 루트 폴더에 이 명령을 실행합니다.

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

`address`여러분의 자신과 제공된 기타 세부 정보가 다를 수 있음을 `transaction_hash`기억하십시오. 위 내용은 구조에 대한 이해를 돕기 위해 제공되었습니다.

:::

**축하합니다!  Truffle을 사용하여 스마트 계약을 성공적으로 배포했습니다.** 이제 계약과 상호 작용할 수 있으며 Polygonscan에서 배포 상태를 확인할 수 [있습니다](https://mumbai.polygonscan.com/).
