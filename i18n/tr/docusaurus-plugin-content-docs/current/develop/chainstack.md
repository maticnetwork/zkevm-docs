---
id: chainstack
title: Chainstack ve Döküm Kullanarak Akıllı Bir Sözleşme Dağıtın
sidebar_label: Using Chainstack
description:  Polygon üzerinde Akıllı Sözleşme geliştirmek için Chainstack ve Döküm Kullanın
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Genel Bakış {#overview}

Bu bölüm, Polygon Mumbai testi üzerinde [Chainstack](https://chainstack.com/build-better-with-polygon/) ve [Döküm](https://github.com/gakonst/foundry/) ile bir Hello World sözleşmesi uygulayarak size rehberlik eder.

Chainstack, Ethereum tabanlı uygulamalar ve diğer blok zincirler için altyapı sağlar. Düğümleri korurlar ve ağ ile bağlantılarını garanti ederler ve ayrıca ana ağ ve test ağları ile etkileşime girmek için bir arayüz sunar.

Foundry, Ethereum uygulaması geliştirme için Rust dilinde yazılan hızlı bir araç setidir. Bu test, EVM akıllı sözleşmelerle etkileşim, işlem gönderme ve blok zinciri veri alımı sağlar.

:::tip

Herhangi bir sorunuz varsa, [<ins>Chainstack Discord</ins>](https://discord.com/invite/Cymtg2f7pX) sunucusuna ulaşın.

:::

## Neler öğreneceksiniz? {#what-you-will-learn}

Bir Polyon düğümünü devreye almak için Chainstack ve sözleşmeyi devreye almak için Foundry kullanarak bir Hello World sözleşmesi oluşturmak.

## Neler yapacaksınız? {#what-you-will-do}

1. Chainstack kullanarak bir Polygon düğümünü devreye almak
2. Foundry kurmak
3. Akıllı sözleşme oluşturmak
4. Akıllı sözleşme devreye almak.

## Bir Polygon Mumbai Düğümü devreye alın {#deploy-a-polygon-mumbai-node}

Blok zinciri ağına akıllı bir sözleşme dağıtmak için bir düğüme ihtiyacınız var. Düğümünüzü çalıştırıp çalıştırabilmek için aşağıdaki adımları izleyin:

**Adım 1 →** [Chainstack](https://console.chainstack.com/user/account/create) ile kaydolun

![img](/img/chainstack/sign-up.png)

**Adım 2 →** [Mumbai düğümünün](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network) nasıl dağıtılacağı hakkındaki talimatları takip edin

![img](/img/chainstack/join-network.png)

**Adım 3 →** [Konuşlandırılan düğümün HTTPS uç noktasını](https://docs.chainstack.com/platform/view-node-access-and-credentials) alın

## Foundry Kurun {#install-foundry}

Foundry, akıllı sözleşmelerle çalışmaya yönelik bir geliştirme araç setidir. Çalışmaya başlamak için önce Rust kodlama dilini kurmanız gerekir.

1. [Rust Kurma](https://www.rust-lang.org/tools/install).
1. [Foundry Kurma](https://github.com/gakonst/foundry/).

## Foundry ile Başlatma {#initialize-with-foundry}

Bir şablon proje oluşturmak için çalıştığınız dizine gidin ve şunu çalıştırın:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## Hesabınıza Fon Yatırın {#fund-your-account}

Akıllı sözleşmeyi devreye almak için bir cüzdan hesabına ihtiyacınız olacaktır. Bunun için [Metamask](https://metamask.io/) kullanabilirsiniz. Sözleşmeyi devreye almak için ağda gaz ödemeniz de gerekecektir. Cüzdan adresinizi kopyalayın ve Mumbai MATIC [token'ı musluk üzerinden](https://faucet.polygon.technology/) alın.

## Hello World sözleşmesi oluşturun {#create-the-hello-world-contract}

Başlatılan Foundry projesinde `src/`'de, `HelloWorld.sol` oluşturun:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## Sözleşmeyi devreye alın {#deploy-the-contract}

Bu noktada, sözleşmenizi devreye almaya hazırsınız:

* Polygon Mumbai ağında, sözleşmenizi devreye almak için kullanacağınız bir düğümünüz var.
* Sözleşmeyi devreye almak için kullanacağınız Foundry var.
* Sözleşmeyi devreye alacak olan ve içinde fon bulunan bir hesabınız var.

Sözleşmeyi devreye almak için aşağıdakini çalıştırın:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

Burada,

* CONTRACT_PATH — `HelloWorld.sol` dosyanızın yolu.
* PRIVATE_KEY — hesabınızdan gelen özel anahtarınız.
* HTTPS_ENDPOINT — [düğümünüzün uç noktası](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Örnek:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

Son adımda yeni oluşturulmuş hash'i kullanarak istediğiniz zaman [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/) üzerinde sözleşmenin devreye alınmasını denetleyebilirsiniz.

:::

## Sözleşmeyi test edin {#test-the-contract}

Sözleşmenin iyi çalışıp çalışmadığını denetlemeniz gerekirse bir `forge test` komutu bulunur. Foundry, daha özel testler için birçok [opsiyon](https://book.getfoundry.sh/reference/forge/forge-test) (bayrak) sağlar. [Foundry'nin belgelerinde](https://book.getfoundry.sh/forge/tests) test yazma, gelişmiş testler ve başka özellikler hakkında daha fazlasını öğrenebilirsiniz.

**Tebrikler! Hello World akıllı sözleşmenizi Polygon'da uyguladınız.**

Polygon ile ilgili daha fazla [<ins>eğitim</ins>](https://docs.chainstack.com/tutorials/polygon/) ve [<ins>araç</ins>](https://docs.chainstack.com/operations/polygon/tools) için Chainstack dosyalarına da bakın.
