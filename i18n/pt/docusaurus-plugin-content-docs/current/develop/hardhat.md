---
id: hardhat
title: Implante um Contrato Inteligente usando Hardhat
sidebar_label: Using Hardhat
description: Usar o Hardhat para implantar um Contrato Inteligente no Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Visão geral {#overview}

O Hardhat é um ambiente de desenvolvimento do Ethereum que fornece uma maneira fácil de implantar contratos inteligentes, executar testes e depurar o código do Solidity localmente.

Neste tutorial irá aprender a configurar a Hardhat e usá-la para construir, testar e implantar um contrato inteligente.

### O que irá fazer {#what-you-will-do}

- Configurar a Hardhat
- Criar um smart contract simples
- Compilar um contrato
- Testar um contrato
- Implantar um contrato

## Configurar o ambiente de desenvolvimento {#setting-up-the-development-environment}

Existem alguns requisitos técnicos antes de iniciar. Proceda à instalação do seguinte:

- [Node.js v10+ LTS NPM e npm](https://nodejs.org/en/) (vem com Node)
- [Git](https://git-scm.com/)

Assim que isso estiver instalado, é necessário criar um projeto NPM indo a uma pasta vazia, executando `npm init` e seguindo as instruções para instalar a Hardhat. Assim que o seu projeto estiver pronto, deve executar:

```bash
npm install --save-dev hardhat
```

Para criar o seu projeto Hardhat, deve executar `npx hardhat`na pasta do seu projeto.
Vamos criar um projeto como exemplo e percorrer as etapas para testar um exemplo de tarefa e compilar, testar e implantar o contrato de exemplo.

:::note

O projeto de amostra usado aqui vem do [<ins>Guia de Iniciação Hardhat</ins>](https://hardhat.org/getting-started/#quick-start), bem como as suas instruções.

:::

## Criar um projeto {#creating-a-project}

Para criar um projeto de amostra, execute `npx hardhat`na pasta do seu projeto. Deverá ver o seguinte aviso:

![img](/img/hardhat/quickstart.png)

Escolha o projeto JavaScript e percorra estas etapas para compilar, testar e implantar o contrato de exemplo.

### Verificar o contrato {#checking-the-contract}

A pasta `contracts` contém `Lock.sol`, que é um contrato de exemplo que consiste num bloqueio digital simples, onde os utilizadores só podiam retirar fundos após um determinado período.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### Configurar o contrato {#setting-up-the-contract}

- Vá a `hardhat.config.js`
- Atualizar o  `hardhat-config`com as credenciais matic-network
- Criar um ficheiro `.env` na ROOT para armazenar a sua chave privada
- Adicione a chave API ao ficheiro `.env` para verificar o contrato na Polygonscan. Pode gerar uma chave API [criando uma conta](https://polygonscan.com/register)

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

Note que o ficheiro acima requer DOTENV, para gerir as variáveis do ambiente e também ethers e etherscan. Certifique-se de que instala todos esses pacotes.

Consulte mais instruções [<ins>sobre</ins>](https://www.npmjs.com/package/dotenv) a forma de usar a DOTENV nesta página.

Pode implantar no MATIC(Polygon mainnet) se alterar o polygon_mumbai pelo MATIC

:::

### Compilar o contrato {#compiling-the-contract}

Para compilar o contrato, deve primeiro instalar a Toolbox Hardhat:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Em seguida, faça RUN para compilar:

```bash
npx hardhat compile
```

### Testar o Contrato {#testing-the-contract}

Para fazer testes com a Hardhat, basta digitar o seguinte:

```bash
npx hardhat test
```

E este é um resultado esperado:

![img](/img/hardhat/test.png)

### Implantação na Rede Polygon {#deploying-on-polygon-network}

Execute este comando na ROOT do diretório do projeto:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

O contrato será implantado na Testnet Mumbai da MATIC e pode verificar o estado da implantação aqui: https://mumbai.polygonscan.com/

**Parabéns! O utilizador implantou o Smart Contract Greeter com êxito. Agora pode interagir com o Smart Contract.**

:::tip Verifique os contratos rapidamente na Polygonscan

Execute os seguintes comandos para verificar rapidamente o contrato na Polygonscan. Isto torna mais fácil para qualquer pessoa ver o código fonte do seu contrato implantado. Para contratos que tenham um construtor com uma lista de argumentos complexa, veja [aqui](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html).

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
