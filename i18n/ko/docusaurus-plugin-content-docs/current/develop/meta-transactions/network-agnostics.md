---
id: network-agnostics
title: 네트워크 제약이 없는 트랜잭션
sidebar_label: Network Agnostic Transactions
description: "dApp에서 네트워크 제약이 없는 트랜잭션을 통합합니다."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## 목표 {#goal}

메타마스크의 공급자를 변경하지 않고 Polygon 체인에서 트랜잭션을 실행합니다. 이 튜토리얼은 메타마스크의 인페이지 공급자를 대상으로 하며, 다른 공급자의 트랜잭션을 실행하도록 수정할 수 있습니다.

내부적으로 사용자는 트랜잭션을 실행하려는 인텐트에 서명하며, 간단한 릴레이어가 Polygon 체인에 배포된 계약에서 트랜잭션을 실행하기 위해 이를 중계합니다.


## 트랜잭션 실행을 가능하게 하는 것은 무엇일까요? {#what-is-enabling-transaction-execution}

사용자가 상호작용하는 클라이언트(웹 브라우저, 모바일 앱 등)는 블록체인과 상호작용하지 않으며, 대신 GSN나 메타 트랜잭션 솔루션이 작동하는 방식과 유사하게 간단한 릴레이어 서버(또는 릴레이어 네트워크)와 상호작용합니다([메타 트랜잭션: 소개](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)를 참조하세요).

블록체인 상호작용이 필요한 모든 작업에

- 클라이언트가 사용자에게 EIP712 형식의 서명을 요청합니다.
- 서명은 간단한 릴레이 서버로 전송됩니다(프로덕션에 사용된다면 간단한 인증/스팸 보호가 있어야 하며, Biconomy의 mexa SDK를 사용할 수 있음. [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk)).
- 릴레이어는 블록체인과 상호작용해 사용자의 서명을 계약에 제출합니다. 계약의 `executeMetaTransaction` 함수는 서명을 처리하고 (내부 호출을 통해) 요청된 트랜잭션을 실행합니다.
- 릴레이어가 가스 비용을 지불하니 트랜잭션은 사실상 무료입니다. 🤑

## dApp에 네트워크 제약이 없는 트랜잭션 통합 {#integrate-network-agnostic-transactions-in-your-dapp}

