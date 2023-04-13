---
id: walletconnect
title: WalletConnect
description: Um protocolo aberto que cria uma comunicação DApp-Wallet.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

O **WalletConnect** é um protocolo aberto - não uma carteira - construído para criar um link de comunicação entre dApps e carteiras. Uma carteira e um aplicativo que suporte este protocolo permitirão um link seguro através de uma chave compartilhada entre dois pares. Inicia-se uma conexão pela DApp que exibe um código QR com um URI WalletConnect padrão, e a ligação é estabelecida quando a aplicação da carteira aprova o pedido da conexão. Outras solicitações relacionadas com a transferência de fundos são confirmadas na própria aplicação wallet.

## Configurar Web3 {#set-up-web3}

Para configurar o seu dApp para se conectar à Carteira Polygon de um usuário, pode usar o provedor do WalletConnect para se conectar diretamente ao Polygon. Instale o seguinte na sua DApp:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Instalar `matic.js`para integração do Polygon:

```bash
$ npm install @maticnetwork/maticjs
```

E adicione o seguinte código no dApp;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

Em seguida, configure o provedor do Polygon e do Ropsten através do objeto do WalletConnect:

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

Criámos os dois objetos do prestador para instanciar o nosso objeto web3 com:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Contratos de Instanciação {#instantiating-contracts}

Assim que tivermos o **objeto web3**, a instanciação de contratos envolve os mesmos passos que para o Metamask. Certifique-se de que tem o **seu contrato ABI** e **endereço** já instalado.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Funções de chamada {#calling-functions}

:::info

A chave privada permanecerá na carteira do usuário e o **aplicativo não a acessa de maneira alguma**.

:::

Temos dois tipos de funções no Ethereum, dependendo da interação com a blockchain. Nós `call()` quando lemos dados e `send()` quando escrevemos dados.

### Fazer a CALL de Funções `call()`  {#functions}

Os dados de leitura não requerem uma assinatura, portanto, o código deve ser assim:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### Fazer a CALL de Funções `send()`  {#functions-1}

Como escrever para o blockchain requer uma assinatura, pedimos que o usuário assine a transação.

Isso envolve três etapas:
1. Construir a transação
2. Obter a assinatura na transação
3. Enviar a transação assinada

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

O código acima cria um objeto da transação que é então enviado à carteira do utilizador para ser assinado:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`a função solicita ao usuário a sua assinatura e `sendSignedTransaction()`envia a transação assinada (retorna um recibo da transação com sucesso).
