---
id: wallet-bridge-faq
title: Wallet <>Bridge FAQ
description: Buuin ang susunod mong blockchain app sa Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Saan ko magagamit ang Polygon Web Wallet? {#where-can-i-use-the-polygon-web-wallet}
Narito ang URL: https://wallet.polygon.technology/ Ang Polygon Wallet Suite ay isang koleksyon ng mga application ng Web3 na ibinigay ng Polygon. Binubuo ito ng [Polygon Wallet](https://wallet.polygon.technology/polygon/assets) (desentralisadong wallet), [Polygon Bridge](https://wallet.polygon.technology/polygon/bridge/deposit) (isang L1-L2 bridge), [Polygon Staking](https://staking.polygon.technology/) (isang kapaligiran para sa pag-stake at pag-deliver ng mga MATIC tokens) at [Polygon Safe Bridge](https://safe-bridge.polygon.technology/safe) (isang multisig bridge).

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## Alin-aling wallet ang kasalukuyang sinusuportahan? {#which-wallets-are-currently-supported}

Ang Metamask, Coinbase, Bitski Wallet, Venly at WalletConnect ang kasalukuyang sinusuportahan na mga wallet.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## Ano ang maaari kong gawin sa aking Polygon wallet? {#what-can-i-do-with-my-polygon-wallet}

- Magpadala ng mga pondo sa anumang account sa Polygon.
- Magdeposito ng mga pondo mula sa Ethereum papunta sa Polygon (gamit ang bridge).
- Mag-withdraw ng mga pondo pabalik sa Ethereum mula sa Polygon (gamit din ang bridge).

## Ang aking MetaMask wallet ay hindi kumokonekta sa Polygon wallet {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

Maraming dahilan kung bakit maaaring mangyari ito. Iminumungkahi namin na subukan mo **ang isa** pang pagkakataon, gumamit ng **isa pang browser** o, kung hindi makatutulong ang alinman sa mga ito, makipag-ugnayan sa **[aming koponan](https://support.polygon.technology/support/home)** ng suporta.

## Paano ako can ng mga Pondo mula sa Ethereum papunta sa Polygon gamit ang Polygon Wallet Suite. {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
Please ang video sa ibaba o sundin ang [tutorial na ito](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>Hindi sinusuportahan ng browser mo ang video element.</p>
</video>

## Paano ko can ang mga pondo mula sa Polygon papunta sa Ethereum sa pamamagitan ng PoS Bridge gamit ang Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
Please ang video sa ibaba o sundin ang [tutorial na ito](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>Hindi sinusuportahan ng browser mo ang video element.</p>
</video>

## Paano ko can ang mga pondo mula sa Polygon patungo sa Ethereum sa pamamagitan ng Plasma Bridge gamit ang Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
Please ang video sa ibaba o sundin ang [tutorial na ito](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>Hindi sinusuportahan ng browser mo ang video element.</p>
</video>

## Paano magdagdag ng bago o custom na token sa listahan ng Token ng Polygon Wallet Wallet {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
Paki-follow [ang tutorial na ito.](/docs/faq/adding-a-custom-token)

## Paano ko hahanapin ang kontrata ng token? {#how-do-i-find-the-token-contract}

Kakailanganin ang contract address ng token kapag sinusubukan mong magdagdag ng bago o custom na token. Maaari mong hanapin ang token sa pangalan nito sa alinman sa Coingecko o CoinMarketCap kung saan makikita mo ang address nito sa Ethereum chain (para sa mga token ng ERC20) at iba pang suportadong blockchain tulad ng Polygon. Maaaring hindi na-update ang token address sa ibang mga chain ngunit tiyak na magagamit mo ang root address para sa lahat ng layunin.

## Idineposito ko ang aking mga pondo pero hindi ko ito nakikita sa Metamask. Ano ang aking gagawin? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

Kailangan mong manu-manong idagdag ang custom na token address sa Metamask

Buksan ang Metamask at mag-scroll pababa para mag-click sa **Mag-import ng mga token**.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

Pagkatapos, idagdag ang may-katuturang contract address, simbolo, at decimal na katumpakan. Makikita ang mga contract address (PoS-WETH sa kasong ito) sa link na ito: [https://docs.polygon.technology/docs/operate/mapped-tokens/](https://docs.polygon.technology/docs/operate/mapped-tokens/). Kakailanganin mong idagdag ang address ng token ng bata upang tingnan ang mga balanse sa Polygon Mainnet. Ang decimal of precision ay 18 para sa WETH (para sa karamihan ng mga token, ang decimal of precision ay 18).

## Paano ko idadagdag ang Polygon Mainnet sa Metamask {#how-can-i-add-polygon-mainnet-on-metamask}

[I-check ang tutorial na ito](/docs/develop/metamask/config-polygon-on-metamask).

## Hindi nakikita ang token ko sa listahan. Sino ang dapat kong kontakin? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Makipag-ugnayan sa pangkat ng Polygon sa Discord o Telegram at ilista ang iyong token. Bago iyon, tiyaking naka-map ang iyong token. Kung hindi ito mapped, mag-raise ng request sa [https://mapper.polygon.technology/](https://mapper.polygon.technology/).

## Maaari ko bang i-cancel ang transaksyon ko pagkatapos dumating ang checkpoint? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
Kapag sinimulan ang transaksyon ng withdrawal sa Polygon Mainnet, sa kasamaang palad ay hindi ito maaaring kanselahin o balikan. Sa mga transaksyon ng withdraw, sinusunog ang mga token mula sa Polygon Mainnet at minted sa Ethereum Mainnet. Samakatuwid, minsan na sinunog ng mga token mula sa Polygon chain mula sa iyong wallet.

## Napakataas ang bayad ng gas, pwede ko bang i-cancel ang transaksyon ko? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

Sa kasamaang palad, hindi namin puwedeng kanselahin ang withdrawal transaction kapag nasunog ang mga token mula sa Polygon Mainnet. Sa madaling salita, imposible na i-cancel ang isang transaksyon kapag nasimulan ito. Hindi kontrolado ng gas fee ang Polygon. Talagang nakasalalay ito sa kasikipan ng network at sa bilang ng mga transaksyon sa isang partikular na block sa Ethereum Mainnet. Kung sa tingin mo hindi mo kayang i-afford ang kasalukuyang bayad ng gas, maaari kang maghihintay at subukang magpatuloy sa iyong transaksyon sa ibang pagkakataon kapag nasa baba ang bayad ng gas. Maaari mo ring subaybayan ang bayad ng gas sa Ethereum Mainnet mula dito: https://etherscan.io/gastracker


## Maaari ko bang ipadala ang aking mga token mula sa Polygon sa anumang ibang wallet/palitan? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Hindi mo direktang ipadala ang mga token mula sa Polygon UI sa mga palitan/wallet. Kailangan mo munang mag-withdraw mula sa Polygon patungong Ethereum at pagkatapos ay ipadala ito sa iyong exchange address (maliban kung ang iyong exchange/wallet ay tahasang sumusuporta sa network).

## Ginawa ko ang pagkakamali ng pagpapadala ng mga pondo sa isang exchange/wallet Maaari ka bang tumulong? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

Sa kasamaang palad, hindi kami makakatulong sa mga ganitong kaso. Mangyaring huwag magpadala ng mga pondo nang direkta sa mga palitan na sumusuporta lamang sa Ethereum, kailangan mo munang mag-withdraw mula sa Polygon patungo sa Ethereum at pagkatapos ay ipadala ito sa iyong exchange address.

## Nagpadala ako sa maling address. Paano ko kukunin ang mga pondo? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

Sa kasamaang palad, walang magagawa. Tanging ang may-ari ng mga pribadong key sa partikular na address na iyon ang can ng mga asset na iyon. Laging ipinapayong kumpirmahin kung ang address na pinapadala mong mga token na ang tama.

## been nang matagal ang transaksyon ko, ano ang magagawa ko? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
Maaaring bumaba ang transaksyon dahil sa mga sumusunod na kadahilanan:

1. Nagse-set up ng mababang presyo ng gas habang nagsusumite ng transaksyon.
2. Isang biglaang surge sa presyo ng gas dahil sa kasikipan sa Ethereum Mainnet.
3. Kinansela ka ng transaksyon mula sa iyong wallet o pinalitan ng bagong transaksyon.

Maaari mong magpatuloy sa mga bumaba na transaksyon sa mga sumusunod na paraan:

1. Kung natigil ang iyong transaksyon nang mahigit isang oras, ipapakita ang isang **Subukan Muli** button. Maaari mong i-click ang pindutan ng **Try Again** para makumpleto ang parehong transaksyon. Maaari mong i-refer ang video na ito para sa karagdagang impormasyon kung paano gamitin ang tampok na **Try Again**.
2. Paki-check ang wallet ng MetaMask pati na rin dahil kung minsan ay maaaring bumaba ang mga transaksyon dahil sa mga queued-up transaction sa Metamask Sa kasong iyon, i-clear ang mga transaksyon ng queued-up o muling i-install ang MetaMask sa parehong browser.
3. Maaari mong i-install ang MetaMask sa isang alternatibong browser at saka subukang kumpletuhin ang transaksyon gamit ang Polygon Wallet Suite.
4. Maaari mo ring gamitin ang link na ito para makumpleto ang nakabinbing withdrawal transaction. I-paste ang transaksyon hash sa search option at i-click ang I-confirm ang **Exit** button para makumpleto ang transaksyon.

## Ano ang gagawin ko kung ang deposito ay nakumpirma ngunit ang balanse ay hindi na-update? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

Tumatagal ito ng 22-30 minuto para makumpleto ang transaksyon ng deposito. Please nang ilang oras at i-click ang **I-refresh** ang Balance.

## Ano ang dapat kong gawin kung hindi nangyayari ang checkpoint? {#what-should-i-do-if-the-checkpoint-is-not-happening}

Paminsan-minsan ay tumatagal ng mahigit 45 minuto hanggang 1 oras na batay sa kasikipan ng network sa Ethereum, iminumungkahi naming naghihintay ng ilang sandali bago mag-raise ng ticket.

## Natigil ang transaksyon ko. {#my-transaction-is-stuck}

Inilista namin ang ilang karaniwang error na maaaring harapin ng mga user. Mahahanap mo ang solusyon sa ibaba ng larawan ng error. Kung sakaling magpakita sa iyo ng ibang error, mangyaring [magdulog ng ticket ng suporta](https://support.polygon.technology/support/home) para sa iyong koponan upang i-troubleshoot.

  - ### Mga Karaniwang Error {#common-errors}
a. Natigil ang pag-withdraw sa Inisyal na yugto.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

 b. RPC Error

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/operate/network#matic-mainnet) for more information.

 c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

Ito ay karaniwang isang off-and-on na error na awtomatikong nareresolba. Kung sakaling nakakatanggap ka pa rin ng parehong error habang sinisimulan ang hakbang, [magdulog ng ticket ng suporta](https://support.polygon.technology/) kasama ang lahat ng may-katuturang impormasyon upang ma-troubleshoot pa ito.


## Pinakitaan ako ng hindi sapat na error sa balanse. {#i-m-shown-an-insufficient-balance-error}

Ang mga withdrawal at deposito sa Polygon network ay mura. Ang dapat unawain ay ang hindi sapat na error sa balanse ay maaaring i-clear sa pamamagitan ng pagkuha ng ilang balanse sa ETH sa ethereum mainnet. Karaniwan na nililimitahan ang problema ng hindi sapat na balanse. Kung ito ay transaksyon sa Polygon Mainnet, kakailanganin namin na mayroon kang sapat na halaga ng mga token ng MATIC.

## Ang aking mga transaksyon ay hindi nakikita sa explorer. Ano ang dapat kong gawin? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

Marahil ito ay isang isyu sa pag-index sa Polygonscan. Please ang [Support Team](https://support.polygon.technology/support/home) para sa karagdagang mga clarification.

## Nagsimula ako ng deposito sa Ethereum ngunit ipinapakita pa rin ito bilang nakabinbin. Ano ang dapat kong gawin? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

Malamang na masyadong mababa ang iyong ibinigay na gas. Dapat kang maghintay ng ilang sandali at gawing muli ang transaksyon kung hindi ito nakuha. Sa kaso ng karagdagang tulong, mangyaring makipag-ugnayan sa [team ng suporta](https://support.polygon.technology/support/home) kasama ang iyong wallet address, mga hash ng transaksyon (kung mayroon) at mga nauugnay na screenshot.

## Hindi ako nakakakuha ng hash ng transaksyon at hindi napupunta ang aking mga deposito? Ano ang nangyayari? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

Marahil ay mayroon kang mga naunang nakabinbing transaksyon, mangyaring kanselahin o pabilisin muna ang mga ito. Ang mga transaksyon sa Ethereum ay maaari lamang mangyari nang sunud-sunod.

## Ipinapakita nito na hindi naniningil ang Polygon ng anumang halaga para sa isang withdrawal ngunit magbabayad kami sa panahon ng transaksyon. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Ang isang transaksyon sa pag-withdraw sa Plasma bridge ay nahahati sa 3 hakbang, isa na nangyayari sa Polygon Mainnet at dalawang hakbang na kukumpletuhin sa Ethereum Mainnet. Sa PoS bridge, ang transaksyon sa pag-withdraw ay nangyayari sa dalawang hakbang: Pag-burn ng Token sa Polygon network at pagsusumite ng patunay sa Ethereum network. Sa bawat kaso, ang token burning na nangyayari sa Polygon Mainnet ay magiging napakaliit na halaga. Ang natitirang mga hakbang na mangyayari sa Ethereum Mainnet ay kailangang bayaran sa ETH depende sa kasalukuyang presyo ng gas na maaaring ma-verify [rito](https://ethgasstation.info/).

## Sinusubukan kong magdeposito ngunit huminto ang transaksyon sa hakbang ng Pag-apruba. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

Kung ang transaksyon ay nasa hakbang na **Aprubahan** pa rin, hindi pa ito kumpleto. Upang matupad ito, kailangan mong magbayad ng gas fee at pagkatapos ay dapat makumpleto ito.

## Ang polygon wallet ay nagpapakita ng 'User denied transaction signature' na mensahe ng error. {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

Karaniwan itong nangyayari dahil kinansela o tumanggi ang user na pumirma ng transaksyon sa pamamagitan ng MetaMask. Kapag sinenyasan ang MetaMask wallet, magpatuloy sa paglagda ng transaksyon sa pamamagitan ng pag-click sa **Approve** at hindi sa **Cancel**.

## Matagumpay ang transaksyon pero nagpapakita ito ng pending. {#the-transaction-is-successful-but-it-shows-pending}

Kung nakumpleto ang iyong transaksyon at natanggap mo ang iyong mga pondo ngunit nagpapakita pa rin ang transaksyon na nakabinbin sa UI, maaari kang mag-raise ng tiket ng suporta sa pamamagitan ng pagpapadala ng mga kaugnay na detalye at screenshot.

## Ano ang listahan ng mga Suportadong Palitan sa Polygon? {#what-is-the-list-of-supported-exchanges-on-polygon}

Maaaring i-trade ang barya ng MATIC sa maraming palitan. Gayunpaman, laging mahalaga ang gawin ang sarili mong pananaliksik kapag pinipili mong mag-trade. Hindi pangkaraniwan na ang ilang palitan ay patuloy na gumagawa ng mga pagbabago sa kanilang kasalukuyang magagamit na mga token at mayroon ding mga tagal ng maintenance

Maaaring bisitahin ang [Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) para sa isang listahan ng mga palitan kung saan maaari mong mahanap ang MATIC.

## Sinusuportahan ba ng Polygon ang mga hardware wallet? {#does-polygon-support-hardware-wallets}

Oo, sinusuportahan namin ang mga sumusunod na wallet ng hardware:
1. Trezor
2. Ledger

Maaaring ikonekta ng mga user ang kanilang opsyon ng wallet ng Hardware sa MetaMask at magpatuloy sa kanilang transaksyon. Narito ang link para ikonekta ang hardware wallet sa Metamask: https://metamask.zendesk.com/hc/en-us/articles/4408552261275

## Bakit hindi sinusuportahan ng MATIC token ang PoS? {#why-isn-t-the-matic-token-supported-on-pos}

MATIC ang native token ng Polygon at mayroon itong address ng kontrata - 0x0000000000000000000000000000000000001010 sa Polygon chain. Ginagamit din itong pambayad para sa gas. Ang pagma-map sa MATIC token sa PoS bridge ay hahantong sa pagkakaroon ng MATIC ng karagdagang address ng kontrata sa Polygon chain. Makakabangga ito sa kasalukuyang address ng kontrata dahil ang bagong token address na ito ay hindi magagamit sa pagbabayad ng gas at kailangang manatili bilang isang normal na ERC20 token sa Polygon chain. Kaya, para maiwasan ang pagkalito na ito, nagpasya kaming panatilihin lamang ang MATIC sa Plasma.

## Paano ako mag-map ng mga token? {#how-do-i-map-tokens}

Please sa [tutorial na ito] (/docs/develop/ethereum-polygon/submit-mapping-request) o maaari kang dumiretso sa [Token Mapper](https://mapper.polygon.technology/).

## Ano ang gagawin ko kung masyadong matagal ang transaksyon o kung masyadong mataas ang presyo ng gas? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

Nag-iiba ang oras ng transaksyon at presyo ng gas batay sa kasikipan ng network at tinutukoy din ito ng supply at demand sa pagitan ng mga minero ng network.

Ano ang magagawa mo:
- Maging matiyaga ka.
- Dagdagan ang bayad ng gas kung masyadong mabagal ito.
- I-check ang mga bayad bago magpadala ng mga transaksyon. Narito ang isang link para sa gas tracker ng Etherscan: https://etherscan.io/gastracker

Ang hindi mo dapat gawin:
- Pakiusap huwag itakda ang limitasyon ng gas na mababa o maaaring mabigo ang iyong transaksyon.
- Huwag magtangka na kanselahin ang transaksyon. I-check ang mga bayad nang dati.


## Maaari ko bang baguhin ang limitasyon ng gas o ang presyo ng gas? {#can-i-change-the-gas-limit-or-the-gas-price}

Tinatayang at itinatakda ang limitasyon ng gas ng application ayon sa ilang kinakailangan ng function na tinatawag sa kontrata. Hindi ito dapat i-edit. Tanging ang presyo ng gas ang maaaring magbago para madagdagan o bawasan ang mga bayad sa transaksyon.

## Paano pabilisin ang mga transaksyon? {#how-to-speed-up-the-transactions}
Magagawa mo ito sa pamamagitan ng pagtaas ng mga bayad sa gas. Narito ang isang link na nagpapaliwanag kung paano ito gagawin sa Metamask: https://metamask.zendesk.com/hc/en-us/articles/360015489251-Paano-sa-Speed-Up-o-Cancel-a-Pending-Transaction.

## Gaano sapat ang MATIC token para sa bayad ng gas? {#how-much-matic-token-is-enough-for-the-gas-fee}
Kailangan ng mga user na magkaroon ng minimum na 0.01 MATIC sa Polygon mainnet.

## Saan ako magdudulog ng ticket ng suporta? {#where-do-i-raise-a-support-ticket}
Kung kailangan mo ng tulong mula sa aming mga espesyalista, magpadala sa amin ng mensahe sa https://support.polygon.technology/support/home.

## Paano ko i-bridge ang mga asset sa mga chain? {#how-do-i-bridge-assets-across-chains}

Nag-aalok ang Polygon ng isang bridge para ilipat ang mga asset mula sa Ethereum hanggang sa Polygon at vice versa. Marami kang matututunan tungkol dito sa [seksyon]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) ng Bridges ng wiki na ito.

Gayunpaman, kung gumagamit ka ng anumang panlabas na serbisyo na hindi pag-aari ng Polygon, pinapayuhan ka naming mag-abot sa kanilang serbisyo ng customer para humiling ng mga tutorial at tagubilin. Mahalaga ring gumawa ng sarili mong pananaliksik kapag gumagamit ka ng mga serbisyo ng web3.

## Mayroon akong isyu sa pag-withdraw ng token sa OpenSea o anumang iba pang application na gumagamit ng polygon bridge. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

Kung may isyu ka sa iyong withdrawal transaction na suplado, nag-aalok ang Polygon ng withdraw na bridge sa [https://withdraw.polygon.technology](https://withdraw.polygon.technology) para makatulong na maalis ka sa lupa kung mayroon kang iyong burn hash. Gamit ang tool na ito, mabilis kang naka-onboard at malulutas ang isyu. Ang iba pang mga katanungan tungkol sa iyong transaksyon sa OpenSea at ang iba pang dApps ay kailangang hawakan ng application team.

## Na-scam ako. Paano ko kukunin ang aking mga token? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

Sa kasamaang-palad, walang proseso ng pagbawi para sa mga nawalang coin. Hinihiling namin na bago ka gumawa ng transaksyon, nagpatuloy ka para suriin at double-check bago magsimulang at makumpleto ito. Mangyaring tandaan na hindi nakikipag-ugnayan ang Polygon network at ang aming mga opisyal na handle sa anumang giveaway post o token doubling at hindi ka namin lalapit sa ngalan ng organisasyon. Mangyaring huwag pansinin ang lahat ng mga pagtatangka dahil malamang na mga scam ang mga ito. Lahat ng aming komunikasyon ay sa pamamagitan ng aming opisyal na handles.

## May ilang hindi awtorisadong transaksyon sa wallet ko. Na-hack ba ang wallet ko? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

Sa kasamaang palad, hindi maibabalik ng network ang mga hindi gustong transaksyon. Mahalaga palagi na maging maingat sa iyong mga pribadong key at **huwag kailanman ibahagi ang mga ito sa sinuman**.
Kung mayroon ka pa ring natitirang mga pondo, ilipat kaagad ang mga ito sa isang bagong wallet.

## May Goerli ang Ethereum bilang test network nito. May test network ba ang Polygon Network? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

Dahil may Goerli ang Ethereum Network bilang test network nito, may Mumbai ang Polygon. Ang lahat ng mga transaksyon sa pagsubok na network na ito ay mai-index sa Mumbai Explorer.

## Paano ko can ang mga token ko para sa ibang token? {#how-can-i-swap-my-tokens-for-other-tokens}
Please ang video sa ibaba o sundin ang [tutorial na ito](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>Hindi sinusuportahan ng browser mo ang video element.</p>
</video>

## Sobrang bagal ang Token Swap. {#the-token-swap-is-too-slow}

Kung sinusubukan mong magpalit ng mga token at masyadong nagtatagal, maaari mong subukan ang parehong transaksyon sa ibang browser. Kung hindi iyon gumana at nahaharap ka sa isang error, mangyaring magpadala ng screenshot sa aming Support team.

## Sinisingil ng mga token ang mga bayad ng gas para sa swap ng token? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
MATIC lamang.

## Paano ko swap ang aking token para sa gas? {#how-can-i-swap-my-token-for-gas}
Please ang video sa ibaba o sundin ang [tutorial na ito](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>Hindi sinusuportahan ng browser mo ang video element.</p>
</video>

## Aling token ang puwedeng gamitin para mag-swap para sa gas? {#which-tokens-can-be-used-to-swap-for-gas}
Tanging ang mga Token na ito ang sinusuportahan para sa 'Swap for Gas': ETH, USDC, USDT, DAI, AVE, LINK, WBTC, UNI, GHST, TEL, EMON, at COMBO.

## Paano makakuha ng mga token ng ETH {#how-to-get-eth-tokens}
Para makakuha ng mga token ng ETH na pwede mo itong i-trade para sa ibang token o fiat na pera sa isang exchange, bilhin ito sa isang on-ramp (o sa Metamask ) o kahit na magpalit ng iba pang token para sa ETH gamit ang [on swap ng Polygon](https://wallet.polygon.technology/polygon/token-swap).

## Paano ako makakakuha ng mga token ng MATIC upang magbayad para sa mga bayarin sa gas? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

Nagbibigay kami [Gas i-Swap](https://wallet.polygon.technology/gas-swap/) serbisyo na tulong sa iyo doon. Pumili ka ng halaga ng MATIC na kailangan mo para makumpleto ang iyong transaksyon at maaari mo itong ipagpalit para sa iba pang mga token gaya ng Ether o USDT. Mahalagang tandaan na ito ay isang **transaksyon na mas mababa** sa gas.

## Saan ako direktang makakakuha ng mga token ng MATIC? {#where-can-i-get-matic-tokens-directly}

Kaya mabibili ang mga MATIC token mula sa anumang sentralisadong ([Binance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/), et.al) o Decentralized ([Uniswap](https://uniswap.org/), [QuickSwap](https://quickswap.exchange/#/swap)) exchange. Maaari mo ring mag-research at subukan ang ilang on-ramp tulad ng [Transak](https://transak.com/), at [Ramp](https://ramp.network/). Ang layunin ng iyong pagbili ng mga MATIC coin ay dapat ding matukoy kung saan mo ito bibilhin at ang network. advisable magkaroon ng MATIC sa Ethereum mainnet kung ang intensyon mo ay alinman sa pag-stake o delegasyon. Kung may transaksyon ang iyong layunin sa Polygon Mainnet, dapat mong i-hold at you ang MATIC sa Polygon Mainnet.





