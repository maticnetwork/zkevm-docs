---
id: truffle
title: Implante um Contrato Inteligente Usando Truffle
sidebar_label: Using Truffle
description:  Usar a Truffle para implantar um Contrato Inteligente no Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Visão geral {#overview}

A [Truffle](https://trufflesuite.com/) é um ambiente de desenvolvimento de blockchain, que pode usar para criar e testar contratos inteligentes aproveitando a Máquina Virtual Ethereum. Este guia tem como objetivo ensinar como criar um contrato inteligente usando o Truffle e implantá-lo na Rede Polygon compatível com EVM.

:::note

Este tutorial é uma versão adaptada do artigo do [<ins>guia de início rápido da</ins>](https://www.trufflesuite.com/docs/truffle/quickstart) Truffle.

:::

## O que irá fazer {#what-you-will-do}

- Instalar e configurar o Truffle
- Implementar contrato na Rede Polygon
- Verificar o status da implantação no Polygonscan

## Pré-requisitos {#prerequisites}

Existem alguns requisitos técnicos antes de iniciar. Proceda à instalação do seguinte:

- [Node.js v8+ LTS e npm](https://nodejs.org/en/) (empacotado com Node)
- [Git](https://git-scm.com/)

Assim que isso estiver instalado, basta um comando para instalar o Truffle:

```
npm install -g truffle
```

Para verificar se a Truffle está instalada corretamente, `truffle version`digite um terminal. Se vir um erro, certifique-se de que os módulos npm são adicionados ao seu caminho.

## Criar um projeto {#creating-a-project}

### Projeto MetaCoin {#metacoin-project}

Iremos usar um dos conteúdos da Truffle que consta da sua página [Truffle Boxes](https://trufflesuite.com/boxes/). A [MetaCoin box](https://trufflesuite.com/boxes/metacoin/) cria um token que pode ser transferido entre as contas.

1. Comece por criar um novo diretório para este projeto Truffle:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. Faça download da caixa MetaCoin:

  ```bash
  truffle unbox metacoin
  ```

Com essa última etapa, criou pastas de cointaining de projetos do Truffle com contratos, implantação, testes e arquivos de configuração.

Estes são os dados do contrato inteligente do ficheiro `metacoin.sol`:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

Observe que o ConvertLib está a ser importado logo após a instrução `pragma`. Neste projeto existem, na verdade, dois contratos inteligentes que serão implantados no final: um é Metacoin, que tem toda a lógica do envio e saldo, e o outro é o ConvertLib, uma biblioteca usada para converter valores.

:::

### Testar o Contrato {#testing-the-contract}

Pode executar testes de Solidity e Javascript.

1. Num terminal, corra o teste Solidity:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

Deve ver a seguinte saída:

![img](/img/truffle/test1.png)

2. Faça RUN do teste JavaScript:

  ```bash
  truffle test ./test/metacoin.js
  ```

Deve ver a seguinte saída:

![img](/img/truffle/test2.png)

### Compilar o contrato {#compiling-the-contract}

Compilar o contrato inteligente usando o seguinte comando:

```bash
truffle compile
```

Irá obter a seguinte resposta:

![img](/img/truffle/compile.png)

### Configurar o contrato inteligente {#configuring-the-smart-contract}

Antes de efetivamente implantar o contrato, tem de configurar o ficheiro `truffle-config.js` inserindo redes e dados compiladores.

Acesse e `truffle-config.js`atualize o arquivo com detalhes da rede do Polygon Mumbai.

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

Note que ele requer que o mnemonic seja passado para `maticProvider`. Esta é a frase de sementes (ou chave privada) da conta da qual gostaria de implantar. Crie um novo ficheiro `.secret` no diretório ROOT e introduza a sua frase seed mnemónica de 12 palavras para começar. Para obter as palavras de semente da carteira MetaMask, pode ir para configurações do MetaMask e, no menu, escolher **Segurança e Privacidade** onde verá um botão que diz **revelar palavras** de semente.

### Implantação na Rede Polygon {#deploying-on-polygon-network}

Adicione MATIC à sua carteira usando o [Polygon Faucet](https://faucet.polygon.technology/). Em seguida, execute este comando na pasta raiz do diretório do projeto:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

Lembre-se de que `address`os dados `transaction_hash`e outros dados fornecidos seriam diferentes. Acima está apenas uma ideia de uma possível estrutura.

:::

**Parabéns!  Você implantou com sucesso um Contrato Inteligente usando o Truffle.** Agora pode interagir com o contrato e também verificar o status da implantação no [Polygonscan](https://mumbai.polygonscan.com/).
