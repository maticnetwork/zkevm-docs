---
id: nftstorage
title: Creare NFT
description: Minting con NFT.storage e Polygon.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Questo tutorial ti insegnerà a creare un NFT utilizzando la blockchain di Polygon e l'archiviazione IPFS/Filecoin tramite NFT.Storage. Polygon, una soluzione di scaling Layer 2 per Ethereum, viene spesso scelta dagli sviluppatori per la sua velocità e per i minori costi di transazione, pur mantenendo la piena compatibilità con l'EVM di Ethereum. Il tutorial ti guiderà attraverso la creazione e l'implementazione di uno smart contract standardizzato, l'archiviazione di metadati e asset su IPFS e Filecoin tramite l'API NFT.Storage e la creazione di NFT nel tuo wallet su Polygon.

## Introduzione {#introduction}

In questo tutorial cercheremo di soddisfare tre caratteristiche con il nostro processo di minting:

1. *Scalabilità* del processo di minting in termini di costi e produttività. Se il caso d'uso mira a creare rapidamente NFT, la tecnologia sottostante deve gestire tutte le richieste di minting e la creazione deve essere economica.
2. *Durata* dell'NFT, poiché gli asset possono avere una vita lunga e quindi devono rimanere utilizzabili per tutta la loro durata.
3. *Immutabilità* dell'NFT e dell'asset che rappresenta per evitare che modifiche indesiderate e partecipanti malintenzionati modifichino l'asset digitale che l'NFT rappresenta.

