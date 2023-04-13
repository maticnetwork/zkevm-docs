---
id: chainstack
title: Distribuzione uno Smart Contract utilizzando Chainstack e Foundry
sidebar_label: Using Chainstack
description:  Usa Chainstack e Foundry per sviluppare uno Smart Contract su Polygon
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Panoramica {#overview}

Questa sezione ti guida attraverso l'implementazione di un contratto Hello World utilizzando [Chainstack](https://chainstack.com/build-better-with-polygon/) e [Foundry](https://github.com/gakonst/foundry/) sulla testnet di Polygon Mumbai.

Chainstack fornisce infrastrutture per le applicazioni basate su Ethereum e altre blockchains. Mantengono nodi e garantiscono la loro connessione alla rete e offrono anche un'interfaccia per interagire con le mainnet e le testnet.

Foundry è un kit di strumenti veloce per lo sviluppo di applicazioni Ethereum scritte in Rust. Fornisce test, interazione con gli smart contract EVM, invio di transazioni e il recupero dei dati blockchain.

:::tip

Se hai domande, raggiungi il server [<ins>Discord di</ins>](https://discord.com/invite/Cymtg2f7pX) Chainstack.

:::

## Cosa imparerai {#what-you-will-learn}

Crea un contratto Hello World utilizzando Chainstack per implementare un nodo Polygon e Foundry per implementare il contratto.

## Cosa farai {#what-you-will-do}

1. Implementa un nodo Polygon usando Chainstack
2. Configura Foundry
3. Crea lo smart contract
4. Implementa lo smart contract

## Implementa un nodo Polygon Mumbai {#deploy-a-polygon-mumbai-node}

Hai bisogno di un nodo per distribuire uno smart contract alla rete di blockchain. Segui i passaggi sottostanti per ottenere il tuo nodo in funzione:

**Passo 1 →** Iscriviti con [Chainstack](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

**Passo 2 →** Seguire le istruzioni su come [distribuire un nodo Mumbai](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)

![img](/img/chainstack/join-network.png)

**Passo 3 →** Ottieni [l'endpoint HTTPS del nodo distribuito](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## Installa Foundry {#install-foundry}

Foundry è un kit di strumenti di sviluppo per lavorare con gli smart contract. Per iniziare a utilizzarlo, devi prima installare il linguaggio di programmazione Rust.

1. [Installa Rust](https://www.rust-lang.org/tools/install).
1. [Installa Foundry](https://github.com/gakonst/foundry/).

## Inizializza con Foundry {#initialize-with-foundry}

Per creare un progetto standard, vai alla tua directory di lavoro ed esegui:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## Ricarica il tuo account {#fund-your-account}

Per implementare lo smart contract, devi disporre di un wallet account. Per questo, puoi usare [Metamask](https://metamask.io/). Per implementare il contratto devi anche pagare la gas fee della rete. Basta copiare il tuo indirizzo del wallet e ottenere Mumbai MATIC token [attraverso il rubinetto](https://faucet.polygon.technology/).

## Crea il contratto Hello World {#create-the-hello-world-contract}

Nel progetto Foundry inizializzato in `src/`, crea `HelloWorld.sol`:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## Implementa il contratto {#deploy-the-contract}

A questo punto, è tutto pronto per implementare il contratto:

* Disponi di un nodo sulla rete Polygon Mumbai tramite il quale implementerai il contratto.
* Hai Foundry che utilizzerai per implementare il contratto.
* Hai un account con fondi che implementerà il contratto.

Per implementare il contratto, esegui:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

Qui,

* CONTRACT_PATH - il percorso del tuo file `HelloWorld.sol`.
* PRIVATE_KEY - la chiave privata del tuo account.
* HTTPS_ENDPOINT - [l'endpoint del tuo nodo](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Esempio:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

Puoi sempre controllare l'implementazione del contratto su [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/) utilizzando l'hash appena generato dall'ultimo passaggio.

:::

## Verifica il contratto {#test-the-contract}

Utilizza il comando `forge test` per verificare se il contratto funzioni correttamente. Foundry offre molte [opzioni](https://book.getfoundry.sh/reference/forge/forge-test) (flag) per test più specifici. Per ulteriori informazioni sulla scrittura di test, sui test avanzati e su altre funzionalità, consulta la [documentazione di Foundry](https://book.getfoundry.sh/forge/tests).

**Complimenti! Hai implementato il tuo smart contract Hello World su Polygon.**

Per ulteriori informazioni sui [<ins>tutorial</ins>](https://docs.chainstack.com/tutorials/polygon/) e sugli [<ins>strumenti</ins>](https://docs.chainstack.com/operations/polygon/tools) di Polygon, puoi anche consultare la documentazione di Chainstack.
