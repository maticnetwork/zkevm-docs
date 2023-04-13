---
id: network-agnostics
title: Transações Agnósticas da Rede
sidebar_label: Network Agnostic Transactions
description: "Integrar as Transações Agnósticas da Rede na sua DApp"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## Objetivo {#goal}

Executar transações chain da Polygon sem alterar o prestador na MetaMask (este tutorial tem como alvo o prestador inpage do metamask; este pode ser alterado para executar as transações de qualquer outro prestador)

Nos bastidores, o utilizador assina a intenção de executar a transação, que é retransmitida por um simples retransmissor, para executá-la num contrato implantado na chain da Polygon.


## O que é ativar a execução de uma transação? {#what-is-enabling-transaction-execution}

O cliente com quem o utilizador interage (web, navegador, aplicações móveis, etc) nunca interage com a blockchain. Em vez disso, interage com um simples servidor de retransmissores (ou uma rede de retransmissores), de uma forma semelhante ao funcionamento da GSN ou qualquer solução de transações meta ( consulte: [Transações Meta: Uma Introdução](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590))

Para qualquer ação que exige uma interação da blockchain,

- o cliente solicita uma assinatura formatada EIP712 do utilizador
- A assinatura é enviada para um simples servidor de retransmissores (deve ter uma proteção auth/spam simples se for usada para produção, ou pode ser usado mexa SDK da Biconomy: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk))
- O retransmissor interage com a blockchain para enviar a assinatura do utilizador ao contrato. A função no contrato chamada `executeMetaTransaction` processa a assinatura e executa a transação solicitada (através de uma CALL interna).
- O retransmissor paga pelo gás, tornando a transação efetivamente gratuita 🤑

## Integrar as Transações Agnósticas da Rede no DApp {#integrate-network-agnostic-transactions-in-your-dapp}

- Escolher entre um retransmissor simples personalizado nó/biconomy.

  - Para biconomy, configure uma DApp a partir do painel e guarde o api-id e o api-key, consulte: [Tutorial: Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) ou [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **Etapas:**

    1. Vamos registar os nossos contratos no painel da biconomy
       1. Consulte os [documentos oficiais da biconomy](https://docs.biconomy.io/biconomy-dashboard).
       2. Ao registar a DApp, selecione `Polygon Mumbai`
    2. Copie `API key` para usar no frontend
    3. E Adicione a função `executeMetaTransaction` no Manage-Api, certificando-se que ativa o meta-tx. (Verifique a opção 'native-metatx')

  - Se quiser usar a sua própria API personalizada que envia transações assinadas na blockchain, pode consultar o código do servidor aqui: [https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- Certifique-se de que o contrato com o qual gostaria de interagir herda de `NativeMetaTransactions` - 👀 peep para função `executeMetaTransaction` no contrato.
- Link: [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



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


- Assim que tiver um retransmissor e a configuração dos contratos, é necessário que o cliente consiga obter uma assinatura formatada EIP712 e fazer CALL da API com os parâmetros necessários

ref: http[s://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

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

Ligar à API, ref: [https://github.com/angelagilhira/ETHOnline-Workshop/blob/6b615b8a4ef0053c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

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

    Se usar a Biconomy, deve ser executado o seguinte:

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

    onde `txObj` deve ser semelhante a:

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

- Se usar a API personalizada, a função `executeMetaTransaction` será executada no contrato:

(ref: [https://github.com/angelagilhota/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

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

    está a usar a biconomy, a CALL no lado do cliente será semelhante a:

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
