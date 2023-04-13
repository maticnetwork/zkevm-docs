---
id: dapp-fauna-polygon-react
title: dApp 데이터 자습서
description: Fauna, Polygon 및 React를 사용하여 dapp을 빌드합니다.
keywords:
  - docs
  - matic
  - dapp
  - fauna
  - 폴리곤
  - react
image: https://matic.network/banners/matic-network-16x9.png
slug: dapp-fauna-polygon-react
---

**dApp** 또는 분산 애플리케이션은 블록체인 구조를 기반으로 구축된 앱입니다. 어플리케이션을 구축할 수 있는 다양한 유형의 블록체인 – 여러분 몇몇은 솔라나와 이더리움을 들어본 적이 있을 겁니다-들이 있습니다. 이러한 기본 네트워크는 기본 블록체인과 병렬로 실행되는 **사이드체인** 또는 보조 블록체인으로 보완되는 경우가 있습니다. 폴리곤과 같은 사이드체인은 여러 블록체인 간에 토큰 및 기타 디지털 자산을 사용할 수 있도록 하여 기본 블록체인의 기능을 크게 확장하고 거래 수수료 감소와 같은 사용 사례를 허용하고 기본 블록체인의 확장성을 높이고 트랜잭션 트래픽과 용량을 더 최적화합니다. 이는 사이드체인이 루트 체인을 주기적으로 업데이트하고 기본 블록체인은 모든 새 블록을 업데이트하기 때문입니다.

dApp의 사용 사례는 날로 확장되고 있습니다. 인기가 높아짐에 따라 점점 더 많은 앱이 자신의 어플리케이션을 분산된 세계에 맞출 수 있는 방법을 상상하고 있습니다. 중앙 집중식 앱과 마찬가지로 이러한 dApp 중 일부는 신원 인증이나 실제 주소로 배송되는 물건 구매와 같은 시나리오를 위해 여전히 개인 데이터를 사용해야 할 수 있습니다.

프라이빗 어플리케이션 데이터를 퍼블릭 블록체인에 전송하고 저장하는 것은 dApp에 필요하지만 결국 악의적인 행위자로부터 막대한 프라이버시 침해를 유발할 수 있습니다. 그렇다면 개인 데이터가 블록체인의 불변하고 공개적인 특성으로 흘러가지 않도록 어떻게 보호할 수 있을까요?

## Fauna, Polygon, 및 React로 dApp 데이터 보호하기

이 튜토리얼에서는 UI와 기능을 위해 React, 트랜잭션을 위해 폴리곤 사이드체인, 그리고 블록체인에서 공개적으로 노출되고 싶지 않을 수도 있는 트랜잭션의 개인 데이터를 저장하기 위해 Fauna를 활용하는 간단한 허용 목록 앱을 구축할 것입니다. "화이트리스팅"이라고도 하는 "허용 목록"은 탈중앙화 세계에서 매우 일반적인 개념입니다. 허용 목록에 등록하면 일반적으로 디지털 자산을 가장 먼저 구매할 수 있는 것과 같은 특별 권한에 액세스할 수 있습니다.

![img](/img/dapp-fauna-polygon-react/polygon-fauna-app.gif)

앱 워크플로의 GIF - 사용자가 양식을 작성하면, 메타마스크 창이 팝업되고 트랜잭션이 제출되고 확인되면 성공 메시지가 표시됩니다.

어플리케이션은 이름, 성 및 지갑 주소를 사용합니다. 일반적으로 많은 허용 목록은 지갑 주소만 가져오지만 트랜잭션 내에서 추가 개인 정보를 전달하는 방법으로 이름과 성을 사용합니다. 데이터 흐름은 다이어그램에 설명된 대로입니다:

![img](/img/dapp-fauna-polygon-react/flow.png) 사용자는 양식을 통해 이름, 성 및 지갑 주소를 성공적으로 제출합니다. 새 데이터베이스 항목은 무작위로 생성된 UUID, 이름, 성 및 지갑 주소가 있는 Fauna에 제출됩니다. 순 트랜잭션은 트랜잭션 세부 정보의 일부로 이름, 성 및 지갑 주소를 전달하는 폴리곤에 제출되지만 각 속성은 Fauna 데이터베이스에 대해 생성된 UUID와 동일합니다.

### Fauna란 무엇인가?

