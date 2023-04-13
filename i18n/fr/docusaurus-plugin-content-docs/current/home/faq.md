---
id: faq
title: FAQ
description: FAQs liés à Polygon
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Questions fréquemment posées {#frequently-asked-questions}

## Qu'est-ce que Polygon ? {#what-is-polygon}

Polygon est une solution d'échelle pour les chaînes blockchain publiques, en particulier Ethereum. Polygon fournit une évolutivité tout en assurant une expérience utilisateur supérieure de manière sécurisée et décentralisée. Il a une implémentation opérationnelle pour Ethereum sur Kovan Testnet. Polygon entend soutenir d'autres blockchains à l'avenir, ce qui nous permettra de fournir des fonctionnalités d'interopérabilité tout en offrant une évolutivité aux réseaux blockchain publics existants.

## En quoi Polygon est-elle différente des autres implémentations de Plasma ? {#how-is-polygon-different-from-other-implementations-of-plasma}

La mise en œuvre de Plasma par Polygon est construite sur des chaînes latérales basées sur l'état qui fonctionnent sur EVM, tandis que les autres implémentations de Plasma utilisent principalement UTXOs qui les restreignent à être spécifiques au paiement. Avoir des chaînes latérales basées sur l'état permet à Polygon de fournir également une évolutivité pour les contrats intelligents génériques.

Deuxièmement, Polygon utilise une couche de pointage publique qui publie des points de contrôle après des intervalles périodiques (contrairement aux points de contrôle après chaque bloc dans Plasma Cash) permettant aux chaînes latérales de fonctionner à haute vitesse tout en publiant les points de contrôle en lots. Ces points de contrôle ainsi que les preuves de fraude garantissent que les chaînes latérales de Polygon fonctionnent de manière sécurisée.

## Votre projet fournit l'évolutivité nécessaire à Ethereum en utilisant des chaînes plasma. S'agit-il d'un protocole ou d'une blockchain native en soi ? {#your-project-provides-scalability-for-ethereum-using-plasma-chains-is-it-a-protocol-or-a-native-blockchain-in-itself}

Le réseau Polygon est une solution **"sidechain"** où les actifs de la chaîne principale Ethereum, c'est-à-dire tous les dApps / jetons / Protocoles de la chaîne principale peuvent être déplacés / migrés vers Polygon sidechain(s) et, si nécessaire, on peut retirer les actifs de retour à la chaîne principale.

## Quels sont les avantages concurrentiels de Polygon par rapport à ses concurrents? {#what-are-the-competitive-advantages-of-polygon-over-its-competitors}

### Solutions de mise à l'échelle de la L2 {#l2-scaling-solutions}

Polygon s'engage à assurer la mise à l'échelle par la décentralisation. Polygon utilise des points de contrôle périodiques et des preuves de fraude. Lorsque les utilisateurs veulent retirer leurs actifs, ils utilisent les points de contrôle pour prouver leurs actifs sur sidechain, tandis que des preuves de fraude sont nécessaires pour contester la fraude ou tout mauvais comportement et les stakers slash.

D'autres projets proposent également des solutions d'échelle L2, mais il existe deux éléments clés sur lesquels nous we

1. Premièrement, Polygon se concentre sur non seulement les transactions financières, mais sur les jeux et d'autres applications dApps ainsi. Nous avons également des plans pour des services financiers soufflés complets comme les prêts / trading dApps (swaps de jetons, trades de marge et bien plus encore).

2. Deuxièmement, tandis que Polygon utilise des points de contrôle pour des temps de bloc 1 seconde (avec la couche PoS), beaucoup d'autres solutions peuvent avoir des temps de bloc plus grands que les temps de bloc Ethereum car vous devez pousser chaque bloc du sidechain vers la chaîne principale.

### Solutions de mise à l'échelle de la L1 {#l1-scaling-solutions}

En dehors de cela, entre autres projets d'envergure, Polygon se distingue par sa capacité à atteindre l'échelle tout en maintenant un grand degré de décentralisation.

Plus important encore, ces projets d'évolutivité ont un problème "réinventer la roue". Ils créent de nouvelles blockchains où la communauté des développeurs, l'écosystème de produits, la documentation technique et les entreprises doivent être construits à partir de **"scratch"**. Polygon, d'autre part, est une chaîne compatible avec EVM et a tous les dApps / actifs construits sur la chaîne principale Ethereum avec une évolutivité disponible au clic d'un bouton.

### Paiements {#payments}

Nous croyons que Polygon a un avantage en termes de facilité d'utilisation parce que, dans d'autres solutions, l'expéditeur et le récepteur doivent créer leurs canaux de paiement. Cette procédure est très lourde pour les utilisateurs. Tandis qu'avec la technologie sous-jacente de Polygon, les utilisateurs n'ont pas besoin de canaux de paiement et il leur suffit d'avoir une adresse Ethereum valide pour recevoir des jetons. Cela s'inscrit également dans notre vision à long terme, qui consiste à améliorer l'expérience utilisateur des applications décentralisées.

### Trading et finance {#trading-and-finance}

Polygon a l'intention d'activer les DEX (par exemple 0x), les piscines de liquidité (par exemple le réseau Kyber) et d'autres types de protocoles financiers comme les protocoles de prêt (protocole Dharma) sur sa plateforme, ce qui permettra aux utilisateurs Polygon d'accéder à diverses applications de serivce financière comme les DEX, les dApps, les LP et bien d'autres.

## Comment Polygon se compare à d'autres solutions sidechain? {#how-does-polygon-compare-with-other-sidechain-solutions}

Sur Polygon, toutes les transactions latérales sont sécurisées par de multiples mécanismes sur le sidechain ainsi que la chaîne principale. Sur sidechain, toutes les transactions effectuées par la couche de producteur de Bloc sont vérifiées et contrôlées vers la chaîne principale par une couche de pointage hautement décentralisée.

Si une transaction frauduleuse se produit sur sidechain, elle peut être détectée et gérée par la couche de pointage. Même dans un scénario extrême et hautement improbable où la couche de producteurs de blocs ainsi que la couche de pointage collude, même alors la chaîne principale a des preuves de fraude sur lesquelles n'importe qui du public peut venir et contester toute transaction qu'ils jugent frauduleuse sur le sidechain.

Si le défi est réussi, il y a une énorme dissuasion économique / punition financière pour les parties aux collections, car leurs enjeux sont réduits. Aussi, le défi public est récompensé avec les enjeux slashés des acteurs sidechain frauduleux.

Cela fait de Polygon un réseau sidechain économiquement incentivized qui a un degré élevé de décentralisation et de sécurité des transactions sidechain.

Aussi la capacité et le TPS de Polygon sidechains sont beaucoup plus élevés que d'autres solutions. Surtout lorsque Polygon peut avoir des milliers de transactions tandis que d'autres sont des simples chaînes latérales qui ont une limite plus élevée de quelques milliers de transactions.

## Via quels principes les nouveaux sidechains seront-ils ajoutés? Y aura-t-il des exigences particulières pour les candidats locaux des entreprises privées? {#via-what-principles-will-new-sidechains-be-added-will-there-be-any-special-requirements-for-private-companies-local-sidechains}

Par rapport aux canaux étatiques, Plasma représente une alternative supérieure aux cadres de mise à l'échelle, principalement en raison des garanties de sécurité fournies par le cadre, ce qui signifie essentiellement que les utilisateurs ne perdront jamais leurs fonds, peu importe ce qui arrive. La récupération de l'argent peut certes être retardée, mais un opérateur de Plasma Byzantin ne peut pas créer de l'argent à partir de rien, ni procéder à deux dépenses lors d'une transaction.

Polygon s'efforcera à l'avenir d'être une infrastructure blockchain entièrement ouverte et publique, dans laquelle les incitations et les dissuasions économiques détermineront essentiellement la sécurité et la stabilité du système. Tout le monde devrait donc pouvoir adhérer au système et participer au consensus. Toutefois, dans l'étape de semage du réseau, Polygon devra jouer un rôle plus important pour activer les sidechains.

De plus, les logiciels sidechains Polygon seraient principalement des logiciels sidechains publics c'est-à-dire des logiciels sidechains disponibles pour quiconque puisse utiliser tout comme d'autres blockchains publics. Cependant, les chaînes Enterprise Polygon compteront fournir des chaînes latérales dédiées (non confidentialité activée) pour des organisations particulières. La sécurité et la décentralisation de ces chaînes seraient toujours maintenues intactes à l'aide de la couche de pointage et des preuves de fraude sur la chaîne principale.

## Les chaînes latérales seront-elles également synchronisées avec la chaîne principale (Ethereum)? {#will-sidechains-also-be-synced-with-the-main-chain-ethereum}

Absolument. La couche de contrôle publique validera toutes les transactions effectuées sur les chaînes latérales et publiera les preuves sur la chaîne principale. Pour assurer la sécurité fausse des transactions sidechain, le contrat plasma à chaîne principale contient différents types de preuves de fraude où toutes les transactions sidechain peuvent être contestées pour toute activité frauduleuse. Si un challenger réussit, les enjeux des acteurs sidechain impliqués dans la fraude sont réduits et sont transférés au challenger. Cela équivaut à une prime de bogue à forte mise en œuvre toujours courante. Un bon diagramme pour comprendre est comme ci-dessous :.

![Capture d'écran](/img/matic/Architecture.png)

## À la fin du livre blanc se trouve une liste de « cas d'utilisation potentiels », sera-t-elle mise en œuvre ? Dans quel ordre ? {#at-the-end-of-the-white-paper-there-is-a-list-of-potential-use-cases-will-all-of-that-be-implemented-in-what-order}

La logique de base est - s'il existe un dApp / protocole qui fonctionne sur Ethereum, mais est limité par un faible débit de transaction et des frais de transaction élevés - alors nous serons en mesure d'ajouter la prise en charge de ces dApps / protocoles sur le réseau Polygon.

## Pourquoi sera-t-il difficile de reproduire la mise en œuvre du plasma de Polygon ? {#why-will-it-be-difficult-to-replicate-polygon-s-plasma-implementation}

Bien qu'il s'agisse plus de l'effet du réseau pour déterminer quel réseau est capable de mettre à l'échelle / de développer l'écosystème mieux que d'autres, les solutions blockchain doivent être open source parce qu'elles impliquent les actifs réels utilisés par eux.

C'est le cas avec tous les projets open source. Cela s'applique aussi bien pour nous que pour les autres mises en œuvre concurrentes, car nous allons mettre en place notre licence GPL qui oblige toute personne utilisant notre mise en œuvre à ouvrir obligatoirement son code. Mais encore une fois, le point étant que la copie de code est applicable même aux Bitcoin, Ethereum et à tous les autres projets, il est plus sur l'effet réseau qu'un projet peut atteindre.

## Quelle est la particularité de la mise en œuvre Plasma du réseau Polygon ? {#what-s-special-about-polygon-network-s-plasma-implementation}

Polygon Plasma utilise un système de modèle basé sur un compte plutôt que le système UTXO. Cela nous offre un avantage énorme d'utiliser un EVM sur la chaîne Polygon qui nous permet d'utiliser l'ensemble de l'écosystème Ethereum, des outils de développeurs, des bibliothèques d'intégration, etc. pour le réseau Polygon.

Le réseau Polygon peut être utilisé par dApps sans nécessiter de modifications à leurs jetons ERC20. De plus, notre couche de pointage de contrôle nous permet d'être des ordres de magnitudes plus rapides que les autres implémentations Plasma parce que nous battons les preuves de blocs individuels dans les points de contrôle, tandis que d'autres implémentations Plasma doivent soumettre chaque preuve de bloc à la chaîne principale.

![Screenshot](/img/matic/Architecture.png)

## Comment allez-vous résoudre les problèmes liés à la centralisation ? {#how-are-you-going-to-solve-the-issues-with-centralization}

Voici un diagramme pour vous donner un peu de contexte :

![Capture d'écran](/img/matic/Merkle.png)

Donc, d'abord, les nœuds PoA seront délégués (avec preuve de solvabilité, c'est-à-dire qu'ils doivent déposer une grande quantité de mises en jeu) et KYC essentiellement sélectionnés par la couche PoS, tout comme un modèle EOS Délégué preuve de prises (DPoS) ou des nœuds Délégués Byzantins Tolerance (DBFT).

Deuxièmement, supposons que tous les Délégués (ou 2/3ème d'entre eux) tournent des acteurs mauvais et produisent des blocs faulty alors vous avez des stakers de couche PoS qui vont valider tous les blocs et si des fraudes sont commises, les enjeux des Délégués sont slashés et le point de contrôle est arrêté pour les actions correctives.

Troisièmement, disons que même la couche PoS Staker (qui serait un grand nombre de nœuds) se rend également mauvais et collude pour produire des points de contrôle défectueux i.e. tous les PoA sont corrompus et PoS sont corrompus. Même alors, suivant la philosophie Plasma, nous écrivons l'une des choses convoités de l'échelle sidechain, **des preuves de** fraude qui sont surveillées par de nombreux grands projets (les watchers peuvent être considérés comme nos watchers de dépôt sur GitHub). Ce mécanisme de preuve de fraude permet à toute personne publique de contester toute transaction sur la chaîne principale, Ethereum.

## Pourquoi le jeton Matic est-il nécessaire ? {#why-is-matic-token-required}

Les raisons suivantes renforcent la nécessité d'avoir un jeton MATIC :

### Polygon entend être une solution à échelle générale pour les blockchains publics {#polygon-intends-to-be-a-general-purpose-scaling-solution-for-public-blockchains}

Nous commençons sur Ethereum comme premier basechain, mais dans le futur Polygon peut être déployé sur plusieurs bases de base. D'autres chaînes de base seront bientôt ajoutées, il ne sera donc pas logique d'avoir une seule monnaie (l'ether) à utiliser pour payer les frais sur les chaînes latérales. S'il y a une préoccupation existentielle sur n'importe quel avenir de bases de données, avoir cette monnaie de bases comme un actif native pour Polygon effacera le réseau d'échelle. Il est donc important de construire l'écosystème staker sur le propre jeton de réseau de Polygon.

### Modèle de sécurité Appcoin {#appcoin-security-model}

Polygon a l'intention de permettre aux Dapps de payer les frais de Polygon avec les jetons des Dapps en utilisant un mécanisme d'échange de jetons faisant appel à un pool de liquidité comme Kyber. L'utilisateur utilise simplement ses dApp-coins pour payer des frais, en arrière-plan le dApp-coin est échangé contre des jetons MATIC. Ainsi, les développeurs de DApp qui souhaitent offrir une expérience utilisateur fluide contribueront à maintenir une réserve de liquidités dans Polygon.

### Semer le réseau dans des étapes naissantes {#seeding-the-network-in-nascent-stages}

Il est pratiquement impossible d'amorcer le système lorsqu'il n'y a pas ou peu de txns dans le réseau au départ, car nous ne pouvons pas distribuer Eth à la couche hautement décentralisée du validateur et aux producteurs de blocs. En ce qui concerne les jetons Matic, nous avons prévu un grand pourcentage de jetons à distribuer pour les producteurs de blocs de sauvegarde de données, les stakes de points de contrôle et par la suite offrir des récompenses de bloc. Cette disposition garantit que les stakers reçoivent des récompenses même si le réseau met un certain temps à assumer les effets de réseau. C'est un peu comme la raison pour laquelle les récompenses pour l'extraction de blocs ont été conservées pour le bitcoin, les stakers et les producteurs de blocs peuvent être incités de cette manière à maintenir la sécurité du réseau.

Si votre préoccupation concerne les développeurs, l'un des piliers de notre stratégie consiste à maintenir une très faible barrière d'entrée pour les développeurs. Nous avons fait en sorte que tous les outils de développement d'Ethereum fonctionnent immédiatement sur Polygon. En termes des jetons nécessaires pour payer des frais sur testnet, il n'est pas différent pour un bâtiment de développeur sur Ethereum. Le dev obtient des jetons gratuits pour le testnet à partir d'un robinet Polygon, tout comme sur Ethereum. Vous avez besoin de jetons MATIC uniquement lorsque vous souhaitez déployer sur Polygon Mainnet, où les frais de gaz sont beaucoup plus bas que Ethereum, environ 1/100 d'un frais de transaction que vous payez sur Ethereum.

## Qu'est-ce qui motive l'utilisation et la demande de jetons Matic ? {#what-drives-the-use-and-demand-for-matic-tokens}

Le jeton a deux utilisations principales :

1. Le jeton est utilisé pour payer les frais de transaction dans le réseau.
2. Le jeton est utilisé pour effectuer des opérations de staking pour participer au mécanisme de consensus Proof of Stake pour effectuer des points de contrôle de couche et de production de blocs.

### Certaines des raisons secondaires de la demande de jetons {#some-of-the-secondary-reasons-for-token-demand}

![Screenshot](/img/matic/Merkle.png)

* Le réseau Polygon entend permettre aux Dapps de payer les frais de Polygon en jetons de Dapps en utilisant un mécanisme d'échange de jetons faisant appel à un pool de liquidité comme Kyber. L'utilisateur utilise simplement ses dApp-coins pour payer des frais, en arrière-plan le dApp-coin est échangé contre des jetons MATIC. Ainsi, les développeurs de DApp qui souhaitent offrir une expérience utilisateur fluide contribueront à maintenir une réserve de liquidités dans Polygon.

* Pour activer des sorties plus rapides, nous implémentons un mécanisme de prêt à l'aide du protocole Dharma dans lequel un souscripteur / prêteur peut recevoir le jeton de sortie et débourser le montant de sortie avec un petit frais comme intérêt. Le prêteur réclame ensuite les jetons après une semaine en utilisant le jeton de sortie. L'utilisateur obtient ainsi des retraits quasi immédiats tandis que les prêteurs peuvent gagner des intérêts pour le service qu'ils fournissent.

### Niveau du protocole - Brûlage de jetons {#protocol-level-burning-of-tokens}

Nous avons l'intention de graver un pourcentage des frais de transaction dans chaque bloc. Cela rend les jetons de nature déflationniste et lui fournit un support constant en termes de valeur au niveau du protocole.

### Faible barrière d'entrée (pour de meilleures chances d'adoption rapide) {#low-entry-barrier-and-hence-higher-chances-of-quick-adoption}

Nous nous appuierons fortement sur les DApps pour favoriser l'adoption par l'utilisateur final. L'une des principales fonctionnalités est que nous maintenons une architecture entièrement compatible avec l'écosystème de développement Ethereum c'est-à-dire tous les contrats intelligents, les portefeuilles, les IDE, les outils DevOps, etc. sont directement compatibles avec Polygon.

Toute Dapp Ethereum peut être transposée sur Polygon pratiquement sans aucune modification importante. Ainsi, les obstacles à l'entrée des développeurs Ethereum existants vers Polygon sont négligeables, ce qui peut lancer une adoption virale dApp. Cela a le potentiel de générer beaucoup de demande organique en raison des effets du réseau qui se développent autour du réseau Polygon.

## Le jeton est-il de type ERC20 ? {#is-token-type-erc20}

Oui. Et le même jeton sera applicable à Polygon Chain aussi, c'est-à-dire qu'il n'est pas nécessaire de passer à un jeton natif à l'avenir.

## Quel est le TPS attendu que vous serez en mesure d'apporter au réseau Ethereum ? À quelle vitesse fonctionnez-vous maintenant sur testnet ? {#what-is-the-expected-tps-you-ll-be-able-to-bring-to-the-ethereum-network-what-are-you-running-at-now-on-testnet}

Un seul sidechain a la capacité de 7 000 transactions + par seconde. Polygon a la capacité d'ajouter plusieurs sidechains, mais actuellement, notre accent serait sur la stabilisation du réseau avec un sidechain.
