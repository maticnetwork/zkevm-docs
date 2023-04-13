---
id: network-agnostics
title: Mga Agnostic na Transaksyon sa Network
sidebar_label: Network Agnostic Transactions
description: "Isama ang Mga Agnostic na Transaksyon sa Network sa iyong dApp."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## Layunin {#goal}

Magsagawa ng mga transaksyon sa Polygon chain, nang hindi binabago ang tagapagbigay sa Metamask (tumutugon ang tutorial na ito sa inpage na tagapagbigay ng metamask, at maaaring baguhin upang magsagawa ng mga transaksyon mula sa anumang iba pang tagapagbigay)

Sa ilalim ng hood, pinirmahan ng user ang isang layunin na magsagawa ng isang transaksyon, na ipinadala ng isang simpleng relayer upang maisagawa ito sa isang kontrata na naka-deploy sa Polygon chain.


## Ano ang pagpapagana sa pagpapatupad ng transaksyon? {#what-is-enabling-transaction-execution}

Ang client na nakikipag-ugnayan ng user sa (web browser, mobile app, atbp) ay hindi kailanman nakikipag-ugnayan sa blockchain. Sa halip, nakikipag-ugnayan ito sa simpleng relayer server (o network ng mga relayer), katulad ng paraan ng GSN o anumang meta-transaction na solusyon (tingnan ang: [Mga Meta na Transaksyon: Pagpapakilala](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)).

Para sa anumang aksyon na kinakailangan ang interaksyon sa blockchain,

- Humihiling ang client ng EIP712 formatted na lagda mula sa user
- Ipinadala ang lagda sa isang simpleng relay server (dapat may simpleng proteksyon sa auth/spam kung ginamit para sa produksyon, o maaaring gamitin ang biconomy mexa sdk: [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk))
- Nakikipag-ugnayan ang relayer sa blockchain upang isumite ang lagda ng user sa kontrata. Ang function sa kontrata na tinatawag na `executeMetaTransaction` ay nagpoproseso ng lagda at nagpapatupad ng hiniling na transaksyon (sa pamamagitan ng panloob na call).
- Nagbabayad ang relayer para sa gas na ginagawang epektibong libre ang transaksyon 🤑

## Isama ang Mga Agnostic na Transaksyon sa Network sa iyong dApp {#integrate-network-agnostic-transactions-in-your-dapp}

- Pumili sa pagitan ng custom na simpleng relayer node/biconomy.

  - Para sa biconomy, mag-setup ng dApp mula sa dashboard at i-save ang api-id at api-key, tingnan ang: [Tutorial: Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) o [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **Mga hakbang:**

    1. Irehistro natin ang ating mga kontrata sa biconomy dashboard
       1. Bisitahin ang [mga opisyal na dokumento ng biconomy](https://docs.biconomy.io/biconomy-dashboard).
       2. Habang nirerehistro ang dapp, piliin ang `Polygon Mumbai`
    2. Kopyahin ang `API key` para magamit sa frontend
    3. At Idagdag ang function na `executeMetaTransaction`sa Manage-Api at tiyaking i-enable ang meta-tx. (Suriin ang opsyon na 'native-metatx')

  - Kung gusto mong gamitin ang sarili mong custom API na nagpapadala ng mga sign transaksyon sa blockchain, maaari kang mag-refer sa server code dito: [https://github.com/angelagilhothra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- Siguraduhin na ang kontrata na gusto mong makipag-ugnayan ay magmamana mula sa `NativeMetaTransactions`👀 sumilip s`executeMetaTransaction`a function sa kontrata.
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


- Kapag mayroon ka nang relayer at setup ng mga kontrata, ang kailangan ay makuha ng kliyente ang isang naka-format na lagda ng EIP712 at tawagan lang ang API na may mga kinakailangang parameter

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

Pagtawag sa API, ref: [https://github.com/angelagilhoto/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

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

Kung gumagamit ng Biconomy, ang mga sumusunod ay dapat tawagin:

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

    kung saan ang `txObj` ay dapat magmukhang tulad nito:

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

- Kung gagamit ka ng custom na API, ipapatupad nito ang `executeMetaTransaction`function sa kontrata:

(ref: [https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40) /6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server.js#L40)](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

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

ay gumagamit ng biconomie, ang tawag sa panig ng kliyente ay ganito:

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
