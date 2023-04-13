---
id: stakingmanager
title: Pag-stake Manager
description: Ang Staking Manager ang pangunahing kontrata para sa paghawak ng mga aktibidad na may kaugnayan sa validator sa Polygon network.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Para sa pinagkasunduan ng Proof of Security ng Polygon na batay sa Polygon, ang lahat ng nag-verify ng +1 na patunay na pag-verify at paghawak ng pag-stake, ang mga gantimpala ay isinagawa sa smart na kontrata ng Ethereum. Ang buong disenyo ay sumusunod sa pilosopiyang ito ng paggawa ng mas kaunti sa kontrata ng Mainnet. Gumagawa ito ng pag-verify ng impormasyon at itinutulak ang lahat ng operasyong mabigat ng computation-heavy L2 (na babasahin ang tungkol sa [Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview)).

Nahahati ang **mga** staker sa **mga validator**, **delegator**, at **mga manonood** (para sa pag-uulat ng pandaraya).

Ang [**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) ang pangunahing kontrata para sa paghawak ng mga aktibidad na may kaugnayan sa validator tulad ng `checkPoint`signature verification, gantimpala sa pamamahagi, at stake management. Dahil gumagamit ang kontrata ng **NFT ID** bilang isang mapagkukunan ng pagmamay-ari, hindi makakaapekto ang pagbabago ng pagmamay-ari at signer sa anumang bagay sa sistema.

:::tip

Mula sa isang Ethereum address, **ang isang Staker ay maaari lamang maging validator o delegator** (isa lang itong design choice, walang hard reasons).

:::

## Admission ng Validator / Kapalit {#validator-admissions-replacement}

### Admission {#admissions}
Sa kasalukuyan, walang mga open validator slot na available sa Polygon PoS. Mayroon ding waitlist para maging validator. Sa hinaharap, kung naging magagamit, maaaring mag-apply ang mga validator na ituring at alisin ang waitlist.


### Kapalit {#replacement}
Ipinakilala ng PIP4 ang konsepto ng pagpapakita ng validator performance para sa visibility ng komunidad. Kung ang isang validator ay nasa isang hindi malusog na estado para sa isang extended na tagal ng panahon na nakabalangkas sa PIP4, they sila mula sa network. Pagkatapos ay ginawa ang validator slot na magagamit sa mga nagmumula sa waitlist.

:::info

Sa kasalukuyan, ang [<ins>Phase 2 ng PART C sa PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) ang ipinapatupad. Ito ay kung saan nagpasiya ang komunidad sa validator na prospect evaluation criteria. Sa oras, will ang ehersisyong ito ng proseso ng application at admissions.

:::

## Mga Paraan at Variable {#methods-and-variables}

:::caution Pagpapatupad ng Slashing

`jail`, `unJail`, at hindi ginagamit ang mga `slash`function na kasalukuyang bilang bahagi ng pagpapatupad ng slash .

:::

### validatorThreshold {#validatorthreshold}

Nag-iimbak ito ng maximum na bilang ng mga validator na tinanggap ng system, na tinatawag ding mga slot.

### AccountStateRoot {#accountstateroot}

- Para sa iba't ibang accounting na ginawa sa Heimdall para sa mga validator at delegator, isinumite ang ugat ng account habang isinusumite ang `checkpoint`.
- Ginagamit ang accRoot habang `claimRewards`at .`unStakeClaim`

### stake / stakeFor {#stake-stakefor}

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

- Pinapayagan ang sinumang may halaga (sa mga token ng MATIC) na mas malaki kaysa sa `minDeposit`, kung mas mababa pagkatapos `currentValidatorSetSize`ay .`validatorThreshold`
- Dapat `amount+heimdallFee`maglipat, naglalagay ng validator sa tagal ng auctionInterval (higit pa sa seksyon ng Auction).
- `updateTimeLine`nag-update ng espesyal na istraktura ng data ng timeline, na sinusubaybayan ang mga aktibong validator at aktibong stake para sa ibinigay na epoch / checkpoint count.
- Isang natatanging `NFT`ay minted sa bawat bago `stake`o `stakeFor`tawag, na maaaring ilipat sa sinuman ngunit maaaring pag-aari ng 1:1 Ethereum address.
- `acceptDelegation`nakatakda sa totoo kung gustong tanggapin ng mga validator ang delegasyon, naka-deploy ang `ValidatorShare`kontrata para sa validator.

### Mag-unstake {#unstake}

