---
id: quicknode
title: Distribuzione di uno Smart Contract utilizzando QuickNode
sidebar_label: Using QuickNode
description:  Distribuire Smart Contract su Polygon utilizzando Brownie e Quicknode.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Panoramica {#overview}

Python è uno dei linguaggi di programmazione più versatili; dai ricercatori che eseguono i loro modelli di test agli sviluppatori che lo utilizzano in ambienti di produzione pesanti, utilizza casi in ogni possibile campo tecnico.

In questo tutorial imparerai a utilizzare il framework [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) per scrivere e distribuire uno smart contract sfruttando i nodi di testnet [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) per Polygon.

:::tip

Per contattare il team di Quicknode, invia loro un messaggio o taggali su Twitter [@QuickNode](https://twitter.com/QuickNode).

:::

## Prerequisiti {#prerequisites}

- Python3 installato
- Un nodo di Polygon
- editor di codice
- Interfaccia della linea di comando

## Cosa farai {#what-you-will-do}

1. Configurare Brownie
2. Ottenere l'accesso ai nodi di prova di Quicknode
3. Compilare e distribuire uno smart contract
4. Controllare i dati del contratto distribuito

## Cos'è Brownie? {#what-is-brownie}

Lo sviluppo di smart contract è principalmente dominato da librerie basate su JavaScript come [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/) e [Hardhat](https://hardhat.org/). Python è una lingua versatile e molto utilizzata e può essere utilizzata anche per lo sviluppo di smart contract/Web3; [web3.py](https://web3py.readthedocs.io/en/stable/) è una libreria di Python che soddisfa le esigenze di Web3. Il framework Brownie è costruito in cima a `web3.py`.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) è un framework basato su Python per sviluppare e testare smart contract. Brownie supporta sia i contratti Solidity che quelli Vyper e offre anche la possibilità di testare i contratti tramite [pytest](https://github.com/pytest-dev/pytest).

Per dimostrare il processo di scrittura e distribuzione di uno smart contract con Brownie, utilizzeremo dei [Brownie-mix](https://github.com/brownie-mix) che sono dei progetti modello. Nello specifico, utilizzeremo un [mix di token](https://github.com/brownie-mix/token-mix), che è un modello dell'implementazione ERC-20.

## Installare le dipendenze {#install-dependencies}

Brownie è costruita su python3, per cui abbiamo bisogno che sia installato per lavorare con Brownie. Controlliamo se abbiamo installato python3 sul nostro sistema. Per farlo, digita quanto segue nel tuo strumento di riga di comando:

```bash
python3 -V
```

Questo dovrebbe restituire la versione di python3 installata. Se non è installato, scaricalo e installalo dal [sito ufficiale di python](https://www.python.org/downloads/).

Creiamo una directory di progetto prima di installare Brownie e facciamo in modo che la directory di progetto sia la nostra directory di lavoro corrente:

```bash
mkdir brownieDemo
cd brownieDemo
```

Ora che hai installato python3 sul tuo sistema, installiamo brownie utilizzando pip, il gestore di pacchetti di Python. Pip è simile a npm per JavaScript. Digitare quanto segue nella tua riga di comando:

```bash
pip3 install eth-brownie
```

:::tip

Se l'installazione non va, puoi invece utilizzare il seguente comando:`sudo pip3 install eth-brownie`

:::

Per verificare se Brownie è stato installato correttamente, `brownie`digita la tua linea di comando e dovrebbe dare il seguente risultato:

![img](/img/quicknode/brownie-commands.png)

Per ottenere il token mix, digita semplicemente quanto segue nella tua linea di comando:

```
brownie bake token
```

Questo creerà una nuova directory `token/`nella nostra `brownieDemo`directory.

### Struttura dei file {#file-structure}

Prima di tutto, navigare nella `token`directory:

```bash
cd token
```

Ora apri la `token`directory nel tuo editor di testo. Sotto la `contracts/`cartella che troverai , `Token.sol`che è il nostro principale contratto. Puoi scrivere i tuoi contratti o modificare il `Token.sol`file.

Sotto la `scripts/`cartella, troverai `token.py`Python script. Questo script verrà utilizzato per distribuire il contratto e sono necessarie modifiche in base ai contratti.

![img](/img/quicknode/token-sol.png)

Il contratto è un contratto ERC-20. Puoi saperne di più sugli standard e i contratti ERC-20 in questa [guida sui token](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) ERC-20.

## Avvio del tuo nodo Polygon {#booting-your-polygon-node}

QuickNode ha una rete globale di nodi di Polygon Mainnet e Mumbai. Eseguono anche un [Polygon RPC pubblico](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) gratuito, ma se si ottiene una tariffa limitata, è possibile iscriversi per un [nodo di prova gratuito da QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

![img](/img/quicknode/http_URL.png)

Copia **l'URL HTTP**, che sarà utile in seguito nel tutorial.

## Configurazione della rete e dell'account {#network-and-account-setup}

Dobbiamo configurare il nostro endpoint QuickNode con Brownie. Per farlo, digita quanto segue nella tua linea di comando:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Sostituire con **l'URL Mumbai Testnet HTTP** che abbiamo appena ricevuto durante l'avvio `YOUR_QUICKNODE_URL`del nostro nodo Polygon.

Nel comando precedente, `Ethereum` è il nome dell'ambiente e `matic_mumbai` è il nome personalizzato della rete; puoi dare qualsiasi nome alla tua rete personalizzata.

La prossima cosa che dobbiamo fare è creare un nuovo wallet utilizzando Brownie, per digitare le seguenti nella tua riga di comando:

```
brownie accounts generate testac
```

Ti verrà chiesto di impostare una password per il tuo account! Dopo aver completato i passaggi, questo genererà un account insieme a una frase mnemonica, salvarlo offline. Il nome `testac`è il nome del nostro account (Puoi scegliere qualsiasi nome che ti piace).

![img](/img/quicknode/new-account.png)

:::note

Le frasi mnemonic possono essere utilizzate per recuperare un account o importare l'account in altri [<ins>portafogli non custodiali</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode). L'account che vedi nell'immagine qui sopra è stato creato proprio per questa guida.

:::

Copia l'indirizzo dell'account in modo che possiamo ottenere un MATIC di prova, che sarà necessario per distribuire il nostro contratto.

## Ottenere Testnet MATIC {#getting-testnet-matic}

Ci serviranno alcuni token MATIC per pagare le gas fee per distribuire il nostro smart contract.

Copia l'indirizzo del tuo account che abbiamo generato in questo tutorial, incollarlo nel campo dell'indirizzo del [rubinetto di Polygon](https://faucet.polygon.technology/) e clicca su **Inviare**. Il faucet ti invierà 0,2 MATIC di prova.

![img](/img/quicknode/faucet.png)

## Distribuzione dello Smart Contract {#deploying-your-smart-contract}

Prima di implementare il contratto, devi compilarlo utilizzando:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

Ora apri l'editor `scripts/token.py`di testo e apporta le seguenti modifiche:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info Spiegazione

Utilizzando il codice precedente, abbiamo importato `testac`l'account che abbiamo creato in precedenza e memorizzato in `acct`variabile. Inoltre, nella prossima linea, abbiamo modificato `'from':`parte per ricevere dati da `acct`variabile.

:::

Infine, distribuiremo il nostro smart contract:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`è il nome della rete personalizzata che abbiamo creato prima. Il prompt ti chiederà la **password** che impostiamo prima durante la creazione dell'account.

Dopo aver eseguito il comando di cui sopra, devi ottenere l'hash della transazione e Brownie aspetterà che la transazione venga confermata. Una volta confermata la transazione, verrà restituito l'indirizzo al quale il nostro contratto è distribuito sulla testnet di Polygon Mumbai.

![img](/img/quicknode/brownie-run.png)

Puoi controllare il contratto distribuito copiando l'indirizzo del contratto all'indirizzo [Polygonscan Mumbai](https://mumbai.polygonscan.com/).

![img](/img/quicknode/polygonscan.png)

## Testare il contratto {#testing-the-contract}

Brownie offre anche la possibilità di testare le funzionalità degli smart contract. Usa il framework `pytest` per generare facilmente test di unità. Puoi trovare maggiori informazioni sulla scrittura dei test su Brownie [nella loro documentazione](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#).

**Ecco come vengono distribuiti i contratti su Polygon utilizzando Brownie e QuickNode.**

QuickNode, proprio come Polygon, ha sempre avuto un approccio educativo che fornisce [guide](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) agli sviluppatori, [doc](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [video tutorial](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) e una [comunità di sviluppatori Web3](https://discord.gg/DkdgEqE) che sono desiderosi di aiutarsi a vicenda.
