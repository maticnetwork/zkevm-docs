---
id: eth
title: Guia de Depósito e Retirada de ETH
sidebar_label: ETH
description: "Depositar e retirar tokens ETH na rede da Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### Fluxo de Alto Nível {#high-level-flow}

#### **Depositar ETH (processo de 1 etapa)**

A função de **depósito** deve ser invocada, na qual os tokens são depositados no contrato da Polygon e ficam disponíveis para uso na rede da Polygon.

#### **Transferir ETH**

Assim que tiver fundos na Polygon, pode enviá-los para outros instantaneamente.

#### **Retirada de ETH (processo de 3 etapas)**

1. A retirada de fundos é iniciada na Polygon. É definido um intervalo de 30 minutos (para redes de teste, espera por cerca de 10 minutos), onde todos os blocos da camada de blocos do Polygon são validados desde o último ponto de verificação.
2. Assim que o checkpoint for submetido ao contrato da cadeia principal ERC20, um token de Saída de NFT (ERC721) é criado de valor equivalente.
3. Os fundos retirados podem ser recuperados ao seu account ERC20 do contrato da chain principal usando um procedimento de saída de processos.

## Detalhes de Configuração {#setup-details}

### Configurando o SDK do MATIC {#configuring-matic-sdk}

Instalar SDK Mático (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Iniciando o cliente Maticjs

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

Criar um novo ficheiro no diretório raiz `process.env`nomeado com o seguinte conteúdo:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## depositar {#deposit}

**depósito**: O depósito pode ser feito chamando `depositEther()`o `depositManagerContract`contrato.

Observe que o token precisa ser mapeado e aprovado para transferência previamente.

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

Depósitos do Ethereum ao Polygon ocorrem usando um mecanismo de sincronização de estado e levam cerca de 22-30 minutos. Após aguardar este intervalo de tempo, recomenda-se que verifique o saldo usando a biblioteca web3.js/matic.js ou o MetaMask. O explorador irá mostrar o saldo apenas se tiver ocorrido no mínimo uma transferência de ativo na chain filha. Este [link](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) explica como acompanhar os eventos de depósito.

:::

## transfer {#transfer}

O ETH na rede da Polygon é um WETH (token ERC-20).

```js
const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## Retirada {#withdraw}

### 1. Burn {#1-burn}

Os usuários podem chamar a `withdraw`função do contrato de token `getERC20TokenContract`filho. Esta função deve fazer burn dos tokens. O cliente do Polygon Plasma expõe o `withdrawStart`método para efetuar esta chamada.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

Os usuários podem chamar a `startExitWithBurntTokens()`função do `erc20Predicate`contrato. O cliente do Polygon Plasma expõe o `withdrawConfirm()`método para efetuar esta chamada. Esta função pode ser chamada somente após o checkpoint estar incluído na Mainchain. A inclusão do checkpoint pode ser monitorizada seguindo este [guia](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events).


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. Sair do Processo {#3-process-exit}

Um utilizador deve chamar a `processExits()`função do `withdrawManager`contrato e apresentar a prova de queimadura. Ao enviar provas válidas, os tokens são transferidos para o usuário. O cliente do Polygon Plasma expõe o `withdrawExit()`método para efetuar esta chamada.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Um checkpoint, que é uma representação de todas as transações que ocorrem no Polygon à chain Ethereum a cada ~5 minutos, é submetido regularmente ao contrato da chain principal Ethereum.

:::