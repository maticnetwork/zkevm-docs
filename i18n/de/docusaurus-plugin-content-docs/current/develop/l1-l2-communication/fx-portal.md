---
id: fx-portal
title: FxPortal
description: Übertrage Status oder Daten von Ethereum zu Polygon, ohne mit FxPortal zuzuordnen.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Der übliche Mechanismus, um Ethereum-Daten von Polygon nativ zu lesen, verwendet **State Sync**. Dies ermöglicht die Übertragung beliebiger Daten von Ethereum zu Polygon. Dieser Ansatz erfordert aber auch das Mapping der Root- und Child-Verträge, wenn die Standardschnittstelle nicht verwendet werden kann. FxPortal bietet eine Alternative, bei der standardisierte Token von ERC ohne Mapping bereitgestellt werden können, indem bereitgestellte FxPortal-Verträge verwendet werden.

## Was ist FxPortal? {#what-is-fxportal}

Es ist eine leistungsfähige und dennoch einfache Implementierung des Polygon [State Sync](../../pos/state-sync/state-sync-mechanism.md) Mechanismus. Die Polygon PoS-Bridge basiert auf derselben Architektur. Der Code im [examples](https://github.com/fx-portal/contracts/tree/main/contracts/examples) sind einige Beispiele für die Verwendung. Du kannst diese Beispiele verwenden, um deine eigenen Implementierungen oder deine eigene benutzerdefinierte Bridge zu erstellen, die eine State-Sync ohne Zuordnung ermöglicht.

Du kannst das [GitHub Repository](https://github.com/fx-portal/contracts) für Verträge und Beispiele ansehen.

## Wie funktioniert es? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) und [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) sind die wichtigsten Verträge, auf denen FxPortal funktioniert. Er ruft und leitet Daten an benutzerdefinierte Methoden auf der anderen Chain weiter, ohne dass eine Zuordnung mit dem State Sync Mechanismus verwendet wird. Um die bereitgestellten Hauptverträge zu verwenden, kannst du die Basisverträge von FxPortal in deine bereitgestellten Smart-Verträge implementieren – [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) und [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Aufbauend auf diese Verträge können deine bereitgestellten Verträge über den Datentunnelmechanismus miteinander kommunizieren.

Andernfalls kannst du deine Token mit den bereits bereitgestellten tunnel kartieren. Default für Polygon Mainnet und Mumbai Testnet sind wie folgt:

- [Polygon Mainnet](https://static.matic.network/network/mainnet/v1/index.json)
- [Mumbai Testnet](https://static.matic.network/network/testnet/mumbai/index.json)

Suchen Sie nach dem Keyword `FxPortalContracts`in den obigen Links, um alle default und andere wichtige FxPortal zu finden.

## Brauche ich eine Custom FxTunnel Implementation? {#do-i-need-a-custom-fxtunnel-implementation}

Du musst für eine **benutzerdefinierte** FxTunnel nur entscheiden, wenn die default nicht mit deinem Use Case übereinstimmen. Wenn du die default von FxPortal verwendest, kannst du den child nicht ändern. Der Bytecode für den Child-Token-Vertrag ist immer behoben und bleibt immer gleich für die [default](https://github.com/fx-portal/contracts/tree/main/contracts/examples) Wenn du einen benutzerdefinierten Child-Token brauchst, musst du für deinen eigenen benutzerdefinierten FxTunnel gehen und den nächsten Teil lesen, wird dich mehr bei der Bereitstellung deiner eigenen benutzerdefinierten FxTunnels leiten.

Es wird dringend empfohlen, [FxPortal State Transfer](state-transfer.md) zu lesen und zu verstehen, bevor du den bevorstehenden Abschnitt liest. Jeder dieser kommenden Abschnitte wird beispielsweise tunnel haben, die ihm beigefügt sind. Diese Beispiele können als Referenz verwendet werden, während du deine eigenen benutzerdefinierten fx-tunnels. erstellt.

## Übertragung von ERC20 {#erc20-transfer}

Die [child root](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) ermöglichen die Einzahlung von Token auf der Root-Chain und die Auszahlung auf der on

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: Du kannst die Funktion im bereitgestellten Vertrag aufrufen, um deinen ERC20-Token zuzuordnen und einen entsprechenden Child-Token auf der Child-Chain zu erstellen.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: `deposit()`call mit der Adresse des zugewiesenen Tokens und der Adresse, die mit einem entsprechenden Betrag zurückziehen kann (zusammen mit Daten, falls erforderlich). Du musst den Vertrag über die standardmäßige ERC20 `approve`-Funktion genehmigt haben, um deine Token zuerst auszugeben.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: Die in zugewiesene Adresse `deposit()`kann die gesamte Menge an Child-Token mit dieser Funktion zurückziehen. Sie erhält das Child-Token, das beim ersten Mapping erstellt wurde.
- `rootToChildToken`: Diese öffentliche Variable enthält den Root-Token auf child Du kannst das Mapping mit der Adresse des Root-Tokens abfragen, um die Adresse des bereitgestellten Child-Tokens zu erfahren.

### Aus Ethereum → Polygon {#polygon}

1. Stelle dein eigenes ERC20-Token auf der Root-Chain bereit. Du benötigst diese Adresse später.
2. Genehmige die Token für die Übertragung durch Aufrufen der `approve()`-Funktion des Root-Tokens mit der Adresse des Root-Tunnels und des Betrags als Argumente.
3. Rufe dann `deposit()` mit der Adresse des Empfängers und dem Betrag auf der Root-Chain auf, um das entsprechende Child-Token auf der Child-Chain zu erhalten. Dadurch wird das Token auch automatisch gemappt. Alternativ kannst du zuerst `mapToken()` aufrufen, bevor du einzahlst.
4. Nach der Zuordnung solltest du nun in der Lage sein, Cross-Chain Transfers mit der `deposit`und `withdraw`Funktionen des Tunnels auszuführen.

:::note

Nachdem du `deposit()`auf der Root-Chain durchgeführt hast, dauert es 22-30 Minuten, bis die State Sync geschehen ist. Sobald der State Sync stattfindet, erhältst du die Token an der angegebenen Adresse hinterlegt.

:::

### Aus Polygon → Ethereum {#ethereum}

1. Rufe `withdraw()` mit der jeweiligen Token-Adresse und dem Betrag als Argumente im Child-Vertrag auf, um die Child-Token zum vorgesehenen Empfänger auf der Root-Chain zurück zu verschieben. **Schreibe dir den tx Hash auf**, da dieser verwendet wird, um den Burn-Proof zu generieren.

2. Die Schritte zum Abschließen des Widerrufs findest du [hier](#withdraw-tokens-on-the-root-chain).

## ERC721 Transfer {#erc721-transfer}

Falls du ein Beispiel brauchst, schau dir diesen [ERC721 Root und Child Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) Guide an.

### Aus Ethereum → Polygon {#polygon-1}

1. Stelle dein eigenes ERC721-Token auf der Root-Chain bereit. Du benötigst diese Adresse später.
2. Genehmige die Token für die Übertragung durch Aufrufen der `approve()`-Funktion des Root-Tokens mit der Adresse des Root-Tunnels und der Token-ID als Argumente.
3. Rufe `deposit()` mit der Adresse des Empfängers und der Token-ID auf der Root-Chain auf, um das entsprechende Child-Token auf der Child-Chain zu erhalten. Dadurch wird das Token auch automatisch gemappt. Alternativ kannst du zuerst `mapToken()` aufrufen, bevor du einzahlst.

:::note

Nachdem du `deposit()`auf der Root-Chain durchgeführt hast, dauert es 22-30 Minuten, bis die State Sync geschehen ist. Sobald der State Sync stattfindet, erhältst du die Token an der angegebenen Adresse hinterlegt.

:::

### Aus Polygon → Ethereum {#ethereum-1}

1. Rufe `withdraw()` mit der jeweiligen Token-Adresse und dem Betrag als Argumente im Child-Vertrag auf, um die Child-Token zum vorgesehenen Empfänger auf der Root-Chain zurück zu verschieben. **Beachten Sie, dass der tx Hash** verwendet wird, um den Burn-Proof zu generieren.

2. Die Schritte zum Abschließen des Widerrufs findest du [hier](#withdraw-tokens-on-the-root-chain).

## ERC1155-Übertragung {#erc1155-transfer}

Falls du ein Beispiel brauchst, schau dir diesen [ERC1155 Root und Child Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) Guide an.

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: Wird verwendet, um dein Root-ERC1155-Token auf die Child-Chain zu mappen
- `deposit(rootToken, user, id, amount, data)`: Funktion, die genutzt wird, um Root-Token auf die Child-Chain einzuzahlen
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: Wird für mehrere Token-IDs und entsprechende Beträge verwendet
- `receiveMessage(inputData)`: Wird aufgerufen, nachdem der Burn-Proof mit der Payload als `inputData` generiert wurde

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: Wird verwendet, um Token von Polygon auf Ethereum auszuzahlen
- `withdrawBatch(childToken, ids, amounts, data)`: Gleiches wie die Auszahlung, aber für die Auszahlung mehrerer Token-IDs

### Aus Ethereum → Polygon {#polygon-2}

1. Stelle dein ERC1155-Token auf der Root-Chain bereit. Du benötigst diese Adresse später.
2. Rufe den bereitgestellten Token mit `FxERC1155RootTunnel`Adresse `setApprovalForAll(operator, approved)`an, um zu `operator`erlauben, deine Token an Polygon zu `FxERC1155RootTunnel``FxERC1155ChildTunnel`übertragen.
3. `mapToken()`Rufe `FxERC1155RootTunnel`mit der Adresse deines bereitgestellten Tokens an.`rootToken` Dies wird eine Nachricht senden, um sie `FxERC1155ChildTunnel`anzuweisen, den ERC1155 Token auf Polygon zu implementieren und abzubilden. Um deine Child-Token-Adresse abzufragen, rufe `rootToChildToken`an .`FxERC1155ChildTunnel`
4. Rufe `FxERC1155RootTunnel`mit der Adresse des Tokens auf Ethereum als , `rootToken`Empfänger als , `user`Token-ID als `id`und der Menge als `deposit()`auf.`amount` Alternativ kannst du auch `depositBatch()` für mehrere Token-IDs aufrufen.

:::note

Nachdem du `deposit()`auf der Root-Chain durchgeführt hast, dauert es 22-30 Minuten, bis die State Sync geschehen ist. Sobald der State Sync stattfindet, erhältst du die Token an der angegebenen Adresse hinterlegt.

:::

### Aus Polygon → Ethereum {#ethereum-2}

1. Rufe `FxERC1155ChildTunnel`mit der Adresse des Child-Tokens `withdraw()`auf, das auf Polygon als die `childToken`und der Token-ID als bereit gestellt wird, an `id`(die Child-Token-Adresse kann von der Zuordnung abgefragt `rootToChildToken`werden). Alternativ kannst du auch `withdrawBatch()` für mehrere Token-IDs und entsprechende Beträge aufrufen. **Beachten Sie, dass der tx Hash** verwendet wird, um den Burn-Proof zu generieren.

2. Die Schritte zum Abschließen des Widerrufs findest du [hier](#withdraw-tokens-on-the-root-chain).

## Token auf der Root-Chain ausheben {#withdraw-tokens-on-the-root-chain}

:::info

Nachdem du `withdraw()`auf der Child-Chain durchgeführt hast, dauert es 30-90 Minuten, bis ein Checkpoint stattfindet. Sobald der nächste Checkpoint die Burn-Transaktion enthält, kannst du die Token auf der Root-Chain abheben.

:::

1. Erstelle den burn mit dem **tx hash** und **MESSAGE_SENT_EVENT_SIG**. Um den Proof zu generieren, kannst du entweder die von Polygon gehostete proof verwenden, oder du kannst deine eigene [generation](https://github.com/maticnetwork/proof-generation-api) auch drehen, indem du den Anweisungen folgend.

Der proof der von Polygon gehostet wird, ist [hier](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature}) verfügbar.

  - `burnTxHash`ist der transaction der `withdraw()`Transaktion, die du auf Polygon initiiert hast.
  - `eventSignature`ist die event des Ereignisses, das von der Funktion ausgesandt `withdraw()`wird. Die event für die MESSAGE_SENT_EVENT_SIG `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`ist.

Die proof API Nutzungsbeispiele für Mainnet und Testnet sind wie folgt:

→ [Polygon Mainnet Proof Generierung](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Mumbai Testnet Proof Generation](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Füge die generierte Nutzlast als Argument `receiveMessage()`in dem jeweiligen Root-Tunnel-Vertrag auf Goerli oder Ethereum ein.

## Mintable ERC-20-Übertragung {#mintable-erc-20-transfer}

Falls du ein Beispiel brauchst, schau dir diesen [Mintable ERC20 Root und Child Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) Guide an.

:::info

Im Falle von Mintable Token FxTunnels wird der Child-Token zuerst bereitgestellt und der Root-Token nur dann bereitgestellt, wenn der erste withdraw/exit abgeschlossen ist. Die Vertragsadresse für root Token kann direkt nach dem Einsatz des pre-determined vorbestimmt werden, aber die Mapping wird technisch nur bestehen, wenn die erste Auszahlung / den Ausgang abgeschlossen ist.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: Um Token von Ethereum auf Polygon einzuzahlen
- `receiveMessage(bytes memory inputData)`: Burn-Proof, der als `inputData` ausgegeben wird, um Token auf der Root-Chain zu empfangen

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: um einen ERC20-Token im Polygon Netzwerk bereitzustellen
- `mintToken(address childToken, uint256 amount)`: Mintet eine bestimmte Anzahl von Tokens auf Polygon
- `withdraw(address childToken, uint256 amount)`: Um Token auf die Child-Chain zu brennen, um auf der Root-Chain auszuzahlen

### Token auf Polygon abzählen {#minting-tokens-on-polygon}

1. Rufe die `deployChildToken()` auf `FxMintableERC20ChildTunnel` auf und übertrage die erforderlichen Token-Informationen als Parameter. Dies gibt ein `TokenMapped`-Ereignis aus, das die `rootToken`- und `childToken`-Adressen enthält. Schreibe dir diese Adressen auf.
2. Rufe `mintToken()` auf `FxMintableERC20ChildTunnel` auf, um Token auf der Child-Chain zu minten.
3. Rufe `withdraw()` auf `FxMintableERC20ChildTunnel` auf, um Token von Polygon auszuzahlen. Beachten Sie den transaction da dies praktisch ist, um den Burn-Proof zu generieren.
4. Die Schritte zum Abschließen des Widerrufs findest du [hier](#withdraw-tokens-on-the-root-chain).

### Token auf Ethereum abheben {#withdrawing-tokens-on-ethereum}

Füge den generierten Burn-Proof als Argument für `receiveMessage()` in `FxMintableERC20RootTunnel` ein. Danach wird das Token-Guthaben auf der Root-Chain angezeigt.

### Token zurück an Polygon einzahlen {#deposit-tokens-back-to-polygon}

1. Stelle sicher, dass du `FxMintableERC20RootTunnel` genehmigst, um deine Token zu übertragen.
2. Rufe `deposit()` in `FxMintableERC20RootTunnel` mit der `rootToken` als Adresse des Root-Tokens und `user` als Empfänger auf.
3. Warte auf das State Sync Event (22-30 min). Danach kannst du das Guthaben des Zielempfängers auf der Child-Chain abfragen.

Die Beispiele **ERC721** und **ERC1155** Mintable FxTunnel sind wie folgt:

- [FxMintableERC721Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## Beispiele für Bereitstellungen {#example-deployments}

### Goerli {#goerli}

- Checkpoint Manager: [0x2890bA17EfE978480615e330ecB65333b80928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Dummy ERC20 Token: [0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTunnel: [0xA200766a7D64E54611E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Dummy ERC721 Token: [0x73594a053cb5ddDE558268d28a774375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTunnel: [0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Dummy ERC1155 Token: [0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d187888cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- [FxERC20:](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7) 0xDDE69724AeFBdb08413719fE745aB66e3b055C7
- FxERC20ChildTunnel: [0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- [FxMintableERC20ChildTunnel:](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9) 0xA2C7eBEf68B44056b4A39C2CEC23844275C56e9
- Child-Token-Platzhalter ERC20: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E048726267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721ChildTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunnel: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

Die entsprechenden Mainnet findest du [hier](https://static.matic.network/network/mainnet/v1/index.json). Suchen Sie nach dem Keyword, `FxPortalContracts`um alle default und andere wichtige FxPortal zu finden. Du kannst das [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)Paket nutzen, um auf die Vertragsadressen und ABIs zuzugreifen.

## Vertragsadressen {#contract-addresses}

### Mumbai-Testnet {#mumbai-testnet}

| Vertrag | Bereitgestellte Adresse  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Polygon Mainnet {#polygon-mainnet}


| Vertrag | Bereitgestellte Adresse  |
| :----- | :- |
| [FxRoot (Ethereum-Mainnet)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild (Polygon-Mainnnet)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