[Polygon](https://polygon.technology) affronta le necessità di *scalabilità* con il proprio protocollo e framework. Sono inoltre compatibili con Ethereum e la sua macchina virtuale, consentendo agli sviluppatori di spostare liberamente il loro codice tra le due blockchain. Analogamente, [NFT.Storage](https://nft.storage) garantisce *durabilità* con il potere della rete [Filecoin](https://filecoin.io) sottostante e *immutabilità* usando il [content addressing](https://nftschool.dev/concepts/content-addressing/) di IPFS.

In questo tutorial otterrai una panoramica del processo di minting di NFT, imparerai a memorizzare un asset digitale con NFT.Storage e a utilizzare questo asset digitale per creare il tuo NFT su Polygon.

## Prerequisiti {#prerequisites}

Una conoscenza generale degli NFT ti fornirà un quadro di riferimento e un contesto. [NFT School tratta le basi dell'NFT](https://nftschool.dev/concepts/non-fungible-tokens/), argomenti avanzati e contiene più tutorial.

Per testare ed eseguire il codice contenuto in questo tutorial, devi avere [un'installazione di Node.js](https://nodejs.org/en/download/package-manager/) funzionante.

Avrai anche bisogno di un wallet Polygon sulla testnet Mumbai con una piccola quantità di token MATIC. Segui le istruzioni di seguito per iniziare:

1. **Scarica e installa [Metamask](https://metamask.io/)**. Metamask è un wallet di criptovalute e un portale per le applicazioni blockchain. È molto facile da usare e semplifica molti passaggi, ad esempio la creazione di un wallet Polygon.
2. **Collega Metamask alla [Mumbai testnet](https://docs.polygon.technology/docs/develop/metamask/overview)** e selezionala nel menu a discesa. Utilizzeremo la testnet di Polygon per creare il nostro NFT in modo gratuito.
3. **Ricevi il token MATIC** nel tuo wallet usando il [faucet](https://faucet.polygon.technology/). Seleziona la Mumbai testnet e incolla nel modulo l'indirizzo del tuo wallet presente in Metamask. Per creare un NFT, dobbiamo pagare una piccola somma di MATIC, questa è una commissione applicata dai miner per le operazioni di aggiunta di nuove transazioni alla blockchain, ad esempio per creare un NFT o un nuovo smart contract.
4. **Copia la chiave privata** da Metamask cliccando sui tre puntini in alto a destra e selezionando "Dettagli account". In basso trovi un pulsante per esportare la tua chiave privata. Cliccaci sopra e inserisci la tua password quando ti viene richiesto. Per ora puoi copiare e incollare la chiave privata in un file di testo. Lo useremo più avanti nel corso del tutorial quando interagiremo con la blockchain.

Infine, avrai bisogno di un editor di testo o di codice. Per una maggiore comodità, scegli un editor che supporti sia il linguaggio JavaScript che per Solidity. Una buona opzione è [Visual Studio Code](https://code.visualstudio.com) con l'estensione [solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) abilitata.

## Preparazione {#preparation}

### Ottieni una chiave API per NFT.storage {#get-an-api-key-for-nft-storage}

Per utilizzare NFT.Storage hai bisogno di una chiave API. Per prima cosa, [vai su NFT.Storage per effettuare il login con il tuo indirizzo e-mail](https://nft.storage/login/). Riceverai un'e-mail con un link magico che ti consentirà di accedere al sito, senza bisogno di password. Dopo aver effettuato il login, vai su Chiavi API nella barra di navigazione. Troverai un pulsante per creare una **Nuova chiave**. Quando ti viene richiesto il nome di una chiave API, puoi sceglierne una liberamente o utilizzare "polygon + NFT.Storage". Ora, puoi copiare il contenuto della colonna chiave o fare riferimento a NFT.Storage più avanti nel corso del tutorial.

### Configura il tuo spazio di lavoro {#set-up-your-workspace}

Crea una nuova cartella vuota da utilizzare come area di lavoro per questo tutorial. Scegli liberamente un nome e una posizione qualsiasi nel tuo file system. Apri un terminale e passa alla cartella appena creata.

Successivamente, installeremo le seguenti dipendenze di Node.js:

- **Hardhat e Hardhat-Ethers**, un ambiente di sviluppo per Ethereum (e per le blockchain compatibili con Ethereum come Polygon).
- **OpenZeppelin**, una raccolta di smart contract con contratti base NFT standardizzati.
- **NFT.Storage**, una libreria per connettersi all'API NFT.Storage.
- **Dotenv**, una libreria per gestire i file di ambiente per la configurazione (ad esempio, per iniettare chiavi private nello script).

Usa il seguente comando per installare tutte le dipendenze in una volta sola:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat deve essere inizializzato nella cartella corrente. Per avviare l'inizializzazione, esegui:

```bash
npx hardhat
```

Quando richiesto, scegli **Crea un hardhat.config.js**. L'output della console dovrebbe essere simile a questo:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Apporteremo alcune modifiche al file di configurazione dell'hardhat `hardhat.config.js` per supportare la rete di test di Polygon Mumbai. Apri il `hardhat.config.js` creato nell'ultimo passaggio. Tieni presente che stiamo caricando la chiave privata del tuo wallet Polygon da un file di ambiente e che questo file di ambiente deve essere conservato al sicuro. Puoi anche utilizzare altri rpc [link](https://docs.polygon.technology/docs/develop/network-details/network), a seconda delle esigenze.

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

Crea un nuovo file chiamato `.env`che terrà la chiave API per NFT.Storage e la chiave privata del wallet Polygon. Il contenuto del `.env`file dovrebbe assomigliare a come:

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

Sostituisci i placeholder con la chiave API che hai creato durante la preparazione e con la chiave privata del tuo wallet Polygon.

Per organizzare il nostro progetto, creeremo tre nuove cartelle:

1. `contracts`, per i contratti Polygon scritti in Solidity.
2. `assets`, che contiene l'asset digitale che verrà creato come NFT.
3. `scripts`, come helper per guidare il processo di preparazione e minting.

Esegui il seguente comando:

```bash
mkdir contracts assets scripts
```

Infine, aggiungiamo un'immagine alla cartella `assets`. Questa immagine sarà la nostra opera d'arte che verrà caricata su NFT.Storage e creata su Polygon. Per ora, la chiamiamo `MyExampleNFT.png`. Se non hai ancora un'opera d'arte pronta, puoi [scaricare un semplice modello](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu).

## Creazione del tuo NFT {#minting-your-nft}

### Memorizzare i dati degli asset con NFT.Storage {#storing-asset-data-with-nft-storage}

Utilizzeremo NFT.Storage per archiviare il nostro asset digitale e i suoi metadati. NFT.Storage garantisce l'immutabilità e la durata del tuo asset digitale caricandolo automaticamente su Filecoin e IPFS. IPFS e Filecoin si basano sugli identificatori di contenuto (CID) per ottenere riferimenti immutabili. IPFS fornirà un recupero veloce grazie alla cache georeplicata e Filecoin garantirà la durata con fornitori di storage incentivati.

Crea uno script chiamato `store-asset.mjs` sotto la directory `scripts`. I contenuti sono indicati di seguito:

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

La parte principale dello script è la funzione `storeAsset`. Crea un nuovo client che si connetta a NFT.Storage utilizzando la chiave API creata in precedenza. Successivamente introduciamo i metadati che consistono in nome, descrizione e immagine. Tieni presente che stiamo leggendo l'asset NFT direttamente dal file system dalla directory `assets`. Alla fine della funzione stamperemo l'URL dei metadati che utilizzeremo in seguito per la creazione dell'NFT su Polygon.

Dopo aver impostato lo script, puoi eseguirlo eseguendo:

```bash
node scripts/store-asset.mjs
```

L'output dovrebbe assomigliare al seguente elenco, dove `HASH` è il CID dell'opera d'arte che hai appena memorizzato.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Crea il tuo NFT su Polygon {#creating-your-nft-on-polygon}

#### Crea lo smart contract per il minting {#create-the-smart-contract-for-minting}

Per prima cosa, creeremo uno smart contract che verrà utilizzato per ceare l'NFT. Poiché Polygon è compatibile con Ethereum, scriveremo lo smart contract in [Solidity](https://soliditylang.org). Crea un nuovo file per il nostro smart contract NFT chiamato `ExampleNFT.sol` all'interno della directory `contracts`. Puoi copiare il codice dell'annuncio qui sotto:

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

Per essere un NFT valido, il tuo smart contract deve implementare tutti i metodi dello [standard ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/). Utilizziamo l'implementazione della libreria [OpenZeppelin](https://openzeppelin.com), che fornisce già una serie di funzionalità di base e aderisce allo standard.

Nella parte superiore del nostro smart contract, importiamo tre classi di smart contract OpenZeppelin:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` contiene l'implementazione dei metodi di base dello standard ERC-721, che il nostro smart contract NFT erediterà. Usiamo `ERC721URIStorage,` che è un'estensione che consente di memorizzare non solo gli asset ma anche i metadati in un file JSON off-chain. Come il contratto, questo file JSON deve essere conforme a ERC-721.

2. `\@openzeppelin/contracts/utils/Counters.sol` fornisce contatori che possono essere incrementati o decrementati solo di uno. Il nostro smart contract utilizza un contatore per tenere traccia del numero totale di NFT creati e per impostare l'ID univoco del nostro nuovo NFT.

3. `\@openzeppelin/contracts/access/Ownable.sol` imposta il controllo degli accessi al nostro smart contract, in modo che solo il proprietario dello smart contract (tu) possa coniare NFT.

Dopo le dichiarazioni di importazione, abbiamo il nostro smart contract NFT personalizzato, che contiene un contatore, un costruttore e un metodo per creare l'NFT. La maggior parte del lavoro è svolto dal contratto di base ereditato da OpenZeppelin, che implementa la maggior parte dei metodi necessari per creare un NFT conforme allo standard ERC-721.

Il contatore tiene traccia del numero totale di NFT creati, che viene utilizzato nel metodo di minting come identificatore unico per l'NFT.

Nel costruttore vengono inseriti due argomenti stringa per il nome dello smart contract e il simbolo (rappresentato in wallet). Puoi cambiarli come preferisci.

Infine, abbiamo il nostro metodo `mintNFT` che ci permette di creare l'NFT. Il metodo è impostato su `onlyOwner` per assicurarsi che possa essere eseguito solo dal proprietario dello smart contract.

`address recipient`specifica l'indirizzo che riceverà l'NFT in un primo momento.

`string memory tokenURI` è un URL che dovrebbe risolversi in un documento JSON che descrive i metadati dell'NFT. Nel nostro caso è già memorizzato su NFT.Storage. Possiamo utilizzare il link IPFS restituito al file JSON dei metadati durante l'esecuzione del metodo.

All'interno del metodo, incrementiamo il contatore per ricevere un nuovo identificatore unico per il nostro NFT. Poi chiamiamo i metodi forniti dal contratto di base di OpenZeppelin per inviare l'NFT al destinatario con l'identificatore appena creato e impostando l'URI dei metadati. Il metodo restituisce l'identificatore unico dopo l'esecuzione.

#### Distribuire lo smart contract su Polygon {#deploy-the-smart-contract-to-polygon}

Ora è il momento di distribuire il nostro smart contract su Polygon. Crea un nuovo file chiamato `deploy-contract.mjs` nella directory `scripts`. Copia il contenuto dell'elenco sottostante in quel file e salvalo.

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

La distribuzione del contratto avviene con le funzioni di aiuto fornite dalla libreria hardhat. Per prima cosa, otteniamo lo smart contract creato nel passo precedente con il factory fornito. Poi lo distribuiamo chiamando il rispettivo metodo e attendiamo che la distribuzione sia completata. Ci sono altre righe sotto il codice descritto per ottenere l'indirizzo corretto nell'ambiente testnet. Salva il `mjs`file.

Esegui lo script con il seguente comando:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

Se tutto è corretto, vedrai il seguente risultato:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

Tieni presente che nella fase di minting ti servirà l'indirizzo del contratto stampato. Puoi copiare e incollare il testo in un file di testo separato e salvarlo in seguito. Questo è necessario affinché lo script di minting possa chiamare il metodo di minting di quel contratto specifico.

#### Creare NFT su Polygon {#minting-the-nft-on-polygon}

La creazione dell'NFT non è altro che il richiamo del contratto che abbiamo appena distribuito a Polygon. Crea un nuovo file chiamato `mint-nft.mjs` nella directory `scripts` e copia questo codice dall'elenco sottostante:

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Modifica le prime due righe per inserire l'**indirizzo del contratto** della precedente distribuzione e l'**URL dei metadati** che è stato restituito durante la memorizzazione dell'asset con NFT.Storage. Il resto dello script imposta la chiamata al tuo smart contract definendoti come futuro proprietario dell'NFT e indicando i metadati memorizzati su IPFS.

Successivamente, esegui lo script:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

Puoi aspettarti di vedere il seguente risultato:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

Stai cercando il codice di esempio di questo tutorial? Lo trovi nel [link](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) polygon-nft.storage-demo - Github repo.

## Conclusione {#conclusion}

In questo tutorial abbiamo imparato a creare un NFT end-to-end con Polygon e NFT.Storage. Questa combinazione di tecnologie porta a un'adeguata decentralizzazione e garantisce *scalabilità*, *durata* e *immutabilità*.

Abbiamo implementato uno smart contract personalizzato per creare il nostro NFT in base alle nostre esigenze. Per questo tutorial abbiamo utilizzato un semplice esempio basato sullo standard ERC-721. Tuttavia, puoi anche definire una logica complessa che regoli il ciclo di vita dell'NFT. Per casi d'uso più complessi, lo standard [ERC1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) è un buon punto di partenza. OpenZeppelin, la libreria che utilizziamo nel nostro tutorial, offre una [procedura guidata](https://docs.openzeppelin.com/contracts/4.x/wizard) per la creazione di contratti NFT.

Il successo del minting può essere visto come l'inizio della fase di valore dell'NFT. L'NFT può quindi essere utilizzato per dimostrare la proprietà e può essere trasferito ad altri utenti. I motivi per trasferire un NFT possono essere una vendita andata a buon fine su uno dei marketplace NFT come [OpenSea](https://opensea.io), o un altro tipo di evento come l'acquisto di un oggetto in un gioco basato su NFT. Esplorare le ricche possibilità degli NFT è sicuramente un passo successivo molto interessante.

Se vuoi aiutare a costruire il tuo progetto NFT con NFT.storage, ti invitiamo a unirti al `#nft-storage`canale su D[iscord ](https://discord.gg/Z4H6tdECb9)e S[lack.](https://filecoinproject.slack.com/archives/C021JJRH26B)
