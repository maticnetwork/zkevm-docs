---
id: validator-key-management
title: Pamamahala ng susi ng validator
description: pamamahala ng validator ng Signer at Owner Key
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# Pamamahala ng susi ng validator {#validator-key-management}

Gumagamit ang bawat validator ng dalawang key para pamahalaan ang mga aktibidad na may kaugnayan sa validator sa Polygon. `cold`Ang signer key ay pinananatili sa node at sa pangkalahatan ay itinuturing na isang pitaka, samantalang ang susi ng may-ari ay dapat na pinananatiling napaka-secure, ay madalang na ginagamit, at sa pangkalahatan ay itinuturing na isang pitaka.`hot` Kinokontrol ng key ng may-ari ang mga naka-stake na pondo.

Nagawa ang paghihiwalay ng mga responsibilidad na ito para matiyak ang isang mahusay na tradeoff sa pagitan ng seguridad at kadalian ng paggamit. Parehong mga key ang mga compatible address ng Ethereum at gumagana nang eksaktong parehong paraan. At oo, posible na magkaroon ng parehong Owner at Signer key.

## Key ng signer {#signer-key}

Ang signer key ay isang address na ginagamit para sa paglagda ng mga bloke ng Heimdall, checkpoint, at iba pang mga aktibidad na may kinalaman sa pag-sign. Ang pribadong key ng key na ito ay nasa Validator node para sa mga layunin ng pagpirma. Hindi nito maaaring pamahalaan ang mga stake, reward, o delegasyon.

Dapat panatilihin ng validator ang dalawang uri ng balanse sa address na ito:

- Matic token sa Heimdall (sa pamamagitan ng mga transaksyon sa Topup) upang maisagawa ang mga responsibilidad ng validator sa Heimdall
- ETH sa Ethereum chain upang magpadala ng mga checkpoint sa Ethereum

## Key ng may-ari {#owner-key}

Ang key ng may-ari ay isang address na ginagamit para sa pag-stake, muling pagtaya, pagpapalit ng signer key, mag-withdraw ng mga gantimpala at pamahalaan ang mga parameter na may kaugnayan sa delegasyon sa Ethereum chain. Ang pribadong key para sa key na ito ay dapat na secure sa lahat ng gastos.

Lahat ng transaksyon sa pamamagitan ng key na ito ay isasagawa sa Ethereum chain.

## Pagbabago ng signer {#signer-change}

`StakingInfo.sol`Ang kaganapan ay nabuo sa kaso ng baguhin ng signer Ethereum [chain](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) sa

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Pinoproseso ng Heimdall bridge ang mga event na ito at nagpapadala ng mga transaksyon sa Heimdall upang baguhin ang state batay sa mga event.