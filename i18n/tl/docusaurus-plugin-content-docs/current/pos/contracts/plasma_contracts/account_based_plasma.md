---
id: account_based_plasma
title: Plasma batay sa account
description: Isang implementasyon ng plasma na nakabatay sa account
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# Plasma batay sa account {#account-based-plasma}

Ang polygon plasma ay sumusunod sa modelo na katulad [plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160), ngunit isang **pagpapatupad na batay** sa account kumpara sa iba pang mga pagpapatupad na batay sa UTXO. Ang sidechain ay EVM-compatible. Gamit ang MoreVP construction, inaalis din namin ang pangangailangan para sa mga lagda sa pagkumpirma.

## PoS layer at mga Checkpoint {#pos-layer-and-checkpoints}

Gumagamit ang Polygon Network ng dual na istratehiya ng Proof of Stake sa checkpointing layer at mga Block Producer sa block producer layer para makamit ang mas mabilis na mga block time at makamit ang finality sa pangunahing chain gamit ang mga checkpoint at mga fraud proof.

Sa checkpointing layer ng Polygon Network, para sa bawat ilang block sa block layer ng Polygon Network, isang (sapat na naka-bonding) validator ang gagawa ng checkpoint sa pangunahing chain pagkatapos ma-validate ang lahat ng block sa block layer at likhain ang Merkle tree ng mga block hash mula sa nakaraang checkpoint.

Bukod sa pagbibigay ng finality sa mainchain, may tungkulin ang mga checkpoint sa mga withdrawal dahil naglalaman ang mga ito ng proof-of-burn (pag-withdraw) ng mga token kung sakaling mag-withdraw ang user. Nagbibigay-daan ito sa mga user na patunayan ang kanilang mga natitirang token sa root contract gamit ang Patricia Merkle proof at header block proof. Tandaan na upang patunayan ang natitirang mga token, ang block ng header ay dapat na nakatuon sa Root Chain sa pamamagitan ng PoS (mga stakeholder). Ang proseso ng withdrawal ay magkakaroon ng Ethereum na mga gas fee gaya ng nakasanayan. Nakikinabang kami nang husto sa mga checkpoint para sa mga laro sa paglabas.

## Mga kagaya ng UTXO na event log {#utxo-like-event-logs}

Para sa mga paglilipat ng ERC20/ERC721, nakamit ito sa pamamagitan ng paggamit ng UTXO-like kaganapan istraktura ng data. Sa ibaba ay isang `LogTransfer` na event para sa sanggunian.

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

Kaya, karaniwan na ang bawat paglilipat ng ERC20/ERC721 ay naglalabas ng event na ito, at ang mga nakaraang balanse ng sender at receiver `input1` at `input2` ay nagiging input (tulad ng UTXO) sa tx, at ang mga bagong balanse ay nagiging mga output (`output1` at `output2`). Ang mga paglilipat ay sinusubaybayan sa pamamagitan ng paraan ng pagsasama-sama ng lahat ng mga nauugnay na mga `LogTransfer` na event.

## Mga Exit Game {#exit-games}

Dahil ang mga block ay ginawa ng iisang block producer (o kakaunti), naglalantad ito ng surface para sa pandaraya. Tatalakayin natin sandali ang mga scenario ng pag-atake at pagkatapos ay pag-uusapan kung paano ginagarantiyahan ng plasma na pangalagaan ang isang user.

## Mga Vector ng Pag-atake {#attack-vectors}

### Malicious Operator {#malicious-operator}
Tinatalakay ng sumusunod ang mga sitwasyon kung saan maaaring maging malisyoso ang operator at subukang manloko.

1. Ang mga out-of-nowhere na token / dobleng gumagastos / mga maling nabuong resibo na mandaraya na tumataas (para sa isang account na kontrolado ng operator) / ay binabawasan (para sa isang user) ang balanse ng token.
2. Hindi available ang data. Pagkatapos magpadala ng tx ang isang user, sabihin nating isinama ng operator ang tx sa plasma block ngunit ginawang hindi available sa user ang chain data. Sa kasong iyon, kung ang isang user ay magsisimula ng isang exit mula sa isang mas lumang tx, kung sa gayon ay maaari silang hamunin na on-chain sa pamamagitan ng pagpapakita ng kanilang pinakabagong tx. Nagiging madaling linlangin ang gumagamit.
3. Masamang checkpoint. Sa pinakamasamang sitwasyon, ang isang operator ay maaaring magsagawa ng A.1 at(o) A.2 at makipagsabwatan sa mga validator upang gawin ang mga invalid na paglipat ng state sa root chain.
4. Paghinto ng side chain. Tumigil ang operator sa paggawa ng mga block at ang chain ay huminto. Kung ang isang checkpoint ay hindi naisumite para sa isang tinukoy na pagtagal, posibleng markahan ang side chain bilang nahinto sa root chain. Pagkatapos nito, wala nang mga checkpoint ang maaaring isumite.

