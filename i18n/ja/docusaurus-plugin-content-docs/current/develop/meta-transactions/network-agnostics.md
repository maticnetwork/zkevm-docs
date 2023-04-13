---
id: network-agnostics
title: ネットワークAgnosticトランザクション
sidebar_label: Network Agnostic Transactions
description: "ネットワークAgnosticトランザクションをdAppに統合します。"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## ゴール {#goal}

Metamaskのプロバイダを変更せずに、Polygonチェーンでトランザクションを実行する（このチュートリアルは、メタマスクのインページプロバイダに対応しており、他のプロバイダからトランザクションを実行するように変更できます)。

内部では、ユーザは、トランザクションを実行するインテントに署名します。これは単純なリレイヤーによってリレーされ、Polygonチェーンにデプロイされたコントラクトで実行されます。


## トランザクション実行を有効にするのは何ですか？ {#what-is-enabling-transaction-execution}

ユーザが操作するクライアント（Webブラウザ、モバイルアプリなど）は、ブロックチェーンとやり取りすることはありません。代わりに、GSNやその他のメタトランザクションソリューションが機能する方法と同様に、単純なリレーサーバー（またはリレーネットワーク）とやり取りします。（参照:[：「メタトランザクション：はじめ](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)に」)。

ブロックチェーンとやり取りする必要があるアクションの場合、

- クライアントはユーザに EIP712 形式の署名を要求する
- 署名は単純なリレーサーバに送信される (本番環境で使用する場合は、単純な認証/スパム保護が必要です。または、バイコノミーのmexa sdkを使用可能：[https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk)）
- リレイヤーはブロックチェーンとやり取りして、ユーザの署名をコントラクトに送信します。`executeMetaTransaction`と呼ばれるコントラクトの機能が署名を処理し、要求されたトランザクションを（内部呼び出しを介して）実行します。
- リレイヤーはガスの料金を支払い、トランザクションは実質的に無料になる🤑

## ネットワークAgnosticトランザクションをdAppに統合する {#integrate-network-agnostic-transactions-in-your-dapp}

- カスタムのシンプルなリレイヤーノード/バイコノミーから選択します。

  - バイコノミーについては、ダッシュボードからdappをセットアップし、api-idとapi-keyを保存します。[チュートリアル：「バイコノミー」](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568)または[https://docs.biconomy.io/](https://docs.biconomy.io/)を参照してください。

  **ステップ：**

    1. コントラクトをバイコノミーダッシュボードに登録しましょう
       1. [バイコノミーの公式ドキュメント](https://docs.biconomy.io/biconomy-dashboard)にアクセスします。
       2. dappの登録中に、`Polygon Mumbai`を選択する
    2. フロントエンドで使用する`API key`をコピーする
    3. そして、Manage-Apiに`executeMetaTransaction`機能を追加し、meta-txをイネーブルにします。(「native-metatx」オプションにチェックマークを付ける)

  - ブロックチェーンで署名されたトランザクションを送信する独自のカスタムAPIを使用したい場合は、サーバーコードを参照してください：[https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- やり取りしたいコントラクトが`NativeMetaTransactions`から継承されていることを確認してください - 👀 コントラクトの`executeMetaTransaction`機能をのぞいてみてください。
- リンク：[https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



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


- リレイヤーとコントラクトのセットアップが完了したら、すべきことは、クライアントがEIP712形式の署名をフェッチし、必要なパラメーターを指定してAPIを呼び出しするだけです。

参考[：https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

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

APIを呼び出す[：https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

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

バイコノミーを使用している場合は、次のように呼び出す必要があります：

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

`txObj`は、次のようになります：

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

- カスタム API を使用すると、コントラクト上で`executeMetaTransaction`機能が実行されます。

（参考[：https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40）](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

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

バイコノミーを使用している場合には、クライアントサイドの呼び出しは以下のようになります：

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
