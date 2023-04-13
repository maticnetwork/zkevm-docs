---
id: ether
title: Gabay sa Pagdeposito at Pag-withdraw ng Ether
sidebar_label: Ether
description:  "Magagamit na mga function para sa mga kontrata ng Ether."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## Daloy ng Mataas na Antas  {#high-level-flow}

Pagdedeposito sa Ether -

- Gawin ang depositEtherFor call sa **RootChainManager** at ipadala ang ether asset.

Pag-withdraw ng Ether -

1. **_Mag-burn_** ng tokens sa Polygon chain.
2. Mag-call ng **_exit_** na function sa **_RootChainManager_** para makapagsumite ng proof ng transaksyon sa pag-burn. Puwedeng gawin ang call na ito **_pagkatapos maisumite ang checkpoint_** para sa block na naglalaman ng transaksyon sa pag-burn.

## Mga Detalye ng Hakbang {#step-details}

### Katawanin ang mga contract {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### ideposito {#deposit}
Tawagan ang `depositEtherFor`function ng `RootChainManager`kontrata. Ang function na ito ay tumatagal ng 1 argument - `userAddress`, na siyang address ng user na makakatanggap ng deposito sa Polygon chain. Kailangan ng halaga ng either na ideposito na ipadala bilang halaga ng transaksyon.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Burn {#burn}
Dahil ang Esther ay isang ERC20 token sa Polygon chain, ang proseso ng pag-withdraw nito ay pareho ng ERC20 withdrawal. Maaaring sunugin ang mga Token sa pamamagitan ng pagtawag sa `withdraw`function sa kontrata ng token ng bata. Tumatagal ang function na ito ng iisang argument, na `amount`nagpapahiwatig ng bilang ng mga token na susunugin.
Ang patunay ng burn na ito ay kailangang ipasa sa exit step. Kaya i-store ang transaction hash.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Mag-Exit {#exit}
Kailangang tawagin ang exit function sa `RootChainManager`kontrata para i-unlock at tanggapin ang mga token pabalik mula sa .`EtherPredicate` Ang function na ito ay nangangailangan ng single bytes argument na nagpapatunay sa burn transaction. Hintaying para sa checkpoint na naglalaman ng transaksyon ng burn na isumite bago tumawag sa function na ito. Nabubuo ang Proof sa pamamagitan ng RLP-encoding ang mga sumusunod na field:

1. headerNumber - Checkpoint header block number na naglalaman ng burn tx
2. blockProof - Patunay na ang block header (sa child chain) ay isang leaf sa isinumiteng merkle root
3. blockNumber - Block number na naglalaman ng burn tx sa child chain
4. blockTime - Burn tx block time
5. txRoot - Mga transaction root ng block
6. receiptRoot - Mga receipt root ng block
7. receipt - Receipt ng burn transaction
8. receiptProof - Merkle proof ng burn receipt
9. branchMask - 32 bits na nagsasaad ng path ng receipt sa merkle patricia tree
10. receiptLogIndex - Log index na babasahin mula sa receipt

Ang pagbubuo ng patunay nang manu-mano ay maaaring nakakalito kaya ipinapayong gamitin ang Polygon Edge. Kung gusto mong ipadala ang transaksyon nang manu-mano, maaari mong ipasa ang **_encodeAbi_** bilang **_totoo_** sa options object upang makuha ang raw calldata.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

Ipadala ang calldata na ito sa **_RootChainManager_**.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
