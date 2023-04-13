---
id: stakingmanager
title: Manager dello staking
description: Staking Manager è il principale contratto per la gestione delle attività correlate ai validatori sulla rete Polygon.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Per il consenso basato sulla prova di sicurezza di Polygon, tutte le verifiche e la gestione delle staking, vengono eseguite le ricompense sullo smart contract Ethereum. L'intero design segue questa filosofia di fare meno sul contratto Mainnet. La verifica delle informazioni spinge tutte le operazioni di calcolo a L2 (leggi su [Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview)).

Gli **Stakers** sono suddivisi in **validatori**, **delegatori** e **watcher** (per il reporting delle frodi).

[**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) è il principale contratto per la gestione delle attività correlate al validatore come la verifica della `checkPoint`firma, la distribuzione della ricompensa e la gestione delle partecipazioni. Poiché il contratto utilizza **NFT ID** come fonte di proprietà, il cambio di proprietà e il firmatore non influirà su nulla nel sistema.

:::tip

Da un indirizzo Ethereum, uno **Staker può essere solo un validatore o un delegatore** (è solo una scelta di design, senza motivi difficili).

:::

## accettatori di validatore/sostituzione {#validator-admissions-replacement}

### Le ammissioni {#admissions}
Attualmente non esistono slot per il validatore aperto disponibili su Polygon PoS. Esiste anche una lista di attesa per diventare un validatore. In futuro, se le slot diventano disponibili, i validatori possono essere applicati per essere considerati e rimossi dalla lista di attesa.


### Sostituzione {#replacement}
PIP4 ha introdotto il concetto di mostrare le prestazioni del validatore per la visibilità della comunità. Se un validatore è in uno stato non sano per un periodo di tempo prolungato come indicato in PIP4, sono fuori bordo dalla rete. La slot del validatore viene quindi messa a disposizione di coloro che vengono fuori dalla lista d'attesa.

:::info

Attualmente, la [<ins>fase 2 della parte C in PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) è in fase di attuazione. Qui la comunità decide sui criteri di valutazione per il validatore In tempo, questo esercizio produrrà un processo di applicazione e ammissione.

:::

## Metodi e variabili {#methods-and-variables}

:::caution Implementazione Slashing

`jail``unJail`, e le `slash`funzioni non sono attualmente utilizzate come parte dell'implementazione di slashing

:::

### validatorThreshold {#validatorthreshold}

Memorizza il numero massimo di validatori accettati dal sistema, anche chiamati slot.

### AccountStateRoot {#accountstateroot}

- Per varie contabilità effettuata su Heimdall per i validatori e il delegatore, viene presentata la root di account durante la presentazione del `checkpoint`.
- accRoot viene utilizzato mentre `claimRewards`e .`unStakeClaim`

