---
id: overview
title: Visão geral da MetaMask
sidebar_label: Overview
description: Como começar com a MetaMask na Polygon
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

A [MetaMask](https://metamask.io/) é uma carteira cripto que pode ser usada num navegador web e em dispositivos móveis para interagir com a blockchain Ethereum. Permite que faça RUN de DApps (Apps Descentralizadas) na Ethereum diretamente no navegador sem executar um nó Ethereum completo.

**Tipo**: Non-custodial/HD <br/>
**Armazenamento da chave privada**:<br/> Armazenamento no navegador local do utilizador
**Comunicação com a Ethereum Ledger**: Infura <br/>
**Codificação da chave privada**: Mnemónico <br/>

:::warning
Faça backup da **sua frase de recuperação secreta.** Se o dispositivo quebrar, ser perdido, roubado ou tiver corrupção de dados, não há outra maneira de recuperá-lo. A Frase de Recuperação Secreta é a única maneira de recuperar suas contas do MetaMask. Verificar mais **[<ins>Dicas de segurança e segurança básicas para MetaMask</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**.
:::

## Guia para configurar o MetaMask para Polygon {#guide-to-set-up-metamask-for-polygon}

* [Faça o Download e Instale a MetaMask](/develop/metamask/tutorial-metamask.md)
* [Configure a Polygon na MetaMask](/develop/metamask/config-polygon-on-metamask.md)
* [Configurar. Tokens Personalizados](/develop/metamask/custom-tokens.md)
* [Criar e Importar Contas](/develop/metamask/multiple-accounts.md)

### 1. Configurar a Web3 {#1-set-up-web3}

#### Etapa 1 {#step-1}

Instale o seguinte na sua DApp:

  ```javascript
  npm install --save web3
  ```

Crie um ficheiro novo, dê-lhe o nome `web3.js`e insira o seguinte código:

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

O ficheiro acima faz a exportação da função chamada `getWeb3()`— cujo objetivo é solicitar acesso às contas da MetaMask por meio da deteção de um objeto global (`ethereum` ou `web3`) injetado pela MetaMask.

Segundo a [documentação da API da MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes):

> O MetaMask injeta uma API global em sites visitados pelos seus usuários na window.ethereum. Esta API permite que os sites solicitem contas do Ethereum dos usuários, lêem dados de blockchains ao qual o usuário está conectado e sugerem que as mensagens de sinais e transações do usuário. A presença do objeto do provedor indica um usuário Ethereum.

Em termos mais simples, significa basicamente que a extensão/extensão do Metamask está instalada no seu navegador, teria uma variável global definida `ethereum``web3`(para versões mais antigas) e usando esta variável instanciamos o nosso objeto web3.

#### Etapa 2 {#step-2}

Agora, no código do cliente, importa o ficheiro acima:

```js
  import getWeb3 from '/path/to/web3';
```

e faça CALL da função:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. Configurar a conta {#2-set-up-account}

Agora para enviar transações (especificamente aquelas que alteram o estado do blockchain) iremos precisar de uma conta para assinar essas transações. Instanciamos a instância do contrato do objeto web3 que criamos acima:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

A função `getAccounts()` devolve uma lista de todas as contas na MetaMask do utilizador, e `accounts[0]` é a atualmente selecionada pelo utilizador.

### 3. Instanciar os seus contratos {#3-instantiate-your-contracts}

Assim que tivermos o nosso `web3`objeto em vigor, iremos implantar os nossos contratos, assumindo que tenha o seu ABI do contrato e o endereço já instalado:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. Faça CALL das funções {#4-call-functions}

Agora, para qualquer função que queira chamar do seu contrato, interagimos diretamente com o objeto do contrato instanciado `myContractInstance`(declarado na Etapa 2).

:::tip Uma revisão rápida

As funções que alteram o estado do contrato são chamadas `send()`funções. As funções que não alteram o estado do contrato são chamadas `call()`funções.

:::

#### Fazer a CALL de Funções `call()`  {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### Fazer a CALL de Funções `send()`  {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
