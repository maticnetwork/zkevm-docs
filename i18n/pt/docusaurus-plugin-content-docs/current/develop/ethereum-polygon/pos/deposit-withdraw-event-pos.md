---
id: deposit-withdraw-event-pos
title: Rastreamento dos eventos de Check Point e depósito - PoS
sidebar_label: Deposit and Checkpoint Event Tracking
description: "Acompanhe o ritmo e a velocidade das transações na Polygon."
keywords:
  - docs
  - matic
  - deposit
  - checkpoint
image: https://matic.network/banners/matic-network-16x9.png
---

## Resumo Rápido {#quick-summary}

Esta seção dos documentos trata do rastreamento e monitoramento do ritmo e velocidade das transações realizadas no ecossistema do Polygon. O depósito na rede (quando feito com a ponte PoS) normalmente leva uma média de 22-30 minutos, mas vimos instâncias em que os usuários procuram ver relatórios de progresso em tempo real. Como programador, você também pode querer melhorar o UX do aplicativo com feedback instantâneo para o utilizador. Em todos estes casos, esta seção pode ser útil.

## Eventos de Depósito {#deposit-events}

Quando um token é depositado de Ethereum para a Polygon, entra em jogo um processo chamado mecanismo de estado de sincronização, que eventualmente emite os tokens para o utilizador na chain da Polygon. Este processo leva cerca de 22-30 minutos para acontecer e, portanto, ouvir o evento de depósito é muito importante para criar uma boa experiência do usuário. Este é um script de exemplo que pode ser usado para monitorizar eventos de depósito em tempo real.

### Monitorização de eventos de depósito em tempo real utilizando uma conexão websocket {#realtime-deposit-event-tracking-using-a-web-socket-connection}

```jsx
const WebSocket = require("ws");
const Web3 = require("web3");

// For Mumbai
const ws = new WebSocket("wss://ws-mumbai.matic.today/");
// For Polygon mainnet: wss://ws-mainnet.matic.network/
const web3 = new Web3();
const abiCoder = web3.eth.abi;

async function checkDepositStatus(
  userAccount,
  rootToken,
  depositAmount,
  childChainManagerProxy
) {
  return new Promise((resolve, reject) => {
    ws.on("open", () => {
      ws.send(
        `{"id": 1, "method": "eth_subscribe", "params": ["newDeposits", {"Contract": "${childChainManagerProxy}"}]}`
      );

      ws.on("message", (msg) => {
        const parsedMsg = JSON.parse(msg);
        if (
          parsedMsg &&
          parsedMsg.params &&
          parsedMsg.params.result &&
          parsedMsg.params.result.Data
        ) {
          const fullData = parsedMsg.params.result.Data;
          const { 0: syncType, 1: syncData } = abiCoder.decodeParameters(
            ["bytes32", "bytes"],
            fullData
          );

          // check if sync is of deposit type (keccak256("DEPOSIT"))
          const depositType =
            "0x87a7811f4bfedea3d341ad165680ae306b01aaeacc205d227629cf157dd9f821";
          if (syncType.toLowerCase() === depositType.toLowerCase()) {
            const {
              0: userAddress,
              1: rootTokenAddress,
              2: depositData,
            } = abiCoder.decodeParameters(
              ["address", "address", "bytes"],
              syncData
            );

            // depositData can be further decoded to get amount, tokenId etc. based on token type
            // For ERC20 tokens
            const { 0: amount } = abiCoder.decodeParameters(
              ["uint256"],
              depositData
            );
            if (
              userAddress.toLowerCase() === userAccount.toLowerCase() &&
              rootToken.toLowerCase() === rootTokenAddress.toLowerCase() &&
              depositAmount === amount
            ) {
              resolve(true);
            }
          }
        }
      });

      ws.on("error", () => {
        reject(false);
      });

      ws.on("close", () => {
        reject(false);
      });
    });
  });
}

// Param1 - user address
// Param2 - contract address on main chain
// Param3 - amount deposited on main chain
// Param4 - child chain manager proxy address (0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa for mainnet)
checkDepositStatus(
  "0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C",
  "0x47195A03fC3Fc2881D084e8Dc03bD19BE8474E46",
  "1000000000000000000",
  "0xb5505a6d998549090530911180f38aC5130101c6"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

### Histórico de verificação de conclusão de depósitos através de consulta da blockchain {#historical-deposit-completion-check-by-querying-the-blockchain}

Este script pode ser usado para verificar se um depósito em particular foi concluído na chain filha ou não. A chain principal e a chain filha continuam a incrementar o valor de uma variável global contrária em ambas as chains. O contrato [StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) emite um evento que tem o valor contrário. O valor contrário na chain filha pode ser consultado a partir do contrato do [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12). Se o valor do contador na chain de crianças for maior ou igual ao mesmo na chain principal, então o depósito pode ser considerado como concluído com sucesso.

```jsx
let Web3 = require("web3");

