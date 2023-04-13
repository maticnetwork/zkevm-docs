---
id: hardhat
title: Distribuzione di uno Smart Contract utilizzando Hardhat
sidebar_label: Using Hardhat
description: Usa Hardhat per distribuire uno Smart Contract su Polygon
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

## Panoramica {#overview}

Hardhat è un ambiente di sviluppo di Ethereum che offre un modo facile per distribuire gli smart contract, eseguire test e debug Il codice Solidity localmente.

In questo tutorial imparerai a configurare Hardhat e a utilizzarlo per costruire, testare e distribuire un semplice smart contract.

### Cosa farai {#what-you-will-do}

- Configurare Hardhat
- Creare un semplice smart contract
- Compilare un contratto
- Testare un contratto
- Implementare un contratto

## Configurare l'ambiente di sviluppo {#setting-up-the-development-environment}

Ci sono alcuni requisiti tecnici da considerare prima di iniziare. Installa quanto segue:

- [Node.js v10+ LTS e npm](https://nodejs.org/en/) (disponibile con Node)
- [Git](https://git-scm.com/)

Una volta installati, è necessario creare un progetto npm andando in una cartella vuota ed eseguendo `npm init`, quindi seguire le istruzioni per installare Hardhat. Una volta che il tuo progetto sia pronto, devi eseguire:

```bash
npm install --save-dev hardhat
```

Per creare il tuo progetto Hardhat, esegui `npx hardhat` nella cartella del progetto. Creiamo il progetto di esempio e seguiamo questi passaggi in modo da provare un'attività di esempio per compilare, testare e distribuire il contratto di esempio.

:::note

Il progetto di esempio qui utilizzato proviene dalla [<ins>guida Quickstart di ------Hardhat</ins>](https://hardhat.org/getting-started/#quick-start) e dalle relative istruzioni.

:::

## Creazione di un progetto {#creating-a-project}

Per creare un progetto di esempio, esegui `npx hardhat` nella cartella del progetto. Dovresti visualizzare il seguente messaggio:

![img](/img/hardhat/quickstart.png)

Scegli il progetto JavaScript e segui questi passaggi per compilare, testare e distribuire il contratto di esempio.

### Controllare il contratto {#checking-the-contract}

La cartella `contracts` contiene `Lock.sol`, che è un esempio di contratto che consiste in un semplice blocco digitale, in cui gli utenti possono prelevare i fondi solo dopo un determinato periodo di tempo.

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

### Configurare il contratto {#setting-up-the-contract}

- Vai a `hardhat.config.js`
- Aggiorna `hardhat-config` con le credenziali della rete matic
- Crea un file `.env` nella root in cui memorizzare la chiave privata
- Aggiungi la chiave API di Polygonscan al file `.env` per verificare il contratto su Polygonscan. Puoi generare una chiave API [creando un account](https://polygonscan.com/register)

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

Nota: il file sopra riportato richiede DOTENV, per la gestione delle variabili d'ambiente e anche Ether ed etherscan. Assicurati di installare tutti i pacchetti.

Trovi ulteriori istruzioni su come utilizzare DOTENV consultando [<ins>questa pagina</ins>](https://www.npmjs.com/package/dotenv).

Puoi distribuire su MATIC (Polygon mainnet) se cambi polygon_mumbai da MATIC

:::

### Compilare il contratto {#compiling-the-contract}

Per compilare il contratto, devi prima installare Hardhat Toolbox:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Quindi, semplicemente esegui per compilare:

```bash
npx hardhat compile
```

### Testare il contratto {#testing-the-contract}

Per eseguire i test con Hardhat, devi semplicemente digitare quanto segue:

```bash
npx hardhat test
```

Questo è un risultato previsto:

![img](/img/hardhat/test.png)

### Distribuzione sulla Polygon Network {#deploying-on-polygon-network}

Esegui questo comando nella directory principale del progetto:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Il contratto sarà distribuito sulla Mumbai Testnet di Matic e puoi controllare lo stato di distribuzione qui: https://mumbai.polygonscan.com/

**Complimenti! Hai distribuito correttamente Greeter Smart Contract. Ora puoi interagire con lo Smart Contract.**

:::tip Verificare rapidamente i contratti su Polygonscan

Esegui i seguenti comandi per verificare rapidamente il tuo contratto su Polygonscan. In questo modo è facile per chiunque vedere il codice sorgente del tuo contratto distribuito. Per i contratti che contengano un costruttore dotato di un elenco di argomenti complessi, leggi [qui](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html).

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
