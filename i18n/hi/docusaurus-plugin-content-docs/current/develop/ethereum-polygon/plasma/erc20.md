---
id: erc20
title: erc20 डिपाज़िट करने और निकालने की गाइड
sidebar_label: ERC20
description:  "पॉलीगॉन नेटवर्क पर erc20 टोकन डिपाज़िट करें और निकालें."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

शुरुआत करने और अप-टू-डेट तरीकों को देखने के लिए कृपया [प्लाज़्मा erc20 पर लेटेस्ट Matic.js डॉक्यूमेंटेशन](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) देखें.

### उच्च स्तरीय फ़्लो {#high-level-flow}

#### **erc20 डिपाज़िट करें (दो स्टेप की प्रक्रिया)**

1. टोकन को पहले पॉलीगॉन चेन (एथेरेयम/Goerli) पर पॉलीगॉन रूटचेन अनुबंध के लिए मंज़ूरी दी जानी चाहिए.
2. मंज़ूर होने पर, **डिपाज़िट** फ़ंक्शन का सहारा लिया जाता है जहाँ टोकन पॉलीगॉन अनुबंध में डिपाज़िट हो जाते हैं और पॉलीगॉन में इस्तेमाल के लिए उपलब्ध होते हैं.

#### **ERC20 ट्रांसफ़र करें**

जब आपके पास पॉलीगॉन पर फ़ंड होते हैं, तो आप उन फ़ंड का इस्तेमाल दूसरों को तुरंत भेजने के लिए कर सकते हैं.

#### **erc20 निकालें (तीन स्टेप की प्रक्रिया)**

1. फ़ंड का निकालना पॉलीगॉन से शुरू किया जाता है. 30 मिनट के एक चेकपॉइंट अंतराल (लगभग 10 मिनट के लिए टेस्टनेट के लिए) सेट किया जाता है, जहां पॉलीगॉन ब्लॉक लेयर पर सभी ब्लॉक आखिरी चेकपॉइंट के बाद से validated हो जाते हैं.
2. एक बार चेकपॉइंट को मुख्य चेन ERC20 कॉन्ट्रैक्ट में प्रस्तुत किया जाता है, एक NFT एक्ज़िट (ERC721) टोकन को बराबर वैल्यू का निर्माण किया जाता है.
3. The The फंड को एक प्रक्रिया से बाहर निकलने की प्रक्रिया का इस्तेमाल करके मुख्य चेन कॉन्ट्रैक्ट से अपने ERC20 acccount में वापस दावा किया जा सकता है.

## सेटअप का विवरण {#setup-details}

### पॉलीगॉन एज कॉन्फ़िगर करना {#configuring-polygon-edge}

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

**मंजूरी देखें**: यह ERC20 की एक सामान्य मंजूरी है, इसलिए इस समारोह को कॉल कर `depositManagerContract`सकते `transferFrom()`हैं. पॉलीगॉन प्लाज़्मा क्लाइंट इस कॉल को बनाने के लिए की गई `erc20Token.approve()`विधि को उजागर करता है.

**डिपॉज़िट** करें: डिपाज़िट मैनेजर अनुबंध पर यूज़र के लिए **_डिपाज़िट करें_** का सहारा लेकर डिपाज़िट किया जा सकता है.

नोट करें कि ट्रांसफ़र के लिए टोकन को पहले से ही मैप और मंज़ूर किया हुआ होना चाहिए.

इसका सहारा लेने के लिए **_erc20Token.डिपाज़िट_** का तरीका.


```js
const { getPlasmaClient, plasma, from } = require('../utils')

const amount = '1000000000000000000' // amount in wei
const token = plasma.parent.erc20

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token, true)
  const result = await erc20Token.deposit(amount, from)
  const receipt = await result.getReceipt()
  console.log(receipt)
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

:::note

Ethereum से पॉलीगॉन में जमा हो जाता है जो स्टेट सिंक मैकेनिज्म का इस्तेमाल करके होता है और लगभग 5-7 मिनट लेता है. इस समय के अंतराल का इंतज़ार करने के बाद, web3.js/matic.js लाइब्रेरी या मेटामास्क का इस्तेमाल करके बैलेंस चेक करने का सुझाव दिया जाता है. एक्सप्लोरर तभी बैलेंस दिखाएगा जब चाइल्ड चेन पर कम से कम एक असेट ट्रांसफ़र हुआ हो. यह [लिंक](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) समझाता है कि डिपॉज़िट इवेंट्स को कैसे ट्रैक करें.

:::

## ट्रांसफ़र {#transfer}

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
    const receipt = await result.getReceipt()
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

यूजर्स चाइल्ड टोकन कॉन्ट्रैक्ट के `withdraw()`फंक्शन `getERC20TokenContract`को कॉल कर सकते हैं. इस फ़ंक्शन को टोकन बर्न करने चाहिए. पॉलीगॉन प्लाज़्मा क्लाइंट इस कॉल को बनाने के लिए की गई `withdrawStart()`विधि को उजागर करता है.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)
  console.log(await result.getReceipt())
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)

```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

यूज़र **_erc20Predicate_** अनुबंध के **_startExitWithBurntTokens_** फ़ंक्शन का सहारा ले सकता है. पॉलीगॉन प्लाज़्मा क्लाइंट इसका सहारा लेने के लिए **_withdrawConfirm_** तरीके को पेश करता है. इस फ़ंक्शन का सहारा तभी लिया जा सकता है जब मुख्य चेन में चेकपॉइंट शामिल किया गया हो. इस [गाइड](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events) को फ़ॉलो कर चेकपॉइंट के शामिल होने को ट्रैक किया जा सकता है.


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. प्रक्रिया से बाहर निकलना {#3-process-exit}

यूज़र को **_withdrawManager_** अनुबंध के **_processExits_** फ़ंक्शन का सहारा लेना चाहिए और बर्न का सुबूत सबमिट करना चाहिए. valid valid सबूत जमा करने पर, टोकन को उपयोगकर्ता में transferred र किया जाता है. पॉलीगॉन प्लाज़्मा क्लाइंट इसका सहारा लेने के लिए **_withdrawExit_** तरीके को पेश करता है.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawExit()
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

एक चेकपॉइंट जो पॉलीगॉन नेटवर्क पर हर ~30 मिनट में होने वाले सभी transactions the का प्रतिनिधित्व करता है, को नियमित रूप से मुख्य चेन ERC20 कॉन्ट्रैक्ट में प्रस्तुत किया जाता है.

:::