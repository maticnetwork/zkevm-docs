---
id: erc20
title: Guia de Depósito e Retirada de ERC-20
sidebar_label: ERC20
description:  "Depositar e retirar tokens ERC-20 na rede da Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

Consulte a [documentação do Matic.js sobre o ERC-20 Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) mais recente para poder começar e para visualizar os métodos atualizados.

### Fluxo de Alto Nível {#high-level-flow}

#### **Depositar ERC-20 (processo de 2 etapas)**

1. Primeiramente, os tokens precisam de ser aprovados no contrato de rootchain da Polygon na chain pai (Ethereum/Goerli).
2. Após a aprovação, a função de **depósito** deve ser invocada quando os tokens são depositados no contrato da Polygon e ficam disponíveis para uso na Polygon.

#### **Transferir ERC-20**

Assim que você tiver fundos na Polygon, pode enviá-los a outros instantaneamente.

#### **Retirada de ERC-20 (processo de 3 etapas)**

1. A retirada de fundos é iniciada na Polygon. É definido um intervalo de 30 minutos (para que as redes de teste esperem cerca de 10 minutos) onde todos os blocos da camada de blocos do Polygon são validados desde o último ponto de verificação.
2. Assim que o checkpoint for submetido ao contrato da cadeia principal ERC20, um token de Saída de NFT (ERC721) é criado de valor equivalente.
3. Os fundos retirados podem ser recuperados ao seu account ERC20 do contrato da chain principal usando um procedimento de saída de processos.

## Detalhes de Configuração {#setup-details}

### Configurando o Polygon Edge {#configuring-polygon-edge}

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

**Aprovar**: Esta é uma aprovação ERC20 normal, então `depositManagerContract`pode chamar a `transferFrom()`função. O cliente do Polygon Plasma expõe o `erc20Token.approve()`método para efetuar esta chamada.

**depositar**: depósitos podem ser realizados chamando **_depositERC20ForUser_** no contrato depositManagerContract.

Observe que o token precisa de estar previamente mapeado e aprovado para transferência.

O método **_erc20Token.deposit_** para fazer este CALL.


```js
const { getPlasmaClient, plasma, from } = require('../utils')

const amount = '1000000000000000000' // amount in wei
const token = plasma.parent.erc20

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token, true)
  const result = await erc20Token.deposit(amount, from)
  const receipt = await result.getReceipt()
  console.log(receipt)
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

:::note

Depósitos do Ethereum ao Polygon ocorrem usando um mecanismo de sincronização de estado e levam cerca de 5-7 minutos. Após aguardar este intervalo de tempo, recomenda-se que verifique o saldo usando a biblioteca web3.js/matic.js ou o MetaMask. O explorador irá mostrar o saldo apenas se tiver ocorrido no mínimo uma transferência de ativo na chain filha. Este [link](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) explica como acompanhar os eventos de depósito.

:::

## transfer {#transfer}

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
    const receipt = await result.getReceipt()
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

Os usuários podem chamar a `withdraw()`função do contrato de token `getERC20TokenContract`filho. Esta função deve fazer burn dos tokens. O cliente do Polygon Plasma expõe o `withdrawStart()`método para efetuar esta chamada.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)
  console.log(await result.getReceipt())
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)

```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

O utilizador pode fazer CALL da função **_startExitWithBurntTokens_** do contrato **_erc20Predicate_**. O cliente Plasma da Polygon expõe o método **_withdrawConfirm_** para fazer este CALL. Esta função pode ser chamada somente após o checkpoint estar incluído na Mainchain. A inclusão do checkpoint pode ser monitorizada seguindo este [guia](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events).


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. Sair do Processo {#3-process-exit}

Um utilizador deve fazer CALL da função **_processExits_** do contrato **_withdrawManager_** e apresentar a prova do burn. Ao enviar provas válidas, os tokens são transferidos para o usuário. O cliente Plasma da Polygon expõe o método **_withdrawExit_** para fazer este CALL.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawExit()
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Um checkpoint, que é uma representação de todas as transações que ocorrem na Rede Polygon à chain ERC20 a cada ~30 minutos, é submetido regularmente ao contrato da chain principal ERC20.

:::