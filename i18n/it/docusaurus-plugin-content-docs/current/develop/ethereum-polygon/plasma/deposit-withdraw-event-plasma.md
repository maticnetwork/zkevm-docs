---
id: deposit-withdraw-event-plasma
title: Monitorare gli eventi deposito e checkpoint - Plasma
sidebar_label: Deposit and Checkpoint Event Tracking
description:  "Monitora gli eventi deposito e checkpoint in tempo reale."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Per iniziare, consulta la versione più recente della [documentazione di Matic.js su Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/).

## Eventi deposito {#deposit-events}

Quando un token viene depositato da Ethereum a Polygon, entra in gioco un processo chiamato meccanismo di sincronizzazione dello stato che alla fine esegue il minting dei token dell'utente sulla catena di Polygon. Questo processo richiede circa 22-30 minuti per accadere e quindi l'ascolto dell'evento di deposito è molto importante per creare una buona esperienza utente. Questo è un esempio di script che può essere utilizzato per tracciare gli eventi di deposito in tempo reale.

### Tracciamento degli eventi di deposito in tempo reale tramite una connessione web socket {#realtime-deposit-event-tracking-using-a-web-socket-connection}

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

### Verifica dello storico di completamento del deposito mediante interrogazione della blockchain {#historical-deposit-completion-check-by-querying-the-blockchain}

Questo script può essere utilizzato per verificare se un determinato deposito sia stato completato o meno nella catena figlio. La catena principale e la catena di bambino continuano ad aumentare il valore di una variabile globale di controvalore su entrambe le catene. Il contratto [StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) emette un evento che ha il controvalore. Il controvalore sulla catena figlio può essere interrogato dal contratto [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12). Se il controvalore sulla catena dei bambini è maggiore o uguale allo stesso sulla catena principale, il deposito può essere considerato come completato con successo.

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

## Eventi checkpoint {#checkpoint-events}

### Monitoraggio in tempo reale dello stato del checkpoint {#real-time-checkpoint-status-tracking}

Tutte le transazioni che si verificano sulla catena di Polygon vengono controllate alla catena di Ethereum in intervalli di tempo frequenti dai validatori. Questa volta è di circa 10 minuti su Mumbai e 30 minuti su Polygon mainnet. Il checkpoint si verifica su un contratto denominato contratto RootChain implementato sulla catena di Ethereum. Lo script seguente può essere utilizzato per ascoltare gli eventi di inclusione dei checkpoint in tempo reale.

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

### Controllo storico dell'inclusione del checkpoint mediante interrogazione della blockchain {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

Può essere controllato usando l'API seguente. Il numero di blocco della transazione di ustione sulla catena di bambini deve essere dato come parametro per questa API di GET.

```
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
