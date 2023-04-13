---
id: account_based_plasma
title: Hesap tabanlı plasma
description: Plazmanın hesap tabanlı bir uygulama
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# Hesap tabanlı plasma {#account-based-plasma}

Polygon Plasma, [Plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160)’ye benzer bir model izler ancak diğer UTXO tabanlı uygulamalara kıyasla **hesap tabanlı bir uygulamadır**. Yan zincir, EVM ile uyumludur. MoreVP yapısını kullanarak onay imzalarına duyulan ihtiyacı da ortadan kaldırmaktayız.

## PoS katmanı ve Denetim noktaları {#pos-layer-and-checkpoints}

Polygon Ağı, denetim noktası katmanında çift Hisse Kanıtı stratejisi kullanır ve blok üreticisi katmanındaki Blok Üreticileri denetim noktalarını ve dolandırıcılık kanıtlarını kullanarak daha hızlı blok zamanlarına ve ana zincirde kesinliğe ulaşırlar.

Polygon Ağı’nın denetim noktası katmanında, Polygon Ağı’nın blok katmanı üzerindeki her birkaç blok için (yeterince bağlanmış) doğrulayıcı, blok katmanındaki tüm blokları doğruladıktan ve son denetim noktasından itibaren blok hash’lerinin Merkle ağacını oluşturduktan sonra ana zincir üzerinde bir denetim noktası oluşturacaktır.

Denetim noktaları, ana zincir üzerinde kesinlik sağlamanın yanı sıra kullanıcının fon çekmesi durumunda token’ların yakma kanıtını (fon çekme) içerdikleri için fon çekmelerde de rol oynar. Patricia Merkle kanıtı ve başlık blok kanıtını kullanarak kullanıcıların kök sözleşme üzerinde kalan token’larını kanıtlamalarına olanak verir. Kalan token’ları kanıtlamak için başlık blokunun PoS (Paydaşlar) üzerinden Kök Zincire işlenmesi gerektiğini unutmayın. Fon çekme işlemi için her zamanki gibi Ethereum gaz ücretleri alınacaktır. Denetim noktalarını büyük ölçüde çıkış oyunları için kullanırız.

## UTXO benzeri olay günlükleri {#utxo-like-event-logs}

ERC20/ERC721 aktarımları için bu, UTXO benzeri olay günlüğü veri yapısı kullanılarak yapılır. Referans olarak aşağıda bir `LogTransfer` olayı bulunmaktadır.

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

Yani temel olarak ERC20/ERC721 aktarımı bu olayı yayımlar ve gönderici ve alıcının önceki bakiyeleri (`input1` ve `input2`) tx için girdi (UTXO benzeri) olur ve yeni bakiyeler de çıktılar (`output1` ve `output2`) olur. Aktarımlar, ilgili tüm `LogTransfer` olaylarının harmanlanması yoluyla takip edilir.

## Çıkış Oyunları {#exit-games}

Bloklar tek bir (ya da çok az) blok üreticisi tarafından üretildiği için dolandırıcılık riskine maruz kalmaktadır. Saldırı senaryolarını kısaca ele alacağız ve ardından plasma’nın kullanıcı güvenliğini nasıl garanti ettiğinden bahsedeceğiz.

## Saldırı Vektörleri {#attack-vectors}

### Kötü amaçlı Operatör {#malicious-operator}
Aşağıda, operatörün kötü niyetli olabileceği ve hile yapmaya çalışabileceği senaryolar ele alınmaktadır.

1. Birden çıkagelen token’lar / çift harcamalar / token bakiyesini artıran (operatör kontrollü hesap için) / azaltan (kullanıcı için) oynanmış alındılar.
2. Verilerin kullanılamaması Bir kullanıcı tx gönderdikten sonra diyelim ki operatör tx’i plasma blokuna dâhil etti ancak zincir verisini kullanıcı için kullanılamaz hale getirdi. Böyle bir durumda, kullanıcı eski bir tx’ten çıkış başlatırsa en son tx’i gösterilerek zincir üzerinde sorgulanabilir. Kullanıcının mağdur edilmesi kolaylaşır.
3. Yanlış denetim noktası En kötü durumda bir operatör A.1 ve (veya) A.2’yi gerçekleştirebilir ve bu geçersiz durum geçişlerini kök zincire işlemek için doğrulayıcılarla iş birliği yapabilir.
4. Yan zincirin durdurulması Operatör blok üretmeyi durdurur ve zincir durur. Belirli bir süre boyunca denetim noktası gönderilmemişse kök zincir üzerinde yan zincir durmuş olarak işaretlenebilir. Bundan sonra başka denetim noktası gönderilemez.

