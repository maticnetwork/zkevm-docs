---
id: torus
title: Torus
description: Torus é um sistema de gerenciamento de chaves não custódias para dApps
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

O Torus é um sistema de gerenciamento de chaves sem custo, seguro e sem facilidade de uso para aplicativos descentralizados. Estamos focados em fornecer um gateway para o ecossistema descentralizado aos utilizadores convencionais.

**Tipo**: Não custódia / HD<br/> **Armazenamento de chaves privadas**: armazenamento local do navegador do usuário/criptografado e armazenado em servidores do Torus<br/> **Comunicação com a Ethereum Ledger**: Infura <br/>
**Codificação de chaves privadas**: Mnemonic / Social-Auth-login<br/>

Dependendo das necessidades da aplicação, o Torus pode ser integrado através da Carteira do Torus ou interagindo diretamente com a Rede do Torus através do CustomAuth. Para mais informações, visite a [documentação do Torus](https://docs.tor.us/).

## Integração da carteira do torus {#torus-wallet-integration}

Se a aplicação já for compatível com o MetaMask ou outros provedores da Web3, a integração da Carteira do Torus lhe dará um provedor para envolver a mesma interface do Web3. Pode instalar através de um pacote de npm. Para mais maneiras e informações detalhadas, visite a documentação oficial do Torus sobre [integração](https://docs.tor.us/wallet/get-started) da carteira.

### Instalação {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### Exemplo {#example}

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

## Integração do CustomAuth {#customauth-integration}

Se estiver procurando controlar o seu próprio UX, desde o login até todas as interações, poderá usar o CustomAuth. Pode integrar através de um dos seus SDKs dependendo da plataforma em que está a construir. Para mais informações, visite [integração do Torus CustomAuth](https://docs.tor.us/customauth/get-started).
