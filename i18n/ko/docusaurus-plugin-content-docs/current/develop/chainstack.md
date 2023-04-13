---
id: chainstack
title: Chastack과 Foundry를 사용하여 스마트 계약을 배포합니다.
sidebar_label: Using Chainstack
description:  Chainstack과 Foundy를 사용하여 Polyg에서 스마트 계약을 개발하십시오.
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 개요 {#overview}

이 섹션은 Polygon Mumbai 테스트넷에 [Chinstack과](https://chainstack.com/build-better-with-polygon/) [Foundry를](https://github.com/gakonst/foundry/) 사용하여 Hello World 계약을 배포하도록 안내합니다.

Chainstack은 이더리움 기반 애플리케이션 및 기타 블록체인에서 대한 인프라를 제공합니다. 그들은 노드를 유지하고 네트워크에 대한 연결을 보장합니다. 또한 메인넷 및 테스넷과 상호 작용할 수 있는 인터페이스를 제공합니다.

Foundry는 Rust로 작성된 이더리움 애플리케이션 개발을 위한 빠른 툴킷입니다. EVM 스마트 계약과 테스트, 상호 작용, 트랜잭션 보내, 블록체인 데이터 리버를 제공합니다.

:::tip

질문이 있으면 [<ins>Chainstack Discord</ins>](https://discord.com/invite/Cymtg2f7pX) 서버에서 문의하십시오.

:::

## 학습할 내용 {#what-you-will-learn}

Chainstack을 사용해 Polygon 노드를 배포하고 Foundry를 사용해 계약을 배포하는 Hello World 계약을 생성합니다.

## 실습할 내용 {#what-you-will-do}

1. Chainstack을 사용해 Polygon 노드 배포
2. Foundry 설정
3. 스마트 계약 생성
4. 스마트 계약 배포

## Polygon Mumbai 노드 배포 {#deploy-a-polygon-mumbai-node}

BlockChain 네트워크에 스마트 계약을 배포하기 위해 노드가 필요합니다. 아래 단계를 따라 노드가 올라와 실행되도록 하세요.

**1단계 →** [Chastack에](https://console.chainstack.com/user/account/create) 가입하면

![img](/img/chainstack/sign-up.png)

**2단계 →** [Mumbai 노드를 배치하는](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network) 방법에 대한 지침을 따르십시오

![img](/img/chainstack/join-network.png)

**3단계 →** [배포된 노드의 HTTPS 끝점](https://docs.chainstack.com/platform/view-node-access-and-credentials) 얻을

## Founry 설치 {#install-foundry}

Foundry는 스마트 계약과 호환되는 개발 툴킷입니다. Foundry를 사용해 작업을 시작하기 전에 먼저 Rust 코딩 언어를 설치해야 합니다.

1. [Rust 설치](https://www.rust-lang.org/tools/install).
1. [Founry 설치](https://github.com/gakonst/foundry/).

## Foundry 시작 {#initialize-with-foundry}

표준 프로젝트를 생성하려면 작업 디렉터리로 이동하여 다음을 실행하세요.

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## 계정에 자금 조달 {#fund-your-account}

스마트 계약을 배포하려면 지갑 계정이 필요합니다. [메타스크를](https://metamask.io/) 사용할 수 있습니다. 또한 계약을 배포하려면 네트워크에서 가스 요금을 지불해야 합니다. 지갑 주소를 복사하여 [앱을 통해](https://faucet.polygon.technology/) Mumbai MATIC 토큰을 받으십시오.

## Hello World 계약 생성 {#create-the-hello-world-contract}

`src/`의 초기화된 Foundry 프로젝트에서 `HelloWorld.sol`을 생성합니다.

```
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

## 계약 배포 {#deploy-the-contract}

다음 단계에 이르면 계약을 배포할 준비가 된 것입니다.

* 계약을 배포할 Polygon Mumbai 네트워크에 자체 노드가 있습니다.
* 계약을 배포하는 데 사용할 Foundry가 있습니다.
* 계약을 배포할 자금이 마련된 계정이 있습니다.

계약을 배포하려면 다음을 실행합니다.

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

여기,

* CONTRACT_PATH — `HelloWorld.sol` 파일의 경로
* PRIVATE_KEY — 계정의 비공개 키
* HTTPS_ENDPOINT — [노드의 엔드포인트](https://docs.chainstack.com/platform/view-node-access-and-credentials)

예시:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

전 단계에서 새로 생성된 해시를 사용해 [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/)에서 계약 배포를 언제든지 확인할 수 있습니다.

:::

## 계약 테스트 {#test-the-contract}

계약이 잘 작동하는지 확인해야 하는 경우, `forge test` 명령어를 사용할 수 있습니다. Foundry는 더 구체적인 테스트를 위해 많은 [옵션](https://book.getfoundry.sh/reference/forge/forge-test)(플래그)을 제공합니다. [Foundry의 문서](https://book.getfoundry.sh/forge/tests)에서 테스트 작성, 고급 테스트 및 다른 기능에 대해 자세히 알아보세요.

**축하합니다! Polygon에 Hello World 스마트 계약을 배포했습니다.**

Chainstack 문서에서 Polygon과 더욱 밀접히 관련된 [<ins>튜토리얼</ins>](https://docs.chainstack.com/tutorials/polygon/) 및 [<ins>도구</ins>](https://docs.chainstack.com/operations/polygon/tools)를 확인헤 보세요.
