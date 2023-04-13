---
id: deposit-withdraw-event-plasma
title: Seguimiento de eventos de depósito y punto de control - Plasma
sidebar_label: Deposit and Checkpoint Event Tracking
description:  "Síguele la pista en tiempo real a los eventos de depósito y de punto de control."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Para empezar, revisa la última [documentación de Matic.js en Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/).

## Eventos de depósito {#deposit-events}

Cuando se deposita un token desde Ethereum a Polygon, entra en escena un proceso llamado mecanismo de sincronización de estado que finalmente acuña los tokens para el usuario en la cadena de Polygon. Este proceso tarda unos 22 a 30 minutos en suceder, y por lo tanto, escuchar el evento de depósito es muy importante para crear una buena experiencia de usuario. Esta es una secuencia de comandos de ejemplo que se puede utilizar para hacerle seguimiento a los eventos de depósito en tiempo real.

### Seguimiento de eventos de depósito en tiempo real mediante una conexión de websocket {#realtime-deposit-event-tracking-using-a-web-socket-connection}

```jsx
const WebSocket = require("ws");
const _ = require("lodash");

// For Mumbai
const ws = new WebSocket("wss://ws-mumbai.matic.today/");
// For Polygon mainnet: wss://ws-mainnet.matic.network/

async function checkDepositStatus(user, token, childChain) {
  return new Promise((resolve, reject) => {
    ws.on("open", function open() {
      ws.send(
        `{"id": 1, "method": "eth_subscribe", "params": ["newDeposits", {"Contract": "${childChain}"}]}`
      );
      ws.on("message", function incoming(data) {
        var txData = _.get(JSON.parse(data), "params.result.Data", "");
        var userAddress = txData.substring(0, 64).replace(/^0+/, "0x");
        var contractAddress = txData.substring(65, 128).replace(/^0+/, "0x");

        if (
          user &&
          user.toLowerCase() === userAddress.toLowerCase() &&
          token &&
          token.toLowerCase() === contractAddress.toLowerCase()
        ) {
          console.log(data);
          resolve(true); // eslint-disable-line
        }
      });

      ws.on("close", () => {
        reject(false);
      });

      ws.on("error", () => {
        reject(false);
      });
    });
  });
}

// Param1 - user address
// Param2 - contract address on main chain
// Param3 - child chain address (0xD9c7C4ED4B66858301D0cb28Cc88bf655Fe34861 for mainnet)
checkDepositStatus(
  "0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C",
  "0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae",
  "0x1EDd419627Ef40736ec4f8ceffdE671a30803c5e"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

### Revisión histórica de finalización de depósitos mediante consultas a la cadena de bloques {#historical-deposit-completion-check-by-querying-the-blockchain}

Esta secuencia de comandos sirve para comprobar si un depósito determinado se completó en la cadena secundaria. La cadena principal y la cadena infantil siguen aumentando el valor de una variable global de contadores en ambas cadenas. El contrato -[StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) emite un evento que tiene el valor del contador. El valor del contador en la cadena secundaria puede ser consultado desde el contrato [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12). Si el valor de contador en la cadena infantil es mayor o igual que el en la cadena principal, el depósito se puede considerar como se completa con éxito.

```js
let Web3 = require("web3");

// For mainnet, use Ethereum RPC
const provider = new Web3.providers.HttpProvider(
  "https://goerli.infura.io/v3/API-KEY"
);
const web3 = new Web3(provider);

// For mainnet, use the Polygon mainnet RPC: <Sign up for a dedicated free RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.>
const child_provider = new Web3.providers.HttpProvider(
  "<insert Mumbai testnet RPC URL>" //get a free RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.
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

## Eventos de punto de control {#checkpoint-events}

### Seguimiento del estado del punto de control en tiempo real {#real-time-checkpoint-status-tracking}

Todas las transacciones que se producen en la cadena de Polygon son señaladas a la cadena Ethereum en intervalos frecuentes de tiempo por los validadores. Esta vez, se encuentra a unos 10 minutos en Mumbai y 30 minutos en  . El punto de control se produce en un contrato llamado RootChain (Cadena primaria) desplegado en la cadena de Ethereum. La siguiente secuencia de comandos se puede utilizar para escuchar los eventos de inclusión en el punto de control en tiempo real.

```jsx
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

### Comprobación de inclusión histórica en el punto de control mediante consultas a la cadena de bloques {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

Eso se puede comprobar mediante la siguiente API. El número de bloque de la transacción de quemado en la cadena infantil se debe dar como un parámetro a esta API .

```
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
