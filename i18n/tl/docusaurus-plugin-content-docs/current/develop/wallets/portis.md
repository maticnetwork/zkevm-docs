---
id: portis
title: Portis
description: Ang web-based na wallet na binuong isinasaisip ang madaling pag-onboard ng user.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Ang Portis ay isang web-based na wallet na binuo na isinasaisip ang madaling user-onboarding. Ito ay may kasamang javascript SDK na sumasama sa DApp at lumilikha ng lokal na karanasang walang wallet para sa user. Dagdag pa, hinahawakan nito ang pag-set up ng wallet, transaksyon, at bayad sa gas.

Tulad ng Metamask, ito ay hindi custodial - kinokontrol ng mga user ang kanilang mga susi, iniimbak lang ito ng Portis nang ligtas. Ngunit, hindi katulad ng Metamask, isinama ito sa application at hindi sa browser. Ang mga user ay may kanilang mga key na nauugnay sa kanilang login id at mga password.

**Uri**: Non-custodial/HD <br/>
**Pribadong Key Storage**: I-encrypt at naka-imbak sa mga server ng Portis<br/> **Komunikasyon sa Ethereum Ledger**: Tinukoy ng developer<br/> **Pribadong key encoding**: Mnemonic <br/>

## I-set up ang Web3 {#set-up-web3}

I-install ang Portis sa iyong dApp:

```js
npm install --save @portis/web3
```

Ngayon, i-register ang iyong dApp sa Portis para makakuha ng dApp ID gamit ang [Portis Dashboard](https://dashboard.portis.io/).

I-import `portis`at mga `web3`bagay:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Kinukuha ng Portis constructor ang unang argument bilang dApp ID at ang ikalawang argumento bilang network na gusto mong kumonekta sa. Maaaring ito ay isang string o isang bagay.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## I-set up ang Account {#set-up-account}

Kung matagumpay ang pag-install at instantiation ng web3, dapat na matagumpay na maibalik ng mga sumusunod ang konektadong account:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Pag-instantiate ng mga Kontrata {#instantiating-contracts}

Ganito ang dapat nating i-instantiate ang mga kontrata:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Pagtawag sa mga function {#calling-functions}

### Pagtawag sa `call()`Function {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### Pagtawag sa `send()`Function {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