[Fauna](https://fauna.com/)는 서버리스 데이터베이스 경험을 제공하는 데이터 API입니다. 깊이 있는 [문서](https://docs.fauna.com/)와 웹 네이티브 GraphQL 인터페이스를 통해 개발자는 유연성, 확장성 및 성능과 같은 요소를 희생하지 않고도 애플리케이션 데이터 저장을 빠르게 시작할 수 있습니다.

이 튜토리얼에서는 블록체인에 명시적으로 표시하고 싶지 않은 개인 거래 데이터를 저장하는 방법으로 Fauna를 사용할 것입니다. 개인 거래 데이터에 채워진 UUID를 사용하여 블록체인 거래의 정보를 Fauna 데이터베이스의 실제 개인 거래 세부 정보와 함께 특정 항목에 매핑합니다.

## 시작하기

빌드를 시작하려면 다음 단계를 따르십시오:

- Fauna 계정 만들기 — [여기](https://dashboard.fauna.com/accounts/register?utm_source=polygon.technology&utm_medium=referral&utm_campaign=docs-tutorial)에서 가입할 수 있습니다.
- 폴리곤의 테스트 네트워크(Mumbai-Testnet)가 구성된 메타마스크 지갑을 생성합니다.
    - 먼저 [여기](../develop/metamask/tutorial-metamask.md)에서 메타마스크를 설정하세요. 암호 복구 구문을 저장했는지 확인하십시오.
    - 그런 다음 [여기](../develop/metamask/config-polygon-on-metamask.md)의 지침에 따라 메타마스크에서 뭄바이-테스트넷을 구성하십시오.
- 뭄바이-테스트넷에 대해 메타마스크를 설정하고 구성했으면 지갑에 추가할 MATIC이 필요합니다
    - MATIC은 폴리곤 네트워크의 기본 암호화폐이며 네트워크 수수료, 스테이킹 및 폴리곤 블록체인 거버넌스에 사용됩니다(MATIC 보유자는 폴리곤 변경 사항에 대해 투표할 수 있음). 이 프로젝트의 맥락에서 각 거래에 부과되는 가스 수수료를 지불하려면 MATIC이 필요합니다. [여기](https://www.kraken.com/en-us/learn/what-is-polygon-matic#:~:text=MATIC%20is%20the%20native%20cryptocurrency,services%20to%20the%20Polygon%20network.)에서 MATIC에 대해 자세히 알아볼 수 있습니다.
    - 시작하려면 [MATIC faucet](https://faucet.polygon.technology/)를 사용하여 지갑으로 무료 MATIC을 보내십시오(참고: 이 MATIC은 Mumbai-Testnet에서만 사용할 수 있으며 개발 목적으로만 사용 가능). 웹 페이지에서 다음 옵션이 선택되어 있는지 확인하십시오: ![img](/img/dapp-fauna-polygon-react/faucet.png) Network에 “Mumbai”, Select Token에 “MATIC Token”, Wallet Address에 지갑주소를 입력합니다.
    - 지갑 주소가 무엇인지 알아보려면 메타마스크에서 가져올 수 있습니다:

    ![img](/img/dapp-fauna-polygon-react/metamask_wallet_address.png)

    브라우저에서 메타마스크로 이동합니다. 계정 이름 아래 상단에 긴 문자열이 표시됩니다. 그것이 귀하의 계정 ID입니다. 해당 ID를 클릭하여 복사합니다.

    :::참고

    *참고: 이 작업은 시간이 걸릴 수 있으며 첫 번째 트랜잭션이 지갑을 통해 들어오기 전에 몇 번 시도해야 할 수 있습니다. MATIC faucet에서 성공적인 각 트랜잭션은 0.5 MATIC를 제공합니다. 어플리케이션을 테스트하려면 MATIC를 가스 수수료(거래를 수행하기 위해 지불해야 하는 변동 수수료)로 사용해야 하므로 이 트랜잭션을 ~12회 수행하여 지갑에 약 6 MATIC을 갖도록 권장합니다. 이는 앱을 테스트하기에 충분해야 합니다.*

    지갑의 거래를 추적하려면 [https://mumbai.polygonscan.com/address/](https://mumbai.polygonscan.com/address/)[wallet address]를 방문하십시오.

    :::
- 이제 [Truffle](https://trufflesuite.com/)을 설치하십시오. 이것은 이더리움 어플리케이션 개발을 위해 설계된 도구 모음입니다.
  - Truffle이 이미 설치되어 있는지 확인하려면 `truffle version`을 실행할 수 있습니다. 이와 같은 응답을 받으면 이미 설치되어 있는 것입니다:
  ``` js
  $ truffle version
  Truffle v5.4.29 (core: 5.4.29)
  Solidity v0.5.16 (solc-js)
  Node v13.8.0
  Web3.js v1.5.3
  ```
  - Truffle을 설치하려면 `npm -g truffle`을 실행하십시오.
- 또한, 아직 가지고 있지 않다면 도구를 설치하여 `npm i create-react-app`으로 샘플 React 앱을 실행하십시오. [여기](https://reactjs.org/)에서 React에 대해 자세히 알아보십시오.

## 구축 시작하기

독립적으로 코드를 살펴보는 것을 선호하는 사람이라면, [여기](https://github.com/hello-ashleyintech/polygon-fauna-app)에서 GitHub 리포지토리를 사용할 수 있습니다. GitHub 리포지토리를 시작하려면 다운로드하거나 복제하고 [README](https://github.com/hello-ashleyintech/polygon-fauna-app#readme)를 참조하여 설정하세요.

### 설정

1. 선택한 위치에 프로젝트를 위한 새 디렉토리를 만드십시오. 우리는 이것을 `polygon-fauna-app`이라고 부릅니다.
2. 디렉토리가 생성되면 명령줄에서 폴더로 `cd`하십시오(예: `cd polygon-fauna-app`).
3. 디렉토리에 들어가면 앱을 설정할 차례입니다. Truffle을 사용하면 React front-end로 분산 애플리케이션을 더 쉽게 구축할 수 있습니다. 초기 프로젝트를 설정하려면 `truffle unbox react`를 실행하십시오.
    1. 명령이 실행되면, 현재 디렉토리에서 `ls`를 실행하면 이전에는 없었던 다양한 하위 디렉토리를 볼 수 있습니다. 우리가 집중할 가장 중요한 것들은:
        1. `client` - 애플리케이션, 주요 기능 및 프론트-엔드가 있는 곳입니다. 클라이언트 내에서 구조는 일반 React 프로젝트와 똑같이 보입니다.
        2. `contracts` - 이 디렉토리는 스마트 컨트랙트가 있는 곳입니다. 스마트 컨트랙트은 기능이 호출될 때 블록체인의 계정 내에서 지정된 기능을 실행하는 프로그램입니다. 이 디렉토리의 파일이 `.sol`로 끝나는 것을 알 수 있습니다. 이는 파일이 스마트 컨트랙트를 구현하기 위한 객체 지향 고급 언어인 [Solidity](https://docs.soliditylang.org/)로 구축되었기 때문입니다.
        3. `migrations` - 이 디렉토리에는 Mumbai-Testnet 네트워크가 되는 지정된 네트워크의 `contracts`에 스마트 컨트랙트를 배포할 수 있는 사전 구성된 스크립트가 있습니다.

  :::참고

    IDE를 사용하여 코딩하는 경우 지금이 IDE에서 프로젝트를 열 수 있는 완벽한 시간입니다! 곧 일부 파일 편집을 시작할 예정입니다.

  :::

### 스마트 컨트랙트 구성 및 기능

1. 현재 이 프로젝트는 이더리움 블록체인 디렉토리에 배포하는 방향으로 진행되고 있습니다. 우리가 작업하려는 뭄바이-테스트넷을 가리키도록 이것을 업데이트해야 합니다.
    - 이렇게 하려면, 먼저 명령줄에서 다음 명령을 실행하여 필요한 패키지를 설치해야 합니다.

        `npm install @truffle/hdwallet-provider`

        그리고

        `npm install dotenv`

    - 그런 다음 현재 있는 디렉터리에 `.env`라는 파일을 만듭니다. `.env` 내에서 다음을 수행합니다.
        - `MNEMONIC`이라는 환경 변수를 생성하고 메타마스크 지갑의 암호 복구 구문과 동일하게 만드십시오. 적어 두지 않은 경우 [이 가이드](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase)를 따라 다시 공개할 수 있습니다.
        - `RPC_APP_ID`라는 환경 변수를 생성하고 .env는 다음과 같아야 합니다.

        `.env`는 다음과 같아야 합니다:
        ```js
          MNEMONIC=your secret phrase should go here
        ```
    - 마지막으로 Truffle을 통해 생성된 truffle-config.js 파일을 다음으로 교체합니다(참고: 클라이언트, 계약 및 마이그레이션 폴더와 동일한 디렉터리에 있어야 함):
    ```js
    const HDWalletProvider = require("@truffle/hdwallet-provider");
    const path = require("path");
    require("dotenv").config(); // Load .env file

    module.exports = {
      // See <http://truffleframework.com/docs/advanced/configuration>
      // to customize your Truffle configuration!
      contracts_build_directory: path.join(__dirname, "client/src/contracts"),
      networks: {
        develop: {
          port: 8545,
        },
        matic: {
          provider: () =>
            new HDWalletProvider(
              process.env.MNEMONIC,
              `https://matic-mumbai.chainstacklabs.com`
            ),
          network_id: 80001,
          confirmations: 2,
          timeoutBlocks: 200,
          skipDryRun: true,
          gas: 6000000,
          gasPrice: 10000000000,
        },
      },
    };
    ```
2. 구성을 설정했으면, 이를 테스트하고 당신의 계정을 가리키는지 확인하십시오.
  - 이를 테스트하려면 `truffle migrate --network matic`을 실행하여 현재 스마트 컨트랙트를 마이그레이션하십시오(Truffle에서 일부를 자동으로 채움). 이 프로젝트에 대해 이 `deploy` 명령을 처음 실행하지 않는 경우 `truffle migrate --network matic --reset`을 실행하여 마이그레이션의 새 복사본을 실행하고 최신 코드 업데이트를 가져옵니다.

:::참고

  문제가 발생하면 다음 사항을 확인하십시오. `MNEMONIC` 환경 변수가 루트 디렉토리의 `.env` 파일에 정의되어 있는지 확인하십시오. *지속적인 오류가 발생하고 위의 사항을 확인했다면 `truffle-config.js`의 [matic-mubai.chainstacklabs.com](http://matic-mubai.chainstacklabs.com) URL 대신 다른 RPC URL을 사용해 보십시오. 뭄바이 테스트넷에 대한 추가 URL 목록은 [이 페이지](https://docs.polygon.technology/docs/operate/network/)의 "Mumbai-Testnet" 섹션*에서 찾을 수 있습니다.

:::

- 그런 다음 프런트 엔드를 실행하여 새 응용 프로그램에 연결할 수 있는지 테스트합니다. Truffle은 이 연결을 테스트할 수 있도록 미리 구성된 로직을 추가했습니다. 기본 디렉토리에서 다음을 실행하여 테스트할 수 있습니다:

        `cd client`

        `npm run start`

:::참고

  `client` 폴더 내에서만 애플리케이션을 시작할 수 있습니다.

:::

  - 브라우저는 [http://localhost:3000](http://localhost:3000)에서 개발 인스턴스를 시작한 다음 메타마스크를 표시합니다. 비밀번호 재인증을 요청할 수 있습니다. 마지막으로 메타마스크는 테스트넷의 계정을 애플리케이션 인스턴스에 연결하려고 시도하므로 가스 요금으로 약간의 MATIC 비용이 발생합니다. 다음과 같은 창이 나타납니다:

  ![img](/img/dapp-fauna-polygon-react/metamask_notification.png)

  - 거래를 진행하려면 "Confirm"을 클릭하십시오. 메타마스크 창이 사라지고 브라우저에 작은 "Transction Confirmed" 알림이 표시됩니다. 지갑이 성공적으로 연결되었는지 확인하려면 다음 페이지가 표시되어야 합니다:

  ![img](/img/dapp-fauna-polygon-react/truffe_box_installed.png)

  이 스크린샷에서 페이지 하단에 저장된 값은 값 5입니다. 원래 값은 지갑을 인증하기 전에 페이지가 처음 로드될 때 0으로 설정됩니다. 성공적으로 연결되면 5로 업데이트됩니다.

3. 이제 스마트 컨트랙트 기능을 업데이트할 수 있습니다.
  - 이를 위해 루트 프로젝트 디렉토리에서 `contracts` 디렉토리를 정리할 것입니다. `client` 디렉토리에서 `cd ../contracts`를 실행하여 명령줄에서 액세스할 수 있습니다.
  - 먼저 `contracts` 디렉토리에서 기본 `SimpleStorage.sol` 파일을 삭제합니다.
  - 그런 다음 특정 허용 목록 기능에 대한 새로운 스마트 컨트랙트를 추가합니다. `contracts` 내에서 `Allowlist.sol`이라는 새 파일을 만들고 다음을 붙여넣습니다:

``` solidity

  pragma solidity ^0.5.0;

  contract Allowlist {
      // all are going to be set to uuid value in smart contract, so declare as same type
    struct allowlister {
      string f_name;
      string l_name;
      string wallet_address;
    }

    allowlister[] allowlisters; // array of all allowlisters

    function _createAllowlister (string memory _uuid) public {
      allowlisters.push(allowlister({
        f_name: _uuid,
        l_name: _uuid,
        wallet_address: _uuid
      })) -1;
    }
  }

```

이 코드를 조금 분해해 보겠습니다:

  - 스마트 컨트랙트인, `Allowlist`에는 허용 목록(허용 목록에 항목을 제출하는 사람)이 어떻게 생겼는지에 대한 개요가 포함되어 있습니다. 이름, 성 및 지갑 주소를 양식에 입력할 것임을 알고 있으므로 이러한 속성을 사용하여 허용 목록을 나타내는 `struct`를 만들었습니다. 컨트랙트에 항목을 저장할 때, 각 항목은 해당 제출의 UUID에 매핑됩니다. 즉, 각 변수 유형은 UUID가 될 변수 유형과 일치해야 합니다.
      - UUID는 Solidity에서 다른 종류의 변수 유형의 길이를 초과하는 문자열이므로 더 긴 길이를 허용하는 유형 `string`을 각 속성에 할당합니다.
  - 또한 사용자가 양식에 정보를 제출할 때 추가할 수 있는 `allowlisters`의 배열을 초기화했습니다.
  - 마지막으로, 사용자가 양식을 제출할 때 호출하는 `_createAllowister`라는 함수를 만들었습니다. 함수는 해당 항목에 대해 생성된 `_uuid` 문자열을 사용합니다(변수 이름의 밑줄은 변수를 함수 매개변수로 구별하기 위한 것입니다). 함수 내에서 새 `allowlister` 인스턴스를 `allowlister`배열에 푸시합니다. - 인스턴스의 각 속성은 전달된 `_uuid`와 동일합니다.

- 그런 다음 루트 디렉터리의 마이그레이션 폴더로 이동합니다. 2_deploy_contracts.js 파일로 이동하여 새 컨트랙트를 배포하도록 기능을 업데이트하겠습니다.

```js
var Allowlist = artifacts.require("./Allowlist.sol");

module.exports = function(deployer) {
  deployer.deploy(Allowlist);
};
```

- 마지막으로 `truffle migrate --network matic --reset`을 실행하여 새 컨트랙트를 마이그레이션합니다.

### 앱 및 기능 개발

새 스마트 컨트랙트를 배포했으면 애플리케이션 구축을 시작하겠습니다.

1. `react-hook-form` 라이브러리를 사용하여 간단한 양식 경험을 구축할 것입니다. `npm install react-hook-form`을 실행하여 설치해야 합니다.
2. 다음으로, `client/src`에 `components`라는 새 디렉토리를 작성하십시오.
3. `components`내에서 `AllowlistForm.js`라는 파일을 만들고 다음을 붙여넣습니다.:

```js
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AllowlistForm(props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("walletAddress", { required: true });
  }, [register]);

  async function submitForm(data) {
    console.log(data);
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit((data) => submitForm(data))}>
        <div className="header">
          <h1>Allowlist Form</h1>
          <p>
            Please fill out this form to get allowlisted for this exclusive
            project.
          </p>
        </div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          onChange={(e) => setValue("firstName", e.target.value)}
        />
        {errors.firstName && (
          <span role="alert" className="errorField">
            First name is required.
          </span>
        )}
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          onChange={(e) => setValue("lastName", e.target.value)}
        />
        {errors.lastName && (
          <span role="alert" className="errorField">
            Last name is required.
          </span>
        )}
        <label htmlFor="walletAddress">Wallet Address</label>
        <input
          id="walletAddress"
          onChange={(e) => setValue("walletAddress", e.target.value)}
        />
        {errors.walletAddress && (
          <span role="alert" className="errorField">
            Wallet address is required.
          </span>
        )}
        <input type="submit" className="submitButton" />
      </form>
    </div>
  );
}
```

위의 코드는 앞서 설치한 `react-hook-form` 라이브러리를 이용하여 `AllowlistForm`이라는 컴포넌트를 생성합니다. 이 양식은  `firstName`, `lastName` 및 `walletAddress` 필드를 허용하고 오류 유효성 검사에 필요한 필드를 명시적으로 지정합니다. 구성 요소에는 필수 입력을 비워두고 제출을 시도하기 위한 몇 가지 오류 처리 논리도 포함되어 있습니다.

4. 다음으로 양식을 더 보기 좋게 만들기 위해 `AllowlistForm.css`라는 파일을 만들고 다음 CSS를 추가합니다:
``` css

h1 {
  border-bottom: 1px solid white;
  color: #3d3d3d;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}

.header {
  margin-bottom: 10px;
}

form {
  background: white;
  border: 1px solid #dedede;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: 10px;
  max-width: 500px;
  padding: 30px 50px 0px;
}

input {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
}

label {
  color: #3d3d3d;
  display: block;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
}

.errorField {
  color: red;
  font-family: sans-serif;
  font-size: 12px;
  margin-bottom: 10px;
  text-align: left;
}

.submitButton {
  background-color: #6976d9;
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  margin: 20px 0px;
}

```

TIP 양식 필드, 버튼, 입력 스타일 및 색 구성표를 구현하고 양식 기능의 개요를 돕기 위해 `react-hook-form`에 대한 [Retool 자습서](https://retool.com/blog/how-to-build-a-react-form-component/)를 참조로 사용할 수 있습니다.

:::

:::참고 추가 참고 사항: 이전 스타일시트에 대한 경고를 수신하는 경우 Truffle이 React 프로젝트를 설정하는 데 사용하는 `create-react-app`의 레거시 버전 때문일 수 있습니다. 이를 완화하기 위해 `package.json`의 `browserlist` 속성을 다음과 같이 업데이트할 수 있습니다:

```js
"browserslist": {
    "production": [
      ">0.3%",
      "not ie 11",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version",
      ">0.3%",
      "not ie 11",
      "not dead",
      "not op_mini all"
    ]
  }
```
:::

5. 스타일을 구성 요소와 연결하려면 `AllowlistForm.js` 구성 요소 상단에 다음 import 문을 추가합니다:

    `import "./AllowlistForm.css";`

6. 마지막으로 데모 앱에서 실제로 양식을 표시해야 합니다.
    - `client` 디렉토리에서 `App.js` 파일을 업데이트하여 이를 수행합니다. `App.js`의 현재 내용을 다음으로 바꿉니다:

```js
import React, { Component } from "react";
import AllowlistContract from "./contracts/Allowlist.json";
import getWeb3 from "./getWeb3";
import AllowlistForm from "./components/AllowlistForm";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = AllowlistContract.networks[networkId];
      const instance = new web3.eth.Contract(
        AllowlistContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <AllowlistForm
          contract={this.state.contract}
          accounts={this.state.accounts}
        />
      </div>
    );
  }
}

export default App;
```
이 `App.js` 로직 중 일부는 원래 Truffle에서 설정한 것과 유사합니다! 새롭게 개선된 `App.js`는 다음을 수행합니다:

- 페이지 로드 시 web3 인스턴스, 모든 관련 계정 및 `Allowlist` 스마트 컨트랙트의 인스턴스(이전에 실행된 `truffle migrate` 명령에서 생성된 컨트랙트의 인스턴스인 `Allowlist.json`에서 가져옴)를 초기화합니다.
    - 이러한 초기화 내에서 계약, 계정 목록 및 web3 인스턴스에 대한 해당 상태 변수를 설정합니다.
- 페이지가 렌더링될 때 여전히 모든 web3 정보를 가져오는 중이라면 양식이 아닌 " Loading message"이 표시됩니다. -이는 web3 상태 변수가 설정되었는지 여부를 확인하여 결정됩니다.
    - 해당 web3 상태 변수가 설정되면 `AllowlistForm` 구성 요소를 반환하고 `contract` 및 `accounts` 상태 변수를 전달합니다. 양식을 제출할 때 블록체인에 쓰기 위해 구성 요소 내에서 필요합니다.
- 데모 GIF처럼 아름다운 전체 페이지 라벤더 배경을 얻으려면 `App.css` 파일 하단에 다음을 추가하십시오:

```css
html,
body {
  width: 100%;
  height: 100%;
  background: lavender;
}
```

지금 http://localhost:3000으로 이동하면 애플리케이션이 다음과 같이 보일 것입니다:

![img](/img/dapp-fauna-polygon-react/allowlist.png)

이 시점에서 양식의 기능을 테스트할 수 있습니다. 빈 응답을 제출하여 오류 메시지가 나타나는지 확인하십시오. 또한 성공적인 제출을 테스트하기 위해 각 필드를 임의의 문자열로 채울 수 있습니다. 성공 여부를 확인하려면 콘솔을 확인하고 제출된 양식 응답을 확인해야 합니다.

### Fauna 설정 및 연결

이제 애플리케이션이 설정되었으므로 Fauna로 이동하여 애플리케이션에 연결합니다.

1. Fauna 계정에 로그인합니다. "Create Database" 버튼을 클릭하여 데이터베이스를 생성할 메인 대시보드로 이동합니다. 원하는 이름으로 데이터베이스를 만들고 "Classic" 지역 그룹을 선택해야 합니다:

![img](/img/dapp-fauna-polygon-react/create_database.png)

데이터베이스를 생성하면 개요 페이지로 이동합니다.

2. 새로 생성된 데이터베이스 내에서 [Collection](https://docs.fauna.com/fauna/current/learn/understanding/collections)을 생성할 것입니다. Fauna의 컬렉션은 동일한 정보와 필드가 서로 동일한 항목을 저장하는 전용 장소인 기존 데이터베이스의 "table" 개념과 동일합니다. "New Collection" 버튼을 클릭하고 선택한 이름으로 컬렉션을 만듭니다:

![img](/img/dapp-fauna-polygon-react/new_collection.png)

:::팁

Fauna에서 매우 흥미로운 점은 기존 데이터베이스에서 테이블에 삽입하는 항목을 구조화하는 방법인 "columns"을 실제로 생성하지 않는다는 것입니다. Fauna에 삽입하는 데이터는 그 반대*가 아니라 컬렉션 구조를 결정합니다.* :::

3. 데이터베이스와 그 안에 컬렉션이 만들어지면 인-앱에서 액세스할 수 있도록 암호 키를 생성해야 합니다. 그렇게 하려면 데이터베이스의 "Security" 옵션으로 이동하여 "New Key"를 클릭하십시오.  다음 설정으로 새 키를 만들고 선택한 이름을 지정합니다:

![img](/img/dapp-fauna-polygon-react/new_key.png)

“SAVE"를 클릭하고 키 목록 위에 나타나는 암호를 복사합니다. 그런 다음 클라이언트 내의 프로젝트에 .env 파일을 만듭니다. 이것은 front-end가 읽을 React 관련 .env입니다. REACT_APP_FAUNADB_SECRET 환경 변수를 추가하고 API 키 생성 시 복사한 암호와 동일하게 설정합니다. .env는 다음과 같아야 합니다:

```js
REACT_APP_FAUNADB_SECRET=your secret from fauna goes here
```

:::참고 React `.env` 파일의 경우 모든 사용자 정의 환경 변수는 React가 인식할 수 있도록 `REACT_APP_`로 시작해야 합니다.

:::

4. 이제 Fauna에 컬렉션이 준비되어 있고 컬렉션이 있는 데이터베이스에서 생성된 API 키가 있으므로 Fauna에 쓰기를 시작할 수 있습니다.
  - 프로젝트 디렉토리에서 `npm install --save animaldb`를 실행하여 `faunadb`을 로컬로 설치합니다.
  - 다음으로 `client/src`에 `api` 폴더를 생성합니다.
  - `api` 폴더 내에서 `fauna.js`라는 파일을 생성합니다. 이 파일은 애플리케이션 내에서 Fauna API와 통신하는 방법입니다. `fauna.js`파일은 다음과 같아야 합니다:

    ```js
    require("dotenv").config(); // Load .env file
    export async function addDocument(uuid, firstName, lastName, walletAddress) {
      const faunadb = require("faunadb");
      const q = faunadb.query;
      const client = new faunadb.Client({
        secret: process.env.REACT_APP_FAUNADB_SECRET,
        domain: "db.fauna.com",
        scheme: "https",
      });
      var response = client.query(
        q.Create(q.Collection("allowlist_members"), {
          data: {
            uuid: uuid,
            f_name: firstName,
            l_name: lastName,
            wallet_address: walletAddress,
          },
        })
      );

      return response;
    }

    ```
`fauna.js`는 `client/.env`에 설정된 환경 변수를 가져오는 것으로 시작합니다. 그런 다음 `uuid`(아래 섹션에서 프로그래밍 방식으로 생성)와 양식 입력된 `firstName`, `lastName` 및 `walletAddress`를 받는 `addDocument` 함수를 선언합니다. 함수 내에서 `.env`의 비밀 저장소를 활용하여 Fauna API 클라이언트의 인스턴스를 초기화합니다. 이는 특히 Fauna가 생성한 데이터베이스를 가리킵니다. 마지막으로, 함수는 실제로 API 클라이언트에 쿼리하여 Document라는 새 항목을 생성한 컬렉션에 추가합니다(이 코드 예제에서는 `allowlist_members`라는 컬렉션에서 가져옵니다. 이 항목을 자신의 컬렉션을 위해 선택한 이름으로 변경해야 합니다. ).

마지막으로 쿼리가 실행되면 API 응답이 반환됩니다.

::::팁 `faunadb` [패키지 웹사이트](https://www.npmjs.com/package/faunadb) 는 Fauna를 앱에 구성하고 연결하는 방법에 대한 통찰력을 제공하는 훌륭한 리소스입니다!

:::

### Fauna에 양식 응답 제출하기

Fauna API 클라이언트가 추가되고 컬렉션에 새 항목을 추가하는 방법을 사용하여 양식에 연결해 보겠습니다!

사용자 흐름에서 회상하면, 누군가가 양식을 제출할 때 다음과 같은 일이 발생하기를 원합니다:

1. 모든 정보는 블록체인으로 보내지지만, 개인 값은 생성된 UUID로 대체됩니다.
2. 이러한 개인 값(이름, 성 및 지갑 주소)은 대신 Fauna로 전송되어 해당 UUID 옆에 저장됩니다.

이제 Fauna에 정보를 보내는 기능이 준비되었으므로 이를 사용하여 목표 #2를 달성해 보겠습니다.

1. `AllowlistForm.js` 파일 상단에 다음 가져오기를 추가합니다.

    `import { *addDocument* } from "../api/fauna";`

2. 그런 다음 `AllowlistForm.js`의 `submitForm` 함수 내에서 `console.log` 문을 다음으로 바꿉니다:
``` js
// add data to Fauna
const uuid = crypto.randomUUID();
await addDocument(uuid, data.firstName, data.lastName, data.walletAddress)
  .then((res) => {
    console.log(res);
  }
)
```

이 스니펫에서는, 36자 길이의 v4 UUID를 생성하는 내장 `crypto.randomUUID()` [함수](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)를 사용하여 프로그래밍 방식으로 UUID를 생성합니다. UUID가 생성되면 방금 추가한 `addDocument` 함수를 호출합니다. `addDocument` 내에서, 우리는 생성된 UUID뿐만 아니라 양식 제출(`data`에서 캡처됨, 처음에 `submitForm` – `data.firstName`, `data.lastName` 및 `data.walletAddress` 으로 전달됨)에서 정보를 전달하고 있습니다. 마지막으로, API 응답이 콘솔에 기록되어 API 호출이 성공적으로 진행되었는지 확인하는 데 도움이 됩니다.

3. 이제 완전히 작성된 양식을 제출할 때 Fauna에 정보를 보내도록 양식이 구성되었습니다. 양식의 각 필드를 작성하고 제출하여 이를 테스트할 수 있습니다. 그것은 Fauna에 제출된 모든 정보를 보여주는 내부 `data` 속성과 함께 콘솔에 개체를 기록해야 합니다. 성공적으로 제출되었는지 확인하려면 Fauna에서 컬렉션을 가져와 항목이 있는지 확인할 수 있습니다. 다음과 같이 표시되어야 합니다:

![img](/img/dapp-fauna-polygon-react/allowlist_members.png)

### UUID 충돌 처리하기

우리의 애플리케이션은 이제 Fauna에 응답을 보내고 있습니다. 그러나 무작위로 생성된 UUID를 사용하기 때문에 데이터베이스에 중복된 UUID 항목이 있을 가능성이 있습니다. 우리는 Fauna에 정보를 저장하기 전에 우리가 생성한 것과 일치하는 다른 UUID가 없는지 확인하고, 존재하는 경우 새 UUID를 생성해야 합니다.

1. Fauna 컬렉션에 입력한 데이터를 검색하기 위해 [Index](https://docs.fauna.com/fauna/current/api/fql/indexes?lang=javascript)를 사용할 수 있습니다. Fauna의 색인을 사용하면 컬렉션에 저장된 데이터를 탐색하고 쉽게 검색할 수 있습니다. 이렇게 하려면 Fauna의 컬렉션으로 이동하여 "New Index" 버튼을 클릭합니다.
2. 새 색인을 생성할 수 있는 페이지로 이동합니다. 추가하려는 컬렉션이 소스 컬렉션 필드에 올바르게 채워졌는지 확인하십시오. 인덱스는 쿼리에 사용되므로 인덱스의 이름은 무엇을 할 것인지 구체적으로 캡처하는 이름을 지정하십시오. 인덱스는 UUID로 항목을 쿼리하는 데 사용되므로 `allowlist_members_by_uuid`를 선택했습니다. 쿼리할 속성을 지정하려면 용어 필드에 `data.uuid`를 추가하세요. 이렇게 하면 Fauna가 UUID를 기반으로 항목을 가져오는 것을 알 수 있습니다. 마지막으로 UUID를 고유하게 하려면 "Unique" 옵션을 선택하고 "Serialized" 옵션도 선택된 상태로 유지해야 합니다:

![img](/img/dapp-fauna-polygon-react/new_index.png)

3. 인덱스가 생성되면 이제 Fauna에서 쿼리할 수 있습니다. 이렇게 하려면 client/src/api/fauna.js 파일로 이동하고 새 함수 findUUID를 추가하여 매개변수로 전달된 UUID가 제공될 때 인덱스로 검색해야 합니다:

```js

export async function findUUID(uuid) {
  const faunadb = require("faunadb");
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNADB_SECRET,
    domain: "db.fauna.com",
    scheme: "https",
  });
  client
    .query(q.Paginate(q.Match(q.Index("allowlist_members_by_uuid"), uuid)))
    .then((res) => {
      if (res.data.length === 0) {
        return false;
      } else {
        return true;
      }
    });
}

