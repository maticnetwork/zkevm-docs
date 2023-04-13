---
id: fx-portal
title: FxPortal
description: Trasferire stato o dati da Ethereum a Polygon senza mappare utilizzando FxPortal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Il solito meccanismo per leggere nativamente i dati Ethereum di Polygon utilizza **State Sync**. Questo permette di trasferire dati arbitrari da Ethereum a Polygon. Tuttavia, questo approccio richiede anche la mappatura dei contratti root e figlio se non è possibile utilizzare l'interfaccia predefinita. FxPortal offre un'alternativa in cui i token standardizzati ERC possono essere distribuiti senza alcuna mappatura, semplicemente utilizzando i contratti di base di FxPortal.

## Che cos'è FxPortal? {#what-is-fxportal}

È una potente ma semplice implementazione del meccanismo di [sincronizzazione dello stato](../../pos/state-sync/state-sync-mechanism.md) di Polygon. Il Polygon PoS bridge è costruito sulla stessa architettura. Il codice della cartella [degli esempi](https://github.com/fx-portal/contracts/tree/main/contracts/examples) è alcuni esempi di utilizzo. Puoi facilmente utilizzare questi esempi per costruire le tue implementazioni o il proprio ponte personalizzato che permette a qualsiasi sincronizzazione di stato senza mappare.

Puoi controllare il [repository di GitHub](https://github.com/fx-portal/contracts) per contratti e esempi.

## Come funziona? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) e [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) sono i principali contratti su cui funziona FxPortal. Chiamare e passare i dati a metodi definiti dall'utente sull'altra catena senza alcuna mappatura con il meccanismo di sincronizzazione di stato. Per utilizzare i contratti principali distribuiti, puoi implementare i contratti base di FxPortal negli smart contract che distribuisci: [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) e [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Basandosi su questi contratti, i tuoi contratti distribuiti saranno in grado di comunicare tra loro utilizzando il meccanismo del tunnel dei dati.

Altrimenti, puoi scegliere di mappare i tuoi token con i già implementati contratti di tunnel. I dettagli di distribuzione di FxTunnel per Polygon Mainnet e Mumbai Testnet sono i seguenti:

- [Polygon Mainnet](https://static.matic.network/network/mainnet/v1/index.json)
- [Mumbai Testnet](https://static.matic.network/network/testnet/mumbai/index.json)

Cerca la parola chiave `FxPortalContracts`nei link di cui sopra per trovare tutti i contratti di tunnel predefinito e altre importanti implementazioni del contratto FxPortal.

## Ho bisogno di un'implementazione FxTunnel personalizzata? {#do-i-need-a-custom-fxtunnel-implementation}

Devi andare a **un'implementazione personalizzata di FxTunnel** solo se le implementazioni predefinite non sono conformi al tuo caso d'uso. Quando si utilizza le tunnel FxPortal predefinito, non è possibile modificare il codice del contratto figlio. La bytecode per il contratto di token bambino è sempre fissata e rimane sempre la stessa per le [implementazioni predefinite di FxTunnel](https://github.com/fx-portal/contracts/tree/main/contracts/examples). Nel caso in cui abbia bisogno di un token personalizzato, devi andare per la tua FxTunnel personalizzata e leggere la parte successiva ti guiderà più nella distribuzione delle tue FxTunnel personalizzate.

È altamente consigliato leggere e capire [FxPortal State Transfer](state-transfer.md) prima di leggere la prossima sezione. Ciascuna di queste prossime sezioni avrà ad esempio i collegamenti del contratto di tunnel che gli collegano, che possono essere presi come riferimento per costruire le proprie fx-tunnels.

## Trasferimento di ERC20 {#erc20-transfer}

I [contratti di tunnel per bambini e root](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) consentono il deposito di token sulla catena e il ritiro della catena per bambini.

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: Puoi chiamare la funzione sul contratto distribuito per mappare il tuo token ERC20 e creare un corrispondente token bambino sulla catena di bambino.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: `deposit()`metodo di chiamata con l'indirizzo del token mappato, l'indirizzo che può ritirare con una corrispondente quantità (insieme ai dati se necessario). Per spendere i tuoi token devi prima aver approvato il contratto utilizzando la funzione standard ERC20 `approve`.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: L'indirizzo in cui è assegnato `deposit()`può ritirare tutta la quantità di child token utilizzando questa funzione. Riceveranno il token figlio creato al momento della prima mappatura.
- `rootToChildToken`: Questa variabile pubblica contiene il token di root to to child token mapping. Puoi effettuare la query della mappatura con l'indirizzo del token principale per scoprire l'indirizzo del token figlio distribuito.

### Da Ethereum → Polygon {#polygon}

1. Distribuisci il tuo token ERC20 sulla catena root. Questo indirizzo ti servirà più tardi.
2. Approva i token per il trasferimento chiamando la funzione `approve()` del root token con l'indirizzo del root tunnel e l'importo come argomenti.
3. Procede a chiamare `deposit()` con l'indirizzo del destinatario e l'importo sulla catena root per ricevere il token figlio equivalente sulla catena figlio. In questo modo il token verrà mappato automaticamente. In alternativa, puoi chiamare `mapToken()` prima di depositare.
4. Dopo il mapping, dovresti essere in grado di eseguire trasferimenti cross-chain utilizzando le `deposit`e le `withdraw`funzioni della tunnel.

:::note

Dopo che avrai eseguito `deposit()`sulla catena di root ci vorranno 22-30 minuti per la sincronizzazione dello stato. Una volta che la sincronizzazione dello stato, riceverai i token depositati all'indirizzo indicato.

:::

### Da Polygon → Ethereum {#ethereum}

1. Chiama `withdraw()` con l'indirizzo e l'importo del token come argomenti del contratto figlio per spostare i token figlio al ricevitore designato sulla catena principale. **Prendi nota del tx hash** perché verrà utilizzato per generare la prova di burn.

2. Qui puoi trovare le misure per completare il [recesso](#withdraw-tokens-on-the-root-chain).

## ERC721 {#erc721-transfer}

Nel caso in cui abbia bisogno di un esempio, consulta questa guida [per le Tunnel per le Root e le Child](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer)

### Da Ethereum → Polygon {#polygon-1}

1. Distribuisci il tuo token ERC721 sulla catena root. Questo indirizzo ti servirà più tardi.
2. Approva i token per il trasferimento chiamando la `approve()`funzione del root token con l'indirizzo del root tunnel e l'ID del token come argomenti.
3. Chiama `deposit()` con l'indirizzo del destinatario e l'ID del token sulla catena root per ricevere il token figlio equivalente sulla catena figlio. In questo modo il token verrà mappato automaticamente. In alternativa, puoi chiamare `mapToken()` prima di depositare.

:::note

Dopo che avrai eseguito `deposit()`sulla catena di root ci vorranno 22-30 minuti per la sincronizzazione dello stato. Una volta che la sincronizzazione dello stato, riceverai i token depositati all'indirizzo indicato.

:::

### Da Polygon → Ethereum {#ethereum-1}

1. Chiama `withdraw()` con l'indirizzo del token e l'ID del token come argomenti del contratto figlio per spostare i token figlio al ricevitore designato nella catena principale. **Nota che l'hash tx** verrà utilizzato per generare la prova di ustione.

2. Qui puoi trovare le misure per completare il [recesso](#withdraw-tokens-on-the-root-chain).

## Trasferimento di ERC1155 {#erc1155-transfer}

Nel caso in cui abbia bisogno di un esempio, consulta questa guida [per le tunnel di radice e bambino](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) ERC1155.

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: utilizzato per mappare il token ERC1155 principale nella catena figlio.
- `deposit(rootToken, user, id, amount, data)`: funzione utilizzata per depositare i root token nella catena figlio
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: utilizzato per gli ID multipli dei token e gli importi corrispondenti
- `receiveMessage(inputData)`: da chiamare dopo che la prova di burn è stata generata con il payload come `inputData`

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: utilizzato per ritirare il token da Polygon a Ethereum
- `withdrawBatch(childToken, ids, amounts, data)`: come per il prelievo, ma per il prelievo di più ID token

### Da Ethereum → Polygon {#polygon-2}

1. Distribuisci il tuo token ERC1155 nella catena root. Questo indirizzo ti servirà più tardi.
2. `setApprovalForAll(operator, approved)`Accetta il token distribuito con `FxERC1155RootTunnel`l'indirizzo per `operator`consentire di `FxERC1155RootTunnel`trasferire i tuoi token su `FxERC1155ChildTunnel`Polygon.
3. `mapToken()`Accetta `FxERC1155RootTunnel`con l'indirizzo del token distribuito come .`rootToken` Questo invierà un messaggio per `FxERC1155ChildTunnel`istruirlo per distribuire e mappare il token ERC1155 su Polygon. Per interrogare il tuo indirizzo di token bambino, `rootToChildToken`chiamati.`FxERC1155ChildTunnel`
4. `deposit()`Chiamare `FxERC1155RootTunnel`con l'indirizzo del token su Ethereum come , `rootToken`ricevitore come , `user`token id come `id`e l'importo come .`amount` In alternativa, puoi anche chiamare `depositBatch()` per token ID multipli.

:::note

Dopo che avrai eseguito `deposit()`sulla catena di root ci vorranno 22-30 minuti per la sincronizzazione dello stato. Una volta che la sincronizzazione dello stato, riceverai i token depositati all'indirizzo indicato.

:::

### Da Polygon → Ethereum {#ethereum-2}

1. `withdraw()`Chiamare `FxERC1155ChildTunnel`con l'indirizzo del token bambino distribuito su Polygon come l'id `childToken`e il token come `id`(l'indirizzo token bambino può essere interrogato dal `rootToChildToken`mapping). In alternativa, puoi anche chiamare `withdrawBatch()` per ottenere più ID del token e gli importi corrispondenti. **Nota che l'hash tx** verrà utilizzato per generare la prova di ustione.

2. Qui puoi trovare le misure per completare il [recesso](#withdraw-tokens-on-the-root-chain).

## Ritirare i Token sulla catena di radice {#withdraw-tokens-on-the-root-chain}

:::info

Dopo che avrai eseguito `withdraw()`sulla catena di bambino, ci vorranno 30-90 minuti per un checkpoint che accada. Una volta che il prossimo checkpoint include la transazione di master, puoi ritirare i token sulla catena di root

:::

1. Generare la prova di ustione utilizzando **l'hash tx** e **MESSAGE_SENT_EVENT_SIG**. Per generare la prova, puoi utilizzare le API di generazione di prova ospitate da Polygon o puoi anche creare le tue API di generazione di prova seguendo le istruzioni [qui](https://github.com/maticnetwork/proof-generation-api) indicate.

L'endpoint di generazione di prova ospitato da Polygon è disponibile [qui.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

  - `burnTxHash`è l'hash della `withdraw()`transazione che hai avviato su Polygon.
  - `eventSignature`è la firma dell'evento emesso dalla `withdraw()`funzione. La firma dell'evento per MESSAGE_SENT_EVENT_SIG è `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Gli esempi di utilizzo delle API di generazione di prova per la Mainnet e Testnet sono i seguenti:-

→ [Generazione di Polygon Mainnet](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [generazione di test di Mumbai](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Dai il payload generato come argomento `receiveMessage()`a cui si riferisce nel rispettivo contratto di tunnel di radice su Goerli o Ethereum.

## Trasferimento ERC-20 creabile {#mintable-erc-20-transfer}

Nel caso in cui abbia bisogno di un esempio, consulta questa guida [per le tunnel per bambini e le Root](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) ERC20.

:::info

Nel caso di Mintable Token FxTunnels, il token bambino viene distribuito prima e il token root viene implementato solo quando il primo processo di prelievo/uscita è completato. L'indirizzo del contratto di token di root può essere pre-determinato subito dopo la distribuzione del contratto di figlio, ma la mappatura esisterà tecnicamente solo quando la prima ritiro/uscita è completata.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: per depositare token da Ethereum a Polygon
- `receiveMessage(bytes memory inputData)`: la prova di burn deve essere inclusa come `inputData` per ricevere i token sulla catena root

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: Per distribuire un token ERC20 sulla rete Polygon
- `mintToken(address childToken, uint256 amount)`: crea una particolare quantità di token su Polygon
- `withdraw(address childToken, uint256 amount)`: per eseguire il burn dei token sulla catena foglio per prelevare sulla catena root

### Gettoni di creazione su Polygon {#minting-tokens-on-polygon}

1. Chiama `deployChildToken()` su `FxMintableERC20ChildTunnel` e passa le informazioni necessarie sul token come parametri. Questa operazione emette un evento `TokenMapped` che contiene gli indirizzi `rootToken` e `childToken`. Prendi nota di questi indirizzi.
2. Chiama `mintToken()` su `FxMintableERC20ChildTunnel` per creare i token sulla catena figlio.
3. Chiama `withdraw()` su `FxMintableERC20ChildTunnel` per prelevare token da Polygon. Nota l'hash della transazione in quanto questo sarà utile per generare la prova di ustione.
4. Qui puoi trovare le misure per completare il [recesso](#withdraw-tokens-on-the-root-chain).

### Ritirare i Token su Ethereum {#withdrawing-tokens-on-ethereum}

Fornisci la prova di burn generata come argomento a `receiveMessage()` in `FxMintableERC20RootTunnel`. In seguito, il saldo dei token si rifletterà sulla catena principale.

### Deposito Token di nuovo a Polygon {#deposit-tokens-back-to-polygon}

1. Ricordati di approvare `FxMintableERC20RootTunnel` per trasferire i tuoi token.
2. Chiama `deposit()` in `FxMintableERC20RootTunnel` con `rootToken` come indirizzo del root token e `user` come destinatario.
3. Aspetta l'evento di sincronizzazione di stato (22-30 min). A questo punto, puoi effettuare la query del saldo del destinatario target sulla catena figlio.

Gli esempi di **ERC721** e **ERC1155** FxTunnel sono i seguenti::-

- [FxMintableERC721Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnelel](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## Esempi di distribuzioni {#example-deployments}

### Goerli {#goerli}

- Checkpoint Manager: [0x2890bA17EfE978480615e330ecB65333b880928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Dummy ERC20 token: [0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTunnel: [0xA200766a7D64E54611E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Dummy ERC721 token: [0x73594a053cb5dDE5558268d28a774375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTunnel: [0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Dummy ERC1155 Token: [0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel: [0x48DE785970ca6eD289315036B6d18788cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- FxERC20: [0xDDE69724AeFBdb084413719fE745aB66e3b055C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20ChildTunnel: [0x9C37aEbdb7D337E0215BC40152d6689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunnel: [0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- Child token dummy ERC20: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E048726267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721ChildTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunnel: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

Le corrispondenti implementazioni di Mainnet sono disponibili [qui](https://static.matic.network/network/mainnet/v1/index.json). Cerca la parola chiave `FxPortalContracts`per trovare tutti i contratti di tunnel predefinito e altre importanti implementazioni del contratto FxPortal. Puoi utilizzare il [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)pacchetto per accedere agli indirizzi del contratto e agli ABI.

## Indirizzi del contratto {#contract-addresses}

### Testnet Mumbai {#mumbai-testnet}

| Contratto | Indirizzo distribuito  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Polygon Mainnet {#polygon-mainnet}


| Contratto | Indirizzo distribuito  |
| :----- | :- |
| [FxRoot (Ethereum Mainnet)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild (Polygon Mainnnet)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