- Alisin ang validator mula sa validator na itinakda sa susunod na epoch (valid lang para sa kasalukuyang checkpoint na isang beses na tinawag `unstake`)
- Alisin ang stake ng validator mula sa istraktura ng data ng timeline, at i-update ang bilang para sa exit epoch ng validator.
- Kung may delegasyon ang validator, mangolekta ng lahat ng gantimpala at i-lock ang kontrata ng delegasyon para sa mga bagong delegasyon.

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- Pagkatapos `unstaking`, nilalagay ang mga validator sa withdrawal period para ma-slash sila, kung natagpuan ang anumang pandaraya `unstaking`pagkatapos , para sa mga nakalipas na pandaraya.
- Kapag naglingkod ang `WITHDRAWAL_DELAY`panahon, puwedeng tumawag ang mga validator ng function na ito at do sa `stakeManager`(kumuha ng mga gantimpala kung mayroon man, makakuha ng staked token back, mag-burn ng NFT, atbp).

### Mag-restake {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- Nagbibigay-daan sa mga validator na pataasin ang kanilang stake sa pamamagitan ng paglalagay ng mga bagong halaga o reward o pareho.
- Dapat i-update ang timeline (halaga) para sa aktibong stake.

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

Pinapayagan ng pamamaraang ito ang mga validator na mag-withdraw ng mga naipon na gantimpala, dapat isaalang-alang ang pagkuha ng mga gantimpala mula sa kontrata ng delegasyon kung tumatanggap ang validator ng delegasyon.

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

Pinapayagan ng pamamaraang ito ang mga validator na i-update ang signer address (na ginagamit para i-validate ang mga block sa polygon blockchain at mga lagda ng checkpoint sa `stakeManager`).

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

Maaaring i-top-up ng mga validator ang kanilang balanse para sa bayad ng Heimdall sa pamamagitan ng pag-invite ng pamamaraang ito.

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

Ginagamit ang pamamaraang ito para mag-withdraw ng mga bayad mula sa Heimdall. ay na-update sa bawat checkpoint, upang makapagbigay ang mga validator ng patunay ng pagsasama sa ugat na ito para sa account sa `accountStateRoot`Heimdall at mag-withdraw ng fee.

Tandaan `accountStateRoot`na muling isinulat para maiwasan ang mga lumabas sa maraming checkpoint (para sa lumang ugat at i-save ang accounting sa ). `accumSlashedAmount`ay hindi ginagamit sa sandaling ito at gagamitin para sa slashing sa Heimdall kung `stakeManager`kinakailangan.

### StakingNFT {#stakingnft}

kontrata ng Standard ERC721 na may ilang paghihigpit tulad ng isang token bawat user at minted sa paraang sequential.

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

Para magsimula ang isang bida o mag-bid na mas mataas sa pagpapatakbo ng auction, ginagamit ang function na ito. Tumatakbo ang panahon ng auction sa mga cycle tulad `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`nito dapat itong **mag-check para sa tamang** panahon ng auction.

`perceivedStakeFactor`ay ginagamit upang calculate ang eksaktong factor *lumang stake (tandaan na kasalukuyang nasa pamamagitan ng default 1 WIP para sa pagpili ng function). Dapat suriin **ang auction mula sa huling tagal ng auction kung may nangyayari pa rin** (pwede na ang isa na hindi `confirmAuction`tumawag para makuha ang kanilang kapital sa susunod na auction). Karaniwan tuloy na ingles auction ang nangyayari sa isang `auctionPeriod`.

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **Dapat suriin na hindi ito isang auctionPeriod.**
- Kung may-ari ng huling bidder ang `validatorId`, dapat magkatulad ang pag-uugali sa restake.
- Sa pangalawang kaso, unStake `validatorId` at magdagdag ng bagong user bilang validator mula sa susunod na checkpoint, para sa bagong gawi ng user ay dapat na katulad ng stake/stakeFor.

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- Ang mga write ay para lamang sa mga kontrata ng RootChain kapag nagsusumite ng mga checkpoint
- Ang `voteHash` kung saan nilagdaan ang lahat ng mga validator (BFT ⅔+1 na kasunduan)
- Ang function na ito ay nagpapatunay lamang ng mga natatanging sig at mga pagsusuri para sa ⅔+1 kapangyarihan na napirmahan sa checkpoint root (pagsasama sa pag-`voteHash`verify sa RootChain contract para sa lahat ng data) ay `currentValidatorSetTotalStake`nagbibigay ng kasalukuyang aktibong stake.
- Ipinamamahagi ang mga gantimpala nang pantay-pantay sa stake ng validator. Higit pa sa mga gantimpala sa [Distribusyon](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2) ng Gantimpala.

### isValidator {#isvalidator}

Mga check kung ang isang ibinigay na validator ay aktibong validator para sa kasalukuyang epoch.

## Istraktura ng data ng timeline {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

Centralized na kontrata sa pag-log para sa parehong validator at mga kaganapan sa delegation, kabilang ang ilang babasahin na lamang ang mga function. Maaari mong tingnan ang source code ng [StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) contract sa GitHub.

## ValidatorShareFactory {#validatorsharefactory}

Isang kontrata ng pabrika na mag-deploy ng `ValidatorShare`kontrata para sa bawat validator na who para sa delegasyon. Maaari mong tingnan ang source code ng [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) kontrata sa GitHub.
