---
id: did-implementation
title: Polygon DID Uygulaması
sidebar_label: Identity
description: Polygon üzerinde DID uygulaması hakkında bilgi alın
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Polygon ledger üzerinde bir Polygon DID oluşturmak ve yayımlamak için, Polygon ekibi tarafından yayımlanan uygulama paketlerini kullanmak isteyen kullanıcılar için bir başlangıç kılavuzudur.

Polygon DID metodu Uygulaması polygon-did-registrar, polygon-did-resolver ve polygon-did-registry-contract olmak üzere 3 paketten oluşur. Polygon ağında veya ağından bir DID'yi kaydetmek veya okumak için bu fonksiyonu eklemek isteyen kullanıcılar aşağıdaki kılavuzu kullanabilir.

Bir DID aslında eşsiz bir tanımlayıcıdır ve merkezî bir otorite varlığı olmadan oluşturulmuştur.  DID, Doğrulanabilir Kimlik Bilgileri bağlamında, belgeleri imzalamak için kullanılır, böylece gerektiğinde kullanıcının belge sahipliğini kanıtlamasını kolaylaştırır.

## Polygon DID Metodu {#polygon-did-method}

Polygon DID metodunun tanımı DID-Core özellikleri ve standartlarına uyar. Bir DID URI iki nokta üst üste ile ayrılan üç bileşenden oluşur; düzen, ardından metodun adı ve son olarak metoda özgü bir tanımlayıcı. Polygon için URI şu şekilde görünür:

```
did:polygon:<Ethereum address>
```

Burada şema `did`, metod adı `polygon`ve metod spesifik tanımlayıcı bir ethereum adresidir.

## Polygon DID Uygulaması {#polygon-did-implementation}

Polygon DID iki paketin yardımıyla uygulanabilir; kullanıcı ilgili npm kütüphanelerini içe aktarabilir ve bunları ilgili uygulamalarına Polygon DID metotlarını eklemek için kullanabilir. Uygulama için ayrıntılar sıradaki bölümde verilmektedir.

Başlamak için ilk olarak bir DID oluşturulması gerekir. Polygon did söz konusu olduğunda, oluşturma işlemi iki adımla gerçekleştirilir; birinci adımda kullanıcının kendisi için bir DID uri üretmesi ve ikinci adımda bunu Polygon ledger'a kaydetmesi gerekir.

### DID Oluşturma {#create-did}

Bir poligon DID URI oluşturmak için projenizde öncelikle şunu yüklemeniz gerekir:

```
npm i @ayanworks/polygon-did-registrar --save
```

Kurulum tamamlandıktan sonra kullanıcı bunu şu şekilde kullanabilir:

```
import { createDID } from "polygon-did-registrar";
```

Bu `createdDID`fonksiyon kullanıcının DID URI oluşturmasına yardımcı olur. Bir DID oluştururken iki senaryo olabilir.

  1. Kullanıcı zaten bir cüzdana sahiptir ve aynı cüzdana karşılık gelen bir DID oluşturmak istemektedir.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. Kullanıcının mevcut bir cüzdan yoksa ve bir tane oluşturmak istiyorsa kullanıcı şunları kullanabilir:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

Her iki durumda da ağ parametresi kullanıcının Polygon Mumbai Testnet veya Polygon Mainnet üzerinde DID oluşturup oluşturmadığına işaret eder.

Örnek Giriş:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

DID oluşturduktan sonra üretilmiş bir DID URI oluşturacaksınız.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### Kayıt OLUN {#register-did}

DID URI ve ilgili DID belgesini defter üzerine kaydetmek için kullanıcının öncelikle aşağıdaki `polygon-did-registrar`gibi kullanması gerekir:

```js
import { registerDID } from "polygon-did-registrar";
```

DID kaydının ön koşulu olarak, kullanıcının DID ile corrsponding giren cüzdanın mevcut token bakiyesine sahip olduğundan emin olması gerekir. Kullanıcı cüzdanda token bakiyesine sahip olduktan sonra, registerDID işlevine aşağıda gösterildiği gibi bir çağrı yapılabilir:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

Parametreler `did``privateKey`ve zorunludur, bu arada ve `url`girme için isteğe bağlı olarak kullanılır.`contractAddress` Kullanıcı son iki parametreyi vermezse, kütüphane DID URI'den ağın varsayılan yapılandırmalarını alır.

Tüm parametreler şartnamelerle eşleşir ve her şey doğru sırayla verilirse, `registerDID`fonksiyon bir işlem hash'ini döndürür, karşılık gelen bir hata aksi halde döndürür.

Ve bununla birlikte, Polygon Ağı'na bir DİT kaydı yapma görevini başarıyla tamamladınız.

## DID Çözme {#resolve-did}

Başlamak için aşağıdaki kütüphaneleri yükleyin:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

Ledger'da kayıtlı bir DID belgesini okumak için, bir DID polygon URI'sine sahip olan herhangi bir kullanıcı ilk önce projesinde şunu içe aktarabilir,

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

Paketleri ithal ettikten sonra, DID belgesi şu şekilde alınabilir:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

`didResolutionResult`Nesne aşağıdaki gibidir:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

Kullanıcının bir DID'yi çözmeye çalışırken hiçbir gaz maliyeti olmayacağı unutulmamalıdır.

## DID Belgesini Güncelleme {#update-did-document}

Proje kapsamını DID belgesini güncelleme yeteneği ile encapsulate için, kullanıcının öncelikle aşağıdaki `polygon-did-registrar`gibi kullanması gerekir:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

Ardından, fonksiyonu çağırın:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

DİD belgesini güncellemek için sadece DID sahibi bu talebi gönderebilir. Burada özel anahtar bir miktar Matic token da barındırmalıdır.

Kullanıcı yapılandırmaya `url` ve `contractAddress` sağlamazsa, kütüphane ağın varsayılan yapılandırmayı DID URI'den alır.

## DID Belgesi Silme {#delete-did-document}

Polygon DID uygulaması ile bir kullanıcı da DİT Belgesini defter üzerinden iptal edebilir. Kullanıcı önce aşağıdaki `polygon-did-registrar`gibi kullanmalıdır:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

Ardından aşağıdaki kullanılır,

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Parametreler arasında, `url` ve `contractAddress` opsiyonel parametrelerdir ve kullanıcı tarafından verilmemeleri halinde, fonksiyon tarafından DID URI'ye göre varsayılan bir yapı alınır.

Özel anahtarda DID'nin ağ yapılandırmasına göre Matic token bulunması önemlidir; aksi takdirde işlem başarısız olur.

## Bilgi Deposuna Katkı {#contributing-to-the-repository}

Bilgi depolarında değişiklik teklif etmek için standart çatal, dal ve çekme isteği iş akışını kullanın. Lütfen şube adlarını örneğin sorun veya hata numarasını ekleyerek bilgilendirici yapın.

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
