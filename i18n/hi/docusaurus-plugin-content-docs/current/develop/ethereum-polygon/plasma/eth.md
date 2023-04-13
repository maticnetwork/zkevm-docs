---
id: eth
title: एथ डिपाज़िट करने और निकालने की गाइड
sidebar_label: ETH
description: "पॉलीगॉन नेटवर्क पर एथ टोकन डिपाज़िट करें और निकालें."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### उच्च स्तरीय फ़्लो {#high-level-flow}

#### **एथ डिपाज़िट करें (एक स्टेप की प्रक्रिया)**

**डिपाज़िट** फ़ंक्शन का सहारा लिया जाता है जहाँ टोकन पॉलीगॉन अनुबंध में डिपाज़िट हो जाते हैं और पॉलीगॉन नेटवर्क में इस्तेमाल के लिए उपलब्ध होते हैं.

#### **एथ ट्रांसफ़र करें**

जब आपके पास पॉलीगॉन पर फ़ंड होते हैं, तो आप उन फ़ंड का इस्तेमाल दूसरों को तुरंत भेजने के लिए कर सकते हैं.

#### **एथ निकालें (तीन स्टेप की प्रक्रिया)**

1. फ़ंड का निकालना पॉलीगॉन से शुरू किया जाता है. 30 मिनट का चेकपॉइंट अंतराल (टेस्टनेट के लिए, लगभग 10 मिनट का इंतजार करें) सेट किया जाता है, जहां पॉलीगॉन ब्लॉक लेयर पर सभी ब्लॉक आखिरी चेकपॉइंट के बाद से validated हो जाते हैं.
2. एक बार चेकपॉइंट को मुख्य चेन ERC20 कॉन्ट्रैक्ट में प्रस्तुत किया जाता है, एक NFT एक्ज़िट (ERC721) टोकन को बराबर वैल्यू का निर्माण किया जाता है.
3. The The फंड को एक प्रक्रिया से बाहर निकलने की प्रक्रिया का इस्तेमाल करके मुख्य चेन कॉन्ट्रैक्ट से अपने ERC20 acccount में वापस दावा किया जा सकता है.

## सेटअप का विवरण {#setup-details}

### मैटिक SDK को कॉन्फ़िगर करना {#configuring-matic-sdk}

Matic SDK संस्थापित करें (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

maticjs क्लाइंट शुरू करना

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

रूट डायरेक्टरी में एक नई फ़ाइल `process.env`बनाएँ, जिसका नाम है नीचे दी गई सामग्री के साथ:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## डिपाज़िट करें {#deposit}

**डिपॉजिट को** कॉन्ट्रैक्ट `depositEther()`पर कॉल करके डिपोजिट किया जा सकता `depositManagerContract`है.

ध्यान दें कि टोकन को पहले से ही transfer र के लिए मैप किया जाना चाहिए और मंजूरी दी जानी चाहिए.

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

Ethereum से पॉलीगॉन में जमा हो जाता है जो स्टेट सिंक मैकेनिज्म का इस्तेमाल करके होता है और लगभग 22-30 मिनट लेता है. इस समय के अंतराल का इंतज़ार करने के बाद, web3.js/matic.js लाइब्रेरी या मेटामास्क का इस्तेमाल करके बैलेंस चेक करने का सुझाव दिया जाता है. एक्सप्लोरर तभी बैलेंस दिखाएगा जब चाइल्ड चेन पर कम से कम एक असेट ट्रांसफ़र हुआ हो. यह [लिंक](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) समझाता है कि डिपॉज़िट इवेंट्स को कैसे ट्रैक करें.

:::

## ट्रांसफ़र {#transfer}

पॉलीगॉन नेटवर्क पर एथ एक WETH(erc20 टोकन) है.

```js
const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## निकालें {#withdraw}

### 1. बर्न करें {#1-burn}

यूजर्स `getERC20TokenContract`चाइल्ड टोकन कॉन्ट्रैक्ट के `withdraw`फंक्शन को कॉल कर सकते हैं. इस फ़ंक्शन को टोकन बर्न करने चाहिए. पॉलीगॉन प्लाज़्मा क्लाइंट इस कॉल को बनाने के लिए `withdrawStart`तरीके को उजागर करता है.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

यूजर्स कॉन्ट्रैक्ट के `startExitWithBurntTokens()`फंक्शन को कॉल कर सकते `erc20Predicate`हैं. पॉलीगॉन प्लाज़्मा क्लाइंट इस कॉल को बनाने के लिए की गई `withdrawConfirm()`विधि को उजागर करता है. इस फ़ंक्शन का सहारा तभी लिया जा सकता है जब मुख्य चेन में चेकपॉइंट शामिल किया गया हो. इस [गाइड](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events) को फ़ॉलो कर चेकपॉइंट के शामिल होने को ट्रैक किया जा सकता है.


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. प्रक्रिया से बाहर निकलना {#3-process-exit}

एक यूजर को `withdrawManager`कॉन्ट्रैक्ट के `processExits()`फंक्शन को कॉल करना चाहिए और बर्न का सबूत पेश करना चाहिए. valid valid सबूत जमा करने पर, टोकन को उपयोगकर्ता में transferred र किया जाता है. पॉलीगॉन प्लाज़्मा क्लाइंट इस कॉल को बनाने के लिए `withdrawExit()`तरीके को उजागर करता है.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

एक चेकपॉइंट जो हर ~5 मिनट में Ethereum चेन के लिए पॉलीगॉन पर हो रहे सभी checkpoint, का प्रतिनिधित्व करता है, को नियमित रूप से मुख्य चेन Ethereum कॉन्ट्रैक्ट में प्रस्तुत किया जाता है.

:::