---
id: bor
title: Arkitektura ng Bor
description: Ang papel ng Bor sa arkitektura ng Polygon
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Arkitektura ng Bor {#bor-architecture}

Ang Polygon ay isang hybrid na **Plasma + Proof-of-Stake (PoS)** platform. Ginagamit namin ang isang dual-consensus na arkitektura sa Polygon Network upang ma-optimize para sa bilis at decentralisation. Sadya naming inarkitekto ang sistema upang suportahan ang mga arbitrary na transisyon ng kalagayan sa aming mga sidechain, na pinapagana ng EVM.

## Arkitektura {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

Ang isang blockchain ay isang hanay ng mga network client na nakikipag-ugnayan at nagtatrabaho nang magkasama. Ang kliyente ay isang piraso ng software na may kakayahang magtatag ng p2p na communication channel sa ibang kliyente, pumirma at mag-brodkast ng mga transakyon, mag-deploy at makipag-ugnayan sa mga smart contracts, atbp. Ang kliyente ay madalas na tinutukoy bilang node.

Para sa Polygon, idinisenyo ang node na may dalawang layer na implementasyon ng Heimdall (Validator Layer) at Bor(Block Producer Layer).

1. Heimdall
    - Pag-verify ng Proof-of-Stake
    - Pag-che-checkpoint ng mga bloke sa Ethereum main chain
    - Pamamahala ng Validator at mga Reward
    - Pagtiyak ng Pag-sync ng Ethereum main chain
    - Desentralisadong Bridge
2. Bor
    - Polygon Chain
    - VM na magkatugma sa EVM
    - Set selection ng mga Proposer at Producer
    - SystemCall
    - Modelo ng Bayad

## Heimdall (Validator layer) {#heimdall-validator-layer}

Ang Heimdall (na All-Protector) ang purveyor ng lahat ng nangyayari sa sistema ng Polygon Proof-of-Stake – mabuti o masama.

Ang Heimdall ang aming Proof-of-Stake Verifier layer, na may responsibilidad para mag-checkpoint ng isang representation ng mga Plasma block sa main chain ng aming arkitektura. Ipinatupad namin ito sa pamamagitan ng pagdaragdag ng mga pagbabago sa scheme ng lagda at iba't ibang istruktura ng data sa Tendermint consensus engine.

Para sa mas marami pang impormasyon, pakibasa ang [https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/).

## Bor (Block Producer layer) {#bor-block-producer-layer}

Ang pagpapatupad ng Bor node ay ang operator ng sidechain. Ang sidechain VM ay compatible sa EVM. Sa kasalukuyan, isa itong basikong pagpapatupad ng Geth na may mga kustomisadong na pagbabago na ginawa sa algoritmo ng consensus. Gayunpaman, itataguyod ito mula sa ibaba pataas para gawing magaan at nakatuon.

Ang Bor ay ang aming Block producer layer, na naka-sync sa Heimdall na pinipili ang mga producer at mga verifier para sa bawat span at sprint. Ang pakikipag-ugnayan ng mga gumagamit ng polygon ay nangyayari sa sidechain na ito, na magka-ugma sa EVM upang makuha ang functionality at pagkakatugma ng Ethereum developer tooling at mga application.

### Polygon Chain {#polygon-chain}

Ang chain na ito ay isang hiwalay na blockchain na naka-attach sa Ethereum gamit ang isang two-way na peg. Ang two-way na peg ay nagbibigay-daan sa pagpapalit-palit ng mga asset sa pagitan ng Ethereum at Polygon.

### VM na magkatugma sa EVM {#evm-compatible-vm}

Ang Ethereum Virtual Machine (EVM) ay isang malakas, naka-sandbox na virtual stack na naka-embed sa loob ng punong Polygon node, na responsable sa pagsagawa ng kontrata sa bytecode. Ang mga kontrata ay karaniwang nakasulat sa mga mas mataas na antas na mga wika, tulad ng Solidity, pagkatapos ay iniipon sa EVM bytecode.

### Pagpili sa mga Proposer at Producer {#proposers-and-producers-selection}

Ang mga Block Producer para sa Bor layer ay isang pinili ng komite mula sa Validator pool batay sa kanilang stake, na nangyayari sa regular na pagitan at binalasa pana-panahon. Ang mga interval na ito ay pinagpapasyahan ng pamamahala ng Validator ayon sa dynasty at network.

Ang ratio ng Stake/Staking power ay tumutukoy sa posibilidad na pinili bilang miyembro ng block producer committee.

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### Proseso ng Pagpili {#selection-process}

- Ipagpalagay natin na mayroon tayong 3 validator sa pool, at sila ay sina Alice, Bill at Clara.
- Nag-stake si Alice ng 100 Matic tokens kung saan sina Bill at Clara ay nag-stake ng 40 Matic tokens.
- Ang mga validator ay binibigyan ng mga slot ayon sa stake, dahil si Alice ay mayroong 100 Matic tokens na nakataya, makakakuha siya ng mga slot nang proporsyonal. Makakakuha si Alice ng 5 slot sa kabuuan. Gayundin, makakakuha sina Bill at Clara ng 2 slot sa kabuuan.
- Ang lahat ng mga validator ay binibigyan ng mga puwang na ito [A, A, B, B, C, C]
- Gamit ang makasaysayang Ethereum block data bilang seed, sina-shuffle namin ang array na ito.
- Pagkatapos i-shuffle ang mga slot gamit ang seed, sabihin nating makukuha natin ang array na ito [A, B, A, A, C, B, B, A, A, C]
- Depende ngayon sa bilang ng Producer*(pinapanatili ng pamamahala ng validator)*, naglalabas kami ng mga validator mula sa itaas. Para sa hal. kung gusto naming pumili ng 5 producer makuha namin ang producer set bilang [A, B, A, A, A, C]
- Kaya ang itinakda ng producer para sa susunod na span ay tinukoy bilang [A: 3, B:1, C:1].
- Gamit ang validator set na ito at ang algorithm ng pagpili ng proposer ng tendermint, pumipili kami ng producer para sa bawat sprint sa BOR.

### SystemCall Interface {#systemcall-interface}

Ang system call ay isang panloob na address ng operator na nasa ilalim ng EVM. Nakakatulong ito upang mapanatili ang estado para sa mga Block Producers para sa bawat sprint. Ang isang System Call ay na-titrigger sa pagtatapos ng isang sprint at isang request ang ginagawa para sa bagong listahan ng mga Block Producers. Kapag na-update na ang state, matatanggap ang mga pagbabago pagkatapos ng block generation sa Bor sa lahat ng Validator.

### mga function {#functions}

#### proposeState {#proposestate}

- Ang Call ay pinapayagan lamang sa mga validator.
- Suriin ang `stateId`kung ito ay iminungkahi na o ginawa.
- Ipanukala ang `stateId`at i-update ang bandila sa`true`.

#### commitState {#commitstate}

- Ang Call ay pinapayagan lamang sa System.
- Suriin ang `stateId`kung ito ay iminungkahi na o ginawa.
- Abisuhan ang `StateReceiver`Kontrata gamit ang bago na.`stateId`
- `proposedState`I-update ang `state`bandila sa `true`At `remove`ang.

#### proposeSpan {#proposespan}

- Ang Call ay pinapayagan lamang sa mga validator.
- Suriin kung ang panukalang Span `pending`ay.
- I-update ang Span Proposal sa`true`

#### proposeCommit {#proposecommit}

- Ang Call ay pinapayagan lamang sa System.
- Itakda `initial validators`kung ang kasalukuyang span ay zero.
- Suriin ang Mga Kundisyon para sa `spanId``time_period`at ng Sprint at Span.
- `time_period`I-update ang bago `span`at.
- `sprint`Itakda `validators`at para `blockProducers`sa.
- I-update ang bandila para sa `spanProposal`tungo sa`true`.

### Modelo ng Bor Fee {#bor-fee-model}

Para sa normal na transaksyon, ang mga bayarin sa Matic token ay kinokolekta at ipapamahagi sa mga block producer, katulad ng mga transaksyon sa Ethereum.

Tulad ng ibang mga blockchain, ang Polygon ay may katutubong token na tinatawag na Matic(MATIC). Ang MATIC ay isang ERC20 token na pangunahing ginagamit para sa pagbabayad ng gas(mga bayarin sa transaksyon) sa Polygon at staking.

:::info

Ang isang mahalagang bagay na dapat tandaan ay na sa Polygon chain, ang token ng MATIC ay gumagana bilang isang token ng ERC20, ngunit bilang ang katutubong token din - nang sabay. Samakatuwid, nangangahulugan ito na ang isang user ay maaaring magbayad ng gas gamit ang MATIC pati na rin magpadala ng MATIC sa iba pang mga account.

:::

Para sa mga kontrata ng genesis, `gasPrice`at `gasLimit`gumagana ang katulad ng Ethereum, ngunit sa pagpapatupad ay hindi nito babawasan ang mga bayad mula sa account ng sender.

Ang mga transaksyon sa Genesis mula sa kasalukuyang mga validator ay isinasagawa gamit ang`gasPrice = 0`.

Gayundin, kailangang magpadala ang mga validator ng mga sumusunod na uri ng transaksyon tulad ng mga panukala ng Estado tulad ng mga deposito at Panukala ng Span sa Bor.

## Teknikal na Pananaw {#technical-insight}

### Mga Kontrata sa Genesis {#genesis-contracts}

[BorValidatorSet(0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒ Pinamamahalaan ng kontratang ito ang validator set para sa bawat span at sprint.

[BorStateReceiver(0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒ Pinamamahalaan ng Kontratang ito ang paglilipat ng arbitrary na data ng kontrata mula sa mga kontrata ng Ethereum patungo sa mga kontrata ng Polygon

MaticChildERC20(0x1010) ⇒ Child Contract para sa mga token ng Main Chain na nagbibigay-daan sa paglipat ng mga asset mula sa Ethereum patungo sa Polygon.

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

Bor Protokol

## Glossary {#glossary}

- StartEpoch Post ng checkpoint number kung saan ang validator ay na-activate at lalahok sa consensus.
- EndEpoch Ang post ng checkpoint na numero kung saan ang isang validator ay itinuturing na na-deactivate at hindi lalahok sa consensus.
- Sprint - Ang Sprint ay isang tuluy-tuloy na hanay ng mga bloke na nilikha ng isang validator.
- Span - Span ay isang malaking hanay ng mga bloke na may nakapirming validator set ngunit binubuo ng iba't ibang mga sprint. Para sa hal para sa isang span ng haba 6400 bloke ito ay binubuo ng 100 sprints ng 64 bloke.
- Dynasty: Oras sa pagitan ng pagtatapos ng huling auction at oras ng pagsisimula ng susunod na auction.

## Mga Resources {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [Paano Gumagana ang EVM?](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [Tendermint Proposer Selection](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
