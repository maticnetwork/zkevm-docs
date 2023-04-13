---
id: faq
title: FAQ
description: Mga FAQs na may kaugnayan sa Polygon
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Mga Madalas Itanong {#frequently-asked-questions}

## Ano Ang Polygon? {#what-is-polygon}

Ang Polygon ay isang solusyon sa pag-scale para sa mga public blockchain, partikular na ang Ethereum. Nagbibigay ang Polygon ng scalability habang tinitiyak ang isang superior na karanasan ng gumagamit sa isang secure at desentralisadong paraan. May pagpapatupad itong nagtatrabaho para sa Ethereum sa Kovan Testnet. Balak ng Polygon na suportahan ang iba pang mga blockchain sa hinaharap na magbibigay-daan sa amin na magbigay ng mga tampok ng interoperability sa tabi ng pag-aalok ng scalability sa mga umiiral na public block network.

## Paano naiiba ang Polygon sa iba pang pagpapatupad ng Plasma? {#how-is-polygon-different-from-other-implementations-of-plasma}

Itinayo ang pagpapatupad ng Plasma ng Polygon sa mga state na sidechains na nagpapatakbo sa EVM, habang ang iba pang implementasyon ng Plasma ay pangunahing gumagamit ng mga UTXO na nagliligpit sa kanila sa pagiging tiyaga sa pagbabayad. Pinapayagan ng pagkakaroon ng state na mga sidechains ang Polygon na magbigay ng scalability para sa mga generic smart contract din.

Ikalawa, gumagamit ang Polygon ng isang public checkpointing layer na naglalathala ng mga checkpoint pagkatapos ng peryodikong interbal (hindi katulad ng mga checkpoint pagkatapos ng bawat block sa Plasma Cash) na nagpapahintulot sa mga sidechain na magpatakbo sa mataas na bilis habang naglalathala ng mga checkpoint sa mga batch. Tinitiyak ng mga checkpoint na ito kasama ang mga patunay ng pandaraya na nagpapatakbo ang mga sidechain ng Polygon sa isang secure na paraan.

## Nagbibigay ang proyekto mo ng kakayahang mai-scale sa Ethereum gamit ang mga chain ng plasma, isa ba itong protocol o isa mismong native na blockchain? {#your-project-provides-scalability-for-ethereum-using-plasma-chains-is-it-a-protocol-or-a-native-blockchain-in-itself}

Ang Polygon network ay isang **"sidechain"** na solusyon kung saan ang mga pangunahing chain asset ng Ethereum, ibig sabihin, ang lahat ng dApps / Tokens / Protocol ng pangunahing chain ay maaaring ilipat / lumipat sa (s) ng Polygon sidechain, at kapag kinakailangan, puwede mag-withdraw ang isa ng mga asset pabalik sa main chain.

## Ano ang mga competitive na pakinabang ng Polygon sa mga competitors? nito? {#what-are-the-competitive-advantages-of-polygon-over-its-competitors}

### Mga L2 na solusyon sa pag-scale {#l2-scaling-solutions}

Nakatuon ang Polygon na makamit ang scale gamit ang desentralisasyon. Gumagamit ang polygon ng mga regular na checkpoint at patunay ng pandaraya. Kapag gusto ng mga gumagamit na i-withdraw ang kanilang mga asset, ginagamit nila ang mga checkpoint para patunayan ang kanilang mga asset sa sidechain, habang kailangan ang mga fraud proofs para hamunin ang pandaraya o anumang masamang pag-uugali at slash stakers.

Nag-aalok din ang iba pang mga proyekto ng L2 scaling solutions ngunit may dalawang pangunahing elemento na naiiba namin:

1. Una, tinututukan ng Polygon ang hindi lang mga transaksyon sa pananalapi kundi mga laro at iba pang utility dApps din. May mga plano din kaming para sa mga full-blown financial service tulad ng pagpapautang / trading dApps (mga swap ng token, trades ng margin at marami pang iba).

2. Ikalawa, habang gumagamit ang Polygon ng mga checkpoint para sa 1-second block times (na may POS layer), maaaring magkaroon ng block times na mas malaki kaysa sa mga oras ng block ng Ethereum hangga't kailangan mong itulak ang bawat block ng sidechain sa main chain.

### Mga L1 na solusyon sa pag-scale {#l1-scaling-solutions}

Bukod sa mga ito sa iba pang proyekto ng scaling nakatayo ang Polygon dahil sa kakayahan nitong makamit ang scale habang pinapanatili ang isang mahusay na antas ng desentralisasyon.

Mas mahalaga, may "reinventing sa wheel" ang mga proyektong ito Gumagawa sila ng mga bagong blockchain kung saan kailangan ng developer community, product ecosystem, technical documentation, at mga negosyo na kailangang itayo mula sa **"scratch"**. Ang Polygon, sa kabilang banda, ay isang EVM-enabled chain at may lahat ng dApps / asset na binuo sa main chain ng Ethereum na may scalability na magagamit sa pag-click ng isang pindutan.

### Mga Pagbabayad {#payments}

Naniniwala kami na ang Polygon ay may gilid sa mga tuntunin ng usability dahil sa iba pang solusyon, kailangang lumikha ng kanilang mga channel ng pagbabayad. Napakahirap nito para sa mga user. Samantala dahil sa batayang teknolohiya ng Polygon, hindi na kailangan ng mga user na magkaroon ng mga channel sa pagbabayad. Kailangan lang nilang magkaroon ng valid na Ethereum address para makatanggap ng mga token. Nakaayon din ito sa aming pangmatagalang hangarin na mapaganda ang karanasan ng user sa mga desentralisadong application.

### Trading at Pananalapi {#trading-and-finance}

Balak ng Polygon na paganahin ang mga DEX (eg. 0x), mga Liquidity pool (eg. Kyber Network) at iba pang uri ng mga financial protocol tulad ng Lending protocol (Dharma Protocol) sa platform nito, na magpapahintulot sa mga gumagamit ng Polygon na mag-access ng iba't ibang financial serivce application tulad ng DEX, pagpapautang ng mga dApps, LPs at marami pang iba.

## Paano ihahambing ang Polygon sa iba pang mga solusyon sa sidechain? {#how-does-polygon-compare-with-other-sidechain-solutions}

Sa Polygon, sinisigurado ang lahat ng mga transaksyon ng panig ng maraming mekanismo sa sidechain pati na rin ang pangunahing chain. Sa sidechain, napatunayan at naka-checkpoint ang anumang transaksyon na ginawa ng layer ng producer ng Block sa main chain sa pamamagitan ng isang mataas na desentralisadong checkpointing layer.

Kung may malanding transaksyon na nangyayari sa sidechain, puwede itong makita at mahawakan ng checkpointing layer. Kahit sa matinding at hindi malamang na sitwasyon kung saan nagbabago ang layer ng producer ng block pati na ang checkpointing layer na parehong nagbabanggit, kahit na ang pangunahing chain ay may mga patunay ng pandaraya kung saan maaaring come ang sinumang mula sa publiko at maghamon ng anumang transaksyon na niloloko nila sa sidechain.

Kung matagumpay ang hamon, may malaking insentibo sa ekonomiya/pinansiyal na parusang pambabastos sa mga party ng colluding dahil napapikit ang kanilang mga stake. Gayundin, ginagantihan ng public challenger ang mga slash stake ng mga mapanlinlang na sidechain actors.

Ginagawa nitong incentivized ang Polygon ng economically sidechain network na may mataas na antas ng desentralisasyon at seguridad ng mga transaksyon ng sidechain.

Gayundin ang kapasidad at TPS ng mga sidechain ng Polygon ay mas mataas kaysa sa iba pang solusyon. Lalo na kapag ang Polygon ay maaaring magkaroon ng libu-libong transaksyon habang ang iba ay iisang sidechains na may mas mataas na limitasyon ng ilang libong transaksyon.

## Via anong mga prinsipyo ang will ng mga bagong sidechain? Magkakaroon ba ng anumang espesyal na kinakailangan para sa mga lokal na sidechains? {#via-what-principles-will-new-sidechains-be-added-will-there-be-any-special-requirements-for-private-companies-local-sidechains}

Kaugnay ng mga state channel, Plasma ang pinakamahusay na alternatibo sa mga framework sa pag-scale, na pangunahing dulot ng mga garantiya ng seguridad na ibinigay ng framework - na nagsasabing hindi mawawala ang mga pondo ng mga user anuman ang mangyari. Tiyak na magkakaroon ng mga pagkaantala sa pagkuha ng pera, pero hindi makakagawa ng pera mula sa wala o magkaroon ng dobleng gastos sa isang transaksyon ang isang Byzantine Plasma operator.

Sisikapin ng Polygon na maging isang ganap na bukas at pampublikong blockchain infra sa hinaharap kung saan pangunahing isusulong ng pang-ekonomiyang pabuya/multa ang pagkakaroon ng seguridad at katatagan sa system. Kaya puwedeng sumali sa system ang kahit na sino at lumahok sa consensus. Gayunpaman, sa simula ay magkakaroon ng mas malaking papel ang Polygon para paganahin ang mga sidechains.

Gayundin, magiging pangunahing pampublikong sidechains ang mga Polygon sa mga pampublikong sidechain i.e ang mga sidechain na magagamit para sa sinumang gumamit ng katulad ng iba pang pampublikong blockchain. Gayunpaman, magbabalak ang mga chain ng Enterprise Polygon na magbigay ng mga dedikadong sidechains (pinagana ang non-privacy) para sa mga partikular na organisasyon. The pa ng seguridad at desentralisasyon ng mga naturang tanikala ang paggamit ng checkpointing layer at mga patunay ng pandaraya sa pangunahing chain.

## be din ba ang mga sidechain sa main chain (Ethereum)? {#will-sidechains-also-be-synced-with-the-main-chain-ethereum}

Tiyak yan. will ng public checkpointing layer ang lahat ng transaksyong nangyayari sa mga sidechains at i-publish ang mga proofs sa main chain. Para matiyak ang hindi nagawang seguridad ng mga transaksyon ng sidechain, ang pangunahing kontrata ng Chain Plasma ay naglalaman ng iba't ibang uri ng Fraud Proofs kung saan maaaring hamunin ang anumang transaksyon ng sidechain para sa anumang mapanlinlang na aktibidad. Kung magtagumpay ang isang challenger, ang mga stake ng mga aktor ng sidechain na kasangkot sa pandaraya ay slash at nililipat sa challenger. katumbas ito ng isang kailanman tumatakbo na mataas na stake bug bounty. Isang magandang diagram para sa pag-unawa ay tulad ng sa ibaba:.

![Screenshot](/img/matic/Architecture.png)

## Sa dulo ng Whie Paper, may listahan ng "Mga Posibleng Use Case" - ipapatupad ba ang lahat ng iyon? Sa anong pagkakasunod-sunod? {#at-the-end-of-the-white-paper-there-is-a-list-of-potential-use-cases-will-all-of-that-be-implemented-in-what-order}

Ang pangunahing lohika ay - kung may dApp / Protocol na nagtatrabaho sa Ethereum, ngunit limitado ang mababang transaksyon throughput at mataas na bayad sa transaksyon - magagawa naming magdagdag ng suporta para sa mga dApps / Protocol sa Polygon network.

## Bakit magiging mahirap na kopyahin ang pagpapatupad ng plasma ng Polygon? {#why-will-it-be-difficult-to-replicate-polygon-s-plasma-implementation}

Bagama't higit na tungkol sa epekto ng network sa mga tuntunin kung saan to ang network / lumalaki ang ecosystem nang mas mabuti kaysa sa iba, dapat na buksan ang mga solusyon ng blockchain dahil kinalaman nila ang mga aktwal na asset na ginagamit ng mga ito.

Ito ang kaso sa lahat ng open source projects. Naangkop din ito sa amin at sa iba pang kalabang pagpapatupad dahil magkakaroon kami ng GPL license na nag-uutos sa kahit sinong gumagamit ng aming pagpapatupad na ipag-utos na maging open source ang kanilang code. Ngunit muli, naaangkop ang punto na ang pagkopya ng code kahit sa Bitcoin, Ethereum, at anumang iba pang proyekto, mas tungkol sa epekto ng network na makakamit ng isang proyekto.

## Ano ang espesyal sa pagpapatupad ng Plasma ng Polygon Network? {#what-s-special-about-polygon-network-s-plasma-implementation}

Gumagamit ang Polygon Plasma ng isang model na batay sa account sa halip na sa UTXO system. Nagbibigay ito sa amin ng malaking kalamangan ng paggamit ng isang EVM sa polygon chain na nagbibigay-daan sa amin na gamitin ang buong Ethereum ecosystem, mga tool ng developer, mga aklatan ng integration, at iba pa para sa Polygon network.

Maaaring gamitin ang Polygon network ng dApps nang hindi nangangailangan ng anumang pagbabago sa kanilang ERC20 tokens. Bukod dito, pinapayagan kaming maging order ng aming checkpointing layer ng magnitude nang mas mabilis kaysa sa iba pang implementasyon ng Plasma dahil binitbit namin ang mga proofs ng mga indibidwal na block sa mga checkpoint, samantalang dapat magsumite ang iba pang mga implementasyon ng Plasma sa bawat block proof sa main chain.

## Paano ninyo lulutasin ang mga isyu sa sentralisasyon? {#how-are-you-going-to-solve-the-issues-with-centralization}

Narito ang isang diagram para bigyan ka ng ilang konteksto:

![Screenshot](/img/matic/Merkle.png)

Kaya una, ang mga node ng PoA ay magiging Delegates (sa Proof of Solvency ibig sabihin, kailangan nilang magdeposito ng mataas na halaga ng stake) at ang KYC talaga ang pinili ng layer ng POS tulad ng isang style ng EOS na Delegated Proof of Stake (DPoS) o Delegadong Byzantine Fault Tolerance (with node.

Ikalawa, ipagpalagay natin ang lahat ng Delegates (o 2/3rd sa kanila) ay turn actors at gumawa ng faulty blocks, tapos mayroon kang mga layer staker ng PoS na mag-validate ng lahat ng block at kung have ang mga fraud, ang mga stake ng mga Delegate ay slash at ang checkpointing ay tumitigil para sa mga aksyon ng corrective.

Pangatlo, sabihin natin kahit ang staker PoS layer (na magiging isang malaking bilang ng node) ay nagiging masama rin at magbabanggaan para makabuo ng faulty checkpoints ibig sabihin, lahat ng PoA ay corrupt at Tos ay sira. Kahit noon, kasunod ng pilosopiya ng Plasma, sinusulat namin ang isa sa mga coveted na bagay ng scaling ng sidechain, ang mga **fraud proofs** na pinapanood ng maraming malalaking proyekto (makikita ang mga manonood ng aming mga repository watcher sa GitHub). Pinapayagan ng mekanismo ng patunay na ito ang sinumang nasa publiko na hamunin ang anumang transaksyon sa pangunahing chain, ang Ethereum.

## Bakit kinakailangan ang Matic Token? {#why-is-matic-token-required}

Pinapalakas ng mga sumusunod na dahilan ang pangangailangan ng pagkakaroon ng MATIC token:

### Nagnanais ang Polygon na maging pangkalahatang layunin na pag-scale ng solusyon para sa mga public blockchain {#polygon-intends-to-be-a-general-purpose-scaling-solution-for-public-blockchains}

Nagsisimula kami sa Ethereum bilang unang basechain namin, pero sa hinaharap ay maaaring i-deploy ang Polygon sa maraming basechains. May iba pang idaragdag na basechain sa lalong madaling panahon. Kaya walang kabuluhan ang magkaroon ng isang currency (ether) para gamitin sa pagbabayad ng mga bayarin sa mga sidechain. Kung may existential concern sa anumang hinaharap, na may pera ng basechains, na isang native asset para sa Polygon ang pag-scale network. Kung gayon, mahalagang bumuo ng Staker ecosystem sa sariling network token ng Polygon.

### modelo ng seguridad ng Appcoin {#appcoin-security-model}

Layunin ng Polygon na i-enable ang mga Dapp para bayaran ang mga bayarin sa Polygon gamit ang mga Dapp-coin sa pamamagitan ng pag-abstract ng mekanismo sa pag-swap ng token gamit ang liquidity pool gaya ng Kyber. Ginagamit lang ng user ang kanyang mga dApp-coins para magbayad ng mga bayad, sa background ay swapped ang dApp-coin para sa mga MATIC token. Kaya nakakatulong ang mga DApp developer na gustong magbigay ng magandang karanasan sa user na mapanatili ang liquidity pool ng Polygon.

### Seeding ng network sa mga nascent stage {#seeding-the-network-in-nascent-stages}

Halos imposibleng i-seed ang system kapag kakaunti o walang transaksyon sa network sa simula, dahil hindi namin maipapamahagi ang Eth sa napakadesentralisadong layer ng Validator at sa mga block producer. Habang sa mga Matic token, naglaan kami ng malaking porsyento ng mga token para ipamahagi sa pag-seed ng block producer, mga stake ng taga-checkpoint, at pagkatapos ay magbigay ng mga gantimpala sa block. Tinitiyak ng probisyong ito na makakatanggap ang mga staker ng mga gantimpala kahit pa tumagal nang ilang oras bago magkaroon ng mga epekto sa network. Kapareho ng dahilan kung bakit pinapanatili ang mga gantimpala sa Block Mining para sa Bitcoin, puwedeng bigyan ng gantimpala ang mga staker at block producer sa ganitong paraan para mapanatiling ligtas ang network.

Kung nag-aaalala ka tungkol sa mga Dev, isa sa mga haligi ng aming diskarte ang panatilihing napakababa ng hadlang sa pagpasok para sa mga dev. Tiniyak namin na gumagana kaagad sa Polygon ang lahat ng dev tool ng Ethereum. Sa mga tuntunin ng kailangan ng mga token para sa pagbabayad ng mga bayad sa testnet, walang pinagkaiba para sa isang developer building sa Ethereum. Nakakuha ang dev ng libreng token para sa testnet mula sa isang gripo ng Polygon, tulad nito ay nasa Ethereum. Kailangan mo lamang ng mga token ng MATIC kapag gusto mong i-deploy ang Polygon Mainnet, kung saan mas mababa ang bayad ng gas kaysa sa Ethereum, sa paligid ng 1/100 ng isang transaksyon fee na babayaran mo sa Ethereum.

## Ano ang dahilan sa paggamit at pangangailangan para sa mga Matic token? {#what-drives-the-use-and-demand-for-matic-tokens}

May dalawang pangunahing gamit ang token:

1. Ginagamit ang token para magbayad ng mga bayad sa transaksyon sa network.
2. Ginagamit ang token para sa pag-stake para lumahok sa mekanismo ng pinagkasunduan ng Proof Stake para sa checkpointing layer at i-block ang production layer.

### Ilan sa mga pangalawang dahilan para sa demand ng token {#some-of-the-secondary-reasons-for-token-demand}

* Layunin ng Polygon na i-enable ang mga Dapp para bayaran ang mga bayarin sa Polygon gamit ang mga Dapp-coin sa pamamagitan ng pag-abstract ng mekanismo sa pag-swap ng token gamit ang liquidity pool gaya ng Kyber. Ginagamit lang ng user ang kanyang mga dApp-coins para magbayad ng mga bayad, sa background ay swapped ang dApp-coin para sa mga MATIC token. Kaya nakakatulong ang mga DApp developer na gustong magbigay ng magandang karanasan sa user na mapanatili ang liquidity pool ng Polygon.

* Para paganahin ang mas mabilis na paglabas ay nagpapatupad kami ng isang lending mechanism gamit ang Dharma Protocol kung saan matatanggap ng isang underwriter / tagapagpahiram ang exit-token at disburse ang exit amount na may maliit na bayad bilang interes. Pagkatapos, kukunin ng lender ang mga token pagkalipas ng isang linggo gamit ang exit-token. Sa gaitong paraan, nakakakuha ang user ng halos agarang pag-withdraw habang puwedeng kumita ng interes ang mga lender para sa serbisyong kanilang ibinibigay.

### Pagbabawas ng mga token sa Protocol Level {#protocol-level-burning-of-tokens}

Balak naming mag-burn ng porsyento ng transaksyon fee sa bawat block. Ginagawa nitong deflationary ang mga token sa kalikasan at nagbibigay ito ng palagiang suporta sa mga tuntunin ng halaga nito sa antas ng protocol.

### Mababang hadlang sa pagpasok (at mas mataas na posibilidad ng mabilis na pag-aangkop) {#low-entry-barrier-and-hence-higher-chances-of-quick-adoption}

Lubos kaming aasa sa mga DApp para magdulot ng pang-aangkop sa end-user. Isa sa mga pangunahing tampok ay ang mapanatili naming isang arkitektura na ganap na tugma sa Ethereum development ecosystem ibig sabihin, lahat ng smart contract, wallet, IDEs, DevOps tools etc ay direktang magkatugma sa Polygon.

Puwedeng i-port sa Polygon ang anumang Dapp ng Ethereum nang halos walang malaking pagbabago. Kaya ang mga hadlang sa pagpasok para sa mga umiiral na developer ng Ethereum sa paglipat sa Polygon ay nabiyayaan na maaaring jumpstart ng isang viral dApp adoption. May potensyal itong magdala ng maraming organic demand dahil sa mga epekto ng network na bumuo sa paligid ng Polygon network.

## ERC20 ba ang token? {#is-token-type-erc20}

Oo. At magiging applicable ang parehong token sa Polygon Chain masyadong ibig sabihin, hindi na kailangang lumipat sa isang native token sa hinaharap.

## Ano ang inaasahang TPS na madadala ninyo sa Ethereum network? Ano ang pinapatakbo ninyo ngayon sa testnet? {#what-is-the-expected-tps-you-ll-be-able-to-bring-to-the-ethereum-network-what-are-you-running-at-now-on-testnet}

May kapasidad na 7,000 + transaksyon bawat segundo. May kakayahan ang Polygon na magdagdag ng maraming sidechains, ngunit sa kasalukuyan, magiging patatagin ang aming focus sa network sa isang sidechain.
