---
id: matic-to-ethereum
title: Übertragung von Daten von Polygon auf Ethereum
description: Übertrage Status oder Daten über Verträge von Ethereum zu Polygon
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Der Mechanismus für die Übertragung von Daten von Polygon auf Ethereum unterscheidet sich von der Datenübertragung von Ethereum auf Polygon. Dafür werden die von den Validatoren auf der Ethereum-Chain erstellten **Checkpoint**-Transaktionen verwendet. Zuerst wird auf Polygon eine Transaktion erstellt. Bei der Erstellung dieser Transaktion muss sichergestellt werden, dass ein **-Ereignis ausgegeben wird** und die **-Ereignisprotokolle die Daten enthalten, die wir** von Polygon auf Ethereum übertragen möchten.

In einer Zeit (etwa 10-30 min) wird diese Transaktion von den Prüfern auf die Ethereum-Chain überprüft. Sobald das Checkpointing abgeschlossen ist, kann der Hash der auf der Polygon-Chain erzeugten Transaktion als Nachweis für den **RootChainManager**-Vertrag auf der Ethereum-Chain eingereicht werden. Dieser Vertrag bestätigt die Transaktion, prüft, ob diese Transaktion im Checkpoint enthalten ist und decodiert schließlich die Ereignisprotokolle aus dieser Transaktion.

Nach dieser Phase können wir die **decodierten Ereignisprotokolldaten verwenden, um Änderungen** am root-Vertrag vorzunehmen, der auf der Ethereum-Chain bereitgestellt ist. Dafür müssen wir auch sicherstellen, dass der Statuswechsel auf Ethereum nur auf sichere Weise erfolgt. Wir verwenden daher einen **Predicate**-Vertrag, der eine besondere Art von Vertrag ist, die nur durch den **RootChainManager**-Vertrag ausgelöst werden kann. Diese Architektur stellt sicher, dass Statusänderungen auf Ethereum nur dann stattfinden, wenn die Transaktion bei Polygon durch den **RootChainManager**-Vertrag auf der Ethereum-Chain einen Checkpoint durchläuft und verifiziert wird.

# Übersicht {#overview}

- Eine Transaktion wird auf dem auf der Polygon-Chain bereitgestellten Child-Vertrag ausgeführt.
- Bei dieser Transaktion wird auch ein Ereignis ausgegeben. Die Parameter dieses **Ereignisses sind die Daten**, die von Polygon zu Ethereum übertragen werden müssen.
- Die Validatoren im Polygon-Netzwerk greifen diese Transaktion in einem bestimmten Zeitintervall auf (meist 10-30 Min.) auf, validieren sie und **fügen sie zum Checkpoint** auf Ethereum hinzu.
- Auf der **RootChain** wird eine Checkpoint-Transaktion erstellt, wonach die Aufnahme in den Checkpoint mit diesem [Skript](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js) geprüft werden kann
- Sobald die Aufnahme in den Checkpoint abgeschlossen ist, kann die **matic.js**-Bibliothek verwendet werden, um die **Exit**-Funktion des **RootChainManager**-Vertrags aufzurufen. Die **Exit**-Funktion kann mit der matic.js-Bibliothek aufgerufen werden, wie in diesem [Beispiel](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js) gezeigt.

- Die Ausführung des Skripts prüft die Aufnahme des Polygon-Transaktions-Hash in die Ethereum-Chain und ruft dann die **exitToken**-Funktion des [predicate](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol)-Vertrags auf.
- Dies stellt sicher, dass eine **Statusänderung im Root-Chain-Vertrag** immer auf **sichere** Weise und **nur durch den predicate-Vertrag** erfolgt.
- Besonders wichtig ist, dass die **Verifizierung des Transaktions-Hash** von Polygon und die **Auslösung des predicate**-Vertrags in einer **einzigen Transaktion** erfolgen, was die Sicherheit jeder Statusänderung im Root-Vertrag sicherstellt.

# Implementierung {#implementation}

Hier zeigen wir dir auf einfache Weise, wie Daten von Polygon zu Ethereum übertragen werden können. Dieser Leitfaden beschreibt wie ein uint256-Wert durch die gesamte Chain übertragen werden kann. Du kannst jedoch Datentypen übertragen. Dafür musst du die Daten aber in Bytes codieren und dann aus dem Child-Vertrag ausgeben. Im Root-Vertrag können sie schließlich decodiert werden.

1. Erstelle zuerst den Root-Chain- und den Child-Chain-Vertrag. Stelle sicher, dass die Funktion, die die Statusänderung ausführt, auch ein Ereignis ausgibt. Dieses Ereignis muss die zu übertragenden Daten als Parameter enthalten. Nachfolgend findest du ein Beispiel dafür, wie der Child- und Root-Vertrag aussehen müssen. Das ist ein sehr einfacher Vertrag mit einer Datenvariable, deren Wert mit einer setData-Funktion festgelegt wurde. Das Aufrufen der setData-Funktion gibt das Datenereignis aus. Die restlichen Dinge im Vertrag werden in den nachfolgenden Abschnitten dieses Leitfadens erklärt.

A. Child-Vertrag

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. Root-Vertrag

Gib diese `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f` als Wert für `_predicate` im Root-Vertrags-Constructor weiter.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. Sobald der Child- und Root-Vertrag in der Polygon- bzw. Ethereum-Chain bereitgestellt wurden, müssen diese Verträge mit der PoS-Bridge gemappt werden. Mit dieser Mapping wird sichergestellt, dass eine Verbindung zwischen diesen beiden Verträgen über die Chains hinweg besteht. Für dieses Mapping kann das Polygon-Team auf [Discord](https://discord.com/invite/0xPolygon) erreicht werden.

3. Beachte bitte, dass im Root-Vertrag ein onlyPredicate-Modifikator vorhanden sein muss. Es wird empfohlen, diesen Modifikator immer zu verwenden, da er sicherstellt, dass nur der Predicate-Vertrag die Statusänderung im Root-Vertrag vornimmt. Der Predicate-Vertrag ist ein spezieller Vertrag, der den Root-Vertrag nur auslöst, wenn die Transaktion, die auf der Polygon-Chain stattgefunden hat, vom RootChainManager auf der Ethereum-Chain verifiziert wurde. Dies stellt eine sichere Statusänderung im Root-Vertrag sicher.

Um die oben beschriebene Implementierung zu testen, können wir eine Transaktion auf der Polygon-Chain erstellen, indem wir die **setData**-Funktion im Child-Vertrag aufrufen. Jetzt müssen wir warten, bis der Checkpoint abgeschlossen ist. Die Aufnahme in den Checkpoint kann mit diesem [Script](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js) geprüft werden. Rufe nach Abschluss des Checkpoints die Exit-Funktion des RootChainManagers mit dem matic.js SDK auf.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

Wie im oben stehenden Screenshot gezeigt, ist der **txHash** der Transaktions-Hash der Transaktion, die im Child-Vertrag auf der Polygon-Chain bereitgestellt wurde.

Die **logEventSignature** ist der keccack-256-Hash des Datenereignisses. Dies ist der gleiche Hash, den wir in den Predicate-Vertrag aufgenommen haben. Den gesamten Vertragscode, der für diesen Leitfaden und das Exit-Script verwendet wird, findest [du hier](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

Sobald das Exit-Script abgeschlossen ist, kann der Root-Vertrag auf der Ethereum-Chain abgefragt werden, um zu überprüfen, ob der Wert der im Child-Vertrag festgelegten variablen **Daten** auch in der **Datenvariable** des Root-Vertrags widergespielt wird.