### puntata / stakeFor {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- Permette a chiunque abbia quantità (in token MATIC) maggiore di `minDeposit`, se `currentValidatorSetSize`è meno allora .`validatorThreshold`
- Deve trasferire `amount+heimdallFee`, mette il validatore in un periodo d'asta per un'asta Interval (più nella sezione Auction .
- `updateTimeLine`aggiorna la speciale struttura dei dati della timeline che tiene traccia dei validatori attivi e della partecipazione attiva per una data conteggio di epoch / checkpoint.
- Un unico `NFT`è coniato su ogni nuova `stake`o `stakeFor`chiamata, che può essere trasferito a chiunque ma può essere di proprietà dell'indirizzo Ethereum 1:1.
- `acceptDelegation`impostato in modo vero se i validatori vogliono accettare la delegazione, viene implementato il `ValidatorShare`contratto per il validatore.

### Annulla lo stake {#unstake}

- Rimuovere il validatore dal settare del validatore in epoch successivo (valida solo per il checkpoint corrente una volta `unstake`chiamata)
- Rimuovi lo stake del validatore dalla struttura dei dati della sequenza temporale, aggiorna il conteggio per l'epoca di uscita del validatore.
- Se il validatore ha ricevuto la delega, raccoglie tutte le ricompense e il contratto di blocco di delega per le nuove delegazioni.

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- Dopo `unstaking`, i validatori vengono messi in un periodo di recesso in modo che possano essere slash, se qualsiasi frode trovata dopo `unstaking`, per frode passate.
- Una volta che il `WITHDRAWAL_DELAY`periodo è servito, i validatori possono chiamare questa funzione e fare regolamento con `stakeManager`(ottenere ricompensa se del caso, ottenere gettoni da fuoco, masterizzare NFT, ecc).

### Restaking {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- Consente ai validatori di aumentare il proprio stake inserendo un nuovo importo o ricompense o entrambi.
- Deve aggiornare la timeline (importo) per la stake. attiva.

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

Questo metodo consente ai validatori di ritirare le ricompense accumulate, deve considerare di ottenere ricompense dal contratto di delega se il validatore accetta la delegazione.

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

Questo metodo consente ai validatori di aggiornare l'indirizzo del signer (che viene utilizzato per convalidare i blocchi su Polygon blockchain e le firme del checkpoint su `stakeManager`).

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

I convalidatori possono top up il loro saldo per la tassa di Heimdall invocando questo metodo.

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

Questo metodo viene utilizzato per ritirare le tasse da Heimdall. `accountStateRoot`viene aggiornato su ogni checkpoint, in modo che i validatori possano fornire la prova dell'inclusione in questa radice per conto su Heimdall e ritirare la fee.

Nota che `accountStateRoot`è riscritto per evitare le uscite su più checkpoint (per la vecchia root e per salvare la `stakeManager``accumSlashedAmount`contabilità).

### StakingNFT {#stakingnft}

contratto ERC721 con poche restrizioni come un token per utente e coniato in modo sequenziale.

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

Per avviare una offerta o un'offerta più alta rispetto all'asta già in esecuzione, questa funzione viene utilizzata. Il periodo d'asta avviene in cicli come `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`per **cui deve verificare il corretto periodo di aste.**

`perceivedStakeFactor`è utilizzato per calcolare l'esatta puntata di factor*old che è per impostazione predefinita 1 WIP per la scelta della funzione). **Deve verificare la data d'asta dell'ultimo periodo d'asta se si continua** (si può scegliere di non chiamare `confirmAuction`per ottenere la capitale nella prossima asta). Normalmente l'asta inglese continua sta in corso in un `auctionPeriod`.

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **Deve verificare che questa non sia una data di asta.**
- Se l'ultimo offerente è proprietario di `validatorId`, il comportamento dovrebbe essere simile a quello di ripristino.
- Nel secondo caso, annulla lo stake `validatorId` e aggiungi un nuovo utente come validatore dal checkpoint successivo, poiché il comportamento del nuovo utente dovrebbe essere simile a stake/stakeFor.

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- Le scritture sono pensate solo per il contratto RootChain durante l'invio di checkpoint
- `voteHash` su cui firmano tutti i validatori (accordo BFT ⅔+1)
- Questa funzione convalida solo firme univoche e verifica che i ⅔+1 abbia firmato sulla root del checkpoint (inclusione in `voteHash` verifica nel contratto RootChain per tutti i dati) `currentValidatorSetTotalStake` fornisce lo stake attivo corrente.
- Le ricompense vengono distribuite in proporzione alla to del validatore. Più sulle ricompense in [Distribuzione Premi](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2).

### isValidator {#isvalidator}

Verifica se un determinato validatore è un validatore attivo per l'epoca corrente.

## Struttura dei dati della sequenza temporale {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

Il contratto di registrazione centralizzato sia per gli eventi di validatore che per le delegazioni, include poche funzioni di sola lettura. Puoi controllare il codice sorgente del contratto [StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) su GitHub.

## ValidatorShareFactory {#validatorsharefactory}

Un contratto di fabbrica per distribuire il `ValidatorShare`contratto per ogni validatore che si è optato per la delegazione. Puoi controllare il codice sorgente del contratto [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) su GitHub.
