---
id: delegator-faq
title: FAQ du délégant
sidebar_label: Delegator FAQ
description: FAQ relatives à la délégation sur le réseau Polygon
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### Qu'est-ce que l'URL du tableau de bord de staking ? {#what-is-the-staking-dashboard-url}

L'URL du tableau de bord staking est https://staking.polygon.technology/.

### Quel est le montant minimum de la mise ? {#what-is-the-minimum-stake-amount}

Il n'y a pas de montant de mise minimum à déléguer. Cependant, vous pouvez toujours commencer avec 1 jeton MATIC.

### Combien de récompenses vais-je obtenir si je délègue ? {#how-many-rewards-will-i-get-if-i-delegate}

Veuillez utiliser la [Calculatrice des récompenses Staking](https://staking.polygon.technology/rewards-calculator) pour déterminer vos estimations.

### Pourquoi ma transaction prend-elle autant de temps ? {#why-does-my-transaction-take-so-long}

Toutes les transactions de staking de Polygon s'effectuent sur Ethereum pour des raisons de sécurité.

Le temps nécessaire pour effectuer une transaction dépend des frais de gaz que vous avez autorisés ainsi que de l'encombrement du réseau principal d'Ethereum à ce moment-là. Vous pouvez toujours utiliser l'option « Speed Up » pour augmenter les frais de gaz afin que votre transaction puisse être achevée bientôt.

### Quels portefeuilles sont actuellement pris en charge ? {#which-wallets-are-currently-supported}

Actuellement, seule l'extension Metamask sur le navigateur de bureau et le portefeuille Coinbase sont pris en charge. De plus, vous pouvez utiliser WalletConnect et Walletlink à partir de portefeuilles mobiles pris en charge pour interagir avec le tableau de bord Staking UI sur le bureau / ordinateur portable. Nous ajouterons bientôt un support pour d'autres portefeuilles.

### Les portefeuilles matériels sont-ils pris en charge ? {#are-hardware-wallets-supported}

Oui, les portefeuilles matériels sont pris en charge. Vous pouvez utiliser l'option « Connecter le portefeuille matériel » sur Metamask et connecter votre portefeuille matériel, puis continuer le processus de délégation.

### Pourquoi ne puis-je pas staker directement à partir Binance ? {#why-can-t-i-stake-directly-from-binance}

Le staking via Binance n'est pas encore pris en charge. Une annonce sera faite pour indiquer si et quand Binance commencera à prendre en charge cette fonctionnalité.

### J'ai terminé ma délégation, où puis-je consulter les informations ? {#i-have-completed-my-delegation-where-can-i-check-details}

Une fois que vous avez terminé votre délégation, attendez 12 confirmations de blocs sur Ethereum (env. 3-5 minutes), puis sur le Tableau de bord, vous pouvez cliquer sur **Mon compte**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Où puis-je consulter mes récompenses ? {#where-can-i-check-my-rewards}

Sur le Tableau de bord, vous pouvez cliquer sur l'option **Mon compte** sur le côté gauche.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Ai-je besoin d'ETH pour payer les frais de gaz ? {#do-i-need-eth-to-pay-for-gas-fees}

Oui. Vous devriez prévoir entre 0,05 et 0,1 ETH pour être sûr.

### Dois-je déposer des jetons Matic sur le réseau principal de Polygon pour le staking ? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

Non, tous vos fonds doivent être sur le réseau principal Ethereum.

### Lorsque j'essaie d'effectuer la transaction, le bouton Confirmer est désactivé. Pourquoi ? {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

Veuillez vérifier si vous avez assez d'ETH pour les frais de gaz.

### Quand la récompense est-elle distribuée ? {#when-does-reward-get-distributed}

Les récompenses sont distribuées chaque fois qu'un point de contrôle est soumis.

Actuellement, les jetons MATIC 20188 sont distribués proportionnellement sur chaque soumission de point de contrôle réussi à chaque délégateur sur la base de leur participation par rapport au pool global de tous les validateurs et délégateurs. En outre, le pourcentage de la récompense distribuée à chaque délégant variera avec chaque point de contrôle en fonction de la mise relative du délégant, du validateur et du staking global.

(Notez qu'un bonus de proposition de 10 % revient au validateur qui place le point de contrôle, mais à terme, l'effet du bonus supplémentaire est annulé sur plusieurs points de contrôle par différents validateurs.)

L'ajout de points de contrôle est effectué par l'un des validateurs toutes les 34 minutes environ. Cette durée est approximative et peut varier en fonction du consensus du validateur sur la couche Polygon Heimdall. Cela peut également varier en fonction du réseau Ethereum. Une congestion plus importante dans le réseau peut entraîner des retards des points de contrôle.

Vous pouvez suivre les points de contrôle sur le contrat de staking [ici](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287)

### Pourquoi la récompense diminue-t-elle à chaque point de contrôle ? {#why-does-reward-keep-getting-decreased-every-checkpoint}

Les récompenses réelles gagnées dépendront de l'approvisionnement verrouillé total réel dans le réseau à chaque point de contrôle. On s'attend à une variation significative au fur et à mesure que les jetons MATIC sont verrouillés dans les contrats de staking.

Les récompenses seront plus élevées, pour commencer, et continueront à diminuer à mesure que le % d'approvisionnement verrouillé augmentera. Ce changement dans l'approvisionnement verrouillé est capturé à chaque point de contrôle, et les récompenses sont calculées sur cette base.

### Comment puis-je réclamer mes récompenses ? {#how-can-i-claim-my-rewards}

Vous pouvez réclamer vos récompenses instantanément en cliquant sur le bouton **Retirer la** récompense. Cette opération permettra de transférer les récompenses accumulées sur votre compte délégué sur Metamask.

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### Qu'est-ce que la période d'unbonding ? {#what-is-the-unbonding-period}

Actuellement, la période d'unbonding sur Polygon est d'environ 9 jours. Auparavant, elle était de 19 jours. Cette période s'applique au montant délégué initialement et aux montants re-delegated - elle ne s'applique pas aux récompenses qui n'ont pas été re-delegated.

### Vais-je continuer à recevoir des récompenses après verrouillage ? {#will-i-keep-receiving-rewards-after-i-unbond}

Non. Une fois que vous êtes libéré, vous cesserez de recevoir des récompenses.

### Combien de transactions sont nécessaires pour la délégation ? {#how-many-transactions-does-the-delegation-require}

La délégation nécessite 2 transactions, l'une après l'autre. L'un pour **approuver** la demande et l'autre pour **dépôt**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### Que signifie « redéléguer » les récompenses ? {#what-does-redelegate-rewards-mean}

Redelegating vos récompenses signifie simplement que vous voulez augmenter votre participation en reprenant les récompenses que vous avez accumulées.

### Puis-je miser sur n'importe quel validateur ? {#can-i-stake-to-any-validator}

Oui. Tous les validateurs sont actuellement des nœuds de la Fondation Polygon.

Nous procédons à un déploiement progressif du réseau principal de Polygon. Par la suite, les validateurs externes seront intégrés progressivement. Veuillez consulter la page https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/ pour plus de détails.

### Quel navigateur est compatible avec le tableau de bord de staking ? {#which-browser-is-compatible-with-staking-dashboard}

Chrome, Firefox et Brave

### Mon Metamask s'est bloqué au moment de la confirmation de la connexion, que dois-je faire ? Rien ne se produit lorsque j'essaie de me connecter. {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

Vérifiez les éléments suivants :

- Si vous utilisez Brave, veuillez désactiver l'option **Utiliser** des portefeuilles cryptographiques dans le panneau des paramètres.
- Vérifiez si vous êtes connecté à Metamask.
- Vérifiez si vous êtes connecté à Metamask avec Trezor/Ledger. Vous devez également activer l'autorisation d'appeler des contrats sur votre appareil Ledger, si elle n'est pas déjà activée.
- Vérifiez l'horodatage de votre système. Si l'heure système n'est pas correcte, vous devrez la corriger.

### Comment puis-je envoyer des fonds de Binance ou d'autres plateformes vers le portefeuille Polygon ? {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

Techniquement, l'interface Polygon Wallet Suite/Staking n'est qu'une application web. Actuellement, il prend en charge les portefeuilles suivants - Metamask, WalletConnect, et WalletLink.

Premièrement, vous devez retirer vos fonds de Binance ou tout autre échange vers votre adresse Ethereum sur Metamask. Si vous ne savez pas comment utiliser Metamask, recherchez sur Internet. Vous trouverez beaucoup de vidéos et de blogs qui expliquent comment commencer.

### Quand puis-je devenir validateur et combien de jetons dois-je pour cela? {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

Un utilisateur peut gagner une place de validateur uniquement si les conditions suivantes s'appliquent :
1. Lorsqu'un validateur décide de se désengager du réseau, ou
2. Attendez le mécanisme d'enchères et remplacez le validateur inactif.

La mise minimale dépend du processus d'enchères dans lequel un utilisateur surenchérit un autre.

### Si j'ai gagné des récompenses en déléguant, et si j'ajoute des fonds supplémentaires au même nœud validateur, que se passe-t-il ? {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

Si vous n'avez pas redélégué vos récompenses avant de déléguer des fonds supplémentaires au même nœud validateur, vos récompenses seront retirées automatiquement.

Si vous ne voulez pas que cela se produise, redéléguez vos récompenses avant de déléguer des fonds supplémentaires.

### J'ai délégué mes jetons via Metamask sur le tableau de bord de staking. Dois-je garder mon système ou mon appareil allumé ? {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

Non. Une fois que vos transactions de délégation sont confirmées et que vous pouvez voir vos jetons reflétés dans les sections **Total Stake** et **New Reward**, vous avez terminé. Vous n'avez pas besoin de garder votre système ou votre appareil allumé.

### Je n'ai pas de liens ; combien de temps faudra-t-il à Unbond? {#i-have-unbonded-how-long-will-it-take-to-unbond}

La période d'unbonding est actuellement fixée à 82 points de contrôle. Cela correspond à environ 9 jours. Chaque point de contrôle prend environ 34 minutes. Cependant, certains points de contrôle peuvent être retardés jusqu'à environ 1 heure en raison de la congestion sur Ethereum.

### Je n'ai pas de lien et je vois maintenant le bouton Claim Stake bouton, mais il est désactivé, pourquoi est-ce ? {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

Le bouton Réclamer la mise ne sera activé que lorsque votre période d'unbonding sera terminée. La période d'unbonding est actuellement fixée à 82 points de contrôle.

### Est-ce que je peux savoir quand le bouton Réclamer la mise sera activé ? {#do-i-know-when-will-the-claim-stake-button-be-enabled}

Oui, sous le bouton Réclamer la mise, vous verrez apparaître une note sur le nombre de points de contrôle en attente avant que le bouton Réclamer la mise ne soit activé. Chaque point de contrôle prend environ 30 minutes. Cependant, certains points de contrôle peuvent être retardés jusqu'à environ 1 heure en raison de la congestion sur Ethereum.

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### Comment changer ma délégation des nœuds de la Fondation à des nœuds externes ? {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

Vous pouvez changer de délégation à l'aide de l'option **Déplacer la mise** sur l'interface de staking. La délégation passera alors du nœud de la Fondation à tout autre nœud externe de votre choix.

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

Vous verrez une liste d'autres validateurs:

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### Y aura-t-il une période d'unbonding lorsque je passerai des nœuds de la Fondation à des nœuds externes ? {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

Il n'y aura pas de période d'unbonding lorsque vous passerez des nœuds de la Fondation à des nœuds externes. Ce sera une transition directe sans aucun retard. Cependant, si vous effectuez un unbonding à partir d'un nœud de la Fondation ou d'un nœud externe, il y aura une période d'unbonding.

### Y a-t-il des spécificités pour choisir un nœud externe lors du changement de délégation ? {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

Non. Vous pouvez choisir le nœud de votre choix.

### Qu'advient-il de mes récompenses accumulées si ma délégation passe d'un nœud de la Fondation à un nœud externe ? {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

Si vous n'avez pas encore réclamé vos récompenses avant de changer de délégation, lors du passage réussi de votre délégation d'un nœud de la Fondation à un nœud externe, les récompenses accumulées jusqu'alors seront transférées à votre compte.

### La délégation à des nœuds externes fonctionnera-t-elle de la même manière que les nœuds de la Fondation ? {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

Oui, cela fonctionnera comme les nœuds Fondation.

### Est-ce que je recevrai toujours des récompenses après la délégation à un nœud externe ? {#will-i-still-get-rewards-after-delegating-to-an-external-node}

Oui, les récompenses seront distribuées de la même manière que précédemment avec les nœuds de la Fondation. Chaque ajout réussi d'un point de contrôle donnera lieu à des récompenses. Les récompenses seront distribuées et calculées à chaque point de contrôle par rapport au ratio de mise, comme c'est le cas actuellement.

### Y aura-t-il une période d'unbonding si j'effectue un unbonding à partir d'un nœud externe ? {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

Oui, la période d'unbonding restera la même que celle en vigueur actuellement. 82 points de contrôle.

### Y aura-t-il une période de verrouillage après avoir fait passer ma délégation d'un nœud de la Fondation à un nœud externe ? {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

Non, il n'y aura pas de période de verrouillage après que vous ayez changé de délégation.

### Puis-je changer partiellement ma délégation des nœuds de la Fondation à des nœuds externes ? {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

Oui, vous aurez la possibilité de déplacer partiellement votre mise du nœud de la Fondation vers un nœud externe. La mise partielle restante restera sur le nœud de la Fondation. Vous pouvez ensuite le déplacer vers un autre nœud de votre choix ou vers le même nœud.

### Puis-je changer de délégation d'un nœud externe à un autre nœud externe ? {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

Non, l'option **Déplacer la mise** est uniquement disponible sur les nœuds de la Fondation. Si vous souhaitez changer votre délégation d'un nœud externe à un autre nœud externe, vous devrez d'abord effectuer un unbonding puis déléguer à un autre nœud externe.

### Quand le nœud de la Fondation sera-t-il désactivé ? {#when-will-the-foundations-node-be-turned-off}

Les nœuds de fondation seront éteints d'ici la fin de janvier 2021.

### Y aura-t-il des nœuds de la Fondation à l'avenir ? {#will-there-be-any-foundation-nodes-in-the-future}

Non, il n'y aura pas de nœuds de la Fondation à l'avenir.

### Combien de transactions dois-je payer pour du gaz lorsque je choisis de déplacer la mise ? {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

Le déplacement de la mise est une transaction unique. Toutes les transactions sont sur la Blockchain Ethereum : vous devez seulement dépenser un peu d'ETH pour une transaction de déplacement de mise.
