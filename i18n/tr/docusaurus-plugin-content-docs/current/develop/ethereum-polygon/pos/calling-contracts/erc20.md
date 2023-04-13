---
id: erc20
title: ERC20 Yatırma ve Çekme Kılavuzu
sidebar_label: ERC20
description: "ERC20 sözleşmeleri için kullanılabilir fonksiyonlar."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## Yüksek Seviye Akış {#high-level-flow}

ERC20 Yatırma -

1. Yatırılması gereken token'ları harcamak için **_ERC20Predicate_** sözleşmesini **_onaylayın_**.
2. **_RootChainManager_** üzerinde **_depositFor_** çağrısı yapın.

ERC20 Çekme -

1. Polygon zinciri üzerinde token'ları **_yakın._**
2. Yakma işleminin kanıtını göndermek için **_RootChainManager_** üzerinde **_exit_** fonksiyonunu çağırın. Bu çağrı, yakma işlemini içeren blok için **_denetim noktası gönderildikten sonra_** yapılabilir.

## Kurulum Detayları {#setup-details}

### Sözleşmeleri somutlaştırın {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Onaylayın {#approve}
Token sözleşmesinin **_approve_** fonksiyonunu çağırarak **_ERC20Predicate_** onayı verin ve token'ları harcayın. Bu fonksiyon spender ve amount şeklinde iki argüman alır. **_spender_**, kullanıcının token'larını harcamak için onaylanan adrestir. **_amount_**, harcanabilecek token miktarıdır. Tek seferlik onay için amount'u yatırma miktarına eşit tutun veya birden fazla onay vermekten kaçınmak için daha büyük bir sayı geçirin.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Fon Yatırma {#deposit}
Bu çağrıyı yapmadan önce fon yatırma için token'ın eşlenmiş ve miktarın onaylanmış olması gerektiğini unutmayın.  
Sözleşmenin `depositFor()`işlevini `RootChainManager`çağırın. Bu fonksiyon 3 argümanı `userAddress``rootToken`alır: , ve `depositData``userAddress`. Polygon `rootToken`zincirinde depozitoyu alan kullanıcının adresidir. Ana zincir üzerindeki tokenin adresidir. ABI kodlu `depositData`miktardır.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Yakma {#burn}
Token'lar Polygon zinciri üzerinde, alt token sözleşmesi için **_withdraw_** fonksiyonu çağrılarak yakılabilir. Bu fonksiyon, yakılacak token sayısını gösteren **_amount_** olarak tek bir argüman alır. Bu yakmanın kanıtının çıkış adımında gönderilmesi gerekir. Bu nedenle işlem hash'ini saklayın.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Çıkış {#exit}
`RootChainManager`Sözleşmede çıkış fonksiyonu, token'ları açmak ve geri almak için çağrılmalıdır.`ERC20Predicate` Bu fonksiyon yakma işlemini kanıtlayan tekil bir bayt argümanı alır. Bu işlevi çağırmadan önce yanık işleminin yapılmasını içeren kontrol noktasını bekleyin. Proof aşağıdaki alanları kodlayan RLP tarafından oluşturulur -

1. headerNumber - Yakma işlemini içeren denetim noktası başlığı blok numarası
2. blockProof - Blok başlığının (alt zincirdeki), gönderilen merkle kökü içinde bir yaprak (leaf) olduğunun kanıtı
3. blockNumber - Alt zincir üzerinde yakma işlemini içeren blok numarası
4. blockTime - Yakma işleminin blok zamanı
5. txRoot - Bloğun işlem kökü
6. receiptRoot - Bloğun alındılar (receipts) kökü
7. receipt - Yakma işleminin alındısı
8. receiptProof - Yakma alındısının merkle kanıtı
9. branchMask - merkle patricia ağacında alındı yolunu gösteren 32 bit değeri
10. receiptLogIndex - Alındıdan okumak için Log Index (günlük dizini)

Kanıtı manuel olarak oluşturmak karmaşık olabilir, bu nedenle Polygon Edge kullanılması önerilir. İşlemi manuel olarak göndermek isterseniz ham çağrı verisini almak için opsiyonlar nesnesi içinde **_encodeAbi_**'yi **_true_** olarak geçirebilirsiniz.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

Bu çağrı verisini **_RootChainManager_** adresine gönderin.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