```

`addDocuments` 함수와 매우 유사하게 이 함수에서 Fauna 클라이언트와 함께 몇 가지 초기 설정 및 구성을 수행해야 합니다. 그런 다음 특정 인덱스(이 경우에는 `allowlist_members_by_uuid` )를 살펴보고 `uuid`가 함수 인수로 전달된 일치하는 항목이 있는지 확인하는 쿼리를 호출합니다. 일치하는 항목이 없는 경우, 빈 배열이 반환되므로 함수는 빈 배열을 확인하고 `false`를 반환합니다(UUID가 발견되지 않았으므로 취하지 않음을 나타냄). 그렇지 않으면 `true`를 반환합니다( UUID가 일치함을 나타냄).

4. 이제 기존 UUID를 확인할 수 있는 방법이 있으므로 이를 `AllowlistForm.js` 구성 요소의 `submitForm` 함수에 추가할 수 있습니다.
    - 이를 위해, 다음과 같이 파일 상단의 `../api/fauna` import 문에 `findUUID` 함수를 추가합니다:
    ``` js
    import { addDocument, findUUID } from "../api/fauna";
    ```

    - 다음 로직을 가진 라인 const uuid = crypto.randomUUID(); 를 대체합니다.

    ```js
    // generate uuid
    let uuid = "";
    // check for duplicate uuids in db
    while (true) {
      const generatedUUID = crypto.randomUUID();
      const didFindUUID = await findUUID(generatedUUID);
      if (!didFindUUID) {
        uuid = generatedUUID;
        break;
      }
    }

    ```
    위의 코드를 사용하여 UUID 변수를 초기화합니다. 그런 다음 루프 내에서 UUID가 crypto.randomUUID()를 사용하여 생성됩니다. 생성된 UUID는 findUUID 함수에 대한 호출로 전달되며, 함수 호출이 완료되면 didFindUUID 변수에 true 또는 false를 반환합니다. didFindUUID가 false를 반환하면, 데이터베이스에 이 생성된 UUID와 일치하는 항목이 없는 경우, UUID 변수가 생성된 UUID로 설정되고 루프가 중단됩니다. 그렇지 않으면 중복되지 않은 UUID가 식별될 때까지 전체 프로세스가 반복됩니다.

### 블록체인에 양식 응답 제출하기
애플리케이션의 마지막 단계는 스마트 컨트랙트를 사용하여 블록체인에 쓰는 것입니다. 위에서 언급했듯이 우리는 Fauna에 저장하는 생성된 UUID가 모든 실제 개인 데이터(이 경우 제출된 이름, 성 및 지갑 주소)를 대체하기를 원합니다. 이렇게 하면 개인 데이터에 보안 레이어가 추가됩니다. 블록체인에서는 공개적으로 사용할 수 없고 UUID만 있으며 해당 UUID 뒤에 있는 정보를 보려면 Fauna 데이터베이스에 액세스해야 합니다.

1. 우리는 Fauna API 호출이 성공한 경우에만(그리고 한 번만) 블록체인에 양식을 제출하기를 원하므로 새 문서를 추가하는 Fauna API 호출 내에서 새 허용 목록을 추가하기 위해 API 호출을 중첩할 수 있습니다. 우리는 스마트 계약에서 `_createAllowlister` 메소드를 호출하도록 `console.log(res)` 라인을 교체하여 `submitForm` 함수에서 이를 수행할 것입니다:

```js

