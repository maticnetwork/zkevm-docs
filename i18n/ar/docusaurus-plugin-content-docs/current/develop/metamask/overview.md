---
id: overview
title: Overview of MetaMask
sidebar_label: Overview
description: How you can get started with MetaMask on Polygon
keywords:
  - docs
  - matic
  - wallet
image: https://matic.network/banners/matic-network-16x9.png
---

[MetaMask](https://metamask.io/) is a crypto wallet that can be used in a web browser and on mobile devices to interact with the Ethereum blockchain. It allows you to run Ethereum Dapps (Decentralized Apps) right in your browser without running a full Ethereum node.

**Type**: Non-custodial/HD <br/> **Private Key Storage**: User’s local browser storage <br/> **Communication to Ethereum Ledger**: Infura <br/> **Private key encoding**: Mnemonic <br/>

:::warning Please Backup your **Secret Recovery Phrase**, if your device breaks, is lost, stolen, or has data corruption, there is no other way to recover it. The Secret Recovery Phrase is the only way to recover your MetaMask accounts. Check more <ins>**[Basic Safety and Security Tips for MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**</ins>! :::

## Guide to Setup MetaMask for Polygon

* [Download & Install MetaMask](/develop/metamask/tutorial-metamask.md)
* [Configure Polygon on MetaMask](/develop/metamask/config-polygon-on-metamask.md)
* [Config Custom Tokens](/develop/metamask/custom-tokens.md)
* [Create & Import Accounts](/develop/metamask/multiple-accounts.md)

**Get Test Tokens - [Polygon Faucet](/develop/tools/polygon-faucet.md)**

### 1. Set up Web3

**Step 1**

Install the following in your DApp:
  ```javascript
  npm install --save web3
  ```
Create a new file, name it `web3.js` and insert the following code in it:

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

The above file exports a function called `getWeb3()` - the purpose of which is to request MetaMask account’s access via detecting a global object (`ethereum` or `web3`) injected by Metamask.

According to [Metamask’s API documentation](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes):

> MetaMask injects a global API into websites visited by its users at window.ethereum (Also available at window.web3.currentProvider for legacy reasons). This API allows websites to request user login, load data from blockchains the user has a connection to, and suggest the user sign messages and transactions. You can use this API to detect the user of a web3 browser.

In simpler terms, it basically means, having Metamask’s extension/add-on installed in your browser, you’d have a global variable defined, called `ethereum` (`web3` for older versions) - using this variable we instantiate our web3 object.

**Step 2**

Now, in your client code, import the above file,
```js
  import getWeb3 from '/path/to/web3';
```
and call the function:
```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```
### 2. Set up account

Now to send transactions (specifically those that alter the state of the blockchain) we’ll need an account to sign those transactions from We instantiate our contract instance from the web3 object we created above:
```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```
The `getAccounts()` function returns an array of all the accounts on user’s MetaMask, and `accounts[0]` is the one currently selected by the user.

### 3. Instantiate your contracts

Once we have our `web3` object in place, we’ll next instantiate our contracts > Assuming you have your contract ABI and address already in place :)
```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```
### 4. Call functions

Now for any function you’d want to call from your contract, we directly interact with our instantiated contract object (which is `myContractInstance` declared in Step 2)

A quick review: - Functions that alter the state of the contract are called `send()` functions - Functions that do not alter the state of the contract are called `call()` functions

**Calling `call()` Functions**
```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```
**Calling `send()` Functions**
```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
