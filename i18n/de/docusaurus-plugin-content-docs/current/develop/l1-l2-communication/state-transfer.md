---
id: state-transfer
title: Statusübertragung
description: Übertrage den Status oder die Daten einfach von Ethereum zu Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon Prüfer überwachen kontinuierlich einen Vertrag auf der Ethereum-Chain namens `StateSender`. Immer, wenn ein auf der Ethereum-Chain registrierter Vertrag diesen Vertrag aufruft, wird ein Ereignis ausgegeben. Basierend auf diesem Ereignis leiten Polygon-Validatoren die Daten an einen anderen Vertrag auf der Polygon-Chain weiter. Dieser **State Sync** Mechanismus wird verwendet, um Daten von Ethereum an Polygon zu senden.

Darüber hinaus senden Polygon Validatoren regelmäßig einen Ethereum Hash jeder Transaktion auf der Polygon Chain zu. Du kannst diesen **Checkpoint** verwenden, um jede Transaktion zu validieren, die auf Polygon stattgefunden hat. Sobald eine Transaktion bestätigt wurde, dass sie auf der Polygon Chain stattgefunden hat, kann Ethereum verwendet werden, um die entsprechende Aktion durchzuführen.

Diese 2 Mechanismen können zusammen verwendet werden, um die Übertragung von two-way (State-) zwischen Ethereum und Polygon zu ermöglichen. Um all diese Interaktionen abstract kannst du unsere `FxBaseRootTunnel`(auf Ethereum) und `FxBaseChildTunnel`(auf Polygon) Verträge direkt erben.

## Root-Tunnel-Vertrag {#root-tunnel-contract}

Verwende `FxBaseRootTunnel` [diesen](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) Vertrag. Dieser Vertrag gibt Zugriff auf die folgenden Funktionen:

- `function _processMessageFromChild(bytes memory data)`: Dies ist eine virtuelle Funktion, die im Vertrag implementiert werden muss, die ihn erbt, um die Daten zu verarbeiten, die von gesendet `ChildTunnel`werden.
- `_sendMessageToChild(bytes memory message)`: Diese Funktion kann intern mit beliebigen Bytes-Daten als Nachricht aufgerufen werden. Diese Daten werden so an den Child-Tunnel gesendet.
- `receiveMessage(bytes memory inputData)`: Diese Funktion muss aufgerufen werden, um die von ausgesandte Nachricht zu `ChildTunnel`empfangen. Der Transaktionsnachweis muss als calldata bereitgestellt werden. Ein Beispiel-Skript zum Erzeugen von Beweis mit **matic.js** ist unten enthalten.

## Child-Tunnel-Vertrag {#child-tunnel-contract}

Verwende `FxBaseChildTunnel` [diesen](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol) Vertrag. Dieser Vertrag gibt Zugriff auf folgende Funktionen:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: Dies ist eine virtuelle Funktion, die die Logik implementieren muss, um Nachrichten zu verarbeiten, die von der gesendet `RootTunnel`werden.
- `function _sendMessageToRoot(bytes memory message)`: Diese Funktion kann intern aufgerufen werden, um eine beliebige Bytes-Nachricht an den Root-Tunnel zu senden.

## Voraussetzungen {#prerequisites}

- Du musst den `FxBaseRootTunnel`Vertrag in deinem Root-Vertrag auf Ethereum ererben. Als Beispiel kannst du diesem [Vertrag](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) folgen . Erbe den `FxBaseChildTunnel`Vertrag in deinem Kind auf Polygon. Folge diesem [-Vertrag](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) als Beispiel.
- Während du deinen Root-Vertrag auf bereitstellst.
  - **Goerli Testnet**, übergeben die Adresse von als 0**x2890bA17EfE978480615e330ecB6533b880928e** `_fxRoot`und `_checkpointManager`als **0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA.**

  - **Ethereum Mainnet**, `_checkpointManager`ist 0**x86e4dc95c7fbdbf52e33d563bbdb00823894c287 **und `_fxRoot`ist **0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2 .**
- Um den Child-Vertrag auf **Mumbai testnet** bereitzustellen, übergeben Sie **0xCf73231F28B7331BBe3124B907840A94851f9f11** wie `_fxChild`im Konstruktor. Für **Polygon mainnet**`_fxChild` wird 0**x8397259c983751DAf40400790063935a11afa28a** sein.
- Rufe den bereitgestellten Root-Tunnel mit der Adresse von Child-Tunnel `setFxChildTunnel`an. Beispiel: [0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- Ruf den bereitgestellten Child-Tunnel mit der Adresse des Root-Tunnels `setFxRootTunnel`an. Beispiel: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## Beispielverträge der Statusübertragungs-Bridge {#example-contracts-of-state-transfer-bridge}

- **Contracts**: [Fx-Portal Github Repository](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## State Transfer aus Ethereum → Polygon {#polygon}

- Du musst `_sendMessageToChild()`intern in deinem Root-Vertrag aufrufen und die Daten als Argument an Polygon weitergeben. Beispiel: [0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- Implementiere `_processMessageFromRoot()` in deinem Child-Vertrag eine virtuelle Funktion in `FxBaseChildTunnel`, um Daten aus Ethereum abzurufen. Die Daten werden automatisch vom Statusempfänger empfangen, wenn der Status synchronisiert ist.

## State Transfer aus Polygon → Ethereum {#ethereum}

1. Rufe `_sendMessageToRoot()` intern in deinem Child-Vertrag mit Daten als Parameter auf, die an Ethereum gesendet werden sollen. Beispiel: [0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

Beachten Sie den transaction da er verwendet wird, um einen Beweis zu generieren, nachdem er als Checkpoint aufgenommen wurde.

2. **Proof Generation, um den Ausgang auf der Root-Chain abzuschließen**: Erstelle den Proof mit dem **tx hash** und **MESSAGE_SENT_EVENT_SIG**. Um den Proof zu generieren, kannst du entweder die von Polygon gehostete proof verwenden, oder du kannst deine eigene [generation](https://github.com/maticnetwork/proof-generation-api) auch drehen, indem du den Anweisungen folgend.

Der proof der von Polygon gehostet wird, ist [hier](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature}) verfügbar.

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Die proof API Nutzungsbeispiele für Mainnet und Testnet sind wie folgt:

→ [Mumbai Testnet Proof Generation](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Polygon Mainnet Proof Generierung](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. Implementiere `_processMessageFromChild()` in deinem Root-Vertrag.

4. Nutze den generierten Nachweis als Eingabe in `receiveMessage()`, um Daten abzurufen, die vom Child-Tunnel an deinen Vertrag gesendet wurden. Beispiel: [0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b66166ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) )