async function submitForm(data) {
  // generate uuid
    let uuid = "";
  // check for duplicate uuids in db
  while (true) {
    const generatedUUID = crypto.randomUUID();
    const didFindUUID = await findUUID(generatedUUID);
    if (!didFindUUID) {
      uuid = generatedUUID;
      break;
    }
  }
    // add data to Fauna
  await addDocument(uuid, data.firstName, data.lastName, data.walletAddress)
    .then((res) => {
      // add data to contract
      props.contract.methods
        ._createAllowlister(uuid)
        .send({ from: props.accounts[0] })
      }
  )
 }
 ```

 `Allowlist` 스마트 컨트랙트와 사용 가능한 모든 계정을 `AllowlistForm` 구성 요소에 전달했기 때문에 스마트 컨트랙트에서 정보를 가져오기 위해 액세스할 수 있습니다. 그것들은 props로 전달되기 때문에 우리는 그것들을 `contract`와 `accounts`가 아니라 `props.contract`와 `props.accounts`라고 부릅니다.

2. 추가되면 신청서의 양식을 작성하여 신청서가 Fauna 및 블록체인에 성공적으로 제출되었는지 확인할 수 있습니다. 메타마스크 창이 팝업되어야 하며 "Accept"를 클릭하면 몇 초 후에 트랜잭션이 성공적으로 제출되었다는 알림을 받게 됩니다. 또한 Fauna 컬렉션에 새로 추가된 문서를 확인하여 해당 문서가 Fauna와 블록체인 모두에 기록되는지 확인할 수 있습니다.

### 블록체인에서 트랜잭션 데이터를 읽고 Fauna에서 조회하기

이제 Fauna에 트랜잭션을 작성한 다음 블록체인에 작성할 수 있으므로 제출한 트랜잭션에서 실제로 필요한 데이터를 어떻게 찾을 수 있을까요?

다행스럽게도 블록체인의 공개적인 특성으로 인해 트랜잭션을 쉽게 추적하고 주어진 트랜잭션과 관련된 메타데이터를 찾을 수 있습니다.

1. Mumbai Polygonscan 도구를 사용하여 애플리케이션 개발에 사용한 지갑과 관련된 모든 트랜잭션을 찾습니다. 이 도구를 사용하면 주소로 뭄바이-테스트넷의 지갑을 조회하고 지갑 내부의 MATIC 금액과 모든 트랜잭션 내역을 볼 수 있습니다.
    - 지갑을 찾으려면 다음 URL로 이동하세요. [https://mumbai.polygonscan.com/address/](https://mumbai.polygonscan.com/address/)[여기에 지갑 주소를 입력하세요]
2. 이 페이지로 이동하면 지갑과 관련된 모든 트랜잭션 목록이 표시됩니다. 트랜잭션은 가장 최근의 것부터 가장 최근의 것까지 표시됩니다.

거래 해시를 클릭하여 자세한 정보를 보려면 거래를 클릭하십시오. 이 해시는 고유하게 생성되며 거래를 식별하는 것입니다.

![img](/img/dapp-fauna-polygon-react/transaction_hash.png)

3. 트랜잭션 해시를 클릭하면 트랜잭션의 특정 세부 정보를 나열하는 페이지로 이동합니다. 필요한 정보를 얻으려면 표시된 트랜잭션 정보 하단 근처에 있는 "Click to see more" 옵션을 클릭하십시오.
4. "Click to see mor" 옵션 내에서 더 많은 정보를 볼 수 있습니다. 긴 해시가 있는 "Input Data" 섹션으로 스크롤합니다.

![img](/img/dapp-fauna-polygon-react/input_data.png)

입력 데이터에 대한 트랜잭션 해시를 구문 분석하는 스크립트를 작성할 수 있으므로 해당 해시를 Fauna에서 쿼리할 수 있도록 `uuid`를 가져올 수 있는 실제 데이터로 변환할 수 있습니다.

5. 이를 디코딩하기 위해 [abi-decoder library](https://github.com/ConsenSys/abi-decoder)를 사용할 수 있습니다. 프로젝트의 `client` 디렉터리에서 다음을 실행하여 라이브러리를 설치합니다:

```jsx
npm install abi-decoder
```

6. 그런 다음 `client` 디렉터리에 `scripts`라는 폴더를 만듭니다.
7. `scripts` 폴더 내에서 `decode-transaction.js`라는 파일을 만들고 다음 정보를 붙여넣습니다:

```jsx
const abiDecoder = require('abi-decoder');

