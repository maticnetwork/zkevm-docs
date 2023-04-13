---
id: wallet-bridge-faq
title: Portefeuille <>FAQ
description: Créez votre prochaine application de blockchain sur Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Où puis-je utiliser le Wallet Web Polygon? {#where-can-i-use-the-polygon-web-wallet}
Voici l'URL de la suite Wallet Polygon: https://wallet.polygon.technology/ La suite Wallet Polygon est une collection d'applications Web3 fournies par Polygon. Il se compose du [portefeuille Polygon](https://wallet.polygon.technology/polygon/assets) (un portefeuille décentralisé), du pont [Polygon](https://wallet.polygon.technology/polygon/bridge/deposit) (un pont L1-L2), du [prises](https://staking.polygon.technology/) Polygon (un environnement pour le piquage et la délégation des jetons MATIC) et du [pont sûr](https://safe-bridge.polygon.technology/safe) Polygon (un pont multisig).

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## Quels portefeuilles sont actuellement pris en charge ? {#which-wallets-are-currently-supported}

Metamask, Coinbase, Bitski Wallet, Venly et WalletConnect sont les portefeuilles actuellement pris en charge.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## Que puis-je faire avec mon portefeuille Polygone ? {#what-can-i-do-with-my-polygon-wallet}

- Envoyez des fonds vers n'importe quel compte sur Polygon.
- Déposez des fonds depuis Ethereum vers Polygon (en utilisant le pont).
- Retirer des fonds vers Ethereum à partir de Polygon (en utilisant également le pont).

## Mon portefeuille MetaMask ne se connecte pas au portefeuille Polygon {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

Il y a plusieurs raisons pour lesquelles cela peut se produire. Nous vous suggérons de **tester une autre fois**, **d'utiliser un autre navigateur** ou, si l'un de ces éléments n'aide pas, **[contactez notre équipe de support](https://support.polygon.technology/support/home)**.

## Comment puis-je déposer des fonds d'Ethereum à Polygon à l'aide de Polygon Wallet Suite. {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
Veuillez regarder la vidéo ci-dessous ou suivre [ce tutoriel](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>Votre navigateur n'est pas compatible avec l'élément vidéo.</p>
</video>

## Comment puis-je retirer des fonds de Polygon vers Ethereum via le pont PoS à l'aide de Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
Veuillez regarder la vidéo ci-dessous ou suivre [ce tutoriel](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>Votre navigateur n'est pas compatible avec l'élément vidéo.</p>
</video>

## Comment puis-je retirer des fonds de Polygon vers Ethereum via le pont Plasma à l'aide de Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
Veuillez regarder la vidéo ci-dessous ou suivre [ce tutoriel](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>Votre navigateur n'est pas compatible avec l'élément vidéo.</p>
</video>

## Comment ajouter un jeton nouveau ou personnalisé à la liste des jetons Polygon Wallet? {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
Veuillez suivre [ce tutoriel.](/docs/faq/adding-a-custom-token)

## Comment trouver le contrat de jetons ? {#how-do-i-find-the-token-contract}

L'adresse du contrat de jeton sera requise lorsque vous essayez d'ajouter un jeton nouveau ou personnalisé. Vous pouvez rechercher le jeton par son nom sur Coingecko ou CoinMarketCap où vous pourrez voir son adresse sur la chaîne Ethereum (pour les jetons ERC20) et d'autres blockchains pris en charge comme Polygon. L'adresse du jeton sur d'autres chaînes peut ne pas être mise à jour, mais vous pouvez certainement utiliser l'adresse du root à toutes fins utiles.

## J'ai déposé mes fonds, mais je ne le vois pas sur Metamask. Que dois-je faire ? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

Vous devez ajouter manuellement l'adresse jeton personnalisée à Metamask.

Ouvrez Metamask et descendez pour cliquer sur **Importer des jetons**.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

Ensuite, ajoutez l'adresse du contrat, le symbole et la précision décimale pertinentes. Les adresses des contrats (PoS-WETH dans ce cas) sont disponibles sur ce lien : [https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/](https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/). Vous devrez ajouter l'adresse du jeton enfant pour consulter les soldes sur le réseau principal de Polygon. Le décimal de précision est de 18 pour WETH (pour la plupart des jetons, le décimal de précision est de 18).

## Comment ajouter Polygon Mainnet sur Metamask? {#how-can-i-add-polygon-mainnet-on-metamask}

Vérifiez [ce tutoriel](/docs/develop/metamask/config-polygon-on-metamask).

## Mon jeton n'est pas visible dans la liste. À qui dois-je m'adresser ? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Contactez l'équipe de Polygon sur Discord ou Telegram et obtenez la liste de vos jetons. Avant cela, assurez-vous que votre jeton est mappé. Si elle n'est pas cartographiée, veuillez augmenter une demande à [https://mapper.polygon.technology/](https://mapper.polygon.technology/).

## Puis-je annuler ma transaction après l'arrivée du point de contrôle? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
Une fois que la transaction de retrait est initiée sur le Polygon Mainnet, il ne peut pas être annulé ou reversé. Dans les transactions de retrait, les jetons sont brûlés à partir du Principal Polygon et exécutés sur le Mainnet Ethereum. Par conséquent, les jetons une fois brûlés à partir de la chaîne Polygon ne peuvent pas être retournés à votre portefeuille.

## Les frais de gaz sont trop élevés, puis-je annuler ma transaction? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

Malheureusement, nous ne pouvons pas annuler la transaction de retrait une fois que les jetons sont brûlés à partir du Mainnet Polygon. Autrement dit, il est impossible d'annuler une transaction une fois qu'elle est lancée. Les frais de gaz n'est pas contrôlés par le Polygon. Il est totalement dépendant de la congestion réseau et du nombre de transactions dans un bloc particulier sur le Mainnet Ethereum. Si vous pensez ne pas pouvoir vous permettre de payer les frais de gaz actuels, vous pouvez attendre et essayer de procéder à votre transaction plus tard lorsque les frais de gaz se trouvent sur le côté inférieur. Vous pouvez également surveiller les frais de gaz sur le réseau principal Ethereum à partir d'ici: https://etherscan.io/gastracker


## Puis-je envoyer mes jetons Polygon vers d'autres portefeuilles ou plateforme d'échange ? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Vous ne pouvez pas envoyer directement des jetons depuis l'interface utilisateur Polygon vers des exchanges/wallets. Vous devez d'abord effectuer un retrait de Polygon vers Ethereum, puis l'envoyer à l'adresse de votre plateforme d'échange (à moins que votre plateforme d'échange ou votre portefeuille ne prenne explicitement en charge le réseau).

## J'ai fait l'erreur d'envoyer des fonds à un échange / portefeuille directement. Pouvez-vous m'aider ? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

Malheureusement, nous ne pouvons pas vous aider dans de tels cas. Veuillez ne pas envoyer de fonds directement à des plateformes d'échange qui ne prennent en charge que l'Ethereum, vous devez d'abord effectuer un retrait de Polygon vers l'Ethereum, puis l'envoyer à votre adresse de plateforme d'échange.

## J'ai effectué un transfert à la mauvaise adresse. Comment puis-je récupérer les fonds ? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

Hélas, rien ne peut être fait. Seul le propriétaire des clés privées à cette adresse particulière peut déplacer ces actifs. Il est toujours conseillé de confirmer si l'adresse que vous envoyez des jetons est la bonne.

## Ma transaction est en attente depuis trop longtemps, que puis-je faire? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
La transaction peut être abandonnée pour les raisons suivantes:

1. Configuration d'un prix au gaz bas lors de la présentation de la transaction.
2. Une forte hausse du prix du gaz due à la congestion sur le réseau Ethereum Mainnet.
3. La transaction est annulée par vous depuis votre portefeuille ou remplacée par une nouvelle transaction.

Vous pouvez procéder aux transactions supprimées des façons suivantes:

1. Si votre transaction est bloquée pendant plus d'une heure, un bouton **Essayez à nouveau** sera affiché. Vous pouvez cliquer sur le bouton **Essayez à nouveau** pour compléter la même transaction. Vous pouvez vous référer à cette vidéo pour plus d'informations sur la façon d'utiliser la fonctionnalité **Essayez à** nouveau.
2. Veuillez vérifier votre portefeuille MetaMask aussi parce que parfois les transactions peuvent être abandonnées en raison de transactions mises en file d'attente dans le Metamask. Dans ce cas, effacez les transactions mises en file d'attente ou réinstallez MetaMask dans le même navigateur.
3. Vous pouvez installer MetaMask dans un navigateur alternatif, puis essayer de compléter la transaction en utilisant Polygon Wallet Suite.
4. Vous pouvez également utiliser ce lien pour compléter la transaction de retrait en attente. Collez le hachage de transaction dans l'option de recherche et cliquez sur le bouton **Confirmer la sortie** pour compléter la transaction.

## Que dois-je faire si le dépôt est confirmé, mais que le solde n'est pas mis à jour ? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

Il faut 22-30 minutes pour que la transaction de dépôt soit terminée. Veuillez attendre un certain temps et cliquez sur **Refresh Balance**.

## Que dois-je faire si le point de contrôle ne se produit pas ? {#what-should-i-do-if-the-checkpoint-is-not-happening}

Les points de contrôle prennent parfois plus de 45 minutes à 1 heure en fonction de la congestion réseau sur Ethereum. Nous vous suggérons d'attendre un certain temps avant de relever un ticket.

## Ma transaction est bloquée. {#my-transaction-is-stuck}

Nous avons répertorié certaines erreurs communes auxquelles les utilisateurs pourraient faire face. Vous pouvez trouver la solution sous l'image de l'erreur. Si une autre erreur s'affiche, veuillez [créer un ticket de soutien](https://support.polygon.technology/support/home) pour que notre équipe puisse résoudre le problème.

  - ### Erreurs communes {#common-errors}
a. Retrait bloqué lors de la phase initialisée.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

  b. Erreur RPC

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>   

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/develop/network-details/network#matic-mainnet) for more information.

  c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

  Il s'agit généralement d'une erreur ponctuelle qui se résout automatiquement. Si vous recevez toujours la même erreur en recommençant l'étape, [créez un ticket de soutien](https://support.polygon.technology/) avec toutes les informations nécessaires pour résoudre le problème.


## Une erreur de solde insuffisant s'affiche. {#i-m-shown-an-insufficient-balance-error}

Les retraits et les dépôts sur le réseau Polygon sont bon marché. Ce qu'il faut comprendre, c'est que l'erreur de solde insuffisant peut être résolue en obtenant un solde ETH sur le réseau principal Ethereum. Cela élimine généralement le problème d'un solde insuffisant. Si il s'agit d'une transaction sur le Polygon Mainnet, nous vous demanderons d'avoir suffisamment de jetons MATIC.

## Mes transactions ne sont pas visibles dans l'explorateur. Que dois-je faire ? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

Il s'agit probablement d'un problème d'indexation avec Polygonscan. Veuillez contacter [l'équipe de support](https://support.polygon.technology/support/home) pour plus de clarifications.

## J'ai effectué un dépôt sur Ethereum mais il est toujours en attente. Que dois-je faire ? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

Le gaz fourni est probablement trop faible. Vous devriez attendre un peu et recommencer la transaction si elle n'est pas minée. Si vous avez besoin d'aide supplémentaire, veuillez contacter l'[équipe de soutien](https://support.polygon.technology/support/home) en indiquant l'adresse de votre portefeuille, les hachages de transaction (le cas échéant) et les captures d'écran pertinentes.

## Je n'obtiens pas de hachage de transaction et mes dépôts ne sont pas transférés. Que se passe-t-il ? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

Vous avez probablement des transactions antérieures en attente, veuillez les annuler ou les accélérer d'abord. Les transactions dans Ethereum ne sont possibles que l'une après l'autre.

## Cela montre que Polygon ne prélève aucun montant pour un retrait, mais que nous devons payer pendant la transaction. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Une transaction de retrait avec le pont Plasma est divisée en 3 étapes, une qui se déroule sur le réseau principal de Polygon et deux étapes qui doivent être complétées sur le réseau principal Ethereum. Sur le pont de la PoS, la transaction de retrait se déroule en deux étapes : la gravure du jeton sur le réseau Polygon et l'envoi de la preuve sur le réseau Ethereum. Dans tous les cas, le brûlage des jetons qui se fait sur le réseau principal de Polygon aura un coût très minime. Les étapes restantes, qui se déroulent sur le réseau principal d'Ethereum, devront être payées en ETH en fonction du prix actuel du gaz, qui peut être vérifié [ici](https://ethgasstation.info/).

## J'ai essayé d'effectuer un dépôt, mais la transaction s'est arrêtée à l'étape d'approbation. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

Si la transaction est encore à l'étape **Approuver**, elle n'est pas encore terminée. Pour la terminer, vous devez payer les frais de gaz et le processus se déroulera comme prévu.

## Le portefeuille Polygon affiche le message d'erreur « User denied transaction signature ». {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

Cela se produit généralement parce que l'utilisateur a annulé ou refusé de signer une transaction via MetaMask. Lorsque vous êtes invité par le portefeuille MetaMask, procédez à la signature de la transaction en cliquant sur **Approuver** et non sur **Annuler**.

## La transaction est réussie, mais elle affiche en attente. {#the-transaction-is-successful-but-it-shows-pending}

Si votre transaction est terminée et que vous avez reçu vos fonds, mais que la transaction apparaît toujours en attente sur l'IU, vous pouvez augmenter un ticket d'assistance en envoyant des détails et des captures d'écran pertinents.

## Quelle est la liste des échanges pris en charge sur Polygon? {#what-is-the-list-of-supported-exchanges-on-polygon}

La pièce MATIC peut être échangée dans de nombreux échanges. Cependant, il est toujours important de faire vos propres recherches lorsque vous choisissez un à échanger. Il n'est pas rare que certains échanges continuent à apporter des modifications à leurs jetons disponibles actuels et aient également des périodes de maintenance.

Vous pourriez visiter [Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) pour une liste d'échanges où vous pourriez trouver MATIC.

## Polygon prend-il en charge les portefeuilles matériels ? {#does-polygon-support-hardware-wallets}

Oui, nous prenons en charge les portefeuilles matériels suivants :
1. Trezor
2. Ledger

Les utilisateurs peuvent connecter leur option portefeuille matériel sur MetaMask et procéder à leur transaction. Voici le lien pour connecter le portefeuille matériel sur Metamask: https://metamask.zendesk.com/hc/en-us/articles/4408552261275

## Pourquoi le jeton MATIC n'est-il pas pris en charge sur PoS? {#why-isn-t-the-matic-token-supported-on-pos}

MATIC est le jeton natif de Polygon et son adresse de contrat est 0x000000000000000000000000000000001010 sur la chaîne Polygon. Il est également utilisé pour payer le gaz. Le mappage du jeton MATIC sur le pont de la PoS fera que MATIC aura une adresse de contrat supplémentaire sur la chaîne Polygon. Cela entrera en collision avec l'adresse du contrat existant, car cette nouvelle adresse de jeton ne pourra pas être utilisée pour payer le gaz et devra rester un jeton ERC20 normal sur la chaîne Polygon. Par conséquent, pour éviter cette confusion, nous avons décidé de conserver MATIC uniquement sur Plasma.

## Comment puis-je mapper des jetons ? {#how-do-i-map-tokens}

Veuillez vous référer à [ce tutoriel] (/docs/develop/ethereum-polygon/submit-mapping-request) ou vous pouvez aller directement au [Mapper jeton](https://mapper.polygon.technology/).

## Que dois-je faire si la transaction prend trop de temps ou si le prix du gaz est trop élevé ? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

Le temps de transaction et le prix au gaz varient en fonction de la congestion du réseau et est également déterminé par l'offre et la demande entre les mineurs du réseau.

Ce que vous pourriez faire:
- Soyez patient.
- Augmentez les frais de gaz s'il est trop lent.
- Vérifiez les frais avant d'envoyer des transactions. Voici un lien pour le tracker gaz Etherscan: https://etherscan.io/gastracker

Ce que vous ne devriez pas faire:
- Veuillez ne pas définir la limite de gaz basse ou votre transaction pourrait échouer.
- N'essayez pas d'annuler la transaction. Vérifiez les frais préalablement .


## Puis-je modifier la limite ou le prix du gaz ? {#can-i-change-the-gas-limit-or-the-gas-price}

La limite de gaz est estimée et définie par l'application selon certaines exigences de la fonction appelée dans le contrat. Celle-ci ne doit pas être modifiée. Seul le prix du gaz peut être modifié afin d'augmenter ou de diminuer les frais de transaction.

## Comment accélérer les transactions? {#how-to-speed-up-the-transactions}
Vous pouvez le faire en augmentant les frais de gaz. Voici un lien expliquant comment le faire sur Metamask: https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-ou-Cancel-a-pending-Transaction.

## Combien de jeton MATIC est suffisant pour les frais de gaz? {#how-much-matic-token-is-enough-for-the-gas-fee}
Les utilisateurs doivent avoir un minimum de 0,01 MATIC dans le réseau principal Polygon.

## Où puis-je créer un ticket de soutien ? {#where-do-i-raise-a-support-ticket}
Si vous avez besoin d'aide de nos spécialistes, envoyez-nous un message à https://support.polygon.technology/support/home.

## Comment faire le lien entre les actifs à travers les chaînes ? {#how-do-i-bridge-assets-across-chains}

Polygon offre un pont pour déplacer des actifs d'Ethereum vers Polygon et vice versa. Vous pouvez en apprendre plus sur la [section Ponts]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) de ce wiki.

Toutefois, si vous utilisez un service externe qui n'est pas la propriété de Polygon, nous vous conseillons de contacter leur service à la clientèle pour demander des tutoriels et des instructions. Il est également important de faire votre propre recherche lorsque vous utilisez les services web3.

## J'ai un problème de retrait de jeton avec OpenSea ou toute autre application qui utilise le pont Polygon. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

Si vous avez un problème avec que votre transaction de retrait est bloquée, Polygon propose le pont de retrait avec [https://withdraw.polygon.technology](https://withdraw.polygon.technology) pour vous aider à sortir du sol si vous avez votre hasch de gravure. Grâce à cet outil, vous êtes rapidement intégré et le problème est résolu. D'autres questions concernant votre transaction avec OpenSea et d'autres dApps devront être traitées par l'équipe d'application.

## Je me suis fais escroquer. Comment vais-je récupérer mes jetons ? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

Malheureusement, il n'existe aucun processus de récupération des sommes perdues. Nous vous demandons de vérifier et de double-vérifier avant de commencer et de compléter la transaction. Veuillez noter que le réseau Polygon et nos poignées officielles ne s'engagent pas dans aucun message de cadeaux ou doublant de jetons et nous n'allons jamais vous aborder au nom de l'organisation. Veuillez ignorer toutes les tentatives, car il s'agit très probablement d'escroqueries. Toutes nos communications se font via nos poignées officielles.

## Des transactions non autorisées ont été effectuées avec mon portefeuille. Mon portefeuille a-t-il été piraté ? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

Malheureusement, le réseau ne peut pas annuler les transactions non désirées.
 Il est toujours important d'être prudent avec vos clés privées et de ne **jamais les partager avec qui que ce soit**.
 S'il vous reste encore des fonds, transférez-les immédiatement vers un nouveau portefeuille.

## Ethereum a Goerli comme réseau de test. Polygon Network dispose-t-il également d'un réseau de test ? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

Comme le réseau Ethereum a Goerli comme réseau de test, le Mainnet Polygon a Mumbai. Toutes les transactions sur ce réseau de test seront indexées sur l'explorateur Mumbai.

## Comment échanger mes jetons contre d'autres jetons? {#how-can-i-swap-my-tokens-for-other-tokens}
Veuillez regarder la vidéo ci-dessous ou suivre [ce tutoriel](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>Votre navigateur n'est pas compatible avec l'élément vidéo.</p>
</video>

## Le Token Swap est trop lent. {#the-token-swap-is-too-slow}

Si vous essayez d'échanger des jetons et que cela prend trop de temps, vous pouvez essayer d'effectuer la même transaction sur un autre navigateur. Si cela ne fonctionne pas et que vous rencontrez une erreur, veuillez envoyer une capture d'écran à notre équipe de soutien.

## Quels jetons sont facturés comme frais de gaz pour le swap de jetons? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
Seulement MATIC.

## Comment changer mon jeton contre du gaz? {#how-can-i-swap-my-token-for-gas}
Veuillez regarder la vidéo ci-dessous ou suivre [ce tutoriel](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>Votre navigateur n'est pas compatible avec l'élément vidéo.</p>
</video>

## Quels jetons peuvent être utilisés pour échanger du gaz ? {#which-tokens-can-be-used-to-swap-for-gas}
Seuls ces jetons sont pris en charge pour ‘Swap for Gas’: ETH, USDC, USDT, DAI, AAVE, LINK, WBTC, UNI, GHST, TEL, EMON et COMBO.

## Comment obtenir des jetons ETH? {#how-to-get-eth-tokens}
Pour acquérir des jetons ETH, vous pouvez les échanger contre un autre jeton ou fiat d'argent sur un échange, les acheter sur une rampe (ou sur Metamask) ou même échanger d'autres jetons pour ETH en utilisant [la fonctionnalité de swap de jetons Polygon](https://wallet.polygon.technology/polygon/token-swap).

## Comment puis-je obtenir des jetons MATIC pour payer les frais de gaz ? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

Nous proposons un service d'[échange de gaz](https://wallet.polygon.technology/gas-swap/) qui vous permettra d'y parvenir. Vous choisissez un montant de MATIC dont vous avez besoin pour effectuer votre transaction et vous pouvez l'échanger contre d'autres jetons tels qu’Ether ou USDT. À noter qu'il s'agit d'une **transaction sans gaz**.

## Où puis-je obtenir directement des jetons MATIC ? {#where-can-i-get-matic-tokens-directly}

Ainsi, les jetons MATIC peuvent être achetés à partir de n'importe quel échange centralisé ([Binance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/), et.al) ou décentralisé ([Uniswap](https://uniswap.org/), [QuickSwap](https://quickswap.exchange/#/swap)). Vous pouvez également effectuer des recherches et essayer certaines rampes sur comme [Transak](https://transak.com/) et [Ramp](https://ramp.network/). L'objectif de votre achat de pièces MATIC doit également déterminer l'endroit où vous les achèterez et le réseau. Il est conseillé d'avoir MATIC sur le réseau principal Ethereum si votre intention est soit staking ou délégation. Si votre intention est une transaction sur le Polygon Mainnet, vous devez tenir et effectuer des transactions avec MATIC sur le Polygon Mainnet.





