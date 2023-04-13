---
id: torus
title: Torus
description: Torus dApps için bir gözetim altında olmayan bir anahtar yönetim sistemidir
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus, merkezi olmayan uygulamalar için kullanıcı dostu, güvenli ve gözetimsiz bir anahtar yönetim sistemidir. Ana akım kullanıcılara merkezi olmayan ekosistem için bir geçiş kapısı sunmaya odaklandık.

**Türü**: Gözetim dışı / HD<br/> **Özel Anahtar Depolama**: Kullanıcının yerel tarayıcı depolama alanı / Torus sunucularında şifreli ve depolanan<br/> **Ethereum Ledger ile İletişim**: Infura <br/>
**Özel anahtar kodlaması**: Mnemonic / Social-Auth-Login<br/>

Uygulama ihtiyaçlarınıza bağlı olarak Torus Torus Cüzdan üzerinden veya CustomAuth üzerinden Torus Ağı ile doğrudan etkileşim kurarak entegre edilebilir. Daha fazla bilgi için [Torus](https://docs.tor.us/) belgesini ziyaret edin.

## Torus Cüzdan Entegrasyonu {#torus-wallet-integration}

Uygulamanız MetaMask veya diğer Web3 sağlayıcıları ile uyumlu ise, Torus Cüzdanını entegre etmek size aynı Web3 arayüzünü sarmak için bir sağlayıcı verecektir. Bir npm paketi üzerinden kurabilirsiniz. Daha fazla yol ve derinlemesine bilgi için lütfen [cüzdan entegrasyonu](https://docs.tor.us/wallet/get-started) ile ilgili resmi Torus belgelerini ziyaret edin.

### Kurulum {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### Örnek {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## CustomAuth Entegrasyonu {#customauth-integration}

Eğer giriş çıkışından her etkileşime kadar kendi your kontrol etmek istiyorsanız, CustomAuth kullanabilirsiniz. Oluşturduğunuz platformlara bağlı olarak of biri ile entegre edebilirsiniz. Daha fazla bilgi için [lütfen Torus CustomAuth entegrasyonunu](https://docs.tor.us/customauth/get-started) ziyaret edin.
