---
id: api-architecture
title: API-Architektur
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: Lesen und Schreiben von APIs und Transaktionseinstellungen
---

Die Bibliothek folgt der gesamten gemeinsamen API-Architektur. Die APIs sind in zwei Typen unterteilt -

1. API lesen
2. API schreiben

## API lesen {#read-api}

Durch "APIs lesen" wird auf der Blockchain nichts veröffentlicht. Es wird also kein Gas verbraucht. Beispiele der gelesenen APIs sind `getBalance`, `isWithdrawExited` etc.

Sehen wir uns ein Beispiel der gelesenen API an.

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

Die gelesenen APIs sind sehr einfach und das Ergebnis wird direkt zurückgegeben.

## 2. API schreiben {#2-write-api}

Durch "APIs schreiben" werden einige Daten auf der Blockchain veröffentlicht. Es wird also Gas verbraucht. Beispiele der geschriebenen APIs sind `approve`, `deposit` etc.

Wenn du "API schreiben" aufrufst, benötigst du zwei Daten aus dem Ergebnis.

1. TransactionHash
2. TransactionReceipt

Nachfolgend ist ein Beispiel von "API schreiben". Erwerben wir jetzt den Transactionhash und Beleg -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### Transaktionsoption {#transaction-option}

Es gibt einige konfigurierbare Optionen, die für alle API's verfügbar sind. Diese Konfigurationen können in Parametern übergeben werden.

Verfügbare Konfigurationen sind -

- from?: string | number - Die Adresse, aus der die Transaktionen gemacht werden sollen.
- to?: string - Die Adresse, aus die Transaktionen gemacht werden sollen.
- value?: number | string | BN - Der für die Transaktion in wei übertragene Wert.
- gasLimit?: nummer | string - Das Maximum an Gas, das für eine Transaktion bereitgestellt ist (Gaslimit).
- gasPrice?: number | string | BN - Der Gaspreis in wei, der für  Transaktionen bestimmt ist.
- data?: string - Der Byte-Code des Contracts.
- nonce?: number;
- chainId?: number;
- chain?: string;
- hardfork?: string;
- returnTransaction?: boolean - Beim Wert Wahr wird das Transaktionsobjekt zurückgegeben, mit dem die Transaktion manuell gesendet werden kann.

Sehen wir uns ein Beispiel an, wo der gasPrice konfiguriert wird

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
