---
id: erc20
title: Gabay sa Pagdeposito at Pag-withdraw ng ERC20
sidebar_label: ERC20
description: "Available na mga function para sa mga ERC20 contract."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## High Level Flow {#high-level-flow}

Pagdedeposito ng ERC20 -

1. **_Aprubahan_** ang **_ERC20Predicate_** contract upang gastusin ang mga token na kailangang ideposito.
2. Gawin ang **_depositFor_** call sa **_RootChainManager_**.

Pag-withdraw ng ERC20 -

1. **_Mag-burn_** ng mga token sa Polygon chain.
2. Mag-call ng **_exit_** na function sa **_RootChainManager_** para makapagsumite ng proof ng transaksyon sa pag-burn. Ang tawag na ito ay maaaring gawin **_matapos na ang checkpoint_** ay isinumite para sa burn transaction na naglalaman ng block.

## Mga Detalye ng Setup {#setup-details}

### Katawanin ang mga contract {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Aprubahan {#approve}
Aprubahan ang **_ERC20Predicate_** upang gastusin ang mga token sa pamamagitan ng paggamit ng **_approve_** function ng token contract. Ang function na ito ay nangangailangan ng dalawang argument spender at amount. Ang **_spender_** ay ang address na inaaprubahan para magastos ang tokens ng user.  Ang **_amount_** ay ang halaga ng mga token na maaaring gastusin. Panatilihing katumbas ng halaga ng deposito ang halaga para sa minsanang pag-apruba o magpasa ng mas malaking numero upang maiwasan ang pag-apruba nang maraming beses.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Deposito {#deposit}
Tandaan na ang token ay kailangang imapa at ang halaga ay kailangang maaprubahan para maideposito bago gawin ang call na ito.   Tawagan ang `depositFor()`function ng `RootChainManager`kontrata. Ang function na ito ay tumatagal ng 3 argumento: `userAddress`, `rootToken`, `depositData``userAddress`at . ay ang address ng user na makakatanggap ng deposito sa Polygon chain. ay ang address ng token sa main chain. ay `depositData`ang halaga ng `rootToken`ABI-encoded.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Burn {#burn}
Maaaring i-burn ang mga token sa Polygon chain sa pamamagitan ng paggamitng **_withdraw_** function sa child token contract. Ang function na ito ay nangangailangan ng single argument, **_halaga_** na nagpapahiwatig ng bilang ng mga token na ibu-burn.
Ang patunay ng burn na ito ay kailangang isumite sa exit step. Kaya i-store ang transaction hash.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Mag-Exit {#exit}
Kailangang tawagin ang exit function sa `RootChainManager`kontrata para i-unlock at tanggapin ang mga token pabalik mula sa .`ERC20Predicate` Ang function na ito ay nangangailangan ng single bytes argument na nagpapatunay sa burn transaction. Hintaying para sa checkpoint na naglalaman ng transaksyon ng burn na isumite bago tumawag sa function na ito. Nabuo ang Proof sa pamamagitan ng pag-encode ng RLP sa mga sumusunod na field -

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
