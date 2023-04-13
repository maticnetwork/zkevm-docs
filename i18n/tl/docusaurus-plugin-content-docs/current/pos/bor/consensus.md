---
id: consensus
title: Bor Pinagkasunduan
description: mekanismo ng Bor para sa pag-fetch ng mga bagong producer
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Bor Pinagkasunduan {#bor-consensus}

Ang pinagkasunduan ng Bor ay inspirasyon ng pinagkasunduan ng Clique: [https://eip.ethereum.org/EIPS/eip-225](https://eips.ethereum.org/EIPS/eip-225). Gumagana ang Clique sa maraming pre-defined producer. Bumoto ang lahat ng producer sa mga bagong producer gamit ang Clique API. Kumuha sila ng mga lumiliko na lumilikha ng mga block.

Kinukuha ni Bor ang mga bagong producer sa pamamagitan ng mekanismo ng pamamahala ng span at sprint.

## Mga validator {#validators}

Ang Polygon ay isang Proof-of-stake na system. Sinuman ay maaaring mag-stake ng kanilang Matic token sa Ethereum na smart na kontrata, "kontrata sa pag-stake", at maging validator para sa system.

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

Kapag aktibo na ang mga validator sa Heimdall, mapipili sila bilang mga producer sa pamamagitan ng `bor`module.

I-check ang pangkalahatang-ideya ng [Bor](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab) para mas maunawaan ang pamamahala ng span sa mga detalye: Pangkalahatang-ideya ng Bor

## Span {#span}

Isang lohikal na tinukoy na set ng mga block kung saan pinili ang isang set ng mga validator mula sa lahat ng magagamit na validator. Nagbibigay ang Heimdall ng mga detalye ng span sa pamamagitan ng mga span-details na API.

```go
// HeimdallSpan represents span from heimdall APIs
type HeimdallSpan struct {
	Span
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}

// Span represents a current bor span
type Span struct {
	ID         uint64 `json:"span_id" yaml:"span_id"`
	StartBlock uint64 `json:"start_block" yaml:"start_block"`
	EndBlock   uint64 `json:"end_block" yaml:"end_block"`
}

// Validator represents a volatile state for each Validator
type Validator struct {
	ID               uint64         `json:"ID"`
	Address          common.Address `json:"signer"`
	VotingPower      int64          `json:"power"`
	ProposerPriority int64          `json:"accum"`
}
```

Gumagamit ang geth (sa kasong ito, ang Bor) ng block `snapshot` para mag-store ng state data para sa bawat block, kasama ang kaugnay na data ng consensus.

Ang bawat validator sa span ay naglalaman ng kapangyarihan sa pagboto. Batay sa kanilang kapangyarihan, napili sila bilang mga block producer. Mas mataas na kapangyarihan, mas mataas na posibilidad na maging mga block producer. Gumagamit ang Bor ng algorithm ng Tendermint para sa katulad na kadahilanan. Pinagmulan: [https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## Sprint {#sprint}

Isang hanay ng mga bloke sa loob ng isang span kung saan isang solong block producer lamang ang pipiliin upang makagawa ng mga bloke. Ang sprint size ay isang factor ng span size. Gumagamit bor `validatorSet`upang makakuha ng kasalukuyang nagmumungkahi/prodyuser para sa kasalukuyang sprint.

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

Bukod sa kasalukuyang proposer, pinipili ng Bor ang mga backup producer.

## Pag-authorize sa isang block {#authorizing-a-block}

Ang mga producer sa Bor ay tinatawag ding mga signer, dahil sa ang pag-authorize ng block para sa para sa network, kinakailangan ng producer na lagdaan ang hash ng block na naglalaman ng **lahat maliban sa mismong lagda**. Nangangahulugan ito na ang hash ay naglalaman ng bawat field ng header, at gayundin ang `extraData` maliban sa 65-byte na suffix ng lagda.

cNilagdaan ang hash na ito gamit ang standard na `secp256k1` curve, at ang nagreresultang 65-byte na lagda ay naka-embed sa `extraData` bilang ang sumusunod na 65-byte na suffix.

Ang bawat linagdaang block ay itinalaga sa isang difficulty na nagpapabigat sa Block. Higit na mabigat ang in-turn na paglagda `DIFF_INTURN` kaysa sa isang nag-turn na `DIFF_NOTURN`.

### Mga istratehiya sa awtorisasyon {#authorization-strategies}

Hangga't sumusunod ang mga producer sa mga espesipikasyon sa itaas, maaari nilang i-authorize at ipamahagi ang mga block ayon sa nakikita nilang nararapat. Ang sumusunod na iminungkahing istratehiya, gayunpaman, ay magbabawas ng trapiko sa network at mga maliit na fork, kaya ito ay isang iminumungkahing feature:

- Kung pinapayagan ang isang producer na lumagda sa isang block (nasa awtorisadong listahan)
    - Kalkulahin ang optimal na oras ng paglagda ng susunod na block (parent + `Period`)
    - Kung in-turn ang producer, hintayin ang eksaktong oras na dumating, pirmahan at i-broadcast kaagad
    - Kung out-of-turn ang producer, antalahin ang pagpirma ng `wiggle`

Tiiyakin ng maliit na istratehiya na ito na ang in-turn na producer (na mas mabigat ang block) ay may kaunting kalamangan na lumagda at magpalaganap kumpara sa mga out-of-turn na signer. Gayundin, pinapayagan ng scheme ang kaunting scale na may pagtaas ng bilang ng mga producer.

### Out-of-turn na paglagda {#out-of-turn-signing}

Pinipili ng Bor ang maramihang block producer bilang backup kapag ang in-turn producer ay hindi gumagawa ng block. Maaaring mangyari ito para sa iba't ibang mga kadahilanan tulad ng:

- Naka-down ang node ng block producer
- Sinusubukan ng block producer na pigilan ang block
- Sinasadya ng block producer na hindi gumawa ng block.

Kapag nangyari ang nasa itaas, papasok ang backup mechanism ng Bor.

Sa anumang punto ng oras, ang set ng mga validator ay iniimbak bilang isang array na pinagsunod-sunod batay sa kanilang address ng signer Ipagpalagay, na ang validator set ay inayos bilang A, B, C, D at turn na ng C na gumawa ng block. Kung hindi gumawa ng block ang C sa loob ng sapat na tagal ng panahon, ang D ang susunod na gagawa ng block. Kung hindi gagawa ang D, A ang gagawa at pagkatapos ay B.

Gayunpaman, dahil magkakaroon ng ilang oras bago makagawa at magpalaganap ang C ng block, ang mga backup na validator ay maghihintay ng ilang oras bago magsimulang gumawa ng block. Ang pagkaantala sa oras na ito ay tinatawag na wiggle.

### Wiggle {#wiggle}

Ang Wiggle ay ang oras na dapat maghintay ang producer bago magsimulang gumawa ng block.

- Halimbawa na ang huling block (n-1) ay ginawa sa oras na `t`.
- Nagpapatupad kami ng pinakamababang oras na pagkaantala sa pagitan ng kasalukuyan at susunod na block sa pamamagitan ng variable na parameter `Period`.
- Sa mga ideal na kondisyon, maghihintay ang C sa `Period` at pagkatapos ay gagawa at palaganapin ang block. Dahil ang mga block time sa Polygon ay idinisenyo na medyo mababa (2-4s), ang pagkaantala ng pagpapalaganap ay ipinapalagay din na kapareho ng value ng `Period`.
- Kaya't kung hindi makakita ang D ng bagong block sa oras na `2 * Period`, agad na magsisimulang gagawa ang D ng block. Sa partikular, ang oras ng wiggle ng D ay tinukoy bilang `2 * Period * (pos(d) - pos(c))` kung saan ang `pos(d) = 3` at `pos(c) = 2` sa validator set. Ipagpalagay na `Period = 1`, ang wiggle para sa D ay 2s.
- Ngayon kung ang D ay hindi rin makagawa ng isang block, ang A ay magsisimulang gumawa ng block kapag ang wiggle time ng `2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s` ay lumipas na.
- Katulad nito, ang wiggle para sa C ay `6s`

### Paglutas sa mga fork {#resolving-forks}

Habang ang mekanismo sa itaas ay nagdadagdag sa katatagan ng chain sa isang tiyak na lawak, ipinapakilala nito ang posibilidad ng mga fork. Maaari talagang gumawa ang C ng isang block, ngunit nagkaroon ng mas malaki kaysa sa inaasahang pagkaantala sa pagpapalaganap at samakatuwid ay gumawa din ang D ng isang block, kaya humahantong iyon sa hindi bababa sa 2 na fork.

Ang resolution ay simple - piliin ang chain na may mas mataas na difficulty. Ngunit ang tanong ay kung paano natin tutukuyin ang difficulty ng isang block sa ating setup?

### Difficulty {#difficulty}

- Ang difficulty para sa isang block na ginawa ng isang in-turn na signer (halimbawa ay c) ay tinukoy bilang ang pinakamataas na = `len(validatorSet)`.
- Dahil ang D ang producer na susunod sa linya; kung at kapag mangyari ang sitwasyon na ang D ang gumagawa ng block; ang difficulty para sa block ay tutukuyin tulad ng sa wiggle bilang `len(validatorSet) - (pos(d) - pos(c))` na ang `len(validatorSet) - 1`
- Ang difficulty para sa block na ginawa ng A habang kumikilos bilang backup ay nagiging `len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))` na ang `2`

Ngayong natukoy na ang difficulty ng bawat block, ang difficulty ng isang fork ay ang kabuuan lamang ng mga difficulty ng mga block sa fork na iyon. Sa kaso na kapag ang isang fork ay kailangang piliin, ang isa na may mas mataas na difficulty ang pipiliin, dahil iyon ay isang repleksyon ng katotohanan na ang mga block ay ginawa ng mga in-turn na producer ng block. Ito ay para lamang magbigay ng kaunting kahulugan ng finality sa user sa Bor.

## Tingnan ang pagbabago {#view-change}

Pagkatapos ng bawat span, binabago ng Bor ang view. Nangangahulugan ito na kumukuha ito ng mga bagong producer para sa susunod na span.

### I-commit ang span {#commit-span}

Kapag malapit nang matapos ang kasalukuyang span (partikular sa dulo ng pangalawang huling sprint sa span), kukuha ang Bor ng bagong span mula sa Heimdall. Ito ay isang simpleng HTTP call sa Heimdall node. Kapag nakuha na ang data na ito, isang `commitSpan` na call ang gagawin sa BorValidatorSet genesisna kontrata sa pamamagitan ng System call.

Nagtatakda din ang Bor ng mga byte ng mga producer sa header ng block. Mahalaga ito habang pina-fast-sync ang Bor. Sa panahon ng pag-fast-sync, sini-sync ng Bor ang mga header nang maramihan at bina-validate kung ang mga block ay ginawa ng mga awtorisadong producer.

Sa simula ng bawat Sprint, kinukuha ng Bor ang mga byte ng header mula sa nakaraang header para sa mga susunod na producer at nagsisimulang gumawa ng mga block batay sa `ValidatorSet` na algorithm.

Narito ang hitsura ng header para sa isang bloke:

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## State sync mula sa Ethereum kadena {#state-sync-from-ethereum-chain}

Nagbibigay ang Bor ng mekanismo kung saan ang ilang partikular na kaganapan sa pangunahing Ethereum chain ay ipinadala sa Bor. Ganito rin pinoproseso ang mga deposito sa mga kontrata sa plasma.

1. Anumang kontrata sa Ethereum ay maaaring tumawag sa [syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33) `StateSender.sol`in. `StateSynced`Ang tawag na ito ay : https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. Nakikinig ang Heimdall sa mga kaganapang ito at nanawagan `function proposeState(uint256 stateId)`sa - `StateReceiver.sol`kaya kumikilos bilang isang tindahan para sa mga nakabinbing state change ids. Tandaan na ang `proposeState`transaksyon ay ipoproseso kahit na may 0 gas fee hangga't ito ay ginawa ng isa sa mga validator sa kasalukuyang validator set: https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/ StateReceiver.sol#L24

3. Sa simula ng bawat sprint, kinukuha ng Bor ang mga detalye tungkol sa mga nakabinbing pagbabago sa state gamit ang mga state mula sa Heimdall at i-commit ang mga ito sa state ng Bor gamit ang isang system call. Tingnan ang `commitState` dito: https://github.com/maticnetwork/genesis-contracts/blob/f85d0409d2a99dff53617ad5429101d9937e3fc3/contracts/StateReceiver.sol#L41
