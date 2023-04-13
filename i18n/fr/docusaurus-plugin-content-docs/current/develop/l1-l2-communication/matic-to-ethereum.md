---
id: matic-to-ethereum
title: Transférer les données de Polygone à Ethereum
description: Transférer l'état ou les données de Polygone à Ethereum via des Contrats
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Le mécanisme de transfert des données de Polygone à Ethereum est un peu différent de celui qui permet de transférer Ethereum à Polygone. Les transactions  **points de contrôle**  créées par les validateurs sur la chaîne Ethereum sont utilisées pour atteindre cet objectif. Fondamentalement, une transaction est initialement créée sur Polygone. Lors de la création de cette transaction, il faut s'assurer qu'un **événement est émis** et que les **dossiers d'événements comprennent les données que nous souhaitons transférer** de Polygone à Ethereum.

Dans une période de temps ( environ 10-30 minutes ), cette transaction est pointée par les validateurs sur la chaîne Ethereum. Une fois le pointage de contrôle effectué, le hash de la transaction créée sur la chaîne Polygone peut être soumis comme preuve sur le contrat **RootChainManager** sur la chaîne Ethereum. Ce contrat, valide la transaction, vérifie que cette transaction est incluse dans le point de contrôle et enfin décode les dossiers d'événements de cette transaction.

Une fois cette phase terminée, nous pouvons utiliser les **données du dossier des événements décodées pour effectuer tout changement** sur le contrat root déployé sur la chaîne Ethereum. Pour cela, nous devons également nous assurer que le changement d'état sur Ethereum est uniquement effectué de manière sécurisée. Par conséquent, nous utilisons un contrat **de Prédicat** qui est un type spécial de contrat qui ne peut être déclenché que par le **contrat**RootChainManager. Cette architecture garantit que les changements d'état sur Ethereum ne se produisent que lorsque la transaction sur Polygone est contrôlée et vérifiée sur la chaîne Ethereum par le **contrat**RootChainManager.

# Aperçu {#overview}

- Une transaction est exécutée sur le contrat enfant déployé sur la chaîne Polygone.
- Un événement est également émis dans cette transaction. Les paramètres de cet **événement comprennent les données qui doivent être transférées** de Polygone à Ethereum.
- Les validateurs du réseau Polygone récupèrent ces transactions dans un intervalle de temps spécifique (probablement 10-30 minutes), les valident et **les ajoutent au point de contrôle** sur Ethereum.
- Une transaction de point de contrôle est créée sur le contrat **RootChain** et l'inclusion du point de contrôle peut être vérifiée à l'aide de ce [scénario](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)
- Une fois l'ajout de points de contrôle terminé, la bibliothèque **matic.js** peut être utilisée pour appeler la fonction **exit** du contrat **RootChainManager.**La fonction **exit** peut être appelée en utilisant la bibliothèque matic.js comme le montre cet [exemple](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js).

- L'exécution du scénario vérifie l'inclusion du hash de la transaction Polygone dans la chaîne Ethereum, puis appelle à son tour la fonction **exitToken** du contrat [de prédicat](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol).
- Cela garantit que le **changement d'état sur le contrat de chaîne root** soit toujours effectué de manière **sécurisée** et uniquement par le biais du contrat **de prédicat**.
- Il est important de noter que la **vérification du hash de la transaction** de Polygone et **le déclenchement du contrat du prédicat** se font dans une **simple transaction**,assurant ainsi la sécurité de tout changement d'état du contrat root.

# Mise en oeuvre {#implementation}

Il s'agit d'une démonstration simple sur la manière dont les données peuvent être transférées de Polygone à Ethereum. Ce tutoriel montre un exemple de transfert d'une valeur uint256 à travers la chaîne. Mais vous pouvez transférer le type de données. Mais il est nécessaire d'encoder les données en octets puis de les émettre à partir du contrat enfant. Cela peut enfin être décodé au contrat root.

1. Créez d'abord le contrat de la chaîne root et de la chaîne enfant. Assurez-vous que la fonction qui effectue le changement d'état émet également un événement. Cet événement doit inclure les données à transférer comme l'un de ses paramètres. Vous trouverez ci-dessous un exemple de présentation du contrat Enfant et Root. Il s'agit d'un contrat très simple qui comporte une variable de données dont la valeur est définie à l'aide de la fonction setData. L'appel de la fonction setData émet les Données d'événement. Le reste des éléments du contrat sera expliqué dans les prochaines sections de ce tutoriel.

A. Contrat Enfant

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. Contrat Root

Passez ce `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f`comme la valeur pour `_predicate` dans le constructeur du contrat root.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. Une fois que le contrat enfant et le contrat root sont déployés sur la chaîne Polygone et Ethereum respectivement, ces contrats doivent être mis en cartographie à l'aide du pont PoS. Cette cartographie garantit qu'une connexion est maintenue entre ces deux contrats à travers les chaînes. Pour réaliser cette cartographie, l'équipe du Polygone est joignable au [discord](https://discord.com/invite/0xPolygon).

3. C'est important de noter que, dans le contrat root, il y a un modificateur onlyPredicate. Il est recommandé de toujours utiliser ce modificateur car cela garantit que seul le contrat prédicat effectue le changement d'état sur le contrat root. Le contrat prédicat est un contrat spécial qui déclenche le contrat root uniquement lorsque la transaction qui s'est produite sur la chaîne de Polygone est vérifiée par le RootChainManager de la chaîne Ethereum. Cela garantit un changement d'état sécurisé sur le contrat root.

Pour tester l'implémentation ci-dessus, nous pouvons créer une transaction sur la chaîne de Polygone en appelant la fonction **setData** du contrat enfant. Nous devons attendre à ce stade que le point de contrôle soit terminé. L'inclusion du point de contrôle peut être vérifiée en utilisant ce [scénario](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js). Une fois que le point de contrôle est terminé, appelez la fonction de sortie du RootChainManager en utilisant le SDK matic.js.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

Comme le montre la capture d'écran ci-dessus, le **txHash** est le hash de la transaction qui s'est produite sur le contrat enfant déployé sur la chaîne Polygone.

Le **logEventSignature** est le dièse keccack-256 des données d'événement. C'est le même hash que nous avons inclus dans le contrat de Prédicat. Tout le code contractuel utilisé pour ce tutoriel et le scénario de sortie peuvent être trouvés [ici](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

Une fois le scénario de sortie terminé, le contrat root de la chaîne Ethereum peut être interrogé pour vérifier si la valeur de la variable **data** qui a été définie dans le contrat enfant a également été reflétée dans la variable **data** du contrat root.
