---
id: delegate
title: Come delegare
description: Scopri come diventare un delegatore sulla rete di Polygon.
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Come delegare {#how-to-delegate}

Questa è una guida passo passo per aiutarti a diventare un [delegatore](/docs/maintain/glossary.md#delegator) sulla rete di Polygon.

L'unico prerequisito è possedere token MATIC ed ETH sull'indirizzo Ethereum mainnet.

## Accedi alla dashboard {#access-the-dashboard}

1. Nel tuo wallet (ad esempio MetaMask), scegli Ethereum mainnet.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. Accedi a [Polygon Staking](https://staking.polygon.technology/).
3. Una volta che ti colleghi, vedrai alcune statistiche generali insieme all'elenco dei validatori.

![img](/img/staking/home.png)

:::note

Se sei un validatore, usa un indirizzo diverso per non validare il login come delegatore.

:::

## Delegare a un validatore {#delegate-to-a-validator}

1. Fai clic su **Diventa un delegatore** o scorri verso il basso per selezionare un validatore specifico, quindi fai clic su **Delega**.

![img](/img/staking/home.png)

2. Fornisci l'importo di MATIC necessario a delegare.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. Approva la transazione di delega, quindi fai clic su **Delega**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

Una volta completata la transazione di delega, verrà visualizzato il messaggio: **Delega completata**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## Visualizza le tue deleghe {#view-your-delegations}

Per visualizzare le tue deleghe, fai clic su [Il mio account](https://staking.polygon.technology/account).

![img](/img/staking/myAccount.png)

## Preleva le ricompense {#withdraw-rewards}

1. Fai clic su [Il mio account](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Sotto il validatore da te delegato, fai clic su **Preleva ricompensa**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

Questo consentirà di inviare le ricompense in token MATIC al tuo indirizzo Ethereum.

## Rimetti in staking le ricompense {#restake-rewards}

1. Fai clic su [Il mio account](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Sotto il validatore da te delegato, fai clic su **Rimetti in staking la ricompensa**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

Questo restituirà le ricompense del token MATIC al validatore e aumenterà la quota della tua delega.

## Procedura di unbond da un validatore {#unbond-from-a-validator}

1. Fai clic su [Il mio account](https://staking.polygon.technology/account).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. Sotto il validatore da te delegato, fai clic su **Unbond**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

Questo preleverà le tue ricompense dal validatore e l'intera puntata dal validatore.

Le ricompense ritirate si presenteranno immediatamente sul tuo account Ethereum.

I fondi degli stake prelevati verranno bloccati per 80 [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction).

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

Il blocco dei fondi per il periodo di unbonding è in vigore per garantire che non si verifichino comportamenti fraudolenti sulla rete.

:::

## Sposta lo stake da un nodo all'altro {#move-stake-from-one-node-to-another-node}

Lo spostamento dello stake da un nodo all'altro implica una transazione singola. Nel corso di questo evento non si verificano ritardi o periodi di unbonding.

1. Accedi a [Il mio account](https://wallet.polygon.technology/staking/my-account) nella dashboard di staking.
1. Fai clic su **Sposta stake** sotto il validatore da te delegato.
1. Seleziona un validatore esterno, quindi fai clic su **Metti in stake**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. Inserisci l'importo dello stake e fai clic su **Sposta stake**.

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

In questo modo lo stake verrà spostato. La dashboard si aggiornerà dopo 12 conferme del blocco.

:::info

La posta in movimento è consentita tra qualsiasi nodi. L'unica eccezione è spostare la partecipazione da un nodo di fondazione a un altro nodo di Fondazione che non è consentito.

:::
