---
id: alchemy
title: Distribuire uno Smart Contract utilizzando Alchemy
sidebar_label: Using Alchemy
description: Guida alla distribuzione degli smart contract utilizzando Alchemy
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Panoramica {#overview}

Questo tutorial è rivolto agli sviluppatori che non hanno familiarità con lo sviluppo della blockchain di Ethereum o che vogliono comprendere i fondamenti dell'implementazione e dell'interazione con gli smart contract. Ti guiderà alla creazione e alla distribuzione di uno smart contract sulla rete di test Polygon Mumbai utilizzando un wallet di criptovaluta ([Metamask](https://metamask.io)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), e [Alchemy](https://alchemy.com/?a=polygon-docs).

:::tip

Se hai domande o preoccupazioni, ti invitiamo a contattare il team di Alchemy tramite il server [<ins>ufficiale di</ins>](https://discord.gg/gWuC7zB) Discord.

:::

## Cosa imparerai {#what-you-will-learn}

Al fine di creare uno smart contract, in questo tutorial imparerai come utilizzare la piattaforma di Alchemy per:
- Creare un'applicazione smart contract
- Controllare il saldo di un wallet
- Verifica le chiamate dei contratti in un blockchain explorer

## Cosa farai {#what-you-will-do}

Seguendo il tutorial, potrai:
1. Iniziare a creare un'app su Alchemy
2. Creare un indirizzo di wallet con Metamask
3. Aggiungi il saldo al wallet (utilizzando i token di test)
4. Utilizzere Hardhat ed Ethers.js per compilare e implementare il progetto
5. Verifica lo stato del contratto sulla piattaforma di Alchemy

## Crea e distribuisce il tuo Smart Contract {#create-and-deploy-your-smart-contract}

### Connettiti alla rete Polygon {#connect-to-the-polygon-network}

Esistono diversi modi per inviare richieste alla catena PoS di Polygon. Anziché eseguire il tuo nodo, utilizzerai un account gratuito sulla piattaforma per sviluppatori di Alchemy e interagirai con l'API Alchemy Polygon PoS per comunicare con la catena PoS di Polygon. La piattaforma è costituita da una suite completa di strumenti per lo sviluppo: questa include la possibilità di monitorare le richieste, le analisi di dati che dimostrano ciò che accade durante la cappa durante la distribuzione degli smart contract, le API migliorate (Transact, NFT, etc) e una SDK di ethers.js.

Se non hai già un account Alchemy, inizia con la firma per un account gratuito [qui](https://www.alchemy.com/polygon/?a=polygon-docs). Una volta creato il tuo account, avrai la possibilità di creare immediatamente la tua prima app prima di accedere alla dashboard.

![img](/img/alchemy/alchemy-dashboard.png)

### Crea la tua App (e la chiave API) {#create-your-app-and-api-key}

Dopo aver creato un account Alchemy, dovrai generare una chiave API creando un'applicazione, che autentica le richieste avanzate al testnet Polygon Mumbai. Se non hai familiarità con le testnet, dai un'occhiata a [questa guida sulle testnet](https://docs.alchemyapi.io/guides/choosing-a-network).

Per generare una nuova chiave delle API, passa alla scheda **App** nella barra di navigazione del dashboard di Alchemy e seleziona la sub-tab. **Crea** App.

![img](/img/alchemy/create-app.png)

Nominare la tua nuova app **Hello World**, offre una breve descrizione, seleziona **Polygon** per la catena e scegli **Polygon Mumbai** per la tua rete.

Infine, clicca su **Crea app**. La tua nuova app dovrebbe apparire nella tabella sottostante.

### Creare un indirizzo Wallet {#create-a-wallet-address}

Polygon PoS è una soluzione di scaling 2 per Ethereum. Pertanto, abbiamo bisogno di un wallet Ethereum e di aggiungere un URL personalizzato di Polygon per inviare e ricevere le transazioni sulla testnet di Polygon Mumbai. Per questo tutorial utilizzeremo MetaMask, un wallet di criptovaluta compatibile con il browser utilizzato per gestire il tuo indirizzo del wallet. Per saperne di più su come funzionano le transazioni su Ethereum, consulta la [guida alle transazioni](https://ethereum.org/en/developers/docs/transactions/) della Fondazione Ethereum.

Per ottenere l'URL personalizzato Polygon RPC da Alchemy, vai alla tua app **Hello World** nella dashboard di Alchemy e fai clic **su Visualizza la chiave** nell'angolo in alto a destra. Poi vai avanti e copia la tua chiave API HTTP di Alchemy.

![img](/img/alchemy/view-key.png)

Puoi scaricare e creare un account Metamask gratuitamente [qui](https://metamask.io/download.html). Una volta creato un account, segui questi passaggi per impostare la rete Polygon PoS sul tuo wallet.

1. Seleziona **le impostazioni** dal menu a discesa nell'angolo in alto a destra del tuo wallet MetaMask.
2. Seleziona **le reti** dal menu a sinistra.
3. Collegare il tuo wallet alla Mumbai Testnet utilizzando i seguenti parametri:

**Nome di rete:** Polygon Mumbai Testnet

**Nuovo RPC URL:** https://polygon-mumbai.g.alchemy.com/v2/your-api-key

**ChainID:** 80001

**Simbolo:** MATIC

**URL di Block Explorer** https://mumbai.polygonscan.com/


### Aggiungi Polygon Mumbai Test MATIC {#add-polygon-mumbai-test-matic}

Avrai bisogno di alcuni token di testnet per distribuire il tuo smart contract alla testnet di Mumbai. Per ottenere i token di testnet, vai al [Rubinetto di Polygon](https://faucet.polygon.technology/) Mumbai, seleziona **Mumbai**, seleziona **MATIC Token** e inserisci il tuo indirizzo del wallet Polygon e quindi clicca **Invia**. A causa del traffico di rete, potrebbe richiedere un po 'di tempo per ricevere i tuoi token di testnet.

Puoi anche utilizzare il [rubinetto Mumbai gratuito](https://mumbaifaucet.com/?a=polygon-docs) di Alchemy.

![img](/img/alchemy/faucet.png)

Subito dopo visualizzerai i token di testnet nel tuo account MetaMask.

### Controlla il tuo Wallet {#check-your-wallet-balance}

Per ricontrollare che il saldo sia presente, inviamo una richiesta [eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) usando [lo strumento Composer di Alchemy](https://composer.alchemyapi.io/). Scegli **Polygon** come la catena, **Polygon Mumbai** come la rete, `eth_getBalance`come il metodo e input il tuo indirizzo. Questo restituirà l'importo di MATIC nel nostro wallet. Guarda [questo video](https://youtu.be/r6sjRxBZJuU) per istruzioni su come utilizzare lo strumento Composer.

![img](/img/alchemy/get-balance.png)

Dopo aver inserito l'indirizzo dell'account MetaMask e cliccare **su Invia richiesta**, dovresti vedere una risposta che assomiglia a questo:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

Questo risultato è in Wei, non in ETH. Wei è la più piccola denominazione di Ether. La conversione da Wei a Ether è: 1 Ether = 10^18 Wei. Quindi, se convertiamo "0xde0b6b3a7640000" in decimali, otteniamo 1\*10^18, che equivale a 1 ETH. Può essere mappato su 1 MATIC in base alla denominazione.

:::

### Inizializza il tuo progetto {#initialize-your-project}

Innanzitutto, dobbiamo creare una cartella per il nostro progetto. Vai alla tua [riga di comando](https://www.computerhope.com/jargon/c/commandi.htm) e digita:

```bash
mkdir hello-world
cd hello-world
```

Ora che ci troviamo all'interno della nostra cartella di progetto, usiamo `npm init` per inizializzare il progetto. Se ancora non hai installato npm, segui [queste istruzioni](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm). Avremo bisogno anche di Node.js, quindi scarica anche quello!

```bash
npm init # (or npm init --yes)
```

Non importa come rispondi alle domande sull'installazione. Guarda il seguente esempio come riferimento:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Approva il package.json ed è fatta!

### Download [Hardhat](https://hardhat.org/getting-started/#overview)

Hardhat è un ambiente di sviluppo per compilare, implementare, eseguire il test e il debug del software Ethereum. Aiuta gli sviluppatori durante la costruzione di smart contract e dApp in locale prima dell'implementazione sulla catena live.

All'interno del nostro `hello-world`progetto, esegui:

```bash
npm install --save-dev hardhat
```

Consulta questa pagina per ulteriori informazioni sulle [istruzioni per l'installazione](https://hardhat.org/getting-started/#overview).

### Creazione del progetto Hardhat {#create-hardhat-project}

Nella cartella del nostro progetto `hello-world`, esegui:

```bash
npx hardhat
```

Dovresti vedere un messaggio di benvenuto e un'opzione per selezionare quello che vuoi fare. Seleziona **un hardhat.config.js**:

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Questo genererà un `hardhat.config.js`file per noi, che è il luogo in cui specificheremo tutta la configurazione del nostro progetto.

### Aggiungi le cartelle del progetto {#add-project-folders}

Per organizzare il nostro progetto, creeremo due nuove cartelle. Vai alla directory principale del tuo progetto `hello-world` tramite riga di comando e digita:

```bash
mkdir contracts
mkdir scripts
```

* `contracts/` è dove conserveremo il file di codice dello smart contract Hello World
* `scripts/` è dove conserveremo gli script per implementare e interagire con il nostro contratto

### Scrivi il contratto {#write-the-contract}

Apri il progetto **hello-world** nel tuo editor preferito, come [VSCode](https://code.visualstudio.com). Gli smart contract sono scritti in una lingua chiamata Solidity che è quello che useremo per scrivere il nostro `HelloWorld.sol`smart contract.

1. Navigare nella `contracts`cartella e creare un nuovo file chiamato`HelloWorld.sol`
2. Di seguito è riportato un esempio di smart contract Hello World della [Fondazione Ethereum](https://ethereum.org/en/) che useremo per questo tutorial. Copia e incolla i contenuti di seguito nel tuo file `HelloWorld.sol` e assicurati di leggere i commenti per capire cosa fa questo contratto:

```solidity
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

Questo è uno smart contract estremamente semplice che memorizza un messaggio al momento della sua creazione e che può essere aggiornato richiamando la funzione `update`.

### Collegarsi a MetaMask & Alchemy {#connect-with-metamask-alchemy}

Abbiamo creato un wallet Metamask, un account Alchemy e abbiamo scritto lo smart contract. Ora è il momento di connetterli.

Ogni transazione inviata dal tuo wallet virtuale richiede una firma con la tua chiave privata univoca. Per fornire questa autorizzazione al programma, possiamo memorizzare in modo sicuro la chiave privata (e la chiave API Alchemy) in un file di ambiente.

Innanzitutto, installa il pacchetto dotenv nella directory del tuo progetto:

```bash
npm install dotenv --save
```

Poi crea un file `.env` nella directory principale del progetto e aggiungi la tua chiave privata Metamask e l'URL dell'API HTTP Alchemy.

:::warning Avvertenza

Il tuo file ambiente deve essere nominato `.env`o non sarà riconosciuto come file d'ambiente. Non usare nomi tipo `process.env` o `.env-custom` o altro.

Inoltre, se stai utilizzando un sistema di controllo delle versioni come git per **gestire** il tuo progetto, non monitorare il `.env`file. Aggiungi `.env`al tuo `.gitignore`file per evitare di pubblicare dati segreti.

:::

* Segui [queste istruzioni](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) per esportare la tua chiave privata
* Per ottenere la chiave API di Alchemy HTTP (RPC URL), passa alla tua app **Hello World** sulla dashboard del tuo account e fai clic **su Visualizza la chiave** nell'angolo in alto a destra.

Il tuo `.env` dovrebbe apparire così:

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Per collegare queste al nostro codice, faremo riferimento a queste variabili nel nostro `hardhat.config.js`file più tardi in questo tutorial.

### Installare Ethers.js {#install-ethers-js}

Ethers.js è una libreria che semplifica l'interazione e l'invio di richieste a Ethereum eseguendo il wrapping dei [metodi JSON-RPC standard](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) con metodi più facili da utilizzare.

Hardhat semplifica l'integrazione di [plugin](https://hardhat.org/plugins/) per strumenti aggiuntivi e funzionalità estese. Sfrutteremo il [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) per implementare il contratto. [Ethers.js](https://github.com/ethers-io/ethers.js/) dispone di metodi utili per l'implementazione del contratto.

Nella tua directory di progetto, digitare

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Avremo bisogno di ethers anche per il nostro `hardhat.config.js` nel prossimo step.

### Aggiornare hardhat.config.js {#update-hardhat-config-js}

Finora abbiamo aggiunto diverse dipendenze e plugin. Ora dobbiamo aggiornare in `hardhat.config.js`modo che il nostro progetto riconosca queste dipendenze.

Aggiorna il tuo `hardhat.config.js` in modo che sia simile al seguente:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### Compila il nostro Smart Contract {#compile-our-smart-contract}

Per assicurarci che finora tutto funzioni, compiliamo il contratto. Il task `compile` è una delle attività hardhat integrate.

Dalla riga di comando esegui:

```bash
npx hardhat compile
```

Potrebbe essere un avviso su `SPDX license identifier not provided in source file`, ma l'applicazione potrebbe ancora funzionare bene. In caso contrario, puoi sempre inviare un messaggio su [Alchemy Discord](https://discord.gg/u72VCg3).

### Scrivi il nostro script di distribuzione. {#write-our-deploy-script}

Ora che il nostro contratto è stato scritto e il nostro file di configurazione è pronto, è il momento di scrivere lo script di implementazione del contratto.

Vai alla cartella `scripts/` e crea un nuovo file chiamato `deploy.js`, aggiungendo i seguenti contenuti:

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Abbiamo applicato le spiegazioni del team di Hardhat contenute nel [Tutorial sui contratti](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) riguardo alle funzioni di ciascuna di queste righe di codice.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Un `ContractFactory`in ethers.js è un'astrazione utilizzata per implementare nuovi smart contract, pertanto `HelloWorld` è una [factory](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\)) per le istanze dei contratti hello world. Quando usiamo i plugin `hardhat-ethers`, `ContractFactory`e `Contract`, le istanze sono connesse al primo firmatario (proprietario) per impostazione predefinita.

```javascript
const hello_world = await HelloWorld.deploy();
```

La chiamata di `deploy()` su un `ContractFactory` avvierà l'implementazione e restituirà una `Promise` che si risolverà in un oggetto `Contract`. Questo è l'oggetto che ha un metodo per ciascuna delle funzioni di smart contract.

### Distribuire il nostro Smart Contract {#deploy-our-smart-contract}

Vai alla riga di comando ed esegui:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Dovresti vedere una cosa del genere:

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

Se andiamo [all'esploratore di Polygon Mumbai](https://mumbai.polygonscan.com/) e cerchiamo il nostro indirizzo contract, dovremmo essere in grado di vedere che è stato implementato con successo.

L'indirizzo dovrebbe corrispondere al tuo indirizzo dell'account MetaMask e `From``To`l'indirizzo verrà definito **la creazione di contratto.** Ma se clicchiamo sulla transazione, vedremo il nostro indirizzo del contratto nel `To`campo.

![img](/img/alchemy/polygon-scan.png)

### Verificare il contratto {#verify-the-contract}

Alchemy fornisce un [esploratore](https://dashboard.alchemyapi.io/explorer) in cui puoi trovare informazioni sui metodi implementati insieme allo smart contract, come il tempo di risposta, lo stato HTTP, i codici di errore tra gli altri. È un buon ambiente per verificare il tuo contratto e controllare se le transazioni sono andate a buon fine.

![img](/img/alchemy/calls.png)

**Complimenti! Hai appena implementato uno smart contract per la rete Polygon Mumbai.**

## Ulteriori risorse {#additional-resources}

- [Come Sviluppare un NFT Smart Contract](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) – Alchemy ha un tutorial scritto con un video Youtube su questo argomento. Questa è la settimana 1 della sua serie gratuita di 10 settimane **Road to Web3** dev
- [Polygon API Quickstart](https://docs.alchemy.com/reference/polygon-api-quickstart) – Lo sviluppatore di Alchemy guida per ottenere e correre con Polygon
