---
id: fortmatic
title: Fortmatic
description: DApp ile Polygon ile entegre etmek için Formatic SDK kullanın
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK, dApp'inizi Ethereum blok zinciriyle kolayca entegre etmenizi sağlar; bu sayede Web3 ile entegre edilmiş bir dApp veya sıfırdan başlama imkanı elde edilir. Fortmatic hem siz hem de merkezi olmayan uygulama kullanıcılarınız için pürüzsüz ve keyifli bir deneyim sunar.

## Kurulum {#installation}

Fortmatic's cüzdan en son sürümünü yüklemek için aşağıdaki komutu kullanın:

```bash
$ npm i --save fortmatic@latest
```

## Örnek {#example}
İşte Fortmatic kullanarak bir uygulama örneği:

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
