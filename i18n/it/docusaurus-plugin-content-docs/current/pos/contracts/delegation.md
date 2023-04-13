---
id: delegation
title: Delegazione tramite condivise Validator
sidebar_label: Delegation
description: Delegazione tramite condivise Validator
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon supporta la delegazione mediante le quote del validatore. Utilizzando questo design, è più facile distribuire ricompense e tagliare con lo scaling (migliaia di delegatori) sui contratti Ethereum senza molto calcolo.

I delegatori delegano acquistando dai validatori le quote di un pool finito. Ogni validatore avrà il proprio token di condivisione del validatore. Chiamiamo questi token fungibili `VATIC` per un validatore `A`. Non appena un utente delega a un validatore `A`, questi token verranno emessi `VATIC` sulla base di un tasso di exchange di `MATIC/VATIC` paia. Man mano che gli utenti accumulano valore, il tasso di exchange indica che ora possono prelevare più `MATIC` per ogni `VATIC` e quando gli utenti vengono tagliati, gli utenti prelevano meno `MATIC` per i loro `VATIC`.

Nota che `MATIC` è un token di staking. Un delegatore deve disporre di `MATIC`  token per partecipare alla delega.

Inizialmente, un delegatore `D` acquista token dal pool specifico del validatore `A` quando `1 MATIC per 1 VATIC`.

Quando un validatore viene ricompensato con più token `MATIC`, al pool vengono aggiunti nuovi token. Diciamo con l'attuale pool di `100 MATIC`gettoni, vengono aggiunte `10 MATIC`ricompense alla piscina. Ma poiché la fornitura totale di token `VATIC` non è cambiata a causa delle ricompense, il tasso di cambio diventa `1 MATIC per 0.9 VATIC`. Ora il delegatore `D`ottiene più `MATIC`per le stesse azioni.

`VATIC`: Token condivisi del validatore coniati specifici per validatore (token ERC20)

## Specifiche tecniche {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

Il tasso di exchange è calcolato come segue:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## Metodi e variabili {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- Trasferisci `_amount` su stakeManager e aggiorna la struttura dei dati della sequenza temporale per lo stake attivo.
- `updateValidatorState` viene utilizzato per aggiornare la sequenza temporale DS.
- `Mint` quote di delega che utilizzano le attuali `exchangeRate` per `_amount`.
- `amountStaked`viene utilizzato per tenere traccia dello stake attivo di ogni delegatore per calcolare ricompense liquide.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- Utilizzando la corrente `exchangeRate`e il numero di azioni per calcolare l'importo totale (partecipazione attiva + ricompense .
- `unBond`partecipazione attiva del validatore e del trasferimento delle ricompense al delegatore, se presente.
- Deve rimuovere lo stake attivo dalla sequenza temporale utilizzando `updateValidatorState` in stakeManger.
- `delegators` la mappatura viene utilizzata per tenere traccia dello stake nel periodo di ritiro.

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- Per un delegatore, calcola le ricompense e il trasferimento e a seconda del numero di `exchangeRate`ustioni delle azioni.
- Esempio: se un delegato possiede 100 azioni e il tasso di cambio è di 200 per cui le ricompense sono 100 gettoni, il trasferimento 100 gettoni al delegatore. Remaining la quota 100 quindi utilizzando il tasso di cambio 200, ora vale 50 azioni. Quindi bruciare 50 azioni. Il Delegatore ha ora 50 azioni del valore di 100 token (che inizialmente ha messo in atto/delegato).

### Restaking {#restake}

Restake può funzionare in due modi: il delegatore può acquistare più azioni utilizzando `buyVoucher`o reStake ricompensa.

```js
function reStake() public;
```

La funzione sopra viene utilizzata per reStake ricompense. Il numero di azioni non è influenzato perché `exchangeRate` è lo stesso; quindi solo le ricompense vengono spostate in uno stake attivo sia per il contratto di azioni del validatore che per la sequenza temporale di stakeManager.

`getLiquidRewards`è utilizzato per il calcolo delle ricompense accumulate, il delegatore possiede 100 quote e il tasso di cambio è di 200, quindi le ricompense sono 100 gettoni. Sposta 100 token in una stake, poiché il tasso di cambio è ancora uguale numero di share rimarrà uguale. Solo la differenza è che ora 200 token sono considerati in gioco attivo e non possono essere ritirati immediatamente (non una parte delle ricompense liquide).

Scopo di reStaking è che poiché il validatore del delegatore ha una partecipazione più attiva e guadagnerà più ricompense per questo stesso lo sarà il delegatore.

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

Una volta che il periodo di sospensione è scaduto, i delegatori che hanno venduto le loro azioni possono rivendicare i propri token MATIC. Deve trasferire i token all'utente.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- Aggiorna la commissione % per il validatore.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

Quando un validatore ottiene una ricompensa per la presentazione del checkpoint, questa funzione è chiamata a erogare le ricompense tra il validatore e i delegatori.