Yukarıda listelenen nedenler veya başka nedenlerden ötürü plasma zinciri kontrolsüz hâle gelirse kullanıcıların toplu çıkış başlatmaları gerekir ve zamanı gelirse ve geldiğinde kök zincir üzerinde kullanıcıların yararlanabileceği çıkış yapıları sağlamak isteriz.

### Kötü amaçlı kullanıcı {#malicious-user}

1. Kullanıcı taahhüt edilen bir tx’ten çıkış başlatır ancak yan zincir üzerinde token harcamaya devam eder. Çift harcamaya benzer, ancak 2 zincir arasında yapılır.

 [MoreVp 7](https://ethresear.ch/t/more-viable-plasma/2160) fikirlerini temel alıyoruz. Kısaca anlatmak gerekirse, MoreVP, çıkış önceliğini hesaplamak için “en genç girdi” önceliği olarak adlandırılan yeni bir yol sunuyor. MoreVP, çıkışları çıktı yaşına göre sıralamak yerine onları en genç girdinin yaşına göre sıralıyor. Bu, “birden çıkagelen” işlemlerin ardından tutulan bloklara dâhil olsalar bile yalnızca geçerli girdilerden kaynaklandıkları için çıktıların çıkışlarının doğru şekilde işlenmesini sağlıyor. Dâhil edilen tx’e bir yaş atayan `getAge`’i tanımlıyoruz. Bu, [minimum geçerli plasma 1](https://ethresear.ch/t/minimal-viable-plasma/426)’de tanımlandığı şekilde oluyor.

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## Çıkış Senaryoları {#exit-scenarios}

Çıkış senaryolarını tartışmaya devam etmeden önce bir terminoloji geliştirelim:

- **Fon çeken**: Plasma zincirinden çıkmak isteyen bir kullanıcı.
- **Taahhüt edilen tx**: Polygon zinciri blokuna dâhil edilmiş ve kök zincirde denetim noktasından geçirilmiş olan bir tx.
- **Harcanan tx**: Kullanıcı tarafından imzalanan bir işleme yanıt olarak kullanıcının token bakiyesinde değişen bir tx (gelen token aktarımlarını içermez). Bu, kullanıcı tarafından başlatılan bir aktarım, tx yakma vb. olabilir
- **Referans tx**: İlgili kullanıcı ve token için çıkış tx’inden hemen önce gelen tx’ler. Hesap bakiyesi tabanlı UTXO düzenimizde olduğu gibi, referans tx’e çıktılar, çıkış yapılan tx’e girdiler hâline gelir.
- **MoreVP çıkış önceliği**: Belirli bir tx’e en genç girdinin (referans tx’ler arasında) yaşı. Çoğu zaman çıkış önceliğini hesaplamak için kullanılır.

### Token'ları yakın {#burn-tokens}

Yan zincirden çıkmak için kullanıcı, plasma zincirinde *fon çekme (token yakma)* tx’i başlatır. Bu tx bir `Withdraw` olayı yayımlar.

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

Burada `input1` ilgili token için kullanıcının önceki bakiyesini ifade ederken`output1`,  yan zincirde kalan token sayısını ifade eder. Bu yapı, hesap tabanlı *UTXO* planımızla uyumludur. Kullanıcı, ana zincir üzerinde token’ları çekmek için bu fon çekme tx’inin alındısını ibraz edecektir. Bu alındıya atıfta bulunurken kullanıcının şunları da sağlaması gerekir:

1. Yan zincir blokunda alındının dâhil edildiğinin Merkle kanıtı (`receiptsRoot`)
2. Yan zincir blokunda işlemin dâhil edildiğinin Merkle kanıtı (`transactionsRoot`)
3. Kök zincir üzerindeki denetim noktasında yan zincir blok başlığının dâhil edildiğinin kanıtı

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

Bir kullanıcı plasma zincirinden çıkmak istediğinde kendisi (ya da istemci uygulaması, ör. cüzdanı) yan zincir üzerinde token’ları yakmalı, denetim noktasından geçmesini beklemeli ve ardından denetim noktasından geçen fon çekme tx’inden çıkış başlatmalıdır.

### Son ERC20/721 transferlerinden (MoreVP) çıkış {#exit-from-the-last-erc20-721-transfers-morevp}

Kullanıcının yan zincir üzerinde ERC20 aktarımı yaptığı senaryoyu düşünün. Operatör, kullanıcının aktarımınden hemen önce birden çıkagelen bir tx ekler ve bu bloku denetim noktasından geçirmek için doğrulayıcılarla iş birliği yapar. Bu senaryoda ve daha genel olarak yukarıda bahsedilen A1 ve A3 arası saldırı vektörlerinde kullanıcı kötü amaçlı bir tx dâhil edilmeden önce token’larını yakma fırsatına sahip olmayabilir ve kök zincir üzerinde denetim noktasından geçirilen son tx’ten bir çıkış başlatması gerekir. Bu nedenle, yakarak çıkışa ek olarak diğerlerinin yanı sıra ERC20/721 aktarımları gibi çeşitli tx’lerden çıkışları desteklememiz gerekir. Bu saldırı vektörü temel alındığında ve 2 senaryo ayrıntılı olarak açıklandığında:

**Giden aktarım:** Bir kullanıcıya birkaç token aktardım, ama aktarım tx’imi dâhil etmeden önce operatörün bloka/denetim noktasına kötü amaçlı bir tx dâhil ettiğini fark ettim. Zincirden çıkışı başlatmam lazım. Aktarım tx’inden çıkış başlatacağım. MoreVP’de tanımlandığı üzere, çıkışın çıkış önceliğini tanımlayacak bir referans tx (*girdi UTXO*) sağlamam gerekecek. Bu yüzden, token bakiyemi güncelleyen ve giden aktarım tx’inden hemen önce gelen bir tx’e atıfta bulunacağım.

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

**Gelen aktarım:** Gelen aktarım tx’imi dâhil etmeden önce operatörün bloka/denetim noktasına kötü amaçlı bir tx dâhil ettiğini fark ettim. Karşı tarafın bakiyesine atıfta bulunurken gelen aktarım tx’inden çıkış başlatacağım, çünkü burada *girdi UTXO* karşı tarafın token bakiyesi.

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### Uçuş içi işlemden (MoreVP) çıkış {#exit-from-an-in-flight-transaction-morevp}

Bu senaryo, verilerin kullanılamaması senaryosuyla mücadele etmeyle ilgilidir. Diyelim bir tx yaptım ancak veriler kullanılamadığı için o tx’in dâhil edilip edilmediğini bilmiyorum. Denetim noktasından geçen son tx’e atıfta bulunarak devam eden bu tx’ten çıkış başlatabilirim. Kullanıcı, MoreVP stili çıkış başlattığında tx yapmamaya dikkat etmelidir, aksi takdirde sorgulanır.

**Notlar:** MoreVP stili yapıdan çıkarken kullanıcı referans tx’ler ve çıkış tx’i sağlayıp küçük bir `exit bond` koyarak çıkış başlatabilir. Tüm çıkışlar için eğer çıkış başarıyla sorgulanırsa çıkış iptal edilir ve çıkış bonosuna el koyulur.

## Sınırlamalar {#limitations}

1. Büyük kanıt boyutu: Denetim noktasında işlemin dâhil edildiğinin Merkle kanıtı ve (işlemi içeren) blokun dâhil edildiğinin Merkle kanıtı.
2. Toplu çıkış: Operatör kötü niyetli hâle gelirse kullanıcıların toplu çıkış başlatmaları gerekir.

Özellik henüz gelişim aşamasındadır ve onu iyileştirmemize ya da bu yapının umutsuz bir biçimde bozulması hâlinde tamamen baştan tasarlamamıza yardımcı olacak geri bildirimlerinizi bekleriz. Uygulama, [sözleşmelerde](https://github.com/maticnetwork/contracts) yer alan depomuzda devam eden bir çalışmadır.