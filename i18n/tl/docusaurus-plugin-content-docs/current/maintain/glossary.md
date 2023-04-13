---
id: glossary
title: Glossary
description: Mga terminong Key Polygon
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Block producer {#block-producer}

Ang block producer ay isang active [validator](#validator) na pinili para magsilibi bilang block producer sa loob ng isang [span](#span).

Ang isang block producer ay responsable sa paggawa ng mga block at pag-broadcast ng mga ginawang block sa network.

## Bor {#bor}

Ang Bor node ay isang node na gumagawa ng mga block sa Polygon Network.

Ang Bor ay batay sa [Go Ethereum](https://geth.ethereum.org/).

## Transaksyon sa checkpoint {#checkpoint-transaction}

Ang checkpoint na transaksyon ay isang transaksyon na naglalaman ng Merkle root of blocks ng [Bor](#bor) layer sa pagitan ng mga interval ng checkpoint.

Nakatuon ang transaksyon sa mga kontrata ng pag-stake sa Polygon sa Ethereum mainnet sa pamamagitan ng isang [Heimdall](#heimdall) node.

Tingnan din ang:

* [Heimdall architecture: Checkpoint](/docs/pos/heimdall/checkpoint)
* [Mekanismo ng Checkpoint](/docs/maintain/validator/core-components/checkpoint-mechanism)

## Komisyon {#commission}

Ang komisyon ay porsyento ng mga gantimpala na kinuha ng [mga validator](#validator) mula sa [mga delegator](#delegator) na nag-stake sa mga validator.

Tingnan din ang [Validator Commission Operations](/docs/maintain/validate/validator-commission-operations).

## Delegator {#delegator}

Tungkulin ng delegator na i-stake ang mga MATIC token para i-secure ang Polygon Network gamit ang mga kasalukuyang [validator](#validator) nang hindi pinapatakbo ang mga mismong node.

Tingnan din ang [Sino ang Delegator](/docs/maintain/polygon-basics/who-is-delegator).

## Full node {#full-node}

Ang full node ay isang ganap na naka-sync na [sentry node](#sentry) na tumatakbo sa [Heimdall](#heimdall) at [Bor](#bor).

Tingnan din ang [Full Node Deployment](/docs/operate/full-node-deployment).

## Heimdall {#heimdall}

Ang Heimdall node ay isang node na tumatakbo nang sabay sa Ethereum mainnet, na sinusubaybayan ang set ng mga kontrata na naka-deploy sa Ethereum mainnet, at ikinokonekta ang mga [checkpoint](#checkpoint-transaction) ng Polygon Network sa Ethereum mainnet.

Ang Heimdall ay nakabatay sa [Tendermint](https://tendermint.com/).

## Address ng may-ari {#owner-address}

Ang address ng may-ari ay ang address na ginamit para mag-stake, mag-restake, palitan ang address ng lumagda, i-withdraw ang mga gantimpala, at i-manage ang mga parameter na nauugnay sa delegation sa Ethereum mainnet.

Habang nananatili sa node ang [signer key](#signer-address) at itinuturing na isang **hot** wallet, kailangang panatiling mahigpit na naka-secure ang key ng may-ari, madalang na ginagamit, at itinuturing na isang **cold** wallet.

Tingnan din ang [Key Management](validator/core-components/key-management.md).

## Proposer {#proposer}

Ang proposer ay ang [validator](#validator) na pinili ng algorithm para mag-propose ng bagong block.

Responsibilidad din ng proposer ang pagkolekta ng lahat ng lagda para sa isang partikular na [checkpoint](#checkpoint-transaction) at pagkonekta ng checkpoint sa Ethereum mainnet.

## Sentry {#sentry}

Ang sentry node ay isang node na nagpapatakbo ng [Heimdall](#heimdall) node at [Bor](#bor) node para mag-download ng data mula sa iba pang node sa network at para mag-propagate ng [validator](#validator) data sa network.

Bukas ang isang sentry node sa lahat ng iba pang sentry node na nasa network.

## Span {#span}

Isang lohikal na tinukoy na set ng mga block kung saan pinipili ang isang set ng mga validator mula sa laht ng available na [validator](#validator).

Ang napili sa bawat span ay napagpasyahan ng hindi bababa sa 2/3 ng mga validator batay sa staking power.

Tingnan din ang [Bor Consensus: Span](/docs/pos/bor/consensus.md#span).

## Pag-stake {#staking}

Ang pag-stake ay ang proseso ng pag-lock ng mga token sa isang deposito para makakuha ng karapatang mag-validate at makagawa ng mga block sa isang blockchain. Karaniwang ginagawa ang pag-stake sa katutubong token para sa network — para sa MATIC token ay naka-lock up ng mga validator / staker sa Polygon Network. Kabilang sa iba pang halimbawa ang ETH sa Ethereum (post-merge), ATOM sa Cosmos, atbp.

Tingnan din ang [Ano ang Proof of Stake](polygon-basics/what-is-proof-of-stake.md).

## Address ng lumagda {#signer-address}

Ang address ng lumagda ay ang address ng isang Ethereum account ng [Heimdall](#heimdall) validator node. Nilalagdaan at isinusumite ng address ng lumagda ang [mga transaksyon ng checkpoint](#checkpoint-transaction).

Habang nananatili sa node ang signer key at itinuturing na isang **hot** wallet, kailangang panatiling mahigpit na naka-secure ang [key ng may-ari](#owner-address), madalang na ginagamit, at itinuturing na isang **cold** wallet.

Tingnan din ang [Key Management](validator/core-components/key-management.md).

## Validator {#validator}

Ikinuwento ng mga validator ang [kanilang mga MATIC token](/docs/maintain/validate/validator-staking-operations) sa pamamagitan ng pag-stake ng mga kontrata na naka-deploy sa Ethereum mainnet at nagpapatakbo ng parehong node ng [Heimdall](#heimdall) at ng [Bor](#bor) node para mag-commit ng mga network checkpoint sa Ethereum mainnet at para mag-produce ng mga block sa network.

Bukas lang ang validator node sa [sentry](#sentry) node nito at sarado sa iba pang nasa network.

Tingnan din ang [Sino Ang Isang Validator](polygon-basics/who-is-validator.md).
