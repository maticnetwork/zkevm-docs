---
id: getting-started
title: Plasma Bridge
sidebar_label: Introduction
description: Interagisci con Plasma bridge e la rete di Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Consulta la più recente [documentazione Matic.js su Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/) per iniziare.

Un bridge è fondamentalmente un insieme di contratti che aiutano a spostare gli asset dalla catena principale alla catena figlio. Esistono principalmente due bridge per spostare gli asset tra Ethereum e Polygon. Il primo è il Plasma bridge, mentre il secondo è chiamato **PoS Bridge** o **Proof of Stake bridge**. **Il ponte di Plasma** offre una maggiore garanzia di sicurezza grazie al meccanismo di uscita del Plasma.

Tuttavia, esistono alcune restrizioni sul token figlio e c'è un periodo di prelievo di 7 giorni associato a tutte le uscite/tutti i prelievi da Polygon a Ethereum sul Plasma bridge. Il [PoS Bridge](/docs/develop/ethereum-polygon/pos/getting-started) è più flessibile e include prelievi più rapidi.

Questo tutorial fungerà da guida passo per capire e utilizzare il Plasma bridge utilizzando [Matic JS](https://github.com/maticnetwork/matic.js), il modo più semplice per interagire con il Plasma Bridge su Polygon Network.

## Flusso di asset nel Plasma bridge {#assets-flow-in-plasma-bridge}

In questo tutorial mostreremo il flusso di trasferimento degli asset su Polygon e come puoi fare lo stesso usando Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. Deposito utente crypto nel contratto Polygon
2. Una volta che i token depositati saranno confermati sulla catena principale, i corrispondenti token si rifletteranno sulla catena di Polygon.
   - L'utente può ora trasferire istantaneamente i token a chiunque desideri, con commissioni trascurabili. La catena di Polygon crea blocchi in modo più veloce (circa un secondo). In questo modo, il trasferimento avverrà quasi istantaneamente.
3. Una volta che un utente è pronto, possono prelevare i token rimanenti dalla catena principale. Il prelievo di fondi viene avviato dalla sidechain di Plasma. Viene impostato un intervallo di checkpoint pari a 5 minuti, in cui tutti i blocchi del layer dei blocchi di Polygon vengono convalidati sin dall'ultimo checkpoint.
4. Una volta che il checkpoint è stato presentato al contratto principale della catena Ethereum, un token NFT (ERC721) di uscita è creato con valore equivalente.
5. I fondi ritirati possono essere rivendicati al tuo Ethereum acccount dal contratto principale di catena utilizzando una procedura di uscita di processo.
   - L'utente può anche ottenere un'uscita rapida tramite 0x o Dharma (presto disponibile!).

### Prerequisiti: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Faucet Görli {#görli-faucet}

Per poter effettuare qualsiasi transazione, occorre un certo importo di Ether negli account di prova che utilizzerai durante il tutorial. Nel caso in cui non disponga di ETH su Görli, puoi utilizzare i link del rubinetto qui indicati — https://goerli-faucet.slock.it/.

### Polygon Faucet {#polygon-faucet}

In questo tutorial utilizzeremo come esempio il token ERC20 `TEST` sulla rete Görli. Questo è un token di TEST. Nella tua dApp puoi sostituirlo con qualsiasi token ERC20. Per ottenere dei token `TEST` di test sulla rete di Polygon, puoi accedere al [Faucet Polygon](https://faucet.polygon.technology/).

:::note

Per utilizzare i tuoi token per i depositi e i prelievi, dovrai ottenere il token 'mapped', che significa essenzialmente fare i contratti sulla catena principale e la sidechain 'aware' del tuo token personalizzato.

:::

### Configurazione di base per il wallet Metamask (opzionale) {#basic-setup-for-the-metamask-wallet-optional}

1. [Crea un wallet](/docs/develop/metamask/hello): se sei nuovo ai wallet, quindi crea un account MetaMask.
2. [Configurare il test Polygon](/docs/develop/metamask/config-polygon-on-metamask): per visualizzare facilmente il flusso di fondi su Polygon, è istruttivo se si configura la testnet Polygon su Metamask. Ricorda che qui utilizziamo Metamask solo a scopo di visualizzazione. Per l'utilizzo di Polygon non vi è il requisito di utilizzare Metamask.
3. [Crea account multipli](/docs/develop/metamask/multiple-accounts): prima di iniziare il tutorial, prepara 3 account Ethereum di prova.
4. [Configura il token su Polygon](/docs/develop/metamask/custom-tokens): per visualizzare facilmente il flusso di fondi su Polygon, utilizzando Matic.js, puoi configurare i token su Metamask.
Il `TEST`token, che è un esempio per questo tutorial, può essere configurato in MetaMask in modo da visualizzare facilmente i bilanci. Ancora una volta si noti che è **facoltativo**. Puoi facilmente interrogare i saldi token e le altre variabili utilizzando [web3.js](https://web3js.readthedocs.io/en/1.0/)