// For mainnet, use Ethereum RPC
const provider = new Web3.providers.HttpProvider(
  "https://goerli.infura.io/v3/API-KEY"
);
const web3 = new Web3(provider);

// For mainnet, use the Polygon mainnet RPC: <Sign up for a dedicated free RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.>
const child_provider = new Web3.providers.HttpProvider(
  "<insert Mumbai testnet RPC URL>" //Get a free RPC URL from https://rpc.maticvigil.com/ or other hosted node providers.
);

const child_web3 = new Web3(child_provider);

const contractInstance = new child_web3.eth.Contract(
  [
    {
      constant: true,
      inputs: [],
      name: "lastStateId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
  "0x0000000000000000000000000000000000001001"
);

async function depositCompleted(txHash) {
  let tx = await web3.eth.getTransactionReceipt(txHash);
  let child_counter = await contractInstance.methods.lastStateId().call();
  let root_counter = web3.utils.hexToNumberString(tx.logs[3].topics[1]);
  return child_counter >= root_counter;
}

// Param 1 - Deposit transaction hash
depositCompleted(
  "0x29d901174acd42d4651654a502073f3c876ff85b7887b2e2634d00848f6c982e"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Eventos de Checkpoint {#checkpoint-events}

### Monitorização do status do checkpoint em tempo real {#real-time-checkpoint-status-tracking}

Todas as transações que ocorrem na chain Polygon são assinaladas para a chain Ethereum em intervalos frequentes de tempo pelos validadores. Desta vez é de cerca de 10 minutos em Mumbai e cerca de 30 minutos no Polygon Mainnet. O ponto de verificação ocorre num contrato chamado `RootChainContract`implantado na chain Ethereum. O script seguinte pode ser usado para escutar eventos de inclusão de checkpoint em tempo real.

```js
const Web3 = require("web3");

// Ethereum provider
const provider = new Web3.providers.WebsocketProvider(
  "wss://goerli.infura.io/ws/v3/api-key"
);

const web3 = new Web3(provider);

// Sign up for a free dedicated RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.
const chil_provider = new Web3.providers.HttpProvider(
  "<insert Mumbai testnet RPC URL>"
);
const child_web3 = new Web3(chil_provider);

// txHash - transaction hash on Polygon
// rootChainAddress - root chain proxy address on Ethereum
async function checkInclusion(txHash, rootChainAddress) {
  let txDetails = await child_web3.eth.getTransactionReceipt(txHash);

  block = txDetails.blockNumber;
  return new Promise(async (resolve, reject) => {
    web3.eth.subscribe(
      "logs",
      {
        address: rootChainAddress,
      },
      async (error, result) => {
        if (error) {
          reject(error);
        }

        console.log(result);
        if (result.data) {
          let transaction = web3.eth.abi.decodeParameters(
            ["uint256", "uint256", "bytes32"],
            result.data
          );
          if (block <= transaction["1"]) {
            resolve(result);
          }
        }
      }
    );
  });
}

// Param1 - Burn transaction hash on child chain
// Param2 - RootChainProxy Address on root chain (0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287 for mainnet)
checkInclusion(
  "0x9d1e61d9daaa12fcd00fcf332e1c06fd8253a949b4f2a4741c964454a67ea943",
  "0x2890ba17efe978480615e330ecb65333b880928e"
)
  .then((res) => {
    console.log(res);
    provider.disconnect();
  })
  .catch((err) => {
    console.log(err);
  });
```

### Histórico de verificação de inclusão de checkpoint através de consulta da blockchain {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

Isto pode ser verificado usando a seguinte API. O número de blocos da transação de queimadura na chain de filhos tem de ser fornecido como parâmetro para esta API GET.

```js
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