- 간단한 사용자 정의 릴레이어 노드/Biconomy 중에서 선택합니다.

  - Biconomy는 대시보드에서 dApp을 설정하고 api-id와 api-key를 저장합니다. [Biconomy 튜토리얼](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568)이나 [https://docs.biconomy.io/](https://docs.biconomy.io/)를 참조하세요.

  **단계:**

    1. Biconomy 대시보드에 계약을 등록해 봅시다.
       1. [Biconomy 공식 문서](https://docs.biconomy.io/biconomy-dashboard)로 이동합니다.
       2. dApp을 등록하는 동안 `Polygon Mumbai`를 선택합니다.
    2. 프론트엔드에 사용할 `API key`를 복사합니다.
    3. 그런 다음 관리 API에 함수 `executeMetaTransaction`을 추가하고 메타 트랜잭션을 활성화해야 합니다. ('native-metatx' 옵션 확인)

  - 블록체인에서 서명 된 거래를 보내는 자체 사용자 정의 API를 사용하려면 [https://github.com/angelagilha/ETHOnline-Workshop/tra/master/2-networks-interference에서](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer) 서버 코드를 참조하십시오.

- 상호작용하려는 계약이 `NativeMetaTransactions`에서 상속되는지 확인합니다 - 👀 계약의 `executeMetaTransaction` 함수를 살짝 엿보세요.
- 링크: [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



```jsx

let data = await web3.eth.abi.encodeFunctionCall({
    name: 'getNonce',
    type: 'function',
    inputs: [{
        name: "user",
        type: "address"
      }]
  }, [accounts[0]]);

  let _nonce = await web3.eth.call ({
    to: token["80001"],
    data
  });

  const dataToSign = getTypedData({
    name: token["name"],
    version: '1',
    salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
    verifyingContract: token["80001"],
    nonce: parseInt(_nonce),
    from: accounts[0],
    functionSignature: functionSig
  });

  const msgParams = [accounts[0], JSON.stringify(dataToSign)];

  let sig = await eth.request ({
    method: 'eth_signTypedData_v3',
    params: msgParams
  });

  ```


- 릴레이어와 계약이 설정되면 클라이언트가 EIP712 형식의 서명을 가져와 필요한 매개변수를 사용해 간단히 API를 호출할 수 있어야 합니다.

Ref: [https://github.com/gangelagilhatra/Ethonline-Workshop/6b615b8a4ef053c177297297297257253c7253c7253c8e1b/2-networks/sign.js#L47](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

    ```jsx

    let data = await web3.eth.abi.encodeFunctionCall({
        name: 'getNonce',
        type: 'function',
        inputs: [{
            name: "user",
            type: "address"
          }]
      }, [accounts[0]]);

      let _nonce = await web3.eth.call ({
        to: token["80001"],
        data
      });

      const dataToSign = getTypedData({
        name: token["name"],
        version: '1',
        salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
        verifyingContract: token["80001"],
        nonce: parseInt(_nonce),
        from: accounts[0],
        functionSignature: functionSig
      });
      const msgParams = [accounts[0], JSON.stringify(dataToSign)];

      let sig = await eth.request ({
        method: 'eth_signTypedData_v3',
        params: msgParams
      });
    ```

API를 호출하면 : [https://github.com/angelagilhra/Ethonline-Workshop/6b615b8a4ef053c17729c72157297293c7253c729303c8e1b/2-networks/signal-internogether](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110) 호출을 하면 https://github.com/gangelagilha/Ethonline/kopplegara/6bob 6b615b8a4ef00553c1729725729303c81b/2-networksheinater/sign.js/sign.js#L10

    ```jsx
    const response = await request.post(
        'http://localhost:3000/exec', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    Biconomy를 사용한다면, 다음을 호출해야 합니다.

    ```jsx
    const response = await request.post(
        'https://api.biconomy.io/api/v2/meta-tx/native', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    여기서 `txObj`는 다음과 같습니다.

    ```json
    {
        "to": "0x2395d740789d8C27C139C62d1aF786c77c9a1Ef1",
        "apiId": <API ID COPIED FROM THE API PAGE>,
        "params": [
            "0x2173fdd5427c99357ba0dd5e34c964b08079a695",
            "0x2e1a7d4d000000000000000000000000000000000000000000000000000000000000000a",
            "0x42da8b5ac3f1c5c35c3eb38d639a780ec973744f11ff75b81bbf916300411602",
            "0x32bf1451a3e999b57822bc1a9b8bfdfeb0da59aa330c247e4befafa997a11de9",
            "27"
        ],
        "from": "0x2173fdd5427c99357ba0dd5e34c964b08079a695"
    }
    ```

- 사용자 정의 API를 사용한다면 계약의 `executeMetaTransaction` 함수를 실행합니다.

(ref: [https://github.com/gangelagilhatra/ETHOnline-Workshop/6b615b8a4ef053c177297297297257253c7253c72529303c8e1b/2-networks/server/index.js#40)](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

    ```jsx
    try {
        let tx = await contract.methods.executeMetaTransaction(
          txDetails.from, txDetails.fnSig, r, s, v
        ).send ({
          from: user,
          gas: 800000
        })
        req.txHash = tx.transactionHash
      } catch (err) {
        console.log (err)
        next(err)
      }
    ```

    Biconomy를 사용한다면, 클라이언트 측 호출은 다음과 같습니다.

    ```jsx
    // client/src/App.js
    import React from "react";
    import Biconomy from "@biconomy/mexa";

    const getWeb3 = new Web3(biconomy);
    biconomy
        .onEvent(biconomy.READY, () => {
          // Initialize your dapp here like getting user accounts etc
          console.log("Mexa is Ready");
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa
    			console.error(error);
        });

    /**
    * use the getWeb3 object to define a contract and calling the function directly
    */

    ```
