---
id: overview
title: Pangkalahatang-ideya ng MetaMask
sidebar_label: Overview
description: Paano ka makakapagsimula sa MetaMask sa Polygon
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Ang MetaMask](https://metamask.io/) ay isang crypto wallet na maaaring gamitin sa isang web browser at sa mga mobile device upang makipag-interaksyon sa Ethereum blockchain. Binibigyang-daan ka nitong patakbuhin ang Ethereum Dapps (Desentralisadong Mga App) mismo sa iyong browser nang hindi nagpapatakbo ng buong Ethereum node.

**Uri**: Non-custodial/HD <br/>
**Imbakan ng Pribadong Key**: Imbakan sa local browser ng user <br/>
**Komunikasyon sa Ethereum Ledger**: Infura <br/>
**Pag-i-encode ng pribadong key**: Mnemonic <br/>

:::warning
Paki-backup ang iyong S**ecret Recovery Phrase.** Kung nag-break ang iyong aparato, nawala, nagnanakaw, o may corruption sa data, walang ibang paraan para mabawi ito. Ang Secret Recovery Phrase ang tanging paraan para mabawi ang iyong mga account ng MetaMask. I-check ang higit pang **[<ins>Basic Safety and Security Tips para sa MetaMask</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**.
:::

## Gabay sa pag-set up ng MetaMask para sa Polygon {#guide-to-set-up-metamask-for-polygon}

* [I-download at I-install ang MetaMask](/develop/metamask/tutorial-metamask.md)
* [I-configure ang Polygon sa MetaMask](/develop/metamask/config-polygon-on-metamask.md)
* [I-configure ang Mga Custom Token](/develop/metamask/custom-tokens.md)
* [Gumawa at Mag-import ng Mga Account ](/develop/metamask/multiple-accounts.md)

### Pag-Set up ng Web3 {#1-set-up-web3}

#### Hakbang 1 {#step-1}

I-install ang mga sumusunod sa DApp mo:

  ```javascript
  npm install --save web3
  ```

Gumawa ng bagong file, pangalanan ito na `web3.js`at ilagay ang mga sumusunod na code dito:

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

Ini-export ng file sa itaas ang function na tinatawag na `getWeb3()` - layon nito na gumawa ng kahilingan para ma-access ang account ng metamask sa pamamagitan ng pag-detect sa global object (`ethereum` o `web3`) na in-inject ng Metamask.

Ayon sa [dokumentasyon api ng Metamask](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes)

> Nag-inject ang MetaMask ng isang global na API sa mga website na binisita ng mga gumagamit nito sa window.ethereum. Pinapayagan ng API na ito ang mga website na humiling ng mga account ng Ethereum ng mga user, basahin ang data mula sa mga blockchain ang user na konektado sa, at iminumungkahi na mag-sign ng mga mensahe at transaksyon ng user. Ipinapahiwatig ng pagkakaroon ng provider na object ang isang Ethereum user.

Sa mas simpleng termino, nangangahulugan ito na ang pagkakaroon ng extension/add-on ng Metamask na naka-install sa iyong browser, magkakaroon ka ng global na variable na tinukoy, na tinatawag na `ethereum`( `web3`para sa mga mas lumang bersyon), at sa paggamit ng variable na ito ay we namin ang aming web3 object.

#### Hakbang 2 {#step-2}

Ngayon, sa iyong client code, i-import ang file sa itaas:

```js
  import getWeb3 from '/path/to/web3';
```

at tawagan ang function:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### Magtayo Kuwenta {#2-set-up-account}

Ngayon na magpadala ng mga transaksyon (partikular na ang mga nagbabago sa estado ng blockchain) kakailanganin namin ng account para mag-sign ang mga transaksyong iyon. I-instantiate ang aming kontrata instance mula sa web3 object na nilikha namin sa itaas:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

Ang `getAccounts()`tungkulin ay nagbabalik ng hanay ng lahat ng mga kuwenta sa metamask ng gumagamit, at ito `accounts[0]`ang kasalukuyang pinili ng gumagamit.

### Magsimula iyong mga kontrata {#3-instantiate-your-contracts}

Kapag may lugar kaming `web3`bagay na amin, susunod naming i-instantiate ang aming mga kontrata, sa pag-aakala na mayroon kang kontrata mong ABI at i-address na sa lugar:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### Pag-andar ng tawag  {#4-call-functions}

Ngayon para sa anumang function na gusto mong tumawag mula sa iyong kontrata, direktang nakikipag-ugnayan kami sa aming instantiated contract object (na `myContractInstance`idineklara sa Step 2).

:::tip Isang mabilis na pagsusuri

Mga function na nagbabago sa estado ng kontrata ay tinatawag na mga `send()`function. Mga function na hindi nagbabago sa estado ng kontrata ang mga tinatawag na `call()`function.

:::

#### Tumatawag `call()`Ginagawa  {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### Tumatawag `send()`Ginagawa  {#functions-1}

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
