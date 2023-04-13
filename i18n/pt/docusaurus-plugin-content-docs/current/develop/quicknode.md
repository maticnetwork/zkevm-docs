---
id: quicknode
title: Implante um Contrato Inteligente Usando QuickNode
sidebar_label: Using QuickNode
description:  Implante Contratos Inteligentes no Polygon usando o Brownie e o Quicknode.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Visão geral {#overview}

O Python é uma das linguagens de programação mais versáteis; desde pesquisadores que executam seus modelos de teste até desenvolvedores que o usam em ambientes de produção pesada, ele tem casos de uso em todos os campos técnicos possíveis.

Neste tutorial, aprenderá como usar a estrutura do [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) para escrever e implantar um contrato inteligente aproveitando os nós do testnet do [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) para o Polygon.

:::tip

Para contactar a equipa da Quicknode, envie uma mensagem ou faça tag no Twitter [@QuickNode](https://twitter.com/QuickNode).

:::

## Pré-requisitos {#prerequisites}

- Python3
- Um nó do Polygon
- Editor de código
- Interface da linha de comandos

## O que irá fazer {#what-you-will-do}

1. Configurar a Brownie
2. Obter acesso aos nós de teste da Quicknode
3. Compilar e implantar um contrato inteligente
4. Verificar os dados do contrato implantados

## O que é a Brownie? {#what-is-brownie}

A programação de contratos inteligentes é maioritariamente dominada pelas bibliotecas baseadas em JavaScript, como [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [truffle](https://www.trufflesuite.com/docs/truffle/) e [Hardhat](https://hardhat.org/). Python é uma linguagem versátil e altamente utilizada e também pode ser usada para contratos inteligentes / desenvolvimento da Web3; o [web3.py](https://web3py.readthedocs.io/en/stable/) é uma biblioteca Python atraente que atende às necessidades da Web3. O quadro do Brownie é construído em cima de `web3.py`.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) é uma arquitetura baseada em Python para desenvolver contratos inteligentes de teste. Brownie suporta tanto os contratos Solidity como Vyper e também oferece testes de contrato via [pytest](https://github.com/pytest-dev/pytest).

Para demonstrar o processo de escrita e implantação de um contrato inteligente com a Brownie usamos [Brownie-mixes](https://github.com/brownie-mix), que são projetos modelo. Mais especificamente, usaremos um [token mix](https://github.com/brownie-mix/token-mix), um modelo de implementação do ERC-20.

## Instalar dependências {#install-dependencies}

O Brownie é construído em cima do python3, então precisamos dele instalado para trabalhar com o Brownie. Vamos verificar se temos o python3 instalado no nosso sistema. Para tal, digite o seguinte na ferramenta da linha de comandos:

```bash
python3 -V
```

Deverá devolver a versão da python3 instalada. Se não estiver instalada, faça o seu download e instalação a partir do [website oficial da python](https://www.python.org/downloads/).

Vamos criar um diretório de projeto antes de instalar a Brownie, e tornar esse diretório de projeto no nosso diretório de trabalho atual:

```bash
mkdir brownieDemo
cd brownieDemo
```

Agora que já instalou a python3 no seu sistema, vamos instalar a brownie usando pip, o gestor de pacotes da Python. Pip é semelhante à NPM do JavaScript. Digite o seguinte na linha de comandos:

```bash
pip3 install eth-brownie
```

:::tip

Se a instalação falhar, pode usar o seguinte comando:`sudo pip3 install eth-brownie`

:::

Para verificar se o Brownie foi instalado corretamente, `brownie`digite a linha de comandos e ele deve dar a seguinte saída:

![img](/img/quicknode/brownie-commands.png)

Para obter o mixar de token, basta digitar o seguinte na linha de comandos:

```
brownie bake token
```

Isto irá criar um novo diretório `token/`no nosso `brownieDemo`diretório.

### Arquitetura do ficheiro {#file-structure}

Em primeiro lugar, navegue para o `token`diretório:

```bash
cd token
```

Agora, abra o `token`diretório no editor de texto. Na `contracts/`pasta que encontrará , `Token.sol`qual é o nosso contrato principal. Pode escrever os seus próprios contratos ou modificar o `Token.sol`ficheiro.

Na `scripts/`pasta, encontrará o script do `token.py`Python. Este script será usado para implantar o contrato e são necessárias modificações com base nos contratos.

![img](/img/quicknode/token-sol.png)

O contrato é um contrato ERC-20. Pode saber mais sobre os padrões e contratos do ERC-20 neste [guia nos tokens](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) ERC-20.

## Iniciar o nó do Polygon {#booting-your-polygon-node}

O QuickNode tem uma rede global de nós do Polygon Mainnet e do testnet de Mumbai. Eles também executam um [Polygon RPC público](https://docs.polygon.technology/docs/operate/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) gratuito, mas se tiver uma taxa limitada, pode inscrever-se num [nó de avaliação gratuita do QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

![img](/img/quicknode/http_URL.png)

Copie o **URL HTTP**, que será útil mais tarde no tutorial.

## Configuração da rede e da conta {#network-and-account-setup}

Temos de configurar o nosso endpoint do QuickNode com a Brownie. Para tal, digite o seguinte na linha de comandos:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Substituir `YOUR_QUICKNODE_URL`o **URL HTTP do Testnet de Mumbai** que acabamos de receber ao iniciar o nosso nó Polygon.

No comando acima, `Ethereum` é o nome do ambiente e `matic_mumbai` é o nome personalizado da rede; pode atribuir qualquer nome à sua rede personalizada.

A próxima coisa que precisamos fazer é criar uma nova carteira usando o Brownie, para fazer isso digite o seguinte na linha de comandos:

```
brownie accounts generate testac
```

Será solicitado que configure uma senha para a sua conta! Depois de concluir as etapas, isso irá gerar uma conta junto com uma frase mnemônica, e salvá-la offline. O nome `testac`é o nome da nossa conta (pode escolher qualquer nome que gosta).

![img](/img/quicknode/new-account.png)

:::note

As frases Mnemônicas podem ser usadas para recuperar uma conta ou importar a conta para outras [<ins>carteiras não non-custodial</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode) A conta que vê na imagem acima foi criada apenas para este guia.

:::

Copie o endereço da conta para que possamos obter algum teste do MATIC, que será necessário para implantar nosso contrato.

## Obter Testnet MATIC {#getting-testnet-matic}

Precisaremos de alguns tokens do teste MATIC para pagar taxas de gás para implantar nosso contrato inteligente.

Copie o endereço da sua conta que geramos neste tutorial, cole-o no campo de endereço da [faucet Polygon](https://faucet.polygon.technology/) e clique em **Enviar**. O faucet irá enviar-lhe o MATIC teste 0.2.

![img](/img/quicknode/faucet.png)

## Implantar o seu Contrato Inteligente {#deploying-your-smart-contract}

Antes de implantar o contrato, é necessário compilá-lo usando:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

Agora abra `scripts/token.py`o editor de texto e faça as seguintes alterações:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info Explicação

Usando o código acima, importamos a `testac`conta que criamos anteriormente e a armazenamos na `acct`variável. Além disso, na próxima linha, temos uma parte `'from':`editada para receber dados da `acct`variável.

:::

Por fim, implantaremos nosso contrato inteligente:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`é o nome da rede personalizada que criamos anteriormente. O prompt pedir-lhe-á a **senha** que definimos anteriormente ao fazer a conta.

Depois de executar o comando acima, deve obter o hash da transação e a Brownie irá aguardar que a transação seja confirmada. Assim que a transação for confirmada, irá devolver o endereço no qual o nosso contrato está implantado na testnet Mumbai da Polygon.

![img](/img/quicknode/brownie-run.png)

Pode verificar o contrato implantado ao copiar e colar o endereço do contrato em [Polygonscan Mumbai](https://mumbai.polygonscan.com/).

![img](/img/quicknode/polygonscan.png)

## Testar o Contrato {#testing-the-contract}

A Brownie também oferece uma opção para testar funcionalidades dos contratos inteligentes. Usa a arquitetura `pytest` para gerar testes unitários facilmente. Pode encontrar informações sobre a escrita de testes na Bronwnie [na sua documentação](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#).

**É assim que os contratos são implantados na Polygon usando a Brownie e a QuickNode.**

O QuickNode, assim como o Polygon, sempre teve uma abordagem na primeira educação que fornece [guias](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) de desenvolvedores, [documentos](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [vídeos tutoriais](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) e uma [comunidade de desenvolvedores Web3](https://discord.gg/DkdgEqE) que estão ansiosos para se ajudar.
