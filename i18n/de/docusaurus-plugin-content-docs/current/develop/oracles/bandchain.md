---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain ist eine High-performance Built für Data Oracle zur Abfrage von Daten von traditionellen Web-APIs
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Das Band-Protokoll ermöglicht es dir, Daten von traditionellen Web-APIs abzufragen und sie in der Blockchain zu verwenden. Entwickler können Anfragen über **BandChain, eine cosmos-basierte Blockchain** zur Erleichterung von Oracle-Anfragen und -Zahlung vornehmen und dann die Daten auf der dApp durch cosmos-based verwenden. Die Integration von Oracle-Daten kann in drei einfachen Schritten erfolgen:

1. **Auswahl der Oracle-Skripts**

    Das Oracle-Skript ist ein Hash, das den Datentyp identifiziert, der von der Bandchain abgerufen wird. Diese Skripts findest du [**hier**](https://guanyu-devnet.cosmoscan.io/oracle-scripts). Diese Skripts werden als Parameter bei der Oracle-Anfrage verwendet.

2. **Abfrage von Daten aus der Bandchain**

Dies kann auf zwei Arten geschehen:

    - **Verwendung des BandChain Explorers**

    Du kannst auf das Oracle-Skript deiner Wahl klicken und dann auf der Registerkarte **Ausführen,** du kannst die Parameter übergeben und die Antwort von BandChain abrufen. Die Antwort enthält das Ergebnis und einen evm-Nachweis. Dieser Nachweis muss kopiert werden und wird im letzten Schritt verwendet. Die BandChain Docs zur Abfrage von Oracle mit Explorer findest du [**hier**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer).

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Angegeben oben ist ein Beispiel für die Durchführung einer oracle um die Zufallszahlenwerte zu erhalten. Der Wert 100 wird an den `max_range`Parameter der oracle Request weitergegeben. Als Antwort erhalten wir einen Hash. Ein Klick auf diesen Hash zeigt uns die vollständigen Details der Antwort.

    - **Verwendung der BandChain-Devnet JS Library**

    Du kannst BandChain direkt über die BandChain-Devnet Library abfragen. Bei der Abfrage erhältst du einen **evm-Nachweis** in der Antwort. Dieser Nachweis kann für den letzten Schritt der BandChain-Integration verwendet werden. Die BandChain Docs zur Abfrage von Oracle mit BandChain-Devnet JS Library finden Sie [**hier**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library). Die Anfragenutzlast für die Oracle-Zufallszahl sieht wie folgt aus. Stelle sicher, dass der Anfragekörper im application/json-Format übergeben wird.

3. **Nutzung der Daten in Smart Contracts**

  Der letzte Schritt ist es, einen Validierungsvertrag bereitzustellen und die Antworten aus der Oracle-Anfrage in den Statusvariablen der Validierungsverträge zu speichern. Sobald diese Statusvariablen festgelegt wurden, können diese von der dApp nach Bedarf aufgerufen werden. Auch diese Statusvariablen können mit neuen Werten aktualisiert werden, indem die Oracle-Skripts erneut von der dApp abgefragt werden. Unten findest du einen Validierungsvertrag, der den Zufallszahlenwert über das Oracle-Skript der Zufallszahl speichert.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

Wenn du die Bereitstellung einsetzt, müssen 3 Parameter übergeben werden. Der **erste Parameter** ist der, `codeHash`der das Oracle script hash ist. Der **zweite Parameter** ist das Objekt der oracle script Request Parameters. Dies muss im Bytes Format übergeben werden. BandChain bietet eine REST-API für die Umwandlung des Parameters JSON-Objekt in das Bytes-Format. Die API-Details findest du [**hier**](https://docs.bandchain.org/references/encoding-params). Ein 0x muss der Antwort dieser API hinzugefügt werden. Der **dritte Parameter** ist die Vertragsadresse des BandChain Vertrags, der bereits im Polygon Netzwerk bereitgestellt wird. Das Bandprotokoll unterstützt Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

Eine andere Sache ist zu beachten, dass der Validierungsvertrag die helper und -Interface importieren soll, die aufgerufen wird `BandChainLib.sol`und beziehungsweise `IBridge.sol`wird. Sie finden sich in den folgenden Links: [**Bandchain**](https://docs.bandchain.org/references/bandchainlib-library) Library und [**IBridge**](https://docs.bandchain.org/references/ibridge-interface)-Schnittstelle.

  Sobald der Validierungsvertrag bereitgestellt wurde, können die Statusvariablen von der dApp abgefragt werden. Ebenso können mehrere Validierungsverträge für verschiedene in-built Oracle-Skripts erstellt werden. Die IBridge-Schnittstelle hat eine Methode namens genannt, die die Werte überprüft, `relayAndVerify()`die jedes Mal im Validierungsvertrag aktualisiert werden. Die `update()`Methode im Validierungsvertrag hat die Logik, die Zustandsvariablen zu aktualisieren. Der EVM der aus der Abfrage des Oracle Skripts erhalten wird, muss an die Methode weitergegeben `update()`werden. Jedesmal, wenn ein Wert aktualisiert wird, überprüft der BandChain Vertrag, der auf Polygon bereitgestellt wird, die Daten vor der Speicherung in der contract

Die BandChain bietet ein dezentrales Netzwerk von Oracles, das von dApps verwendet werden kann, um ihre Smart Contract Logik zu steigern. Die BandChain dokumentiert auf die Bereitstellung des Vertrags, die Speicherung der Werte und die Aktualisierung dieser können [**hier**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library) gefunden werden.