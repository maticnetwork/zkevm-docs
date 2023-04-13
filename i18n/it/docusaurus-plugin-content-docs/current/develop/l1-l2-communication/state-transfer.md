---
id: state-transfer
title: Trasferimento di stato
description: Trasferire facilmente lo stato o i dati da Ethereum a Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

I validatori di Polygon monitorano continuamente un contratto sulla catena di Ethereum chiamata `StateSender`. Ogni volta che un contratto registrato sulla catena di Ethereum chiami questo contratto, viene emesso un evento. Utilizzando questo evento, i validatori di Polygon trasmettono i dati a un altro contratto sulla catena di Polygon. Questo meccanismo di **sincronizzazione di stato** viene utilizzato per inviare dati da Ethereum a Polygon.

Inoltre, i validatori di Polygon inviano un hash di Ethereum di ogni transazione sulla catena di Polygon regolare. Puoi utilizzare questo **checkpoint** per convalidare qualsiasi transazione avvenuta su Polygon. Una volta che una transazione sia stata verificata sulla catena di Polygon, Ethereum può essere utilizzato per effettuare l'azione appropriata.

Questi 2 meccanismi possono essere utilizzati insieme per consentire il trasferimento dei dati (stato) tra Ethereum e Polygon. Per astrarre tutte queste interazioni, puoi ereditare direttamente i nostri contratti `FxBaseRootTunnel`(su Ethereum) e `FxBaseChildTunnel`(su Polygon).

## Contratto root tunnel {#root-tunnel-contract}

Usa il contratto `FxBaseRootTunnel` da [qui](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol). Questo contratto dà accesso alle seguenti funzioni:

- `function _processMessageFromChild(bytes memory data)`: Questa è una funzione virtuale che deve essere implementata nel contratto che lo eredita per gestire i dati da `ChildTunnel`.
- `_sendMessageToChild(bytes memory message)`: questa funzione può essere chiamata internamente con qualsiasi byte di dati come messaggio. Questi dati verranno inviati così come sono al tunnel figlio.
- `receiveMessage(bytes memory inputData)`: Questa funzione deve essere chiamata a ricevere il messaggio emesso da `ChildTunnel`. La prova della transazione deve essere fornita come calldata. Di seguito è incluso uno script di esempio per generare la prova utilizzando **matic.js**

## Contratto Tunnel figlio {#child-tunnel-contract}

Usa il contratto `FxBaseChildTunnel` da [qui](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Questo contratto dà accesso alle seguenti funzioni:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: Questa è una funzione virtuale che deve implementare la logica per gestire i messaggi inviati dalla `RootTunnel`.
- `function _sendMessageToRoot(bytes memory message)`: questa funzione può essere chiamata internamente per inviare qualsiasi messaggio byte al tunnel principale.

## Prerequisiti {#prerequisites}

- Devi ereditare il `FxBaseRootTunnel`contratto nel tuo contratto di root su Ethereum. Come esempio, puoi seguire questo [contratto](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) . Allo stesso modo, ereditare il `FxBaseChildTunnel`contratto nel tuo bambino su Polygon. Segui questo [contratto](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) come esempio.
- Durante la distribuzione del tuo contratto di root su
  - **Goerli Testnet**, passa l'indirizzo `_checkpointManager`di 0**x2890bA17EfE978480615e330ecB65333b880928e **e `_fxRoot`come **0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA.**

  - **Ethereum Mainnet**, `_checkpointManager`è 0**x86e4dc95c7fbdbf52e33d563bbdb00823894c287 **ed `_fxRoot`è **0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2.**
- Per l'implementazione del contratto bambino su **Mumbai testnet**, passa **0xCf73231F28B7331BBe3124B907840A94851f9f11** come `_fxChild`in constructor. Per **Polygon mainnet**`_fxChild` sarà 0**x8397259c983751DAf40400790063935a11afa28a.**
- `setFxChildTunnel`Accendere il tunnel radice distribuito con l'indirizzo del tunnel infantile. Esempio: [0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- `setFxRootTunnel`Accendere il tunnel bambino distribuito con l'indirizzo di tunnel radice. Example: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## Contratti di esempio del bridge di trasferimento di stato {#example-contracts-of-state-transfer-bridge}

- **Contratti**: [Fx-Portal Github Repository](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Trasferimento di Stato da Ethereum → Polygon {#polygon}

- Devi chiamare `_sendMessageToChild()`internamente nel tuo contratto di root e passare i dati come argomento da inviare a Polygon. Esempio: [0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- Nel tuo contratto figlio, implementa la funzione virtuale `_processMessageFromRoot()` in `FxBaseChildTunnel`per recuperare i dati da Ethereum. I dati saranno ricevuti automaticamente dal ricevitore di stato quando lo stato viene sincronizzato.

## Trasferimento di Stato da Polygon → Ethereum {#ethereum}

1. Chiama `_sendMessageToRoot()` internamente al tuo contratto figlio con i dati come parametro da inviare a Ethereum. Esempio: [0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

Nota l'hash della transazione in quanto verrà utilizzato per generare la prova dopo che è stata inclusa come checkpoint.

2. **Generazione di prova per completare l'uscita sulla catena di root** Generare la prova utilizzando **l'hash tx** e **MESSAGE_SENT_EVENT_SIG**. Per generare la prova, puoi utilizzare le API di generazione di prova ospitate da Polygon o puoi anche creare le tue API di generazione di prova seguendo le istruzioni [qui](https://github.com/maticnetwork/proof-generation-api) indicate.

L'endpoint di generazione di prova ospitato da Polygon è disponibile [qui.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Gli esempi di utilizzo delle API di generazione di prova per la Mainnet e Testnet sono i seguenti:-

→ [generazione di test di Mumbai](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Generazione di Polygon Mainnet](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. Implementa `_processMessageFromChild()` nel tuo contratto root.

4. Usa la prova generata come input per `receiveMessage()` per recuperare i dati inviati dal tunnel figlio nel tuo contratto. Esempio: [0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) )
