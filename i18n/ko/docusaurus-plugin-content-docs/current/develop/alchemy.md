---
id: alchemy
title: Alchemy를 사용하여 스마트 계약 배포하기
sidebar_label: Using Alchemy
description: Alchemy를 사용하여 스마트 계약을 배포하기 위한 가이드
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 개요 {#overview}

이 튜토리얼은 이더리움 블록체인 개발에 입문했거나 스마트 계약 배포 및 상호작용의 기초에 대해 알아보고자 하는 개발자를 위한 것입니다. Polygon Mumbai 테스트 네트워크에 스마트 계약을 생성하여 배포하면 암호 화폐 지갑(메타마스크), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) 및 Alchemy를 사용하여 [사용자가](https://metamask.io) 걸을 수 [있습니다](https://alchemy.com/?a=polygon-docs).

:::tip

질문이나 우려 사항이 있는 경우 [<ins>공식 디스코드</ins>](https://discord.gg/gWuC7zB) 서버를 통해 Alchemy 팀에 문의하십시오.

:::

## 학습할 내용 {#what-you-will-learn}

이 튜토리얼의 스마트 계약을 생성하기 위해 Alchemy 플랫폼을 사용하여 다음을 수행하는 방법을 배웁니다.
- 스마트 계약 애플리케이션 만들기
- 지갑의 밸런스를 확인하십시오.
- blockchain 탐험가에서 계약 호출을 확인하십시오.

## 실습할 내용 {#what-you-will-do}

튜토리얼을 따라 다음을 실습합니다.
1. Alchemy에서 앱 생성 시작
2. 메타마스크로 지갑 주소 생성
3. 지갑에 잔액 추가 (테스트 토큰을 사용)
4. Hardhat 및 Ethers.js를 사용하여 프로젝트 컴파일 및 배포
5. Alchemy의 플랫폼에서 계약 상태를 확인하십시오.

## 스마트 계약 작성 및 배포하기 {#create-and-deploy-your-smart-contract}

### Polygon 네트워크에 연결 {#connect-to-the-polygon-network}

Polygon PoS 체인에 요청을 보내는 방법에는 여러 가지가 있습니다. 자체 노드를 실행하는 대신, Alchemy 개발자 플랫폼의 무료 계정을 사용하고 Alchemy Polygon PoS API와 상호작용하여 Polygon PoS 체인과 통신합니다. 이 플랫폼은 전체 개발자 툴링 스위트로 구성되어 있습니다. 여기에는 요청을 모니터링 할 수 있는 능력, 스마트 계약 배포시 HDAI에서 발생하는 것을 보여주는 데이터 분석, 향상된 API(Transact, NFTs 등) 및 Ethers.js SDK를 포함하는 것이 포함됩니다.

이미 Alchemy 계정이 없다면 [무료](https://www.alchemy.com/polygon/?a=polygon-docs) 계정에 등록하여 시작합니다. 계정을 생성한 후 대시보드로 이동하기 전에 첫 앱을 즉시 생성할 수 있습니다.

![img](/img/alchemy/alchemy-dashboard.png)

### App (및 API 키) 만들기 {#create-your-app-and-api-key}

Alchemy 계정을 성공적으로 작성한 후, 앱을 생성하여 API 키를 생성할 필요가 있습니다. 이 설정은 Polygon Mumbai 테스트넷에 대한 요청을 인증합니다. 테스트넷에 익숙하지 않다면, [테스트넷 가이드](https://docs.alchemyapi.io/guides/choosing-a-network)를 확인하세요.

새로운 API 키를 생성하고, Alchemy 대시보드 탐색 바에서 **앱** 탭을 탐색하고 **Create App** 하위 탭을 선택하십시오.

![img](/img/alchemy/create-app.png)

새로운 앱 **헬로** World를 지명하고, 체인의 짧은 설명을 제공하고, **Polygon** **Mumbai를** 선택한 다음 네트워크에 대해 선택하십시오.

마지막으로, **Creative** 앱을 클릭하십시오. 새로운 앱은 아래 테이블에 나타나야합니다.

### 지갑 주소 만들기 {#create-a-wallet-address}

Polygon PoS는 이더리움의 레이어 2의 스케일링 솔루션입니다. 따라서 Eygon 지갑을 필요로하고 Polygon Mumbai 테스트넷에서 트랜잭션을 보내고 수신하기 위해 사용자 지정 Polygon URL을 추가합니다. 이 튜토리얼에서 사용하면 브라우저 호환 가능한 암호 화폐 지갑 지갑 메타마스크를 사용할 수 있습니다. 이더리움 트랜잭션의 작동 방식을 자세히 알아보려면, 이더리움 재단에서 제공하는 [트랜잭션 가이드](https://ethereum.org/en/developers/docs/transactions/)를 확인하세요.

Alchemy에서 사용자 정의 Polygon URL을 얻으려면 Alchemy 대시보드 에서 **Hello World** 앱에 가서 오른쪽 상단 모서리에 **View 키를** 클릭하십시오. 그런 다음 Alchemy HTTP API 키를 복사합니다.

![img](/img/alchemy/view-key.png)

메타마스크 계정은 [여기](https://metamask.io/download.html)에서 무료로 다운로드 및 생성할 수 있습니다. 일단 계정을 만들었으면 Polygon PoS 네트워크를 지갑에 설정하기 위해 이러한 단계를 따르십시오.

1. 메타마스크 지갑의 상단 모서리에 있는 드롭 다운 메뉴에서 **설정을** 선택하십시오.
2. 메뉴에서 **네트워크를** 왼쪽으로 선택하십시오.
3. 다음 파라미터를 사용하여 Mumbai Testnet에 지갑을 연결합니다.

**네트워크 이름:** Polygon Mumbai 테스트넷

**새로운 RPC URL:** https://polygon-mumbai.g.alchemy.com/v2/your-api-key

**체인ID:** 8001년 1001

**상징:** 매틱

**블록 탐색기 URL:** https://mumbai.polygonscan.com/


### Polygon Mumbai 테스트 MATIC 추가 {#add-polygon-mumbai-test-matic}

Mumbai 테스넷에 스마트 계약을 배포하기 위해 몇 가지 테스넷 토큰이 필요합니다. 테스트넷 토큰을 얻기 위해 [Polygon Mumbai](https://faucet.polygon.technology/) Faucet에 가서 **Mumbai를** 선택하고 **MatIC** Token을 선택하고 Polygon 지갑 주소를 입력하면 **Submit을** 클릭하십시오. 네트워크 트래픽으로 인해 테스트넷 토큰을 받을 시간이 걸릴 수 있습니다.

Alchemy의 [무료 Mumbai](https://mumbaifaucet.com/?a=polygon-docs) faucet을 사용할 수도 있습니다.

![img](/img/alchemy/faucet.png)

곧 메타마스크 계정에서 테스트넷 토큰을 확인할 수 있습니다.

### 지갑 밸런스를 확인하십시오. {#check-your-wallet-balance}

잔액을 다시 확인하기 위해 [Alchemy 작성 도구](https://composer.alchemyapi.io/)를 사용하여 [eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) 요청을 생성해 봅시다. **Polygon** **Mumbai를** `eth_getBalance`네트워크로 선택한 대신 Pygon Mumbai를 이 방법으로 선택하고 주소를 입력하십시오. 이렇게 하면 지갑에 매틱 금액이 반환됩니다. 작성 도구를 사용하는 방법에 대한 안내는 이 [비디오](https://youtu.be/r6sjRxBZJuU)를 확인하세요.

![img](/img/alchemy/get-balance.png)

메타마스크 계정 주소를 입력하고 **요청서를** 클릭하면 다음과 같은 응답을 볼 수 있습니다.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

이 결과는 ETH 값이 아닌 Wei 값입니다. Wei는 Ether의 가장 작은 부정제입니다. Wei에서 이더로의 전환 비율은 1이더 = 10^18Wei입니다. 즉 '0xde0b6b3a7640000'을 십진법으로 전환하면 1\*10^18의 값을 얻게 되는데 이것이 1ETH입니다. 최소 단위에 따라 1매틱으로 매핑될 수 있습니다.

:::

### 프로젝트 초기화 {#initialize-your-project}

우선 프로젝트를 위한 폴더를 생성해야 합니다. [명령줄](https://www.computerhope.com/jargon/c/commandi.htm)로 이동하여 다음을 입력합니다.

```bash
mkdir hello-world
cd hello-world
```

이제 프로젝트 폴더 내에 있으므로 `npm init`을 사용하여 프로젝트를 초기화합니다. 아직 npm을 설치하지 않았다면 [안내](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)를 따라 설치합니다. Node.js도 필요하니 다운로드하세요!

```bash
npm init # (or npm init --yes)
```

설치 질문에 어떻게 답변하는지는 중요하지 않습니다. 아래의 답변을 참고하세요.

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.json을 승인하면 준비가 완료됩니다!

### [Hardhat](https://hardhat.org/getting-started/#overview) 다운로드

Hardhat은 이더리움 소프트웨어를 컴파일, 배포, 테스트 및 디버그하는 개발 환경입니다. 개발자가 라이브 체인에 배포하기 전에 스마트 계약 및 dApp을 로컬로 빌드할 때 도움이 됩니다.

프로젝트 `hello-world`내부, 실행 :

```bash
npm install --save-dev hardhat
```

자세한 [설치 안내](https://hardhat.org/getting-started/#overview) 페이지를 확인하세요.

### Hardhat 프로젝트 만들기 {#create-hardhat-project}

`hello-world` 프로젝트 폴더에서 다음을 실행합니다.

```bash
npx hardhat
```

원하는 것을 선택할 수 있는 환영 메시지와 옵션을 참조하십시오. **빈 하드hat.config.js를 선택하십시오.**

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

`hardhat.config.js`이것은 우리 프로젝트에 대한 설정을 모두 지정할 수있는 곳입니다.

### 프로젝트 폴더 추가 {#add-project-folders}

프로젝트를 조직하려면 두 개의 새로운 폴더를 생성할 것입니다. 명령줄에서 `hello-world` 프로젝트의 루트 디렉터리로 이동하여 다음을 입력합니다.

```bash
mkdir contracts
mkdir scripts
```

* `contracts/`는 hello world 스마트 계약 코드 파일을 보관하는 곳입니다.
* `scripts/`는 계약 배포 및 상호작용을 위해 스크립트를 보관하는 곳입니다.

### 계약 작성 {#write-the-contract}

[VSCode와](https://code.visualstudio.com) 같은 좋아하는 에디터에서 **헬로세계** 프로젝트를 엽니다. 스마트 계약은 우리가 `HelloWorld.sol`스마트 계약을 작성하는 데 사용할 Solidity라는 언어로 작성됩니다.‌

1. `contracts`폴더에 탐색하고 새로운 파일을 만듭니다.`HelloWorld.sol`
2. 아래는 이 튜토리얼에서 사용하게 될 [이더리움 재단](https://ethereum.org/en/)의 Hello World 스마트 계약 예시입니다. 아래 내용을 `HelloWorld.sol` 파일로 복사하고 붙여 넣은 후 설명을 읽고 어떤 계약인지 확인하세요.

```solidity
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

생성과 동시에 메시지를 저장하고 `update` 함수를 호출하여 업데이트할 수 있는 매우 간단한 스마트 계약입니다.

### 메타마스크와 Alchemy와 연결하십시오. {#connect-with-metamask-alchemy}

메타마스크 지갑과 Alchemy 계정을 생성하고 스마트 계약을 작성했으니 이제 이 세 가지를 연결할 차레입니다.

가상 지갑에서 전송된 모든 트랜잭션은 고유한 비공개 키를 사용한 서명이 필요합니다. 프로그램에 이 권한을 부여하기 위해 비공개 키(및 Alchemy API 키)를 환경 파일에 안전하게 저장할 수 있습니다.

먼저 프로젝트 디렉터리에 dotenv 패키지를 설치합니다.

```bash
npm install dotenv --save
```

그런 다음 프로젝트의 루트 디렉터리에 `.env` 파일을 생성하고 메타마스크 비공개 키와 HTTP Alchemy API URL을 추가합니다.

:::warning 경고

환경 파일이 지정되어야 `.env`하거나 환경 파일로 인식되지 않습니다. `process.env` 또는 `.env-custom` 등의 이름을 지정하지 마세요.

또한 Git과 같은 **버전** 제어 시스템을 사용하여 프로젝트를 관리할 수 있다면 파일을 `.env`추적합니다. 이제 `.gitignore`파일에 `.env`추가해서 비밀 데이터를 게시하는 것을 피하십시오.

:::

* 이 [안내](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)를 따라 비공개 키를 내보냅니다.
* Alchemy HTTP API 키(RPC URL)를 받으려면 계정의 대시보드 에서 **Hello World** 앱을 탐색하고 오른쪽 상단 모서리에 **View 키를** 클릭하세요.

`.env` 파일은 다음과 같이 표시됩니다.

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

실제로 이 변수를 코드에 연결하기 위해 나중에 이 튜토리얼에서 `hardhat.config.js`파일에 있는 이러한 변수를 참조합니다.

### Ethers.j 설치 {#install-ethers-js}

Ethers.js는 [표준 JSON-RPC 메서드](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc)를 더욱 사용자 친화적인 메서드로 래핑하여 이더리움과의 상호작용과 요청을 더욱 쉽게 할 수 있는 라이브러리입니다.

Hardhat을 사용하면 [플러그인](https://hardhat.org/plugins/)을 쉽게 통합하여 추가 도구 및 확장 기능을 사용할 수 있습니다. 계약 배포를 위해 [이더 플러그인](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html)을 활용할 것입니다. [Ethers.js](https://github.com/ethers-io/ethers.js/)는 유용한 계약 배포 메서드를 제공합니다.

프로젝트 디렉터리에서 type:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

또한 다음 단계의 `hardhat.config.js`에 이더가 필요할 것입니다.

### hardhat.config 업데이트 {#update-hardhat-config-js}

지금까지 몇 가지 의존성과 플러그인을 추가했습니다. 이제 우리는 프로젝트가 이러한 부작용을 인식하도록 `hardhat.config.js`업데이트해야 합니다.

다음과 같이 표시되도록 `hardhat.config.js`를 업데이트합니다.

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### 스마트 계약 컴파일하기 {#compile-our-smart-contract}

지금까지의 작업이 모두 제대로 작동하는지 확인하기 위해 계약을 컴파일해 봅니다. `compile` 작업은 hardhat 기본 작업 중 하나입니다.

명령줄에서 다음을 실행합니다.

```bash
npx hardhat compile
```

당신은 그에 `SPDX license identifier not provided in source file`대한 경고를 받을 수 있지만 응용 프로그램은 여전히 잘 작동할 수 있습니다. 그렇지 않으면 언제든지 [Alchemy discord](https://discord.gg/u72VCg3)에 문의할 수 있습니다.

### 배포 스크립트를 작성 {#write-our-deploy-script}

계약을 작성하고 구성 파일도 준비했으므로, 이제 계약 배포 스크립트를 작성할 차례입니다.

`scripts/` 폴더로 이동하여 `deploy.js`라는 새 파일을 생성한 후 다음 내용을 파일에 추가합니다.

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

다음 각 코드 줄의 역할에 대한 설명은 Hardhat 팀의 [계약 튜토리얼](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)에서 가져왔습니다.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Ethers.js의 `ContractFactory`는 새 스마트 계약을 배포하는 데 사용되는 추상화이므로, 여기의 `HelloWorld`는 hello world 계약 인스턴스의 [팩토리](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\))입니다. `hardhat-ethers` 플러그인 `ContractFactory` 및 `Contract`를 사용할 때, 인스턴스는 기본적으로 처음 서명한 사람(소유자)에게 연결됩니다.

```javascript
const hello_world = await HelloWorld.deploy();
```

`ContractFactory`에서 `deploy()`를 호출하면 배포가 시작되고 `Contract` 객체로 확인되는 `Promise`를 반환합니다. 이는 각 스마트 계약 함수에 대한 메서드를 가진 객체입니다.

### 스마트 계약 배포하기 {#deploy-our-smart-contract}

명령줄로 이동하여 다음을 실행합니다.

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

이런 것을 보시려면

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

Polygon [Mumbai 탐험가에](https://mumbai.polygonscan.com/) 가서 계약 주소를 검색하면 우리는 그것이 성공적으로 배포되었는지 확인할 수 있습니다.

`From`주소는 메타마스크 계정 주소와 일치해야 하며 `To`주소는 **계약** 제작이라고 말할 수 있습니다. 그러나 트랜잭션을 클릭하면 해당 분야에서 계약 주소를 확인할 수 `To`있습니다.

![img](/img/alchemy/polygon-scan.png)

### 계약 검증하기 {#verify-the-contract}

Alchemy는 응답 시간, HTTP 지위, 다른 사람의 오류 코드와 같은 스마트 계약과 함께 배포된 방법에 대한 정보를 찾을 수 있는 [탐험가를](https://dashboard.alchemyapi.io/explorer) 제공합니다. 이 우수한 환경에서 계약을 검증하고 트랜잭션이 성공했는지 확인할 수 있습니다.

![img](/img/alchemy/calls.png)

**축하합니다! Polygon Mumbai 네트워크에 스마트 계약을 배포했습니다.**

## 추가 리소스 {#additional-resources}

- [NFT 스마트 계약을 개발하는 방법](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) - Alchemy는 이 주제에 대해 YouTube 비디오와 함께 서면 자습서를 가지고 있습니다. 이것은 **웹3** dev 시리즈의 무료 10주간의 Road 1주째입니다.
- [Polygon API 퀵스타트](https://docs.alchemy.com/reference/polygon-api-quickstart) - Alchemy의 개발자 docs 가이드 Polygon을 통해 점점 더 많은 ky를 개발하고 실행하는 가이드
