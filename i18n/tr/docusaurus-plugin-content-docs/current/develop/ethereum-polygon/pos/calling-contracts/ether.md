---
id: ether
title: Ether Yatırma ve Çekme Kılavuzu
sidebar_label: Ether
description:  "Ether sözleşmeleri için kullanılabilir fonksiyonlar."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## Yüksek Seviye Akış {#high-level-flow}

Ether Yatırma -

- **RootChainManager** üzerinde depositEtherFor çağrısını yapın ve ether varlığını gönderin.

Ether Çekme -

1. Polygon zinciri üzerinde token'ları **_yakın._**
2. Yakma işleminin kanıtını göndermek için **_RootChainManager_** üzerinde **_exit_** fonksiyonunu çağırın. Bu çağrı, yakma işlemini içeren blok için **_denetim noktası gönderildikten sonra_** yapılabilir.

## Adım Detayları {#step-details}

### Sözleşmeleri somutlaştırın {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### fon yatırın {#deposit}
Sözleşmenin `depositEtherFor`işlevini `RootChainManager`çağırın. Bu fonksiyon 1 argümanı alır `userAddress`- bu da kullanıcının Polygon zincirine depozitoyu alacak adresidir. Yatırılacak eter miktarı, işlemin değeri olarak gönderilmelidir.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Yakma {#burn}
Ether Polygon zincirinde bir ERC20 tokeni olduğu için, çekme işlemi ERC20 çekme işlemiyle aynıdır. Jeton ile ilgili olarak belirteçler çocuk token sözleşmesi üzerindeki `withdraw`işlevi çağırarak yakılabilir. Bu fonksiyon tek bir argüman alır ve yakılacak tokenların sayısını `amount`gösterir. Bu yakmanın kanıtının çıkış adımında gönderilmesi gerekir. Bu nedenle işlem hash'ini saklayın.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Çıkış {#exit}
`RootChainManager`Sözleşmede çıkış fonksiyonu, token'ları açmak ve geri almak için çağrılmalıdır.`EtherPredicate` Bu fonksiyon yakma işlemini kanıtlayan tekil bir bayt argümanı alır. Bu işlevi çağırmadan önce yanık işleminin yapılmasını içeren kontrol noktasını bekleyin. Proof aşağıdaki alanları RLP kodlayan tarafından oluşturulur:

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