Para sa mga kadahilanang nakalista sa itaas o kung hindi man, kung naging rogue ang plasma chain, kailangan ng user na simulan ang malawakang paglabas at hangad naming magbigay ng mga exit construction sa root chain na magagamit ng mga user, kung at pagdating ng oras.

### Malicious User {#malicious-user}

1. Nagsisimulang lumabas ang user mula sa isang nakatuong tx ngunit patuloy na gumagastos ng mga token sa side chain. Katulad ng dobleng paggastos ngunit sa 2 chain.

Nagbubuo kami sa mga ideya ng [MoreVp 7](https://ethresear.ch/t/more-viable-plasma/2160). Sa maikling salita, ipinakilala ng MoreVP ang isang bagong paraan upang kalkulahin ang priyoridad sa pag-exit, na tinatawag na priyoridad na "youngest-input". Sa halip na mag-order ng mga pag-exit ayon sa edad ng output, mag-o-order ang moreVP ng mga exit sa edad ng youngest-input. Ito ay may epekto na ang mga exit ng mga output, kahit na kasama ang mga ito sa mga pinigil na mga block pagkatapos ng mga "out of nowhere" na mga transaksyon, ay mapoproseso nang tama hangga't ang mga ito ay nagmumula lamang sa mga wastong input. Tinutukoy namin kung `getAge` na siyang nagtatalaga ng edad sa isang isinamang tx. Ito ay tulad ng tinukoy sa [minimum na mabubuhay na plasma](https://ethresear.ch/t/minimal-viable-plasma/426).

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## lumabas na mga Eksena {#exit-scenarios}

Ipakilala natin ang ilang terminolohiya bago natin ipagpatuloy ang pagtalakay sa mga exit scenario:

- **Withdrawer**: Isang user na gustong lumabas sa plasma chain.
- **Committed na tx**: Isang tx na kasama sa isang Polygon chain block at na-checkpoint sa root chain.
- **Spend tx**: Isang tx na nagbabago sa balanse ng token ng user bilang tugon sa isang pagkilos na nilagdaan ng user (hindi kasama ang mga papasok na paglilipat ng token). Maaaring ito ay paglipat na pinasimulan ng user na paglipat, pag-burn ng tx atbp
- **Reference tx**: Mga tx bago lang ang exit tx para sa partikular na user at token na iyon. Gaya ng tinukoy sa aming balanse sa account na nakabatay sa UTXO scheme, ang mga output sa reference tx ay nagiging mga input sa tx na kung saan nag-exit.
- **MoreVP exit na priority**: Edad ng yungest na input (kabilang sa mga reference tx) sa isang partikular na tx. Ito ay kadalasang gagamitin para sa pagkalkula ng labasan kaunahan.

### Burn token {#burn-tokens}

Para lumabas sa sidechain, maglulunsad ang isang user ng *withdraw aka burn tokens* tx sa plasma chain. Maglalabas ang tx na ito ng isang `Withdraw` na event.

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

Dito `input1` ay tumutukoy sa nakaraang balanse ng user para sa token na pinag-uusapan at `output1` ay nagsasaad ng bilang ng mga token na natitira sa side chain. Ang konstruksiyon na ito ay magkakaugnay sa account namin na nakabatay sa *UTXO* na scheme. Ipapakita ng isang user ang resibo ng withdraw tx na ito para ma-withdraw ang mga token sa pangunahing chain. Habang sumasangguni sa resibong ito, kailangan ding ibigay ng user ang sumusunod:

1. Merkle na patunay ng pagsasama ng isang resibo sa isang side chain block (`receiptsRoot`)
2. Merkle na patunay ng pagsasama ng isang transaksyon sa isang side chain block (`transactionsRoot`)
3. Patunay ng pagsasama ng side chain block header sa checkpoint sa root chain

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

Sa tuwing gustong lumabas ng user sa plasma chain, dapat nilang (o i-abstract ng kanilang client app i.e. wallet) ang mga token sa side chain, hintayin itong ma-checkpoint at pagkatapos ay magsimula ng exit mula sa checkpointed bawiin ang tx.

### Lumabas mula sa huling paglilipat ng ERC20/721 (MoreVP) {#exit-from-the-last-erc20-721-transfers-morevp}

Isaalang-alang ang senaryo, gumawa ang user ng ERC2 ilipat sa side chain. Nagdagdag ang operator ng out-of-nowhere tx bago ang paglipat ng user at nakipagsabwatan sa mga validator upang i-checkpoint ang block na ito. Sa scenario na ito at higit sa pangkalahatan, sa mga vector ng pag-atake na A1 hanggang A3 na tinalakay sa itaas, maaaring hindi nagkaroon ng pagkakataon ang user na mag-burn ng kanilang mga token bago maisama ang isang malisyosong tx at samakatuwid ay kakailanganing magsimula ng exit mula sa huling na-checkpoint na tx sa root chain - para sa kadahilanang ito, bilang karagdagan sa burn exit, kailangan nating suportahan ang mga pag-exit mula sa iba't ibang mga tx tulad ng ERC20/721 transfer at iba pa. Magbuo sa vector ng pag-atake na ito at paghiwa-hiwalayin ang 2 na mga scenario:

**Papalabas na paglipat:** Naglipat ako ng ilang mga token sa isang user, gayunpaman, napansin kong may isinamang malisyosong tx ang operator sa block/checkpoint bago isama ang aking transfer tx. Kailangan kong magsimulang mag-exit sa chain. Magsisimula ako ng pag-exit mula sa transfer tx. Gaya ng tinukoy sa MoreVP, kakailanganin kong magbigay ng reference tx (*input UTXO*) na tutukoy sa exit priority ng pag-exit. Kaya, magre-refer ako ng tx na nag-update ng balanse ng token ko at nauuna lang sa papalabas na transfer tx.

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

Papasok na **ilipat na:** Napansin ko na ang operator ay kasama ang isang malisyosong tx sa block/checkpoint bago kabilang ang ilipat kong tx.I’ll ako ng lumabas mula sa ilipat tx habang tinutukoy ang balanse ng katapat.- dahil dito ang *input na UTXO* ang token balanse ng katapat.

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### Lumabas mula sa isang transaksyon sa in-flight (MoreVP) {#exit-from-an-in-flight-transaction-morevp}

Ang senaryo na ito ay upang labanan ang data senaryo ng kawalan ng kakayahan. Sabihin nating gumawa ako ng tx ngunit hindi ko alam kung naisama ang tx na iyon dahil sa hindi available ang data. Maaari akong magsimula ng pag-exit mula sa flight tx na ito sa pamamagitan ng pagtukoy sa huling na-checkpoint na tx. Dapat mag-ingat ang user na huwag gumawa ng anumang tx sa tuwing magsisimula sila ng MoreVP na style ng pag- exit, kung hindi ay hahamunin sila.

**Mga Tala:** Kapag mag-exit mula sa isang MoreVP na style ng konstruksyon, maaaring magsimula ang isang user ng pag-exit sa pamamagitan ng pagbibigay ng mga reference tx, exit tx at paglalagay ng maliit na `exit bond`. Para sa anumang pag-exit, kung matagumpay na hinamon ang pag-exit, kakanselahin ang pag-exit at kukumpiskahi ang exit bond.

## Mga Limitasyon {#limitations}

1. Malaking proof size: Merkle proof ng pagsasama ng transaksyon at merkle proof ng pagsasama ng block (na naglalaman ng transaksyong iyon) sa checkpoint.
2. Maramihang pag-exit: Kung naging malisyoso ang operator, kailangang simulan ng mga user ang maramihang pag-exit.

Ang spec ay nasa isang bagong yugto na at kami ay nagpapasalamat sa anumang feedback na makakatulong sa amin na mapabuti ito o muling idisenyo ang kabuuan kung ang konstruksiyon na ito ay walang pag-asa na nasira. Ang pagpapatupad ay isang trabaho sa pag-unlad sa aming [contract.](https://github.com/maticnetwork/contracts)