---
id: remix
title: Remix 이용하기
sidebar_label: Remix 이용하기
description: 폴리곤에서 다음 블록체인 앱을 만듭니다.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Hello World 스타일의 스타터 프로젝트. 메시지와 함께 스마트 컨트랙트를 배포하고 프런트 엔드에서 렌더링합니다. 상호 작용 패널을 사용하여 메시지를 변경할 수 있습니다!

이 dapp은 프론트 엔드로 컨트랙트에 전달된 메시지를 전달하는 "Hello World" 스타일 응용 프로그램을 구현하여 합니다. 이 자습서는 [Remix IDE](https://remix.ethereum.org/)에서 사용할 수 있는 온라인 IDE를 사용하여 따라야 합니다.

### [Remix IDE](https://remix.ethereum.org/) 설정하기

- Remix IDE – 스마트 컨트랙트를 개발하기 위한 온라인 IDE.
- Remix를 처음 사용하는 경우, 먼저 Solidity Compiler와 Deploy and Run Transactions의 두 가지 모듈을 활성화해야 합니다.
- Remix의 플러그인 탭에서 'Solidity Compiler' 및 'Deploy and Run Transactions' 플러그인 검색합니다.
<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/helloworld/search-plugins.png")} alt="RemixIDE_Step1"/>
</div>
- 두개의 플러그인을 활성화합니다.
<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/helloworld/add-plugins.png")} alt="RemixIDE_Step1"/>
</div>
- Solidity Environment를 선택합니다.
<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/helloworld/RemixIDE_Step1.png")} alt="RemixIDE_Step1"/>
</div>
- <img src={useBaseUrl("img/helloworld/Screenshot_2020-02-14_at_12.52.45_PM.png")} alt="RemixIDE_Step2" /> 파일 탐색기로 이동하여 새 파일을 만들고<img src={useBaseUrl("img/helloworld/Screenshot_2020-02-14_at_12.51.59_PM.png")} />, 이름을 HelloWorld.sol로 지정합니다 .

- 새로 생성된 `HelloWorld.sol` 파일에 아래 스마트 컨트랙트를 복사/붙여넣기합니다.

# **스마트 컨트랙트**

```js title="HelloWorld.sol"
// Specifies that the source code is for a version
// of Solidity greater than 0.5.10
pragma solidity ^0.5.10;

// A contract is a collection of functions and data (its state)
// that resides at a specific address on the Ethereum blockchain.
contract HelloWorld {

    // The keyword "public" makes variables accessible from outside a contract
    // and creates a function that other contracts or SDKs can call to access the value
    string public message;

    // A special function only run during the creation of the contract
    constructor(string memory initMessage) public {
        // Takes a string value and stores the value in the memory data storage area,
        // setting `message` to that value
        message = initMessage;
    }

    // A publicly accessible function that takes a string as a parameter
    // and updates `message`
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

첫 번째 줄 `pragma solidity ^0.5.10`은 소스 코드가 0.5.10보다 큰 Solidity 버전용임을 지정합니다. [Pragmas](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#pragma)는 소스 코드를 처리하는 방법에 대한 컴파일러의 일반적인 지침입니다(예: pragma once).

Solidity의 의미에서 컨트랙트는 이더리움 블록체인의 특정 주소에 있는 코드(해당 함수)와 데이터(해당 상태)의 모음입니다. `string public message` 라인은 `문자열` 유형의 `message`라는 공개 상태 변수를 선언합니다. 데이터베이스를 관리하는 코드의 함수를 호출하여 쿼리하고 변경할 수 있는 데이터베이스의 단일 슬롯으로 생각할 수 있습니다. 키워드 public은 컨트랙트 외부에서 상태 변수의 현재 값에 액세스할 수 있는 함수를 자동으로 생성합니다. 이 키워드가 없으면 다른 컨트랙트에서 변수에 액세스할 수 없습니다.

[constructor](https://solidity.readthedocs.io/en/latest/contracts.html#constructor)는 컨트랙트를 생성하는 동안 실행되는 특수 함수이며 이후에 호출할 수 없습니다. 이 경우 문자열 값 `initMessage`를 받아서 [메모리](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) 데이터 저장 영역에 저장하고 `message`를 해당 값으로 설정합니다.

`string public message` 함수는 constructor와 유사한 또 다른 공개 함수로, 문자열을 매개변수로 사용하고 `message` 변수를 업데이트합니다.

### 스마트 컨트랙트 컴파일하기

- <img src={useBaseUrl("img/helloworld/Screenshot_2020-02-14_at_1.00.03_PM.png")} />
Solidity Compiler로 이동
- Compiler Version을 0.5.10으로 선택
- 이제, `HelloWorld.sol를 컴파일`하십시오
- 성공적인 컴파일 후,  이것이 보여집니다. <img src={useBaseUrl("img/helloworld/Screenshot_2020-02-14_at_1.08.22_PM.png")} />
- 이제 Polygon Network에 스마트 컨트랙트를 배포해야 합니다. 이를 위해 우리는 web3 세계에 연결해야 합니다. 이것은 Metamask, Brave, Portis 등과 같은 서비스를 사용하여 수행할 수 있습니다. 우리는 Metamask를 사용할 것입니다. 이 [메타마스크 계정 설정하기 튜토리얼(tutorial to setup a MetaMask Account)](/docs/develop/metamask/hello)를 따라하십시오.
- 메타마스크를 열고 네트워크 드롭다운에서 Custom RPC를 선택합니다

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/helloworld/metamask-custom-rpc.png")} alt="RemixIDE_Step1"/>
</div>

- 네트워크 이름에 “Matic Mumbai Testnet” 입력
- URL 필드에서 URL을 "https://rpc-mumbai.maticvigil.com"으로 추가할 수 있습니다.
- 체인 ID에 “80001” 입력
- (선택필드)통화기호: “MATIC” 및 블록탐색기URL: “https://mumbai.polygonscan.com/” 입력
<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/helloworld/metamask_mumbai_setup.png")} alt="RemixIDE_Step1"/>
</div>
- 그리고 나서 “저장” 클릭
- 메타마스크에서 주소를 복사
<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/helloworld/Screenshot_2020-01-09_at_1.24.49_PM.png")} alt="RemixIDE_Step1"/>
</div>

- [Faucet](https://faucet.polygon.technology/) 으로 가서 테스트 이더를 요청하세요. Matic에서 가스 수수료로 이것이 필요합니다. 네트워크로 'Mumbai'를 선택하고 faucet에서 토큰으로 'MATIC Token'을 선택하십시오.
- 이제 Matic Network에 스마트 컨트랙트를 배포해 보겠습니다.
- Environment의 드롭다운에서  Injected Web3를 선택하고 당신의 컨트랙트를 선택합니다.

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/helloworld/Screenshot_2020-02-14_at_1.39.04_PM.png")} alt="RemixIDE_Step1"/>
</div>

- 연결 요청(Connection Request)을 승인하십시오!

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/helloworld/Screenshot_2020-02-14_at_1.59.10_PM.png")} alt="RemixIDE_Step1"/>
</div>

- Metamask가 Remix에 연결되면 'Deploy' 트랜잭션은 트랜잭션 확인이 필요한 또 다른 메타마스크 팝업을 생성합니다.

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/helloworld/Screenshot_2020-02-14_at_1.45.23_PM.png")} alt="RemixIDE_Step1"/>
</div>

**축하합니다!** HelloWorld 스마ㄴ트 컨트랙트를 성공적으로 배포했습니다. 이제 스마트 컨트랙트와 상호 작용할 수 있습니다. https://mumbai.polygonscan.com/ 에서 배포 상태를 확인하십시오

<div
        style={{
          display: "flex",
 justifyContent: "center",
 alignItems: "center"
 }}
>
        <img src={useBaseUrl("img/helloworld/Screenshot_2020-02-14_at_2.00.19_PM.png")} alt="RemixIDE_Step1"/>
</div>

# **PolygonScan에서 컨트랙트 확인하기**


첫 번째이자 가장 중요한 단계는 solidity contract를 단일 파일로 병합하는 것입니다.

## **solidity contract 병합하기**

[truffle-flattener](https://github.com/nomiclabs/truffle-flattener) 또는 [sol-merger](https://github.com/RyuuGan/sol-merger) 설치합니다.


다음 명령어를 이용하여 병합합니다.

`sol-merger \"./contracts/*.sol\" ./build`

## **Polygonscan에서 확인하기**

Contract의 polygonscan 페이지로 이동한 다음 Verify and Publish를 클릭합니다.

<img src={useBaseUrl("img/verification/verify-publish.png")} />


- 컴파일러 유형에서 `Solidity (Single File)` 선택
- 적절한 컴파일러 버전 선택
- 컨트랙트의 라이선스 유형 선택

다음 섹션에서, 병합된 컨트랙트를 여기에 붙여 넣습니다.

최적화를 활성화했다면 그에 따라 `optimization` 섹션을 조정하십시오.

생성자 인수는 자동으로 채워져야 합니다. 그렇지 않은 경우 배포 트랜잭션의 후행 바이트에서 검색할 수 있습니다. `0000000000000000000000a6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa`와 유사합니다.

이게 다입니다. 모든 절차를 끝냈습니다.  🎉
