---
id: fx-portal
title: FxPortal
description: Transferir estado ou dados do Ethereum para o Polygon sem mapear o uso do FxPortal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

O mecanismo habitual para ler nativamente os dados do Ethereum do Polygon está usando **a Sincronização de Estado**. Isto permite a transferência de dados arbitrários da Ethereum para a Polygon. No entanto, esta abordagem também requer um mapeamento dos contratos raiz e filho se a interface padrão não puder ser usada. O FxPortal oferece uma alternativa na qual os tokens padronizados ERC podem ser implantados sem qualquer mapeamento, bastando usar os contratos base FxPortal implantados.

## O que é o FxPortal? {#what-is-fxportal}

É uma implementação poderosa mas simples do mecanismo de [sincronização](../../pos/state-sync/state-sync-mechanism.md) do estado do Polygon. A bridge da Polygon PoS é construída sobre a mesma arquitetura. O código na pasta [exemplos](https://github.com/fx-portal/contracts/tree/main/contracts/examples) são alguns exemplos de uso. Pode usar facilmente estes exemplos para construir as suas próprias implementações ou uma própria ponte personalizada que permite qualquer sincronização de estado sem mapear.

Pode verificar o [repositório do GitHub](https://github.com/fx-portal/contracts) para contratos e exemplos.

## Como é que funciona? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) e [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) são os principais contratos nos quais o FxPortal trabalha. Ele chama e transmite dados para métodos definidos pelo usuário na outra chain sem nenhum mapeamento usando o mecanismo de sincronização de estado. Para usar os contratos principais implantados, pode implementar os contratos base do FxPortal nos contratos inteligentes que implanta - [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) e [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Ao construir estes contratos, os seus contratos implantados poderão comunicar entre si usando o mecanismo de túnel de dados.

Caso contrário, pode optar por mapear os seus tokens com os contratos de túnel já implantados. Os detalhes de implantação do FxTunnel padrão do Polygon Mainnet e do Mumbai Testnet são os seguintes:

- [Mainnet da Polygon](https://static.matic.network/network/mainnet/v1/index.json)
- [Mumbai](https://static.matic.network/network/testnet/mumbai/index.json)

Procure a palavra-chave `FxPortalContracts`nos links acima para encontrar todos os contratos de túnel padrão e outras implantações de contratos importantes do FxPortal.

## Preciso de uma implementação FxTunnel Personalizada? {#do-i-need-a-custom-fxtunnel-implementation}

Deve ser aplicado apenas a **implementação do FxTunnel personalizada** se as implementações de túnel padrão não estiverem alinhadas com o caso de uso. Quando usar os túneis padrão do FxPortal, não é possível modificar o código do contrato de criança. O bytecode para o contrato de token filho é sempre fixo e continua sempre o mesmo para as [implantações padrão](https://github.com/fx-portal/contracts/tree/main/contracts/examples) do FxTunnel. Caso precise de um token de criança personalizado, deve ir para o seu próprio FxTunnel personalizado e ler a próxima parte irá orientá-lo mais na implantação do seu próprio FxTunnels personalizado.

É altamente recomendável ler e compreender a [Transferência de Estado do FxPortal](state-transfer.md) antes de ler a próxima seção. Cada uma destas próximas seções terá links de contratos de túnel de exemplo associados a ela. Estes exemplos podem ser considerados como referência enquanto criam os seus próprios fx-tunnels. personalizados.

## Transferir ERC20 {#erc20-transfer}

Os contratos de [túneis de filhos e](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) de raiz permitem o depósito de tokens na chain de raiz e a retirada na chain de crianças.

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: Pode chamar a função do contrato implantado para mapear o token ERC-20 e criar um token filho correspondente na chain de crianças.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: `deposit()`método de chamada com o endereço do token mapeado, o endereço que pode retirar com um valor correspondente (juntamente com dados, se necessário). Deve existir uma aprovação prévia do contrato usando a função padrão `approve` ERC20 para gastar os seus tokens.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: O endereço atribuído `deposit()`pode retirar toda a quantidade de token de criança usando esta função. Receberão o token filho criado quando foi inicialmente mapeado.
- `rootToChildToken`: Esta variável pública contém o token de raiz para mapeamento de token de criança. Pode consultar o mapeamento através do endereço do token ROOT para conhecer o endereço do token filho implantado.

### De Ethereum → Polygon {#polygon}

1. Implantar o seu próprio token ERC20 na chain ROOT. Vai precisar deste endereço mais tarde.
2. Aprove os tokens para a transferência fazendo CALL da função `approve()` do token ROOT com o endereço do túnel ROOT e o valor como argumentos.
3. Prossiga para fazer CALL de `deposit()` com o endereço do destinatário e o valor na chain ROOT para receber o token filho equivalente na chain filho. Isto vai também mapear o token automaticamente. Alternativamente, pode primeiro fazer CALL de `mapToken()` antes de fazer o depósito.
4. Após o mapeamento, agora deve ser possível executar transferências de chain cruzadas usando `deposit`e `withdraw`funções do túnel.

:::note

Depois de `deposit()`executar a chain de raiz, levará de 22-30 minutos para que a sincronização do estado ocorra. Assim que a sincronização do estado ocorrer, receberá os tokens depositados no endereço fornecido.

:::

### Do Polygon → Ethereum {#ethereum}

1. Prossiga para fazer CALL de `withdraw()`, com o endereço do token respetivo e o valor como argumentos no contrato filho, para mover os tokens filho de volta para o destinatário designado na chain ROOT. **Anote o hash tx**, pois este será usado para gerar a prova de burn.

2. Pode encontrar os passos para concluir a retirada [aqui](#withdraw-tokens-on-the-root-chain).

## Transferência ERC721 {#erc721-transfer}

Caso necessite de exemplo, confira este guia [de Túneis de Raiz ERC721 e de](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) Infância.

### De Ethereum → Polygon {#polygon-1}

1. Implantar o seu próprio token ERC721 na chain ROOT. Vai precisar deste endereço mais tarde.
2. Aprove os tokens para transferência, fazendo CALL da função `approve()` do token ROOT, com o endereço do túnel ROOT e identificação do token como argumentos.
3. Prossiga para fazer CALL de `deposit()` com o endereço do destinatário e identificação do token na chain ROOT para receber o token filho equivalente na chain filho. Isto vai também mapear o token automaticamente. Alternativamente, pode primeiro fazer CALL de `mapToken()` antes de fazer o depósito.

:::note

Depois de `deposit()`executar a chain de raiz, levará de 22-30 minutos para que a sincronização do estado ocorra. Assim que a sincronização do estado ocorrer, receberá os tokens depositados no endereço fornecido.

:::

### Do Polygon → Ethereum {#ethereum-1}

1. Prossiga para fazer CALL de `withdraw()`, com o endereço do token respetivo e o valor como argumentos no contrato filho, para mover os tokens filho de volta para o destinatário designado na chain ROOT. Note que **o hash do tx** será usado para gerar a prova de queimadura.

2. Pode encontrar os passos para concluir a retirada [aqui](#withdraw-tokens-on-the-root-chain).

## Transferir ERC1155 {#erc1155-transfer}

Caso necessite de exemplo, confira este guia [de Túneis de Raiz e Criança](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) ERC1155.

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`: Usado para mapear o seu token ERC1155 ROOT para a chain filho
- `deposit(rootToken, user, id, amount, data)`: Função usada para depositar tokens ROOT na chain filho
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`: Usado para múltiplas identificações de tokens e valores correspondentes
- `receiveMessage(inputData)`: Para fazer CALL depois da prova de burn ter sido gerada com o payload como `inputData`

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`: Usado para retirar token da Polygon para a Ethereum
- `withdrawBatch(childToken, ids, amounts, data)`: O mesmo que para a retirada, mas para retirar múltiplas identificações de tokens

### De Ethereum → Polygon {#polygon-2}

1. Implantar o seu token ERC1155 na chain ROOT. Vai precisar deste endereço mais tarde.
2. `setApprovalForAll(operator, approved)`Ligue o token implantado com `FxERC1155RootTunnel`endereço para `operator`permitir `FxERC1155RootTunnel`transferir seus tokens para o `FxERC1155ChildTunnel`Polygon.
3. `mapToken()`Ligue `FxERC1155RootTunnel`com o endereço do token implantado como .`rootToken` Isso irá enviar uma mensagem para `FxERC1155ChildTunnel`instruí-la a implantar e mapear o token ERC1155 no Polygon. Para consultar o endereço de token do filho, ligue `rootToChildToken`para .`FxERC1155ChildTunnel`
4. `deposit()`Ligue `FxERC1155RootTunnel`com o endereço do token no Ethereum como , `rootToken``user`receptor como , ID do token `id`e o valor como .`amount` Alternativamente, também pode fazer CALL de `depositBatch()` para múltiplas identificações de tokens.

:::note

Depois de `deposit()`executar a chain de raiz, levará de 22-30 minutos para que a sincronização do estado ocorra. Assim que a sincronização do estado ocorrer, receberá os tokens depositados no endereço fornecido.

:::

### Do Polygon → Ethereum {#ethereum-2}

1. `withdraw()`Ligue `FxERC1155ChildTunnel`com o endereço do token filho implantado no Polygon como `childToken`e o ID do token como `id`(o endereço do token filho pode ser consultado do `rootToChildToken`mapeamento). Alternativamente, também pode fazer a CALL de `withdrawBatch()` para múltiplas identificações de tokens e os valores correspondentes. Note que **o hash do tx** será usado para gerar a prova de queimadura.

2. Pode encontrar os passos para concluir a retirada [aqui](#withdraw-tokens-on-the-root-chain).

## Retirar tokens na Chain da Raiz {#withdraw-tokens-on-the-root-chain}

:::info

Depois de ter `withdraw()`realizado a chain de filhos, levará de 30 a 90 minutos para que um checkpoint ocorra. Assim que o próximo checkpoint incluir a transação de queimadura, poderá retirar os tokens na chain de raiz.

:::

1. Gerar a prova de queimadura usando o **hash tx** e **MESSAGE_SENT_EVENT_SIG**. Para gerar a prova, pode usar a API de geração de provas hospedada pelo Polygon ou também criar a sua própria API de geração de provas seguindo as instruções [aqui](https://github.com/maticnetwork/proof-generation-api).

O endpoint da geração de provas hospedado pelo Polygon está disponível [aqui.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

  - `burnTxHash`é o hash da `withdraw()`transação iniciada no Polygon.
  - `eventSignature`é a assinatura do evento emitido pela `withdraw()`função. A assinatura do evento para o MESSAGE_SENT_EVENT_SIG é `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Os exemplos de uso da API de geração de provas para o Mainnet e Testnet são os seguintes: -

→ [Geração da prova do Polygon Mainnet](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Geração da prova de Testnet de Mumbai](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Alimentar a carga de carga gerada como argumento no contrato `receiveMessage()`de túnel de raiz respectivo no Goerli ou no Ethereum.

## Transferir Mintable ERC-20 {#mintable-erc-20-transfer}

Caso necessite de exemplo, confira este guia [Mintable de raiz ERC20 e túneis de](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) crianças.

:::info

No caso do FxTunnels do Token Mintable, o token filho é implantado primeiro e o token de raiz é implantado apenas quando o primeiro processo de retirada/saída for concluído. O endereço do contrato de token de raiz pode ser pré-determinado logo após o contrato de criança ser implantado, mas o mapeamento só existirá tecnicamente quando a primeira retirada/saída for concluída.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: Para depositar tokens da Ethereum na Polygon
- `receiveMessage(bytes memory inputData)`: Prova de burn para ser dada como o `inputData` para receber tokens na chain ROOT

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: Para implantar um token ERC-20 na rede Polygon
- `mintToken(address childToken, uint256 amount)`: Fazer mint de uma quantidade específica de tokens na Polygon
- `withdraw(address childToken, uint256 amount)`: Para fazer burn de tokens na chain filho de forma a retirá-los na chain ROOT

### Tokens de mineração no Polygon {#minting-tokens-on-polygon}

1. Fazça CALL de `deployChildToken()` em `FxMintableERC20ChildTunnel` e passe a informações de token necessárias como parâmetros. Isto emite um evento `TokenMapped` que contém os endereços `rootToken` e `childToken`. Note estes endereços.
2. Fazer CALL de `mintToken()` em `FxMintableERC20ChildTunnel` para fazer Mint de tokens na chain filho.
3. Fazer CALL de `withdraw()` em `FxMintableERC20ChildTunnel` para retirar tokens da Polygon. Observe o hash da transação como este será útil para gerar a prova de queimadura.
4. Pode encontrar os passos para concluir a retirada [aqui](#withdraw-tokens-on-the-root-chain).

### Retirar tokens no Ethereum {#withdrawing-tokens-on-ethereum}

Introduza a prova de burn gerada como argumento para `receiveMessage()` em `FxMintableERC20RootTunnel` . Depois disso, o saldo do token será refletido na chain ROOT

### Tokens de depósito de volta ao Polygon {#deposit-tokens-back-to-polygon}

1. Certifique-se de que aprova `FxMintableERC20RootTunnel` para transferir os seus tokens.
2. Faça CALL de `deposit()` em `FxMintableERC20RootTunnel` com o `rootToken` como endereço do token ROOT e `user` como destinatário.
3. Espere o evento de sincronização de estado (22-30 mins). Depois disso, pode consultar o saldo do destinatário alvo na chain filho.

Os exemplos do FxTunnel Mintable **ERC721** e **ERC1155** são os seguintes:

- [FxMintableERC721Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## Exemplos de implantações {#example-deployments}

### Goerli {#goerli}

- Gerenciador de pontos de verificação: [0x2890bA17EfE978480615e330ecB6533b880928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Token Dummy ERC20: [0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTúnel: [0xA200766a7D64E5461E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Token Dummy ERC721: [0x73594a053cb5ddDE5558268d28a774375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTúnel: [0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Token Dummy ERC1155: [0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d18788cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- FxERC20: [0xDDE69724AeFBdb084413719fE745aB66e3b055C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20ChildTunel: [0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunel: [0xA2C7eBEf68B44056b4A39C2CEC23844275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
-  Token child ERC20 dummy: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E048726267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721ChildTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3A5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunel: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

As implantações do Mainnet correspondentes podem ser encontradas [aqui](https://static.matic.network/network/mainnet/v1/index.json). Procure a palavra-chave `FxPortalContracts`para encontrar todos os contratos de túnel padrão e outras implantações de contratos importantes do FxPortal. Pode utilizar o [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)pacote para aceder aos endereços do contrato e aos ABIs.

## Endereços de contrato {#contract-addresses}

### Testnet da Mumbai {#mumbai-testnet}

| Contrato | Endereço implantado  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Mainnet da Polygon {#polygon-mainnet}


| Contrato | Endereço implantado  |
| :----- | :- |
| [FxRoot (Ethereum Mainnet)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild (Polygon Mainnnet)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
