---
id: portis
title: Portis
description: Uma carteira baseada na web construída a pensar numa integração fácil do utilizador.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

A Portis é uma carteira baseada na web construída a pensar numa integração fácil do utilizador. Vem com um SDK javascript que se integra na DApp e cria uma experiência local sem carteira para o utilizador. Além disso, ele lida com a configuração da carteira, transações e taxas de gás.

Tal como a MetaMask, é não-custodial — os utilizadores controlam as suas chaves, e a Portis apenas as guarda de forma segura. Mas, ao contrário da MetaMask, está integrada na aplicação e não no navegador. Os utilizadores têm as suas chaves associadas à sua identificação de login e senhas.

**Tipo**: Non-custodial/HD <br/>
**Armazenamento de chaves privadas**: criptografado e armazenado em servidores Portis<br/> **Comunicação ao Ethereum Ledger**: Definido pelo desenvolvedor<br/> **Codificação da chave privada**: Mnemónico <br/>

## Configurar Web3 {#set-up-web3}

Instalar o Portis no seu dApp:

```js
npm install --save @portis/web3
```

Agora, registre o seu dApp com o Portis para obter um ID do dApp usando o [Painel do Portis](https://dashboard.portis.io/).

Importação `portis`e `web3`objetos:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

O construtor de Portis aceita o primeiro argumento como ID do dApp e o segundo argumento como a rede com a qual gostaria de se conectar. Isto tanto pode ser uma string como um objeto.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## Configurar conta {#set-up-account}

Se a instalação e a instanciação da web3 forem bem sucedidas, o seguinte deve devolver a conta conectada com êxito:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Contratos de Instanciação {#instantiating-contracts}

É assim que devemos instanciar contratos:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Funções de chamada {#calling-functions}

### `call()`Função de chamada {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### `send()`Função de chamada {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