// pulled from Allowlist.json "abi" field
const testABI = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_uuid",
          "type": "string"
        }
      ],
      "name": "_createAllowlister",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
];
abiDecoder.addABI(testABI);

// add in your input data hash as a string here
const testData = "";
const decodedData = abiDecoder.decodeMethod(testData);
console.log(decodedData);
```

위의 코드는 사용할 수 있도록 abi-decoder 라이브러리의 인스턴스를 생성하고 변수 `abiDecoder`에 저장합니다. 입력 데이터 해시를 읽기 위해, 라이브러리는 함수 및 인수와 같은 정보가 트랜잭션에 사용되는 스마트 컨트랙트에 있는지 디코더에 알려주는 ABI 또는 애플리케이션 바이너리 인터페이스가 필요합니다. ABI는 디코더에 해시에서 구문 분석할 수 있는 정보를 알려주는 데 도움이 됩니다.

애플리케이션에서 이 자습서의 동일한 스마트 컨트랙트를 사용한 경우에는 `testABI` 변수에 ABI가 이미 채워져 있습니다. 이 ABI는 마이그레이션 시 생성된 `Allowlist.sol`에 대한 스마트 컨트랙트 메타데이터에서 가져왔습니다. 메타데이터는 `client/contracts/Allowlist.json`에서 찾을 수 있습니다. 이 파일에는 `testABI` 값을 가져온 곳인 `Allowlist` 컨트랙트 ABI를 나타내는 `abi` 속성이 있습니다.

이 프로그램을 실행하기 위한 마지막 터치는 디코딩하려는 트랜잭션에 대한 입력 데이터 해시를 추가하는 것입니다. 뭄바이 Polygonscan 웹사이트에서 찾은 입력 데이터를 복사하여 `testData`와 동일한 문자열로 설정합니다.

8. 모든 정보가 스크립트에 추가되면 명령줄에서 실행하여 출력을 볼 수 있습니다. 다음 명령을 사용하여 `client` 폴더에서 스크립트를 실행합니다:

```jsx
    node scripts/decode-transaction.js
