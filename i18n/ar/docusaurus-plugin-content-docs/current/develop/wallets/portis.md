---
id: portis
title: Portis
description: Build your next blockchain app on Matic.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Portis is a web-based wallet built keeping easy user-onboarding in mind. It comes with a javascript SDK that integrates into the DApp and creates a local wallet-less experience for the user. Further, it handles setting up the wallet, transactions and gas fees. Like Metamask, it is non-custodial - users control their keys, Portis just stores them securely. But, unlike Metamask, it is integrated into the application and not the browser. Users have their keys associated with their login id and passwords.

**Type**: Non-custodial/HD <br/> **Private Key Storage**: Encrypted and stored on portis’ servers <br/> **Communication to Ethereum Ledger**: Developer defined <br/> **Private key encoding**: Mnemonic<br/>

### 1. Setup Web3

Install the following in your DApp:
```js
npm install --save @portis/web3
```

And register your DApp with Portis to obtain a Dapp ID:
> [Portis Dashboard](https://dashboard.portis.io/)

Import `portis` and `web3` object:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```
Portis constructor takes first argument as the DApp ID (we got from the previous step) and second argument as the network you’d like to connect to. This can either be a string or an object.
```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```
### 2. Set up account

If the installation and instantiation of web3 was successful, the following should successfully return the connected account:
```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```
### 3. Instantiating Contracts

Instantiation of contracts would remain the same, as discussed above:
```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```
### 4. Calling functions

Calling functions would remain the same as discussed above: #### Calling `call()` Functions
```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```
### Calling `send()` Functions
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```