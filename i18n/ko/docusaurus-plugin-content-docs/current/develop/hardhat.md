---
id: hardhat
title: Hardhat를 사용하여 스마트 계약 배포하기
sidebar_label: Using Hardhat
description: Hardhat 사용하여 Polygon에서 스마트 계약을 배포하십시오.
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 개요 {#overview}

Hardhat은 스마트 계약을 배포하고, 테스트 실행하고, 디버그 Solidity 코드를 현지에서 실행시킬 수 있는 쉬운 방법을 제공하는 이더리움 개발 환경입니다.

이 튜토리얼에서는 Hardhat을 설정하고 간단한 스마트 계약의 빌드, 테스트 및 배포에 사용하는 방법을 알아봅니다.

### 실습할 내용 {#what-you-will-do}

- Hardhat 설정
- 간단한 스마트 계약 만들기
- 계약 컴파일
- 계약 테스트
- 계약 배포

## 개발 환경 설정하기 {#setting-up-the-development-environment}

시작하기 전에 몇 가지 기술적 요구 사항이 있습니다. 다음을 설치하세요.

- [Node.js v10+ LTS 및 npm](https://nodejs.org/en/)(노드와 함께 제공됨)
- [Git](https://git-scm.com/)

설치를 완료했으면 빈 폴더로 이동한 다음 `npm init`를 실행하고 지침에 따라 Hardhat을 설치하여 npm 프로젝트를 생성해야 합니다. 프로젝트가 준비되면 다음을 실행해야 합니다.

```bash
npm install --save-dev hardhat
```

Hardhat 프로젝트를 생성하려면 프로젝트 폴더에서 `npx hardhat`을 실행하세요.
샘플 프로젝트를 만들고 다음 단계를 수행하여 샘플 작업을 시도하고 샘플 계약을 컴파일, 테스트 및 배포해 보겠습니다.

:::note

여기에서 사용된 샘플 프로젝트는 지침과 함께 [<ins>Hardhat 빠른 시작 가이드</ins>](https://hardhat.org/getting-started/#quick-start)에서 가져왔습니다.

:::

## 프로젝트 만들기 {#creating-a-project}

샘플 프로젝트를 생성하려면 프로젝트 폴더에서 `npx hardhat`을 실행합니다. 다음 프롬프트가 표시될 것입니다.

![img](/img/hardhat/quickstart.png)

JavaScript 프로젝트를 선택하고 다음 단계를 통해 샘플 계약을 컴파일, 테스트 및 배포하세요.

### 계약 검사 {#checking-the-contract}

`contracts` 폴더에는 간단한 디지털 자물쇠로 구성된 샘플 계약인 `Lock.sol`이 포함되어 있습니다. 여기에서 사용자는 일정 기간 후에만 자금을 출금할 수 있습니다.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### 계약 설정 {#setting-up-the-contract}

- `hardhat.config.js`로 이동합니다.
- matic-network-credentials로 `hardhat-config`를 업데이트합니다.
- 루트에서 비공개 키를 저장할 `.env` 파일을 생성합니다.
- `.env` 파일에 Polygonscan API 키를 추가하여 Polygonscan에서 계약을 검증합니다. [계정을 만들면](https://polygonscan.com/register) API 키를 생성할 수 있습니다.

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

위의 파일에는 환경 변수와 ethers 및 etherscan을 관리하기 위해 DOTENV가 필요합니다. 이러한 패키지를 모두 설치해야 합니다.

[<ins>이 페이지</ins>](https://www.npmjs.com/package/dotenv)에서 DOTENV 사용 방법에 대한 자세한 지침을 찾아 보세요.

matic에 의해 Polygon mumbai를 변경하는 경우 Matic(Polygon 메인넷)에 배치할 수 있습니다.

:::

### 계약 컴파일하기 {#compiling-the-contract}

계약을 컴파일하려면 먼저 Hardhat Toolbox를 설치해야 합니다.

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

그런 다음 간단히 컴파일을 실행하면 됩니다.

```bash
npx hardhat compile
```

### 계약 테스트하기 {#testing-the-contract}

Hardhat으로 테스트를 실행하려면 다음을 입력해야 합니다.

```bash
npx hardhat test
```

예상되는 출력은 다음과 같습니다.

![img](/img/hardhat/test.png)

### Polygon 네트워크에 배포하기 {#deploying-on-polygon-network}

프로젝트 디렉터리의 루트에서 다음 명령어를 실행합니다.

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

계약은 매틱의 Mumbai 테스트넷에 배포되며 배포 상태는 https://mumbai.polygonscan.com/에서 확인할 수 있습니다.

**축하합니다! Greeter 스마트 계약을 성공적으로 배포했습니다. 이제 스마트 계약과 상호작용할 수 있습니다.**

:::tip Polygonscan에서 신속하게 계약 검증하기

Polygonscan에서 계약을 신속하게 검증하려면 다음 명령어를 실행하세요. 이렇게 하면 누구든 쉽게 배포된 계약의 소스 코드를 볼 수 있습니다. 복잡한 인수 목록이 있는 생성자를 가진 계약에 대해서는 [여기](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)를 참조하세요.

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