```

다음과 같은 응답을 받게 됩니다:

```js
{
  name: '_createAllowlister',
  params: [
    {
      name: '_uuid',
      value: '2bb542ef-39b7-4991-bfa8-aac848fdce39',
      type: 'string'
    }
  ]
}
```

이 응답은 트랜잭션이 스마트 컨트랙트의 `_createAllowlister` 함수에 의해 초기화되었으며 `_uuid` 값이 매개변수로 전달되었음을 나타냅니다(또한 해당 값이 무엇인지).

우리의 `uuid`는 트랜잭션에서 성공적으로 식별되었습니다. 이 특정 응답에서는 `2bb542ef-39b7-4991-bfa8-aac848fdce39`입니다.

9. 이제 `uuid`가 있으므로, 이를 사용하여 Fauna에서 검색하여 트랜잭션 이면의 데이터를 찾을 수 있습니다. 그렇게 하려면  [Fauna Dashboard](https://dashboard.fauna.com/)로 이동하여 응용 프로그램에 사용한 데이터베이스를 클릭한 다음 해당 데이터베이스의 사이드바에서 "Indexes"를 클릭합니다. 앱에 사용한 색인이 페이지 상단에 표시되는지 확인하십시오. 그렇지 않은 경우, 아래 색인 목록에서 선택하여 올바른 색인에서 조회하고 있는지 확인하십시오.

올바른 인덱스를 가져오면, UUID를 "data.uuid" 아래의 필드에 붙여넣고 필드 위의 드롭다운에 "String"이 표시되는지 확인합니다.

검색 버튼을 클릭하면 검색 필드 아래에 항목이 나타납니다:

![img](/img/dapp-fauna-polygon-react/search_index.png)

항목을 확장하면, 이름, 성 및 지갑 주소와 같은 특정 거래에 대한 양식으로 전달된 모든 원본 데이터를 볼 수 있습니다.

### 오류 및 성공 메시지

우리는 데이터를 Fauna에 직접 저장한 다음 개인 세부 정보가 Fauna의 레코드를 참조하는 데 사용할 수 있는 UUID로 저장되는 블록체인에 트랜잭션으로 제출하는 React 양식 애플리케이션을 작성했습니다. 또한 블록체인에서 트랜잭션을 가져와 입력 데이터를 구문 분석하고 이를 사용하여 Fauna의 레코드를 검색하는 방법도 보여주었습니다.

그러나, 양식 제출을 통해 작업하고 응용 프로그램의 모든 것을 테스트하는 동안 레코드가 성공적으로 제출되었는지 여부를 구별하는 것이 때때로 어렵다는 것을 알았을 것입니다. 이를 완화하기 위해 오류가 있는 양식 제출(동물군 또는 다각형 문제) 또는 성공적인 양식 제출을 나타내기 위해 표시될 몇 가지 오류 및 성공 메시지를 추가할 수 있습니다. 자습서의 이 부분은 `AllowlistForm.js`에서 일부 API 호출 로직을 변경하는 데 초점을 맞출 것입니다.

**오류 메시지**

이상적으로, 우리는 Fauna API에서 오류가 발생했을 때를 포착하고 블록체인과 상호 작용할 때 오류가 발생했을 때 포착하기를 원합니다. 이러한 시나리오 중 하나는 트랜잭션이 끝까지 진행되지 않을 것임을 나타냅니다. 우리는 또한 Fauna가 실패하더라도 블록체인과 상호작용을 시도하지 않는지 확인하고 싶습니다. 이는 항목에서 불일치를 일으킬 수 있습니다.

1. 이를 위해 상태 변수를 추가하여 어떤 시점에서 양식 제출이 실패했는지 여부를 추적합니다. 새로운 상태 변수를 초기화하려면 먼저 `useState` 후크를 가져와야 합니다. 이 후크는 `React` 및 `useEffect`를 가져올 위치에 추가할 수 있습니다:
``` jsx
import React, { useEffect, useState } from "react";
```

2. 가져온 후에는 변수를 초기화할 수 있습니다. 우리는 그것을 `formField`라고 부를 것입니다 - 이것은 컴포넌트의 상단에서 `useForm()` 사용 후에 추가될 것입니다:

    ```jsx
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm(); // this is already in the code, add the line below
    const [formFail, setFormFail] = useState(false);
    ```

새 상태 변수를 초기화하려면 이름(`formFail`)과 이를 설정하는 함수(`setFormFail`)를 선언해야 합니다. 또한 기본값으로 설정해야 합니다(`formFail`은 양식 실패 여부를 나타내는 부울 값이므로 기본값을 `false`로 설정할 수 있음).

3. 이제 이 상태 변수를 사용하는 오류 메시지를 추가해야 합니다. `formFail`이 `true`가 되면 오류 메시지를 표시하고 싶습니다. 파일 맨 아래에 있는 `return()` 함수의 `wrapper` div class 내에 이 `jsx` 스니펫을 추가할 수 있습니다:

    ```jsx
    {formFail && (
      <div className="errorMessage">
        <p>Failed to submit allowlist entry. Please try again.</p>
      </div>
    )}
    ```

4. 오류 메시지 블록을 추가하는 것 외에도 `AllowlistForm.css`에 오류 메시지에 대한 몇 가지 스타일을 추가해야 합니다:

    ```jsx
      .errorMessage {
        background-color: #fe6f5e;
        border: solid 1px;
        border-color: #000000;
        margin-bottom: 10px;
        margin: 10px;
      }
    ```

5. 마지막으로, 양식이 실패하는 영역에서 실제로 `formFail`을 `true`로 설정해야 합니다. 이를 위해 `AllowlistForm.js`로 돌아가서 `.catch()` 문이 있도록 Fauna 및 블록체인에 대한 `submitForm` 함수의 API 호출을 업데이트합니다:

    ```jsx
    async function submitForm(data) {
        ... // some logic exists here
        // update this snippet that is already within submitForm()
        await addDocument(uuid, data.firstName, data.lastName, data.walletAddress)
          .then((res) => {
            if (!res.ok && res.status >= 400) {
              setFormFail(true);
              return;
            } else {
              // add data to contract
              props.contract.methods
                ._createAllowlister(uuid)
                .send({ from: props.accounts[0] })
                .catch(() => {
                  setFormFail(true);
                  return;
                });
            }
          })
          .catch(() => {
            setFormFail(true);
            return;
          });
        }
    }
    ```

각 API 호출(`addDocument` 및 `_createAllowlister`)에 `.catch` 문을 추가하는 것 외에도 위의 코드는 Fauna가 오류를 던지지 않을 수 있지만 오류 응답을 반환하는 시나리오를 검사하는 블록을 추가합니다(즉, API는 `res.ok`를 반환하고 `res.status`가 오류를 나타내는 `400 `응답 코드보다 크거나 같음).

오류 메시지는 다음과 같습니다:

![img](/img/dapp-fauna-polygon-react/error_msg.png)

**성공 메시지**
1. 메시지 내에서 양식에 제출한 내용을 표시하는 성공 메시지를 원한다고 가정해 보겠습니다. 그렇게 하려면 제출한 내용을 양식에 저장해야 합니다(이름, 성, 지갑 주소, 모든 문자열)을 상태 변수로 사용하고 성공적인 양식 제출을 추적하기 위한 변수로 사용합니다. 이렇게 하려면 다음 상태 변수 초기화를 코드에 추가합니다:

    ```jsx
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [formSuccess, setFormSuccess] = useState(false);
    ```

2. `AllowlistForm.js`의 `return()`에 있는 `wrapper` div 내에서 오류 메시지에 대한 `jsx` 블록을 추가한 것처럼 위 또는 아래에 성공 메시지에 대한 블록을 추가합니다. 메시지는 양식 입력 관련 상태 변수를 표시합니다:

    ```jsx
    {formSuccess && (
      <div className="successMessage">
        <p>
          Successfully submitted allowlist entry for{" "}
          {firstName + " " + lastName} with wallet address {walletAddress}!
        </p>
      </div>
    )}
    ```

3. `AllowlistForm.css`에 성공 메시지에 대한 몇 가지 스타일을 추가합니다:

    ```jsx
    .successMessage {
      background-color: #e2fee2;
      border: solid 1px;
      border-color: #000000;
      margin-bottom: 10px;
      margin: 10px;
    }
    ```
4. 마지막으로, API 호출이 실행된 후 양식이 완전히 제출된 것으로 간주되는 위치에서 새로 추가된 모든 상태 변수를 업데이트합니다:

    ```jsx
    async function submitForm(data) {
        ... // some logic exists here
      await addDocument(uuid, data.firstName, data.lastName, data.walletAddress)
        .then((res) => {
          if (!res.ok && res.status >= 400) {
            setFormFail(true);
            return;
          } else {
            // add data to contract
            props.contract.methods
              ._createAllowlister(uuid)
              .send({ from: props.accounts[0] })
              .then(() => {
                            // update this snippet that is already within submitForm()
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setWalletAddress(data.walletAddress);
                setFormSuccess(true);
              })
              .catch(() => {
                setFormFail(true);
                return;
              });
          }
        })
        .catch(() => {
          setFormFail(true);
          return;
        });
    }
    ```

Fauna 및  폴리곤 API 호출이 모두 통과되면 양식 제출이 성공한 것으로 간주됩니다. 이 때문에 `firstName`, `lastName`, `walletAddress` 및 `formSuccess` 변수를 `_createAllowlister`에 첨부된 `.then()` 블록으로 설정하는 논리를 추가했습니다. 이는 `submitForm` 함수가 끝나기 전에 발생하는 마지막 API 호출이며, `.then()`은 마지막 API 호출이 완료된 후에만 상태가 업데이트되도록 합니다.

성공 메시지는 다음과 같습니다:

![img](/img/dapp-fauna-polygon-react/success_msg.png)

## 결론

우리는 개인 정보를 가져와서 Fauna 데이터베이스에 안전하게 저장한 다음 트랜잭션의 데이터베이스 레코드에 해당하는 각 속성에 대한 공개 UUID를 Polygon 블록체인에 제출하는 React의 허용 목록 애플리케이션을 구축했습니다. 이 자습서의 전체 GitHub 리포지토리는 [여기](https://github.com/hello-ashleyintech/polygon-fauna-app)에서 찾을 수 있습니다.

이 자습서를 기반으로 하거나 여기에서 앱을 확장하려는 경우 다음 단계는 다음과 같습니다:

- Solidity 스마트 컨트랙트에 대한 몇 가지 테스트 작성
- React 기능 및 구성 요소에 대한 몇 가지 테스트 작성
- 다음과 같은 몇 가지 추가 기능을 추가해 보십시오:
    - 제출된 모든 허용 목록 및 해당 UUID 정보를 Fauna에서 쉽게 참조할 수 있는 가이드로 표시
    - 폴리곤 API 호출이 어떤 이유로든 실패하면 Fauna 데이터베이스에서 항목을 제거하도록 논리 추가
    - 누군가가 실패한 제출을 얻은 다음 다시 제출하고 성공적인 제출을 받으면 오류 메시지가 사라지고 성공 메시지만 표시되도록 논리를 추가하고 그 반대의 경우도 마찬가지입니다.
